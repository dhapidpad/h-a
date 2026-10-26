import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { flushSync } from 'react-dom';
import { SLIDES } from '../data/slideData';
import { SlideComponents, loadSlide } from './slideRegistry';
import SlideNavigation from '../components/SlideNavigation';
import SpeakerNotesDrawer from '../components/SpeakerNotesDrawer';
import OrientationGuard from '../components/OrientationGuard';
import './theme.css';
import './theme-fix.css';

const BASE_STAGE_WIDTH = 1280;
const BASE_STAGE_HEIGHT = 720;
const FALLBACK_TRANSITION_MS = 300;

// Chiều cao thanh điều hướng: thu gọn trên điện thoại ngang (màn hình thấp) để nhường chỗ cho nội dung
const dockHeightFor = (viewportH) =>
  typeof document !== 'undefined' && document.documentElement.dataset.pfs ? 0 : viewportH < 520 ? 52 : 64;

// Phần tử đang tự xử lý bàn phím: không cướp phím điều hướng của chúng.
const isTextEntryTarget = (el) =>
  !!el &&
  el.nodeType === 1 &&
  (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);

// Nút/liên kết/slider: Space/Enter/Arrow là phím điều khiển nội bộ của phần tử đó, không nhảy slide.
const isActivationTarget = (el) =>
  !!el &&
  el.nodeType === 1 &&
  (/^(BUTTON|A|SUMMARY)$/.test(el.tagName) || el.getAttribute?.('role') === 'slider');

const isSliderTarget = (el) =>
  !!el &&
  el.nodeType === 1 &&
  ((el.tagName === 'INPUT' && el.type === 'range') || el.getAttribute?.('role') === 'slider');

const hasVT = false; // Tắt View Transitions: snapshot SVG lớn gây giật; dùng crossfade opacity nhẹ
const prefersReduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// CSS animation-play-state does not pause SVG SMIL animation; pause SVG roots too during transitions.
const pauseSvgMotion = () => {
  return;
  // eslint-disable-next-line no-unreachable
  const paused = false;
  if (typeof document === 'undefined') return;
  document.querySelectorAll('svg').forEach((svg) => {
    try {
      if (paused && typeof svg.pauseAnimations === 'function') svg.pauseAnimations();
      if (!paused && typeof svg.unpauseAnimations === 'function') svg.unpauseAnimations();
    } catch {
      // Unsupported SVG animation controls should never break slide navigation.
    }
  });
};

// Dừng toàn bộ media (video/audio) đang phát trên trang trước khi rời slide 2 để tránh rò âm thanh
const stopActiveMedia = () => {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('video, audio').forEach((media) => {
    try {
      if (!media.paused) media.pause();
    } catch {
      // Ignore media pause errors
    }
  });
};

