import React, { memo } from 'react';

/* ==========================================================================
   MiniGameArt — TOÀN BỘ hình ảnh của minigame đều là SVG tự vẽ
   (không emoji, không thư viện icon).
   Gồm: bộ icon UI · linh thú N-P-K · túi mù có nắp xé · huy hiệu · cúp
   ========================================================================== */

export const KINDS = ['n', 'p', 'k', 'npk'];
export const kindFor = (index) => KINDS[index] || 'npk';

const SPARK = 'M0 -10 C1.2 -3.2 3.2 -1.2 10 0 C3.2 1.2 1.2 3.2 0 10 C-1.2 3.2 -3.2 1.2 -10 0 C-3.2 -1.2 -1.2 -3.2 0 -10Z';
const STAR = 'M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z';

/* ==========================================================================
   1) BỘ ICON UI (viewBox 24, 2 tông màu, bo tròn)
   ========================================================================== */

function Ico({ size = 18, className = '', children, ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`mg-ico ${className}`.trim()}
      fill="none"
      focusable="false"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconSpark = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M12 2c.9 5.6 4.4 9.1 10 10-5.6.9-9.1 4.4-10 10-.9-5.6-4.4-9.1-10-10 5.6-.9 9.1-4.4 10-10Z" fill="currentColor" />
    <path d="M19.5 1.2c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3Z" fill="currentColor" opacity=".65" />
  </Ico>
);

export const IconGift = ({ size, className }) => (
  <Ico size={size} className={className}>
    <rect x="3.5" y="10.5" width="17" height="10.5" rx="2.2" fill="#F472B6" />
    <rect x="2.5" y="7" width="19" height="5" rx="1.8" fill="#EC4899" />
    <rect x="10.4" y="7" width="3.2" height="14" fill="#FDE047" />
    <path d="M12 7C9 7.3 6.4 5.9 6.9 4.1c.5-1.9 3.5-1.4 5.1 2.9Z" fill="#FDE047" stroke="#F59E0B" strokeWidth=".8" strokeLinejoin="round" />
    <path d="M12 7c3 .3 5.6-1.1 5.1-2.9-.5-1.9-3.5-1.4-5.1 2.9Z" fill="#FDE047" stroke="#F59E0B" strokeWidth=".8" strokeLinejoin="round" />
    <path d="M5.4 13.2v5.4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".5" />
  </Ico>
);

export const IconCoin = ({ size, className }) => (
  <Ico size={size} className={className}>
    <circle cx="12" cy="12" r="9.6" fill="#FBBF24" stroke="#B45309" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="6.8" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" />
    <path d={STAR} transform="translate(12 12.2) scale(.44) translate(-12 -12)" fill="#B45309" />
    <path d="M6.4 8.2a7 7 0 0 1 3.4-2.6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".75" />
  </Ico>
);

export const IconTrophy = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M7 5H4v2.2A3.3 3.3 0 0 0 7.3 10.5M17 5h3v2.2a3.3 3.3 0 0 1-3.3 3.3" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M6.5 3h11v6.2a5.5 5.5 0 0 1-11 0V3Z" fill="#FDE047" stroke="#D97706" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 5.2v4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".75" />
    <rect x="10.8" y="14.4" width="2.4" height="3.4" fill="#F59E0B" />
    <path d="M8 21v-1.8a1.2 1.2 0 0 1 1.2-1.2h5.6a1.2 1.2 0 0 1 1.2 1.2V21Z" fill="#B45309" />
  </Ico>
);

export const IconFlame = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M12 1.8c.9 4.3 5.9 6.2 5.9 12A5.9 5.9 0 0 1 6.1 14c0-2.4 1.3-3.9 2.5-5.5.4 1.6 1.3 2.2 2 2.2C10.6 7.2 10.9 4.4 12 1.8Z" fill="#FDE047" stroke="#FFF7ED" strokeWidth=".8" strokeLinejoin="round" />
    <path d="M12 11.6c.9 1.9 3 2.3 3 4.9a3 3 0 0 1-6 0c0-1.9 2-2.9 3-4.9Z" fill="#EA580C" />
  </Ico>
);

