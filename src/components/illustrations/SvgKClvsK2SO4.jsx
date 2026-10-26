import React from "react";

/* ─────────────────────────────────────────────────────────────
   KCl vs K₂SO₄ — bản nâng cấp (hơi 3D, mượt, nhẹ)
   Props:
     width     : "100%" | 640 | "40rem"…   (mặc định "100%")
     height    : "auto" | số | chuỗi         (mặc định "auto" – giữ tỉ lệ 1000:760)
     maxWidth  : giới hạn chiều rộng (tùy chọn)
     className : class CSS tùy ý
     style     : style bổ sung cho <svg>
     animated  : true/false – tắt toàn bộ hiệu ứng khi cần (mặc định true)
   Hiệu năng: chỉ animate transform/opacity bằng CSS, không dùng blur động,
   bóng đổ là filter tĩnh gắn vào nền thẻ (không animate bên trong filter).
   ───────────────────────────────────────────────────────────── */

const W = 1000;
const H = 760;

const kclCrystals = [
  [146, 318, 0.8], [171, 291, 0.92], [198, 321, 0.85], [222, 286, 0.92], [251, 314, 1],
  [284, 292, 0.83], [311, 321, 0.9], [340, 298, 0.95], [363, 327, 0.78],
  [190, 347, 0.8], [248, 345, 0.9], [305, 350, 0.8],
];
const sulfateCrystals = [
  [632, 321, 0.82], [657, 293, 0.9], [684, 321, 0.86], [710, 285, 0.9], [740, 310, 0.98],
  [771, 291, 0.84], [800, 319, 0.9], [828, 297, 0.9], [851, 323, 0.8],
  [680, 346, 0.82], [738, 347, 0.9], [794, 347, 0.8],
];
const kclGrains = [[137, 354, 3.3], [155, 337, 2.1], [184, 359, 2.6], [208, 337, 2], [235, 363, 3], [279, 358, 2.3], [311, 339, 2.5], [336, 359, 2.9], [367, 345, 2.1], [385, 360, 2.7]];
const sulGrains = [[619, 352, 3.1], [638, 337, 2.1], [667, 359, 2.4], [691, 337, 2], [718, 362, 2.8], [762, 359, 2.3], [792, 337, 2.5], [819, 357, 2.8], [847, 345, 2.1], [866, 358, 2.7]];

/* Thang K₂O: 0–70 % trải trên 410 px */
const BAR_W = 410;
const barPx = (pct) => (BAR_W * pct) / 70;

const star = (x, y, r) =>
  `M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28}L${x + r} ${y}L${x + r * 0.28} ${y + r * 0.28}L${x} ${y + r}L${x - r * 0.28} ${y + r * 0.28}L${x - r} ${y}L${x - r * 0.28} ${y - r * 0.28}Z`;

const FONT = "'Be Vietnam Pro', Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

/* ───────── Tinh thể 3 mặt (sáng – trung – tối) + bóng nền ───────── */
const Crystal = React.memo(function Crystal({ x, y, scale, pale, index, u }) {
  const top = pale ? "#FFFFFF" : "#FFC2CC";
  const left = pale ? "url(#" + u("whiteCrystal") + ")" : "url(#" + u("pinkCrystal") + ")";
  const dark = pale ? "#94A3B8" : "#881337";
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="14" cy="33" rx="13" ry="3.4" fill={pale ? "#475569" : "#881337"} opacity=".22" />
      <g className={u("crystal")} style={{ animationDelay: `${(index % 6) * 0.3}s` }}>
        <path d="M0 13L5 1L18 0L29 10L26 26L12 32L1 24Z" fill={pale ? "#FFFFFF" : "#FB7185"} opacity={pale ? ".85" : ".45"} transform="translate(-1.5 -1.5) scale(1.1)" />
        <path d="M0 13L5 1L18 0L29 10L26 26L12 32L1 24Z" fill={left} stroke={pale ? "#E2E8F0" : "#FDA4AF"} strokeWidth="1" strokeLinejoin="round" />
        <path d="M5 1L13 11L0 13Z" fill={top} opacity=".9" />
        <path d="M13 11L18 0L29 10Z" fill={top} opacity=".6" />
        <path d="M13 11L26 26L12 32L1 24Z" fill={dark} opacity={pale ? ".22" : ".4"} />
        <path d="M13 11L29 10L26 26Z" fill={dark} opacity={pale ? ".1" : ".18"} />
        <path d="M13 11V30M13 11L1 24" stroke={pale ? "#FFFFFF" : "#FFE4E6"} strokeWidth=".9" opacity=".7" />
        <path d="M5 5L9 2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </g>
  );
});

