import React, { memo } from 'react';

/* ==========================================================================
   MiniGameArt — TOÀN BỘ hình ảnh của minigame đều là SVG tự vẽ chi tiết cao
   (không emoji, không thư viện icon ngoài).
   Gồm:
   1) Bộ icon UI 3D sắc nét
   2) 4 Linh thú N-P-K tạo khối 3D sống động + hiệu ứng nguyên tố
   3) Túi mù Foil ánh kim / Hologram có rãnh laser, mép dập nhiệt & nắp xé vật lý
   4) Huy chương tráng men (Enamel Medal) + ruy băng thêu vàng
   5) Cúp Vô Địch 3D (Đồng / Bạc / Vàng) trên bệ đá quý
   ========================================================================== */

export const KINDS = ['n', 'p', 'k', 'npk'];
export const kindFor = (index) => KINDS[index] || 'npk';

const SPARK = 'M0 -11 C1.4 -3.4 3.4 -1.4 11 0 C3.4 1.4 1.4 3.4 0 11 C-1.4 3.4 -3.4 1.4 -11 0 C-3.4 -1.4 -1.4 -3.4 0 -11Z';
const STAR = 'M12 2.2l2.95 6.05 6.65.95-4.8 4.65 1.15 6.6L12 17.35 6.05 20.45l1.15-6.6L2.4 9.2l6.65-.95L12 2.2Z';

// Each repeated icon owns unique SVG gradient IDs; duplicated IDs can cross-wire fills on the same page.
const useSvgId = (prefix) => `${prefix}-${React.useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

/* ==========================================================================
   1) BỘ ICON UI (viewBox 24, đổ bóng & highlight 3D tinh tế)
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
    <path d="M11.5 1.8c1 5.6 4.5 9.1 10.1 10.1-5.6 1-9.1 4.5-10.1 10.1-1-5.6-4.5-9.1-10.1-10.1 5.6-1 9.1-4.5 10.1-10.1Z" fill="currentColor" />
    <circle cx="11.5" cy="11.9" r="2.2" fill="#FFF" opacity=".75" />
    <path d="M19.5 1.2c.35 2 1.15 2.8 3.15 3.15-2 .35-2.8 1.15-3.15 3.15-.35-2-1.15-2.8-3.15-3.15 2-.35 2.8-1.15 3.15-3.15Z" fill="currentColor" opacity=".75" />
    <path d="M4.8 17.2c.25 1.4.8 1.95 2.2 2.2-1.4.25-1.95.8-2.2 2.2-.25-1.4-.8-1.95-2.2-2.2 1.4-.25 1.95-.8 2.2-2.2Z" fill="currentColor" opacity=".55" />
  </Ico>
);

export const IconGift = ({ size, className }) => {
  const uid = useSvgId('mg-gift');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-b`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F472B6" />
        <stop offset=".55" stopColor="#EC4899" />
        <stop offset="1" stopColor="#BE185D" />
      </linearGradient>
      <linearGradient id={`${uid}-r`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FEF08A" />
        <stop offset=".5" stopColor="#FACC15" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <rect x="3.2" y="10.2" width="17.6" height="11" rx="2.5" fill={`url(#${uid}-b)`} stroke="#9D174D" strokeWidth=".9" />
    <rect x="2.2" y="6.8" width="19.6" height="4.8" rx="1.9" fill={`url(#${uid}-b)`} stroke="#9D174D" strokeWidth=".9" />
    <rect x="3.5" y="11.6" width="17" height="1.2" fill="#831843" opacity=".25" />
    <rect x="10.2" y="6.8" width="3.6" height="14.4" fill={`url(#${uid}-r)`} />
    <rect x="3.2" y="14.2" width="17.6" height="2.6" fill={`url(#${uid}-r)`} opacity=".9" />
    <path d="M12 6.9C8.7 7.2 6.1 5.7 6.7 3.8c.55-2 3.8-1.45 5.3 3.1Z" fill={`url(#${uid}-r)`} stroke="#B45309" strokeWidth=".9" strokeLinejoin="round" />
    <path d="M12 6.9c3.3.3 5.9-1.2 5.3-3.1-.55-2-3.8-1.45-5.3 3.1Z" fill={`url(#${uid}-r)`} stroke="#B45309" strokeWidth=".9" strokeLinejoin="round" />
    <circle cx="12" cy="6.9" r="1.5" fill="#FEF9C3" stroke="#B45309" strokeWidth=".8" />
    <path d="M5.2 8.4h3.5M5.2 13v5.4" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" opacity=".55" />
  </Ico>
  );
};

export const IconCoin = ({ size, className }) => {
  const uid = useSvgId('mg-coin');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-o`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FEF08A" />
        <stop offset=".45" stopColor="#FBBF24" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id={`${uid}-i`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FEF9C3" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill={`url(#${uid}-o)`} stroke="#92400E" strokeWidth="1.2" />
    <circle cx="12" cy="12" r="7.5" fill={`url(#${uid}-i)`} stroke="#D97706" strokeWidth="1" />
    <path d={STAR} transform="translate(12 12.1) scale(.46) translate(-12 -12)" fill="#92400E" />
    <path d={STAR} transform="translate(12 11.7) scale(.42) translate(-12 -12)" fill="#FEF9C3" />
    <path d="M5.8 7.8a8 8 0 0 1 4.2-3" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity=".85" />
  </Ico>
  );
};

export const IconTrophy = ({ size, className }) => {
  const uid = useSvgId('mg-trophy');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-tr`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FEF08A" />
        <stop offset=".5" stopColor="#FBBF24" />
        <stop offset="1" stopColor="#B45309" />
      </linearGradient>
    </defs>
    <path d="M6.8 5H3.8v2.2A3.4 3.4 0 0 0 7.2 10.6M17.2 5h3v2.2a3.4 3.4 0 0 1-3.4 3.4" stroke="#F59E0B" strokeWidth="1.9" strokeLinecap="round" />
    <path d="M6.3 2.8h11.4v6.4a5.7 5.7 0 0 1-11.4 0V2.8Z" fill={`url(#${uid}-tr)`} stroke="#B45309" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M8.8 5v4.2" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" opacity=".8" />
    <rect x="10.6" y="14.5" width="2.8" height="3.5" fill="#D97706" />
    <path d="M7.5 21.2v-2a1.3 1.3 0 0 1 1.3-1.3h6.4a1.3 1.3 0 0 1 1.3 1.3v2Z" fill="#92400E" stroke="#78350F" strokeWidth=".8" />
  </Ico>
  );
};

