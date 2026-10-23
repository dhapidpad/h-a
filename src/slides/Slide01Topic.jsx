import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import SvgTopic from '../components/illustrations/SvgTopic';

/* Mỗi nguyên tố giữ đúng màu & vai trò đã dùng trong SVG */
const ELEMENTS = [
  {
    key: 'N',
    name: 'Đạm (N)',
    desc: 'Lá xanh mướt, thân cây vươn cao',
    c: '#15803D',
    bg: '#EFFBF3',
    bd: '#BBF0CE',
    sh: 'rgba(34,197,94,0.28)',
    tile: 'linear-gradient(145deg,#4ADE80,#15803D)',
  },
  {
    key: 'P',
    name: 'Lân (P)',
    desc: 'Rễ đâm sâu, ra hoa đậu quả sớm',
    c: '#6D28D9',
    bg: '#F6F2FF',
    bd: '#DDD0FF',
    sh: 'rgba(140,107,250,0.30)',
    tile: 'linear-gradient(145deg,#A78BFA,#5B21B6)',
  },
  {
    key: 'K',
    name: 'Kali (K)',
    desc: 'Quả ngọt, cây cứng cáp chống chịu',
    c: '#B45309',
    bg: '#FFF8E7',
    bd: '#FDE2A8',
    sh: 'rgba(245,158,11,0.32)',
    tile: 'linear-gradient(145deg,#FBBF24,#D97706)',
  },
];

const LETTER_GRAD = {
  N: 'linear-gradient(180deg,#4ADE80 0%,#15803D 100%)',
  P: 'linear-gradient(180deg,#A78BFA 0%,#5B21B6 100%)',
  K: 'linear-gradient(180deg,#FCD34D 0%,#D97706 100%)',
};

const css = `
.s1-grid{position:relative;isolation:isolate;display:grid;grid-template-columns:minmax(380px,500px) 1fr;height:100%;gap:clamp(24px,3vw,48px);align-items:center}
.s1-col{display:flex;flex-direction:column;gap:clamp(12px,1.8vh,20px);min-width:0}
.s1-bg{position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:
    radial-gradient(520px 380px at 8% 8%,rgba(74,222,128,.16),transparent 70%),
    radial-gradient(560px 420px at 92% 18%,rgba(167,139,250,.18),transparent 70%),
    radial-gradient(620px 420px at 70% 100%,rgba(251,191,36,.18),transparent 70%)}
.s1-bg::after{content:"";position:absolute;inset:0;opacity:.5;
  background-image:radial-gradient(rgba(23,36,58,.09) 1.2px,transparent 1.4px);background-size:26px 26px;
  -webkit-mask-image:radial-gradient(ellipse at 60% 50%,#000 0%,transparent 72%);mask-image:radial-gradient(ellipse at 60% 50%,#000 0%,transparent 72%)}

.s1-npk{display:flex;gap:.02em;margin:0;font-family:var(--font-display);font-weight:900;font-size:clamp(68px,7.6vw,118px);line-height:.92;letter-spacing:-.045em}
.s1-letter{display:inline-block;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;
  transition:transform .35s cubic-bezier(.3,1.6,.5,1),filter .35s ease;filter:drop-shadow(0 6px 10px var(--sh))}
.s1-letter[data-on="true"]{transform:translateY(-8px) scale(1.08)}
.s1-letter[data-dim="true"]{filter:saturate(.3) opacity(.45)}
.s1-sub{display:block;margin-top:clamp(6px,1vh,12px);font-family:var(--font-display);font-weight:800;font-size:clamp(22px,2.3vw,34px);line-height:1.15;letter-spacing:-.015em;color:#17243A}
.s1-lead{margin:0;font-size:clamp(15px,1.3vw,19px);line-height:1.5;font-weight:500;color:#4A5568;max-width:44ch}

.s1-list{display:flex;flex-direction:column;gap:10px;margin-top:2px}
.s1-row{display:flex;align-items:center;gap:14px;padding:9px 16px 9px 10px;border-radius:20px;border:1.5px solid var(--bd);background:var(--bg);
  text-align:left;font-family:inherit;cursor:pointer;
  transition:transform .28s cubic-bezier(.3,1.4,.5,1),box-shadow .28s ease,opacity .28s ease}
.s1-row:hover,.s1-row:focus-visible,.s1-row[data-on="true"]{transform:translateX(8px);box-shadow:0 12px 28px var(--sh);outline:none}
.s1-row:focus-visible{outline:2px solid var(--c);outline-offset:3px}
.s1-row[data-dim="true"]{opacity:.55}
.s1-tile{flex:none;width:44px;height:44px;border-radius:14px;display:grid;place-items:center;color:#fff;
  font-family:var(--font-display);font-weight:900;font-size:22px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.14),0 6px 14px var(--sh)}
.s1-name{display:block;font-size:16px;font-weight:800;color:var(--c);line-height:1.2}
.s1-desc{display:block;font-size:14px;font-weight:500;color:#4A5568;line-height:1.35}

.s1-cta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:6px}
.s1-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:12px;border:none;cursor:pointer;
  background:linear-gradient(135deg,#2F80ED 0%,#1D4ED8 100%);color:#fff;border-radius:30px;padding:14px 30px;
  font-family:inherit;font-size:17px;font-weight:800;box-shadow:0 10px 26px rgba(47,128,237,.42);
  transition:transform .25s ease,box-shadow .25s ease}
.s1-btn:hover{transform:translateY(-3px);box-shadow:0 16px 32px rgba(47,128,237,.5)}
.s1-btn:active{transform:translateY(0) scale(.98)}
.s1-btn:focus-visible{outline:3px solid #93C5FD;outline-offset:3px}
.s1-btn::after{content:"";position:absolute;top:0;left:-60%;width:40%;height:100%;
  background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);transform:skewX(-20deg);animation:s1Shine 4.5s ease-in-out 1.6s infinite}
.s1-btn svg{transition:transform .25s ease}
.s1-btn:hover svg{transform:translateX(5px)}
.s1-key{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#64748B}
.s1-key kbd{font-family:inherit;font-weight:800;font-size:12px;color:#334155;background:#fff;border:1.5px solid #CBD5E1;border-bottom-width:3px;border-radius:7px;padding:1px 8px}

.s1-stage{position:relative;width:100%;height:100%;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
.s1-stage::before{content:"";position:absolute;width:min(92%,640px);aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle at 50% 45%,rgba(255,255,255,.95) 0%,rgba(255,255,255,.55) 55%,rgba(255,255,255,0) 72%);
  box-shadow:0 0 0 1.5px rgba(47,128,237,.08)}
.s1-stage svg{position:relative}

/* Một nhịp vào màn hình duy nhất: cột trái trượt lên lần lượt, sân khấu hiện dần */
.s1-in{opacity:0;animation:s1In .7s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--d,0s)}
.s1-pop{opacity:0;animation:s1Pop .9s cubic-bezier(.2,.9,.25,1) .25s forwards}
@keyframes s1In{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes s1Pop{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}
@keyframes s1Shine{0%,70%{left:-60%}100%{left:130%}}

@media (max-width:900px){
  .s1-grid{grid-template-columns:1fr;height:auto;gap:20px}
  .s1-stage{order:-1;height:340px}
}
@media (prefers-reduced-motion:reduce){
  .s1-in,.s1-pop{animation:none;opacity:1}
  .s1-btn::after{animation:none}
  .s1-letter,.s1-row,.s1-btn,.s1-btn svg{transition:none}
}
`;

