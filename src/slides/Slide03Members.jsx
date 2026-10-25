import React, { useState, useCallback, memo } from 'react';
import { TEAM_MEMBERS } from '../data/slideData';
import {
  Sparkles, Shuffle, Eye, RotateCcw, Trophy,
  FlaskConical, Leaf, Sprout, Atom, Droplets, Microscope, BarChart3, BookOpen, Lightbulb,
} from 'lucide-react';
import LinhThuBietDoi from '../components/mascot/LinhThuBietDoi';

/* Đồng bộ theo hệ token màu chương NPK (Mục 6.2) */
const PALETTE = [
  { c: '#2563EB', dark: '#1E3A8A', bg: '#EFF6FF' },
  { c: '#EC4899', dark: '#831843', bg: '#FDF2F8' },
  { c: '#12B76A', dark: '#065F46', bg: '#ECFDF5' },
  { c: '#7C5CFF', dark: '#4C1D95', bg: '#F5F3FF' },
  { c: '#F79009', dark: '#7A2E0E', bg: '#FFFAEB' },
  { c: '#0EA5E9', dark: '#0369A1', bg: '#F0F9FF' },
  { c: '#7C5CFF', dark: '#4C1D95', bg: '#EDE9FE' },
  { c: '#F79009', dark: '#7A2E0E', bg: '#FEF0C7' },
  { c: '#12B76A', dark: '#065F46', bg: '#D1FAE5' },
];
const ICONS = [FlaskConical, Leaf, Sprout, Atom, Droplets, Microscope, BarChart3, BookOpen, Lightbulb];
const GOLD = '#FBBF24';

const CSS = `
.m3-wrap{position:relative;height:100%;min-height:0;perspective:1200px;cursor:pointer;outline:none;
  -webkit-tap-highlight-color:transparent;
  content-visibility:auto;contain-intrinsic-size:320px 160px;
  transition:transform .22s var(--ease-out);
  animation:m3-in .48s var(--ease-out) backwards;animation-delay:calc(var(--i,0) * 40ms)}
.m3-wrap:hover{transform:translateY(-4px)}
.m3-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;
  transition:transform .68s cubic-bezier(.22,1,.36,1)}
.m3-wrap.on .m3-inner{transform:rotateY(180deg)}
.m3-face{position:absolute;inset:0;border-radius:18px;overflow:hidden;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;
  box-shadow:0 2px 4px rgba(11,18,32,.08),0 14px 26px -12px var(--glow);
  transition:box-shadow .22s var(--ease-out)}
.m3-wrap:hover .m3-face{box-shadow:0 2px 4px rgba(11,18,32,.08),0 22px 34px -12px var(--glow)}
.m3-wrap:focus-visible .m3-face{box-shadow:0 0 0 3px #fff,0 0 0 6px var(--c)}
.m3-front{transform:rotateY(180deg)}

.m3-back::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.35) 50%,transparent 62%);
  transform:translateX(-130%);transition:transform .8s ease}
.m3-wrap:hover .m3-back::after{transform:translateX(130%)}

.m3-front::after{content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(115deg,transparent 32%,rgba(255,255,255,.85) 50%,transparent 68%);
  transform:translateX(-130%)}
.m3-wrap.on .m3-front::after{animation:m3-shine .9s .35s ease-out 1 forwards}
.m3-wrap.on .m3-rv{animation:m3-up .45s var(--ease-out) backwards;animation-delay:calc(.3s + var(--r,0) * 60ms)}
.m3-wrap.on .m3-medal{animation:m3-pop .5s var(--ease-out) .25s backwards}

.m3-btn{display:inline-flex;align-items:center;gap:6px;font-weight:800;font-size:12.5px;padding:8px 14px;
  border-radius:12px;border:1.5px solid var(--c);background:#fff;color:var(--c);cursor:pointer;
  transition:transform .2s var(--ease-out),background-color .2s,color .2s,box-shadow .2s}
.m3-btn:hover:not(:disabled){background:var(--c);color:#fff;transform:translateY(-2px);box-shadow:0 8px 16px -8px var(--c)}
.m3-btn:active:not(:disabled){transform:scale(.96)}
.m3-btn:focus-visible{outline:3px solid var(--c);outline-offset:2px}
.m3-btn:disabled{opacity:.4;cursor:default}

.m3-title{background:linear-gradient(90deg,var(--i-main),var(--p-main) 55%,var(--g-main));
  -webkit-background-clip:text;background-clip:text;color:transparent}
.m3-seg{width:26px;height:9px;border-radius:5px;
  transition:background-color .3s,box-shadow .3s,transform .3s var(--ease-out)}
.m3-seg.f{transform:scaleY(1.2)}
.m3-win{position:relative;overflow:hidden;animation:m3-pop .5s var(--ease-out) both}
.m3-win::after{content:'';position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.6) 50%,transparent 65%);
  transform:translateX(-120%);animation:m3-shine 1.3s .5s ease-out 1 forwards}

@keyframes m3-in{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}
@keyframes m3-up{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes m3-pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@keyframes m3-shine{to{transform:translateX(130%)}}

@media (prefers-reduced-motion:reduce){
  .m3-wrap,.m3-win,.m3-wrap.on .m3-rv,.m3-wrap.on .m3-medal,.m3-wrap.on .m3-front::after{animation:none}
  .m3-wrap,.m3-inner,.m3-back::after{transition-duration:.01s}
}
`;

