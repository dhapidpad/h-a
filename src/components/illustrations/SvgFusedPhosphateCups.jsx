import React, { useId } from 'react';

/**
 * Lân nung chảy (Slide 11) — bản remake: so sánh nước trung tính và môi trường acid yếu
 * (axit hữu cơ vùng rễ / axit citric 2%).
 *
 * Nội dung giữ đúng tinh thần Master Spec mục 5 (Slide 11) & 6.3:
 * - Không dùng câu tuyệt đối ("trơ đáy", "đặc trị"...). Chỉ nói "ít tan" / "hòa tan P hữu hiệu".
 * - Thành phần ghi là mức tham khảo, tuỳ nhà sản xuất; luôn nhắc xem nhãn sản phẩm.
 * - ID trong <defs> dùng useId() để không xung đột khi mở Lightbox.
 *
 * Props
 * - width:     chiều rộng (số px hoặc '100%', '36rem'...). Mặc định '100%'.
 * - height:    chiều cao. Mặc định 'auto' (giữ tỉ lệ 600:618).
 * - maxWidth:  giới hạn chiều rộng (tuỳ chọn).
 * - animated:  bật/tắt chuyển động (mặc định true). Tự tắt khi bật "reduce motion".
 * - className, style: truyền thêm cho thẻ <svg>.
 * Ví dụ: <SvgFusedPhosphateCups width={600} />
 *
 * Hiệu năng: toàn bộ chuyển động bằng CSS (transform/opacity), không SMIL, không blur động;
 * chỉ có một filter đổ bóng tĩnh dùng chung.
 */

const W = 600;
const H = 618;
const FONT = "'Be Vietnam Pro','Segoe UI',Roboto,system-ui,sans-serif";

const GLASS = 'M-66 0L-52 190Q0 204 52 190L66 0Z';
const LIQ = 'M-63 40L-51.5 187Q0 200 51.5 187L63 40Z';

const Txt = ({ x, y, size = 13, weight = 700, fill = '#1E293B', anchor, spacing, children }) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} letterSpacing={spacing}>
    {children}
  </text>
);

/* Mảnh thủy tinh silicat: đa giác góc cạnh + mặt sáng */
function Grain({ x, y, s = 1, rot = 0, u, lit = false }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {lit && <circle r="15" fill={u('glow')} />}
      <polygon points="-8,-2 -3,-8 7,-6 10,2 3,8 -6,7" fill={u(lit ? 'grainLit' : 'grain')} stroke={lit ? '#6D28D9' : '#334155'} strokeWidth=".8" strokeLinejoin="round" />
      <polygon points="-8,-2 -3,-8 1,-1" fill="#fff" opacity={lit ? 0.5 : 0.4} />
      <polygon points="1,-1 7,-6 10,2" fill="#fff" opacity=".12" />
      <polygon points="1,-1 10,2 3,8 -6,7" fill="#000" opacity=".16" />
    </g>
  );
}

/* Cốc thủy tinh 3D: bóng, vành sau, nội dung (cắt theo lòng cốc), phản chiếu, vành trước, đế, vạch chia */
function Cup({ cx, y, tint, rim, u, children, overlay }) {
  return (
    <g transform={`translate(${cx} ${y})`}>
      <ellipse cx="3" cy="208" rx="76" ry="9" fill="#0F172A" opacity=".18" />
      <ellipse cx="0" cy="0" rx="66" ry="10" fill="#fff" opacity=".55" stroke={rim} strokeWidth="1.5" />
      <path d={GLASS} fill={tint} opacity=".35" />
      <g clipPath={u('clip')}>{children}</g>
      <path d={GLASS} fill={u('sheen')} />
      <path d="M-58 12L-47 176" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".75" />
      <path d="M52 14L44 160" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity=".5" />
      <g stroke={rim} strokeWidth="1.3" opacity=".55" strokeLinecap="round">
        {[60, 90, 120, 150].map((t) => {
          const hw = 66 - (14 * t) / 190;
          return <path key={t} d={`M${hw - 12} ${t}H${hw - 2}`} />;
        })}
      </g>
      <path d="M-66 0A66 10 0 0 0 66 0" fill="none" stroke={rim} strokeWidth="2.6" />
      <path d={GLASS} fill="none" stroke={rim} strokeWidth="3" strokeLinejoin="round" />
      <path d="M-52 190Q0 204 52 190" fill="none" stroke="#fff" strokeWidth="2" opacity=".7" strokeLinecap="round" transform="translate(0 -4)" />
      <ellipse cx="0" cy="0" rx="66" ry="10" fill="none" stroke="#fff" strokeWidth="1" opacity=".8" transform="translate(0 -1)" />
      {overlay}
    </g>
  );
}

