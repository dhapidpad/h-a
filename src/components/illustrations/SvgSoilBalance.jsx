import React from 'react';

const FONT = "'Be Vietnam Pro','Segoe UI',Roboto,system-ui,sans-serif";
const ease = { calcMode: 'spline', keyTimes: '0;.5;1', keySplines: '.45 0 .55 1;.45 0 .55 1' };

/* Cỏ: sinh độ cao và độ nghiêng cố định để mỗi lần render giống nhau */
const BLADES = Array.from({ length: 70 }, (_, i) => {
  const x = 24 + i * 7.1;
  const h = 8 + ((i * 37) % 8);
  const lean = ((i * 13) % 7) - 3;
  return `M${x.toFixed(1)} 0 Q${(x + lean * 0.4).toFixed(1)} ${-h / 2} ${(x + lean).toFixed(1)} ${-h}`;
});
const SPECKS = Array.from({ length: 80 }, (_, i) => ({
  x: 28 + ((i * 97) % 484),
  y: 210 + ((i * 53) % 190),
  r: 0.9 + (i % 3) * 0.55,
  light: i % 3 === 0,
}));
const PORES = [[72, 262, 11], [232, 222, 8], [330, 276, 10], [470, 252, 12], [250, 312, 9], [60, 372, 8], [400, 372, 9], [160, 345, 10]];
const MICROBES = [[60, 300, 20], [160, 322, -30], [300, 308, 40], [372, 298, -15], [470, 304, 10], [250, 336, 60], [92, 262, -45], [484, 262, 25]];

function Pill({ x, y, w, color, children }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="20" rx="10" fill="#fff" opacity=".93" />
      <circle cx={x + 10} cy={y + 10} r="4" fill={color} />
      <text x={x + 19} y={y + 13.5} fontSize="9.5" fontWeight="700" fill="#1E293B" fontFamily={FONT}>{children}</text>
    </g>
  );
}
function Chip({ x, w, color, label }) {
  return (
    <g transform={`translate(${x},418)`}>
      <rect width={w} height="32" rx="16" fill="#fff" stroke={color} strokeWidth="1.6" />
      <circle cx="16" cy="16" r="9" fill={color} />
      <path d="M11.5 16.2 l3.2 3.2 l5.8 -6.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="31" y="20" fontSize="11" fontWeight="800" fill="#0F172A" fontFamily={FONT}>{label}</text>
    </g>
  );
}
function Particle({ letter, color, path, dur, begin }) {
  return (
    <g>
      <circle r="6" fill={color} stroke="#fff" strokeWidth="1.2" />
      <text y="2.4" textAnchor="middle" fontSize="6.8" fontWeight="800" fill="#fff" fontFamily={FONT}>{letter}</text>
      <animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur={dur} begin={begin} repeatCount="indefinite" />
    </g>
  );
}
function Plant({ x }) {
  return (
    <g transform={`translate(${x},200) scale(.85)`}>
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-3 0 0;3 0 0;-3 0 0" dur="4.5s" repeatCount="indefinite" {...ease} />
        <path d="M0 0 Q-3 -18 0 -38" fill="none" stroke="#15803D" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M0 -14 Q-17 -18 -21 -31 Q-6 -29 0 -14Z" fill="#4ADE80" stroke="#16A34A" strokeWidth=".8" />
        <path d="M0 -23 Q17 -27 21 -40 Q6 -38 0 -23Z" fill="#4ADE80" stroke="#16A34A" strokeWidth=".8" />
        <path d="M0 -37 Q-7 -47 0 -55 Q7 -47 0 -37Z" fill="#22C55E" stroke="#15803D" strokeWidth=".8" />
      </g>
    </g>
  );
}

