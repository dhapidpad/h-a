import React, { useState, useEffect } from 'react';

const FONT = '"Space Grotesk","Be Vietnam Pro",system-ui,sans-serif';

/* ============================================================
   HOẠT ẢNH (CSS) — chỉ áp transform-box cho các class động,
   để không làm lệch các transform="translate(...)" có sẵn
   ============================================================ */
const css = `
.sv-a{transform-box:fill-box}
.sv-float{animation:svFloat 4.2s ease-in-out infinite}
.sv-sway{transform-box:fill-box;transform-origin:50% 100%;animation:svSway 5s ease-in-out infinite}
.sv-leaf{transform-box:fill-box;transform-origin:100% 100%;animation:svLeaf 3.4s ease-in-out infinite}
.sv-ear{transform-box:fill-box;transform-origin:50% 100%;animation:svEar 2.6s ease-in-out infinite}
.sv-blink{transform-box:fill-box;transform-origin:center;animation:svBlink 5s ease-in-out infinite}
.sv-waveL{transform-box:fill-box;transform-origin:100% 100%;animation:svWaveL 2.2s ease-in-out infinite}
.sv-waveR{transform-box:fill-box;transform-origin:0% 100%;animation:svWaveR 2.2s ease-in-out infinite}
.sv-pulse{transform-box:fill-box;transform-origin:center;animation:svPulse 3.4s ease-in-out infinite}
.sv-twinkle{transform-box:fill-box;transform-origin:center;animation:svTwinkle 2.8s ease-in-out infinite}
.sv-flicker{animation:svFlicker 1.6s steps(1,end) infinite}
.sv-flow{stroke-dasharray:5 11;animation:svDash 1.3s linear infinite}
.sv-orbit{stroke-dasharray:8 7;animation:svDash 2.4s linear infinite}
.sv-spin{transform-origin:280px 235px;animation:svSpin 80s linear infinite}
.sv-rise{transform-box:fill-box;transform-origin:center;animation:svRise 6s ease-in infinite;opacity:0}
.sv-drift{animation:svDrift 7s ease-in-out infinite}
@keyframes svFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes svSway{0%,100%{transform:rotate(-2.5deg)}50%{transform:rotate(2.5deg)}}
@keyframes svLeaf{0%,100%{transform:rotate(3deg) scale(1)}50%{transform:rotate(-5deg) scale(1.05)}}
@keyframes svEar{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(6deg)}}
@keyframes svBlink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.08)}}
@keyframes svWaveL{0%,100%{transform:rotate(6deg)}50%{transform:rotate(-14deg)}}
@keyframes svWaveR{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(14deg)}}
@keyframes svPulse{0%,100%{transform:scale(1);opacity:.75}50%{transform:scale(1.14);opacity:1}}
@keyframes svTwinkle{0%,100%{transform:scale(.5);opacity:.25}50%{transform:scale(1.15);opacity:1}}
@keyframes svFlicker{0%{opacity:1}30%{opacity:.15}45%{opacity:1}70%{opacity:.3}100%{opacity:1}}
@keyframes svDash{to{stroke-dashoffset:-32}}
@keyframes svSpin{to{transform:rotate(360deg)}}
@keyframes svRise{0%{transform:translateY(14px) scale(.6);opacity:0}15%{opacity:.95}80%{opacity:.9}100%{transform:translateY(-62px) scale(1);opacity:0}}
@keyframes svDrift{0%,100%{transform:translate(0,0)}50%{transform:translate(6px,-12px)}}
.sv-ripple{transform-box:fill-box;transform-origin:center;animation:svRipple 6s ease-out infinite;opacity:0}
@keyframes svRipple{0%{transform:scale(.25);opacity:.5}100%{transform:scale(1);opacity:0}}
@media (prefers-reduced-motion:reduce){.sv-root *{animation:none!important}.sv-rise{opacity:.8}}
`;

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(m.matches);
    const h = (e) => setReduce(e.matches);
    if (m.addEventListener) m.addEventListener('change', h);
    return () => { if (m.removeEventListener) m.removeEventListener('change', h); };
  }, []);
  return reduce;
}

