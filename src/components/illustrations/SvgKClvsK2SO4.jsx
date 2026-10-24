import React from "react";

/* Hai loại phân kali: KCl (hồng, có Cl⁻) và K₂SO₄ (trắng, có S).
   Bản nâng cấp: nền aurora, thẻ kính có viền sáng, tinh thể phát sáng + lấp lánh,
   ion K⁺/Cl⁻/SO₄²⁻ bay quanh mẫu, mạng tinh thể thu nhỏ, thanh K₂O đúng tỉ lệ. */

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

/* Thang đo K₂O: 0–70 % trải trên 410 px */
const BAR_W = 410;
const barPx = (pct) => (BAR_W * pct) / 70;

/* ngôi sao 4 cánh lấp lánh */
const star = (x, y, r) =>
  `M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28}L${x + r} ${y}L${x + r * 0.28} ${y + r * 0.28}L${x} ${y + r}L${x - r * 0.28} ${y + r * 0.28}L${x - r} ${y}L${x - r * 0.28} ${y - r * 0.28}Z`;

export default function SvgKClvsK2SO4() {
  const id = `potash-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const uid = (name) => `${id}-${name}`;
  const url = (name) => `url(#${uid(name)})`;

  const Crystal = ({ x, y, scale = 1, pale = false, index = 0 }) => (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      className={uid("crystal")}
      style={{ animationDelay: `${(index % 6) * 0.23}s` }}
    >
      {/* quầng sáng phía sau */}
      <path
        d="M0 13L5 1L18 0L29 10L26 26L12 32L1 24Z"
        fill={pale ? "#FFFFFF" : "#FB7185"}
        opacity={pale ? ".9" : ".55"}
        filter={url("blurSm")}
      />
      <g filter={url("crystalShadow")}>
        <path
          d="M0 13L5 1L18 0L29 10L26 26L12 32L1 24Z"
          fill={pale ? url("whiteCrystal") : url("pinkCrystal")}
          stroke={pale ? "#FFFFFF" : "#FDA4AF"}
          strokeWidth="1.1"
        />
        <path d="M5 1L13 11L0 13Z" fill="#FFFFFF" opacity={pale ? ".95" : ".7"} />
        <path d="M13 11L18 0L29 10Z" fill={pale ? "#FFFFFF" : "#FDA4AF"} opacity=".9" />
        <path d="M13 11L26 26L12 32L1 24Z" fill={pale ? "#CBD5E1" : "#9F1239"} opacity={pale ? ".3" : ".38"} />
        <path d="M13 11L13 29" stroke={pale ? "#FFFFFF" : "#FFE4E6"} strokeWidth="1" opacity=".85" />
        <path d="M13 11L1 24" stroke={pale ? "#94A3B8" : "#881337"} strokeWidth=".8" opacity=".5" />
        <path d="M5 5L9 2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity=".95" />
      </g>
    </g>
  );

  /* Mạng tinh thể thu nhỏ */
  const Lattice = ({ x, y, type }) => {
    const isK = type === "kcl";
    const nodes = [];
    const lines = [];
    if (isK) {
      for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
        const px = 12 + c * 19, py = 17 + r * 17;
        nodes.push({ px, py, k: (r + c) % 2 === 0 });
        if (c < 2) lines.push([px, py, px + 19, py]);
        if (r < 1) lines.push([px, py, px, py + 17]);
      }
    }
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect width="62" height="48" rx="10" fill="#FFFFFF" opacity=".78" stroke={isK ? "#FDA4AF" : "#BBF7D0"} />
        {isK ? (
          <>
            {lines.map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} stroke="#CBD5E1" strokeWidth="1.2" />)}
            {nodes.map((n, i) => (
              <circle key={i} cx={n.px} cy={n.py} r={n.k ? 4.3 : 5.6} fill={n.k ? "#F97316" : "#E11D48"} stroke="#fff" strokeWidth="1">
                <animate attributeName="opacity" values="1;.55;1" dur={`${2.2 + (i % 3) * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </>
        ) : (
          <>
            {[[12, 14], [50, 14], [12, 31], [50, 31]].map(([a, b], i) => (
              <g key={i}>
                <line x1={a} y1={b} x2="31" y2="22.5" stroke="#CBD5E1" strokeWidth="1.2" />
                <circle cx={a} cy={b} r="4" fill="#F97316" stroke="#fff" strokeWidth="1" />
              </g>
            ))}
            <circle cx="31" cy="22.5" r="8.5" fill={url("gold")} stroke="#fff" strokeWidth="1.2" />
            {[[0, -4], [4, 2.5], [-4, 2.5], [0, 0.2]].map(([a, b], i) => (
              <circle key={i} cx={31 + a} cy={22.5 + b} r="1.5" fill="#B45309" />
            ))}
          </>
        )}
        <text x="31" y="44" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#64748B" letterSpacing=".4">
          MẠNG ION
        </text>
      </g>
    );
  };

  /* Ion bay quanh mẫu theo quỹ đạo elip */
  const Orbit = ({ cx, cy, rx, ry, ions }) => {
    const d = `M${cx - rx} ${cy} a${rx} ${ry} 0 1 1 ${2 * rx} 0 a${rx} ${ry} 0 1 1 ${-2 * rx} 0`;
    return (
      <g>
        <path d={d} fill="none" stroke="#94A3B8" strokeWidth=".7" strokeDasharray="2 6" opacity=".5" />
        {ions.map((ion, i) => (
          <g key={i}>
            <animateMotion dur="18s" begin={`${-i * (18 / ions.length)}s`} repeatCount="indefinite" path={d} />
            <circle r={ion.r + 5} fill={ion.c} opacity=".28" filter={url("blurSm")} />
            <circle r={ion.r} fill={ion.c} stroke="#FFFFFF" strokeWidth="1.2" />
            <circle r={ion.r} fill={url("gloss")} />
            <text y="2.4" textAnchor="middle" fontSize={ion.fs} fontWeight="900" fill={ion.t || "#fff"}>{ion.l}</text>
          </g>
        ))}
      </g>
    );
  };

  const kclIons = [
    { l: "K⁺", c: "#F97316", r: 8, fs: 7 }, { l: "Cl⁻", c: "#E11D48", r: 9, fs: 6.5 },
    { l: "K⁺", c: "#F97316", r: 8, fs: 7 }, { l: "Cl⁻", c: "#E11D48", r: 9, fs: 6.5 },
    { l: "K⁺", c: "#F97316", r: 8, fs: 7 }, { l: "Cl⁻", c: "#E11D48", r: 9, fs: 6.5 },
  ];
  const sulIons = [
    { l: "K⁺", c: "#F97316", r: 8, fs: 7 }, { l: "SO₄", c: "#F59E0B", r: 10, fs: 6.2, t: "#78350F" },
    { l: "K⁺", c: "#F97316", r: 8, fs: 7 }, { l: "K⁺", c: "#F97316", r: 8, fs: 7 },
    { l: "SO₄", c: "#F59E0B", r: 10, fs: 6.2, t: "#78350F" }, { l: "K⁺", c: "#F97316", r: 8, fs: 7 },
  ];

  /* Phần thanh K₂O dùng chung */
  const Bar = ({ x, pct, label, colorId, ringColor, textColor }) => (
    <g>
      <text x={x} y="448" fontSize="10.5" fontWeight="800" fill="#475569">HÀM LƯỢNG K₂O</text>
      <text x={x + BAR_W} y="448" textAnchor="end" fontSize="13" fontWeight="900" fill={textColor}>{label}</text>
      <rect x={x} y="458" width={BAR_W} height="11" rx="5.5" fill="#EEF2F7" stroke="#E2E8F0" strokeWidth=".6" />
      <g className={uid("grow")}>
        <rect x={x} y="458" width={barPx(pct)} height="11" rx="5.5" fill={url(colorId)} opacity=".5" filter={url("blurSm")} />
        <rect x={x} y="458" width={barPx(pct)} height="11" rx="5.5" fill={url(colorId)} />
        <rect x={x + 4} y="460" width={Math.max(0, barPx(pct) - 8)} height="3.2" rx="1.6" fill="#FFFFFF" opacity=".42" />
        <circle cx={x + barPx(pct)} cy="463.5" r="9" fill={ringColor} opacity=".25" filter={url("blurSm")} />
        <circle cx={x + barPx(pct)} cy="463.5" r="7" fill="#FFFFFF" stroke={ringColor} strokeWidth="2" />
      </g>
      {[0, 20, 40, 60].map((v) => (
        <g key={v}>
          <line x1={x + barPx(v)} x2={x + barPx(v)} y1="469" y2="473" stroke="#94A3B8" strokeWidth=".9" />
          <text x={x + barPx(v)} y="481" textAnchor={v === 0 ? "start" : "middle"} fontSize="7.5" fontWeight="600" fill="#94A3B8">{v}%</text>
        </g>
      ))}
    </g>
  );

  return (
    <svg
      viewBox="0 0 1000 760"
      width="100%"
      height="auto"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        borderRadius: 22,
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
        fontFamily: "'Be Vietnam Pro', Inter, ui-sans-serif, system-ui, -apple-system, sans-serif"
      }}
    >
      <title id={`${id}-title`}>So sánh phân kali clorua KCl và kali sunfat K2SO4</title>
      <desc id={`${id}-desc`}>
        So sánh tinh thể, hàm lượng K2O, lưu huỳnh, ion đi kèm, đặc điểm và tình huống sử dụng của hai loại phân kali.
      </desc>

      <defs>
        <linearGradient id={uid("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" /><stop offset="50%" stopColor="#FFF7ED" /><stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <radialGradient id={uid("auroraO")}><stop offset="0" stopColor="#FB923C" stopOpacity=".26" /><stop offset="1" stopColor="#FB923C" stopOpacity="0" /></radialGradient>
        <radialGradient id={uid("auroraG")}><stop offset="0" stopColor="#34D399" stopOpacity=".28" /><stop offset="1" stopColor="#34D399" stopOpacity="0" /></radialGradient>
        <radialGradient id={uid("auroraR")}><stop offset="0" stopColor="#FB7185" stopOpacity=".18" /><stop offset="1" stopColor="#FB7185" stopOpacity="0" /></radialGradient>
        <pattern id={uid("dots")} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r=".9" fill="#94A3B8" opacity=".22" />
        </pattern>
        <linearGradient id={uid("title")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#172033" /><stop offset=".55" stopColor="#334155" /><stop offset="1" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id={uid("pinkCrystal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDA4AF" /><stop offset="35%" stopColor="#FB7185" /><stop offset="70%" stopColor="#E11D48" /><stop offset="100%" stopColor="#9F1239" />
        </linearGradient>
        <linearGradient id={uid("whiteCrystal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="45%" stopColor="#F8FAFC" /><stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={uid("pinkDish")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE4E6" /><stop offset="100%" stopColor="#FB7185" />
        </linearGradient>
        <linearGradient id={uid("whiteDish")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={uid("gold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" /><stop offset="55%" stopColor="#FBBF24" /><stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={uid("green")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#86EFAC" /><stop offset="100%" stopColor="#16A34A" />
        </linearGradient>
        <linearGradient id={uid("orange")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FDBA74" /><stop offset="55%" stopColor="#FB7185" /><stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id={uid("footer")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF7ED" /><stop offset="52%" stopColor="#F8FAFC" /><stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>
        <radialGradient id={uid("gloss")} cx=".3" cy=".25" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".6" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={uid("stageL")} cx=".5" cy=".62" r=".6">
          <stop offset="0" stopColor="#FFE4E6" /><stop offset="1" stopColor="#FFF7F7" />
        </radialGradient>
        <radialGradient id={uid("stageR")} cx=".5" cy=".62" r=".6">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset="1" stopColor="#F1F5F9" />
        </radialGradient>
        <linearGradient id={uid("edgeL")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FB923C" stopOpacity="0" /><stop offset=".5" stopColor="#FB923C" /><stop offset="1" stopColor="#FB923C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={uid("edgeR")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22C55E" stopOpacity="0" /><stop offset=".5" stopColor="#22C55E" /><stop offset="1" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={uid("sheen")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".9" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <filter id={uid("panelShadow")} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="11" floodColor="#0F172A" floodOpacity=".09" />
        </filter>
        <filter id={uid("crystalShadow")} x="-25%" y="-25%" width="160%" height="170%">
          <feDropShadow dx="1" dy="3" stdDeviation="2.3" floodColor="#334155" floodOpacity=".26" />
        </filter>
        <filter id={uid("glow")} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="9" /></filter>
        <filter id={uid("blurSm")} x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="2.4" /></filter>
        <filter id={uid("glowF")} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        <clipPath id={uid("leftStage")}><rect x="51" y="205" width="416" height="218" rx="16" /></clipPath>
        <clipPath id={uid("rightStage")}><rect x="533" y="205" width="416" height="218" rx="16" /></clipPath>

        <style>{`
          @keyframes ${uid("float")} { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes ${uid("shine")} { 0% { transform: translateX(-90px); opacity: 0; } 20% { opacity: .35; } 80% { opacity: .35; } 100% { transform: translateX(435px); opacity: 0; } }
          @keyframes ${uid("pulse")} { 0%,100% { opacity: .35; } 50% { opacity: .85; } }
          @keyframes ${uid("sparkle")} { 0%,100% { opacity: .2; transform: scale(.6); } 50% { opacity: 1; transform: scale(1); } }
          @keyframes ${uid("ion")} { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
          @keyframes ${uid("grow")} { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          .${uid("crystal")} { transform-box: fill-box; transform-origin: center; animation: ${uid("float")} 4.2s ease-in-out infinite; }
          .${uid("shine")} { animation: ${uid("shine")} 8s ease-in-out infinite; }
          .${uid("pulse")} { animation: ${uid("pulse")} 3.4s ease-in-out infinite; }
          .${uid("twinkle")} { transform-box: fill-box; transform-origin: center; animation: ${uid("sparkle")} 2.8s ease-in-out infinite; }
          .${uid("ionFloat")} { animation: ${uid("ion")} 3s ease-in-out infinite; }
          .${uid("grow")} { transform-box: fill-box; transform-origin: left center; animation: ${uid("grow")} 1.6s cubic-bezier(.2,.8,.2,1) both; }
          @media (prefers-reduced-motion: reduce) {
            .${uid("crystal")}, .${uid("shine")}, .${uid("pulse")}, .${uid("twinkle")}, .${uid("ionFloat")}, .${uid("grow")} { animation: none !important; }
          }
        `}</style>
      </defs>

      {/* ============ 01 · NỀN & TIÊU ĐỀ ============ */}
      <rect width="1000" height="760" rx="28" fill={url("bg")} stroke="#FDE68A" strokeWidth="1.5" />
      <ellipse cx="90" cy="130" rx="300" ry="200" fill={url("auroraO")} />
      <ellipse cx="900" cy="110" rx="300" ry="190" fill={url("auroraG")} />
      <ellipse cx="500" cy="720" rx="460" ry="150" fill={url("auroraR")} />
      <rect width="1000" height="760" rx="28" fill={url("dots")} />
      <rect x="1" y="1" width="998" height="758" rx="27" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity=".9" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 8 }, (_, i) => <line key={`gx${i}`} x1={785 + i * 19} y1="18" x2={785 + i * 19} y2="108" />)}
        {Array.from({ length: 4 }, (_, i) => <line key={`gy${i}`} x1="785" y1={20 + i * 25} x2="923" y2={20 + i * 25} />)}
      </g>

      <rect x="34" y="27" width="7" height="24" rx="3.5" fill="#F97316" filter={url("glowF")} />
      <text x="54" y="43" fontSize="11" fontWeight="900" letterSpacing="2" fill="#C2410C">DINH DƯỠNG KHOÁNG · PHÂN BÓN KALI</text>
      <text x="34" y="81" fontSize="29" fontWeight="900" letterSpacing="-.8" fill={url("title")}>
        KCl<tspan fill="#94A3B8"> vs </tspan><tspan fill="#15803D">K₂SO₄</tspan><tspan fill="#334155"> — CHỌN LOẠI NÀO?</tspan>
      </text>
      <text x="35" y="107" fontSize="12.5" fontWeight="500" fill="#64748B">
        Hai nguồn kali · Hai thành phần đi kèm · Một quyết định theo nhu cầu cây trồng
      </text>

      <g transform="translate(764 91)">
        <circle cx="0" cy="0" r="4" fill="#FB7185" filter={url("glowF")} />
        <text x="10" y="4" fontSize="9.5" fontWeight="800" fill="#64748B">KCl</text>
        <circle cx="57" cy="0" r="4" fill="#94A3B8" filter={url("glowF")} />
        <text x="67" y="4" fontSize="9.5" fontWeight="800" fill="#64748B">K₂SO₄</text>
      </g>

      {/* ============ 02 · THẺ TRÁI: KCl ============ */}
      <g filter={url("panelShadow")}>
        <rect x="30" y="135" width="455" height="493" rx="22" fill="#FFFFFF" stroke="#FED7AA" strokeWidth="1.4" />
      </g>
      <rect x="30" y="135" width="455" height="493" rx="22" fill={url("auroraO")} opacity=".5" />
      <rect x="70" y="134" width="375" height="3" rx="1.5" fill={url("edgeL")} />
      <rect x="90" y="132" width="335" height="7" rx="3.5" fill={url("edgeL")} opacity=".6" filter={url("blurSm")} />

      <rect x="50" y="153" width="37" height="37" rx="11" fill="#FFF7ED" stroke="#FED7AA" />
      <circle cx="68.5" cy="171.5" r="22" fill="#FB923C" opacity=".22" filter={url("blurSm")} />
      <g transform="translate(57 160)" fill="none" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10L12 3L22 10V25H2Z" /><path d="M7 25V15H17V25" /><path d="M0 28H24" />
      </g>
      <text x="99" y="169" fontSize="14" fontWeight="900" fill="#9A3412">KALI CLORUA</text>
      <text x="99" y="186" fontSize="11" fontWeight="700" fill="#EA580C">KCl · MOP / MURIATE OF POTASH</text>
      <rect x="362" y="158" width="104" height="27" rx="13.5" fill="#FFF7ED" stroke="#FDBA74" />
      <text x="414" y="175.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#C2410C">0–0–60*</text>

      {/* sân khấu mẫu trái */}
      <rect x="51" y="205" width="416" height="218" rx="16" fill={url("stageL")} stroke="#FFE4E6" />
      <g clipPath={url("leftStage")}>
        <circle cx="121" cy="254" r="46" fill="#FDA4AF" opacity=".2" filter={url("blurSm")} />
        <circle cx="402" cy="375" r="54" fill="#FB7185" opacity=".12" filter={url("blurSm")} />

        <rect x="67" y="217" width="45" height="23" rx="11.5" fill="#FFEDD5" stroke="#FDBA74" />
        <text x="89.5" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#9A3412">K⁺</text>
        <text x="121" y="232" fontSize="11" fontWeight="800" fill="#9A3412">+</text>
        <rect x="137" y="217" width="48" height="23" rx="11.5" fill="#FFE4E6" stroke="#FDA4AF" />
        <text x="161" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#9F1239">Cl⁻</text>

        <rect x="395" y="216" width="62" height="22" rx="11" fill="#FFE4E6" stroke="#FDA4AF" />
        <circle cx="406" cy="227" r="3" fill="#E11D48"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite" /></circle>
        <text x="413" y="230.2" fontSize="8.5" fontWeight="900" fill="#9F1239">CÓ CLO</text>
        <Lattice x={396} y={246} type="kcl" />

        {/* bóng + đĩa */}
        <ellipse cx="258" cy="388" rx="145" ry="25" fill="#881337" opacity=".16" filter={url("blurSm")} />
        <path d="M117 349C123 383 167 407 258 409C348 407 392 383 399 349L388 378C363 400 320 411 258 412C194 411 151 400 128 378Z" fill={url("pinkDish")} stroke="#FB7185" strokeWidth="1.3" />
        <ellipse cx="258" cy="350" rx="141" ry="43" fill="#FFE4E6" stroke="#FB7185" strokeWidth="2" />
        <ellipse cx="258" cy="350" rx="128" ry="33" fill="#FDA4AF" opacity=".22" />
        <ellipse cx="258" cy="344" rx="112" ry="22" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity=".5" />

        <ellipse cx="257" cy="329" rx="110" ry="56" fill="#FB7185" opacity=".3" filter={url("glow")} className={uid("pulse")} />

        {/* ion bay quanh mẫu */}
        <Orbit cx={258} cy={326} rx={150} ry={58} ions={kclIons} />

        {kclCrystals.map(([x, y, s], i) => <Crystal key={i} x={x} y={y} scale={s} index={i} />)}

        {kclGrains.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i % 2 === 0 ? "#FFFFFF" : "#FB7185"} stroke="#FDA4AF" strokeWidth=".65" className={uid("twinkle")} style={{ animationDelay: `${i * 0.19}s` }} />
        ))}
        {[[171, 291, 6], [251, 292, 7.5], [340, 298, 6], [222, 286, 5]].map(([x, y, r], i) => (
          <path key={i} d={star(x + 8, y + 2, r)} fill="#FFFFFF" filter={url("glowF")} className={uid("twinkle")} style={{ animationDelay: `${i * 0.7}s` }} />
        ))}

        <rect x="58" y="205" width="28" height="218" fill={url("sheen")} opacity=".45" className={uid("shine")} />
        <path d="M136 357C167 388 342 388 379 357" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity=".85" />
      </g>
      <text x="67" y="402" fontSize="9.5" fontWeight="700" fill="#9F1239">TINH THỂ HỒNG / TRẮNG</text>
      <text x="451" y="402" textAnchor="end" fontSize="9.5" fontWeight="700" fill="#9F1239">MẪU MINH HỌA</text>

      <Bar x={53} pct={60} label="60–62%" colorId="orange" ringColor="#FB7185" textColor="#C2410C" />
      <text x="53" y="494" fontSize="10" fontWeight="600" fill="#64748B">Hàm lượng K₂O quy đổi thường cao hơn.</text>
      <line x1="53" y1="504" x2="463" y2="504" stroke="#F1F5F9" strokeWidth="1.2" />

      <rect x="53" y="512" width="25" height="25" rx="8" fill="#FFEDD5" />
      <path d="M60 530V518M60 522C55 521 55 517 57 516C60 516 60 519 60 522ZM60 526C65 525 66 522 64 520C61 520 60 523 60 526Z" fill="none" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="88" y="521" fontSize="11" fontWeight="900" fill="#9A3412">Phù hợp</text>
      <text x="88" y="536" fontSize="10.5" fontWeight="600" fill="#475569">Nhiều cây trồng khi cần nguồn kali kinh tế</text>
      <text x="53" y="557" fontSize="10" fill="#64748B">Lưu ý: KCl bổ sung ion Cl⁻, cần cân nhắc với cây</text>
      <text x="53" y="571" fontSize="10" fill="#64748B">nhạy clo và đất có nguy cơ tích lũy muối.</text>
      <rect x="53" y="586" width="190" height="25" rx="12.5" fill="#FFF7ED" stroke="#FED7AA" />
      <circle cx="67" cy="598.5" r="4" fill="#F97316" filter={url("glowF")} />
      <text x="78" y="602" fontSize="9.5" fontWeight="800" fill="#9A3412">THƯỜNG CÓ GIÁ KINH TẾ</text>

      {/* ============ 03 · THẺ PHẢI: K₂SO₄ ============ */}
      <g filter={url("panelShadow")}>
        <rect x="515" y="135" width="455" height="493" rx="22" fill="#FFFFFF" stroke="#BBF7D0" strokeWidth="1.4" />
      </g>
      <rect x="515" y="135" width="455" height="493" rx="22" fill={url("auroraG")} opacity=".5" />
      <rect x="555" y="134" width="375" height="3" rx="1.5" fill={url("edgeR")} />
      <rect x="575" y="132" width="335" height="7" rx="3.5" fill={url("edgeR")} opacity=".6" filter={url("blurSm")} />

      <rect x="535" y="153" width="37" height="37" rx="11" fill="#DCFCE7" stroke="#BBF7D0" />
      <circle cx="553.5" cy="171.5" r="22" fill="#22C55E" opacity=".22" filter={url("blurSm")} />
      <g transform="translate(542 160)" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12L12 3L22 12V25H2Z" /><path d="M7 25V15H17V25" /><path d="M0 28H24" /><path d="M17 7l5-4" />
      </g>
      <text x="584" y="169" fontSize="14" fontWeight="900" fill="#166534">KALI SUNFAT</text>
      <text x="584" y="186" fontSize="11" fontWeight="700" fill="#16A34A">K₂SO₄ · SULFATE OF POTASH</text>
      <rect x="846" y="158" width="104" height="27" rx="13.5" fill="#F0FDF4" stroke="#86EFAC" />
      <text x="898" y="175.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#15803D">0–0–50*</text>

      <rect x="533" y="205" width="416" height="218" rx="16" fill={url("stageR")} stroke="#E2E8F0" />
      <g clipPath={url("rightStage")}>
        <circle cx="603" cy="254" r="46" fill="#BBF7D0" opacity=".28" filter={url("blurSm")} />
        <circle cx="884" cy="375" r="54" fill="#94A3B8" opacity=".12" filter={url("blurSm")} />

        <rect x="549" y="217" width="45" height="23" rx="11.5" fill="#FFEDD5" stroke="#FDBA74" />
        <text x="571.5" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#9A3412">K⁺</text>
        <text x="603" y="232" fontSize="11" fontWeight="800" fill="#64748B">+</text>
        <rect x="619" y="217" width="81" height="23" rx="11.5" fill="#FEF3C7" stroke="#FDE68A" />
        <text x="659.5" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#92400E">SO₄²⁻</text>

        <rect x="866" y="216" width="80" height="22" rx="11" fill="#DCFCE7" stroke="#86EFAC" />
        <circle cx="877" cy="227" r="3" fill="#16A34A"><animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite" /></circle>
        <text x="884" y="230.2" fontSize="8.2" fontWeight="900" fill="#15803D">CÓ LƯU HUỲNH</text>
        <Lattice x={868} y={246} type="k2so4" />

        <ellipse cx="740" cy="388" rx="145" ry="25" fill="#334155" opacity=".16" filter={url("blurSm")} />
        <path d="M599 349C605 383 649 407 740 409C830 407 874 383 881 349L870 378C845 400 802 411 740 412C676 411 633 400 610 378Z" fill={url("whiteDish")} stroke="#94A3B8" strokeWidth="1.3" />
        <ellipse cx="740" cy="350" rx="141" ry="43" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
        <ellipse cx="740" cy="350" rx="128" ry="33" fill="#E2E8F0" opacity=".55" />
        <ellipse cx="740" cy="344" rx="112" ry="22" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity=".9" />

        <ellipse cx="740" cy="329" rx="110" ry="56" fill="#FFFFFF" opacity=".9" filter={url("glow")} className={uid("pulse")} />
        <ellipse cx="740" cy="329" rx="100" ry="50" fill="#86EFAC" opacity=".18" filter={url("glow")} />

        <Orbit cx={740} cy={326} rx={150} ry={58} ions={sulIons} />

        {sulfateCrystals.map(([x, y, s], i) => <Crystal key={i} x={x} y={y} scale={s} pale index={i} />)}

        {sulGrains.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth=".7" className={uid("twinkle")} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        {[[657, 293, 6], [740, 310, 7.5], [828, 297, 6], [710, 285, 5]].map(([x, y, r], i) => (
          <path key={i} d={star(x + 8, y + 2, r)} fill="#FFFFFF" stroke="#CBD5E1" strokeWidth=".4" filter={url("glowF")} className={uid("twinkle")} style={{ animationDelay: `${i * 0.7}s` }} />
        ))}

        {/* hạt lưu huỳnh S */}
        {[[704, 271, 12, 10, 0], [756, 267, 10, 9, 0.6], [789, 283, 8, 8, 1.1]].map(([x, y, r, fs, dl], i) => (
          <g key={i} className={uid("ionFloat")} style={{ animationDelay: `${dl}s` }}>
            <circle cx={x} cy={y} r={r + 6} fill="#FBBF24" opacity=".4" filter={url("blurSm")} />
            <circle cx={x} cy={y} r={r} fill={url("gold")} stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx={x} cy={y} r={r} fill={url("gloss")} />
            <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="900" fill="#78350F">S</text>
          </g>
        ))}

        <rect x="540" y="205" width="28" height="218" fill={url("sheen")} opacity=".75" className={uid("shine")} />
        <path d="M618 357C649 388 824 388 861 357" fill="none" stroke="#FFFFFF" strokeWidth="2.2" opacity=".95" />
      </g>
      <text x="549" y="402" fontSize="9.5" fontWeight="700" fill="#475569">TINH THỂ TRẮNG</text>
      <text x="933" y="402" textAnchor="end" fontSize="9.5" fontWeight="700" fill="#64748B">MẪU MINH HỌA</text>

      <Bar x={535} pct={50} label="≈ 50%" colorId="green" ringColor="#22C55E" textColor="#15803D" />
      <text x="535" y="494" fontSize="10" fontWeight="600" fill="#64748B">Cung cấp thêm lưu huỳnh cho cây trồng.</text>
      <line x1="535" y1="504" x2="945" y2="504" stroke="#F1F5F9" strokeWidth="1.2" />

      <rect x="535" y="512" width="25" height="25" rx="8" fill="#DCFCE7" />
      <path d="M542 530V518M542 522C537 521 537 517 539 516C542 516 542 519 542 522ZM542 526C547 525 548 522 546 520C543 520 542 523 542 526Z" fill="none" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="570" y="521" fontSize="11" fontWeight="900" fill="#166534">Phù hợp</text>
      <text x="570" y="536" fontSize="10.5" fontWeight="600" fill="#475569">Cây nhạy clo hoặc khi cần bổ sung lưu huỳnh</text>
      <text x="535" y="557" fontSize="10" fill="#64748B">Thường có giá cao hơn và hàm lượng K₂O</text>
      <text x="535" y="571" fontSize="10" fill="#64748B">thấp hơn KCl theo khối lượng phân bón.</text>
      <rect x="535" y="586" width="190" height="25" rx="12.5" fill="#F0FDF4" stroke="#BBF7D0" />
      <circle cx="549" cy="598.5" r="4" fill="#22C55E" filter={url("glowF")} />
      <text x="560" y="602" fontSize="9.5" fontWeight="800" fill="#166534">BỔ SUNG THÊM LƯU HUỲNH</text>

      {/* huy hiệu VS giữa hai thẻ */}
      <g transform="translate(500 380)">
        <circle r="26" fill="#0F172A" opacity=".18" filter={url("glow")} />
        <circle r="19" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.4" filter={url("panelShadow")} />
        <circle r="19" fill="none" stroke={url("orange")} strokeWidth="2" strokeDasharray="30 90">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
        </circle>
        <text y="4" textAnchor="middle" fontSize="11" fontWeight="900" fill="#334155" letterSpacing=".5">VS</text>
      </g>

      {/* ============ 04 · CHÂN TRANG ============ */}
      <g filter={url("panelShadow")}>
        <rect x="30" y="651" width="940" height="84" rx="19" fill={url("footer")} stroke="#E2E8F0" strokeWidth="1.3" />
      </g>
      <rect x="31" y="652" width="938" height="82" rx="18" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity=".9" />

      <circle cx="69" cy="693" r="30" fill="#34D399" opacity=".18" filter={url("blurSm")} />
      <circle cx="69" cy="693" r="23" fill="#FFFFFF" stroke="#E2E8F0" />
      <g transform="translate(54 678)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
        <path d="M0 8H11L15 3L20 8H29" stroke="#64748B" />
        <path d="M3 8V25H26V8" stroke="#64748B" />
        <path d="M8 19L12 14L16 17L22 11" stroke="#16A34A" />
      </g>

      <text x="108" y="680" fontSize="12.5" fontWeight="900" fill="#1E293B">CHỌN PHÂN THEO NHU CẦU</text>
      <text x="108" y="699" fontSize="10.5" fontWeight="600" fill="#64748B">Không có một loại phân kali tốt nhất cho mọi cây trồng.</text>
      <text x="108" y="715" fontSize="9.5" fill="#64748B">* Hàm lượng điển hình; kiểm tra nhãn sản phẩm thực tế.</text>

      <line x1="498" y1="666" x2="498" y2="720" stroke="#E2E8F0" strokeWidth="1.3" />

      {[
        { x: 519, w: 133, t: "KCl", s: "Cần K, hạn chế chi phí", n: "1", st: "#FED7AA", bg: "#FFEDD5", tc: "#C2410C", hc: "#9A3412" },
        { x: 660, w: 143, t: "K₂SO₄", s: "Cần K, tránh Cl⁻", n: "2", st: "#BBF7D0", bg: "#DCFCE7", tc: "#15803D", hc: "#166534" },
        { x: 811, w: 142, t: "KIỂM TRA ĐẤT", s: "Nhu cầu K và S", n: "3", st: "#DDD6FE", bg: "#EDE9FE", tc: "#6D28D9", hc: "#5B21B6" },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x} 670)`}>
          <rect y="3" width={c.w} height="46" rx="11" fill="#0F172A" opacity=".05" />
          <rect width={c.w} height="46" rx="11" fill="#FFFFFF" stroke={c.st} />
          <rect x="1" y="1" width={c.w - 2} height="44" rx="10" fill={c.bg} opacity=".35" />
          <circle cx="17" cy="17" r="11" fill={c.bg} opacity=".9" filter={url("blurSm")} />
          <circle cx="17" cy="17" r="8" fill={c.bg} stroke={c.st} />
          <text x="17" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill={c.tc}>{c.n}</text>
          <text x="31" y="16" fontSize="9.5" fontWeight="900" fill={c.hc}>{c.t}</text>
          <text x="31" y="30" fontSize="8.5" fontWeight="600" fill="#64748B">{c.s}</text>
        </g>
      ))}
    </svg>
  );
}