import React, { useState } from 'react';

/**
 * LINH THÚ 2: BÉ LÂN — SPARKY P (Củ Rễ Tím Năng Lượng ATP Siêu Cấp)
 * Biểu cảm chuyên biệt cho từng Slide:
 * - Slide 09: energy (hai mắt sao vàng, pin ATP rực sáng phát tia chớp)
 * - Slide 10: detective (đội mũ thám tử, cầm kính lúp soi thạch cao CaSO4)
 * - Slide 11: scientist (đeo kính thí nghiệm, lắc bình tam giác axit hữu cơ rễ cây)
 * - Slide 12: astronaut (đội mũ phi hành gia vũ trụ, phóng tên lửa rễ non)
 * - Slide 13: miner (đội mũ thợ mỏ đèn pha LED, ôm tinh thể quặng Apatit Lào Cai)
 */
export default function LinhThuLan({ emotion = 'happy', size = 140, className = '' }) {
  const [booped, setBooped] = useState(false);

  const handleBoop = () => {
    setBooped(true);
    setTimeout(() => setBooped(false), 650);
  };

  return (
    <div
      onClick={handleBoop}
      className={`linh-thu-mascot linh-thu-lan ${booped ? 'is-booped' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        filter: 'drop-shadow(0 12px 24px rgba(139, 92, 246, 0.42))',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: booped ? 'scale(1.12) translateY(-6px)' : 'scale(1)',
      }}
      title="Bé Lân — Sparky P: Trạm phát năng lượng ATP và bệ phóng bộ rễ (Bấm vào bé để nạp năng lượng!)"
    >
      <style>{`
        @keyframes lanBreathe {
          0%, 100% { transform: translateY(0px) scale(1, 1); }
          50% { transform: translateY(-6px) scale(1.02, 0.98); }
        }
        @keyframes lanRootWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(6deg); }
        }
        @keyframes lanSparkPulse {
          0%, 100% { transform: scale(0.92); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        @keyframes lanCrownFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <svg
        viewBox="0 0 180 180"
        width="100%"
        height="100%"
        style={{
          animation: 'lanBreathe 3s ease-in-out infinite',
          overflow: 'visible',
        }}
      >
        <defs>
          {/* Thân củ rễ thạch anh tím 3D */}
          <radialGradient id="lanBody3D" cx="35%" cy="28%" r="68%">
            <stop offset="0%" stopColor="#F3E8FF" />
            <stop offset="30%" stopColor="#C4B5FD" />
            <stop offset="68%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#4C1D95" />
          </radialGradient>

          {/* Hào quang bụng phát sáng */}
          <radialGradient id="lanBellyGlow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </radialGradient>

          {/* Vương miện & Tia chớp vàng */}
          <linearGradient id="lanGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          {/* Tinh thể Apatit */}
          <linearGradient id="lanCrystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D0FE" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
        </defs>

        {/* Bóng đổ dưới chân */}
        <ellipse cx="90" cy="168" rx="40" ry="7.5" fill="rgba(91, 33, 182, 0.24)" />

        {/* Tia chớp năng lượng ATP & Hạt P bay quanh */}
        <g style={{ animation: 'lanSparkPulse 2.2s ease-in-out infinite', transformOrigin: '90px 90px' }}>
          <circle cx="24" cy="56" r="10" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
          <text x="24" y="60" textAnchor="middle" fill="#5B21B6" fontSize="11" fontWeight="900" fontFamily="sans-serif">
            P
          </text>
          {/* Tia sét mini */}
          <path d="M 154 42 L 146 54 L 153 54 L 149 64 L 161 50 L 154 50 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          {booped && (
            <g>
              <text x="32" y="32" fontSize="18">⚡</text>
              <text x="136" y="32" fontSize="18">💜</text>
            </g>
          )}
        </g>

        {/* 1. CHÙM RỄ NON TUA RUA NGÚNG NGUẨY PHÍA DƯỚI */}
        <g
          stroke="#4C1D95"
          strokeWidth="3.8"
          strokeLinecap="round"
          fill="none"
          style={{ transformOrigin: '90px 148px', animation: 'lanRootWiggle 2.4s ease-in-out infinite' }}
        >
          <path d="M 70 146 Q 60 160, 50 164" />
          <path d="M 80 148 Q 76 162, 72 167" />
          <path d="M 90 150 Q 90 164, 90 169" />
          <path d="M 100 148 Q 104 162, 108 167" />
          <path d="M 110 146 Q 120 160, 130 164" />
          {/* Đầu chóp rễ phát sáng vàng hấp thu dinh dưỡng */}
          <circle cx="50" cy="164" r="2.5" fill="#FDE047" stroke="none" />
          <circle cx="90" cy="169" r="2.5" fill="#FDE047" stroke="none" />
          <circle cx="130" cy="164" r="2.5" fill="#FDE047" stroke="none" />
        </g>

        {/* 2. THÂN CỦ RỄ TÍM PHÁT QUANG TRÒN MŨM MĨM */}
        <g>
          <path
            d="M 90 48 C 134 48, 146 98, 134 132 C 122 154, 106 155, 90 155 C 74 155, 58 154, 46 132 C 34 98, 46 48, 90 48 Z"
            fill="url(#lanBody3D)"
            stroke="#4C1D95"
            strokeWidth="3.2"
          />
          {/* Specular 3D Highlight */}
          <ellipse cx="70" cy="74" rx="20" ry="9" transform="rotate(-22 70 74)" fill="#FFFFFF" opacity="0.42" />
          <circle cx="52" cy="88" r="3.5" fill="#FFFFFF" opacity="0.38" />
          <ellipse cx="90" cy="124" rx="32" ry="22" fill="url(#lanBellyGlow)" />
        </g>

        {/* 3. MŨ & VƯƠNG MIỆN THEO TỪNG VAI TRÒ SLIDE */}
        {/* Slide 13: Mũ thợ mỏ địa chất có đèn pha rọi sáng (miner) */}
        {emotion === 'miner' && (
          <g transform="translate(0, 4)">
            <path d="M 52 52 C 52 26, 128 26, 128 52 Z" fill="#FACC15" stroke="#B45309" strokeWidth="2.8" />
            <ellipse cx="90" cy="52" rx="44" ry="10" fill="#EAB308" stroke="#B45309" strokeWidth="2.8" />
            {/* Đèn pha LED thợ mỏ */}
            <circle cx="90" cy="38" r="8" fill="#FEF08A" stroke="#475569" strokeWidth="2.5" />
            <circle cx="90" cy="38" r="4" fill="#FFFFFF" />
            {/* Luồng sáng đèn rọi */}
            <polygon points="84,34 62,8 118,8 96,34" fill="#FEF08A" opacity="0.38" />
          </g>
        )}

        {/* Slide 12: Mũ phi hành gia vũ trụ trong suốt (astronaut) */}
        {emotion === 'astronaut' && (
          <g>
            {/* Ăng-ten phi thuyền */}
            <line x1="90" y1="16" x2="90" y2="28" stroke="#0284C7" strokeWidth="3" />
            <circle cx="90" cy="14" r="4.5" fill="#F43F5E" stroke="#FFE4E6" strokeWidth="1.5" />
            {/* Vòm kính phi hành gia */}
            <circle
              cx="90"
              cy="92"
              r="54"
              fill="rgba(224, 242, 254, 0.22)"
              stroke="#38BDF8"
              strokeWidth="3"
              strokeDasharray="120 18"
            />
            <path d="M 54 58 Q 76 42, 108 52" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
          </g>
        )}

        {/* Slide 10: Mũ thám tử Sherlock (detective) */}
        {emotion === 'detective' && (
          <g transform="translate(90, 46)">
            <ellipse cx="0" cy="6" rx="42" ry="9" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
            <path d="M -32 6 C -32 -18, 32 -18, 32 6 Z" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
            <path d="M -8 -14 Q 0 -22, 8 -14" fill="none" stroke="#451A03" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Vương miện ngọc Photphat lấp lánh (Default, Slide 09 energy, Slide 11 scientist) */}
        {emotion !== 'miner' && emotion !== 'astronaut' && emotion !== 'detective' && (
          <g style={{ animation: 'lanCrownFloat 2.6s ease-in-out infinite' }}>
            {/* Hai mầm lá tím nhỏ bên dưới vương miện */}
            <path d="M 90 48 C 76 34, 60 38, 68 48" fill="#A855F7" stroke="#4C1D95" strokeWidth="2" />
            <path d="M 90 48 C 104 34, 120 38, 112 48" fill="#A855F7" stroke="#4C1D95" strokeWidth="2" />
            <polygon
              points="66,48 74,24 90,38 106,24 114,48"
              fill="url(#lanGoldGrad)"
              stroke="#B45309"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="90" cy="36" r="4" fill="#9333EA" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="74" cy="24" r="3" fill="#FEF08A" />
            <circle cx="106" cy="24" r="3" fill="#FEF08A" />
          </g>
        )}

        {/* Kính bảo hộ khoa học cho Slide 11 (scientist) */}
        {emotion === 'scientist' && (
          <g transform="translate(0, -2)">
            <rect x="54" y="64" width="30" height="18" rx="8" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2.8" opacity="0.9" />
            <rect x="96" y="64" width="30" height="18" rx="8" fill="#F3E8FF" stroke="#7C3AED" strokeWidth="2.8" opacity="0.9" />
            <line x1="84" y1="73" x2="96" y2="73" stroke="#7C3AED" strokeWidth="3" />
          </g>
        )}

        {/* 4. MÁ HỒNG TÍM & ĐỐM ĐIỆN TÍCH PIKACHU */}
        <g>
          <ellipse cx="56" cy="110" rx="10" ry="6.5" fill="#F472B6" opacity="0.85" />
          <ellipse cx="124" cy="110" rx="10" ry="6.5" fill="#F472B6" opacity="0.85" />
          {/* Tia sét nhỏ bên má */}
          <path d="M 44 108 L 49 105 L 47 111 L 52 109" fill="none" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 136 108 L 131 105 L 133 111 L 128 109" fill="none" stroke="#FDE047" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* 5. ĐÔI MẮT NGÔI SAO NĂNG LƯỢNG ANIME */}
        <g>
          <ellipse cx="68" cy="98" rx="8.5" ry="10.5" fill="#2E1065" stroke="#1E1B4B" strokeWidth="2" />
          <ellipse cx="112" cy="98" rx="8.5" ry="10.5" fill="#2E1065" stroke="#1E1B4B" strokeWidth="2" />
          {/* Ngôi sao vàng lấp lánh bên trong con ngươi */}
          <polygon points="68,90 70,95 76,95 71,99 73,104 68,101 63,104 65,99 60,95 66,95" fill="#FDE047" />
          <polygon points="112,90 114,95 120,95 115,99 117,104 112,101 107,104 109,99 104,95 110,95" fill="#FDE047" />
          <circle cx="64" cy="92" r="2.5" fill="#FFFFFF" />
          <circle cx="108" cy="92" r="2.5" fill="#FFFFFF" />
        </g>

        {/* 6. MIỆNG CƯỜI NĂNG LƯỢNG */}
        <g>
          <path d="M 79 108 Q 90 122, 101 108 Z" fill="#E11D48" stroke="#2E1065" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 83 114 Q 90 120, 97 114 Z" fill="#FDA4AF" />
        </g>

        {/* 7. PHỤ KIỆN ĐỘC QUYỀN TRÊN TAY THEO SLIDE */}
        {/* Tay trái vẫy */}
        <path d="M 42 114 Q 26 104, 28 118" fill="none" stroke="#5B21B6" strokeWidth="6.5" strokeLinecap="round" />

        {/* Slide 10: Kính lúp soi tinh thể Thạch Cao CaSO4 + P (detective) */}
        {emotion === 'detective' && (
          <g transform="translate(114, 90)">
            <circle cx="20" cy="20" r="17" fill="rgba(224, 242, 254, 0.88)" stroke="#0284C7" strokeWidth="3.5" />
            <line x1="32" y1="32" x2="46" y2="46" stroke="#78350F" strokeWidth="5.5" strokeLinecap="round" />
            <polygon points="20,10 28,18 20,28 12,18" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="1.2" />
            <text x="20" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900">P</text>
          </g>
        )}

        {/* Slide 11: Bình tam giác Erlenmeyer chứa Axit hữu cơ rễ cây (scientist) */}
        {emotion === 'scientist' && (
          <g transform="translate(122, 88)">
            <polygon points="12,6 22,6 32,36 2,36" fill="#F3E8FF" stroke="#6D28D9" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="6,22 28,22 31,35 3,35" fill="#C084FC" />
            <line x1="9" y1="6" x2="25" y2="6" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
            <circle cx="14" cy="28" r="2.2" fill="#FEF08A" />
            <circle cx="21" cy="25" r="1.8" fill="#FFFFFF" />
            <circle cx="17" cy="15" r="2" fill="#C084FC" />
          </g>
        )}

        {/* Slide 12: Tên lửa bệ phóng rễ non (astronaut) */}
        {emotion === 'astronaut' && (
          <g transform="translate(124, 86)" style={{ animation: 'lanCrownFloat 1.5s ease-in-out infinite' }}>
            <polygon points="16,0 28,28 4,28" fill="#EF4444" stroke="#991B1B" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="4,22 -2,30 8,28" fill="#B91C1C" />
            <polygon points="28,22 34,30 24,28" fill="#B91C1C" />
            <polygon points="10,28 22,28 16,42" fill="#FACC15" stroke="#EA580C" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="4.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
          </g>
        )}

        {/* Slide 13: Tinh thể quặng Apatit Lào Cai phát sáng (miner) */}
        {emotion === 'miner' && (
          <g transform="translate(68, 120)">
            <polygon points="6,4 38,0 44,22 22,30 0,20" fill="url(#lanCrystalGrad)" stroke="#4C1D95" strokeWidth="2.2" />
            <polygon points="12,6 32,4 36,18 20,24 6,16" fill="#F3E8FF" opacity="0.55" />
            <text x="22" y="19" textAnchor="middle" fill="#3B0764" fontSize="8.5" fontWeight="900">APATIT</text>
          </g>
        )}

        {/* Slide 09 & Default: Viên Pin Sinh Học ATP Siêu Năng Lượng trước ngực */}
        {emotion !== 'detective' && emotion !== 'scientist' && emotion !== 'astronaut' && emotion !== 'miner' && (
          <g transform="translate(68, 122)">
            <rect x="0" y="0" width="40" height="22" rx="6" fill="url(#lanGoldGrad)" stroke="#1E1B4B" strokeWidth="2.4" />
            <rect x="40" y="6" width="5" height="10" rx="2" fill="#1E1B4B" />
            <path d="M 22 3 L 14 12 L 21 12 L 18 19 L 28 10 L 21 10 Z" fill="#DC2626" />
            <text x="9" y="15" fill="#78350F" fontSize="7.5" fontWeight="900">ATP</text>
          </g>
        )}

        {/* Tay phải mặc định */}
        {emotion !== 'detective' && emotion !== 'scientist' && emotion !== 'astronaut' && (
          <path d="M 138 114 Q 154 104, 152 118" fill="none" stroke="#5B21B6" strokeWidth="6.5" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
}