export const IconFlame = ({ size, className }) => {
  const uid = useSvgId('mg-flame');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-fl`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FEF08A" />
        <stop offset=".5" stopColor="#F97316" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    <path d="M12.2 1.6c1 4.4 6.2 6.3 6.2 12.2A6.2 6.2 0 0 1 6 14c0-2.6 1.4-4.2 2.7-5.8.4 1.7 1.3 2.3 2.1 2.3-.9-3.2-.6-6.1 1.4-8.9Z" fill={`url(#${uid}-fl)`} stroke="#FFF7ED" strokeWidth=".9" strokeLinejoin="round" />
    <path d="M12.2 10.8c1 2.1 3.2 2.6 3.2 5.3a3.2 3.2 0 0 1-6.4 0c0-2 2.1-3.1 3.2-5.3Z" fill="#FEF08A" />
    <circle cx="12.2" cy="17.2" r="1.4" fill="#FFF" opacity=".85" />
  </Ico>
  );
};

export const IconVolume = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M3.5 9.5v5h3.8l5.2 4.2V5.3L7.3 9.5H3.5Z" fill="currentColor" />
    <path d="M16 9.2a4 4 0 0 1 0 5.6M18.7 6.6a7.6 7.6 0 0 1 0 10.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
  </Ico>
);

export const IconMute = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M3.5 9.5v5h3.8l5.2 4.2V5.3L7.3 9.5H3.5Z" fill="currentColor" opacity=".75" />
    <path d="M16.2 9.6l5 4.8M21.2 9.6l-5 4.8" stroke="#EF4444" strokeWidth="2.3" strokeLinecap="round" />
  </Ico>
);

export const IconReset = ({ size, className }) => (
  <Ico size={size} className={className}>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M20.6 3.4v5.2h-5.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </Ico>
);

export const IconBulb = ({ size, className }) => {
  const uid = useSvgId('mg-bulb');
  return (
  <Ico size={size} className={className}>
    <defs>
      <radialGradient id={`${uid}-bulb`} cx="40%" cy="35%" r="65%">
        <stop offset="0" stopColor="#FFF" />
        <stop offset=".45" stopColor="#FEF08A" />
        <stop offset="1" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
    <path d="M12 2.2a6.5 6.5 0 0 0-3.7 11.8c.6.5 1.1 1.2 1.1 2v.7h5.2V16c0-.8.5-1.5 1.1-2A6.5 6.5 0 0 0 12 2.2Z" fill={`url(#${uid}-bulb)`} stroke="#B45309" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M9.5 19.2h5M10.5 21.6h3" stroke="#92400E" strokeWidth="1.9" strokeLinecap="round" />
    <path d="M9.2 7.4a3.2 3.2 0 0 1 2.2-1.6" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" opacity=".9" />
  </Ico>
  );
};

export const IconCheck = ({ size, className }) => {
  const uid = useSvgId('mg-check');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-chk`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4ADE80" />
        <stop offset="1" stopColor="#16A34A" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10.2" fill={`url(#${uid}-chk)`} stroke="#15803D" strokeWidth="1" />
    <path d="M7.2 12.4l3.2 3.3 6.5-6.7" stroke="#FFF" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
  </Ico>
  );
};

export const IconCross = ({ size, className }) => {
  const uid = useSvgId('mg-cross');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-crs`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F87171" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10.2" fill={`url(#${uid}-crs)`} stroke="#B91C1C" strokeWidth="1" />
    <path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="#FFF" strokeWidth="2.6" strokeLinecap="round" />
  </Ico>
  );
};

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
    <circle cx="6" cy="6.2" r="3" stroke="currentColor" strokeWidth="2.1" />
    <circle cx="6" cy="17.8" r="3" stroke="currentColor" strokeWidth="2.1" />
    <path d="M8.4 8.2L20.5 19M8.4 15.8L20.5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12.6" cy="12" r="1.2" fill="currentColor" />
  </Ico>
);

export const IconParty = ({ size, className }) => {
  const uid = useSvgId('mg-party');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-pty`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FDE047" />
        <stop offset=".5" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <path d="M2.8 21.2 8 7.8l8.2 8.2-13.4 5.2Z" fill={`url(#${uid}-pty)`} stroke="#B45309" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M6.1 14.3l4.3 4.3M8 10.1l5.7 5.7" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" opacity=".75" />
    <circle cx="15.2" cy="4.8" r="1.8" fill="#EC4899" />
    <circle cx="20.2" cy="9" r="1.6" fill="#38BDF8" />
    <circle cx="19.2" cy="15.8" r="1.5" fill="#22C55E" />
    <path d="M11.4 3l1.1 2.4M21.2 3.5l-2.2 1.7M21.8 12.6l-2.4-.4" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
  </Ico>
  );
};

