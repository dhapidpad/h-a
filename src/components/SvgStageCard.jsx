import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Maximize2, Minimize2, Sparkles } from 'lucide-react';

/**
 * SvgStageCard - Khung trình chiếu minh họa SVG cao cấp (Morph & TV 16:9 Edition)
 *
 * Nâng cấp theo Master Spec:
 * 1. Đồng bộ hoàn toàn theo CSS token chương (--c-main, --c-deep, --c-tint, --c-line).
 * 2. Khi mở Lightbox (isZoomed), render qua createPortal(document.body) để thoát khỏi
 *    transform: scale() của .slide-canvas, đảm bảo hiển thị toàn màn hình thực chất.
 * 3. Đóng băng animation inline (CSS + SMIL pauseAnimations) khi Lightbox đang mở.
 * 4. Hỗ trợ nhấn đúp (onDoubleClick), chạm đúp (double-tap), phím Z để bật/tắt, Esc để đóng.
 */
const CHAPTER_META = {
  dam: { name: 'PHÂN ĐẠM (N)' },
  lan: { name: 'PHÂN LÂN (P)' },
  kali: { name: 'PHÂN KALI (K)' }
};

export default function SvgStageCard({
  title,
  subtitle,
  chapter = 'dam',
  badge,
  takeaway,
  children
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const lastTapRef = useRef(0);
  const inlineBoxRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Khi mở lightbox, SVG được render lần hai; dừng SMIL ở bản thu nhỏ để tránh nhân đôi chi phí animation
  useEffect(() => {
    if (!isZoomed) return undefined;
    const inlineSvg = inlineBoxRef.current?.querySelector('svg');
    if (inlineSvg && typeof inlineSvg.pauseAnimations === 'function') {
      try {
        inlineSvg.pauseAnimations();
      } catch {
        // Ignore if unsupported
      }
    }
    // Đưa focus vào nút đóng trong Lightbox để hỗ trợ bàn phím
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus?.();
    }, 30);

    return () => {
      clearTimeout(focusTimer);
      if (inlineSvg && typeof inlineSvg.unpauseAnimations === 'function') {
        try {
          inlineSvg.unpauseAnimations();
        } catch {
          // Ignore if unsupported
        }
      }
    };
  }, [isZoomed]);

  // Phím tắt bàn phím: Z để bật/tắt phóng to, Esc để đóng (ưu tiên trước Speaker Notes)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === 'Escape' && isZoomed) {
        e.preventDefault();
        e.stopPropagation();
        setIsZoomed(false);
      } else if ((e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isZoomed]);

  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsZoomed(false);
    }
  };

  // Hỗ trợ chạm hai lần (double-tap) trên màn hình cảm ứng để phóng to
  const handleTouchEnd = () => {
    const now = performance.now();
    if (now - lastTapRef.current < 320) {
      setIsZoomed(true);
    }
    lastTapRef.current = now;
  };

  const chapterName = (CHAPTER_META[chapter] && CHAPTER_META[chapter].name) || 'HÓA HỌC NPK';

  const lightboxModal =
    isZoomed && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={`svg-lightbox-backdrop chapter-theme-${chapter}`}
            onClick={handleModalBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-label={`Sơ đồ phóng to: ${title}`}
            data-no-swipe
          >
            <div className="svg-lightbox-container">
              {/* Header Modal */}
              <div className="svg-lightbox-header">
                <div className="svg-lightbox-header-left">
                  <span
                    className="svg-lightbox-chapter-chip"
                    style={{ backgroundColor: 'var(--c-tint)', color: 'var(--c-deep)' }}
                  >
                    {chapterName}
                  </span>
                  <h3 className="svg-lightbox-title">{title}</h3>
                  {badge && (
                    <span
                      className="svg-lightbox-formula-pill"
                      style={{ backgroundColor: 'rgba(255,255,255,0.14)', color: '#F8FAFC' }}
                    >
                      {badge}
                    </span>
                  )}
                </div>

                <div className="svg-lightbox-header-right">
                  <button
                    ref={closeBtnRef}
                    type="button"
                    className="svg-lightbox-close-btn"
                    onClick={() => setIsZoomed(false)}
                    title="Thu nhỏ lại (Phím tắt: Esc)"
                    aria-label="Đóng phóng to"
                  >
                    <Minimize2 size={16} />
                    <span>Thu nhỏ</span>
                    <kbd className="svg-lightbox-kbd">Esc</kbd>
                  </button>
                </div>
              </div>

              {/* Nội dung SVG phóng cực đại */}
              <div className="svg-lightbox-graphic-stage">
                <div className="svg-lightbox-graphic-inner">{children}</div>
              </div>

              {/* Footer Modal tóm tắt kiến thức cốt lõi */}
              {takeaway && (
                <div className="svg-lightbox-takeaway-bar">
                  <div
                    className="svg-lightbox-takeaway-icon"
                    style={{ backgroundColor: 'var(--c-tint)', color: 'var(--c-deep)' }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div className="svg-lightbox-takeaway-text">
                    <strong>Ý nghĩa cốt lõi: </strong>
                    {takeaway}
                  </div>
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {/* ============================================================
          KHUNG TRÌNH DIỄN CHÍNH (INLINE STAGE CARD)
          ============================================================ */}
      <div className={`svg-stage-showcase chapter-theme-${chapter}${isZoomed ? ' is-paused' : ''}`}>
        {/* Thanh công cụ tiêu đề đỉnh sân khấu */}
        <div className="svg-stage-topbar">
          <div className="svg-stage-topbar-left">
            <span className="svg-stage-pulse-dot" />
            <span className="svg-stage-topbar-title">{title}</span>
            {badge && <span className="svg-stage-topbar-badge">{badge}</span>}
          </div>

          <div className="svg-stage-topbar-right">
            <span className="svg-stage-zoom-hint">Nhấn đúp để phóng to</span>
            <button
              type="button"
              className="svg-stage-zoom-btn"
              onClick={() => setIsZoomed(true)}
              title="Phóng to toàn cảnh sơ đồ (Phím tắt: Z hoặc nhấn đúp)"
              aria-label="Phóng to sơ đồ SVG"
            >
              <Maximize2 size={14} />
              <span>Phóng to</span>
              <kbd className="svg-stage-kbd">Z</kbd>
            </button>
          </div>
        </div>

        {/* Khung hiển thị hình minh họa SVG */}
        <div
          ref={inlineBoxRef}
          className="svg-stage-canvas-box"
          onDoubleClick={() => setIsZoomed(true)}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            if (e.target.tagName === 'DIV' || e.target.classList.contains('svg-stage-canvas-box')) {
              setIsZoomed(true);
            }
          }}
        >
          {children}
        </div>

        {/* Chân thẻ hiển thị tóm tắt khoa học nhanh */}
        {subtitle && (
          <div className="svg-stage-footer-bar">
            <div className="svg-stage-footer-left">
              <span className="svg-stage-footer-icon">✦</span>
              <span className="svg-stage-footer-text">{subtitle}</span>
            </div>
          </div>
        )}
      </div>

      {lightboxModal}
    </>
  );
}
