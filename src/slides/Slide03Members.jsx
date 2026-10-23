import React, { useState, useMemo, useCallback } from 'react';
import { TEAM_MEMBERS } from '../data/slideData';
import { Sparkles, Shuffle, Eye, RotateCcw, Trophy } from 'lucide-react';
import LinhThuBietDoi from '../components/mascot/LinhThuBietDoi';
import MemberSvgAvatar from '../components/MemberSvgAvatar';

/* Bảng màu: c = màu chính, dark = tối, bg = nền nhạt */
const PALETTE = [
  { c: '#2563EB', dark: '#1E3A8A', bg: '#EAF2FF' },
  { c: '#DB2777', dark: '#831843', bg: '#FDF2F8' },
  { c: '#16A34A', dark: '#14532D', bg: '#E8F8EE' },
  { c: '#7C3AED', dark: '#4C1D95', bg: '#F0EBFF' },
  { c: '#D97706', dark: '#78350F', bg: '#FEF3C7' },
  { c: '#0284C7', dark: '#0C4A6E', bg: '#E0F2FE' },
  { c: '#6366F1', dark: '#312E81', bg: '#EDE9FE' },
  { c: '#B45309', dark: '#713F12', bg: '#FFFBEB' },
  { c: '#059669', dark: '#064E3B', bg: '#ECFDF5' },
];

const STAR = 'M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8 Z';

const CSS = `
.npk-wrap{perspective:1100px;height:100%;min-height:0;cursor:pointer;outline:none;
  transition:transform .3s cubic-bezier(.34,1.56,.64,1);animation:npk-bob 3.4s ease-in-out infinite}
.npk-wrap.on{animation:none}
.npk-wrap:not(.on):hover{animation:none;transform:translateY(-6px) scale(1.03)}
.npk-wrap:focus-visible .npk-back{box-shadow:0 0 0 3px #fff,0 0 0 6px var(--c)}
.npk-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;
  transition:transform .85s cubic-bezier(.34,1.25,.5,1)}
.npk-wrap.on .npk-inner{transform:rotateY(180deg)}
.npk-face{position:absolute;inset:0;border-radius:18px;overflow:hidden;
  backface-visibility:hidden;-webkit-backface-visibility:hidden}
.npk-front{transform:rotateY(180deg)}
.npk-back{box-shadow:0 10px 24px var(--glow),inset 0 0 0 1.5px rgba(255,255,255,.35)}
.npk-front::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.9) 50%,transparent 70%);
  transform:translateX(-130%)}
.npk-wrap.on .npk-front::after{animation:npk-shine 1.1s .5s ease-out 1 forwards}
.npk-spin{animation:npk-rot 16s linear infinite}
.npk-spin-r{animation:npk-rot 11s linear infinite reverse}
.npk-twinkle{animation:npk-tw 2.2s ease-in-out infinite}
.npk-ring{animation:npk-rot 9s linear infinite}
.npk-hint{animation:npk-pulse 1.8s ease-in-out infinite}
.npk-btn{display:inline-flex;align-items:center;gap:6px;font-weight:800;font-size:12px;
  padding:7px 13px;border-radius:12px;border:1.5px solid var(--c);background:#fff;color:var(--c);
  cursor:pointer;transition:all .2s}
.npk-btn:hover:not(:disabled){background:var(--c);color:#fff;transform:translateY(-2px)}
.npk-btn:disabled{opacity:.4;cursor:default}
.npk-title{background:linear-gradient(90deg,#1D4ED8,#7C3AED 50%,#DB2777);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.npk-confetti{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:40}
.npk-p{position:absolute;top:-24px;animation:npk-fall var(--d) cubic-bezier(.3,.6,.5,1) var(--dl) forwards}
.npk-win{animation:npk-pop .6s cubic-bezier(.34,1.56,.64,1) both}
@keyframes npk-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes npk-rot{to{transform:rotate(360deg)}}
@keyframes npk-tw{0%,100%{opacity:.2;transform:scale(.6)}50%{opacity:1;transform:scale(1.15)}}
@keyframes npk-pulse{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes npk-shine{to{transform:translateX(130%)}}
@keyframes npk-fall{0%{transform:translate(0,0) rotate(0);opacity:1}
  100%{transform:translate(var(--x),112vh) rotate(720deg);opacity:.9}}
@keyframes npk-pop{from{transform:scale(.6);opacity:0}to{transform:scale(1);opacity:1}}
@media (prefers-reduced-motion:reduce){
  .npk-wrap,.npk-spin,.npk-spin-r,.npk-twinkle,.npk-ring,.npk-hint,.npk-p{animation:none!important}
  .npk-inner{transition-duration:.01s}
}
`;

