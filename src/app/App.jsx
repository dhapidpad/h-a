import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { flushSync } from 'react-dom';
import { SLIDES } from '../data/slideData';
import { SlideComponents, loadSlide } from './slideRegistry';
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

const hasVT = typeof document !== 'undefined' && 'startViewTransition' in document;
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const BG_CHAPTERS = ['intro', 'dam', 'lan', 'kali', 'game', 'closing'];

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [leaving, setLeaving] = useState(null); // { index, dir } cho Tầng B (Overlap Stack fallback)
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPortraitWarning, setShowPortraitWarning] = useState(true);
  const [stage, setStage] = useState({ zoom: 1, width: 1280, height: 720 });

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(0);
  const currentIndexRef = useRef(0);
  const fontsReadyRef = useRef(false);

  const currentSlide = SLIDES[currentSlideIndex];
  const currentChapterKey = currentSlide.chapter.id.toLowerCase();

  // Mục 7.2: Chờ font sẵn sàng trước lần chuyển cảnh đầu tiên để không dịch layout (FOUT)
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsReadyRef.current = true;
      });
    } else {
      fontsReadyRef.current = true;
    }
  }, []);

  // Mục 3.2: Prefetch các slide lân cận (+1, +2, -1) lúc trình duyệt rảnh
  useEffect(() => {
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 220));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const h = idle(() => {
      [1, 2, -1].forEach((d) => {
        const s = SLIDES[currentSlideIndex + d];
        if (s) loadSlide(s.id);
      });
    });
    return () => cancel(h);
  }, [currentSlideIndex]);

  // Khung thiết kế tối thiểu 1280×720, phóng vừa màn hình và tràn kín phần còn lại
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

  // Mục 2.1 & 2.3: Chuyển cảnh kiểu Morph bằng View Transitions API + Fallback Overlap Stack
  const triggerSlideChange = useCallback(async (targetIndex) => {
    const from = currentIndexRef.current;
    if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= SLIDES.length) return;
    if (targetIndex === from) return;

    // Cập nhật ref ngay lập tức để bấm phím liên tiếp luôn tính đúng slide kế tiếp
    currentIndexRef.current = targetIndex;
    const dir = targetIndex > from ? 'next' : 'prev';

    // 1) Nạp trước chunk của slide đích (đã prefetch nên gần như tức thì) + đảm bảo font sẵn sàng
    if (!fontsReadyRef.current && document.fonts && document.fonts.ready) {
      await Promise.all([loadSlide(SLIDES[targetIndex].id), document.fonts.ready]);
      fontsReadyRef.current = true;
    } else {
      await loadSlide(SLIDES[targetIndex].id);
    }

    // Nếu trong lúc chờ chunk đã có lệnh chuyển sang slide khác mới hơn thì bỏ qua lần cũ
    if (currentIndexRef.current !== targetIndex) return;
    const root = document.documentElement;

    // Nhánh giảm chuyển động: đổi trực tiếp không hiệu ứng
    if (prefersReduced()) {
      setLeaving(null);
      setCurrentSlideIndex(targetIndex);
      return;
    }

    // Tầng A: View Transitions API (native Morph)
    if (hasVT) {
      root.dataset.dir = dir;
      root.dataset.vt = '1';
      try {
        const t = document.startViewTransition(() => {
          flushSync(() => {
            setLeaving(null);
            setCurrentSlideIndex(targetIndex);
          });
        });
        t.ready?.catch(() => {});
        t.updateCallbackDone?.catch(() => {});
        t.finished
          .catch(() => {})
          .finally(() => {
            if (currentIndexRef.current === targetIndex) {
              delete root.dataset.dir;
              delete root.dataset.vt;
            }
          });
        return;
      } catch {
        delete root.dataset.dir;
        delete root.dataset.vt;
      }
    }

    // Tầng B: Overlap Stack fallback (2 slide cùng tồn tại trong ~450ms, crossfade mượt)
    root.dataset.vt = '1';
    setLeaving({ index: from, dir });
    setCurrentSlideIndex(targetIndex);
  }, []);

  const handleLeavingEnd = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setLeaving(null);
      delete document.documentElement.dataset.vt;
    }
  }, []);

  // Tiến 1 slide
  const goToNextSlide = useCallback(() => {
    const cur = currentIndexRef.current;
    if (cur < SLIDES.length - 1) {
      triggerSlideChange(cur + 1);
    }
  }, [triggerSlideChange]);

  // Lùi 1 slide
  const goToPrevSlide = useCallback(() => {
    const cur = currentIndexRef.current;
    if (cur > 0) {
      triggerSlideChange(cur - 1);
    }
  }, [triggerSlideChange]);

  // Nhảy trực tiếp đến chương chỉ định
  const goToChapter = useCallback((chapterId) => {
    const targetIdx = SLIDES.findIndex((s) => s.chapter.id === chapterId);
    if (targetIdx !== -1) triggerSlideChange(targetIdx);
  }, [triggerSlideChange]);

  // Toàn màn hình
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

  const openNotes = useCallback(() => setIsNotesOpen(true), []);

  const renderSlide = (slideObj) => {
    if (!slideObj) return null;
    const Comp = SlideComponents[slideObj.id];
    if (!Comp) return null;
    return (
      <Suspense fallback={null}>
        <Comp
          slide={slideObj}
          onNext={goToNextSlide}
          onOpenNotes={openNotes}
          stage={stage}
        />
      </Suspense>
    );
  };

  return (
    <div
      className={`presentation-viewport chapter-${currentChapterKey}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mục 2.5: Các lớp nền theo chương xếp chồng, crossfade bằng opacity trên compositor */}
      <div className="bg-stack" aria-hidden="true">
        {BG_CHAPTERS.map((c) => (
          <div
            key={c}
            className={`bg-layer bg-${c} ${currentChapterKey === c ? 'is-on' : ''}`}
          />
        ))}
      </div>

      {/* Lớp bảo vệ xoay màn hình điện thoại dọc */}
      {showPortraitWarning && (
        <OrientationGuard onContinueAnyway={() => setShowPortraitWarning(false)} />
      )}

      {/* Sân khấu trình chiếu tràn viền Full Screen */}
      <div className="slide-stage-container">
        <main
          className="slide-canvas"
          style={{ zoom: stage.zoom, width: stage.width, height: stage.height }}
        >
          {leaving && SLIDES[leaving.index] && (
            <div
              key={`out-${leaving.index}`}
              className={`slide-layer is-leaving dir-${leaving.dir} chapter-${SLIDES[leaving.index].chapter.id.toLowerCase()}`}
              aria-hidden="true"
              onAnimationEnd={handleLeavingEnd}
            >
              {renderSlide(SLIDES[leaving.index])}
            </div>
          )}

          <div
            key={leaving ? `in-${currentSlideIndex}` : 'active-slide'}
            className={`slide-transition-box slide-layer ${leaving ? `is-entering dir-${leaving.dir}` : ''}`}
          >
            {renderSlide(currentSlide)}
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
        onToggleNotes={() => setIsNotesOpen((v) => !v)}
        isNotesOpen={isNotesOpen}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Ngăn kéo Speaker Notes */}
      <SpeakerNotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slide={currentSlide}
      />
    </div>
  );
}