const BG_CHAPTERS = ['intro', 'dam', 'lan', 'kali', 'game', 'closing'];

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [leaving, setLeaving] = useState(null); // { index, dir, sequence } cho Tầng B (Overlap Stack fallback)
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPortraitWarning, setShowPortraitWarning] = useState(true);
  const [stage, setStage] = useState({
    scale: 1,
    zoom: 1,
    width: BASE_STAGE_WIDTH,
    height: BASE_STAGE_HEIGHT
  });

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(0);
  const currentIndexRef = useRef(0);
  const navigationRequestRef = useRef(0);
  const transitionSequenceRef = useRef(0);
  const fallbackTimerRef = useRef(0);
  const fontsReadyRef = useRef(false);

  const currentSlide = SLIDES[currentSlideIndex] || SLIDES[0];
  const currentChapterKey = currentSlide.chapter.id.toLowerCase();

  // Chờ font sẵn sàng trước lần chuyển cảnh đầu tiên để không dịch layout (FOUT)
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        fontsReadyRef.current = true;
      });
    } else {
      fontsReadyRef.current = true;
    }
  }, []);

  // Prefetch các slide lân cận (+1, +2, -1) lúc trình duyệt rảnh
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

  // Mục 9.1: Khung thiết kế cố định 16:9 (1280×720), tính scale duy nhất trừ dock/nav, không kéo giãn trên ultrawide
  useEffect(() => {
    let raf = 0;
    let lateTimer = 0;

    const fit = () => {
      raf = 0;
      const vw = Math.max(320, window.innerWidth);
      const vh = Math.max(240, window.innerHeight);
      const dockH = dockHeightFor(vh);
      const availH = Math.max(180, vh - dockH);
      const scale = Math.min(vw / BASE_STAGE_WIDTH, availH / BASE_STAGE_HEIGHT);

      const next = {
        scale,
        zoom: scale,
        width: BASE_STAGE_WIDTH,
        height: BASE_STAGE_HEIGHT
      };

      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--app-h', `${vh}px`);
      rootStyle.setProperty('--dock-h', `${dockH}px`);
      rootStyle.setProperty('--stage-scale', `${scale}`);

      setStage((prev) =>
        Math.abs(prev.scale - next.scale) < 0.0005 &&
        prev.width === next.width &&
        prev.height === next.height
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

  // Cleanup dự phòng khi component unmount
  useEffect(() => {
    return () => {
      clearTimeout(fallbackTimerRef.current);
      delete document.documentElement.dataset.vt;
      delete document.documentElement.dataset.dir;
    };
  }, []);

  // Mục 8.2: Chuyển cảnh kiểu Morph bằng View Transitions API + Fallback Overlap Stack (latest-wins + safe cleanup)
  const triggerSlideChange = useCallback(async (targetIndex) => {
    const from = currentIndexRef.current;
    if (!Number.isInteger(targetIndex) || targetIndex < 0 || targetIndex >= SLIDES.length) return;
    if (targetIndex === from) return;

    // Dừng ngay video/audio nếu đang rời khỏi slide có media (vd. Slide 2)
    stopActiveMedia();

    const requestId = ++navigationRequestRef.current;
    // Cập nhật ref ngay lập tức để bấm phím liên tiếp luôn tính đúng slide kế tiếp
    currentIndexRef.current = targetIndex;
    const dir = targetIndex > from ? 'next' : 'prev';

    // 1) Nạp trước chunk của slide đích (đã prefetch nên gần như tức thì) + đảm bảo font sẵn sàng
    try {
      if (!fontsReadyRef.current && document.fonts && document.fonts.ready) {
        await Promise.all([loadSlide(SLIDES[targetIndex].id), document.fonts.ready]);
        fontsReadyRef.current = true;
      } else {
        await loadSlide(SLIDES[targetIndex].id);
      }
    } catch (err) {
      console.warn('Slide chunk load warning:', err);
    }

    // Nếu trong lúc chờ chunk đã có lệnh chuyển sang slide khác mới hơn thì bỏ qua lần cũ
    if (requestId !== navigationRequestRef.current || currentIndexRef.current !== targetIndex) return;
    const root = document.documentElement;
    const transitionId = ++transitionSequenceRef.current;
    clearTimeout(fallbackTimerRef.current);

    // Nhánh giảm chuyển động: đổi trực tiếp không hiệu ứng và luôn dọn trạng thái chuyển cảnh trước đó.
    if (prefersReduced()) {
      setLeaving(null);
      setCurrentSlideIndex(targetIndex);
      delete root.dataset.dir;
      delete root.dataset.vt;
      pauseSvgMotion(false);
      return;
    }

    // SVG SMIL (animateMotion/animateTransform) cũng cần tạm dừng để tránh rung khi chụp/cắt cảnh.
    pauseSvgMotion(true);

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
            // Chỉ transition mới nhất được phép dọn trạng thái, tránh race khi bấm Next liên tục.
            if (transitionSequenceRef.current === transitionId) {
              delete root.dataset.dir;
              delete root.dataset.vt;
              pauseSvgMotion(false);
            }
          });
        return;
      } catch {
        delete root.dataset.dir;
        delete root.dataset.vt;
        // Tiếp tục xuống Tầng B fallback nếu startViewTransition ném lỗi
      }
    }

    // Tầng B: Overlap Stack fallback (chỉ giữ 1 slide leaving và 1 slide active trong ~420ms)
    root.dataset.vt = '1';
    root.dataset.dir = dir;
    setLeaving({ index: from, dir, sequence: transitionId });
    setCurrentSlideIndex(targetIndex);

    // Timeout dự phòng nếu animationend không kích hoạt (ví dụ tab ẩn hoặc CSS bị ghi đè)
    fallbackTimerRef.current = setTimeout(() => {
      if (transitionSequenceRef.current === transitionId) {
        setLeaving(null);
        delete root.dataset.vt;
        delete root.dataset.dir;
        pauseSvgMotion(false);
      }
    }, FALLBACK_TRANSITION_MS);
  }, []);

  const handleLeavingEnd = useCallback((e) => {
    const eventSequence = Number(e.currentTarget?.dataset?.transitionId);
    if (e.target === e.currentTarget && eventSequence === transitionSequenceRef.current) {
      clearTimeout(fallbackTimerRef.current);
      setLeaving(null);
      delete document.documentElement.dataset.vt;
      delete document.documentElement.dataset.dir;
      pauseSvgMotion(false);
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
  const goToChapter = useCallback(
    (chapterId) => {
      const targetIdx = SLIDES.findIndex((s) => s.chapter.id === chapterId);
      if (targetIdx !== -1) triggerSlideChange(targetIdx);
    },
    [triggerSlideChange]
  );

  // Pause SVG SMIL in the newly mounted slide too during active transition.
  useEffect(() => {
    if (document.documentElement.dataset.vt) pauseSvgMotion(true);
  }, [currentSlideIndex, leaving]);

  // Toàn màn hình
  useEffect(() => {
    const sync = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement || document.documentElement.dataset.pfs));
      window.dispatchEvent(new Event('resize'));
    };
    sync();
    document.addEventListener('fullscreenchange', sync);
    document.addEventListener('webkitfullscreenchange', sync);
    return () => {
      document.removeEventListener('fullscreenchange', sync);
      document.removeEventListener('webkitfullscreenchange', sync);
    };
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const doc = document;
    const el = doc.documentElement;
    const isFs = () => Boolean(doc.fullscreenElement || doc.webkitFullscreenElement);
    const reflow = () => {
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => window.dispatchEvent(new Event('resize')), 250);
    };
    try {
      if (isFs()) {
        await (doc.exitFullscreen?.() || doc.webkitExitFullscreen?.());
      } else if (el.dataset.pfs) {
        delete el.dataset.pfs;
        setIsFullscreen(false);
        reflow();
      } else if (el.requestFullscreen || el.webkitRequestFullscreen) {
        await (el.requestFullscreen?.({ navigationUI: 'hide' }) || el.webkitRequestFullscreen?.());
      } else {
        // Trình duyệt không hỗ trợ Fullscreen API (vd. iPhone): ẩn thanh điều hướng, dùng toàn bộ khung nhìn
        el.dataset.pfs = '1';
        setIsFullscreen(true);
        reflow();
      }
    } catch (err) {
      // API bị chặn (iframe/chính sách trình duyệt) -> chuyển sang chế độ toàn khung nhìn
      el.dataset.pfs = '1';
      setIsFullscreen(true);
      reflow();
    }
  }, []);

  // Điều khiển bằng phím tắt (Mục 7.4 & 8.4)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.defaultPrevented || e.repeat) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (isTextEntryTarget(e.target)) return;
      if (isSliderTarget(e.target) && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ')) {
        return;
      }
      if (isActivationTarget(e.target) && (e.key === ' ' || e.key === 'Enter')) return;

      const activeSlide = SLIDES[currentIndexRef.current];
      const isVideoSlide = activeSlide?.type === 'video_intro';

      switch (e.key) {
        case ' ':
          // Ở Slide 2 (video intro), phím Space dành cho Play/Pause của trình phát video
          if (isVideoSlide) return;
          e.preventDefault();
          goToNextSlide();
          break;
        case 'ArrowRight':
        case 'PageDown':
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
          // Ở Slide 2, phím F do trình phát video xử lý fullscreen khung rạp chiếu
          if (isVideoSlide) return;
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'Escape':
          if (isNotesOpen) {
            e.preventDefault();
            setIsNotesOpen(false);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, triggerSlideChange, goToChapter, isNotesOpen, toggleFullscreen]);

  // Thao tác vuốt trên thiết bị di động (vô hiệu trên vùng player/minigame có data-no-swipe)
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

  const renderSlide = (slideObj, isLeavingLayer = false) => {
    if (!slideObj) return null;
    // Mục 2 / P1.3 & 7.3: Không mount lại trình phát video hoặc mini game ở lớp slide đang rời đi
    if (isLeavingLayer && (slideObj.type === 'video_intro' || slideObj.type === 'game')) {
      return (
        <div
          className="slide-leaving-placeholder"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 24,
            background: slideObj.type === 'video_intro' ? '#10251E' : '#F7F5EC'
          }}
        />
      );
    }
    const Comp = SlideComponents[slideObj.id];
    if (!Comp) return null;
    return (
      <Suspense fallback={null}>
        <Comp
          key={slideObj.id}
          slide={slideObj}
          onNext={goToNextSlide}
          onOpenNotes={openNotes}
          stage={stage}
          isLeaving={isLeavingLayer}
        />
      </Suspense>
    );
  };

  const isDarkStage = currentSlide.type === 'video_intro';

  return (
    <div
      className={`presentation-viewport chapter-${currentChapterKey}${isDarkStage ? ' is-dark-stage' : ''}`}
      data-slide-id={currentSlide.id}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Các lớp nền theo chương xếp chồng, crossfade bằng opacity trên compositor */}
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

      {/* Sân khấu trình chiếu 16:9 cố định 1280×720 căn giữa theo cả 2 trục */}
      <div className="slide-stage-container">
        <div
          className="slide-scale-frame"
          style={{
            width: Math.round(stage.width * stage.scale),
            height: Math.round(stage.height * stage.scale)
          }}
        >
          <main
            className="slide-canvas"
            style={{
              width: stage.width,
              height: stage.height,
              transform: `scale(${stage.scale})`,
              transformOrigin: 'top left'
            }}
          >
            {leaving && SLIDES[leaving.index] && (
              <div
                key={`out-${leaving.index}-${leaving.sequence}`}
                className={`slide-layer is-leaving dir-${leaving.dir} chapter-${SLIDES[leaving.index].chapter.id.toLowerCase()}`}
                data-transition-id={leaving.sequence}
                aria-hidden="true"
                onAnimationEnd={handleLeavingEnd}
              >
                {renderSlide(SLIDES[leaving.index], true)}
              </div>
            )}

            <div
              key={`active-${currentSlideIndex}`}
              className={`slide-transition-box slide-layer ${leaving ? `is-entering dir-${leaving.dir}` : ''}`}
            >
              {renderSlide(currentSlide, false)}
            </div>
          </main>
        </div>
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
