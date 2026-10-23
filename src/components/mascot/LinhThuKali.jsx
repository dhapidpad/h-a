import React, { useEffect, useId, useRef, useState } from 'react';

/**
 * LINH THÚ 3: BÉ KALI — SUNNY K (Quả vàng cam hiệp sĩ ngọt ngào siêu cấp)
 *
 * Props giữ nguyên như bản cũ: emotion, size, className
 * emotion:
 *  - happy        : vẫy tay chào, cầm khiên K⁺ mini (mặc định)
 *  - knight       : Slide 14 — mũ giáp + khiên lá K⁺ + kiếm (điều tiết khí khổng)
 *  - scale        : Slide 15 — cầm cân so sánh KCl (đỏ) vs K₂SO₄ (trắng)
 *  - crying       : Slide 16 — khóc rưng rưng, ôm sầu riêng cấm Cl⁻ (alias: sweating)
 *  - harvest      : Slide 17 — vòng nguyệt quế + giỏ trái cây BRIX↑
 *  - soil_doctor  : Slide 18 — mũ bác sĩ + bình tưới H₂O giải cứu đất mặn
 *
 * Mới: mắt dõi theo con trỏ, bấm vào bé sẽ nảy + bay tim, Enter/Space cũng bấm được,
 * mỗi bé có id gradient riêng (đặt nhiều bé trên 1 slide không bị lỗi màu),
 * tự tắt animation nếu người dùng bật "giảm chuyển động".
 */

const FONT = "'Nunito','Baloo 2',ui-rounded,system-ui,sans-serif";
const INK = '#5B2A0A';
const OUTLINE = '#9A4A0B';

const TITLES = {
  happy: 'Bé Kali — Sunny K: hiệp sĩ bảo vệ đề kháng và trạm bơm đường bột (bấm vào bé nhé!)',
  knight: 'Bé Kali hiệp sĩ: khiên K⁺ điều tiết khí khổng',
  scale: 'Bé Kali cầm cân: muối ớt KCl vs muối trắng K₂SO₄',
  crying: 'Bé Kali khóc: sầu riêng sợ Cl⁻',
  harvest: 'Bé Kali mừng mùa vàng bội thu, Brix tăng',
  soil_doctor: 'Bé Kali bác sĩ đất: tưới nước ngọt giải cứu đất mặn',
};

/* Tư thế tay: d = cánh tay (vẽ phía sau thân), h = vị trí bàn tay, wave = vẫy, o = điểm vai */
const POSES = {
  happy: {
    L: { d: 'M 60 126 Q 46 130 37 130', h: [37, 130] },
    R: { d: 'M 140 124 Q 162 122 168 98', h: [168, 98], wave: true, o: [140, 124] },
  },
  knight: {
    L: { d: 'M 60 126 Q 48 126 43 128', h: [43, 128] },
    R: { d: 'M 140 124 Q 162 118 168 94', h: [168, 94] },
  },
  scale: {
    L: { d: 'M 60 130 Q 40 128 46 148', h: [46, 148] },
    R: { d: 'M 140 124 Q 162 122 168 98', h: [168, 98] },
  },
  crying: {
    L: { d: 'M 60 124 Q 38 118 54 106', h: [54, 106] },
    R: { d: 'M 140 128 Q 156 144 158 150', h: [158, 150] },
  },
  harvest: {
    L: { d: 'M 60 128 Q 52 148 68 153', h: [68, 153] },
    R: { d: 'M 140 128 Q 148 148 132 153', h: [132, 153] },
  },
  soil_doctor: {
    L: { d: 'M 60 124 Q 38 120 34 98', h: [34, 98], wave: true, o: [60, 124] },
    R: { d: 'M 140 128 Q 150 132 156 130', h: [156, 130] },
  },
};

