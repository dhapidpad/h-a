import React, { useState, useRef, useCallback, useEffect } from 'react';
import SvgClosingEco from '../components/illustrations/SvgClosingEco';
import CuteMascot from '../components/mascot/CuteMascot';

/* ============================================================
   SLIDE 20 — TỔNG KẾT: DÙNG PHÂN ĐÚNG VÀ BỀN VỮNG (MỤC 5 - SLIDE 20)
   - N — thân lá & protein
   - P — rễ & chuyển hóa năng lượng
   - K — điều hòa nước & vận chuyển đường
   - 4 ĐÚNG: đúng loại · đúng liều · đúng lúc · đúng cách
   - Cảm ơn thầy cô và các bạn!
============================================================ */

const NPK_SUMMARY = [
  {
    key: 'N',
    label: 'N — Thân lá & protein',
    desc: 'Tạo amino acid, protein và diệp lục',
    bg: 'var(--n-soft)',
    border: 'var(--n-line)',
    color: 'var(--n-deep)',
    badge: 'var(--n-main)'
  },
  {
    key: 'P',
    label: 'P — Rễ & chuyển hóa năng lượng',
    desc: 'Tham gia ATP, axit nucleic và phát triển rễ',
    bg: 'var(--p-soft)',
    border: 'var(--p-line)',
    color: 'var(--p-deep)',
    badge: 'var(--p-main)'
  },
  {
    key: 'K',
    label: 'K — Điều hòa nước & vận chuyển đường',
    desc: 'Điều tiết khí khổng, hoạt hóa enzyme & nuôi hạt/củ/quả',
    bg: 'var(--k-soft)',
    border: 'var(--k-line)',
    color: 'var(--k-deep)',
    badge: 'var(--k-main)'
  }
];

const PRINCIPLES = [
  {
    key: 'loai',
    title: 'Đúng loại',
    short: 'Chọn phân theo cây trồng, giai đoạn và đặc tính đất',
    detail: 'Đọc kỹ nhãn N–P₂O₅–K₂O; phân biệt nguồn chứa Cl⁻ hay không chứa Cl⁻, tính chua hay tính kiềm của phân.',
    main: 'var(--n-main)',
    deep: 'var(--n-deep)',
    soft: 'var(--n-tint)',
    glow: 'var(--n-glow)',
    hex: '#16A36A'
  },
  {
    key: 'lieu',
    title: 'Đúng liều',
    short: 'Căn cứ nhu cầu dinh dưỡng và kết quả kiểm tra đất/nước',
    detail: 'Không bón thừa một nguyên tố để thay thế nguyên tố đang thiếu; tránh tích lũy muối hoặc gây chua hóa đất.',
    main: 'var(--p-main)',
    deep: 'var(--p-deep)',
    soft: 'var(--p-tint)',
    glow: 'var(--p-glow)',
    hex: '#7862E8'
  },
  {
    key: 'luc',
    title: 'Đúng lúc',
    short: 'Chia lần bón theo nhịp sinh trưởng và điều kiện thời tiết',
    detail: 'Ưu tiên bón lót nguồn P sớm cho rễ non; chia đợt bón N và K theo giai đoạn sinh khối, tạo hạt, củ, quả.',
    main: 'var(--k-main)',
    deep: 'var(--k-deep)',
    soft: 'var(--k-tint)',
    glow: 'var(--k-glow)',
    hex: '#E8A13A'
  },
  {
    key: 'cach',
    title: 'Đúng cách',
    short: 'Đặt phân hợp lý, không trộn đạm amoni với vôi, kết hợp hữu cơ',
    detail: 'Hạn chế bay hơi NH₃ và rửa trôi; phối hợp phân hữu cơ hoai mục để duy trì cấu trúc đất và hệ vi sinh vật.',
    main: 'var(--i-main)',
    deep: 'var(--i-deep)',
    soft: 'var(--i-tint)',
    glow: 'var(--i-glow)',
    hex: '#174B37'
  }
];

function PrincipleIcon({ type, color }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: color,
    strokeWidth: 2.2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true
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
    <svg width="19" height="19" viewBox="0 0 20 20" aria-hidden="true">
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M3 21l5-14 9 9-14 5Z" fill="#FDE68A" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M7 12l5 5M5.2 16.6l3.2 3.2" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="15" cy="4" r="1.4" fill="#fff" />
    <circle cx="20" cy="9" r="1.2" fill="#BBF7D0" />
  </svg>
);

