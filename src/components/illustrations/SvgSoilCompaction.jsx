import React, { useEffect, useState } from 'react';

/* ==========================================================================
   SvgSoilCompaction — "Đất tơi xốp vs đất chai cứng" (nén chặt ≠ mặn)
   --------------------------------------------------------------------------
   Trái : đất tơi xốp — nhiều lỗ rỗng, O₂ và nước đi qua, rễ lan rộng
   Phải : đất nén chặt — ít lỗ rỗng, nước thấm chậm, rễ bị hạn chế;
          ion muối hòa tan (Cl⁻, K⁺) là vấn đề RIÊNG, cần đo EC / kiểm tra nước tưới

   Tùy chỉnh kích thước (mặc định giữ như bản cũ: lấp đầy khung chứa):
     <SvgSoilCompaction />                               → 100% × 100% khung chứa
     <SvgSoilCompaction size={820} height="auto" />      → rộng 820px, tự tính cao
     <SvgSoilCompaction size="70%" height="auto" maxWidth={1000} />
     <SvgSoilCompaction animated={false} />              → tắt chuyển động

   Hiệu ứng nhẹ: chỉ transform / opacity (giọt nước, bọt khí, ion nhấp nháy,
   cây đung đưa, quầng stress). Tự tắt khi người dùng bật "giảm chuyển động".
   ========================================================================== */

const W = 1000;
const H = 800;

/* viên đất (trái): x, y, bán kính */
const HEALTHY_AGGREGATES = [
  [82, 295, 13], [119, 310, 10], [171, 292, 12], [208, 316, 11],
  [309, 295, 13], [351, 318, 10], [388, 291, 12], [95, 357, 11],
  [144, 382, 13], [201, 366, 9], [317, 380, 12], [377, 361, 11],
  [84, 414, 10], [185, 423, 12], [339, 420, 11], [400, 425, 9]
];

/* lỗ khí (trái): x, y, rx, ry */
const PORES = [
  [106, 286, 6, 4], [155, 326, 7, 5], [205, 296, 6, 5], [294, 311, 7, 5],
  [380, 300, 6, 4], [121, 390, 6, 5], [208, 408, 7, 4], [315, 387, 6, 5],
  [397, 416, 6, 4]
];

/* tảng đất nén (phải): x, y, w, h */
const COMPACT_CLODS = [
  [559, 285, 42, 19], [608, 283, 51, 22], [672, 286, 49, 20], [733, 282, 48, 21],
  [791, 286, 50, 20], [850, 283, 69, 22], [550, 319, 58, 24], [619, 318, 43, 20],
  [672, 321, 58, 22], [740, 318, 51, 20], [800, 322, 46, 21], [858, 318, 56, 22],
  [554, 355, 49, 21], [612, 353, 56, 23], [678, 354, 44, 21], [731, 355, 56, 22],
  [799, 356, 61, 22], [866, 354, 45, 20], [558, 394, 57, 24], [626, 392, 46, 23],
  [681, 393, 56, 22], [746, 392, 51, 23], [808, 394, 46, 21], [863, 392, 51, 22]
];

const SALT_IONS = [
  [577, 340, 'Cl⁻'], [643, 293, 'K⁺'], [826, 343, 'Cl⁻'],
  [878, 300, 'K⁺'], [603, 405, 'Cl⁻'], [800, 411, 'Cl⁻']
];