function PhBar({ cx, y, pos, u, color }) {
  const x0 = cx - 70;
  return (
    <g>
      <rect x={x0} y={y} width="140" height="8" rx="4" fill={u('ph')} />
      <rect x={x0} y={y} width="140" height="3" rx="1.5" fill="#fff" opacity=".35" />
      <g transform={`translate(${x0 + 140 * pos} ${y + 4})`}>
        <circle r="7" fill="#fff" stroke={color} strokeWidth="2.4" />
        <circle r="2.6" fill={color} />
      </g>
      <Txt x={x0} y={y + 22} size={11.5} weight={700} fill="#64748B">0</Txt>
      <Txt x={x0 + 70} y={y + 22} size={11.5} weight={700} fill="#64748B" anchor="middle">7</Txt>
      <Txt x={x0 + 140} y={y + 22} size={11.5} weight={700} fill="#64748B" anchor="end">14</Txt>
    </g>
  );
}

export default function SvgFusedPhosphateCups({
  width = '100%',
  height = 'auto',
  maxWidth,
  animated = true,
  className,
  style,
}) {
  const rid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const n = (s) => `fp-${rid}-${s}`;
  const u = (s) => `url(#${n(s)})`;

  const LX = 155;
  const RX = 445;
  const CY = 214;

  return (
    <svg
      className={`${animated ? 'fp-anim' : ''}${className ? ` ${className}` : ''}`}
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      role="img"
      aria-label="So sánh độ hòa tan của phân lân nung chảy trong nước trung tính và trong môi trường acid yếu"
      fontFamily={FONT}
      style={{ display: 'block', maxWidth: maxWidth ?? '100%', aspectRatio: `${W} / ${H}`, borderRadius: 24, ...style }}
    >
      <defs>
        <linearGradient id={n('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F9FF" /><stop offset=".5" stopColor="#FFFFFF" /><stop offset="1" stopColor="#F6F0FF" />
        </linearGradient>
        <radialGradient id={n('auroraB')}><stop offset="0" stopColor="#7DD3FC" stopOpacity=".35" /><stop offset="1" stopColor="#7DD3FC" stopOpacity="0" /></radialGradient>
        <radialGradient id={n('auroraV')}><stop offset="0" stopColor="#A78BFA" stopOpacity=".33" /><stop offset="1" stopColor="#A78BFA" stopOpacity="0" /></radialGradient>
        <pattern id={n('dots')} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#6366F1" opacity=".1" />
        </pattern>
        <linearGradient id={n('cardL')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F2FAFF" /><stop offset="1" stopColor="#FFFFFF" /></linearGradient>
        <linearGradient id={n('cardR')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F6F1FF" /><stop offset="1" stopColor="#FFFFFF" /></linearGradient>
        <linearGradient id={n('water')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E7F6FF" /><stop offset="1" stopColor="#6CC6F6" /></linearGradient>
        <linearGradient id={n('sap')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F5EDFF" /><stop offset="1" stopColor="#B99BFA" /></linearGradient>
        <linearGradient id={n('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".5" /><stop offset=".25" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".7" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#64748B" stopOpacity=".18" />
        </linearGradient>
        <linearGradient id={n('gloss')} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <linearGradient id={n('ph')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#EF4444" /><stop offset=".25" stopColor="#F59E0B" /><stop offset=".5" stopColor="#22C55E" /><stop offset=".75" stopColor="#38BDF8" /><stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={n('band')} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#ECFDF5" /><stop offset="1" stopColor="#F0FDF4" /></linearGradient>
        <radialGradient id={n('grain')} cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#A9B6C8" /><stop offset="1" stopColor="#3F4D63" /></radialGradient>
        <radialGradient id={n('grainLit')} cx=".35" cy=".3" r=".9"><stop offset="0" stopColor="#DDD2FF" /><stop offset="1" stopColor="#8C6BFA" /></radialGradient>
        <radialGradient id={n('glow')}><stop offset="0" stopColor="#A78BFA" stopOpacity=".6" /><stop offset="1" stopColor="#A78BFA" stopOpacity="0" /></radialGradient>
        <radialGradient id={n('ionP')} cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#D8CCFF" /><stop offset="1" stopColor="#6D28D9" /></radialGradient>
        <radialGradient id={n('ionCa')} cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#99F6E4" /><stop offset="1" stopColor="#0F766E" /></radialGradient>
        <radialGradient id={n('ionMg')} cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#FDE68A" /><stop offset="1" stopColor="#D97706" /></radialGradient>
        <filter id={n('shadow')} x="-8%" y="-6%" width="116%" height="116%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#312E81" floodOpacity=".12" />
        </filter>
        <clipPath id={n('clip')}><path d="M-66 -4L-51.5 187Q0 200 51.5 187L66 -4Z" /></clipPath>

        <style>{`
          @media (prefers-reduced-motion:no-preference){
            .fp-anim .fp-float{animation:fpFloat 4.4s ease-in-out infinite}
            .fp-anim .fp-wave{animation:fpWave 3.4s ease-in-out infinite}
            .fp-anim .fp-sway{transform-origin:0 0;animation:fpSway 5s ease-in-out infinite}
            .fp-anim .fp-pulse{transform-box:fill-box;transform-origin:center;animation:fpPulse 2.4s ease-in-out infinite}
            .fp-anim .fp-rain{animation:fpRain 2.4s ease-in infinite}
            .fp-anim .fp-bub{animation:fpBub 4s ease-in infinite}
            .fp-anim .fp-ion{animation:fpIon 4.2s ease-in-out infinite}
            .fp-anim .fp-drip{animation:fpDrip 3.2s ease-in infinite}
            .fp-anim .fp-ring{transform-box:fill-box;transform-origin:center;animation:fpRing 2.6s ease-out infinite}
            .fp-anim .fp-vs{transform-box:fill-box;transform-origin:center;animation:fpVs 3.6s ease-in-out infinite}
          }
          .fp-ion,.fp-rain,.fp-drip,.fp-bub{opacity:1}
          @keyframes fpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
          @keyframes fpWave{0%,100%{transform:translateX(0)}50%{transform:translateX(-10px)}}
          @keyframes fpSway{0%,100%{transform:rotate(-1.4deg)}50%{transform:rotate(1.4deg)}}
          @keyframes fpPulse{0%,100%{transform:scale(1);opacity:.85}50%{transform:scale(1.25);opacity:1}}
          @keyframes fpRain{0%{transform:translateY(0);opacity:0}12%{opacity:.95}85%{opacity:.95}100%{transform:translateY(86px);opacity:0}}
          @keyframes fpBub{0%{transform:translateY(0);opacity:0}15%{opacity:.85}100%{transform:translateY(-110px);opacity:0}}
          @keyframes fpIon{0%{transform:translateY(0);opacity:0}15%{opacity:1}75%{opacity:1}100%{transform:translateY(-56px);opacity:0}}
          @keyframes fpDrip{0%{transform:translateY(0);opacity:0}15%{opacity:1}100%{transform:translateY(74px);opacity:0}}
          @keyframes fpRing{0%{transform:scale(.6);opacity:.8}100%{transform:scale(1.9);opacity:0}}
          @keyframes fpVs{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        `}</style>
      </defs>

      {/* ============ NỀN & TIÊU ĐỀ ============ */}
      <rect width={W} height={H} rx="24" fill={u('bg')} stroke="#DDD6FE" strokeWidth="1.5" />
      <ellipse cx="90" cy="120" rx="260" ry="170" fill={u('auroraB')} />
      <ellipse cx="520" cy="140" rx="260" ry="170" fill={u('auroraV')} />
      <rect width={W} height={H} rx="24" fill={u('dots')} />
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="23" fill="none" stroke="#fff" strokeWidth="2" opacity=".9" />

      <rect x="24" y="18" width="276" height="26" rx="13" fill="#fff" stroke="#DDD6FE" />
      <circle cx="40" cy="31" r="4.5" fill="#8B5CF6" />
      <Txt x={52} y={35.5} size={12.5} weight={900} fill="#5B21B6" spacing={1}>AGRI SCIENCE / LÂN NUNG CHẢY</Txt>
      <Txt x={24} y={72} size={25} weight={900} fill="#1E1B4B" spacing={-0.5}>Lân nung chảy và độ hòa tan của P</Txt>
      <Txt x={25} y={90} size={13} weight={500} fill="#5B6478">So sánh nước trung tính với môi trường acid yếu vùng rễ</Txt>

      {/* ============ THẺ TRÁI: NƯỚC TRUNG TÍNH ============ */}
      <rect x="20" y="102" width="270" height="378" rx="22" fill={u('cardL')} stroke="#BAE6FD" strokeWidth="1.5" filter={u('shadow')} />
      <rect x="22" y="104" width="266" height="50" rx="20" fill={u('gloss')} opacity=".6" />
      <g transform="translate(40 114)">
        <rect width="230" height="32" rx="16" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M20 8C25 14 27 17 27 20A7 7 0 0 1 13 20C13 17 16 14 20 8Z" fill="#38BDF8" />
        <ellipse cx="17.5" cy="19" rx="1.8" ry="2.8" fill="#fff" opacity=".7" />
        <Txt x={36} y={21} size={12.5} weight={800} fill="#0369A1" spacing={0.4}>NƯỚC TRUNG TÍNH</Txt>
      </g>

      {/* mây + mưa */}
      <g transform={`translate(${LX} ${CY - 62})`}>
        <g fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1.4">
          <circle cx="-18" cy="0" r="12" /><circle cx="2" cy="-6" r="15" /><circle cx="22" cy="0" r="11" />
          <rect x="-30" y="0" width="64" height="12" rx="6" stroke="none" />
        </g>
        <ellipse cx="2" cy="-12" rx="9" ry="3.5" fill="#fff" opacity=".7" />
      </g>
      {[-20, 0, 20].map((dx, i) => (
        <g key={dx} transform={`translate(${LX + dx} ${CY - 44})`}>
          <ellipse className="fp-rain" style={{ animationDelay: `${i * 0.7}s` }} rx="2.4" ry="4.8" fill="#38BDF8" />
        </g>
      ))}

      <Cup cx={LX} y={CY} tint="#BAE6FD" rim="#38BDF8" u={u}>
        <rect x="-70" y="-6" width="140" height="210" fill={u('water')} opacity=".9" />
        <g className="fp-wave">
          <path d="M-90 40Q-70 33-50 40T-10 40T30 40T70 40T110 40V64H-90Z" fill="#BAE6FD" opacity=".95" />
          <path d="M-90 40Q-70 33-50 40T-10 40T30 40T70 40T110 40" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".9" />
        </g>
        {[-30, -4, 24].map((dx, i) => (
          <circle key={dx} className="fp-bub" style={{ animationDelay: `${i * 1.1}s` }} cx={dx} cy="176" r="2.6" fill="#fff" opacity=".8" />
        ))}
        {[[-38, 176, 1.05, 12], [-18, 184, 1.2, -20], [6, 180, 1.1, 30], [28, 184, 1.15, -8], [44, 174, 0.95, 40], [-4, 168, 0.9, 70], [-30, 166, 0.85, -40], [18, 166, 0.85, 15]].map(([x, y, s, r], i) => (
          <Grain key={i} x={x} y={y} s={s} rot={r} u={u} />
        ))}
        <g className="fp-float">
          <rect x="-57" y="70" width="114" height="46" rx="13" fill="#fff" opacity=".95" stroke="#7DD3FC" />
          <rect x="-54" y="72" width="108" height="14" rx="7" fill="#fff" />
          <Txt x={0} y={91} size={14} weight={900} fill="#0369A1" anchor="middle">ÍT TAN</Txt>
          <Txt x={0} y={107} size={11.5} weight={700} fill="#0284C7" anchor="middle">thủy tinh silicat</Txt>
        </g>
      </Cup>

      <PhBar cx={LX} y={424} pos={0.5} u={u} color="#16A34A" />
      <g transform={`translate(${LX - 84} 450)`}>
        <rect y="1.5" width="168" height="24" rx="12" fill="#0F172A" opacity=".06" />
        <rect width="168" height="24" rx="12" fill="#F8FAFC" stroke="#CBD5E1" />
        <Txt x={84} y={16.5} size={12.5} weight={700} fill="#475569" anchor="middle">Nước trung tính (pH ~7)</Txt>
      </g>

      {/* ============ THẺ PHẢI: ACID YẾU ============ */}
      <rect x="310" y="102" width="270" height="378" rx="22" fill={u('cardR')} stroke="#C4B5FD" strokeWidth="1.5" filter={u('shadow')} />
      <rect x="312" y="104" width="266" height="50" rx="20" fill={u('gloss')} opacity=".6" />
      <g transform="translate(330 114)">
        <rect width="230" height="32" rx="16" fill="#F3EEFF" stroke="#8C6BFA" strokeWidth="1.5" />
        <path d="M13 24C13 15 19 10 27 9C27 18 22 24 13 24Z" fill="#8C6BFA" />
        <path d="M13 24L22 14" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
        <Txt x={36} y={21} size={12.5} weight={800} fill="#5B21B6" spacing={0.4}>MÔI TRƯỜNG ACID YẾU</Txt>
      </g>

      {/* cây + rễ (phần trên cốc) */}
      <g transform={`translate(${RX} ${CY})`}>
        <g className="fp-sway">
          <path d="M0 4Q-3-20 0-48" stroke="#16A34A" strokeWidth="4.6" strokeLinecap="round" fill="none" />
          <path d="M0-14Q-26-24-34-8Q-14 2 0-14Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.2" />
          <path d="M0-26Q26-38 36-22Q16-10 0-26Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="1.2" />
          <path d="M0-46Q-8-62 4-70Q12-54 0-46Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.2" />
          <path d="M-24-16Q-14-14-6-12M24-24Q14-22 6-20" stroke="#fff" strokeOpacity=".5" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      <Cup cx={RX} y={CY} tint="#DDD6FE" rim="#8C6BFA" u={u}>
        <rect x="-70" y="-6" width="140" height="210" fill={u('sap')} opacity=".9" />
        <g className="fp-wave">
          <path d="M-90 40Q-70 33-50 40T-10 40T30 40T70 40T110 40V64H-90Z" fill="#E4DCFF" opacity=".95" />
          <path d="M-90 40Q-70 33-50 40T-10 40T30 40T70 40T110 40" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".9" />
        </g>

        {/* giọt axit hữu cơ từ rễ rơi xuống hạt */}
        {[[-44, 74, 0], [44, 82, 1.1], [-30, 60, 2.2]].map(([x, y, d], i) => (
          <circle key={i} className="fp-drip" style={{ animationDelay: `${d}s` }} cx={x} cy={y} r="3.6" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
        ))}

        {/* ion đi lên về phía rễ (vẽ trước nhãn) */}
        {[
          [-34, 160, 9, 'ionP', 'H₂PO₄⁻', 0],
          [-6, 164, 7.5, 'ionCa', 'Ca²⁺', 1.0],
          [22, 160, 9, 'ionP', 'H₂PO₄⁻', 2.0],
          [42, 166, 7, 'ionMg', 'Mg²⁺', 3.0],
        ].map(([x, y, r, g, t, d], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="fp-ion" style={{ animationDelay: `${d}s` }}>
              <circle r={r + 3} fill="#fff" opacity=".25" />
              <circle r={r} fill={u(g)} stroke="#fff" strokeWidth="1.2" />
              <circle cx={-r * 0.3} cy={-r * 0.35} r={r * 0.26} fill="#fff" opacity=".6" />
              {t.length < 6 && <Txt x={0} y={3.2} size={8} weight={900} fill="#fff" anchor="middle">{t}</Txt>}
            </g>
          </g>
        ))}

        {/* hạt đang hòa tan (nhỏ dần, phát sáng) */}
        {[[-34, 180, 0.95, 12, 0], [-10, 186, 0.8, -20, 0.5], [16, 182, 0.9, 30, 1], [38, 186, 0.78, -8, 1.5], [-22, 170, 0.6, 40, 0.8], [30, 172, 0.55, 15, 1.2]].map(([x, y, s, r, d], i) => (
          <g key={i} className="fp-pulse" style={{ animationDelay: `${d}s` }}>
            <Grain x={x} y={y} s={s} rot={r} u={u} lit />
          </g>
        ))}

        {/* rễ trong dung dịch */}
        <g className="fp-sway" strokeLinecap="round" fill="none">
          <path d="M0-4Q6 24 -2 52Q-6 74 0 94" stroke="#8A654A" strokeWidth="6" />
          <path d="M2 38Q-20 52-36 62M0 62Q22 72 36 70M-3 80Q-18 90-30 98" stroke="#A47551" strokeWidth="3.2" />
          <path d="M-14 46l-7-5M-26 56l-8-1M-20 53l-4 7M26 68l7-4M32 70l6 4M-12 88l-6-4M-22 94l-8 0" stroke="#D6B896" strokeWidth="1.5" />
        </g>
        <circle className="fp-ring" cx="0" cy="94" r="7" fill="none" stroke="#16A34A" strokeWidth="1.6" />
        <circle className="fp-ring" style={{ animationDelay: '1.3s' }} cx="-30" cy="98" r="5" fill="none" stroke="#16A34A" strokeWidth="1.4" />

        <g className="fp-float">
          <rect x="-52" y="104" width="104" height="26" rx="13" fill="#6D28D9" stroke="#fff" strokeWidth="1.4" />
          <rect x="-49" y="106" width="98" height="9" rx="4.5" fill="#fff" opacity=".2" />
          <circle cx="-38" cy="117" r="6" fill="#fff" />
          <path d="M-41 117l2.2 2.2l4-4.6" stroke="#6D28D9" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <Txt x={6} y={121.5} size={12.5} weight={900} fill="#fff" anchor="middle">HÒA TAN P</Txt>
        </g>
      </Cup>

      <PhBar cx={RX} y={424} pos={0.3} u={u} color="#8C6BFA" />
      <g transform={`translate(${RX - 90} 450)`}>
        <rect y="1.5" width="180" height="24" rx="12" fill="#0F172A" opacity=".06" />
        <rect width="180" height="24" rx="12" fill="#FAF5FF" stroke="#DDD6FE" />
        <Txt x={90} y={16.5} size={12.5} weight={700} fill="#6B21A8" anchor="middle">Acid yếu / axit citric 2%</Txt>
      </g>

      {/* VS */}
      <g transform="translate(300 292)">
        <circle className="fp-vs" r="24" fill="#312E81" opacity=".12" />
        <circle r="20" fill="#fff" stroke="#CBD5E1" strokeWidth="1.5" />
        <circle r="20" fill={u('gloss')} opacity=".6" />
        <Txt x={0} y={5} size={13.5} weight={900} fill="#475569" anchor="middle">VS</Txt>
      </g>

      {/* ============ THÀNH PHẦN THAM KHẢO ============ */}
      <rect x="20" y="492" width="560" height="36" rx="18" fill="#fff" stroke="#E2E8F0" filter={u('shadow')} />
      <Txt x={36} y={507} size={12.5} weight={800} fill="#334155">Thành phần điển hình</Txt>
      <Txt x={36} y={521} size={11.5} weight={600} fill="#64748B">tham khảo, tùy nhà sản xuất</Txt>
      {[
        { x: 200, w: 126, t: 'P₂O₅ hữu hiệu ~15–17%', c: '#6D28D9', bg: '#F3EEFF', st: '#DDD6FE', big: true },
        { x: 334, w: 70, t: 'CaO', c: '#0F766E', bg: '#E6FFFA', st: '#99F6E4' },
        { x: 412, w: 70, t: 'MgO', c: '#B45309', bg: '#FFF7E0', st: '#FDE68A' },
        { x: 490, w: 76, t: 'SiO₂', c: '#475569', bg: '#F1F5F9', st: '#CBD5E1' },
      ].map((c) => (
        <g key={c.t} transform={`translate(${c.x} 498)`}>
          <rect width={c.w} height="24" rx="12" fill={c.bg} stroke={c.st} />
          <rect x="3" y="2" width={c.w - 6} height="9" rx="4.5" fill="#fff" opacity=".6" />
          <Txt x={c.w / 2} y={16.5} size={c.big ? 11.5 : 12.5} weight={800} fill={c.c} anchor="middle">{c.t}</Txt>
        </g>
      ))}

      {/* ============ DẢI GIẢI THÍCH ============ */}
      <rect x="20" y="540" width="560" height="62" rx="20" fill={u('band')} stroke="#16A36A" strokeWidth="1.8" filter={u('shadow')} />
      <rect x="23" y="542" width="554" height="22" rx="18" fill={u('gloss')} opacity=".6" />
      <g transform="translate(54 571)">
        <circle r="16" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.6" />
        <circle cx="-5" cy="-6" r="4" fill="#fff" opacity=".6" />
        <Txt x={0} y={5} size={13} weight={900} fill="#15803D" anchor="middle">P+</Txt>
      </g>
      <Txt x={318} y={566} size={13.5} weight={900} fill="#166534" anchor="middle">CUNG CẤP P HỮU HIỆU CÙNG Ca, Mg, Si (TÙY SẢN PHẨM)</Txt>
      <Txt x={318} y={586} size={12.5} weight={600} fill="#15803D" anchor="middle">Phù hợp một số đất chua / cần Ca–Mg · Chọn theo pH đất, cây trồng &amp; nhãn</Txt>
    </svg>
  );
}