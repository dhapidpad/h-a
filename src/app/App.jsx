import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SLIDES, CHAPTERS } from '../data/slideData';
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
import Slide19Closing from '../slides/Slide19Closing';
import SlideNavigation from '../components/SlideNavigation';
import SpeakerNotesDrawer from '../components/SpeakerNotesDrawer';
import OrientationGuard from '../components/OrientationGuard';
import './theme.css';

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPortraitWarning, setShowPortraitWarning] = useState(true);
  const [slideAnimClass, setSlideAnimClass] = useState('slide-glide-next');

  const touchStartXRef = useRef(null);
  const animTimeoutRef = useRef(null);

  const currentSlide = SLIDES[currentSlideIndex];

  // Chuyển slide siêu tốc, mượt mà 60fps không bị khựng
  const triggerSlideChange = useCallback((targetIndex, direction = 'next') => {
    if (targetIndex < 0 || targetIndex >= SLIDES.length) return;
    if (targetIndex === currentSlideIndex) return;

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

    setCurrentSlideIndex(targetIndex);
    setSlideAnimClass(direction === 'next' ? 'slide-glide-next' : 'slide-glide-prev');

    animTimeoutRef.current = setTimeout(() => {
      setSlideAnimClass('');
    }, 350);
  }, [currentSlideIndex]);

  // Tiến 1 slide
  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < SLIDES.length - 1) {
      triggerSlideChange(currentSlideIndex + 1, 'next');
    }
  }, [currentSlideIndex, triggerSlideChange]);

  // Lùi 1 slide
  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      triggerSlideChange(currentSlideIndex - 1, 'prev');
    }
  }, [currentSlideIndex, triggerSlideChange]);

  // Nhảy trực tiếp đến chương chỉ định (Mở đầu, Đạm, Lân, Kali, Tổng kết)
  const goToChapter = useCallback((chapterId) => {
    const targetIdx = SLIDES.findIndex(s => s.chapter.id === chapterId);
    if (targetIdx !== -1 && targetIdx !== currentSlideIndex) {
      const dir = targetIdx > currentSlideIndex ? 'next' : 'prev';
      triggerSlideChange(targetIdx, dir);
    }
  }, [currentSlideIndex, triggerSlideChange]);

  // Điều khiển bằng phím tắt
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

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
          triggerSlideChange(0, 'prev');
          break;

        case 'End':
          e.preventDefault();
          triggerSlideChange(SLIDES.length - 1, 'next');
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
  }, [goToNextSlide, goToPrevSlide, triggerSlideChange, goToChapter, isNotesOpen]);

  // Thao tác vuốt trên thiết bị di động
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;

    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  // Toàn màn hình
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.warn('Fullscreen toggle:', err);
    }
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
        return <Slide19Closing slide={currentSlide} />;
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
        <main className="slide-content-area">
          <div className={`slide-transition-box ${slideAnimClass}`}>
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
        onSelectSlide={triggerSlideChange}
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
