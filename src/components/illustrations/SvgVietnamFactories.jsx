import React from 'react';

/* ------------------------------------------------------------------
   Bản đồ nhà máy đạm urê Việt Nam – bản nhẹ.
   Giữ nguyên toạ độ địa lý thật, chỉ bỏ các hiệu ứng nặng
   (feTurbulence, nhiều lớp blur, animateMotion, quét sáng, aurora...).
   Còn lại: 1 filter đổ bóng nhẹ cho thẻ, đường nối nhà máy chảy
   và vòng sóng lan ở 4 nhà máy (CSS, tự tắt khi bật reduced-motion).
------------------------------------------------------------------- */

const SX = 48;
const SY = 50;
const P = (lon, lat) => [60 + (lon - 102) * SX, 90 + (23.5 - lat) * SY];
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

/* ---------- Dữ liệu địa lý ---------- */
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
const HAINAN = [[108.7, 19.2], [109.0, 19.9], [110.1, 20.1], [110.7, 20.1], [111.0, 19.6], [110.6, 18.7], [109.9, 18.3], [109.2, 18.35], [108.7, 18.7]];

const RIVERS = [
  [[103.97, 22.50], [104.40, 22.10], [104.90, 21.65], [105.35, 21.30], [105.85, 21.05], [106.05, 20.70], [106.25, 20.45], [106.52, 20.27]],
  [[105.25, 10.85], [105.75, 10.60], [106.35, 10.35], [106.75, 10.28]],
  [[105.10, 10.75], [105.78, 10.03], [106.15, 9.50]],
].map(pts);
const riverD = (ps) => `M${f(ps[0][0])} ${f(ps[0][1])} ` + smooth(ps);
const RIVERS_D = RIVERS.map(riverD).join(' ');

/* Dãy núi: mỗi dãy gộp thành 1 path duy nhất */
function ridge(arr, step = 12) {
  const ps = pts(arr);
  const out = [];
  let k = 0;
  for (let i = 0; i < ps.length - 1; i++) {
    const [x1, y1] = ps[i], [x2, y2] = ps[i + 1];
    const n = Math.max(1, Math.floor(Math.hypot(x2 - x1, y2 - y1) / step));
    for (let j = 0; j < n; j++) {
      const t = j / n;
      const s = 3.2 + 2.6 * Math.abs(Math.sin((k + 2) * 7.31));
      out.push([x1 + (x2 - x1) * t + Math.sin((k + 1) * 12.9898) * 4, y1 + (y2 - y1) * t + Math.cos(k * 5.1) * 3, s]);
      k++;
    }
  }
  return out;
}
const mtn = ([x, y, s]) => `M${f(x - s)} ${f(y + s * 0.8)} L${f(x)} ${f(y - s)} L${f(x + s)} ${f(y + s * 0.8)} Z`;
const MOUNTAINS_D = [
  ridge([[103.15, 22.35], [103.75, 21.95], [104.4, 21.45], [104.95, 20.95], [105.2, 20.45]]),
  ridge([[105.15, 19.65], [105.55, 18.75], [106.1, 17.85], [106.75, 16.95], [107.1, 16.3]]),
  ridge([[107.35, 15.55], [107.6, 14.65], [107.95, 13.7], [108.25, 12.75], [108.45, 11.85]]),
  ridge([[105.4, 22.65], [106.1, 22.55], [106.7, 22.3]]),
].flat().map(mtn).join(' ');

const GRID_LAT = [10, 14, 18, 22];
const GRID_LON = [104, 108, 112];

const CITIES = [
  { n: 'Hà Nội', p: [105.85, 21.03], dx: -8, dy: 4, a: 'end', star: true },
  { n: 'Hải Phòng', p: [106.68, 20.85], dx: 8, dy: 12, a: 'start' },
  { n: 'Vinh', p: [105.68, 18.67], dx: 8, dy: 4, a: 'start' },
  { n: 'Huế', p: [107.58, 16.46], dx: 8, dy: 4, a: 'start' },
  { n: 'Đà Nẵng', p: [108.2, 16.05], dx: 8, dy: 4, a: 'start' },
  { n: 'Nha Trang', p: [109.19, 12.24], dx: 8, dy: 4, a: 'start' },
  { n: 'TP. Hồ Chí Minh', p: [106.70, 10.78], dx: -8, dy: -6, a: 'end', star: true },
  { n: 'Cần Thơ', p: [105.78, 10.03], dx: -8, dy: 12, a: 'end' },
];

