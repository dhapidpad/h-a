
import React from "react";

export default function SvgSoilCompaction() {
  const id = `soil-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const uid = (name) => `${id}-${name}`;

  const healthyAggregates = [
    [82, 295, 13], [119, 310, 10], [171, 292, 12],
    [208, 316, 11], [309, 295, 13], [351, 318, 10],
    [388, 291, 12], [95, 357, 11], [144, 382, 13],
    [201, 366, 9], [317, 380, 12], [377, 361, 11],
    [84, 414, 10], [185, 423, 12], [339, 420, 11],
    [400, 425, 9],
  ];

  const compactClods = [
    [559, 285, 42, 19], [608, 283, 51, 22],
    [672, 286, 49, 20], [733, 282, 48, 21],
    [791, 286, 50, 20], [850, 283, 69, 22],
    [550, 319, 58, 24], [619, 318, 43, 20],
    [672, 321, 58, 22], [740, 318, 51, 20],
    [800, 322, 46, 21], [858, 318, 56, 22],
    [554, 355, 49, 21], [612, 353, 56, 23],
    [678, 354, 44, 21], [731, 355, 56, 22],
    [799, 356, 61, 22], [866, 354, 45, 20],
    [558, 394, 57, 24], [626, 392, 46, 23],
    [681, 393, 56, 22], [746, 392, 51, 23],
    [808, 394, 46, 21], [863, 392, 51, 22],
  ];

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
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      <title id={`${id}-title`}>
        So sánh đất tơi xốp và đất nén chặt, phân biệt thêm nguy cơ mặn
      </title>

      <desc id={`${id}-desc`}>
        Lát cắt đất tơi xốp có nhiều lỗ khí và bộ rễ phát triển.
        Lát cắt đất nén chặt có ít lỗ rỗng và rễ bị hạn chế.
        Các ion muối hòa tan là yếu tố riêng cần đánh giá bằng độ
        dẫn điện và chất lượng nước tưới.
      </desc>

      <defs>
        {/* ================= BACKGROUND ================= */}

        <linearGradient id={uid("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#FFF7ED" />
        </linearGradient>

        <linearGradient id={uid("healthySoil")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#79533B" />
          <stop offset="48%" stopColor="#60432F" />
          <stop offset="100%" stopColor="#47342A" />
        </linearGradient>

        <linearGradient id={uid("compactSoil")} x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#8B8179" />
          <stop offset="50%" stopColor="#71665E" />
          <stop offset="100%" stopColor="#514840" />
        </linearGradient>

        <linearGradient id={uid("grass")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>

        <linearGradient id={uid("leaf")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="55%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id={uid("stressedLeaf")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D9F99D" />
          <stop offset="100%" stopColor="#84CC16" />
        </linearGradient>

        <linearGradient id={uid("water")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        <linearGradient id={uid("healthyBanner")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#F0FDFA" />
        </linearGradient>

        <linearGradient id={uid("warningBanner")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFF7ED" />
          <stop offset="100%" stopColor="#FEF2F2" />
        </linearGradient>

        {/* ================= SOIL TEXTURES ================= */}

        <pattern
          id={uid("soilTexture")}
          width="32"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="7" cy="8" r="1.3" fill="#FDE68A" opacity=".2" />
          <circle cx="23" cy="20" r="1.5" fill="#1C1917" opacity=".2" />
          <path
            d="M13 4l4 2M3 23l4-1"
            stroke="#F5D0A9"
            strokeWidth="1"
            opacity=".24"
          />
        </pattern>

        <pattern
          id={uid("compactedTexture")}
          width="36"
          height="29"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M2 7l8-3 7 4M20 19l9-3 5 4"
            fill="none"
            stroke="#D6D3D1"
            strokeWidth="1"
            opacity=".17"
          />
          <circle cx="12" cy="22" r="1.3" fill="#292524" opacity=".22" />
        </pattern>

        {/* ================= SHADOWS ================= */}

        {/* ================= CLIPPING ================= */}

        <clipPath id={uid("healthyClip")}>
          <rect x="51" y="255" width="415" height="209" rx="10" />
        </clipPath>

        <clipPath id={uid("compactClip")}>
          <rect x="534" y="255" width="415" height="209" rx="10" />
        </clipPath>

        {/* ================= ANIMATION ================= */}

        <style>{`
          @keyframes ${uid("float")} {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }

          @keyframes ${uid("waterDrop")} {
            0% { transform: translateY(0); opacity: 0; }
            20% { opacity: .95; }
            85% { opacity: .95; }
            100% { transform: translateY(90px); opacity: 0; }
          }

          @keyframes ${uid("airBubble")} {
            0% { transform: translateY(10px); opacity: 0; }
            25% { opacity: .8; }
            100% { transform: translateY(-22px); opacity: 0; }
          }

          @keyframes ${uid("saltPulse")} {
            0%, 100% { opacity: .55; }
            50% { opacity: 1; }
          }

          @keyframes ${uid("rootPulse")} {
            0%, 100% { stroke-opacity: .8; }
            50% { stroke-opacity: 1; }
          }

          @keyframes ${uid("scan")} {
            0% { transform: translateX(-50px); opacity: 0; }
            20% { opacity: .13; }
            80% { opacity: .13; }
            100% { transform: translateX(430px); opacity: 0; }
          }

          .${uid("floating")} {
            animation: ${uid("float")} 4s ease-in-out infinite;
          }

          .${uid("waterMotion")} {
            animation: ${uid("waterDrop")} 3.2s ease-in infinite;
          }

          .${uid("airMotion")} {
            animation: ${uid("airBubble")} 3.7s ease-out infinite;
          }

          .${uid("saltMotion")} {
            animation: ${uid("saltPulse")} 2.5s ease-in-out infinite;
          }

          .${uid("rootMotion")} {
            animation: ${uid("rootPulse")} 3.5s ease-in-out infinite;
          }

          .${uid("scanMotion")} {
            animation: ${uid("scan")} 8s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .${uid("floating")},
            .${uid("waterMotion")},
            .${uid("airMotion")},
            .${uid("saltMotion")},
            .${uid("rootMotion")},
            .${uid("scanMotion")} {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* =====================================================
          01 · CANVAS / HEADING
      ===================================================== */}

      <rect width="1000" height="760" rx="28" fill={`url(#${uid("bg")})`} stroke="#FDE68A" strokeWidth="1.5" />

      <circle cx="951" cy="52" r="92" fill="#BBF7D0" opacity=".16" />
      <circle cx="918" cy="91" r="47" fill="#FDE68A" opacity=".15" />
      <circle cx="24" cy="597" r="65" fill="#CFFAFE" opacity=".16" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`gx-${i}`}
            x1={785 + i * 19}
            y1="15"
            x2={785 + i * 19}
            y2="109"
          />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line
            key={`gy-${i}`}
            x1="785"
            y1={20 + i * 24}
            x2="920"
            y2={20 + i * 24}
          />
        ))}
      </g>

      <rect x="34" y="27" width="7" height="24" rx="3.5" fill="#16A34A" />

      <text
        x="54"
        y="43"
        fontSize="13"
        fontWeight="900"
        letterSpacing="2"
        fill="#15803D"
      >
        KHOA HỌC ĐẤT · CẤU TRÚC VÙNG RỄ
      </text>

      <text
        x="34"
        y="81"
        fontSize="29"
        fontWeight="900"
        letterSpacing="-.8"
        fill="#172033"
      >
        ĐẤT TƠI XỐP
        <tspan fill="#64748B"> vs </tspan>
        <tspan fill="#B45309">ĐẤT CHAI CỨNG</tspan>
      </text>

      <text x="35" y="107" fontSize="12.5" fontWeight="500" fill="#64748B">
        Lỗ rỗng, oxy, độ thấm nước và ảnh hưởng đến bộ rễ
      </text>

      {/* =====================================================
          02 · LEFT PANEL: WELL-STRUCTURED SOIL
      ===================================================== */}

      <g>
        <rect
          x="30"
          y="135"
          width="455"
          height="493"
          rx="22"
          fill="#FFFFFF"
          stroke="#BBF7D0"
          strokeWidth="1.4"
        />
      </g>

      {/* Panel header */}
      <rect x="50" y="153" width="37" height="37" rx="11" fill="#DCFCE7" />

      <g
        transform="translate(57 160)"
        stroke="#15803D"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 23V9L12 15V8L22 14V23Z" fill="#4ADE80" />
        <path d="M12 15V25M5 23V19M18 23V18" fill="none" />
      </g>

      <text x="99" y="169" fontSize="14" fontWeight="900" fill="#166534">
        ĐẤT CÂN BẰNG, TƠI XỐP
      </text>

      <text x="99" y="186" fontSize="13" fontWeight="600" fill="#16A34A">
        NHIỀU LỖ RỖNG · RỄ PHÁT TRIỂN
      </text>

      <rect x="362" y="158" width="104" height="27" rx="13.5" fill="#F0FDF4" />

      <circle cx="376" cy="171.5" r="4" fill="#22C55E" />

      <text x="386" y="175.5" fontSize="12.5" fontWeight="900" fill="#15803D">
        THOÁNG KHÍ
      </text>

      {/* Soil scene */}
      <rect x="51" y="210" width="415" height="254" rx="14" fill="#F0FDF4" />

      <text x="66" y="229" fontSize="12.5" fontWeight="800" fill="#64748B">
        MẶT CẮT VÙNG RỄ
      </text>

      <g clipPath={`url(#${uid("healthyClip")})`}>
        {/* Main soil body */}
        <rect x="51" y="255" width="415" height="209" fill={`url(#${uid("healthySoil")})`} />

        <rect x="51" y="255" width="415" height="209" fill={`url(#${uid("soilTexture")})`} />

        {/* Organic-rich upper layer */}
        <path
          d="M51 269Q100 262 153 269T260 267T367 267T466 269V300H51Z"
          fill="#6B482F"
          opacity=".7"
        />

        {/* Soil aggregates */}
        {healthyAggregates.map(([x, y, r], i) => (
          <g key={`aggregate-${i}`}>
            <circle
              cx={x}
              cy={y}
              r={r}
              fill={i % 2 === 0 ? "#856044" : "#79563A"}
              stroke="#A77B52"
              strokeWidth="1"
              opacity=".96"
            />

            <path
              d={`M${x - r * 0.45} ${y - r * 0.32}q${r * 0.35} ${-r * 0.3} ${r * 0.65} 0`}
              fill="none"
              stroke="#D6B28D"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity=".65"
            />
          </g>
        ))}

        {/* Air-filled pores */}
        {[
          [106, 286, 6, 4],
          [155, 326, 7, 5],
          [205, 296, 6, 5],
          [294, 311, 7, 5],
          [380, 300, 6, 4],
          [121, 390, 6, 5],
          [208, 408, 7, 4],
          [315, 387, 6, 5],
          [397, 416, 6, 4],
        ].map(([x, y, rx, ry], i) => (
          <ellipse
            key={`pore-${i}`}
            cx={x}
            cy={y}
            rx={rx}
            ry={ry}
            fill="#BAE6FD"
            stroke="#38BDF8"
            strokeWidth=".9"
            opacity=".9"
          />
        ))}

        {/* Plant roots behind soil details */}
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={uid("rootMotion")}
        >
          <path
            d="M257 265C255 302 261 337 257 376S260 423 257 449"
            stroke="#FDE68A"
            strokeWidth="4"
          />

          <path
            d="M258 294C238 310 227 329 216 349S199 379 186 389"
            stroke="#F5DEB3"
            strokeWidth="3"
          />

          <path
            d="M258 319C279 333 292 352 303 369S323 390 339 400"
            stroke="#F5DEB3"
            strokeWidth="3"
          />

          <path
            d="M218 346Q198 346 184 334M204 369Q220 371 227 384M297 358Q316 347 333 350M319 387Q304 397 297 412"
            stroke="#E8C99A"
            strokeWidth="2"
          />

          <path
            d="M257 365Q243 381 240 402M259 390Q274 402 280 425M258 413Q247 425 245 442"
            stroke="#E8C99A"
            strokeWidth="1.8"
          />

          <path
            d="M237 329Q225 320 219 312M226 352Q212 348 207 340M300 354Q311 371 326 375M278 401Q292 411 293 425"
            stroke="#F5DEB3"
            strokeWidth="1.7"
          />
        </g>

        {/* Soil surface grass */}
        <rect x="51" y="255" width="415" height="9" fill={`url(#${uid("grass")})`} />

        <path
          d="M51 260Q65 255 79 260T107 260T135 260T163 260T191 260T219 260T247 260T275 260T303 260T331 260T359 260T387 260T415 260T443 260T466 260"
          fill="none"
          stroke="#15803D"
          strokeWidth="1.4"
        />

        {/* Roots extend from stem under soil surface */}
        <path
          d="M257 256V271"
          stroke="#D9F99D"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Animated infiltrating water */}
        {[
          { x: 144, y: 278, delay: "0s" },
          { x: 177, y: 296, delay: ".9s" },
          { x: 365, y: 277, delay: "1.5s" },
          { x: 338, y: 317, delay: ".5s" },
        ].map((drop, i) => (
          <g
            key={`water-${i}`}
            className={uid("waterMotion")}
            style={{ animationDelay: drop.delay }}
          >
            <path
              d={`M${drop.x} ${drop.y}c0-2 3-6 3-6s3 4 3 6a3 3 0 11-6 0Z`}
              fill="#7DD3FC"
              stroke="#E0F2FE"
              strokeWidth=".8"
            />
          </g>
        ))}

        {/* Animated air bubbles */}
        {[
          { x: 105, y: 368, delay: ".2s" },
          { x: 348, y: 407, delay: "1s" },
          { x: 385, y: 363, delay: "1.7s" },
        ].map((bubble, i) => (
          <circle
            key={`air-${i}`}
            cx={bubble.x}
            cy={bubble.y}
            r="4"
            fill="#BAE6FD"
            stroke="#7DD3FC"
            strokeWidth="1"
            className={uid("airMotion")}
            style={{ animationDelay: bubble.delay }}
          />
        ))}

        {/* Soil scan */}
        <rect
          x="51"
          y="255"
          width="14"
          height="209"
          fill="#FFFFFF"
          className={uid("scanMotion")}
        />
      </g>

      {/* Healthy stem + leaves above soil */}
      <g className={uid("floating")}>
        <path
          d="M257 255C257 244 258 235 258 229"
          fill="none"
          stroke="#15803D"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M257 242C238 240 228 227 231 220C243 218 253 228 257 242Z"
          fill={`url(#${uid("leaf")})`}
          stroke="#15803D"
          strokeWidth="1.2"
        />

        <path
          d="M258 235C268 216 287 217 291 224C286 238 270 241 258 235Z"
          fill={`url(#${uid("leaf")})`}
          stroke="#15803D"
          strokeWidth="1.2"
        />

        <path
          d="M257 242L238 226M258 235L282 224"
          fill="none"
          stroke="#DCFCE7"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>

      {/* Oxygen / water mini labels */}
      <rect x="63" y="276" width="48" height="20" rx="10" fill="#E0F2FE" stroke="#7DD3FC" />

      <circle cx="74" cy="286" r="3" fill="#0284C7" />

      <text x="82" y="289.5" fontSize="12.5" fontWeight="900" fill="#075985">
        O₂
      </text>

      <rect x="391" y="278" width="59" height="20" rx="10" fill="#DBEAFE" stroke="#93C5FD" />

      <text x="420.5" y="291.5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#1D4ED8">
        THẤM
      </text>

      {/* Healthy caption */}
      <rect x="51" y="480" width="415" height="40" rx="11" fill="#ECFDF5" stroke="#BBF7D0" />

      <circle cx="69" cy="500" r="8" fill="#DCFCE7" />

      <path
        d="M65 500l3 3 5-6"
        fill="none"
        stroke="#15803D"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text x="84" y="496" fontSize="13" fontWeight="900" fill="#166534">
        Nhiều lỗ rỗng lớn
      </text>

      <text x="84" y="510" fontSize="12.5" fill="#166534">
        Không khí, nước và rễ có đường di chuyển.
      </text>

      {/* Healthy soil detail chips */}
      <g>
        <rect x="51" y="531" width="130" height="36" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />

        <circle cx="66" cy="549" r="6" fill="#BAE6FD" />

        <text x="78" y="546" fontSize="12.5" fontWeight="900" fill="#166534">
          THOÁNG KHÍ
        </text>

        <text x="78" y="558" fontSize="12.5" fill="#64748B">
          O₂ lưu thông
        </text>

        <rect x="191" y="531" width="130" height="36" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />

        <circle cx="206" cy="549" r="6" fill="#7DD3FC" />

        <text x="218" y="546" fontSize="12.5" fontWeight="900" fill="#075985">
          THẤM NƯỚC
        </text>

        <text x="218" y="558" fontSize="12.5" fill="#64748B">
          Dẫn nước xuống
        </text>

        <rect x="331" y="531" width="135" height="36" rx="10" fill="#FFFFFF" stroke="#E2E8F0" />

        <circle cx="346" cy="549" r="6" fill="#FDE68A" />

        <text x="358" y="546" fontSize="12.5" fontWeight="900" fill="#92400E">
          RỄ DỄ LAN
        </text>

        <text x="358" y="558" fontSize="12.5" fill="#64748B">
          Mở rộng vùng hút
        </text>
      </g>

      <text x="53" y="594" fontSize="12.5" fontWeight="600" fill="#64748B">
        Mục tiêu: duy trì cấu trúc viên đất ổn định và giàu hữu cơ.
      </text>

      {/* =====================================================
          03 · RIGHT PANEL: COMPACTION + SALINITY
      ===================================================== */}

      <g>
        <rect
          x="515"
          y="135"
          width="455"
          height="493"
          rx="22"
          fill="#FFFFFF"
          stroke="#FED7AA"
          strokeWidth="1.4"
        />
      </g>

      {/* Panel header */}
      <rect x="535" y="153" width="37" height="37" rx="11" fill="#FEF3C7" />

      <g
        transform="translate(543 161)"
        fill="none"
        stroke="#B45309"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 4L9 9L5 15L13 20L10 27" />
        <path d="M20 3L18 10L24 16L20 23" />
      </g>

      <text x="584" y="169" fontSize="14" fontWeight="900" fill="#92400E">
        ĐẤT NÉN CHẶT
      </text>

      <text x="584" y="186" fontSize="13" fontWeight="600" fill="#B45309">
        ÍT LỖ RỖNG · RỄ KHÓ XUYÊN QUA
      </text>

      <rect x="854" y="158" width="96" height="27" rx="13.5" fill="#FFF7ED" />

      <circle cx="868" cy="171.5" r="4" fill="#D97706" />

      <text x="878" y="175.5" fontSize="12.5" fontWeight="900" fill="#9A3412">
        VẬT LÝ ĐẤT
      </text>

      {/* Right soil scene */}
      <rect x="534" y="210" width="415" height="254" rx="14" fill="#FFF7ED" />

      <text x="549" y="229" fontSize="12.5" fontWeight="800" fill="#64748B">
        MẶT CẮT VÙNG RỄ
      </text>

      <g clipPath={`url(#${uid("compactClip")})`}>
        {/* Main compacted soil */}
        <rect x="534" y="255" width="415" height="209" fill={`url(#${uid("compactSoil")})`} />

        <rect x="534" y="255" width="415" height="209" fill={`url(#${uid("compactedTexture")})`} />

        {/* Dense soil plates */}
        {compactClods.map(([x, y, w, h], i) => (
          <g key={`clod-${i}`}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx="5"
              fill={i % 2 === 0 ? "#75695F" : "#665B52"}
              stroke="#A8A29E"
              strokeWidth=".7"
              opacity=".92"
            />

            <path
              d={`M${x + 7} ${y + 5}h${Math.max(7, w - 19)}`}
              fill="none"
              stroke="#D6D3D1"
              strokeWidth="1"
              opacity=".27"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* Compacted layer boundaries */}
        <path
          d="M534 306Q630 299 733 307T949 304"
          fill="none"
          stroke="#57534E"
          strokeWidth="3"
          opacity=".7"
        />

        <path
          d="M534 374Q640 367 739 375T949 371"
          fill="none"
          stroke="#57534E"
          strokeWidth="3"
          opacity=".7"
        />

        {/* Cracks, not salt channels */}
        <g
          fill="none"
          stroke="#3F3833"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
        >
          <path d="M574 264L581 291L568 310L584 333" />
          <path d="M618 314L610 334L622 351" />
          <path d="M844 264L835 289L849 309L837 326" />
          <path d="M891 375L881 393L893 410" />
        </g>

        {/* Plant root, visibly stunted */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M741 266C740 289 745 310 742 334"
            stroke="#D6B58D"
            strokeWidth="3.2"
          />

          <path
            d="M742 300Q730 309 725 319"
            stroke="#C4A484"
            strokeWidth="2"
          />

          <path
            d="M742 317Q756 326 759 337"
            stroke="#C4A484"
            strokeWidth="1.9"
          />

          <path
            d="M725 319l-4 9M759 337l6 5"
            stroke="#C4A484"
            strokeWidth="1.5"
          />
        </g>

        {/* Dissolved salt ions, separate from physical compaction */}
        {[
          [577, 340, "Cl⁻"],
          [643, 293, "K⁺"],
          [826, 343, "Cl⁻"],
          [878, 300, "K⁺"],
          [603, 405, "Cl⁻"],
          [800, 411, "Cl⁻"],
        ].map(([x, y, ion], i) => (
          <g
            key={`ion-${i}`}
            className={uid("saltMotion")}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <circle
              cx={x}
              cy={y}
              r="10"
              fill={ion === "Cl⁻" ? "#FEE2E2" : "#FFEDD5"}
              stroke={ion === "Cl⁻" ? "#F87171" : "#FB923C"}
              strokeWidth="1"
            />

            <text
              x={x}
              y={y + 3}
              textAnchor="middle"
              fontSize="12"
              fontWeight="900"
              fill={ion === "Cl⁻" ? "#B91C1C" : "#9A3412"}
            >
              {ion}
            </text>
          </g>
        ))}

        {/* Surface water ponding to suggest low infiltration */}
        <path
          d="M534 259Q557 251 580 258T626 257T672 259T718 257T764 259T810 257T856 259T902 257T949 259V267H534Z"
          fill={`url(#${uid("water")})`}
          opacity=".9"
        />

        <path
          d="M534 259Q557 251 580 258T626 257T672 259T718 257T764 259T810 257T856 259T902 257T949 259"
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="1.7"
        />

        {/* Root-zone stress halo */}
        <ellipse
          cx="742"
          cy="323"
          rx="34"
          ry="35"
          fill="#FCA5A5"
          opacity=".14"
        />

        {/* Surface annotation scan */}
        <rect
          x="534"
          y="255"
          width="14"
          height="209"
          fill="#FFFFFF"
          className={uid("scanMotion")}
        />
      </g>

      {/* Stressed plant stem and drooping leaves */}
      <g className={uid("floating")}>
        <path
          d="M741 255Q741 245 742 236"
          fill="none"
          stroke="#65A30D"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        <path
          d="M741 244Q727 228 712 237Q721 249 741 244Z"
          fill={`url(#${uid("stressedLeaf")})`}
          stroke="#65A30D"
          strokeWidth="1.1"
        />

        <path
          d="M742 240Q754 228 770 240Q758 249 742 240Z"
          fill="#BEF264"
          stroke="#65A30D"
          strokeWidth="1.1"
        />

        <path
          d="M741 244L719 239M742 240L765 240"
          fill="none"
          stroke="#F7FEE7"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* Water pooling annotation */}
      <rect x="548" y="276" width="107" height="22" rx="8" fill="#E0F2FE" stroke="#7DD3FC" />

      <text x="601.5" y="290.5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#075985">
        NƯỚC THẤM CHẬM
      </text>

      {/* Compaction layer annotation */}
      <path
        d="M783 330L815 318H923"
        fill="none"
        stroke="#E7E5E4"
        strokeWidth="1.2"
        strokeDasharray="3 4"
      />

      <rect x="816" y="306" width="111" height="23" rx="8" fill="#F5F5F4" stroke="#D6D3D1" />

      <text x="871.5" y="321" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#57534E">
        LỚP NÉN CHẶT
      </text>

      {/* Salt annotation */}
      <rect x="806" y="415" width="120" height="22" rx="8" fill="#FEF2F2" stroke="#FCA5A5" />

      <text x="866" y="429.5" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#B91C1C">
        Cl⁻ HÒA TAN
      </text>

      <path
        d="M806 426L786 426L786 413"
        fill="none"
        stroke="#F87171"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />

      {/* Right soil label */}
      <rect x="549" y="445" width="385" height="19" rx="9.5" fill="#44403C" opacity=".88" />

      <text
        x="741.5"
        y="458"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="800"
        fill="#FFFFFF"
      >
        Ít lỗ rỗng lớn · Rễ khó xuyên qua tầng đất chặt
      </text>

      {/* Right diagnostic note */}
      <rect x="534" y="480" width="415" height="40" rx="11" fill="#FFF7ED" stroke="#FED7AA" />

      <circle cx="552" cy="500" r="8" fill="#FFEDD5" />

      <path
        d="M552 495V501M552 505v.5"
        fill="none"
        stroke="#C2410C"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <text x="567" y="496" fontSize="13" fontWeight="900" fill="#9A3412">
        NÉN CHẶT ≠ MẶN
      </text>

      <text x="567" y="510" fontSize="12.5" fill="#9A3412">
        Hai vấn đề có thể cùng xuất hiện nhưng không phải một.
      </text>

      {/* Two independent problems */}
      <g>
        <rect x="534" y="531" width="199" height="36" rx="10" fill="#F5F5F4" stroke="#D6D3D1" />

        <circle cx="549" cy="549" r="6" fill="#A8A29E" />

        <text x="561" y="546" fontSize="12.5" fontWeight="900" fill="#44403C">
          NÉN CHẶT
        </text>

        <text x="561" y="558" fontSize="12.5" fill="#64748B">
          Áp lực cơ học lên đất
        </text>

        <rect x="742" y="531" width="207" height="36" rx="10" fill="#FEF2F2" stroke="#FECACA" />

        <circle cx="757" cy="549" r="6" fill="#F87171" />

        <text x="769" y="546" fontSize="12.5" fontWeight="900" fill="#991B1B">
          ĐỘ MẶN
        </text>

        <text x="769" y="558" fontSize="12.5" fill="#64748B">
          Muối hòa tan dư thừa
        </text>
      </g>

      <text x="536" y="594" fontSize="12.5" fontWeight="600" fill="#64748B">
        KCl quá mức có thể tăng tải lượng muối, không trực tiếp gây nén đất.
      </text>

      {/* =====================================================
          04 · FOOTER: SOLUTIONS
      ===================================================== */}

      <rect
        x="30"
        y="651"
        width="940"
        height="84"
        rx="19"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="1.3"
      />

      <circle cx="69" cy="692" r="23" fill="#DCFCE7" />

      <g
        transform="translate(54 677)"
        fill="none"
        stroke="#15803D"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 27V13" />
        <path d="M15 18C4 18 3 8 6 5C13 5 15 11 15 18Z" fill="#4ADE80" />
        <path d="M15 15C26 15 28 6 25 3C18 3 15 9 15 15Z" fill="#86EFAC" />
        <path d="M5 29H25" />
        <path d="M9 29L6 32M21 29L24 32" />
      </g>

      <text x="108" y="680" fontSize="12.5" fontWeight="900" fill="#172033">
        GIẢI PHÁP PHẢI ĐÚNG NGUYÊN NHÂN
      </text>

      <text x="108" y="699" fontSize="13" fontWeight="600" fill="#64748B">
        Cải thiện cấu trúc đất và quản lý muối là hai quy trình riêng.
      </text>

      <text x="108" y="716" fontSize="12.5" fill="#64748B">
        Không tự động thay KCl bằng K₂SO₄ để xử lý đất chai cứng.
      </text>

      <line x1="492" y1="665" x2="492" y2="721" stroke="#E2E8F0" strokeWidth="1.2" />

      {/* Soil structure solution */}
      <g transform="translate(510 670)">
        <rect width="215" height="47" rx="11" fill={`url(#${uid("healthyBanner")})`} stroke="#BBF7D0" />

        <circle cx="17" cy="16" r="8" fill="#DCFCE7" />

        <path
          d="M13 16l3 3 5-6"
          fill="none"
          stroke="#15803D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x="31" y="19" fontSize="12.5" fontWeight="900" fill="#166534">
          CẤU TRÚC ĐẤT
        </text>

        <text x="12" y="34" fontSize="12.5" fontWeight="600" fill="#166534">
          Hữu cơ · hạn chế nén · che phủ
        </text>
      </g>

      {/* Salinity solution */}
      <g transform="translate(737 670)">
        <rect width="213" height="47" rx="11" fill={`url(#${uid("warningBanner")})`} stroke="#FED7AA" />

        <circle cx="17" cy="16" r="8" fill="#FFEDD5" />

        <path
          d="M17 10C17 10 12 16 12 18A5 5 0 0022 18C22 16 17 10 17 10Z"
          fill="#F97316"
        />

        <text x="31" y="19" fontSize="12.5" fontWeight="900" fill="#9A3412">
          QUẢN LÝ ĐỘ MẶN
        </text>

        <text x="12" y="34" fontSize="12.5" fontWeight="600" fill="#9A3412">
          Đo EC · kiểm tra nước · thoát nước
        </text>
      </g>
    </svg>
  );
}
