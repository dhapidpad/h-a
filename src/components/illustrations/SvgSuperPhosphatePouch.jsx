import React from 'react';

/* ---------- Dữ liệu tính trước (ổn định giữa các lần render) ---------- */
const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const diamond = (x, y, s) =>
  `${x},${y - s} ${x + s * 0.7},${y} ${x},${y + s} ${x - s * 0.7},${y}`;

const r1 = seeded(7);
// Tinh thể muối tan trong bao supe đơn (nửa trên)
const SINGLE_CRYSTALS = Array.from({ length: 34 }, () => ({
  x: 14 + r1() * 192,
  y: 48 + r1() * 82,
  s: 3 + r1() * 4,
  c: r1() > 0.5 ? '#C084FC' : '#A855F7',
}));
// Cục thạch cao (nửa dưới)
const GYPSUM = Array.from({ length: 16 }, () => {
  const cx = 14 + r1() * 192;
  const cy = 148 + r1() * 100;
  const R = 6 + r1() * 8;
  const pts = Array.from({ length: 6 }, (_, k) => {
    const a = (k / 6) * Math.PI * 2 + r1() * 0.6;
    const rr = R * (0.65 + r1() * 0.5);
    return `${(cx + Math.cos(a) * rr).toFixed(1)},${(cy + Math.sin(a) * rr).toFixed(1)}`;
  }).join(' ');
  return { pts, tone: r1() > 0.5 ? '#CBD5E1' : '#E2E8F0' };
});

const r2 = seeded(19);
// Tinh thể dày đặc trong bao supe kép
const DOUBLE_CRYSTALS = Array.from({ length: 70 }, (_, i) => ({
  x: 12 + r2() * 196,
  y: 46 + r2() * 206,
  s: 3 + r2() * 5,
  c: ['#C4B5FD', '#A78BFA', '#8B5CF6', '#DDD6FE'][Math.floor(r2() * 4)],
  twinkle: i % 9 === 0,
  d: 1.8 + r2() * 2,
}));

const BAG_PATH = 'M 8 24 Q 110 6 212 24 L 220 252 Q 110 276 0 252 Z';
const SEAM_PATH = 'M 8 24 Q 110 6 212 24 L 213 46 Q 110 28 7 46 Z';

/* ---------- Bao phân dùng chung: vỏ, mép khâu, ánh bóng ---------- */
const BagShell = ({ children, stroke, seam }) => (
  <g>
    <ellipse cx="110" cy="268" rx="104" ry="11" fill="#1E1B4B" opacity="0.22" filter="url(#spBlur)" />
    <g clipPath="url(#spBagClip)">{children}</g>

    {/* Mép khâu miệng bao */}
    <path d={SEAM_PATH} fill={seam} stroke={stroke} strokeWidth="1.5" />
    <path
      d="M 9 35 Q 110 17 211 35"
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeDasharray="5 4"
      opacity="0.8"
    />

    {/* Nếp nhăn và ánh bóng nhựa */}
    <g clipPath="url(#spBagClip)" fill="none" strokeLinecap="round">
      <path d="M 30 60 Q 44 120 28 190" stroke="#FFF" strokeWidth="2" opacity="0.28" />
      <path d="M 190 70 Q 176 130 194 210" stroke="#000" strokeWidth="1.6" opacity="0.10" />
      <path d="M 70 240 Q 110 250 150 240" stroke="#000" strokeWidth="1.4" opacity="0.10" />
      <rect x="-4" y="40" width="228" height="240" fill="url(#spSheen)" stroke="none" />
    </g>

    {/* Viền bao */}
    <path d={BAG_PATH} fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
  </g>
);

