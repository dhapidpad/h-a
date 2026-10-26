import React, { useEffect, useId, useState } from 'react';

/**
 * Cán cân quản lý đất bền vững: kiểm tra đất → điều chỉnh pH → bổ sung hữu cơ → bón cân đối (4 đúng).
 *
 * Props
 * - width:     chiều rộng (số px hoặc '100%', '32rem'...). Mặc định '100%'.
 * - height:    chiều cao. Mặc định 'auto' (giữ tỉ lệ 540:460).
 * - maxWidth:  giới hạn chiều rộng (tuỳ chọn).
 * - animated:  bật/tắt chuyển động (mặc định true). Tự tắt khi người dùng bật "reduce motion".
 * - className, style: truyền thêm cho thẻ <svg>.
 * Ví dụ: <SvgSoilBalance width={560} />
 *
 * Hiệu năng: chuyển động chủ yếu bằng CSS transform/opacity; chỉ 4 hạt dinh dưỡng dùng
 * animateMotion (SMIL). Không còn morph đường `d`. SMIL không tự nghe "reduce motion" nên
 * component đọc media query và ngắt hạt khi cần.
 */

const W = 540;
const H = 460;
const FONT = "'Be Vietnam Pro','Segoe UI',Roboto,system-ui,sans-serif";

const BLADES = Array.from({ length: 70 }, (_, i) => {
  const x = 24 + i * 7.1;
  const h = 8 + ((i * 37) % 8);
  const lean = ((i * 13) % 7) - 3;
  return `M${x.toFixed(1)} 0Q${(x + lean * 0.4).toFixed(1)} ${-h / 2} ${(x + lean).toFixed(1)} ${-h}`;
});
const SPECKS = Array.from({ length: 80 }, (_, i) => ({
  x: 28 + ((i * 97) % 484),
  y: 210 + ((i * 53) % 190),
  r: 0.9 + (i % 3) * 0.55,
  light: i % 3 === 0,
}));
const PORES = [[72, 262, 11], [232, 222, 8], [330, 276, 10], [470, 252, 12], [250, 312, 9], [60, 372, 8], [400, 372, 9], [160, 345, 10]];
const MICROBES = [[60, 300, 20], [160, 322, -30], [300, 308, 40], [372, 298, -15], [470, 304, 10], [250, 336, 60], [92, 262, -45], [484, 262, 25]];

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(m.matches);
    const h = (e) => setReduce(e.matches);
    if (m.addEventListener) m.addEventListener('change', h);
    return () => m.removeEventListener && m.removeEventListener('change', h);
  }, []);
  return reduce;
}

function Pill({ x, y, w, color, children }) {
  return (
    <g>
      <rect x={x} y={y + 2} width={w} height="22" rx="11" fill="#0F172A" opacity=".12" />
      <rect x={x} y={y} width={w} height="22" rx="11" fill="#fff" opacity=".96" />
      <circle cx={x + 11} cy={y + 11} r="4.5" fill={color} />
      <circle cx={x + 9.8} cy={y + 9.6} r="1.4" fill="#fff" opacity=".7" />
      <text x={x + 21} y={y + 15.5} fontSize="12.5" fontWeight="700" fill="#1E293B">{children}</text>
    </g>
  );
}

function Chip({ x, w, color, label }) {
  return (
    <g transform={`translate(${x},418)`}>
      <rect y="2.5" width={w} height="32" rx="16" fill="#0F172A" opacity=".1" />
      <rect width={w} height="32" rx="16" fill="#fff" stroke={color} strokeWidth="1.6" />
      <rect x="3" y="2" width={w - 6} height="12" rx="6" fill="#fff" opacity=".7" />
      <circle cx="16" cy="16" r="9" fill={color} />
      <path d="M11.5 16.2l3.2 3.2l5.8-6.4" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="31" y="20.5" fontSize="13" fontWeight="800" fill="#0F172A">{label}</text>
    </g>
  );
}

