
import React from "react";

export default function SvgKClvsK2SO4() {
  const id = `potash-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const uid = (name) => `${id}-${name}`;

  const kclCrystals = [
    [146, 318, 0.8],
    [171, 291, 0.92],
    [198, 321, 0.85],
    [222, 286, 0.92],
    [251, 314, 1],
    [284, 292, 0.83],
    [311, 321, 0.9],
    [340, 298, 0.95],
    [363, 327, 0.78],
    [190, 347, 0.8],
    [248, 345, 0.9],
    [305, 350, 0.8],
  ];

  const sulfateCrystals = [
    [632, 321, 0.82],
    [657, 293, 0.9],
    [684, 321, 0.86],
    [710, 285, 0.9],
    [740, 310, 0.98],
    [771, 291, 0.84],
    [800, 319, 0.9],
    [828, 297, 0.9],
    [851, 323, 0.8],
    [680, 346, 0.82],
    [738, 347, 0.9],
    [794, 347, 0.8],
  ];

  const Crystal = ({ x, y, scale = 1, pale = false, index = 0 }) => (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      filter={`url(#${uid("crystalShadow")})`}
      className={uid("crystal")}
      style={{ animationDelay: `${(index % 6) * 0.23}s` }}
    >
      <path
        d="M0 13L5 1L18 0L29 10L26 26L12 32L1 24Z"
        fill={pale ? `url(#${uid("whiteCrystal")})` : `url(#${uid("pinkCrystal")})`}
        stroke={pale ? "#FFFFFF" : "#FDA4AF"}
        strokeWidth="1.1"
      />
      <path
        d="M5 1L13 11L0 13Z"
        fill="#FFFFFF"
        opacity={pale ? ".95" : ".65"}
      />
      <path
        d="M13 11L18 0L29 10Z"
        fill={pale ? "#FFFFFF" : "#FB7185"}
        opacity=".85"
      />
      <path
        d="M13 11L26 26L12 32L1 24Z"
        fill={pale ? "#CBD5E1" : "#BE123C"}
        opacity={pale ? ".32" : ".35"}
      />
      <path
        d="M13 11L13 29"
        stroke={pale ? "#FFFFFF" : "#FFE4E6"}
        strokeWidth="1"
        opacity=".85"
      />
      <path
        d="M13 11L1 24"
        stroke={pale ? "#94A3B8" : "#881337"}
        strokeWidth=".8"
        opacity=".5"
      />
    </g>
  );

  const SulfateCrystal = ({ x, y, scale = 1, index = 0 }) => (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      filter={`url(#${uid("crystalShadow")})`}
      className={uid("crystal")}
      style={{ animationDelay: `${(index % 6) * 0.25}s` }}
    >
      <path
        d="M0 12L5 1L18 0L29 10L26 26L12 32L1 24Z"
        fill={`url(#${uid("whiteCrystal")})`}
        stroke="#FFFFFF"
        strokeWidth="1.3"
      />
      <path d="M5 1L13 11L0 12Z" fill="#FFFFFF" />
      <path d="M13 11L18 0L29 10Z" fill="#FFFFFF" />
      <path d="M13 11L26 26L12 32L1 24Z" fill="#CBD5E1" opacity=".27" />
      <path d="M13 11L13 29" stroke="#FFFFFF" strokeWidth="1.2" />
      <path d="M1 24L13 11L26 26" fill="none" stroke="#94A3B8" strokeWidth=".8" opacity=".45" />
      <path d="M5 5L8 2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
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
        height: "auto",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <title id={`${id}-title`}>
        So sánh phân kali clorua KCl và kali sunfat K2SO4
      </title>

      <desc id={`${id}-desc`}>
        So sánh tinh thể, hàm lượng K2O, lưu huỳnh, ion đi kèm,
        đặc điểm và tình huống sử dụng của hai loại phân kali.
      </desc>

      <defs>
        {/* ===== BACKGROUND ===== */}

        <linearGradient id={uid("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>

        <linearGradient id={uid("pinkCrystal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="35%" stopColor="#FB7185" />
          <stop offset="70%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>

        <linearGradient id={uid("whiteCrystal")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        <linearGradient id={uid("pinkDish")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE4E6" />
          <stop offset="100%" stopColor="#FDA4AF" />
        </linearGradient>

        <linearGradient id={uid("whiteDish")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#DCE4EE" />
        </linearGradient>

        <linearGradient id={uid("gold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="55%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id={uid("green")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>

        <linearGradient id={uid("footer")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="52%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>

        {/* ===== SHADOWS AND LIGHT ===== */}

        <filter
          id={uid("panelShadow")}
          x="-20%"
          y="-20%"
          width="140%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="10"
            floodColor="#0F172A"
            floodOpacity=".07"
          />
        </filter>

        <filter
          id={uid("crystalShadow")}
          x="-25%"
          y="-25%"
          width="160%"
          height="170%"
        >
          <feDropShadow
            dx="1"
            dy="3"
            stdDeviation="2.3"
            floodColor="#334155"
            floodOpacity=".24"
          />
        </filter>

        <filter
          id={uid("glow")}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>

        <filter
          id={uid("softGlow")}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="2" />
        </filter>

        {/* ===== CLIPPING ===== */}

        <clipPath id={uid("leftStage")}>
          <rect x="51" y="205" width="416" height="218" rx="16" />
        </clipPath>

        <clipPath id={uid("rightStage")}>
          <rect x="533" y="205" width="416" height="218" rx="16" />
        </clipPath>

        {/* ===== ANIMATIONS ===== */}

        <style>{`
          @keyframes ${uid("float")} {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }

          @keyframes ${uid("shine")} {
            0% { transform: translateX(-90px); opacity: 0; }
            20% { opacity: .2; }
            80% { opacity: .2; }
            100% { transform: translateX(435px); opacity: 0; }
          }

          @keyframes ${uid("pulse")} {
            0%, 100% { opacity: .35; }
            50% { opacity: .8; }
          }

          @keyframes ${uid("sparkle")} {
            0%, 100% { opacity: .28; }
            50% { opacity: 1; }
          }

          @keyframes ${uid("flow")} {
            to { stroke-dashoffset: -70; }
          }

          @keyframes ${uid("ion")} {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          .${uid("crystal")} {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${uid("float")} 4.2s ease-in-out infinite;
          }

          .${uid("crystalShine")} {
            animation: ${uid("shine")} 8s ease-in-out infinite;
          }

          .${uid("glowPulse")} {
            animation: ${uid("pulse")} 3.4s ease-in-out infinite;
          }

          .${uid("sparkle")} {
            animation: ${uid("sparkle")} 2.8s ease-in-out infinite;
          }

          .${uid("flowLine")} {
            stroke-dasharray: 4 7;
            animation: ${uid("flow")} 6s linear infinite;
          }

          .${uid("ionFloat")} {
            animation: ${uid("ion")} 3s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .${uid("crystal")},
            .${uid("crystalShine")},
            .${uid("glowPulse")},
            .${uid("sparkle")},
            .${uid("flowLine")},
            .${uid("ionFloat")} {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* =====================================================
          01 · CANVAS & TITLE
      ===================================================== */}

      <rect width="1000" height="760" rx="28" fill={`url(#${uid("bg")})`} />

      <circle cx="947" cy="57" r="94" fill="#BBF7D0" opacity=".17" />
      <circle cx="923" cy="80" r="48" fill="#FED7AA" opacity=".19" />
      <circle cx="25" cy="588" r="67" fill="#FDA4AF" opacity=".09" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`gx${i}`}
            x1={785 + i * 19}
            y1="18"
            x2={785 + i * 19}
            y2="108"
          />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line
            key={`gy${i}`}
            x1="785"
            y1={20 + i * 25}
            x2="923"
            y2={20 + i * 25}
          />
        ))}
      </g>

      <rect x="34" y="27" width="7" height="24" rx="3.5" fill="#F97316" />

      <text
        x="54"
        y="43"
        fontSize="11"
        fontWeight="900"
        letterSpacing="2"
        fill="#C2410C"
      >
        DINH DƯỠNG KHOÁNG · PHÂN BÓN KALI
      </text>

      <text
        x="34"
        y="81"
        fontSize="29"
        fontWeight="900"
        letterSpacing="-.8"
        fill="#172033"
      >
        KCl
        <tspan fill="#94A3B8"> vs </tspan>
        <tspan fill="#15803D">K₂SO₄</tspan>
        <tspan fill="#334155"> — CHỌN LOẠI NÀO?</tspan>
      </text>

      <text x="35" y="107" fontSize="12.5" fontWeight="500" fill="#64748B">
        Hai nguồn kali · Hai thành phần đi kèm · Một quyết định theo nhu cầu cây trồng
      </text>

      <g transform="translate(764 91)">
        <circle cx="0" cy="0" r="4" fill="#FB7185" />
        <text x="10" y="4" fontSize="9.5" fontWeight="800" fill="#64748B">
          KCl
        </text>

        <circle cx="57" cy="0" r="4" fill="#94A3B8" />
        <text x="67" y="4" fontSize="9.5" fontWeight="800" fill="#64748B">
          K₂SO₄
        </text>
      </g>

      {/* =====================================================
          02 · LEFT CARD: POTASSIUM CHLORIDE
      ===================================================== */}

      <g filter={`url(#${uid("panelShadow")})`}>
        <rect
          x="30"
          y="135"
          width="455"
          height="493"
          rx="22"
          fill="#FFFFFF"
          stroke="#FED7AA"
          strokeWidth="1.4"
        />
      </g>

      {/* Left header */}
      <rect x="50" y="153" width="37" height="37" rx="11" fill="#FFF7ED" />

      <g
        transform="translate(57 160)"
        fill="none"
        stroke="#C2410C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 10L12 3L22 10V25H2Z" />
        <path d="M7 25V15H17V25" />
        <path d="M0 28H24" />
      </g>

      <text x="99" y="169" fontSize="14" fontWeight="900" fill="#9A3412">
        KALI CLORUA
      </text>

      <text x="99" y="186" fontSize="11" fontWeight="700" fill="#EA580C">
        KCl · MOP / MURIATE OF POTASH
      </text>

      <rect x="362" y="158" width="104" height="27" rx="13.5" fill="#FFF7ED" />
      <text
        x="414"
        y="175.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#C2410C"
      >
        0–0–60*
      </text>

      {/* Left sample stage */}
      <rect
        x="51"
        y="205"
        width="416"
        height="218"
        rx="16"
        fill="#FFF7F7"
        stroke="#FFE4E6"
      />

      <g clipPath={`url(#${uid("leftStage")})`}>
        <circle cx="121" cy="254" r="42" fill="#FDA4AF" opacity=".13" />
        <circle cx="402" cy="375" r="50" fill="#FB7185" opacity=".08" />

        {/* Formula chips */}
        <rect x="67" y="217" width="45" height="23" rx="11.5" fill="#FFEDD5" stroke="#FDBA74" />
        <text x="89.5" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#9A3412">
          K⁺
        </text>

        <text x="121" y="232" fontSize="11" fontWeight="800" fill="#9A3412">
          +
        </text>

        <rect x="137" y="217" width="48" height="23" rx="11.5" fill="#FFE4E6" stroke="#FDA4AF" />
        <text x="161" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#9F1239">
          Cl⁻
        </text>

        <text x="451" y="231" textAnchor="end" fontSize="9" fontWeight="800" fill="#9F1239">
          CÓ CLO
        </text>

        {/* Dish shadow */}
        <ellipse cx="258" cy="385" rx="139" ry="27" fill="#881337" opacity=".1" filter={`url(#${uid("softGlow")})`} />

        {/* Dish body */}
        <path
          d="M117 349
             C123 383 167 407 258 409
             C348 407 392 383 399 349
             L388 378
             C363 400 320 411 258 412
             C194 411 151 400 128 378Z"
          fill={`url(#${uid("pinkDish")})`}
          stroke="#FDA4AF"
          strokeWidth="1.3"
        />

        <ellipse
          cx="258"
          cy="350"
          rx="141"
          ry="43"
          fill="#FFE4E6"
          stroke="#FB7185"
          strokeWidth="2"
        />

        <ellipse
          cx="258"
          cy="350"
          rx="128"
          ry="33"
          fill="#FDA4AF"
          opacity=".15"
        />

        {/* Soft crystal glow */}
        <ellipse
          cx="257"
          cy="329"
          rx="96"
          ry="51"
          fill="#FB7185"
          opacity=".22"
          filter={`url(#${uid("glow")})`}
          className={uid("glowPulse")}
        />

        {/* Pink mineral crystals */}
        {kclCrystals.map(([x, y, scale], i) => (
          <Crystal
            key={`kcl-${i}`}
            x={x}
            y={y}
            scale={scale}
            pale={false}
            index={i}
          />
        ))}

        {/* Crystalline grains */}
        {[
          [137, 354, 3.3],
          [155, 337, 2.1],
          [184, 359, 2.6],
          [208, 337, 2],
          [235, 363, 3],
          [279, 358, 2.3],
          [311, 339, 2.5],
          [336, 359, 2.9],
          [367, 345, 2.1],
          [385, 360, 2.7],
        ].map(([x, y, r], i) => (
          <circle
            key={`kcl-grain-${i}`}
            cx={x}
            cy={y}
            r={r}
            fill={i % 2 === 0 ? "#FFFFFF" : "#FB7185"}
            stroke="#FDA4AF"
            strokeWidth=".65"
            className={uid("sparkle")}
            style={{ animationDelay: `${i * 0.19}s` }}
          />
        ))}

        {/* Animated light sweep */}
        <rect
          x="58"
          y="205"
          width="20"
          height="218"
          fill="#FFFFFF"
          opacity=".2"
          className={uid("crystalShine")}
        />

        {/* Tray highlight */}
        <path
          d="M136 357C167 388 342 388 379 357"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          opacity=".8"
        />
      </g>

      {/* Left stage caption */}
      <text x="67" y="402" fontSize="9.5" fontWeight="700" fill="#9F1239">
        TINH THỂ HỒNG / TRẮNG
      </text>

      <text x="451" y="402" textAnchor="end" fontSize="9.5" fontWeight="700" fill="#9F1239">
        MẪU MINH HỌA
      </text>

      {/* Left K2O comparison */}
      <text x="53" y="448" fontSize="10.5" fontWeight="800" fill="#475569">
        HÀM LƯỢNG K₂O
      </text>

      <text x="463" y="448" textAnchor="end" fontSize="13" fontWeight="900" fill="#C2410C">
        60–62%
      </text>

      <rect x="53" y="458" width="410" height="11" rx="5.5" fill="#F1F5F9" />

      <rect
        x="53"
        y="458"
        width="400"
        height="11"
        rx="5.5"
        fill={`url(#${uid("pinkCrystal")})`}
      />

      <circle cx="453" cy="463.5" r="7" fill="#FFFFFF" stroke="#FB7185" strokeWidth="2" />

      <text x="53" y="487" fontSize="10" fontWeight="600" fill="#64748B">
        Hàm lượng K₂O quy đổi thường cao hơn.
      </text>

      <line x1="53" y1="499" x2="463" y2="499" stroke="#F1F5F9" strokeWidth="1.2" />

      {/* Left use case */}
      <rect x="53" y="512" width="25" height="25" rx="8" fill="#FFEDD5" />

      <path
        d="M60 530V518M60 522C55 521 55 517 57 516C60 516 60 519 60 522ZM60 526C65 525 66 522 64 520C61 520 60 523 60 526Z"
        fill="none"
        stroke="#C2410C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="88" y="521" fontSize="11" fontWeight="900" fill="#9A3412">
        Phù hợp
      </text>

      <text x="88" y="536" fontSize="10.5" fontWeight="600" fill="#475569">
        Nhiều cây trồng khi cần nguồn kali kinh tế
      </text>

      <text x="53" y="557" fontSize="10" fill="#64748B">
        Lưu ý: KCl bổ sung ion Cl⁻, cần cân nhắc với cây
      </text>

      <text x="53" y="571" fontSize="10" fill="#64748B">
        nhạy clo và đất có nguy cơ tích lũy muối.
      </text>

      <rect x="53" y="586" width="190" height="25" rx="12.5" fill="#FFF7ED" stroke="#FED7AA" />
      <circle cx="67" cy="598.5" r="4" fill="#F97316" />

      <text x="78" y="602" fontSize="9.5" fontWeight="800" fill="#9A3412">
        THƯỜNG CÓ GIÁ KINH TẾ
      </text>

      {/* =====================================================
          03 · RIGHT CARD: POTASSIUM SULFATE
      ===================================================== */}

      <g filter={`url(#${uid("panelShadow")})`}>
        <rect
          x="515"
          y="135"
          width="455"
          height="493"
          rx="22"
          fill="#FFFFFF"
          stroke="#BBF7D0"
          strokeWidth="1.4"
        />
      </g>

      {/* Right header */}
      <rect x="535" y="153" width="37" height="37" rx="11" fill="#DCFCE7" />

      <g
        transform="translate(542 160)"
        fill="none"
        stroke="#15803D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12L12 3L22 12V25H2Z" />
        <path d="M7 25V15H17V25" />
        <path d="M0 28H24" />
        <path d="M17 7l5-4" />
      </g>

      <text x="584" y="169" fontSize="14" fontWeight="900" fill="#166534">
        KALI SUNFAT
      </text>

      <text x="584" y="186" fontSize="11" fontWeight="700" fill="#16A34A">
        K₂SO₄ · SULFATE OF POTASH
      </text>

      <rect x="846" y="158" width="104" height="27" rx="13.5" fill="#F0FDF4" />
      <text
        x="898"
        y="175.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#15803D"
      >
        0–0–50*
      </text>

      {/* Right sample stage */}
      <rect
        x="533"
        y="205"
        width="416"
        height="218"
        rx="16"
        fill="#F8FAFC"
        stroke="#E2E8F0"
      />

      <g clipPath={`url(#${uid("rightStage")})`}>
        <circle cx="603" cy="254" r="42" fill="#BBF7D0" opacity=".16" />
        <circle cx="884" cy="375" r="50" fill="#94A3B8" opacity=".08" />

        {/* Formula chips */}
        <rect x="549" y="217" width="45" height="23" rx="11.5" fill="#FFEDD5" stroke="#FDBA74" />

        <text x="571.5" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#9A3412">
          K⁺
        </text>

        <text x="603" y="232" fontSize="11" fontWeight="800" fill="#64748B">
          +
        </text>

        <rect x="619" y="217" width="81" height="23" rx="11.5" fill="#FEF3C7" stroke="#FDE68A" />

        <text x="659.5" y="232.5" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#92400E">
          SO₄²⁻
        </text>

        <text x="933" y="231" textAnchor="end" fontSize="9" fontWeight="800" fill="#15803D">
          CÓ LƯU HUỲNH
        </text>

        {/* Dish shadow */}
        <ellipse cx="740" cy="385" rx="139" ry="27" fill="#334155" opacity=".1" filter={`url(#${uid("softGlow")})`} />

        {/* Dish body */}
        <path
          d="M599 349
             C605 383 649 407 740 409
             C830 407 874 383 881 349
             L870 378
             C845 400 802 411 740 412
             C676 411 633 400 610 378Z"
          fill={`url(#${uid("whiteDish")})`}
          stroke="#CBD5E1"
          strokeWidth="1.3"
        />

        <ellipse
          cx="740"
          cy="350"
          rx="141"
          ry="43"
          fill="#F8FAFC"
          stroke="#94A3B8"
          strokeWidth="2"
        />

        <ellipse
          cx="740"
          cy="350"
          rx="128"
          ry="33"
          fill="#E2E8F0"
          opacity=".48"
        />

        {/* Sulfate crystal glow */}
        <ellipse
          cx="740"
          cy="329"
          rx="96"
          ry="51"
          fill="#FFFFFF"
          opacity=".75"
          filter={`url(#${uid("glow")})`}
          className={uid("glowPulse")}
        />

        {/* White sulfate crystals */}
        {sulfateCrystals.map(([x, y, scale], i) => (
          <SulfateCrystal
            key={`sulfate-${i}`}
            x={x}
            y={y}
            scale={scale}
            index={i}
          />
        ))}

        {/* Crystalline sparkling facets */}
        {[
          [619, 352, 3.1],
          [638, 337, 2.1],
          [667, 359, 2.4],
          [691, 337, 2],
          [718, 362, 2.8],
          [762, 359, 2.3],
          [792, 337, 2.5],
          [819, 357, 2.8],
          [847, 345, 2.1],
          [866, 358, 2.7],
        ].map(([x, y, r], i) => (
          <circle
            key={`sulfate-grain-${i}`}
            cx={x}
            cy={y}
            r={r}
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth=".7"
            className={uid("sparkle")}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}

        {/* Sulfur marker crystals */}
        <g className={uid("ionFloat")}>
          <circle cx="704" cy="271" r="12" fill={`url(#${uid("gold")})`} stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="704" y="275" textAnchor="middle" fontSize="10" fontWeight="900" fill="#78350F">
            S
          </text>
        </g>

        <g className={uid("ionFloat")} style={{ animationDelay: ".6s" }}>
          <circle cx="756" cy="267" r="10" fill={`url(#${uid("gold")})`} stroke="#FFFFFF" strokeWidth="1.5" />
          <text x="756" y="270.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#78350F">
            S
          </text>
        </g>

        <g className={uid("ionFloat")} style={{ animationDelay: "1.1s" }}>
          <circle cx="789" cy="283" r="8" fill={`url(#${uid("gold")})`} stroke="#FFFFFF" strokeWidth="1.2" />
          <text x="789" y="286.5" textAnchor="middle" fontSize="8" fontWeight="900" fill="#78350F">
            S
          </text>
        </g>

        {/* Animated light sweep */}
        <rect
          x="540"
          y="205"
          width="20"
          height="218"
          fill="#FFFFFF"
          opacity=".4"
          className={uid("crystalShine")}
        />

        {/* Tray highlight */}
        <path
          d="M618 357C649 388 824 388 861 357"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          opacity=".95"
        />
      </g>

      {/* Right stage caption */}
      <text x="549" y="402" fontSize="9.5" fontWeight="700" fill="#475569">
        TINH THỂ TRẮNG
      </text>

      <text x="933" y="402" textAnchor="end" fontSize="9.5" fontWeight="700" fill="#64748B">
        MẪU MINH HỌA
      </text>

      {/* Right K2O comparison */}
      <text x="535" y="448" fontSize="10.5" fontWeight="800" fill="#475569">
        HÀM LƯỢNG K₂O
      </text>

      <text x="949" y="448" textAnchor="end" fontSize="13" fontWeight="900" fill="#15803D">
        ≈ 50%
      </text>

      <rect x="535" y="458" width="410" height="11" rx="5.5" fill="#F1F5F9" />

      <rect
        x="535"
        y="458"
        width="331"
        height="11"
        rx="5.5"
        fill={`url(#${uid("green")})`}
      />

      <circle cx="866" cy="463.5" r="7" fill="#FFFFFF" stroke="#22C55E" strokeWidth="2" />

      <text x="535" y="487" fontSize="10" fontWeight="600" fill="#64748B">
        Cung cấp thêm lưu huỳnh cho cây trồng.
      </text>

      <line x1="535" y1="499" x2="945" y2="499" stroke="#F1F5F9" strokeWidth="1.2" />

      {/* Right use case */}
      <rect x="535" y="512" width="25" height="25" rx="8" fill="#DCFCE7" />

      <path
        d="M542 530V518M542 522C537 521 537 517 539 516C542 516 542 519 542 522ZM542 526C547 525 548 522 546 520C543 520 542 523 542 526Z"
        fill="none"
        stroke="#15803D"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="570" y="521" fontSize="11" fontWeight="900" fill="#166534">
        Phù hợp
      </text>

      <text x="570" y="536" fontSize="10.5" fontWeight="600" fill="#475569">
        Cây nhạy clo hoặc khi cần bổ sung lưu huỳnh
      </text>

      <text x="535" y="557" fontSize="10" fill="#64748B">
        Thường có giá cao hơn và hàm lượng K₂O
      </text>

      <text x="535" y="571" fontSize="10" fill="#64748B">
        thấp hơn KCl theo khối lượng phân bón.
      </text>

      <rect x="535" y="586" width="190" height="25" rx="12.5" fill="#F0FDF4" stroke="#BBF7D0" />
      <circle cx="549" cy="598.5" r="4" fill="#22C55E" />

      <text x="560" y="602" fontSize="9.5" fontWeight="800" fill="#166534">
        BỔ SUNG THÊM LƯU HUỲNH
      </text>

      {/* =====================================================
          04 · COMPARISON FOOTER
      ===================================================== */}

      <rect
        x="30"
        y="651"
        width="940"
        height="84"
        rx="19"
        fill={`url(#${uid("footer")})`}
        stroke="#E2E8F0"
        strokeWidth="1.3"
      />

      {/* Decision icon */}
      <circle cx="69" cy="693" r="23" fill="#FFFFFF" stroke="#E2E8F0" />

      <g
        transform="translate(54 678)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M0 8H11L15 3L20 8H29" stroke="#64748B" />
        <path d="M3 8V25H26V8" stroke="#64748B" />
        <path d="M8 19L12 14L16 17L22 11" stroke="#16A34A" />
      </g>

      <text x="108" y="680" fontSize="12.5" fontWeight="900" fill="#1E293B">
        CHỌN PHÂN THEO NHU CẦU
      </text>

      <text x="108" y="699" fontSize="10.5" fontWeight="600" fill="#64748B">
        Không có một loại phân kali tốt nhất cho mọi cây trồng.
      </text>

      <text x="108" y="715" fontSize="9.5" fill="#64748B">
        * Hàm lượng điển hình; kiểm tra nhãn sản phẩm thực tế.
      </text>

      <line x1="498" y1="666" x2="498" y2="720" stroke="#E2E8F0" strokeWidth="1.3" />

      {/* Decision chips */}
      <g transform="translate(519 670)">
        <rect width="133" height="46" rx="11" fill="#FFFFFF" stroke="#FED7AA" />

        <circle cx="17" cy="17" r="8" fill="#FFEDD5" />
        <text x="17" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill="#C2410C">
          1
        </text>

        <text x="31" y="16" fontSize="9.5" fontWeight="900" fill="#9A3412">
          KCl
        </text>
        <text x="31" y="30" fontSize="8.5" fontWeight="600" fill="#64748B">
          Cần K, hạn chế chi phí
        </text>
      </g>

      <g transform="translate(660 670)">
        <rect width="143" height="46" rx="11" fill="#FFFFFF" stroke="#BBF7D0" />

        <circle cx="17" cy="17" r="8" fill="#DCFCE7" />
        <text x="17" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill="#15803D">
          2
        </text>

        <text x="31" y="16" fontSize="9.5" fontWeight="900" fill="#166534">
          K₂SO₄
        </text>
        <text x="31" y="30" fontSize="8.5" fontWeight="600" fill="#64748B">
          Cần K, tránh Cl⁻
        </text>
      </g>

      <g transform="translate(811 670)">
        <rect width="142" height="46" rx="11" fill="#FFFFFF" stroke="#DDD6FE" />

        <circle cx="17" cy="17" r="8" fill="#EDE9FE" />
        <text x="17" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill="#6D28D9">
          3
        </text>

        <text x="31" y="16" fontSize="9.5" fontWeight="900" fill="#5B21B6">
          KIỂM TRA ĐẤT
        </text>
        <text x="31" y="30" fontSize="8.5" fontWeight="600" fill="#64748B">
          Nhu cầu K và S
        </text>
      </g>
    </svg>
  );
}
