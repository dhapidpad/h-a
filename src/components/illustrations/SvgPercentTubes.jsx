import React, { useId } from 'react';

/**
 * Biểu đồ ống nghiệm: hàm lượng nitơ (% khối lượng) trong 4 hợp chất phân bón.
 *
 * Props
 * - selectedId: 'urea' | 'nh4cl' | 'nh42so4' | 'nano3'  (mặc định 'urea')
 * - onSelect:   (id) => void — gọi khi bấm / nhấn Enter / Space vào một ống
 * - width:      chiều rộng (số px hoặc '100%', '40rem'...). Mặc định '100%'.
 * - height:     chiều cao. Mặc định 'auto' (giữ tỉ lệ 800:560).
 * - maxWidth:   giới hạn chiều rộng (tuỳ chọn).
 * - animated:   bật/tắt chuyển động (mặc định true). Tự tắt khi bật "reduce motion".
 * - className, style: truyền thêm cho thẻ <svg>.
 *
 * Ví dụ: <SvgPercentTubes width={720} selectedId={id} onSelect={setId} />
 *
 * Số liệu: %N = khối lượng N / khối lượng phân tử (xấp xỉ, hợp chất tinh khiết).
 */

const W = 800;
const H = 560;
const FONT = '"Be Vietnam Pro", Inter, "Segoe UI", Roboto, Arial, sans-serif';

const TUBES = [
  { id: 'urea', name: 'Urê', formula: 'CO(NH₂)₂', percent: 46.7, color: '#16A34A', light: '#86EFAC', dark: '#166534', winner: true },
  { id: 'nh4cl', name: 'Amoni clorua', formula: 'NH₄Cl', percent: 26.2, color: '#2878E5', light: '#93C5FD', dark: '#1D4ED8' },
  { id: 'nh42so4', name: 'Amoni sunfat', formula: '(NH₄)₂SO₄', percent: 21.2, color: '#8956E8', light: '#C4B5FD', dark: '#6D28D9' },
  { id: 'nano3', name: 'Natri nitrat', formula: 'NaNO₃', percent: 16.5, color: '#64748B', light: '#CBD5E1', dark: '#334155' },
];

const CHART = { bottom: 380, scale: 5, tubeTop: 113, tubeHeight: 267, tubeWidth: 76, centers: [158, 322, 486, 650] };
const GRID = [50, 40, 30, 20, 10];

const Txt = ({ x, y, size = 13, weight = 600, fill = '#163D29', anchor, spacing, children }) => (
  <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} letterSpacing={spacing}>
    {children}
  </text>
);

