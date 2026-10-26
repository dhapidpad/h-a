import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import SvgTopic from '../components/illustrations/SvgTopic';

/* Mục 5 - Slide 01: Ba nhãn N / P / K: Lá xanh · Rễ khỏe · Nước & chất lượng */
const ELEMENTS = [
  {
    key: 'N',
    name: 'Đạm (N) — Lá xanh',
    desc: 'Phát triển thân lá, cấu tạo protein & diệp lục',
    c: 'var(--n-deep)',
    bg: 'var(--n-soft)',
    bd: 'var(--n-line)',
    sh: 'var(--n-glow)',
    tile: 'linear-gradient(145deg, var(--n-main), var(--n-deep))'
  },
  {
    key: 'P',
    name: 'Lân (P) — Rễ khỏe',
    desc: 'Chuyển hóa năng lượng ATP, phát triển bộ rễ & tạo hạt',
    c: 'var(--p-deep)',
    bg: 'var(--p-soft)',
    bd: 'var(--p-line)',
    sh: 'var(--p-glow)',
    tile: 'linear-gradient(145deg, var(--p-main), var(--p-deep))'
  },
  {
    key: 'K',
    name: 'Kali (K) — Nước & chất lượng',
    desc: 'Điều hòa khí khổng, hoạt hóa enzyme & vận chuyển đường',
    c: 'var(--k-deep)',
    bg: 'var(--k-soft)',
    bd: 'var(--k-line)',
    sh: 'var(--k-glow)',
    tile: 'linear-gradient(145deg, var(--k-main), var(--k-deep))'
  }
];

const LETTER_GRAD = {
  N: 'linear-gradient(180deg, #34D399 0%, var(--n-deep) 100%)',
  P: 'linear-gradient(180deg, #A78BFA 0%, var(--p-deep) 100%)',
  K: 'linear-gradient(180deg, #FBBF24 0%, var(--k-deep) 100%)'
};

const css = `
.s1-grid{position:relative;isolation:isolate;display:grid;grid-template-columns:510px 1fr;height:100%;gap:36px;align-items:center}
.s1-col{display:flex;flex-direction:column;gap:14px;min-width:0}
.s1-bg{position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:
    radial-gradient(500px 360px at 8% 8%,var(--n-glow),transparent 70%),
    radial-gradient(520px 380px at 92% 18%,var(--p-glow),transparent 70%),
    radial-gradient(560px 380px at 70% 100%,var(--k-glow),transparent 70%)}

.s1-npk{display:flex;gap:.02em;margin:0;font-family:var(--font-display);font-weight:900;font-size:98px;line-height:.92;letter-spacing:-.045em}
.s1-letter{display:inline-block;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;
  transition:transform .32s var(--ease-out),opacity .32s var(--ease-out)}
.s1-letter[data-on="true"]{transform:translateY(-6px) scale(1.06)}
.s1-letter[data-dim="true"]{opacity:.45}
.s1-sub{display:block;margin-top:8px;font-family:var(--font-display);font-weight:800;font-size:32px;line-height:1.15;letter-spacing:-.015em;color:var(--ink)}
.s1-lead{margin:0;font-size:18px;line-height:1.45;font-weight:600;color:var(--ink-soft)}

.s1-list{display:flex;flex-direction:column;gap:10px;margin-top:4px}
.s1-row{display:flex;align-items:center;gap:14px;padding:10px 16px 10px 10px;border-radius:18px;border:1.5px solid var(--bd);background:var(--bg);
  text-align:left;font-family:inherit;cursor:pointer;
  transition:transform .22s var(--ease-out),box-shadow .22s var(--ease-out),opacity .22s var(--ease-out)}
.s1-row:hover,.s1-row:focus-visible,.s1-row[data-on="true"]{transform:translateX(6px);box-shadow:0 10px 24px var(--sh);outline:none}
.s1-row:focus-visible{outline:2px solid var(--c);outline-offset:3px}
.s1-row[data-dim="true"]{opacity:.58}
.s1-tile{flex:none;width:44px;height:44px;border-radius:13px;display:grid;place-items:center;color:#fff;
  font-family:var(--font-display);font-weight:900;font-size:21px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.14),0 6px 14px var(--sh)}
.s1-name{display:block;font-size:16.5px;font-weight:800;color:var(--c);line-height:1.22}
.s1-desc{display:block;font-size:14.2px;font-weight:500;color:var(--ink-soft);line-height:1.35}

.s1-cta{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:6px}
.s1-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:12px;border:none;cursor:pointer;
  background:linear-gradient(135deg,var(--n-main) 0%,var(--i-main) 100%);color:#fff;border-radius:30px;padding:14px 30px;
  font-family:inherit;font-size:17px;font-weight:800;box-shadow:0 10px 24px var(--n-glow);
  transition:transform .22s var(--ease-out),box-shadow .22s var(--ease-out)}
.s1-btn:hover{transform:translateY(-2px);box-shadow:0 14px 28px rgba(22,163,106,.38)}
.s1-btn:active{transform:translateY(0) scale(.98)}
.s1-btn:focus-visible{outline:3px solid var(--n-main);outline-offset:3px}
.s1-btn svg{transition:transform .22s var(--ease-out)}
.s1-btn:hover svg{transform:translateX(4px)}
.s1-key{display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:600;color:var(--ink-mute)}
.s1-key kbd{font-family:inherit;font-weight:800;font-size:12px;color:var(--ink);background:#fff;border:1.5px solid var(--line);border-bottom-width:3px;border-radius:7px;padding:1px 8px}

.s1-stage{position:relative;width:100%;height:100%;min-height:0;display:flex;align-items:center;justify-content:center;overflow:hidden}
.s1-stage::before{content:"";position:absolute;width:min(92%,620px);aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle at 50% 45%,rgba(255,255,255,.95) 0%,rgba(255,255,255,.55) 55%,rgba(255,255,255,0) 72%);
  box-shadow:0 0 0 1.5px rgba(23,75,55,.08)}
.s1-stage svg{position:relative}

.s1-in{opacity:0;animation:s1In .55s var(--ease-out) forwards;animation-delay:var(--d,0s)}
.s1-pop{opacity:0;animation:s1Pop .65s var(--ease-out) .15s forwards}
@keyframes s1In{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes s1Pop{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:none}}

@media (prefers-reduced-motion:reduce){
  .s1-in,.s1-pop{animation:none;opacity:1}
  .s1-letter,.s1-row,.s1-btn,.s1-btn svg{transition:none}
}
`;

