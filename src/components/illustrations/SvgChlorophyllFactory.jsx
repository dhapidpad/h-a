import React, { useId } from 'react';

/**
 * Infographic "Dinh dưỡng nitơ ở thực vật" — bản nâng cấp (nổi khối nhẹ, chữ rõ, chuyển động nhẹ).
 *
 * Props
 * - width:     chiều rộng (số px hoặc '100%', '30rem'...). Mặc định '100%'.
 * - height:    chiều cao. Mặc định 'auto' (giữ tỉ lệ 720:600 bằng aspect-ratio).
 * - maxWidth:  giới hạn chiều rộng (tuỳ chọn).
 * - animated:  bật/tắt chuyển động (mặc định true). Tự tắt khi người dùng bật "reduce motion".
 * - className, style: truyền thêm cho thẻ <svg>.
 *
 * Ví dụ: <SvgChlorophyllFactory width={640} />
 *
 * Hiệu năng: chỉ animate transform / opacity / dash-offset trên vài nhóm nhỏ;
 * 1 filter đổ bóng tĩnh dùng chung, không blur động.
 */

const W = 720;
const H = 600;
const FONT = '"Be Vietnam Pro", Inter, "Segoe UI", Roboto, Arial, sans-serif';

const Txt = ({ x, y, size = 13, weight = 600, fill = '#166534', anchor, spacing, children }) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} letterSpacing={spacing}>
    {children}
  </text>
);

