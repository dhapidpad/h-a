import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play, Pause, RotateCcw, Volume2, VolumeX,
  Maximize2, Minimize2, ArrowRight, Sparkles, CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LinhThuDam, LinhThuLan, LinhThuKali } from '../components/mascot/CuteMascot';

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export default function Slide02VideoIntro({ slide, onNext }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const progressFillRef = useRef(null);
  const bufferFillRef = useRef(null);
  const timeTextRef = useRef(null);
  const durationTextRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(72.92);
  const [playbackRate, setPlaybackRate] = useState(1.5); // Mặc định tốc độ 1.5x theo yêu cầu
  const [isEnded, setIsEnded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const hideControlsTimerRef = useRef(null);

  // Kích hoạt tự động phát video VÀ BẬT TIẾNG ngay khi chuyển vào Slide 2, tốc độ chuẩn bị trước 1.5x
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultPlaybackRate = 1.5;
    video.playbackRate = 1.5;
    video.muted = false;
    video.volume = 1.0;
    setVolume(1.0);
    setIsMuted(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch((err) => {
          console.warn('Autoplay unmuted bị trình duyệt hạn chế nếu chưa có click trực tiếp:', err);
          // Dự phòng: phát tắt tiếng trước và hiện nút Bật Tiếng to rõ
          video.muted = true;
          setIsMuted(true);
          setAutoplayBlocked(true);
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        });
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, []);

  // Bật tiếng thủ công nếu trình duyệt cần tương tác
  const handleUnmute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1.0;
    setIsMuted(false);
    setVolume(1.0);
    setAutoplayBlocked(false);
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  // Xử lý Play / Pause
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      if (autoplayBlocked) {
        handleUnmute();
      } else {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [autoplayBlocked, handleUnmute]);

  // Xử lý Tua lại từ đầu
  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    setIsEnded(false);
    if (progressFillRef.current) progressFillRef.current.style.width = '0%';
    if (timeTextRef.current) timeTextRef.current.textContent = '00:00';
    video.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  // Cập nhật tiến trình trực tiếp qua DOM Ref để ZERO RE-RENDER React (Triệt tiêu 100% hiện tượng khựng lag)
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const cur = video.currentTime;
    const dur = video.duration || 72.92;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${(cur / dur) * 100}%`;
    }
    if (timeTextRef.current) {
      timeTextRef.current.textContent = formatTime(cur);
    }
    if (bufferFillRef.current && video.buffered.length > 0) {
      const buf = video.buffered.end(video.buffered.length - 1);
      bufferFillRef.current.style.width = `${Math.min(100, (buf / dur) * 100)}%`;
    }
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || 72.92;
    if (bufferFillRef.current && video.buffered.length > 0) {
      const buf = video.buffered.end(video.buffered.length - 1);
      bufferFillRef.current.style.width = `${Math.min(100, (buf / dur) * 100)}%`;
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    video.defaultPlaybackRate = 1.5;
    video.playbackRate = playbackRate;
    setDuration(video.duration);
    if (durationTextRef.current) {
      durationTextRef.current.textContent = formatTime(video.duration);
    }
    if (bufferFillRef.current && video.buffered.length > 0) {
      const buf = video.buffered.end(video.buffered.length - 1);
      bufferFillRef.current.style.width = `${Math.min(100, (buf / video.duration) * 100)}%`;
    }
  };

  // Khi video kết thúc
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.7 },
      disableForReducedMotion: true
    });
  };

  // Kéo thanh tiến trình trực tiếp qua DOM
  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const dur = video.duration || 72.92;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetTime = pos * dur;
    video.currentTime = targetTime;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${pos * 100}%`;
    }
    if (timeTextRef.current) {
      timeTextRef.current.textContent = formatTime(targetTime);
    }
  };

  // Điều khiển âm lượng
  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (video) {
      video.volume = newVol;
      video.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
    setAutoplayBlocked(false);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted || autoplayBlocked) {
      handleUnmute();
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  // Đổi tốc độ phát (mặc định 1.5x -> 2x -> 1x -> 1.25x -> 1.5x)
  const cyclePlaybackRate = () => {
    const video = videoRef.current;
    if (!video) return;
    const rates = [1.5, 2, 1, 1.25];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    video.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  // Toàn màn hình
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Tự động ẩn thanh điều khiển khi không di chuột
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2800);
  };

  // Phím tắt nội bộ trong video
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReplay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, toggleMute, handleReplay]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 10,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* RẠP CHIẾU VIDEO CHÍNH (CINEMA STAGE) */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        style={{
          position: 'relative',
          flex: 1,
          minHeight: 0,
          background: 'linear-gradient(180deg, #0B0F19 0%, #020617 100%)',
          borderRadius: 22,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 50px rgba(15, 23, 42, 0.28), 0 0 0 1.5px rgba(255, 255, 255, 0.1)',
          cursor: isPlaying && !showControls ? 'none' : 'default'
        }}
      >
        {/* Thẻ Video HTML5 chính thức - Tiền nạp tự động & chạy mượt 100% không khựng */}
        <video
          ref={videoRef}
          src="/video_intro.mp4"
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onProgress={handleProgress}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => {
            if (videoRef.current) {
              videoRef.current.playbackRate = playbackRate;
            }
          }}
          onEnded={handleVideoEnded}
          onClick={togglePlay}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform'
          }}
        />

        {/* Nút nhắc BẬT TIẾNG nếu trình duyệt hạn chế autoplay âm thanh */}
        {autoplayBlocked && (
          <button
            type="button"
            onClick={handleUnmute}
            style={{
              position: 'absolute',
              top: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
              color: '#FFFFFF',
              border: '2px solid rgba(255,255,255,0.8)',
              borderRadius: 999,
              padding: '10px 22px',
              fontSize: 14.5,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 8px 30px rgba(37, 99, 235, 0.6)',
              cursor: 'pointer',
              animation: 'pulseGlow 1.8s infinite'
            }}
          >
            <Volume2 size={20} />
            <span>NHẤN ĐỂ BẬT TIẾNG VIDEO 🔊</span>
          </button>
        )}

        {/* Nút Play to đùng giữa màn hình khi tạm dừng */}
        {!isPlaying && !isEnded && (
          <button
            type="button"
            onClick={togglePlay}
            style={{
              position: 'absolute',
              zIndex: 20,
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              color: '#1D4ED8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 12px 35px rgba(0,0,0,0.4)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            title="Bấm để phát video (Phím Cách)"
          >
            <Play size={34} fill="#1D4ED8" style={{ marginLeft: 4 }} />
          </button>
        )}

        {/* Khung Kết Thúc Video (Finish Screen) */}
        {isEnded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 25,
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: 24,
            textAlign: 'center'
          }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(34, 197, 94, 0.4)'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 style={{ fontSize: 24, fontWeight: 900, color: '#FFFFFF', margin: 0 }}>
                Video Giới Thiệu Đã Hoàn Thành!
              </h3>
              <p style={{ fontSize: 15, color: '#94A3B8', marginTop: 6, maxWidth: 460 }}>
                Ba bé Đạm, Lân và Kali đã sẵn sàng đồng hành cùng bạn khám phá chi tiết 15 câu hỏi hóa học thực tế!
              </p>
            </div>

            <div style={{ display: 'flex', gap: 14, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={handleReplay}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  borderRadius: 14,
                  padding: '10px 20px',
                  fontSize: 14.5,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={18} />
                <span>Xem lại video</span>
              </button>

              <button
                type="button"
                onClick={onNext}
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: 14,
                  padding: '12px 26px',
                  fontSize: 15,
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(37, 99, 235, 0.45)'
                }}
              >
                <span>Sang Slide 03: Giới thiệu thành viên</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Thanh Điều Khiển Video Hiện Đại (Controls Bar) */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          padding: '16px 20px 14px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          opacity: showControls || !isPlaying ? 1 : 0,
          pointerEvents: showControls || !isPlaying ? 'auto' : 'none',
          transition: 'opacity 0.25s ease'
        }}>
          {/* Thanh Tiến Trình (Scrub Bar) */}
          <div
            onClick={handleSeek}
            style={{
              position: 'relative',
              width: '100%',
              height: 6,
              background: 'rgba(255, 255, 255, 0.22)',
              borderRadius: 999,
              cursor: 'pointer',
              transition: 'height 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.height = '10px')}
            onMouseLeave={(e) => (e.currentTarget.style.height = '6px')}
            title="Nhấn hoặc kéo để chuyển đoạn video"
          >
            {/* Vạch nạp trước bộ nhớ đệm (Buffered Ahead - Chạy mượt không khựng) */}
            <div 
              ref={bufferFillRef}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '0%',
                background: 'rgba(255, 255, 255, 0.38)',
                borderRadius: 999,
                pointerEvents: 'none',
                transition: 'width 0.25s ease'
              }} 
            />

            {/* Vạch đã phát (cập nhật trực tiếp qua Ref để zero re-render, chống giật) */}
            <div 
              ref={progressFillRef}
              style={{
                width: '0%',
                height: '100%',
                background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
                borderRadius: 999,
                position: 'relative'
              }}
            >
              {/* Nút tròn đầu kim */}
              <div style={{
                position: 'absolute',
                right: -6,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#FFFFFF',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
              }} />
            </div>
          </div>

          {/* Các nút bấm điều khiển */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            {/* Nhóm trái: Play/Pause, Replay, Thời gian */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                onClick={togglePlay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4
                }}
                title={isPlaying ? 'Tạm dừng (Phím Cách)' : 'Phát tiếp (Phím Cách)'}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} fill="#FFFFFF" />}
              </button>

              <button
                type="button"
                onClick={handleReplay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#CBD5E1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 4
                }}
                title="Phát lại từ đầu (Phím R)"
              >
                <RotateCcw size={18} />
              </button>

              {/* Đồng hồ thời gian cập nhật tức thì */}
              <div style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0', fontVariantNumeric: 'tabular-nums' }}>
                <span ref={timeTextRef}>00:00</span>
                <span style={{ margin: '0 4px', opacity: 0.5 }}>/</span>
                <span ref={durationTextRef} style={{ opacity: 0.8 }}>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Nhóm phải: Âm lượng, Tốc độ, Toàn màn hình, Nút Chuyển Tiếp Slide */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Cụm Âm lượng */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  type="button"
                  onClick={toggleMute}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: isMuted ? '#EF4444' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 4
                  }}
                  title={isMuted ? 'Bật tiếng (Phím M)' : 'Tắt tiếng (Phím M)'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  style={{
                    width: 70,
                    height: 4,
                    accentColor: '#3B82F6',
                    cursor: 'pointer'
                  }}
                  title="Thanh trượt âm lượng"
                />
              </div>

              {/* Nút tốc độ (Mặc định 1.5x) */}
              <button
                type="button"
                onClick={cyclePlaybackRate}
                style={{
                  background: playbackRate === 1.5 ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'rgba(255, 255, 255, 0.14)',
                  border: playbackRate === 1.5 ? '1.5px solid #93C5FD' : '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF',
                  borderRadius: 7,
                  padding: '3px 9px',
                  fontSize: 12,
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: playbackRate === 1.5 ? '0 0 12px rgba(37, 99, 235, 0.6)' : 'none'
                }}
                title="Thay đổi tốc độ phát (Mặc định 1.5x)"
              >
                {playbackRate}x
              </button>

              {/* Toàn màn hình */}
              <button
                type="button"
                onClick={toggleFullscreen}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#CBD5E1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4
                }}
                title="Xem toàn màn hình (Phím F)"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>

              {/* Nút Chuyển Tiếp Sang Slide 3 */}
              <button
                type="button"
                onClick={onNext}
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: 10,
                  padding: '6px 14px',
                  fontSize: 13,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}
                title="Chuyển sang Slide tiếp theo (Phím →)"
              >
                <span>Bỏ qua sang Slide 3</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thanh Linh Thú NPK Đồng Hành Cao Cấp */}
      <div style={{
        margin: '0 auto',
        width: '100%',
        maxWidth: 980,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.95) 100%)',
        border: '1.5px solid rgba(147, 197, 253, 0.6)',
        borderRadius: 18,
        padding: '7px 18px',
        boxShadow: '0 8px 24px rgba(37, 99, 235, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexShrink: 0,
        transition: 'all 0.25s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Avatar 3 bé N - P - K Chibi thu nhỏ dễ thương */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#DCFCE7', border: '2.5px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(34,197,94,0.25)', zIndex: 3 }}>
              <LinhThuDam emotion="happy" size={30} />
            </div>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#EDE9FE', border: '2.5px solid #FFFFFF', marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(139,92,246,0.25)', zIndex: 2 }}>
              <LinhThuLan emotion="happy" size={30} />
            </div>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#FEF3C7', border: '2.5px solid #FFFFFF', marginLeft: -10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 10px rgba(245,158,11,0.25)', zIndex: 1 }}>
              <LinhThuKali emotion="happy" size={30} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: 6,
                letterSpacing: '0.04em'
              }}>
                🌾 BIỆT ĐỘI NPK TIẾP SỨC
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#1E293B' }}>
                Hành trình bứt phá của hạt mầm
              </span>
            </div>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.35, fontWeight: 600 }}>
              Hạt mầm lớn nhanh nhờ <strong style={{ color: '#16A34A' }}>Đạm (lá xanh)</strong> — <strong style={{ color: '#7C3AED' }}>Lân (rễ sâu)</strong> — <strong style={{ color: '#D97706' }}>Kali (chắc quả ngọt)</strong>! 🌱⚡🍊
            </div>
          </div>
        </div>

        {/* Nút chỉ dẫn hoặc thời lượng video tính theo tốc độ đang phát */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1.2px solid #BFDBFE',
          borderRadius: 12,
          padding: '6px 14px',
          flexShrink: 0
        }}>
          <Sparkles size={16} color="#2563EB" />
          <span style={{ fontSize: 12.5, fontWeight: 800, color: '#1E40AF' }}>
            Thời lượng: {playbackRate === 1.5 ? '00:49 (1.5x)' : `${formatTime(duration ? duration / playbackRate : 48.6)} (${playbackRate}x)`}
          </span>
        </div>
      </div>
    </div>
  );
}
