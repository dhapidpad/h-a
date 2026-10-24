import React, { useState, useMemo, useCallback, useEffect, useRef, memo } from 'react';
import { TEAM_MEMBERS } from '../data/slideData';
import {
  Sparkles, Shuffle, Eye, RotateCcw, Trophy,
  FlaskConical, Leaf, Sprout, Atom, Droplets, Microscope, BarChart3, BookOpen, Lightbulb,
} from 'lucide-react';
import LinhThuBietDoi from '../components/mascot/LinhThuBietDoi';

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

/* Mỗi thành viên một biểu tượng riêng (chủ đề hóa học – nông nghiệp) */
const ICONS = [FlaskConical, Leaf, Sprout, Atom, Droplets, Microscope, BarChart3, BookOpen, Lightbulb];

const STAR = 'M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8 Z';
const GOLD = '#FBBF24';

const CSS = `
/* ===== Khung thẻ: các lớp transform tách biệt ===== */
.npk-wrap{
  --s:1;--cd:0ms;
  position:relative;perspective:1000px;height:100%;min-height:0;cursor:pointer;outline:none;
  -webkit-tap-highlight-color:transparent;
  animation:npk-deal .8s cubic-bezier(.2,.9,.25,1.15) both;
  animation-delay:calc(var(--i,0) * 70ms + 120ms);
}
.npk-wrap:hover{--s:1.035;z-index:5}
.npk-wrap.closing{z-index:6}
.npk-float{
  width:100%;height:100%;transform-style:preserve-3d;
  animation:npk-bob 4.4s ease-in-out infinite;animation-delay:var(--bd,0s);
}
.npk-wrap.on .npk-float,.npk-wrap:hover .npk-float{animation-play-state:paused}
.npk-tilt{
  width:100%;height:100%;transform-style:preserve-3d;
  transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) scale(var(--s));
  transition:transform .45s cubic-bezier(.2,.9,.3,1);will-change:transform;
}
.npk-wrap.hot .npk-tilt{transition:transform .08s linear}
.npk-inner{
  position:relative;width:100%;height:100%;transform-style:preserve-3d;
  transition:transform 1s cubic-bezier(.3,1.35,.45,1);
}
.npk-wrap.on .npk-inner{transform:rotateY(180deg)}

/* ===== ÚP THẺ: nhấc lên → xoay ngược → ĐẬP xuống ===== */
.npk-wrap.closing .npk-inner{
  transition:transform .95s cubic-bezier(.55,-.25,.3,1.3);
  transition-delay:var(--cd);
}
.npk-wrap.closing .npk-tilt{animation:npk-slam 1.05s cubic-bezier(.4,0,.3,1) var(--cd) both}
.npk-wrap.closing .npk-face{box-shadow:0 0 0 3px #fff,0 0 34px 6px var(--c)}

.npk-face{
  position:absolute;inset:0;border-radius:18px;overflow:hidden;
  backface-visibility:hidden;-webkit-backface-visibility:hidden;
  box-shadow:0 14px 28px -10px var(--glow),0 2px 6px rgba(15,23,42,.12);
  transition:box-shadow .35s;
}
.npk-wrap:hover .npk-face{box-shadow:0 22px 38px -12px var(--glow),0 4px 10px rgba(15,23,42,.14)}
.npk-wrap:focus-visible .npk-face{box-shadow:0 0 0 3px #fff,0 0 0 6px var(--c)}
.npk-front{transform:rotateY(180deg)}

/* chớp sáng + sóng xung kích + bụi khi thẻ đập xuống */
.npk-flash{
  position:absolute;inset:0;pointer-events:none;z-index:3;opacity:0;
  background:radial-gradient(circle at 50% 55%,#fff 0%,rgba(255,255,255,.7) 30%,rgba(255,255,255,0) 70%);
  animation:npk-flash .7s calc(.62s + var(--cd)) ease-out both;
}
.npk-slam{position:absolute;left:50%;bottom:8%;width:0;height:0;pointer-events:none;z-index:30}
.npk-slam b{
  position:absolute;left:-30px;top:-10px;width:60px;height:20px;border-radius:50%;
  border:3px solid var(--c);opacity:0;animation:npk-shock .8s calc(.62s + var(--cd)) cubic-bezier(.1,.7,.3,1) both;
}
.npk-slam b.b2{border-color:${GOLD};border-width:2px;animation-delay:calc(.72s + var(--cd))}
.npk-slam i{
  position:absolute;left:-7px;top:-7px;width:14px;height:14px;border-radius:50%;
  background:radial-gradient(circle,#fff,#CBD5E1);opacity:0;
  animation:npk-dust .85s calc(.62s + var(--cd)) cubic-bezier(.15,.8,.3,1) both;
}
.npk-slam em{
  position:absolute;left:-50px;top:-60px;width:100px;text-align:center;font-style:normal;
  font-weight:900;font-size:13px;letter-spacing:2px;color:#fff;padding:3px 0;border-radius:8px;
  background:linear-gradient(90deg,var(--c),#0F172A);opacity:0;
  animation:npk-stamp .9s calc(.64s + var(--cd)) cubic-bezier(.3,1.6,.5,1) both;
}

/* ===== Ánh sáng chạy theo con trỏ ===== */
.npk-glare{
  position:absolute;inset:0;pointer-events:none;opacity:var(--g,0);transition:opacity .3s;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.5),rgba(255,255,255,0) 55%);
}
.npk-holo{
  position:absolute;inset:0;pointer-events:none;opacity:var(--g,0);transition:opacity .3s;
  background:linear-gradient(115deg,transparent calc(var(--mx,50%) - 28%),rgba(255,255,255,.6) var(--mx,50%),
    rgba(251,191,36,.18) calc(var(--mx,50%) + 8%),transparent calc(var(--mx,50%) + 28%));
}
.npk-back::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,.28) 50%,transparent 60%);
  transform:translateX(-140%);animation:npk-sweep 6s ease-in-out infinite;animation-delay:var(--bd,0s);
}
.npk-front::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.95) 50%,transparent 70%);
  transform:translateX(-130%);
}
.npk-wrap.on .npk-front::after{animation:npk-shine 1.1s .45s ease-out 1 forwards}

/* ===== Nội dung mặt trước hiện lần lượt ===== */
.npk-wrap.on .npk-rv{animation:npk-up .55s cubic-bezier(.2,.9,.3,1) both;animation-delay:calc(.5s + var(--r,0) * 80ms)}
.npk-wrap.on .npk-av{animation:npk-zoom .75s cubic-bezier(.34,1.56,.64,1) .4s both}

/* ===== Hiệu ứng nhỏ ===== */
.npk-spin{animation:npk-rot 18s linear infinite}
.npk-spin-r{animation:npk-rot 12s linear infinite reverse}
.npk-twinkle{animation:npk-tw 2.4s ease-in-out infinite}
.npk-ring{animation:npk-rot 10s linear infinite}
.npk-hint{animation:npk-pulse 1.9s ease-in-out infinite}
.npk-halo{animation:npk-halo 3s ease-in-out infinite}
.npk-icon{filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}

/* tia lửa bung ra khi lật mở */
.npk-burst{position:absolute;left:50%;top:50%;width:0;height:0;pointer-events:none;z-index:30}
.npk-burst i{position:absolute;left:-4px;top:-4px;width:8px;height:8px;border-radius:50%;opacity:0;
  animation:npk-burst .8s .36s cubic-bezier(.15,.8,.3,1) both}
.npk-burst b{position:absolute;left:-14px;top:-14px;width:28px;height:28px;border-radius:50%;
  border:3px solid var(--c);opacity:0;animation:npk-ripple .8s .36s ease-out both}

/* ===== Nút ===== */
.npk-btn{
  display:inline-flex;align-items:center;gap:6px;font-weight:800;font-size:12px;
  padding:8px 14px;border-radius:12px;border:1.5px solid var(--c);background:#fff;color:var(--c);
  cursor:pointer;transition:transform .2s cubic-bezier(.34,1.56,.64,1),background .2s,color .2s,box-shadow .2s;
}
.npk-btn:hover:not(:disabled){background:var(--c);color:#fff;transform:translateY(-2px);box-shadow:0 8px 16px -6px var(--c)}
.npk-btn:active:not(:disabled){transform:translateY(0) scale(.96)}
.npk-btn:focus-visible{outline:3px solid var(--c);outline-offset:2px}
.npk-btn:disabled{opacity:.4;cursor:default}

/* ===== Tiêu đề, tiến độ ===== */
.npk-title{
  background:linear-gradient(90deg,#1D4ED8,#7C3AED,#DB2777,#7C3AED,#1D4ED8);
  background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:npk-shift 7s linear infinite;
}
.npk-seg{position:relative;width:24px;height:9px;border-radius:5px;overflow:hidden;
  transition:background .4s,box-shadow .4s,transform .4s cubic-bezier(.34,1.56,.64,1)}
.npk-seg.f{transform:scaleY(1.25)}
.npk-seg.f::after{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent);
  transform:translateX(-100%);animation:npk-shine 1.6s ease-out 1 forwards}
.npk-count{display:inline-block;min-width:34px;font-variant-numeric:tabular-nums}
.npk-win{position:relative;overflow:hidden;animation:npk-pop .7s cubic-bezier(.34,1.56,.64,1) both}
.npk-win::after{content:'';position:absolute;inset:0;
  background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.55) 50%,transparent 65%);
  transform:translateX(-120%);animation:npk-shine 2.4s 1s ease-in-out infinite}

.npk-aurora{position:absolute;inset:-20px;z-index:-1;pointer-events:none;overflow:hidden}
.npk-aurora span{position:absolute;border-radius:50%;opacity:.5;animation:npk-drift 14s ease-in-out infinite}

.npk-confetti{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:40}
.npk-p{position:absolute;top:-24px;animation:npk-fall var(--d) cubic-bezier(.3,.6,.5,1) var(--dl) forwards}

@keyframes npk-deal{from{opacity:0;transform:translateY(34px) rotate(-5deg) scale(.82)}to{opacity:1;transform:none}}
@keyframes npk-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
@keyframes npk-rot{to{transform:rotate(360deg)}}
@keyframes npk-tw{0%,100%{opacity:.2;transform:scale(.6)}50%{opacity:1;transform:scale(1.2)}}
@keyframes npk-pulse{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes npk-halo{0%,100%{opacity:.5;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
@keyframes npk-shine{to{transform:translateX(130%)}}
@keyframes npk-sweep{0%,55%{transform:translateX(-140%)}100%{transform:translateX(140%)}}
@keyframes npk-up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes npk-zoom{from{opacity:0;transform:scale(.4) rotate(-40deg)}to{opacity:1;transform:none}}
@keyframes npk-burst{0%{opacity:1;transform:rotate(var(--a)) translateX(12px) scale(1)}
  100%{opacity:0;transform:rotate(var(--a)) translateX(var(--r)) scale(.2)}}
@keyframes npk-ripple{0%{opacity:.9;transform:scale(.3)}100%{opacity:0;transform:scale(5.5)}}
@keyframes npk-shift{to{background-position:200% 0}}
@keyframes npk-drift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-26px) scale(1.15)}}
@keyframes npk-fall{0%{transform:translate(0,0) rotate(0);opacity:1}
  100%{transform:translate(var(--x),112vh) rotate(720deg);opacity:.9}}
@keyframes npk-pop{from{transform:scale(.5);opacity:0}to{transform:scale(1);opacity:1}}

/* úp thẻ: nhấc cao, nghiêng, rồi đập xuống nảy nhẹ */
@keyframes npk-slam{
  0%{transform:translateY(0) scale(1) rotateZ(0)}
  28%{transform:translateY(-26px) scale(1.2) rotateZ(-4deg)}
  56%{transform:translateY(-8px) scale(1.12) rotateZ(2deg)}
  66%{transform:translateY(5px) scale(.9) rotateZ(0)}
  80%{transform:translateY(-3px) scale(1.04)}
  100%{transform:translateY(0) scale(1)}
}
@keyframes npk-flash{0%{opacity:0}25%{opacity:1}100%{opacity:0}}
@keyframes npk-shock{0%{opacity:1;transform:scale(.3)}100%{opacity:0;transform:scale(7)}}
@keyframes npk-dust{
  0%{opacity:.95;transform:translate(0,0) scale(.5)}
  100%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(2.2)}
}
@keyframes npk-stamp{
  0%{opacity:0;transform:translateY(8px) scale(.4) rotate(-14deg)}
  35%{opacity:1;transform:translateY(0) scale(1.15) rotate(-6deg)}
  75%{opacity:1;transform:scale(1) rotate(-6deg)}
  100%{opacity:0;transform:translateY(-14px) scale(1) rotate(-6deg)}
}

@media (prefers-reduced-motion:reduce){
  .npk-wrap,.npk-float,.npk-spin,.npk-spin-r,.npk-twinkle,.npk-ring,.npk-hint,.npk-halo,
  .npk-title,.npk-p,.npk-back::after,.npk-aurora span,.npk-win,.npk-win::after,.npk-rv,.npk-av,
  .npk-wrap.closing .npk-tilt{animation:none!important}
  .npk-inner,.npk-wrap.closing .npk-inner{transition-duration:.01s;transition-delay:0s}
  .npk-tilt{transition:none}
  .npk-burst,.npk-slam,.npk-flash{display:none}
}
`;