/* ───────── Mạng ion thu nhỏ ───────── */
function Lattice({ x, y, type, u }) {
  const isK = type === "kcl";
  const nodes = [];
  const lines = [];
  if (isK) {
    for (let r = 0; r < 2; r++)
      for (let c = 0; c < 3; c++) {
        const px = 12 + c * 19, py = 17 + r * 17;
        nodes.push({ px, py, k: (r + c) % 2 === 0 });
        if (c < 2) lines.push([px, py, px + 19, py]);
        if (r < 1) lines.push([px, py, px, py + 17]);
      }
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width="62" height="50" rx="11" fill="#FFFFFF" opacity=".88" stroke={isK ? "#FDA4AF" : "#BBF7D0"} />
      {isK ? (
        <>
          {lines.map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#CBD5E1" strokeWidth="1.2" />)}
          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.px} cy={n.py} r={n.k ? 4.5 : 5.8} fill={n.k ? "#F97316" : "#E11D48"} stroke="#fff" strokeWidth="1" />
              <circle cx={n.px - 1.2} cy={n.py - 1.4} r={n.k ? 1.4 : 1.8} fill="#fff" opacity=".6" />
            </g>
          ))}
        </>
      ) : (
        <>
          {[[12, 14], [50, 14], [12, 31], [50, 31]].map(([a, b], i) => (
            <g key={i}>
              <line x1={a} y1={b} x2="31" y2="22.5" stroke="#CBD5E1" strokeWidth="1.2" />
              <circle cx={a} cy={b} r="4.2" fill="#F97316" stroke="#fff" strokeWidth="1" />
              <circle cx={a - 1} cy={b - 1.2} r="1.3" fill="#fff" opacity=".6" />
            </g>
          ))}
          <circle cx="31" cy="22.5" r="8.8" fill={`url(#${u("gold")})`} stroke="#fff" strokeWidth="1.2" />
          <circle cx="28" cy="19" r="2.6" fill="#fff" opacity=".55" />
        </>
      )}
      <text x="31" y="45" textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748B" letterSpacing=".4">MẠNG ION</text>
    </g>
  );
}

/* ───────── Ion bay theo quỹ đạo elip (SMIL, chỉ 4 hạt/mẫu) ───────── */
function Orbit({ cx, cy, rx, ry, ions, animated, u }) {
  const d = `M${cx - rx} ${cy} a${rx} ${ry} 0 1 1 ${2 * rx} 0 a${rx} ${ry} 0 1 1 ${-2 * rx} 0`;
  return (
    <g>
      <path d={d} fill="none" stroke="#94A3B8" strokeWidth=".9" strokeDasharray="2 6" opacity=".55" />
      {ions.map((ion, i) => (
        <g key={i} transform={animated ? undefined : `translate(${cx + rx * Math.cos((i / ions.length) * 6.283)} ${cy + ry * Math.sin((i / ions.length) * 6.283)})`}>
          {animated && <animateMotion dur="20s" begin={`${-i * (20 / ions.length)}s`} repeatCount="indefinite" path={d} />}
          <circle r={ion.r + 4} fill={ion.c} opacity=".25" />
          <circle r={ion.r} fill={ion.c} stroke="#FFFFFF" strokeWidth="1.3" />
          <circle r={ion.r} fill={`url(#${u("gloss")})`} />
          <text y={ion.fs * 0.36} textAnchor="middle" fontSize={ion.fs} fontWeight="900" fill={ion.t || "#fff"}>{ion.l}</text>
        </g>
      ))}
    </g>
  );
}