function Medal({ idx, pal, size }) {
  const id = `m3m${idx}`;
  const Icon = ICONS[idx % ICONS.length];
  return (
    <div className="m3-medal" style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 80 80" width={size} height={size} style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={pal.c} /><stop offset="1" stopColor={pal.dark} />
          </linearGradient>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FEF0C7" /><stop offset=".5" stopColor={GOLD} /><stop offset="1" stopColor="#7A2E0E" />
          </linearGradient>
          <radialGradient id={`${id}h`} cx=".3" cy=".22" r=".7">
            <stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="40" cy="40" r="37" fill={`url(#${id}g)`} />
        <circle cx="40" cy="40" r="32" fill={`url(#${id}f)`} />
        <circle cx="40" cy="40" r="32" fill="none" stroke="#fff" strokeOpacity=".35" strokeDasharray="2 3" />
        <ellipse cx="31" cy="26" rx="18" ry="11" fill={`url(#${id}h)`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
        <Icon size={Math.round(size * 0.42)} color="#fff" strokeWidth={2.3} />
      </div>
    </div>
  );
}

function CardBack({ idx, pal }) {
  const id = `m3b${idx}`;
  return (
    <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={pal.c} /><stop offset="1" stopColor={pal.dark} />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF0C7" /><stop offset=".5" stopColor={GOLD} /><stop offset="1" stopColor="#7A2E0E" />
        </linearGradient>
        <radialGradient id={`${id}r`}>
          <stop offset="0" stopColor="#fff" stopOpacity=".4" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}p`} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M11 0V22M0 11H22" stroke="#fff" strokeOpacity=".07" />
          <circle cx="11" cy="11" r="1.6" fill="#fff" fillOpacity=".18" />
        </pattern>
      </defs>
      <rect width="320" height="160" fill={`url(#${id}g)`} />
      <rect width="320" height="160" fill={`url(#${id}p)`} />
      <circle cx="160" cy="80" r="92" fill={`url(#${id}r)`} />

      <rect x="9" y="9" width="302" height="142" rx="13" fill="none" stroke="#fff" strokeOpacity=".4" strokeDasharray="2 5" />
      <rect x="15" y="15" width="290" height="130" rx="10" fill="none" stroke={`url(#${id}s)`} strokeOpacity=".85" strokeWidth="1.4" />
      {[[15, 15, 1, 1], [305, 15, -1, 1], [15, 145, 1, -1], [305, 145, -1, -1]].map(([x, y, sx, sy], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
          <path d="M0 20 Q0 0 20 0" fill="none" stroke={`url(#${id}s)`} strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="5" cy="5" r="2.3" fill={`url(#${id}s)`} />
        </g>
      ))}

      <circle cx="160" cy="80" r="50" fill="none" stroke="#fff" strokeOpacity=".45" strokeDasharray="3 6" />
      <polygon points="160,47 188.6,63.5 188.6,96.5 160,113 131.4,96.5 131.4,63.5"
        fill={pal.dark} fillOpacity=".7" stroke={`url(#${id}s)`} strokeWidth="2.2" />
      <polygon points="160,55 181.7,67.5 181.7,92.5 160,105 138.3,92.5 138.3,67.5" fill="none" stroke="#fff" strokeOpacity=".3" />
      <text x="160" y="94" textAnchor="middle" fontSize="38" fontWeight="900" fill={`url(#${id}s)`}
        style={{ fontFamily: 'Georgia, serif' }}>?</text>

      <text x="30" y="38" fontSize="12" fontWeight="900" fill="#fff" fillOpacity=".85" letterSpacing="2">NPK</text>
      <text x="290" y="38" textAnchor="end" fontSize="13.5" fontWeight="900" fill="#FEF0C7">#{String(idx + 1).padStart(2, '0')}</text>
      <text x="160" y="136" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fff" fillOpacity=".9" letterSpacing="2">
        CHẠM ĐỂ LẬT
      </text>
    </svg>
  );
}

function CardFront({ member, idx, pal }) {
  const tasks = (member.tasks || []).slice(0, 3);
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: 18,
      border: '2.5px solid transparent',
      background: `linear-gradient(160deg,#FFFFFF 0%,#FFFFFF 55%,${pal.bg} 100%) padding-box,
                   linear-gradient(135deg,${pal.c},${GOLD} 50%,${pal.dark}) border-box`,
      display: 'flex', alignItems: 'center', gap: 'clamp(10px,1.2vw,16px)',
      padding: 'clamp(8px,1.2vh,14px) 14px clamp(8px,1.2vh,14px) 20px',
    }}>
      <svg viewBox="0 0 320 160" preserveAspectRatio="xMaxYMax slice" width="100%" height="100%"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <linearGradient id={`m3f${idx}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={pal.c} /><stop offset="1" stopColor={pal.dark} />
          </linearGradient>
        </defs>
        <text x="314" y="154" textAnchor="end" fontSize="92" fontWeight="900" fill={pal.c} fillOpacity=".06">
          {String(idx + 1).padStart(2, '0')}
        </text>
        <path d="M0 148 Q80 130 160 146 T320 140 V160 H0Z" fill={pal.c} fillOpacity=".08" />
        <rect x="0" y="0" width="7" height="160" fill={`url(#m3f${idx})`} />
      </svg>

      <Medal idx={idx} pal={pal} size={70} />

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0, flex: 1 }}>
        <div className="m3-rv" style={{ '--r': 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontSize: 'clamp(15px,1.95vh,19px)', fontWeight: 900, color: 'var(--ink)', lineHeight: 1.15,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {member.name}
          </span>
          {member.badge && (
            <span style={{
              fontSize: 11, fontWeight: 900, padding: '3px 9px', borderRadius: 999, flexShrink: 0,
              background: `linear-gradient(135deg,${pal.c},${pal.dark})`, color: '#fff',
              boxShadow: `0 3px 8px ${pal.c}55`,
            }}>
              {member.badge}
            </span>
          )}
        </div>

        <div className="m3-rv" style={{ '--r': 1, display: 'flex' }}>
          <span style={{
            fontSize: 'clamp(12px,1.45vh,13.5px)', fontWeight: 800, color: pal.dark, lineHeight: 1.2,
            background: `${pal.c}1A`, border: `1px solid ${pal.c}55`, padding: '2px 10px', borderRadius: 8,
            maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {member.role}
          </span>
        </div>

        {tasks.length > 0 && (
          <>
            <div className="m3-rv" style={{
              '--r': 2, height: 2, borderRadius: 2, margin: '1px 0',
              background: `linear-gradient(90deg,${pal.c},${pal.c}00)`,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {tasks.map((task, t) => (
                <div key={t} className="m3-rv" title={task} style={{
                  '--r': 3 + t, display: 'flex', alignItems: 'flex-start', gap: 6,
                  fontSize: 'clamp(12px,1.45vh,13.5px)', color: 'var(--ink-soft)', fontWeight: 600, lineHeight: 1.3,
                }}>
                  <svg width="13" height="13" viewBox="0 0 16 16" style={{ marginTop: 1.5, flexShrink: 0 }} aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill={pal.c} />
                    <path d="M4.5 8.3l2.3 2.3 4.7-5" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                    {task}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const FlipCard = memo(function FlipCard({ member, idx, isOpen, onToggle }) {
  const pal = PALETTE[idx % PALETTE.length];
  return (
    <div
      className={`m3-wrap${isOpen ? ' on' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
      aria-label={isOpen ? `Thẻ ${member.name}, bấm để úp lại` : `Thẻ bí ẩn số ${idx + 1}, bấm để lật`}
      onClick={() => onToggle(member.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(member.id); } }}
      style={{ '--c': pal.c, '--glow': `${pal.c}77`, '--i': idx }}
    >
      <div className="m3-inner">
        <div className="m3-face m3-back"><CardBack idx={idx} pal={pal} /></div>
        <div className="m3-face m3-front"><CardFront member={member} idx={idx} pal={pal} /></div>
      </div>
    </div>
  );
});

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
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%', gap: 12, position: 'relative',
    }}>
      <style>{CSS}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="chapter-pill" style={{ background: 'var(--p-tint)', color: 'var(--p-deep)', borderColor: 'var(--p-line)' }}>
            <Sparkles size={16} />
            <span>Phân công nhiệm vụ nhóm</span>
          </div>
          <h2 className="slide-title m3-title" style={{ marginTop: 4 }}>
            Biệt đội NPK — 9 thành viên
          </h2>
        </div>
        <LinhThuBietDoi />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} role="status" aria-label={`Đã lật ${count}/${total}`}>
          {TEAM_MEMBERS.map((m, i) => (
            <span key={m.id} className={`m3-seg${open[m.id] ? ' f' : ''}`} style={{
              background: open[m.id] ? PALETTE[i % 9].c : '#CBD5E1',
              boxShadow: open[m.id] ? `0 0 8px ${PALETTE[i % 9].c}99` : 'none',
            }} />
          ))}
          <span style={{ marginLeft: 8, fontWeight: 900, fontSize: 13, color: 'var(--ink-soft)', fontVariantNumeric: 'tabular-nums' }}>
            {count}/{total}
          </span>
        </div>

        {done ? (
          <div className="m3-win" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 12,
            background: 'linear-gradient(90deg,var(--k-main),var(--g-main))', color: '#fff', fontWeight: 900, fontSize: 13,
            boxShadow: '0 8px 18px -8px var(--g-glow)',
          }}>
            <Trophy size={15} /> Đã mở khóa cả biệt đội
          </div>
        ) : (
          <span style={{ fontSize: 13, color: 'var(--ink-mute)', fontWeight: 600 }}>Chạm vào thẻ để lật và xem từng thành viên</span>
        )}

        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button className="m3-btn" style={{ '--c': '#7C5CFF' }} onClick={pickRandom} disabled={done}>
            <Shuffle size={14} /> Lật ngẫu nhiên
          </button>
          <button className="m3-btn" style={{ '--c': '#2563EB' }} onClick={revealAll} disabled={done}>
            <Eye size={14} /> Lật tất cả
          </button>
          <button className="m3-btn" style={{ '--c': '#EC4899' }} onClick={resetAll} disabled={count === 0}>
            <RotateCcw size={14} /> Úp lại
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
        gap: 'clamp(10px, 1.5vh, 18px)', flex: 1, minHeight: 0,
      }}>
        {TEAM_MEMBERS.map((member, idx) => (
          <FlipCard key={member.id} member={member} idx={idx} isOpen={!!open[member.id]} onToggle={toggle} />
        ))}
      </div>
    </div>
  );
}