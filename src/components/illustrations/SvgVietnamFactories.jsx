import React from 'react';

/* ------------------------------------------------------------------
   Bản đồ Việt Nam dựng từ toạ độ kinh/vĩ độ thật (kinh tuyến 102°–109,5°Đ,
   vĩ tuyến 8,5°–23,4°B) rồi chiếu sang pixel. Đường bờ biển được làm mượt
   bằng Catmull-Rom, đường biên giới giữ nét gãy khúc như thực tế.
------------------------------------------------------------------- */

const SX = 48;               // px / độ kinh
const SY = 50;               // px / độ vĩ
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
  const body = segs.slice(1, n + 1).join(' ');
  return `M${f(ps[0][0])} ${f(ps[0][1])} ` + body + ' Z';
};

/* Biên giới phía Bắc (Trung Quốc), từ Tây sang Đông */
const CHINA = [
  [102.14, 22.40], [102.45, 22.75], [102.95, 22.55], [103.30, 22.80], [103.60, 22.60],
  [103.97, 22.52], [104.28, 22.82], [104.40, 22.82], [104.65, 23.10], [104.85, 23.17],
  [105.10, 23.28], [105.32, 23.36], [105.55, 23.08], [105.85, 23.10], [106.10, 22.98],
  [106.55, 22.90], [106.70, 22.82], [106.58, 22.55], [106.75, 22.38], [106.72, 22.00],
  [106.95, 22.05], [107.35, 21.95], [107.55, 21.65], [107.95, 21.58], [108.05, 21.52],
];
/* Bờ biển: Móng Cái → Hà Tiên */
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
/* Biên giới Campuchia, từ Hà Tiên lên Bắc */
const CAMBODIA = [
  [104.65, 10.50], [104.95, 10.55], [105.05, 10.85], [105.40, 10.90], [105.80, 11.00],
  [106.00, 11.15], [106.15, 11.25], [105.95, 11.45], [106.20, 11.75], [106.60, 11.80],
  [106.85, 12.05], [107.40, 12.25], [107.55, 12.60], [107.40, 13.00], [107.55, 13.45],
  [107.40, 14.10], [107.55, 14.70],
];
/* Biên giới Lào, từ Nam lên Bắc */
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
const SEA_D =
  `M700 ${f(P(0, 21.9)[1])} ` + L([[110, 21.7], [108.6, 21.6], [108.05, 21.52]]) + ' ' +
  COAST_D.replace(/^M[^C]*/, '') +
  L([[104.2, 10.48], [103.5, 10.58], [102.9, 11.5]]) + ` L0 ${f(P(0, 12)[1])} L0 960 L700 960 Z`;

const HAINAN = [[108.7, 19.2], [109.0, 19.9], [110.1, 20.1], [110.7, 20.1], [111.0, 19.6], [110.6, 18.7], [109.9, 18.3], [109.2, 18.35], [108.7, 18.7]];
const PHUQUOC = [[103.93, 10.45], [104.03, 10.30], [104.05, 10.10], [103.97, 9.92], [103.88, 10.10], [103.85, 10.30]];
const CONDAO = [[106.52, 8.74], [106.62, 8.72], [106.66, 8.65], [106.57, 8.62]];
const CATBA = [[106.97, 20.82], [107.07, 20.84], [107.10, 20.76], [107.00, 20.72]];
const LYSON = [[109.10, 15.40], [109.14, 15.40], [109.13, 15.36], [109.09, 15.37]];
const COTO = [[107.74, 21.00], [107.80, 21.01], [107.82, 20.96], [107.76, 20.95]];

const RIVER_HONG = pts([[103.97, 22.50], [104.40, 22.10], [104.90, 21.65], [105.35, 21.30], [105.85, 21.05], [106.05, 20.70], [106.25, 20.45], [106.52, 20.27]]);
const RIVER_TIEN = pts([[105.25, 10.85], [105.75, 10.60], [106.35, 10.35], [106.75, 10.28]]);
const RIVER_HAU = pts([[105.10, 10.75], [105.78, 10.03], [106.15, 9.50]]);
const riverD = (ps) => `M${f(ps[0][0])} ${f(ps[0][1])} ` + smooth(ps);

