import React, { useId } from 'react';

/* ------------------------------------------------------------------
   Bản đồ & infographic 3 nhà máy đạm tiêu biểu tại Việt Nam (Slide 7) — bản nâng cấp.
   - Đúng 3 nhà máy: Đạm Phú Mỹ, Đạm Cà Mau (khí thiên nhiên), Đạm Ninh Bình (khí hóa than cám).
   - Không đưa tổng sản lượng hay tỷ lệ tự chủ thiếu nguồn đồng nhất.
   - ID trong <defs> dùng useId() để không xung đột khi mở Lightbox.

   Props
   - width:     chiều rộng (số px hoặc '100%', '48rem'...). Mặc định '100%'.
   - height:    chiều cao. Mặc định 'auto' (giữ tỉ lệ 980:900).
   - maxWidth:  giới hạn chiều rộng (tuỳ chọn).
   - animated:  bật/tắt chuyển động (mặc định true). Tự tắt khi bật "reduce motion".
   - className, style: truyền thêm cho thẻ <svg>.
   Ví dụ: <SvgVietnamFactories width={720} />
------------------------------------------------------------------- */

const SX = 48;
const SY = 50;
const P = (lon, lat) => [44 + (lon - 102) * SX, 88 + (23.5 - lat) * SY];
const f = (n) => n.toFixed(1);
const pts = (arr) => arr.map(([lo, la]) => P(lo, la));
const L = (arr) => pts(arr).map(([x, y]) => `L${f(x)} ${f(y)}`).join(' ');