/* ---------- Các mảnh nhỏ dùng lại ---------- */

const SPARK = 'M0 -7 Q1.5 -1.5 7 0 Q1.5 1.5 0 7 Q-1.5 1.5 -7 0 Q-1.5 -1.5 0 -7Z';

const Sparkle = ({ x, y, s = 1, c = '#FFFFFF', delay = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="sv-twinkle" d={SPARK} fill={c} style={{ animationDelay: `${delay}s` }} />
  </g>
);

const Bubble = ({ x, y, t, c, delay }) => (
  <g transform={`translate(${x} ${y})`}>
    <g className="sv-rise" style={{ animationDelay: `${delay}s` }}>
      <circle r="10" fill="#FFFFFF" stroke={c} strokeWidth="1.8" />
      <circle cx="-3.5" cy="-3.5" r="2" fill={c} opacity="0.25" />
      <text y="3.6" textAnchor="middle" fontSize="13" fontWeight="800" fill={c} fontFamily={FONT}>{t}</text>
    </g>
  </g>
);

const Nameplate = ({ y, stroke, color, label }) => (
  <g transform={`translate(0 ${y})`}>
    <rect x="-66" y="-11" width="132" height="24" rx="12" fill="#FFFFFF" stroke={stroke} strokeWidth="1.6" />
    <circle cx="-54" cy="1" r="3.2" fill={stroke} />
    <text x="4" y="5" textAnchor="middle" fill={color} fontSize="13" fontWeight="800" fontFamily={FONT}>{label}</text>
  </g>
);

/* Cánh tay vẫy: s = -1 (trái) hoặc 1 (phải) */
const Arm = ({ s, x = 33, color, hand, edge, delay = 0 }) => (
  <g className={s < 0 ? 'sv-waveL' : 'sv-waveR'} style={{ animationDelay: `${delay}s` }}>
    <path d={`M ${s * x} 9 Q ${s * (x + 15)} 7 ${s * (x + 20)} -7`} stroke={color} strokeWidth="6.5" strokeLinecap="round" fill="none" />
    <circle cx={s * (x + 20)} cy="-8" r="5.6" fill={hand} stroke={edge} strokeWidth="1.5" />
  </g>
);

/* Chip ion mà cây hấp thụ: NH₄⁺, H₂PO₄⁻, K⁺ */
const Chip = ({ x, y, w, t, c, delay = 0, style }) => (
  <g transform={`translate(${x} ${y})`} style={style}>
    <g className="sv-drift" style={{ animationDelay: `${delay}s` }}>
      <rect x={-w / 2} y="-11" width={w} height="22" rx="11" fill="#FFFFFF" stroke={c} strokeWidth="1.4" />
      <text y="4" textAnchor="middle" fontSize="13" fontWeight="800" fill={c} fontFamily={FONT}>{t}</text>
    </g>
  </g>
);

/* Nhân vật: dòng dinh dưỡng chảy về cây, có hạt chạy dọc đường */
const Flow = ({ d, color, dur = 3.4, reduce }) => (
  <g>
    <path d={d} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.1" />
    <path className="sv-flow" d={d} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
    {!reduce &&
      [0, 1, 2].map((i) => (
        <g key={i}>
          <circle r="7" fill={color} opacity="0.25">
            <animateMotion dur={`${dur}s`} begin={`${-(i * dur) / 3}s`} repeatCount="indefinite" path={d} />
          </circle>
          <circle r="3.6" fill={color} stroke="#FFFFFF" strokeWidth="1.2">
            <animateMotion dur={`${dur}s`} begin={`${-(i * dur) / 3}s`} repeatCount="indefinite" path={d} />
          </circle>
        </g>
      ))}
  </g>
);

/* Quỹ đạo electron với hạt chạy */
const ORBIT_PATH = 'M -210 0 A 210 85 0 1 1 210 0 A 210 85 0 1 1 -210 0';
const Orbit = ({ rot, color, dur, begin = 0, reduce }) => (
  <g transform={`translate(280 235) rotate(${rot})`}>
    <ellipse rx="210" ry="85" fill="none" stroke={color} strokeWidth="2.2" opacity="0.5" className="sv-orbit" />
    {!reduce && (
      <g>
        <circle r="11" fill={color} opacity="0.22" />
        <circle r="5.5" fill={color} stroke="#FFFFFF" strokeWidth="1.6" />
        <circle cx="-1.6" cy="-1.8" r="1.6" fill="#FFFFFF" opacity="0.9" />
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={ORBIT_PATH} />
      </g>
    )}
  </g>
);

/* Lá cây: flip = true để lật đối xứng */
const Leaf = ({ flip, d, vein, fill, delay = 0 }) => (
  <g transform={flip ? 'scale(-1 1)' : undefined}>
    <g className="sv-leaf" style={{ animationDelay: `${delay}s` }}>
      <path d={d} fill={fill} stroke="#15803D" strokeWidth="1.2" strokeLinejoin="round" />
      <path d={vein} fill="none" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </g>
  </g>
);

export default function SvgTopic({ focus = null }) {
  const reduce = useReducedMotion();
  /* Khi rê chuột vào N/P/K ở slide, 2 nguyên tố còn lại mờ đi */
  const dim = (k) => ({ opacity: focus && focus !== k ? 0.28 : 1, transition: 'opacity .35s ease' });

  return (
    <svg className="sv-root" viewBox="0 0 560 480" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Ba bé Đạm, Lân, Kali nuôi cây non lớn khỏe">
      <style>{css}</style>
      <defs>
        {/* Quầng sáng */}
        <radialGradient id="ringGlowN" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#36B86A" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#36B86A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ringGlowP" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8C6BFA" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#8C6BFA" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ringGlowK" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB547" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFB547" stopOpacity="0" />
        </radialGradient>

        {/* Thân 3 nhân vật */}
        <radialGradient id="sproutOrb" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="60%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </radialGradient>
        <radialGradient id="sparkyOrb" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="60%" stopColor="#8C6BFA" />
          <stop offset="100%" stopColor="#5B21B6" />
        </radialGradient>
        <radialGradient id="sunnyOrb" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#FFB547" />
          <stop offset="100%" stopColor="#D97706" />
        </radialGradient>

        {/* Cây trung tâm */}
        <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id="leafLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="50%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A47551" />
          <stop offset="100%" stopColor="#6B4A33" />
        </linearGradient>
        <radialGradient id="fruitGrad" cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="55%" stopColor="#FFB547" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>

        {/* Bóng đổ */}
        </defs>

      {/* ============ NỀN: quầng sáng 3 màu hoà vào nhau ============ */}
      <g>
        <circle className="sv-pulse" cx="280" cy="235" r="190" fill="url(#ringGlowN)" opacity="0.4" />
        <circle className="sv-pulse" cx="215" cy="205" r="120" fill="url(#ringGlowN)" style={{ animationDelay: '-1s' }} />
        <circle className="sv-pulse" cx="345" cy="205" r="120" fill="url(#ringGlowP)" style={{ animationDelay: '-2s' }} />
        <circle className="sv-pulse" cx="280" cy="300" r="120" fill="url(#ringGlowK)" style={{ animationDelay: '-0.5s' }} />
      </g>

      {/* Hạt bụi sáng trôi lơ lửng */}
      <g>
        {[
          [60, 230, 3, '#36B86A', 0], [90, 330, 2.5, '#FFB547', -2], [500, 250, 3, '#8C6BFA', -1],
          [470, 360, 2.5, '#36B86A', -3], [200, 430, 2.5, '#8C6BFA', -4], [370, 440, 3, '#FFB547', -5],
          [40, 60, 2.5, '#FFB547', -2.5], [520, 50, 2.5, '#36B86A', -1.5],
        ].map(([x, y, r, c, d], i) => (
          <circle key={i} className="sv-drift" cx={x} cy={y} r={r} fill={c} opacity="0.55" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>

      {/* Sóng lan toả từ mầm cây — nhịp "sự sống" */}
      <g>
        {[['#36B86A', 0], ['#8C6BFA', -2], ['#FFB547', -4]].map(([c, d]) => (
          <circle key={c} className="sv-ripple" cx="280" cy="235" r="150" fill="none" stroke={c} strokeWidth="2" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>

      {/* ============ DÒNG DINH DƯỠNG chảy về cây ============ */}
      <g style={dim('N')}><Flow reduce={reduce} color="#22C55E" dur={3.2} d="M 165 135 C 200 175, 232 200, 262 220" /></g>
      <g style={dim('P')}><Flow reduce={reduce} color="#8C6BFA" dur={4} d="M 428 160 C 442 250, 400 302, 316 310" /></g>
      <g style={dim('K')}><Flow reduce={reduce} color="#FFB547" dur={3.6} d="M 304 336 C 356 312, 358 240, 294 204" /></g>

      {/* ============ 3 QUỸ ĐẠO ELECTRON (xoay chậm) ============ */}
      <g className="sv-spin">
        <Orbit reduce={reduce} rot={-30} color="#36B86A" dur={7} />
        <Orbit reduce={reduce} rot={30} color="#8C6BFA" dur={9} begin={-3} />
        <Orbit reduce={reduce} rot={90} color="#FFB547" dur={8} begin={-5} />
      </g>

      {/* ====================================================================
          MẦM CÂY TRUNG TÂM — TRÁI TIM NÔNG NGHIỆP
          ==================================================================== */}
      <g transform="translate(280, 235)">
        {/* Mặt cắt đất */}
        <path d="M -58 42 Q 0 34 58 42 L 58 80 Q 58 90 48 90 L -48 90 Q -58 90 -58 80 Z" fill="url(#soilGrad)" opacity="0.38" />
        <path d="M -58 42 Q 0 34 58 42" fill="none" stroke="#6B4A33" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        {[[-40, 66], [-22, 80], [30, 74], [44, 58], [14, 84], [-46, 52]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 1.6 : 2.4} fill="#4A3324" opacity="0.4" />
        ))}
        <ellipse cx="-30" cy="46" rx="6" ry="3.5" fill="#B8A38F" opacity="0.85" />
        <ellipse cx="34" cy="47" rx="4.5" ry="2.6" fill="#B8A38F" opacity="0.85" />

        {/* Rễ cây đâm sâu, phân nhánh (nhờ Lân) */}
        <g stroke="#8C6BFA" strokeLinecap="round" fill="none">
          <path d="M 0 42 C -4 58 -6 70 -4 82" strokeWidth="3.6" />
          <path d="M 0 46 Q -18 56 -30 74" strokeWidth="3.2" />
          <path d="M -18 53 Q -30 55 -40 62" strokeWidth="2" />
          <path d="M -26 66 Q -34 68 -42 76" strokeWidth="1.6" />
          <path d="M 0 46 Q 18 56 30 74" strokeWidth="3.2" />
          <path d="M 17 53 Q 30 54 41 63" strokeWidth="2" />
          <path d="M 25 66 Q 34 68 42 77" strokeWidth="1.6" />
        </g>
        {[[-4, 82], [-30, 74], [-40, 62], [30, 74], [41, 63]].map(([x, y], i) => (
          <circle key={i} className="sv-pulse" cx={x} cy={y} r="3" fill="#DDD6FE" stroke="#8C6BFA" strokeWidth="1.4" style={{ animationDelay: `${-i * 0.6}s` }} />
        ))}

        {/* Cỏ non trên mặt đất */}
        <g stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M -44 42 Q -46 34 -50 30" />
          <path d="M -38 41 Q -37 33 -35 28" />
          <path d="M 40 41 Q 42 34 46 30" />
          <path d="M 48 43 Q 50 37 55 35" />
        </g>

        {/* Thân + lá + quả: cả cụm đung đưa theo gió */}
        <g className="sv-sway">
          {/* Thân vươn cao (nhờ Đạm) */}
          <path d="M 0 42 C 3 22 -3 2 0 -20" stroke="url(#stemGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />

          {/* Lá lớn */}
          <Leaf d="M 0 14 C -12 -4 -40 -6 -58 -26 C -26 -42 -2 -26 0 14 Z" vein="M 0 12 Q -24 -8 -50 -25" fill="url(#leafGrad)" delay={0} />
          <Leaf flip d="M 0 14 C -12 -4 -40 -6 -58 -26 C -26 -42 -2 -26 0 14 Z" vein="M 0 12 Q -24 -8 -50 -25" fill="url(#leafGrad)" delay={-1.2} />
          {/* Lá nhỏ phía trên */}
          <Leaf d="M 0 -4 C -8 -16 -26 -18 -38 -34 C -16 -42 0 -28 0 -4 Z" vein="M 0 -5 Q -16 -16 -32 -31" fill="url(#leafLight)" delay={-0.6} />
          <Leaf flip d="M 0 -4 C -8 -16 -26 -18 -38 -34 C -16 -42 0 -28 0 -4 Z" vein="M 0 -5 Q -16 -16 -32 -31" fill="url(#leafLight)" delay={-1.8} />

          {/* Nụ quả ngọt trĩu hạt (nhờ Kali) */}
          <circle className="sv-pulse" cx="0" cy="-34" r="19" fill="#FFB547" opacity="0.28" />
          <circle cx="0" cy="-34" r="11" fill="url(#fruitGrad)" stroke="#FFFFFF" strokeWidth="2" />
          <ellipse cx="-3.5" cy="-38" rx="3.2" ry="2" fill="#FFFFFF" opacity="0.7" transform="rotate(-30 -3.5 -38)" />
          <path d="M 0 -45 L -4.5 -41 L 0 -42 L 4.5 -41 Z" fill="#16A34A" />
        </g>

        <Sparkle x={-30} y={-52} s={0.9} c="#FDE047" delay={0} />
        <Sparkle x={30} y={-56} s={0.7} c="#FFFFFF" delay={-1} />
        <Sparkle x={14} y={-66} s={0.6} c="#FDE047" delay={-2} />
      </g>

      {/* ====================================================================
          1. BÉ ĐẠM (SPROUTY N) — GÓC TRÊN TRÁI
          ==================================================================== */}
      <g transform="translate(130, 110)" style={dim('N')}>
        <circle className="sv-pulse" cx="0" cy="0" r="50" fill="url(#ringGlowN)" opacity="0.8" />

        <g className="sv-float">
          {/* Chân */}
          <ellipse cx="-14" cy="38" rx="10" ry="5.5" fill="#15803D" />
          <ellipse cx="14" cy="38" rx="10" ry="5.5" fill="#15803D" />

          {/* Tay vẫy */}
          <Arm s={-1} x={34} color="#22C55E" hand="#86EFAC" edge="#15803D" />
          <Arm s={1} x={34} color="#22C55E" hand="#86EFAC" edge="#15803D" delay={-1.1} />

          {/* Thân */}
          <circle cx="0" cy="0" r="38" fill="url(#sproutOrb)" stroke="#15803D" strokeWidth="2.5" />
          <ellipse cx="0" cy="22" rx="19" ry="12" fill="#BBF7D0" opacity="0.45" />
          <ellipse cx="-17" cy="-22" rx="9" ry="5" fill="#FFFFFF" opacity="0.32" transform="rotate(-35 -17 -22)" />

          {/* Hai tai lá ngúng nguẩy */}
          <g className="sv-ear">
            <path d="M 0 -36 C -18 -52, -36 -42, -26 -28 C -20 -18, -4 -28, 0 -34" fill="#86EFAC" stroke="#15803D" strokeWidth="2" />
            <path d="M -4 -33 Q -16 -41 -26 -33" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
          </g>
          <g className="sv-ear" style={{ animationDelay: '-1.3s' }}>
            <path d="M 0 -36 C 18 -52, 36 -42, 26 -28 C 20 -18, 4 -28, 0 -34" fill="#86EFAC" stroke="#15803D" strokeWidth="2" />
            <path d="M 4 -33 Q 16 -41 26 -33" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
          </g>

          {/* Kính bảo hộ khoa học: dây đeo + 2 mắt kính */}
          <path d="M -36 -7 L -18 -7 M 18 -7 L 36 -7" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" />
          <rect x="-18" y="-12" width="16" height="11" rx="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.8" />
          <rect x="2" y="-12" width="16" height="11" rx="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.8" />
          <line x1="-2" y1="-7" x2="2" y2="-7" stroke="#0284C7" strokeWidth="2" />

          {/* Mắt to tròn chớp chớp */}
          <g className="sv-blink">
            <circle cx="-10" cy="-6" r="2.8" fill="#0F172A" />
            <circle cx="10" cy="-6" r="2.8" fill="#0F172A" />
            <circle cx="-9" cy="-7" r="0.9" fill="#FFFFFF" />
            <circle cx="11" cy="-7" r="0.9" fill="#FFFFFF" />
          </g>
          <path d="M -16 -10 L -12 -11.5 M 4 -10 L 8 -11.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />

          {/* Má hồng + miệng cười */}
          <ellipse cx="-16" cy="6" rx="5" ry="3.5" fill="#FB7185" opacity="0.8" />
          <ellipse cx="16" cy="6" rx="5" ry="3.5" fill="#FB7185" opacity="0.8" />
          <path d="M -6 7 Q 0 15, 6 7 Z" fill="#E11D48" />
          <path d="M -3 11 Q 0 13, 3 11" fill="none" stroke="#FB7185" strokeWidth="1.4" strokeLinecap="round" />

          {/* Huy hiệu lục giác N trước bụng */}
          <g transform="translate(0 25)">
            <polygon points="0,-9 8,-4.5 8,4.5 0,9 -8,4.5 -8,-4.5" fill="#FFFFFF" stroke="#15803D" strokeWidth="1.5" />
            <text y="3.4" textAnchor="middle" fontSize="13" fontWeight="800" fill="#15803D" fontFamily={FONT}>N</text>
          </g>
        </g>

        <Nameplate y={60} stroke="#22C55E" color="#15803D" label="BÉ ĐẠM • 46% N" />
      </g>

      {/* ====================================================================
          2. BÉ LÂN (SPARKY P) — GÓC TRÊN PHẢI
          ==================================================================== */}
      <g transform="translate(430, 110)" style={dim('P')}>
        <circle className="sv-pulse" cx="0" cy="0" r="50" fill="url(#ringGlowP)" opacity="0.8" style={{ animationDelay: '-1.2s' }} />

        <g className="sv-float" style={{ animationDelay: '-1.4s' }}>
          {/* Chân */}
          <ellipse cx="-12" cy="40" rx="9.5" ry="5.5" fill="#5B21B6" />
          <ellipse cx="12" cy="40" rx="9.5" ry="5.5" fill="#5B21B6" />

          {/* Tay vẫy */}
          <Arm s={-1} x={29} color="#8C6BFA" hand="#DDD6FE" edge="#5B21B6" delay={-0.6} />
          <Arm s={1} x={29} color="#8C6BFA" hand="#DDD6FE" edge="#5B21B6" delay={-1.7} />

          {/* Thân củ rễ phát quang */}
          <path d="M 0 -36 C 28 -36, 36 -2, 28 22 C 20 38, 10 40, 0 40 C -10 40, -20 38, -28 22 C -36 -2, -28 -36, 0 -36 Z"
            fill="url(#sparkyOrb)" stroke="#5B21B6" strokeWidth="2.5" />
          <ellipse cx="-14" cy="-20" rx="8" ry="4.6" fill="#FFFFFF" opacity="0.35" transform="rotate(-38 -14 -20)" />
          <path d="M -18 30 Q -8 36 0 36 M 10 33 Q 16 30 20 26" fill="none" stroke="#DDD6FE" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />

          {/* Vương miện ngọc photphat */}
          <polygon points="-14,-36 -7,-48 0,-38 7,-48 14,-36" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="-7" cy="-48" r="2" fill="#F472B6" stroke="#CA8A04" strokeWidth="0.8" />
          <circle cx="7" cy="-48" r="2" fill="#38BDF8" stroke="#CA8A04" strokeWidth="0.8" />
          <circle cx="0" cy="-41" r="1.8" fill="#EF4444" />

          {/* Mắt lấp lánh hình ngôi sao */}
          <g className="sv-twinkle" style={{ animationDuration: '2.2s' }}>
            <text x="-16" y="-6" fill="#FDE047" fontSize="16" fontWeight="bold">★</text>
          </g>
          <g className="sv-twinkle" style={{ animationDuration: '2.2s', animationDelay: '-1.1s' }}>
            <text x="4" y="-6" fill="#FDE047" fontSize="16" fontWeight="bold">★</text>
          </g>

          {/* Má hồng + miệng */}
          <ellipse cx="-16" cy="6" rx="5" ry="3.5" fill="#F472B6" opacity="0.8" />
          <ellipse cx="16" cy="6" rx="5" ry="3.5" fill="#F472B6" opacity="0.8" />
          <path d="M -5 7 Q 0 13, 5 7" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />

          {/* Cục pin ATP mini trước ngực */}
          <g transform="translate(-11, 14)">
            <rect x="0" y="0" width="20" height="11" rx="2.5" fill="#FDE047" stroke="#0F172A" strokeWidth="1.2" />
            <rect x="20" y="3.5" width="2.6" height="4" rx="1" fill="#0F172A" />
            <path className="sv-flicker" d="M 11 1 L 7 6 L 11 6 L 9 10 L 14 5 L 10 5 Z" fill="#EA580C" />
          </g>

          {/* Tia điện nhỏ chớp quanh người */}
          <path className="sv-flicker" d="M -44 -22 L -40 -28 L -43 -28 L -39 -35" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path className="sv-flicker" style={{ animationDelay: '-0.8s' }} d="M 44 -26 L 40 -32 L 43 -32 L 39 -39" fill="none" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <Nameplate y={62} stroke="#8C6BFA" color="#6D28D9" label="BÉ LÂN • PIN ATP" />
      </g>

      {/* ====================================================================
          3. BÉ KALI (SUNNY K) — GÓC DƯỚI TRUNG TÂM
          ==================================================================== */}
      <g transform="translate(280, 365)" style={dim('K')}>
        <circle className="sv-pulse" cx="0" cy="0" r="50" fill="url(#ringGlowK)" opacity="0.8" style={{ animationDelay: '-2.2s' }} />

        <g className="sv-float" style={{ animationDelay: '-2.6s' }}>
          {/* Chân */}
          <ellipse cx="-14" cy="38" rx="10" ry="5.5" fill="#B45309" />
          <ellipse cx="14" cy="38" rx="10" ry="5.5" fill="#B45309" />

          {/* Tay vẫy bên phải */}
          <Arm s={1} x={34} color="#F59E0B" hand="#FEF08A" edge="#B45309" delay={-0.4} />

          {/* Thân quả cam tròn vo núng nính */}
          <circle cx="0" cy="0" r="38" fill="url(#sunnyOrb)" stroke="#B45309" strokeWidth="2.5" />
          <ellipse cx="-16" cy="-22" rx="9" ry="5" fill="#FFFFFF" opacity="0.38" transform="rotate(-35 -16 -22)" />
          {[[-8, 20], [10, 24], [22, 14], [-22, 14], [0, 30]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.1" fill="#B45309" opacity="0.3" />
          ))}

          {/* Bông hoa cài đầu: 5 cánh, đung đưa */}
          <g transform="translate(20 -34)">
            <g className="sv-ear" style={{ animationDuration: '3.4s' }}>
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse key={a} cx="0" cy="-5.5" rx="3.2" ry="4.6" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="0.8" transform={`rotate(${a})`} />
              ))}
              <circle r="3" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
            </g>
          </g>

          {/* Đôi mắt to tròn long lanh */}
          <g className="sv-blink" style={{ animationDelay: '-2s' }}>
            <circle cx="-12" cy="-4" r="4.2" fill="#0F172A" />
            <circle cx="12" cy="-4" r="4.2" fill="#0F172A" />
            <circle cx="-13.5" cy="-6" r="1.6" fill="#FFFFFF" />
            <circle cx="10.5" cy="-6" r="1.6" fill="#FFFFFF" />
            <circle cx="-10.5" cy="-2" r="0.8" fill="#FFFFFF" />
            <circle cx="13.5" cy="-2" r="0.8" fill="#FFFFFF" />
          </g>

          {/* Má đào + nụ cười */}
          <ellipse cx="-18" cy="6" rx="5.5" ry="3.5" fill="#F87171" opacity="0.8" />
          <ellipse cx="18" cy="6" rx="5.5" ry="3.5" fill="#F87171" opacity="0.8" />
          <path d="M -6 6 Q 0 15, 6 6 Z" fill="#E11D48" />
          <path d="M -3 10.5 Q 0 12.5, 3 10.5" fill="none" stroke="#FB7185" strokeWidth="1.4" strokeLinecap="round" />

          {/* Khiên lá K bên hông (Hiệp sĩ) */}
          <g transform="translate(-52, -8)">
            <g className="sv-ear" style={{ animationDuration: '3.8s' }}>
              <path d="M 12 0 C 24 1, 25 15, 12 28 C -1 15, 0 1, 12 0 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M 12 4 C 18 5, 19 14, 12 23 C 5 14, 6 5, 12 4 Z" fill="none" stroke="#BBF7D0" strokeWidth="1" opacity="0.7" />
              <text x="12" y="17" textAnchor="middle" fontSize="13" fontWeight="800" fill="#FFFFFF" fontFamily={FONT}>K</text>
            </g>
          </g>
        </g>

        <Nameplate y={62} stroke="#F59E0B" color="#B45309" label="BÉ KALI • HIỆP SĨ K" />
      </g>

      {/* ============ ION cây hấp thụ ============ */}
      <Chip x={240} y={68} w={92} t="NH₄⁺ / NO₃⁻" c="#16A34A" delay={0} style={dim('N')} />
      <Chip x={340} y={46} w={68} t="H₂PO₄⁻" c="#7C3AED" delay={-2.5} style={dim('P')} />
      <Chip x={372} y={372} w={44} t="K⁺" c="#D97706" delay={-4} style={dim('K')} />

      {/* ============ BONG BÓNG N • P • K bay lên quanh cây ============ */}
      <Bubble x={222} y={290} t="N" c="#16A34A" delay={0} />
      <Bubble x={340} y={294} t="P" c="#7C3AED" delay={-2} />
      <Bubble x={352} y={196} t="K" c="#D97706" delay={-4} />

      {/* ============ LẤP LÁNH rải rác ============ */}
      <Sparkle x={70} y={190} s={1.1} c="#36B86A" delay={0} />
      <Sparkle x={500} y={190} s={1} c="#8C6BFA" delay={-1.2} />
      <Sparkle x={200} y={370} s={0.9} c="#FFB547" delay={-0.6} />
      <Sparkle x={370} y={385} s={1.1} c="#FFB547" delay={-2} />
      <Sparkle x={510} y={290} s={0.8} c="#8C6BFA" delay={-1.7} />
      <Sparkle x={48} y={300} s={0.8} c="#36B86A" delay={-2.4} />
    </svg>
  );
}