export default function SvgPercentTubes({
  selectedId = 'urea',
  onSelect,
  width = '100%',
  height = 'auto',
  maxWidth,
  animated = true,
  className,
  style,
}) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const n = (s) => `pt-${s}-${uid}`;
  const u = (s) => `url(#${n(s)})`;
  const cls = (c) => (animated ? c : undefined);

  const selIndex = Math.max(0, TUBES.findIndex((t) => t.id === selectedId));
  const rank = [...TUBES].sort((a, b) => b.percent - a.percent).findIndex((t) => t.id === TUBES[selIndex].id) + 1;

  const { bottom, scale, tubeTop, tubeHeight, tubeWidth: tw } = CHART;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label="Biểu đồ so sánh hàm lượng nitơ trong urê, amoni clorua, amoni sunfat và natri nitrat"
      style={{ display: 'block', maxWidth: maxWidth ?? '100%', aspectRatio: `${W} / ${H}`, borderRadius: 22, fontFamily: FONT, ...style }}
    >
      <defs>
        <linearGradient id={n('bg')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F8FFFB" /><stop offset=".52" stopColor="#F0FDF7" /><stop offset="1" stopColor="#EFF6FF" />
        </linearGradient>
        <linearGradient id={n('glass')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".85" />
          <stop offset=".18" stopColor="#FFFFFF" stopOpacity=".22" />
          <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".04" />
          <stop offset=".8" stopColor="#FFFFFF" stopOpacity=".4" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id={n('shade')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity=".16" />
          <stop offset=".3" stopColor="#000" stopOpacity="0" />
          <stop offset=".72" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".26" />
        </linearGradient>
        <linearGradient id={n('rim')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset=".5" stopColor="#94A3B8" stopOpacity=".22" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity=".95" />
        </linearGradient>
        <linearGradient id={n('gold')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF3C7" /><stop offset=".5" stopColor="#FBBF24" /><stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={n('floor')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3EEE7" /><stop offset="1" stopColor="#B3C9BA" />
        </linearGradient>
        <linearGradient id={n('gloss')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".9" /><stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={n('ambient')}>
          <stop offset="0" stopColor="#86EFAC" stopOpacity=".3" /><stop offset="1" stopColor="#86EFAC" stopOpacity="0" />
        </radialGradient>
        <pattern id={n('dots')} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#16A34A" opacity=".12" />
        </pattern>
        <filter id={n('shadow')} x="-10%" y="-15%" width="120%" height="140%">
          <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#14532D" floodOpacity=".11" />
        </filter>

        {TUBES.map((t, i) => {
          const x = CHART.centers[i] - tw / 2;
          const top = bottom - t.percent * scale;
          return (
            <React.Fragment key={t.id}>
              <linearGradient id={n(`liq-${i}`)} x1="0" y1="0" x2="1" y2=".8">
                <stop offset="0" stopColor={t.light} /><stop offset=".35" stopColor={t.color} /><stop offset="1" stopColor={t.dark} />
              </linearGradient>
              <clipPath id={n(`tube-${i}`)}>
                <rect x={x + 4} y={tubeTop + 5} width={tw - 8} height={tubeHeight - 9} rx="11" />
              </clipPath>
              <clipPath id={n(`liq-clip-${i}`)}>
                <rect x={x + 4} y={top} width={tw - 8} height={bottom - top} rx="9" />
              </clipPath>
            </React.Fragment>
          );
        })}

        <style>{`
          .pt-fill{transform-box:fill-box;transform-origin:center bottom;animation:ptRise 900ms cubic-bezier(.2,.8,.2,1) both}
          .pt-b1{animation:ptBub 3s ease-in-out infinite}
          .pt-b2{animation:ptBub 3.6s ease-in-out -1.2s infinite}
          .pt-pulse{animation:ptPulse 3.6s ease-in-out infinite}
          .pt-hit{cursor:pointer;outline:none}
          .pt-hit .pt-lift{transition:transform .25s ease}
          .pt-hit:hover .pt-lift,.pt-hit:focus-visible .pt-lift{transform:translateY(-3px)}
          .pt-hit:focus-visible .pt-card{stroke:#15803D;stroke-width:3}
          @keyframes ptRise{from{transform:scaleY(.12);opacity:.25}to{transform:scaleY(1);opacity:1}}
          @keyframes ptBub{0%,100%{opacity:.35;transform:translateY(0)}50%{opacity:.9;transform:translateY(-4px)}}
          @keyframes ptPulse{0%,100%{opacity:.14}50%{opacity:.26}}
          @media (prefers-reduced-motion: reduce){.pt-fill,.pt-b1,.pt-b2,.pt-pulse{animation:none}.pt-hit .pt-lift{transition:none}}
        `}</style>
      </defs>

      {/* ============ NỀN ============ */}
      <rect width={W} height={H} rx="22" fill={u('bg')} stroke="#86EFAC" strokeWidth="1.5" />
      <rect width={W} height={H} rx="22" fill={u('dots')} />
      <circle cx="692" cy="180" r="160" fill={u('ambient')} />
      <circle cx="94" cy="318" r="120" fill="#86EFAC" opacity=".08" />
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="21" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity=".8" />

      {/* ============ HEADER ============ */}
      <rect x="28" y="20" width="226" height="26" rx="13" fill="#FFFFFF" stroke="#BBF7D0" />
      <circle cx="43" cy="33" r="4" fill="#22C55E" />
      <Txt x={55} y={37} size={13} weight={900} fill="#166534" spacing={1}>AGRI SCIENCE / DATA LAB</Txt>
      <Txt x={28} y={77} size={27} weight={900} fill="#123B2A" spacing={-0.7}>Hàm lượng nitơ trong phân bón</Txt>
      <Txt x={30} y={99} size={13.5} weight={500} fill="#53705F">So sánh tỷ lệ nitơ theo khối lượng trong các hợp chất</Txt>

      <g transform="translate(624 25)">
        <rect y="3" width="148" height="42" rx="13" fill="#0B2A1D" opacity=".2" />
        <rect width="148" height="42" rx="13" fill="#123B2A" />
        <rect x="3" y="2" width="142" height="16" rx="8" fill={u('gloss')} opacity=".22" />
        <Txt x={74} y={17} size={12.5} weight={700} fill="#BBF7D0" anchor="middle" spacing={1}>CHỈ SỐ ĐO</Txt>
        <Txt x={74} y={34} size={14} weight={900} fill="#FFFFFF" anchor="middle">Nitơ (N) · %</Txt>
      </g>
      <path d="M28 112H772" stroke="#D5E7DA" strokeWidth="1.2" />

      {/* ============ LƯỚI ============ */}
      <Txt x={35} y={133} size={13} weight={800} fill="#5E796B" spacing={0.7}>% N</Txt>
      {GRID.map((v) => {
        const y = bottom - v * scale;
        return (
          <g key={v}>
            <line x1="76" y1={y} x2="762" y2={y} stroke="#D6E5DB" strokeWidth="1" strokeDasharray="4 6" />
            <Txt x={65} y={y + 4.5} size={13} weight={700} fill="#74907F" anchor="end">{v}%</Txt>
          </g>
        );
      })}

      <ellipse cx="404" cy="388" rx="325" ry="14" fill="#14532D" opacity=".09" />
      <rect x="82" y="380" width="680" height="8" rx="4" fill={u('floor')} />
      <rect x="82" y="380" width="680" height="3" rx="1.5" fill="#FFFFFF" opacity=".5" />
      <rect x="106" y="388" width="632" height="3" rx="1.5" fill="#B6CCBF" opacity=".5" />

      {/* ============ 4 ỐNG ============ */}
      {TUBES.map((t, i) => {
        const cx = CHART.centers[i];
        const x = cx - tw / 2;
        const top = bottom - t.percent * scale;
        const sel = selIndex === i;
        const interactive = typeof onSelect === 'function';

        const activate = () => onSelect && onSelect(t.id);

        return (
          <g
            key={t.id}
            className="pt-hit"
            onClick={activate}
            {...(interactive
              ? {
                  role: 'button',
                  tabIndex: 0,
                  'aria-pressed': sel,
                  'aria-label': `${t.name}, ${t.formula}, ${t.percent.toFixed(1)} phần trăm nitơ`,
                  onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      activate();
                    }
                  },
                }
              : { role: 'img', 'aria-label': `${t.name}, ${t.formula}, ${t.percent.toFixed(1)} phần trăm nitơ` })}
          >
            {/* hào quang chọn / nổi bật */}
            {(sel || t.winner) && (
              <ellipse
                className={cls('pt-pulse')}
                cx={cx}
                cy={252}
                rx={sel ? 68 : 62}
                ry={sel ? 155 : 148}
                fill={sel ? t.color : '#86EFAC'}
                opacity={sel ? 0.2 : 0.13}
              />
            )}

            {/* bóng ống trên bệ */}
            <ellipse cx={cx + 3} cy={bottom + 4} rx={tw / 2 + 6} ry="5" fill="#14532D" opacity=".2" />

            <g className="pt-lift">
              {/* thân ống */}
              <rect x={x} y={tubeTop} width={tw} height={tubeHeight} rx="14" fill="#FFFFFF" fillOpacity=".5" stroke="#B3C6BF" strokeWidth="1.7" />
              <ellipse cx={cx} cy={tubeTop + 3} rx={tw / 2 - 5} ry="4.5" fill="#94A3B8" opacity=".18" />

              {/* chất lỏng */}
              <g clipPath={u(`tube-${i}`)}>
                <g className={cls('pt-fill')}>
                  <g clipPath={u(`liq-clip-${i}`)}>
                    <path
                      d={`M${x + 4} ${top + 8}Q${x + 4} ${top} ${x + 12} ${top}H${x + tw - 12}Q${x + tw - 4} ${top} ${x + tw - 4} ${top + 8}V${bottom - 10}Q${x + tw / 2} ${bottom + 3} ${x + 4} ${bottom - 10}Z`}
                      fill={u(`liq-${i}`)}
                      opacity=".95"
                    />
                    <rect x={x + 4} y={top} width={tw - 8} height={bottom - top} fill={u('shade')} />
                    <ellipse cx={cx} cy={top + 2} rx={tw / 2 - 5} ry="5" fill={t.light} opacity=".95" />
                    <ellipse cx={cx} cy={top + 3} rx={tw / 2 - 11} ry="2.3" fill="#FFFFFF" opacity=".45" />
                    <g fill="#FFFFFF">
                      <circle className={cls('pt-b1')} cx={x + 22} cy={top + 28} r="3.1" opacity=".65" />
                      <circle className={cls('pt-b2')} cx={x + 51} cy={top + 54} r="4" opacity=".58" />
                      <circle cx={x + 29} cy={top + 84} r="2.3" opacity=".7" />
                      <circle cx={x + 47} cy={top + 112} r="2" opacity=".4" />
                      <circle cx={x + 20} cy={top + 145} r="2.5" opacity=".4" />
                    </g>
                  </g>
                </g>
              </g>

              {/* thủy tinh phủ + phản chiếu */}
              <rect x={x} y={tubeTop} width={tw} height={tubeHeight} rx="14" fill={u('glass')} />
              <path d={`M${x + 9} ${tubeTop + 18}V${tubeTop + tubeHeight - 25}`} stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity=".8" />
              <path d={`M${x + tw - 8} ${tubeTop + 23}V${tubeTop + tubeHeight - 34}`} stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity=".65" />

              {/* vạch chia đúng thang: mỗi 10% */}
              <g stroke="#FFFFFF" strokeWidth="1.5" opacity=".9" strokeLinecap="round">
                {GRID.map((v) => {
                  const y = bottom - v * scale;
                  return <line key={v} x1={x + 6} y1={y} x2={x + (v % 20 === 0 ? 17 : 13)} y2={y} />;
                })}
              </g>

              {/* miệng ống */}
              <ellipse cx={cx} cy={tubeTop + 2} rx={tw / 2 - 2} ry="5.5" fill={u('rim')} stroke="#B3C6BF" strokeWidth="1.1" />
              <ellipse cx={cx} cy={tubeTop + 2} rx={tw / 2 - 8} ry="2.4" fill="#FFFFFF" opacity=".85" />

              {/* nhãn phần trăm */}
              <rect x={cx - 44} y={top - 31} width="88" height="26" rx="9" fill={t.winner ? '#166534' : t.color} stroke="#FFFFFF" strokeWidth="1.4" />
              <rect x={cx - 41} y={top - 29.5} width="82" height="10" rx="5" fill="#FFFFFF" opacity=".18" />
              <Txt x={cx} y={top - 13} size={14} weight={900} fill="#FFFFFF" anchor="middle">{t.percent.toFixed(1)}%</Txt>
              <path d={`M${cx - 5} ${top - 5}L${cx} ${top + 1}L${cx + 5} ${top - 5}Z`} fill={t.winner ? '#166534' : t.color} />

              {/* vương miện */}
              {t.winner && (
                <g transform={`translate(${cx} 88)`}>
                  <ellipse cy="19" rx="25" ry="6" fill="#D97706" opacity=".18" />
                  <path d="M-21 0L-14 14L-7 5L0 14L7 5L14 14L21 0L17 20H-17Z" fill={u('gold')} stroke="#B7790A" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M-15 16H15" stroke="#FEF3C7" strokeWidth="2" strokeLinecap="round" />
                  {[[-21, -1], [-7, 4], [7, 4], [21, -1]].map(([a, b]) => (
                    <circle key={a} cx={a} cy={b} r="3.3" fill="#FDE68A" />
                  ))}
                  <Txt x={0} y={-8} size={12.5} weight={900} fill="#B45309" anchor="middle" spacing={0.8}>CAO NHẤT</Txt>
                </g>
              )}
            </g>

            {/* thẻ hợp chất */}
            <rect x={cx - 72} y="402" width="144" height="52" rx="13" fill="#14532D" opacity=".07" transform="translate(0 3)" />
            <rect
              className="pt-card"
              x={cx - 72}
              y="400"
              width="144"
              height="52"
              rx="13"
              fill={sel ? '#F0FDF4' : '#FFFFFF'}
              stroke={sel ? t.color : t.winner ? '#86EFAC' : '#E2E8F0'}
              strokeWidth={sel ? 2.4 : t.winner ? 1.8 : 1.2}
            />
            <rect x={cx - 70} y="402" width="140" height="18" rx="9" fill="#FFFFFF" opacity=".5" />
            <rect x={cx - 62} y="410" width="4.5" height="32" rx="2.2" fill={t.color} />
            <Txt x={cx + 5} y={421} size={13} weight={900} fill="#172D21" anchor="middle">{t.name}</Txt>
            <Txt x={cx + 5} y={439} size={13.5} weight={700} fill={t.dark} anchor="middle">{t.formula}</Txt>
          </g>
        );
      })}

      {/* ============ KẾT LUẬN ============ */}
      <rect x="28" y="468" width="744" height="76" rx="17" fill="#FFFFFF" stroke="#CDE8D6" strokeWidth="1.2" filter={u('shadow')} />
      <rect x="30" y="470" width="740" height="26" rx="15" fill={u('gloss')} opacity=".5" />
      <rect x="28" y="468" width="7" height="76" rx="3.5" fill="#22C55E" />

      <circle cx="67" cy="506" r="22" fill="#DCFCE7" stroke="#BBF7D0" />
      <path d="M56 506L64 514L79 497" fill="none" stroke="#15803D" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />

      <Txt x={104} y={493} size={12.5} weight={900} fill="#15803D" spacing={1.2}>KẾT LUẬN</Txt>
      <Txt x={104} y={513} size={13.5} weight={900} fill="#163D29">Urê có tỷ lệ nitơ theo khối lượng cao nhất trong nhóm so sánh.</Txt>
      <Txt x={104} y={530} size={12.5} weight={500} fill="#5E7A6B">Số liệu xấp xỉ tính theo công thức hóa học của các hợp chất tinh khiết.</Txt>

      <g transform="translate(683 488)">
        <rect width="70" height="38" rx="11" fill="#F0FDF4" stroke="#BBF7D0" />
        <Txt x={35} y={15} size={12} weight={800} fill="#5E796B" anchor="middle">HẠNG</Txt>
        <Txt x={35} y={31} size={15} weight={900} fill="#15803D" anchor="middle">#{String(rank).padStart(2, '0')}</Txt>
      </g>
    </svg>
  );
}