export const IconVolume = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M3.5 9.5v5h3.8l5.2 4.2V5.3L7.3 9.5H3.5Z" fill="currentColor" />
    <path d="M16 9.2a4 4 0 0 1 0 5.6M18.7 6.6a7.6 7.6 0 0 1 0 10.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Ico>
);

export const IconMute = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M3.5 9.5v5h3.8l5.2 4.2V5.3L7.3 9.5H3.5Z" fill="currentColor" />
    <path d="M16.2 9.6l5 4.8M21.2 9.6l-5 4.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </Ico>
);

export const IconReset = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M20.6 3.4v5.2h-5.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </Ico>
);

export const IconBulb = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M12 2.2a6.4 6.4 0 0 0-3.6 11.7c.6.5 1 1.2 1 2v.6h5.2v-.6c0-.8.4-1.5 1-2A6.4 6.4 0 0 0 12 2.2Z" fill="#FDE047" stroke="#D97706" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M9.6 19.2h4.8M10.6 21.6h2.8" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9.4 7.4a3 3 0 0 1 2-1.4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".8" />
  </Ico>
);

export const IconCheck = ({ size, className }) => (
  <Ico size={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#22C55E" />
    <path d="M7.2 12.4l3.2 3.2 6.4-6.6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </Ico>
);

export const IconCross = ({ size, className }) => (
  <Ico size={size} className={className}>
    <circle cx="12" cy="12" r="10" fill="#EF4444" />
    <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
  </Ico>
);

export const IconBack = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </Ico>
);

export const IconArrow = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </Ico>
);

export const IconScissors = ({ size, className }) => (
  <Ico size={size} className={className}>
    <circle cx="6" cy="6.2" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="6" cy="17.8" r="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8.4 8.2L20.5 19M8.4 15.8L20.5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </Ico>
);

export const IconParty = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M3 21 8 8l8 8-13 5Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6.2 14.2l4.2 4.2M8 10.2l5.6 5.6" stroke="#EA580C" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="15" cy="5" r="1.6" fill="#EC4899" />
    <circle cx="20" cy="9" r="1.4" fill="#38BDF8" />
    <circle cx="19" cy="15.6" r="1.4" fill="#22C55E" />
    <path d="M11.5 3.2l1 2.2M21 3.6l-2 1.6M21.6 12.6l-2.2-.3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </Ico>
);