function Particle({ letter, color, path, dur, begin, start, motion, fs = 12, r = 8 }) {
  return (
    <g transform={motion ? undefined : `translate(${start[0]} ${start[1]})`}>
      <circle r={r + 3} fill={color} opacity=".25" />
      <circle r={r} fill={color} stroke="#fff" strokeWidth="1.3" />
      <circle cx={-r * 0.3} cy={-r * 0.35} r={r * 0.3} fill="#fff" opacity=".5" />
      <text y={fs * 0.35} textAnchor="middle" fontSize={fs} fontWeight="800" fill="#fff">{letter}</text>
      {motion && <animateMotion path={path} dur={dur} begin={begin} repeatCount="indefinite" />}
    </g>
  );
}

function Plant({ x, u }) {
  return (
    <g transform={`translate(${x},200) scale(.85)`}>
      <ellipse cx="0" cy="1" rx="16" ry="3" fill="#052E16" opacity=".25" />
      <g className="sb-sway">
        <path d="M0 0Q-3-18 0-38" fill="none" stroke="#15803D" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M0-14Q-17-18-21-31Q-6-29 0-14Z" fill={u('leaf')} stroke="#16A34A" strokeWidth=".8" />
        <path d="M0-23Q17-27 21-40Q6-38 0-23Z" fill={u('leaf')} stroke="#16A34A" strokeWidth=".8" />
        <path d="M0-37Q-7-47 0-55Q7-47 0-37Z" fill="#22C55E" stroke="#15803D" strokeWidth=".8" />
        <path d="M-15-23Q-9-24-4-20M12-31Q8-30 4-27" stroke="#fff" strokeOpacity=".5" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    </g>
  );
}

