
import React from "react";

export default function SvgTopdressingMountain() {
  const id = `k-demand-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const uid = (name) => `${id}-${name}`;

  const stages = [
    {
      n: "01",
      title: "CÂY NON",
      detail: "Nhu cầu ban đầu",
      color: "#64748B",
      bg: "#F1F5F9",
      type: "seed",
    },
    {
      n: "02",
      title: "SINH TRƯỞNG MẠNH",
      detail: "Phát triển thân, lá",
      color: "#16A34A",
      bg: "#DCFCE7",
      type: "growth",
    },
    {
      n: "03",
      title: "RA HOA / ĐẬU QUẢ",
      detail: "Theo đặc điểm cây",
      color: "#EA580C",
      bg: "#FFEDD5",
      type: "flower",
    },
    {
      n: "04",
      title: "NUÔI QUẢ / CỦ",
      detail: "Tích lũy sản phẩm",
      color: "#7C3AED",
      bg: "#EDE9FE",
      type: "fruit",
    },
    {
      n: "05",
      title: "CHÍN / THU HOẠCH",
      detail: "Hoàn tất chu kỳ",
      color: "#B45309",
      bg: "#FEF3C7",
      type: "harvest",
    },
  ];

  const curve =
    "M95 423 C145 423 205 411 255 379 C310 344 380 257 462 227 C512 208 557 216 602 239 C650 264 687 308 730 349 C765 385 813 412 920 423";

  const area =
    `${curve} L920 423 L95 423 Z`;

  const markers = [
    { x: 150, y: 420, color: "#64748B" },
    { x: 325, y: 335, color: "#16A34A" },
    { x: 500, y: 220, color: "#EA580C" },
    { x: 675, y: 295, color: "#7C3AED" },
    { x: 850, y: 417, color: "#B45309" },
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
        Biểu đồ minh họa nhu cầu kali qua các giai đoạn sinh trưởng
      </title>

      <desc id={`${id}-desc`}>
        Đường cong nhu cầu kali qua năm giai đoạn khái quát từ cây
        non đến thu hoạch. Thời điểm và mức nhu cầu cụ thể thay đổi
        tùy cây trồng, đất, giống và điều kiện canh tác.
      </desc>

      <defs>
        {/* ================= BACKGROUND ================= */}

        <linearGradient id={uid("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="55%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#F0FDF4" />
        </linearGradient>

        <linearGradient
          id={uid("mountain")}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#FB923C" stopOpacity=".65" />
          <stop offset="38%" stopColor="#FBBF24" stopOpacity=".3" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity=".035" />
        </linearGradient>

        <linearGradient
          id={uid("curveLine")}
          x1="0"
          y1="0"
          x2="1"
          y2=".1"
        >
          <stop offset="0%" stopColor="#65A30D" />
          <stop offset="42%" stopColor="#EAB308" />
          <stop offset="67%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        <linearGradient
          id={uid("peak")}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        <linearGradient
          id={uid("footer")}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F8FAFC" />
        </linearGradient>

        <linearGradient
          id={uid("leaf")}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="100%" stopColor="#16A34A" />
        </linearGradient>

        {/* ================= FILTERS ================= */}

        {/* ================= ANIMATIONS ================= */}

        <style>{`
          @keyframes ${uid("drawCurve")} {
            from {
              stroke-dashoffset: 1;
            }
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes ${uid("flow")} {
            to {
              stroke-dashoffset: -80;
            }
          }

          @keyframes ${uid("pulse")} {
            0%, 100% {
              opacity: .35;
              transform: scale(.9);
            }
            50% {
              opacity: .85;
              transform: scale(1.14);
            }
          }

          @keyframes ${uid("markerPulse")} {
            0%, 100% {
              r: 7;
              opacity: .85;
            }
            50% {
              r: 10;
              opacity: 1;
            }
          }

          @keyframes ${uid("float")} {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-3px);
            }
          }

          @keyframes ${uid("sparkle")} {
            0%, 100% {
              opacity: .2;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes ${uid("highlight")} {
            0%, 100% {
              stroke-opacity: .65;
            }
            50% {
              stroke-opacity: 1;
            }
          }

          .${uid("curveDraw")} {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            animation: ${uid("drawCurve")} 3.5s
              cubic-bezier(.2,.7,.25,1) forwards;
          }

          .${uid("curveFlow")} {
            stroke-dasharray: 5 10;
            animation: ${uid("flow")} 7s linear infinite;
          }

          .${uid("glowPulse")} {
            transform-box: fill-box;
            transform-origin: center;
            animation: ${uid("pulse")} 3.2s ease-in-out infinite;
          }

          .${uid("peakMarker")} {
            animation: ${uid("markerPulse")} 2.4s ease-in-out infinite;
          }

          .${uid("float")} {
            animation: ${uid("float")} 3.6s ease-in-out infinite;
          }

          .${uid("sparkle")} {
            animation: ${uid("sparkle")} 2.6s ease-in-out infinite;
          }

          .${uid("highlight")} {
            animation: ${uid("highlight")} 3s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .${uid("curveDraw")},
            .${uid("curveFlow")},
            .${uid("glowPulse")},
            .${uid("peakMarker")},
            .${uid("float")},
            .${uid("sparkle")},
            .${uid("highlight")} {
              animation: none !important;
            }

            .${uid("curveDraw")} {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
      </defs>

      {/* =====================================================
          01 · BACKGROUND & HEADING
      ===================================================== */}

      <rect
        width="1000"
        height="760"
        rx="28"
        fill={`url(#${uid("bg")})`}
        stroke="#FDE68A"
        strokeWidth="1.5"
      />

      <circle cx="960" cy="51" r="90" fill="#BBF7D0" opacity=".15" />
      <circle cx="928" cy="87" r="48" fill="#FED7AA" opacity=".18" />
      <circle cx="22" cy="600" r="65" fill="#FDE68A" opacity=".12" />

      <g opacity=".12" stroke="#94A3B8" strokeWidth=".8">
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`gridx-${i}`}
            x1={790 + i * 19}
            y1="15"
            x2={790 + i * 19}
            y2="108"
          />
        ))}

        {Array.from({ length: 4 }, (_, i) => (
          <line
            key={`gridy-${i}`}
            x1="790"
            y1={20 + i * 24}
            x2="923"
            y2={20 + i * 24}
          />
        ))}
      </g>

      <rect
        x="34"
        y="27"
        width="7"
        height="24"
        rx="3.5"
        fill="#F59E0B"
      />

      <text
        x="54"
        y="43"
        fontSize="13"
        fontWeight="900"
        letterSpacing="2"
        fill="#B45309"
      >
        DINH DƯỠNG KHOÁNG · KALI
      </text>

      <text
        x="34"
        y="81"
        fontSize="29"
        fontWeight="900"
        letterSpacing="-.8"
        fill="#172033"
      >
        BÓN THÚC KALI
        <tspan fill="#D97706"> — ĐÚNG THỜI ĐIỂM</tspan>
      </text>

      <text
        x="35"
        y="107"
        fontSize="12.5"
        fontWeight="500"
        fill="#64748B"
      >
        Theo dõi nhu cầu cây qua chu kỳ sinh trưởng để tối ưu hiệu quả dinh dưỡng
      </text>

      {/* =====================================================
          02 · MAIN GRAPH PANEL
      ===================================================== */}

      <g>
        <rect
          x="30"
          y="132"
          width="940"
          height="430"
          rx="23"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1.3"
        />
      </g>

      {/* Chart heading */}
      <rect
        x="52"
        y="151"
        width="36"
        height="36"
        rx="11"
        fill="#FEF3C7"
      />

      <g
        transform="translate(59 158)"
        fill="none"
        stroke="#B45309"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 26V2" />
        <path d="M1 26H27" />
        <path d="M4 21C10 20 12 13 17 9S24 6 26 3" />
        <path d="M20 3H26V9" />
      </g>

      <text
        x="100"
        y="167"
        fontSize="14"
        fontWeight="900"
        fill="#1E293B"
      >
        NHU CẦU KALI QUA CÁC GIAI ĐOẠN
      </text>

      <text
        x="100"
        y="183"
        fontSize="13"
        fontWeight="600"
        fill="#64748B"
      >
        Mức tương đối — đường cong khái niệm
      </text>

      <rect
        x="800"
        y="153"
        width="146"
        height="27"
        rx="13.5"
        fill="#FFF7ED"
        stroke="#FED7AA"
      />

      <circle cx="815" cy="166.5" r="4" fill="#F97316" />

      <text
        x="826"
        y="170.5"
        fontSize="12.5"
        fontWeight="900"
        fill="#9A3412"
      >
        MÔ HÌNH MINH HỌA
      </text>

      {/* =====================================================
          03 · AXES & GRID
      ===================================================== */}

      {/* Plot background */}
      <rect
        x="95"
        y="202"
        width="825"
        height="221"
        rx="8"
        fill="#F8FAFC"
        opacity=".65"
      />

      {/* Horizontal grid */}
      <g
        stroke="#E2E8F0"
        strokeWidth="1"
        strokeDasharray="3 6"
      >
        <line x1="95" y1="260" x2="920" y2="260" />
        <line x1="95" y1="315" x2="920" y2="315" />
        <line x1="95" y1="370" x2="920" y2="370" />
        <line x1="95" y1="423" x2="920" y2="423" />
      </g>

      {/* Vertical axis */}
      <path
        d="M95 202V423"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="1.5"
      />

      {/* Horizontal axis */}
      <path
        d="M95 423H920"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="1.5"
      />

      <path
        d="M913 417L920 423L913 429"
        fill="none"
        stroke="#94A3B8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Axis titles */}
      <text
        x="65"
        y="312"
        transform="rotate(-90 65 312)"
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        letterSpacing=".8"
        fill="#64748B"
      >
        NHU CẦU KALI TƯƠNG ĐỐI
      </text>

      <text
        x="83"
        y="216"
        textAnchor="end"
        fontSize="12.5"
        fontWeight="700"
        fill="#94A3B8"
      >
        Cao
      </text>

      <text
        x="83"
        y="419"
        textAnchor="end"
        fontSize="12.5"
        fontWeight="700"
        fill="#94A3B8"
      >
        Thấp
      </text>

      {/* =====================================================
          04 · DEMAND MOUNTAIN
      ===================================================== */}

      {/* Filled area */}
      <path d={area} fill={`url(#${uid("mountain")})`} />

      {/* Secondary glow behind curve */}
      <path
        d={curve}
        fill="none"
        stroke="#FB923C"
        strokeWidth="13"
        strokeLinecap="round"
        opacity=".16"
        className={uid("glowPulse")}
      />

      {/* Curve draw animation */}
      <path
        d={curve}
        fill="none"
        stroke={`url(#${uid("curveLine")})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        className={uid("curveDraw")}
      />

      {/* Animated dash overlay */}
      <path
        d={curve}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="5 12"
        className={uid("curveFlow")}
      />

      {/* Data markers and vertical guide lines */}
      {markers.map((m, i) => (
        <g key={`marker-${i}`}>
          <path
            d={`M${m.x} ${m.y}V423`}
            stroke={m.color}
            strokeWidth="1.2"
            strokeDasharray="3 5"
            opacity=".55"
          />

          <circle
            cx={m.x}
            cy={m.y}
            r={i === 2 ? 19 : 12}
            fill={m.color}
            opacity=".1"
          />

          <circle
            cx={m.x}
            cy={m.y}
            r={i === 2 ? 13 : 9}
            fill={m.color}
            opacity=".15"
          />

          <circle
            cx={m.x}
            cy={m.y}
            r={i === 2 ? 7 : 5}
            fill={m.color}
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          {i !== 2 && (
            <circle
              cx={m.x}
              cy={m.y}
              r="2"
              fill="#FFFFFF"
            />
          )}
        </g>
      ))}

      {/* Highlight at peak */}
      <circle
        cx="500"
        cy="220"
        r="24"
        fill="#FB923C"
        opacity=".17"
        className={uid("glowPulse")}
      />

      <circle
        cx="500"
        cy="220"
        r="11"
        fill={`url(#${uid("peak")})`}
        stroke="#FFFFFF"
        strokeWidth="3"
      />

      <circle
        cx="500"
        cy="220"
        r="5"
        fill="#FFFFFF"
        className={uid("peakMarker")}
      />

      {/* Peak annotation */}
      <path
        d="M512 216L564 205"
        fill="none"
        stroke="#EA580C"
        strokeWidth="1.4"
        strokeDasharray="3 4"
      />

      <rect
        x="566"
        y="188"
        width="205"
        height="35"
        rx="10"
        fill="#FFF7ED"
        stroke="#FDBA74"
        strokeWidth="1.2"
      />

      <circle cx="581" cy="205.5" r="5" fill="#F97316" />

      <text
        x="592"
        y="202"
        fontSize="13"
        fontWeight="900"
        fill="#9A3412"
      >
        GIAI ĐOẠN NHU CẦU CAO
      </text>

      <text
        x="592"
        y="214"
        fontSize="12.5"
        fontWeight="600"
        fill="#C2410C"
      >
        Thời điểm thay đổi theo cây trồng
      </text>

      {/* Curve direction hint */}
      <g className={uid("sparkle")}>
        <circle cx="426" cy="246" r="2.3" fill="#FDE68A" />
        <circle cx="444" cy="237" r="1.7" fill="#FFFFFF" />
        <circle cx="461" cy="229" r="2" fill="#F59E0B" />
      </g>

      <g className={uid("sparkle")} style={{ animationDelay: ".7s" }}>
        <circle cx="550" cy="224" r="2" fill="#FFFFFF" />
        <circle cx="569" cy="230" r="1.8" fill="#FDE68A" />
        <circle cx="586" cy="236" r="2.2" fill="#F97316" />
      </g>

      <text
        x="901"
        y="439"
        textAnchor="end"
        fontSize="12.5"
        fontWeight="800"
        fill="#64748B"
      >
        TIẾN TRÌNH SINH TRƯỞNG →
      </text>

      {/* =====================================================
          05 · FIVE GROWTH STAGES
      ===================================================== */}

      {stages.map((stage, i) => {
        const x = [70, 245, 420, 595, 770][i];
        const center = x + 80;

        return (
          <g key={stage.n}>
            <rect
              x={x}
              y="447"
              width="160"
              height="76"
              rx="12"
              fill={i === 2 ? "#FFFBEB" : "#FFFFFF"}
              stroke={i === 2 ? "#FDBA74" : "#E2E8F0"}
              strokeWidth={i === 2 ? "1.5" : "1"}
              className={i === 2 ? uid("highlight") : undefined}
            />

            {/* Stage index */}
            <circle
              cx={x + 17}
              cy="464"
              r="10"
              fill={stage.bg}
            />

            <text
              x={x + 17}
              y="467.5"
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="900"
              fill={stage.color}
            >
              {stage.n}
            </text>

            {/* Stage illustration: seedling */}
            {stage.type === "seed" && (
              <g transform={`translate(${center} 463)`}><g className={uid("float")}
              >
                <path
                  d="M0 9V-2"
                  stroke="#16A34A"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M0 3C-9 3-11-4-8-7C-2-7 0-2 0 3Z"
                  fill="#86EFAC"
                  stroke="#16A34A"
                  strokeWidth=".8"
                />

                <path
                  d="M0 0C8 0 11-6 8-9C3-8 0-4 0 0Z"
                  fill="#4ADE80"
                  stroke="#15803D"
                  strokeWidth=".8"
                />

                <path
                  d="M-7 10H7M-4 10L-7 13M4 10L7 13"
                  fill="none"
                  stroke="#A16207"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g></g>
            )}

            {/* Vigorous vegetation */}
            {stage.type === "growth" && (
              <g transform={`translate(${center} 466)`}><g className={uid("float")}
              >
                <path
                  d="M0 10V-10M-7 5L-7-3M7 5L7-5"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M0-3C-11-3-13-11-9-13C-3-13 0-8 0-3Z"
                  fill="#86EFAC"
                  stroke="#16A34A"
                  strokeWidth=".8"
                />

                <path
                  d="M0-7C10-7 13-14 9-16C3-15 0-12 0-7Z"
                  fill="#4ADE80"
                  stroke="#15803D"
                  strokeWidth=".8"
                />

                <path
                  d="M-7 0C-15 0-17-6-14-8C-10-7-7-4-7 0Z"
                  fill="#BBF7D0"
                  stroke="#16A34A"
                  strokeWidth=".8"
                />

                <path
                  d="M7-2C15-2 17-8 14-10C10-9 7-5 7-2Z"
                  fill="#86EFAC"
                  stroke="#15803D"
                  strokeWidth=".8"
                />
              </g></g>
            )}

            {/* Flowering */}
            {stage.type === "flower" && (
              <g transform={`translate(${center} 463)`}><g className={uid("float")}
              >
                <path
                  d="M0 11V-3"
                  stroke="#15803D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M0 5C-7 5-9 0-7-2C-3-2 0 1 0 5Z"
                  fill="#4ADE80"
                />

                <path
                  d="M0-3C-8-7-7-13-3-14C0-12 0-7 0-3Z"
                  fill="#F9A8D4"
                />

                <path
                  d="M0-3C3-11 9-10 10-6C8-2 4-2 0-3Z"
                  fill="#FBCFE8"
                />

                <path
                  d="M0-3C8 0 6 6 2 7C-1 4-1 0 0-3Z"
                  fill="#F9A8D4"
                />

                <path
                  d="M0-3C-7 1-12-3-10-7C-6-9-2-6 0-3Z"
                  fill="#FBCFE8"
                />

                <circle cx="0" cy="-3" r="3.5" fill="#FBBF24" />
              </g></g>
            )}

            {/* Fruit and tuber */}
            {stage.type === "fruit" && (
              <g transform={`translate(${center} 464)`}><g className={uid("float")}
              >
                <path
                  d="M0-5V-11"
                  stroke="#854D0E"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M0-8C5-14 11-12 12-9C8-5 4-6 0-8Z"
                  fill="#4ADE80"
                  stroke="#15803D"
                  strokeWidth=".8"
                />

                <path
                  d="M0-6C-8-11-14-5-12 1C-10 7-4 9 0 6C5 11 13 5 12-2C11-8 4-10 0-6Z"
                  fill="#FB923C"
                  stroke="#C2410C"
                  strokeWidth=".8"
                />

                <ellipse cx="-4" cy="-1" rx="3" ry="4" fill="#FED7AA" opacity=".8" />
              </g></g>
            )}

            {/* Harvest */}
            {stage.type === "harvest" && (
              <g transform={`translate(${center} 464)`}><g className={uid("float")}
              >
                <path
                  d="M0 11V-12"
                  stroke="#A16207"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M0-9L-7-12M0-5L7-9M0-1L-7-4M0 3L6 0"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M-7-12l-1-3M7-9l2-3M-7-4l-1-3M6 0l2-3"
                  stroke="#FBBF24"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M-7 12H7"
                  stroke="#A16207"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g></g>
            )}

            {/* Stage title */}
            <text
              x={center}
              y="487"
              textAnchor="middle"
              fontSize={i === 1 || i === 2 ? "9.5" : "10"}
              fontWeight="900"
              fill={stage.color}
            >
              {stage.title}
            </text>

            <text
              x={center}
              y="505"
              textAnchor="middle"
              fontSize="12.5"
              fontWeight="600"
              fill="#64748B"
            >
              {stage.detail}
            </text>
          </g>
        );
      })}

      {/* Chart context note */}
      <circle cx="63" cy="543" r="3.5" fill="#F59E0B" />

      <text
        x="74"
        y="547"
        fontSize="13"
        fontWeight="600"
        fill="#64748B"
      >
        Đỉnh nhu cầu và thời điểm bón thực tế phụ thuộc cây trồng, đất, giống và điều kiện canh tác.
      </text>

      {/* =====================================================
          06 · SMART TOP-DRESSING GUIDANCE
      ===================================================== */}

      <g>
        <rect
          x="30"
          y="581"
          width="940"
          height="154"
          rx="21"
          fill={`url(#${uid("footer")})`}
          stroke="#E2E8F0"
          strokeWidth="1.2"
        />
      </g>

      <text
        x="51"
        y="608"
        fontSize="13"
        fontWeight="900"
        fill="#172033"
      >
        CHIẾN LƯỢC BÓN THÚC THÔNG MINH
      </text>

      <text
        x="51"
        y="624"
        fontSize="13"
        fontWeight="500"
        fill="#64748B"
      >
        Chọn lịch bón từ nhu cầu cây và khả năng giữ kali của đất.
      </text>

      <rect
        x="800"
        y="594"
        width="145"
        height="26"
        rx="13"
        fill="#F0FDF4"
        stroke="#BBF7D0"
      />

      <circle cx="815" cy="607" r="4" fill="#22C55E" />

      <text
        x="826"
        y="610.5"
        fontSize="12.5"
        fontWeight="900"
        fill="#166534"
      >
        BÓN CÓ CĂN CỨ
      </text>

      {/* Card 1 */}
      <rect
        x="49"
        y="639"
        width="286"
        height="77"
        rx="12"
        fill="#FFFFFF"
        stroke="#E2E8F0"
      />

      <rect x="60" y="650" width="31" height="31" rx="9" fill="#E0F2FE" />

      <g
        transform="translate(67 656)"
        fill="none"
        stroke="#0284C7"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 0C9 0 2 8 2 12A7 7 0 0016 12C16 8 9 0 9 0Z" />
        <path d="M5 13Q9 17 13 13" />
      </g>

      <text x="100" y="656" fontSize="13" fontWeight="900" fill="#075985">
        HIỂU ĐẤT TRƯỚC KHI BÓN
      </text>

      <text x="100" y="672" fontSize="12.5" fill="#64748B">
        Đất cát, CEC thấp và mưa lớn
      </text>

      <text x="100" y="685" fontSize="12.5" fill="#64748B">
        có thể làm tăng nguy cơ mất K.
      </text>

      <text x="100" y="701" fontSize="12.5" fontWeight="700" fill="#0284C7">
        Chú ý khả năng giữ dinh dưỡng
      </text>

      {/* Card 2 */}
      <rect
        x="357"
        y="639"
        width="286"
        height="77"
        rx="12"
        fill="#FFFFFF"
        stroke="#E2E8F0"
      />

      <rect x="368" y="650" width="31" height="31" rx="9" fill="#DCFCE7" />

      <g
        transform="translate(375 657)"
        fill="none"
        stroke="#15803D"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="2" width="17" height="15" rx="2" />
        <path d="M5 0V4M14 0V4M1 7H18" />
        <path d="M5 11h3M12 11h2" />
      </g>

      <text x="408" y="656" fontSize="13" fontWeight="900" fill="#166534">
        CHIA LẦN KHI CÓ LỢI
      </text>

      <text x="408" y="672" fontSize="12.5" fill="#64748B">
        Phù hợp một số đất nhẹ hoặc
      </text>

      <text x="408" y="685" fontSize="12.5" fill="#64748B">
        cây có nhu cầu kéo dài.
      </text>

      <text x="408" y="701" fontSize="12.5" fontWeight="700" fill="#15803D">
        Chia theo khuyến cáo cụ thể
      </text>

      {/* Card 3 */}
      <rect
        x="665"
        y="639"
        width="286"
        height="77"
        rx="12"
        fill="#FFFFFF"
        stroke="#E2E8F0"
      />

      <rect x="676" y="650" width="31" height="31" rx="9" fill="#FEF3C7" />

      <g
        transform="translate(683 657)"
        fill="none"
        stroke="#B45309"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="9" r="8" />
        <path d="M9 4V9L13 12" />
      </g>

      <text x="716" y="656" fontSize="13" fontWeight="900" fill="#92400E">
        KHÔNG CHIA THEO TỶ LỆ CỐ ĐỊNH
      </text>

      <text x="716" y="672" fontSize="12.5" fill="#64748B">
        Lượng và thời điểm bón phụ thuộc
      </text>

      <text x="716" y="685" fontSize="12.5" fill="#64748B">
        cây, đất và mục tiêu năng suất.
      </text>

      <text x="716" y="701" fontSize="12.5" fontWeight="700" fill="#B45309">
        Ưu tiên kết quả phân tích đất
      </text>
    </svg>
  );
}
