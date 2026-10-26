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
const SINGLE_CRYSTALS = Array.from({ length: 34 }, () => ({
  x: 14 + r1() * 192,
  y: 48 + r1() * 82,
  s: 3 + r1() * 4,
  c: r1() > 0.5 ? '#C084FC' : '#A855F7',
}));
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

const BagShell = ({ children, stroke, seam, clipUrl, sheenUrl }) => (
  <g>
    <ellipse cx="110" cy="268" rx="104" ry="11" fill="#1E1B4B" opacity="0.22" />
    <g clipPath={clipUrl}>{children}</g>

    <path d={SEAM_PATH} fill={seam} stroke={stroke} strokeWidth="1.5" />
    <path
      d="M 9 35 Q 110 17 211 35"
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeDasharray="5 4"
      opacity="0.8"
    />

    <g clipPath={clipUrl} fill="none" strokeLinecap="round">
      <path d="M 30 60 Q 44 120 28 190" stroke="#FFF" strokeWidth="2" opacity="0.28" />
      <path d="M 190 70 Q 176 130 194 210" stroke="#000" strokeWidth="1.6" opacity="0.10" />
      <path d="M 70 240 Q 110 250 150 240" stroke="#000" strokeWidth="1.4" opacity="0.10" />
      <rect x="-4" y="40" width="228" height="240" fill={sheenUrl} stroke="none" />
    </g>

    <path d={BAG_PATH} fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
  </g>
);

