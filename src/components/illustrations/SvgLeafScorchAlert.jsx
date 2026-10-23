
import React from "react";

export default function SvgLeafScorchAlert() {
  const id = `leaf-alert-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const uid = (name) => `${id}-${name}`;

  const crops = [
    {
      n: "01",
      title: "Thuốc lá",
      detail: "Cần đặc biệt lưu ý lượng Cl⁻",
      type: "leaf",
      color: "#16A34A",
      bg: "#DCFCE7",
    },
    {
      n: "02",
      title: "Cây ăn quả nhạy clo",
      detail: "Xem khuyến cáo theo loài và giống",
      type: "tree",
      color: "#0D9488",
      bg: "#CCFBF1",
    },
    {
      n: "03",
      title: "Khoai tây",
      detail: "Cân nhắc đất, giống và chất lượng củ",
      type: "potato",
      color: "#A16207",
      bg: "#FEF3C7",
    },
    {
      n: "04",
      title: "Đất hoặc nước tưới mặn",
      detail: "Theo dõi tổng lượng muối đưa vào",
      type: "water",
      color: "#0284C7",
      bg: "#E0F2FE",
    },
  ];

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
        Nhận biết thiếu kali và lưu ý khi lựa chọn phân KCl
      </title>

      <desc id={`${id}-desc`}>
        Minh họa lá già vàng và cháy mép khi cây có thể thiếu kali,
        cùng các trường hợp cần cân nhắc phân chứa ion chloride.
        Không phải mọi lá cháy mép đều do thiếu kali và không phải
        mọi cây đều bị cấm sử dụng KCl.
      </desc>

      <defs>
        {/* ================= BACKGROUND ================= */}

        <linearGradient id={uid("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFCF5" />
          <stop offset="48%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>

        <linearGradient id={uid("greenLeaf")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BEF264" />
          <stop offset="38%" stopColor="#84CC16" />
          <stop offset="72%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#3F6212" />
        </linearGradient>

        <linearGradient id={uid("chlorosis")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        <linearGradient id={uid("scorch")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="40%" stopColor="#92400E" />
          <stop offset="75%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        <linearGradient id={uid("leafHighlight")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity=".4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={uid("greenBanner")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#F0FDFA" />
        </linearGradient>

        <linearGradient id={uid("amberBanner")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FFF7ED" />
        </linearGradient>

        {/* ================= TEXTURES ================= */}

        <pattern
          id={uid("leafTexture")}
          width="20"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="5" cy="7" r="1" fill="#FFFFFF" opacity=".16" />
          <circle cx="15" cy="16" r=".8" fill="#365314" opacity=".18" />
          <path
            d="M8 2l3 2"
            stroke="#FFFFFF"
            strokeWidth=".8"
            opacity=".15"
          />
        </pattern>

        <pattern
          id={uid("dryTexture")}
          width="17"
          height="17"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="4" cy="6" r="1.1" fill="#FDE68A" opacity=".28" />
          <circle cx="13" cy="12" r=".9" fill="#451A03" opacity=".28" />
          <path
            d="M7 13l3-2"
            stroke="#FDE68A"
            strokeWidth=".8"
            opacity=".23"
          />
        </pattern>

        {/* ================= SHADOWS ================= */}

        <filter id={uid("shadow")} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="11"
            floodColor="#0F172A"
            floodOpacity=".07"
          />
        </filter>

        <filter id={uid("leafShadow")} x="-30%" y="-25%" width="160%" height="160%">
          <feDropShadow
            dx="2"
            dy="8"
            stdDeviation="6"
            floodColor="#422006"
            floodOpacity=".22"
          />
        </filter>

        <filter id={uid("glow")} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        {/* ================= ANIMATIONS ================= */}

        <style>{`
          @keyframes ${uid("leafSway")} {
            0%, 100% { transform: rotate(-.5deg); }
            50% { transform: rotate(.7deg); }
          }

          @keyframes ${uid("glowPulse")} {
            0%, 100% { opacity: .25; }
            50% { opacity: .65; }
          }

          @keyframes ${uid("sparkle")} {
            0%, 100% { opacity: .25; }
            50% { opacity: 1; }
          }

          @keyframes ${uid("warningPulse")} {
            0%, 100% { opacity: .6; }
            50% { opacity: 1; }
          }

          @keyframes ${uid("dashFlow")} {
            to { stroke-dashoffset: -60; }
          }

          @keyframes ${uid("rise")} {
            0%, 100% { transform: translateY(2px); }
            50% { transform: translateY(-3px); }
          }

          .${uid("leafMotion")} {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${uid("leafSway")} 6s ease-in-out infinite;
          }

          .${uid("glowMotion")} {
            animation: ${uid("glowPulse")} 3.5s ease-in-out infinite;
          }

          .${uid("sparkleMotion")} {
            animation: ${uid("sparkle")} 2.8s ease-in-out infinite;
          }

          .${uid("warningMotion")} {
            animation: ${uid("warningPulse")} 2.8s ease-in-out infinite;
          }

          .${uid("flowMotion")} {
            stroke-dasharray: 4 6;
            animation: ${uid("dashFlow")} 5s linear infinite;
          }

          .${uid("riseMotion")} {
            animation: ${uid("rise")} 3s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .${uid("leafMotion")},
            .${uid("glowMotion")},
            .${uid("sparkleMotion")},
            .${uid("warningMotion")},
            .${uid("flowMotion")},
            .${uid("riseMotion")} {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* =====================================================
          01 · BACKGROUND & TITLE
      ===================================================== */}

      <rect width="1000" height="760" rx="28" fill={`url(#${uid("bg")})`} />

      <circle cx="957" cy="59" r="92" fill="#BBF7D0" opacity=".15" />
      <circle cx="923" cy="90" r="49" fill="#FDE68A" opacity=".15" />
      <circle cx="24" cy="587" r="65" fill="#FDBA74" opacity=".1" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`gx-${i}`}
            x1={780 + i * 20}
            y1="17"
            x2={780 + i * 20}
            y2="109"
          />
        ))}

        {Array.from({ length: 4 }, (_, i) => (
          <line
            key={`gy-${i}`}
            x1="780"
            y1={20 + i * 25}
            x2="930"
            y2={20 + i * 25}
          />
        ))}
      </g>

      <rect x="34" y="27" width="7" height="24" rx="3.5" fill="#D97706" />

      <text
        x="54"
        y="43"
        fontSize="11"
        fontWeight="900"
        letterSpacing="2"
        fill="#B45309"
      >
        DINH DƯỠNG KHOÁNG · NHẬN BIẾT TRIỆU CHỨNG
      </text>

      <text
        x="34"
        y="81"
        fontSize="29"
        fontWeight="900"
        letterSpacing="-.8"
        fill="#172B24"
      >
        THIẾU KALI
        <tspan fill="#D97706"> &amp; </tspan>
        <tspan fill="#15803D">LƯU Ý CHỌN PHÂN</tspan>
      </text>

      <text x="35" y="107" fontSize="12.5" fontWeight="500" fill="#64748B">
        Đọc tín hiệu trên lá · Đánh giá nguy cơ chloride · Chọn nguồn kali phù hợp
      </text>

      {/* Legend */}
      <g transform="translate(785 91)">
        <circle cx="0" cy="0" r="4" fill="#65A30D" />
        <text x="10" y="4" fontSize="9.5" fontWeight="800" fill="#64748B">
          THIẾU K
        </text>

        <circle cx="83" cy="0" r="4" fill="#B45309" />
        <text x="93" y="4" fontSize="9.5" fontWeight="800" fill="#64748B">
          CHÁY MÉP
        </text>
      </g>

      {/* =====================================================
          02 · LEFT CARD: LEAF SYMPTOM
      ===================================================== */}

      <g filter={`url(#${uid("shadow")})`}>
        <rect
          x="30"
          y="135"
          width="455"
          height="493"
          rx="22"
          fill="#FFFFFF"
          stroke="#FDE68A"
          strokeWidth="1.4"
        />
      </g>

      {/* Header */}
      <rect x="50" y="153" width="37" height="37" rx="11" fill="#FEF3C7" />

      <g
        transform="translate(57 160)"
        fill="none"
        stroke="#B45309"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 24C1 10 10 1 23 2C24 15 14 26 2 24Z" />
        <path d="M3 24L19 7" />
        <path d="M10 17L9 9M14 13L21 14" />
      </g>

      <text x="99" y="169" fontSize="14" fontWeight="900" fill="#92400E">
        DẤU HIỆU THIẾU KALI
      </text>

      <text x="99" y="186" fontSize="10.5" fontWeight="600" fill="#B45309">
        THƯỜNG XUẤT HIỆN TRÊN LÁ GIÀ
      </text>

      <rect x="365" y="158" width="101" height="27" rx="13.5" fill="#FFFBEB" />

      <circle cx="379" cy="171.5" r="4" fill="#D97706" />

      <text x="389" y="175.5" fontSize="9.5" fontWeight="900" fill="#92400E">
        CẢNH BÁO
      </text>

      {/* Leaf illustration stage */}
      <rect
        x="50"
        y="205"
        width="415"
        height="263"
        rx="16"
        fill="#F7FEE7"
        stroke="#ECFCCB"
      />

      <circle cx="95" cy="258" r="30" fill="#D9F99D" opacity=".23" />
      <circle cx="415" cy="423" r="35" fill="#FEF3C7" opacity=".4" />

      <text x="66" y="226" fontSize="9.5" fontWeight="800" fill="#64748B">
        MÔ PHỎNG BỀ MẶT LÁ
      </text>

      {/* Leaf glow */}
      <ellipse
        cx="258"
        cy="347"
        rx="100"
        ry="105"
        fill="#A3E635"
        opacity=".24"
        filter={`url(#${uid("glow")})`}
        className={uid("glowMotion")}
      />

      {/* Whole leaf - animated together */}
      <g className={uid("leafMotion")} filter={`url(#${uid("leafShadow")})`}>
        {/* Main leaf shape */}
        <path
          d="
            M258 238
            C214 255 169 291 165 341
            C160 388 204 434 258 455
            C312 434 356 388 351 341
            C347 291 302 255 258 238Z
          "
          fill={`url(#${uid("greenLeaf")})`}
          stroke="#3F6212"
          strokeWidth="1.8"
        />

        {/* Leaf texture */}
        <path
          d="
            M258 238
            C214 255 169 291 165 341
            C160 388 204 434 258 455
            C312 434 356 388 351 341
            C347 291 302 255 258 238Z
          "
          fill={`url(#${uid("leafTexture")})`
          }
        />

        {/* Chlorotic margins transitioning to brown */}
        <path
          d="
            M258 238
            C214 255 169 291 165 341
            C160 388 204 434 258 455
            C231 432 201 402 187 366
            C174 331 194 283 232 258Z
          "
          fill={`url(#${uid("chlorosis")})`}
          opacity=".93"
        />

        <path
          d="
            M258 238
            C302 255 347 291 351 341
            C356 388 312 434 258 455
            C285 432 315 402 329 366
            C342 331 322 283 284 258Z
          "
          fill={`url(#${uid("chlorosis")})`}
          opacity=".93"
        />

        {/* Reintroduce green center as an inset leaf area */}
        <path
          d="
            M258 251
            C218 267 184 299 180 341
            C177 377 212 416 258 440
            C304 416 339 377 336 341
            C332 299 298 267 258 251Z
          "
          fill={`url(#${uid("greenLeaf")})`
          }
          opacity=".99"
        />

        <path
          d="
            M258 251
            C218 267 184 299 180 341
            C177 377 212 416 258 440
            C304 416 339 377 336 341
            C332 299 298 267 258 251Z
          "
          fill={`url(#${uid("leafTexture")})`}
        />

        {/* Burnt and necrotic edges */}
        <path
          d="
            M258 238
            C235 247 210 260 191 280
            L205 277
            C222 263 240 255 258 251Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        <path
          d="
            M191 280
            C174 300 165 321 165 341
            L181 333
            C184 311 194 292 205 277Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        <path
          d="
            M165 341
            C162 373 182 402 207 425
            L214 410
            C196 389 183 361 181 333Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        <path
          d="
            M207 425
            C224 440 241 450 258 455
            L258 440
            C243 432 227 420 214 410Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        <path
          d="
            M258 238
            C281 247 306 260 325 280
            L311 277
            C294 263 276 255 258 251Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        <path
          d="
            M325 280
            C342 300 351 321 351 341
            L335 333
            C332 311 322 292 311 277Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        <path
          d="
            M351 341
            C354 373 334 402 309 425
            L302 410
            C320 389 333 361 335 333Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        <path
          d="
            M309 425
            C292 440 275 450 258 455
            L258 440
            C273 432 289 420 302 410Z
          "
          fill={`url(#${uid("scorch")})`}
        />

        {/* Scorched irregular spots */}
        <g fill="#451A03" opacity=".9">
          <path d="M184 311l8-7 4 10-7 9Z" />
          <path d="M173 345l8-6 4 11-8 6Z" />
          <path d="M190 382l7-4 5 8-7 5Z" />
          <path d="M218 417l6-3 5 7-6 4Z" />
          <path d="M331 311l-8-7-4 10 7 9Z" />
          <path d="M342 345l-8-6-4 11 8 6Z" />
          <path d="M326 382l-7-4-5 8 7 5Z" />
          <path d="M298 417l-6-3-5 7 6 4Z" />
        </g>

        <path
          d="
            M258 250
            C253 286 258 321 257 352
            C256 388 258 417 258 446
          "
          fill="none"
          stroke="#365314"
          strokeWidth="3.4"
          strokeLinecap="round"
        />

        {/* Side veins */}
        <g
          fill="none"
          stroke="#4D7C0F"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".9"
        >
          <path d="M257 291Q227 293 196 302" />
          <path d="M258 309Q223 316 187 329" />
          <path d="M257 331Q225 344 182 356" />
          <path d="M257 354Q224 370 190 384" />
          <path d="M258 380Q232 395 210 407" />

          <path d="M259 291Q289 293 320 302" />
          <path d="M258 309Q293 316 329 329" />
          <path d="M259 331Q291 344 334 356" />
          <path d="M259 354Q292 370 326 384" />
          <path d="M258 380Q284 395 306 407" />
        </g>

        {/* Fine veins */}
        <g
          fill="none"
          stroke="#F0FDF4"
          strokeWidth=".9"
          opacity=".65"
          strokeLinecap="round"
        >
          <path d="M230 300L204 289M219 318L188 315M225 351L192 343M232 382L208 372" />
          <path d="M286 300L312 289M297 318L328 315M291 351L324 343M284 382L308 372" />
        </g>

        {/* Central vein highlight */}
        <path
          d="M260 257C259 305 261 371 260 429"
          fill="none"
          stroke="#BEF264"
          strokeWidth="1.1"
          opacity=".8"
          strokeLinecap="round"
        />

        {/* Petiole */}
        <path
          d="M258 451Q258 460 264 466"
          fill="none"
          stroke="#65A30D"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Leaf shine */}
        <path
          d="M242 271C215 285 195 311 192 335"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".42"
        />
      </g>

      {/* Label: yellowing */}
      <path
        d="M168 324L125 302H76"
        fill="none"
        stroke="#D97706"
        strokeWidth="1.6"
        strokeDasharray="3 4"
      />

      <circle cx="168" cy="324" r="3.2" fill="#F59E0B" />

      <rect x="62" y="284" width="93" height="27" rx="8" fill="#FFFBEB" stroke="#FDE68A" />

      <text
        x="108.5"
        y="301"
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="900"
        fill="#92400E"
      >
        VÀNG MÉP
      </text>

      {/* Label: necrosis */}
      <path
        d="M190 388L146 411H80"
        fill="none"
        stroke="#92400E"
        strokeWidth="1.6"
        strokeDasharray="3 4"
      />

      <circle cx="190" cy="388" r="3.2" fill="#78350F" />

      <rect x="62" y="416" width="110" height="27" rx="8" fill="#FEF3C7" stroke="#D97706" />

      <text
        x="117"
        y="433"
        textAnchor="middle"
        fontSize="9"
        fontWeight="900"
        fill="#92400E"
      >
        MÉP CHÁY NÂU
      </text>

      {/* Floating warning particles */}
      {[
        [376, 267, 2.1],
        [399, 285, 1.6],
        [382, 419, 2.2],
        [420, 390, 1.7],
        [108, 383, 1.8],
      ].map(([x, y, r], i) => (
        <circle
          key={`leaf-particle-${i}`}
          cx={x}
          cy={y}
          r={r}
          fill="#D97706"
          className={uid("sparkleMotion")}
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}

      {/* Caption under leaf */}
      <rect x="66" y="452" width="383" height="1" fill="#D9F99D" />

      {/* Leaf diagnostic steps */}
      <g>
        <circle cx="75" cy="490" r="12" fill="#FEF3C7" />

        <text x="75" y="494" textAnchor="middle" fontSize="10" fontWeight="900" fill="#92400E">
          1
        </text>

        <text x="95" y="488" fontSize="10.5" fontWeight="900" fill="#92400E">
          Vàng ở mép lá
        </text>

        <text x="95" y="503" fontSize="9.5" fill="#64748B">
          Có thể là dấu hiệu ban đầu.
        </text>

        <circle cx="277" cy="490" r="12" fill="#FFEDD5" />

        <text x="277" y="494" textAnchor="middle" fontSize="10" fontWeight="900" fill="#9A3412">
          2
        </text>

        <text x="297" y="488" fontSize="10.5" fontWeight="900" fill="#9A3412">
          Hoại tử mép
        </text>

        <text x="297" y="503" fontSize="9.5" fill="#64748B">
          Có thể lan vào phiến lá.
        </text>
      </g>

      <rect x="53" y="525" width="409" height="80" rx="13" fill="#FFFBEB" stroke="#FDE68A" />

      <circle cx="72" cy="545" r="8" fill="#FEF3C7" />

      <path
        d="M72 540V546M72 550v.5"
        stroke="#B45309"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <text x="88" y="548" fontSize="10.5" fontWeight="900" fill="#92400E">
        Đừng chẩn đoán chỉ bằng một chiếc lá
      </text>

      <text x="67" y="566" fontSize="9.5" fill="#78350F">
        Kiểm tra độ ẩm, rễ, độ mặn và các triệu chứng khác.
      </text>

      <text x="67" y="581" fontSize="9.5" fill="#78350F">
        Xét nghiệm đất hoặc lá giúp xác nhận tình trạng dinh dưỡng.
      </text>

      <rect x="67" y="588" width="151" height="9" rx="4.5" fill="#FDE68A" opacity=".7" />

      {/* =====================================================
          03 · RIGHT CARD: CHLORIDE MANAGEMENT
      ===================================================== */}

      <g filter={`url(#${uid("shadow")})`}>
        <rect
          x="515"
          y="135"
          width="455"
          height="493"
          rx="22"
          fill="#FFFFFF"
          stroke="#FECACA"
          strokeWidth="1.4"
        />
      </g>

      {/* Header */}
      <rect x="535" y="153" width="37" height="37" rx="11" fill="#FEE2E2" />

      <g transform="translate(543 160)">
        <path
          d="M12 1L24 6V14C24 22 18 27 12 29C6 27 0 22 0 14V6Z"
          fill="#FCA5A5"
          stroke="#DC2626"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M5 9L19 21M19 9L5 21"
          stroke="#991B1B"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>

      <text x="584" y="169" fontSize="14" fontWeight="900" fill="#991B1B">
        LƯU Ý VỚI ION CLO
      </text>

      <text x="584" y="186" fontSize="10.5" fontWeight="600" fill="#DC2626">
        KHÔNG PHẢI MỌI CÂY ĐỀU NHẠY GIỐNG NHAU
      </text>

      <rect x="859" y="158" width="91" height="27" rx="13.5" fill="#FEF2F2" />

      <circle cx="873" cy="171.5" r="4" fill="#EF4444" />

      <text x="883" y="175.5" fontSize="9.5" fontWeight="900" fill="#B91C1C">
        CẦN LƯU Ý
      </text>

      {/* Intro note */}
      <rect x="535" y="205" width="415" height="47" rx="12" fill="#FFF7ED" stroke="#FED7AA" />

      <circle cx="554" cy="228" r="10" fill="#FFEDD5" />

      <text x="554" y="232" textAnchor="middle" fontSize="12" fontWeight="900" fill="#C2410C">
        !
      </text>

      <text x="571" y="223" fontSize="10.5" fontWeight="900" fill="#9A3412">
        KCl cung cấp kali nhưng cũng đưa Cl⁻ vào đất.
      </text>

      <text x="571" y="238" fontSize="9.5" fill="#9A3412">
        Cân nhắc mức độ nhạy clo và nguy cơ tích lũy muối.
      </text>

      {/* Crop cards */}
      {crops.map((crop, i) => {
        const y = 263 + i * 65;

        return (
          <g key={crop.n}>
            <rect
              x="535"
              y={y}
              width="415"
              height="56"
              rx="12"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1.1"
            />

            <rect
              x="535"
              y={y}
              width="4"
              height="56"
              rx="2"
              fill={crop.color}
            />

            <rect
              x="548"
              y={y + 10}
              width="36"
              height="36"
              rx="10"
              fill={crop.bg}
            />

            {/* Leaf icon */}
            {crop.type === "leaf" && (
              <g
                transform={`translate(556 ${y + 17})`}
                stroke="#15803D"
                strokeWidth="1.3"
                strokeLinejoin="round"
              >
                <path d="M1 21C0 10 9 1 21 2C22 13 13 23 1 21Z" fill="#4ADE80" />

                <path
                  d="M2 21L17 6"
                  fill="none"
                  strokeLinecap="round"
                />

                <path d="M9 14L7 8M12 11L18 12" fill="none" />
              </g>
            )}

            {/* Fruit tree icon */}
            {crop.type === "tree" && (
              <g
                transform={`translate(556 ${y + 17})`}
                stroke="#0F766E"
                strokeWidth="1.3"
                strokeLinejoin="round"
              >
                <path d="M11 13V25M7 25H16" fill="none" strokeWidth="2.5" strokeLinecap="round" />

                <circle cx="8" cy="8" r="7" fill="#5EEAD4" />
                <circle cx="18" cy="8" r="7" fill="#2DD4BF" />
                <circle cx="13" cy="3" r="7" fill="#99F6E4" />

                <circle cx="8" cy="10" r="1.8" fill="#F97316" stroke="none" />
                <circle cx="18" cy="8" r="1.8" fill="#F97316" stroke="none" />
              </g>
            )}

            {/* Potato icon */}
            {crop.type === "potato" && (
              <g transform={`translate(556 ${y + 17})`}>
                <path
                  d="M3 12C0 5 8 1 15 3C24 4 24 14 18 20C13 25 4 21 3 12Z"
                  fill="#D6B58D"
                  stroke="#A16207"
                  strokeWidth="1.3"
                />

                <ellipse cx="8" cy="8" rx="2" ry="1.5" fill="#854D0E" />
                <ellipse cx="17" cy="12" rx="2" ry="1.5" fill="#854D0E" />
                <ellipse cx="11" cy="18" rx="1.6" ry="1.3" fill="#854D0E" />

                <path d="M5 7Q10 3 14 6" fill="none" stroke="#FFF7ED" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}

            {/* Salinity and water icon */}
            {crop.type === "water" && (
              <g transform={`translate(556 ${y + 17})`}>
                <path
                  d="M13 0C13 0 3 12 3 17A10 10 0 0023 17C23 12 13 0 13 0Z"
                  fill="#7DD3FC"
                  stroke="#0284C7"
                  strokeWidth="1.4"
                />

                <path
                  d="M7 18Q11 21 16 17"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <circle cx="13" cy="12" r="2" fill="#FFFFFF" opacity=".8" />
              </g>
            )}

            <text
              x="596"
              y={y + 22}
              fontSize="11.5"
              fontWeight="900"
              fill="#1E293B"
            >
              {crop.title}
            </text>

            <text
              x="596"
              y={y + 39}
              fontSize="9.7"
              fontWeight="600"
              fill="#64748B"
            >
              {crop.detail}
            </text>

            <circle
              cx="928"
              cy={y + 28}
              r="8"
              fill={crop.bg}
            />

            <path
              d={`M924 ${y + 28}l3 3 5-6`}
              fill="none"
              stroke={crop.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {/* Right-side lower recommendation */}
      <rect
        x="535"
        y="535"
        width="415"
        height="70"
        rx="13"
        fill={`url(#${uid("greenBanner")})`}
        stroke="#A7F3D0"
        strokeWidth="1.1"
      />

      <circle cx="554" cy="556" r="9" fill="#DCFCE7" />

      <path
        d="M550 556l3 3 5-6"
        fill="none"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="570" y="559" fontSize="10.5" fontWeight="900" fill="#166534">
        Khi cần hạn chế clo, cân nhắc K₂SO₄
      </text>

      <text x="550" y="578" fontSize="9.5" fill="#166534">
        Đồng thời có thể bổ sung lưu huỳnh; không mặc định
      </text>

      <text x="550" y="591" fontSize="9.5" fill="#166534">
        rằng K₂SO₄ luôn cần thiết hoặc luôn cho năng suất cao hơn.
      </text>

      {/* =====================================================
          04 · BOTTOM ACTION BANNER
      ===================================================== */}

      <rect
        x="30"
        y="651"
        width="940"
        height="84"
        rx="19"
        fill={`url(#${uid("amberBanner")})`}
        stroke="#FDE68A"
        strokeWidth="1.3"
      />

      {/* Central leaf/check badge */}
      <circle cx="69" cy="693" r="23" fill="#FEF3C7" />

      <path
        d="M69 707C52 699 54 685 57 679C67 680 72 687 71 696C76 685 85 685 87 688C87 697 80 705 69 707Z"
        fill="#84CC16"
        stroke="#4D7C0F"
        strokeWidth="1.2"
      />

      <path
        d="M69 704L70 691M70 698L61 687M70 696L80 689"
        fill="none"
        stroke="#F7FEE7"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <text x="108" y="681" fontSize="12.5" fontWeight="900" fill="#92400E">
        NGUYÊN TẮC CHỌN PHÂN KALI
      </text>

      <text x="108" y="701" fontSize="11" fontWeight="700" fill="#78350F">
        Xác định nhu cầu K · Đánh giá độ nhạy clo · Kiểm tra đất và nước tưới
      </text>

      <text x="108" y="718" fontSize="9.5" fill="#64748B">
        Nếu nghi thiếu K, cần xác minh nguyên nhân trước khi điều chỉnh phân bón.
      </text>

      <line x1="655" y1="667" x2="655" y2="720" stroke="#FDE68A" strokeWidth="1.3" />

      {/* Two paths */}
      <g transform="translate(675 671)">
        <rect width="126" height="46" rx="11" fill="#FFFFFF" stroke="#FED7AA" />

        <circle cx="17" cy="17" r="8" fill="#FFEDD5" />

        <text x="17" y="20" textAnchor="middle" fontSize="9" fontWeight="900" fill="#C2410C">
          K
        </text>

        <text x="31" y="16" fontSize="9.5" fontWeight="900" fill="#9A3412">
          Nguồn kali
        </text>

        <text x="31" y="30" fontSize="8.5" fontWeight="600" fill="#64748B">
          Theo nhu cầu cây
        </text>
      </g>

      <g transform="translate(809 671)">
        <rect width="143" height="46" rx="11" fill="#FFFFFF" stroke="#BBF7D0" />

        <circle cx="17" cy="17" r="8" fill="#DCFCE7" />

        <path
          d="M13 17l3 3 5-6"
          fill="none"
          stroke="#15803D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x="31" y="16" fontSize="9.5" fontWeight="900" fill="#166534">
          Dùng đúng cách
        </text>

        <text x="31" y="30" fontSize="8.5" fontWeight="600" fill="#64748B">
          Theo nhãn và khuyến cáo
        </text>
      </g>
    </svg>
  );
}
