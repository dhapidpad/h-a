import React, { useState, useEffect } from 'react';
import { Smartphone, RotateCw } from 'lucide-react';

/**
 * OrientationGuard: Hướng dẫn xoay ngang trên thiết bị di động (Mobile Portrait)
 * - Tự động ẩn trên máy tính để bàn (Desktop / Laptop)
 * - Chỉ xuất hiện khi người dùng mở bằng điện thoại/máy tính bảng ở chiều dọc (Portrait)
 * - Hiển thị dưới dạng Fullscreen Modal Overlay, không làm xô lệch bố cục trang
 */
export default function OrientationGuard({ onContinueAnyway }) {
  const [isPortraitMobile, setIsPortraitMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Chỉ hiện cảnh báo khi là màn hình nhỏ (chiều rộng <= 850px) VÀ đang ở chiều dọc (height > width)
      const isMobileSize = window.innerWidth <= 850;
      const isPortrait = window.innerHeight > window.innerWidth;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setIsPortraitMobile((isMobileSize || isTouchDevice) && isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isPortraitMobile || dismissed) return null;

  // Hai bước độc lập: fullscreen bị từ chối (vd. iOS Safari) không được chặn việc thử khóa hướng ngang,
  // và ngược lại. Lỗi chỉ ghi log; người dùng luôn còn nút "Tiếp tục xem ở chế độ dọc".
  const requestLandscapeFullscreen = async () => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen fallback:', err);
    }
    try {
      if (window.screen?.orientation?.lock) {
        await window.screen.orientation.lock('landscape');
      }
    } catch (err) {
      console.warn('Orientation lock fallback:', err);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    if (onContinueAnyway) onContinueAnyway();
  };

  return (
    <div className="orientation-guard-overlay">
      <div className="orientation-guard-card">
        <div className="phone-rotate-icon">
          <Smartphone size={64} className="rotating-phone-svg" color="#38BDF8" />
          <RotateCw size={32} className="rotate-arrow-badge" color="#FDE047" />
        </div>

        <h2 className="orientation-title">Vui lòng xoay ngang điện thoại</h2>
        <p className="orientation-desc">
          Để thưởng thức bài thuyết trình chuẩn rạp chiếu 16:9 sắc nét và tương tác cùng các Bé Mascot Chibi nhé!
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300, marginTop: 8 }}>
          <button className="orientation-btn-action" onClick={requestLandscapeFullscreen}>
            Bật Toàn Màn Hình & Xoay Ngang
          </button>
          
          <button 
            onClick={handleDismiss}
            className="orientation-btn-dismiss"
          >
            Tiếp tục xem ở chế độ dọc
          </button>
        </div>
      </div>
    </div>
  );
}