const ChatIcon = ({ color = '#174B37' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export default function Slide20Closing() {
  const [showQaModal, setShowQaModal] = useState(false);
  const [active, setActive] = useState(0);
  const confettiTimers = useRef([]);

  useEffect(
    () => () => {
      confettiTimers.current.forEach(clearTimeout);
      confettiTimers.current = [];
    },
    []
  );

  const cur = PRINCIPLES[active];

  const handleConfetti = useCallback(async () => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    try {
      const { default: confetti } = await import('canvas-confetti');
      const colors = ['#16A36A', '#7862E8', '#E8A13A', '#174B37'];
      confetti({
        particleCount: 70,
        spread: 85,
        startVelocity: 40,
        origin: { y: 0.65 },
        colors,
        disableForReducedMotion: true
      });
    } catch {
      // Ignore confetti error
    }
  }, []);

  return (
    <div className="s20-root">
      <style>{`
        .s20-root {
          display: grid;
          grid-template-columns: 520px 1fr;
          height: 100%;
          gap: 22px;
          align-items: stretch;
          overflow: hidden;
          position: relative;
        }
        .s20-left {
          display: flex; flex-direction: column; justify-content: space-between; gap: 8px;
          min-height: 0; overflow-y: auto; padding-right: 4px;
        }
        .s20-title {
          font-family: var(--font-display);
          font-size: 27px; font-weight: 900; line-height: 1.15;
          margin: 0; letter-spacing: -0.02em; color: var(--ink);
        }
        .s20-npk-strip {
          display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px;
        }
        .s20-npk-chip {
          padding: 7px 9px; border-radius: 12px; display: flex; flex-direction: column; gap: 2px;
        }
        .s20-npk-chip-head {
          display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 900;
        }
        .s20-npk-chip-dot {
          width: 20px; height: 20px; border-radius: 6px; color: #fff; font-size: 11.5px; font-weight: 900;
          display: grid; place-items: center; flex-shrink: 0;
        }
        .s20-npk-chip-desc {
          font-size: 11.8px; line-height: 1.28; color: var(--ink-soft); font-weight: 600;
        }

        .s20-list { display: flex; flex-direction: column; gap: 7px; }
        .s20-card {
          --c: var(--n-main); --soft: var(--n-tint); --deep: var(--n-deep); --glow: var(--n-glow);
          position: relative; display: flex; align-items: center; gap: 11px;
          width: 100%; text-align: left; font: inherit;
          padding: 8px 12px 8px 10px; border-radius: 14px; cursor: pointer;
          background: #FFFFFF;
          border: 1.5px solid var(--line);
          transition: transform .2s var(--ease-out), box-shadow .2s var(--ease-out), border-color .2s var(--ease-out);
          overflow: hidden;
        }
        .s20-card::before {
          content: ''; position: absolute; inset: 0 auto 0 0; width: 5px;
          background: var(--c); border-radius: 14px 0 0 14px;
        }
        .s20-card:hover { transform: translateX(3px); }
        .s20-card:focus-visible { outline: 3px solid var(--c); outline-offset: 2px; }
        .s20-card.on {
          background: #fff; border-color: var(--c);
          box-shadow: 0 8px 20px var(--glow);
          transform: translateX(4px);
        }
        .s20-icon {
          width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0;
          display: grid; place-items: center; background: var(--soft);
        }
        .s20-txt { flex: 1; min-width: 0; font-size: 13.8px; font-weight: 600; line-height: 1.32; color: var(--ink-soft); }
        .s20-txt b { display: block; font-size: 15px; font-weight: 900; color: var(--deep); margin-bottom: 1px; }
        .s20-check { flex-shrink: 0; }

        .s20-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
        .s20-btn {
          border-radius: 999px; display: inline-flex; align-items: center; gap: 8px;
          padding: 9px 18px; font-size: 14px; font-weight: 800; cursor: pointer; font-family: inherit;
          transition: transform .18s var(--ease-out), box-shadow .18s var(--ease-out);
        }
        .s20-btn:hover { transform: translateY(-1px); }
        .s20-btn.party {
          border: none; color: #fff;
          background: linear-gradient(135deg, var(--n-main) 0%, var(--i-main) 100%);
          box-shadow: 0 6px 18px var(--n-glow);
        }
        .s20-btn.qa {
          background: #fff; color: var(--i-main); border: 1.5px solid var(--i-main);
        }
        .s20-btn.qa.open { background: var(--i-main); color: #fff; }

        .s20-thanks {
          padding: 8px 13px; border-radius: 13px; background: var(--i-soft); border: 1.5px solid var(--i-line);
          font-size: 14.2px; font-weight: 800; color: var(--i-deep); display: flex; align-items: center; justify-content: space-between; gap: 10px;
        }

        .s20-stage {
          position: relative; width: 100%; height: 100%; min-height: 0;
          display: flex; flex-direction: column; align-items: stretch; justify-content: center; gap: 8px;
          border-radius: 24px; padding: 10px; overflow: hidden;
          background:
            radial-gradient(60% 55% at 15% 15%, var(--n-soft) 0%, transparent 70%),
            radial-gradient(60% 55% at 85% 15%, var(--p-soft) 0%, transparent 70%),
            radial-gradient(60% 55% at 50% 88%, var(--k-soft) 0%, transparent 70%),
            #FFFFFF;
          border: 1.5px solid var(--line);
          box-shadow: var(--shadow-md);
          contain: layout paint style;
        }
        .s20-art { width: 100%; flex: 1 1 0; min-height: 0; }
        .s20-art > svg { width: 100%; height: 100%; }

        .s20-caption {
          --c: var(--n-main); --soft: var(--n-tint); --deep: var(--n-deep);
          position: relative; z-index: 3; flex: 0 0 auto; margin: 0 4px 2px;
          display: flex; align-items: center; gap: 12px;
          padding: 9px 14px; border-radius: 16px;
          background: rgba(255,255,255,.97);
          border: 1.5px solid var(--c);
        }
        .s20-caption .dot {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          display: grid; place-items: center; background: var(--soft);
        }
        .s20-caption .t { font-size: 13.5px; line-height: 1.38; color: var(--ink-soft); font-weight: 600; }
        .s20-caption .t b { color: var(--deep); font-weight: 900; font-size: 14.2px; margin-right: 6px; }
      `}</style>

      {/* ================= CỘT TRÁI ================= */}
      <div className="s20-left">
        <div>
          <div className="chapter-pill" style={{ marginBottom: 4 }}>
            <span>TỔNG KẾT • DÙNG PHÂN ĐÚNG &amp; BỀN VỮNG</span>
          </div>
          <h1 className="s20-title">CÂN ĐỐI N–P–K &amp; NGUYÊN TẮC 4 ĐÚNG</h1>
        </div>

        {/* 3 nhánh hội tụ N - P - K theo đúng Mục 5 Slide 20 */}
        <div className="s20-npk-strip" aria-label="Tóm tắt vai trò N, P, K">
          {NPK_SUMMARY.map((item) => (
            <div
              key={item.key}
              className="s20-npk-chip"
              style={{ background: item.bg, border: `1.5px solid ${item.border}` }}
            >
              <div className="s20-npk-chip-head" style={{ color: item.color }}>
                <span className="s20-npk-chip-dot" style={{ background: item.badge }}>
                  {item.key}
                </span>
                <span>{item.label.replace(/^[NPK] — /, '')}</span>
              </div>
              <div className="s20-npk-chip-desc">{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Checklist 4 ĐÚNG: đúng loại · đúng liều · đúng lúc · đúng cách */}
        <div className="s20-list" role="tablist" aria-label="Nguyên tắc 4 Đúng">
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
                '--glow': p.glow
              }}
              onClick={() => setActive(i)}
              onMouseEnter={() => active !== i && setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className="s20-icon">
                <PrincipleIcon type={p.key} color={p.hex} />
              </span>
              <span className="s20-txt">
                <b>4 ĐÚNG — {p.title}</b>
                {p.short}
              </span>
              <span className="s20-check">
                <CheckBadge color={p.hex} active={active === i} />
              </span>
            </button>
          ))}
        </div>

        {/* Lời cảm ơn + Q&A */}
        <div className="s20-thanks">
          <span>🌱 Cảm ơn thầy cô và các bạn đã lắng nghe!</span>
          <div className="s20-actions">
            <button type="button" className="s20-btn party" onClick={handleConfetti}>
              <PartyIcon />
              <span>Chúc mừng</span>
            </button>
            <button
              type="button"
              className={`s20-btn qa ${showQaModal ? 'open' : ''}`}
              onClick={() => setShowQaModal((v) => !v)}
              aria-expanded={showQaModal}
            >
              <ChatIcon color={showQaModal ? '#FFFFFF' : '#174B37'} />
              <span>Thảo luận Q&amp;A</span>
            </button>
          </div>
        </div>

        {showQaModal ? (
          <div
            style={{
              background: '#FFFFFF',
              border: '1.5px solid var(--i-line)',
              borderRadius: 13,
              padding: '8px 12px',
              fontSize: 13.5,
              color: 'var(--ink)',
              fontWeight: 700
            }}
            role="status"
          >
            Nhóm rất mong nhận được câu hỏi và ý kiến đóng góp từ thầy cô và các bạn cho 15 câu hỏi N – P – K!
          </div>
        ) : (
          <CuteMascot
            variant="banner"
            mascotType="SPROUTY_N"
            emotion="proud"
            speech="Bón đúng loại · đúng liều · đúng lúc · đúng cách để bảo vệ đất và mùa vàng bền vững!"
            size={42}
          />
        )}
      </div>

      {/* ================= CỘT PHẢI ================= */}
      <div className="s20-stage">
        <div className="s20-art">
          <SvgClosingEco active={active} />
        </div>

        <div
          key={cur.key}
          className="s20-caption"
          style={{ '--c': cur.main, '--soft': cur.soft, '--deep': cur.deep }}
        >
          <span className="dot">
            <PrincipleIcon type={cur.key} color={cur.hex} />
          </span>
          <span className="t">
            <b>{cur.title}:</b>
            {cur.detail}
          </span>
        </div>
      </div>
    </div>
  );
}