/* rễ khỏe (trái): [đường, độ dày, màu] */
const ROOTS_HEALTHY = [
  ['M257 265C255 302 261 337 257 376S260 423 257 449', 4.4, '#FDE68A'],
  ['M258 294C238 310 227 329 216 349S199 379 186 389', 3.2, '#F5DEB3'],
  ['M258 319C279 333 292 352 303 369S323 390 339 400', 3.2, '#F5DEB3'],
  ['M218 346Q198 346 184 334M204 369Q220 371 227 384M297 358Q316 347 333 350M319 387Q304 397 297 412', 2.2, '#E8C99A'],
  ['M257 365Q243 381 240 402M259 390Q274 402 280 425M258 413Q247 425 245 442', 2, '#E8C99A'],
  ['M237 329Q225 320 219 312M226 352Q212 348 207 340M300 354Q311 371 326 375M278 401Q292 411 293 425', 1.8, '#F5DEB3']
];
/* rễ còi (phải) */
const ROOTS_STUNTED = [
  ['M741 266C740 289 745 310 742 334', 3.4, '#D6B58D'],
  ['M742 300Q730 309 725 319', 2.2, '#C4A484'],
  ['M742 317Q756 326 759 337', 2.1, '#C4A484'],
  ['M725 319l-4 9M759 337l6 5', 1.6, '#C4A484']
];

