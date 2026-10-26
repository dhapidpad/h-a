import React, { useId } from 'react';

/**
 * Infographic "Hai nguy cơ khi dùng phân đạm amoni": đất chua hóa và thất thoát NH₃ khi gặp vôi.
 *
 * Props
 * - width:     chiều rộng (số px hoặc '100%', '36rem'...). Mặc định '100%'.
 * - height:    chiều cao. Mặc định 'auto' (giữ tỉ lệ 720:600).
 * - maxWidth:  giới hạn chiều rộng (tuỳ chọn).
 * - animated:  bật/tắt chuyển động (mặc định true). Tự tắt khi bật "reduce motion".
 * - className, style: truyền thêm cho thẻ <svg>.
 *
 * Ví dụ: <SvgGasLoss width={640} />
 */

const W = 720;
const H = 600;
const FONT = '"Be Vietnam Pro", Inter, "Segoe UI", Roboto, Arial, sans-serif';

const Txt = ({ x, y, size = 13, weight = 600, fill = '#302D2A', anchor, spacing, children }) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} letterSpacing={spacing}>
    {children}
  </text>
);

/* hình dạng khối đất (mặt cắt) theo toạ độ x bắt đầu */
const soilShape = (x0) =>
  `M${x0} 283Q${x0 + 41} 275 ${x0 + 78} 283T${x0 + 153} 283T${x0 + 223} 283T${x0 + 298} 283L${x0 + 298} 440Q${x0 + 298} 451 ${x0 + 286} 451H${x0 + 12}Q${x0} 451 ${x0} 439Z`;
const soilTop = (x0) => `M${x0} 283Q${x0 + 41} 275 ${x0 + 78} 283T${x0 + 153} 283T${x0 + 223} 283T${x0 + 298} 283`;