const CSS = `
.kali{display:inline-block;position:relative;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;outline:none;border-radius:30%;
  filter:drop-shadow(0 12px 16px rgba(234,138,12,.38));
  transition:transform .3s cubic-bezier(.34,1.56,.64,1)}
.kali:hover{transform:translateY(-3px) rotate(-2.5deg) scale(1.04)}
.kali:active{transform:scale(.95,.92)}
.kali:focus-visible{box-shadow:0 0 0 3px #fff,0 0 0 6px #F59E0B}
.kali.is-booped{animation:kali-boop .75s cubic-bezier(.3,1.4,.5,1)}
.kali svg{display:block;overflow:visible;transform-origin:50% 92%;animation:kali-float 3.2s ease-in-out infinite}
.kali-blink{transform-origin:100px 112px;animation:kali-blink 4.2s infinite}
.kali-wave{animation:kali-wave 1.3s ease-in-out infinite}
.kali-twinkle{animation:kali-twinkle 2.4s ease-in-out infinite}
.kali-bob{animation:kali-bob 2.8s ease-in-out infinite}
.kali-sway{animation:kali-sway 3.4s ease-in-out infinite}
.kali-tear{animation:kali-tear 1.5s ease-in infinite}
.kali-sweat{animation:kali-sweat 1.8s ease-in-out infinite}
.kali-balance{transform-origin:168px 52px;animation:kali-balance 2.6s ease-in-out infinite}
.kali-pour{animation:kali-pour 1.1s ease-in infinite}
.kali-rise{animation:kali-rise 1s ease-out forwards;opacity:0}
@keyframes kali-float{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-5px) scale(.985,1.02)}}
@keyframes kali-blink{0%,90%,100%{transform:scaleY(1)}94%{transform:scaleY(.08)}}
@keyframes kali-wave{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(14deg)}}
@keyframes kali-twinkle{0%,100%{transform:scale(.35) rotate(0);opacity:.3}50%{transform:scale(1) rotate(25deg);opacity:1}}
@keyframes kali-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes kali-sway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}
@keyframes kali-tear{0%{transform:translateY(0);opacity:1}100%{transform:translateY(16px);opacity:0}}
@keyframes kali-sweat{0%,100%{transform:translateY(0);opacity:1}50%{transform:translateY(6px);opacity:.55}}
@keyframes kali-balance{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
@keyframes kali-pour{0%{transform:translate(0,0);opacity:1}100%{transform:translate(5px,24px);opacity:0}}
@keyframes kali-rise{0%{transform:translateY(0) scale(.4);opacity:0}20%{opacity:1}100%{transform:translateY(-48px) scale(1.15);opacity:0}}
@keyframes kali-boop{0%{transform:scale(1)}30%{transform:scale(1.16,.86)}55%{transform:translateY(-12px) scale(.94,1.1)}100%{transform:scale(1)}}
@media (prefers-reduced-motion:reduce){.kali,.kali *{animation:none!important;transition:none!important}.kali-twinkle{opacity:1}}
`;

/* Điểm nằm trên đường elip thân (t = góc, độ) */
const onBody = (t, rx = 58, ry = 52) => {
  const r = (t * Math.PI) / 180;
  return [100 + rx * Math.sin(r), 112 - ry * Math.cos(r)];
};

