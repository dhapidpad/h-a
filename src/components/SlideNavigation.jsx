import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize, FileText, Sparkles, BookOpen } from 'lucide-react';
import { SLIDES } from '../data/slideData';
import confetti from 'canvas-confetti';

export default function SlideNavigation({
  currentIndex,
  totalSlides,
  chapter,
  onPrev,
  onNext,
  onSelectSlide,
  onToggleNotes,
  isNotesOpen,
  isFullscreen,
  onToggleFullscreen
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const slideNumStr = String(currentIndex + 1).padStart(2, '0');
  const totalNumStr = String(totalSlides).padStart(2, '0');
  const activeColor = chapter?.color || '#2F80ED';

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.88 },
      disableForReducedMotion: true
    });
  };

  return (
    <footer className="floating-dock-container">
      {/* Tooltip nổi thông minh khi rê chuột vào thanh tiến độ */}
      {hoveredIdx !== null && SLIDES[hoveredIdx] && (
        <div className="dock-tooltip">
          <span style={{ color: SLIDES[hoveredIdx].chapter.color, fontWeight: 900 }}>
            Slide {hoveredIdx + 1}:
          </span>{' '}
          {SLIDES[hoveredIdx].title}
        </div>
      )}

      {/* Viên nang điều khiển nổi (Floating Glass Island) */}
      <nav className="dock-capsule" aria-label="Thanh điều hướng trình chiếu">
        {/* Nhóm 1: Số trang & Tên chương */}
        <div className="dock-counter-group">
          <div className="dock-page-badge">
            <span style={{ color: activeColor, fontWeight: 900 }}>{slideNumStr}</span>
            <span className="dock-slash">/</span>
            <span className="dock-total">{totalNumStr}</span>
          </div>

          <div 
            className="dock-chapter-pill"
            style={{ 
              backgroundColor: chapter?.softColor || '#EAF2FF', 
              color: activeColor,
              borderColor: `${activeColor}40`
            }}
          >
            <span className="dock-chapter-dot" style={{ backgroundColor: activeColor }} />
            <span>{chapter?.name || 'NPK'}</span>
          </div>
        </div>

        {/* Thanh chia tách thanh mảnh */}
        <div className="dock-divider" />

        {/* Nhóm 2: Thanh tiến độ 20 phân đoạn tương tác (Segmented Timeline) */}
        <div className="dock-timeline-track" title="Click vào bất kỳ vạch nào để nhảy đến slide tương ứng">
          {SLIDES.map((s, idx) => {
            const isCurrent = idx === currentIndex;
            const isPast = idx < currentIndex;
            const segColor = s.chapter.color;

            return (
              <button
                key={s.id}
                type="button"
                className={`dock-segment-pill ${isCurrent ? 'active' : ''} ${isPast ? 'past' : ''}`}
                onClick={() => onSelectSlide && onSelectSlide(idx)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  backgroundColor: isCurrent ? segColor : isPast ? `${segColor}B3` : 'rgba(15, 23, 42, 0.12)',
                  boxShadow: isCurrent ? `0 0 12px ${segColor}CC, 0 0 2px ${segColor}` : 'none',
                }}
                aria-label={`Chuyển đến Slide ${idx + 1}: ${s.title}`}
              />
            );
          })}
        </div>

        {/* Thanh chia tách thanh mảnh */}
        <div className="dock-divider" />

        {/* Nhóm 3: Nút Lùi / Tiến mượt mà */}
        <div className="dock-nav-controls">
          <button 
            type="button"
            className="dock-circle-btn dock-prev-btn" 
            onClick={onPrev} 
            disabled={currentIndex === 0}
            title="Slide trước (Phím ← hoặc PageUp)"
            aria-label="Slide trước"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            type="button"
            className="dock-circle-btn dock-next-btn" 
            onClick={onNext} 
            disabled={currentIndex === totalSlides - 1}
            style={{ 
              background: `linear-gradient(135deg, ${activeColor} 0%, ${activeColor}DD 100%)`, 
              boxShadow: `0 4px 16px ${activeColor}60`
            }}
            title="Slide tiếp theo (Phím → hoặc Space)"
            aria-label="Slide tiếp theo"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Thanh chia tách thanh mảnh */}
        <div className="dock-divider" />

        {/* Nhóm 4: Bộ công cụ phụ trợ (Hoa giấy, Ghi chú N, Toàn màn hình F) */}
        <div className="dock-tools-group">
          <button 
            type="button"
            className="dock-tool-btn dock-confetti-btn" 
            onClick={triggerConfetti}
            title="Bắn hoa giấy chúc mừng!"
            aria-label="Bắn hoa giấy"
          >
            <Sparkles size={18} />
          </button>

          <button 
            type="button"
            className={`dock-tool-btn dock-notes-btn ${isNotesOpen ? 'active' : ''}`}
            onClick={onToggleNotes}
            style={isNotesOpen ? { backgroundColor: `${activeColor}15`, color: activeColor, borderColor: activeColor } : {}}
            title="Bật/Tắt Ghi chú thuyết trình (Phím N)"
            aria-label="Ghi chú bài giảng"
          >
            <BookOpen size={16} />
            <span className="dock-tool-label">Ghi Chú</span>
          </button>

          <button 
            type="button"
            className="dock-tool-btn dock-fullscreen-btn" 
            onClick={onToggleFullscreen}
            title="Bật/Tắt Toàn Màn Hình (Phím F)"
            aria-label="Toàn màn hình"
          >
            {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
          </button>
        </div>
      </nav>
    </footer>
  );
}