export default function SvgGasLoss({
  width = '100%',
  height = 'auto',
  maxWidth,
  animated = true,
  className,
  style,
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const n = (s) => `gas-${s}-${uid}`;
  const u = (s) => `url(#${n(s)})`;
  const cls = (c) => (animated ? c : undefined);

  const Card = ({ x, stroke }) => (
    <g>
      <rect x={x} y="128" width="328" height="355" rx="20" fill="#FFFFFF" fillOpacity=".97" stroke={stroke} strokeWidth="1.4" filter={u('shadow')} />
      <rect x={x + 2} y="130" width="324" height="52" rx="18" fill={u('gloss')} opacity=".6" />
    </g>
  );

  const Sphere = ({ cx, cy, r, fill, ring, label, fs = 13, ink = '#FFFFFF', c, shadow }) => (
    <g className={cls(c)}>
      {shadow && <ellipse cx={cx} cy={cy + r + 4} rx={r * 0.75} ry="3.5" fill={shadow} opacity=".16" />}
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={ring} strokeWidth="1.8" />
      <ellipse cx={cx - r * 0.3} cy={cy - r * 0.38} rx={r * 0.34} ry={r * 0.2} fill="#FFFFFF" opacity=".6" />
      <Txt x={cx} y={cy + fs * 0.36} size={fs} weight={900} fill={ink} anchor="middle">{label}</Txt>
    </g>
  );

  const grass = (x0, color) =>
    Array.from({ length: 20 }, (_, i) => {
      const x = x0 + 8 + i * 14.5;
      const h = 6 + ((i * 7) % 5);
      return <path key={i} d={`M${x} 282q1.5-${h * 0.6} ${3 + (i % 3)}-${h}`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />;
    });

  const hIons = [[77, 317], [282, 321], [110, 392], [274, 408]];

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="So sánh tác động của phân đạm amoni trong đất chua và nguy cơ thất thoát amoniac khi bón phân amoni cùng lúc với vôi"
      style={{ display: 'block', maxWidth: maxWidth ?? '100%', aspectRatio: `${W} / ${H}`, borderRadius: 22, fontFamily: FONT, ...style }}
    >
      <defs>
        <linearGradient id={n('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFDFC" /><stop offset=".5" stopColor="#FFF7F2" /><stop offset="1" stopColor="#F0F7FC" />
        </linearGradient>
        <linearGradient id={n('acid')} x1="0" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor="#C77D55" /><stop offset=".45" stopColor="#A85E47" /><stop offset="1" stopColor="#784333" />
        </linearGradient>
        <linearGradient id={n('lime')} x1="0" y1="0" x2=".8" y2="1">
          <stop offset="0" stopColor="#E8DCC5" /><stop offset=".55" stopColor="#CFC4AE" /><stop offset="1" stopColor="#B6AA96" />
        </linearGradient>
        <linearGradient id={n('depth')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".24" />
        </linearGradient>
        <linearGradient id={n('side')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".18" /><stop offset=".12" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".88" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".16" />
        </linearGradient>
        <radialGradient id={n('gas')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset=".5" stopColor="#FFE4E6" /><stop offset="1" stopColor="#FB7185" />
        </radialGradient>
        <radialGradient id={n('ionH')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#FFF1F1" /><stop offset="1" stopColor="#FCA5A5" />
        </radialGradient>
        <radialGradient id={n('ionP')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#C4B5FD" /><stop offset=".55" stopColor="#8B5CF6" /><stop offset="1" stopColor="#6D28D9" />
        </radialGradient>
        <radialGradient id={n('ionB')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#7DD3FC" /><stop offset=".55" stopColor="#0EA5E9" /><stop offset="1" stopColor="#0369A1" />
        </radialGradient>
        <radialGradient id={n('glow')}>
          <stop offset="0" stopColor="#FDA4AF" stopOpacity=".55" /><stop offset="1" stopColor="#FDA4AF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={n('gloss')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".9" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <pattern id={n('dots')} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#64748B" opacity=".09" />
        </pattern>
        <marker id={n('arrow')} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0L8 4L0 8Z" fill="#E11D48" />
        </marker>
        <filter id={n('shadow')} x="-8%" y="-8%" width="116%" height="124%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#7C2D12" floodOpacity=".1" />
        </filter>
        <clipPath id={n('clipL')}><path d={soilShape(37)} /></clipPath>
        <clipPath id={n('clipR')}><path d={soilShape(385)} /></clipPath>

        <style>{`
          .gas-b1{animation:gasRise 2.8s ease-in-out infinite}
          .gas-b2{animation:gasRise 3.4s ease-in-out -1.2s infinite}
          .gas-b3{animation:gasRise 3s ease-in-out -.6s infinite}
          .gas-flow{stroke-dasharray:5 6;animation:gasDash 2.2s linear infinite}
          .gas-warn{transform-box:fill-box;transform-origin:center;animation:gasPulse 3s ease-in-out infinite}
          .gas-ion{animation:gasIon 4s ease-in-out infinite}
          .gas-ion.d{animation-delay:-2s}
          @keyframes gasRise{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(-6px);opacity:.88}}
          @keyframes gasDash{to{stroke-dashoffset:-44}}
          @keyframes gasPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
          @keyframes gasIon{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}
          @media (prefers-reduced-motion: reduce){.gas-b1,.gas-b2,.gas-b3,.gas-flow,.gas-warn,.gas-ion{animation:none}}
        `}</style>
      </defs>

      {/* ============ NỀN + HEADER ============ */}
      <rect width={W} height={H} rx="22" fill={u('bg')} stroke="#F1D5CA" strokeWidth="1.5" />
      <rect width={W} height={H} rx="22" fill={u('dots')} />
      <circle cx="688" cy="55" r="110" fill="#FECACA" opacity=".14" />
      <circle cx="24" cy="520" r="110" fill="#BBF7D0" opacity=".15" />
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="21" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity=".8" />

      <rect x="25" y="18" width="240" height="26" rx="13" fill="#FFFFFF" stroke="#F1D5CA" />
      <circle cx="40" cy="31" r="4" fill="#F97316" />
      <Txt x={52} y={35.5} size={13} weight={900} fill="#9A3412" spacing={1}>AGRI SCIENCE / WARNING 05</Txt>
      <Txt x={25} y={77} size={27} weight={900} fill="#302D2A" spacing={-0.6}>Hai nguy cơ khi sử dụng phân đạm amoni</Txt>
      <Txt x={27} y={99} size={13.5} weight={500} fill="#74665D">Đất chua hóa và thất thoát nitơ khi bón phân không đúng cách</Txt>
      <path d="M25 112H695" stroke="#E8DCD5" strokeWidth="1.2" />

      {/* ============ 01 · ĐẤT CHUA ============ */}
      <Card x={22} stroke="#F2C9BC" />
      <rect x="37" y="142" width="32" height="32" rx="10" fill="#FEE2E2" />
      <path d="M53 148V158M48 153H58M53 158L48 165M53 158L59 165" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" fill="none" />
      <Txt x={79} y={156} size={13} weight={900} fill="#991B1B" spacing={0.35}>01 / ĐẤT QUÁ CHUA</Txt>
      <Txt x={79} y={174} size={13} weight={500} fill="#8D6558">Nitrat hóa góp phần làm đất chua thêm</Txt>
      <rect x="245" y="142" width="87" height="26" rx="13" fill="#FEF2F2" stroke="#FECACA" />
      <Txt x={288.5} y={159.5} size={13} weight={900} fill="#B91C1C" anchor="middle">pH THẤP</Txt>

      <rect x="37" y="188" width="298" height="103" rx="13" fill="#FFF8F3" />
      {/* mặt trời */}
      <circle cx="66" cy="209" r="19" fill="#FDE68A" opacity=".3" />
      <circle cx="66" cy="209" r="10" fill="#FBBF24" opacity=".75" />
      <ellipse cx="63" cy="206" rx="3.5" ry="2" fill="#FFFFFF" opacity=".6" />
      <g stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round">
        <path d="M66 193V188M66 225V230M50 209H45M82 209H87M55 198L51 194M77 220L81 224" />
      </g>

      {/* cây còi */}
      <ellipse cx="185" cy="286" rx="26" ry="4" fill="#3F2A1C" opacity=".2" />
      <path d="M183 283Q181 255 185 225" fill="none" stroke="#688C3D" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M184 245C164 224 143 228 149 244C158 255 171 254 184 245Z" fill="#E5C34F" stroke="#C9A53A" />
      <path d="M182 245Q166 237 153 238" fill="none" stroke="#F9E7A2" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M185 235C203 213 224 218 218 234C209 246 196 246 185 235Z" fill="#F0D76B" stroke="#D4B84B" />
      <path d="M187 235Q203 227 214 228" fill="none" stroke="#FFF5BE" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M185 224C171 209 179 199 188 209C193 215 191 220 185 224Z" fill="#A3B849" stroke="#82943B" />

      {/* nhãn "Lá vàng" đặt bên phải cây (không đè lá) */}
      <rect x="236" y="198" width="88" height="25" rx="12.5" fill="#FFFFFF" stroke="#F3D4A8" />
      <Txt x={280} y={215} size={13} weight={800} fill="#8A5A00" anchor="middle">Lá vàng</Txt>
      <path d="M236 214L221 227" stroke="#C99B3A" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="221" cy="227" r="2.4" fill="#C99B3A" />

      {/* khối đất chua */}
      <path d={soilShape(37)} fill={u('acid')} stroke="#965742" strokeWidth="1.4" />
      <g clipPath={u('clipL')}>
        <rect x="37" y="283" width="298" height="170" fill={u('depth')} />
        <rect x="37" y="283" width="298" height="170" fill={u('side')} />
        <path d="M38 350Q96 337 148 350T250 350T334 347" fill="none" stroke="#F5C6A2" strokeWidth="2" opacity=".32" />
        <path d="M38 401Q98 389 155 401T260 401T334 399" fill="none" stroke="#4E2C25" strokeWidth="2" opacity=".26" />
      </g>
      <path d={soilTop(37)} fill="none" stroke="#83A65D" strokeWidth="7" strokeLinecap="round" />
      <path d={soilTop(37)} fill="none" stroke="#B5D28C" strokeWidth="2" strokeLinecap="round" opacity=".55" transform="translate(0 -2)" />
      {grass(37, '#6E9150')}
      <g fill="#F7CCAC" opacity=".55">
        {[[58, 305, 2.3], [117, 300, 2], [302, 307, 3], [285, 371, 2.1], [59, 423, 2.5], [236, 425, 3], [310, 429, 2], [278, 323, 1.7], [85, 376, 3]].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>
      <g fill="none" stroke="#F5D0A7" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M183 282Q181 309 185 328Q184 345 173 364" />
        <path d="M183 307Q164 318 150 337L143 355" />
        <path d="M184 319Q205 329 216 351L224 369" />
        <path d="M179 345Q163 352 162 375" />
        <path d="M199 338Q211 345 211 359" />
        <path d="M173 364L167 389M224 369L219 389" />
      </g>
      {hIons.map(([x, y], i) => (
        <Sphere key={i} cx={x} cy={y} r={16} fill={u('ionH')} ring="#FCA5A5" label="H⁺" fs={13} ink="#B91C1C" c={i % 2 ? 'gas-ion d' : 'gas-ion'} />
      ))}
      <rect x="90" y="430" width="190" height="26" rx="13" fill="#4F1F18" opacity=".25" transform="translate(0 3)" />
      <rect x="90" y="428" width="190" height="26" rx="13" fill="#6F342A" stroke="#EBAE93" />
      <rect x="93" y="429" width="184" height="10" rx="5" fill="#FFFFFF" opacity=".14" />
      <Txt x={185} y={445.5} size={13} weight={800} fill="#FFF7ED" anchor="middle">H⁺ TÍCH TỤ • pH GIẢM</Txt>
      <Txt x={186} y={472} size={13.5} weight={800} fill="#9A3412" anchor="middle">Nitrat hóa giải phóng H⁺</Txt>

      {/* ============ 02 · GẶP VÔI ============ */}
      <Card x={370} stroke="#F2D9A8" />
      <rect x="385" y="142" width="32" height="32" rx="10" fill="#FEF3C7" />
      <path d="M401 149V160M397 156L401 161L405 156" fill="none" stroke="#B45309" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <Txt x={427} y={156} size={13} weight={900} fill="#92400E" spacing={0.15}>02 / GẶP VÔI</Txt>
      <Txt x={427} y={174} size={13} weight={500} fill="#8E7455">Nguy cơ thất thoát nitơ dạng NH₃</Txt>
      <rect x="606" y="142" width="76" height="26" rx="13" fill="#FFF7ED" stroke="#FED7AA" />
      <Txt x={644} y={159.5} size={12.5} weight={900} fill="#C2410C" anchor="middle">CẢNH BÁO</Txt>

      <rect x="385" y="188" width="298" height="103" rx="13" fill="#FFF8F5" />
      <circle cx="541" cy="229" r="64" fill={u('glow')} />

      <path className={cls('gas-flow')} d="M535 300C536 276 536 252 540 224" fill="none" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" markerEnd={`url(#${n('arrow')})`} strokeDasharray="5 6" />

      <Sphere cx={492} cy={241} r={21} fill={u('gas')} ring="#FB7185" label="NH₃" ink="#BE123C" c="gas-b1" />
      <Sphere cx={572} cy={214} r={26} fill={u('gas')} ring="#FB7185" label="NH₃" ink="#BE123C" c="gas-b2" />
      <Sphere cx={628} cy={250} r={16} fill={u('gas')} ring="#FDA4AF" label="NH₃" fs={12.5} ink="#BE123C" c="gas-b3" />

      <rect x="452" y="190" width="98" height="22" rx="11" fill="#FFFFFF" stroke="#FECDD3" />
      <Txt x={501} y={205.5} size={12.5} weight={900} fill="#BE123C" anchor="middle">KHÍ BAY LÊN</Txt>

      {/* khối đất có vôi */}
      <path d={soilShape(385)} fill={u('lime')} stroke="#B5A48C" strokeWidth="1.4" />
      <g clipPath={u('clipR')}>
        <rect x="385" y="283" width="298" height="170" fill={u('depth')} opacity=".8" />
        <rect x="385" y="283" width="298" height="170" fill={u('side')} />
        <path d="M386 350Q440 337 494 350T594 350T682 347" fill="none" stroke="#F8F0DF" strokeWidth="2" opacity=".8" />
        <path d="M386 400Q445 388 499 400T598 400T682 397" fill="none" stroke="#8E806D" strokeWidth="2" opacity=".26" />
      </g>
      <path d={soilTop(385)} fill="none" stroke="#A9B78A" strokeWidth="7" strokeLinecap="round" />
      <path d={soilTop(385)} fill="none" stroke="#D3DDB9" strokeWidth="2" strokeLinecap="round" opacity=".6" transform="translate(0 -2)" />
      {grass(385, '#8FA06B')}
      <g fill="#F9F4E8" stroke="#B9AC96" strokeWidth="1">
        <path d="M405 304L415 299L424 306L421 316L409 317Z" />
        <path d="M615 305L627 302L634 310L630 319L618 318Z" />
        <path d="M443 378L452 372L462 380L459 390L447 391Z" />
        <path d="M648 391L659 386L667 395L663 405L652 403Z" />
        <path d="M586 420L596 416L605 424L600 433L590 432Z" />
      </g>
      <g fill="#8C7F6D" opacity=".5">
        {[[432, 327, 2], [606, 341, 2.5], [472, 420, 2], [659, 329, 2], [406, 420, 2.5], [551, 391, 2]].map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>

      <Sphere cx={455} cy={326} r={23} fill={u('ionP')} ring="#E9D5FF" label="NH₄⁺" ink="#FFFFFF" shadow="#4C1D95" />
      <Txt x={496} y={333} size={24} weight={800} fill="#64574A" anchor="middle">+</Txt>
      <Sphere cx={537} cy={326} r={23} fill={u('ionB')} ring="#BAE6FD" label="OH⁻" fs={12.5} ink="#FFFFFF" shadow="#0C4A6E" />
      <path d="M563 326H588M582 320L589 326L582 332" stroke="#875C27" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="594" y="314" width="78" height="25" rx="12.5" fill="#FFF7ED" stroke="#D6C2A0" />
      <Txt x={633} y={331} size={12.5} weight={900} fill="#854D0E" anchor="middle">VÔI / KIỀM</Txt>

      <rect x="396" y="363" width="276" height="48" rx="11" fill="#FFFBEB" stroke="#EACB95" strokeWidth="1.3" />
      <rect x="398" y="364" width="272" height="16" rx="8" fill="#FFFFFF" opacity=".5" />
      <Txt x={534} y={381} size={13} weight={800} fill="#854D0E" anchor="middle">KHI pH TĂNG</Txt>
      <Txt x={534} y={400} size={14} weight={900} fill="#78350F" anchor="middle">NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O</Txt>

      <Txt x={534} y={472} size={13.5} weight={800} fill="#B91C1C" anchor="middle">NH₃ thoát ra → thất thoát nitơ</Txt>

      {/* ============ 03 · NGUYÊN TẮC ============ */}
      <rect x="22" y="497" width="676" height="79" rx="17" fill="#FFFFFF" stroke="#F0C7BC" strokeWidth="1.3" filter={u('shadow')} />
      <rect x="24" y="499" width="672" height="26" rx="15" fill={u('gloss')} opacity=".55" />
      <rect x="22" y="497" width="7" height="79" rx="3.5" fill="#EF4444" />

      <g className={cls('gas-warn')}>
        <circle cx="56" cy="536" r="19" fill="#FEE2E2" stroke="#FECACA" />
        <path d="M56 525L68 546H44Z" fill="#DC2626" stroke="#B91C1C" strokeLinejoin="round" />
        <path d="M56 531V538" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <circle cx="56" cy="542" r="1.3" fill="#FFFFFF" />
      </g>

      <Txt x={90} y={521} size={13} weight={900} fill="#991B1B" spacing={1}>NGUYÊN TẮC BÓN PHÂN</Txt>
      <Txt x={90} y={541} size={13.5} weight={900} fill="#442D29">Không trộn trực tiếp phân đạm amoni với vôi bột.</Txt>
      <Txt x={90} y={559} size={13} weight={500} fill="#74605A">Bón riêng thời điểm, theo khuyến cáo kỹ thuật và điều kiện đất.</Txt>

      <g transform="translate(628 512)">
        <rect y="3" width="56" height="48" rx="12" fill="#7C2D12" opacity=".08" />
        <rect width="56" height="48" rx="12" fill="#FFF7ED" stroke="#FED7AA" />
        <path d="M15 21L23 29L40 11" fill="none" stroke="#C2410C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <Txt x={28} y={42} size={12.5} weight={900} fill="#9A3412" anchor="middle">LƯU Ý</Txt>
      </g>
    </svg>
  );
}