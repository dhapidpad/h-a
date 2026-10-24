
import React from "react";

export default function SvgApatiteMine() {
  const id = React.useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 1000 760"
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
        borderRadius: 22,
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <title id={`${id}-title`}>
        Mỏ apatite Lào Cai và công nghiệp sản xuất phân lân Việt Nam
      </title>
      <desc id={`${id}-desc`}>
        Infographic về các tầng địa chất chứa apatite, quá trình khai thác,
        ba cơ sở sản xuất phân lân tiêu biểu và các vấn đề môi trường cần
        được quản lý.
      </desc>

      <defs>
        {/* ===== PALETTE & BACKGROUND ===== */}
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>

        <linearGradient id={`${id}-rock`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#655568" />
          <stop offset="45%" stopColor="#433B4D" />
          <stop offset="100%" stopColor="#292D3A" />
        </linearGradient>

        <linearGradient id={`${id}-soil`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A87B51" />
          <stop offset="100%" stopColor="#78533D" />
        </linearGradient>

        <linearGradient id={`${id}-weathered`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C9A77A" />
          <stop offset="100%" stopColor="#98724F" />
        </linearGradient>

        <linearGradient id={`${id}-rich`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9B87C5" />
          <stop offset="50%" stopColor="#746096" />
          <stop offset="100%" stopColor="#4C4866" />
        </linearGradient>

        <linearGradient id={`${id}-ore`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#625472" />
          <stop offset="100%" stopColor="#37384E" />
        </linearGradient>

        <linearGradient id={`${id}-green`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>

        <linearGradient id={`${id}-purple`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="55%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>

        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* ===== TEXTURES ===== */}
        <pattern
          id={`${id}-rockTexture`}
          width="34"
          height="31"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="5" cy="8" r="1.3" fill="#FFFFFF" opacity=".18" />
          <circle cx="24" cy="20" r="1.7" fill="#C4B5FD" opacity=".2" />
          <path
            d="M12 3l5 3M3 25l5-2M27 5l3 2"
            stroke="#E2E8F0"
            strokeWidth="1"
            opacity=".16"
          />
        </pattern>

        <pattern
          id={`${id}-soilTexture`}
          width="32"
          height="25"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="7" cy="8" r="1.4" fill="#FFF7ED" opacity=".24" />
          <circle cx="24" cy="18" r="1" fill="#422006" opacity=".25" />
          <path
            d="M14 5l4 2M3 20l5-1"
            stroke="#FFEDD5"
            strokeWidth="1"
            opacity=".2"
          />
        </pattern>

        <pattern
          id={`${id}-oreTexture`}
          width="36"
          height="29"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M5 5l6 4-3 6M25 2l-4 7 6 4"
            stroke="#DDD6FE"
            fill="none"
            strokeWidth="1.2"
            opacity=".36"
          />
          <circle cx="18" cy="21" r="2" fill="#C4B5FD" opacity=".24" />
        </pattern>

        {/* ===== FILTERS ===== */}
        <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="11"
            floodColor="#0F172A"
            floodOpacity=".07"
          />
        </filter>

        <filter id={`${id}-glow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>

        <filter id={`${id}-smallGlow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.3" />
        </filter>

        {/* ===== CLIPPING ===== */}
        <clipPath id={`${id}-geologyClip`}>
          <rect x="54" y="247" width="418" height="304" rx="10" />
        </clipPath>

        {/* ===== ANIMATIONS ===== */}
        <style>{`
          @keyframes ${id}-glowPulse {
            0%, 100% { opacity: .42; }
            50% { opacity: .95; }
          }

          @keyframes ${id}-drift {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }

          @keyframes ${id}-sparkle {
            0%, 100% { opacity: .25; transform: scale(.8); }
            50% { opacity: 1; transform: scale(1.18); }
          }

          @keyframes ${id}-dashFlow {
            to { stroke-dashoffset: -100; }
          }

          @keyframes ${id}-steamRise {
            0% { opacity: 0; transform: translateY(4px) scale(.75); }
            25% { opacity: .65; }
            100% { opacity: 0; transform: translateY(-12px) scale(1.1); }
          }

          @keyframes ${id}-scan {
            0% { transform: translateX(-80px); opacity: 0; }
            15% { opacity: .26; }
            85% { opacity: .26; }
            100% { transform: translateX(430px); opacity: 0; }
          }

          .${id}-float {
            animation: ${id}-drift 5s ease-in-out infinite;
          }

          .${id}-glow {
            animation: ${id}-glowPulse 3.5s ease-in-out infinite;
          }

          .${id}-sparkle {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${id}-sparkle 2.8s ease-in-out infinite;
          }

          .${id}-flow {
            stroke-dasharray: 5 8;
            animation: ${id}-dashFlow 8s linear infinite;
          }

          .${id}-steam {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${id}-steamRise 3s ease-out infinite;
          }

          .${id}-scan {
            animation: ${id}-scan 9s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .${id}-float,
            .${id}-glow,
            .${id}-sparkle,
            .${id}-flow,
            .${id}-steam,
            .${id}-scan {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* =====================================================
          01. CANVAS
      ===================================================== */}

      <rect width="1000" height="760" rx="28" fill={`url(#${id}-bg)`} stroke="#DDD6FE" strokeWidth="1.5" />

      <circle cx="950" cy="62" r="90" fill="#BBF7D0" opacity=".16" />
      <circle cx="920" cy="92" r="47" fill="#C4B5FD" opacity=".15" />
      <circle cx="24" cy="600" r="60" fill="#DDD6FE" opacity=".18" />

      {/* Decorative grid */}
      <g opacity=".14" stroke="#94A3B8" strokeWidth=".7">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`vx${i}`} x1={735 + i * 22} y1="20" x2={735 + i * 22} y2="112" />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line key={`hy${i}`} x1="735" y1={24 + i * 22} x2="933" y2={24 + i * 22} />
        ))}
      </g>

      {/* Main heading */}
      <rect x="38" y="27" width="7" height="24" rx="3.5" fill="#8B5CF6" />

      <text
        x="59"
        y="43"
        fontSize="11"
        fontWeight="900"
        letterSpacing="2.2"
        fill="#6D28D9"
      >
        ĐỊA CHẤT • KHOÁNG SẢN • CÔNG NGHIỆP
      </text>

      <text
        x="38"
        y="82"
        fontSize="30"
        fontWeight="900"
        letterSpacing="-.9"
        fill="#172033"
      >
        HÀNH TRÌNH CỦA
        <tspan fill="#7C3AED"> APATITE</tspan>
      </text>

      <text x="40" y="108" fontSize="13" fontWeight="500" fill="#64748B">
        Từ vỉa quặng Lào Cai đến các sản phẩm phân lân và bài toán phát triển bền vững
      </text>

      {/* Top right legend */}
      <g transform="translate(751 88)">
        <circle cx="0" cy="0" r="4" fill="#8B5CF6" />
        <text x="10" y="4" fontSize="10" fontWeight="700" fill="#64748B">
          APATITE
        </text>
        <circle cx="95" cy="0" r="4" fill="#22C55E" />
        <text x="105" y="4" fontSize="10" fontWeight="700" fill="#64748B">
          CHẾ BIẾN
        </text>
      </g>

      {/* =====================================================
          02. LEFT PANEL: GEOLOGY / MINE
      ===================================================== */}

      <g filter={`url(#${id}-shadow)`}>
        <rect
          x="30"
          y="136"
          width="462"
          height="500"
          rx="23"
          fill="#FFFFFF"
          stroke="#E9D5FF"
          strokeWidth="1.4"
        />
      </g>

      {/* Panel heading icon */}
      <rect x="51" y="155" width="38" height="38" rx="12" fill="#F3E8FF" />

      <g transform="translate(60 163)" fill="none" stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2">
        <path d="M2 10L15 1L28 10" />
        <path d="M15 1V23" />
        <path d="M4 18h22" />
        <path d="M6 24l6-6M19 18l6 6" />
        <path d="M2 28h26" />
      </g>

      <text x="101" y="171" fontSize="15" fontWeight="900" fill="#3B245F">
        MỎ APATIT LÀO CAI
      </text>
      <text x="101" y="188" fontSize="10.5" fontWeight="600" fill="#8B5CF6">
        MẶT CẮT ĐỊA CHẤT MINH HỌA
      </text>

      <rect x="370" y="160" width="99" height="27" rx="13.5" fill="#F5F3FF" />
      <circle cx="384" cy="173.5" r="4" fill="#8B5CF6" />
      <text x="394" y="177" fontSize="9.5" fontWeight="800" fill="#6D28D9">
        THÂN QUẶNG
      </text>

      {/* Geological cutaway */}
      <g clipPath={`url(#${id}-geologyClip)`}>
        {/* Foundation */}
        <rect x="54" y="247" width="418" height="304" fill={`url(#${id}-rock)`} />

        {/* Layer 1: soil cover */}
        <path
          d="M54 247H472V294
             C425 290 405 300 368 293
             S302 300 262 294
             S191 301 147 294
             S87 301 54 296Z"
          fill={`url(#${id}-soil)`}
        />

        <path
          d="M54 247H472V294
             C425 290 405 300 368 293
             S302 300 262 294
             S191 301 147 294
             S87 301 54 296Z"
          fill={`url(#${id}-soilTexture)`}
        />

        {/* Layer 2: weathered rock */}
        <path
          d="M54 296
             C105 301 120 290 165 297
             S245 302 293 296
             S390 300 472 294
             V343
             C416 351 377 341 325 350
             S225 341 177 350
             S90 343 54 351Z"
          fill={`url(#${id}-weathered)`}
        />

        <path
          d="M54 296
             C105 301 120 290 165 297
             S245 302 293 296
             S390 300 472 294
             V343
             C416 351 377 341 325 350
             S225 341 177 350
             S90 343 54 351Z"
          fill={`url(#${id}-soilTexture)`}
          opacity=".7"
        />

        {/* Layer 3: apatite seam */}
        <path
          d="M54 351
             C104 342 146 358 192 350
             S276 353 319 347
             S403 351 472 343
             V408
             C424 403 390 416 340 408
             S245 416 194 407
             S95 415 54 407Z"
          fill={`url(#${id}-rich)`}
          stroke="#C4B5FD"
          strokeWidth="1.3"
        />

        <path
          d="M54 351
             C104 342 146 358 192 350
             S276 353 319 347
             S403 351 472 343
             V408
             C424 403 390 416 340 408
             S245 416 194 407
             S95 415 54 407Z"
          fill={`url(#${id}-oreTexture)`}
        />

        {/* Layer 4: lower grade ore */}
        <path
          d="M54 407
             C105 415 145 402 190 411
             S280 401 327 410
             S407 403 472 408
             V490
             C420 483 382 496 337 490
             S240 500 195 490
             S96 499 54 490Z"
          fill={`url(#${id}-ore)`}
          stroke="#A78BFA"
          strokeWidth="1"
        />

        <path
          d="M54 407
             C105 415 145 402 190 411
             S280 401 327 410
             S407 403 472 408
             V490
             C420 483 382 496 337 490
             S240 500 195 490
             S96 499 54 490Z"
          fill={`url(#${id}-oreTexture)`}
        />

        {/* Bedrock */}
        <path
          d="M54 490
             C114 499 155 486 210 495
             S312 489 355 494
             S424 487 472 490
             V551H54Z"
          fill="#343443"
        />

        <path
          d="M54 490
             C114 499 155 486 210 495
             S312 489 355 494
             S424 487 472 490
             V551H54Z"
          fill={`url(#${id}-rockTexture)`}
        />

        {/* Geological cracks */}
        <g fill="none" stroke="#D8C5F9" strokeWidth="1.1" opacity=".45">
          <path d="M87 302l13 12-8 9 12 9" />
          <path d="M129 434l15-11-3-11 11-9" />
          <path d="M425 449l-10 7 4 10-13 12" />
          <path d="M387 307l-9 10 6 7-12 10" />
          <path d="M185 513l13-9-3-7 9-4" />
          <path d="M285 465l12-8 7 8 10-7" />
        </g>

        {/* Mineral veins */}
        <path
          d="M359 314 C342 340 365 359 345 380 S365 422 340 450 S346 485 329 512"
          fill="none"
          stroke="#C4B5FD"
          strokeWidth="3"
          opacity=".7"
        />

        <path
          d="M359 314 C342 340 365 359 345 380 S365 422 340 450 S346 485 329 512"
          className={`${id}-flow`}
          fill="none"
          stroke="#EDE9FE"
          strokeWidth="1.3"
        />

        <path
          d="M393 346l-15 17 12 13-20 20"
          stroke="#C4B5FD"
          strokeWidth="2"
          fill="none"
          opacity=".6"
        />

        {/* Animated mineral glow */}
        <ellipse
          cx="362"
          cy="376"
          rx="37"
          ry="24"
          fill="#A78BFA"
          filter={`url(#${id}-glow)`}
          className={`${id}-glow`}
        />

        {/* Faceted apatite crystals */}
        <g className={`${id}-float`}>
          <g transform="translate(371 371)">
            <path d="M0-17L13-8L10 9L0 17L-11 8L-12-8Z" fill="#DDD6FE" stroke="#F5F3FF" strokeWidth="1.2" />
            <path d="M0-17L0 1L-12-8Z" fill="#FFFFFF" opacity=".6" />
            <path d="M0 1L13-8L10 9Z" fill="#8B5CF6" />
            <path d="M0 1L-11 8L0 17Z" fill="#6D28D9" />
          </g>

          <g transform="translate(407 389) scale(.65)">
            <path d="M0-17L13-8L10 9L0 17L-11 8L-12-8Z" fill="#C4B5FD" stroke="#F5F3FF" strokeWidth="1.5" />
            <path d="M0-17L0 1L-12-8Z" fill="#FFFFFF" opacity=".65" />
            <path d="M0 1L13-8L10 9Z" fill="#8B5CF6" />
            <path d="M0 1L-11 8L0 17Z" fill="#6D28D9" />
          </g>

          <g transform="translate(345 399) scale(.45)">
            <path d="M0-17L13-8L10 9L0 17L-11 8L-12-8Z" fill="#DDD6FE" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M0-17L0 1L-12-8Z" fill="#FFFFFF" opacity=".65" />
            <path d="M0 1L13-8L10 9Z" fill="#8B5CF6" />
          </g>
        </g>

        {/* Floating mineral particles */}
        {[
          [328, 361, 2.5],
          [396, 353, 2],
          [425, 375, 2.5],
          [388, 410, 1.7],
          [352, 429, 2.1],
          [415, 432, 1.8],
          [310, 392, 1.6],
        ].map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="#EDE9FE"
            className={`${id}-sparkle`}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}

        {/* Scan light, subtle */}
        <rect
          x="54"
          y="247"
          width="17"
          height="304"
          fill="#FFFFFF"
          opacity=".12"
          className={`${id}-scan`}
        />
      </g>

      {/* Top ground layer */}
      <path
        d="M54 247
           Q67 239 80 245
           T106 244 T134 246 T164 243 T194 245
           T224 243 T254 245 T284 243 T314 245
           T344 243 T374 245 T404 243 T434 245 T472 244"
        fill="none"
        stroke="#15803D"
        strokeWidth="2.2"
      />

      <rect
        x="54"
        y="247"
        width="418"
        height="304"
        rx="10"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        opacity=".85"
      />

      {/* Grass details */}
      <g stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round">
        <path d="M69 245l-3-7M74 245l3-9M87 244l-1-6" />
        <path d="M132 245l-3-8M137 245l4-7" />
        <path d="M196 245l-1-7M202 245l4-8" />
        <path d="M286 244l-3-8M293 245l4-8" />
        <path d="M389 245l-2-7M397 245l4-8" />
        <path d="M451 245l-2-7" />
      </g>

      {/* Layer labels */}
      <g fontWeight="800">
        <rect x="68" y="254" width="108" height="22" rx="7" fill="#573D2D" opacity=".88" />
        <text x="122" y="268.5" fontSize="10" fill="#FFFFFF" textAnchor="middle">
          01 · ĐẤT PHỦ
        </text>

        <rect x="68" y="304" width="143" height="22" rx="7" fill="#6F4F35" opacity=".9" />
        <text x="139.5" y="318.5" fontSize="10" fill="#FFFFFF" textAnchor="middle">
          02 · ĐÁ PHONG HÓA
        </text>

        <rect x="68" y="361" width="191" height="26" rx="8" fill="#352A49" opacity=".88" />
        <text x="163.5" y="372" fontSize="10" fill="#EDE9FE" textAnchor="middle">
          03 · VỈA QUẶNG APATITE
        </text>
        <text x="163.5" y="381.5" fontSize="8.4" fill="#DDD6FE" textAnchor="middle">
          Khoáng vật chứa phosphat
        </text>

        <rect x="68" y="429" width="211" height="27" rx="8" fill="#27283C" opacity=".92" />
        <text x="173.5" y="440" fontSize="10" fill="#F5F3FF" textAnchor="middle">
          04 · QUẶNG HÀM LƯỢNG THẤP HƠN
        </text>
        <text x="173.5" y="450" fontSize="8.5" fill="#C4B5FD" textAnchor="middle">
          Có thể cần tuyển, làm giàu
        </text>

        <text x="72" y="523" fontSize="10" fill="#CBD5E1">
          ĐÁ GỐC
        </text>
      </g>

      {/* Mineral annotation */}
      <path
        d="M399 355L430 333H456"
        fill="none"
        stroke="#DDD6FE"
        strokeWidth="1.3"
        strokeDasharray="3 3"
      />

      <circle cx="399" cy="355" r="3" fill="#EDE9FE" />

      <rect x="350" y="300" width="106" height="27" rx="8" fill="#F5F3FF" stroke="#DDD6FE" />
      <text x="403" y="311" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6D28D9">
        TINH THỂ KHOÁNG
      </text>
      <text x="403" y="320" textAnchor="middle" fontSize="8" fill="#7C3AED">
        Minh họa
      </text>

      {/* Geological legend */}
      <g transform="translate(65 572)">
        <circle cx="5" cy="0" r="5" fill="#A87B51" />
        <text x="15" y="4" fontSize="10" fontWeight="700" fill="#64748B">
          Đất phủ
        </text>

        <circle cx="112" cy="0" r="5" fill="#8B5CF6" />
        <text x="122" y="4" fontSize="10" fontWeight="700" fill="#64748B">
          Vỉa khoáng
        </text>

        <circle cx="234" cy="0" r="5" fill="#343443" />
        <text x="244" y="4" fontSize="10" fontWeight="700" fill="#64748B">
          Đá gốc
        </text>
      </g>

      <rect x="54" y="594" width="418" height="25" rx="8" fill="#F5F3FF" />

      <text x="263" y="610" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6D28D9">
        Khai thác → tuyển quặng → nguyên liệu sản xuất
      </text>

      {/* =====================================================
          03. RIGHT PANEL: FERTILIZER FACTORIES
      ===================================================== */}

      <g filter={`url(#${id}-shadow)`}>
        <rect
          x="508"
          y="136"
          width="462"
          height="500"
          rx="23"
          fill="#FFFFFF"
          stroke="#D1FAE5"
          strokeWidth="1.4"
        />
      </g>

      <rect x="529" y="155" width="38" height="38" rx="12" fill="#DCFCE7" />

      {/* Factory heading icon */}
      <g transform="translate(536 163)" stroke="#15803D" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M0 25V12L9 17V10L18 15V7L28 13V25Z" fill="#4ADE80" />
        <path d="M22 10V0H27V13" fill="#BBF7D0" />
        <path d="M5 21v-3M13 21v-3M21 21v-3" fill="none" />
      </g>

      <text x="579" y="171" fontSize="15" fontWeight="900" fill="#14532D">
        CỤM NHÀ MÁY PHÂN LÂN
      </text>
      <text x="579" y="188" fontSize="10.5" fontWeight="600" fill="#16A34A">
        CÁC CƠ SỞ TIÊU BIỂU TẠI VIỆT NAM
      </text>

      <rect x="868" y="160" width="80" height="27" rx="13.5" fill="#F0FDF4" />
      <text x="908" y="177" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#15803D">
        SẢN XUẤT
      </text>

      {/* Factory card 1 */}
      <g>
        <rect x="529" y="210" width="420" height="79" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
        <rect x="529" y="210" width="5" height="79" rx="2.5" fill="#22C55E" />

        <rect x="544" y="224" width="50" height="50" rx="13" fill="#DCFCE7" />

        <g transform="translate(551 232)">
          <path d="M0 30V14L10 20V13L20 19V9L32 16V30Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.1" strokeLinejoin="round" />
          <rect x="24" y="0" width="6" height="18" rx="1" fill="#15803D" />
          <rect x="5" y="23" width="4" height="5" rx=".8" fill="#F0FDF4" />
          <rect x="15" y="23" width="4" height="5" rx=".8" fill="#F0FDF4" />
          <rect x="25" y="23" width="4" height="5" rx=".8" fill="#F0FDF4" />
          <circle cx="31" cy="-2" r="3" fill="#94A3B8" className={`${id}-steam`} />
          <circle cx="38" cy="-7" r="3.5" fill="#CBD5E1" className={`${id}-steam`} style={{ animationDelay: ".9s" }} />
        </g>

        <text x="608" y="234" fontSize="12.5" fontWeight="900" fill="#1E293B">
          Supe Lân Lâm Thao
        </text>

        <text x="608" y="252" fontSize="10.5" fontWeight="600" fill="#64748B">
          Phú Thọ · Nhóm sản phẩm supe lân
        </text>

        <rect x="608" y="261" width="105" height="17" rx="8.5" fill="#F0FDF4" />
        <text x="660.5" y="272.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#15803D">
          PHÂN LÂN HÓA HỌC
        </text>

        <path d="M916 225v42" stroke="#E2E8F0" strokeDasharray="3 4" />
        <circle cx="916" cy="239" r="4" fill="#22C55E" />
        <circle cx="916" cy="253" r="4" fill="#86EFAC" />
      </g>

      {/* Factory card 2 */}
      <g>
        <rect x="529" y="298" width="420" height="79" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
        <rect x="529" y="298" width="5" height="79" rx="2.5" fill="#8B5CF6" />

        <rect x="544" y="312" width="50" height="50" rx="13" fill="#EDE9FE" />

        <g transform="translate(551 320)">
          <path d="M0 30V14L10 20V13L20 19V9L32 16V30Z" fill="#A78BFA" stroke="#7C3AED" strokeWidth="1.1" strokeLinejoin="round" />
          <rect x="24" y="0" width="6" height="18" rx="1" fill="#7C3AED" />
          <rect x="5" y="23" width="4" height="5" rx=".8" fill="#F5F3FF" />
          <rect x="15" y="23" width="4" height="5" rx=".8" fill="#F5F3FF" />
          <rect x="25" y="23" width="4" height="5" rx=".8" fill="#F5F3FF" />
          <circle cx="31" cy="-2" r="3" fill="#C4B5FD" className={`${id}-steam`} />
          <circle cx="38" cy="-7" r="3.5" fill="#DDD6FE" className={`${id}-steam`} style={{ animationDelay: "1.1s" }} />
        </g>

        <text x="608" y="322" fontSize="12.5" fontWeight="900" fill="#1E293B">
          Lân nung chảy Văn Điển
        </text>

        <text x="608" y="340" fontSize="10.5" fontWeight="600" fill="#64748B">
          Hà Nội · Nhóm sản phẩm lân nung chảy
        </text>

        <rect x="608" y="349" width="112" height="17" rx="8.5" fill="#F5F3FF" />
        <text x="664" y="360.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#7C3AED">
          PHÂN LÂN NUNG CHẢY
        </text>

        <path d="M916 313v42" stroke="#E2E8F0" strokeDasharray="3 4" />
        <circle cx="916" cy="327" r="4" fill="#8B5CF6" />
        <circle cx="916" cy="341" r="4" fill="#C4B5FD" />
      </g>

      {/* Factory card 3 */}
      <g>
        <rect x="529" y="386" width="420" height="79" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
        <rect x="529" y="386" width="5" height="79" rx="2.5" fill="#0EA5E9" />

        <rect x="544" y="400" width="50" height="50" rx="13" fill="#E0F2FE" />

        <g transform="translate(551 408)">
          <path d="M0 30V14L10 20V13L20 19V9L32 16V30Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.1" strokeLinejoin="round" />
          <rect x="24" y="0" width="6" height="18" rx="1" fill="#0284C7" />
          <rect x="5" y="23" width="4" height="5" rx=".8" fill="#F0F9FF" />
          <rect x="15" y="23" width="4" height="5" rx=".8" fill="#F0F9FF" />
          <rect x="25" y="23" width="4" height="5" rx=".8" fill="#F0F9FF" />
          <circle cx="31" cy="-2" r="3" fill="#7DD3FC" className={`${id}-steam`} />
          <circle cx="38" cy="-7" r="3.5" fill="#BAE6FD" className={`${id}-steam`} style={{ animationDelay: ".6s" }} />
        </g>

        <text x="608" y="410" fontSize="12.5" fontWeight="900" fill="#1E293B">
          Lân nung chảy Ninh Bình
        </text>

        <text x="608" y="428" fontSize="10.5" fontWeight="600" fill="#64748B">
          Ninh Bình · Nhóm sản phẩm lân nung chảy
        </text>

        <rect x="608" y="437" width="112" height="17" rx="8.5" fill="#F0F9FF" />
        <text x="664" y="448.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#0369A1">
          PHÂN LÂN NUNG CHẢY
        </text>

        <path d="M916 401v42" stroke="#E2E8F0" strokeDasharray="3 4" />
        <circle cx="916" cy="415" r="4" fill="#0EA5E9" />
        <circle cx="916" cy="429" r="4" fill="#7DD3FC" />
      </g>

      {/* Flow connector */}
      <path
        d="M550 480H927"
        fill="none"
        stroke="#86EFAC"
        strokeWidth="1.5"
        strokeDasharray="3 6"
        className={`${id}-flow`}
      />

      <circle cx="550" cy="480" r="4" fill="#22C55E" />
      <circle cx="927" cy="480" r="4" fill="#22C55E" />

      {/* =====================================================
          04. ENVIRONMENT & RESOURCE MANAGEMENT
      ===================================================== */}

      <rect x="529" y="493" width="420" height="119" rx="15" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.2" />

      <rect x="544" y="506" width="29" height="29" rx="9" fill="#FFEDD5" />

      <path
        d="M558 511l8 15h-16z"
        fill="#EA580C"
        stroke="#C2410C"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M558 516v4M558 523v.5"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <text x="583" y="518" fontSize="11.5" fontWeight="900" fill="#9A3412">
        THÁCH THỨC CẦN QUẢN LÝ
      </text>

      <text x="583" y="532" fontSize="9.5" fontWeight="600" fill="#C2410C">
        Khai thác và chế biến có trách nhiệm
      </text>

      {/* Environment item 1 */}
      <rect x="544" y="545" width="190" height="51" rx="10" fill="#FFFFFF" stroke="#FED7AA" />

      <circle cx="563" cy="563" r="10" fill="#FFEDD5" />

      <path
        d="M563 555C563 555 557 562 557 565a6 6 0 0012 0c0-3-6-10-6-10z"
        fill="#EA580C"
      />

      <text x="579" y="560" fontSize="9.5" fontWeight="800" fill="#7C2D12">
        Bùn thải, nước thải
      </text>
      <text x="579" y="574" fontSize="8.5" fill="#9A3412">
        Kiểm soát và xử lý phù hợp
      </text>
      <text x="579" y="585" fontSize="8.5" fill="#9A3412">
        trước khi thải ra môi trường
      </text>

      {/* Environment item 2 */}
      <rect x="744" y="545" width="190" height="51" rx="10" fill="#FFFFFF" stroke="#FED7AA" />

      <circle cx="763" cy="563" r="10" fill="#FFEDD5" />

      <g transform="translate(755 555)" fill="none" stroke="#EA580C" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 1l7 4v8l-7 4-7-4V5z" />
        <path d="M1 5l7 4 7-4M8 9v8" />
      </g>

      <text x="779" y="560" fontSize="9.5" fontWeight="800" fill="#7C2D12">
        Phụ phẩm công nghiệp
      </text>
      <text x="779" y="574" fontSize="8.5" fill="#9A3412">
        Đánh giá khả năng tái sử dụng
      </text>
      <text x="779" y="585" fontSize="8.5" fill="#9A3412">
        theo tiêu chuẩn an toàn
      </text>

      {/* =====================================================
          05. CONNECTOR: MINE -> INDUSTRY
      ===================================================== */}

      <g>
        <rect x="438" y="615" width="124" height="27" rx="13.5" fill="#F3E8FF" stroke="#DDD6FE" />

        <path d="M451 628h12m-4-4l4 4-4 4" fill="none" stroke="#7C3AED" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

        <text x="505" y="632" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#6D28D9">
          TUYỂN KHOÁNG
        </text>
      </g>

      {/* =====================================================
          06. TAKEAWAY BANNER
      ===================================================== */}

      <rect
        x="30"
        y="660"
        width="940"
        height="74"
        rx="19"
        fill="#F3EEFF"
        stroke="#C4B5FD"
        strokeWidth="1.3"
      />

      <circle cx="69" cy="697" r="23" fill="#DDD6FE" />

      {/* Sustainable mine icon */}
      <g transform="translate(54 682)" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M2 25L13 4L25 25Z"
          fill="#8B5CF6"
          stroke="#6D28D9"
          strokeWidth="1.3"
        />

        <path d="M13 4L17 15L13 25" fill="#C4B5FD" />

        <path
          d="M22 25V16"
          stroke="#15803D"
          strokeWidth="2"
        />

        <path
          d="M22 20C15 19 15 13 17 12C21 12 22 16 22 20Z"
          fill="#4ADE80"
          stroke="#15803D"
          strokeWidth="1"
        />

        <path
          d="M22 18C28 11 31 15 29 18C27 20 24 20 22 21Z"
          fill="#86EFAC"
          stroke="#15803D"
          strokeWidth="1"
        />
      </g>

      <text x="108" y="687" fontSize="13" fontWeight="900" fill="#5B21B6">
        KHAI THÁC ĐI ĐÔI VỚI CHẾ BIẾN SÂU
      </text>

      <text x="108" y="708" fontSize="11.5" fontWeight="600" fill="#6D28D9">
        Tối ưu thu hồi khoáng sản · tiết kiệm tài nguyên · giảm tác động môi trường
      </text>

      <line x1="690" y1="676" x2="690" y2="719" stroke="#C4B5FD" strokeWidth="1.2" />

      <g transform="translate(711 679)">
        <circle cx="8" cy="8" r="8" fill="#DCFCE7" />
        <path
          d="M4 8l3 3 5-6"
          stroke="#15803D"
          strokeWidth="1.7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x="23" y="11" fontSize="10" fontWeight="800" fill="#166534">
          Tài nguyên bền vững
        </text>
      </g>

      <g transform="translate(711 703)">
        <circle cx="8" cy="8" r="8" fill="#EDE9FE" />
        <path
          d="M8 3v10M3 8h10"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <text x="23" y="11" fontSize="10" fontWeight="800" fill="#5B21B6">
          Công nghệ phù hợp
        </text>
      </g>
    </svg>
  );
}