/* ---------- Huy hiệu icon thành viên ---------- */
function Medal({ idx, pal, size = 66 }) {
  const id = `npkm${idx}`;
  const Icon = ICONS[idx % ICONS.length];
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 80 80" width={size} height={size} style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <defs>
          <linearGradient id={`${id}f`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={pal.c} />
            <stop offset="1" stopColor={pal.dark} />
          </linearGradient>
          <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FEF3C7" />
            <stop offset=".5" stopColor={GOLD} />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
          <radialGradient id={`${id}h`} cx=".3" cy=".22" r=".7">
            <stop offset="0" stopColor="#fff" stopOpacity=".75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* vành răng cưa xoay */}
        <g className="npk-ring" style={{ transformOrigin: '40px 40px' }}>
          {Array.from({ length: 16 }).map((_, i) => (
            <rect key={i} x="38.5" y="1" width="3" height="6" rx="1.5" fill={`url(#${id}g)`}
              transform={`rotate(${i * 22.5} 40 40)`} />
          ))}
        </g>
        <circle cx="40" cy="40" r="30" fill={`url(#${id}g)`} />
        <circle cx="40" cy="40" r="27" fill={`url(#${id}f)`} />
        <circle cx="40" cy="40" r="27" fill="none" stroke="#fff" strokeOpacity=".35" strokeDasharray="2 3" />
        <ellipse cx="31" cy="26" rx="17" ry="11" fill={`url(#${id}h)`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon className="npk-icon" size={Math.round(size * 0.4)} color="#fff" strokeWidth={2.3} />
      </div>
    </div>
  );
}

/* ---------- MẶT SAU: thẻ bí ẩn, úp bầm ---------- */
function CardBack({ idx, pal }) {
  const id = `npkb${idx}`;
  const sparkles = [[48, 38, 0], [272, 40, 0.7], [38, 122, 1.2], [282, 120, 0.3], [96, 24, 1.6], [226, 136, 0.9], [200, 22, 2]];
  return (
    <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={pal.c} />
          <stop offset="1" stopColor={pal.dark} />
        </linearGradient>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FEF3C7" />
          <stop offset=".5" stopColor={GOLD} />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id={`${id}r`}>
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}v`} cx=".5" cy=".5" r=".75">
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </radialGradient>
        <pattern id={`${id}p`} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M11 0V22M0 11H22" stroke="#fff" strokeOpacity=".08" />
          <circle cx="11" cy="11" r="1.7" fill="#fff" fillOpacity=".2" />
        </pattern>
      </defs>
      <rect width="320" height="160" fill={`url(#${id}g)`} />
      <rect width="320" height="160" fill={`url(#${id}p)`} />
      <circle cx="160" cy="80" r="96" fill={`url(#${id}r)`} className="npk-halo" style={{ transformOrigin: '160px 80px' }} />
      <rect width="320" height="160" fill={`url(#${id}v)`} />

      <rect x="8" y="8" width="304" height="144" rx="14" fill="none" stroke="#fff" strokeOpacity=".4" strokeDasharray="2 5" />
      <rect x="14" y="14" width="292" height="132" rx="11" fill="none" stroke={`url(#${id}s)`} strokeOpacity=".8" strokeWidth="1.4" />

      {[[14, 14, 1, 1], [306, 14, -1, 1], [14, 146, 1, -1], [306, 146, -1, -1]].map(([x, y, sx, sy], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
          <path d="M0 22 Q0 0 22 0" fill="none" stroke={`url(#${id}s)`} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M0 14 Q0 0 14 0" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1" />
          <circle cx="5" cy="5" r="2.4" fill={`url(#${id}s)`} />
        </g>
      ))}

      <g className="npk-spin" style={{ transformOrigin: '160px 80px' }}>
        <circle cx="160" cy="80" r="54" fill="none" stroke="#fff" strokeOpacity=".5" strokeDasharray="3 6" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return <rect key={i} x={160 + 54 * Math.cos(a) - 3} y={80 + 54 * Math.sin(a) - 3} width="6" height="6"
            transform={`rotate(45 ${160 + 54 * Math.cos(a)} ${80 + 54 * Math.sin(a)})`} fill={`url(#${id}s)`} />;
        })}
      </g>
      <g className="npk-spin-r" style={{ transformOrigin: '160px 80px' }}>
        <circle cx="160" cy="80" r="43" fill="none" stroke={`url(#${id}s)`} strokeWidth="1.6" strokeDasharray="26 10" />
      </g>
      <polygon points="160,48 187.7,64 187.7,96 160,112 132.3,96 132.3,64"
        fill={pal.dark} fillOpacity=".72" stroke={`url(#${id}s)`} strokeWidth="2.2" />
      <polygon points="160,56 181,68 181,92 160,104 139,92 139,68" fill="none" stroke="#fff" strokeOpacity=".3" />
      <text x="160" y="94" textAnchor="middle" fontSize="38" fontWeight="900" fill={`url(#${id}s)`}
        style={{ fontFamily: 'Georgia, serif' }}>?</text>

      {sparkles.map(([x, y, d], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <path d={STAR} className="npk-twinkle" fill="#FDE68A" style={{ animationDelay: `${d}s`, transformOrigin: '0 0' }} />
        </g>
      ))}

      <text x="26" y="34" fontSize="11" fontWeight="900" fill="#fff" fillOpacity=".85" letterSpacing="2">NPK</text>
      <text x="294" y="34" textAnchor="end" fontSize="13" fontWeight="900" fill="#FDE68A">#{String(idx + 1).padStart(2, '0')}</text>
      <text x="160" y="140" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" letterSpacing="3" className="npk-hint">
        CHẠM ĐỂ LẬT
      </text>
    </svg>
  );
}

