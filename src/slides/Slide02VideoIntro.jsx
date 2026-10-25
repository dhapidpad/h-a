import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play, Pause, RotateCcw, Volume2, VolumeX,
  Maximize2, Minimize2, ArrowRight, Sparkles, CheckCircle2, Loader2
} from 'lucide-react';
import { LinhThuDam, LinhThuLan, LinhThuKali } from '../components/mascot/CuteMascot';

/* ==================================================================
   CẤU HÌNH & HÀM TIỆN ÍCH
================================================================== */
const DEFAULT_RATE = 1;
const RATES = [1, 1.25, 1.5, 2];
const FALLBACK_DURATION = 51.77;
const HIDE_CONTROLS_MS = 2800;
const LEAVE_MS = 340;

const formatTime = (s) => {
  if (!Number.isFinite(s) || s < 0) return '00:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};
const clamp01 = (n) => Math.max(0, Math.min(1, n));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function startPlayback(video, rate = DEFAULT_RATE) {
  video.defaultPlaybackRate = rate;
  video.playbackRate = rate;
  video.volume = 1;
  video.muted = false;
  try {
    await video.play();
    return { playing: true, blocked: false };
  } catch {
    video.muted = true;
    try {
      await video.play();
      return { playing: true, blocked: true };
    } catch {
      return { playing: false, blocked: true };
    }
  }
}

function fadeOutAudio(video, ms = LEAVE_MS) {
  return new Promise((resolve) => {
    if (!video || video.muted || video.paused) return resolve();
    const v0 = video.volume;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / ms);
      video.volume = v0 * (1 - k);
      if (k < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

/* ==================================================================
   CSS (Mục 4.2 & 7.1: Bỏ filter blur trên video, dùng lớp phủ .v2-video-wrap.dim::after)
================================================================== */
const CSS = `
.v2-root{display:flex;flex-direction:column;height:100%;gap:12px;position:relative;overflow:hidden;
  animation:v2In .55s var(--ease-out) both;
  transition:opacity ${LEAVE_MS}ms var(--ease-out),transform ${LEAVE_MS}ms var(--ease-out)}
.v2-root.leaving{opacity:0;transform:scale(.988) translateY(6px);pointer-events:none}
@keyframes v2In{from{opacity:0;transform:translateY(12px) scale(.99)}to{opacity:1;transform:none}}

.v2-stage{position:relative;flex:1;min-height:0;border-radius:24px;overflow:hidden;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(120% 90% at 50% 0%,#12203A 0%,#050912 70%);
  box-shadow:0 24px 60px rgba(8,15,35,.32),0 0 0 1px rgba(255,255,255,.08)}
.v2-stage.hide-cursor{cursor:none}
.v2-video-wrap{position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center}
.v2-video-wrap::after{content:'';position:absolute;inset:0;background:rgba(2,6,23,.58);opacity:0;pointer-events:none;transition:opacity .4s var(--ease-out)}
.v2-video-wrap.dim::after{opacity:1}
.v2-video{width:100%;height:100%;object-fit:contain;display:block;background:#000;transition:opacity .4s var(--ease-out)}
.v2-video.loading{opacity:.35}

.v2-chip{position:absolute;top:16px;z-index:15;display:flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;
  background:rgba(8,15,35,.78);border:1px solid rgba(255,255,255,.16);color:#E2E8F0;font-size:12.5px;font-weight:700;
  transition:opacity .3s ease,transform .3s ease}
.v2-chip.l{left:16px}.v2-chip.r{right:16px;font-variant-numeric:tabular-nums}
.v2-chip.off{opacity:0;transform:translateY(-6px);pointer-events:none}
.v2-dot{width:8px;height:8px;border-radius:50%;background:#60A5FA;box-shadow:0 0 0 0 rgba(96,165,250,.6)}
.v2-dot.live{animation:v2Dot 1.8s ease-out infinite}
@keyframes v2Dot{70%{box-shadow:0 0 0 7px rgba(96,165,250,0)}100%{box-shadow:0 0 0 0 rgba(96,165,250,0)}}

.v2-unmute{position:absolute;top:60px;left:50%;transform:translateX(-50%);z-index:30;display:flex;align-items:center;gap:10px;
  padding:10px 20px;border-radius:999px;border:1px solid rgba(255,255,255,.55);cursor:pointer;color:#fff;font-size:14px;font-weight:800;
  background:linear-gradient(135deg,#2563EB,#1D4ED8);box-shadow:0 10px 30px rgba(37,99,235,.5);
  animation:v2Pop .45s var(--ease-out) both}
@keyframes v2Pop{from{opacity:0;transform:translateX(-50%) translateY(-10px) scale(.92)}to{opacity:1;transform:translateX(-50%)}}

.v2-big{position:absolute;z-index:20;width:84px;height:84px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;
  color:#1D4ED8;background:rgba(255,255,255,.96);box-shadow:0 16px 40px rgba(0,0,0,.4);
  animation:v2Pop2 .32s var(--ease-out) both;transition:transform .2s var(--ease-out)}
.v2-big:hover{transform:scale(1.08)}
.v2-big::before{content:'';position:absolute;inset:-8px;border-radius:50%;border:2px solid rgba(255,255,255,.55);animation:v2Ring 2.2s ease-out infinite}
@keyframes v2Pop2{from{opacity:0;transform:scale(.75)}to{opacity:1;transform:scale(1)}}
@keyframes v2Ring{0%{transform:scale(.9);opacity:.8}100%{transform:scale(1.35);opacity:0}}

.v2-spin{position:absolute;z-index:18;color:#fff;animation:v2Rot 1s linear infinite}
@keyframes v2Rot{to{transform:rotate(360deg)}}

.v2-controls{position:absolute;left:0;right:0;bottom:0;z-index:20;padding:28px 20px 14px;display:flex;flex-direction:column;gap:4px;
  background:linear-gradient(180deg,transparent 0%,rgba(5,9,18,.92) 100%);transition:opacity .3s ease,transform .3s ease}
.v2-controls.off{opacity:0;transform:translateY(8px);pointer-events:none}

.v2-bar{position:relative;height:20px;display:flex;align-items:center;cursor:pointer;touch-action:none}
.v2-track{position:relative;width:100%;height:5px;border-radius:999px;background:rgba(255,255,255,.22);transition:height .15s ease}
.v2-bar:hover .v2-track,.v2-bar.drag .v2-track{height:8px}
.v2-buf{position:absolute;left:0;top:0;height:100%;width:0;border-radius:inherit;background:rgba(255,255,255,.32);pointer-events:none}
.v2-fill{position:absolute;left:0;top:0;height:100%;width:0;border-radius:inherit;background:linear-gradient(90deg,#3B82F6,#93C5FD);pointer-events:none}
.v2-thumb{position:absolute;right:-7px;top:50%;width:14px;height:14px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.45);
  transform:translateY(-50%) scale(0);transition:transform .15s ease}
.v2-bar:hover .v2-thumb,.v2-bar.drag .v2-thumb{transform:translateY(-50%) scale(1)}
.v2-tip{position:absolute;bottom:24px;left:0;padding:3px 8px;border-radius:7px;background:rgba(15,23,42,.92);color:#fff;font-size:11.5px;font-weight:700;
  font-variant-numeric:tabular-nums;transform:translateX(-50%);opacity:0;pointer-events:none;transition:opacity .12s}
.v2-bar:hover .v2-tip,.v2-bar.drag .v2-tip{opacity:1}

.v2-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
.v2-grp{display:flex;align-items:center;gap:6px}
.v2-btn{width:36px;height:36px;border:0;border-radius:10px;background:none;color:#fff;cursor:pointer;display:grid;place-items:center;transition:background .2s ease,color .2s ease}
.v2-btn:hover{background:rgba(255,255,255,.14)}
.v2-btn:focus-visible,.v2-bar:focus-visible,.v2-skip:focus-visible,.v2-rate:focus-visible,.v2-big:focus-visible{outline:2px solid #93C5FD;outline-offset:2px}
.v2-time{font-size:13px;font-weight:700;color:#E2E8F0;font-variant-numeric:tabular-nums;margin-left:4px}
.v2-time i{font-style:normal;opacity:.5;margin:0 4px}
.v2-vol{width:72px;height:4px;accent-color:#3B82F6;cursor:pointer}
.v2-rate{min-width:46px;padding:4px 10px;border-radius:8px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;
  font-size:12.5px;font-weight:800;cursor:pointer;transition:background .2s ease,border-color .2s ease}
.v2-rate:hover{background:rgba(255,255,255,.2)}
.v2-skip{display:flex;align-items:center;gap:6px;padding:7px 14px;border:0;border-radius:10px;color:#fff;font-size:13px;font-weight:800;cursor:pointer;
  background:linear-gradient(135deg,#2563EB,#1D4ED8);box-shadow:0 6px 18px rgba(37,99,235,.4);transition:transform .2s ease,box-shadow .2s ease}
.v2-skip:hover{transform:translateY(-1px);box-shadow:0 10px 24px rgba(37,99,235,.5)}

.v2-end{position:absolute;inset:0;z-index:25;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px;text-align:center;
  background:rgba(8,15,35,.82);animation:v2Fade .4s ease both}
@keyframes v2Fade{from{opacity:0}to{opacity:1}}
.v2-end>*{animation:v2Up .48s var(--ease-out) both}
.v2-end>*:nth-child(2){animation-delay:.07s}.v2-end>*:nth-child(3){animation-delay:.14s}
@keyframes v2Up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.v2-check{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:var(--n-tint);color:var(--n-deep);box-shadow:0 0 0 8px var(--n-glow)}
.v2-ghost{display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:14px;cursor:pointer;color:#fff;font-size:14.5px;font-weight:800;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);transition:background .2s ease}
.v2-ghost:hover{background:rgba(255,255,255,.2)}
.v2-cta{display:flex;align-items:center;gap:10px;padding:12px 26px;border:0;border-radius:14px;cursor:pointer;color:#fff;font-size:15px;font-weight:900;
  background:linear-gradient(135deg,#2563EB,#1D4ED8);box-shadow:0 10px 28px rgba(37,99,235,.5);transition:transform .2s ease}
.v2-cta:hover{transform:translateY(-2px)}

.v2-dock{margin:0 auto;width:100%;max-width:980px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:8px 16px;border-radius:20px;background:rgba(255,255,255,.96);border:1px solid var(--i-line);box-shadow:0 10px 28px rgba(37,99,235,.09)}
.v2-av{display:flex;flex-shrink:0}
.v2-av>div{width:40px;height:40px;border-radius:50%;border:2.5px solid #fff;display:grid;place-items:center}
.v2-av>div+div{margin-left:-10px}
.v2-tag{display:inline-block;padding:2px 9px;border-radius:7px;background:var(--i-main);color:#fff;font-size:11.5px;font-weight:800}
.v2-pill{display:flex;align-items:center;gap:8px;padding:6px 14px;border-radius:12px;background:var(--i-soft);border:1px solid var(--i-line);flex-shrink:0;
  font-size:12.5px;font-weight:800;color:var(--i-deep);font-variant-numeric:tabular-nums}

@media (max-width:700px){
  .v2-vol,.v2-skip span,.v2-pill{display:none}
  .v2-controls{padding:24px 12px 10px}
  .v2-big{width:68px;height:68px}
  .v2-dock{padding:8px 12px}
}
@media (prefers-reduced-motion:reduce){
  .v2-root,.v2-unmute,.v2-big,.v2-big::before,.v2-dot.live,.v2-end,.v2-end>*{animation:none!important}
  .v2-root,.v2-video,.v2-controls,.v2-chip{transition:none}
}
`;

export default function Slide02VideoIntro({ slide, onNext }) {
  const videoRef = useRef(null);
  const stageRef = useRef(null);
  const fillRef = useRef(null);
  const bufRef = useRef(null);
  const tipRef = useRef(null);
  const timeRef = useRef(null);
  const remainRef = useRef(null);
  const hideTimerRef = useRef(null);
  const draggingRef = useRef(false);
  const mountedRef = useRef(true);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(FALLBACK_DURATION);
  const [playbackRate, setPlaybackRate] = useState(DEFAULT_RATE);
  const [isEnded, setIsEnded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    mountedRef.current = true;
    const video = videoRef.current;
    if (!video) return undefined;
    let cancelled = false;

    (async () => {
      const res = await startPlayback(video, DEFAULT_RATE);
      if (cancelled) return;
      setIsMuted(video.muted);
      setVolume(1);
      setAutoplayBlocked(res.blocked);
      setIsPlaying(res.playing);
    })();

    return () => {
      cancelled = true;
      mountedRef.current = false;
      clearTimeout(hideTimerRef.current);
      video.pause();
    };
  }, []);

  useEffect(() => {
    const onFs = () => setIsFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const safePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
    } catch {}
  }, []);

  const handleUnmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setIsMuted(false);
    setVolume(1);
    setAutoplayBlocked(false);
    safePlay();
  }, [safePlay]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (autoplayBlocked) handleUnmute();
      else safePlay();
    } else {
      video.pause();
    }
  }, [autoplayBlocked, handleUnmute, safePlay]);

  const resetProgressUI = useCallback(() => {
    if (fillRef.current) fillRef.current.style.width = '0%';
    if (timeRef.current) timeRef.current.textContent = '00:00';
  }, []);

  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsEnded(false);
    resetProgressUI();
    safePlay();
  }, [resetProgressUI, safePlay]);

  const seekBy = useCallback((delta) => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || FALLBACK_DURATION;
    video.currentTime = Math.max(0, Math.min(dur, video.currentTime + delta));
    setIsEnded(false);
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || autoplayBlocked) {
      handleUnmute();
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [autoplayBlocked, handleUnmute]);

  const toggleFullscreen = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (!document.fullscreenElement) stage.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.().catch(() => {});
  }, []);

  const cycleRate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const next = RATES[(RATES.indexOf(playbackRate) + 1) % RATES.length];
    video.playbackRate = next;
    setPlaybackRate(next);
  }, [playbackRate]);

  const handleNext = useCallback(async () => {
    if (leaving) return;
    setLeaving(true);
    const video = videoRef.current;
    await Promise.all([fadeOutAudio(video), wait(LEAVE_MS)]);
    if (!mountedRef.current) return;
    video?.pause();
    onNext?.();
  }, [leaving, onNext]);

  const paintBuffer = useCallback((video) => {
    const dur = video.duration || FALLBACK_DURATION;
    if (bufRef.current && video.buffered.length > 0) {
      const end = video.buffered.end(video.buffered.length - 1);
      bufRef.current.style.width = `${Math.min(100, (end / dur) * 100)}%`;
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || draggingRef.current) return;
    const cur = video.currentTime;
    const dur = video.duration || FALLBACK_DURATION;
    if (fillRef.current) fillRef.current.style.width = `${(cur / dur) * 100}%`;
    if (timeRef.current) timeRef.current.textContent = formatTime(cur);
    if (remainRef.current) {
      remainRef.current.textContent = `Còn ${formatTime((dur - cur) / (video.playbackRate || 1))}`;
    }
    paintBuffer(video);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = playbackRate;
    video.playbackRate = playbackRate;
    setDuration(video.duration);
    paintBuffer(video);
  };

  const handleEnded = async () => {
    setIsPlaying(false);
    setIsEnded(true);
    setShowControls(true);
    const { default: confetti } = await import('canvas-confetti');
    confetti({ particleCount: 80, spread: 90, origin: { y: 0.7 }, disableForReducedMotion: true });
  };

  const seekFromPointer = useCallback((e, commit) => {
    const video = videoRef.current;
    const bar = e.currentTarget;
    if (!video || !bar) return;
    const dur = video.duration || FALLBACK_DURATION;
    const rect = bar.getBoundingClientRect();
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
      setIsEnded(false);
    }
  }, []);

  const onBarDown = (e) => {
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
    if (e.key === 'ArrowLeft') { e.preventDefault(); seekBy(-5); }
    if (e.key === 'ArrowRight') { e.preventDefault(); seekBy(5); }
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
    setAutoplayBlocked(false);
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

  useEffect(() => {
    const onKey = (e) => {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === ' ' || k === 'k') { e.preventDefault(); togglePlay(); }
      else if (k === 'm') { e.preventDefault(); toggleMute(); }
      else if (k === 'r') { e.preventDefault(); handleReplay(); }
      else if (k === 'f') { e.preventDefault(); toggleFullscreen(); }
      else if (k === 'j') seekBy(-5);
      else if (k === 'l') seekBy(5);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, toggleMute, handleReplay, toggleFullscreen, seekBy]);

  const controlsOn = showControls || !isPlaying || isDragging;
  const estimate = formatTime(duration / playbackRate);

  return (
    <div className={`v2-root${leaving ? ' leaving' : ''}`}>
      <style>{CSS}</style>

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
            src="/video_intro_720.mp4"
            poster="/poster.jpg"
            className={`v2-video${isReady ? '' : ' loading'}`}
            playsInline
            preload="metadata"
            onClick={togglePlay}
            onLoadedMetadata={handleLoadedMetadata}
            onLoadedData={() => setIsReady(true)}
            onCanPlay={() => { setIsBuffering(false); if (videoRef.current) videoRef.current.playbackRate = playbackRate; }}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => { setIsBuffering(false); setIsPlaying(true); }}
            onPlay={() => { setIsPlaying(true); setIsEnded(false); }}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onProgress={() => videoRef.current && paintBuffer(videoRef.current)}
            onEnded={handleEnded}
          />
        </div>

        {/* chip trạng thái */}
        <div className={`v2-chip l${controlsOn ? '' : ' off'}`}>
          <span className={`v2-dot${isPlaying ? ' live' : ''}`} />
          Video giới thiệu
        </div>
        <div className={`v2-chip r${controlsOn ? '' : ' off'}`}>
          <span ref={remainRef}>Còn {estimate}</span>
        </div>

        {autoplayBlocked && !isEnded && (
          <button type="button" className="v2-unmute" onClick={handleUnmute}>
            <Volume2 size={20} />
            <span>Nhấn để bật tiếng video</span>
          </button>
        )}

        {isBuffering && isPlaying && !isEnded && <Loader2 className="v2-spin" size={44} />}

        {!isPlaying && !isEnded && !isBuffering && (
          <button type="button" className="v2-big" onClick={togglePlay} title="Phát video (Phím cách)" aria-label="Phát video">
            <Play size={36} fill="#1D4ED8" style={{ marginLeft: 4 }} />
          </button>
        )}

        {/* màn hình kết thúc */}
        {isEnded && (
          <div className="v2-end">
            <div className="v2-check"><CheckCircle2 size={38} /></div>
            <div>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: 0 }}>Video giới thiệu đã xem xong</h3>
              <p style={{ fontSize: 15, color: '#A9B8CE', margin: '8px auto 0', maxWidth: 470, lineHeight: 1.5 }}>
                Ba bé Đạm, Lân và Kali sẽ đồng hành cùng bạn qua 15 câu hỏi hóa học thực tế.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button type="button" className="v2-ghost" onClick={handleReplay}>
                <RotateCcw size={18} /><span>Xem lại video</span>
              </button>
              <button type="button" className="v2-cta" onClick={handleNext}>
                <span>Sang Slide 3: Giới thiệu thành viên</span><ArrowRight size={20} />
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
            onPointerDown={onBarDown}
            onPointerMove={onBarMove}
            onPointerUp={onBarUp}
            onPointerCancel={onBarUp}
            onKeyDown={onBarKey}
          >
            <div className="v2-track">
              <div ref={bufRef} className="v2-buf" />
              <div ref={fillRef} className="v2-fill"><span className="v2-thumb" /></div>
            </div>
            <span ref={tipRef} className="v2-tip">00:00</span>
          </div>

          <div className="v2-row">
            <div className="v2-grp">
              <button type="button" className="v2-btn" onClick={togglePlay} title={isPlaying ? 'Tạm dừng (Phím cách)' : 'Phát (Phím cách)'} aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}>
                {isPlaying ? <Pause size={22} /> : <Play size={22} fill="#fff" />}
              </button>
              <button type="button" className="v2-btn" onClick={handleReplay} title="Phát lại từ đầu (R)" aria-label="Phát lại" style={{ color: '#CBD5E1' }}>
                <RotateCcw size={18} />
              </button>
              <div className="v2-time">
                <span ref={timeRef}>00:00</span><i>/</i><span style={{ opacity: 0.8 }}>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="v2-grp" style={{ gap: 10 }}>
              <div className="v2-grp" style={{ gap: 4 }}>
                <button type="button" className="v2-btn" onClick={toggleMute} title={isMuted ? 'Bật tiếng (M)' : 'Tắt tiếng (M)'} aria-label="Bật/tắt tiếng" style={{ color: isMuted ? '#F87171' : '#fff' }}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input className="v2-vol" type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} aria-label="Âm lượng" />
              </div>

              <button type="button" className="v2-rate" onClick={cycleRate} title="Đổi tốc độ phát">
                {playbackRate}x
              </button>

              <button type="button" className="v2-btn" onClick={toggleFullscreen} title="Toàn màn hình (F)" aria-label="Toàn màn hình" style={{ color: '#CBD5E1' }}>
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              <button type="button" className="v2-skip" onClick={handleNext} title="Sang slide tiếp theo">
                <span>Bỏ qua sang Slide 3</span><ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== THANH LINH THÚ NPK ===== */}
      <div className="v2-dock">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
          <div className="v2-av">
            <div style={{ background: 'var(--n-tint)' }}><LinhThuDam emotion="happy" size={30} /></div>
            <div style={{ background: 'var(--p-tint)' }}><LinhThuLan emotion="happy" size={30} /></div>
            <div style={{ background: 'var(--k-tint)' }}><LinhThuKali emotion="happy" size={30} /></div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <span className="v2-tag">Biệt đội NPK</span>
              <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--ink)' }}>Hành trình bứt phá của hạt mầm</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.4, fontWeight: 600 }}>
              Hạt mầm lớn nhanh nhờ <strong style={{ color: 'var(--n-deep)' }}>Đạm (lá xanh)</strong>,{' '}
              <strong style={{ color: 'var(--p-deep)' }}>Lân (rễ sâu)</strong> và{' '}
              <strong style={{ color: 'var(--k-deep)' }}>Kali (chắc quả, ngọt trái)</strong>.
            </div>
          </div>
        </div>

        <div className="v2-pill">
          <Sparkles size={16} color="#2563EB" />
          <span>Thời lượng {estimate} ({playbackRate}x)</span>
        </div>
      </div>
    </div>
  );
}