const FACTORIES = [
  { id: 'hb', name: 'ĐẠM HÀ BẮC', sub: 'Than đá · 180 nghìn tấn/năm', v: 180, p: [106.18, 21.30], color: '#F97316', icon: 'coal', box: [372, 90] },
  { id: 'nb', name: 'ĐẠM NINH BÌNH', sub: 'Khí hóa than · 560 nghìn tấn/năm', v: 560, p: [105.97, 20.25], color: '#64748B', icon: 'coal', box: [372, 156] },
  { id: 'pm', name: 'ĐẠM PHÚ MỸ', sub: 'Khí Nam Côn Sơn · 800 nghìn tấn/năm', v: 800, p: [107.05, 10.60], color: '#3B82F6', icon: 'gas', box: [372, 686] },
  { id: 'cm', name: 'ĐẠM CÀ MAU', sub: 'Khí PM3-CAA · 800 nghìn tấn/năm', v: 800, p: [105.17, 9.17], color: '#22C55E', icon: 'gas', box: [372, 764] },
];

const SPRATLY = [[112.9, 10.8], [113.5, 9.8], [113.0, 9.6], [113.7, 10.6], [113.3, 8.9], [112.7, 10.1]];
const PARACEL = [[111.3, 16.6], [111.9, 16.35], [112.5, 16.1], [111.5, 16.95], [112.0, 16.8]];
const WAVES = [[430, 330], [585, 330], [470, 640], [395, 590], [330, 850], [540, 840], [150, 800], [560, 470]];

const FONT = "'Be Vietnam Pro','Segoe UI',Roboto,system-ui,sans-serif";

/* Luồng phân phối: cung cong từ nhà máy tới vùng tiêu thụ */
const arcD = (a, b, k) => {
  const [x1, y1] = P(...a), [x2, y2] = P(...b);
  const dx = x2 - x1, dy = y2 - y1;
  const cx = (x1 + x2) / 2 - dy * k, cy = (y1 + y2) / 2 + dx * k;
  return `M${f(x1)} ${f(y1)} Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`;
};
const FLOWS = [
  { from: 'hb', to: [104.55, 21.55], k: 0.28 },
  { from: 'nb', to: [105.45, 18.95], k: -0.22 },
  { from: 'nb', to: [107.2, 16.4], k: -0.3 },
  { from: 'pm', to: [108.1, 12.5], k: -0.25 },
  { from: 'pm', to: [108.75, 14.1], k: -0.3 },
  { from: 'cm', to: [105.35, 10.45], k: 0.3 },
];

const CSS = `
.vn-flow{animation:vnDash 1.4s linear infinite}
.vn-pulse{transform-box:fill-box;transform-origin:center;animation:vnPulse 2.8s ease-out infinite}
@keyframes vnDash{to{stroke-dashoffset:-20}}
@keyframes vnPulse{0%{transform:scale(.8);opacity:.6}100%{transform:scale(2.4);opacity:0}}
@media (prefers-reduced-motion:reduce){.vn-flow,.vn-pulse{animation:none}.vn-pulse{opacity:0}}
`;