/* ---------- MẶT TRƯỚC: bố cục chữ rõ ràng ---------- */
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
      {/* dải màu bên trái + số thứ tự mờ ở góc (không đè chữ) */}
      <svg viewBox="0 0 320 160" preserveAspectRatio="xMaxYMax slice" width="100%" height="100%"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <linearGradient id={`npkf${idx}a`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={pal.c} />
            <stop offset="1" stopColor={pal.dark} />
          </linearGradient>
        </defs>
        <text x="314" y="154" textAnchor="end" fontSize="92" fontWeight="900" fill={pal.c} fillOpacity=".06">
          {String(idx + 1).padStart(2, '0')}
        </text>
        <path d="M0 148 Q80 130 160 146 T320 140 V160 H0Z" fill={pal.c} fillOpacity=".08" />
        <rect x="0" y="0" width="7" height="160" fill={`url(#npkf${idx}a)`} />
      </svg>

      {/* huy hiệu icon */}
      <div className="npk-av" style={{ position: 'relative' }}>
        <Medal idx={idx} pal={pal} size={68} />
      </div>

      {/* thông tin: tên → vai trò → nhiệm vụ */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0, flex: 1 }}>
        <div className="npk-rv" style={{ '--r': 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
            fontSize: 'clamp(15px,1.95vh,19px)', fontWeight: 900, color: '#0B1220', lineHeight: 1.15,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {member.name}
          </span>
          <span style={{
            fontSize: 10.5, fontWeight: 900, padding: '3px 9px', borderRadius: 999, flexShrink: 0,
            background: `linear-gradient(135deg,${pal.c},${pal.dark})`, color: '#fff',
            boxShadow: `0 3px 8px ${pal.c}66`,
          }}>
            {member.badge}
          </span>
        </div>

        <div className="npk-rv" style={{ '--r': 1, display: 'flex' }}>
          <span style={{
            fontSize: 'clamp(11.5px,1.4vh,13.5px)', fontWeight: 800, color: pal.dark, lineHeight: 1.2,
            background: `${pal.c}1A`, border: `1px solid ${pal.c}55`, padding: '2px 10px', borderRadius: 8,
            maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {member.role}
          </span>
        </div>

        {tasks.length > 0 && (
          <>
            <div className="npk-rv" style={{
              '--r': 2, height: 2, borderRadius: 2, margin: '1px 0',
              background: `linear-gradient(90deg,${pal.c},${pal.c}00)`,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {tasks.map((task, t) => (
                <div key={t} className="npk-rv" title={task} style={{
                  '--r': 3 + t, display: 'flex', alignItems: 'flex-start', gap: 6,
                  fontSize: 'clamp(11.5px,1.4vh,13px)', color: '#1E293B', fontWeight: 600, lineHeight: 1.3,
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

/* ---------- Tia lửa bung ra khi lật mở ---------- */
function Burst({ color }) {
  return (
    <div className="npk-burst" aria-hidden="true">
      <b />
      {Array.from({ length: 14 }).map((_, i) => (
        <i key={i} style={{
          '--a': `${i * (360 / 14)}deg`,
          '--r': `${64 + (i % 3) * 26}px`,
          background: i % 2 ? color : GOLD,
          width: i % 3 === 0 ? 10 : 7, height: i % 3 === 0 ? 10 : 7,
          borderRadius: i % 4 === 0 ? 2 : '50%',
        }} />
      ))}
    </div>
  );
}

/* ---------- Sóng xung kích + bụi + tem "ÚP!" khi đập xuống ---------- */
function Slam() {
  return (
    <div className="npk-slam" aria-hidden="true">
      <b />
      <b className="b2" />
      {Array.from({ length: 12 }).map((_, i) => {
        const side = i % 2 ? 1 : -1;
        return (
          <i key={i} style={{
            '--dx': `${side * (30 + (i % 6) * 16)}px`,
            '--dy': `${-14 - (i % 4) * 9}px`,
            animationDelay: `calc(.62s + var(--cd) + ${(i % 3) * 0.03}s)`,
            width: 10 + (i % 3) * 4, height: 10 + (i % 3) * 4,
          }} />
        );
      })}
      <em>ÚP!</em>
    </div>
  );
}

/* ---------- MỘT THẺ (tilt 3D theo chuột) ---------- */
const FlipCard = memo(function FlipCard({ member, idx, isOpen, onToggle, cascade }) {
  const pal = PALETTE[idx % PALETTE.length];
  const [closing, setClosing] = useState(false);
  const prevOpen = useRef(false);
  const cd = cascade ? idx * 75 : 0;

  /* phát hiện khoảnh khắc thẻ chuyển từ mở → úp */
  useEffect(() => {
    if (isOpen) { prevOpen.current = true; setClosing(false); return undefined; }
    if (prevOpen.current) {
      prevOpen.current = false;
      setClosing(true);
      const t = setTimeout(() => setClosing(false), 1900 + cd);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isOpen, cd]);

  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.classList.add('hot');
    el.style.setProperty('--ry', `${((px - 0.5) * 16).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${((0.5 - py) * 12).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    el.style.setProperty('--g', '1');
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.classList.remove('hot');
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--g', '0');
  };

  return (
    <div
      className={`npk-wrap${isOpen ? ' on' : ''}${closing ? ' closing' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
      aria-label={isOpen ? `Thẻ ${member.name}, bấm để úp lại` : `Thẻ bí ẩn số ${idx + 1}, bấm để lật`}
      onClick={() => onToggle(member.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(member.id); } }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ '--c': pal.c, '--glow': `${pal.c}88`, '--i': idx, '--bd': `${(idx % 5) * 0.45}s`, '--cd': `${cd}ms` }}
    >
      <div className="npk-float">
        <div className="npk-tilt">
          <div className="npk-inner">
            <div className="npk-face npk-back">
              <CardBack idx={idx} pal={pal} />
              <div className="npk-glare" />
              {closing && <div className="npk-flash" />}
            </div>
            <div className="npk-face npk-front">
              <CardFront member={member} idx={idx} pal={pal} />
              <div className="npk-holo" />
            </div>
          </div>
        </div>
      </div>
      {isOpen && <Burst color={pal.c} />}
      {closing && <Slam />}
    </div>
  );
});

/* ---------- CONFETTI khi mở hết ---------- */
function Confetti() {
  const items = useMemo(() => {
    const cols = ['#2563EB', '#DB2777', '#16A34A', '#7C3AED', '#F59E0B', '#0284C7', '#FDE047'];
    return Array.from({ length: 56 }).map((_, i) => ({
      left: Math.random() * 100,
      x: (Math.random() - 0.5) * 240,
      d: 2.2 + Math.random() * 1.8,
      dl: Math.random() * 0.8,
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
  const [cascade, setCascade] = useState(false);
  const total = TEAM_MEMBERS.length;
  const count = TEAM_MEMBERS.filter((m) => open[m.id]).length;
  const done = count === total;

  const toggle = useCallback((id) => { setCascade(false); setOpen((o) => ({ ...o, [id]: !o[id] })); }, []);
  const revealAll = () => { setCascade(false); setOpen(Object.fromEntries(TEAM_MEMBERS.map((m) => [m.id, true]))); };
  const resetAll = () => { setCascade(true); setOpen({}); };
  const pickRandom = () => {
    const pool = TEAM_MEMBERS.filter((m) => !open[m.id]);
    if (!pool.length) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setCascade(false);
    setOpen((o) => ({ ...o, [pick.id]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12, position: 'relative', isolation: 'isolate' }}>
      <style>{CSS}</style>

      <div className="npk-aurora" aria-hidden="true">
        <span style={{ width: 340, height: 340, left: '-4%', top: '6%', background: 'radial-gradient(circle,#C7D2FE 0%,transparent 68%)' }} />
        <span style={{ width: 380, height: 380, right: '-6%', top: '30%', background: 'radial-gradient(circle,#FBCFE8 0%,transparent 68%)', animationDelay: '-5s' }} />
        <span style={{ width: 300, height: 300, left: '38%', bottom: '-8%', background: 'radial-gradient(circle,#FDE68A 0%,transparent 68%)', animationDelay: '-9s' }} />
      </div>

      {done && <Confetti />}

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

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} role="status" aria-label={`Đã lật ${count}/${total}`}>
          {TEAM_MEMBERS.map((m, i) => (
            <span key={m.id} className={`npk-seg${open[m.id] ? ' f' : ''}`} style={{
              background: open[m.id] ? PALETTE[i % 9].c : '#CBD5E1',
              boxShadow: open[m.id] ? `0 0 10px ${PALETTE[i % 9].c}AA` : 'none',
            }} />
          ))}
          <span className="npk-count" style={{ marginLeft: 8, fontWeight: 900, fontSize: 13, color: '#334155' }}>{count}/{total}</span>
        </div>

        {done ? (
          <div className="npk-win" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 12,
            background: 'linear-gradient(90deg,#F59E0B,#DB2777)', color: '#fff', fontWeight: 900, fontSize: 13,
            boxShadow: '0 8px 18px -6px #DB2777AA',
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

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
        gap: 'clamp(10px, 1.5vh, 18px)', flex: 1, minHeight: 0,
      }}>
        {TEAM_MEMBERS.map((member, idx) => (
          <FlipCard key={member.id} member={member} idx={idx} isOpen={!!open[member.id]} onToggle={toggle} cascade={cascade} />
        ))}
      </div>
    </div>
  );
}