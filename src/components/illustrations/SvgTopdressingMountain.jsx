import React, { useEffect, useState } from 'react';

/* ==========================================================================
   SvgTopdressingMountain — "Bón thúc kali: đúng thời điểm"
   --------------------------------------------------------------------------
   Đường cong khái niệm nhu cầu kali qua 5 giai đoạn + 3 thẻ chiến lược bón thúc.

   Tùy chỉnh kích thước (mặc định giữ nguyên như bản cũ: lấp đầy khung chứa):
     <SvgTopdressingMountain />                        → 100% × 100% khung chứa
     <SvgTopdressingMountain size={800} height="auto" />→ rộng 800px, tự tính cao
     <SvgTopdressingMountain size="70%" height="auto" maxWidth={1000} />
     <SvgTopdressingMountain animated={false} />       → tắt toàn bộ chuyển động

   Hiệu ứng nhẹ: chỉ transform / opacity / stroke-dashoffset, vẽ đường cong 1 lần,
   còn lại ~12 chuyển động rất nhỏ. Tự tắt khi người dùng bật "giảm chuyển động".
   ========================================================================== */

const W = 1000;
const H = 790;

/* đường cong nhu cầu (tọa độ gốc của bản cũ — giữ nguyên) */
const CURVE =
  'M95 423 C145 423 205 411 255 379 C310 344 380 257 462 227 C512 208 557 216 602 239 C650 264 687 308 730 349 C765 385 813 412 920 423';
const AREA = `${CURVE} L920 423 L95 423 Z`;
/* dãy núi phía sau tạo chiều sâu */
const BACK_RIDGE =
  'M95 423 C170 405 250 345 330 305 C400 270 450 252 505 258 C565 266 640 328 720 378 C785 410 850 420 920 423 L920 423 L95 423 Z';

const MARKERS = [
  { x: 150, y: 420, color: '#64748B' },
  { x: 325, y: 335, color: '#16A34A' },
  { x: 500, y: 220, color: '#EA580C' },
  { x: 675, y: 295, color: '#7C3AED' },
  { x: 850, y: 417, color: '#B45309' }
];

const STAGES = [
  { n: '01', title: 'Cây non', detail: 'Nhu cầu ban đầu', color: '#64748B', bg: '#F1F5F9', type: 'seed' },
  { n: '02', title: 'Sinh trưởng mạnh', detail: 'Phát triển thân, lá', color: '#16A34A', bg: '#DCFCE7', type: 'growth' },
  { n: '03', title: 'Ra hoa / đậu quả', detail: 'Theo đặc điểm cây', color: '#EA580C', bg: '#FFEDD5', type: 'flower' },
  { n: '04', title: 'Nuôi quả / củ', detail: 'Tích lũy sản phẩm', color: '#7C3AED', bg: '#EDE9FE', type: 'fruit' },
  { n: '05', title: 'Chín / thu hoạch', detail: 'Hoàn tất chu kỳ', color: '#B45309', bg: '#FEF3C7', type: 'harvest' }
];

/* khối chiến lược ở chân slide */
const TIPS = [
  {
    x: 50,
    title: 'Hiểu đất trước khi bón',
    color: '#075985',
    accent: '#0284C7',
    bg: '#E0F2FE',
    lines: ['Đất cát, CEC thấp và mưa lớn', 'có thể làm tăng nguy cơ mất K.'],
    bold: 'Chú ý khả năng giữ dinh dưỡng',
    icon: 'drop'
  },
  {
    x: 354,
    title: 'Chia lần khi có lợi',
    color: '#166534',
    accent: '#15803D',
    bg: '#DCFCE7',
    lines: ['Phù hợp một số đất nhẹ hoặc', 'cây có nhu cầu kéo dài.'],
    bold: 'Chia theo khuyến cáo cụ thể',
    icon: 'calendar'
  },
  {
    x: 658,
    title: 'Không chia theo tỷ lệ cố định',
    color: '#92400E',
    accent: '#B45309',
    bg: '#FEF3C7',
    lines: ['Lượng và thời điểm bón phụ thuộc', 'cây, đất và mục tiêu năng suất.'],
    bold: 'Ưu tiên kết quả phân tích đất',
    icon: 'clock'
  }
];

