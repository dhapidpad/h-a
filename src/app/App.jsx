import { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDES } from '../data/slideData';
import Slide01Topic from '../slides/Slide01Topic';
import Slide02VideoIntro from '../slides/Slide02VideoIntro';
import Slide03Members from '../slides/Slide03Members';
import Slide04DamQ1 from '../slides/Slide04DamQ1';
import Slide05DamQ2 from '../slides/Slide05DamQ2';
import Slide06DamQ3 from '../slides/Slide06DamQ3';
import Slide07DamQ4 from '../slides/Slide07DamQ4';
import Slide08DamQ5 from '../slides/Slide08DamQ5';
import Slide09LanQ1 from '../slides/Slide09LanQ1';
import Slide10LanQ2 from '../slides/Slide10LanQ2';
import Slide11LanQ3 from '../slides/Slide11LanQ3';
import Slide12LanQ4 from '../slides/Slide12LanQ4';
import Slide13LanQ5 from '../slides/Slide13LanQ5';
import Slide14KaliQ1 from '../slides/Slide14KaliQ1';
import Slide15KaliQ2 from '../slides/Slide15KaliQ2';
import Slide16KaliQ3 from '../slides/Slide16KaliQ3';
import Slide17KaliQ4 from '../slides/Slide17KaliQ4';
import Slide18KaliQ5 from '../slides/Slide18KaliQ5';
import Slide19MiniGame from '../slides/Slide19MiniGame';
import Slide20Closing from '../slides/Slide20Closing';
import SlideNavigation from '../components/SlideNavigation';
import SpeakerNotesDrawer from '../components/SpeakerNotesDrawer';
import OrientationGuard from '../components/OrientationGuard';
import './theme.css';

// Chiều cao thanh điều hướng: thu gọn trên điện thoại ngang (màn hình thấp) để nhường chỗ cho nội dung
const dockHeightFor = (viewportH) => (viewportH < 520 ? 54 : 64);

// Phần tử đang tự xử lý bàn phím: không cướp phím điều hướng của chúng.
const isTextEntryTarget = (el) =>
  !!el && el.nodeType === 1 &&
  (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);
