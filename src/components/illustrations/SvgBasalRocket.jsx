import React, { useEffect, useId, useMemo, useState } from 'react';

/* ==========================================================================
   SvgBasalRocket — minh họa "Lân bón lót gần vùng rễ" (Slide 12, Lân câu 4)
   --------------------------------------------------------------------------
   Hai mặt cắt đất đặt cạnh nhau:
     TRÁI  : bón lót, dải phân nằm sát vùng rễ non → P tới rễ ngay đầu vụ
     PHẢI  : rải trên mặt, P bị keo đất / Fe, Al, Ca giữ lại ở tầng mặt

   Tùy chỉnh kích thước:
     <SvgBasalRocket />                       → full chiều rộng khung chứa
     <SvgBasalRocket size={720} />            → rộng 720px
     <SvgBasalRocket size="60%" maxWidth={900} />
     <SvgBasalRocket height="100%" />         → co theo chiều cao khung (giữ tỉ lệ)
   Hiệu ứng nhẹ: chỉ transform/opacity, ~12 phần tử chuyển động, tự tắt khi
   người dùng bật "giảm chuyển động" hoặc truyền animated={false}.
   ========================================================================== */

const W = 960;
const H = 540;

/* --- dữ liệu hình học dùng chung ------------------------------------------ */
const ROOTS_MAIN = 'M220 120 C220 160 218 200 220 258';
const ROOTS_SIDE = [
  'M220 170 C190 180 170 190 150 215',
  'M220 170 C250 180 272 192 292 214',
  'M220 205 C195 220 180 235 168 262',
  'M220 205 C248 220 262 236 276 262',
  'M220 240 C205 255 200 268 196 285',
  'M220 240 C236 255 242 268 246 285'
];
const ROOT_TIPS = [
  [150, 215], [292, 214], [168, 262], [276, 262], [196, 285], [246, 285]
];

/* hạt phân bón lót (trái) và hạt rải mặt (phải) */
const GRANULES_BASAL = [[126, 254], [158, 242], [192, 262], [248, 262], [282, 242], [314, 254]];
const GRANULES_SURFACE = [[96, 112], [140, 113], [296, 113], [338, 112]];

/* ion P di chuyển về phía rễ (bên trái) */
const ION_FLOWS = [
  { path: 'M146 244 Q160 236 177 247', to: [177, 247], dur: 3.2, begin: 0 },
  { path: 'M196 268 Q202 258 210 247', to: [210, 247], dur: 3.2, begin: 0.8 },
  { path: 'M244 268 Q238 258 230 247', to: [230, 247], dur: 3.2, begin: 1.6 },
  { path: 'M294 244 Q280 236 263 247', to: [263, 247], dur: 3.2, begin: 2.4 }
];

/* bản màu phẳng dễ chỉnh */
const C = {
  ink: '#0f172a',
  green: '#16a34a',
  greenDark: '#166534',
  amber: '#f59e0b',
  purple: '#a855f7',
  slate: '#475569',
  red: '#dc2626'
};

/* tạo các hạt sỏi/đất cố định (không random mỗi lần render) */
function makeSpecks(seed, count) {
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: 8 + rnd() * 424,
    y: 130 + rnd() * 252,
    r: 0.8 + rnd() * 2.2,
    o: 0.12 + rnd() * 0.22,
    light: rnd() > 0.5
  }));
}