export default function SvgSoilCompaction({
  size = '100%',
  height = '100%',
  maxWidth,
  className = '',
  style,
  animated = true
}) {
  const id = `soil-${React.useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const uid = (n) => `${id}-${n}`;
  const ref = (n) => `url(#${uid(n)})`;
  const on = uid('on');

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const f = () => setReduced(mq.matches);
    f();
    mq.addEventListener?.('change', f);
    return () => mq.removeEventListener?.('change', f);
  }, []);
  const live = animated && !reduced;

  /* ----------------------------------------------------------- phần tử nhỏ */
  const renderRoots = (list) => (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(1.8 2.4)" stroke="#000" strokeOpacity=".3">
        {list.map(([d, w], i) => <path key={i} d={d} strokeWidth={w + 1.2} />)}
      </g>
      {list.map(([d, w, c], i) => <path key={i} d={d} stroke={c} strokeWidth={w} />)}
    </g>
  );

  const renderPill = (x, y, w, h, text, fill, stroke, color, fs = 12.5) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2.2} fill={fill} stroke={stroke} />
      <text x={x + w / 2} y={y + h / 2 + fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight="800" fill={color}>{text}</text>
    </g>
  );

  const renderChip = (x, y, w, dot, title, sub, titleColor) => (
    <g>
      <rect x={x} y={y + 3} width={w} height="46" rx="11" fill="#E2E8F0" />
      <rect x={x} y={y} width={w} height="46" rx="11" fill="#FFFFFF" stroke="#E2E8F0" />
      <circle cx={x + 17} cy={y + 23} r="7" fill={dot} />
      <text x={x + 31} y={y + 20} fontSize="13" fontWeight="800" fill={titleColor}>{title}</text>
      <text x={x + 31} y={y + 37} fontSize="12.5" fill="#64748B">{sub}</text>
    </g>
  );

  const renderNote = (x, y, w, fill, stroke, icon, title, sub, color) => (
    <g>
      <rect x={x} y={y} width={w} height="46" rx="12" fill={fill} stroke={stroke} />
      {icon}
      <text x={x + 36} y={y + 20} fontSize="14" fontWeight="800" fill={color}>{title}</text>
      <text x={x + 36} y={y + 37} fontSize="13" fill={color}>{sub}</text>
    </g>
  );

  const rootStyle = {
    display: 'block',
    width: size,
    height,
    maxWidth,
    aspectRatio: height === 'auto' ? `${W} / ${H}` : undefined,
    borderRadius: 22,
    ...style
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className={`${live ? on : ''} ${className}`.trim()}
      style={rootStyle}
      fontFamily="'Be Vietnam Pro', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif"
    >
      <title id={`${id}-title`}>So sánh đất tơi xốp và đất nén chặt, phân biệt thêm nguy cơ mặn</title>
      <desc id={`${id}-desc`}>
        Lát cắt đất tơi xốp có nhiều lỗ khí và bộ rễ phát triển. Lát cắt đất nén chặt có ít lỗ rỗng và rễ bị hạn chế.
        Các ion muối hòa tan là yếu tố riêng cần đánh giá bằng độ dẫn điện và chất lượng nước tưới.
      </desc>

      <defs>
        <style>{`
          .${on} .${uid('float')}{animation:${uid('floatK')} 4s ease-in-out infinite alternate}
          .${on} .${uid('water')}{animation:${uid('waterK')} 3.2s ease-in infinite}
          .${on} .${uid('air')}{animation:${uid('airK')} 3.7s ease-out infinite}
          .${on} .${uid('salt')}{animation:${uid('saltK')} 2.5s ease-in-out infinite}
          .${on} .${uid('halo')}{animation:${uid('haloK')} 3s ease-in-out infinite alternate}
          @keyframes ${uid('floatK')}{from{transform:translateY(0)}to{transform:translateY(-3px)}}
          @keyframes ${uid('waterK')}{0%{transform:translateY(0);opacity:0}20%{opacity:.95}85%{opacity:.95}100%{transform:translateY(90px);opacity:0}}
          @keyframes ${uid('airK')}{0%{transform:translateY(10px);opacity:0}25%{opacity:.85}100%{transform:translateY(-22px);opacity:0}}
          @keyframes ${uid('saltK')}{0%,100%{opacity:.6}50%{opacity:1}}
          @keyframes ${uid('haloK')}{from{opacity:.08}to{opacity:.24}}
          @media (prefers-reduced-motion: reduce){
            .${on} .${uid('float')},.${on} .${uid('water')},.${on} .${uid('air')},
            .${on} .${uid('salt')},.${on} .${uid('halo')}{animation:none!important}
          }
        `}</style>

        {/* nền + đất */}
        <linearGradient id={uid('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#FFF7ED" />
        </linearGradient>
        <linearGradient id={uid('healthySoil')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A5F42" />
          <stop offset="48%" stopColor="#68472F" />
          <stop offset="100%" stopColor="#47342A" />
        </linearGradient>
        <linearGradient id={uid('compactSoil')} x1="0" y1="0" x2=".9" y2="1">
          <stop offset="0%" stopColor="#968C84" />
          <stop offset="50%" stopColor="#71665E" />
          <stop offset="100%" stopColor="#4B423B" />
        </linearGradient>
        <linearGradient id={uid('depth')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".32" />
        </linearGradient>
        <linearGradient id={uid('skyL')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <linearGradient id={uid('skyR')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7E5E4" />
          <stop offset="100%" stopColor="#FFF7ED" />
        </linearGradient>
        <linearGradient id={uid('grass')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id={uid('leaf')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="55%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id={uid('stressedLeaf')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECFCCB" />
          <stop offset="100%" stopColor="#A3CC4C" />
        </linearGradient>
        <linearGradient id={uid('water')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id={uid('clod')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B7F75" />
          <stop offset="100%" stopColor="#5C524A" />
        </linearGradient>
        <radialGradient id={uid('agg')} cx=".35" cy=".3" r=".85">
          <stop offset="0%" stopColor="#B88A60" />
          <stop offset="60%" stopColor="#85603F" />
          <stop offset="100%" stopColor="#5A3C27" />
        </radialGradient>
        <radialGradient id={uid('pore')} cx=".4" cy=".35" r=".8">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </radialGradient>
        <linearGradient id={uid('okBanner')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#F0FDFA" />
        </linearGradient>
        <linearGradient id={uid('warnBanner')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FEF2F2" />
        </linearGradient>

        <pattern id={uid('soilTexture')} width="32" height="28" patternUnits="userSpaceOnUse">
          <circle cx="7" cy="8" r="1.3" fill="#FDE68A" opacity=".2" />
          <circle cx="23" cy="20" r="1.5" fill="#1C1917" opacity=".2" />
          <path d="M13 4l4 2M3 23l4-1" stroke="#F5D0A9" strokeWidth="1" opacity=".24" />
        </pattern>
        <pattern id={uid('compactTexture')} width="36" height="29" patternUnits="userSpaceOnUse">
          <path d="M2 7l8-3 7 4M20 19l9-3 5 4" fill="none" stroke="#D6D3D1" strokeWidth="1" opacity=".17" />
          <circle cx="12" cy="22" r="1.3" fill="#292524" opacity=".22" />
        </pattern>

        {/* bóng đổ tĩnh cho 3 khung chính */}
        <filter id={uid('shadow')} x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#334155" floodOpacity=".14" />
        </filter>

        <clipPath id={uid('healthyClip')}><rect x="51" y="255" width="415" height="209" rx="10" /></clipPath>
        <clipPath id={uid('compactClip')}><rect x="534" y="255" width="415" height="209" rx="10" /></clipPath>
      </defs>

      {/* =========== NỀN + TIÊU ĐỀ =========== */}
      <rect width={W} height={H} rx="28" fill={ref('bg')} stroke="#FDE68A" strokeWidth="1.5" />
      <circle cx="951" cy="52" r="92" fill="#BBF7D0" opacity=".16" />
      <circle cx="918" cy="91" r="47" fill="#FDE68A" opacity=".15" />
      <circle cx="24" cy="640" r="65" fill="#CFFAFE" opacity=".16" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`gx${i}`} x1={785 + i * 19} y1="15" x2={785 + i * 19} y2="109" />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line key={`gy${i}`} x1="785" y1={20 + i * 24} x2="920" y2={20 + i * 24} />
        ))}
      </g>

      <rect x="34" y="27" width="7" height="24" rx="3.5" fill="#16A34A" />
      <text x="54" y="44" fontSize="14" fontWeight="800" letterSpacing="2" fill="#15803D">KHOA HỌC ĐẤT · CẤU TRÚC VÙNG RỄ</text>
      <text x="34" y="82" fontSize="30" fontWeight="900" letterSpacing="-.8" fill="#172033">
        ĐẤT TƠI XỐP
        <tspan fill="#64748B"> vs </tspan>
        <tspan fill="#B45309">ĐẤT CHAI CỨNG</tspan>
      </text>
      <text x="35" y="108" fontSize="14.5" fontWeight="500" fill="#64748B">Lỗ rỗng, oxy, độ thấm nước và ảnh hưởng đến bộ rễ</text>

      {/* =========================================================
          PANEL TRÁI — ĐẤT TƠI XỐP
      ========================================================= */}
      <rect x="30" y="135" width="455" height="501" rx="22" fill="#FFFFFF" stroke="#BBF7D0" strokeWidth="1.4" filter={ref('shadow')} />

      <rect x="50" y="153" width="38" height="38" rx="11" fill="#DCFCE7" />
      <g transform="translate(57 160)" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 23V9L12 15V8L22 14V23Z" fill="#4ADE80" />
        <path d="M12 15V25M5 23V19M18 23V18" fill="none" />
      </g>
      <text x="100" y="169" fontSize="15" fontWeight="800" fill="#166534">ĐẤT CÂN BẰNG, TƠI XỐP</text>
      <text x="100" y="187" fontSize="12.5" fontWeight="600" fill="#16A34A">NHIỀU LỖ RỖNG · RỄ PHÁT TRIỂN</text>

      <rect x="358" y="156" width="108" height="29" rx="14.5" fill="#F0FDF4" stroke="#BBF7D0" />
      <circle cx="373" cy="170.5" r="4.5" fill="#22C55E" />
      <text x="384" y="175" fontSize="12.5" fontWeight="800" fill="#15803D">THOÁNG KHÍ</text>

      {/* cảnh mặt cắt */}
      <rect x="51" y="204" width="415" height="260" rx="14" fill={ref('skyL')} />
      <text x="66" y="229" fontSize="13" fontWeight="800" fill="#64748B">MẶT CẮT VÙNG RỄ</text>
      {/* độ dày khối đất */}
      <rect x="51" y="440" width="415" height="32" rx="12" fill="#2F2118" />

      <g clipPath={ref('healthyClip')}>
        <rect x="51" y="255" width="415" height="209" fill={ref('healthySoil')} />
        <rect x="51" y="255" width="415" height="209" fill={ref('soilTexture')} />
        <path d="M51 269Q100 262 153 269T260 267T367 267T466 269V300H51Z" fill="#6B482F" opacity=".7" />

        {/* viên đất — khối cầu có sáng/tối */}
        {HEALTHY_AGGREGATES.map(([x, y, r], i) => (
          <g key={i}>
            <ellipse cx={x + 1.5} cy={y + r * 0.85} rx={r * 0.9} ry={r * 0.3} fill="#000" opacity=".25" />
            <circle cx={x} cy={y} r={r} fill={ref('agg')} stroke="#A77B52" strokeWidth=".9" opacity=".97" />
            <path
              d={`M${x - r * 0.45} ${y - r * 0.32}q${r * 0.35} ${-r * 0.3} ${r * 0.65} 0`}
              fill="none" stroke="#E6C9A6" strokeWidth="1.3" strokeLinecap="round" opacity=".7"
            />
          </g>
        ))}

        {/* lỗ khí */}
        {PORES.map(([x, y, rx, ry], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={ref('pore')} stroke="#38BDF8" strokeWidth=".9" opacity=".95" />
        ))}

        {renderRoots(ROOTS_HEALTHY)}

        {/* cỏ mặt đất */}
        <rect x="51" y="255" width="415" height="9" fill={ref('grass')} />
        <path
          d="M51 260Q65 255 79 260T107 260T135 260T163 260T191 260T219 260T247 260T275 260T303 260T331 260T359 260T387 260T415 260T443 260T466 260"
          fill="none" stroke="#15803D" strokeWidth="1.4"
        />
        <path d="M257 256V271" stroke="#D9F99D" strokeWidth="4" strokeLinecap="round" />

        {/* nước thấm xuống */}
        {[
          { x: 144, y: 278, d: '0s' }, { x: 177, y: 296, d: '.9s' },
          { x: 365, y: 277, d: '1.5s' }, { x: 338, y: 317, d: '.5s' }
        ].map((p, i) => (
          <g key={i} className={uid('water')} style={{ animationDelay: p.d }}>
            <path d={`M${p.x} ${p.y}c0-2 3-6 3-6s3 4 3 6a3 3 0 11-6 0Z`} fill="#7DD3FC" stroke="#E0F2FE" strokeWidth=".8" />
          </g>
        ))}

        {/* bọt khí */}
        {[
          { x: 105, y: 368, d: '.2s' }, { x: 348, y: 407, d: '1s' }, { x: 385, y: 363, d: '1.7s' }
        ].map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="4" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="1" className={uid('air')} style={{ animationDelay: b.d }} />
        ))}

        <rect x="51" y="255" width="415" height="209" fill={ref('depth')} />
        <rect x="51" y="264" width="415" height="2" fill="#fff" opacity=".12" />
      </g>

      {/* cây khỏe — phóng to nhẹ quanh gốc */}
      <g transform="translate(257 255) scale(1.3) translate(-257 -255)">
        <g className={uid('float')}>
          <path d="M257 255C257 244 258 235 258 229" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
          <path d="M257 242C238 240 228 227 231 220C243 218 253 228 257 242Z" fill={ref('leaf')} stroke="#15803D" strokeWidth="1.2" />
          <path d="M258 235C268 216 287 217 291 224C286 238 270 241 258 235Z" fill={ref('leaf')} stroke="#15803D" strokeWidth="1.2" />
          <path d="M257 242L238 226M258 235L282 224" fill="none" stroke="#DCFCE7" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      </g>

      {renderPill(63, 274, 56, 24, 'O₂', '#E0F2FE', '#7DD3FC', '#075985', 13)}
      {renderPill(386, 276, 66, 24, 'THẤM', '#DBEAFE', '#93C5FD', '#1D4ED8', 12.5)}

      {renderNote(
        51, 480, 415, '#ECFDF5', '#BBF7D0',
        <>
          <circle cx="71" cy="503" r="9" fill="#DCFCE7" />
          <path d="M66.5 503l3.2 3.2 5.5-6.4" fill="none" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>,
        'Nhiều lỗ rỗng lớn', 'Không khí, nước và rễ có đường di chuyển.', '#166534'
      )}

      {renderChip(51, 538, 132, '#BAE6FD', 'THOÁNG KHÍ', 'O₂ lưu thông', '#166534')}
      {renderChip(193, 538, 132, '#7DD3FC', 'THẤM NƯỚC', 'Dẫn nước xuống', '#075985')}
      {renderChip(335, 538, 131, '#FDE68A', 'RỄ DỄ LAN', 'Mở rộng vùng hút', '#92400E')}

      <text x="53" y="611" fontSize="13.5" fontWeight="600" fill="#64748B">Mục tiêu: duy trì cấu trúc viên đất ổn định</text>
      <text x="53" y="628" fontSize="13.5" fontWeight="600" fill="#64748B">và giàu hữu cơ.</text>

      {/* =========================================================
          PANEL PHẢI — ĐẤT NÉN CHẶT
      ========================================================= */}
      <rect x="515" y="135" width="455" height="501" rx="22" fill="#FFFFFF" stroke="#FED7AA" strokeWidth="1.4" filter={ref('shadow')} />

      <rect x="535" y="153" width="38" height="38" rx="11" fill="#FEF3C7" />
      <g transform="translate(543 161)" fill="none" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4L9 9L5 15L13 20L10 27" />
        <path d="M20 3L18 10L24 16L20 23" />
      </g>
      <text x="585" y="169" fontSize="15" fontWeight="800" fill="#92400E">ĐẤT NÉN CHẶT</text>
      <text x="585" y="187" fontSize="12.5" fontWeight="600" fill="#B45309">ÍT LỖ RỖNG · RỄ KHÓ XUYÊN QUA</text>

      <rect x="846" y="156" width="104" height="29" rx="14.5" fill="#FFF7ED" stroke="#FED7AA" />
      <circle cx="861" cy="170.5" r="4.5" fill="#D97706" />
      <text x="872" y="175" fontSize="12.5" fontWeight="800" fill="#9A3412">VẬT LÝ ĐẤT</text>

      <rect x="534" y="204" width="415" height="260" rx="14" fill={ref('skyR')} />
      <text x="549" y="229" fontSize="13" fontWeight="800" fill="#64748B">MẶT CẮT VÙNG RỄ</text>

      {/* áp lực cơ học từ trên xuống */}
      <text x="934" y="229" textAnchor="end" fontSize="13" fontWeight="800" fill="#78716C">Áp lực cơ học</text>
      <g stroke="#78716C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {[868, 900, 932].map((x) => (
          <path key={x} d={`M${x} 236V250M${x - 4.5} 245L${x} 251L${x + 4.5} 245`} />
        ))}
      </g>

      <rect x="534" y="440" width="415" height="32" rx="12" fill="#3A332D" />

      <g clipPath={ref('compactClip')}>
        <rect x="534" y="255" width="415" height="209" fill={ref('compactSoil')} />
        <rect x="534" y="255" width="415" height="209" fill={ref('compactTexture')} />

        {/* tảng đất xếp sít — có mặt trên sáng, đáy tối */}
        {COMPACT_CLODS.map(([x, y, w, h], i) => (
          <g key={i}>
            <rect x={x} y={y + 2} width={w} height={h} rx="5" fill="#2E2823" opacity=".5" />
            <rect x={x} y={y} width={w} height={h} rx="5" fill={ref('clod')} stroke="#A8A29E" strokeWidth=".7" opacity={i % 2 ? 0.88 : 0.96} />
            <path d={`M${x + 7} ${y + 5}h${Math.max(7, w - 19)}`} fill="none" stroke="#E7E5E4" strokeWidth="1.1" opacity=".3" strokeLinecap="round" />
          </g>
        ))}

        <path d="M534 306Q630 299 733 307T949 304" fill="none" stroke="#57534E" strokeWidth="3" opacity=".7" />
        <path d="M534 374Q640 367 739 375T949 371" fill="none" stroke="#57534E" strokeWidth="3" opacity=".7" />

        {/* vết nứt */}
        <g fill="none" stroke="#3F3833" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity=".85">
          <path d="M574 264L581 291L568 310L584 333" />
          <path d="M618 314L610 334L622 351" />
          <path d="M844 264L835 289L849 309L837 326" />
          <path d="M891 375L881 393L893 410" />
        </g>

        {/* quầng stress vùng rễ */}
        <ellipse cx="742" cy="323" rx="34" ry="35" fill="#FCA5A5" opacity=".16" className={uid('halo')} />

        {renderRoots(ROOTS_STUNTED)}

        {/* ion muối hòa tan — vấn đề riêng */}
        {SALT_IONS.map(([x, y, ion], i) => (
          <g key={i} className={uid('salt')} style={{ animationDelay: `${i * 0.4}s` }}>
            <circle cx={x} cy={y} r="11" fill={ion === 'Cl⁻' ? '#FEE2E2' : '#FFEDD5'} stroke={ion === 'Cl⁻' ? '#F87171' : '#FB923C'} strokeWidth="1.1" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill={ion === 'Cl⁻' ? '#B91C1C' : '#9A3412'}>{ion}</text>
          </g>
        ))}

        {/* nước đọng bề mặt */}
        <path
          d="M534 259Q557 251 580 258T626 257T672 259T718 257T764 259T810 257T856 259T902 257T949 259V267H534Z"
          fill={ref('water')} opacity=".9"
        />
        <path
          d="M534 259Q557 251 580 258T626 257T672 259T718 257T764 259T810 257T856 259T902 257T949 259"
          fill="none" stroke="#E0F2FE" strokeWidth="1.7"
        />

        <rect x="534" y="255" width="415" height="209" fill={ref('depth')} />
      </g>

      {/* cây stress, lá rũ */}
      <g transform="translate(741 255) scale(1.3) translate(-741 -255)">
        <g className={uid('float')}>
          <path d="M741 255Q741 245 742 236" fill="none" stroke="#65A30D" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M741 244Q727 228 712 237Q721 249 741 244Z" fill={ref('stressedLeaf')} stroke="#65A30D" strokeWidth="1.1" />
          <path d="M742 240Q754 228 770 240Q758 249 742 240Z" fill="#D9F99D" stroke="#65A30D" strokeWidth="1.1" />
          <path d="M741 244L719 239M742 240L765 240" fill="none" stroke="#F7FEE7" strokeWidth="1" strokeLinecap="round" />
        </g>
      </g>

      {renderPill(548, 274, 136, 24, 'NƯỚC THẤM CHẬM', '#E0F2FE', '#7DD3FC', '#075985', 12.5)}

      <path d="M783 330L815 318H838" fill="none" stroke="#E7E5E4" strokeWidth="1.3" strokeDasharray="3 4" />
      {renderPill(826, 306, 112, 24, 'LỚP NÉN CHẶT', '#F5F5F4', '#D6D3D1', '#57534E', 12.5)}

      <path d="M806 426L786 426L786 413" fill="none" stroke="#F87171" strokeWidth="1.3" strokeDasharray="3 3" />
      {renderPill(806, 414, 126, 24, 'Cl⁻ HÒA TAN', '#FEF2F2', '#FCA5A5', '#B91C1C', 12.5)}

      <rect x="549" y="442" width="385" height="21" rx="10.5" fill="#44403C" opacity=".9" />
      <text x="741.5" y="457" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFFFFF">Ít lỗ rỗng lớn · Rễ khó xuyên qua tầng đất chặt</text>

      {renderNote(
        534, 480, 415, '#FFF7ED', '#FED7AA',
        <>
          <circle cx="554" cy="503" r="9" fill="#FFEDD5" />
          <path d="M554 498V504M554 508v.6" fill="none" stroke="#C2410C" strokeWidth="1.9" strokeLinecap="round" />
        </>,
        'NÉN CHẶT ≠ MẶN', 'Hai vấn đề có thể cùng xuất hiện nhưng không phải một.', '#9A3412'
      )}

      <g>
        <rect x="534" y="541" width="200" height="46" rx="11" fill="#D6D3D1" />
        <rect x="534" y="538" width="200" height="46" rx="11" fill="#F5F5F4" stroke="#D6D3D1" />
        <circle cx="551" cy="561" r="7" fill="#A8A29E" />
        <text x="565" y="558" fontSize="13" fontWeight="800" fill="#44403C">NÉN CHẶT</text>
        <text x="565" y="575" fontSize="12.5" fill="#64748B">Áp lực cơ học lên đất</text>

        <rect x="744" y="541" width="205" height="46" rx="11" fill="#FECACA" />
        <rect x="744" y="538" width="205" height="46" rx="11" fill="#FEF2F2" stroke="#FECACA" />
        <circle cx="761" cy="561" r="7" fill="#F87171" />
        <text x="775" y="558" fontSize="13" fontWeight="800" fill="#991B1B">ĐỘ MẶN</text>
        <text x="775" y="575" fontSize="12.5" fill="#64748B">Muối hòa tan dư thừa</text>
      </g>

      <text x="536" y="611" fontSize="13.5" fontWeight="600" fill="#64748B">KCl quá mức có thể tăng tải lượng muối,</text>
      <text x="536" y="628" fontSize="13.5" fontWeight="600" fill="#64748B">không trực tiếp gây nén đất.</text>

      {/* =========================================================
          CHÂN SLIDE — GIẢI PHÁP ĐÚNG NGUYÊN NHÂN
      ========================================================= */}
      <rect x="30" y="654" width="940" height="134" rx="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.3" filter={ref('shadow')} />

      <circle cx="69" cy="706" r="24" fill="#DCFCE7" />
      <g transform="translate(54 691)" fill="none" stroke="#15803D" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 27V13" />
        <path d="M15 18C4 18 3 8 6 5C13 5 15 11 15 18Z" fill="#4ADE80" />
        <path d="M15 15C26 15 28 6 25 3C18 3 15 9 15 15Z" fill="#86EFAC" />
        <path d="M5 29H25" />
        <path d="M9 29L6 32M21 29L24 32" />
      </g>

      <text x="108" y="686" fontSize="14.5" fontWeight="800" fill="#172033">GIẢI PHÁP PHẢI ĐÚNG NGUYÊN NHÂN</text>
      <text x="108" y="706" fontSize="13.5" fontWeight="600" fill="#64748B">Cải thiện cấu trúc đất và quản lý muối là hai quy trình riêng.</text>
      <text x="108" y="724" fontSize="13.5" fill="#64748B">Không tự động thay KCl bằng K₂SO₄ để xử lý đất chai cứng.</text>

      {/* hai quy trình */}
      <g transform="translate(50 740)">
        <rect y="3" width="430" height="42" rx="11" fill="#BBF7D0" opacity=".6" />
        <rect width="430" height="42" rx="11" fill={ref('okBanner')} stroke="#BBF7D0" />
        <circle cx="22" cy="21" r="10" fill="#DCFCE7" />
        <path d="M17 21l3.6 3.6 6.4-7.4" fill="none" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <text x="42" y="18" fontSize="13" fontWeight="800" fill="#166534">CẤU TRÚC ĐẤT</text>
        <text x="42" y="34" fontSize="13" fontWeight="600" fill="#166534">Hữu cơ · hạn chế nén · che phủ</text>
      </g>

      <g transform="translate(520 740)">
        <rect y="3" width="430" height="42" rx="11" fill="#FED7AA" opacity=".6" />
        <rect width="430" height="42" rx="11" fill={ref('warnBanner')} stroke="#FED7AA" />
        <circle cx="22" cy="21" r="10" fill="#FFEDD5" />
        <path d="M22 13C22 13 16 20 16 23A6 6 0 0028 23C28 20 22 13 22 13Z" fill="#F97316" />
        <text x="42" y="18" fontSize="13" fontWeight="800" fill="#9A3412">QUẢN LÝ ĐỘ MẶN</text>
        <text x="42" y="34" fontSize="13" fontWeight="600" fill="#9A3412">Đo EC · kiểm tra nước · thoát nước</text>
      </g>
    </svg>
  );
}