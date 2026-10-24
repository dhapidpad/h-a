import React, { useState, useRef, useEffect } from 'react';

/**
 * LINH THÚ BIỆT ĐỘI NPK (SLIDE 03) — phiên bản cute++
 * - Bộ ba Chibi đứng trên bục vinh danh: Bé Lân (P) · Bé Đạm (N, đội trưởng) · Bé Kali (K)
 * - Chớp mắt, nảy mềm, vẫy cờ / đũa phép / bóng bay, 100% SVG (không emoji)
 * - Bấm vào: cả đội nhảy lên + pháo hoa tim, sao, bóng; lời cổ vũ đổi mỗi lần bấm
 * - Thiết kế nằm ngang gọn, không che bất kỳ thẻ thành viên nào
 */

const STAR5 = 'M0 -6 L1.8 -1.9 L6.3 -1.9 L2.7 0.9 L4 5.2 L0 2.6 L-4 5.2 L-2.7 0.9 L-6.3 -1.9 L-1.8 -1.9Z';
const SPARK = 'M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z';
const HEART = 'M0 3 C-6 -3 -8 -8 -4 -9 C-2 -10 0 -8 0 -6 C0 -8 2 -10 4 -9 C8 -8 6 -3 0 3Z';

const IDLE = 'Chào mừng thầy cô và các bạn! Biệt đội 9 thành viên đã sẵn sàng bứt phá!';
const CHEERS = [
  'Hoan hô! Chúc 9 chiến binh thuyết trình 10 điểm tuyệt đối!',
  'Cố lên Biệt đội NPK! Tụi mình tin các bạn làm được!',
  'Đạm, Lân, Kali cùng bay cao! Cả đội là nhất!',
  'Tung hoa nào! Mỗi thành viên là một ngôi sao sáng!',
];

const COLORS = ['#F472B6', '#FDE047', '#86EFAC', '#C4B5FD', '#7DD3FC', '#FB923C'];
const BURST = Array.from({ length: 16 }).map((_, i) => {
  const a = (i / 16) * Math.PI * 2;
  const r = 40 + (i % 3) * 14;
  return {
    dx: Math.round(Math.cos(a) * r * 1.35),
    dy: Math.round(Math.sin(a) * r * 0.85 - 10),
    rot: (i % 2 ? 1 : -1) * (120 + i * 12),
    shape: ['heart', 'star', 'dot', 'spark'][i % 4],
    color: COLORS[i % COLORS.length],
    delay: (i % 4) * 0.04,
  };
});

const CSS = `
.lt-wrap{transition:all .28s cubic-bezier(.34,1.56,.64,1);outline:none}
.lt-wrap:focus-visible{box-shadow:0 0 0 3px #fff,0 0 0 6px #22C55E!important}
.lt-bob{transform-box:fill-box;transform-origin:50% 100%;animation:ltBob 2.6s ease-in-out var(--d,0s) infinite}
.lt-wrap.lt-cheer .lt-bob{animation:ltJump .42s ease-in-out 0s 2}
.lt-blink{transform-box:fill-box;transform-origin:50% 50%;animation:ltBlink 4.2s ease-in-out var(--d,0s) infinite}
.lt-wave{transform-box:fill-box;transform-origin:10% 100%;animation:ltWave 1.4s ease-in-out var(--d,0s) infinite}
.lt-tw{transform-box:fill-box;transform-origin:50% 50%;animation:ltTw 2.2s ease-in-out var(--d,0s) infinite}
.lt-burst{transform-box:fill-box;transform-origin:50% 50%;animation:ltBurst 1s ease-out var(--dl,0s) forwards;opacity:0}
.lt-sway{transform-box:fill-box;transform-origin:50% 100%;animation:ltSway 2.2s ease-in-out infinite}
@keyframes ltBob{0%,100%{transform:translateY(0) scale(1,1)}50%{transform:translateY(-3.5px) scale(.98,1.03)}}
@keyframes ltJump{0%,100%{transform:translateY(0) scale(1.04,.94)}50%{transform:translateY(-10px) scale(.96,1.06)}}
@keyframes ltBlink{0%,93%,100%{transform:scaleY(1)}96%{transform:scaleY(.1)}}
@keyframes ltWave{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(14deg)}}
@keyframes ltTw{0%,100%{opacity:.25;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}
@keyframes ltSway{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
@keyframes ltBurst{0%{opacity:1;transform:translate(0,0) scale(.2) rotate(0)}
  100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(1.1) rotate(var(--r))}}
@keyframes ltPop{0%{transform:scale(.92);opacity:.4}100%{transform:scale(1);opacity:1}}
@media (prefers-reduced-motion:reduce){.lt-bob,.lt-blink,.lt-wave,.lt-tw,.lt-burst,.lt-sway{animation:none!important}}
`;

