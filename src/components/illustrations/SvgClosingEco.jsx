import React from "react";

export default function SvgClosingEco({ active = 0 } = {}) {
  const id = `eco-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const uid = (name) => `${id}-${name}`;
  const ACCENTS = ["#22C55E", "#8B5CF6", "#F59E0B", "#0EA5E9"];
  const accent = ACCENTS[active % 4] || ACCENTS[0];
  const NPATH = "M103 157C145 64 252 38 355 59S495 115 531 160";
  const PPATH = "M523 180C574 263 512 367 411 404S251 429 196 402";
  const KPATH = "M148 386C77 341 61 247 88 174S112 132 145 111";

  const foliage = [
    [-91, -104, 47, 48, 2],
    [-58, -139, 49, 48, -12],
    [-9, -157, 53, 51, 0],
    [44, -145, 48, 47, 14],
    [83, -112, 46, 47, 7],
    [-111, -69, 39, 42, -16],
    [-73, -76, 49, 47, 8],
    [-23, -103, 49, 48, -7],
    [27, -88, 51, 47, 12],
    [75, -72, 47, 44, -9],
    [106, -47, 35, 39, 10],
    [-92, -36, 38, 37, 8],
    [-53, -44, 48, 43, -12],
    [-5, -48, 52, 47, 5],
    [42, -39, 47, 42, -7],
  ];

  const fruits = [
    { x: -68, y: -75, r: 13, delay: "0s" },
    { x: -36, y: -109, r: 16, delay: ".45s" },
    { x: 21, y: -78, r: 17, delay: ".9s" },
    { x: 70, y: -91, r: 15, delay: ".3s" },
    { x: 55, y: -38, r: 13, delay: "1.1s" },
    { x: -13, y: -34, r: 15, delay: ".7s" },
    { x: -89, y: -41, r: 10, delay: "1.4s" },
    { x: 91, y: -49, r: 10, delay: ".2s" },
  ];

  return (
    <svg
      viewBox="0 0 640 520"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <title id={`${id}-title`}>
        Cây thần bội thu — thông điệp dinh dưỡng NPK bền vững
      </title>

      <desc id={`${id}-desc`}>
        Cây xanh nhiều tầng lá, quả chín, bông lúa vàng, bộ rễ phát
        sáng và ba biểu tượng N, P, K kết nối bằng các dải quỹ đạo.
        Hoạt ảnh nhẹ tạo cảm giác hệ sinh thái đang vận động.
      </desc>

      <defs>
        {/* ================= ATMOSPHERE ================= */}

        <radialGradient id={uid("cosmicGlow")} cx="50%" cy="46%" r="58%">
          <stop offset="0%" stopColor="#86EFAC" stopOpacity=".35" />
          <stop offset="40%" stopColor="#38BDF8" stopOpacity=".2" />
          <stop offset="72%" stopColor="#818CF8" stopOpacity=".12" />
          <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={uid("groundGlow")} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#BBF7D0" stopOpacity=".9" />
          <stop offset="58%" stopColor="#4ADE80" stopOpacity=".4" />
          <stop offset="100%" stopColor="#16A34A" stopOpacity=".04" />
        </radialGradient>

        <linearGradient id={uid("trunk")} x1="0" y1="0" x2="1" y2=".2">
          <stop offset="0%" stopColor="#713F12" />
          <stop offset="24%" stopColor="#92400E" />
          <stop offset="48%" stopColor="#B77936" />
          <stop offset="67%" stopColor="#A16207" />
          <stop offset="100%" stopColor="#713F12" />
        </linearGradient>

        <linearGradient id={uid("trunkHighlight")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0" />
          <stop offset="40%" stopColor="#FEF3C7" stopOpacity=".6" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={uid("leafBright")} cx="35%" cy="25%" r="78%">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="38%" stopColor="#4ADE80" />
          <stop offset="74%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </radialGradient>

        <radialGradient id={uid("leafDeep")} cx="37%" cy="25%" r="78%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="48%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </radialGradient>

        <radialGradient id={uid("leafMint")} cx="34%" cy="25%" r="78%">
          <stop offset="0%" stopColor="#D9F99D" />
          <stop offset="52%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#16A34A" />
        </radialGradient>

        <radialGradient id={uid("fruit")} cx="32%" cy="25%" r="77%">
          <stop offset="0%" stopColor="#FFF7AE" />
          <stop offset="22%" stopColor="#FED7AA" />
          <stop offset="48%" stopColor="#FB923C" />
          <stop offset="78%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>

        <linearGradient id={uid("grain")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="45%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>

        <linearGradient id={uid("nitrogen")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id={uid("phosphorus")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>

        <linearGradient id={uid("potassium")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id={uid("ribbonGreen")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="35%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id={uid("ribbonViolet")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="55%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        <linearGradient id={uid("ribbonGold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* ================= FILTERS ================= */}

        {/* ================= ANIMATIONS ================= */}

        <style>{`
          @keyframes ${uid("breathe")} {
            0%, 100% { opacity: .55; }
            50% { opacity: 1; }
          }

          @keyframes ${uid("orbit")} {
            to { stroke-dashoffset: -96; }
          }

          @keyframes ${uid("float")} {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          @keyframes ${uid("sway")} {
            0%, 100% { transform: rotate(-1deg); }
            50% { transform: rotate(1deg); }
          }

          @keyframes ${uid("sparkle")} {
            0%, 100% { opacity: .2; transform: scale(.8); }
            50% { opacity: 1; transform: scale(1.15); }
          }

          @keyframes ${uid("fruitFloat")} {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-2.5px) scale(1.025); }
          }

          @keyframes ${uid("rootFlow")} {
            to { stroke-dashoffset: -55; }
          }

          @keyframes ${uid("shine")} {
            0% { transform: translateX(-80px); opacity: 0; }
            25% { opacity: .2; }
            75% { opacity: .2; }
            100% { transform: translateX(80px); opacity: 0; }
          }

          .${uid("atmosphere")} {
            animation: ${uid("breathe")} 5s ease-in-out infinite;
          }

          .${uid("ribbon")} {
            stroke-dasharray: 10 9;
            animation: ${uid("orbit")} 9s linear infinite;
          }

          .${uid("floating")} {
            animation: ${uid("float")} 4.5s ease-in-out infinite;
          }

          .${uid("leafSway")} {
            transform-box: fill-box;
            transform-origin: bottom center;
            animation: ${uid("sway")} 6s ease-in-out infinite;
          }

          .${uid("sparkle")} {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${uid("sparkle")} 2.8s ease-in-out infinite;
          }

          .${uid("fruitFloat")} {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${uid("fruitFloat")} 4s ease-in-out infinite;
          }

          .${uid("rootFlow")} {
            stroke-dasharray: 4 7;
            animation: ${uid("rootFlow")} 6s linear infinite;
          }

          .${uid("shine")} {
            animation: ${uid("shine")} 8s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .${uid("atmosphere")},
            .${uid("ribbon")},
            .${uid("floating")},
            .${uid("leafSway")},
            .${uid("sparkle")},
            .${uid("fruitFloat")},
            .${uid("rootFlow")},
            .${uid("shine")} {
              animation: none !important;
            }
          }
        `}</style>

        <linearGradient id={uid("ray")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".0" />
          <stop offset="30%" stopColor="#FEF9C3" stopOpacity=".38" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={uid("hillA")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BBF7D0" stopOpacity=".8" />
          <stop offset="100%" stopColor="#4ADE80" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={uid("hillB")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86EFAC" stopOpacity=".85" />
          <stop offset="100%" stopColor="#16A34A" stopOpacity=".18" />
        </linearGradient>
        <radialGradient id={uid("petal")} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F9A8D4" />
        </radialGradient>
        <radialGradient id={uid("wing")} cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <clipPath id={uid("portal")}>
          <circle cx="320" cy="241" r="232" />
        </clipPath>
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            .${uid("still")} animateTransform, .${uid("still")} animateMotion { display: none; }
          }
        `}</style>
      </defs>


      {/* =====================================================
          00 · PORTAL: LIGHT RAYS, HILLS, ACCENT HALO
      ===================================================== */}
      <g clipPath={`url(#${uid("portal")})`} className={uid("still")}>
        <g transform="translate(320 205)">
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="90s"
              repeatCount="indefinite"
            />
            {Array.from({ length: 14 }).map((_, i) => (
              <path
                key={`ray-${i}`}
                d="M0 0L-15 -260L15 -260Z"
                fill={`url(#${uid("ray")})`}
                opacity={i % 2 ? 0.55 : 1}
                transform={`rotate(${(i * 360) / 14})`}
              />
            ))}
          </g>
        </g>
        <path
          d="M84 318C150 276 212 284 272 312S392 332 452 296S540 286 566 312V400H84Z"
          fill={`url(#${uid("hillA")})`}
        />
        <path
          d="M78 346C160 312 232 330 320 340S472 322 562 342V420H78Z"
          fill={`url(#${uid("hillB")})`}
        />
      </g>

      <circle
        cx="320"
        cy="195"
        r="152"
        fill={accent}
        opacity=".17"
        className={uid("atmosphere")}
        style={{ transition: "fill .7s ease" }}
      />
      <g className={uid("still")}>
        <circle
          cx="320"
          cy="195"
          r="122"
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          strokeDasharray="4 9"
          opacity=".6"
          strokeLinecap="round"
          style={{ transition: "stroke .7s ease" }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 320 195"
            to="360 320 195"
            dur="40s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* =====================================================
          01 · COSMIC ECO ATMOSPHERE
      ===================================================== */}

      <circle
        cx="320"
        cy="239"
        r="234"
        fill={`url(#${uid("cosmicGlow")})`}
        className={uid("atmosphere")}
      />

      <circle
        cx="320"
        cy="241"
        r="180"
        fill="none"
        stroke="#A7F3D0"
        strokeWidth="1"
        strokeDasharray="2 9"
        opacity=".45"
      />

      <circle
        cx="320"
        cy="241"
        r="206"
        fill="none"
        stroke="#C4B5FD"
        strokeWidth="1"
        strokeDasharray="2 12"
        opacity=".38"
      />

      {/* Decorative distant lights */}
      {[
        [194, 76, 2.1],
        [269, 44, 1.6],
        [416, 63, 2.2],
        [470, 109, 1.8],
        [75, 229, 2],
        [563, 263, 2.1],
        [121, 324, 1.7],
        [467, 362, 1.6],
        [241, 424, 2],
        [397, 437, 1.8],
      ].map(([x, y, r], i) => (
        <circle
          key={`distant-${i}`}
          cx={x}
          cy={y}
          r={r}
          fill={i % 2 ? "#C4B5FD" : "#BBF7D0"}
          className={uid("sparkle")}
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}

      {/* =====================================================
          02 · THREE NPK ORBITAL RIBBONS
      ===================================================== */}

      <g fill="none" strokeLinecap="round">
        {/* Glow under each orbit */}
        <path
          d="M103 157C145 64 252 38 355 59S495 115 531 160"
          stroke="#22C55E"
          strokeWidth="14"
          opacity=".09"
        />

        <path
          d="M523 180C574 263 512 367 411 404S251 429 196 402"
          stroke="#8B5CF6"
          strokeWidth="14"
          opacity=".11"
        />

        <path
          d="M148 386C77 341 61 247 88 174S112 132 145 111"
          stroke="#FBBF24"
          strokeWidth="14"
          opacity=".11"
        />

        {/* Nitrogen orbit */}
        <path
          d="M103 157C145 64 252 38 355 59S495 115 531 160"
          stroke={`url(#${uid("ribbonGreen")})`}
          strokeWidth="5.5"
          className={uid("ribbon")}
        />

        <path
          d="M103 157C145 64 252 38 355 59S495 115 531 160"
          stroke="#DCFCE7"
          strokeWidth="1.2"
          strokeDasharray="2 11"
          className={uid("rootFlow")}
        />

        {/* Phosphorus orbit */}
        <path
          d="M523 180C574 263 512 367 411 404S251 429 196 402"
          stroke={`url(#${uid("ribbonViolet")})`}
          strokeWidth="5.5"
          className={uid("ribbon")}
          style={{ animationDirection: "reverse", animationDuration: "12s" }}
        />

        <path
          d="M523 180C574 263 512 367 411 404S251 429 196 402"
          stroke="#EDE9FE"
          strokeWidth="1.2"
          strokeDasharray="2 11"
          className={uid("rootFlow")}
        />

        {/* Potassium orbit */}
        <path
          d="M148 386C77 341 61 247 88 174S112 132 145 111"
          stroke={`url(#${uid("ribbonGold")})`}
          strokeWidth="5.5"
          className={uid("ribbon")}
          style={{ animationDuration: "11s" }}
        />

        <path
          d="M148 386C77 341 61 247 88 174S112 132 145 111"
          stroke="#FEF3C7"
          strokeWidth="1.2"
          strokeDasharray="2 11"
          className={uid("rootFlow")}
        />
      </g>


      {/* Comets travelling along the three orbits */}
      <g className={uid("still")}>
        {[
          [NPATH, "#86EFAC", 7],
          [PPATH, "#C4B5FD", 9],
          [KPATH, "#FDE68A", 8],
        ].map(([path, color, dur], c) => (
          <g key={`comet-${c}`}>
            {[0, 1, 2, 3, 4].map((k) => (
              <circle
                key={k}
                r={4.4 - k * 0.75}
                fill={color}
                opacity={1 - k * 0.2}
              >
                <animateMotion
                  dur={`${dur}s`}
                  begin={`${-k * 0.16}s`}
                  repeatCount="indefinite"
                  path={path}
                />
              </circle>
            ))}
          </g>
        ))}
      </g>

      {/* Small energy nodes on the orbital bands */}
      {[
        [169, 95, "#4ADE80"],
        [442, 87, "#86EFAC"],
        [552, 261, "#A78BFA"],
        [443, 390, "#C4B5FD"],
        [105, 300, "#FBBF24"],
        [87, 204, "#FDE68A"],
      ].map(([x, y, color], i) => (
        <g key={`node-${i}`} className={uid("sparkle")}>
          <circle cx={x} cy={y} r="5" fill={color} opacity=".25" />
          <circle cx={x} cy={y} r="2.4" fill={color} />
        </g>
      ))}

      {/* =====================================================
          03 · GROUND, ROOT SYSTEM AND SOIL GLOW
      ===================================================== */}

      <ellipse
        cx="320"
        cy="373"
        rx="182"
        ry="41"
        fill="#0F172A"
        opacity=".08"
      />

      <ellipse
        cx="320"
        cy="366"
        rx="182"
        ry="38"
        fill={`url(#${uid("groundGlow")})`}
      />

      <ellipse
        cx="320"
        cy="367"
        rx="164"
        ry="29"
        fill="#86EFAC"
        opacity=".23"
      />

      <ellipse
        cx="320"
        cy="365"
        rx="140"
        ry="21"
        fill="#4ADE80"
        opacity=".17"
      />

      {/* Glowing root network */}
      <g transform="translate(320 250)">
        <g
          fill="none"
          stroke="#8B5CF6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M-8 100C-16 117-42 128-71 145"
            stroke="#8B5CF6"
            strokeWidth="11"
            opacity=".12"
          />

          <path
            d="M8 100C16 117 42 128 71 145"
            stroke="#8B5CF6"
            strokeWidth="11"
            opacity=".12"
          />

          <path
            d="M-11 97C-39 115-69 120-111 134"
            stroke="#8B5CF6"
            strokeWidth="3.2"
          />

          <path
            d="M-4 103C-6 123-19 139-29 154"
            stroke="#A78BFA"
            strokeWidth="3.2"
          />

          <path
            d="M5 103C7 125 19 137 29 154"
            stroke="#A78BFA"
            strokeWidth="3.2"
          />

          <path
            d="M11 97C39 115 69 120 111 134"
            stroke="#8B5CF6"
            strokeWidth="3.2"
          />

          <path
            d="M-50 120Q-62 137-85 143M-75 129L-84 119M-29 143L-43 150"
            stroke="#C4B5FD"
            strokeWidth="1.7"
          />

          <path
            d="M49 120Q62 137 85 143M75 129L84 119M29 143L43 150"
            stroke="#C4B5FD"
            strokeWidth="1.7"
          />

          <path
            d="M-11 97C-39 115-69 120-111 134M-4 103C-6 123-19 139-29 154M5 103C7 125 19 137 29 154M11 97C39 115 69 120 111 134"
            stroke="#E9D5FF"
            strokeWidth="1.1"
            className={uid("rootFlow")}
          />
        </g>

        {/* Root endpoint lights */}
        {[
          [-111, 134],
          [-29, 154],
          [29, 154],
          [111, 134],
        ].map(([x, y], i) => (
          <g key={`rootlight-${i}`} className={uid("sparkle")}>
            <circle
              cx={x}
              cy={y}
              r="8"
              fill="#A78BFA"
              opacity=".2"
            />
            <circle
              cx={x}
              cy={y}
              r="3.2"
              fill="#DDD6FE"
              stroke="#8B5CF6"
              strokeWidth="1"
            />
          </g>
        ))}
      </g>


      {/* Wild flowers */}
      {[
        [196, 376, 1],
        [236, 386, 0.8],
        [404, 386, 0.85],
        [446, 375, 1],
        [150, 360, 0.75],
        [492, 358, 0.75],
      ].map(([x, y, sc], i) => (
        <g key={`flower-${i}`} transform={`translate(${x} ${y}) scale(${sc})`}>
          <g className={uid("leafSway")} style={{ animationDelay: `${i * 0.5}s` }}>
            <path d="M0 0C-1-8 1-14 0-20" stroke="#16A34A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M0-8C-6-9-9-12-9-15C-4-15-1-12 0-8Z" fill="#4ADE80" />
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse
                key={r}
                cx="0"
                cy="-26"
                rx="3.4"
                ry="5.6"
                fill={`url(#${uid("petal")})`}
                stroke="#F9A8D4"
                strokeWidth=".5"
                transform={`rotate(${r} 0 -20)`}
              />
            ))}
            <circle cx="0" cy="-20" r="2.6" fill="#FBBF24" />
          </g>
        </g>
      ))}

      {/* Small grass blades */}
      <g
        fill="none"
        stroke="#22C55E"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <path d="M171 366l-4-14M179 365l4-13M190 366l-1-9" />
        <path d="M449 366l-4-13M459 367l4-14M469 366l-1-8" />
        <path d="M215 379l-2-8M421 379l3-8" />
      </g>

      {/* =====================================================
          04 · ANCIENT TREE TRUNK AND BRANCHES
      ===================================================== */}

      <g transform="translate(320 250)">
        {/* Branch shadow */}
        <path
          d="M-24 106C-29 49-42 0-72-38C-40-31-20-7-8 17L-9-65H10L10 17C23-7 42-31 72-38C42 0 29 49 24 106Z"
          fill="#451A03"
          opacity=".18"
        />

        {/* Main trunk */}
        <path
          d="
            M-23 106
            C-25 73-25 42-35 10
            C-43-14-58-28-72-38
            C-46-37-26-21-10 11
            L-13-48
            Q-6-57 3-50
            L8 11
            C22-18 43-34 68-39
            C46-17 37 10 31 37
            C25 61 24 87 23 106Z
          "
          fill={`url(#${uid("trunk")})`}
          stroke="#78350F"
          strokeWidth="1.2"
        />

        {/* Trunk highlight */}
        <path
          d="M-16 95C-18 56-19 20-30-4"
          fill="none"
          stroke={`url(#${uid("trunkHighlight")})`}
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M4 87C8 54 7 24 7 1"
          fill="none"
          stroke="#713F12"
          strokeWidth="2"
          opacity=".62"
          strokeLinecap="round"
        />

        <path
          d="M15 86Q19 55 24 38"
          fill="none"
          stroke="#D97706"
          strokeWidth="2"
          opacity=".6"
          strokeLinecap="round"
        />

        {/* Carved wood lines */}
        <g
          fill="none"
          strokeLinecap="round"
          opacity=".48"
        >
          <path
            d="M-5 78Q-1 47-7 23"
            stroke="#FDE68A"
            strokeWidth="1.5"
          />
          <path
            d="M13 79Q12 51 19 29"
            stroke="#451A03"
            strokeWidth="1.5"
          />
          <path
            d="M-18 51Q-8 44-7 33"
            stroke="#78350F"
            strokeWidth="1.5"
          />
        </g>
      </g>

      {/* =====================================================
          05 · MULTI-LAYER LUMINOUS CANOPY
      ===================================================== */}

      <g
        transform="translate(320 250)"
      >
        {/* Dark foliage silhouette behind the canopy */}
        <g fill={`url(#${uid("leafDeep")})`}>
          <circle cx="-85" cy="-87" r="48" />
          <circle cx="-48" cy="-129" r="48" />
          <circle cx="0" cy="-154" r="55" />
          <circle cx="52" cy="-133" r="50" />
          <circle cx="88" cy="-88" r="46" />
          <circle cx="-102" cy="-45" r="38" />
          <circle cx="-62" cy="-59" r="47" />
          <circle cx="-17" cy="-94" r="48" />
          <circle cx="34" cy="-80" r="50" />
          <circle cx="77" cy="-54" r="43" />
          <circle cx="101" cy="-36" r="33" />
        </g>

        {/* Glowing front foliage blobs */}
        <g className={uid("leafSway")}>
          {foliage.map(([x, y, rx, ry, rotate], i) => (
            <ellipse
              key={`foliage-${i}`}
              cx={x}
              cy={y}
              rx={rx}
              ry={ry}
              transform={`rotate(${rotate} ${x} ${y})`}
              fill={
                i % 4 === 0
                  ? `url(#${uid("leafMint")})`
                  : i % 3 === 0
                  ? `url(#${uid("leafDeep")})`
                  : `url(#${uid("leafBright")})`
              }
              stroke="#166534"
              strokeWidth=".65"
              strokeOpacity=".45"
            />
          ))}
        </g>

        {/* Individual leaf silhouettes */}
        <g
          fill="none"
          stroke="#DCFCE7"
          strokeLinecap="round"
          opacity=".72"
        >
          <path d="M-106-99Q-89-111-70-128" strokeWidth="1.5" />
          <path d="M-74-115Q-82-126-96-130" strokeWidth="1.1" />
          <path d="M-57-151Q-37-157-25-177" strokeWidth="1.4" />
          <path d="M-6-153Q6-170 19-181" strokeWidth="1.6" />
          <path d="M40-136Q52-153 65-155" strokeWidth="1.4" />
          <path d="M69-102Q86-108 99-123" strokeWidth="1.5" />
          <path d="M-100-49Q-82-55-71-75" strokeWidth="1.4" />
          <path d="M-61-66Q-43-72-35-88" strokeWidth="1.3" />
          <path d="M-16-93Q0-107 10-124" strokeWidth="1.5" />
          <path d="M35-78Q52-86 59-103" strokeWidth="1.4" />
          <path d="M75-54Q89-63 94-76" strokeWidth="1.3" />
        </g>

        {/* Emerald leaf edges */}
        <g fill="#4ADE80" opacity=".65">
          <path d="M-95-123C-111-137-111-149-102-151C-88-146-85-135-95-123Z" />
          <path d="M-47-153C-53-171-44-182-35-178C-28-168-35-159-47-153Z" />
          <path d="M7-174C1-189 10-197 20-193C28-183 18-176 7-174Z" />
          <path d="M55-148C52-166 63-174 72-167C77-156 67-149 55-148Z" />
          <path d="M95-102C95-117 106-121 112-113C114-103 104-99 95-102Z" />
        </g>

        {/* Bright crown highlight */}
        <ellipse
          cx="-5"
          cy="-140"
          rx="60"
          ry="29"
          fill="#D9F99D"
          opacity=".13"
        />

        {/* Tiny glowing leaves */}
        {[
          [-104, -92, 3],
          [-83, -134, 2],
          [-50, -165, 2.5],
          [-13, -182, 2],
          [25, -166, 2.7],
          [58, -141, 2],
          [94, -91, 2.7],
          [-115, -49, 2],
          [-53, -94, 2.2],
          [4, -111, 2.4],
          [43, -72, 2],
          [91, -43, 2.2],
        ].map(([x, y, r], i) => (
          <circle
            key={`leaf-light-${i}`}
            cx={x}
            cy={y}
            r={r}
            fill="#ECFCCB"
            className={uid("sparkle")}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </g>

      {/* =====================================================
          06 · GOLDEN FRUITS
      ===================================================== */}

      <g transform="translate(320 250)">
        {fruits.map((fruit, i) => (
          <g
            key={`fruit-${i}`}
            className={uid("fruitFloat")}
            style={{ animationDelay: fruit.delay }}
          >
            {/* Stem */}
            <path
              d={`M${fruit.x} ${fruit.y - fruit.r + 2}q-1-5 3-7`}
              fill="none"
              stroke="#713F12"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Leaf on fruit */}
            <path
              d={`M${fruit.x + 1} ${fruit.y - fruit.r - 2}
                  q7-9 13-5
                  q-3 8-13 5Z`}
              fill="#4ADE80"
              stroke="#15803D"
              strokeWidth=".7"
            />

            {/* Fruit shadow */}
            <circle
              cx={fruit.x}
              cy={fruit.y + 2}
              r={fruit.r + 2}
              fill="#9A3412"
              opacity=".18"
            />

            {/* Fruit */}
            <circle
              cx={fruit.x}
              cy={fruit.y}
              r={fruit.r}
              fill={`url(#${uid("fruit")})`}
              stroke="#C2410C"
              strokeWidth=".9"
            />

            {/* Fruit specular highlight */}
            <ellipse
              cx={fruit.x - fruit.r * .3}
              cy={fruit.y - fruit.r * .42}
              rx={fruit.r * .29}
              ry={fruit.r * .19}
              fill="#FFFFFF"
              opacity=".82"
              transform={`rotate(-32 ${fruit.x - fruit.r * .3} ${fruit.y - fruit.r * .42})`}
            />

            <ellipse
              cx={fruit.x - fruit.r * .35}
              cy={fruit.y - fruit.r * .12}
              rx={fruit.r * .1}
              ry={fruit.r * .07}
              fill="#FFFFFF"
              opacity=".65"
            />
          </g>
        ))}
      </g>

      {/* =====================================================
          07 · GOLDEN RICE EARS / HARVEST
      ===================================================== */}

      <g transform="translate(320 250)">
        {/* Left rice stalk */}
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M-43 94C-79 78-111 54-143 70"
            stroke="#A16207"
            strokeWidth="3"
          />

          <path
            d="M-86 72Q-96 59-104 50M-109 68Q-120 55-127 50"
            stroke="#16A34A"
            strokeWidth="1.5"
          />

          <path
            d="M43 94C79 78 111 54 143 70"
            stroke="#A16207"
            strokeWidth="3"
          />

          <path
            d="M86 72Q96 59 104 50M109 68Q120 55 127 50"
            stroke="#16A34A"
            strokeWidth="1.5"
          />
        </g>

        {/* Left grains */}
        <g fill={`url(#${uid("grain")})`} stroke="#CA8A04" strokeWidth=".45">
          {[
            [-144, 70, -30],
            [-137, 62, -35],
            [-132, 77, -25],
            [-125, 56, -35],
            [-121, 69, -24],
            [-115, 47, -36],
            [-110, 60, -25],
            [-104, 42, -35],
            [-99, 55, -23],
            [-93, 47, -20],
            [-88, 63, -18],
            [-81, 58, -10],
            [-75, 69, -10],
          ].map(([x, y, r], i) => (
            <ellipse
              key={`left-grain-${i}`}
              cx={x}
              cy={y}
              rx="4.2"
              ry="7"
              transform={`rotate(${r} ${x} ${y})`}
            />
          ))}
        </g>

        {/* Right grains */}
        <g fill={`url(#${uid("grain")})`} stroke="#CA8A04" strokeWidth=".45">
          {[
            [144, 70, 30],
            [137, 62, 35],
            [132, 77, 25],
            [125, 56, 35],
            [121, 69, 24],
            [115, 47, 36],
            [110, 60, 25],
            [104, 42, 35],
            [99, 55, 23],
            [93, 47, 20],
            [88, 63, 18],
            [81, 58, 10],
            [75, 69, 10],
          ].map(([x, y, r], i) => (
            <ellipse
              key={`right-grain-${i}`}
              cx={x}
              cy={y}
              rx="4.2"
              ry="7"
              transform={`rotate(${r} ${x} ${y})`}
            />
          ))}
        </g>

        {/* Stalk accents */}
        <path
          d="M-45 95Q-85 89-127 71M45 95Q85 89 127 71"
          stroke="#FDE68A"
          strokeWidth="1.1"
          fill="none"
          opacity=".9"
        />
      </g>

      {/* =====================================================
          08 · FLOATING N / P / K ENERGY ORBS
      ===================================================== */}

      {/* Nitrogen orb */}
      <g transform="translate(100 120)"><g className={uid("floating")}>
        <circle
          cx="0"
          cy="0"
          r="42"
          fill="#22C55E"
          opacity=".14"
        />

        <circle
          cx="0"
          cy="0"
          r="32"
          fill="none"
          stroke="#86EFAC"
          strokeWidth="1.2"
          strokeDasharray="3 5"
        />

        <circle
          cx="0"
          cy="0"
          r="27"
          fill={`url(#${uid("nitrogen")})`}
          stroke="#DCFCE7"
          strokeWidth="1.5"
        />

        <ellipse
          cx="-8"
          cy="-10"
          rx="11"
          ry="6"
          fill="#FFFFFF"
          opacity=".22"
          transform="rotate(-30 -8 -10)"
        />

        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontSize="19"
          fontWeight="900"
          fill="#FFFFFF"
        >
          N
        </text>

        <circle cx="13" cy="-14" r="4.2" fill="#D1FAE5" />

        <circle
          cx="-20"
          cy="17"
          r="2"
          fill="#DCFCE7"
          className={uid("sparkle")}
        />

        <rect
          x="-31"
          y="35"
          width="62"
          height="20"
          rx="10"
          fill="#ECFDF5"
          stroke="#86EFAC"
        />

        <text
          x="0"
          y="48.5"
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="900"
          fill="#166534"
        >
          ĐẠM
        </text>
      </g></g>

      {/* Phosphorus orb */}
      <g transform="translate(540 153)"><g className={uid("floating")}
        style={{ animationDelay: ".8s" }}
      >
        <circle
          cx="0"
          cy="0"
          r="42"
          fill="#8B5CF6"
          opacity=".15"
        />

        <circle
          cx="0"
          cy="0"
          r="32"
          fill="none"
          stroke="#C4B5FD"
          strokeWidth="1.2"
          strokeDasharray="3 5"
        />

        <circle
          cx="0"
          cy="0"
          r="27"
          fill={`url(#${uid("phosphorus")})`}
          stroke="#EDE9FE"
          strokeWidth="1.5"
        />

        <ellipse
          cx="-8"
          cy="-10"
          rx="11"
          ry="6"
          fill="#FFFFFF"
          opacity=".22"
          transform="rotate(-30 -8 -10)"
        />

        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontSize="19"
          fontWeight="900"
          fill="#FFFFFF"
        >
          P
        </text>

        <circle cx="13" cy="-14" r="4.2" fill="#EDE9FE" />

        <circle
          cx="19"
          cy="16"
          r="2"
          fill="#DDD6FE"
          className={uid("sparkle")}
        />

        <rect
          x="-31"
          y="35"
          width="62"
          height="20"
          rx="10"
          fill="#F5F3FF"
          stroke="#C4B5FD"
        />

        <text
          x="0"
          y="48.5"
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="900"
          fill="#5B21B6"
        >
          LÂN
        </text>
      </g></g>

      {/* Potassium orb */}
      <g transform="translate(320 451)"><g className={uid("floating")}
        style={{ animationDelay: ".4s" }}
      >
        <circle
          cx="0"
          cy="0"
          r="39"
          fill="#FBBF24"
          opacity=".19"
        />

        <circle
          cx="0"
          cy="0"
          r="30"
          fill="none"
          stroke="#FDE68A"
          strokeWidth="1.2"
          strokeDasharray="3 5"
        />

        <circle
          cx="0"
          cy="0"
          r="25"
          fill={`url(#${uid("potassium")})`}
          stroke="#FFFBEB"
          strokeWidth="1.5"
        />

        <ellipse
          cx="-7"
          cy="-9"
          rx="10"
          ry="5.5"
          fill="#FFFFFF"
          opacity=".28"
          transform="rotate(-30 -7 -9)"
        />

        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontSize="19"
          fontWeight="900"
          fill="#78350F"
        >
          K
        </text>

        <circle cx="12" cy="-13" r="4" fill="#FEF3C7" />

        <rect
          x="-31"
          y="32"
          width="62"
          height="20"
          rx="10"
          fill="#FFFBEB"
          stroke="#FDE68A"
        />

        <text
          x="0"
          y="45.5"
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="900"
          fill="#92400E"
        >
          KALI
        </text>
      </g></g>


      {/* =====================================================
          08b · LIFE: FALLING LEAVES, FIREFLIES, BUTTERFLY
      ===================================================== */}
      <g className={uid("still")}>
        {/* falling leaves */}
        {[
          [250, 11, 0],
          [330, 13, 3.5],
          [395, 10, 6],
          [285, 12, 8.5],
          [360, 14, 1.5],
        ].map(([x, dur, delay], i) => (
          <path
            key={`leaf-${i}`}
            d="M-7 0C-3-6 4-6 7 0C4 6-3 6-7 0Z"
            fill={`url(#${uid(i % 2 ? "leafMint" : "leafBright")})`}
            stroke="#15803D"
            strokeWidth=".6"
            opacity="0"
          >
            <animateMotion
              dur={`${dur}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={`M${x} 118C${x - 52} 190 ${x + 56} 262 ${x - 8} 352`}
            />
            
          </path>
        ))}

        {/* fireflies */}
        {[
          [190, 300, 6],
          [455, 290, 7],
          [230, 340, 8],
          [420, 335, 6.5],
          [160, 250, 9],
          [490, 240, 7.5],
        ].map(([x, y, dur], i) => (
          <g key={`fly-${i}`}>
            <circle r="7" fill="#FDE047" opacity=".35">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                path={`M${x} ${y}c16-14 30 6 24 20s-30 10-24-20Z`}
              />
              
            </circle>
            <circle r="2" fill="#FEF9C3">
              <animateMotion
                dur={`${dur}s`}
                repeatCount="indefinite"
                path={`M${x} ${y}c16-14 30 6 24 20s-30 10-24-20Z`}
              />
            </circle>
          </g>
        ))}

        {/* butterfly */}
        <g>
          <animateMotion
            dur="16s"
            repeatCount="indefinite"
            path="M118 292C150 244 200 268 224 232S176 188 150 214S96 262 118 292Z"
          />
          <g>
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1 1;.25 1;1 1"
              dur=".55s"
              repeatCount="indefinite"
            />
            <path d="M0 0C-7-9-15-6-13 1C-12 6-6 6 0 2Z" fill={`url(#${uid("wing")})`} stroke="#B45309" strokeWidth=".5" />
            <path d="M0 0C7-9 15-6 13 1C12 6 6 6 0 2Z" fill={`url(#${uid("wing")})`} stroke="#B45309" strokeWidth=".5" />
            <path d="M0 2C-4 5-8 8-6 11C-3 11-1 7 0 2Z" fill="#FDBA74" />
            <path d="M0 2C4 5 8 8 6 11C3 11 1 7 0 2Z" fill="#FDBA74" />
          </g>
          <rect x="-.8" y="-5" width="1.6" height="11" rx=".8" fill="#78350F" />
        </g>
      </g>

      {/* =====================================================
          09 · SPARKLES AND ENERGY DETAILS
      ===================================================== */}

      {/* Four-point sparkles */}
      {[
        [210, 82, 7],
        [440, 92, 8],
        [144, 264, 7],
        [501, 311, 9],
        [205, 357, 6],
        [451, 339, 6],
        [279, 52, 6],
        [383, 72, 5],
        [166, 194, 5],
        [482, 220, 6],
      ].map(([x, y, size], i) => (
        <path
          key={`star-${i}`}
          d={`M${x} ${y - size}Q${x + 1} ${y - 1} ${x + size} ${y}Q${x + 1} ${y + 1} ${x} ${y + size}Q${x - 1} ${y + 1} ${x - size} ${y}Q${x - 1} ${y - 1} ${x} ${y - size}Z`}
          fill={i % 3 === 0 ? "#FDE68A" : i % 3 === 1 ? "#BBF7D0" : "#DDD6FE"}
          className={uid("sparkle")}
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* Tiny floating particles */}
      {[
        [178, 145, 2],
        [191, 159, 1.5],
        [466, 164, 2],
        [492, 177, 1.7],
        [130, 244, 1.8],
        [499, 284, 2],
        [234, 412, 1.5],
        [410, 423, 2],
      ].map(([x, y, r], i) => (
        <circle
          key={`particle-${i}`}
          cx={x}
          cy={y}
          r={r}
          fill="#FFFFFF"
          stroke="#BBF7D0"
          strokeWidth=".7"
          className={uid("sparkle")}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}

      {/* =====================================================
          10 · CLOSING MESSAGE
      ===================================================== */}

      <g>
        <rect
          x="153"
          y="484"
          width="334"
          height="25"
          rx="12.5"
          fill="#FFFFFF"
          fillOpacity=".88"
          stroke="#D1FAE5"
          strokeWidth="1"
        />

        <circle cx="171" cy="496.5" r="3" fill="#22C55E" />

        <text
          x="320"
          y="500.5"
          textAnchor="middle"
          fontSize="13"
          fontWeight="900"
          letterSpacing="1"
          fill="#166534"
        >
          NUÔI ĐẤT LÀNH · GIEO MÙA XANH
        </text>

        <circle cx="469" cy="496.5" r="3" fill="#8B5CF6" />
      </g>
    </svg>
  );
}