/* ───────── Thanh K₂O ───────── */
function Bar({ x, pct, label, colorId, ringColor, textColor, u }) {
  const w = barPx(pct);
  return (
    <g>
      <text x={x} y="448" fontSize="13" fontWeight="800" fill="#475569" letterSpacing=".3">HÀM LƯỢNG K₂O</text>
      <text x={x + BAR_W} y="448" textAnchor="end" fontSize="15" fontWeight="900" fill={textColor}>{label}</text>
      <rect x={x} y="458" width={BAR_W} height="12" rx="6" fill="#EEF2F7" stroke="#E2E8F0" strokeWidth=".7" />
      <rect x={x} y="458" width={BAR_W} height="4" rx="2" fill="#94A3B8" opacity=".15" />
      <g className={u("grow")}>
        <rect x={x} y="458" width={w} height="12" rx="6" fill={`url(#${colorId})`} />
        <rect x={x} y="464" width={w} height="6" rx="3" fill="#000" opacity=".1" />
        <rect x={x + 5} y="460" width={Math.max(0, w - 10)} height="3.4" rx="1.7" fill="#FFFFFF" opacity=".5" />
      </g>
      <circle cx={x + w} cy="464" r="9.5" fill={ringColor} opacity=".22" />
      <circle cx={x + w} cy="464" r="7" fill="#FFFFFF" stroke={ringColor} strokeWidth="2.2" />
      {[0, 20, 40, 60].map((v) => (
        <g key={v}>
          <line x1={x + barPx(v)} x2={x + barPx(v)} y1="471" y2="475" stroke="#94A3B8" strokeWidth="1" />
          <text x={x + barPx(v)} y="486" textAnchor={v === 0 ? "start" : "middle"} fontSize="12" fontWeight="600" fill="#94A3B8">{v}%</text>
        </g>
      ))}
    </g>
  );
}

/* ───────── Đĩa 3D (bóng, thân đĩa, vành, mặt trong) ───────── */
function Dish({ cx, dishId, rimStroke, rimFill, innerFill, shadow, glow }) {
  const x0 = cx - 141;
  return (
    <g>
      <ellipse cx={cx} cy="392" rx="150" ry="22" fill={shadow} opacity=".2" />
      <ellipse cx={cx} cy="388" rx="132" ry="18" fill={shadow} opacity=".16" />
      <path d={`M${x0 + 0} 349C${x0 + 6} 383 ${x0 + 50} 407 ${cx} 409C${cx + 90} 407 ${cx + 134} 383 ${cx + 141} 349L${cx + 130} 378C${cx + 105} 400 ${cx + 62} 411 ${cx} 412C${cx - 64} 411 ${cx - 107} 400 ${cx - 130} 378Z`} fill={`url(#${dishId})`} stroke={rimStroke} strokeWidth="1.3" />
      <ellipse cx={cx} cy="350" rx="141" ry="43" fill={rimFill} stroke={rimStroke} strokeWidth="2" />
      <ellipse cx={cx} cy="352" rx="128" ry="34" fill={innerFill} />
      <path d={`M${cx - 120} 342C${cx - 70} 318 ${cx + 70} 318 ${cx + 120} 342`} fill="none" stroke="#FFFFFF" strokeWidth="2" opacity=".6" strokeLinecap="round" />
      <ellipse cx={cx} cy="338" rx="108" ry="22" fill={glow} opacity=".35" />
    </g>
  );
}