const GRID_LAT = [10, 12, 14, 16, 18, 20, 22];
const GRID_LON = [102, 104, 106, 108, 110];

const CITIES = [
  { n: 'Hà Nội', p: [105.85, 21.03], dx: -8, dy: 4, a: 'end', star: true },
  { n: 'Hải Phòng', p: [106.68, 20.85], dx: 8, dy: 12, a: 'start' },
  { n: 'Huế', p: [107.58, 16.46], dx: 8, dy: 4, a: 'start' },
  { n: 'Đà Nẵng', p: [108.2, 16.05], dx: 8, dy: 4, a: 'start' },
  { n: 'Nha Trang', p: [109.19, 12.24], dx: 8, dy: 4, a: 'start' },
  { n: 'TP. Hồ Chí Minh', p: [106.70, 10.78], dx: -8, dy: -6, a: 'end', star: true },
  { n: 'Cần Thơ', p: [105.78, 10.03], dx: -8, dy: 12, a: 'end' },
];

const FACTORIES = [
  { id: 'hb', name: 'ĐẠM HÀ BẮC', sub: 'Than đá · 180 nghìn tấn/năm', p: [106.18, 21.30], color: '#EA580C', icon: 'coal', box: [372, 92] },
  { id: 'nb', name: 'ĐẠM NINH BÌNH', sub: 'Khí hóa than · 560 nghìn tấn/năm', p: [105.97, 20.25], color: '#475569', icon: 'coal', box: [372, 160] },
  { id: 'pm', name: 'ĐẠM PHÚ MỸ', sub: 'Khí Nam Côn Sơn · 800 nghìn tấn/năm', p: [107.05, 10.60], color: '#2563EB', icon: 'gas', box: [372, 690] },
  { id: 'cm', name: 'ĐẠM CÀ MAU', sub: 'Khí PM3-CAA · 800 nghìn tấn/năm', p: [105.17, 9.17], color: '#16A34A', icon: 'gas', box: [372, 770] },
];

const FONT = "'Be Vietnam Pro','Segoe UI',Roboto,system-ui,sans-serif";

function Factory({ d }) {
  const [x, y] = P(...d.p);
  const [bx, by] = d.box;
  const bw = 190, bh = 46;
  const ly = by + bh / 2;
  return (
    <g>
      <path d={`M${f(x)} ${f(y)} L${bx - 14} ${f(y)} L${bx - 14} ${ly} L${bx} ${ly}`} fill="none" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" opacity=".96" />
      <path d={`M${f(x)} ${f(y)} L${bx - 14} ${f(y)} L${bx - 14} ${ly} L${bx} ${ly}`} fill="none" stroke={d.color} strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" strokeLinejoin="round" opacity=".98" />
      <circle cx={x} cy={y} r="16" fill={d.color} opacity=".18">
        <animate attributeName="r" values="12;24;12" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values=".3;0;.3" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <g transform={`translate(${f(x)},${f(y)})`} filter="url(#vnShadow)">
        <circle r="12" fill={d.color} stroke="#fff" strokeWidth="2.2" />
        {d.icon === 'coal'
          ? <path d="M-6 5 V-1 L-2 -4 V-1 L2 -4 V-1 L6 -5 V5 Z" fill="#fff" />
          : <path d="M0 -7 C4 -3 5 0 5 2 A5 5 0 0 1 -5 2 C-5 -1 -2 -2 0 -7 Z" fill="#fff" />}
      </g>
      <g filter="url(#vnShadow)">
        <rect x={bx} y={by + 2} width={bw} height={bh} rx="10" fill="#0F172A" opacity=".10" />
        <rect x={bx} y={by} width={bw} height={bh} rx="10" fill="#FFFFFF" stroke={d.color} strokeOpacity=".45" strokeWidth="1.15" />
        <rect x={bx} y={by} width="6" height={bh} rx="3" fill={d.color} />
        <circle cx={bx + bw - 13} cy={by + 12} r="3" fill={d.color} />
      </g>
      <text x={bx + 16} y={by + 19} fill="#0F172A" fontSize="11.5" fontWeight="900" fontFamily={FONT}>{d.name}</text>
      <text x={bx + 16} y={by + 34} fill="#475569" fontSize="9.2" fontWeight="650" fontFamily={FONT}>{d.sub}</text>
    </g>
  );
}