export default function SvgBasalRocket({
  size = '100%',
  maxWidth,
  height,
  className = '',
  style,
  animated = true
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (n) => `sbr${uid}-${n}`;
  const ref = (n) => `url(#${id(n)})`;

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

  const specksL = useMemo(() => makeSpecks(11, 26), []);
  const specksR = useMemo(() => makeSpecks(29, 26), []);

  /* ---------------------------------------------------------------- phần tử */
  const renderSeedling = (stress) => (
    <g className="sbr-sway">
      <path d="M220 120 C220 104 221 90 220 74" stroke="#2f8f4e" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M221.5 118 C221.5 104 222.5 90 221.5 76" stroke="#7ddc9a" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".7" />
      <g transform={stress ? 'rotate(-16 220 82)' : undefined}>
        <path d="M220 82 C200 66 176 68 168 82 C186 92 206 92 220 82 Z" fill={ref(stress ? 'leafPale' : 'leaf')} stroke="#14532d" strokeOpacity=".35" strokeWidth="1" />
        <path d="M217 83 L182 80" stroke="#fff" strokeOpacity=".4" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <g transform={stress ? 'rotate(16 220 82)' : undefined}>
        <path d="M220 82 C240 66 264 68 272 82 C254 92 234 92 220 82 Z" fill={ref(stress ? 'leafPale' : 'leaf')} stroke="#14532d" strokeOpacity=".35" strokeWidth="1" />
        <path d="M223 83 L258 80" stroke="#fff" strokeOpacity=".4" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <path d="M220 76 C213 64 219 55 226 52 C229 62 227 71 220 76 Z" fill={ref(stress ? 'leafPale' : 'leaf')} stroke="#14532d" strokeOpacity=".35" strokeWidth="1" />
    </g>
  );

  const renderRoots = () => (
    <g fill="none" strokeLinecap="round">
      {/* bóng đổ nhẹ để tạo chiều sâu */}
      <g transform="translate(2 2.5)" stroke="#000" strokeOpacity=".28">
        <path d={ROOTS_MAIN} strokeWidth="6" />
        {ROOTS_SIDE.map((d) => <path key={d} d={d} strokeWidth="4" />)}
      </g>
      <path d={ROOTS_MAIN} stroke="#f5e7c8" strokeWidth="5.5" />
      {ROOTS_SIDE.map((d) => <path key={d} d={d} stroke="#f5e7c8" strokeWidth="3.6" />)}
      <path d="M219 122 C219 160 217 200 219 256" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
      {ROOT_TIPS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" fill="#fffbe9" stroke="#d6b87a" strokeWidth="1" />
      ))}
    </g>
  );

  const renderRocket = (transform, flameScale = 1) => (
    <g transform={transform}>
      <g className="sbr-flame" transform={`scale(${flameScale})`}>
        <path d="M-5 14 Q0 36 5 14 Z" fill="#fbbf24" />
        <path d="M-2.5 14 Q0 26 2.5 14 Z" fill="#fff7d6" />
      </g>
      <path d="M-6 6 L-15 17 L-6 14 Z" fill="#dc2626" />
      <path d="M6 6 L15 17 L6 14 Z" fill="#dc2626" />
      <path d="M0 -22 C10 -12 10 6 6 14 L-6 14 C-10 6 -10 -12 0 -22 Z" fill={ref('rocketBody')} stroke="#64748b" strokeWidth="1" />
      <path d="M0 -22 C4 -18 6 -14 7 -10 L-7 -10 C-6 -14 -4 -18 0 -22 Z" fill="#ef4444" />
      <circle cx="0" cy="-2" r="4.2" fill="#38bdf8" stroke="#1e293b" strokeWidth="1.5" />
      <circle cx="-1.2" cy="-3.2" r="1.2" fill="#fff" opacity=".85" />
    </g>
  );

  const renderPanelBase = (kind) => (
    <>
      {/* trời */}
      <rect x="0" y="0" width="440" height="122" fill={ref('sky')} />
      {/* đất: nền + vân tầng đất */}
      <rect x="0" y="120" width="440" height="270" fill={ref('soil')} />
      <path d="M0 205 Q60 198 120 206 T240 204 T360 208 T440 202" stroke="#fff" strokeOpacity=".07" strokeWidth="3" fill="none" />
      <path d="M0 300 Q70 294 140 301 T280 299 T440 303" stroke="#fff" strokeOpacity=".06" strokeWidth="3" fill="none" />
      {(kind === 'basal' ? specksL : specksR).map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={p.light ? '#e8c9a0' : '#3b2414'} opacity={p.o} />
      ))}
      {/* thảm cỏ mặt đất */}
      <path d="M0 120 L0 113 Q30 108 60 113 T120 112 T180 113 T240 111 T300 113 T360 112 T440 112 L440 120 Z" fill={ref('grass')} />
      <rect x="0" y="118.5" width="440" height="2.5" fill="#000" opacity=".18" />
    </>
  );

  const renderCard = (cx, y, ok, title, sub) => (
    <g>
      <rect x={cx} y={y} width="392" height="46" rx="14" fill="#fff" fillOpacity=".95" />
      <circle cx={cx + 26} cy={y + 23} r="14" fill={ok ? C.green : C.red} />
      {ok ? (
        <path d={`M${cx + 19} ${y + 23} l5 5.5 l10 -11`} stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      ) : (
        <path d={`M${cx + 20} ${y + 17} l12 12 M${cx + 32} ${y + 17} l-12 12`} stroke="#fff" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      )}
      <text x={cx + 52} y={y + 20} fontSize="14" fontWeight="800" fill={C.ink}>{title}</text>
      <text x={cx + 52} y={y + 37} fontSize="11.5" fill={C.slate}>{sub}</text>
    </g>
  );

  const renderPill = (x, y, w, text, fill = '#fff', color = C.ink, fs = 11) => (
    <g>
      <rect x={x} y={y} width={w} height="20" rx="10" fill={fill} fillOpacity=".95" />
      <text x={x + w / 2} y={y + 14} fontSize={fs} fontWeight="700" textAnchor="middle" fill={color}>{text}</text>
    </g>
  );

  /* ---------------------------------------------------------------- render */
  const rootStyle = {
    width: size,
    maxWidth,
    height,
    aspectRatio: height ? undefined : `${W} / ${H}`,
    display: 'block',
    ...style
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby={id('title')}
      className={`sbr-root ${live ? 'sbr-on' : ''} ${className}`.trim()}
      style={rootStyle}
      preserveAspectRatio="xMidYMid meet"
      fontFamily="'Be Vietnam Pro', 'Segoe UI', system-ui, sans-serif"
    >
      <title id={id('title')}>
        So sánh bón lót đặt gần vùng rễ non với rải phân trên mặt đất: photphat ít di động nên bón lót giúp rễ non tiếp cận P sớm
      </title>

      <style>{`
        .sbr-on .sbr-sway{transform-box:fill-box;transform-origin:50% 100%;animation:sbr-sway 4.5s ease-in-out infinite alternate}
        .sbr-on .sbr-pulse{animation:sbr-pulse 3s ease-in-out infinite alternate}
        .sbr-on .sbr-float{animation:sbr-float 3.4s ease-in-out infinite alternate}
        .sbr-on .sbr-flame{transform-box:fill-box;transform-origin:50% 0;animation:sbr-flame .5s ease-in-out infinite alternate}
        .sbr-on .sbr-dash{animation:sbr-dash 1.8s linear infinite}
        @keyframes sbr-sway{from{transform:rotate(-1.6deg)}to{transform:rotate(1.6deg)}}
        @keyframes sbr-pulse{from{opacity:.3}to{opacity:.75}}
        @keyframes sbr-float{from{transform:translateY(0)}to{transform:translateY(-4px)}}
        @keyframes sbr-flame{from{transform:scaleY(.75)}to{transform:scaleY(1.2)}}
        @keyframes sbr-dash{to{stroke-dashoffset:-20}}
      `}</style>

      <defs>
        {/* ----- gradient: tạo khối 3D nhẹ ----- */}
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bae6fd" />
          <stop offset="1" stopColor="#f0fdf4" />
        </linearGradient>
        <linearGradient id={id('soil')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b3a22" />
          <stop offset=".5" stopColor="#7d5230" />
          <stop offset="1" stopColor="#a4764a" />
        </linearGradient>
        <linearGradient id={id('grass')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4ade80" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id={id('leaf')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bbf7d0" />
          <stop offset=".55" stopColor="#4ade80" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id={id('leafPale')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4f3d2" />
          <stop offset="1" stopColor="#8cbf78" />
        </linearGradient>
        <linearGradient id={id('okPill')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22c55e" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id={id('noPill')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#64748b" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <linearGradient id={id('rocketBody')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id={id('zone')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbbf24" stopOpacity=".6" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('clay')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e7d3b8" />
          <stop offset="1" stopColor="#b79a74" />
        </linearGradient>
        <radialGradient id={id('gran')} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff3c4" />
          <stop offset=".45" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#b45309" />
        </radialGradient>
        <radialGradient id={id('ionG')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#f3e8ff" />
          <stop offset=".5" stopColor="#a855f7" />
          <stop offset="1" stopColor="#6b21a8" />
        </radialGradient>
        <radialGradient id={id('halo')} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fde68a" stopOpacity=".9" />
          <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
        </radialGradient>

        <filter id={id('shadow')} x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#0f172a" floodOpacity=".3" />
        </filter>
        <clipPath id={id('clip')}>
          <rect width="440" height="390" rx="22" />
        </clipPath>

        {/* ----- ký hiệu dùng lại ----- */}
        <g id={id('granule')}>
          <ellipse cx="1.5" cy="8.5" rx="7.5" ry="2.6" fill="#000" opacity=".3" />
          <circle r="8.5" fill={ref('gran')} stroke="#92400e" strokeOpacity=".5" strokeWidth="1" />
          <ellipse cx="-2.6" cy="-3" rx="2.8" ry="1.8" fill="#fff" opacity=".75" />
        </g>
        <g id={id('ion')}>
          <circle r="11" fill="#c084fc" opacity=".28" />
          <circle r="7" fill={ref('ionG')} stroke="#581c87" strokeOpacity=".6" strokeWidth=".8" />
          <text y="3" fontSize="8.5" fontWeight="800" textAnchor="middle" fill="#fff">P</text>
        </g>
        <g id={id('plate')}>
          <path d="M-14 3 L-7 -5 L7 -5 L14 3 L7 11 L-7 11 Z" fill="#7a5c3a" />
          <path d="M-14 0 L-7 -8 L7 -8 L14 0 L7 8 L-7 8 Z" fill={ref('clay')} stroke="#8b6f4a" strokeWidth="1" />
          <path d="M-4.5 0 H4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </defs>

      {/* ============ PANEL TRÁI — BÓN LÓT ============ */}
      <g transform="translate(30 16)">
        <rect width="440" height="390" rx="22" fill="#3b2414" filter={ref('shadow')} />
        <g clipPath={ref('clip')}>
          {renderPanelBase('basal')}

          {/* tên miền hiển thị */}
          {renderSeedling(false)}

          {/* vùng rễ non */}
          <ellipse cx="220" cy="218" rx="118" ry="90" fill="#86efac" fillOpacity=".08" stroke="#86efac" strokeWidth="1.8" strokeDasharray="6 5" className="sbr-dash" />
          {renderPill(165, 298, 110, 'Vùng rễ non', '#dcfce7', C.greenDark)}

          {/* dải phân bón lót */}
          <ellipse cx="220" cy="250" rx="140" ry="34" fill={ref('halo')} className="sbr-pulse" />
          <rect x="106" y="232" width="228" height="38" rx="19" fill="#fbbf24" fillOpacity=".14" stroke="#fde68a" strokeOpacity=".8" strokeWidth="1.3" strokeDasharray="5 4" />
          <text x="112" y="226" fontSize="11" fontWeight="700" fill="#fde68a">Dải phân bón lót</text>

          {renderRoots()}

          {GRANULES_BASAL.map(([x, y]) => (
            <use key={`${x}-${y}`} href={`#${id('granule')}`} transform={`translate(${x} ${y})`} />
          ))}

          {/* ion P chạy về phía rễ */}
          {ION_FLOWS.map((f, i) =>
            live ? (
              <g key={i} opacity="0">
                <animateMotion path={f.path} dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur={`${f.dur}s`} begin={`${f.begin}s`} repeatCount="indefinite" />
                <use href={`#${id('ion')}`} />
              </g>
            ) : (
              <use key={i} href={`#${id('ion')}`} transform={`translate(${f.to[0]} ${f.to[1]})`} />
            )
          )}
          {/* ion đã sát rễ */}
          {[[140, 224], [300, 224], [186, 292], [256, 292]].map(([x, y]) => (
            <use key={`${x}-${y}`} href={`#${id('ion')}`} transform={`translate(${x} ${y}) scale(.8)`} />
          ))}

          {/* tên khởi động sớm */}
          <g className="sbr-float">
            {renderRocket('translate(372 80) rotate(20)')}
          </g>
          <text x="372" y="117" fontSize="11" fontWeight="700" textAnchor="middle" fill={C.greenDark}>Xuất phát sớm</text>

          {renderCard(24, 334, true, 'Cây con hút được P ngay đầu vụ', 'Phân đặt sát vùng rễ non, ít bị hao hụt')}
        </g>
        <rect width="440" height="390" rx="22" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
        {/* tiêu đề panel */}
        <rect x="75" y="8" width="290" height="32" rx="16" fill={ref('okPill')} />
        {renderRocket('translate(104 25) rotate(0) scale(.55)')}
        <text x="240" y="29" fontSize="14.5" fontWeight="800" textAnchor="middle" fill="#fff">Bón lót gần vùng rễ</text>
      </g>

      {/* ============ PANEL PHẢI — RẢI MẶT ============ */}
      <g transform="translate(490 16)">
        <rect width="440" height="390" rx="22" fill="#3b2414" filter={ref('shadow')} />
        <g clipPath={ref('clip')}>
          {renderPanelBase('surface')}

          {/* mây */}
          <g opacity=".85">
            <ellipse cx="350" cy="78" rx="30" ry="9" fill="#fff" />
            <ellipse cx="338" cy="71" rx="16" ry="9" fill="#fff" />
            <ellipse cx="362" cy="70" rx="13" ry="8" fill="#fff" />
          </g>

          {renderSeedling(true)}

          {/* vùng P bị giữ ở tầng mặt */}
          <rect x="0" y="120" width="440" height="58" fill={ref('zone')} />
          <path d="M0 178 Q110 184 220 178 T440 178" stroke="#fde68a" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="5 4" fill="none" />
          <text x="428" y="136" fontSize="11" fontWeight="700" textAnchor="end" fill="#fff7d6">P kẹt ở tầng mặt</text>

          {/* keo đất + ion P bị giữ */}
          {[[92, 148], [130, 166], [176, 154], [266, 156], [308, 168], [350, 150]].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <use href={`#${id('plate')}`} transform={`translate(${x} ${y})`} />
              <use href={`#${id('ion')}`} transform={`translate(${x + 13} ${y - 6}) scale(.7)`} />
            </g>
          ))}

          {/* mũi tên bị chặn */}
          {[150, 292].map((x) => (
            <g key={x} stroke="#fff" strokeLinecap="round" fill="none">
              <path d={`M${x} 184 L${x} 198`} strokeWidth="2.2" strokeDasharray="4 4" className="sbr-dash" />
              <path d={`M${x - 10} 203 H${x + 10}`} strokeWidth="3.4" stroke="#fca5a5" />
            </g>
          ))}
          {renderPill(66, 212, 68, 'Fe · Al', '#fef3c7', '#92400e')}
          {renderPill(318, 214, 56, 'Ca', '#fef3c7', '#92400e')}

          {/* vùng rễ + khoảng cách */}
          <ellipse cx="220" cy="218" rx="118" ry="90" fill="none" stroke="#fca5a5" strokeOpacity=".9" strokeWidth="1.8" strokeDasharray="6 5" className="sbr-dash" />
          {renderPill(165, 298, 110, 'Vùng rễ non', '#fee2e2', '#991b1b')}
          <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M40 176 L40 256" />
            <path d="M35 181 L40 175 L45 181 M35 251 L40 257 L45 251" />
          </g>
          <text transform="translate(28 216) rotate(-90)" fontSize="11" fontWeight="700" textAnchor="middle" fill="#fff">Xa vùng rễ</text>

          {renderRoots()}

          {GRANULES_SURFACE.map(([x, y]) => (
            <use key={`${x}-${y}`} href={`#${id('granule')}`} transform={`translate(${x} ${y})`} />
          ))}

          {renderCard(24, 334, false, 'P nằm xa rễ, cây con khó tiếp cận', 'Bị keo đất giữ ở tầng mặt, di chuyển rất ít')}
        </g>
        <rect width="440" height="390" rx="22" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
        <rect x="75" y="8" width="290" height="32" rx="16" fill={ref('noPill')} />
        <path d="M107 19 l12 12 M119 19 l-12 12" stroke="#fca5a5" strokeWidth="3" strokeLinecap="round" />
        <text x="246" y="29" fontSize="14.5" fontWeight="800" textAnchor="middle" fill="#fff">Rải trên mặt đất</text>
      </g>

      {/* huy hiệu VS */}
      <circle cx="480" cy="211" r="21" fill={C.ink} stroke="#fff" strokeWidth="3" />
      <text x="480" y="217" fontSize="15" fontWeight="800" textAnchor="middle" fill="#fff">VS</text>

      {/* ============ CHÚ GIẢI ============ */}
      <rect x="30" y="424" width="900" height="96" rx="18" fill="#fff" fillOpacity=".92" stroke="#e2e8f0" />
      {[
        { x: 54, title: 'Hạt phân lân', sub: 'bón lót hoặc rải mặt' },
        { x: 279, title: 'Ion photphat (P)', sub: 'ít di động trong đất' },
        { x: 504, title: 'Keo đất, Fe, Al, Ca', sub: 'giữ hoặc kết tủa P' },
        { x: 729, title: 'Rễ non', sub: 'cần P sớm để phát triển' }
      ].map((it, i) => (
        <g key={it.title}>
          {i === 0 && <use href={`#${id('granule')}`} transform={`translate(${it.x + 18} 470) scale(1.4)`} />}
          {i === 1 && <use href={`#${id('ion')}`} transform={`translate(${it.x + 18} 472) scale(1.5)`} />}
          {i === 2 && <use href={`#${id('plate')}`} transform={`translate(${it.x + 18} 470) scale(1.3)`} />}
          {i === 3 && (
            <g fill="none" strokeLinecap="round">
              <path d={`M${it.x + 18} 452 V490 M${it.x + 18} 466 L${it.x + 6} 480 M${it.x + 18} 472 L${it.x + 32} 486`} stroke="#00000030" strokeWidth="5" transform="translate(1.5 2)" />
              <path d={`M${it.x + 18} 452 V490 M${it.x + 18} 466 L${it.x + 6} 480 M${it.x + 18} 472 L${it.x + 32} 486`} stroke="#d9b974" strokeWidth="4.5" />
            </g>
          )}
          <text x={it.x + 52} y="468" fontSize="14" fontWeight="800" fill={C.ink}>{it.title}</text>
          <text x={it.x + 52} y="486" fontSize="12" fill={C.slate}>{it.sub}</text>
        </g>
      ))}
    </svg>
  );
}