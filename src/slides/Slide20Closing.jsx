import React, { useState, useRef, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import SvgClosingEco from '../components/illustrations/SvgClosingEco';
import CuteMascot from '../components/mascot/CuteMascot';

/* ============================================================
   DỮ LIỆU 4 ĐÚNG
============================================================ */
const PRINCIPLES = [
  {
    key: 'loai',
    title: 'Đúng Loại',
    short: 'Đạm cho lá, Lân cho rễ, Kali cho quả hạt',
    detail: 'N làm lá xanh – thân cao, P kích rễ – ra hoa, K chắc hạt – tăng vị ngọt, chống đổ ngã.',
    main: '#16A34A',
    deep: '#14532D',
    soft: '#DCFCE7',
    glow: 'rgba(34,197,94,.35)',
    grad: 'linear-gradient(135deg,#4ADE80 0%,#16A34A 100%)',
  },
  {
    key: 'lieu',
    title: 'Đúng Liều',
    short: 'Phân tích đất & đáp ứng đúng nhu cầu sinh lý',
    detail: 'Bón theo kết quả phân tích đất và giai đoạn cây. Thừa đạm → sâu bệnh, lốp đổ; thiếu → còi cọc.',
    main: '#7C3AED',
    deep: '#4C1D95',
    soft: '#EDE9FE',
    glow: 'rgba(139,92,246,.35)',
    grad: 'linear-gradient(135deg,#A78BFA 0%,#6D28D9 100%)',
  },
  {
    key: 'luc',
    title: 'Đúng Lúc',
    short: 'Lót lân đầu vụ, thúc đạm kali đón đòng nuôi hạt',
    detail: 'Lân bón lót để rễ khỏe sớm; đạm – kali chia nhiều lần, thúc đúng lúc cây cần nhất.',
    main: '#D97706',
    deep: '#78350F',
    soft: '#FEF3C7',
    glow: 'rgba(251,191,36,.4)',
    grad: 'linear-gradient(135deg,#FCD34D 0%,#D97706 100%)',
  },
  {
    key: 'cach',
    title: 'Đúng Cách',
    short: 'Vùi sâu phủ kín, kết hợp hữu cơ giữ đất khỏe',
    detail: 'Vùi phân, phủ đất để giảm bay hơi – rửa trôi; trộn phân hữu cơ để đất tơi xốp, giữ ẩm tốt.',
    main: '#0284C7',
    deep: '#0C4A6E',
    soft: '#E0F2FE',
    glow: 'rgba(56,189,248,.38)',
    grad: 'linear-gradient(135deg,#7DD3FC 0%,#0284C7 100%)',
  },
];

/* ============================================================
   ICON SVG TỰ VẼ (không emoji)
============================================================ */
function PrincipleIcon({ type, color }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (type === 'loai')
    return (
      <svg {...common}>
        <path d="M16 28V13" />
        <path d="M16 17C16 10 11 6 5 6c0 7 4 11 11 11Z" fill={color} fillOpacity=".18" />
        <path d="M16 13c0-6 4-9 11-9 0 6-4 10-11 10" fill={color} fillOpacity=".18" />
        <path d="M11 28h10" />
      </svg>
    );
  if (type === 'lieu')
    return (
      <svg {...common}>
        <path d="M16 5v21M9 26h14" />
        <path d="M5 11h22" />
        <path d="M5 11l-3 8a3.5 3.5 0 0 0 6 0Z" fill={color} fillOpacity=".18" />
        <path d="M27 11l-3 8a3.5 3.5 0 0 0 6 0Z" fill={color} fillOpacity=".18" transform="translate(-2 0)" />
      </svg>
    );
  if (type === 'luc')
    return (
      <svg {...common}>
        <circle cx="16" cy="17" r="10" fill={color} fillOpacity=".14" />
        <path d="M16 11v6l4 3" />
        <path d="M12 3h8" />
        <path d="M24.5 7l2 2" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M4 22h24" />
      <path d="M7 22c1.5-4 4.5-6 9-6s7.5 2 9 6" fill={color} fillOpacity=".14" />
      <path d="M16 4v10" />
      <path d="M12 10l4 4 4-4" />
      <path d="M9 27h14" />
    </svg>
  );
}

function CheckBadge({ color, active }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <circle cx="10" cy="10" r="9" fill={active ? color : 'none'} stroke={color} strokeWidth="1.6" />
      <path
        d="M5.8 10.4l2.8 2.8 5.6-6"
        fill="none"
        stroke={active ? '#fff' : color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PartyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 21l5-14 9 9-14 5Z" fill="#FDE68A" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M7 12l5 5M5.2 16.6l3.2 3.2" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="15" cy="4" r="1.4" fill="#fff" />
    <circle cx="20" cy="9" r="1.2" fill="#BBF7D0" />
    <path d="M13 8l2.5-2.5M16 11l3-1" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ChatIcon = ({ color = '#2F80ED' }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 5h16a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 17h-8l-5 4v-4H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 5Z"
      fill={color}
      fillOpacity=".12"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="11" r="1.2" fill={color} />
    <circle cx="12" cy="11" r="1.2" fill={color} />
    <circle cx="16" cy="11" r="1.2" fill={color} />
  </svg>
);

/* ============================================================
   SFX bằng Web Audio (không cần file âm thanh)
============================================================ */
function useSfx() {
  const ctxRef = useRef(null);

  const getCtx = () => {
    try {
      if (!ctxRef.current) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctxRef.current = new AC();
      }
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
      return ctxRef.current;
    } catch {
      return null;
    }
  };

  const tone = useCallback((freq, start, dur, vol = 0.08, type = 'sine') => {
    const ctx = getCtx();
    if (!ctx) return;
    const t = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }, []);

  const tick = useCallback(() => tone(880, 0, 0.12, 0.05, 'triangle'), [tone]);
  const open = useCallback(() => {
    tone(523, 0, 0.14, 0.06, 'triangle');
    tone(784, 0.07, 0.18, 0.06, 'triangle');
  }, [tone]);
  const fanfare = useCallback(() => {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, i * 0.09, 0.45, 0.07, 'sine'));
    tone(261.6, 0, 0.9, 0.05, 'triangle');
  }, [tone]);

  useEffect(() => () => {
    try {
      ctxRef.current && ctxRef.current.close();
    } catch {}
  }, []);

  return { tick, open, fanfare };
}