export default function SvgSoilBalance({
  width = '100%',
  height = 'auto',
  maxWidth,
  animated = true,
  className,
  style,
}) {
  const reduce = usePrefersReducedMotion();
  const motion = animated && !reduce;
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const n = (s) => `sb-${rawId}-${s}`;
  const u = (s) => `url(#${n(s)})`;

  return (
    <svg
      className={`${motion ? 'sb-anim' : ''}${className ? ` ${className}` : ''}`}
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      role="img"
      aria-label="Sơ đồ cân bằng dinh dưỡng đất: kiểm tra đất, điều chỉnh pH, bổ sung hữu cơ và bón phân theo nguyên tắc 4 đúng"
      fontFamily={FONT}
      style={{ display: 'block', maxWidth: maxWidth ?? '100%', aspectRatio: `${W} / ${H}`, borderRadius: 22, ...style }}
    >
      <defs>
        <linearGradient id={n('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDEEFF" /><stop offset=".42" stopColor="#EEF9F1" /><stop offset="1" stopColor="#F1F5F9" />
        </linearGradient>
        <linearGradient id={n('top')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4A3326" /><stop offset="1" stopColor="#68472F" /></linearGradient>
        <linearGradient id={n('sub')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7A5A42" /><stop offset="1" stopColor="#93704F" /></linearGradient>
        <linearGradient id={n('clay')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A98160" /><stop offset="1" stopColor="#C09A72" /></linearGradient>
        <linearGradient id={n('depth')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".28" />
        </linearGradient>
        <linearGradient id={n('side')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".14" /><stop offset=".08" stopColor="#fff" stopOpacity="0" />
          <stop offset=".92" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".2" />
        </linearGradient>
        <linearGradient id={n('metal')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F1F5F9" /><stop offset="1" stopColor="#94A3B8" /></linearGradient>
        <linearGradient id={n('beam')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7C8DA3" /><stop offset="1" stopColor="#334155" /></linearGradient>
        <linearGradient id={n('post')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#8FA0B5" /><stop offset=".5" stopColor="#64748B" /><stop offset="1" stopColor="#334155" /></linearGradient>
        <linearGradient id={n('leaf')} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#86EFAC" /><stop offset="1" stopColor="#22C55E" /></linearGradient>
        <linearGradient id={n('grass')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4ADE80" /><stop offset="1" stopColor="#22A25A" /></linearGradient>
        <radialGradient id={n('sun')} cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#FFFBEB" /><stop offset=".5" stopColor="#FEF08A" /><stop offset="1" stopColor="#FACC15" /></radialGradient>
        <radialGradient id={n('sunGlow')}><stop offset="0" stopColor="#FEF08A" stopOpacity=".6" /><stop offset="1" stopColor="#FEF08A" stopOpacity="0" /></radialGradient>
        <clipPath id={n('soilClip')}><rect x="20" y="200" width="500" height="210" rx="20" /></clipPath>
        <filter id={n('shadow')} x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#1C1208" floodOpacity=".28" />
        </filter>

        <style>{`
          .sb-sun,.sb-cloud,.sb-sway,.sb-beam,.sb-pan,.sb-mic,.sb-worm,.sb-grass,.sb-flow{will-change:auto}
          .sb-anim .sb-sun{transform-box:fill-box;transform-origin:center;animation:sbSpin 48s linear infinite}
          .sb-anim .sb-cloud{animation:sbDrift 22s ease-in-out infinite}
          .sb-anim .sb-cloud.b{animation-duration:28s;animation-delay:-9s}
          .sb-anim .sb-sway{transform-origin:0 0;animation:sbSway 4.6s ease-in-out infinite}
          .sb-anim .sb-beam{transform-origin:0 0;animation:sbBeam 6s ease-in-out infinite}
          .sb-anim .sb-pan{transform-origin:0 0;animation:sbPan 6s ease-in-out infinite}
          .sb-anim .sb-mic{animation:sbMic 3s ease-in-out infinite}
          .sb-anim .sb-worm{transform-origin:200px 250px;animation:sbWorm 3.2s ease-in-out infinite}
          .sb-anim .sb-grass{animation:sbGrass 3.4s ease-in-out infinite}
          .sb-anim .sb-flow{animation:sbFlow 2s linear infinite}
          @keyframes sbSpin{to{transform:rotate(360deg)}}
          @keyframes sbDrift{0%,100%{transform:translateX(0)}50%{transform:translateX(18px)}}
          @keyframes sbSway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
          @keyframes sbBeam{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(4deg)}}
          @keyframes sbPan{0%,100%{transform:rotate(5deg)}50%{transform:rotate(-4deg)}}
          @keyframes sbMic{0%,100%{transform:translate(0,0)}50%{transform:translate(4px,-3px)}}
          @keyframes sbWorm{0%,100%{transform:rotate(-2deg) scaleY(1)}50%{transform:rotate(2deg) scaleY(1.08)}}
          @keyframes sbGrass{0%,100%{transform:translateX(0)}50%{transform:translateX(1.5px)}}
          @keyframes sbFlow{to{stroke-dashoffset:-14}}
        `}</style>
      </defs>

      <rect width={W} height={H} rx="22" fill={u('sky')} stroke="#86EFAC" strokeWidth="1.5" />

      {/* ============ BẦU TRỜI ============ */}
      <text x="22" y="28" fontSize="16" fontWeight="800" fill="#0F172A">Cán cân quản lý đất bền vững</text>
      <text x="22" y="46" fontSize="12.5" fontWeight="700" fill="#174B37">Kiểm tra → Điều chỉnh pH → Bổ sung hữu cơ → Bón cân đối</text>

      <g transform="translate(494,38)">
        <circle r="44" fill={u('sunGlow')} />
        <g className="sb-sun">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="0" y1="-24" x2="0" y2="-31" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle r="18" fill={u('sun')} />
        <ellipse cx="-5" cy="-7" rx="6" ry="3.2" fill="#fff" opacity=".6" />
      </g>
      {[[400, 30, 1, ''], [350, 112, 0.55, 'b']].map(([x, y, s, c], i) => (
        <g key={i} transform={`translate(${x},${y}) scale(${s})`} opacity={i ? 0.75 : 0.92}>
          <g className={`sb-cloud ${c}`} fill="#fff">
            <ellipse cx="0" cy="0" rx="26" ry="9" /><circle cx="-10" cy="-7" r="9" /><circle cx="6" cy="-10" r="11" />
            <ellipse cx="0" cy="4" rx="24" ry="4" fill="#E2E8F0" opacity=".6" />
          </g>
        </g>
      ))}

      {/* ============ CÁN CÂN ============ */}
      <ellipse cx="270" cy="200" rx="46" ry="5" fill="#052E16" opacity=".25" />
      <rect x="236" y="194" width="68" height="11" rx="5.5" fill={u('post')} />
      <rect x="240" y="195" width="60" height="3" rx="1.5" fill="#fff" opacity=".35" />
      <polygon points="258,196 282,196 274,76 266,76" fill={u('post')} />
      <polygon points="262,196 266,196 268,76 266,76" fill="#fff" opacity=".18" />
      <rect x="228" y="118" width="84" height="24" rx="12" fill="#0B6B2E" opacity=".3" transform="translate(0 2)" />
      <rect x="228" y="116" width="84" height="24" rx="12" fill="#16A34A" />
      <rect x="231" y="117" width="78" height="9" rx="4.5" fill="#fff" opacity=".22" />
      <text x="270" y="132.5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">Bón cân đối</text>

      <g transform="translate(270,70)">
        <g className="sb-beam">
          <rect x="-168" y="-3" width="336" height="10" rx="5" fill="#0F172A" opacity=".18" />
          <rect x="-168" y="-4" width="336" height="9" rx="4.5" fill={u('beam')} />
          <rect x="-164" y="-3" width="328" height="2.6" rx="1.3" fill="#fff" opacity=".35" />
          <circle cx="-168" cy="0" r="5" fill="#CBD5E1" stroke="#64748B" /><circle cx="168" cy="0" r="5" fill="#CBD5E1" stroke="#64748B" />

          {/* Đĩa trái */}
          <g transform="translate(-160,2)">
            <g className="sb-pan">
              <line x1="0" y1="0" x2="-40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="0" y1="0" x2="40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <rect x="-24" y="8" width="48" height="40" rx="5" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.4" />
              <rect x="-24" y="8" width="48" height="9" rx="4" fill="#E2E8F0" />
              <line x1="-20" y1="12.5" x2="20" y2="12.5" stroke="#94A3B8" strokeDasharray="2 2" strokeWidth=".9" />
              <rect x="-24" y="24" width="48" height="13" fill="#2563EB" />
              <rect x="-24" y="24" width="48" height="4" fill="#fff" opacity=".25" />
              <text y="34.5" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">UREA</text>
              <text y="45.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E293B">46% N</text>
              {[[-30, 46], [28, 46], [-34, 44], [33, 44]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill="#fff" stroke="#CBD5E1" strokeWidth=".6" />)}
              <path d="M-42 48Q0 68 42 48Z" fill={u('metal')} stroke="#64748B" strokeWidth="1" />
              <path d="M-36 50Q0 60 36 50" fill="none" stroke="#fff" strokeWidth="1.4" opacity=".6" strokeLinecap="round" />
              <text y="64" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#1E293B">Đạm N</text>
            </g>
          </g>

          {/* Đĩa phải */}
          <g transform="translate(160,2)">
            <g className="sb-pan">
              <line x1="0" y1="0" x2="-40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <line x1="0" y1="0" x2="40" y2="48" stroke="#94A3B8" strokeWidth="1.6" />
              <rect x="-36" y="14" width="34" height="34" rx="5" fill="#8A654A" stroke="#5B4030" strokeWidth="1.2" />
              <rect x="-36" y="14" width="34" height="8" rx="4" fill="#fff" opacity=".14" />
              <path d="M-19 20Q-27 26-19 34Q-11 26-19 20Z" fill="#86EFAC" />
              <text x="-19" y="44" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">HỮU CƠ</text>
              <rect x="2" y="22" width="32" height="26" rx="5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.4" />
              <rect x="2" y="30" width="32" height="8" fill="#38BDF8" />
              <text x="18" y="36.5" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff">VÔI</text>
              <text x="18" y="45.5" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#475569">pH ↑</text>
              <path d="M-42 48Q0 68 42 48Z" fill={u('metal')} stroke="#64748B" strokeWidth="1" />
              <path d="M-36 50Q0 60 36 50" fill="none" stroke="#fff" strokeWidth="1.4" opacity=".6" strokeLinecap="round" />
              <text y="64" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#1E293B">Hữu cơ + Vôi</text>
            </g>
          </g>
        </g>
        <circle r="10" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
        <circle cx="-3" cy="-3.5" r="3" fill="#fff" opacity=".55" />
        <circle r="3" fill="#78350F" />
      </g>

      <Plant x={135} u={u} />
      <Plant x={405} u={u} />

      {/* ============ LÁT CẮT ĐẤT ============ */}
      <rect x="20" y="200" width="500" height="210" rx="20" fill="#3A281E" filter={u('shadow')} />
      <g clipPath={u('soilClip')}>
        <rect x="20" y="200" width="500" height="210" fill={u('top')} />
        <path d="M20 290Q100 280 180 292T340 290T520 286L520 410L20 410Z" fill={u('sub')} />
        <path d="M20 356Q120 346 220 358T400 354T520 358L520 410L20 410Z" fill={u('clay')} />
        {SPECKS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.light ? '#B8906C' : '#2E1F16'} opacity={s.light ? 0.35 : 0.4} />)}
        {PORES.map(([x, y, r], i) => (
          <g key={i}><circle cx={x} cy={y} r={r} fill="#7B5842" /><ellipse cx={x + 1} cy={y + 1.5} rx={r * 0.62} ry={r * 0.5} fill="#33241B" opacity=".6" /></g>
        ))}
        {[[84, 392, 19, 10], [300, 388, 22, 11], [470, 394, 16, 9]].map(([x, y, rx, ry], i) => (
          <g key={i}><ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#A8A29E" /><ellipse cx={x - rx * 0.3} cy={y - ry * 0.3} rx={rx * 0.45} ry={ry * 0.35} fill="#D6D3D1" opacity=".8" /></g>
        ))}

        <path d="M196 250L362 250M300 250Q314 275 306 300" stroke="#3A281E" strokeWidth="24" strokeLinecap="round" fill="none" opacity=".7" />

        <g fill="none" stroke="#FDE68A" strokeLinecap="round">
          <path d="M135 200Q128 240 110 292" strokeWidth="2.8" />
          <path d="M131 228Q150 258 168 288" strokeWidth="2.4" />
          <path d="M122 262Q108 270 96 272" strokeWidth="1.5" />
          <path d="M143 250Q156 252 164 262" strokeWidth="1.5" />
          <path d="M405 200Q412 240 430 292" strokeWidth="2.8" />
          <path d="M409 228Q390 258 372 288" strokeWidth="2.4" />
          <path d="M418 262Q432 270 444 272" strokeWidth="1.5" />
          <path d="M397 250Q384 252 376 262" strokeWidth="1.5" />
        </g>

        <g className="sb-flow" fill="none" stroke="#FFF7D6" strokeWidth="1.1" strokeDasharray="3 4" opacity=".6">
          <path d="M110 292Q150 300 198 262" />
          <path d="M168 288Q185 280 198 262" />
          <path d="M372 288Q360 280 358 262" />
          <path d="M430 292Q390 305 360 262" />
        </g>

        {MICROBES.map(([x, y, a], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="sb-mic" style={{ animationDelay: `${-(i % 4) * 0.7}s` }}>
              <g transform={`rotate(${a})`}>
                <rect x="-5" y="-2.4" width="10" height="4.8" rx="2.4" fill="#86EFAC" stroke="#16A34A" strokeWidth=".8" />
                <line x1="5" y1="0" x2="8" y2="-2" stroke="#16A34A" strokeWidth=".7" />
              </g>
            </g>
          </g>
        ))}

        <Particle letter="N" color="#16A36A" path="M200 322Q150 314 112 294" start={[200, 322]} dur="4s" begin="0s" motion={motion} />
        <Particle letter="P" color="#7862E8" path="M290 300Q220 304 168 290" start={[290, 300]} dur="5s" begin="1s" motion={motion} />
        <Particle letter="K" color="#E8A13A" path="M330 322Q362 308 372 290" start={[330, 322]} dur="4.5s" begin=".5s" motion={motion} />
        <Particle letter="Ca" color="#0D9488" path="M470 312Q452 302 430 294" start={[470, 312]} dur="5.5s" begin="2s" motion={motion} fs={10.5} r={9} />

        {/* giun đất */}
        <g className="sb-worm">
          <path stroke="#FB7185" strokeWidth="14" strokeLinecap="round" fill="none" d="M200 250Q225 232 250 250T300 250T350 250" />
          <path stroke="#BE123C" strokeOpacity=".35" strokeWidth="14" strokeDasharray="1.4 9" fill="none" d="M200 250Q225 232 250 250T300 250T350 250" />
          <path stroke="#fff" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" fill="none" d="M206 246Q225 229 250 246T300 246T346 246" />
          <circle cx="200" cy="250" r="10" fill="#FB7185" />
          <circle cx="196" cy="248" r="2.6" fill="#fff" /><circle cx="196" cy="248" r="1.3" fill="#17243A" />
          <path d="M193 254Q197 258 202 254" fill="none" stroke="#17243A" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="193" cy="252" r="2" fill="#FDA4AF" />
          <path d="M189 245A11 11 0 0 1 211 245Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="1" />
          <rect x="187" y="244" width="26" height="3.2" rx="1.6" fill="#EAB308" />
          <path d="M200 234V245" stroke="#CA8A04" strokeWidth="1.4" />
          <circle cx="190" cy="243" r="2" fill="#FEF9C3" stroke="#CA8A04" strokeWidth=".6" />
        </g>
        <rect x="208" y="209" width="104" height="21" rx="10.5" fill="#fff" />
        <path d="M214 229L208 238L226 229Z" fill="#fff" />
        <text x="260" y="223.5" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#174B37">Cấu trúc đất tốt</text>

        <rect x="20" y="200" width="500" height="210" fill={u('depth')} />
        <rect x="20" y="200" width="500" height="210" fill={u('side')} />
      </g>

      <rect x="20" y="195" width="500" height="13" rx="6.5" fill={u('grass')} />
      <rect x="24" y="196" width="492" height="3.5" rx="1.7" fill="#fff" opacity=".35" />
      <g transform="translate(0,198)">
        <g className="sb-grass" stroke="#22A25A" strokeWidth="1.6" strokeLinecap="round" fill="none">
          {BLADES.map((d, i) => <path key={i} d={d} />)}
        </g>
      </g>

      <Pill x={28} y={216} w={100} color="#8A654A">Mùn hữu cơ</Pill>
      <Pill x={28} y={332} w={128} color="#22C55E">Vi sinh vật đất</Pill>
      <Pill x={404} y={216} w={110} color="#38BDF8">Theo dõi pH</Pill>
      <Pill x={392} y={332} w={122} color="#FB7185">Độ thoáng khí</Pill>

      {/* ============ QUY TẮC 4 ĐÚNG ============ */}
      <rect x="14" y="420" width="84" height="32" rx="16" fill="#0B6B2E" opacity=".3" />
      <rect x="14" y="418" width="84" height="32" rx="16" fill="#16A34A" />
      <rect x="17" y="419" width="78" height="12" rx="6" fill="#fff" opacity=".2" />
      <text x="56" y="431" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#DCFCE7">Quy tắc</text>
      <text x="56" y="443.5" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">4 ĐÚNG</text>
      <Chip x={104} w={102} color="#16A34A" label="Đúng loại" />
      <Chip x={211} w={102} color="#2563EB" label="Đúng liều" />
      <Chip x={318} w={102} color="#D97706" label="Đúng lúc" />
      <Chip x={425} w={104} color="#E11D48" label="Đúng cách" />
    </svg>
  );
}