/* ---------- Nhà máy: marker + thẻ thông tin ---------- */
function Factory({ d, idx }) {
  const [x, y] = P(...d.p);
  const [bx, by] = d.box;
  const bw = 190, bh = 54;
  const ly = by + bh / 2;
  const route = `M${f(x)} ${f(y)} L${bx - 14} ${f(y)} L${bx - 14} ${ly} L${bx} ${ly}`;
  return (
    <g>
      <path d={route} fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path className="vn-flow" d={route} fill="none" stroke={d.color} strokeWidth="2" strokeDasharray="5 5" strokeLinecap="round" strokeLinejoin="round" />

      <circle className="vn-pulse" style={{ animationDelay: `${idx * 0.6}s` }} cx={x} cy={y} r="13" fill="none" stroke={d.color} strokeWidth="1.6" />
      <g transform={`translate(${f(x)},${f(y)})`}>
        <circle r="13" fill={d.color} stroke="#fff" strokeWidth="2.4" />
        {d.icon === 'coal'
          ? <path d="M-6 5 V-1 L-2 -4 V-1 L2 -4 V-1 L6 -5 V5 Z" fill="#fff" />
          : <path d="M0 -7 C4 -3 5 0 5 2 A5 5 0 0 1 -5 2 C-5 -1 -2 -2 0 -7 Z" fill="#fff" />}
      </g>

      <g>
        <rect x={bx} y={by} width={bw} height={bh} rx="12" fill="#fff" stroke={d.color} strokeOpacity=".5" strokeWidth="1.2" />
      </g>
      <rect x={bx} y={by + 10} width="5" height={bh - 20} rx="2.5" fill={d.color} />
      <text x={bx + 17} y={by + 20} fill="#0F172A" fontSize="13" fontWeight="900">{d.name}</text>
      <text x={bx + 17} y={by + 34} fill="#475569" fontSize="12.5" fontWeight="600">{d.sub}</text>
      <rect x={bx + 17} y={by + 41} width={bw - 34} height="5" rx="2.5" fill="#E2E8F0" />
      <rect x={bx + 17} y={by + 41} width={((bw - 34) * d.v) / 800} height="5" rx="2.5" fill={d.color} />
    </g>
  );
}