export const IconStar = ({ size = 18, on = true, className }) => (
  <Ico size={size} className={className}>
    <path
      d={STAR}
      fill={on ? '#FACC15' : '#E2E8F0'}
      stroke={on ? '#D97706' : '#CBD5E1'}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {on && <path d="M9.4 8.6l2.6-4.6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity=".7" />}
  </Ico>
);

/* ==========================================================================
   2) LINH THÚ N-P-K (viewBox 100×100)
   n  = Bé Đạm   : mầm lá xanh + giọt nước
   p  = Bé Lân   : hoa năm cánh + tinh thể
   k  = Bé Kali  : vương miện mặt trời
   npk= Hợp thể  : vương miện 3 viên ngọc
   ========================================================================== */

function CreatureG({ bag, kind, u }) {
  const c = bag.themeColor;
  const a = bag.accentColor;
  const s = bag.softColor;
  const body = `${u}-body`;
  const letter = kind === 'npk' ? 'NPK' : kind.toUpperCase();

  return (
    <g>
      <defs>
        <radialGradient id={body} cx="35%" cy="28%" r="85%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset=".3" stopColor={a} />
          <stop offset="1" stopColor={c} />
        </radialGradient>
      </defs>

      {/* chân + tay */}
      <ellipse cx="35" cy="90" rx="10.5" ry="6" fill={c} stroke="rgba(15,23,42,.25)" strokeWidth="1.2" />
      <ellipse cx="65" cy="90" rx="10.5" ry="6" fill={c} stroke="rgba(15,23,42,.25)" strokeWidth="1.2" />
      <ellipse cx="12.5" cy="64" rx="6.2" ry="9.5" transform="rotate(22 12.5 64)" fill={a} stroke={c} strokeWidth="1.6" />
      <g className="mg-wave">
        <ellipse cx="87.5" cy="64" rx="6.2" ry="9.5" transform="rotate(-22 87.5 64)" fill={a} stroke={c} strokeWidth="1.6" />
      </g>

      {/* phụ kiện phía sau thân */}
      {kind === 'p' && (
        <g className="mg-bob">
          <path d="M89 20 L95 29 L89 40 L83 29Z" fill={s} stroke={a} strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M89 20 L89 40M83 29 L95 29" stroke="#fff" strokeWidth=".9" opacity=".8" />
        </g>
      )}
      {kind === 'n' && (
        <g className="mg-bob">
          <path d="M88 20C88 20 81.5 28.5 81.5 33.2A6.5 6.5 0 0 0 94.5 33.2C94.5 28.5 88 20 88 20Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
          <path d="M85.4 33a3.2 3.2 0 0 0 2.2 3.4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity=".85" />
        </g>
      )}

      {/* thân */}
      <path
        d="M50 22C74 22 86 40 86 60C86 80 70 91 50 91C30 91 14 80 14 60C14 40 26 22 50 22Z"
        fill={`url(#${body})`}
        stroke="rgba(15,23,42,.28)"
        strokeWidth="1.6"
      />
      <ellipse cx="50" cy="76" rx="19.5" ry="12.5" fill="#fff" opacity=".4" />
      <text
        x="50"
        y={kind === 'npk' ? 80 : 81.5}
        textAnchor="middle"
        fontSize={kind === 'npk' ? 10.5 : 15}
        fontWeight="900"
        fill={c}
        style={{ fontFamily: 'var(--font-display, inherit)' }}
      >
        {letter}
      </text>
      <ellipse cx="34" cy="36" rx="9.5" ry="4.6" transform="rotate(-28 34 36)" fill="#fff" opacity=".42" />

      {/* mặt */}
      <g className="mg-blink">
        <ellipse cx="37" cy="55" rx="8.6" ry="10.2" fill="#fff" stroke="#1E1B4B" strokeWidth="1.4" />
        <ellipse cx="63" cy="55" rx="8.6" ry="10.2" fill="#fff" stroke="#1E1B4B" strokeWidth="1.4" />
        <circle cx="38.6" cy="57" r="5.7" fill="#1E1B4B" />
        <circle cx="64.6" cy="57" r="5.7" fill="#1E1B4B" />
        <circle cx="40.6" cy="54.6" r="2.3" fill="#fff" />
        <circle cx="66.6" cy="54.6" r="2.3" fill="#fff" />
        <circle cx="37.2" cy="59.6" r="1.1" fill="#fff" />
        <circle cx="63.2" cy="59.6" r="1.1" fill="#fff" />
      </g>
      <ellipse cx="26" cy="67.5" rx="6.2" ry="3.7" fill="#FB7185" opacity=".55" />
      <ellipse cx="74" cy="67.5" rx="6.2" ry="3.7" fill="#FB7185" opacity=".55" />
      <path d="M43 67.5Q50 80 57 67.5Q50 70.8 43 67.5Z" fill="#7F1D1D" />
      <path d="M46.6 73.2Q50 69.8 53.4 73.2Q50 77.6 46.6 73.2Z" fill="#FB7185" />

      {/* phụ kiện phía trên đầu */}
      {kind === 'n' && (
        <g className="mg-sway">
          <path d="M50 25C50 18 51 13 54 9" stroke="#15803D" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M54 10C60 0 74 1 80 8C74 19 60 19 54 10Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M55.5 10.2C62 8.6 70 8.4 77 8" stroke="#DCFCE7" strokeWidth="1.2" fill="none" opacity=".85" strokeLinecap="round" />
          <path d="M52 14C46 4 32 4 26 11C32 22 46 22 52 14Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M50 13.6C44 11.4 36 11 30 11.4" stroke="#DCFCE7" strokeWidth="1.2" fill="none" opacity=".85" strokeLinecap="round" />
        </g>
      )}
      {kind === 'p' && (
        <g className="mg-sway">
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="50" cy="8" rx="5.3" ry="8.2" transform={`rotate(${r} 50 17)`} fill="#F9A8D4" stroke="#DB2777" strokeWidth="1" />
          ))}
          <circle cx="50" cy="17" r="5.6" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.2" />
          <circle cx="48.4" cy="15.4" r="1.6" fill="#fff" opacity=".8" />
        </g>
      )}
      {kind === 'k' && (
        <g className="mg-sway">
          <path d="M31 30L33 12L43 21.5L50 7L57 21.5L67 12L69 30Q50 35 31 30Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="33" cy="11" r="2.9" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
          <circle cx="50" cy="6" r="2.9" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
          <circle cx="67" cy="11" r="2.9" fill="#FDE047" stroke="#B45309" strokeWidth="1" />
          <circle cx="50" cy="25" r="3.3" fill="#EF4444" stroke="#fff" strokeWidth="1" />
          <path d="M37 25.4Q50 29 63 25.4" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".55" strokeLinecap="round" />
        </g>
      )}
      {kind === 'npk' && (
        <g className="mg-sway">
          <path d="M31 30L36 14L44 22.5L50 9L56 22.5L64 14L69 30Q50 35 31 30Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="36" cy="13" r="3.6" fill="#22C55E" stroke="#fff" strokeWidth="1" />
          <circle cx="50" cy="8" r="3.6" fill="#F97316" stroke="#fff" strokeWidth="1" />
          <circle cx="64" cy="13" r="3.6" fill="#A855F7" stroke="#fff" strokeWidth="1" />
          <path d="M37 25.4Q50 29 63 25.4" stroke="#94A3B8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === 'npk' && (
        <g>
          <path d={SPARK} transform="translate(10 30) scale(.8)" fill="#FDE047" className="mg-tw" />
          <path d={SPARK} transform="translate(91 38) scale(.6)" fill="#FDE047" className="mg-tw mg-tw--b" />
        </g>
      )}
    </g>
  );
}