export const IconStar = ({ size = 18, on = true, className }) => {
  const uid = useSvgId('mg-star');
  return (
  <Ico size={size} className={className}>
    <defs>
      <linearGradient id={`${uid}-on`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FEF9C3" />
        <stop offset=".45" stopColor="#FACC15" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <path
      d={STAR}
      fill={on ? `url(#${uid}-on)` : '#E2E8F0'}
      stroke={on ? '#B45309' : '#CBD5E1'}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    {on && <path d="M9.3 8.4l2.7-4.5" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity=".85" />}
  </Ico>
  );
};

/* ==========================================================================
   2) LINH THÚ N-P-K 3D CHI TIẾT CAO (viewBox 100×100)
   n   = Bé Đạm (Nitrogen)   : Mầm lá ngọc bích đọng sương + bọt khí đạm NO₃⁻
   p   = Bé Lân (Phosphorus) : Hoa anh đào 5 cánh + cụm tinh thể năng lượng ATP/Lân
   k   = Bé Kali (Potassium) : Vương miện mặt trời hồng ngọc + tia chớp đề kháng K⁺
   npk = Linh Thú Hợp Thể    : Vương miện Bạch Kim Tam Bảo + cánh hào quang + vòng nguyên tử
   ========================================================================== */

function CreatureG({ bag, kind, u }) {
  const c = bag.themeColor || '#16A34A';
  const a = bag.accentColor || '#4ADE80';
  const s = bag.softColor || '#DCFCE7';
  const body = `${u}-body`;
  const belly = `${u}-belly`;
  const eye = `${u}-eye`;
  const rim = `${u}-rim`;
  const badge = `${u}-badge`;
  const letter = kind === 'npk' ? 'NPK' : kind.toUpperCase();

  return (
    <g>
      <defs>
        {/* Đổ bóng khối cầu 3D (Subsurface + Specular + Ambient Occlusion) */}
        <radialGradient id={body} cx="34%" cy="26%" r="78%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".98" />
          <stop offset="18%" stopColor={s} />
          <stop offset="52%" stopColor={a} />
          <stop offset="86%" stopColor={c} />
          <stop offset="100%" stopColor="#0F172A" stopOpacity=".9" />
        </radialGradient>
        <radialGradient id={rim} cx="50%" cy="15%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".6" />
          <stop offset="65%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity=".35" />
        </radialGradient>
        <linearGradient id={belly} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".92" />
          <stop offset="100%" stopColor={s} stopOpacity=".75" />
        </linearGradient>
        <linearGradient id={eye} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="55%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor={c} />
        </linearGradient>
        <linearGradient id={badge} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Bóng đổ dưới chân */}
      <ellipse cx="50" cy="94" rx="28" ry="4.5" fill="rgba(15,23,42,.22)" />

      {/* Hào quang / cánh sau lưng cho NPK Hợp thể */}
      {kind === 'npk' && (
        <g className="mg-bob">
          <ellipse cx="50" cy="58" rx="44" ry="16" transform="rotate(-18 50 58)" fill="none" stroke="#FDE047" strokeWidth="1.5" strokeDasharray="4 3" opacity=".8" />
          <ellipse cx="50" cy="58" rx="44" ry="16" transform="rotate(18 50 58)" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" opacity=".8" />
          <path d="M16 54 C4 42 4 26 18 28 C12 36 16 44 22 48 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.2" opacity=".9" />
          <path d="M84 54 C96 42 96 26 82 28 C88 36 84 44 78 48 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1.2" opacity=".9" />
        </g>
      )}

      {/* Phụ kiện nguyên tố bay bên cạnh */}
      {kind === 'n' && (
        <g className="mg-bob">
          {/* Giọt sương dinh dưỡng Đạm */}
          <path d="M88 18C88 18 80.5 27.5 80.5 32.8A7.5 7.5 0 0 0 95.5 32.8C95.5 27.5 88 18 88 18Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.3" />
          <ellipse cx="85.8" cy="30.5" rx="2" ry="3.2" transform="rotate(-20 85.8 30.5)" fill="#FFF" opacity=".85" />
          <circle cx="12" cy="34" r="4" fill="#86EFAC" stroke="#16A34A" strokeWidth="1" opacity=".85" />
          <circle cx="10.8" cy="32.8" r="1.2" fill="#FFF" opacity=".9" />
        </g>
      )}
      {kind === 'p' && (
        <g className="mg-bob">
          {/* Cụm tinh thể Lân phát sáng */}
          <path d="M88 17 L95 27 L88 40 L81 27 Z" fill="#F5D0FE" stroke="#9333EA" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M88 17 L91 27 L88 40 L85 27 Z" fill="#FFF" opacity=".55" />
          <path d="M81 27 L95 27" stroke="#FFF" strokeWidth="1" opacity=".8" />
          <path d="M12 28 L16 34 L12 41 L8 34 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="1.2" strokeLinejoin="round" />
        </g>
      )}
      {kind === 'k' && (
        <g className="mg-bob">
          {/* Tia năng lượng & quả ngọt Kali */}
          <path d="M89 17 L83 28 L88 28 L84 38 L95 25 L89.5 25 Z" fill="#FEF08A" stroke="#D97706" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="11.5" cy="33" r="4.8" fill="#FB923C" stroke="#C2410C" strokeWidth="1.2" />
          <path d="M11.5 28 Q14 25 16 27" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* Chân tròn mũm mĩm có đệm thịt */}
      <g>
        <ellipse cx="34" cy="89.5" rx="11" ry="6.4" fill={c} stroke="#0F172A" strokeOpacity=".3" strokeWidth="1.4" />
        <ellipse cx="34" cy="90.5" rx="6.5" ry="3.2" fill={s} opacity=".75" />
        <ellipse cx="66" cy="89.5" rx="11" ry="6.4" fill={c} stroke="#0F172A" strokeOpacity=".3" strokeWidth="1.4" />
        <ellipse cx="66" cy="90.5" rx="6.5" ry="3.2" fill={s} opacity=".75" />
      </g>

      {/* Tay trái & tay phải vẫy chào */}
      <ellipse cx="12" cy="63" rx="6.5" ry="10" transform="rotate(24 12 63)" fill={`url(#${body})`} stroke={c} strokeWidth="1.5" />
      <g className="mg-wave">
        <ellipse cx="88" cy="62" rx="6.5" ry="10" transform="rotate(-26 88 62)" fill={`url(#${body})`} stroke={c} strokeWidth="1.5" />
        <ellipse cx="89.5" cy="58" rx="2.2" ry="3.5" transform="rotate(-26 89.5 58)" fill="#FFF" opacity=".5" />
      </g>

      {/* Thân chính 3D bóng mượt như sứ/jelly */}
      <path
        d="M50 21C75 21 86.5 39.5 86.5 60C86.5 80.5 70.5 91.5 50 91.5C29.5 91.5 13.5 80.5 13.5 60C13.5 39.5 25 21 50 21Z"
        fill={`url(#${body})`}
        stroke="rgba(15,23,42,.32)"
        strokeWidth="1.6"
      />
      {/* Viền phản quang Rim Light */}
      <path
        d="M50 22.5C73.5 22.5 85 40 85 60C85 79 69.5 90 50 90C30.5 90 15 79 15 60C15 40 26.5 22.5 50 22.5Z"
        fill={`url(#${rim})`}
        pointerEvents="none"
      />

      {/* Bụng trắng kem + Huy hiệu nguyên tố gắn trước ngực */}
      <ellipse cx="50" cy="76.5" rx="21" ry="12.5" fill={`url(#${belly})`} stroke="rgba(255,255,255,.8)" strokeWidth="1" />
      <rect x={kind === 'npk' ? 35 : 39} y="70" width={kind === 'npk' ? 30 : 22} height="13.5" rx="6.75" fill={`url(#${badge})`} stroke="#92400E" strokeWidth="1.1" />
      <text
        x="50"
        y={kind === 'npk' ? 79.5 : 80.5}
        textAnchor="middle"
        fontSize={kind === 'npk' ? 9.6 : 12.5}
        fontWeight="900"
        fill="#78350F"
        style={{ fontFamily: 'var(--font-display, inherit)', letterSpacing: '.04em' }}
      >
        {letter}
      </text>

      {/* Điểm bóng sáng Specular lớn trên trán trái */}
      <ellipse cx="32.5" cy="34.5" rx="10.5" ry="5" transform="rotate(-28 32.5 34.5)" fill="#FFFFFF" opacity=".65" />
      <circle cx="24.5" cy="42" r="2.2" fill="#FFFFFF" opacity=".55" />

      {/* Đôi mắt Anime long lanh nhiều lớp */}
      <g className="mg-blink">
        {/* Tròng trắng */}
        <ellipse cx="36.5" cy="54.5" rx="9" ry="10.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
        <ellipse cx="63.5" cy="54.5" rx="9" ry="10.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
        {/* Con ngươi chuyển sắc */}
        <ellipse cx="38" cy="56" rx="6.2" ry="7.2" fill={`url(#${eye})`} />
        <ellipse cx="65" cy="56" rx="6.2" ry="7.2" fill={`url(#${eye})`} />
        {/* Ánh mắt dưới có màu chủ đạo */}
        <path d="M33 58 A5.2 5.2 0 0 0 43 58 Z" fill={a} opacity=".65" />
        <path d="M60 58 A5.2 5.2 0 0 0 70 58 Z" fill={a} opacity=".65" />
        {/* Đốm sáng mắt (Catchlights) */}
        <circle cx="40.2" cy="52.8" r="2.6" fill="#FFFFFF" />
        <circle cx="67.2" cy="52.8" r="2.6" fill="#FFFFFF" />
        <circle cx="35.6" cy="59.2" r="1.3" fill="#FFFFFF" opacity=".9" />
        <circle cx="62.6" cy="59.2" r="1.3" fill="#FFFFFF" opacity=".9" />
        {/* Lông mi / Mí mắt cong */}
        <path d="M27.5 49 Q36.5 42.5 45 48.5" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M55 48.5 Q63.5 42.5 72.5 49" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>

      {/* Má hồng ửng + vệt sáng */}
      <ellipse cx="24.5" cy="65.5" rx="6.6" ry="3.8" fill="#FB7185" opacity=".62" />
      <ellipse cx="75.5" cy="65.5" rx="6.6" ry="3.8" fill="#FB7185" opacity=".62" />
      <path d="M22.5 65 l2 -1.2 M25.5 66 l2 -1.2 M73.5 65 l2 -1.2 M76.5 66 l2 -1.2" stroke="#FFF" strokeWidth=".9" strokeLinecap="round" opacity=".65" />

      {/* Miệng cười tươi + răng khểnh nhỏ dễ thương */}
      <path d="M43 65.5 Q50 77.5 57 65.5 Q50 68.5 43 65.5 Z" fill="#7F1D1D" stroke="#450A0A" strokeWidth=".9" strokeLinejoin="round" />
      <path d="M46 70.5 Q50 67.5 54 70.5 Q50 75 46 70.5 Z" fill="#FB7185" />
      <path d="M45.2 66.3 L46.6 68.6 L48 66.6 Z" fill="#FFFFFF" />

      {/* Phụ kiện trên đỉnh đầu theo từng nguyên tố */}
      {kind === 'n' && (
        <g className="mg-sway">
          {/* Cuống mầm */}
          <path d="M50 24C50 17 51 12 53.5 8" stroke="#14532D" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          {/* Lá phải lớn + gân lá + giọt sương */}
          <path d="M53 9.5C60 -1 76 0 82 8.5C75 20.5 60 20 53 9.5Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M55 9.8C63 8 71 7.8 78.5 8.2" stroke="#DCFCE7" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <circle cx="76" cy="11" r="2.1" fill="#E0F2FE" stroke="#0284C7" strokeWidth=".8" />
          {/* Lá trái non */}
          <path d="M51.5 13.5C45 3 30 3 24 11C30 22.5 45 22 51.5 13.5Z" fill="#4ADE80" stroke="#14532D" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M49.5 13.2C43 11 35 10.6 28.5 11.2" stroke="#DCFCE7" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </g>
      )}

      {kind === 'p' && (
        <g className="mg-sway">
          {/* Hoa 5 cánh kép + nhụy vàng rực rỡ */}
          {[0, 72, 144, 216, 288].map((r) => (
            <g key={r} transform={`rotate(${r} 50 16)`}>
              <ellipse cx="50" cy="6.8" rx="5.6" ry="8.6" fill="#F472B6" stroke="#9D174D" strokeWidth="1.1" />
              <ellipse cx="50" cy="7.8" rx="2.8" ry="5.2" fill="#FBCFE8" opacity=".8" />
            </g>
          ))}
          <circle cx="50" cy="16" r="6" fill="#FACC15" stroke="#B45309" strokeWidth="1.3" />
          <circle cx="48.2" cy="14.2" r="1.8" fill="#FFFFFF" opacity=".9" />
        </g>
      )}

      {kind === 'k' && (
        <g className="mg-sway">
          {/* Vương miện Mặt Trời Hoàng Gia đính ngọc */}
          <path d="M29 29 L31.5 10 L42.5 20.5 L50 5 L57.5 20.5 L68.5 10 L71 29 Q50 34.5 29 29 Z" fill={`url(#${badge})`} stroke="#92400E" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M33 26.5 Q50 30.5 67 26.5" stroke="#FEF9C3" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="31.5" cy="9" r="3.1" fill="#FEF08A" stroke="#92400E" strokeWidth="1.1" />
          <circle cx="50" cy="4.2" r="3.5" fill="#FEF08A" stroke="#92400E" strokeWidth="1.1" />
          <circle cx="68.5" cy="9" r="3.1" fill="#FEF08A" stroke="#92400E" strokeWidth="1.1" />
          {/* Ngọc Ruby trung tâm */}
          <path d="M50 18.5 L54 23.5 L50 28.5 L46 23.5 Z" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
          <circle cx="39" cy="24" r="2" fill="#38BDF8" stroke="#FFF" strokeWidth=".8" />
          <circle cx="61" cy="24" r="2" fill="#38BDF8" stroke="#FFF" strokeWidth=".8" />
        </g>
      )}

      {kind === 'npk' && (
        <g className="mg-sway">
          {/* Vương miện Bạch Kim Tam Bảo (N - P - K) */}
          <path d="M28 29 L33 11 L43 21.5 L50 6 L57 21.5 L67 11 L72 29 Q50 35 28 29 Z" fill="#F8FAFC" stroke="#475569" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M31 26.5 Q50 31 69 26.5" stroke="#FACC15" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* 3 Viên Bảo Ngọc đại diện N (Lục), P (Tím hồng), K (Cam vàng) */}
          <circle cx="33" cy="10" r="3.8" fill="#22C55E" stroke="#FFF" strokeWidth="1.1" />
          <circle cx="50" cy="5.2" r="4.2" fill="#A855F7" stroke="#FFF" strokeWidth="1.1" />
          <circle cx="67" cy="10" r="3.8" fill="#F97316" stroke="#FFF" strokeWidth="1.1" />
          <path d="M50 18 L53.5 22.5 L50 27 L46.5 22.5 Z" fill="#FACC15" stroke="#B45309" strokeWidth="1" />
        </g>
      )}

      {/* Tia lấp lánh quanh linh thú */}
      <g>
        <path d={SPARK} transform="translate(11 26) scale(.65)" fill="#FEF08A" className="mg-tw" />
        <path d={SPARK} transform="translate(90 42) scale(.55)" fill="#FFFFFF" className="mg-tw mg-tw--b" />
        {kind === 'npk' && (
          <path d={SPARK} transform="translate(50 2) scale(.5)" fill="#FDE047" className="mg-tw mg-tw--c" />
        )}
      </g>
    </g>
  );
}

export const Creature = memo(function Creature({ bag, kind, className = '' }) {
  const instanceId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg viewBox="0 0 100 100" className={className} focusable="false" aria-hidden="true">
      <CreatureG bag={bag} kind={kind} u={`mg-cr-${bag.id}-${instanceId}`} />
    </svg>
  );
});

