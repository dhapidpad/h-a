
import React from "react";

export default function SvgStomataShield() {
  const id = `stoma-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const c = (name) => `${id}-${name}`;

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
        Vai trò của kali đối với khí khổng và vận chuyển đường trong cây
      </title>

      <desc id={`${id}-desc`}>
        Mô phỏng K+ đi vào tế bào bảo vệ, nước di chuyển theo thẩm
        thấu khiến khí khổng mở. Bên phải minh họa sản phẩm quang hợp
        được vận chuyển qua mạch rây tới các cơ quan sử dụng và dự trữ.
      </desc>

      <defs>
        {/* ================= GRADIENTS ================= */}

        <linearGradient id={c("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="52%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>

        <linearGradient id={c("cell")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="48%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>

        <linearGradient id={c("cellLight")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#A7F3D0" />
        </linearGradient>

        <linearGradient id={c("pore")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        <linearGradient id={c("potassium")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="52%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id={c("fruit")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="45%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>

        <linearGradient id={c("leaf")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="50%" stopColor="#4ADE80" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>

        <linearGradient id={c("tuber")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D6B58D" />
          <stop offset="52%" stopColor="#A87546" />
          <stop offset="100%" stopColor="#754622" />
        </linearGradient>

        <linearGradient id={c("banner")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="52%" stopColor="#F0FDFA" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>

        {/* ================= FILTERS ================= */}

        <filter
          id={c("shadow")}
          x="-20%"
          y="-20%"
          width="140%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="11"
            floodColor="#0F172A"
            floodOpacity=".075"
          />
        </filter>

        <filter
          id={c("glow")}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>

        <filter
          id={c("softGlow")}
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur stdDeviation="2.5" />
        </filter>

        {/* ================= ARROWHEADS ================= */}

        <marker
          id={c("greenArrow")}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0L6 3L0 6Z" fill="#16A34A" />
        </marker>

        <marker
          id={c("blueArrow")}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0L6 3L0 6Z" fill="#0284C7" />
        </marker>

        <marker
          id={c("waterArrow")}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0L6 3L0 6Z" fill="#38BDF8" />
        </marker>

        <marker
          id={c("orangeArrow")}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0L6 3L0 6Z" fill="#D97706" />
        </marker>

        {/* ================= ANIMATION SYSTEM ================= */}

        <style>{`
          @keyframes ${c("ionsIn")} {
            0%, 100% { transform: translateX(0); }
            55% { transform: translateX(26px); }
          }

          @keyframes ${c("ionsInRight")} {
            0%, 100% { transform: translateX(0); }
            55% { transform: translateX(-26px); }
          }

          @keyframes ${c("waterIn")} {
            0%, 100% { transform: translateX(0); opacity: .45; }
            65% { transform: translateX(18px); opacity: 1; }
          }

          @keyframes ${c("waterInRight")} {
            0%, 100% { transform: translateX(0); opacity: .45; }
            65% { transform: translateX(-18px); opacity: 1; }
          }

          @keyframes ${c("poreOpen")} {
            0%, 15%, 100% {
              transform: scaleX(.72);
              opacity: .68;
            }
            50%, 72% {
              transform: scaleX(1.12);
              opacity: 1;
            }
          }

          @keyframes ${c("gasDown")} {
            0%, 100% { transform: translateY(-3px); opacity: .55; }
            55% { transform: translateY(8px); opacity: 1; }
          }

          @keyframes ${c("gasUp")} {
            0%, 100% { transform: translateY(5px); opacity: .45; }
            55% { transform: translateY(-7px); opacity: 1; }
          }

          @keyframes ${c("dashFlow")} {
            to { stroke-dashoffset: -90; }
          }

          @keyframes ${c("sugarFlow")} {
            0% { transform: translateX(0); opacity: 0; }
            12% { opacity: 1; }
            88% { opacity: 1; }
            100% { transform: translateX(62px); opacity: 0; }
          }

          @keyframes ${c("softPulse")} {
            0%, 100% { transform: scale(1); opacity: .85; }
            50% { transform: scale(1.065); opacity: 1; }
          }

          @keyframes ${c("float")} {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }

          @keyframes ${c("sparkle")} {
            0%, 100% { opacity: .3; }
            50% { opacity: 1; }
          }

          .${c("ionsLeft")} {
            animation: ${c("ionsIn")} 2.8s ease-in-out infinite;
          }

          .${c("ionsRight")} {
            animation: ${c("ionsInRight")} 2.8s ease-in-out infinite;
          }

          .${c("waterLeft")} {
            animation: ${c("waterIn")} 2.5s ease-in-out infinite;
          }

          .${c("waterRight")} {
            animation: ${c("waterInRight")} 2.5s ease-in-out infinite;
          }

          .${c("poreMotion")} {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${c("poreOpen")} 4.5s ease-in-out infinite;
          }

          .${c("gasIn")} {
            animation: ${c("gasDown")} 3.2s ease-in-out infinite;
          }

          .${c("gasOut")} {
            animation: ${c("gasUp")} 3.2s ease-in-out infinite;
          }

          .${c("flow")} {
            stroke-dasharray: 5 8;
            animation: ${c("dashFlow")} 5s linear infinite;
          }

          .${c("sugar")} {
            animation: ${c("sugarFlow")} 3.4s linear infinite;
          }

          .${c("pulse")} {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${c("softPulse")} 3.2s ease-in-out infinite;
          }

          .${c("float")} {
            animation: ${c("float")} 4s ease-in-out infinite;
          }

          .${c("sparkle")} {
            animation: ${c("sparkle")} 2.5s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .${c("ionsLeft")},
            .${c("ionsRight")},
            .${c("waterLeft")},
            .${c("waterRight")},
            .${c("poreMotion")},
            .${c("gasIn")},
            .${c("gasOut")},
            .${c("flow")},
            .${c("sugar")},
            .${c("pulse")},
            .${c("float")},
            .${c("sparkle")} {
              animation: none !important;
            }
          }
        `}</style>
      </defs>

      {/* =====================================================
          01 · BACKGROUND & TITLE
      ===================================================== */}

      <rect width="1000" height="760" rx="28" fill={`url(#${c("bg")})`} />

      <circle cx="949" cy="54" r="94" fill="#BBF7D0" opacity=".15" />
      <circle cx="920" cy="92" r="51" fill="#C4B5FD" opacity=".15" />
      <circle cx="20" cy="597" r="65" fill="#FDE68A" opacity=".1" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`gridx-${i}`}
            x1={755 + i * 21}
            y1="16"
            x2={755 + i * 21}
            y2="111"
          />
        ))}
        {Array.from({ length: 4 }, (_, i) => (
          <line
            key={`gridy-${i}`}
            x1="755"
            y1={20 + i * 25}
            x2="932"
            y2={20 + i * 25}
          />
        ))}
      </g>

      <rect x="35" y="27" width="7" height="24" rx="3.5" fill="#D97706" />

      <text
        x="55"
        y="43"
        fontSize="11"
        fontWeight="900"
        letterSpacing="2"
        fill="#B45309"
      >
        DINH DƯỠNG KHOÁNG · SINH LÝ THỰC VẬT
      </text>

      <text
        x="35"
        y="82"
        fontSize="30"
        fontWeight="900"
        letterSpacing="-.9"
        fill="#172B24"
      >
        KALI
        <tspan fill="#16A34A"> — BỘ ĐIỀU TIẾT</tspan>
      </text>

      <text
        x="36"
        y="108"
        fontSize="13"
        fontWeight="500"
        fill="#64748B"
      >
        Từ kiểm soát khí khổng đến vận chuyển sản phẩm quang hợp
      </text>

      <g transform="translate(790 91)">
        <circle cx="0" cy="0" r="4" fill="#F59E0B" />
        <text x="10" y="4" fontSize="10" fontWeight="800" fill="#64748B">
          K⁺
        </text>

        <circle cx="54" cy="0" r="4" fill="#38BDF8" />
        <text x="64" y="4" fontSize="10" fontWeight="800" fill="#64748B">
          H₂O
        </text>

        <circle cx="126" cy="0" r="4" fill="#22C55E" />
        <text x="136" y="4" fontSize="10" fontWeight="800" fill="#64748B">
          ĐƯỜNG
        </text>
      </g>

      {/* =====================================================
          02 · LEFT CARD — STOMATAL GATE
      ===================================================== */}

      <g filter={`url(#${c("shadow")})`}>
        <rect
          x="28"
          y="135"
          width="462"
          height="500"
          rx="23"
          fill="#FFFFFF"
          stroke="#D1FAE5"
          strokeWidth="1.4"
        />
      </g>

      {/* Header */}
      <rect x="49" y="154" width="38" height="38" rx="12" fill="#FEF3C7" />

      <g
        transform="translate(57 161)"
        fill="none"
        stroke="#B45309"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 17C-1 8 6 1 13 2C18 2 20 8 20 13" />
        <path d="M4 17L9 22L24 7" />
        <path d="M15 23h11" />
      </g>

      <text x="100" y="171" fontSize="15" fontWeight="900" fill="#166534">
        CỔNG KHÍ KHỔNG
      </text>

      <text x="100" y="188" fontSize="10.5" fontWeight="600" fill="#65A30D">
        K⁺ · THẨM THẤU · ÁP SUẤT TRƯƠNG
      </text>

      <rect x="364" y="159" width="105" height="26" rx="13" fill="#F0FDF4" />
      <circle cx="378" cy="172" r="4" fill="#22C55E" />

      <text x="388" y="175.5" fontSize="9.5" fontWeight="800" fill="#15803D">
        ĐANG MỞ
      </text>

      {/* Microscopic stage */}
      <rect
        x="48"
        y="210"
        width="422"
        height="282"
        rx="17"
        fill="#F0FDF4"
        stroke="#DCFCE7"
      />

      {/* Subtle stage decoration */}
      <circle cx="93" cy="265" r="26" fill="#BBF7D0" opacity=".2" />
      <circle cx="426" cy="432" r="38" fill="#A7F3D0" opacity=".18" />

      <text x="65" y="234" fontSize="10" fontWeight="800" fill="#64748B">
        PHÓNG ĐẠI BỀ MẶT LÁ
      </text>

      {/* CO2 entry route */}
      <text
        x="261"
        y="237"
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#0369A1"
      >
        CO₂
      </text>

      <text
        x="261"
        y="249"
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="#0284C7"
      >
        ĐI VÀO
      </text>

      <path
        d="M261 253V282"
        fill="none"
        stroke="#0284C7"
        strokeWidth="2.5"
        strokeLinecap="round"
        markerEnd={`url(#${c("blueArrow")})`}
      />

      <path
        d="M261 253V282"
        fill="none"
        stroke="#7DD3FC"
        strokeWidth="1"
        strokeDasharray="3 5"
        className={c("flow")}
      />

      {/* Water vapour exiting */}
      <path
        d="M282 302V263"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2.2"
        strokeLinecap="round"
        markerEnd={`url(#${c("waterArrow")})`}
      />

      <g className={c("gasOut")}>
        <circle cx="282" cy="292" r="3" fill="#38BDF8" />
        <circle cx="288" cy="280" r="2" fill="#7DD3FC" />
      </g>

      <text x="299" y="265" fontSize="10" fontWeight="800" fill="#0284C7">
        H₂O
      </text>
      <text x="299" y="277" fontSize="9" fontWeight="600" fill="#0284C7">
        Hơi nước thoát
      </text>

      {/* Glowing pore behind the guard cells */}
      <ellipse
        cx="261"
        cy="354"
        rx="14"
        ry="58"
        fill="#38BDF8"
        opacity=".22"
        filter={`url(#${c("glow")})`}
      />

      <ellipse
        cx="261"
        cy="354"
        rx="10"
        ry="54"
        fill={`url(#${c("pore")})`}
        opacity=".88"
        className={c("poreMotion")}
      />

      <ellipse
        cx="261"
        cy="354"
        rx="5"
        ry="47"
        fill="#082F49"
        opacity=".6"
      />

      {/* Left guard cell */}
      <path
        d="M258 280
           C223 274 193 308 195 350
           C197 389 222 417 258 410
           C250 380 250 309 258 280Z"
        fill={`url(#${c("cell")})`}
        stroke="#15803D"
        strokeWidth="2.6"
      />

      {/* Right guard cell */}
      <path
        d="M264 280
           C299 274 329 308 327 350
           C325 389 300 417 264 410
           C272 380 272 309 264 280Z"
        fill={`url(#${c("cell")})`}
        stroke="#15803D"
        strokeWidth="2.6"
      />

      {/* Inner highlights */}
      <path
        d="M251 291C232 301 221 329 225 352C227 366 231 377 238 386"
        fill="none"
        stroke="#F0FDF4"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity=".9"
      />

      <path
        d="M271 291C290 301 301 329 297 352C295 366 291 377 284 386"
        fill="none"
        stroke="#F0FDF4"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity=".9"
      />

      {/* Vacuoles in guard cells */}
      <ellipse
        cx="220"
        cy="349"
        rx="14"
        ry="36"
        fill={`url(#${c("cellLight")})`}
        stroke="#22C55E"
        strokeWidth="1.1"
        opacity=".9"
      />

      <ellipse
        cx="302"
        cy="349"
        rx="14"
        ry="36"
        fill={`url(#${c("cellLight")})`}
        stroke="#22C55E"
        strokeWidth="1.1"
        opacity=".9"
      />

      {/* Cell nuclei */}
      <ellipse cx="207" cy="373" rx="5.5" ry="7" fill="#15803D" opacity=".7" />
      <ellipse cx="315" cy="373" rx="5.5" ry="7" fill="#15803D" opacity=".7" />

      {/* Potassium entering from left */}
      <path
        d="M143 331H187"
        fill="none"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd={`url(#${c("orangeArrow")})`}
      />

      <g className={c("ionsLeft")}>
        <circle cx="145" cy="331" r="12" fill={`url(#${c("potassium")})`} stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="145" y="334.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#78350F">
          K⁺
        </text>
      </g>

      {/* Potassium entering from right */}
      <path
        d="M379 331H337"
        fill="none"
        stroke="#D97706"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd={`url(#${c("orangeArrow")})`}
      />

      <g className={c("ionsRight")}>
        <circle cx="379" cy="331" r="12" fill={`url(#${c("potassium")})`} stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="379" y="334.5" textAnchor="middle" fontSize="9" fontWeight="900" fill="#78350F">
          K⁺
        </text>
      </g>

      {/* Potassium labels */}
      <text x="93" y="312" fontSize="10" fontWeight="800" fill="#B45309">
        K⁺ vào
      </text>
      <text x="357" y="312" fontSize="10" fontWeight="800" fill="#B45309">
        K⁺ vào
      </text>

      {/* Water follows osmotically */}
      <path
        d="M160 390H194"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd={`url(#${c("waterArrow")})`}
      />

      <g className={c("waterLeft")}>
        <circle cx="165" cy="390" r="5.5" fill="#7DD3FC" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="180" cy="382" r="3" fill="#38BDF8" />
      </g>

      <path
        d="M362 390H328"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd={`url(#${c("waterArrow")})`}
      />

      <g className={c("waterRight")}>
        <circle cx="362" cy="390" r="5.5" fill="#7DD3FC" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="347" cy="382" r="3" fill="#38BDF8" />
      </g>

      {/* Pore label */}
      <rect
        x="216"
        y="429"
        width="90"
        height="24"
        rx="12"
        fill="#E0F2FE"
        stroke="#7DD3FC"
      />

      <text
        x="261"
        y="444.5"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#075985"
      >
        LỖ KHÍ MỞ
      </text>

      {/* Microscopic particles */}
      {[
        [93, 372, 2.2],
        [110, 354, 1.6],
        [397, 294, 2],
        [421, 312, 1.6],
        [393, 449, 2.3],
        [106, 438, 1.7],
      ].map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill="#86EFAC"
          className={c("sparkle")}
          style={{ animationDelay: `${i * 0.37}s` }}
        />
      ))}

      {/* Steps under left diagram */}
      <g>
        <rect x="48" y="507" width="132" height="91" rx="13" fill="#FFFBEB" stroke="#FDE68A" />

        <circle cx="67" cy="528" r="11" fill="#FBBF24" />
        <text x="67" y="532" textAnchor="middle" fontSize="10" fontWeight="900" fill="#78350F">
          1
        </text>

        <text x="85" y="532" fontSize="10.5" fontWeight="900" fill="#92400E">
          K⁺ TÍCH LŨY
        </text>

        <text x="60" y="553" fontSize="10" fill="#78350F">
          Tăng nồng độ
        </text>
        <text x="60" y="567" fontSize="10" fill="#78350F">
          chất tan trong
        </text>
        <text x="60" y="581" fontSize="10" fill="#78350F">
          tế bào bảo vệ.
        </text>

        <rect x="190" y="507" width="132" height="91" rx="13" fill="#EFF6FF" stroke="#BFDBFE" />

        <circle cx="209" cy="528" r="11" fill="#60A5FA" />
        <text x="209" y="532" textAnchor="middle" fontSize="10" fontWeight="900" fill="#FFFFFF">
          2
        </text>

        <text x="227" y="532" fontSize="10.5" fontWeight="900" fill="#1D4ED8">
          NƯỚC VÀO
        </text>

        <text x="202" y="553" fontSize="10" fill="#1E40AF">
          Nước đi theo
        </text>
        <text x="202" y="567" fontSize="10" fill="#1E40AF">
          thẩm thấu, tăng
        </text>
        <text x="202" y="581" fontSize="10" fill="#1E40AF">
          áp suất trương.
        </text>

        <rect x="332" y="507" width="138" height="91" rx="13" fill="#ECFDF5" stroke="#A7F3D0" />

        <circle cx="351" cy="528" r="11" fill="#22C55E" />
        <text x="351" y="532" textAnchor="middle" fontSize="10" fontWeight="900" fill="#FFFFFF">
          3
        </text>

        <text x="369" y="532" fontSize="10.5" fontWeight="900" fill="#166534">
          LỖ KHÍ MỞ
        </text>

        <text x="344" y="553" fontSize="10" fill="#166534">
          Trao đổi CO₂
        </text>
        <text x="344" y="567" fontSize="10" fill="#166534">
          và điều tiết
        </text>
        <text x="344" y="581" fontSize="10" fill="#166534">
          hơi nước.
        </text>
      </g>

      {/* =====================================================
          03 · RIGHT CARD — PHLOEM / SUGAR TRANSPORT
      ===================================================== */}

      <g filter={`url(#${c("shadow")})`}>
        <rect
          x="510"
          y="135"
          width="462"
          height="500"
          rx="23"
          fill="#FFFFFF"
          stroke="#BBF7D0"
          strokeWidth="1.4"
        />
      </g>

      {/* Header */}
      <rect x="531" y="154" width="38" height="38" rx="12" fill="#DCFCE7" />

      <g transform="translate(538 160)">
        <path
          d="M1 23C0 8 12 0 28 2C28 17 17 28 1 23Z"
          fill="#4ADE80"
          stroke="#15803D"
          strokeWidth="1.5"
        />
        <path
          d="M4 23L23 6"
          fill="none"
          stroke="#15803D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path d="M12 17L10 8M17 13L25 14" fill="none" stroke="#15803D" strokeWidth="1.1" />
      </g>

      <text x="582" y="171" fontSize="15" fontWeight="900" fill="#166534">
        DÒNG VẬN CHUYỂN ĐƯỜNG
      </text>

      <text x="582" y="188" fontSize="10.5" fontWeight="600" fill="#16A34A">
        MẠCH RÂY · NGUỒN → NƠI TIÊU THỤ
      </text>

      <rect x="864" y="159" width="85" height="26" rx="13" fill="#F0FDF4" />
      <circle cx="877" cy="172" r="4" fill="#22C55E" />

      <text x="887" y="175.5" fontSize="9.5" fontWeight="800" fill="#15803D">
        SUCROZƠ
      </text>

      {/* Diagram stage */}
      <rect
        x="530"
        y="210"
        width="422"
        height="282"
        rx="17"
        fill="#F0FDF4"
        stroke="#DCFCE7"
      />

      <circle cx="920" cy="244" r="23" fill="#BBF7D0" opacity=".25" />
      <circle cx="554" cy="461" r="18" fill="#A7F3D0" opacity=".3" />

      <text x="547" y="233" fontSize="10" fontWeight="800" fill="#64748B">
        SẢN PHẨM QUANG HỢP ĐƯỢC PHÂN PHỐI
      </text>

      {/* Leaf glow */}
      <ellipse
        cx="599"
        cy="356"
        rx="39"
        ry="36"
        fill="#86EFAC"
        opacity=".24"
        filter={`url(#${c("glow")})`}
      />

      {/* Source leaf */}
      <g className={c("float")}>
        <path
          d="M569 354
             C568 320 599 293 632 308
             C632 338 609 362 569 354Z"
          fill={`url(#${c("leaf")})`}
          stroke="#15803D"
          strokeWidth="1.8"
        />

        <path
          d="M570 354C590 340 604 326 625 311"
          fill="none"
          stroke="#166534"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path d="M589 341L584 324M601 331L616 331M581 348L601 349" fill="none" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />

        <path
          d="M569 355L559 367"
          fill="none"
          stroke="#15803D"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <circle cx="595" cy="326" r="4" fill="#D9F99D" opacity=".8" />
        <circle cx="611" cy="319" r="3" fill="#ECFCCB" opacity=".8" />
      </g>

      <text x="590" y="386" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#166534">
        LÁ
      </text>
      <text x="590" y="399" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803D">
        Nguồn đường
      </text>

      {/* Main phloem route */}
      <path
        d="M627 346C651 346 667 354 690 354"
        fill="none"
        stroke="#BBF7D0"
        strokeWidth="15"
        strokeLinecap="round"
      />

      <path
        d="M627 346C651 346 667 354 690 354"
        fill="none"
        stroke="#16A34A"
        strokeWidth="2.4"
        strokeLinecap="round"
        markerEnd={`url(#${c("greenArrow")})`}
        className={c("flow")}
      />

      {/* Phloem distribution branch — fruit */}
      <path
        d="M690 354C721 354 752 354 802 354"
        fill="none"
        stroke="#BBF7D0"
        strokeWidth="15"
        strokeLinecap="round"
      />

      <path
        d="M690 354C721 354 752 354 802 354"
        fill="none"
        stroke="#16A34A"
        strokeWidth="2.5"
        strokeLinecap="round"
        markerEnd={`url(#${c("greenArrow")})`}
        className={c("flow")}
      />

      {/* Phloem distribution branch — tuber */}
      <path
        d="M690 354V435"
        fill="none"
        stroke="#BBF7D0"
        strokeWidth="15"
        strokeLinecap="round"
      />

      <path
        d="M690 354V435"
        fill="none"
        stroke="#16A34A"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={c("flow")}
      />

      <path
        d="M690 435C723 435 754 435 803 435"
        fill="none"
        stroke="#BBF7D0"
        strokeWidth="15"
        strokeLinecap="round"
      />

      <path
        d="M690 435C723 435 754 435 803 435"
        fill="none"
        stroke="#16A34A"
        strokeWidth="2.5"
        strokeLinecap="round"
        markerEnd={`url(#${c("greenArrow")})`}
        className={c("flow")}
      />

      {/* Connection points */}
      <circle cx="690" cy="354" r="8" fill="#22C55E" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="690" cy="435" r="7" fill="#22C55E" stroke="#FFFFFF" strokeWidth="2" />

      {/* Phloem title */}
      <rect x="660" y="267" width="130" height="24" rx="12" fill="#DCFCE7" stroke="#86EFAC" />

      <text x="725" y="282.5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#166534">
        MẠCH RÂY
      </text>

      <text x="725" y="306" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#64748B">
        Đường chủ yếu: sucrozơ
      </text>

      {/* Animated sucrose particles -> fruit */}
      {[
        { x: 700, delay: "0s" },
        { x: 724, delay: ".8s" },
        { x: 748, delay: "1.6s" },
      ].map((item, i) => (
        <g
          key={`fruit-sugar-${i}`}
          className={c("sugar")}
          style={{ animationDelay: item.delay }}
        >
          <circle cx={item.x} cy="354" r="8" fill="#FDE68A" stroke="#D97706" strokeWidth="1.1" />
          <circle cx={item.x - 2} cy="351" r="2" fill="#FFFFFF" opacity=".8" />
        </g>
      ))}

      {/* Animated sucrose particles -> tuber */}
      {[
        { x: 700, delay: ".3s" },
        { x: 724, delay: "1.1s" },
        { x: 748, delay: "1.9s" },
      ].map((item, i) => (
        <g
          key={`tuber-sugar-${i}`}
          className={c("sugar")}
          style={{ animationDelay: item.delay }}
        >
          <circle cx={item.x} cy="435" r="8" fill="#FDE68A" stroke="#D97706" strokeWidth="1.1" />
          <circle cx={item.x - 2} cy="432" r="2" fill="#FFFFFF" opacity=".8" />
        </g>
      ))}

      {/* Fruit */}
      <g className={c("pulse")}>
        <circle
          cx="847"
          cy="354"
          r="32"
          fill="#FDBA74"
          opacity=".35"
          filter={`url(#${c("glow")})`}
        />

        <path
          d="M842 329C840 320 845 315 849 313"
          fill="none"
          stroke="#854D0E"
          strokeWidth="3.3"
          strokeLinecap="round"
        />

        <path
          d="M847 317C854 304 867 308 870 314C862 323 854 322 847 317Z"
          fill="#4ADE80"
          stroke="#15803D"
          strokeWidth="1.2"
        />

        <path
          d="M845 324
             C832 322 816 332 815 349
             C813 367 825 384 844 384
             C862 386 878 371 878 352
             C878 334 862 321 845 324Z"
          fill={`url(#${c("fruit")})`}
          stroke="#C2410C"
          strokeWidth="1.6"
        />

        <ellipse cx="833" cy="340" rx="8" ry="12" fill="#FED7AA" opacity=".65" />
        <path d="M833 340l-2 5" stroke="#FFFFFF" strokeWidth="2" opacity=".7" strokeLinecap="round" />
      </g>

      <text x="847" y="402" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#9A3412">
        QUẢ
      </text>
      <text x="847" y="414" textAnchor="middle" fontSize="9" fontWeight="600" fill="#C2410C">
        Cơ quan tiêu thụ
      </text>

      {/* Potato tuber */}
      <g className={c("pulse")} style={{ animationDelay: ".7s" }}>
        <ellipse cx="847" cy="438" rx="43" ry="32" fill="#A16207" opacity=".16" filter={`url(#${c("softGlow")})`} />

        <path
          d="M811 436
             C809 417 830 405 852 410
             C876 406 892 421 887 440
             C885 456 865 468 844 463
             C824 465 810 452 811 436Z"
          fill={`url(#${c("tuber")})`}
          stroke="#854D0E"
          strokeWidth="1.5"
        />

        <ellipse cx="831" cy="429" rx="8" ry="5" fill="#E8C9A0" opacity=".45" />

        <g fill="#6B4226" opacity=".8">
          <ellipse cx="829" cy="440" rx="2.5" ry="1.8" />
          <ellipse cx="848" cy="425" rx="2.2" ry="1.8" />
          <ellipse cx="863" cy="444" rx="2.5" ry="1.8" />
          <ellipse cx="855" cy="453" rx="2" ry="1.5" />
          <ellipse cx="875" cy="430" rx="2" ry="1.5" />
        </g>
      </g>

      <text x="847" y="479" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#854D0E">
        CỦ / CƠ QUAN DỰ TRỮ
      </text>

      {/* Small flow captions */}
      <rect x="704" y="372" width="91" height="19" rx="9.5" fill="#F0FDF4" stroke="#BBF7D0" />
      <text x="749.5" y="384.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#15803D">
        ĐƯỜNG ĐẾN QUẢ
      </text>

      <rect x="704" y="451" width="91" height="19" rx="9.5" fill="#FFFBEB" stroke="#FDE68A" />
      <text x="749.5" y="463.5" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="#92400E">
        ĐƯỜNG ĐẾN CỦ
      </text>

      {/* Three potassium roles */}
      <g>
        <rect x="530" y="507" width="132" height="91" rx="13" fill="#ECFDF5" stroke="#A7F3D0" />

        <circle cx="551" cy="529" r="12" fill="#D1FAE5" />
        <path
          d="M545 529h12M551 523v12"
          stroke="#15803D"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <text x="569" y="532" fontSize="10.5" fontWeight="900" fill="#166534">
          ĐIỀU TIẾT
        </text>

        <text x="542" y="554" fontSize="10" fill="#166534">
          Đóng mở khí khổng
        </text>
        <text x="542" y="568" fontSize="10" fill="#166534">
          và cân bằng nước.
        </text>
        <text x="542" y="584" fontSize="9" fill="#15803D">
          Giảm thất thoát nước
        </text>

        <rect x="672" y="507" width="132" height="91" rx="13" fill="#F5F3FF" stroke="#DDD6FE" />

        <circle cx="693" cy="529" r="12" fill="#EDE9FE" />
        <path
          d="M687 533l4-9 4 6 4-7"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text x="711" y="532" fontSize="10.5" fontWeight="900" fill="#5B21B6">
          HOẠT HÓA
        </text>

        <text x="684" y="554" fontSize="10" fill="#5B21B6">
          Hỗ trợ enzyme
        </text>
        <text x="684" y="568" fontSize="10" fill="#5B21B6">
          và trao đổi chất.
        </text>
        <text x="684" y="584" fontSize="9" fill="#7C3AED">
          Hỗ trợ quang hợp
        </text>

        <rect x="814" y="507" width="138" height="91" rx="13" fill="#FFFBEB" stroke="#FDE68A" />

        <circle cx="835" cy="529" r="12" fill="#FEF3C7" />
        <path
          d="M829 526h12M829 532h12M835 522v14"
          stroke="#B45309"
          strokeWidth="1.6"
          strokeLinecap="round"
        />

        <text x="853" y="532" fontSize="10.5" fontWeight="900" fill="#92400E">
          VẬN CHUYỂN
        </text>

        <text x="826" y="554" fontSize="10" fill="#92400E">
          Hỗ trợ chuyển
        </text>
        <text x="826" y="568" fontSize="10" fill="#92400E">
          đường trong cây.
        </text>
        <text x="826" y="584" fontSize="9" fill="#B45309">
          Tới cơ quan sử dụng
        </text>
      </g>

      {/* =====================================================
          04 · TAKEAWAY BANNER
      ===================================================== */}

      <rect
        x="28"
        y="657"
        width="944"
        height="78"
        rx="19"
        fill={`url(#${c("banner")})`}
        stroke="#A7F3D0"
        strokeWidth="1.3"
      />

      {/* Shield / leaf symbol */}
      <circle cx="69" cy="696" r="24" fill="#D1FAE5" />

      <path
        d="M69 713
           C51 702 51 687 54 680
           C65 681 70 687 70 695
           C74 684 84 682 88 684
           C88 696 81 707 69 713Z"
        fill="#22C55E"
        stroke="#15803D"
        strokeWidth="1.3"
      />

      <path
        d="M69 709L69 693M69 700L60 689M70 698L81 689"
        fill="none"
        stroke="#F0FDF4"
        strokeWidth="1.7"
        strokeLinecap="round"
      />

      <text x="108" y="685" fontSize="13.5" fontWeight="900" fill="#166534">
        KALI — DINH DƯỠNG THIẾT YẾU CHO CÂY TRỒNG
      </text>

      <text x="108" y="706" fontSize="11.5" fontWeight="600" fill="#166534">
        Điều tiết nước · hỗ trợ quang hợp · vận chuyển sản phẩm đồng hóa
      </text>

      <text x="108" y="722" fontSize="9.5" fontWeight="500" fill="#64748B">
        Hiệu quả phụ thuộc giống cây, điều kiện môi trường và dinh dưỡng cân đối.
      </text>

      <line x1="690" y1="672" x2="690" y2="720" stroke="#BBF7D0" strokeWidth="1.3" />

      <g transform="translate(712 675)">
        <circle cx="9" cy="9" r="9" fill="#DCFCE7" />
        <path
          d="M5 9l3 3 5-6"
          fill="none"
          stroke="#15803D"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="25" y="12" fontSize="10.5" fontWeight="800" fill="#166534">
          Sinh lý thực vật
        </text>
      </g>

      <g transform="translate(712 701)">
        <circle cx="9" cy="9" r="9" fill="#FEF3C7" />
        <path
          d="M5 9h8M9 5v8"
          fill="none"
          stroke="#B45309"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <text x="25" y="12" fontSize="10.5" fontWeight="800" fill="#92400E">
          Dinh dưỡng kali
        </text>
      </g>
    </svg>
  );
}