export const Creature = memo(function Creature({ bag, kind, className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} focusable="false" aria-hidden="true">
      <CreatureG bag={bag} kind={kind} u={`mg-cr-${bag.id}`} />
    </svg>
  );
});

/* ==========================================================================
   3) TÚI MÙ — có nắp seal xé được (class mg-pouch-flap / mg-pouch-burst
      được CSS kích hoạt khi thẻ có .is-tearing)
   ========================================================================== */

const ZIG = Array.from({ length: 18 }, (_, i) => [29 + i * 6, i % 2 ? 41 : 47]);
const ZIG_FWD = ZIG.slice(1).map((p) => `L${p[0]} ${p[1]}`).join(' ');
const ZIG_BACK = ZIG.slice(0, 17).reverse().map((p) => `L${p[0]} ${p[1]}`).join(' ');
const BODY_D = `M29 47 ${ZIG_FWD} L132 60 C138 100 137 140 133 170 Q131 180 120 180 L40 180 Q29 180 27 170 C23 140 22 100 28 60 Z`;
const FLAP_D = `M28 28 Q28 22 34 22 L126 22 Q132 22 132 28 L131 41 ${ZIG_BACK} Z`;
const TORN_LINE = ZIG.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');

export const PouchSvg = memo(function PouchSvg({ bag }) {
  const u = `mg-pch-${bag.id}`;
  const c = bag.themeColor;
  const a = bag.accentColor;
  const s = bag.softColor;
  return (
    <svg viewBox="0 0 160 200" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id={`${u}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset=".55" stopColor={c} />
          <stop offset="1" stopColor="#0F172A" stopOpacity=".92" />
        </linearGradient>
        <linearGradient id={`${u}-flap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={c} />
        </linearGradient>
        <linearGradient id={`${u}-holo`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F472B6" stopOpacity=".7" />
          <stop offset=".35" stopColor="#FDE047" stopOpacity=".7" />
          <stop offset=".7" stopColor="#67E8F9" stopOpacity=".7" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id={`${u}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${u}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset=".4" stopColor="#FEF08A" stopOpacity=".7" />
          <stop offset="1" stopColor="#FEF08A" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${u}-clip`}><path d={BODY_D} /></clipPath>
        <clipPath id={`${u}-top`}><rect x="0" y="0" width="160" height="50" /></clipPath>
      </defs>

      <ellipse cx="80" cy="191" rx="48" ry="7" fill="rgba(15,23,42,.16)" />

      {/* thân túi */}
      <path d={BODY_D} fill={`url(#${u}-g)`} stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinejoin="round" />
      <g clipPath={`url(#${u}-clip)`}>
        {/* ánh sáng lọt ra từ miệng túi khi xé */}
        <ellipse className="mg-pouch-lit" cx="80" cy="50" rx="56" ry="26" fill="#FEF9C3" opacity="0" />
        {/* vệt hologram */}
        <rect x="20" y="148" width="120" height="11" fill={`url(#${u}-holo)`} />
        {/* mép dưới seal */}
        <rect x="20" y="171" width="120" height="12" fill="rgba(15,23,42,.28)" />
        {Array.from({ length: 19 }).map((_, i) => (
          <line key={i} x1={30 + i * 5.6} y1="172" x2={30 + i * 5.6} y2="180" stroke="rgba(255,255,255,.22)" strokeWidth="1.3" />
        ))}
        <g className="mg-sheen-wrap">
          <rect x="-50" y="40" width="30" height="150" fill={`url(#${u}-sheen)`} transform="skewX(-18)" />
        </g>
      </g>
      <path d="M35 60C31 92 31 130 35 164" stroke="rgba(255,255,255,.36)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M125 66C128 98 128 128 125 156" stroke="rgba(15,23,42,.22)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d={TORN_LINE} stroke="rgba(255,255,255,.75)" strokeWidth="1.6" fill="none" strokeLinejoin="round" />

      {/* nhãn trung tâm */}
      <g>
        <circle className="mg-spin" cx="80" cy="104" r="34" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" />
        <circle cx="80" cy="104" r="29" fill="#fff" />
        <circle cx="80" cy="104" r="25.5" fill={s} />
        <circle cx="80" cy="104" r="25.5" fill="none" stroke={bag.borderColor} strokeWidth="1.4" />
        <text x="80" y="115" textAnchor="middle" fill={c} fontSize="32" fontWeight="900" style={{ fontFamily: 'var(--font-display, inherit)' }}>?</text>
      </g>
      <text x="80" y="167" textAnchor="middle" fill="#fff" fontSize="7.4" fontWeight="900" letterSpacing="1.8" opacity=".92" style={{ fontFamily: 'var(--font-main, inherit)' }}>LINH THÚ MÙ</text>

      {/* lấp lánh */}
      <g transform="translate(42 76)"><path className="mg-tw" d={SPARK} fill="#FDE047" transform="scale(.62)" /></g>
      <g transform="translate(121 90)"><path className="mg-tw mg-tw--b" d={SPARK} fill="#fff" transform="scale(.5)" /></g>
      <g transform="translate(44 140)"><path className="mg-tw mg-tw--c" d={SPARK} fill="#fff" transform="scale(.45)" /></g>
      <g transform="translate(118 136)"><path className="mg-tw" d={SPARK} fill="#FDE047" transform="scale(.55)" /></g>

      {/* tia sáng bung ra khi xé */}
      <g clipPath={`url(#${u}-top)`}>
        <g className="mg-pouch-burst" opacity="0">
          <circle cx="80" cy="46" r="74" fill={`url(#${u}-glow)`} />
          <g transform="translate(80 46)">
            {Array.from({ length: 12 }).map((_, i) => (
              <path key={i} d="M0 0L-6 -86L6 -86Z" transform={`rotate(${i * 30})`} fill="#FFFBD0" opacity=".75" />
            ))}
          </g>
        </g>
      </g>

      {/* nắp seal (bị xé bay đi) */}
      <g className="mg-pouch-flap">
        <path d={FLAP_D} fill={`url(#${u}-flap)`} stroke="rgba(255,255,255,.5)" strokeWidth="1.8" strokeLinejoin="round" />
        {Array.from({ length: 17 }).map((_, i) => (
          <line key={i} x1={37 + i * 5.6} y1="25" x2={37 + i * 5.6} y2="36" stroke="rgba(255,255,255,.26)" strokeWidth="1.4" />
        ))}
        <path d="M44 38.6L118 38.6" stroke="#fff" strokeWidth="1.6" strokeDasharray="3.5 3.5" strokeLinecap="round" opacity=".9" />
        {/* kéo cắt + dấu khía */}
        <g transform="translate(32.5 33.4) scale(.36)" stroke="#fff" fill="none" strokeWidth="2.6" strokeLinecap="round">
          <circle cx="6" cy="6.2" r="3" />
          <circle cx="6" cy="17.8" r="3" />
          <path d="M8.4 8.2L20.5 19M8.4 15.8L20.5 5" />
        </g>
        <path d="M122 33.4l5 2.6-5 2.6Z" fill="#fff" opacity=".9" />
      </g>
    </svg>
  );
});

/* ==========================================================================
   4) HUY HIỆU PHẦN THƯỞNG (huy chương + dải ruy băng + linh thú)
   ========================================================================== */

const SCALLOP = Array.from({ length: 20 }, (_, i) => {
  const t = (i / 20) * Math.PI * 2;
  return [80 + Math.cos(t) * 60.5, 82 + Math.sin(t) * 60.5];
});

export const MedalSvg = memo(function MedalSvg({ bag, kind }) {
  const u = `mg-mdl-${bag.id}`;
  const c = bag.themeColor;
  const a = bag.accentColor;
  return (
    <svg viewBox="0 0 160 200" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id={`${u}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF9C3" />
          <stop offset=".45" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id={`${u}-in`} cx="50%" cy="38%" r="68%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor={bag.softColor} />
        </radialGradient>
        <linearGradient id={`${u}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${u}-clip`}><circle cx="80" cy="82" r="61" /></clipPath>
      </defs>

      <ellipse cx="80" cy="193" rx="42" ry="5.5" fill="rgba(15,23,42,.14)" />

      {/* ruy băng */}
      <path d="M52 118L36 186L58 176L72 195L86 128Z" fill={c} stroke="rgba(15,23,42,.2)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M108 118L124 186L102 176L88 195L74 128Z" fill={a} stroke="rgba(15,23,42,.2)" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M58 140L46 182M102 140L114 182" stroke="#fff" strokeWidth="2" strokeDasharray="3 4" opacity=".4" strokeLinecap="round" />

      {/* viền răng cưa */}
      {SCALLOP.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="7.6" fill={`url(#${u}-gold)`} stroke="#B45309" strokeWidth="1" />
      ))}
      <circle cx="80" cy="82" r="60" fill={`url(#${u}-gold)`} stroke="#B45309" strokeWidth="1.6" />
      <circle cx="80" cy="82" r="51" fill="#fff" stroke={a} strokeWidth="2.5" />
      <circle cx="80" cy="82" r="47.5" fill={`url(#${u}-in)`} />
      <circle cx="80" cy="82" r="44" fill="none" stroke={bag.borderColor} strokeWidth="1.6" strokeDasharray="3 5" strokeLinecap="round" />

      {/* linh thú trong huy hiệu */}
      <g transform="translate(43 46) scale(.74)">
        <CreatureG bag={bag} kind={kind} u={`${u}-cr`} />
      </g>

      {/* 3 ngôi sao trên đỉnh */}
      {[[62, 28, 0.55], [80, 22, 0.78], [98, 28, 0.55]].map((p, i) => (
        <path
          key={i}
          d={STAR}
          transform={`translate(${p[0] - 12 * p[2]} ${p[1] - 12 * p[2]}) scale(${p[2]})`}
          fill="#FEF08A"
          stroke="#B45309"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ))}

      <g clipPath={`url(#${u}-clip)`}>
        <g className="mg-sheen-wrap mg-sheen-wrap--slow">
          <rect x="-50" y="14" width="26" height="140" fill={`url(#${u}-sheen)`} transform="skewX(-18)" />
        </g>
      </g>
    </svg>
  );
});

/* ==========================================================================
   5) CÚP TỔNG KẾT (tier 0 đồng · 1 bạc · 2 vàng; lit = số sao sáng 1..3)
   ========================================================================== */

const TROPHY_PALETTE = [
  { hi: '#FED7AA', mid: '#EA580C', lo: '#7C2D12' },
  { hi: '#F8FAFC', mid: '#94A3B8', lo: '#475569' },
  { hi: '#FEF9C3', mid: '#F59E0B', lo: '#B45309' }
];

export const TrophySvg = memo(function TrophySvg({ tier = 2, lit = 3 }) {
  const P = TROPHY_PALETTE[Math.max(0, Math.min(2, tier))];
  const id = `mg-trophy-${tier}`;
  return (
    <svg viewBox="0 0 200 224" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={P.mid} />
          <stop offset=".35" stopColor={P.hi} />
          <stop offset=".7" stopColor={P.mid} />
          <stop offset="1" stopColor={P.lo} />
        </linearGradient>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={P.mid} />
          <stop offset="1" stopColor={P.lo} />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={P.hi} stopOpacity=".9" />
          <stop offset="1" stopColor={P.hi} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle className="mg-halo" cx="100" cy="104" r="92" fill={`url(#${id}-halo)`} />

      {/* sao thưởng */}
      {[[56, 30, 1.25], [100, 16, 1.7], [144, 30, 1.25]].map((p, i) => (
        <g key={i} className="mg-trophy-star" style={{ '--k': i }}>
          <path
            d={STAR}
            transform={`translate(${p[0] - 12 * p[2]} ${p[1] - 12 * p[2]}) scale(${p[2]})`}
            fill={i < lit ? '#FACC15' : '#E2E8F0'}
            stroke={i < lit ? '#D97706' : '#CBD5E1'}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
      ))}

      <ellipse cx="100" cy="214" rx="62" ry="6" fill="rgba(15,23,42,.16)" />

      {/* đế */}
      <rect x="56" y="190" width="88" height="20" rx="6" fill={`url(#${id}-base)`} stroke={P.lo} strokeWidth="1.4" />
      <rect x="70" y="176" width="60" height="18" rx="5" fill={`url(#${id}-base)`} stroke={P.lo} strokeWidth="1.4" />
      <rect x="82" y="195" width="36" height="9" rx="2.5" fill={P.hi} stroke={P.lo} strokeWidth="1" />
      <path d="M88 199.5h24" stroke={P.lo} strokeWidth="1.6" strokeLinecap="round" opacity=".6" />
      <path d="M90 156h20l5 22H85Z" fill={`url(#${id}-base)`} stroke={P.lo} strokeWidth="1.3" strokeLinejoin="round" />

      {/* quai */}
      <path d="M58 66C26 62 22 106 62 118" stroke={P.lo} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M58 66C26 62 22 106 62 118" stroke={P.mid} strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <path d="M58 66C30 63 27 100 60 113" stroke={P.hi} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".8" />
      <path d="M142 66C174 62 178 106 138 118" stroke={P.lo} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M142 66C174 62 178 106 138 118" stroke={P.mid} strokeWidth="6.5" fill="none" strokeLinecap="round" />
      <path d="M142 66C170 63 173 100 140 113" stroke={P.hi} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".8" />

      {/* thân cúp */}
      <path d="M52 46L148 46C148 106 130 148 100 158C70 148 52 106 52 46Z" fill={`url(#${id}-cup)`} stroke={P.lo} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="100" cy="46" rx="48" ry="10" fill={P.hi} stroke={P.lo} strokeWidth="2" />
      <ellipse cx="100" cy="47" rx="41" ry="6.4" fill={P.lo} opacity=".5" />
      <path d="M66 62C66 100 78 126 94 142" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".5" />

      {/* huy hiệu mầm cây trên cúp */}
      <circle cx="100" cy="94" r="24" fill="#fff" opacity=".92" stroke={P.lo} strokeWidth="1.6" />
      <circle cx="100" cy="94" r="20" fill="none" stroke={P.mid} strokeWidth="1.4" strokeDasharray="3 4" />
      <path d="M100 108V92" stroke="#15803D" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M100 94C100 83 111 79 119 81C119 91 111 97 100 94Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M100 99C100 90 91 86 83 88C83 97 91 102 100 99Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.3" strokeLinejoin="round" />

      <g transform="translate(26 70)"><path className="mg-tw" d={SPARK} fill="#FDE047" transform="scale(1.1)" /></g>
      <g transform="translate(176 90)"><path className="mg-tw mg-tw--b" d={SPARK} fill="#fff" transform="scale(.9)" /></g>
      <g transform="translate(168 52)"><path className="mg-tw mg-tw--c" d={SPARK} fill="#FDE047" transform="scale(.7)" /></g>
    </svg>
  );
});