/* ==========================================================================
   3) TÚI MÙ FOIL ÁNH KIM / HOLOGRAM CHÂN THỰC (viewBox 160×200)
   - Có mép dập nhiệt trên/dưới, nếp gấp túi 3D, khía xé chữ V hai bên,
     dải tem Hologram 7 sắc cầu vồng, khung huy hiệu trung tâm và hiệu ứng
     nắp túi bị xé rách lộ lớp bạc bên trong + luồng sáng phun trào.
   ========================================================================== */

const ZIG = Array.from({ length: 18 }, (_, i) => [29 + i * 6, i % 2 ? 41 : 47]);
const ZIG_FWD = ZIG.slice(1).map((p) => `L${p[0]} ${p[1]}`).join(' ');
const ZIG_BACK = ZIG.slice(0, 17).reverse().map((p) => `L${p[0]} ${p[1]}`).join(' ');
const BODY_D = `M29 47 ${ZIG_FWD} L132 58 C139 98 138 140 133 171 Q131 182 120 182 L40 182 Q29 182 27 171 C22 140 21 98 28 58 Z`;
const FLAP_D = `M27 25 Q27 19 34 19 L126 19 Q133 19 133 25 L132 41 ${ZIG_BACK} Z`;
const TORN_LINE = ZIG.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');