export default function SvgKClvsK2SO4({
  width = "100%",
  height = "auto",
  maxWidth,
  className,
  style,
  animated = true,
}) {
  const rid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = `potash-${rid}`;
  const u = (name) => `${id}-${name}`;
  const url = (name) => `url(#${u(name)})`;

  const kclIons = [
    { l: "K⁺", c: "#F97316", r: 9, fs: 8.5 }, { l: "Cl⁻", c: "#E11D48", r: 10, fs: 7.5 },
    { l: "K⁺", c: "#F97316", r: 9, fs: 8.5 }, { l: "Cl⁻", c: "#E11D48", r: 10, fs: 7.5 },
  ];
  const sulIons = [
    { l: "K⁺", c: "#F97316", r: 9, fs: 8.5 }, { l: "SO₄", c: "#F59E0B", r: 11, fs: 7, t: "#78350F" },
    { l: "K⁺", c: "#F97316", r: 9, fs: 8.5 }, { l: "SO₄", c: "#F59E0B", r: 11, fs: 7, t: "#78350F" },
  ];

  const chips = [
    { x: 506, t: "KCl", s: "Cần K, tiết kiệm", n: "1", st: "#FED7AA", bg: "#FFEDD5", tc: "#C2410C", hc: "#9A3412" },
    { x: 660, t: "K₂SO₄", s: "Cần K, tránh Cl⁻", n: "2", st: "#BBF7D0", bg: "#DCFCE7", tc: "#15803D", hc: "#166534" },
    { x: 814, t: "KIỂM TRA ĐẤT", s: "Xét nhu cầu K, S", n: "3", st: "#DDD6FE", bg: "#EDE9FE", tc: "#6D28D9", hc: "#5B21B6" },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        width,
        height,
        maxWidth,
        aspectRatio: `${W} / ${H}`,
        borderRadius: 24,
        fontFamily: FONT,
        ...style,
      }}
    >
      <title id={`${id}-title`}>So sánh phân kali clorua KCl và kali sunfat K2SO4</title>
      <desc id={`${id}-desc`}>
        So sánh tinh thể, hàm lượng K2O, lưu huỳnh, ion đi kèm, đặc điểm và tình huống sử dụng của hai loại phân kali.
      </desc>

      <defs>
        <linearGradient id={u("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#FFF7ED" /><stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <radialGradient id={u("auroraO")}><stop offset="0" stopColor="#FB923C" stopOpacity=".28" /><stop offset="1" stopColor="#FB923C" stopOpacity="0" /></radialGradient>
        <radialGradient id={u("auroraG")}><stop offset="0" stopColor="#34D399" stopOpacity=".3" /><stop offset="1" stopColor="#34D399" stopOpacity="0" /></radialGradient>
        <radialGradient id={u("auroraR")}><stop offset="0" stopColor="#FB7185" stopOpacity=".2" /><stop offset="1" stopColor="#FB7185" stopOpacity="0" /></radialGradient>
        <pattern id={u("dots")} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r=".9" fill="#94A3B8" opacity=".2" />
        </pattern>
        <linearGradient id={u("title")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#172033" /><stop offset=".55" stopColor="#334155" /><stop offset="1" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id={u("pinkCrystal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FECDD3" /><stop offset="35%" stopColor="#FB7185" /><stop offset="70%" stopColor="#E11D48" /><stop offset="100%" stopColor="#9F1239" />
        </linearGradient>
        <linearGradient id={u("whiteCrystal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="45%" stopColor="#F1F5F9" /><stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={u("pinkDish")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE4E6" /><stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id={u("whiteDish")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id={u("gold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" /><stop offset="55%" stopColor="#FBBF24" /><stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={u("green")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#86EFAC" /><stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id={u("orange")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FDBA74" /><stop offset="55%" stopColor="#FB7185" /><stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id={u("footer")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF7ED" /><stop offset="52%" stopColor="#F8FAFC" /><stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <radialGradient id={u("gloss")} cx=".3" cy=".25" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={u("stageL")} cx=".5" cy=".62" r=".65">
          <stop offset="0" stopColor="#FFE4E6" /><stop offset="1" stopColor="#FFF7F7" />
        </radialGradient>
        <radialGradient id={u("stageR")} cx=".5" cy=".62" r=".65">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#EEF2F7" />
        </radialGradient>
        <linearGradient id={u("edgeL")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FB923C" stopOpacity="0" /><stop offset=".5" stopColor="#FB923C" /><stop offset="1" stopColor="#FB923C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={u("edgeR")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22C55E" stopOpacity="0" /><stop offset=".5" stopColor="#22C55E" /><stop offset="1" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={u("sheen")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".9" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* bóng đổ tĩnh cho thẻ – chỉ gắn lên nền, không bao animation */}
        <filter id={u("card")} x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0F172A" floodOpacity=".13" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity=".08" />
        </filter>

        <clipPath id={u("leftStage")}><rect x="51" y="205" width="416" height="218" rx="16" /></clipPath>
        <clipPath id={u("rightStage")}><rect x="533" y="205" width="416" height="218" rx="16" /></clipPath>

        <style>{`
          @keyframes ${u("float")} { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3.5px); } }
          @keyframes ${u("shine")} { 0% { transform: translateX(-90px); opacity: 0; } 20% { opacity: .5; } 80% { opacity: .5; } 100% { transform: translateX(440px); opacity: 0; } }
          @keyframes ${u("pulse")} { 0%,100% { opacity: .3; } 50% { opacity: .7; } }
          @keyframes ${u("sparkle")} { 0%,100% { opacity: .15; transform: scale(.6); } 50% { opacity: 1; transform: scale(1); } }
          @keyframes ${u("ion")} { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes ${u("growk")} { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes ${u("spin")} { to { transform: rotate(360deg); } }
          .${u("crystal")} { animation: ${u("float")} 4.6s ease-in-out infinite; will-change: transform; }
          .${u("shine")} { animation: ${u("shine")} 9s ease-in-out infinite; }
          .${u("pulse")} { animation: ${u("pulse")} 4s ease-in-out infinite; }
          .${u("twinkle")} { transform-box: fill-box; transform-origin: center; animation: ${u("sparkle")} 3s ease-in-out infinite; }
          .${u("ionFloat")} { animation: ${u("ion")} 3.4s ease-in-out infinite; }
          .${u("grow")} { transform-box: fill-box; transform-origin: left center; animation: ${u("growk")} 1.4s cubic-bezier(.2,.8,.2,1) both; }
          .${u("spin")} { transform-box: fill-box; transform-origin: center; animation: ${u("spin")} 7s linear infinite; }
          ${animated ? "" : `.${u("crystal")}, .${u("shine")}, .${u("pulse")}, .${u("twinkle")}, .${u("ionFloat")}, .${u("grow")}, .${u("spin")} { animation: none !important; }`}
          @media (prefers-reduced-motion: reduce) {
            .${u("crystal")}, .${u("shine")}, .${u("pulse")}, .${u("twinkle")}, .${u("ionFloat")}, .${u("grow")}, .${u("spin")} { animation: none !important; }
          }
        `}</style>
      </defs>

      {/* ============ NỀN & TIÊU ĐỀ ============ */}
      <rect width={W} height={H} rx="28" fill={url("bg")} stroke="#FDE68A" strokeWidth="1.5" />
      <ellipse cx="90" cy="130" rx="300" ry="200" fill={url("auroraO")} />
      <ellipse cx="900" cy="110" rx="300" ry="190" fill={url("auroraG")} />
      <ellipse cx="500" cy="720" rx="460" ry="150" fill={url("auroraR")} />
      <rect width={W} height={H} rx="28" fill={url("dots")} />
      <rect x="1" y="1" width="998" height="758" rx="27" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity=".9" />

      <rect x="34" y="27" width="7" height="24" rx="3.5" fill="#F97316" />
      <text x="54" y="44" fontSize="13.5" fontWeight="900" letterSpacing="2" fill="#C2410C">DINH DƯỠNG KHOÁNG · PHÂN BÓN KALI</text>
      <text x="34" y="82" fontSize="31" fontWeight="900" letterSpacing="-.8" fill={url("title")}>
        KCl<tspan fill="#94A3B8" fontWeight="700"> vs </tspan><tspan fill="#15803D">K₂SO₄</tspan><tspan fill="#334155"> — CHỌN LOẠI NÀO?</tspan>
      </text>
      <text x="35" y="108" fontSize="13.5" fontWeight="500" fill="#64748B">
        Hai nguồn kali · Hai thành phần đi kèm · Một quyết định theo nhu cầu cây trồng
      </text>

      <g transform="translate(790 94)">
        <circle r="5" fill="#FB7185" />
        <text x="12" y="4.5" fontSize="13.5" fontWeight="800" fill="#64748B">KCl</text>
        <circle cx="62" r="5" fill="#94A3B8" />
        <text x="74" y="4.5" fontSize="13.5" fontWeight="800" fill="#64748B">K₂SO₄</text>
      </g>

      {/* ============ THẺ TRÁI: KCl ============ */}
      <rect x="30" y="135" width="455" height="493" rx="22" fill="#FFFFFF" stroke="#FED7AA" strokeWidth="1.4" filter={url("card")} />
      <rect x="30" y="135" width="455" height="493" rx="22" fill={url("auroraO")} opacity=".5" />
      <rect x="70" y="134" width="375" height="3" rx="1.5" fill={url("edgeL")} />
      <rect x="31" y="136" width="453" height="491" rx="21" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity=".9" />

      <rect x="50" y="153" width="38" height="38" rx="12" fill="#FFF7ED" stroke="#FED7AA" />
      <rect x="50" y="153" width="38" height="19" rx="12" fill="#FFFFFF" opacity=".5" />
      <g transform="translate(57 160)" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10L12 3L22 10V25H2Z" /><path d="M7 25V15H17V25" /><path d="M0 28H24" />
      </g>
      <text x="100" y="169" fontSize="15" fontWeight="900" fill="#9A3412">KALI CLORUA</text>
      <text x="100" y="187" fontSize="13" fontWeight="700" fill="#EA580C">KCl · MOP / MURIATE OF POTASH</text>
      <rect x="362" y="158" width="104" height="28" rx="14" fill="#FFF7ED" stroke="#FDBA74" />
      <text x="414" y="177" textAnchor="middle" fontSize="14" fontWeight="900" fill="#C2410C">0–0–60*</text>

      {/* sân khấu mẫu trái */}
      <rect x="51" y="205" width="416" height="218" rx="16" fill={url("stageL")} stroke="#FFE4E6" />
      <g clipPath={url("leftStage")}>
        <circle cx="121" cy="254" r="46" fill="#FDA4AF" opacity=".2" />
        <circle cx="402" cy="375" r="54" fill="#FB7185" opacity=".12" />

        <rect x="67" y="217" width="46" height="24" rx="12" fill="#FFEDD5" stroke="#FDBA74" />
        <text x="90" y="233.5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#9A3412">K⁺</text>
        <text x="122" y="233" fontSize="14" fontWeight="800" fill="#9A3412">+</text>
        <rect x="137" y="217" width="50" height="24" rx="12" fill="#FFE4E6" stroke="#FDA4AF" />
        <text x="162" y="233.5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#9F1239">Cl⁻</text>

        <rect x="388" y="214" width="70" height="24" rx="12" fill="#FFE4E6" stroke="#FDA4AF" />
        <circle cx="400" cy="226" r="3.2" fill="#E11D48" />
        <text x="407" y="230.5" fontSize="12.5" fontWeight="900" fill="#9F1239">CÓ CLO</text>
        <Lattice x={396} y={246} type="kcl" u={u} />

        <Dish cx={258} dishId={u("pinkDish")} rimStroke="#FB7185" rimFill="#FFE4E6" innerFill="#FDA4AF" shadow="#881337" glow="#FFFFFF" />
        <ellipse cx="257" cy="329" rx="110" ry="56" fill="#FB7185" opacity=".3" className={u("pulse")} />

        <Orbit cx={258} cy={326} rx={150} ry={58} ions={kclIons} animated={animated} u={u} />

        {kclCrystals.map(([x, y, s], i) => <Crystal key={i} x={x} y={y} scale={s} index={i} u={u} />)}

        {kclGrains.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 === 0 ? "#FFFFFF" : "#FB7185"} stroke="#FDA4AF" strokeWidth=".65" />
        ))}
        {[[171, 291, 6], [251, 292, 7.5], [340, 298, 6], [222, 286, 5]].map(([x, y, r], i) => (
          <path key={i} d={star(x + 8, y + 2, r)} fill="#FFFFFF" className={u("twinkle")} style={{ animationDelay: `${i * 0.7}s` }} />
        ))}

        <rect x="58" y="205" width="28" height="218" fill={url("sheen")} opacity=".5" className={u("shine")} />
      </g>
      <text x="67" y="408" fontSize="13" fontWeight="700" fill="#9F1239">TINH THỂ HỒNG / TRẮNG</text>
      <text x="451" y="408" textAnchor="end" fontSize="13" fontWeight="700" fill="#9F1239" opacity=".75">MẪU MINH HỌA</text>

      <Bar x={53} pct={60} label="60–62%" colorId={u("orange")} ringColor="#FB7185" textColor="#C2410C" u={u} />
      <text x="53" y="508" fontSize="13.5" fontWeight="600" fill="#64748B">Hàm lượng K₂O quy đổi thường cao hơn.</text>
      <line x1="53" y1="518" x2="463" y2="518" stroke="#E2E8F0" strokeWidth="1.2" />

      <rect x="53" y="527" width="26" height="26" rx="8" fill="#FFEDD5" />
      <path d="M60 546V533M60 537C55 536 55 532 57 531C60 531 60 534 60 537ZM60 541C65 540 66 537 64 535C61 535 60 538 60 541Z" fill="none" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="90" y="537" fontSize="14" fontWeight="900" fill="#9A3412">Phù hợp</text>
      <text x="90" y="553" fontSize="13.5" fontWeight="600" fill="#475569">Nhiều cây trồng khi cần nguồn kali kinh tế</text>
      <text x="53" y="577" fontSize="13" fill="#64748B">Lưu ý: KCl bổ sung ion Cl⁻, cần cân nhắc với cây</text>
      <text x="53" y="593" fontSize="13" fill="#64748B">nhạy clo và đất có nguy cơ tích lũy muối.</text>
      <rect x="53" y="598" width="206" height="24" rx="12" fill="#FFF7ED" stroke="#FED7AA" />
      <circle cx="68" cy="610" r="4" fill="#F97316" />
      <text x="79" y="614.5" fontSize="12.5" fontWeight="800" fill="#9A3412">THƯỜNG CÓ GIÁ KINH TẾ</text>

      {/* ============ THẺ PHẢI: K₂SO₄ ============ */}
      <rect x="515" y="135" width="455" height="493" rx="22" fill="#FFFFFF" stroke="#BBF7D0" strokeWidth="1.4" filter={url("card")} />
      <rect x="515" y="135" width="455" height="493" rx="22" fill={url("auroraG")} opacity=".5" />
      <rect x="555" y="134" width="375" height="3" rx="1.5" fill={url("edgeR")} />
      <rect x="516" y="136" width="453" height="491" rx="21" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity=".9" />

      <rect x="535" y="153" width="38" height="38" rx="12" fill="#DCFCE7" stroke="#BBF7D0" />
      <rect x="535" y="153" width="38" height="19" rx="12" fill="#FFFFFF" opacity=".5" />
      <g transform="translate(542 160)" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12L12 3L22 12V25H2Z" /><path d="M7 25V15H17V25" /><path d="M0 28H24" /><path d="M17 7l5-4" />
      </g>
      <text x="585" y="169" fontSize="15" fontWeight="900" fill="#166534">KALI SUNFAT</text>
      <text x="585" y="187" fontSize="13" fontWeight="700" fill="#16A34A">K₂SO₄ · SULFATE OF POTASH</text>
      <rect x="846" y="158" width="104" height="28" rx="14" fill="#F0FDF4" stroke="#86EFAC" />
      <text x="898" y="177" textAnchor="middle" fontSize="14" fontWeight="900" fill="#15803D">0–0–50*</text>

      <rect x="533" y="205" width="416" height="218" rx="16" fill={url("stageR")} stroke="#E2E8F0" />
      <g clipPath={url("rightStage")}>
        <circle cx="603" cy="254" r="46" fill="#BBF7D0" opacity=".3" />
        <circle cx="884" cy="375" r="54" fill="#94A3B8" opacity=".12" />

        <rect x="549" y="217" width="46" height="24" rx="12" fill="#FFEDD5" stroke="#FDBA74" />
        <text x="572" y="233.5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#9A3412">K⁺</text>
        <text x="604" y="233" fontSize="14" fontWeight="800" fill="#64748B">+</text>
        <rect x="619" y="217" width="66" height="24" rx="12" fill="#FEF3C7" stroke="#FDE68A" />
        <text x="652" y="233.5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#92400E">SO₄²⁻</text>

        <rect x="838" y="214" width="108" height="24" rx="12" fill="#DCFCE7" stroke="#86EFAC" />
        <circle cx="850" cy="226" r="3.2" fill="#16A34A" />
        <text x="857" y="230.5" fontSize="12.5" fontWeight="900" fill="#15803D">CÓ LƯU HUỲNH</text>
        <Lattice x={884} y={246} type="k2so4" u={u} />

        <Dish cx={740} dishId={u("whiteDish")} rimStroke="#94A3B8" rimFill="#F8FAFC" innerFill="#E2E8F0" shadow="#334155" glow="#FFFFFF" />
        <ellipse cx="740" cy="329" rx="100" ry="50" fill="#86EFAC" opacity=".22" className={u("pulse")} />

        <Orbit cx={740} cy={326} rx={150} ry={58} ions={sulIons} animated={animated} u={u} />

        {sulfateCrystals.map(([x, y, s], i) => <Crystal key={i} x={x} y={y} scale={s} pale index={i} u={u} />)}

        {sulGrains.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth=".7" />
        ))}
        {[[657, 293, 6], [740, 310, 7.5], [828, 297, 6], [710, 285, 5]].map(([x, y, r], i) => (
          <path key={i} d={star(x + 8, y + 2, r)} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth=".4" className={u("twinkle")} style={{ animationDelay: `${i * 0.7}s` }} />
        ))}

        {/* hạt lưu huỳnh S */}
        {[[704, 271, 12, 11, 0], [756, 267, 10, 10, 0.6], [789, 283, 8.5, 9, 1.1]].map(([x, y, r, fs, dl], i) => (
          <g key={i} className={u("ionFloat")} style={{ animationDelay: `${dl}s` }}>
            <circle cx={x} cy={y} r={r + 5} fill="#FBBF24" opacity=".35" />
            <circle cx={x} cy={y} r={r} fill={url("gold")} stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx={x} cy={y} r={r} fill={url("gloss")} />
            <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="900" fill="#78350F">S</text>
          </g>
        ))}

        <rect x="540" y="205" width="28" height="218" fill={url("sheen")} opacity=".75" className={u("shine")} />
      </g>
      <text x="549" y="408" fontSize="13" fontWeight="700" fill="#475569">TINH THỂ TRẮNG</text>
      <text x="933" y="408" textAnchor="end" fontSize="13" fontWeight="700" fill="#64748B" opacity=".85">MẪU MINH HỌA</text>

      <Bar x={535} pct={50} label="≈ 50%" colorId={u("green")} ringColor="#22C55E" textColor="#15803D" u={u} />
      <text x="535" y="508" fontSize="13.5" fontWeight="600" fill="#64748B">Cung cấp thêm lưu huỳnh cho cây trồng.</text>
      <line x1="535" y1="518" x2="945" y2="518" stroke="#E2E8F0" strokeWidth="1.2" />

      <rect x="535" y="527" width="26" height="26" rx="8" fill="#DCFCE7" />
      <path d="M542 546V533M542 537C537 536 537 532 539 531C542 531 542 534 542 537ZM542 541C547 540 548 537 546 535C543 535 542 538 542 541Z" fill="none" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="572" y="537" fontSize="14" fontWeight="900" fill="#166534">Phù hợp</text>
      <text x="572" y="553" fontSize="13.5" fontWeight="600" fill="#475569">Cây nhạy clo hoặc khi cần bổ sung lưu huỳnh</text>
      <text x="535" y="577" fontSize="13" fill="#64748B">Thường có giá cao hơn và hàm lượng K₂O</text>
      <text x="535" y="593" fontSize="13" fill="#64748B">thấp hơn KCl theo khối lượng phân bón.</text>
      <rect x="535" y="598" width="214" height="24" rx="12" fill="#F0FDF4" stroke="#BBF7D0" />
      <circle cx="550" cy="610" r="4" fill="#22C55E" />
      <text x="561" y="614.5" fontSize="12.5" fontWeight="800" fill="#166534">BỔ SUNG THÊM LƯU HUỲNH</text>

      {/* huy hiệu VS */}
      <g transform="translate(500 380)">
        <circle cy="4" r="22" fill="#0F172A" opacity=".16" />
        <circle r="21" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.4" />
        <circle r="21" fill={url("gloss")} />
        <circle r="21" fill="none" stroke={url("orange")} strokeWidth="2.2" strokeDasharray="30 102" strokeLinecap="round" className={u("spin")} />
        <text y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155" letterSpacing=".5">VS</text>
      </g>

      {/* ============ CHÂN TRANG ============ */}
      <rect x="30" y="651" width="940" height="84" rx="19" fill={url("footer")} stroke="#E2E8F0" strokeWidth="1.3" filter={url("card")} />
      <rect x="31" y="652" width="938" height="82" rx="18" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity=".9" />

      <circle cx="69" cy="693" r="30" fill="#34D399" opacity=".18" />
      <circle cx="69" cy="693" r="23" fill="#FFFFFF" stroke="#E2E8F0" />
      <g transform="translate(54 678)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 8H11L15 3L20 8H29" stroke="#64748B" />
        <path d="M3 8V25H26V8" stroke="#64748B" />
        <path d="M8 19L12 14L16 17L22 11" stroke="#16A34A" />
      </g>

      <text x="108" y="680" fontSize="13.5" fontWeight="900" fill="#1E293B">CHỌN PHÂN THEO NHU CẦU</text>
      <text x="108" y="699" fontSize="13.5" fontWeight="600" fill="#64748B">Không có loại phân kali tốt nhất cho mọi cây trồng.</text>
      <text x="108" y="716" fontSize="12.5" fill="#64748B">* Hàm lượng điển hình; kiểm tra nhãn sản phẩm thực tế.</text>

      <line x1="490" y1="666" x2="490" y2="720" stroke="#E2E8F0" strokeWidth="1.3" />

      {chips.map((c, i) => (
        <g key={i} transform={`translate(${c.x} 670)`}>
          <rect y="3" width="146" height="46" rx="12" fill="#0F172A" opacity=".07" />
          <rect width="146" height="46" rx="12" fill="#FFFFFF" stroke={c.st} />
          <rect x="1" y="1" width="144" height="44" rx="11" fill={c.bg} opacity=".35" />
          <circle cx="19" cy="23" r="10" fill={c.bg} stroke={c.st} />
          <text x="19" y="27.5" textAnchor="middle" fontSize="13" fontWeight="900" fill={c.tc}>{c.n}</text>
          <text x="36" y="19" fontSize="13" fontWeight="900" fill={c.hc}>{c.t}</text>
          <text x="36" y="35" fontSize="12.5" fontWeight="600" fill="#64748B">{c.s}</text>
        </g>
      ))}
    </svg>
  );
}