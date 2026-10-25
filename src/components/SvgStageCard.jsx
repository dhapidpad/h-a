import React, { useState, useEffect, useCallback } from 'react';
import { Maximize2, Minimize2, ZoomIn, Sparkles, X, Info } from 'lucide-react';

/**
 * SvgStageCard - Khung trình chiếu minh họa SVG cao cấp
 * 
 * Tính năng nổi bật:
 * 1. Bệ đỡ Glassmorphism sang trọng với hiệu ứng hào quang nguyên tố (Đạm - Lân - Kali)
 * 2. Thanh tiêu đề trạng thái công nghệ cao với đèn xung nhịp sinh học
 * 3. Chế độ "Phóng To Toàn Cảnh (Theater / Lightbox Modal)" giúp học sinh & giáo viên
 *    nhìn rõ từng công thức hóa học, mũi tên phản ứng, tế bào thực vật và bản đồ chi tiết!
 * 4. Phím tắt thông minh: Nhấn [Z] hoặc click nút để Phóng to / Thu nhỏ; nhấn [Esc] để đóng.
 */
export default function SvgStageCard({
  title,
  subtitle,
  chapter = 'dam',
  badge,
  takeaway,
  children
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Phím tắt bàn phím: Z để bật/tắt phóng to, Esc để đóng
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.key === 'Escape' && isZoomed) {
        e.preventDefault();
        e.stopPropagation();
        setIsZoomed(false);
      } else if ((e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // Chỉ kích hoạt khi không ở trong ô nhập liệu
        e.preventDefault();
        setIsZoomed((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isZoomed]);

  // Ngăn chặn sự kiện nổi bọt khi click trong modal
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsZoomed(false);
    }
  };

  const getChapterColor = () => {
    switch (chapter) {
      case 'dam':
        return {
          main: '#16A34A',
          light: '#DCFCE7',
          dark: '#14532D',
          glow: 'rgba(34, 197, 94, 0.4)',
          border: '#86EFAC',
          name: 'PHÂN ĐẠM (N)'
        };
      case 'lan':
        return {
          main: '#7C3AED',
          light: '#EDE9FE',
          dark: '#5B21B6',
          glow: 'rgba(124, 58, 237, 0.4)',
          border: '#C4B5FD',
          name: 'PHÂN LÂN (P)'
        };
      case 'kali':
        return {
          main: '#D97706',
          light: '#FEF3C7',
          dark: '#78350F',
          glow: 'rgba(245, 158, 11, 0.4)',
          border: '#FDE68A',
          name: 'PHÂN KALI (K)'
        };
      default:
        return {
          main: '#2563EB',
          light: '#EFF6FF',
          dark: '#1E40AF',
          glow: 'rgba(37, 99, 235, 0.4)',
          border: '#93C5FD',
          name: 'HÓA HỌC NPK'
        };
    }
  };

  const theme = getChapterColor();

  return (
    <>
      {/* ============================================================
          KHUNG TRÌNH DIỄN CHÍNH (INLINE STAGE CARD)
          ============================================================ */}
      <div className={`svg-stage-showcase chapter-theme-${chapter}`}>
        {/* Thanh công cụ tiêu đề đỉnh sân khấu */}
        <div className="svg-stage-topbar">
          <div className="svg-stage-topbar-left">
            <span className="svg-stage-pulse-dot" style={{ backgroundColor: theme.main }} />
            <span className="svg-stage-topbar-title">{title}</span>
            {badge && (
              <span 
                className="svg-stage-topbar-badge"
                style={{ backgroundColor: theme.light, color: theme.dark, borderColor: theme.border }}
              >
                {badge}
              </span>
            )}
          </div>

          <div className="svg-stage-topbar-right">
            <button
              type="button"
              className="svg-stage-zoom-btn"
              onClick={() => setIsZoomed(true)}
              title="Phóng to toàn cảnh sơ đồ (Phím tắt: Z)"
              aria-label="Phóng to sơ đồ SVG"
            >
              <Maximize2 size={14} />
              <span>Phóng to</span>
              <kbd className="svg-stage-kbd">Z</kbd>
            </button>
          </div>
        </div>

        {/* Khung hiển thị hình minh họa SVG */}
        <div className="svg-stage-canvas-box" onClick={(e) => {
          // Nếu click vào vùng đệm ngoài của SVG thì mở zoom
          if (e.target.tagName === 'DIV' || e.target.classList.contains('svg-stage-canvas-box')) {
            setIsZoomed(true);
          }
        }}>
          {children}
        </div>

        {/* Chân thẻ hiển thị tóm tắt khoa học nhanh */}
        {subtitle && (
          <div className="svg-stage-footer-bar">
            <span className="svg-stage-footer-icon" style={{ color: theme.main }}>✦</span>
            <span className="svg-stage-footer-text">{subtitle}</span>
          </div>
        )}
      </div>

      {/* ============================================================
          THEATER / LIGHTBOX MODAL (CHẾ ĐỘ PHÓNG TO TOÀN CẢNH)
          ============================================================ */}
      {isZoomed && (
        <div 
          className="svg-lightbox-backdrop" 
          onClick={handleModalBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label={`Sơ đồ phóng to: ${title}`}
        >
          <div className="svg-lightbox-container">
            {/* Header Modal */}
            <div className="svg-lightbox-header">
              <div className="svg-lightbox-header-left">
                <span 
                  className="svg-lightbox-chapter-chip"
                  style={{ backgroundColor: theme.light, color: theme.dark }}
                >
                  {theme.name}
                </span>
                <h3 className="svg-lightbox-title">{title}</h3>
                {badge && (
                  <span 
                    className="svg-lightbox-formula-pill"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#F8FAFC' }}
                  >
                    {badge}
                  </span>
                )}
              </div>

              <div className="svg-lightbox-header-right">
                <button
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
              <div className="svg-lightbox-graphic-inner">
                {children}
              </div>
            </div>

            {/* Footer Modal tóm tắt kiến thức cốt lõi */}
            {takeaway && (
              <div className="svg-lightbox-takeaway-bar">
                <div className="svg-lightbox-takeaway-icon" style={{ backgroundColor: theme.light, color: theme.main }}>
                  <Sparkles size={18} />
                </div>
                <div className="svg-lightbox-takeaway-text">
                  <strong>Ý nghĩa cốt lõi: </strong>
                  {takeaway}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