export default function SvgSuperPhosphatePouch() {
  return (
    <svg
      viewBox="0 0 640 560"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="So sánh supe lân đơn (14–20% P₂O₅, có khoảng 50% thạch cao) và supe lân kép (40–50% P₂O₅, không thạch cao)"
    >
      <defs>
        <linearGradient id="spBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5F3FF" />
          <stop offset="1" stopColor="#E0E7FF" />
        </linearGradient>
        <linearGradient id="spSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFF" stopOpacity="0.38" />
          <stop offset="0.22" stopColor="#FFF" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="spSalt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E8FF" />
          <stop offset="1" stopColor="#DDD6FE" />
        </linearGradient>
        <linearGradient id="spGypsum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1F5F9" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="spRich" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EDE9FE" />
          <stop offset="0.5" stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <radialGradient id="spBadge" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#5B21B6" />
        </radialGradient>
        <radialGradient id="spAura" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#C4B5FD" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spBarGray" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#94A3B8" />
          <stop offset="1" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="spBarPurple" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>

        <clipPath id="spBagClip">
          <path d={BAG_PATH} />
        </clipPath>
        <clipPath id="spFrame">
          <rect x="8" y="8" width="624" height="544" rx="26" />
        </clipPath>

        <filter id="spBlur" x="-30%" y="-100%" width="160%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="spGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="spShadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1E1B4B" floodOpacity="0.25" />
        </filter>
      </defs>

      <g clipPath="url(#spFrame)">
        {/* ===== NỀN ===== */}
        <rect x="0" y="0" width="640" height="560" fill="url(#spBg)" />
        <g stroke="#C7D2FE" strokeWidth="1" opacity="0.5">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={i} x1={i * 52} y1="0" x2={i * 52} y2="560" />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1="0" y1={i * 52} x2="640" y2={i * 52} />
          ))}
        </g>

        {/* ===== TIÊU ĐỀ ===== */}
        <g filter="url(#spShadow)">
          <rect x="150" y="18" width="340" height="32" rx="16" fill="#FFFFFF" stroke="#8C6BFA" strokeWidth="1.6" />
          <text x="320" y="39" textAnchor="middle" fill="#5B21B6" fontSize="14" fontWeight="800">
            Hai loại phân lân supe
          </text>
        </g>

        {/* ===================================================
            BAO 1: SUPE LÂN ĐƠN
           =================================================== */}
        <g transform="translate(50, 0)">
          <g filter="url(#spShadow)">
            <rect x="0" y="62" width="220" height="30" rx="15" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.6" />
          </g>
          <text x="110" y="82" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="800">
            Supe lân đơn (14–20%)
          </text>
          <text x="110" y="109" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="600">
            Quặng + H₂SO₄
          </text>

          <g transform="translate(0, 120)">
            <BagShell stroke="#64748B" seam="#CBD5E1">
              {/* Lớp muối tan */}
              <path d="M -5 40 Q 110 22 225 40 L 225 136 Q 110 152 -5 136 Z" fill="url(#spSalt)" />
              {SINGLE_CRYSTALS.map((c, i) => (
                <polygon key={i} points={diamond(c.x, c.y, c.s)} fill={c.c} opacity="0.85" />
              ))}
              {/* Lớp thạch cao */}
              <path d="M -5 136 Q 110 152 225 136 L 225 262 L -5 262 Z" fill="url(#spGypsum)" />
              {GYPSUM.map((g, i) => (
                <polygon key={i} points={g.pts} fill={g.tone} stroke="#94A3B8" strokeWidth="0.9" />
              ))}
              {/* Đường ranh giữa hai lớp */}
              <path
                d="M -5 136 Q 110 152 225 136"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />

              {/* Chữ lớp trên */}
              <rect x="30" y="68" width="160" height="46" rx="10" fill="#FFF" opacity="0.8" />
              <text x="110" y="88" textAnchor="middle" fill="#6B21A8" fontSize="14" fontWeight="800">
                Ca(H₂PO₄)₂
              </text>
              <text x="110" y="106" textAnchor="middle" fill="#7E22CE" fontSize="10.5" fontWeight="700">
                Muối tan, cây hấp thụ được
              </text>

              {/* Chữ lớp dưới */}
              <rect x="30" y="172" width="160" height="66" rx="10" fill="#FFF" opacity="0.82" />
              <text x="110" y="193" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="900">
                CaSO₄ ≈ 50%
              </text>
              <text x="110" y="211" textAnchor="middle" fill="#64748B" fontSize="10.5" fontWeight="700">
                Thạch cao, ít tan
              </text>
              <text x="110" y="228" textAnchor="middle" fill="#DC2626" fontSize="10.5" fontWeight="800">
                ✖ Không chứa lân
              </text>
            </BagShell>
          </g>
        </g>

        {/* ===== VS ===== */}
        <g transform="translate(320 250)" filter="url(#spShadow)">
          <circle r="22" fill="#FFF" stroke="#8C6BFA" strokeWidth="2" />
          <text y="5" textAnchor="middle" fill="#6D28D9" fontSize="15" fontWeight="900">
            VS
          </text>
        </g>

        {/* ===================================================
            BAO 2: SUPE LÂN KÉP
           =================================================== */}
        <g transform="translate(370, 0)">
          <g filter="url(#spShadow)">
            <rect x="0" y="62" width="220" height="30" rx="15" fill="#F3EEFF" stroke="#8C6BFA" strokeWidth="2" />
          </g>
          <text x="110" y="82" textAnchor="middle" fill="#6B21A8" fontSize="13" fontWeight="800">
            Supe lân kép (40–50%) 💎
          </text>
          <text x="110" y="109" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="600">
            Quặng + H₃PO₄
          </text>

          <g transform="translate(0, 120)">
            <BagShell stroke="#7C3AED" seam="#C4B5FD">
              <rect x="-5" y="30" width="230" height="240" fill="url(#spRich)" />
              {DOUBLE_CRYSTALS.map((c, i) => (
                <polygon key={i} points={diamond(c.x, c.y, c.s)} fill={c.c} opacity="0.9">
                  {c.twinkle && (
                    <animate
                      attributeName="opacity"
                      values="0.9;0.2;0.9"
                      dur={`${c.d}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </polygon>
              ))}

              {/* Huy hiệu 100% */}
              <circle cx="110" cy="100" r="58" fill="url(#spAura)" />
              <circle cx="110" cy="100" r="42" fill="url(#spBadge)" stroke="#EDE9FE" strokeWidth="3" filter="url(#spGlow)" />
              <circle cx="110" cy="100" r="35" fill="none" stroke="#DDD6FE" strokeWidth="1" strokeDasharray="3 4" opacity="0.8" />
              <text x="110" y="108" textAnchor="middle" fill="#FFF" fontSize="24" fontWeight="900">
                100%
              </text>

              {/* Chữ */}
              <rect x="24" y="162" width="172" height="76" rx="12" fill="#FFF" opacity="0.85" />
              <text x="110" y="186" textAnchor="middle" fill="#4C1D95" fontSize="15" fontWeight="800">
                Ca(H₂PO₄)₂
              </text>
              <text x="110" y="206" textAnchor="middle" fill="#5B21B6" fontSize="12" fontWeight="700">
                Tan hoàn toàn
              </text>
              <text x="110" y="226" textAnchor="middle" fill="#15803D" fontSize="12" fontWeight="800">
                ✔ Không thạch cao
              </text>
            </BagShell>
          </g>
        </g>

        {/* ===================================================
            THANH SO SÁNH P₂O₅
           =================================================== */}
        <g transform="translate(50, 418)">
          <rect x="0" y="0" width="540" height="92" rx="18" fill="#FFF" stroke="#C7D2FE" strokeWidth="1.5" filter="url(#spShadow)" />
          <text x="20" y="22" fill="#475569" fontSize="11.5" fontWeight="800">
            Hàm lượng lân hữu hiệu (P₂O₅)
          </text>

          {/* Vạch chia 0 - 50% */}
          <g stroke="#E2E8F0" strokeWidth="1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={110 + i * 74} y1="30" x2={110 + i * 74} y2="80" />
            ))}
          </g>
          <g fill="#94A3B8" fontSize="9.5" fontWeight="700" textAnchor="middle">
            {[0, 10, 20, 30, 40, 50].map((v, i) => (
              <text key={v} x={110 + i * 74} y="88">
                {v}%
              </text>
            ))}
          </g>

          <text x="20" y="49" fill="#475569" fontSize="12" fontWeight="800">Supe đơn</text>
          <rect x="110" y="34" width="0" height="22" rx="7" fill="url(#spBarGray)">
            <animate attributeName="width" from="0" to="118" dur="1.2s" fill="freeze" />
          </rect>
          <text x="118" y="49" fill="#FFF" fontSize="11" fontWeight="800">
            ≈ 16%
          </text>

          <text x="20" y="73" fill="#5B21B6" fontSize="12" fontWeight="800">Supe kép</text>
          <rect x="110" y="58" width="0" height="22" rx="7" fill="url(#spBarPurple)">
            <animate attributeName="width" from="0" to="340" dur="1.4s" fill="freeze" />
          </rect>
          <text x="118" y="73" fill="#FFF" fontSize="11" fontWeight="800">
            ≈ 46%
          </text>

          {/* Nhãn gấp mấy lần */}
          <g transform="translate(468, 30)">
            <rect x="0" y="0" width="64" height="26" rx="13" fill="#FDE047" stroke="#B45309" strokeWidth="1.3" />
            <text x="32" y="17.5" textAnchor="middle" fill="#78350F" fontSize="11.5" fontWeight="900">
              gấp ~3×
            </text>
          </g>
        </g>

        {/* ===== CHÚ THÍCH CUỐI ===== */}
        <text x="320" y="534" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="600">
          Supe kép dùng H₃PO₄ để phân hủy quặng nên không tạo ra thạch cao CaSO₄
        </text>
      </g>
    </svg>
  );
}