function MiniStar({ color = '#fff', size = 9 }) {
  return (
    <svg width={size} height={size} viewBox="-7 -7 14 14" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d={STAR5} fill={color} />
    </svg>
  );
}

/* Cặp mắt tròn long lanh, có chớp */
function Eyes({ x = 8, y = -2, r = 3.6, color = '#052E16', delay = '0s' }) {
  return (
    <g className="lt-blink" style={{ '--d': delay }}>
      {[-x, x].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy={y} r={r} fill={color} />
          <circle cx={cx - r * 0.3} cy={y - r * 0.35} r={r * 0.4} fill="#fff" />
          <circle cx={cx + r * 0.35} cy={y + r * 0.3} r={r * 0.2} fill="#fff" opacity=".85" />
        </g>
      ))}
    </g>
  );
}

export default function LinhThuBietDoi({ className = '' }) {
  const [cheering, setCheering] = useState(false);
  const [count, setCount] = useState(0);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const triggerCheer = () => {
    clearTimeout(timer.current);
    setCheering(false);
    // reset 1 nhịp để animation chạy lại từ đầu khi bấm liên tục
    requestAnimationFrame(() => {
      setCheering(true);
      setCount((c) => c + 1);
      timer.current = setTimeout(() => setCheering(false), 1300);
    });
  };

  const message = cheering ? CHEERS[(count - 1) % CHEERS.length] : count > 0 ? CHEERS[(count - 1) % CHEERS.length] : IDLE;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={triggerCheer}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerCheer(); } }}
      className={`lt-wrap ${cheering ? 'lt-cheer' : ''} ${className}`}
      title="Bấm vào Biệt Đội Linh Thú NPK để tung hoa cổ vũ 9 thành viên!"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        position: 'relative',
        background:
          'radial-gradient(circle at 12px 12px, rgba(34,197,94,.14) 2px, transparent 3px) 0 0/22px 22px,' +
          'linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(240,253,244,0.95) 50%, rgba(254,249,195,0.95) 100%)',
        border: '2px solid rgba(34, 197, 94, 0.4)',
        borderRadius: 28,
        padding: '8px 18px 8px 10px',
        boxShadow: cheering ? '0 14px 34px rgba(34, 197, 94, 0.36)' : '0 8px 24px rgba(15, 23, 42, 0.09)',
        maxWidth: 500,
        cursor: 'pointer',
        userSelect: 'none',
        transform: cheering ? 'scale(1.04) translateY(-3px)' : 'scale(1)',
      }}
    >
      <style>{CSS}</style>

      {/* ====== BỘ BA CHIBI TRÊN BỤC VINH DANH ====== */}
      <div style={{ width: 150, height: 98, flexShrink: 0 }}>
        <svg viewBox="0 0 170 110" width="100%" height="100%" style={{ overflow: 'visible' }} aria-hidden="true">
          <defs>
            <radialGradient id="ltN" cx="35%" cy="30%" r="70%">
              <stop offset="0" stopColor="#ECFCCB" /><stop offset=".35" stopColor="#86EFAC" />
              <stop offset=".75" stopColor="#22C55E" /><stop offset="1" stopColor="#15803D" />
            </radialGradient>
            <radialGradient id="ltP" cx="35%" cy="30%" r="70%">
              <stop offset="0" stopColor="#F5F3FF" /><stop offset=".4" stopColor="#C4B5FD" />
              <stop offset=".75" stopColor="#8B5CF6" /><stop offset="1" stopColor="#4C1D95" />
            </radialGradient>
            <radialGradient id="ltK" cx="35%" cy="30%" r="70%">
              <stop offset="0" stopColor="#FEF9C3" /><stop offset=".4" stopColor="#FDE047" />
              <stop offset=".75" stopColor="#F59E0B" /><stop offset="1" stopColor="#B45309" />
            </radialGradient>
            <linearGradient id="ltGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FEF08A" /><stop offset="1" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="ltStepN" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#86EFAC" /><stop offset="1" stopColor="#16A34A" />
            </linearGradient>
            <linearGradient id="ltStepP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C4B5FD" /><stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="ltStepK" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FDE047" /><stop offset="1" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* lấp lánh nền */}
          {[[56, 18, '0s'], [116, 14, '.7s'], [10, 40, '1.2s'], [162, 62, '.4s'], [70, 6, '1.6s'], [150, 24, '.9s']].map(([x, y, d], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d={SPARK} className="lt-tw" fill="#FDE68A" stroke="#F59E0B" strokeWidth=".6" style={{ '--d': d }} />
            </g>
          ))}

          {/* mặt đất + bục 3 bậc */}
          <ellipse cx="85" cy="101" rx="78" ry="6" fill="rgba(16,185,129,.18)" />
          {[
            { x: 14, y: 83, w: 44, g: 'ltStepP', n: '2' },
            { x: 62, y: 79, w: 46, g: 'ltStepN', n: '1' },
            { x: 112, y: 81, w: 44, g: 'ltStepK', n: '3' },
          ].map((s) => (
            <g key={s.n}>
              <rect x={s.x} y={s.y} width={s.w} height={99 - s.y} rx="4" fill={`url(#${s.g})`} />
              <rect x={s.x + 2} y={s.y + 1} width={s.w - 4} height="3" rx="1.5" fill="#fff" opacity=".5" />
              <text x={s.x + s.w / 2} y={s.y + 14} textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff" opacity=".9">{s.n}</text>
            </g>
          ))}

          {/* ---------- BÉ LÂN (P) — công chúa tím, vương miện, đũa phép ---------- */}
          <g transform="translate(36 62)">
            <g className="lt-bob" style={{ '--d': '.3s' }}>
              <circle cx="-15" cy="-15" r="5.5" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="1.4" />
              <circle cx="15" cy="-15" r="5.5" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="1.4" />
              <circle cx="-15" cy="-15" r="2.6" fill="#F9A8D4" />
              <circle cx="15" cy="-15" r="2.6" fill="#F9A8D4" />
              <ellipse cx="-8" cy="21" rx="6" ry="3" fill="#4C1D95" />
              <ellipse cx="8" cy="21" rx="6" ry="3" fill="#4C1D95" />
              <ellipse cx="0" cy="0" rx="20" ry="21" fill="url(#ltP)" stroke="#4C1D95" strokeWidth="2" />
              <ellipse cx="0" cy="10" rx="11" ry="9" fill="#F5F3FF" opacity=".75" />
              <ellipse cx="-7" cy="-10" rx="6.5" ry="3" transform="rotate(-20 -7 -10)" fill="#fff" opacity=".45" />
              {/* vương miện */}
              <path d="M-10 -19 L-12 -31 L-5 -25 L0 -34 L5 -25 L12 -31 L10 -19Z" fill="url(#ltGold)" stroke="#B45309" strokeWidth="1.3" strokeLinejoin="round" />
              <circle cx="0" cy="-23" r="1.8" fill="#EC4899" />
              <circle cx="-6" cy="-21.5" r="1.2" fill="#38BDF8" />
              <circle cx="6" cy="-21.5" r="1.2" fill="#38BDF8" />
              {/* mắt ngôi sao */}
              <g className="lt-blink" style={{ '--d': '.5s' }}>
                <g transform="translate(-7 -3)"><path d={STAR5} fill="#FDE047" stroke="#CA8A04" strokeWidth=".8" transform="scale(.85)" /></g>
                <g transform="translate(7 -3)"><path d={STAR5} fill="#FDE047" stroke="#CA8A04" strokeWidth=".8" transform="scale(.85)" /></g>
              </g>
              <ellipse cx="-12" cy="5" rx="4" ry="2.5" fill="#F472B6" />
              <ellipse cx="12" cy="5" rx="4" ry="2.5" fill="#F472B6" />
              <path d="M-4 6 Q-2 9 0 6 Q2 9 4 6" fill="none" stroke="#1E1B4B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="0" cy="14" r="4.6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.1" />
              <text x="0" y="16.4" textAnchor="middle" fill="#5B21B6" fontSize="6.5" fontWeight="900">P</text>
              {/* tay trái cầm đũa phép */}
              <g className="lt-wave" style={{ '--d': '.2s' }}>
                <line x1="-19" y1="5" x2="-27" y2="-14" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" />
                <g transform="translate(-27 -18)"><path d={STAR5} fill="url(#ltGold)" stroke="#B45309" strokeWidth=".8" transform="scale(.95)" /></g>
                <circle cx="-19" cy="5" r="3.8" fill="#C4B5FD" stroke="#4C1D95" strokeWidth="1.1" />
              </g>
              <ellipse cx="20" cy="6" rx="3.4" ry="4" fill="#C4B5FD" stroke="#4C1D95" strokeWidth="1.1" />
            </g>
          </g>

          {/* ---------- BÉ KALI (K) — hoa cài đầu, bóng bay trái tim ---------- */}
          <g transform="translate(134 60)">
            <g className="lt-bob" style={{ '--d': '.45s' }}>
              <ellipse cx="-8" cy="21" rx="6" ry="3" fill="#92400E" />
              <ellipse cx="8" cy="21" rx="6" ry="3" fill="#92400E" />
              <circle cx="0" cy="0" r="21" fill="url(#ltK)" stroke="#92400E" strokeWidth="2" />
              <ellipse cx="0" cy="10" rx="11" ry="9" fill="#FFFBEB" opacity=".8" />
              <ellipse cx="-7" cy="-10" rx="6.5" ry="3" transform="rotate(-20 -7 -10)" fill="#fff" opacity=".5" />
              {/* hoa cài đầu */}
              <g transform="translate(11 -19)">
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="0" cy="-4.6" rx="3" ry="3.8" fill="#fff" stroke="#E2E8F0" strokeWidth=".8" transform={`rotate(${a})`} />
                ))}
                <circle r="2.6" fill="#F59E0B" stroke="#B45309" strokeWidth=".8" />
              </g>
              <path d="M5 -19 Q-2 -26 -8 -20 Q-2 -17 5 -19Z" fill="#86EFAC" stroke="#15803D" strokeWidth="1" />
              <Eyes x={7} y={-2} r={3.4} color="#451A03" delay=".8s" />
              <ellipse cx="-12" cy="5" rx="4" ry="2.5" fill="#FB7185" />
              <ellipse cx="12" cy="5" rx="4" ry="2.5" fill="#FB7185" />
              <path d="M-3.5 5 Q0 11 3.5 5Z" fill="#9F1239" stroke="#451A03" strokeWidth="1" strokeLinejoin="round" />
              <circle cx="0" cy="14" r="4.6" fill="#22C55E" stroke="#15803D" strokeWidth="1.1" />
              <text x="0" y="16.4" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="900">K</text>
              <ellipse cx="-20" cy="6" rx="3.4" ry="4" fill="#FDE047" stroke="#92400E" strokeWidth="1.1" />
              {/* tay phải cầm bóng bay tim */}
              <g className="lt-sway">
                <path d="M19 6 Q23 -6 20 -16 Q18 -22 23 -28" fill="none" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />
                <g transform="translate(23 -36) scale(1.45)">
                  <path d={HEART} fill="#FB7185" stroke="#E11D48" strokeWidth=".8" />
                  <ellipse cx="-2.6" cy="-6" rx="1.6" ry=".9" transform="rotate(-30 -2.6 -6)" fill="#fff" opacity=".7" />
                </g>
                <circle cx="19" cy="6" r="3.8" fill="#FDE047" stroke="#92400E" strokeWidth="1.1" />
              </g>
            </g>
          </g>

          {/* ---------- BÉ ĐẠM (N) — đội trưởng ở giữa ---------- */}
          <g transform="translate(85 54)">
            <g className="lt-bob" style={{ '--d': '.15s' }}>
              {/* tai lá non */}
              <path d="M-4 -23 C-20 -42 -34 -30 -22 -17 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M4 -23 C20 -42 34 -30 22 -17 Z" fill="#86EFAC" stroke="#15803D" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M-6 -22 Q-18 -30 -24 -22" fill="none" stroke="#15803D" strokeWidth=".9" opacity=".7" />
              <path d="M6 -22 Q18 -30 24 -22" fill="none" stroke="#15803D" strokeWidth=".9" opacity=".7" />
              <ellipse cx="-10" cy="25" rx="7" ry="3.4" fill="#15803D" />
              <ellipse cx="10" cy="25" rx="7" ry="3.4" fill="#15803D" />
              <circle cx="0" cy="0" r="25" fill="url(#ltN)" stroke="#14532D" strokeWidth="2.3" />
              <ellipse cx="0" cy="10" rx="14" ry="11" fill="#ECFCCB" opacity=".8" />
              <ellipse cx="-8" cy="-12" rx="8.5" ry="3.8" transform="rotate(-18 -8 -12)" fill="#fff" opacity=".45" />
              {/* mũ đội trưởng */}
              <g transform="translate(0 -22)">
                <path d="M-12 0 Q-12 -13 0 -13 Q12 -13 12 0Z" fill="#FACC15" stroke="#B45309" strokeWidth="1.4" />
                <rect x="-12" y="-5" width="24" height="3.4" fill="#EF4444" />
                <ellipse cx="0" cy="0" rx="16" ry="4.2" fill="#FDE047" stroke="#B45309" strokeWidth="1.4" />
                <g transform="translate(0 -9)"><path d={STAR5} fill="#fff" stroke="#B45309" strokeWidth=".6" transform="scale(.55)" /></g>
              </g>
              <Eyes x={8} y={-3} r={3.9} delay="0s" />
              <ellipse cx="-13" cy="5" rx="4.6" ry="2.9" fill="#FB7185" />
              <ellipse cx="13" cy="5" rx="4.6" ry="2.9" fill="#FB7185" />
              <path d="M-5 4 Q0 14 5 4Z" fill="#E11D48" stroke="#052E16" strokeWidth="1.2" strokeLinejoin="round" />
              <ellipse cx="0" cy="9.2" rx="2.6" ry="1.5" fill="#FDA4AF" />
              <circle cx="0" cy="16.5" r="5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.1" />
              <text x="0" y="19" textAnchor="middle" fill="#166534" fontSize="7" fontWeight="900">N</text>
              <ellipse cx="-24" cy="6" rx="3.6" ry="4.2" fill="#86EFAC" stroke="#15803D" strokeWidth="1.1" />
              {/* tay phải vẫy cờ NPK */}
              <g className="lt-wave" style={{ '--d': '0s' }}>
                <line x1="24" y1="6" x2="32" y2="-30" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M32 -30 L46 -25 L32 -18Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" strokeLinejoin="round" />
                <text x="36" y="-23.6" fontSize="4.4" fontWeight="900" fill="#fff">NPK</text>
                <circle cx="24" cy="6" r="4" fill="#86EFAC" stroke="#15803D" strokeWidth="1.1" />
              </g>
            </g>
          </g>

          {/* pháo hoa khi bấm: tim, sao, bóng, lấp lánh */}
          {cheering && (
            <g transform="translate(85 46)">
              {BURST.map((b, i) => (
                <g key={i} className="lt-burst" style={{ '--dx': `${b.dx}px`, '--dy': `${b.dy}px`, '--r': `${b.rot}deg`, '--dl': `${b.delay}s` }}>
                  {b.shape === 'heart' && <path d={HEART} fill={b.color} transform="scale(.9)" />}
                  {b.shape === 'star' && <path d={STAR5} fill={b.color} />}
                  {b.shape === 'dot' && <circle r="2.6" fill={b.color} />}
                  {b.shape === 'spark' && <path d={SPARK} fill={b.color} transform="scale(.8)" />}
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* ====== LỜI THOẠI ====== */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 10, fontWeight: 800, letterSpacing: '0.04em', color: '#fff',
              background: 'linear-gradient(135deg, #10B981 0%, #8B5CF6 55%, #F59E0B 100%)',
              padding: '3px 10px', borderRadius: 999, boxShadow: '0 2px 8px rgba(16, 185, 129, 0.28)',
            }}
          >
            <MiniStar color="#FEF08A" /> BIỆT ĐỘI LINH THÚ NPK
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, fontWeight: 800, color: '#059669' }}>
            <MiniStar color="#F59E0B" size={8} /> 9 THÀNH VIÊN <MiniStar color="#F59E0B" size={8} />
          </span>
        </div>

        {/* bong bóng thoại có đuôi chỉ về phía bé */}
        <div
          key={`${cheering}-${count}`}
          style={{
            position: 'relative', background: '#fff', border: '1.5px solid rgba(34,197,94,.35)',
            borderRadius: 14, padding: '6px 11px', boxShadow: '0 3px 10px rgba(15,23,42,.06)',
            animation: 'ltPop .35s cubic-bezier(.34,1.56,.64,1) both',
          }}
        >
          <span style={{
            position: 'absolute', left: -6, top: 13, width: 10, height: 10, background: '#fff',
            borderLeft: '1.5px solid rgba(34,197,94,.35)', borderBottom: '1.5px solid rgba(34,197,94,.35)',
            transform: 'rotate(45deg)',
          }} />
          <p style={{ fontSize: 12.6, fontWeight: 700, color: '#0F172A', lineHeight: 1.38, margin: 0 }}>
            “{message}”
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 700, color: '#64748B' }}>
          <svg width="11" height="11" viewBox="-9 -10 18 14" aria-hidden="true"><path d={HEART} fill="#FB7185" /></svg>
          {count > 0 ? `Đã cổ vũ ${count} lần` : 'Bấm vào để cổ vũ cả đội'}
        </div>
      </div>
    </div>
  );
}