export default function Slide01Topic({ onNext }) {
  const [focus, setFocus] = useState(null);
  const on = (k) => () => setFocus(k);
  const off = () => setFocus(null);

  // Nạp trước metadata của video intro khi trình duyệt rảnh ở Slide 1 (Mục 7.2)
  useEffect(() => {
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 900));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const h = idle(() => {
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.src = `${import.meta.env?.BASE_URL || '/'}video_intro_720.mp4`.replace('//', '/');
    });
    return () => cancel(h);
  }, []);

  return (
    <div className="s1-grid">
      <style>{css}</style>
      <div className="s1-bg" aria-hidden="true" />

      {/* Cột trái: Tiêu đề & Giới thiệu */}
      <div className="s1-col">
        <div className="chapter-pill s1-in" style={{ '--d': '0s' }}>
          <Sparkles size={16} />
          <span>Hóa học ứng dụng nông nghiệp</span>
        </div>

        <h1
          className="slide-title s1-in"
          style={{ '--d': '0.06s', margin: 0 }}
          aria-label="NPK — Bộ ba nuôi dưỡng mùa xanh"
        >
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
          <span className="s1-sub" aria-hidden="true">
            NPK — Bộ ba nuôi dưỡng mùa xanh
          </span>
        </h1>

        <p className="s1-lead s1-in" style={{ '--d': '0.12s' }}>
          Hóa học dinh dưỡng cho nền nông nghiệp bền vững
        </p>

        {/* 3 nguyên tố: Lá xanh · Rễ khỏe · Nước & chất lượng */}
        <div className="s1-list" onMouseLeave={off}>
          {ELEMENTS.map((e, i) => (
            <button
              key={e.key}
              type="button"
              className="s1-row s1-in"
              data-on={focus === e.key}
              data-dim={focus !== null && focus !== e.key}
              style={{
                '--d': `${0.18 + i * 0.06}s`,
                '--c': e.c,
                '--bg': e.bg,
                '--bd': e.bd,
                '--sh': e.sh
              }}
              onMouseEnter={on(e.key)}
              onFocus={on(e.key)}
              onBlur={off}
            >
              <span className="s1-tile" style={{ background: e.tile }}>
                {e.key}
              </span>
              <span>
                <span className="s1-name">{e.name}</span>
                <span className="s1-desc">{e.desc}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Nút Bắt đầu */}
        <div className="s1-cta s1-in" style={{ '--d': '0.38s' }}>
          <button
            type="button"
            className="s1-btn"
            onClick={onNext}
            title="Bắt đầu xem Video Intro (Phím →)"
          >
            <Play size={18} fill="#FFFFFF" style={{ marginLeft: 2 }} />
            <span>Bắt đầu</span>
            <ArrowRight size={20} />
          </button>
          <span className="s1-key">
            hoặc nhấn <kbd>→</kbd>
          </span>
        </div>
      </div>

      {/* Cột phải: SVG trực quan 3 nguyên tố xoay quanh mầm cây */}
      <div className="s1-stage s1-pop">
        <SvgTopic focus={focus} />
      </div>
    </div>
  );
}