const FORMULA_BY_KIND = {
  n: 'NH₄⁺ • NO₃⁻',
  p: 'H₂PO₄⁻ • ATP',
  k: 'K⁺ • K₂O',
  npk: 'N • P₂O₅ • K₂O'
};

export const PouchSvg = memo(function PouchSvg({ bag, kind = 'n' }) {
  const instanceId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const u = `mg-pch-${bag.id}-${instanceId}`;
  const c = bag.themeColor;
  const a = bag.accentColor;
  const s = bag.softColor;
  const formula = FORMULA_BY_KIND[kind] || 'N • P • K';

  return (
    <svg viewBox="0 0 160 200" focusable="false" aria-hidden="true">
      <defs>
        {/* Chất liệu màng nhôm Foil bóng 3D */}
        <linearGradient id={`${u}-foil`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="28%" stopColor={c} />
          <stop offset="62%" stopColor={c} />
          <stop offset="88%" stopColor="#0F172A" stopOpacity=".94" />
          <stop offset="100%" stopColor={a} stopOpacity=".85" />
        </linearGradient>
        {/* Đổ bóng khối trụ hai bên mép túi để tạo độ phồng 3D */}
        <linearGradient id={`${u}-cyl`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F172A" stopOpacity=".38" />
          <stop offset="14%" stopColor="#FFFFFF" stopOpacity=".32" />
          <stop offset="32%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="72%" stopColor="#0F172A" stopOpacity="0" />
          <stop offset="88%" stopColor="#0F172A" stopOpacity=".28" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity=".48" />
        </linearGradient>
        <linearGradient id={`${u}-flap`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={a} />
          <stop offset="55%" stopColor={c} />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        {/* Dải Hologram 7 sắc cầu vồng */}
        <linearGradient id={`${u}-holo`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="22%" stopColor="#FDE047" />
          <stop offset="45%" stopColor="#4ADE80" />
          <stop offset="68%" stopColor="#38BDF8" />
          <stop offset="85%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        {/* Vệt sáng quét ngang mặt túi */}
        <linearGradient id={`${u}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity=".18" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity=".62" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity=".18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        {/* Viền vàng kim loại cho huy hiệu giữa túi */}
        <linearGradient id={`${u}-ring`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="45%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id={`${u}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="38%" stopColor="#FEF08A" stopOpacity=".85" />
          <stop offset="72%" stopColor={a} stopOpacity=".45" />
          <stop offset="100%" stopColor={a} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${u}-clip`}><path d={BODY_D} /></clipPath>
        <clipPath id={`${u}-top`}><rect x="0" y="0" width="160" height="58" /></clipPath>
      </defs>

      {/* Bóng đổ мяг dưới đáy túi */}
      <ellipse cx="80" cy="192" rx="52" ry="6.5" fill="rgba(15,23,42,.22)" />
      <ellipse cx="80" cy="192" rx="36" ry="4" fill="rgba(15,23,42,.18)" />

      {/* Mép trong bằng bạc lộ ra ở miệng túi (trông thật khi nắp bị xé) */}
      <path
        d={`M29 47 ${ZIG_FWD} L131 54 L29 54 Z`}
        fill="#E2E8F0"
        stroke="#94A3B8"
        strokeWidth="1"
      />

      {/* THÂN TÚI CHÍNH */}
      <path d={BODY_D} fill={`url(#${u}-foil)`} />
      <path d={BODY_D} fill={`url(#${u}-cyl)`} />

      <g clipPath={`url(#${u}-clip)`}>
        {/* Nếp gấp phản quang tự nhiên của bao bì */}
        <path d="M24 72 Q62 88 42 145" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" opacity=".12" />
        <path d="M136 68 Q104 96 122 148" stroke="#0F172A" strokeWidth="10" strokeLinecap="round" fill="none" opacity=".16" />

        {/* Họa tiết phân tử hóa học chìm trên vỏ túi */}
        <g stroke="#FFFFFF" strokeWidth="1" opacity=".14" fill="none">
          <polygon points="42,64 50,59 58,64 58,73 50,78 42,73" />
          <polygon points="104,62 112,57 120,62 120,71 112,76 104,71" />
          <polygon points="38,132 46,127 54,132 54,141 46,146 38,141" />
          <polygon points="108,130 116,125 124,130 124,139 116,144 108,139" />
        </g>

        {/* Ánh sáng bùng lên từ bên trong miệng túi khi xé */}
        <ellipse className="mg-pouch-lit" cx="80" cy="48" rx="58" ry="28" fill="#FEF08A" opacity="0" />

        {/* Dải tem Hologram 7 màu + thông số hóa học */}
        <rect x="20" y="145" width="120" height="12.5" fill={`url(#${u}-holo)`} opacity=".88" />
        <rect x="20" y="145" width="120" height="2" fill="#FFFFFF" opacity=".6" />
        <text
          x="80"
          y="154"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="6.8"
          fontWeight="900"
          letterSpacing="1.6"
          style={{ fontFamily: 'var(--font-main, inherit)' }}
        >
          {formula}
        </text>

        {/* Mép dập nhiệt đáy túi (Heat-seal crimp ribs) */}
        <rect x="20" y="170" width="120" height="14" fill="rgba(15,23,42,.38)" />
        <line x1="24" y1="170" x2="136" y2="170" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={i} x1={29 + i * 5.1} y1="171.5" x2={29 + i * 5.1} y2="181" stroke="rgba(255,255,255,.26)" strokeWidth="1.4" />
        ))}

        {/* Vệt sáng bóng gương quét qua túi */}
        <g className="mg-sheen-wrap">
          <rect x="-56" y="36" width="36" height="156" fill={`url(#${u}-sheen)`} transform="skewX(-18)" />
        </g>
      </g>

      {/* Đường viền ngoài thân túi + highlight dọc thân */}
      <path d={BODY_D} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M34 61C29.5 94 29.5 132 34 165" stroke="rgba(255,255,255,.45)" strokeWidth="4.2" strokeLinecap="round" fill="none" />
      <path d="M38 66C35 94 35 126 38 154" stroke="rgba(255,255,255,.2)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M126 64C129.5 96 129.5 130 126 160" stroke="rgba(15,23,42,.28)" strokeWidth="3.8" strokeLinecap="round" fill="none" />

      {/* Răng cưa bạc nơi miệng túi */}
      <path d={TORN_LINE} stroke="#FFFFFF" strokeWidth="1.8" fill="none" strokeLinejoin="round" />

      {/* HUY HIỆU BÍ ẨN TRUNG TÂM (3D Medallion Emblem) */}
      <g>
        {/* Vòng năng lượng xoay quanh */}
        <circle className="mg-spin" cx="80" cy="103" r="35.5" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="2" strokeDasharray="2.5 5.5" strokeLinecap="round" />
        <circle cx="80" cy="103" r="31.5" fill={`url(#${u}-ring)`} stroke="#78350F" strokeWidth="1.2" />
        <circle cx="80" cy="103" r="28" fill="#FFFFFF" />
        <circle cx="80" cy="103" r="25" fill={s} stroke={bag.borderColor} strokeWidth="1.5" />
        {/* Bóng lồng kính trên mặt huy hiệu */}
        <path d="M58 95 A23 20 0 0 1 102 95 A23 12 0 0 0 58 95 Z" fill="#FFFFFF" opacity=".65" />
        {/* Dấu ? 3D có đổ bóng */}
        <text x="81.2" y="115.8" textAnchor="middle" fill="rgba(15,23,42,.18)" fontSize="33" fontWeight="900" style={{ fontFamily: 'var(--font-display, inherit)' }}>?</text>
        <text x="80" y="114.5" textAnchor="middle" fill={c} fontSize="33" fontWeight="900" style={{ fontFamily: 'var(--font-display, inherit)' }}>?</text>
        {/* 4 đinh tán vàng trên viền huy hiệu */}
        <circle cx="80" cy="73.5" r="1.8" fill="#FEF9C3" stroke="#92400E" strokeWidth=".7" />
        <circle cx="80" cy="132.5" r="1.8" fill="#FEF9C3" stroke="#92400E" strokeWidth=".7" />
        <circle cx="50.5" cy="103" r="1.8" fill="#FEF9C3" stroke="#92400E" strokeWidth=".7" />
        <circle cx="109.5" cy="103" r="1.8" fill="#FEF9C3" stroke="#92400E" strokeWidth=".7" />
      </g>

      <text x="80" y="166.5" textAnchor="middle" fill="#FFFFFF" fontSize="7.2" fontWeight="900" letterSpacing="1.8" opacity=".95" style={{ fontFamily: 'var(--font-main, inherit)' }}>
        BLIND BAG • LINH THÚ
      </text>

      {/* Hạt lấp lánh quanh thân túi */}
      <g transform="translate(40 75)"><path className="mg-tw" d={SPARK} fill="#FEF08A" transform="scale(.62)" /></g>
      <g transform="translate(122 88)"><path className="mg-tw mg-tw--b" d={SPARK} fill="#FFFFFF" transform="scale(.52)" /></g>
      <g transform="translate(42 136)"><path className="mg-tw mg-tw--c" d={SPARK} fill="#FFFFFF" transform="scale(.46)" /></g>
      <g transform="translate(119 134)"><path className="mg-tw" d={SPARK} fill="#FEF08A" transform="scale(.56)" /></g>

      {/* LUỒNG SÁNG & MẢNH FOIL BUNG RA KHI XÉ TÚI */}
      <g clipPath={`url(#${u}-top)`}>
        <g className="mg-pouch-burst" opacity="0">
          <circle cx="80" cy="46" r="78" fill={`url(#${u}-glow)`} />
          <g transform="translate(80 46)">
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d="M0 0L-5.5 -90L5.5 -90Z" transform={`rotate(${i * (360 / 14)})`} fill="#FEF9C3" opacity=".82" />
            ))}
          </g>
        </g>
      </g>

      {/* NẮP SEAL DẬP NHIỆT PHÍA TRÊN (Bị xé bay đi khi bấm mở) */}
      <g className="mg-pouch-flap">
        <path d={FLAP_D} fill={`url(#${u}-flap)`} stroke="rgba(255,255,255,.58)" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Lỗ treo túi (Euro-slot / Hang hole) giống bao bì thật */}
        <rect x="68" y="22.5" width="24" height="4.8" rx="2.4" fill="rgba(15,23,42,.42)" stroke="rgba(255,255,255,.35)" strokeWidth=".8" />
        {/* Các rãnh dập nhiệt dọc mép trên */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={i} x1={35 + i * 5.3} y1="21" x2={35 + i * 5.3} y2="33" stroke="rgba(255,255,255,.24)" strokeWidth="1.3" />
        ))}
        {/* Vết khía chữ V hai bên mép để xé (Tear notches) */}
        <path d="M27.5 36.5 L33 39 L27.5 41.5 Z" fill="#0F172A" opacity=".55" />
        <path d="M132.5 36.5 L127 39 L132.5 41.5 Z" fill="#0F172A" opacity=".55" />
        {/* Đường laser đứt nét dẫn hướng xé */}
        <path d="M42 39L119 39" stroke="#FEF08A" strokeWidth="1.7" strokeDasharray="3.5 3.2" strokeLinecap="round" />
        {/* Icon kéo cắt trên mép túi */}
        <g transform="translate(31.5 33.6) scale(.38)" stroke="#FEF08A" fill="none" strokeWidth="2.6" strokeLinecap="round">
          <circle cx="6" cy="6.2" r="3" />
          <circle cx="6" cy="17.8" r="3" />
          <path d="M8.4 8.2L20.5 19M8.4 15.8L20.5 5" />
        </g>
        <path d="M121 36.4l5.2 2.6-5.2 2.6Z" fill="#FEF08A" />
      </g>
    </svg>
  );
});