/* ---------- MẶT SAU: thẻ bí ẩn, úp bầm ---------- */
function CardBack({ idx, pal }) {
  const id = `npkb${idx}`;
  const sparkles = [[48, 38, 0], [272, 40, 0.7], [38, 122, 1.2], [282, 120, 0.3], [96, 24, 1.6], [226, 136, 0.9]];
  return (
    <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={pal.c} />
          <stop offset="1" stopColor={pal.dark} />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset=".5" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id={`${id}r`}>
          <stop offset="0" stopColor="#fff" stopOpacity=".5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}p`} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M11 0V22M0 11H22" stroke="#fff" strokeOpacity=".08" />
          <circle cx="11" cy="11" r="1.7" fill="#fff" fillOpacity=".2" />
        </pattern>
      </defs>
      <rect width="320" height="160" fill={`url(#${id}g)`} />
      <rect width="320" height="160" fill={`url(#${id}p)`} />
      <circle cx="160" cy="80" r="92" fill={`url(#${id}r)`} />

      {/* khung viền kép */}
      <rect x="8" y="8" width="304" height="144" rx="14" fill="none" stroke="#fff" strokeOpacity=".4" strokeDasharray="2 5" />
      <rect x="14" y="14" width="292" height="132" rx="11" fill="none" stroke={`url(#${id}s)`} strokeOpacity=".75" strokeWidth="1.4" />

      {/* hoa văn 4 góc */}
      {[[14, 14, 1, 1], [306, 14, -1, 1], [14, 146, 1, -1], [306, 146, -1, -1]].map(([x, y, sx, sy], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
          <path d="M0 22 Q0 0 22 0" fill="none" stroke={`url(#${id}s)`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M0 14 Q0 0 14 0" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1" />
          <circle cx="5" cy="5" r="2.4" fill={`url(#${id}s)`} />
        </g>
      ))}

      {/* biểu tượng trung tâm: 2 vòng quay + lục giác + dấu ? */}
      <g className="npk-spin" style={{ transformOrigin: '160px 80px' }}>
        <circle cx="160" cy="80" r="52" fill="none" stroke="#fff" strokeOpacity=".55" strokeDasharray="3 6" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <rect key={i} x={160 + 52 * Math.cos(a) - 3} y={80 + 52 * Math.sin(a) - 3} width="6" height="6"
            transform={`rotate(45 ${160 + 52 * Math.cos(a)} ${80 + 52 * Math.sin(a)})`} fill={`url(#${id}s)`} />;
        })}
      </g>
      <g className="npk-spin-r" style={{ transformOrigin: '160px 80px' }}>
        <circle cx="160" cy="80" r="42" fill="none" stroke={`url(#${id}s)`} strokeWidth="1.6" strokeDasharray="26 10" />
      </g>
      <polygon points="160,48 187.7,64 187.7,96 160,112 132.3,96 132.3,64"
        fill={pal.dark} fillOpacity=".7" stroke={`url(#${id}s)`} strokeWidth="2.2" />
      <polygon points="160,56 181,68 181,92 160,104 139,92 139,68" fill="none" stroke="#fff" strokeOpacity=".3" />
      <text x="160" y="94" textAnchor="middle" fontSize="38" fontWeight="900" fill={`url(#${id}s)`}
        style={{ fontFamily: 'Georgia, serif' }}>?</text>

      {/* lấp lánh */}
      {sparkles.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d={STAR} className="npk-twinkle" fill="#FDE68A" style={{ animationDelay: `${d}s`, transformOrigin: '0 0' }} />
        </g>
      ))}

      {/* nhãn */}
      <text x="26" y="34" fontSize="11" fontWeight="900" fill="#fff" fillOpacity=".85" letterSpacing="2">NPK</text>
      <text x="294" y="34" textAnchor="end" fontSize="13" fontWeight="900" fill="#FDE68A">#{String(idx + 1).padStart(2, '0')}</text>
      <text x="160" y="140" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" letterSpacing="3" className="npk-hint">
        CHẠM ĐỂ LẬT
      </text>
    </svg>
  );
}