export default function SvgVietnamFactories() {
  const bars = [
    { n: 'Phú Mỹ', v: 800, c: '#2563EB' },
    { n: 'Cà Mau', v: 800, c: '#16A34A' },
    { n: 'Ninh Bình', v: 560, c: '#475569' },
    { n: 'Hà Bắc', v: 180, c: '#EA580C' },
  ];
  return (
    <svg viewBox="0 0 920 900" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fontFamily={FONT}>
      <defs>
        <clipPath id="vnFrame"><rect x="20" y="60" width="620" height="820" rx="22" /></clipPath>
        <clipPath id="vnLandClip" clipPathUnits="userSpaceOnUse"><path d={LAND_D} /></clipPath>
        <clipPath id="vnPanelClip" clipPathUnits="userSpaceOnUse"><rect width="240" height="820" rx="22" /></clipPath>
        <linearGradient id="vnPanelHead" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset=".55" stopColor="#12304A" />
          <stop offset="1" stopColor="#064E3B" />
        </linearGradient>
        <linearGradient id="vnSea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E0F2FE" /><stop offset=".55" stopColor="#BAE6FD" /><stop offset="1" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="vnLand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ECFDF5" /><stop offset=".48" stopColor="#D1FAE5" /><stop offset="1" stopColor="#CCFBF1" />
        </linearGradient>
        <linearGradient id="vnBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8FAFC" /><stop offset="1" stopColor="#ECFDF5" />
        </linearGradient>
        <pattern id="vnHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#16A34A" strokeWidth="1" opacity=".16" />
        </pattern>
        <filter id="vnShadow" x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity=".28" />
        </filter>
        <filter id="vnBlur"><feGaussianBlur stdDeviation="5" /></filter>
      </defs>

      <rect width="920" height="900" fill="url(#vnBg)" />
      <rect x="8" y="8" width="904" height="884" rx="26" fill="none" stroke="#94A3B8" strokeOpacity=".5" strokeWidth="1.5" />
      <rect x="13" y="13" width="894" height="874" rx="22" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
      <path d="M35 60 H885" stroke="#CBD5E1" strokeWidth="1" opacity=".65" />
      <g>
        <rect x="22" y="16" width="7" height="34" rx="3.5" fill="#10B981" />
        <text x="40" y="32" fontSize="19" fontWeight="950" letterSpacing="-.35" fill="#0F172A">BẢN ĐỒ NHÀ MÁY ĐẠM URÊ</text>
        <text x="40" y="49" fontSize="10.5" fontWeight="650" fill="#475569">VIỆT NAM  /  PHÂN BỐ THEO VÙNG &amp; NGUỒN NGUYÊN LIỆU</text>
        <g transform="translate(748,22)">
          <rect width="150" height="26" rx="13" fill="#0F172A" />
          <circle cx="14" cy="13" r="4" fill="#34D399" />
          <text x="26" y="17" fontSize="9" fontWeight="850" letterSpacing=".55" fill="#FFFFFF">INFOGRAPHIC ĐỊA LÝ</text>
        </g>
      </g>

      {/* ============ KHUNG BẢN ĐỒ ============ */}
      <g clipPath="url(#vnFrame)">
        <rect x="0" y="40" width="700" height="900" fill="#F1F5F9" />
        <path d={SEA_D} fill="url(#vnSea)" />
        <path d={closedBlob(HAINAN)} fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.2" />

        {/* quầng nước nông quanh bờ biển */}
        <path d={COAST_D} fill="none" stroke="#fff" strokeWidth="16" opacity=".55" filter="url(#vnBlur)" strokeLinecap="round" />

        {/* đất liền Việt Nam */}
        {/* Viền nổi hai lớp giúp lãnh thổ tách bạch khỏi nền biển */}
        <path d={LAND_D} fill="none" stroke="#FFFFFF" strokeWidth="9" strokeLinejoin="round" opacity=".95" />
        <path d={LAND_D} fill="url(#vnLand)" stroke="#047857" strokeWidth="2.8" strokeLinejoin="round" filter="url(#vnShadow)" />
        {/* Tô màu theo vùng bằng lớp phủ được cắt chính xác theo đường bao đất liền */}
        <g clipPath="url(#vnLandClip)">
          <rect x="0" y="60" width="700" height={P(0, 17.4)[1] - 60} fill="#60A5FA" opacity=".48" />
          <rect x="0" y={P(0, 17.4)[1]} width="700" height={P(0, 11.3)[1] - P(0, 17.4)[1]} fill="#A78BFA" opacity=".50" />
          <rect x="0" y={P(0, 11.3)[1]} width="700" height={900 - P(0, 11.3)[1]} fill="#FDBA74" opacity=".52" />
          {/* Ranh giới vùng: viền sáng bên dưới, nét màu đứt bên trên */}
          <g fill="none" strokeLinecap="round">
            <line x1="0" x2="700" y1={P(0, 17.4)[1]} y2={P(0, 17.4)[1]} stroke="#FFFFFF" strokeWidth="7" opacity=".95" />
            <line x1="0" x2="700" y1={P(0, 17.4)[1]} y2={P(0, 17.4)[1]} stroke="#2563EB" strokeWidth="2.1" strokeDasharray="7 5" />
            <line x1="0" x2="700" y1={P(0, 11.3)[1]} y2={P(0, 11.3)[1]} stroke="#FFFFFF" strokeWidth="7" opacity=".95" />
            <line x1="0" x2="700" y1={P(0, 11.3)[1]} y2={P(0, 11.3)[1]} stroke="#7C3AED" strokeWidth="2.1" strokeDasharray="7 5" />
          </g>
        </g>
        <path d={LAND_D} fill="url(#vnHatch)" stroke="#D1FAE5" strokeWidth=".7" strokeLinejoin="round" />

        {/* kinh vĩ tuyến */}
        <g stroke="#0F172A" strokeWidth=".6" strokeDasharray="2 5" opacity=".28">
          {GRID_LAT.map((la) => <line key={la} x1="20" x2="640" y1={P(0, la)[1]} y2={P(0, la)[1]} />)}
          {GRID_LON.map((lo) => <line key={lo} y1="60" y2="880" x1={P(lo, 0)[0]} x2={P(lo, 0)[0]} />)}
        </g>
        <g fontSize="8.5" fontWeight="600" fill="#475569">
          {GRID_LAT.map((la) => <text key={la} x="28" y={P(0, la)[1] - 3}>{la}°B</text>)}
          {GRID_LON.map((lo) => <text key={lo} y="872" x={P(lo, 0)[0] + 3}>{lo}°Đ</text>)}
        </g>

        {/* Nhãn vùng dạng thẻ kính nổi, dùng cùng hệ màu với đường ranh giới */}
        <g filter="url(#vnShadow)" fontFamily={FONT} fontWeight="900" fontSize="9.5" letterSpacing=".55">
          <path d="M380 252 H421" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M380 252 H421" fill="none" stroke="#2563EB" strokeWidth="1.7" strokeDasharray="3 3" strokeLinecap="round" />
          <g transform="translate(421,240)">
            <rect width="102" height="25" rx="12.5" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
            <circle cx="13" cy="12.5" r="4" fill="#2563EB" />
            <text x="23" y="16" fill="#1D4ED8">MIỀN BẮC</text>
          </g>
          <path d="M381 492 H402" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <path d="M381 492 H402" fill="none" stroke="#7C3AED" strokeWidth="1.7" strokeDasharray="3 3" strokeLinecap="round" />
          <g transform="translate(402,480)">
            <rect width="94" height="24" rx="12" fill="#F5F3FF" stroke="#8B5CF6" strokeWidth="1.2" />
            <circle cx="12" cy="12" r="3.6" fill="#7C3AED" />
            <text x="21" y="15.5" fill="#6D28D9" fontSize="8.7">MIỀN TRUNG</text>
          </g>
          <g transform="translate(265,770)">
            <rect width="102" height="25" rx="12.5" fill="#FFF7ED" stroke="#F97316" strokeWidth="1.2" />
            <circle cx="13" cy="12.5" r="4" fill="#EA580C" />
            <text x="23" y="16" fill="#C2410C">MIỀN NAM</text>
          </g>
        </g>

        {/* sông ngòi */}
        <g fill="none" stroke="#38BDF8" strokeLinecap="round" opacity=".95">
          <path d={riverD(RIVER_HONG)} strokeWidth="1.8" />
          <path d={riverD(RIVER_TIEN)} strokeWidth="1.6" />
          <path d={riverD(RIVER_HAU)} strokeWidth="1.6" />
        </g>
        <text x={P(104.35, 22.1)[0] + 6} y={P(104.35, 22.1)[1]} fontSize="8" fontStyle="italic" fill="#0284C7" transform={`rotate(38 ${P(104.35, 22.1)[0]} ${P(104.35, 22.1)[1]})`}>S. Hồng</text>
        <text x={P(105.55, 10.25)[0]} y={P(105.55, 10.25)[1] - 4} fontSize="8" fontStyle="italic" fill="#0284C7">Đồng bằng sông Cửu Long</text>

        {/* đảo */}
        <g fill="#BBF7D0" stroke="#16A34A" strokeWidth="1.2">
          {[PHUQUOC, CONDAO, CATBA, LYSON, COTO].map((a, i) => <path key={i} d={closedBlob(a)} />)}
        </g>
        <text x={P(103.9, 10.5)[0] + 8} y={P(103.9, 10.5)[1] - 6} fontSize="8.5" fontWeight="700" fill="#15803D">Phú Quốc</text>
        <text x={P(106.7, 8.7)[0] + 8} y={P(106.7, 8.7)[1]} fontSize="8.5" fontWeight="700" fill="#15803D">Côn Đảo</text>

        {/* Hoàng Sa */}
        {[[111.3, 16.6], [111.6, 16.5], [111.9, 16.35], [112.2, 16.2], [112.5, 16.1], [111.5, 16.95], [112.0, 16.8]].map(([lo, la], i) => (
          <circle key={i} cx={P(lo, la)[0]} cy={P(lo, la)[1]} r={i % 2 ? 2.4 : 3.2} fill="#22C55E" stroke="#fff" strokeWidth="1" />
        ))}
        <text x={P(111.9, 16.35)[0]} y={P(111.9, 16.35)[1] + 24} textAnchor="middle" fontSize="10" fontWeight="800" fill="#15803D">QĐ. HOÀNG SA</text>
        <text x={P(111.9, 16.35)[0]} y={P(111.9, 16.35)[1] + 36} textAnchor="middle" fontSize="8" fontWeight="600" fill="#166534">(Việt Nam)</text>

        {/* Trường Sa */}
        {[[113.3, 10.8], [113.6, 10.2], [113.9, 9.7], [113.4, 9.5], [114.0, 10.5], [113.7, 8.9], [114.3, 9.2], [113.1, 10.0]].map(([lo, la], i) => (
          <circle key={i} cx={P(lo, la)[0]} cy={P(lo, la)[1]} r={i % 3 ? 2.2 : 3} fill="#22C55E" stroke="#fff" strokeWidth="1" />
        ))}
        <text x="605" y={P(0, 8.2)[1]} textAnchor="middle" fontSize="10" fontWeight="800" fill="#15803D">QĐ. TRƯỜNG SA</text>
        <text x="605" y={P(0, 8.2)[1] + 12} textAnchor="middle" fontSize="8" fontWeight="600" fill="#166534">(Việt Nam)</text>

        {/* địa danh vùng */}
        <g fontWeight="700" letterSpacing="3">
          <text x="105" y="96" textAnchor="middle" fontSize="11" fill="#94A3B8">TRUNG QUỐC</text>
          <text x="92" y="300" textAnchor="middle" fontSize="12" fill="#94A3B8">LÀO</text>
          <text x="205" y="668" textAnchor="middle" fontSize="11" fill="#94A3B8">CAMPUCHIA</text>
          <text x="318" y="300" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#0284C7" letterSpacing="1">Vịnh Bắc Bộ</text>
          <text x="100" y="745" textAnchor="middle" fontSize="8.5" fontStyle="italic" fill="#0284C7" letterSpacing="1">Vịnh Thái Lan</text>
          <text x="470" y="560" textAnchor="middle" fontSize="17" fontStyle="italic" fill="#0284C7" opacity=".8" letterSpacing="6">BIỂN ĐÔNG</text>
        </g>

        {/* đỉnh Fansipan */}
        <path d={`M${P(103.78, 22.3)[0] - 5} ${P(103.78, 22.3)[1] + 4} l5 -9 l5 9 z`} fill="#15803D" />
        <text x={P(103.78, 22.3)[0] + 9} y={P(103.78, 22.3)[1] + 3} fontSize="8" fontWeight="600" fill="#166534">Fansipan 3.143 m</text>

        {/* thành phố */}
        {CITIES.map((c) => {
          const [x, y] = P(...c.p);
          return (
            <g key={c.n}>
              {c.star
                ? <rect x={x - 4} y={y - 4} width="8" height="8" fill="#DC2626" stroke="#fff" strokeWidth="1.5" transform={`rotate(45 ${x} ${y})`} />
                : <circle cx={x} cy={y} r="3" fill="#0F172A" stroke="#fff" strokeWidth="1.2" />}
              <text x={x + c.dx} y={y + c.dy} textAnchor={c.a} fontSize="9.5" fontWeight={c.star ? 800 : 600} fill="#0F172A" stroke="#fff" strokeWidth=".65" paintOrder="stroke">{c.n}</text>
            </g>
          );
        })}

        {FACTORIES.map((d) => <Factory key={d.id} d={d} />)}

        {/* la bàn */}
        <g transform="translate(606,104)">
          <circle r="21" fill="#fff" stroke="#CBD5E1" strokeWidth="1.2" />
          <path d="M0 -17 L5 3 L0 0 L-5 3 Z" fill="#DC2626" />
          <path d="M0 17 L5 -3 L0 0 L-5 -3 Z" fill="#94A3B8" />
          <text y="-24" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0F172A">B</text>
        </g>
        {/* thước tỉ lệ ~200 km */}
        <g transform="translate(36,852)">
          <rect width="90" height="5" fill="#0F172A" />
          <rect x="45" width="45" height="5" fill="#fff" stroke="#0F172A" strokeWidth=".8" />
          <text y="-4" fontSize="8.5" fontWeight="700" fill="#0F172A">0</text>
          <text x="90" y="-4" textAnchor="end" fontSize="8.5" fontWeight="700" fill="#0F172A">200 km</text>
        </g>
      </g>
      <rect x="20" y="60" width="620" height="820" rx="22" fill="none" stroke="#FFFFFF" strokeWidth="5" />
      <rect x="20" y="60" width="620" height="820" rx="22" fill="none" stroke="#94A3B8" strokeWidth="1.6" />
      <rect x="25" y="65" width="610" height="810" rx="18" fill="none" stroke="#FFFFFF" strokeWidth=".8" opacity=".9" />

      {/* ============ BẢNG THÔNG SỐ ============ */}
      <g transform="translate(660,60)">
        <rect x="0" y="4" width="240" height="820" rx="22" fill="#0F172A" opacity=".08" />
        <rect width="240" height="820" rx="22" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.8" />
        <rect x="1.5" y="1.5" width="237" height="817" rx="20" fill="none" stroke="#F8FAFC" strokeWidth="2" />

        <g clipPath="url(#vnPanelClip)">
          <rect width="240" height="154" rx="22" fill="url(#vnPanelHead)" />
          <circle cx="214" cy="20" r="48" fill="#34D399" opacity=".10" />
          <circle cx="222" cy="24" r="28" fill="none" stroke="#6EE7B7" strokeWidth="1" opacity=".28" />
          <text x="22" y="31" fontSize="10" fontWeight="800" letterSpacing="1.1" fill="#A7F3D0">NĂNG LỰC SẢN XUẤT</text>
          <text x="20" y="80" fontSize="38" fontWeight="950" letterSpacing="-1.2" fill="#FFFFFF">2,34</text>
          <text x="126" y="78" fontSize="11.5" fontWeight="800" fill="#D1FAE5">triệu tấn</text>
          <text x="126" y="93" fontSize="10" fontWeight="650" fill="#D1FAE5">urê / năm</text>
          <rect x="22" y="105" width="188" height="29" rx="14.5" fill="#FFFFFF" opacity=".12" stroke="#A7F3D0" strokeOpacity=".55" />
          <circle cx="37" cy="119.5" r="4" fill="#6EE7B7" />
          <text x="48" y="123" fontSize="8.6" fontWeight="800" fill="#FFFFFF">4 NHÀ MÁY • THEO DỮ LIỆU ĐẦU VÀO</text>
        </g>
        <line x1="22" x2="218" y1="164" y2="164" stroke="#DCE5EE" />
        <text x="22" y="188" fontSize="12" fontWeight="900" fill="#0F172A">CÔNG SUẤT NHÀ MÁY</text>
        <text x="22" y="203" fontSize="9" fontWeight="600" fill="#64748B">Nghìn tấn mỗi năm · công suất thiết kế</text>
        {bars.map((b, i) => {
          const y = 226 + i * 48;
          return (
            <g key={b.n} transform={`translate(22,${y})`}>
              <text y="0" fontSize="11" fontWeight="700" fill="#334155">{b.n}</text>
              <text x="196" y="0" textAnchor="end" fontSize="11" fontWeight="800" fill={b.c}>{b.v} nghìn tấn</text>
              <rect y="9" width="196" height="10" rx="5" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth=".5" />
              <rect y="9" width={(196 * b.v) / 800} height="10" rx="5" fill={b.c} />
              <circle cx={Math.max(5, (196 * b.v) / 800 - 3)} cy="14" r="2" fill="#FFFFFF" opacity=".9" />
            </g>
          );
        })}

        <line x1="22" x2="218" y1="414" y2="414" stroke="#E2E8F0" />
        <text x="22" y="438" fontSize="12" fontWeight="900" fill="#0F172A">NGUYÊN LIỆU ĐẦU VÀO</text>
        <g transform="translate(22,456)" fontSize="10.5" fontWeight="600" fill="#334155">
          <circle cx="6" cy="6" r="6" fill="#475569" /><text x="20" y="10">Than đá (Hà Bắc, Ninh Bình)</text>
          <circle cx="6" cy="30" r="6" fill="#2563EB" /><text x="20" y="34">Khí Nam Côn Sơn (Phú Mỹ)</text>
          <circle cx="6" cy="54" r="6" fill="#16A34A" /><text x="20" y="58">Khí PM3-CAA (Cà Mau)</text>
        </g>

        <rect x="18" y="552" width="204" height="118" rx="16" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.4" />
        <rect x="18" y="552" width="204" height="5" rx="2.5" fill="#10B981" />
        <circle cx="120" cy="579" r="11" fill="#D1FAE5" />
        <path d="M114 579 l4 4 l8 -9" fill="none" stroke="#047857" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="120" y="607" textAnchor="middle" fontSize="14" fontWeight="950" letterSpacing=".45" fill="#047857">AN NINH LƯƠNG THỰC</text>
        <text x="120" y="630" textAnchor="middle" fontSize="10.5" fontWeight="650" fill="#334155">Nguồn cung phân đạm trong nước</text>
        <text x="120" y="647" textAnchor="middle" fontSize="10.5" fontWeight="650" fill="#334155">hỗ trợ sản xuất nông nghiệp</text>

        <g transform="translate(22,700)" fontSize="10" fontWeight="600" fill="#475569">
          <rect width="12" height="12" rx="3" fill="url(#vnLand)" stroke="#16A34A" /><text x="20" y="10">Lãnh thổ Việt Nam</text>
          <rect y="22" width="12" height="12" rx="3" fill="#BAE6FD" /><text x="20" y="32">Biển và vịnh</text>
          <path d="M6 52 l-6 -6 l6 -6 l6 6 z" fill="#DC2626" /><text x="20" y="52">Thủ đô, trung tâm lớn</text>
        </g>
        <line x1="22" x2="218" y1="772" y2="772" stroke="#E2E8F0" />
        <text x="22" y="792" fontSize="8.4" fontWeight="600" fill="#64748B">LƯU Ý</text>
        <text x="22" y="806" fontSize="8.1" fontWeight="500" fill="#94A3B8">Số liệu công suất tham khảo theo source gốc.</text>
      </g>
    </svg>
  );
}