/* ==========================================================================
   4) HUY CHƯƠNG TRÁNG MEN 3D (Enamel Collector's Medal + Silk Ribbon)
   ========================================================================== */

const SCALLOP = Array.from({ length: 24 }, (_, i) => {
  const t = (i / 24) * Math.PI * 2;
  return [80 + Math.cos(t) * 60.5, 82 + Math.sin(t) * 60.5];
});

export const MedalSvg = memo(function MedalSvg({ bag, kind }) {
  const instanceId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const u = `mg-mdl-${bag.id}-${instanceId}`;
  const c = bag.themeColor;
  const a = bag.accentColor;
  return (
    <svg viewBox="0 0 160 200" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id={`${u}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF9C3" />
          <stop offset="35%" stopColor="#FACC15" />
          <stop offset="70%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id={`${u}-rim`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="50%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#FEF9C3" />
        </linearGradient>
        <radialGradient id={`${u}-in`} cx="45%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor={bag.softColor} />
          <stop offset="100%" stopColor={bag.borderColor} />
        </radialGradient>
        <linearGradient id={`${u}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity=".65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${u}-clip`}><circle cx="80" cy="82" r="61" /></clipPath>
      </defs>

      <ellipse cx="80" cy="194" rx="44" ry="5.5" fill="rgba(15,23,42,.18)" />

      {/* Dải ruy băng lụa xếp nếp có viền chỉ vàng */}
      <g>
        <path d="M51 118L34 187L57 176L71 196L86 126Z" fill={c} stroke="#0F172A" strokeOpacity=".28" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M55 122L40 182" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" opacity=".8" />
        <path d="M62 126L52 174" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="3 3" strokeLinecap="round" opacity=".45" />

        <path d="M109 118L126 187L103 176L89 196L74 126Z" fill={a} stroke="#0F172A" strokeOpacity=".28" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M105 122L120 182" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" opacity=".8" />
        <path d="M98 126L108 174" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="3 3" strokeLinecap="round" opacity=".45" />
      </g>

      {/* Viền răng cưa vàng đúc nổi 3D */}
      {SCALLOP.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="6.8" fill={`url(#${u}-gold)`} stroke="#92400E" strokeWidth="1" />
      ))}
      <circle cx="80" cy="82" r="60" fill={`url(#${u}-gold)`} stroke="#78350F" strokeWidth="1.6" />
      <circle cx="80" cy="82" r="55" fill={`url(#${u}-rim)`} stroke="#B45309" strokeWidth="1.2" />
      <circle cx="80" cy="82" r="50.5" fill="#FFFFFF" stroke={a} strokeWidth="2.4" />
      <circle cx="80" cy="82" r="47.5" fill={`url(#${u}-in)`} />
      <circle cx="80" cy="82" r="43.5" fill="none" stroke={c} strokeWidth="1.4" strokeDasharray="2.5 4.5" strokeLinecap="round" opacity=".65" />

      {/* Linh thú 3D bên trong lòng huy chương */}
      <g transform="translate(42 45) scale(.76)">
        <CreatureG bag={bag} kind={kind} u={`${u}-cr`} />
      </g>

      {/* Bóng kính vòm (Enamel Glass Dome Highlight) */}
      <path d="M40 62 A44 38 0 0 1 120 62 A44 22 0 0 0 40 62 Z" fill="#FFFFFF" opacity=".38" pointerEvents="none" />

      {/* Cụm 3 ngôi sao vàng đính trên đỉnh huy chương */}
      {[[60, 27, 0.58], [80, 20.5, 0.82], [100, 27, 0.58]].map((p, i) => (
        <path
          key={i}
          d={STAR}
          transform={`translate(${p[0] - 12 * p[2]} ${p[1] - 12 * p[2]}) scale(${p[2]})`}
          fill="#FEF08A"
          stroke="#92400E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      ))}

      <g clipPath={`url(#${u}-clip)`}>
        <g className="mg-sheen-wrap mg-sheen-wrap--slow">
          <rect x="-52" y="14" width="28" height="142" fill={`url(#${u}-sheen)`} transform="skewX(-18)" />
        </g>
      </g>
    </svg>
  );
});

/* ==========================================================================
   5) CÚP VÔ ĐỊCH TỔNG KẾT 3D (tier 0 Đồng · 1 Bạc · 2 Vàng; lit = số sao sáng 1..3)
   ========================================================================== */

const TROPHY_PALETTE = [
  { hi: '#FFEDD5', shine: '#FDBA74', mid: '#EA580C', lo: '#7C2D12', gem: '#22C55E' },
  { hi: '#FFFFFF', shine: '#E2E8F0', mid: '#94A3B8', lo: '#334155', gem: '#38BDF8' },
  { hi: '#FEFCE8', shine: '#FDE047', mid: '#F59E0B', lo: '#78350F', gem: '#EF4444' }
];

export const TrophySvg = memo(function TrophySvg({ tier = 2, lit = 3 }) {
  const P = TROPHY_PALETTE[Math.max(0, Math.min(2, tier))];
  const instanceId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const id = `mg-trophy-${tier}-${instanceId}`;
  return (
    <svg viewBox="0 0 200 224" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={P.mid} />
          <stop offset="22%" stopColor={P.shine} />
          <stop offset="38%" stopColor={P.hi} />
          <stop offset="65%" stopColor={P.mid} />
          <stop offset="90%" stopColor={P.lo} />
          <stop offset="100%" stopColor={P.mid} />
        </linearGradient>
        <linearGradient id={`${id}-base`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="30%" stopColor="#475569" />
          <stop offset="70%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id={`${id}-gold-trim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={P.lo} />
          <stop offset="40%" stopColor={P.hi} />
          <stop offset="100%" stopColor={P.lo} />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={P.shine} stopOpacity=".9" />
          <stop offset="55%" stopColor={P.mid} stopOpacity=".28" />
          <stop offset="100%" stopColor={P.hi} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hào quang tỏa sáng sau cúp */}
      <circle className="mg-halo" cx="100" cy="106" r="94" fill={`url(#${id}-halo)`} />

      {/* 3 Ngôi sao xếp hạng phía trên cúp */}
      {[[54, 30, 1.28], [100, 15, 1.75], [146, 30, 1.28]].map((p, i) => (
        <g key={i} className="mg-trophy-star" style={{ '--k': i }}>
          <path
            d={STAR}
            transform={`translate(${p[0] - 12 * p[2]} ${p[1] - 12 * p[2]}) scale(${p[2]})`}
            fill={i < lit ? '#FACC15' : '#E2E8F0'}
            stroke={i < lit ? '#92400E' : '#CBD5E1'}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {i < lit && (
            <circle cx={p[0] - 2} cy={p[1] - 3} r={1.8 * p[2]} fill="#FFFFFF" opacity=".8" />
          )}
        </g>
      ))}

      {/* Bóng đổ chân đế */}
      <ellipse cx="100" cy="215" rx="66" ry="6.5" fill="rgba(15,23,42,.24)" />

      {/* Đế đá Obsidian + Bảng tên Vàng */}
      <rect x="52" y="190" width="96" height="22" rx="6" fill={`url(#${id}-base)`} stroke="#0F172A" strokeWidth="1.5" />
      <rect x="66" y="175" width="68" height="18" rx="5" fill={`url(#${id}-base)`} stroke="#0F172A" strokeWidth="1.5" />
      <rect x="64" y="188" width="72" height="3.5" rx="1.7" fill={`url(#${id}-gold-trim)`} />
      <rect x="76" y="195" width="48" height="11" rx="3" fill={`url(#${id}-cup)`} stroke={P.lo} strokeWidth="1" />
      <text x="100" y="203" textAnchor="middle" fontSize="6.8" fontWeight="900" fill={P.lo} letterSpacing="1.2" style={{ fontFamily: 'var(--font-display, inherit)' }}>
        N • P • K
      </text>

      {/* Chân trụ cúp tiện tròn 3D */}
      <path d="M89 152h22l6 24H83Z" fill={`url(#${id}-cup)`} stroke={P.lo} strokeWidth="1.4" strokeLinejoin="round" />
      <ellipse cx="100" cy="154" rx="14" ry="4.5" fill={`url(#${id}-gold-trim)`} stroke={P.lo} strokeWidth="1.2" />

      {/* Quai cúp uốn lượn kiểu Hoàng Gia */}
      <path d="M56 64C20 56 16 110 62 122" stroke={P.lo} strokeWidth="10.5" fill="none" strokeLinecap="round" />
      <path d="M56 64C20 56 16 110 62 122" stroke={P.mid} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M56 64C24 58 21 104 60 117" stroke={P.hi} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".9" />

      <path d="M144 64C180 56 184 110 138 122" stroke={P.lo} strokeWidth="10.5" fill="none" strokeLinecap="round" />
      <path d="M144 64C180 56 184 110 138 122" stroke={P.mid} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M144 64C176 58 179 104 140 117" stroke={P.hi} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".9" />

      {/* Bầu cúp chính */}
      <path d="M50 45L150 45C150 108 131 149 100 158C69 149 50 108 50 45Z" fill={`url(#${id}-cup)`} stroke={P.lo} strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="100" cy="45" rx="50" ry="10.5" fill={P.hi} stroke={P.lo} strokeWidth="2" />
      <ellipse cx="100" cy="46" rx="43" ry="6.8" fill={P.lo} opacity=".55" />

      {/* Vệt phản quang kim loại dọc thân cúp */}
      <path d="M64 60C64 100 76 128 92 144" stroke="#FFFFFF" strokeWidth="6.5" fill="none" strokeLinecap="round" opacity=".58" />
      <path d="M74 62C74 96 82 120 95 136" stroke="#FFFFFF" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity=".45" />

      {/* Huy chương Mầm Xanh đính ngọc giữa thân cúp */}
      <circle cx="100" cy="95" r="26" fill={`url(#${id}-gold-trim)`} stroke={P.lo} strokeWidth="1.6" />
      <circle cx="100" cy="95" r="22.5" fill="#FFFFFF" opacity=".96" stroke={P.mid} strokeWidth="1.2" />
      <circle cx="100" cy="95" r="19" fill="none" stroke={P.mid} strokeWidth="1.3" strokeDasharray="3 3.5" />
      <path d="M100 110V92" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M100 94C100 82 112 78 120 80.5C120 91 112 97 100 94Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M100 99C100 89 89 85 81 87.5C81 97 89 102 100 99Z" fill="#4ADE80" stroke="#14532D" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="100" cy="134" r="3.6" fill={P.gem} stroke="#FFFFFF" strokeWidth="1" />

      {/* Tia lấp lánh */}
      <g transform="translate(24 70)"><path className="mg-tw" d={SPARK} fill="#FEF08A" transform="scale(1.15)" /></g>
      <g transform="translate(177 88)"><path className="mg-tw mg-tw--b" d={SPARK} fill="#FFFFFF" transform="scale(.95)" /></g>
      <g transform="translate(168 50)"><path className="mg-tw mg-tw--c" d={SPARK} fill="#FEF08A" transform="scale(.75)" /></g>
    </svg>
  );
});