export default function SvgVietnamFactories() {
  const bars = [
    { n: 'Phú Mỹ', v: 800, c: '#3B82F6' },
    { n: 'Cà Mau', v: 800, c: '#22C55E' },
    { n: 'Ninh Bình', v: 560, c: '#64748B' },
    { n: 'Hà Bắc', v: 180, c: '#F97316' },
  ];
  // Donut: khí 1600 / 2340 = 68,4%, than 740 / 2340 = 31,6%
  const R = 26, C = 2 * Math.PI * R;
  const gasLen = C * (1600 / 2340);
  const coalLen = C - gasLen;
  const yHN = P(0, 17.4)[1];
  const yNam = P(0, 11.3)[1];

  return (
    <svg
      viewBox="0 0 920 900"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fontFamily={FONT}
      style={{ display: 'block', width: '100%', height: '100%', borderRadius: 22 }}
    >
      <style>{CSS}</style>
      <defs>
        <clipPath id="vnFrame"><rect x="20" y="60" width="620" height="820" rx="22" /></clipPath>
        <clipPath id="vnLandClip"><path d={LAND_D} /></clipPath>
        <clipPath id="vnPanelClip"><rect width="240" height="154" rx="22" /></clipPath>

        <linearGradient id="vnPanelHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1226" /><stop offset=".6" stopColor="#0F3A52" /><stop offset="1" stopColor="#065F46" />
        </linearGradient>
        <linearGradient id="vnSea" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E0F2FE" /><stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="vnLand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F0FDF4" /><stop offset=".55" stopColor="#DCFCE7" /><stop offset="1" stopColor="#BBF7D0" />
        </linearGradient>
        <linearGradient id="vnBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8FAFC" /><stop offset="1" stopColor="#ECFDF5" />
        </linearGradient>
        <linearGradient id="vnTitle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0F172A" /><stop offset="1" stopColor="#047857" />
        </linearGradient>
        <radialGradient id="vnMtn"><stop offset="0" stopColor="#14532D" stopOpacity=".28" /><stop offset="1" stopColor="#14532D" stopOpacity="0" /></radialGradient>
        <radialGradient id="vnPlain"><stop offset="0" stopColor="#FEF9C3" stopOpacity=".9" /><stop offset="1" stopColor="#FEF9C3" stopOpacity="0" /></radialGradient>

        {/* filter duy nhất: đổ bóng nhẹ cho các thẻ */}
        </defs>

      {/* ============ NỀN & TIÊU ĐỀ ============ */}
      <rect width="920" height="900" rx="26" fill="url(#vnBg)" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="22" y="16" width="6" height="34" rx="3" fill="#10B981" />
      <text x="40" y="32" fontSize="19" fontWeight="900" letterSpacing="-.3" fill="url(#vnTitle)">BẢN ĐỒ NHÀ MÁY ĐẠM URÊ</text>
      <text x="40" y="49" fontSize="13" fontWeight="600" fill="#475569">Việt Nam · phân bố theo vùng và nguồn nguyên liệu</text>

      {/* ============ KHUNG BẢN ĐỒ ============ */}
      <g clipPath="url(#vnFrame)">
        <rect x="20" y="60" width="620" height="820" fill="url(#vnSea)" />

        {/* thềm lục địa: 2 dải đơn giản, không blur */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={COAST_D} stroke="#BAE6FD" strokeWidth="46" opacity=".55" />
          <path d={COAST_D} stroke="#F0F9FF" strokeWidth="20" opacity=".8" />
        </g>

        {/* sóng biển (tĩnh) */}
        <g fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity=".6">
          {WAVES.map(([x, y], i) => <path key={i} d={`M${x} ${y} q5 -4 10 0 t10 0 t10 0`} />)}
        </g>

        {/* kinh vĩ tuyến thưa */}
        <g stroke="#0F172A" strokeWidth=".6" strokeDasharray="2 5" opacity=".18">
          {GRID_LAT.map((la) => <line key={la} x1="20" x2="640" y1={P(0, la)[1]} y2={P(0, la)[1]} />)}
          {GRID_LON.map((lo) => <line key={lo} y1="60" y2="880" x1={P(lo, 0)[0]} x2={P(lo, 0)[0]} />)}
        </g>
        <g fontSize="12.5" fontWeight="600" fill="#475569">
          {GRID_LAT.map((la) => <text key={la} x="28" y={P(0, la)[1] - 3}>{la}°B</text>)}
          {GRID_LON.map((lo) => <text key={lo} y="872" x={P(lo, 0)[0] + 3}>{lo}°Đ</text>)}
        </g>

        {/* Hải Nam */}
        <path d={closedBlob(HAINAN)} fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.2" />
        <text x={P(109.9, 19.3)[0]} y={P(109.9, 19.3)[1]} textAnchor="middle" fontSize="12" fontStyle="italic" fill="#64748B" letterSpacing="1.5">Hải Nam</text>

        {/* đất liền: bóng lệch + viền trắng + nền */}
        <path d={LAND_D} transform="translate(0 3)" fill="#0F172A" opacity=".12" />
        <path d={LAND_D} fill="none" stroke="#fff" strokeWidth="8" strokeLinejoin="round" />
        <path d={LAND_D} fill="url(#vnLand)" stroke="#047857" strokeWidth="2.4" strokeLinejoin="round" />

        <g clipPath="url(#vnLandClip)">
          {/* tô màu vùng */}
          <rect x="0" y="60" width="700" height={yHN - 60} fill="#60A5FA" opacity=".25" />
          <rect x="0" y={yHN} width="700" height={yNam - yHN} fill="#A78BFA" opacity=".25" />
          <rect x="0" y={yNam} width="700" height={900 - yNam} fill="#FDBA74" opacity=".32" />

          {/* quầng núi / đồng bằng thay cho filter địa hình */}
          {[[105.55, 10.1, 82, 50], [106.05, 20.55, 44, 38]].map(([lo, la, rx, ry], i) => {
            const [x, y] = P(lo, la);
            return <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="url(#vnPlain)" />;
          })}
          {[[103.9, 21.9, 78, 46], [105.5, 18.9, 36, 70], [107.9, 14.1, 36, 70]].map(([lo, la, rx, ry], i) => {
            const [x, y] = P(lo, la);
            return <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="url(#vnMtn)" />;
          })}

          {/* ranh giới vùng */}
          <g strokeLinecap="round">
            <line x1="0" x2="700" y1={yHN} y2={yHN} stroke="#fff" strokeWidth="6" />
            <line x1="0" x2="700" y1={yHN} y2={yHN} stroke="#2563EB" strokeWidth="2" strokeDasharray="7 5" />
            <line x1="0" x2="700" y1={yNam} y2={yNam} stroke="#fff" strokeWidth="6" />
            <line x1="0" x2="700" y1={yNam} y2={yNam} stroke="#7C3AED" strokeWidth="2" strokeDasharray="7 5" />
          </g>

          {/* sông: 1 path trắng + 1 path xanh */}
          <g fill="none" strokeLinecap="round">
            <path d={RIVERS_D} stroke="#fff" strokeWidth="4" opacity=".7" />
            <path d={RIVERS_D} stroke="#0EA5E9" strokeWidth="1.6" />
          </g>

          {/* núi: 1 path duy nhất */}
          <path d={MOUNTAINS_D} fill="#166534" opacity=".6" />
        </g>

        <path d={COAST_D} fill="none" stroke="#fff" strokeWidth="1.2" opacity=".9" strokeLinecap="round" />

        {/* nhãn vùng */}
        <g fontWeight="800" fontSize="12.5" letterSpacing=".5">
          <path d="M372 234 H262" stroke="#2563EB" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="262" cy="234" r="3.2" fill="#2563EB" stroke="#fff" strokeWidth="1.2" />
          <g transform="translate(372,222)">
            <rect width="102" height="25" rx="12.5" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
            <circle cx="13" cy="12.5" r="4" fill="#2563EB" />
            <text x="23" y="16" fill="#1D4ED8">MIỀN BẮC</text>
          </g>
          <path d="M381 492 H402" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="3 3" />
          <g transform="translate(402,480)">
            <rect width="94" height="24" rx="12" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1.2" />
            <circle cx="12" cy="12" r="3.6" fill="#7C3AED" />
            <text x="21" y="15.5" fill="#6D28D9" fontSize="12.5">MIỀN TRUNG</text>
          </g>
          <g transform="translate(265,770)">
            <rect width="102" height="25" rx="12.5" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.2" />
            <circle cx="13" cy="12.5" r="4" fill="#EA580C" />
            <text x="23" y="16" fill="#C2410C">MIỀN NAM</text>
          </g>
        </g>

        {/* nhãn địa lý */}
        <g fontSize="12" fontStyle="italic" fill="#0369A1">
          <text x={P(105.55, 10.25)[0]} y={P(105.55, 10.25)[1] + 14} textAnchor="middle">ĐB sông Cửu Long</text>
          <text x={P(106.0, 20.55)[0] - 40} y={P(106.0, 20.55)[1] + 44} fill="#854D0E">ĐB sông Hồng</text>
        </g>
        <g fontSize="12" fontWeight="700" fill="#14532D" opacity=".85" letterSpacing=".6">
          <text x={P(103.5, 21.4)[0]} y={P(103.5, 21.4)[1] + 16}>Tây Bắc</text>
          <text x={P(107.45, 13.5)[0] - 50} y={P(107.45, 13.5)[1]} transform={`rotate(-72 ${P(107.45, 13.5)[0] - 50} ${P(107.45, 13.5)[1]})`}>Tây Nguyên</text>
          <text x={P(105.2, 19.1)[0] - 4} y={P(105.2, 19.1)[1]} textAnchor="end" transform={`rotate(-62 ${P(105.2, 19.1)[0] - 4} ${P(105.2, 19.1)[1]})`}>Trường Sơn</text>
        </g>

        {/* đảo gần bờ */}
        <g fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.2">
          {[PHUQUOC, CONDAO, CATBA, LYSON].map((a, i) => <path key={i} d={closedBlob(a)} />)}
        </g>
        <g fontSize="12.5" fontWeight="700" fill="#15803D" paintOrder="stroke" stroke="#fff" strokeWidth=".8">
          <text x={P(103.9, 10.5)[0] + 8} y={P(103.9, 10.5)[1] - 6}>Phú Quốc</text>
          <text x={P(106.7, 8.7)[0] + 8} y={P(106.7, 8.7)[1]}>Côn Đảo</text>
          <text x={P(107.1, 20.78)[0] + 6} y={P(107.1, 20.78)[1] + 10}>Cát Bà</text>
          <text x={P(109.14, 15.38)[0] + 6} y={P(109.14, 15.38)[1] - 2}>Lý Sơn</text>
        </g>

        {/* Hoàng Sa */}
        <ellipse cx={P(111.9, 16.5)[0]} cy={P(111.9, 16.5)[1]} rx="46" ry="22" fill="#22C55E" opacity=".12" stroke="#16A34A" strokeDasharray="3 4" strokeWidth="1" />
        {PARACEL.map(([lo, la], i) => (
          <circle key={i} cx={P(lo, la)[0]} cy={P(lo, la)[1]} r={i % 2 ? 2.4 : 3.2} fill="#22C55E" stroke="#fff" strokeWidth="1" />
        ))}
        <text x={P(111.9, 16.35)[0]} y={P(111.9, 16.35)[1] + 32} textAnchor="middle" fontSize="13" fontWeight="800" fill="#15803D">QĐ. HOÀNG SA</text>
        <text x={P(111.9, 16.35)[0]} y={P(111.9, 16.35)[1] + 44} textAnchor="middle" fontSize="12" fontWeight="600" fill="#166534">(Việt Nam)</text>

        {/* Trường Sa */}
        <ellipse cx={P(113.3, 9.9)[0]} cy={P(113.3, 9.9)[1]} rx="42" ry="48" fill="#22C55E" opacity=".12" stroke="#16A34A" strokeDasharray="3 4" strokeWidth="1" />
        {SPRATLY.map(([lo, la], i) => (
          <circle key={i} cx={P(lo, la)[0]} cy={P(lo, la)[1]} r={i % 3 ? 2.2 : 3} fill="#22C55E" stroke="#fff" strokeWidth="1" />
        ))}
        <text x={P(113.3, 9.9)[0]} y={P(113.3, 8.3)[1] + 8} textAnchor="middle" fontSize="13" fontWeight="800" fill="#15803D">QĐ. TRƯỜNG SA</text>
        <text x={P(113.3, 9.9)[0]} y={P(113.3, 8.3)[1] + 20} textAnchor="middle" fontSize="12" fontWeight="600" fill="#166534">(Việt Nam)</text>

        {/* tên nước & biển */}
        <g fontWeight="700" letterSpacing="3">
          <text x="105" y="96" textAnchor="middle" fontSize="13" fill="#64748B">TRUNG QUỐC</text>
          <text x="92" y="300" textAnchor="middle" fontSize="12" fill="#64748B">LÀO</text>
          <text x="205" y="668" textAnchor="middle" fontSize="13" fill="#64748B">CAMPUCHIA</text>
          <text x="318" y="300" textAnchor="middle" fontSize="12.5" fontStyle="italic" fill="#075985" letterSpacing="1">Vịnh Bắc Bộ</text>
          <text x="100" y="745" textAnchor="middle" fontSize="12.5" fontStyle="italic" fill="#075985" letterSpacing="1">Vịnh Thái Lan</text>
          <text x="500" y="570" textAnchor="middle" fontSize="19" fontStyle="italic" fill="#fff" opacity=".9" letterSpacing="7" paintOrder="stroke" stroke="#0369A1" strokeWidth=".6">BIỂN ĐÔNG</text>
        </g>

        {/* Fansipan */}
        <path d={`M${P(103.78, 22.3)[0] - 5} ${P(103.78, 22.3)[1] + 4} l5 -9 l5 9 z`} fill="#B91C1C" stroke="#fff" strokeWidth=".8" />
        <text x={P(103.78, 22.3)[0] + 9} y={P(103.78, 22.3)[1] + 3} fontSize="12" fontWeight="700" fill="#7F1D1D" paintOrder="stroke" stroke="#fff" strokeWidth=".7">Fansipan 3.143 m</text>

        {/* thành phố */}
        {CITIES.map((c) => {
          const [x, y] = P(...c.p);
          return (
            <g key={c.n}>
              {c.star
                ? <rect x={x - 4.5} y={y - 4.5} width="9" height="9" fill="#DC2626" stroke="#fff" strokeWidth="1.5" transform={`rotate(45 ${x} ${y})`} />
                : <circle cx={x} cy={y} r="3" fill="#0F172A" stroke="#fff" strokeWidth="1.2" />}
              <text x={x + c.dx} y={y + c.dy} textAnchor={c.a} fontSize={c.star ? 10 : 9} fontWeight={c.star ? 800 : 600} fill="#0F172A" stroke="#fff" strokeWidth=".8" paintOrder="stroke">{c.n}</text>
            </g>
          );
        })}

        {/* luồng phân phối urê: nét đứt tĩnh, không animateMotion */}
        {FLOWS.map((fl, i) => {
          const fac = FACTORIES.find((d) => d.id === fl.from);
          const [tx, ty] = P(...fl.to);
          const path = arcD(fac.p, fl.to, fl.k);
          return (
            <g key={i}>
              <path d={path} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".6" />
              <path d={path} fill="none" stroke={fac.color} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="1 6" />
              <circle cx={tx} cy={ty} r="4" fill="#fff" stroke={fac.color} strokeWidth="2" />
            </g>
          );
        })}

        {FACTORIES.map((d, i) => <Factory key={d.id} d={d} idx={i} />)}

        {/* la bàn */}
        <g transform="translate(606,104)">
          <circle r="22" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
          <path d="M0 -17 L5 3 L0 0 L-5 3 Z" fill="#DC2626" />
          <path d="M0 17 L5 -3 L0 0 L-5 -3 Z" fill="#94A3B8" />
          <text y="-26" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#0F172A">B</text>
        </g>
        {/* thước tỉ lệ */}
        <g transform="translate(36,852)">
          <rect width="90" height="5" fill="#0F172A" />
          <rect x="45" width="45" height="5" fill="#fff" stroke="#0F172A" strokeWidth=".8" />
          <text y="-4" fontSize="12.5" fontWeight="700" fill="#0F172A">0</text>
          <text x="90" y="-4" textAnchor="end" fontSize="12.5" fontWeight="700" fill="#0F172A">200 km</text>
        </g>
      </g>
      <rect x="20" y="60" width="620" height="820" rx="22" fill="none" stroke="#fff" strokeWidth="5" />
      <rect x="20" y="60" width="620" height="820" rx="22" fill="none" stroke="#94A3B8" strokeWidth="1.5" />

      {/* ============ BẢNG THÔNG SỐ ============ */}
      <g transform="translate(660,60)">
        <rect width="240" height="820" rx="22" fill="#fff" stroke="#CBD5E1" strokeWidth="1.6" />

        <g clipPath="url(#vnPanelClip)">
          <rect width="240" height="154" fill="url(#vnPanelHead)" />
        </g>
        <text x="22" y="31" fontSize="13" fontWeight="700" letterSpacing="1" fill="#A7F3D0">NĂNG LỰC SẢN XUẤT</text>
        <text x="20" y="80" fontSize="38" fontWeight="900" letterSpacing="-1.2" fill="#fff">2,34</text>
        <text x="126" y="78" fontSize="13" fontWeight="800" fill="#D1FAE5">triệu tấn</text>
        <text x="126" y="93" fontSize="13" fontWeight="600" fill="#D1FAE5">urê / năm</text>
        <rect x="22" y="105" width="196" height="29" rx="14.5" fill="#fff" opacity=".12" stroke="#A7F3D0" strokeOpacity=".5" />
        <circle cx="37" cy="119.5" r="4" fill="#6EE7B7" />
        <text x="48" y="123" fontSize="12.5" fontWeight="700" fill="#fff">4 nhà máy · theo dữ liệu đầu vào</text>

        <text x="22" y="188" fontSize="12" fontWeight="900" fill="#0F172A">CÔNG SUẤT NHÀ MÁY</text>
        <text x="22" y="203" fontSize="12.5" fontWeight="600" fill="#64748B">Nghìn tấn mỗi năm · công suất thiết kế</text>
        {bars.map((b, i) => (
          <g key={b.n} transform={`translate(22,${226 + i * 48})`}>
            <text fontSize="13" fontWeight="700" fill="#334155">{b.n}</text>
            <text x="196" textAnchor="end" fontSize="13" fontWeight="800" fill={b.c}>{b.v} nghìn tấn</text>
            <rect y="9" width="196" height="10" rx="5" fill="#F1F5F9" />
            <rect y="9" width={(196 * b.v) / 800} height="10" rx="5" fill={b.c} />
          </g>
        ))}

        <line x1="22" x2="218" y1="414" y2="414" stroke="#E2E8F0" />
        <text x="22" y="438" fontSize="12" fontWeight="900" fill="#0F172A">NGUYÊN LIỆU ĐẦU VÀO</text>
        <g transform="translate(58,490)">
          <circle r={R} fill="none" stroke="#F1F5F9" strokeWidth="13" />
          <g transform="rotate(-90)" fill="none" strokeWidth="13">
            <circle r={R} stroke="#3B82F6" strokeDasharray={`${f(gasLen - 2)} ${f(C)}`} />
            <circle r={R} stroke="#64748B" strokeDasharray={`${f(coalLen - 2)} ${f(C)}`} strokeDashoffset={`${-f(gasLen)}`} />
          </g>
          <text y="4" textAnchor="middle" fontSize="12" fontWeight="900" fill="#0F172A">68%</text>
        </g>
        <g transform="translate(106,466)" fill="#334155">
          <circle cx="5" cy="5" r="5" fill="#3B82F6" />
          <text x="16" y="9" fontSize="13" fontWeight="800">Khí tự nhiên</text>
          <text x="16" y="22" fontSize="12.5" fontWeight="600" fill="#64748B">1.600 nghìn tấn · 68%</text>
          <circle cx="5" cy="43" r="5" fill="#64748B" />
          <text x="16" y="47" fontSize="13" fontWeight="800">Than đá</text>
          <text x="16" y="60" fontSize="12.5" fontWeight="600" fill="#64748B">740 nghìn tấn · 32%</text>
        </g>

        <rect x="18" y="552" width="204" height="118" rx="16" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.4" />
        <circle cx="120" cy="579" r="11" fill="#D1FAE5" />
        <path d="M114 579 l4 4 l8 -9" fill="none" stroke="#047857" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="120" y="607" textAnchor="middle" fontSize="14" fontWeight="900" letterSpacing=".4" fill="#047857">AN NINH LƯƠNG THỰC</text>
        <text x="120" y="630" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">Nguồn cung phân đạm trong nước</text>
        <text x="120" y="647" textAnchor="middle" fontSize="13" fontWeight="600" fill="#334155">hỗ trợ sản xuất nông nghiệp</text>

        <g transform="translate(22,692)" fontSize="13" fontWeight="600" fill="#475569">
          <rect width="12" height="12" rx="3" fill="url(#vnLand)" stroke="#16A34A" /><text x="20" y="10">Lãnh thổ Việt Nam</text>
          <rect y="20" width="12" height="12" rx="3" fill="#BAE6FD" /><text x="20" y="30">Biển và vịnh</text>
          <path d="M6 48 l-6 -6 l6 -6 l6 6 z" fill="#DC2626" /><text x="20" y="48">Thủ đô, trung tâm lớn</text>
          <path d="M0 68 l6 -10 l6 10 z" fill="#166534" opacity=".7" /><text x="20" y="66">Dãy núi</text>
        </g>
        <line x1="22" x2="218" y1="772" y2="772" stroke="#E2E8F0" />
        <text x="22" y="792" fontSize="12" fontWeight="700" fill="#64748B">LƯU Ý</text>
        <text x="22" y="806" fontSize="12" fontWeight="500" fill="#94A3B8">Số liệu công suất tham khảo theo source gốc.</text>
      </g>
    </svg>
  );
}