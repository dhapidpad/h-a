import React from 'react';

/**
 * Lân nung chảy: so sánh trong nước mưa vs. axit rễ cây tiết ra.
 * Thuần SVG + SMIL/CSS animation, không phụ thuộc thư viện.
 */
export default function SvgFusedPhosphateCups() {
  const glass = 'M 0 0 L 16 226 Q 76 244, 136 226 L 152 0 Z';
  const liquid = 'M 5 52 L 16 222 Q 76 238, 135 222 L 147 52 Z';

  // hạt lân tan: [x, y, r, delay]
  const ions = [
    [-38, -34, 8, 0], [-14, -52, 9, 0.8], [14, -40, 8, 1.6],
    [38, -60, 9, 2.4], [-2, -78, 8, 3.2], [-30, -88, 7, 4],
  ];

  return (
    <svg viewBox="0 0 540 480" width="100%" height="100%" preserveAspectRatio="xMidYMid meet"
         role="img" aria-label="So sánh lân nung chảy trong nước mưa và trong axit rễ cây">
      <style>{`
        .fp-float{animation:fpFloat 4s ease-in-out infinite}
        .fp-wave{animation:fpWave 3.2s ease-in-out infinite}
        .fp-sway{transform-origin:75px 0;animation:fpSway 5s ease-in-out infinite}
        .fp-pulse{transform-box:fill-box;transform-origin:center;animation:fpPulse 2s ease-in-out infinite}
        .fp-shine{animation:fpShine 6s linear infinite}
        @keyframes fpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes fpWave{0%,100%{transform:translateX(0)}50%{transform:translateX(-6px)}}
        @keyframes fpSway{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}
        @keyframes fpPulse{0%,100%{transform:scale(1);opacity:.9}50%{transform:scale(1.35);opacity:1}}
        @keyframes fpShine{0%{transform:translateX(-80px)}100%{transform:translateX(620px)}}
        @media (prefers-reduced-motion:reduce){.fp-float,.fp-wave,.fp-sway,.fp-pulse,.fp-shine{animation:none}}
      `}</style>

      <defs>
        <linearGradient id="fpBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8FBFF" />
          <stop offset="0.5" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F7F2FF" />
        </linearGradient>
        <linearGradient id="fpWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E0F2FE" />
          <stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="fpSap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E8FF" />
          <stop offset="1" stopColor="#C4A5FB" />
        </linearGradient>
        <linearGradient id="fpPill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ECFDF5" />
          <stop offset="1" stopColor="#F0FDF4" />
        </linearGradient>
        <linearGradient id="fpGlassShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="fpGrain" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#94A3B8" />
          <stop offset="1" stopColor="#475569" />
        </radialGradient>
        <radialGradient id="fpIon" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#7C3AED" />
        </radialGradient>
        <radialGradient id="fpGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#A78BFA" stopOpacity="0.55" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
        </radialGradient>
        <filter id="fpShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
        <clipPath id="fpClipL"><path d={glass} /></clipPath>
        <clipPath id="fpClipR"><path d={glass} /></clipPath>
      </defs>

      <rect x="0" y="0" width="540" height="480" rx="24" fill="url(#fpBg)" />

      {/* dấu vs ở giữa */}
      <g transform="translate(270, 215)">
        <circle r="20" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" filter="url(#fpShadow)" />
        <text y="5" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="800">VS</text>
      </g>

      {/* ================= CỐC 1: NƯỚC MƯA ================= */}
      <g transform="translate(46, 24)">
        <rect x="0" y="0" width="200" height="34" rx="17" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="100" y="22" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="800">💧 TRONG NƯỚC MƯA</text>

        {/* mây + giọt mưa */}
        <g transform="translate(24, 66)">
          <g fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1.5">
            <circle cx="40" cy="14" r="14" /><circle cx="62" cy="8" r="17" /><circle cx="86" cy="14" r="13" />
            <rect x="26" y="14" width="74" height="14" rx="7" stroke="none" />
          </g>
          {[44, 64, 84].map((x, i) => (
            <ellipse key={x} cx={x} cy="0" rx="2.2" ry="4.5" fill="#38BDF8">
              <animate attributeName="cy" values="34;78;78" keyTimes="0;0.8;1" dur="1.8s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.7;1" dur="1.8s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </ellipse>
          ))}
        </g>

        <g transform="translate(24, 118)" filter="url(#fpShadow)">
          <path d={glass} fill="#F8FCFF" />
          <g clipPath="url(#fpClipL)">
            <g className="fp-wave">
              <path d={liquid} fill="url(#fpWater)" opacity="0.85" />
              <path d="M -10 52 Q 12 44, 34 52 T 78 52 T 122 52 T 166 52 L 166 70 L -10 70 Z" fill="#BAE6FD" opacity="0.9" />
            </g>

            {/* bọt khí */}
            {[40, 70, 108].map((x, i) => (
              <circle key={x} cx={x} cy="200" r="2.5" fill="#FFFFFF" opacity="0.8">
                <animate attributeName="cy" values="190;70" dur={`${3 + i}s`} begin={`${i}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur={`${3 + i}s`} begin={`${i}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* hạt lân nằm trơ đáy */}
            {[[44, 208, 10], [66, 214, 11], [90, 208, 9], [112, 213, 10], [78, 198, 8], [54, 196, 7]].map(([x, y, r], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={r} fill="url(#fpGrain)" />
                <circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.25} fill="#FFFFFF" opacity="0.45" />
              </g>
            ))}
            <rect className="fp-shine" x="0" y="0" width="30" height="240" fill="url(#fpGlassShine)" opacity="0.35" transform="skewX(-12)" />
          </g>
          <path d={glass} fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 12 14 L 22 196" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />

          {/* nhãn */}
          <g className="fp-float">
            <rect x="8" y="84" width="136" height="50" rx="12" fill="#FFFFFF" opacity="0.92" stroke="#7DD3FC" />
            <text x="76" y="106" textAnchor="middle" fill="#0369A1" fontSize="15" fontWeight="900">KHÔNG TAN!</text>
            <text x="76" y="123" textAnchor="middle" fill="#0284C7" fontSize="10.5" fontWeight="600">Trơ đáy, không bị rửa trôi</text>
          </g>
          <text x="76" y="268" textAnchor="middle" fill="#475569" fontSize="10.5" fontWeight="600">pH ~7 · Nước trung tính</text>
        </g>
      </g>

      {/* ================= CỐC 2: AXIT RỄ CÂY ================= */}
      <g transform="translate(294, 24)">
        <rect x="0" y="0" width="200" height="34" rx="17" fill="#F3EEFF" stroke="#8C6BFA" strokeWidth="1.5" />
        <text x="100" y="22" textAnchor="middle" fill="#5B21B6" fontSize="13" fontWeight="800">🌱 AXIT RỄ CÂY TIẾT RA</text>

        {/* thân cây nhỏ phía trên */}
        <g transform="translate(100, 68)">
          <path d="M 0 52 Q -2 30, 0 12" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" fill="none" />
          <g className="fp-sway" style={{ transformOrigin: '0px 40px' }}>
            <path d="M 0 22 Q -26 10, -34 24 Q -14 34, 0 22 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.2" />
            <path d="M 0 16 Q 26 2, 36 16 Q 16 28, 0 16 Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.2" />
            <path d="M 0 12 Q -6 -6, 4 -12 Q 10 2, 0 12 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.2" />
          </g>
        </g>

        <g transform="translate(24, 118)" filter="url(#fpShadow)">
          <path d={glass} fill="#FCFAFF" />
          <g clipPath="url(#fpClipR)">
            <g className="fp-wave">
              <path d={liquid} fill="url(#fpSap)" opacity="0.85" />
              <path d="M -10 52 Q 12 44, 34 52 T 78 52 T 122 52 T 166 52 L 166 70 L -10 70 Z" fill="#DDD6FE" opacity="0.95" />
            </g>

            {/* rễ chính + rễ phụ + lông hút */}
            <g className="fp-sway" strokeLinecap="round" fill="none">
              <path d="M 76 0 Q 84 60, 74 110 Q 70 140, 76 168" stroke="#8A654A" strokeWidth="7" />
              <path d="M 77 70 Q 58 88, 38 98 M 75 100 Q 100 112, 118 108 M 74 130 Q 54 146, 42 168 M 75 140 Q 98 156, 108 176" stroke="#A47551" strokeWidth="3.5" />
              <path d="M 52 92 l -8 -6 M 48 96 l -8 4 M 106 112 l 8 -6 M 112 110 l 8 5 M 56 146 l -8 -2 M 98 156 l 8 -4" stroke="#D6B896" strokeWidth="1.6" />
            </g>

            {/* giọt axit hữu cơ rỉ ra từ rễ */}
            {[[76, 168, 0], [42, 168, 0.7], [108, 176, 1.4], [38, 98, 2.1], [118, 108, 2.8]].map(([x, y, d], i) => (
              <circle key={i} cx={x} cy={y} r="3.6" fill="#FDE047" stroke="#EAB308" strokeWidth="1">
                <animate attributeName="cy" values={`${y};${y + 26}`} dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* hạt lân đang rã */}
            {[[40, 214, 10], [64, 218, 9], [92, 216, 10], [116, 213, 9]].map(([x, y, r], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r={r + 7} fill="url(#fpGlow)" className="fp-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
                <circle cx={x} cy={y} r={r} fill="#8C6BFA" opacity={0.55 - i * 0.04} />
                <circle cx={x - 7} cy={y - 7} r="2" fill="#FFFFFF" opacity="0.6" />
              </g>
            ))}

            {/* ion photphat bay lên rễ */}
            <g transform="translate(76, 206)">
              {ions.map(([x, y, r, d], i) => (
                <g key={i}>
                  <circle cx={x} cy={0} r={r} fill="url(#fpIon)">
                    <animate attributeName="cy" values={`0;${y * 1.9}`} dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
                    <animate attributeName="cx" values={`${x};${x * 0.2}`} dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="4.8s" begin={`${d}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              ))}
            </g>
            <text x="76" y="203" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800" opacity="0.9">H₂PO₄⁻</text>
            <rect className="fp-shine" x="0" y="0" width="30" height="240" fill="url(#fpGlassShine)" opacity="0.35" transform="skewX(-12)" />
          </g>
          <path d={glass} fill="none" stroke="#8C6BFA" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 12 14 L 22 196" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />

          <g className="fp-float">
            <rect x="4" y="60" width="144" height="26" rx="13" fill="#6D28D9" />
            <text x="76" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900">TAN NHANH CHÓNG!</text>
          </g>
          <text x="76" y="268" textAnchor="middle" fill="#6B21A8" fontSize="10.5" fontWeight="600">pH 5–6 · Axit hữu cơ quanh rễ</text>
        </g>
      </g>

      {/* ================= DẢI GIẢI THÍCH ================= */}
      <g filter="url(#fpShadow)">
        <rect x="40" y="410" width="460" height="56" rx="16" fill="url(#fpPill)" stroke="#36B86A" strokeWidth="2" />
      </g>
      <g transform="translate(66, 438)">
        <circle r="14" fill="#DCFCE7" stroke="#36B86A" />
        <text y="5" textAnchor="middle" fontSize="15">⛰️</text>
      </g>
      <text x="290" y="432" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="800">
        TÍNH KIỀM (pH 8–8,5) + GIÀU CANXI, MAGIÊ, SILIC
      </text>
      <text x="290" y="451" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="600">
        Đặc trị tuyệt vời cho đất đồi dốc dầm mưa và đất phèn trũng miền Tây
      </text>
    </svg>
  );
}