export default function Slide01Topic({ slide, onNext }) {
  const [focus, setFocus] = useState(null);
  const on = (k) => () => setFocus(k);
  const off = () => setFocus(null);

  return (
    <div className="s1-grid">
      <style>{css}</style>
      <div className="s1-bg" aria-hidden="true" />

      {/* Cột trái: Tiêu đề & Giới thiệu */}
      <div className="s1-col">
        <div className="chapter-pill s1-in" style={{ '--d': '0s', background: '#EAF2FF', color: '#2F80ED' }}>
          <Sparkles size={16} />
          <span>Hóa học ứng dụng nông nghiệp</span>
        </div>

        <h1 className="s1-in" style={{ '--d': '0.08s', margin: 0 }} aria-label="NPK — Bộ ba nuôi dưỡng mùa xanh">
          <span className="s1-npk" aria-hidden="true">
            {ELEMENTS.map((e) => (
              <span
                key={e.key}
                className="s1-letter"
                data-on={focus === e.key}
                data-dim={focus !== null && focus !== e.key}
                style={{ backgroundImage: LETTER_GRAD[e.key], '--sh': e.sh }}
              >
                {e.key}
              </span>
            ))}
          </span>
          <span className="s1-sub" aria-hidden="true">Bộ ba nuôi dưỡng mùa xanh</span>
        </h1>

        <p className="s1-lead s1-in" style={{ '--d': '0.18s' }}>
          Hóa học dinh dưỡng cho một nền nông nghiệp bền vững &amp; năng suất vượt trội.
        </p>

        {/* 3 nguyên tố — rê chuột để làm nổi bật bé tương ứng trong hình */}
        <div className="s1-list" onMouseLeave={off}>
          {ELEMENTS.map((e, i) => (
            <button
              key={e.key}
              type="button"
              className="s1-row s1-in"
              data-on={focus === e.key}
              data-dim={focus !== null && focus !== e.key}
              style={{ '--d': `${0.26 + i * 0.08}s`, '--c': e.c, '--bg': e.bg, '--bd': e.bd, '--sh': e.sh }}
              onMouseEnter={on(e.key)}
              onFocus={on(e.key)}
              onBlur={off}
            >
              <span className="s1-tile" style={{ background: e.tile }}>{e.key}</span>
              <span>
                <span className="s1-name">{e.name}</span>
                <span className="s1-desc">{e.desc}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Nút Khám phá */}
        <div className="s1-cta s1-in" style={{ '--d': '0.55s' }}>
          <button className="s1-btn" onClick={onNext} title="Bắt đầu xem Video Intro (Phím →)">
            <span>Khám phá chủ đề</span>
            <ArrowRight size={20} />
          </button>
          <span className="s1-key">hoặc nhấn <kbd>→</kbd></span>
        </div>
      </div>

      {/* Cột phải: SVG trực quan 3 nguyên tố xoay quanh mầm cây */}
      <div className="s1-stage s1-pop">
        <SvgTopic focus={focus} />
      </div>
    </div>
  );
}