function Sparkle({ x, y, s = 1, delay = 0, color = '#FFFFFF' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        className="kali-twinkle"
        style={{ animationDelay: `${delay}s` }}
        d="M0 -8 Q1.2 -1.2 8 0 Q1.2 1.2 0 8 Q-1.2 1.2 -8 0 Q-1.2 -1.2 0 -8Z"
        fill={color}
        stroke="#F59E0B"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Heart({ x, delay, color }) {
  return (
    <g transform={`translate(${x} 40)`}>
      <path
        className="kali-rise"
        style={{ animationDelay: `${delay}s` }}
        d="M0 5 C -9 -2 -7 -11 0 -6 C 7 -11 9 -2 0 5 Z"
        fill={color}
        stroke="#fff"
        strokeWidth="1.2"
      />
    </g>
  );
}

export default function LinhThuKali({ emotion = 'happy', size = 140, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const id = (n) => `kali-${n}-${uid}`;
  const ref = useRef(null);
  const timer = useRef(null);
  const [booped, setBooped] = useState(false);
  const [boopKey, setBoopKey] = useState(0);

  const mood = emotion === 'sweating' ? 'crying' : POSES[emotion] ? emotion : 'happy';
  const sad = mood === 'crying';
  const pose = POSES[mood];

  const handleBoop = () => {
    clearTimeout(timer.current);
    setBooped(true);
    setBoopKey((k) => k + 1);
    timer.current = setTimeout(() => setBooped(false), 900);
  };

  /* Mắt dõi theo con trỏ (không gây re-render: chỉ set CSS variable) */
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 260);
        el.style.setProperty('--kx', `${((dx / d) * 3.4 * k).toFixed(2)}px`);
        el.style.setProperty('--ky', `${((dy / d) * 2.8 * k).toFixed(2)}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const rightBusy = mood === 'knight' || mood === 'scale';
  const lookX = mood === 'scale' ? 2.5 : 0;
  const lookY = mood === 'scale' ? -1.5 : sad ? 1.5 : 0;

  /* ---------- Các bộ phận dùng chung ---------- */
  const arm = (side) => {
    const p = pose[side];
    const el = (
      <g key={`a${side}`}>
        <path d={p.d} fill="none" stroke={OUTLINE} strokeWidth="14" strokeLinecap="round" />
        <path d={p.d} fill="none" stroke="#FFB22E" strokeWidth="9" strokeLinecap="round" />
      </g>
    );
    return p.wave ? (
      <g key={`a${side}`} className="kali-wave" style={{ transformOrigin: `${p.o[0]}px ${p.o[1]}px` }}>
        {el}
      </g>
    ) : (
      el
    );
  };

  const hand = (side) => {
    const p = pose[side];
    const el = (
      <g key={`h${side}`}>
        <circle cx={p.h[0]} cy={p.h[1]} r="8.5" fill="#FFC83D" stroke={OUTLINE} strokeWidth="3" />
        <circle cx={p.h[0] - 2.5} cy={p.h[1] - 3} r="2.6" fill="#FFF7CC" opacity="0.85" />
      </g>
    );
    return p.wave ? (
      <g key={`h${side}`} className="kali-wave" style={{ transformOrigin: `${p.o[0]}px ${p.o[1]}px` }}>
        {el}
      </g>
    ) : (
      el
    );
  };

  const shield = (tx, ty, s) => (
    <g transform={`translate(${tx} ${ty}) scale(${s})`}>
      <path
        d="M 20 1 L 38 8 C 38 28 32 40 20 47 C 8 40 2 28 2 8 Z"
        fill={`url(#${id('shield')})`}
        stroke="#FDE68A"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 20 7 L 32 11.5 C 32 27 28 36 20 41 C 12 36 8 27 8 11.5 Z"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <text
        x="20"
        y="30"
        textAnchor="middle"
        fontSize="17"
        fontWeight="900"
        fontFamily={FONT}
        fill="#fff"
        stroke="#14532D"
        strokeWidth="2.4"
        paintOrder="stroke"
      >
        K⁺
      </text>
    </g>
  );

  const eyeBase = (cx) => {
    const s = cx < 100 ? -1 : 1;
    return (
      <g key={cx} transform={`translate(${cx} 112)`}>
        <g
          style={{
            transform: `translate(calc(var(--kx, 0px) + ${lookX}px), calc(var(--ky, 0px) + ${lookY}px))`,
            transition: 'transform .15s ease-out',
          }}
        >
          <ellipse rx="10.5" ry="12.5" fill={`url(#${id('iris')})`} stroke="#3B1D0A" strokeWidth="2" />
          <ellipse cy="4" rx="6.5" ry="6" fill="#FDBA74" opacity="0.35" />
          <ellipse cy="-1" rx="4.6" ry="6.2" fill="#1F0D03" />
          <circle cx="-3.5" cy="-5" r={sad ? 4.8 : 4} fill="#fff" />
          <circle cx="3.5" cy="5" r="2" fill="#fff" />
          <circle cx="4.2" cy="-4" r="1.1" fill="#fff" />
          {sad && <ellipse cy="8" rx="7.5" ry="3.4" fill="#BAE6FD" opacity="0.85" />}
        </g>
        <path
          d={`M ${s * 10} -7 Q ${s * 14.5} -9.5 ${s * 16.5} -6`}
          fill="none"
          stroke="#3B1D0A"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    );
  };

  /* ---------- Mũ / phụ kiện trên đầu ---------- */
  const leafFill = sad ? '#9DBF8A' : `url(#${id('leaf')})`;
  const headgear = () => {
    if (mood === 'knight') {
      return (
        <g transform="translate(100 66)">
          <g className="kali-sway" style={{ transformOrigin: '0px -18px' }}>
            <path
              d="M -2 -20 C -8 -46 26 -52 32 -34 C 22 -38 10 -30 8 -18 Z"
              fill={`url(#${id('plume')})`}
              stroke="#991B1B"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
          <path
            d="M -37 9 C -40 -28 40 -28 37 9 Z"
            fill={`url(#${id('steel')})`}
            stroke="#475569"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <rect x="-41" y="4" width="82" height="10" rx="5" fill="#FBBF24" stroke="#B45309" strokeWidth="2.2" />
          <path d="M -24 -8 Q -16 -20 -4 -22" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <circle cx="0" cy="-9" r="4.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.6" />
          <circle cx="-1.2" cy="-10.2" r="1.3" fill="#fff" />
        </g>
      );
    }
    if (mood === 'soil_doctor') {
      return (
        <g transform="translate(100 68)">
          <path
            d="M -32 8 C -34 -22 34 -22 32 8 Z"
            fill="#fff"
            stroke="#0284C7"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <rect x="-34" y="3" width="68" height="9" rx="4.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />
          <path d="M -5 -8 H 5 M 0 -13 V -3" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="-24" cy="-6" r="7" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <circle cx="-24" cy="-6" r="3.6" fill="#BAE6FD" />
          <circle cx="-25.5" cy="-7.5" r="1.3" fill="#fff" />
        </g>
      );
    }
    if (mood === 'harvest') {
      return (
        <g>
          {[-65, -33, 0, 33, 65].map((t, i) => {
            const [x, y] = onBody(t);
            return (
              <ellipse
                key={t}
                transform={`translate(${x} ${y}) rotate(${t + (i % 2 ? 22 : -22)})`}
                rx="6.5"
                ry="12"
                fill={`url(#${id('leaf')})`}
                stroke="#15803D"
                strokeWidth="1.8"
              />
            );
          })}
          {[-49, -16, 16, 49].map((t) => {
            const [x, y] = onBody(t, 56, 50);
            return <circle key={t} cx={x} cy={y} r="3.4" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />;
          })}
        </g>
      );
    }
    /* Mặc định: cuống + lá có gân + hoa bưởi (héo rũ khi khóc) */
    return (
      <g>
        <g
          className={sad ? undefined : 'kali-sway'}
          style={sad ? { transform: 'rotate(-52deg)', transformOrigin: '100px 62px' } : { transformOrigin: '100px 62px' }}
        >
          <path d="M 100 64 Q 99 52 104 43" fill="none" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
          <path
            d="M 102 51 C 80 24 52 34 62 57 C 72 63 92 61 102 51 Z"
            fill={leafFill}
            stroke="#15803D"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M 99 52 Q 82 45 68 52" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
        </g>
        {!sad && (
          <g transform="translate(126 50)">
            <g className="kali-sway" style={{ transformOrigin: '0px 0px' }}>
              {[0, 72, 144, 216, 288].map((a) => (
                <circle
                  key={a}
                  cx={7.5 * Math.sin((a * Math.PI) / 180)}
                  cy={-7.5 * Math.cos((a * Math.PI) / 180)}
                  r="6"
                  fill="#fff"
                  stroke="#FECDD3"
                  strokeWidth="1.3"
                />
              ))}
              <circle r="4.8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.3" />
              <circle cx="-1.4" cy="-1.4" r="1.4" fill="#FEF9C3" />
            </g>
          </g>
        )}
      </g>
    );
  };

  /* ---------- Phụ kiện cầm tay ---------- */
  const props = () => {
    switch (mood) {
      case 'happy':
        return shield(6, 106, 0.8);

      case 'knight':
        return (
          <g>
            {shield(0, 100, 1.1)}
            {/* Thanh kiếm lá */}
            <path d="M 168 34 L 172.5 42 V 82 H 163.5 V 42 Z" fill={`url(#${id('steel')})`} stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 167 46 V 78" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
            <rect x="156" y="81" width="24" height="6" rx="3" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
            <rect x="164" y="86" width="8" height="16" rx="3" fill="#92400E" />
            <circle cx="168" cy="104" r="3.6" fill="#FBBF24" stroke="#B45309" strokeWidth="1.6" />
          </g>
        );

      case 'scale':
        return (
          <g>
            <line x1="168" y1="52" x2="168" y2="98" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
            <g className="kali-balance">
              <line x1="144" y1="52" x2="192" y2="52" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
              <circle cx="168" cy="52" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
              {/* Đĩa trái: muối ớt KCl */}
              <path d="M 146 54 L 140 74 M 146 54 L 158 74" stroke="#78350F" strokeWidth="1.6" />
              <path d="M 138 74 H 160 Q 149 86 138 74 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.8" strokeLinejoin="round" />
              <text x="149" y="94" textAnchor="middle" fontSize="7.5" fontWeight="900" fontFamily={FONT} fill="#B91C1C">KCl</text>
              {/* Đĩa phải: muối trắng K₂SO₄ */}
              <path d="M 190 54 L 178 74 M 190 54 L 196 74" stroke="#78350F" strokeWidth="1.6" />
              <path d="M 176 74 H 198 Q 187 86 176 74 Z" fill="#F8FAFC" stroke="#475569" strokeWidth="1.8" strokeLinejoin="round" />
              <text x="187" y="94" textAnchor="middle" fontSize="6.5" fontWeight="900" fontFamily={FONT} fill="#475569">K₂SO₄</text>
            </g>
          </g>
        );

      case 'crying':
        return (
          <g transform="translate(172 148)">
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                transform={`rotate(${i * 30})`}
                d="M -4 -15 L 0 -24 L 4 -15 Z"
                fill="#65A30D"
                stroke="#3F6212"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            ))}
            <circle r="18" fill={`url(#${id('durian')})`} stroke="#3F6212" strokeWidth="2.2" />
            <circle r="11" fill="#fff" stroke="#EF4444" strokeWidth="2.8" />
            <line x1="-8" y1="8" x2="8" y2="-8" stroke="#EF4444" strokeWidth="2.6" strokeLinecap="round" />
            <text y="3" textAnchor="middle" fontSize="8.5" fontWeight="900" fontFamily={FONT} fill="#DC2626">Cl⁻</text>
          </g>
        );

      case 'harvest':
        return (
          <g>
            {/* Trái cây trong giỏ */}
            <circle cx="82" cy="146" r="10" fill="#EF4444" stroke="#991B1B" strokeWidth="1.8" />
            <circle cx="79" cy="142" r="2.8" fill="#fff" opacity="0.8" />
            <circle cx="100" cy="141" r="11" fill="#FACC15" stroke="#B45309" strokeWidth="1.8" />
            <circle cx="96.5" cy="137" r="3" fill="#fff" opacity="0.8" />
            <circle cx="118" cy="146" r="10" fill="#9333EA" stroke="#581C87" strokeWidth="1.8" />
            <circle cx="115" cy="142" r="2.8" fill="#fff" opacity="0.7" />
            <path d="M 100 130 Q 104 124 110 126 Q 106 132 100 130 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.4" />
            {/* Giỏ */}
            <path d="M 62 150 L 68 174 Q 100 182 132 174 L 138 150 Z" fill="#D97706" stroke="#78350F" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 65 160 H 135 M 67 168 H 133" stroke="#92400E" strokeWidth="1.6" opacity="0.7" />
            <path d="M 80 150 L 84 176 M 100 150 V 179 M 120 150 L 116 176" stroke="#92400E" strokeWidth="1.6" opacity="0.6" />
            <rect x="60" y="146" width="80" height="8" rx="4" fill="#F59E0B" stroke="#78350F" strokeWidth="2.2" />
            <text x="100" y="170" textAnchor="middle" fontSize="8" fontWeight="900" fontFamily={FONT} fill="#FEF3C7" stroke="#78350F" strokeWidth="1.6" paintOrder="stroke">BRIX↑</text>
          </g>
        );

      case 'soil_doctor':
        return (
          <g>
            <g transform="translate(152 104)">
              <path d="M 4 18 Q -8 24 4 36" fill="none" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 30 22 L 42 10" stroke="#0284C7" strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="45" cy="8" rx="3.5" ry="6.5" transform="rotate(40 45 8)" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.8" />
              <rect x="2" y="14" width="30" height="26" rx="8" fill={`url(#${id('can')})`} stroke="#0284C7" strokeWidth="2.4" />
              <path d="M 7 19 H 18" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
              <text x="17" y="33" textAnchor="middle" fontSize="8" fontWeight="900" fontFamily={FONT} fill="#fff" stroke="#075985" strokeWidth="1.4" paintOrder="stroke">H₂O</text>
            </g>
            {[0, 0.4, 0.8].map((d, i) => (
              <circle key={d} className="kali-pour" style={{ animationDelay: `${d}s` }} cx={195 + (i % 2)} cy="116" r="2.4" fill="#7DD3FC" stroke="#0284C7" strokeWidth="0.8" />
            ))}
            {/* Miếng dán cứu thương trên bụng */}
            <g transform="translate(118 144) rotate(-28)">
              <rect x="-11" y="-4.5" width="22" height="9" rx="4.5" fill="#FCD9A8" stroke="#D6A25E" strokeWidth="1.4" />
              <rect x="-4" y="-4.5" width="8" height="9" fill="#F5C281" />
              <circle cx="-1.5" cy="0" r="0.8" fill="#C98A3E" />
              <circle cx="1.5" cy="0" r="0.8" fill="#C98A3E" />
            </g>
          </g>
        );

      default:
        return null;
    }
  };

  /* ---------- Miệng ---------- */
  const mouth = () => {
    if (sad) {
      return <path d="M 90 135 Q 100 124 110 135" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />;
    }
    if (mood === 'knight' || mood === 'harvest') {
      return (
        <g>
          <path d="M 88 127 Q 100 146 112 127 Z" fill="#BE123C" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
          <g clipPath={`url(#${id('mouth')})`}>
            <ellipse cx="100" cy="139" rx="8" ry="5" fill="#FB7185" />
          </g>
        </g>
      );
    }
    if (mood === 'scale') {
      return <path d="M 92 128 Q 100 135 108 128" fill="none" stroke={INK} strokeWidth="2.8" strokeLinecap="round" />;
    }
    return (
      <path
        d="M 91 128 Q 95.5 135 100 128 Q 104.5 135 109 128"
        fill="none"
        stroke={INK}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  /* ---------- Lấp lánh theo từng slide ---------- */
  const sparkles = [
    { x: 46, y: 26, s: 0.9, d: 0 },
    { x: 166, y: 26, s: 1, d: 0.6 },
    { x: 182, y: 70, s: 0.7, d: 1.2 },
    ...(mood === 'harvest'
      ? [
          { x: 22, y: 90, s: 0.8, d: 0.3 },
          { x: 180, y: 120, s: 0.9, d: 0.9 },
          { x: 18, y: 150, s: 0.7, d: 1.5 },
        ]
      : []),
  ].filter((p) => !(rightBusy && p.x > 140) && !(sad && true));

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={TITLES[mood]}
      title={TITLES[mood]}
      onClick={handleBoop}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBoop();
        }
      }}
      className={`kali linh-thu-mascot linh-thu-kali ${booped ? 'is-booped' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <style>{CSS}</style>

      <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
        <defs>
          <radialGradient id={id('body')} cx="34%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#FFF6BF" />
            <stop offset="28%" stopColor="#FFE066" />
            <stop offset="62%" stopColor="#FFAB2E" />
            <stop offset="100%" stopColor="#E0680A" />
          </radialGradient>
          <radialGradient id={id('belly')} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFE066" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id('iris')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A1204" />
            <stop offset="60%" stopColor="#8A3F0A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id={id('shield')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id={id('leaf')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BBF7D0" />
            <stop offset="55%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
          <linearGradient id={id('steel')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="55%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id={id('plume')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FCA5A5" />
            <stop offset="55%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
          <linearGradient id={id('can')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
          <radialGradient id={id('durian')} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#D9F99D" />
            <stop offset="55%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#4D7C0F" />
          </radialGradient>
          <clipPath id={id('mouth')}>
            <path d="M 88 127 Q 100 146 112 127 Z" />
          </clipPath>
        </defs>

        {/* Bóng dưới chân (co giãn theo nhịp thở) */}
        <ellipse cx="100" cy="178" rx="46" ry="8" fill="rgba(180,83,9,0.22)" />

        {/* Bong bóng K⁺ + lấp lánh */}
        <g className="kali-bob">
          <g transform="translate(28 58)">
            <circle r="13" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.5" />
            <circle cx="-4" cy="-5" r="3" fill="#fff" opacity="0.9" />
            <text y="4" textAnchor="middle" fontSize="11" fontWeight="900" fontFamily={FONT} fill="#B45309">K⁺</text>
          </g>
        </g>
        {sparkles.map((p) => (
          <Sparkle key={`${p.x}-${p.y}`} x={p.x} y={p.y} s={p.s} delay={p.d} color="#FFF7CC" />
        ))}

        {/* Tay (nằm sau thân) */}
        {arm('L')}
        {arm('R')}

        {/* Chân mũm mĩm */}
        {[76, 124].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="168" rx="15" ry="9.5" fill="#F08A0C" stroke={OUTLINE} strokeWidth="3" />
            <ellipse cx={x - 2} cy="165" rx="7" ry="3.5" fill="#FEF08A" opacity="0.7" />
          </g>
        ))}

        {/* Thân quả cam vàng 3D */}
        <ellipse cx="100" cy="112" rx="56" ry="50" fill={`url(#${id('body')})`} stroke={OUTLINE} strokeWidth="3.4" />
        <ellipse cx="100" cy="138" rx="32" ry="20" fill={`url(#${id('belly')})`} />
        {[[66, 150], [84, 160], [118, 158], [136, 146], [100, 166], [144, 124], [58, 138], [114, 74]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill="#C2410C" opacity="0.25" />
        ))}
        <ellipse cx="100" cy="63" rx="8" ry="3" fill="#D97706" opacity="0.35" />
        {/* Ánh bóng */}
        <ellipse cx="74" cy="76" rx="23" ry="9" transform="rotate(-24 74 76)" fill="#fff" opacity="0.55" />
        <circle cx="52" cy="92" r="4" fill="#fff" opacity="0.5" />
        <circle cx="60" cy="84" r="2" fill="#fff" opacity="0.5" />

        {/* Mũ / hoa lá */}
        {headgear()}

        {/* Má hồng */}
        {[60, 140].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="127" rx="11" ry="6.5" fill="#FB7185" opacity="0.8" />
            <ellipse cx={x - 2} cy="125.5" rx="5" ry="2" fill="#FFE4E6" opacity="0.6" />
          </g>
        ))}

        {/* Lông mày */}
        {mood === 'knight' && (
          <g stroke="#7C2D12" strokeWidth="3.6" strokeLinecap="round" fill="none">
            <path d="M 64 92 L 88 98" />
            <path d="M 136 92 L 112 98" />
          </g>
        )}
        {sad && (
          <g stroke="#7C2D12" strokeWidth="3.2" strokeLinecap="round" fill="none">
            <path d="M 66 97 L 88 90" />
            <path d="M 134 97 L 112 90" />
          </g>
        )}

        {/* Mắt */}
        {mood === 'harvest' ? (
          <g fill="none" stroke="#3B1D0A" strokeWidth="4" strokeLinecap="round">
            <path d="M 66 114 Q 77 100 88 114" />
            <path d="M 112 114 Q 123 100 134 114" />
          </g>
        ) : (
          <g className="kali-blink">{[77, 123].map(eyeBase)}</g>
        )}

        {/* Nước mắt + mồ hôi */}
        {sad && (
          <g>
            {[77, 123].map((x, i) => (
              <g key={x}>
                <path d={`M ${x} 124 Q ${x + (i ? 2 : -2)} 134 ${x} 144`} fill="none" stroke="#7DD3FC" strokeWidth="3.6" strokeLinecap="round" opacity="0.6" />
                <circle className="kali-tear" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy="132" r="2.8" fill="#38BDF8" />
              </g>
            ))}
            <path
              className="kali-sweat"
              d="M 140 70 C 140 62 147 56 147 56 C 147 56 154 62 154 70 C 154 75 151 78 147 78 C 143 78 140 75 140 70 Z"
              fill="#7DD3FC"
              stroke="#0284C7"
              strokeWidth="1.6"
            />
          </g>
        )}

        {/* Miệng */}
        {mouth()}

        {/* Phụ kiện cầm tay, rồi bàn tay đè lên trên */}
        {props()}
        {hand('L')}
        {hand('R')}

        {/* Bấm vào bé: tim bay lên */}
        {booped && (
          <g key={boopKey}>
            <Heart x={70} delay={0} color="#FB7185" />
            <Heart x={100} delay={0.12} color="#FBBF24" />
            <Heart x={130} delay={0.24} color="#F472B6" />
          </g>
        )}
      </svg>
    </div>
  );
}