export default function SvgChlorophyllFactory({
  width = '100%',
  height = 'auto',
  maxWidth,
  animated = true,
  className,
  style,
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const n = (s) => `bio-${s}-${uid}`;
  const u = (s) => `url(#${n(s)})`;
  const cls = (c) => (animated ? c : undefined);

  /* Khối trong lộ trình đồng hoá */
  const steps = [
    { t: 'NO₃⁻', s: 'Nitrat', bg: '#EFF6FF', st: '#BFDBFE', dot: '#38BDF8', tc: '#075985', sc: '#0369A1' },
    { t: 'NO₂⁻', s: 'Nitrit', bg: '#F0FDFA', st: '#99F6E4', dot: '#2DD4BF', tc: '#115E59', sc: '#0F766E' },
    { t: 'NH₄⁺', s: 'Amoni', bg: '#FAF5FF', st: '#E9D5FF', dot: '#A855F7', tc: '#6B21A8', sc: '#7E22CE' },
    { t: 'AXIT AMIN', s: 'Hợp chất hữu cơ', bg: '#F0FDF4', st: '#BBF7D0', dot: '#22C55E', tc: '#166534', sc: '#15803D', small: true },
    { t: 'PROTEIN', s: 'Chất đạm', bg: '#166534', st: '#14532D', dot: '#86EFAC', tc: '#FFFFFF', sc: '#D1FAE5', small: true, dark: true },
  ];

  const Ion = ({ cx, cy, grad, halo, ring, label, name, nameColor, cName, delay }) => (
    <g className={cls(cName)} style={delay ? { animationDelay: delay } : undefined}>
      <ellipse cx={cx} cy={cy + 27} rx="18" ry="3.5" fill={nameColor} opacity=".14" />
      <circle cx={cx} cy={cy} r="26" fill={halo} opacity=".14" />
      <circle cx={cx} cy={cy} r="21" fill={u(grad)} stroke={ring} strokeWidth="2" />
      <ellipse cx={cx - 7} cy={cy - 8} rx="8" ry="3.8" fill="#FFFFFF" opacity=".4" />
      <Txt x={cx} y={cy + 5} size={13} weight={900} fill="#FFFFFF" anchor="middle">{label}</Txt>
      <Txt x={cx} y={cy + 44} size={13} weight={800} fill={nameColor} anchor="middle">{name}</Txt>
    </g>
  );

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      role="img"
      aria-label="Infographic mô tả lá cây, lục lạp, các dạng nitơ khoáng và quá trình đồng hóa nitơ để tổng hợp protein"
      style={{ display: 'block', maxWidth: maxWidth ?? '100%', aspectRatio: `${W} / ${H}`, borderRadius: 22, fontFamily: FONT, ...style }}
    >
      <defs>
        <linearGradient id={n('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7FFF8" /><stop offset=".48" stopColor="#E7FBEF" /><stop offset="1" stopColor="#E8F5FF" />
        </linearGradient>
        <linearGradient id={n('leaf')} x1=".15" y1="0" x2=".9" y2="1">
          <stop offset="0" stopColor="#86EFAC" /><stop offset=".35" stopColor="#4ADE80" /><stop offset=".72" stopColor="#16A34A" /><stop offset="1" stopColor="#166534" />
        </linearGradient>
        <linearGradient id={n('chloro')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3FDD2" /><stop offset=".42" stopColor="#BBF7D0" /><stop offset="1" stopColor="#5EDDAF" />
        </linearGradient>
        <linearGradient id={n('grana')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4ADE80" /><stop offset="1" stopColor="#15803D" />
        </linearGradient>
        <radialGradient id={n('ionP')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#D8B4FE" /><stop offset=".55" stopColor="#9333EA" /><stop offset="1" stopColor="#6B21A8" />
        </radialGradient>
        <radialGradient id={n('ionB')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#A5E1FD" /><stop offset=".55" stopColor="#0EA5E9" /><stop offset="1" stopColor="#0369A1" />
        </radialGradient>
        <radialGradient id={n('sun')} cx=".35" cy=".3" r=".85">
          <stop offset="0" stopColor="#FFFBEB" /><stop offset="1" stopColor="#F59E0B" />
        </radialGradient>
        <radialGradient id={n('glow')}>
          <stop offset="0" stopColor="#86EFAC" stopOpacity=".8" /><stop offset=".65" stopColor="#86EFAC" stopOpacity=".18" /><stop offset="1" stopColor="#86EFAC" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={n('gloss')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".9" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <pattern id={n('dots')} width="19" height="19" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.15" fill="#16A34A" opacity=".12" />
        </pattern>
        <marker id={n('arrow')} markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto">
          <path d="M0 0L7 3.5L0 7Z" fill="#16A34A" />
        </marker>
        <filter id={n('shadow')} x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#14532D" floodOpacity=".12" />
        </filter>
        <filter id={n('shadowS')} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#14532D" floodOpacity=".25" />
        </filter>

        <style>{`
          .bio-float{animation:bioFloat 3.8s ease-in-out infinite}
          .bio-float.d{animation-delay:-1.9s}
          .bio-flow{stroke-dasharray:5 5;animation:bioFlow 6s linear infinite}
          .bio-glow{animation:bioGlow 5s ease-in-out infinite}
          .bio-spin{transform-box:fill-box;transform-origin:center;animation:bioSpin 28s linear infinite}
          @keyframes bioFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
          @keyframes bioFlow{to{stroke-dashoffset:-40}}
          @keyframes bioGlow{0%,100%{opacity:.55}50%{opacity:.9}}
          @keyframes bioSpin{to{transform:rotate(360deg)}}
          @media (prefers-reduced-motion: reduce){.bio-float,.bio-flow,.bio-glow,.bio-spin{animation:none}}
        `}</style>
      </defs>

      {/* ============ NỀN & HEADER ============ */}
      <rect width={W} height={H} rx="22" fill={u('bg')} stroke="#86EFAC" strokeWidth="1.5" />
      <rect width={W} height={H} rx="22" fill={u('dots')} />
      <circle cx="690" cy="65" r="83" fill="#BAE6FD" opacity=".18" />
      <circle cx="14" cy="440" r="98" fill="#86EFAC" opacity=".15" />
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="21" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity=".8" />

      <rect x="24" y="18" width="252" height="26" rx="13" fill="#FFFFFF" fillOpacity=".95" stroke="#BBF7D0" />
      <circle cx="39" cy="31" r="4" fill="#22C55E" />
      <Txt x={50} y={35.5} size={13} weight={800} fill="#15803D" spacing={1}>SINH HỌC  •  INFOGRAPHIC 04</Txt>
      <Txt x={24} y={72} size={28} weight={900} fill="#123B2A" spacing={-0.7}>Dinh dưỡng nitơ ở thực vật</Txt>
      <Txt x={26} y={94} size={13.5} weight={500} fill="#4F6F5F">Từ ion khoáng đến axit amin và protein</Txt>

      <g transform="translate(578 24)">
        <rect y="3" width="116" height="34" rx="17" fill="#0B2A1D" opacity=".2" />
        <rect width="116" height="34" rx="17" fill="#123B2A" />
        <rect x="3" y="2" width="110" height="14" rx="7" fill={u('gloss')} opacity=".3" />
        <circle cx="18" cy="17" r="5" fill="#4ADE80" />
        <Txt x={31} y={21.5} size={13} weight={800} fill="#FFFFFF" spacing={0.7}>PLANT LAB</Txt>
      </g>
      <path d="M24 103H696" stroke="#B7DCC6" />

      {/* ============ 01 · THẺ LÁ ============ */}
      <rect x="20" y="112" width="254" height="334" rx="19" fill="#FFFFFF" fillOpacity=".93" stroke="#D4F0DC" strokeWidth="1.3" filter={u('shadow')} />
      <rect x="20" y="112" width="254" height="334" rx="19" fill={u('dots')} opacity=".6" />
      <rect x="22" y="114" width="250" height="60" rx="17" fill={u('gloss')} opacity=".5" />

      <rect x="36" y="127" width="26" height="26" rx="8" fill="#DCFCE7" />
      <path d="M43 145C42 137 49 134 55 134C55 141 51 145 43 145Z" fill="#16A34A" />
      <path d="M43 145L52 136" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
      <Txt x={70} y={145} size={13} weight={900} fill="#166534" spacing={0.4}>01 / PHIẾN LÁ</Txt>
      <Txt x={38} y={166} size={13.5} weight={500} fill="#5E7D6E">Nơi tiếp nhận ánh sáng</Txt>

      <circle cx="143" cy="278" r="108" fill={u('glow')} className={cls('bio-glow')} />

      {/* mặt trời */}
      <g transform="translate(57 196)">
        <g className={cls('bio-float')}>
          <g className={cls('bio-spin')} stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round">
            <path d="M0-17V-12M0 12V17M-17 0H-12M12 0H17M-12-12L-8-8M12-12L8-8M-12 12L-8 8M12 12L8 8" />
          </g>
          <circle r="11" fill={u('sun')} stroke="#FBBF24" />
          <ellipse cx="-3" cy="-4" rx="4" ry="2.4" fill="#FFFFFF" opacity=".7" />
        </g>
      </g>
      <path className={cls('bio-flow')} d="M70 209Q81 217 93 228" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".85" strokeDasharray="3 4" />

      {/* chiếc lá nổi khối */}
      <ellipse cx="146" cy="394" rx="62" ry="7" fill="#14532D" opacity=".14" />
      <g filter={u('shadowS')}>
        <path d="M139 388C82 360 45 291 59 230C69 183 104 155 147 158C184 160 219 181 240 205C238 278 201 352 139 388Z" fill={u('leaf')} stroke="#15803D" strokeWidth="1.7" />
      </g>
      <path d="M147 158C184 160 219 181 240 205C238 278 201 352 139 388C125 317 124 253 147 164Z" fill="#064E3B" opacity=".16" />
      <path d="M82 225C99 185 129 174 153 176C117 201 91 256 102 304C84 286 76 254 82 225Z" fill="#FFFFFF" opacity=".18" />
      <path d="M139 388C125 317 124 253 147 164" stroke="#D9FBE4" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <g stroke="#D1FAE5" strokeWidth="2.3" fill="none" strokeLinecap="round" opacity=".92">
        <path d="M131 343Q91 326 74 286" /><path d="M128 318Q168 305 202 266" />
        <path d="M125 288Q88 269 68 239" /><path d="M130 267Q173 253 219 223" />
        <path d="M137 236Q106 221 91 197" /><path d="M140 213Q169 202 188 184" />
      </g>
      <g fill="#FFFFFF">
        <circle cx="103" cy="247" r="2.5" opacity=".6" /><circle cx="184" cy="235" r="2" opacity=".55" />
        <circle cx="157" cy="291" r="2.4" opacity=".6" /><circle cx="111" cy="310" r="1.8" opacity=".55" />
      </g>

      <rect x="38" y="401" width="218" height="31" rx="15.5" fill="#F0FDF4" stroke="#BBF7D0" />
      <rect x="40" y="402" width="214" height="13" rx="6.5" fill="#FFFFFF" opacity=".5" />
      <circle cx="54" cy="416.5" r="5" fill="#22C55E" />
      <Txt x={66} y={421} size={13} weight={800} fill="#166534">DIỆP LỤC</Txt>
      <path d="M133 408V425" stroke="#BBF7D0" />
      <Txt x={142} y={421} size={13} weight={700} fill="#3F6C52">C₅₅H₇₂O₅N₄Mg</Txt>

      {/* ============ ĐƯỜNG NỐI PHÓNG ĐẠI ============ */}
      <g fill="none" stroke="#22A35A" strokeWidth="1.8" opacity=".85">
        <path className={cls('bio-flow')} strokeDasharray="5 5" d="M246 218L294 226" />
        <path className={cls('bio-flow')} strokeDasharray="5 5" d="M244 334L294 320" />
      </g>
      <circle cx="246" cy="218" r="4" fill="#16A34A" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="244" cy="334" r="4" fill="#16A34A" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* ============ 02 · THẺ LỤC LẠP ============ */}
      <rect x="290" y="112" width="410" height="334" rx="19" fill="#FFFFFF" fillOpacity=".94" stroke="#D4F0DC" strokeWidth="1.3" filter={u('shadow')} />
      <rect x="292" y="114" width="406" height="60" rx="17" fill={u('gloss')} opacity=".5" />

      <rect x="306" y="127" width="26" height="26" rx="8" fill="#DCFCE7" />
      <path d="M313 146C312 138 320 134 325 135C325 142 321 146 313 146Z" fill="#16A34A" />
      <Txt x={341} y={145} size={13} weight={900} fill="#166534" spacing={0.2}>02 / LỤC LẠP</Txt>

      <g transform="translate(584 126)">
        <rect width="100" height="27" rx="13.5" fill="#ECFDF5" stroke="#BBF7D0" />
        <circle cx="12" cy="13.5" r="3.6" fill="#22C55E" />
        <Txt x={22} y={18} size={12.5} weight={800} fill="#15803D">CHLOROPLAST</Txt>
      </g>

      <ellipse cx="495" cy="276" rx="165" ry="108" fill={u('glow')} className={cls('bio-glow')} />

      {/* lục lạp: đáy dày + thân + vành sáng */}
      <ellipse cx="495" cy="283" rx="141" ry="79" fill="#4FB985" />
      <ellipse cx="495" cy="288" rx="141" ry="79" fill="#14532D" opacity=".14" />
      <ellipse cx="495" cy="270" rx="141" ry="79" fill={u('chloro')} stroke="#16A34A" strokeWidth="3" />
      <ellipse cx="495" cy="270" rx="132" ry="70" fill="none" stroke="#F0FDF4" strokeWidth="2" opacity=".9" />
      <path d="M376 239C405 204 468 195 517 199" fill="none" stroke="#FFFFFF" strokeWidth="4.5" opacity=".7" strokeLinecap="round" />

      <Txt x={495} y={224} size={13.5} weight={900} fill="#166534" anchor="middle" spacing={0.5}>LỤC LẠP • DIỆP LỤC</Txt>

      {/* grana */}
      {[425, 495, 565].map((cx, gi) => {
        const mid = gi === 1;
        const rx = mid ? 22 : 19;
        const ry = mid ? 7 : 6.5;
        const y0 = mid ? 240 : 244;
        const step = mid ? 8 : 7;
        return (
          <g key={cx}>
            <ellipse cx={cx} cy={y0 + step * 3 + 6} rx={rx} ry="3.5" fill="#14532D" opacity=".18" />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <ellipse cx={cx} cy={y0 + i * step} rx={rx} ry={ry} fill={u('grana')} stroke="#14532D" strokeWidth=".5" />
                <path d={`M${cx - rx + 4} ${y0 + i * step - 1.5}Q${cx} ${y0 + i * step - ry - 0.5} ${cx + rx - 4} ${y0 + i * step - 1.5}`} fill="none" stroke="#BBF7D0" strokeWidth="1" opacity=".7" strokeLinecap="round" />
              </g>
            ))}
          </g>
        );
      })}
      <g fill="none" stroke="#22A35A" strokeWidth="2" opacity=".75">
        <path d="M444 251Q459 238 473 248" /><path d="M517 249Q535 238 546 250" />
      </g>

      <Ion cx={438} cy={297} grad="ionP" halo="#A855F7" ring="#F3E8FF" label="NH₄⁺" name="AMONI" nameColor="#6B21A8" cName="bio-float" />
      <Ion cx={552} cy={297} grad="ionB" halo="#0EA5E9" ring="#E0F2FE" label="NO₃⁻" name="NITRAT" nameColor="#0369A1" cName="bio-float d" />

      <path d="M438 345Q440 354 445 355" fill="none" stroke="#16A34A" strokeWidth="1.8" markerEnd={`url(#${n('arrow')})`} />
      <path d="M552 345Q550 354 545 355" fill="none" stroke="#16A34A" strokeWidth="1.8" markerEnd={`url(#${n('arrow')})`} />
      <rect x="447" y="344" width="96" height="24" rx="12" fill="#166534" stroke="#BBF7D0" />
      <rect x="450" y="345" width="90" height="10" rx="5" fill="#FFFFFF" opacity=".16" />
      <Txt x={495} y={360.5} size={12.5} weight={900} fill="#FFFFFF" anchor="middle" spacing={0.4}>ĐỒNG HÓA N</Txt>

      {/* 2 ô kết quả */}
      <rect x="307" y="382" width="177" height="48" rx="12" fill="#FFFBEB" stroke="#FDE68A" />
      <circle cx="323" cy="406" r="5" fill="#F59E0B" />
      <Txt x={335} y={402} size={13} weight={800} fill="#92400E">ÁNH SÁNG</Txt>
      <Txt x={335} y={419} size={13} weight={600} fill="#8A5A0C">+ Khung carbon</Txt>

      <rect x="493" y="382" width="190" height="48" rx="12" fill="#F0FDF4" stroke="#BBF7D0" />
      <path d="M505 406L511 412L518 399" stroke="#16A34A" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Txt x={527} y={402} size={13} weight={800} fill="#166534">TẠO AXIT AMIN</Txt>
      <Txt x={527} y={419} size={12.5} weight={600} fill="#15803D">Nguyên liệu protein</Txt>

      {/* ============ 03 · LỘ TRÌNH ============ */}
      <rect x="20" y="460" width="680" height="120" rx="19" fill="#FFFFFF" fillOpacity=".96" stroke="#CDEBD7" strokeWidth="1.3" filter={u('shadow')} />
      <rect x="22" y="462" width="676" height="38" rx="17" fill={u('gloss')} opacity=".5" />
      <Txt x={36} y={486} size={14} weight={900} fill="#123B2A" spacing={0.15}>LỘ TRÌNH ĐỒNG HÓA NITƠ</Txt>
      <Txt x={684} y={485.5} size={12.5} weight={700} fill="#5F8070" anchor="end">TỪ DẠNG VÔ CƠ ĐẾN HỮU CƠ</Txt>

      {steps.map((s, i) => {
        const x = 36 + i * 135;
        return (
          <g key={s.t}>
            <rect x={x} y="504" width="108" height="48" rx="12" fill="#14532D" opacity=".08" transform="translate(0 3)" />
            <rect x={x} y="501" width="108" height="48" rx="12" fill={s.bg} stroke={s.st} />
            <rect x={x + 2} y="502" width="104" height="18" rx="9" fill="#FFFFFF" opacity={s.dark ? 0.1 : 0.45} />
            <circle cx={x + 12} cy="512" r="3.2" fill={s.dot} />
            <Txt x={x + 54} y={523} size={s.small ? 13 : 14.5} weight={900} fill={s.tc} anchor="middle">{s.t}</Txt>
            <Txt x={x + 54} y={540} size={12.5} weight={700} fill={s.sc} anchor="middle">{s.s}</Txt>
            {i < steps.length - 1 && (
              <path className={cls('bio-flow')} d={`M${x + 111} 525H${x + 130}`} stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="4 4" markerEnd={`url(#${n('arrow')})`} />
            )}
          </g>
        );
      })}

      <Txt x={360} y={568} size={12.5} weight={600} fill="#56766A" anchor="middle">
        Nitrat được khử thành nitrit, rồi amoni trước khi đi vào quá trình tổng hợp axit amin.
      </Txt>
    </svg>
  );
}