export default function SvgSuperPhosphatePouch() {
  const rawId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const uid = (name) => `sp-${rawId}-${name}`;
  const url = (name) => `url(#${uid(name)})`;

  return (
    <svg
      viewBox="0 0 640 560"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      role="img"
      aria-label="So sánh supe lân đơn (khoảng 16–20% P₂O₅, có kèm CaSO₄ cung cấp S và Ca) và supe lân kép (khoảng 37–47% P₂O₅, chủ yếu Ca(H₂PO₄)₂ đậm đặc hơn)"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 22,
      }}
    >
      <defs>
        <linearGradient id={uid('spBg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5F3FF" />
          <stop offset="1" stopColor="#E0E7FF" />
        </linearGradient>
        <linearGradient id={uid('spSheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFF" stopOpacity="0.38" />
          <stop offset="0.22" stopColor="#FFF" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={uid('spSalt')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E8FF" />
          <stop offset="1" stopColor="#DDD6FE" />
        </linearGradient>
        <linearGradient id={uid('spGypsum')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F1F5F9" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={uid('spRich')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EDE9FE" />
          <stop offset="0.5" stopColor="#C4B5FD" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <radialGradient id={uid('spBadge')} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#5B21B6" />
        </radialGradient>
        <radialGradient id={uid('spAura')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#C4B5FD" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={uid('spBarGray')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#94A3B8" />
          <stop offset="1" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id={uid('spBarPurple')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>

        <clipPath id={uid('spBagClip')}>
          <path d={BAG_PATH} />
        </clipPath>
        <clipPath id={uid('spFrame')}>
          <rect x="8" y="8" width="624" height="544" rx="26" />
        </clipPath>
      </defs>

      <g clipPath={url('spFrame')}>
        <rect x="0" y="0" width="640" height="560" fill={url('spBg')} />
        <g stroke="#C7D2FE" strokeWidth="1" opacity="0.5">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={i} x1={i * 52} y1="0" x2={i * 52} y2="560" />
          ))}
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1="0" y1={i * 52} x2="640" y2={i * 52} />
          ))}
        </g>

        {/* ===== TIÊU ĐỀ ===== */}
        <g>
          <rect x="130" y="18" width="380" height="32" rx="16" fill="#FFFFFF" stroke="#7862E8" strokeWidth="1.6" />
          <text x="320" y="39" textAnchor="middle" fill="#5B21B6" fontSize="14" fontWeight="800">
            So sánh Supe lân đơn &amp; Supe lân kép
          </text>
        </g>

        {/* ===================================================
            BAO 1: SUPE LÂN ĐƠN
           =================================================== */}
        <g transform="translate(50, 0)">
          <rect x="0" y="62" width="220" height="30" rx="15" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1.6" />
          <text x="110" y="82" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="800">
            Supe lân đơn (~16–20%)
          </text>
          <text x="110" y="109" textAnchor="middle" fill="#64748B" fontSize="13" fontWeight="600">
            Quặng apatit + H₂SO₄
          </text>

          <g transform="translate(0, 120)">
            <BagShell stroke="#64748B" seam="#CBD5E1" clipUrl={url('spBagClip')} sheenUrl={url('spSheen')}>
              <path d="M -5 40 Q 110 22 225 40 L 225 136 Q 110 152 -5 136 Z" fill={url('spSalt')} />
              {SINGLE_CRYSTALS.map((c, i) => (
                <polygon key={i} points={diamond(c.x, c.y, c.s)} fill={c.c} opacity="0.85" />
              ))}
              <path d="M -5 136 Q 110 152 225 136 L 225 262 L -5 262 Z" fill={url('spGypsum')} />
              {GYPSUM.map((g, i) => (
                <polygon key={i} points={g.pts} fill={g.tone} stroke="#94A3B8" strokeWidth="0.9" />
              ))}
              <path
                d="M -5 136 Q 110 152 225 136"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />

              <rect x="24" y="68" width="172" height="46" rx="10" fill="#FFF" opacity="0.88" />
              <text x="110" y="88" textAnchor="middle" fill="#6B21A8" fontSize="14" fontWeight="800">
                Ca(H₂PO₄)₂
              </text>
              <text x="110" y="106" textAnchor="middle" fill="#7E22CE" fontSize="12.5" fontWeight="700">
                Lân dễ tiêu cho rễ cây
              </text>

              <rect x="20" y="168" width="180" height="70" rx="10" fill="#FFF" opacity="0.9" />
              <text x="110" y="189" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="900">
                Có CaSO₄ đi kèm
              </text>
              <text x="110" y="208" textAnchor="middle" fill="#475569" fontSize="12.5" fontWeight="700">
                Bổ sung thêm S và Ca
              </text>
              <text x="110" y="226" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="800">
                Hàm lượng P₂O₅ vừa phải
              </text>
            </BagShell>
          </g>
        </g>

        {/* ===== VS ===== */}
        <g transform="translate(320 250)">
          <circle r="22" fill="#FFF" stroke="#8C6BFA" strokeWidth="2" />
          <text y="5" textAnchor="middle" fill="#6D28D9" fontSize="15" fontWeight="900">
            VS
          </text>
        </g>

        {/* ===================================================
            BAO 2: SUPE LÂN KÉP
           =================================================== */}
        <g transform="translate(370, 0)">
          <rect x="0" y="62" width="220" height="30" rx="15" fill="#F3EEFF" stroke="#8C6BFA" strokeWidth="2" />
          <text x="110" y="82" textAnchor="middle" fill="#6B21A8" fontSize="13" fontWeight="800">
            Supe lân kép (~37–47%)
          </text>
          <text x="110" y="109" textAnchor="middle" fill="#7C3AED" fontSize="13" fontWeight="600">
            Quặng apatit + H₃PO₄
          </text>

          <g transform="translate(0, 120)">
            <BagShell stroke="#7C3AED" seam="#C4B5FD" clipUrl={url('spBagClip')} sheenUrl={url('spSheen')}>
              <rect x="-5" y="30" width="230" height="240" fill={url('spRich')} />
              {DOUBLE_CRYSTALS.map((c, i) => (
                <polygon key={i} points={diamond(c.x, c.y, c.s)} fill={c.c} opacity="0.9" />
              ))}

              <circle cx="110" cy="100" r="56" fill={url('spAura')} />
              <circle cx="110" cy="100" r="42" fill={url('spBadge')} stroke="#EDE9FE" strokeWidth="3" />
              <circle cx="110" cy="100" r="35" fill="none" stroke="#DDD6FE" strokeWidth="1" strokeDasharray="3 4" opacity="0.8" />
              <text x="110" y="96" textAnchor="middle" fill="#FFF" fontSize="14" fontWeight="900">
                P₂O₅
              </text>
              <text x="110" y="114" textAnchor="middle" fill="#FEF08A" fontSize="14" fontWeight="900">
                ĐẬM ĐẶC
              </text>

              <rect x="20" y="162" width="180" height="76" rx="12" fill="#FFF" opacity="0.9" />
              <text x="110" y="185" textAnchor="middle" fill="#4C1D95" fontSize="14" fontWeight="900">
                Chủ yếu Ca(H₂PO₄)₂
              </text>
              <text x="110" y="205" textAnchor="middle" fill="#5B21B6" fontSize="12.5" fontWeight="700">
                Tỷ lệ lân dễ tiêu cao hơn
              </text>
              <text x="110" y="225" textAnchor="middle" fill="#15803D" fontSize="12" fontWeight="800">
                ✔ Ít / không kèm CaSO₄
              </text>
            </BagShell>
          </g>
        </g>

        {/* ===================================================
            THANH SO SÁNH P₂O₅ QUY ĐỔI THƯƠNG MẠI
           =================================================== */}
        <g transform="translate(50, 418)">
          <rect x="0" y="0" width="540" height="92" rx="18" fill="#FFF" stroke="#C7D2FE" strokeWidth="1.5" />
          <text x="20" y="22" fill="#475569" fontSize="13" fontWeight="800">
            Khoảng P₂O₅ quy đổi thương mại thường gặp
          </text>

          <g stroke="#E2E8F0" strokeWidth="1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={i} x1={110 + i * 74} y1="30" x2={110 + i * 74} y2="80" />
            ))}
          </g>
          <g fill="#94A3B8" fontSize="12.5" fontWeight="700" textAnchor="middle">
            {[0, 10, 20, 30, 40, 50].map((v, i) => (
              <text key={v} x={110 + i * 74} y="88">
                {v}%
              </text>
            ))}
          </g>

          <text x="20" y="49" fill="#475569" fontSize="12.5" fontWeight="800">Supe đơn</text>
          <rect x="110" y="34" width="136" height="22" rx="7" fill={url('spBarGray')} />
          <text x="120" y="49" fill="#FFF" fontSize="12.5" fontWeight="800">
            ~16–20% P₂O₅
          </text>

          <text x="20" y="73" fill="#5B21B6" fontSize="12.5" fontWeight="800">Supe kép</text>
          <rect x="110" y="58" width="320" height="22" rx="7" fill={url('spBarPurple')} />
          <text x="120" y="73" fill="#FFF" fontSize="12.5" fontWeight="800">
            ~37–47% P₂O₅
          </text>

          <g transform="translate(442, 30)">
            <rect x="0" y="0" width="88" height="26" rx="13" fill="#FDE047" stroke="#B45309" strokeWidth="1.3" />
            <text x="44" y="17.5" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="900">
              Đậm đặc hơn
            </text>
          </g>
        </g>

        <text x="320" y="534" textAnchor="middle" fill="#475569" fontSize="12.5" fontWeight="600">
          Khoảng giá trị tham khảo; hàm lượng thực tế theo nhãn sản phẩm của nhà sản xuất
        </text>
        <rect x="8" y="8" width="624" height="544" rx="26" fill="none" stroke="#DDD6FE" strokeWidth="1.5" />
      </g>
    </svg>
  );
}