import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { LinhThuDam, LinhThuLan, LinhThuKali } from '../components/mascot/CuteMascot';

/* ==================================================================
   CẤU HÌNH & HÀM TIỆN ÍCH (MỤC 5 - SLIDE 02 & MỤC 7 MASTER SPEC)
   - Tốc độ mặc định: 1× (DEFAULT_RATE = 1)
   - Thời lượng thật của video_intro_720.mp4: ~51.77 giây (~52 giây)
   - Lưu currentTime trong phiên để khi quay lại slide 2 trong cùng phiên
     vẫn giữ vị trí hợp lý, tốc độ mặc định mở mới là 1×.
================================================================== */
const DEFAULT_RATE = 1;
const RATES = [1, 1.25, 1.5, 2];
const FALLBACK_DURATION = 51.77;
const HIDE_CONTROLS_MS = 2800;
const BUFFER_TIMEOUT_MS = 8500;

let sessionLastTime = 0;

const formatTime = (s) => {
  if (!Number.isFinite(s) || s < 0) return '00:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};
const clamp01 = (n) => Math.max(0, Math.min(1, n));

const resolveAssetUrl = (path) => {
  const base = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

async function startPlayback(video, rate = DEFAULT_RATE) {
  if (!video) return { playing: false, blocked: true, mutedFallback: false };
  video.defaultPlaybackRate = rate;
  video.playbackRate = rate;
  video.volume = 1;
  video.muted = false;
  try {
    await video.play();
    return { playing: true, blocked: false, mutedFallback: false };
  } catch {
    // Trình duyệt chặn autoplay có tiếng -> thử muted autoplay theo Mục 5 & 7.1
    video.muted = true;
    try {
      await video.play();
      return { playing: true, blocked: false, mutedFallback: true };
    } catch {
      // Cả muted autoplay cũng bị chặn -> hiện nút Play lớn, không treo buffering
      return { playing: false, blocked: true, mutedFallback: true };
    }
  }
}

const CSS = `
.v2-root{display:flex;flex-direction:column;height:100%;gap:10px;position:relative;overflow:hidden;
  animation:v2In .45s var(--ease-out) both}
@keyframes v2In{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

.v2-header{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-shrink:0}
.v2-title-group{display:flex;flex-direction:column;gap:2px;min-width:0}
.v2-title{font-family:var(--font-display);font-size:27px;font-weight:900;color:#F7F5EC;line-height:1.15;margin:0;letter-spacing:-.02em}
.v2-sub{font-size:14.5px;font-weight:600;color:#DCECE4;margin:0}

.v2-stage{position:relative;flex:1;min-height:0;border-radius:22px;overflow:hidden;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(120% 90% at 50% 0%,#174B37 0%,#10251E 75%);
  box-shadow:0 20px 48px rgba(0,0,0,.38),0 0 0 1.5px rgba(255,255,255,.14)}
.v2-stage.hide-cursor{cursor:none}
.v2-video-wrap{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.v2-video-wrap::after{content:'';position:absolute;inset:0;background:rgba(16,37,30,.64);opacity:0;pointer-events:none;transition:opacity .35s var(--ease-out)}
.v2-video-wrap.dim::after{opacity:1}
.v2-video{width:100%;height:100%;object-fit:contain;display:block;background:#081410;transition:opacity .35s var(--ease-out)}
.v2-video.loading{opacity:.45}

.v2-chip{position:absolute;top:14px;z-index:15;display:flex;align-items:center;gap:8px;padding:6px 13px;border-radius:999px;
  background:rgba(16,37,30,.82);border:1px solid rgba(255,255,255,.18);color:#F7F5EC;font-size:12.5px;font-weight:700;
  transition:opacity .28s ease,transform .28s ease}
.v2-chip.l{left:14px}.v2-chip.r{right:14px;font-variant-numeric:tabular-nums}
.v2-chip.off{opacity:0;transform:translateY(-6px);pointer-events:none}
.v2-dot{width:8px;height:8px;border-radius:50%;background:#16A36A}
.v2-dot.live{box-shadow:0 0 8px #16A36A}

.v2-unmute{position:absolute;top:54px;left:50%;transform:translateX(-50%);z-index:30;display:flex;align-items:center;gap:10px;
  padding:9px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.55);cursor:pointer;color:#fff;font-size:13.5px;font-weight:800;
  background:linear-gradient(135deg,#16A36A,#174B37);box-shadow:0 10px 26px rgba(16,37,30,.5);
  animation:v2Pop .38s var(--ease-out) both}
@keyframes v2Pop{from{opacity:0;transform:translateX(-50%) translateY(-8px) scale(.94)}to{opacity:1;transform:translateX(-50%)}}

.v2-big{position:absolute;z-index:20;width:82px;height:82px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;
  color:#174B37;background:rgba(247,245,236,.96);box-shadow:0 16px 38px rgba(0,0,0,.42);
  transition:transform .2s var(--ease-out)}
.v2-big:hover{transform:scale(1.07)}

.v2-spin{position:absolute;z-index:18;color:#F7F5EC;animation:v2Rot 1s linear infinite}
@keyframes v2Rot{to{transform:rotate(360deg)}}

.v2-error{position:absolute;inset:0;z-index:26;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;
  padding:24px;text-align:center;background:rgba(16,37,30,.86);color:#F7F5EC}

.v2-controls{position:absolute;left:0;right:0;bottom:0;z-index:20;padding:24px 18px 12px;display:flex;flex-direction:column;gap:4px;
  background:linear-gradient(180deg,transparent 0%,rgba(10,24,19,.94) 100%);transition:opacity .28s ease,transform .28s ease}
.v2-controls.off{opacity:0;transform:translateY(8px);pointer-events:none}

.v2-bar{position:relative;height:20px;display:flex;align-items:center;cursor:pointer;touch-action:none}
.v2-track{position:relative;width:100%;height:5px;border-radius:999px;background:rgba(255,255,255,.24);transition:height .15s ease}
.v2-bar:hover .v2-track,.v2-bar.drag .v2-track{height:8px}
.v2-buf{position:absolute;left:0;top:0;height:100%;width:0;border-radius:inherit;background:rgba(255,255,255,.32);pointer-events:none}
.v2-fill{position:absolute;left:0;top:0;height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,#16A36A,#86EFAC);pointer-events:none}
.v2-thumb{position:absolute;right:-7px;top:50%;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.45);
  transform:translateY(-50%) scale(0);transition:transform .15s ease}
.v2-bar:hover .v2-thumb,.v2-bar.drag .v2-thumb{transform:translateY(-50%) scale(1)}
.v2-tip{position:absolute;bottom:24px;left:0;padding:3px 8px;border-radius:7px;background:rgba(16,37,30,.95);color:#fff;font-size:11.5px;font-weight:700;
  font-variant-numeric:tabular-nums;transform:translateX(-50%);opacity:0;pointer-events:none;transition:opacity .12s}
.v2-bar:hover .v2-tip,.v2-bar.drag .v2-tip{opacity:1}

.v2-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.v2-grp{display:flex;align-items:center;gap:6px}
.v2-btn{width:36px;height:36px;border:0;border-radius:10px;background:none;color:#fff;cursor:pointer;display:grid;place-items:center;transition:background .18s ease,color .18s ease}
.v2-btn:hover{background:rgba(255,255,255,.14)}
.v2-btn:focus-visible,.v2-bar:focus-visible,.v2-skip:focus-visible,.v2-rate:focus-visible,.v2-big:focus-visible{outline:2px solid #86EFAC;outline-offset:2px}
.v2-time{font-size:13px;font-weight:700;color:#F7F5EC;font-variant-numeric:tabular-nums;margin-left:4px}
.v2-time i{font-style:normal;opacity:.55;margin:0 4px}
.v2-vol{width:72px;height:4px;accent-color:#16A36A;cursor:pointer}
.v2-rate{min-width:48px;padding:4px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.12);color:#fff;
  font-size:12.5px;font-weight:800;cursor:pointer;transition:background .18s ease}
.v2-rate:hover{background:rgba(255,255,255,.22)}
.v2-skip{display:flex;align-items:center;gap:6px;padding:7px 14px;border:0;border-radius:10px;color:#fff;font-size:13px;font-weight:800;cursor:pointer;
  background:linear-gradient(135deg,#16A36A,#174B37);box-shadow:0 6px 16px rgba(22,163,106,.35);transition:transform .18s ease}
.v2-skip:hover{transform:translateY(-1px)}

.v2-end{position:absolute;inset:0;z-index:25;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;text-align:center;
  background:rgba(16,37,30,.86);animation:v2Fade .32s ease both}
@keyframes v2Fade{from{opacity:0}to{opacity:1}}
.v2-check{width:60px;height:60px;border-radius:50%;display:grid;place-items:center;background:var(--n-tint);color:var(--n-deep);box-shadow:0 0 0 7px var(--n-glow)}
.v2-ghost{display:flex;align-items:center;gap:8px;padding:10px 18px;border-radius:14px;cursor:pointer;color:#fff;font-size:14px;font-weight:800;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28)}
.v2-ghost:hover{background:rgba(255,255,255,.2)}
.v2-cta{display:flex;align-items:center;gap:10px;padding:11px 22px;border:0;border-radius:14px;cursor:pointer;color:#fff;font-size:14.5px;font-weight:900;
  background:linear-gradient(135deg,#16A36A,#174B37);box-shadow:0 10px 24px rgba(22,163,106,.42)}

.v2-dock{margin:0 auto;width:100%;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:8px 16px;border-radius:18px;background:rgba(247,245,236,.97);border:1px solid var(--line);box-shadow:0 8px 22px rgba(0,0,0,.18)}
.v2-av{display:flex;flex-shrink:0}
.v2-av>div{width:38px;height:38px;border-radius:50%;border:2px solid #fff;display:grid;place-items:center}
.v2-av>div+div{margin-left:-8px}
.v2-tag{display:inline-block;padding:2px 9px;border-radius:7px;background:var(--i-main);color:#fff;font-size:11.5px;font-weight:800}
.v2-pill{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:12px;background:var(--n-soft);border:1px solid var(--n-line);flex-shrink:0;
  font-size:12.5px;font-weight:800;color:var(--n-deep);font-variant-numeric:tabular-nums}

@media (prefers-reduced-motion:reduce){
  .v2-root,.v2-unmute,.v2-big,.v2-end{animation:none!important}
  .v2-root,.v2-video,.v2-controls,.v2-chip{transition:none}
}
`;

export default function Slide02VideoIntro({ onNext, isLeaving }) {
  const videoRef = useRef(null);
  const stageRef = useRef(null);
  const fillRef = useRef(null);
  const bufRef = useRef(null);
  const tipRef = useRef(null);
  const timeRef = useRef(null);
  const remainRef = useRef(null);
  const hideTimerRef = useRef(null);
  const bufferTimerRef = useRef(null);
  const draggingRef = useRef(false);
  const mountedRef = useRef(true);
  const rateRef = useRef(DEFAULT_RATE);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(FALLBACK_DURATION);
  const [playbackRate, setPlaybackRate] = useState(DEFAULT_RATE);
  const [isEnded, setIsEnded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mutedAutoplayNotice, setMutedAutoplayNotice] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  rateRef.current = playbackRate;

  const videoSrc = resolveAssetUrl('video_intro_720.mp4');
  const posterSrc = resolveAssetUrl('poster.jpg');

  const syncDomProgress = useCallback((cur, dur, rate) => {
    const safeDur = dur > 0 && Number.isFinite(dur) ? dur : FALLBACK_DURATION;
    const pct = Math.max(0, Math.min(100, (cur / safeDur) * 100));
    if (fillRef.current) fillRef.current.style.width = `${pct}%`;
    if (timeRef.current) timeRef.current.textContent = formatTime(cur);
    if (remainRef.current) {
      remainRef.current.textContent = `Còn ${formatTime(Math.max(0, safeDur - cur) / (rate || 1))}`;
    }
  }, []);

  // Khởi tạo phát ở tốc độ mặc định 1× khi mở Slide 2
  useEffect(() => {
    if (isLeaving) return undefined;
    mountedRef.current = true;
    const video = videoRef.current;
    if (!video) return undefined;
    let cancelled = false;

    // Đặt tốc độ mặc định luôn là 1× khi mount
    rateRef.current = DEFAULT_RATE;
    setPlaybackRate(DEFAULT_RATE);
    video.defaultPlaybackRate = DEFAULT_RATE;
    video.playbackRate = DEFAULT_RATE;

    // Nếu quay lại trong cùng phiên và chưa xem hết, khôi phục currentTime
    if (sessionLastTime > 1 && sessionLastTime < FALLBACK_DURATION - 2) {
      try {
        video.currentTime = sessionLastTime;
      } catch {
        // Ignore if metadata not loaded yet
      }
    }

    (async () => {
      const res = await startPlayback(video, DEFAULT_RATE);
      if (cancelled || !mountedRef.current) return;
      setIsMuted(video.muted);
      setVolume(video.muted ? 0 : 1);
      setMutedAutoplayNotice(res.mutedFallback && res.playing);
      setIsPlaying(res.playing);
      if (!res.playing) {
        setIsBuffering(false);
      }
    })();

    return () => {
      cancelled = true;
      mountedRef.current = false;
      clearTimeout(hideTimerRef.current);
      clearTimeout(bufferTimerRef.current);
      try {
        if (video.currentTime > 0 && !video.ended) {
          sessionLastTime = video.currentTime;
        }
        video.pause();
      } catch {
        // Ignore cleanup errors
      }
    };
  }, [isLeaving]);

  // Theo dõi trạng thái Fullscreen của khung video
  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const safePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    setHasError(false);
    video.defaultPlaybackRate = rateRef.current;
    video.playbackRate = rateRef.current;
    try {
      await video.play();
      if (mountedRef.current) setIsPlaying(true);
    } catch {
      if (mountedRef.current) {
        setIsPlaying(false);
        setIsBuffering(false);
      }
    }
  }, []);

  const handleUnmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setIsMuted(false);
    setVolume(1);
    setMutedAutoplayNotice(false);
    safePlay();
  }, [safePlay]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
        sessionLastTime = 0;
        setIsEnded(false);
      }
      safePlay();
    } else {
      video.pause();
    }
  }, [safePlay]);

  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    sessionLastTime = 0;
    video.currentTime = 0;
    setIsEnded(false);
    setHasError(false);
    syncDomProgress(0, duration, rateRef.current);
    safePlay();
  }, [duration, safePlay, syncDomProgress]);

  const handleRetryLoad = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    setHasError(false);
    setIsBuffering(true);
    video.load();
    safePlay();
  }, [safePlay]);

  const seekBy = useCallback(
    (delta) => {
      const video = videoRef.current;
      if (!video) return;
      const dur = video.duration || duration || FALLBACK_DURATION;
      const nextTime = Math.max(0, Math.min(dur, video.currentTime + delta));
      video.currentTime = nextTime;
      sessionLastTime = nextTime;
      setIsEnded(false);
      syncDomProgress(nextTime, dur, rateRef.current);
    },
    [duration, syncDomProgress]
  );

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || mutedAutoplayNotice) {
      handleUnmute();
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [mutedAutoplayNotice, handleUnmute]);

  const toggleFullscreen = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!document.fullscreenElement) stage.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);

  const cycleRate = useCallback(() => {
    const video = videoRef.current;
    const curIdx = RATES.indexOf(rateRef.current);
    const next = RATES[(curIdx + 1) % RATES.length];
    rateRef.current = next;
    setPlaybackRate(next);
    if (video) {
      video.defaultPlaybackRate = next;
      video.playbackRate = next;
      syncDomProgress(video.currentTime, video.duration || duration, next);
    }
  }, [duration, syncDomProgress]);

  // Chuyển sang slide tiếp theo: dừng video ngay lập tức, không khóa điều hướng
  const handleNext = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      try {
        if (video.currentTime > 0 && !video.ended) {
          sessionLastTime = video.currentTime;
        }
        video.pause();
      } catch {
        // Ignore
      }
    }
    onNext?.();
  }, [onNext]);

  const paintBuffer = useCallback((video) => {
    const dur = video.duration || FALLBACK_DURATION;
    if (bufRef.current && video.buffered && video.buffered.length > 0) {
      try {
        const end = video.buffered.end(video.buffered.length - 1);
        bufRef.current.style.width = `${Math.min(100, (end / dur) * 100)}%`;
      } catch {
        // Ignore buffered range error
      }
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || draggingRef.current) return;
    const cur = video.currentTime;
    const dur = video.duration || FALLBACK_DURATION;
    sessionLastTime = cur;
    syncDomProgress(cur, dur, video.playbackRate || rateRef.current);
    paintBuffer(video);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = rateRef.current;
    video.playbackRate = rateRef.current;
    const realDur = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : FALLBACK_DURATION;
    setDuration(realDur);
    setHasError(false);
    if (sessionLastTime > 1 && sessionLastTime < realDur - 2 && video.currentTime < 0.5) {
      try {
        video.currentTime = sessionLastTime;
      } catch {
        // Ignore
      }
    }
    syncDomProgress(video.currentTime || 0, realDur, rateRef.current);
    paintBuffer(video);
  };

  const handleEnded = async () => {
    sessionLastTime = 0;
    setIsPlaying(false);
    setIsBuffering(false);
    setIsEnded(true);
    setShowControls(true);
    try {
      const { default: confetti } = await import('canvas-confetti');
      confetti({ particleCount: 65, spread: 85, origin: { y: 0.7 }, disableForReducedMotion: true });
    } catch {
      // Ignore confetti error
    }
  };

  const seekFromPointer = useCallback(
    (e, commit) => {
      const video = videoRef.current;
      const bar = e.currentTarget;
      if (!video || !bar) return;
      const dur = video.duration || duration || FALLBACK_DURATION;
      const rect = bar.getBoundingClientRect();
      if (!rect.width) return;
      const pos = clamp01((e.clientX - rect.left) / rect.width);
      const t = pos * dur;
      if (fillRef.current) fillRef.current.style.width = `${pos * 100}%`;
      if (timeRef.current) timeRef.current.textContent = formatTime(t);
      if (tipRef.current) {
        tipRef.current.style.left = `${pos * 100}%`;
        tipRef.current.textContent = formatTime(t);
      }
      if (commit) {
        video.currentTime = t;
        sessionLastTime = t;
        setIsEnded(false);
      }
    },
    [duration]
  );

  const onBarDown = (e) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    draggingRef.current = true;
    setIsDragging(true);
    seekFromPointer(e, true);
  };
  const onBarMove = (e) => seekFromPointer(e, draggingRef.current);
  const onBarUp = (e) => {
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    draggingRef.current = false;
    setIsDragging(false);
  };
  const onBarKey = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      e.stopPropagation();
      seekBy(-5);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      seekBy(5);
    }
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (video) {
      video.volume = v;
      video.muted = v === 0;
      setIsMuted(v === 0);
    }
    if (v > 0) setMutedAutoplayNotice(false);
  };

  const wakeControls = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), HIDE_CONTROLS_MS);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(hideTimerRef.current);
      setShowControls(true);
    } else {
      wakeControls();
    }
  }, [isPlaying, wakeControls]);

  // Phím tắt dành riêng cho Slide 2 khi đang active (Mục 7.4)
  useEffect(() => {
    if (isLeaving) return undefined;
    const onKey = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      const isBtnOrSlider =
        target && (/^(BUTTON|A|SUMMARY)$/.test(target.tagName) || target.getAttribute?.('role') === 'slider');

      const k = e.key.toLowerCase();
      if ((k === ' ' || k === 'k') && !isBtnOrSlider) {
        e.preventDefault();
        togglePlay();
      } else if (k === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (k === 'r') {
        e.preventDefault();
        handleReplay();
      } else if (k === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (k === 'j') {
        e.preventDefault();
        seekBy(-5);
      } else if (k === 'l') {
        e.preventDefault();
        seekBy(5);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLeaving, togglePlay, toggleMute, handleReplay, toggleFullscreen, seekBy]);

  const controlsOn = showControls || !isPlaying || isDragging;
  const estimate = formatTime(duration / playbackRate);

  return (
    <div className="v2-root" data-no-swipe>
      <style>{CSS}</style>

      {/* ===== TIÊU ĐỀ SLIDE 02 THEO MỤC 5 MASTER SPEC ===== */}
      <header className="v2-header">
        <div className="v2-title-group">
          <h2 className="v2-title">HÀNH TRÌNH CỦA HẠT MẦM</h2>
          <p className="v2-sub">N nuôi thân lá · P hỗ trợ bộ rễ · K điều hòa nước và vận chuyển đường</p>
        </div>
        <button type="button" className="v2-skip" onClick={handleNext} title="Bỏ qua video sang Slide 3">
          <span>Bỏ qua</span>
          <ArrowRight size={15} />
        </button>
      </header>

      {/* ===== RẠP CHIẾU VIDEO ===== */}
      <div
        ref={stageRef}
        className={`v2-stage${isPlaying && !controlsOn ? ' hide-cursor' : ''}`}
        onMouseMove={wakeControls}
        onTouchStart={wakeControls}
      >
        <div className={`v2-video-wrap${isEnded ? ' dim' : ''}`}>
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            className={`v2-video${isReady ? '' : ' loading'}`}
            playsInline
            preload="metadata"
            onClick={togglePlay}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={() => {
              setIsReady(true);
              setIsBuffering(false);
            }}
            onCanPlay={() => {
              clearTimeout(bufferTimerRef.current);
              setIsReady(true);
              setIsBuffering(false);
              if (videoRef.current) {
                videoRef.current.defaultPlaybackRate = rateRef.current;
                videoRef.current.playbackRate = rateRef.current;
              }
            }}
            onWaiting={() => {
              setIsBuffering(true);
              clearTimeout(bufferTimerRef.current);
              bufferTimerRef.current = setTimeout(() => setIsBuffering(false), BUFFER_TIMEOUT_MS);
            }}
            onPlaying={() => {
              clearTimeout(bufferTimerRef.current);
              setIsBuffering(false);
              setIsPlaying(true);
              setHasError(false);
            }}
            onPlay={() => {
              setIsPlaying(true);
              setIsEnded(false);
            }}
            onPause={() => {
              clearTimeout(bufferTimerRef.current);
              setIsBuffering(false);
              setIsPlaying(false);
            }}
            onError={() => {
              clearTimeout(bufferTimerRef.current);
              setIsBuffering(false);
              setIsPlaying(false);
              setHasError(true);
            }}
            onTimeUpdate={handleTimeUpdate}
            onProgress={() => videoRef.current && paintBuffer(videoRef.current)}
            onEnded={handleEnded}
          />
        </div>

        {/* chip trạng thái */}
        <div className={`v2-chip l${controlsOn ? '' : ' off'}`}>
          <span className={`v2-dot${isPlaying ? ' live' : ''}`} />
          <span>Video giới thiệu · Mặc định 1× (~52s)</span>
        </div>
        <div className={`v2-chip r${controlsOn ? '' : ' off'}`}>
          <span ref={remainRef}>Còn {estimate}</span>
        </div>

        {mutedAutoplayNotice && !isEnded && !hasError && (
          <button type="button" className="v2-unmute" onClick={handleUnmute}>
            <Volume2 size={19} />
            <span>Đang phát tắt tiếng — Nhấn để bật âm thanh</span>
          </button>
        )}

        {isBuffering && isPlaying && !isEnded && !hasError && <Loader2 className="v2-spin" size={42} />}

        {!isPlaying && !isEnded && !isBuffering && !hasError && (
          <button
            type="button"
            className="v2-big"
            onClick={togglePlay}
            title="Phát video (Phím cách / K)"
            aria-label="Phát video"
          >
            <Play size={36} fill="#174B37" style={{ marginLeft: 4 }} />
          </button>
        )}

        {/* Trạng thái lỗi nguồn video (Mục 7.1) */}
        {hasError && (
          <div className="v2-error" role="alert">
            <AlertTriangle size={38} color="#E8A13A" />
            <div style={{ fontSize: 18, fontWeight: 800 }}>Không tải được video</div>
            <div style={{ fontSize: 13.5, color: '#DCECE4', maxWidth: 420 }}>
              Kiểm tra lại kết nối hoặc tệp <code>/video_intro_720.mp4</code>, hoặc chuyển tiếp sang Slide 3.
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button type="button" className="v2-ghost" onClick={handleRetryLoad}>
                <RotateCcw size={16} />
                <span>Thử lại</span>
              </button>
              <button type="button" className="v2-cta" onClick={handleNext}>
                <span>Bỏ qua sang Slide 3</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* màn hình kết thúc */}
        {isEnded && !hasError && (
          <div className="v2-end">
            <div className="v2-check">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h3 style={{ fontSize: 25, fontWeight: 900, color: '#fff', margin: 0 }}>
                Video giới thiệu đã hoàn tất
              </h3>
              <p style={{ fontSize: 14.5, color: '#DCECE4', margin: '6px auto 0', maxWidth: 480, lineHeight: 1.45 }}>
                Tiếp theo: Giới thiệu 9 thành viên nhóm và giải đáp chi tiết 15 câu hỏi N – P – K.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button type="button" className="v2-ghost" onClick={handleReplay}>
                <RotateCcw size={18} />
                <span>Xem lại video (1×)</span>
              </button>
              <button type="button" className="v2-cta" onClick={handleNext}>
                <span>Sang Slide 3: Giới thiệu 9 thành viên</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* thanh điều khiển */}
        <div className={`v2-controls${controlsOn ? '' : ' off'}`}>
          <div
            className={`v2-bar${isDragging ? ' drag' : ''}`}
            role="slider"
            tabIndex={0}
            aria-label="Tiến trình video"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(videoRef.current?.currentTime || 0)}
            onPointerDown={onBarDown}
            onPointerMove={onBarMove}
            onPointerUp={onBarUp}
            onPointerCancel={onBarUp}
            onKeyDown={onBarKey}
          >
            <div className="v2-track">
              <div ref={bufRef} className="v2-buf" />
              <div ref={fillRef} className="v2-fill">
                <span className="v2-thumb" />
              </div>
            </div>
            <span ref={tipRef} className="v2-tip">
              00:00
            </span>
          </div>

          <div className="v2-row">
            <div className="v2-grp">
              <button
                type="button"
                className="v2-btn"
                onClick={togglePlay}
                title={isPlaying ? 'Tạm dừng (Space/K)' : 'Phát (Space/K)'}
                aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}
              >
                {isPlaying ? <Pause size={21} /> : <Play size={21} fill="#fff" />}
              </button>
              <button
                type="button"
                className="v2-btn"
                onClick={handleReplay}
                title="Phát lại từ đầu (R)"
                aria-label="Phát lại"
                style={{ color: '#DCECE4' }}
              >
                <RotateCcw size={18} />
              </button>
              <div className="v2-time">
                <span ref={timeRef}>00:00</span>
                <i>/</i>
                <span style={{ opacity: 0.85 }}>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="v2-grp" style={{ gap: 10 }}>
              <div className="v2-grp" style={{ gap: 4 }}>
                <button
                  type="button"
                  className="v2-btn"
                  onClick={toggleMute}
                  title={isMuted ? 'Bật tiếng (M)' : 'Tắt tiếng (M)'}
                  aria-label="Bật/tắt tiếng"
                  style={{ color: isMuted ? '#F3B7B9' : '#fff' }}
                >
                  {isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                </button>
                <input
                  className="v2-vol"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Âm lượng"
                />
              </div>

              <button
                type="button"
                className="v2-rate"
                onClick={cycleRate}
                title="Tốc độ phát (Mặc định 1×)"
                aria-label={`Tốc độ phát hiện tại ${playbackRate}x`}
              >
                {playbackRate}×
              </button>

              <button
                type="button"
                className="v2-btn"
                onClick={toggleFullscreen}
                title="Toàn màn hình video (F)"
                aria-label="Toàn màn hình video"
                style={{ color: '#DCECE4' }}
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              <button type="button" className="v2-skip" onClick={handleNext} title="Bỏ qua sang Slide 3">
                <span>Bỏ qua</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== THANH TÓM TẮT VAI TRÒ NPK ===== */}
      <div className="v2-dock">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <div className="v2-av">
            <div style={{ background: 'var(--n-tint)' }}>
              <LinhThuDam emotion="happy" size={28} />
            </div>
            <div style={{ background: 'var(--p-tint)' }}>
              <LinhThuLan emotion="happy" size={28} />
            </div>
            <div style={{ background: 'var(--k-tint)' }}>
              <LinhThuKali emotion="happy" size={28} />
            </div>
          </div>
          <div style={{ minWidth: 0, fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.38, fontWeight: 600 }}>
            <span className="v2-tag" style={{ marginRight: 8 }}>
              Chu trình dinh dưỡng
            </span>
            <strong style={{ color: 'var(--n-deep)' }}>N</strong> nuôi thân lá ·{' '}
            <strong style={{ color: 'var(--p-deep)' }}>P</strong> hỗ trợ bộ rễ &amp; ATP ·{' '}
            <strong style={{ color: 'var(--k-deep)' }}>K</strong> điều hòa nước và vận chuyển đường.
          </div>
        </div>

        <div className="v2-pill">
          <Sparkles size={15} color="#16A36A" />
          <span>
            Thời lượng ~52s · Tốc độ {playbackRate}×
          </span>
        </div>
      </div>
    </div>
  );
}