export default function SvgTopdressingMountain({
  size = '100%',
  height = '100%',
  maxWidth,
  className = '',
  style,
  animated = true
}) {
  const id = `k-demand-${React.useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const uid = (n) => `${id}-${n}`;
  const ref = (n) => `url(#${uid(n)})`;

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  const live = animated && !reduced;
  const on = uid('on');

  /* ---------------------------------------------------- minh họa giai đoạn */
  const renderStageIcon = (type) => {
    switch (type) {
      case 'seed':
        return (
          <>
            <path d="M0 9V-2" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
            <path d="M0 3C-9 3-11-4-8-7C-2-7 0-2 0 3Z" fill="#86EFAC" stroke="#16A34A" strokeWidth=".8" />
            <path d="M0 0C8 0 11-6 8-9C3-8 0-4 0 0Z" fill="#4ADE80" stroke="#15803D" strokeWidth=".8" />
            <path d="M-7 10H7M-4 10L-7 13M4 10L7 13" fill="none" stroke="#A16207" strokeWidth="1.2" strokeLinecap="round" />
          </>
        );
      case 'growth':
        return (
          <>
            <path d="M0 10V-10M-7 5L-7-3M7 5L7-5" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
            <path d="M0-3C-11-3-13-11-9-13C-3-13 0-8 0-3Z" fill="#86EFAC" stroke="#16A34A" strokeWidth=".8" />
            <path d="M0-7C10-7 13-14 9-16C3-15 0-12 0-7Z" fill="#4ADE80" stroke="#15803D" strokeWidth=".8" />
            <path d="M-7 0C-15 0-17-6-14-8C-10-7-7-4-7 0Z" fill="#BBF7D0" stroke="#16A34A" strokeWidth=".8" />
            <path d="M7-2C15-2 17-8 14-10C10-9 7-5 7-2Z" fill="#86EFAC" stroke="#15803D" strokeWidth=".8" />
          </>
        );
      case 'flower':
        return (
          <>
            <path d="M0 11V-3" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
            <path d="M0 5C-7 5-9 0-7-2C-3-2 0 1 0 5Z" fill="#4ADE80" />
            <path d="M0-3C-8-7-7-13-3-14C0-12 0-7 0-3Z" fill="#F9A8D4" />
            <path d="M0-3C3-11 9-10 10-6C8-2 4-2 0-3Z" fill="#FBCFE8" />
            <path d="M0-3C8 0 6 6 2 7C-1 4-1 0 0-3Z" fill="#F9A8D4" />
            <path d="M0-3C-7 1-12-3-10-7C-6-9-2-6 0-3Z" fill="#FBCFE8" />
            <circle cx="0" cy="-3" r="3.5" fill="#FBBF24" />
          </>
        );
      case 'fruit':
        return (
          <>
            <path d="M0-5V-11" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" />
            <path d="M0-8C5-14 11-12 12-9C8-5 4-6 0-8Z" fill="#4ADE80" stroke="#15803D" strokeWidth=".8" />
            <path d="M0-6C-8-11-14-5-12 1C-10 7-4 9 0 6C5 11 13 5 12-2C11-8 4-10 0-6Z" fill="#FB923C" stroke="#C2410C" strokeWidth=".8" />
            <ellipse cx="-4" cy="-1" rx="3" ry="4" fill="#FED7AA" opacity=".8" />
          </>
        );
      default:
        return (
          <>
            <path d="M0 11V-12" stroke="#A16207" strokeWidth="2" strokeLinecap="round" />
            <path d="M0-9L-7-12M0-5L7-9M0-1L-7-4M0 3L6 0" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            <path d="M-7-12l-1-3M7-9l2-3M-7-4l-1-3M6 0l2-3" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
            <path d="M-7 12H7" stroke="#A16207" strokeWidth="1.5" strokeLinecap="round" />
          </>
        );
    }
  };

  const renderTipIcon = (type) => {
    if (type === 'drop') {
      return (
        <>
          <path d="M9 0C9 0 2 8 2 12A7 7 0 0016 12C16 8 9 0 9 0Z" />
          <path d="M5 13Q9 17 13 13" />
        </>
      );
    }
    if (type === 'calendar') {
      return (
        <>
          <rect x="1" y="2" width="17" height="15" rx="2" />
          <path d="M5 0V4M14 0V4M1 7H18" />
          <path d="M5 11h3M12 11h2" />
        </>
      );
    }
    return (
      <>
        <circle cx="9" cy="9" r="8" />
        <path d="M9 4V9L13 12" />
      </>
    );
  };

  const rootStyle = {
    display: 'block',
    width: size,
    height,
    maxWidth,
    aspectRatio: height === 'auto' ? `${W} / ${H}` : undefined,
    borderRadius: 22,
    ...style
  };

  const CARD_Y = 478;

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
      <title id={`${id}-title`}>Biểu đồ minh họa nhu cầu kali qua các giai đoạn sinh trưởng</title>
      <desc id={`${id}-desc`}>
        Đường cong nhu cầu kali qua năm giai đoạn khái quát từ cây non đến thu hoạch. Thời điểm và mức nhu cầu cụ thể
        thay đổi tùy cây trồng, đất, giống và điều kiện canh tác.
      </desc>

      <defs>
        <style>{`
          .${on} .${uid('draw')}{stroke-dasharray:1;stroke-dashoffset:1;animation:${uid('drawK')} 3.2s cubic-bezier(.2,.7,.25,1) .2s forwards}
          .${on} .${uid('flow')}{opacity:0;animation:${uid('flowK')} 7s linear infinite,${uid('showK')} .01s 3.4s forwards}
          .${on} .${uid('glow')}{animation:${uid('glowK')} 3.2s ease-in-out infinite alternate}
          .${on} .${uid('ring')}{transform-box:fill-box;transform-origin:center;animation:${uid('ringK')} 2.6s ease-in-out infinite}
          .${on} .${uid('float')}{animation:${uid('floatK')} 3.6s ease-in-out infinite alternate}
          .${on} .${uid('spark')}{animation:${uid('sparkK')} 2.6s ease-in-out infinite}
          .${on} .${uid('hl')}{animation:${uid('hlK')} 3s ease-in-out infinite alternate}
          @keyframes ${uid('drawK')}{to{stroke-dashoffset:0}}
          @keyframes ${uid('flowK')}{to{stroke-dashoffset:-85}}
          @keyframes ${uid('showK')}{to{opacity:1}}
          @keyframes ${uid('glowK')}{from{opacity:.1}to{opacity:.24}}
          @keyframes ${uid('ringK')}{0%,100%{transform:scale(.85);opacity:.55}50%{transform:scale(1.2);opacity:1}}
          @keyframes ${uid('floatK')}{from{transform:translateY(0)}to{transform:translateY(-3px)}}
          @keyframes ${uid('sparkK')}{0%,100%{opacity:.2}50%{opacity:1}}
          @keyframes ${uid('hlK')}{from{stroke-opacity:.55}to{stroke-opacity:1}}
          @media (prefers-reduced-motion: reduce){
            .${on} .${uid('draw')}{animation:none!important;stroke-dashoffset:0}
            .${on} .${uid('flow')},.${on} .${uid('glow')},.${on} .${uid('ring')},.${on} .${uid('float')},
            .${on} .${uid('spark')},.${on} .${uid('hl')}{animation:none!important;opacity:1}
          }
        `}</style>

        {/* ---------- gradient ---------- */}
        <linearGradient id={uid('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="55%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <linearGradient id={uid('mountain')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB923C" stopOpacity=".75" />
          <stop offset="40%" stopColor="#FBBF24" stopOpacity=".36" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity=".05" />
        </linearGradient>
        <linearGradient id={uid('back')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDBA74" stopOpacity=".32" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity=".03" />
        </linearGradient>
        <linearGradient id={uid('curveLine')} x1="0" y1="0" x2="1" y2=".1">
          <stop offset="0%" stopColor="#65A30D" />
          <stop offset="42%" stopColor="#EAB308" />
          <stop offset="67%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id={uid('peakG')} cx=".35" cy=".3" r=".85">
          <stop offset="0%" stopColor="#FFEDD5" />
          <stop offset="55%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
        <linearGradient id={uid('footer')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>
        <linearGradient id={uid('panelTop')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFCF5" />
        </linearGradient>

        {/* bóng đổ tĩnh cho 2 khung chính (không animate) */}
        <filter id={uid('shadow')} x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#92400E" floodOpacity=".16" />
        </filter>

        <clipPath id={uid('areaClip')}>
          <path d={AREA} />
        </clipPath>
      </defs>

      {/* =========== NỀN + TIÊU ĐỀ =========== */}
      <rect width={W} height={H} rx="28" fill={ref('bg')} stroke="#FDE68A" strokeWidth="1.5" />
      <circle cx="960" cy="51" r="90" fill="#BBF7D0" opacity=".15" />
      <circle cx="928" cy="87" r="48" fill="#FED7AA" opacity=".18" />
      <circle cx="22" cy="640" r="65" fill="#FDE68A" opacity=".12" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`gx${i}`} x1={790 + i * 19} y1="15" x2={790 + i * 19} y2="108" />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line key={`gy${i}`} x1="790" y1={20 + i * 24} x2="923" y2={20 + i * 24} />
        ))}
      </g>

      <rect x="34" y="27" width="7" height="24" rx="3.5" fill="#F59E0B" />
      <text x="54" y="44" fontSize="14" fontWeight="800" letterSpacing="2" fill="#B45309">
        DINH DƯỠNG KHOÁNG · KALI
      </text>
      <text x="34" y="82" fontSize="30" fontWeight="900" letterSpacing="-.8" fill="#172033">
        BÓN THÚC KALI
        <tspan fill="#D97706"> — ĐÚNG THỜI ĐIỂM</tspan>
      </text>
      <text x="35" y="108" fontSize="14.5" fontWeight="500" fill="#64748B">
        Theo dõi nhu cầu cây qua chu kỳ sinh trưởng để tối ưu hiệu quả dinh dưỡng
      </text>

      {/* =========== KHUNG BIỂU ĐỒ =========== */}
      <rect x="30" y="128" width="940" height="480" rx="23" fill={ref('panelTop')} stroke="#E2E8F0" strokeWidth="1.3" filter={ref('shadow')} />

      <rect x="52" y="146" width="38" height="38" rx="11" fill="#FEF3C7" />
      <g transform="translate(60 154)" fill="none" stroke="#B45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 22V2" />
        <path d="M1 22H23" />
        <path d="M4 18C9 17 11 11 15 8S21 5 22 3" />
        <path d="M17 3H22V8" />
      </g>
      <text x="102" y="163" fontSize="15" fontWeight="800" fill="#1E293B">NHU CẦU KALI QUA CÁC GIAI ĐOẠN</text>
      <text x="102" y="181" fontSize="13.5" fontWeight="600" fill="#64748B">Mức tương đối — đường cong khái niệm</text>

      <rect x="790" y="150" width="156" height="30" rx="15" fill="#FFF7ED" stroke="#FED7AA" />
      <circle cx="807" cy="165" r="4.5" fill="#F97316" />
      <text x="819" y="169.5" fontSize="12.5" fontWeight="800" fill="#9A3412">MÔ HÌNH MINH HỌA</text>

      {/* =========== VÙNG VẼ (dời xuống 22 để chừa chỗ chú thích đỉnh) =========== */}
      <g transform="translate(0 22)">
        <rect x="95" y="202" width="825" height="221" rx="8" fill="#F8FAFC" opacity=".7" />

        <g stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 6">
          <line x1="95" y1="260" x2="920" y2="260" />
          <line x1="95" y1="315" x2="920" y2="315" />
          <line x1="95" y1="370" x2="920" y2="370" />
        </g>

        {/* trục */}
        <path d="M95 202V423" fill="none" stroke="#94A3B8" strokeWidth="1.6" />
        <path d="M95 423H920" fill="none" stroke="#94A3B8" strokeWidth="1.6" />
        <path d="M913 417L920 423L913 429" fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

        <text x="62" y="312" transform="rotate(-90 62 312)" textAnchor="middle" fontSize="13" fontWeight="800" letterSpacing=".8" fill="#64748B">
          NHU CẦU KALI TƯƠNG ĐỐI
        </text>
        <text x="84" y="218" textAnchor="end" fontSize="13.5" fontWeight="700" fill="#94A3B8">Cao</text>
        <text x="84" y="419" textAnchor="end" fontSize="13.5" fontWeight="700" fill="#94A3B8">Thấp</text>

        {/* dãy núi phía sau */}
        <path d={BACK_RIDGE} fill={ref('back')} />
        <path d={BACK_RIDGE} fill="none" stroke="#FDBA74" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="2 6" />

        {/* núi chính + các mặt sáng/tối cho cảm giác khối */}
        <path d={AREA} fill={ref('mountain')} />
        <g clipPath={ref('areaClip')}>
          <path d="M500 190 L330 423 L95 423 L95 190 Z" fill="#fff" opacity=".2" />
          <path d="M500 190 L640 423 L920 423 L920 190 Z" fill="#9A3412" opacity=".12" />
          <path d="M500 190 L640 423 L690 423 L520 190 Z" fill="#9A3412" opacity=".07" />
        </g>

        {/* quầng sáng + viền sáng sau đường cong */}
        <path d={CURVE} fill="none" stroke="#FB923C" strokeWidth="13" strokeLinecap="round" opacity=".16" className={uid('glow')} />
        <path d={CURVE} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".6" transform="translate(0 -3)" />

        {/* đường cong chính */}
        <path d={CURVE} fill="none" stroke={ref('curveLine')} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className={uid('draw')} />
        <path d={CURVE} fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="5 12" className={uid('flow')} />

        {/* điểm mốc + đường dẫn xuống trục */}
        {MARKERS.map((m, i) => (
          <g key={i}>
            <path d={`M${m.x} ${m.y}V423`} stroke={m.color} strokeWidth="1.3" strokeDasharray="3 5" opacity=".55" />
            <circle cx={m.x} cy={m.y} r={i === 2 ? 19 : 12} fill={m.color} opacity=".1" />
            <circle cx={m.x} cy={m.y} r={i === 2 ? 13 : 9} fill={m.color} opacity=".16" />
            <circle cx={m.x} cy={m.y} r={i === 2 ? 7 : 5.5} fill={m.color} stroke="#FFFFFF" strokeWidth="2" />
            {i !== 2 && <circle cx={m.x} cy={m.y} r="2" fill="#FFFFFF" />}
            <circle cx={m.x} cy="423" r="3.5" fill={m.color} stroke="#fff" strokeWidth="1.5" />
          </g>
        ))}

        {/* đỉnh */}
        <circle cx="500" cy="220" r="24" fill="#FB923C" opacity=".2" className={uid('ring')} />
        <circle cx="500" cy="220" r="11.5" fill={ref('peakG')} stroke="#FFFFFF" strokeWidth="3" />
        <circle cx="500" cy="220" r="4.5" fill="#FFFFFF" />

        <g className={uid('spark')}>
          <circle cx="426" cy="246" r="2.3" fill="#FDE68A" />
          <circle cx="444" cy="237" r="1.7" fill="#FFFFFF" />
          <circle cx="461" cy="229" r="2" fill="#F59E0B" />
        </g>
        <g className={uid('spark')} style={{ animationDelay: '.7s' }}>
          <circle cx="550" cy="224" r="2" fill="#FFFFFF" />
          <circle cx="569" cy="230" r="1.8" fill="#FDE68A" />
          <circle cx="586" cy="236" r="2.2" fill="#F97316" />
        </g>
      </g>

      {/* chú thích đỉnh (ngoài nhóm dịch, đặt phía trên đường cong) */}
      <path d="M510 240 Q526 224 548 214" fill="none" stroke="#EA580C" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
      <rect x="548" y="192" width="264" height="42" rx="12" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1.3" />
      <circle cx="566" cy="213" r="5.5" fill="#F97316" />
      <text x="580" y="209" fontSize="13.5" fontWeight="800" fill="#9A3412">GIAI ĐOẠN NHU CẦU CAO</text>
      <text x="580" y="225" fontSize="13" fontWeight="600" fill="#C2410C">Thời điểm thay đổi theo cây trồng</text>

      <text x="920" y="464" textAnchor="end" fontSize="13" fontWeight="800" fill="#64748B">
        TIẾN TRÌNH SINH TRƯỞNG →
      </text>

      {/* =========== 5 GIAI ĐOẠN =========== */}
      {STAGES.map((s, i) => {
        const cx = 150 + i * 175;
        const x = cx - 82;
        const hot = i === 2;
        return (
          <g key={s.n}>
            <path d={`M${cx} 448V${CARD_Y}`} stroke={MARKERS[i].color} strokeWidth="1.3" strokeDasharray="3 4" opacity=".55" />
            {/* độ dày thẻ → 3D nhẹ */}
            <rect x={x} y={CARD_Y + 4} width="164" height="88" rx="14" fill={hot ? '#FED7AA' : '#E2E8F0'} />
            <rect
              x={x}
              y={CARD_Y}
              width="164"
              height="88"
              rx="14"
              fill={hot ? '#FFFBEB' : '#FFFFFF'}
              stroke={hot ? '#FDBA74' : '#E2E8F0'}
              strokeWidth={hot ? 1.8 : 1}
              className={hot ? uid('hl') : undefined}
            />

            <circle cx={x + 19} cy={CARD_Y + 20} r="11.5" fill={s.bg} />
            <text x={x + 19} y={CARD_Y + 24.5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={s.color}>{s.n}</text>

            <g transform={`translate(${cx} ${CARD_Y + 34}) scale(1.3)`}>
              <g className={uid('float')} style={{ animationDelay: `${i * 0.35}s` }}>{renderStageIcon(s.type)}</g>
            </g>

            <text x={cx} y={CARD_Y + 66} textAnchor="middle" fontSize="13.5" fontWeight="800" fill={s.color}>{s.title}</text>
            <text x={cx} y={CARD_Y + 82} textAnchor="middle" fontSize="12.5" fontWeight="600" fill="#64748B">{s.detail}</text>
          </g>
        );
      })}

      <circle cx="58" cy="592" r="4" fill="#F59E0B" />
      <text x="70" y="596.5" fontSize="13.5" fontWeight="600" fill="#64748B">
        Đỉnh nhu cầu và thời điểm bón thực tế phụ thuộc cây trồng, đất, giống và điều kiện canh tác.
      </text>

      {/* =========== CHIẾN LƯỢC BÓN THÚC =========== */}
      <rect x="30" y="622" width="940" height="152" rx="21" fill={ref('footer')} stroke="#E2E8F0" strokeWidth="1.2" filter={ref('shadow')} />

      <text x="51" y="651" fontSize="14.5" fontWeight="800" fill="#172033">CHIẾN LƯỢC BÓN THÚC THÔNG MINH</text>
      <text x="51" y="670" fontSize="13.5" fontWeight="500" fill="#64748B">
        Chọn lịch bón từ nhu cầu cây và khả năng giữ kali của đất.
      </text>

      <rect x="806" y="634" width="144" height="28" rx="14" fill="#F0FDF4" stroke="#BBF7D0" />
      <circle cx="822" cy="648" r="4.5" fill="#22C55E" />
      <text x="834" y="652.5" fontSize="12.5" fontWeight="800" fill="#166534">BÓN CÓ CĂN CỨ</text>

      {TIPS.map((t) => (
        <g key={t.title}>
          <rect x={t.x} y="689" width="292" height="78" rx="13" fill="#E2E8F0" opacity=".7" transform="translate(0 3)" />
          <rect x={t.x} y="689" width="292" height="78" rx="13" fill="#FFFFFF" stroke="#E2E8F0" />
          <rect x={t.x} y="689" width="5" height="78" rx="2.5" fill={t.accent} opacity=".85" />
          <rect x={t.x + 12} y="700" width="32" height="32" rx="9" fill={t.bg} />
          <g
            transform={`translate(${t.x + 19} ${t.icon === 'drop' ? 706 : 707})`}
            fill="none"
            stroke={t.accent}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {renderTipIcon(t.icon)}
          </g>
          <text x={t.x + 54} y="716" fontSize="13.5" fontWeight="800" fill={t.color}>{t.title}</text>
          <text x={t.x + 54} y="734" fontSize="12.5" fill="#64748B">{t.lines[0]}</text>
          <text x={t.x + 54} y="749" fontSize="12.5" fill="#64748B">{t.lines[1]}</text>
          <text x={t.x + 54} y="763" fontSize="12.5" fontWeight="700" fill={t.accent}>{t.bold}</text>
        </g>
      ))}
    </svg>
  );
}