function smooth(ps) {
  let d = '';
  for (let i = 0; i < ps.length - 1; i++) {
    const p0 = ps[i - 1] || ps[i], p1 = ps[i], p2 = ps[i + 1], p3 = ps[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])} `;
  }
  return d;
}

const closedBlob = (arr) => {
  const ps = pts(arr);
  const n = ps.length;
  const ring = [ps[n - 1], ...ps, ps[0], ps[1]];
  const segs = smooth(ring).trim().split(/(?=C)/);
  return `M${f(ps[0][0])} ${f(ps[0][1])} ` + segs.slice(1, n + 1).join(' ') + ' Z';
};

/* ---------- Dữ liệu địa lý (giữ nguyên) ---------- */
const CHINA = [
  [102.14, 22.40], [102.45, 22.75], [102.95, 22.55], [103.30, 22.80], [103.60, 22.60],
  [103.97, 22.52], [104.28, 22.82], [104.40, 22.82], [104.65, 23.10], [104.85, 23.17],
  [105.10, 23.28], [105.32, 23.36], [105.55, 23.08], [105.85, 23.10], [106.10, 22.98],
  [106.55, 22.90], [106.70, 22.82], [106.58, 22.55], [106.75, 22.38], [106.72, 22.00],
  [106.95, 22.05], [107.35, 21.95], [107.55, 21.65], [107.95, 21.58], [108.05, 21.52],
];
const COAST = [
  [108.05, 21.52], [107.95, 21.42], [107.65, 21.32], [107.40, 21.20], [107.10, 20.98],
  [106.85, 20.82], [106.80, 20.72], [106.62, 20.60], [106.58, 20.40], [106.52, 20.27],
  [106.35, 20.08], [106.12, 19.98], [105.92, 19.75], [105.75, 19.40], [105.72, 19.15],
  [105.73, 18.80], [105.90, 18.50], [106.10, 18.30], [106.35, 18.05], [106.55, 17.75],
  [106.62, 17.48], [106.95, 17.10], [107.17, 16.92], [107.62, 16.55], [108.00, 16.25],
  [108.25, 16.10], [108.40, 15.88], [108.65, 15.55], [108.80, 15.38], [108.95, 15.00],
  [109.05, 14.65], [109.20, 14.20], [109.28, 13.77], [109.30, 13.30], [109.46, 12.88],
  [109.22, 12.25], [109.22, 11.90], [109.00, 11.55], [109.02, 11.28], [108.50, 11.05],
  [108.10, 10.92], [107.60, 10.65], [107.45, 10.45], [107.12, 10.32], [106.90, 10.38],
  [106.75, 10.28], [106.60, 9.95], [106.50, 9.60], [106.10, 9.35], [105.75, 9.15],
  [105.30, 8.75], [104.72, 8.60], [104.80, 8.90], [104.80, 9.35], [104.95, 9.75],
  [105.08, 10.02], [104.85, 10.20], [104.50, 10.38],
];
const CAMBODIA = [
  [104.65, 10.50], [104.95, 10.55], [105.05, 10.85], [105.40, 10.90], [105.80, 11.00],
  [106.00, 11.15], [106.15, 11.25], [105.95, 11.45], [106.20, 11.75], [106.60, 11.80],
  [106.85, 12.05], [107.40, 12.25], [107.55, 12.60], [107.40, 13.00], [107.55, 13.45],
  [107.40, 14.10], [107.55, 14.70],
];
const LAOS = [
  [107.38, 15.15], [107.50, 15.55], [107.30, 15.95], [107.15, 16.30], [106.85, 16.35],
  [106.60, 16.62], [106.65, 16.95], [106.40, 17.25], [106.05, 17.40], [105.75, 17.75],
  [105.55, 18.00], [105.20, 18.35], [105.00, 18.65], [104.50, 19.05], [104.15, 19.45],
  [104.35, 19.95], [104.60, 20.35], [104.30, 20.55], [103.90, 20.85], [103.40, 21.00],
  [103.05, 21.25], [102.85, 21.45], [102.45, 21.80], [102.15, 22.20],
];

const coastPx = pts(COAST);
const COAST_D = `M${f(coastPx[0][0])} ${f(coastPx[0][1])} ` + smooth(coastPx);
const LAND_D =
  `M${f(P(...CHINA[0])[0])} ${f(P(...CHINA[0])[1])} ` + L(CHINA.slice(1)) + ' ' +
  smooth(coastPx) + L(CAMBODIA) + ' ' + L(LAOS) + ' Z';

const PHUQUOC = [[103.93, 10.45], [104.03, 10.30], [104.05, 10.10], [103.97, 9.92], [103.88, 10.10], [103.85, 10.30]];
const CONDAO = [[106.52, 8.74], [106.62, 8.72], [106.66, 8.65], [106.57, 8.62]];
const CATBA = [[106.97, 20.82], [107.07, 20.84], [107.10, 20.76], [107.00, 20.72]];
const LYSON = [[109.10, 15.40], [109.14, 15.40], [109.13, 15.36], [109.09, 15.37]];

const RIVERS = [
  [[103.97, 22.50], [104.40, 22.10], [104.90, 21.65], [105.35, 21.30], [105.85, 21.05], [106.05, 20.70], [106.25, 20.45], [106.52, 20.27]],
  [[105.25, 10.85], [105.75, 10.60], [106.35, 10.35], [106.75, 10.28]],
  [[105.10, 10.75], [105.78, 10.03], [106.15, 9.50]],
].map(pts);
const riverD = (ps) => `M${f(ps[0][0])} ${f(ps[0][1])} ` + smooth(ps);
const RIVERS_D = RIVERS.map(riverD).join(' ');

const CITIES = [
  { n: 'Hà Nội', p: [105.85, 21.03], dx: -10, dy: 4, a: 'end', star: true },
  { n: 'Đà Nẵng', p: [108.2, 16.05], dx: 10, dy: 4, a: 'start' },
  { n: 'TP. Hồ Chí Minh', p: [106.70, 10.78], dx: -10, dy: -8, a: 'end', star: true },
];

/* Hộp nhà máy phía Nam hẹp hơn (204px) và dịch trái để không che Quần đảo Trường Sa */
const FACTORIES = [
  { id: 'nb', name: 'ĐẠM NINH BÌNH', loc: 'Ninh Bình · Vinachem', feed: 'Than cám → Khí hóa → NH₃ → Urê', p: [105.97, 20.25], color: '#475569', badgeBg: '#F1F5F9', icon: 'coal', box: [316, 134], bw: 248 },
  { id: 'pm', name: 'ĐẠM PHÚ MỸ', loc: 'Bà Rịa – Vũng Tàu · PVFCCo', feed: 'Khí thiên nhiên → NH₃ → Urê', p: [107.05, 10.60], color: '#0284C7', badgeBg: '#E0F2FE', icon: 'gas', box: [292, 650], bw: 204 },
  { id: 'cm', name: 'ĐẠM CÀ MAU', loc: 'Cà Mau · PVCFC (PM3-CAA)', feed: 'Khí thiên nhiên → NH₃ → Urê', p: [105.17, 9.17], color: '#16A36A', badgeBg: '#DCFCE7', icon: 'gas', box: [292, 742], bw: 204 },
];

const SPRATLY = [[111.9, 10.8], [112.5, 9.8], [112.0, 9.6], [112.7, 10.6], [112.3, 8.9], [111.7, 10.1]];
const PARACEL = [[110.8, 16.6], [111.4, 16.35], [112.0, 16.1], [111.0, 16.95], [111.5, 16.8]];

const FONT = "'Be Vietnam Pro','Segoe UI',Roboto,system-ui,sans-serif";

function FactoryPin({ d, idx, shadow }) {
  const [x, y] = P(...d.p);
  const [bx, by] = d.box;
  const bw = d.bw, bh = 76;
  const ly = by + bh / 2;
  const route = `M${f(x)} ${f(y)} L${bx - 14} ${f(y)} L${bx - 14} ${ly} L${bx} ${ly}`;
  return (
    <g>
      <path d={route} fill="none" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path className="vn-flow" d={route} fill="none" stroke={d.color} strokeWidth="2.4" strokeDasharray="6 5" strokeLinecap="round" strokeLinejoin="round" />

      <circle className="vn-pulse" style={{ animationDelay: `${idx * 0.6}s` }} cx={x} cy={y} r="14" fill="none" stroke={d.color} strokeWidth="2" />
      <ellipse cx={x} cy={y + 17} rx="10" ry="3" fill="#0F172A" opacity=".2" />
      <g transform={`translate(${f(x)},${f(y)})`}>
        <circle r="14" fill={d.color} stroke="#FFFFFF" strokeWidth="2.6" />
        <ellipse cx="-4" cy="-6" rx="5" ry="2.6" fill="#FFFFFF" opacity=".35" />
        {d.icon === 'coal'
          ? <path d="M-6 5V-1L-2-4V-1L2-4V-1L6-5V5Z" fill="#FFFFFF" />
          : <path d="M0-7C4-3 5 0 5 2A5 5 0 0 1-5 2C-5-1-2-2 0-7Z" fill="#FFFFFF" />}
      </g>

      <g filter={shadow}>
        <rect x={bx} y={by} width={bw} height={bh} rx="14" fill="#FFFFFF" stroke={d.color} strokeWidth="1.8" />
      </g>
      <rect x={bx + 2} y={by + 2} width={bw - 4} height="22" rx="12" fill="#FFFFFF" opacity=".6" />
      <rect x={bx} y={by + 10} width="6" height={bh - 20} rx="3" fill={d.color} />
      <text x={bx + 16} y={by + 24} fill="#10251E" fontSize="14.5" fontWeight="900">{d.name}</text>
      <text x={bx + 16} y={by + 43} fill="#475569" fontSize="12.5" fontWeight="700">{d.loc}</text>
      <rect x={bx + 12} y={by + 51} width={bw - 22} height="20" rx="10" fill={d.badgeBg} />
      <text x={bx + 20} y={by + 65} fill={d.color} fontSize="11.5" fontWeight="800">{d.feed}</text>
    </g>
  );
}

export default function SvgVietnamFactories({
  width = '100%',
  height = 'auto',
  maxWidth,
  animated = true,
  className,
  style,
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const uid = (name) => `vnfac-${rawId}-${name}`;
  const url = (name) => `url(#${uid(name)})`;

  const yHN = P(0, 17.4)[1];
  const yNam = P(0, 11.3)[1];

  const steps = [
    { y: 38, step: 'BƯỚC 1', title: 'Nguyên liệu đầu vào', desc: 'CH₄ hoặc than cám + O₂ / hơi nước', c: '#0284C7' },
    { y: 86, step: 'BƯỚC 2', title: 'Khí tổng hợp → Amoniac (NH₃)', desc: 'Tạo H₂, N₂, CO₂ → tổng hợp NH₃', c: '#16A36A' },
    { y: 134, step: 'BƯỚC 3', title: 'Tổng hợp Urê & tạo hạt', desc: '2NH₃ + CO₂ ⇌ CO(NH₂)₂ + H₂O', c: '#174B37' },
  ];

  return (
    <svg
      className={`${animated ? 'vn-anim' : ''}${className ? ` ${className}` : ''}`}
      viewBox="0 0 980 900"
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      role="img"
      aria-labelledby={`${uid('title')} ${uid('desc')}`}
      fontFamily={FONT}
      style={{ display: 'block', maxWidth: maxWidth ?? '100%', aspectRatio: '980 / 900', borderRadius: 22, ...style }}
    >
      <title id={uid('title')}>Bản đồ và quy trình sản xuất của 3 nhà máy phân đạm tiêu biểu tại Việt Nam</title>
      <desc id={uid('desc')}>
        Phân bố và công nghệ sản xuất của Đạm Phú Mỹ, Đạm Cà Mau (đi từ khí thiên nhiên) và Đạm Ninh Bình (đi từ khí hóa than cám).
      </desc>
      <style>{`
        @media (prefers-reduced-motion:no-preference){
          .vn-anim .vn-flow{animation:vnDash 1.6s linear infinite}
          .vn-anim .vn-pulse{transform-box:fill-box;transform-origin:center;animation:vnPulse 2.8s ease-out infinite}
          .vn-anim .vn-wave{animation:vnWave 7s ease-in-out infinite}
        }
        .vn-pulse{opacity:0}
        .vn-anim .vn-pulse{opacity:.65}
        @keyframes vnDash{to{stroke-dashoffset:-22}}
        @keyframes vnPulse{0%{transform:scale(.85);opacity:.65}100%{transform:scale(2.2);opacity:0}}
        @keyframes vnWave{0%,100%{opacity:.5}50%{opacity:.85}}
      `}</style>
      <defs>
        <clipPath id={uid('vnFrame')}><rect x="20" y="64" width="560" height="816" rx="22" /></clipPath>
        <clipPath id={uid('vnLandClip')}><path d={LAND_D} /></clipPath>
        <clipPath id={uid('vnPanelClip')}><rect width="364" height="128" rx="22" /></clipPath>

        <linearGradient id={uid('vnPanelHead')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10251E" /><stop offset=".6" stopColor="#174B37" /><stop offset="1" stopColor="#16A36A" />
        </linearGradient>
        <linearGradient id={uid('vnSea')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E6F5FE" /><stop offset="1" stopColor="#B7E1FA" />
        </linearGradient>
        <linearGradient id={uid('vnLand')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4FEF7" /><stop offset=".55" stopColor="#DCFCE7" /><stop offset="1" stopColor="#B7F2CB" />
        </linearGradient>
        <linearGradient id={uid('vnBg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7F5EC" /><stop offset="1" stopColor="#ECFDF5" />
        </linearGradient>
        <linearGradient id={uid('vnTitle')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#10251E" /><stop offset="1" stopColor="#16A36A" />
        </linearGradient>
        <linearGradient id={uid('vnGloss')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".7" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={uid('vnPlain')}><stop offset="0" stopColor="#FEF9C3" stopOpacity=".85" /><stop offset="1" stopColor="#FEF9C3" stopOpacity="0" /></radialGradient>
        <filter id={uid('vnShadow')} x="-10%" y="-15%" width="125%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0F172A" floodOpacity=".16" />
        </filter>
        <filter id={uid('vnCard')} x="-6%" y="-4%" width="112%" height="110%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#10251E" floodOpacity=".12" />
        </filter>
      </defs>

      {/* ============ NỀN & TIÊU ĐỀ ============ */}
      <rect width="980" height="900" rx="26" fill={url('vnBg')} stroke="#D8DED5" strokeWidth="1.5" />
      <rect x="22" y="16" width="6" height="36" rx="3" fill="#16A36A" />
      <text x="40" y="33" fontSize="21" fontWeight="900" letterSpacing="-.3" fill={url('vnTitle')}>
        BA NHÀ MÁY ĐẠM TIÊU BIỂU TẠI VIỆT NAM
      </text>
      <text x="40" y="53" fontSize="13.5" fontWeight="700" fill="#4B5F55">
        Đạm Phú Mỹ · Đạm Cà Mau (nhánh khí thiên nhiên) &amp; Đạm Ninh Bình (nhánh khí hóa than cám)
      </text>

      {/* ============ KHUNG BẢN ĐỒ ============ */}
      <rect x="20" y="64" width="560" height="816" rx="22" fill="#10251E" opacity=".1" transform="translate(0 6)" />
      <g clipPath={url('vnFrame')}>
        <rect x="20" y="64" width="560" height="816" fill={url('vnSea')} />
        <path className="vn-wave" d="M30 600Q120 585 210 600T390 600T570 600M30 650Q120 635 210 650T390 650T570 650" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity=".5" strokeLinecap="round" />

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={COAST_D} stroke="#BAE6FD" strokeWidth="42" opacity=".55" />
          <path d={COAST_D} stroke="#F0F9FF" strokeWidth="18" opacity=".8" />
        </g>

        {/* Đất liền nổi khối: bóng nền, thành bên, mặt trên */}
        <path d={LAND_D} transform="translate(0 9)" fill="#0F172A" opacity=".14" />
        <path d={LAND_D} transform="translate(0 4)" fill="#5FB98A" stroke="#3F9F6E" strokeWidth="2" strokeLinejoin="round" />
        <path d={LAND_D} fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinejoin="round" />
        <path d={LAND_D} fill={url('vnLand')} stroke="#16A36A" strokeWidth="2.4" strokeLinejoin="round" />

        <g clipPath={url('vnLandClip')}>
          <rect x="0" y="60" width="600" height={yHN - 60} fill="#60A5FA" opacity=".18" />
          <rect x="0" y={yHN} width="600" height={yNam - yHN} fill="#A78BFA" opacity=".16" />
          <rect x="0" y={yNam} width="600" height={900 - yNam} fill="#FDBA74" opacity=".24" />

          {[[105.55, 10.1, 82, 50], [106.05, 20.55, 44, 38]].map(([lo, la, rx, ry], i) => {
            const [x, y] = P(lo, la);
            return <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={url('vnPlain')} />;
          })}

          <g fill="none" strokeLinecap="round">
            <path d={RIVERS_D} stroke="#FFFFFF" strokeWidth="4" opacity=".7" />
            <path d={RIVERS_D} stroke="#0EA5E9" strokeWidth="1.8" />
          </g>
          <rect x="0" y="60" width="600" height="120" fill={url('vnGloss')} opacity=".5" />
        </g>

        {/* Đảo */}
        <g fill="#BBF7D0" stroke="#16A36A" strokeWidth="1.2">
          {[PHUQUOC, CONDAO, CATBA, LYSON].map((a, i) => <path key={i} d={closedBlob(a)} />)}
        </g>

        {/* Hoàng Sa */}
        <ellipse cx={P(111.4, 16.5)[0]} cy={P(111.4, 16.5)[1]} rx="42" ry="20" fill="#22C55E" opacity=".14" stroke="#16A36A" strokeDasharray="3 4" strokeWidth="1.2" />
        {PARACEL.map(([lo, la], i) => (
          <circle key={i} cx={P(lo, la)[0]} cy={P(lo, la)[1]} r={2.8} fill="#16A36A" stroke="#FFFFFF" strokeWidth="1" />
        ))}
        <text x={P(111.4, 16.35)[0]} y={P(111.4, 16.35)[1] + 30} textAnchor="middle" fontSize="13" fontWeight="900" fill="#174B37">QĐ. HOÀNG SA</text>
        <text x={P(111.4, 16.35)[0]} y={P(111.4, 16.35)[1] + 45} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#174B37">(Việt Nam)</text>

        {/* Trường Sa */}
        <ellipse cx={P(112.2, 9.9)[0]} cy={P(112.2, 9.9)[1]} rx="38" ry="44" fill="#22C55E" opacity=".14" stroke="#16A36A" strokeDasharray="3 4" strokeWidth="1.2" />
        {SPRATLY.map(([lo, la], i) => (
          <circle key={i} cx={P(lo, la)[0]} cy={P(lo, la)[1]} r={2.6} fill="#16A36A" stroke="#FFFFFF" strokeWidth="1" />
        ))}
        <text x={P(112.2, 9.9)[0]} y={P(112.2, 8.4)[1] - 4} textAnchor="middle" fontSize="13" fontWeight="900" fill="#174B37">QĐ. TRƯỜNG SA</text>
        <text x={P(112.2, 9.9)[0]} y={P(112.2, 8.4)[1] + 11} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#174B37">(Việt Nam)</text>

        <text x="456" y="545" textAnchor="middle" fontSize="19" fontStyle="italic" fontWeight="800" fill="#0369A1" opacity=".85" letterSpacing="4">BIỂN ĐÔNG</text>

        {/* Thành phố */}
        {CITIES.map((c) => {
          const [x, y] = P(...c.p);
          return (
            <g key={c.n}>
              {c.star
                ? <rect x={x - 4.5} y={y - 4.5} width="9" height="9" fill="#DC2626" stroke="#FFFFFF" strokeWidth="1.5" transform={`rotate(45 ${x} ${y})`} />
                : <circle cx={x} cy={y} r="3.5" fill="#0F172A" stroke="#FFFFFF" strokeWidth="1.2" />}
              <text x={x + c.dx} y={y + c.dy} textAnchor={c.a} fontSize="13" fontWeight="800" fill="#10251E" stroke="#FFFFFF" strokeWidth="3" paintOrder="stroke">{c.n}</text>
            </g>
          );
        })}

        {FACTORIES.map((d, i) => <FactoryPin key={d.id} d={d} idx={i} shadow={url('vnShadow')} />)}
      </g>
      <rect x="20" y="64" width="560" height="816" rx="22" fill="none" stroke="#94A3B8" strokeWidth="1.5" />

      {/* ============ PANEL PHẢI ============ */}
      <g transform="translate(596,64)">
        <rect width="364" height="816" rx="22" fill="#FFFFFF" stroke="#D8DED5" strokeWidth="1.6" filter={url('vnCard')} />

        <g clipPath={url('vnPanelClip')}>
          <rect width="364" height="128" fill={url('vnPanelHead')} />
          <rect width="364" height="50" fill={url('vnGloss')} opacity=".25" />
        </g>
        <text x="22" y="32" fontSize="13" fontWeight="800" letterSpacing="1" fill="#A7F3D0">PHÂN BỐ &amp; CÔNG NGHỆ</text>
        <text x="22" y="66" fontSize="24" fontWeight="900" fill="#FFFFFF">2 NHÁNH NGUYÊN LIỆU</text>
        <rect x="22" y="82" width="320" height="30" rx="15" fill="#FFFFFF" opacity=".14" stroke="#A7F3D0" strokeOpacity=".5" />
        <circle cx="38" cy="97" r="4.5" fill="#6EE7B7" />
        <text x="50" y="101.5" fontSize="13" fontWeight="700" fill="#FFFFFF">Khí thiên nhiên &amp; Khí hóa than cám</text>

        {/* Nhánh 1 */}
        <g transform="translate(18, 146)">
          <rect width="328" height="148" rx="16" fill="#F0F9FF" stroke="#7DD3FC" strokeWidth="1.5" />
          <rect x="14" y="14" width="32" height="32" rx="10" fill="#0284C7" />
          <path d="M30 22C34 26 35 29 35 32A5 5 0 0 1 25 32C25 29 28 27 30 22Z" fill="#FFFFFF" />
          <text x="56" y="29" fontSize="14.5" fontWeight="900" fill="#0C4A6E">1. Nhánh Khí thiên nhiên (CH₄)</text>
          <text x="56" y="46" fontSize="12.5" fontWeight="700" fill="#0369A1">Nguyên liệu cho tổng hợp NH₃ &amp; Urê</text>

          <rect x="14" y="58" width="300" height="38" rx="10" fill="#FFFFFF" stroke="#BAE6FD" />
          <text x="24" y="75" fontSize="13" fontWeight="900" fill="#0F172A">• Đạm Phú Mỹ (Bà Rịa – Vũng Tàu)</text>
          <text x="24" y="90" fontSize="12" fontWeight="600" fill="#475569">Khí thiên nhiên → Khí tổng hợp / NH₃ → Urê</text>

          <rect x="14" y="102" width="300" height="38" rx="10" fill="#FFFFFF" stroke="#BAE6FD" />
          <text x="24" y="119" fontSize="13" fontWeight="900" fill="#0F172A">• Đạm Cà Mau (Cà Mau · PM3-CAA)</text>
          <text x="24" y="134" fontSize="12" fontWeight="600" fill="#475569">Khí thiên nhiên → NH₃ + CO₂ → Urê</text>
        </g>

        {/* Nhánh 2 */}
        <g transform="translate(18, 308)">
          <rect width="328" height="122" rx="16" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="14" y="14" width="32" height="32" rx="10" fill="#475569" />
          <path d="M24 35V29L28 26V29L32 26V29L36 25V35Z" fill="#FFFFFF" />
          <text x="56" y="29" fontSize="14.5" fontWeight="900" fill="#1E293B">2. Nhánh Than cám (Khí hóa)</text>
          <text x="56" y="46" fontSize="12.5" fontWeight="700" fill="#475569">Khí hóa than tạo khí tổng hợp</text>

          <rect x="14" y="58" width="300" height="52" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="24" y="76" fontSize="13" fontWeight="900" fill="#0F172A">• Đạm Ninh Bình (KCN Khánh Phú)</text>
          <text x="24" y="92" fontSize="12" fontWeight="600" fill="#475569">Than cám → Khí hóa → NH₃ → Urê</text>
          <text x="24" y="105" fontSize="12" fontWeight="800" fill="#C94F52">Không nhầm với CTCP Phân lân Ninh Bình</text>
        </g>

        {/* Quy trình */}
        <g transform="translate(18, 444)">
          <rect width="328" height="212" rx="16" fill="#F7F5EC" stroke="#D8DED5" strokeWidth="1.5" />
          <text x="16" y="26" fontSize="13.5" fontWeight="900" fill="#10251E">SƠ ĐỒ QUY TRÌNH RÚT GỌN</text>

          {steps.map((s, idx) => (
            <g key={s.step} transform={`translate(14, ${s.y})`}>
              <rect y="3" width="300" height="40" rx="10" fill="#10251E" opacity=".06" />
              <rect width="300" height="40" rx="10" fill="#FFFFFF" stroke="#D8DED5" />
              <rect width="64" height="40" rx="10" fill={s.c} />
              <rect x="2" y="2" width="60" height="14" rx="7" fill="#FFFFFF" opacity=".16" />
              <text x="32" y="24.5" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#FFFFFF">{s.step}</text>
              <text x="74" y="17" fontSize="12.5" fontWeight="900" fill="#10251E">{s.title}</text>
              <text x="74" y="32" fontSize="12" fontWeight="600" fill="#4B5F55">{s.desc}</text>
              {idx < 2 && <path d="M150 43L150 51" stroke={s.c} strokeWidth="2.4" strokeLinecap="round" />}
            </g>
          ))}

          <text x="164" y="192" textAnchor="middle" fontSize="12" fontWeight="800" fill="#174B37">Khí thiên nhiên / Than → Khí tổng hợp / NH₃</text>
          <text x="164" y="207" textAnchor="middle" fontSize="12" fontWeight="800" fill="#174B37">→ Urê → Nông nghiệp</text>
        </g>

        {/* Tác động */}
        <g transform="translate(18, 670)">
          <rect width="328" height="130" rx="16" fill="#ECFDF5" stroke="#86EFAC" strokeWidth="1.5" />
          <circle cx="32" cy="28" r="12" fill="#16A36A" />
          <path d="M26 28l4 4l8-8" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="52" y="33" fontSize="13.5" fontWeight="900" fill="#10251E">TÁC ĐỘNG KINH TẾ &amp; NÔNG NGHIỆP</text>
          <text x="18" y="58" fontSize="12.5" fontWeight="700" fill="#1C2923">• Chủ động nguồn cung phân đạm trong nước</text>
          <text x="18" y="78" fontSize="12.5" fontWeight="700" fill="#1C2923">• Giảm phụ thuộc nhập khẩu, kịp thời vụ</text>
          <text x="18" y="98" fontSize="12.5" fontWeight="700" fill="#1C2923">• Tạo việc làm, phát triển chuỗi hóa chất</text>
          <text x="18" y="119" fontSize="12" fontWeight="600" fill="#4B5F55">Nguồn: PVFCCo, PVCFC, Vinachem</text>
        </g>
      </g>
    </svg>
  );
}