export default function SvgSoilBalance() {
  return (
    <svg viewBox="0 0 540 460" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" fontFamily={FONT}>
      <defs>
        <linearGradient id="sbSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDEEFF" /><stop offset=".42" stopColor="#EEF9F1" /><stop offset="1" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id="sbTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A3326" /><stop offset="1" stopColor="#68472F" /></linearGradient>
        <linearGradient id="sbSub" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7A5A42" /><stop offset="1" stopColor="#93704F" /></linearGradient>
        <linearGradient id="sbClay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A98160" /><stop offset="1" stopColor="#C09A72" /></linearGradient>
        <linearGradient id="sbMetal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E2E8F0" /><stop offset="1" stopColor="#94A3B8" /></linearGradient>
        <linearGradient id="sbBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#64748B" /><stop offset="1" stopColor="#334155" /></linearGradient>
        <radialGradient id="sbSun"><stop offset="0" stopColor="#FEF08A" /><stop offset="1" stopColor="#FACC15" /></radialGradient>
        <clipPath id="sbSoilClip"><rect x="20" y="200" width="500" height="210" rx="20" /></clipPath>
        <filter id="sbShadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0F172A" floodOpacity=".25" />
        </filter>
      </defs>

      <rect width="540" height="460" fill="url(#sbSky)" />

      {/* ============ BẦU TRỜI ============ */}
      <text x="22" y="30" fontSize="15" fontWeight="800" fill="#0F172A">Cán cân đất khỏe</text>
      <text x="22" y="45" fontSize="9.5" fontWeight="500" fill="#64748B">Đạm vô cơ cần đi cùng hữu cơ và vôi</text>

      <g transform="translate(494,38)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite" />
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="0" y1="-24" x2="0" y2="-31" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle r="18" fill="url(#sbSun)" />
      </g>
      {[[300, 34, 1], [430, 70, 0.7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`} fill="#fff" opacity=".9">
          <animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;26 0;0 0" dur={`${18 + i * 6}s`} repeatCount="indefinite" />
          <ellipse cx="0" cy="0" rx="26" ry="9" /><circle cx="-10" cy="-7" r="9" /><circle cx="6" cy="-10" r="11" />
        </g>
      ))}

      {/* ============ CÁN CÂN ============ */}
      <rect x="236" y="196" width="68" height="9" rx="4.5" fill="#475569" />
      <polygon points="258,198 282,198 274,76 266,76" fill="url(#sbBeam)" />
      <g filter="url(#sbShadow)">
        <rect x="228" y="116" width="84" height="22" rx="11" fill="#16A34A" />
        <text x="270" y="131" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff">Bón cân đối</text>
      </g>

      <g transform="translate(270,70)">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-5 0 0;4 0 0;-5 0 0" dur="6s" repeatCount="indefinite" {...ease} />
          <rect x="-168" y="-4" width="336" height="8" rx="4" fill="url(#sbBeam)" />
          <circle cx="-168" cy="0" r="4.5" fill="#CBD5E1" /><circle cx="168" cy="0" r="4.5" fill="#CBD5E1" />

          {/* Đĩa trái: đạm vô cơ */}
          <g transform="translate(-160,2)">
            <g>
              <animateTransform attributeName="transform" type="rotate" values="5 0 0;-4 0 0;5 0 0" dur="6s" repeatCount="indefinite" {...ease} />
              <line x1="0" y1="0" x2="-40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="0" y1="0" x2="40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <g filter="url(#sbShadow)">
                <rect x="-24" y="8" width="48" height="40" rx="5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.4" />
                <rect x="-24" y="8" width="48" height="9" rx="4" fill="#E2E8F0" />
                <line x1="-20" y1="12.5" x2="20" y2="12.5" stroke="#94A3B8" strokeDasharray="2 2" strokeWidth=".9" />
                <rect x="-24" y="24" width="48" height="12" fill="#2563EB" />
                <text y="33" textAnchor="middle" fontSize="9" fontWeight="800" fill="#fff">UREA</text>
                <text y="45" textAnchor="middle" fontSize="7" fontWeight="700" fill="#1E293B">46% N</text>
              </g>
              {[[-30, 46], [28, 46], [-34, 44], [33, 44]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.1" fill="#fff" stroke="#CBD5E1" strokeWidth=".6" />)}
              <path d="M-42 48 Q0 68 42 48 Z" fill="url(#sbMetal)" stroke="#64748B" strokeWidth="1" />
              <text y="62" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1E293B">Đạm N</text>
            </g>
          </g>

          {/* Đĩa phải: hữu cơ vi sinh + vôi */}
          <g transform="translate(160,2)">
            <g>
              <animateTransform attributeName="transform" type="rotate" values="5 0 0;-4 0 0;5 0 0" dur="6s" repeatCount="indefinite" {...ease} />
              <line x1="0" y1="0" x2="-40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="0" y1="0" x2="40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <g filter="url(#sbShadow)">
                <rect x="-36" y="14" width="34" height="34" rx="5" fill="#8A654A" stroke="#5B4030" strokeWidth="1.2" />
                <path d="M-19 20 Q-27 26 -19 34 Q-11 26 -19 20Z" fill="#86EFAC" />
                <text x="-19" y="43" textAnchor="middle" fontSize="7" fontWeight="800" fill="#fff">HỮU CƠ</text>
                <rect x="2" y="22" width="32" height="26" rx="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.4" />
                <rect x="2" y="30" width="32" height="7" fill="#38BDF8" />
                <text x="18" y="36" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#fff">VÔI</text>
                <text x="18" y="45" textAnchor="middle" fontSize="6" fontWeight="700" fill="#475569">pH ↑</text>
              </g>
              <path d="M-42 48 Q0 68 42 48 Z" fill="url(#sbMetal)" stroke="#64748B" strokeWidth="1" />
              <text y="62" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="#1E293B">Hữu cơ + Vôi</text>
            </g>
          </g>
        </g>
        <circle r="9" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
        <circle r="3" fill="#78350F" />
      </g>

      {/* ============ CÂY NON & CỎ ============ */}
      <Plant x={135} />
      <Plant x={405} />

      {/* ============ LÁT CẮT ĐẤT ============ */}
      <g clipPath="url(#sbSoilClip)">
        <rect x="20" y="200" width="500" height="210" fill="url(#sbTop)" />
        <path d="M20 290 Q100 280 180 292 T340 290 T520 286 L520 410 L20 410 Z" fill="url(#sbSub)" />
        <path d="M20 356 Q120 346 220 358 T400 354 T520 358 L520 410 L20 410 Z" fill="url(#sbClay)" />
        {SPECKS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.light ? '#B8906C' : '#2E1F16'} opacity={s.light ? 0.35 : 0.4} />)}
        {PORES.map(([x, y, r], i) => (
          <g key={i}><circle cx={x} cy={y} r={r} fill="#7B5842" /><ellipse cx={x + 1} cy={y + 1.5} rx={r * 0.62} ry={r * 0.5} fill="#33241B" opacity=".6" /></g>
        ))}
        {[[84, 392, 19, 10], [300, 388, 22, 11], [470, 394, 16, 9]].map(([x, y, rx, ry], i) => (
          <g key={i}><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#A8A29E" /><ellipse cx={x - rx * 0.3} cy={y - ry * 0.3} rx={rx * 0.45} ry={ry * 0.35} fill="#D6D3D1" opacity=".8" /></g>
        ))}

        {/* đường hầm giun */}
        <path d="M196 250 L362 250 M300 250 Q314 275 306 300" stroke="#3A281E" strokeWidth="24" strokeLinecap="round" fill="none" opacity=".7" />

        {/* rễ cây */}
        <g fill="none" stroke="#FDE68A" strokeLinecap="round">
          <path d="M135 200 Q128 240 110 292" strokeWidth="2.8" />
          <path d="M131 228 Q150 258 168 288" strokeWidth="2.4" />
          <path d="M122 262 Q108 270 96 272" strokeWidth="1.5" />
          <path d="M143 250 Q156 252 164 262" strokeWidth="1.5" />
          <path d="M405 200 Q412 240 430 292" strokeWidth="2.8" />
          <path d="M409 228 Q390 258 372 288" strokeWidth="2.4" />
          <path d="M418 262 Q432 270 444 272" strokeWidth="1.5" />
          <path d="M397 250 Q384 252 376 262" strokeWidth="1.5" />
        </g>

        {/* mạng sợi nấm nối rễ với đường hầm */}
        <g fill="none" stroke="#FFF7D6" strokeWidth="1" strokeDasharray="3 4" opacity=".55">
          <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="2s" repeatCount="indefinite" />
          <path d="M110 292 Q150 300 198 262" />
          <path d="M168 288 Q185 280 198 262" />
          <path d="M372 288 Q360 280 358 262" />
          <path d="M430 292 Q390 305 360 262" />
        </g>

        {/* vi sinh vật */}
        {MICROBES.map(([x, y, a], i) => (
          <g key={i}>
            <animateTransform attributeName="transform" type="translate" values={`${x} ${y};${x + 4} ${y - 3};${x} ${y}`} dur={`${2.4 + (i % 4) * 0.6}s`} repeatCount="indefinite" />
            <g transform={`rotate(${a})`}>
              <rect x="-5" y="-2.4" width="10" height="4.8" rx="2.4" fill="#86EFAC" stroke="#16A34A" strokeWidth=".8" />
              <line x1="5" y1="0" x2="8" y2="-2" stroke="#16A34A" strokeWidth=".7" />
            </g>
          </g>
        ))}

        {/* dưỡng chất bay lên rễ */}
        <Particle letter="N" color="#2563EB" path="M200 322 Q150 314 112 294" dur="4s" begin="0s" />
        <Particle letter="P" color="#EA580C" path="M290 300 Q220 304 168 290" dur="5s" begin="1s" />
        <Particle letter="K" color="#9333EA" path="M330 322 Q362 308 372 290" dur="4.5s" begin=".5s" />
        <Particle letter="Ca" color="#0D9488" path="M470 312 Q452 302 430 294" dur="5.5s" begin="2s" />

        {/* giun đất đội mũ bảo hộ */}
        <g>
          <path stroke="#FB7185" strokeWidth="14" strokeLinecap="round" fill="none" d="M200 250 Q225 232 250 250 T300 250 T350 250">
            <animate attributeName="d" dur="2.6s" repeatCount="indefinite" values="M200 250 Q225 232 250 250 T300 250 T350 250;M200 250 Q225 268 250 250 T300 250 T350 250;M200 250 Q225 232 250 250 T300 250 T350 250" />
          </path>
          <path stroke="#BE123C" strokeOpacity=".35" strokeWidth="14" strokeDasharray="1.4 9" fill="none" d="M200 250 Q225 232 250 250 T300 250 T350 250">
            <animate attributeName="d" dur="2.6s" repeatCount="indefinite" values="M200 250 Q225 232 250 250 T300 250 T350 250;M200 250 Q225 268 250 250 T300 250 T350 250;M200 250 Q225 232 250 250 T300 250 T350 250" />
          </path>
          <circle cx="200" cy="250" r="10" fill="#FB7185" />
          <circle cx="196" cy="248" r="2.6" fill="#fff" /><circle cx="196" cy="248" r="1.3" fill="#17243A" />
          <path d="M193 254 Q197 258 202 254" fill="none" stroke="#17243A" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="193" cy="252" r="2" fill="#FDA4AF" />
          <path d="M189 245 A11 11 0 0 1 211 245 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          <rect x="187" y="244" width="26" height="3.2" rx="1.6" fill="#EAB308" />
          <path d="M200 234 V245" stroke="#CA8A04" strokeWidth="1.4" />
          <circle cx="190" cy="243" r="2" fill="#FEF9C3" stroke="#CA8A04" strokeWidth=".6" />
        </g>
        <g>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.8;1" dur="6s" repeatCount="indefinite" />
          <rect x="212" y="210" width="86" height="18" rx="9" fill="#fff" />
          <path d="M214 227 L208 236 L224 227 Z" fill="#fff" />
          <text x="255" y="222.5" textAnchor="middle" fontSize="9" fontWeight="800" fill="#BE123C">Đất tơi xốp rồi!</text>
        </g>
      </g>

      {/* mặt cỏ */}
      <rect x="20" y="196" width="500" height="12" rx="6" fill="#36B86A" />
      <g transform="translate(0,198)" stroke="#22A25A" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <animateTransform attributeName="transform" type="translate" values="0 198;1.5 198;0 198" dur="3s" repeatCount="indefinite" />
        {BLADES.map((d, i) => <path key={i} d={d} />)}
      </g>

      {/* nhãn chú thích */}
      <Pill x={28} y={216} w={90} color="#8A654A">Mùn hữu cơ</Pill>
      <Pill x={28} y={332} w={118} color="#22C55E">Vi sinh vật có ích</Pill>
      <Pill x={426} y={216} w={88} color="#38BDF8">pH 6,0–6,5</Pill>
      <Pill x={398} y={332} w={116} color="#FB7185">Giun cải tạo đất</Pill>

      {/* ============ QUY TẮC 4 ĐÚNG ============ */}
      <rect x="14" y="418" width="92" height="32" rx="16" fill="#16A34A" />
      <text x="60" y="431" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#DCFCE7">Quy tắc</text>
      <text x="60" y="443" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">4 ĐÚNG</text>
      <Chip x={112} w={94} color="#16A34A" label="Đúng loại" />
      <Chip x={212} w={94} color="#2563EB" label="Đúng lượng" />
      <Chip x={312} w={94} color="#D97706" label="Đúng lúc" />
      <Chip x={412} w={94} color="#E11D48" label="Đúng cách" />
    </svg>
  );
}