// Nút/liên kết: Space/Enter là phím kích hoạt gốc của trình duyệt, không dùng để chuyển slide.
const isActivationTarget = (el) =>
  !!el && el.nodeType === 1 && /^(BUTTON|A|SUMMARY)$/.test(el.tagName);

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPortraitWarning, setShowPortraitWarning] = useState(true);
  const [slideAnimClass, setSlideAnimClass] = useState('slide-glide-next');
  const [animKey, setAnimKey] = useState(0);
  const [stage, setStage] = useState({ zoom: 1, width: 1280, height: 720 });

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(0);
  const currentIndexRef = useRef(0);

  const currentSlide = SLIDES[currentSlideIndex];

  // Khung thiết kế tối thiểu 1280×720, phóng vừa màn hình và tràn kín phần còn lại (không viền thừa).
  // Dùng CSS zoom thay vì transform để chữ & SVG luôn sắc nét.
  // Throttle bằng requestAnimationFrame + bỏ qua cập nhật không đổi => xoay/resize không giật.
  useEffect(() => {
    let raf = 0;
    let lateTimer = 0;

    const fit = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const dockH = dockHeightFor(vh);
      const availH = vh - dockH;
      const zoom = Math.min(vw / 1280, availH / 720);
      const next = {
        zoom,
        width: Math.min(vw / zoom, 1760),
        height: availH / zoom
      };

      // Chiều cao thật của vùng nhìn thấy (100vh trên trình duyệt di động bị tính cả thanh địa chỉ)
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--app-h', `${vh}px`);
      rootStyle.setProperty('--dock-h', `${dockH}px`);

      setStage((prev) =>
        Math.abs(prev.zoom - next.zoom) < 0.0005 &&
        Math.abs(prev.width - next.width) < 0.5 &&
        Math.abs(prev.height - next.height) < 0.5
          ? prev
          : next
      );
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(fit);
    };
    // Sau khi xoay màn hình, trình duyệt di động cập nhật kích thước hơi trễ
    const onOrientation = () => {
      schedule();
      clearTimeout(lateTimer);
      lateTimer = setTimeout(schedule, 280);
    };

    fit();
    window.addEventListener('resize', schedule);
    window.addEventListener('orientationchange', onOrientation);
    return () => {
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', onOrientation);
      cancelAnimationFrame(raf);
      clearTimeout(lateTimer);
    };
  }, []);





  // Điểm vào DUY NHẤT để đổi slide: hướng animation luôn suy ra từ vị trí đích so với slide hiện tại
  // (Next/Prev, click thanh timeline, chương, Home/End). Đọc vị trí qua ref nên bấm nhanh không dùng giá trị cũ.
  const triggerSlideChange = useCallback((targetIndex) => {
    const from = currentIndexRef.current;
    if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= SLIDES.length) return;
    if (targetIndex === from) return;

    currentIndexRef.current = targetIndex;
    setCurrentSlideIndex(targetIndex);
    setSlideAnimClass(targetIndex > from ? 'slide-glide-next' : 'slide-glide-prev');
    setAnimKey((k) => k + 1); // đổi key => animation khởi động lại từ frame đầu ở mỗi lần đổi slide
  }, []);

  // Gỡ class animation khi animation của chính hộp chuyển slide kết thúc (bỏ qua animationend nổi bọt từ SVG con)
  const handleTransitionEnd = (e) => {
    if (e.target === e.currentTarget) setSlideAnimClass('');
  };

  // Tiến 1 slide
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      triggerSlideChange(currentSlideIndex + 1);
    }
  }, [currentSlideIndex, triggerSlideChange]);

  // Lùi 1 slide
  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      triggerSlideChange(currentSlideIndex - 1);
    }
  }, [currentSlideIndex, triggerSlideChange]);

  // Nhảy trực tiếp đến chương chỉ định (Mở đầu, Đạm, Lân, Kali, Tổng kết)
  const goToChapter = useCallback((chapterId) => {
    const targetIdx = SLIDES.findIndex(s => s.chapter.id === chapterId);
    if (targetIdx !== -1) triggerSlideChange(targetIdx);
  }, [triggerSlideChange]);

  // Toàn màn hình: state luôn lấy từ trình duyệt qua sự kiện fullscreenchange
  // (Esc, UI trình duyệt, nút của intro/orientation guard đều được đồng bộ).
  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    sync();
    document.addEventListener('fullscreenchange', sync);
    return () => document.removeEventListener('fullscreenchange', sync);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        console.warn('Trình duyệt này không hỗ trợ toàn màn hình (iOS Safari: dùng "Thêm vào Màn hình chính").');
      }
    } catch (err) {
      console.warn('Fullscreen toggle:', err);
    }
  }, []);

  // Điều khiển bằng phím tắt
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.defaultPrevented || e.repeat) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTextEntryTarget(e.target)) return;
      // Space/Enter trên nút hay liên kết thuộc về chính nút đó
      if (isActivationTarget(e.target) && (e.key === ' ' || e.key === 'Enter')) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goToNextSlide();
          break;

        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goToPrevSlide();
          break;

        case 'Home':
          e.preventDefault();
          triggerSlideChange(0);
          break;

        case 'End':
          e.preventDefault();
          triggerSlideChange(SLIDES.length - 1);
          break;

        // Phím số 1-5 chuyển nhanh 5 phần
        case '1':
          goToChapter('INTRO');
          break;
        case '2':
          goToChapter('DAM');
          break;
        case '3':
          goToChapter('LAN');
          break;
        case '4':
          goToChapter('KALI');
          break;
        case '5':
          goToChapter('CLOSING');
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          setIsNotesOpen((prev) => !prev);
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          toggleFullscreen();
          break;

        case 'Escape':
          if (isNotesOpen) setIsNotesOpen(false);
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, triggerSlideChange, goToChapter, isNotesOpen, toggleFullscreen]);

  // Thao tác vuốt trên thiết bị di động
  // - Bỏ qua vùng đánh dấu data-no-swipe (câu hỏi minigame) để chạm/cuộn không bị nhảy slide ngoài ý muốn
  // - Chỉ tính là vuốt khi chuyển động chủ yếu theo chiều ngang
  const handleTouchStart = (e) => {
    const target = e.target;
    if (target && target.closest && target.closest('[data-no-swipe]')) {
      touchStartXRef.current = null;
      return;
    }
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
      if (diffX > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  // Render từng Slide độc lập từ thư mục src/slides/
  const renderCurrentSlide = () => {
    switch (currentSlide.id) {
      case 1:
        return <Slide01Topic slide={currentSlide} onNext={goToNextSlide} />;
      case 2:
        return <Slide02VideoIntro slide={currentSlide} onNext={goToNextSlide} />;
      case 3:
        return <Slide03Members slide={currentSlide} />;
      case 4:
        return <Slide04DamQ1 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 5:
        return <Slide05DamQ2 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 6:
        return <Slide06DamQ3 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 7:
        return <Slide07DamQ4 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 8:
        return <Slide08DamQ5 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 9:
        return <Slide09LanQ1 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 10:
        return <Slide10LanQ2 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 11:
        return <Slide11LanQ3 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 12:
        return <Slide12LanQ4 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 13:
        return <Slide13LanQ5 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 14:
        return <Slide14KaliQ1 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 15:
        return <Slide15KaliQ2 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 16:
        return <Slide16KaliQ3 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 17:
        return <Slide17KaliQ4 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 18:
        return <Slide18KaliQ5 slide={currentSlide} onOpenNotes={() => setIsNotesOpen(true)} />;
      case 19:
        return <Slide19MiniGame slide={currentSlide} onNext={goToNextSlide} stage={stage} />;
      case 20:
        return <Slide20Closing slide={currentSlide} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`presentation-viewport chapter-${currentSlide.chapter.id.toLowerCase()}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Lớp bảo vệ xoay màn hình điện thoại dọc (chỉ kích hoạt trên mobile) */}
      {showPortraitWarning && (
        <OrientationGuard onContinueAnyway={() => setShowPortraitWarning(false)} />
      )}

      {/* Sân khấu trình chiếu tràn viền Full Screen */}
      <div className="slide-stage-container">
        <main className="slide-canvas" style={{ zoom: stage.zoom, width: stage.width, height: stage.height }}>
          <div key={animKey} className={`slide-transition-box ${slideAnimClass}`} onAnimationEnd={handleTransitionEnd}>
            {renderCurrentSlide()}
          </div>
        </main>
      </div>

      {/* Thanh điều hướng chân trang */}
      <SlideNavigation 
        currentIndex={currentSlideIndex}
        totalSlides={SLIDES.length}
        chapter={currentSlide.chapter}
        onPrev={goToPrevSlide}
        onNext={goToNextSlide}
        onSelectSlide={(idx) => triggerSlideChange(idx)}
        onToggleNotes={() => setIsNotesOpen(!isNotesOpen)}
        isNotesOpen={isNotesOpen}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Ngăn kéo Speaker Notes (Nhấn N hoặc bấm Mascot để mở) */}
      <SpeakerNotesDrawer 
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slide={currentSlide}
      />
    </div>
  );
}