/* ---------- MẶT TRƯỚC: thông tin thành viên ---------- */
function CardFront({ member, idx, pal }) {
  const id = `npkf${idx}`;
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 18,
      background: `linear-gradient(135deg,#fff 0%,${pal.bg} 100%)`,
      border: `2px solid ${pal.c}55`,
      boxShadow: `0 12px 28px ${pal.c}33`,
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 'clamp(8px,1.3vh,14px) 14px 8px 18px',
    }}>
      {/* nền SVG: số mờ, sóng, hoa văn góc */}
      <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" width="100%" height="100%"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={pal.c} />
            <stop offset="1" stopColor={pal.dark} />
          </linearGradient>
        </defs>
        <text x="312" y="150" textAnchor="end" fontSize="104" fontWeight="900" fill={pal.c} fillOpacity=".07">
          {String(idx + 1).padStart(2, '0')}
        </text>
        <path d="M0 132 Q60 112 120 130 T240 128 T320 120 V160 H0Z" fill={pal.c} fillOpacity=".07" />
        <path d="M0 146 Q80 128 160 144 T320 138 V160 H0Z" fill={pal.c} fillOpacity=".09" />
        <circle cx="300" cy="16" r="34" fill="none" stroke={pal.c} strokeOpacity=".16" strokeDasharray="3 5" />
        <circle cx="300" cy="16" r="20" fill={pal.c} fillOpacity=".08" />
        <g transform="translate(298 18)"><path d={STAR} fill={pal.c} fillOpacity=".5" transform="scale(1.2)" /></g>
        <rect x="0" y="0" width="6" height="160" fill={`url(#${id}a)`} />
      </svg>

      {/* avatar + vòng quay */}
      <div style={{ position: 'relative', width: 58, height: 58, flexShrink: 0 }}>
        <svg viewBox="0 0 64 64" width="58" height="58" className="npk-ring" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          <defs>
            <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={pal.c} />
              <stop offset="1" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="none" stroke={`url(#${id}r)`} strokeWidth="3" strokeDasharray="56 20" strokeLinecap="round" />
          <circle cx="32" cy="32" r="26" fill="none" stroke={pal.c} strokeOpacity=".35" strokeDasharray="2 4" />
        </svg>
        <div style={{
          position: 'absolute', inset: 6, borderRadius: '50%', background: '#fff',
          boxShadow: `0 4px 10px ${pal.c}40`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <MemberSvgAvatar memberId={member.id} size={42} />
        </div>
      </div>

      {/* thông tin */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
          <span style={{ fontSize: 'clamp(14px,1.6vh,17px)', fontWeight: 900, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {member.name}
          </span>
          <span style={{
            fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 8, flexShrink: 0,
            background: `linear-gradient(135deg,${pal.c},${pal.dark})`, color: '#fff',
            boxShadow: `0 2px 6px ${pal.c}55`,
          }}>
            {member.badge}
          </span>
        </div>

        <div style={{ fontSize: 'clamp(11.5px,1.3vh,13px)', color: pal.c, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {member.role}
        </div>

        {member.tasks && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 3, fontSize: 'clamp(10.5px,1.18vh,11.5px)', color: '#475569', lineHeight: 1.28 }}>
            {member.tasks.map((task, t) => (
              <div key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 5 }}>
                <svg width="8" height="8" viewBox="-8 -8 16 16" style={{ marginTop: 3, flexShrink: 0 }} aria-hidden="true">
                  <path d={STAR} fill={pal.c} transform="scale(1.1)" />
                </svg>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                  {task}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- CONFETTI khi mở hết ---------- */
function Confetti() {
  const items = useMemo(() => {
    const cols = ['#2563EB', '#DB2777', '#16A34A', '#7C3AED', '#F59E0B', '#0284C7', '#FDE047'];
    return Array.from({ length: 44 }).map((_, i) => ({
      left: Math.random() * 100,
      x: (Math.random() - 0.5) * 200,
      d: 2.2 + Math.random() * 1.8,
      dl: Math.random() * 0.7,
      s: 8 + Math.random() * 9,
      c: cols[i % cols.length],
      star: i % 3 === 0,
      round: i % 3 === 1,
    }));
  }, []);
  return (
    <div className="npk-confetti" aria-hidden="true">
      {items.map((p, i) => (
        <span key={i} className="npk-p" style={{
          left: `${p.left}%`, width: p.s, height: p.s, background: p.c,
          '--x': `${p.x}px`, '--d': `${p.d}s`, '--dl': `${p.dl}s`,
          borderRadius: p.round ? '50%' : 2,
          clipPath: p.star ? 'polygon(50% 0,62% 36%,100% 38%,70% 60%,80% 100%,50% 76%,20% 100%,30% 60%,0 38%,38% 36%)' : undefined,
        }} />
      ))}
    </div>
  );
}

export default function Slide03Members() {
  const [open, setOpen] = useState({});
  const total = TEAM_MEMBERS.length;
  const count = TEAM_MEMBERS.filter((m) => open[m.id]).length;
  const done = count === total;

  const toggle = useCallback((id) => setOpen((o) => ({ ...o, [id]: !o[id] })), []);
  const revealAll = () => setOpen(Object.fromEntries(TEAM_MEMBERS.map((m) => [m.id, true])));
  const resetAll = () => setOpen({});
  const pickRandom = () => {
    const pool = TEAM_MEMBERS.filter((m) => !open[m.id]);
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setOpen((o) => ({ ...o, [pick.id]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12, position: 'relative' }}>
      <style>{CSS}</style>
      {done && <Confetti />}

      {/* Tiêu đề + linh thú */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="chapter-pill" style={{ background: '#F0EBFF', color: '#6B21A8' }}>
            <Sparkles size={16} />
            <span>PHÂN CÔNG NHIỆM VỤ NHÓM</span>
          </div>
          <h2 className="slide-title npk-title" style={{ marginTop: 4 }}>
            BIỆT ĐỘI NPK — 9 THÀNH VIÊN
          </h2>
        </div>
        <LinhThuBietDoi />
      </div>

      {/* Thanh tiến độ + nút điều khiển */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} aria-label={`Đã lật ${count}/${total}`}>
          {TEAM_MEMBERS.map((m, i) => (
            <span key={m.id} style={{
              width: 22, height: 8, borderRadius: 4, transition: 'all .4s',
              background: open[m.id] ? PALETTE[i % 9].c : '#CBD5E1',
              boxShadow: open[m.id] ? `0 0 8px ${PALETTE[i % 9].c}99` : 'none',
            }} />
          ))}
          <span style={{ marginLeft: 8, fontWeight: 900, fontSize: 13, color: '#334155' }}>{count}/{total}</span>
        </div>

        {done ? (
          <div className="npk-win" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 12,
            background: 'linear-gradient(90deg,#F59E0B,#DB2777)', color: '#fff', fontWeight: 900, fontSize: 13,
          }}>
            <Trophy size={15} /> Đã mở khóa cả biệt đội!
          </div>
        ) : (
          <span style={{ fontSize: 12.5, color: '#64748B', fontWeight: 600 }}>Chạm vào thẻ để lật và xem ai trong đội</span>
        )}

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button className="npk-btn" style={{ '--c': '#7C3AED' }} onClick={pickRandom} disabled={done}>
            <Shuffle size={14} /> Lật ngẫu nhiên
          </button>
          <button className="npk-btn" style={{ '--c': '#2563EB' }} onClick={revealAll} disabled={done}>
            <Eye size={14} /> Lật tất cả
          </button>
          <button className="npk-btn" style={{ '--c': '#DB2777' }} onClick={resetAll} disabled={count === 0}>
            <RotateCcw size={14} /> Úp lại
          </button>
        </div>
      </div>

      {/* Lưới 3 x 3 thẻ lật */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
        gap: 'clamp(10px, 1.4vh, 16px)', flex: 1, minHeight: 0,
      }}>
        {TEAM_MEMBERS.map((member, idx) => {
          const pal = PALETTE[idx % PALETTE.length];
          const isOpen = !!open[member.id];
          return (
            <div
              key={member.id}
              className={`npk-wrap${isOpen ? ' on' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={isOpen}
              aria-label={isOpen ? `Thẻ ${member.name}, bấm để úp lại` : `Thẻ bí ẩn số ${idx + 1}, bấm để lật`}
              onClick={() => toggle(member.id)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(member.id); } }}
              style={{ '--c': pal.c, '--glow': `${pal.c}66`, animationDelay: `${idx * 0.25}s` }}
            >
              <div className="npk-inner">
                <div className="npk-face npk-back"><CardBack idx={idx} pal={pal} /></div>
                <div className="npk-face npk-front"><CardFront member={member} idx={idx} pal={pal} /></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}