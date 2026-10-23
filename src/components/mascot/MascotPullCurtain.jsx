import React, { useState, useEffect } from 'react';

/**
 * MascotPullCurtain: Hiệu ứng các Bé Mascot chạy ra kéo nội dung mới lên cực kỳ dễ thương
 * - Hỗ trợ kéo tiến (Next), kéo lùi (Prev) và chuyển chương (Đạm, Lân, Kali)
 * - Mascot tương ứng với chương: Bé Đạm (Sprouty N), Bé Lân (Sparky P), Bé Kali (Sunny K)
 * - Tự động nhúng CSS keyframes & Pháo hoa giấy SVG/DOM tự thân (không lo thiếu thư viện ngoài!)
 */
export default function MascotPullCurtain({
  isActive,
  direction = 'next',
  currentChapter = 'DAM',
  targetChapter = 'DAM',
  onPullComplete,
}) {
  const [phase, setPhase] = useState('idle'); // 'running_in' -> 'heaving' -> 'landed' -> 'celebrating'

  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      return;
    }

    setPhase('running_in');

    const timer1 = setTimeout(() => {
      setPhase('heaving');
    }, 180);

    const timer2 = setTimeout(() => {
      setPhase('landed');
    }, 520);

    const timer3 = setTimeout(() => {
      setPhase('celebrating');
    }, 680);

    const timer4 = setTimeout(() => {
      if (onPullComplete) onPullComplete();
    }, 920);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isActive, onPullComplete]);

  if (!isActive) return null;

  const isNext = direction === 'next';
  const mascotId = targetChapter || currentChapter || 'DAM';

  const getRopeTheme = () => {
    switch (mascotId) {
      case 'DAM':
        return { primary: '#22C55E', secondary: '#86EFAC', badge: '🌱 BÉ ĐẠM KÉO SLIDE' };
      case 'LAN':
        return { primary: '#8B5CF6', secondary: '#C4B5FD', badge: '⚡ BÉ LÂN NẠP PIN' };
      case 'KALI':
      default:
        return { primary: '#F59E0B', secondary: '#FDE047', badge: '🍊 BÉ KALI KÉO QUẢ' };
    }
  };

  const ropeTheme = getRopeTheme();

  return (
    <div
      className={`mascot-pull-curtain-overlay ${isNext ? 'pull-next' : 'pull-prev'} phase-${phase}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 28,
        overflow: 'hidden',
        background:
          phase === 'heaving'
            ? 'radial-gradient(circle at 50% 80%, rgba(255,255,255,0.22), rgba(15,23,42,0.12))'
            : 'transparent',
        transition: 'background 0.25s ease',
      }}
    >
      <style>{`
        @keyframes pullStrainWobble {
          0%, 100% { transform: rotate(-6deg) scale(1.04, 0.96); }
          50% { transform: rotate(6deg) scale(0.96, 1.04); }
        }
        @keyframes pullCelebrateJump {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-22px) scale(1.08); }
        }
        @keyframes dustPuffAnim {
          0% { transform: scale(0.4) translateY(0); opacity: 0.9; }
          100% { transform: scale(1.5) translateY(-26px); opacity: 0; }
        }
        @keyframes confettiBurst {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(360deg) scale(0.6); opacity: 0; }
        }
      `}</style>

      {/* Sợi dây thần kỳ neon nối từ tay Bé Mascot kéo bạt slide */}
      <svg
        className="pull-rope-svg"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <defs>
          <filter id="glowRopeNeon" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dây chính phát sáng */}
        <path
          d={
            isNext
              ? `M 480 455 Q ${phase === 'heaving' ? '720 520' : '660 460'}, 1000 ${
                  phase === 'heaving' ? '340' : '410'
                }`
              : `M 520 455 Q ${phase === 'heaving' ? '280 520' : '340 460'}, 0 ${
                  phase === 'heaving' ? '340' : '410'
                }`
          }
          fill="none"
          stroke={ropeTheme.primary}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={phase === 'heaving' ? '16 10' : 'none'}
          filter="url(#glowRopeNeon)"
        />

        {/* Dây xoắn năng lượng phụ */}
        <path
          d={
            isNext
              ? `M 490 468 Q ${phase === 'heaving' ? '740 535' : '680 475'}, 1000 ${
                  phase === 'heaving' ? '440' : '480'
                }`
              : `M 510 468 Q ${phase === 'heaving' ? '260 535' : '320 475'}, 0 ${
                  phase === 'heaving' ? '440' : '480'
                }`
          }
          fill="none"
          stroke="#FDE047"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {/* Nhân vật Bé Mascot đang gồng mình kéo ở trung tâm dưới */}
      <div
        className={`pulling-mascot-actor actor-${mascotId.toLowerCase()}`}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Pháo hoa giấy tự thân khi tới giai đoạn celebrating */}
        {(phase === 'landed' || phase === 'celebrating') && (
          <div style={{ position: 'absolute', top: '40%', left: '50%', pointerEvents: 'none' }}>
            {[
              { tx: '-110px', ty: '-120px', c: '#22C55E', e: '🌿' },
              { tx: '110px', ty: '-115px', c: '#F59E0B', e: '⭐' },
              { tx: '-80px', ty: '-150px', c: '#8B5CF6', e: '⚡' },
              { tx: '85px', ty: '-145px', c: '#EC4899', e: '🎉' },
              { tx: '-140px', ty: '-60px', c: '#38BDF8', e: '✨' },
              { tx: '140px', ty: '-65px', c: '#FACC15', e: '🍊' },
            ].map((p, idx) => (
              <span
                key={idx}
                style={{
                  position: 'absolute',
                  fontSize: 22,
                  '--tx': p.tx,
                  '--ty': p.ty,
                  animation: 'confettiBurst 0.65s ease-out forwards',
                }}
              >
                {p.e}
              </span>
            ))}
          </div>
        )}

        {/* Lời thoại kéo slide ngộ nghĩnh */}
        <div
          className="pull-speech-bubble"
          style={{
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(12px)',
            border: `2.5px solid ${ropeTheme.primary}`,
            borderRadius: 20,
            padding: '10px 18px',
            marginBottom: 8,
            boxShadow: '0 12px 28px rgba(15, 23, 42, 0.16)',
            textAlign: 'center',
            fontWeight: 800,
            fontSize: 14,
            color: '#0F172A',
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 900,
              color: ropeTheme.primary,
              letterSpacing: '0.06em',
              marginBottom: 2,
            }}
          >
            {ropeTheme.badge}
          </div>
          {phase === 'running_in' &&
            (mascotId === 'DAM'
              ? 'Bé Đạm chạy tới kéo slide nè! 🌿🏃💨'
              : mascotId === 'LAN'
              ? 'Bé Lân nạp pin tới kéo đây! ⚡🏃💨'
              : 'Bé Kali lăn tới kéo phụ nè! 🍊🏃💨')}
          {phase === 'heaving' &&
            (isNext
              ? mascotId === 'DAM'
                ? '1... 2... 3... BÉ ĐẠM KÉO NỘI DUNG LÊN! (ง >﹏<)ง'
                : mascotId === 'LAN'
                ? '1... 2... 3... KÉO TRẠM NĂNG LƯỢNG LÊN! ⚡(>﹏<)'
                : '1... 2... 3... BÉ KALI KÉO QUẢ NGỌT LÊN! 🍊(>﹏<)'
              : 'LÙI VỀ SLIDE TRƯỚC NÈ... HỰC HỰC! (>_<)')}
          {phase === 'landed' &&
            (mascotId === 'DAM'
              ? 'HÂY DA... ĐÃ TỚI NƠI RÙI! 🌱✨'
              : mascotId === 'LAN'
              ? 'NẠP ĐẦY ATP CẬP BẾN! ⚡✨'
              : 'CẬP BẾN NGỌT LỊM RÙI ĐÂY! 🍊✨')}
          {phase === 'celebrating' && 'TADAAA! HOAN HÔ MÙA VÀNG BỘI THU! 🎉💖'}
        </div>

        {/* Khói bụi đạp chân siêu dễ thương */}
        {phase === 'heaving' && (
          <div
            className="dust-clouds"
            style={{
              position: 'absolute',
              bottom: 12,
              display: 'flex',
              gap: 24,
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                animation: 'dustPuffAnim 0.45s ease-out infinite',
              }}
            />
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'rgba(254,240,138,0.85)',
                animation: 'dustPuffAnim 0.45s ease-out infinite 0.15s',
              }}
            />
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                animation: 'dustPuffAnim 0.45s ease-out infinite 0.25s',
              }}
            />
          </div>
        )}

        {/* Mascot SVG Actor */}
        <div
          className="mascot-actor-body"
          style={{
            animation:
              phase === 'heaving'
                ? 'pullStrainWobble 0.28s ease-in-out infinite'
                : phase === 'celebrating'
                ? 'pullCelebrateJump 0.45s ease-in-out infinite'
                : 'none',
          }}
        >
          {mascotId === 'DAM' && <PullerSprouty phase={phase} isNext={isNext} />}
          {mascotId === 'LAN' && <PullerSparky phase={phase} isNext={isNext} />}
          {(mascotId === 'KALI' || mascotId === 'INTRO' || mascotId === 'CLOSING') && (
            <PullerSunny phase={phase} isNext={isNext} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   BÉ ĐẠM KÉO DÂY (SPROUTY PULLER)
   ========================================================================== */
function PullerSprouty({ phase, isNext }) {
  const isStraining = phase === 'heaving';

  return (
    <svg viewBox="0 0 170 170" width="185" height="185">
      <defs>
        <radialGradient id="sproutPull3D" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#D9F99D" />
          <stop offset="35%" stopColor="#86EFAC" />
          <stop offset="70%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </radialGradient>
      </defs>

      {/* Tai lá ngửa về sau khi gồng kéo */}
      <g transform={isStraining ? (isNext ? 'rotate(-22 85 44)' : 'rotate(22 85 44)') : ''}>
        <path d="M 85 44 C 55 16, 22 26, 38 50 C 48 64, 74 54, 85 44" fill="#86EFAC" stroke="#14532D" strokeWidth="2.8" />
        <path d="M 85 44 C 115 16, 148 26, 132 50 C 122 64, 96 54, 85 44" fill="#86EFAC" stroke="#14532D" strokeWidth="2.8" />
        <path d="M 85 44 L 85 58" stroke="#14532D" strokeWidth="4.5" strokeLinecap="round" />
      </g>

      {/* Chân đạp đất */}
      <ellipse cx="66" cy="150" rx="12" ry="8" fill="#15803D" stroke="#052E16" strokeWidth="2.5" />
      <ellipse cx="104" cy="150" rx="12" ry="8" fill="#15803D" stroke="#052E16" strokeWidth="2.5" />

      {/* Thân tròn vo dồn sức */}
      <circle cx="85" cy="104" r="49" fill="url(#sproutPull3D)" stroke="#14532D" strokeWidth="3.2" />
      <ellipse cx="68" cy="74" rx="18" ry="8" transform="rotate(-18 68 74)" fill="#FFFFFF" opacity="0.4" />

      {/* Kính bảo hộ khoa học */}
      <g transform="translate(5, -4)">
        <rect x="52" y="66" width="24" height="16" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
        <rect x="86" y="66" width="24" height="16" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
        <line x1="76" y1="74" x2="86" y2="74" stroke="#0284C7" strokeWidth="3" />
      </g>

      {/* Má hồng phồng to vì gồng */}
      <ellipse cx="58" cy="110" rx={isStraining ? 11 : 8} ry={isStraining ? 7.5 : 5} fill="#FB7185" />
      <ellipse cx="112" cy="110" rx={isStraining ? 11 : 8} ry={isStraining ? 7.5 : 5} fill="#FB7185" />

      {/* Mắt biểu cảm (>﹏<) */}
      {isStraining ? (
        <g stroke="#052E16" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 58 92 L 72 98 L 58 104" />
          <path d="M 112 92 L 98 98 L 112 104" />
          <path
            d="M 124 72 C 124 65, 131 60, 131 60 C 131 60, 138 65, 138 72 C 138 77, 135 80, 131 80 C 127 80, 124 77, 124 72 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="1.5"
          />
        </g>
      ) : (
        <g stroke="#052E16" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M 60 96 Q 68 86, 76 96" />
          <path d="M 94 96 Q 102 86, 110 96" />
        </g>
      )}

      {/* Miệng gồng sóng hoặc cười lớn */}
      {isStraining ? (
        <path
          d="M 73 114 Q 79 109, 85 114 Q 91 119, 97 114"
          fill="none"
          stroke="#052E16"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      ) : (
        <path d="M 75 108 Q 85 124, 95 108 Z" fill="#E11D48" stroke="#052E16" strokeWidth="2.2" />
      )}

      {/* 2 Tay nắm chặt dây thừng */}
      <g stroke="#14532D" strokeWidth="6.5" strokeLinecap="round" fill="none">
        <path d={isNext ? 'M 54 114 L 85 124 L 122 118' : 'M 116 114 L 85 124 L 48 118'} />
      </g>
    </svg>
  );
}

/* ==========================================================================
   BÉ LÂN KÉO DÂY (SPARKY PULLER)
   ========================================================================== */
function PullerSparky({ phase, isNext }) {
  const isStraining = phase === 'heaving';

  return (
    <svg viewBox="0 0 170 170" width="185" height="185">
      <defs>
        <radialGradient id="sparkyPull3D" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#F3E8FF" />
          <stop offset="35%" stopColor="#C4B5FD" />
          <stop offset="70%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#4C1D95" />
        </radialGradient>
      </defs>

      {/* Thân củ rễ phát quang */}
      <path
        d="M 85 50 C 126 50, 138 96, 126 128 C 115 148, 100 150, 85 150 C 70 150, 55 148, 44 128 C 32 96, 44 50, 85 50 Z"
        fill="url(#sparkyPull3D)"
        stroke="#4C1D95"
        strokeWidth="3.2"
      />
      <ellipse cx="68" cy="74" rx="16" ry="7" transform="rotate(-20 68 74)" fill="#FFFFFF" opacity="0.4" />

      {/* Vương miện vàng */}
      <polygon points="66,50 74,32 85,44 96,32 104,50" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.2" />

      {/* Má hồng */}
      <ellipse cx="60" cy="108" rx={isStraining ? 10 : 7.5} ry={isStraining ? 6.5 : 4.5} fill="#F472B6" />
      <ellipse cx="110" cy="108" rx={isStraining ? 10 : 7.5} ry={isStraining ? 6.5 : 4.5} fill="#F472B6" />

      {/* Mắt biểu cảm */}
      {isStraining ? (
        <g stroke="#1E1B4B" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 58 92 L 72 98 L 58 104" />
          <path d="M 112 92 L 98 98 L 112 104" />
          <path
            d="M 122 72 C 122 65, 129 60, 129 60 C 129 60, 136 65, 136 72 C 136 77, 133 80, 129 80 C 125 80, 122 77, 122 72 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="1.5"
          />
        </g>
      ) : (
        <g fill="#FDE047">
          <text x="58" y="100" fontSize="22" fontWeight="bold">★</text>
          <text x="96" y="100" fontSize="22" fontWeight="bold">★</text>
        </g>
      )}

      {/* Cục pin ATP bắn tia sét khi kéo */}
      <g transform="translate(71, 122)">
        <rect x="0" y="0" width="28" height="15" rx="4" fill="#FDE047" stroke="#1E1B4B" strokeWidth="1.8" />
        <path d="M 15 2 L 9 8 L 15 8 L 12 13 L 19 6 L 14 6 Z" fill="#EA580C" />
      </g>

      {/* 2 Tay nắm dây */}
      <g stroke="#4C1D95" strokeWidth="6.5" strokeLinecap="round" fill="none">
        <path d={isNext ? 'M 54 114 L 85 124 L 122 118' : 'M 116 114 L 85 124 L 48 118'} />
      </g>
    </svg>
  );
}

/* ==========================================================================
   BÉ KALI KÉO DÂY (SUNNY PULLER)
   ========================================================================== */
function PullerSunny({ phase, isNext }) {
  const isStraining = phase === 'heaving';

  return (
    <svg viewBox="0 0 170 170" width="185" height="185">
      <defs>
        <radialGradient id="sunnyPull3D" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="35%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>

      {/* Chân đạp đất */}
      <ellipse cx="66" cy="150" rx="12" ry="8" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
      <ellipse cx="104" cy="150" rx="12" ry="8" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />

      {/* Thân quả tròn vo */}
      <circle cx="85" cy="104" r="49" fill="url(#sunnyPull3D)" stroke="#92400E" strokeWidth="3.2" />
      <ellipse cx="68" cy="74" rx="18" ry="8" transform="rotate(-18 68 74)" fill="#FFFFFF" opacity="0.45" />

      {/* Cuống lá & Bông hoa nhỏ rung rinh */}
      <path d="M 85 44 L 85 56" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="110" cy="50" r="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <circle cx="110" cy="50" r="4" fill="#F59E0B" />

      {/* Má phúng phính */}
      <ellipse cx="58" cy="110" rx={isStraining ? 11 : 8} ry={isStraining ? 7.5 : 5} fill="#FB7185" />
      <ellipse cx="112" cy="110" rx={isStraining ? 11 : 8} ry={isStraining ? 7.5 : 5} fill="#FB7185" />

      {/* Mắt biểu cảm */}
      {isStraining ? (
        <g stroke="#451A03" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 58 92 L 72 98 L 58 104" />
          <path d="M 112 92 L 98 98 L 112 104" />
          <path
            d="M 124 72 C 124 65, 131 60, 131 60 C 131 60, 138 65, 138 72 C 138 77, 135 80, 131 80 C 127 80, 124 77, 124 72 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="1.5"
          />
        </g>
      ) : (
        <g stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none">
          <path d="M 60 96 Q 68 86, 76 96" />
          <path d="M 94 96 Q 102 86, 110 96" />
        </g>
      )}

      {/* Miệng dồn sức */}
      {isStraining ? (
        <ellipse cx="85" cy="114" rx="6" ry="8" fill="#E11D48" stroke="#451A03" strokeWidth="2.2" />
      ) : (
        <path d="M 75 108 Q 85 124, 95 108 Z" fill="#E11D48" stroke="#451A03" strokeWidth="2.2" />
      )}

      {/* Chiếc khiên mini K cài hông */}
      <g transform="translate(26, 98)">
        <path d="M 11 0 C 22 0, 22 15, 11 26 C 0 15, 0 0, 11 0 Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.8" />
        <text x="11" y="16" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF">K</text>
      </g>

      {/* 2 Tay nắm dây kéo */}
      <g stroke="#92400E" strokeWidth="6.5" strokeLinecap="round" fill="none">
        <path d={isNext ? 'M 54 114 L 85 124 L 122 118' : 'M 116 114 L 85 124 L 48 118'} />
      </g>
    </svg>
  );
}