/* ============================================================
   SLIDE
============================================================ */
export default function Slide20Closing({ slide }) {
  const [showQaModal, setShowQaModal] = useState(false);
  const [active, setActive] = useState(0);
  const [burst, setBurst] = useState(0);
  const sfx = useSfx();

  const cur = PRINCIPLES[active];

  const handleConfetti = () => {
    sfx.fanfare();
    setBurst((b) => b + 1);
    const colors = ['#22C55E', '#86EFAC', '#8B5CF6', '#C4B5FD', '#FBBF24', '#FDE68A', '#38BDF8'];
    confetti({ particleCount: 140, spread: 100, startVelocity: 48, origin: { y: 0.62 }, colors, scalar: 1.05 });
    setTimeout(() => confetti({ particleCount: 70, angle: 60, spread: 65, origin: { x: 0, y: 0.75 }, colors }), 180);
    setTimeout(() => confetti({ particleCount: 70, angle: 120, spread: 65, origin: { x: 1, y: 0.75 }, colors }), 180);
    setTimeout(
      () =>
        confetti({
          particleCount: 50,
          spread: 360,
          startVelocity: 18,
          gravity: 0.6,
          ticks: 220,
          scalar: 0.9,
          origin: { x: 0.5, y: 0.35 },
          colors,
        }),
      420
    );
  };

  const handleSelect = (i) => {
    setActive(i);
    sfx.tick();
  };

  const toggleQa = () => {
    setShowQaModal((v) => !v);
    sfx.open();
  };

  return (
    <div className="s20-root">
      <style>{`
        .s20-root {
          display: grid;
          grid-template-columns: minmax(420px, 480px) 1fr;
          height: 100%;
          gap: 32px;
          align-items: center;
          overflow: hidden;
          position: relative;
        }
        .s20-left {
          display: flex; flex-direction: column; gap: 14px;
          min-height: 0; overflow-y: auto; padding: 4px 8px 4px 2px;
          scrollbar-width: thin;
        }
        .s20-title {
          font-family: var(--font-display);
          font-size: 36px; font-weight: 900; line-height: 1.12;
          margin: 0; letter-spacing: -0.4px;
          background: linear-gradient(100deg, #14532D 0%, #16A34A 38%, #7C3AED 72%, #D97706 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent; color: transparent;
          animation: s20-title-flow 9s ease-in-out infinite alternate;
        }
        @keyframes s20-title-flow { to { background-position: 100% 0; } }

        .s20-pill {
          display: inline-flex; align-items: center; gap: 8px; width: fit-content;
          padding: 6px 14px; border-radius: 999px;
          background: linear-gradient(135deg, #EAF2FF, #F0FDF4);
          color: #2F80ED; font-size: 13px; font-weight: 900;
          border: 1px solid #CFE1FF;
          box-shadow: 0 4px 12px rgba(47,128,237,.12);
        }
        .s20-pill i {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22C55E; box-shadow: 0 0 0 0 rgba(34,197,94,.6);
          animation: s20-ping 2s ease-out infinite;
        }
        @keyframes s20-ping { 70%,100% { box-shadow: 0 0 0 9px rgba(34,197,94,0); } }

        .s20-list { display: flex; flex-direction: column; gap: 9px; }
        .s20-card {
          --c: #16A34A; --soft: #DCFCE7; --deep: #14532D; --glow: rgba(34,197,94,.3);
          position: relative; display: flex; align-items: center; gap: 12px;
          width: 100%; text-align: left; font: inherit;
          padding: 9px 12px 9px 10px; border-radius: 16px; cursor: pointer;
          background: rgba(255,255,255,.82);
          border: 1.5px solid var(--soft);
          backdrop-filter: blur(6px);
          transition: transform .25s cubic-bezier(.2,.9,.3,1.3), box-shadow .25s, background .25s, border-color .25s;
          animation: s20-card-in .6s cubic-bezier(.2,.9,.3,1.2) both;
          overflow: hidden;
        }
        .s20-card::before {
          content: ''; position: absolute; inset: 0 auto 0 0; width: 5px;
          background: var(--c); border-radius: 16px 0 0 16px;
          transform: scaleY(.35); transition: transform .3s;
        }
        .s20-card:hover { transform: translateX(4px); }
        .s20-card:focus-visible { outline: 3px solid var(--c); outline-offset: 2px; }
        .s20-card.on {
          background: #fff; border-color: var(--c);
          box-shadow: 0 10px 26px var(--glow), inset 0 0 0 1px rgba(255,255,255,.8);
          transform: translateX(6px);
        }
        .s20-card.on::before { transform: scaleY(1); }
        .s20-card::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 60px; left: -80px;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.75), transparent);
          transform: skewX(-18deg);
        }
        .s20-card.on::after { animation: s20-sheen 1.1s ease-out; }
        @keyframes s20-sheen { to { left: 110%; } }
        @keyframes s20-card-in {
          from { opacity: 0; transform: translateX(-22px) scale(.97); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        .s20-icon {
          width: 42px; height: 42px; border-radius: 13px; flex-shrink: 0;
          display: grid; place-items: center;
          background: var(--soft);
          transition: background .25s, transform .3s cubic-bezier(.2,.9,.3,1.5);
        }
        .s20-card.on .s20-icon { transform: rotate(-6deg) scale(1.08); box-shadow: 0 6px 14px var(--glow); }
        .s20-txt { flex: 1; min-width: 0; font-size: 14.5px; font-weight: 600; line-height: 1.35; color: #334155; }
        .s20-txt b { display: block; font-size: 15.5px; font-weight: 900; color: var(--deep); margin-bottom: 1px; }
        .s20-check { flex-shrink: 0; transition: transform .3s cubic-bezier(.2,.9,.3,1.6); }
        .s20-card.on .s20-check { transform: scale(1.15) rotate(8deg); }

        .s20-actions { display: flex; gap: 12px; margin-top: 2px; flex-wrap: wrap; }
        .s20-btn {
          position: relative; overflow: hidden; border-radius: 30px;
          display: inline-flex; align-items: center; gap: 9px;
          padding: 12px 22px; font-size: 15px; font-weight: 800; cursor: pointer;
          font-family: inherit;
          transition: transform .2s cubic-bezier(.2,.9,.3,1.5), box-shadow .2s;
        }
        .s20-btn:hover { transform: translateY(-2px) scale(1.03); }
        .s20-btn:active { transform: translateY(1px) scale(.97); }
        .s20-btn:focus-visible { outline: 3px solid #2F80ED; outline-offset: 3px; }
        .s20-btn.party {
          border: none; color: #fff;
          background: linear-gradient(135deg, #34D399 0%, #059669 55%, #047857 100%);
          box-shadow: 0 8px 22px rgba(16,185,129,.4), inset 0 1px 0 rgba(255,255,255,.35);
        }
        .s20-btn.party::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 46px; left: -70px;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.5), transparent);
          transform: skewX(-18deg); animation: s20-sheen-loop 3.6s ease-in-out infinite;
        }
        @keyframes s20-sheen-loop { 0%, 55% { left: -70px; } 100% { left: 120%; } }
        .s20-btn.qa {
          background: #fff; color: #2F80ED; border: 2px solid #2F80ED;
          box-shadow: 0 4px 14px rgba(47,128,237,.14);
        }
        .s20-btn.qa.open { background: #2F80ED; color: #fff; }
        .s20-btn.qa.open svg path:first-child { fill: #fff; fill-opacity: .2; stroke: #fff; }
        .s20-btn.qa.open svg circle { fill: #fff; }

        .s20-qa {
          background: linear-gradient(135deg, #F8FAFC, #EFF6FF);
          border: 1.5px solid #BFDBFE; border-radius: 16px;
          padding: 12px 14px; font-size: 13.5px; color: #334155; line-height: 1.5;
          display: flex; gap: 10px; align-items: flex-start;
          animation: s20-pop .45s cubic-bezier(.2,.9,.3,1.3) both;
          box-shadow: 0 8px 20px rgba(47,128,237,.1);
        }
        @keyframes s20-pop {
          from { opacity: 0; transform: translateY(-8px) scale(.96); }
          to   { opacity: 1; transform: none; }
        }

        .s20-mascot { animation: s20-card-in .7s .55s cubic-bezier(.2,.9,.3,1.2) both; }

        /* ---------- Panel phải ---------- */
        .s20-stage {
          position: relative; width: 100%; height: 100%; min-height: 0;
          display: flex; flex-direction: column; align-items: stretch; justify-content: center; gap: 8px;
          border-radius: 28px; padding: 8px; overflow: hidden;
          background:
            radial-gradient(120% 90% at 50% 8%, rgba(255,255,255,.98) 0%, rgba(255,255,255,.94) 55%, rgba(240,253,244,.96) 100%);
          border: 1.5px solid rgba(226,232,240,.9);
          box-shadow: 0 18px 44px rgba(15,23,42,.09), inset 0 0 0 1px rgba(255,255,255,.9);
        }
        .s20-stage::before {
          content: ''; position: absolute; inset: -40%;
          background: conic-gradient(from 0deg, rgba(134,239,172,.28), rgba(125,211,252,.24), rgba(196,181,253,.28), rgba(253,230,138,.26), rgba(134,239,172,.28));
          filter: blur(46px); animation: s20-aurora 26s linear infinite; opacity: .8;
        }
        @keyframes s20-aurora { to { transform: rotate(360deg); } }
        .s20-stage > svg, .s20-stage > .s20-art { position: relative; z-index: 1; }
        .s20-art { width: 100%; flex: 1 1 0; min-height: 0; }
        .s20-art > svg { width: 100%; height: 100%; }

        .s20-corner { position: absolute; z-index: 2; width: 44px; height: 44px; opacity: .55; pointer-events: none; }
        .s20-corner.tl { top: 12px; left: 12px; }
        .s20-corner.br { bottom: 12px; right: 12px; transform: rotate(180deg); }

        .s20-caption {
          --c: #16A34A; --soft: #DCFCE7; --deep: #14532D; --glow: rgba(34,197,94,.3);
          position: relative; z-index: 3; flex: 0 0 auto; margin: 0 8px 4px;
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 18px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border: 1.5px solid var(--c);
          box-shadow: 0 12px 30px var(--glow);
          animation: s20-pop .45s cubic-bezier(.2,.9,.3,1.3) both;
        }
        .s20-caption .dot {
          width: 34px; height: 34px; border-radius: 11px; flex-shrink: 0;
          display: grid; place-items: center; background: var(--soft);
        }
        .s20-caption .t { font-size: 12.5px; line-height: 1.4; color: #334155; font-weight: 600; }
        .s20-caption .t b { color: var(--deep); font-weight: 900; font-size: 13.5px; margin-right: 6px; }

        .s20-flash {
          position: absolute; inset: 0; z-index: 4; pointer-events: none; border-radius: 28px;
          background: radial-gradient(circle at 50% 45%, rgba(255,255,255,.95), rgba(255,255,255,0) 62%);
          animation: s20-flash .9s ease-out both;
        }
        @keyframes s20-flash { from { opacity: 1; transform: scale(.6); } to { opacity: 0; transform: scale(1.4); } }

        @media (max-width: 960px) {
          .s20-root { grid-template-columns: 1fr; overflow-y: auto; gap: 18px; }
          .s20-stage { min-height: 360px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .s20-root *, .s20-root *::before, .s20-root *::after { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ================= CỘT TRÁI ================= */}
      <div className="s20-left">
        <div className="s20-pill">
          <i />
          TỔNG KẾT & KẾT THÚC
        </div>

        <h1 className="s20-title">NPK CÂN ĐỐI — VÌ NÔNG NGHIỆP XANH BỀN VỮNG</h1>

        <div className="s20-list" role="tablist" aria-label="Bốn nguyên tắc bón phân">
          {PRINCIPLES.map((p, i) => (
            <button
              key={p.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`s20-card ${active === i ? 'on' : ''}`}
              style={{
                '--c': p.main,
                '--soft': p.soft,
                '--deep': p.deep,
                '--glow': p.glow,
                animationDelay: `${0.08 + i * 0.1}s`,
              }}
              onClick={() => handleSelect(i)}
              onMouseEnter={() => active !== i && setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="s20-icon">
                <PrincipleIcon type={p.key} color={p.main} />
              </span>
              <span className="s20-txt">
                <b>{p.title}</b>
                {p.short}
              </span>
              <span className="s20-check">
                <CheckBadge color={p.main} active={active === i} />
              </span>
            </button>
          ))}
        </div>

        <div className="s20-actions">
          <button type="button" className="s20-btn party" onClick={handleConfetti}>
            <PartyIcon />
            <span>CHÚC MỪNG VỤ MÙA!</span>
          </button>

          <button
            type="button"
            className={`s20-btn qa ${showQaModal ? 'open' : ''}`}
            onClick={toggleQa}
            aria-expanded={showQaModal}
          >
            <ChatIcon />
            <span>Hỏi & Đáp (Q&A)</span>
          </button>
        </div>

        {showQaModal && (
          <div className="s20-qa" role="status">
            <ChatIcon />
            <strong>
              Nhóm xin trân trọng cảm ơn và sẵn sàng lắng nghe mọi câu hỏi, ý kiến đóng góp từ thầy cô và các bạn!
            </strong>
          </div>
        )}

        {/* Mascot Banner trong cột trái, KHÔNG BAO GIỜ CHE KHUẤT HÌNH */}
        <div className="s20-mascot">
          <CuteMascot
            variant="banner"
            mascotType="SPROUTY_N"
            emotion="proud"
            speech="Cảm ơn thầy cô và các bạn đã theo dõi bài báo cáo của nhóm nha! Chúc mọi người một ngày học tập thật tuyệt vời!"
            size={52}
          />
        </div>
      </div>

      {/* ================= CỘT PHẢI ================= */}
      <div className="s20-stage">
        {/* Góc trang trí SVG */}
        <svg className="s20-corner tl" viewBox="0 0 44 44" fill="none" aria-hidden>
          <path d="M4 40V14C4 8 8 4 14 4h26" stroke="#86EFAC" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="4" cy="40" r="2.6" fill="#22C55E" />
          <circle cx="40" cy="4" r="2.6" fill="#8B5CF6" />
        </svg>
        <svg className="s20-corner br" viewBox="0 0 44 44" fill="none" aria-hidden>
          <path d="M4 40V14C4 8 8 4 14 4h26" stroke="#FDE68A" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="4" cy="40" r="2.6" fill="#FBBF24" />
          <circle cx="40" cy="4" r="2.6" fill="#38BDF8" />
        </svg>

        <div className="s20-art">
          <SvgClosingEco active={active} />
        </div>

        {/* Chú thích đổi theo nguyên tắc đang chọn */}
        <div
          key={cur.key}
          className="s20-caption"
          style={{ '--c': cur.main, '--soft': cur.soft, '--deep': cur.deep, '--glow': cur.glow }}
        >
          <span className="dot">
            <PrincipleIcon type={cur.key} color={cur.main} />
          </span>
          <span className="t">
            <b>{cur.title}</b>
            {cur.detail}
          </span>
        </div>

        {burst > 0 && <div key={burst} className="s20-flash" />}
      </div>
    </div>
  );
}