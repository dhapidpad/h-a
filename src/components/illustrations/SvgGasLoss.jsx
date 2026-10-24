
import React, { useId } from 'react';

export default function SvgGasLoss() {
  const uid = useId().replace(/:/g, '');

  const ids = {
    bg: `gas-bg-${uid}`,
    soil: `gas-soil-${uid}`,
    acid: `gas-acid-${uid}`,
    lime: `gas-lime-${uid}`,
    gas: `gas-ammonia-${uid}`,
    shadow: `gas-shadow-${uid}`,
    glow: `gas-glow-${uid}`,
    arrow: `gas-arrow-${uid}`,
    dots: `gas-dots-${uid}`,
  };

  return (
    <svg
      viewBox="0 0 720 600"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="So sánh tác động của phân đạm amoni trong đất chua và nguy cơ thất thoát amoniac khi bón phân amoni cùng lúc với vôi"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 22,
        boxShadow: '0 12px 32px rgba(15, 23, 42, 0.08)',
      }}
    >
      <defs>
        {/* Nền tổng thể */}
        <linearGradient id={ids.bg} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFDFC" />
          <stop offset="50%" stopColor="#FFF7F2" />
          <stop offset="100%" stopColor="#F0F7FC" />
        </linearGradient>

        {/* Đất chua */}
        <linearGradient id={ids.acid} x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#C77D55" />
          <stop offset="45%" stopColor="#A85E47" />
          <stop offset="100%" stopColor="#784333" />
        </linearGradient>

        {/* Đất có vôi */}
        <linearGradient id={ids.lime} x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#E8DCC5" />
          <stop offset="55%" stopColor="#CFC4AE" />
          <stop offset="100%" stopColor="#B6AA96" />
        </linearGradient>

        {/* Lớp đất mặt */}
        <linearGradient id={ids.soil} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78945B" />
          <stop offset="100%" stopColor="#4B663F" />
        </linearGradient>

        {/* Bong bóng NH3 */}
        <linearGradient id={ids.gas} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFE4E6" />
          <stop offset="100%" stopColor="#FDA4AF" />
        </linearGradient>

        <pattern
          id={ids.dots}
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#64748B" opacity="0.09" />
        </pattern>

        <radialGradient id={ids.glow}>
          <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
        </radialGradient>

        <filter id={ids.shadow} x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="7"
            floodColor="#472B24"
            floodOpacity="0.12"
          />
        </filter>

        <filter id={ids.glow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <marker
          id={ids.arrow}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="#E11D48" />
        </marker>
      </defs>

      <style>{`
        .gas-bubble {
          animation: gas-rise 2.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        .gas-bubble-delayed {
          animation: gas-rise 3.2s ease-in-out 0.8s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        .gas-flow {
          stroke-dasharray: 5 6;
          animation: gas-dash 2.2s linear infinite;
        }

        .gas-warning {
          transform-box: fill-box;
          transform-origin: center;
          animation: gas-pulse 3s ease-in-out infinite;
        }

        @keyframes gas-rise {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        @keyframes gas-dash {
          to { stroke-dashoffset: -44; }
        }

        @keyframes gas-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .78; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gas-bubble,
          .gas-bubble-delayed,
          .gas-flow,
          .gas-warning {
            animation: none;
          }
        }
      `}</style>

      {/* ====================================================
          01. BACKGROUND + HEADER
      ==================================================== */}

      <rect
        width="720"
        height="600"
        rx="22"
        fill={`url(#${ids.bg})`}
        stroke="#86EFAC"
        strokeWidth="1.5"
      />

      <rect
        width="720"
        height="600"
        rx="24"
        fill={`url(#${ids.dots})`}
      />

      <circle cx="688" cy="55" r="110" fill="#FECACA" opacity="0.12" />
      <circle cx="24" cy="520" r="110" fill="#BBF7D0" opacity="0.13" />

      <g fontFamily="Inter, Arial, sans-serif">
        <rect
          x="25"
          y="18"
          width="230"
          height="25"
          rx="12.5"
          fill="#FFFFFF"
          stroke="#F1D5CA"
        />

        <circle cx="40" cy="30.5" r="4" fill="#F97316" />

        <text
          x="52"
          y="34.5"
          fill="#9A3412"
          fontSize="10"
          fontWeight="900"
          letterSpacing="1"
        >
          AGRI SCIENCE / WARNING 05
        </text>

        <text
          x="25"
          y="75"
          fill="#302D2A"
          fontSize="26"
          fontWeight="900"
          letterSpacing="-0.6"
        >
          Hai nguy cơ khi sử dụng phân đạm amoni
        </text>

        <text
          x="27"
          y="98"
          fill="#81736A"
          fontSize="11.5"
          fontWeight="500"
        >
          Đất chua hóa và thất thoát nitơ khi bón phân không đúng cách
        </text>

        <path
          d="M25 112 H695"
          stroke="#E8DCD5"
          strokeWidth="1.2"
        />
      </g>

      {/* ====================================================
          02. LEFT CARD — ACID SOIL
      ==================================================== */}

      <g fontFamily="Inter, Arial, sans-serif">
        <rect
          x="22"
          y="128"
          width="328"
          height="355"
          rx="20"
          fill="#FFFFFF"
          fillOpacity="0.96"
          stroke="#F2C9BC"
          strokeWidth="1.4"
          filter={`url(#${ids.shadow})`}
        />

        {/* Section heading */}
        <rect
          x="37"
          y="142"
          width="32"
          height="32"
          rx="10"
          fill="#FEE2E2"
        />

        <path
          d="M53 148 L53 158 M48 153 L58 153 M53 158 L48 165 M53 158 L59 165"
          stroke="#DC2626"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        <text
          x="79"
          y="154"
          fill="#991B1B"
          fontSize="12"
          fontWeight="900"
          letterSpacing="0.35"
        >
          01 / ĐẤT QUÁ CHUA
        </text>

        <text
          x="79"
          y="171"
          fill="#9F7164"
          fontSize="10"
          fontWeight="500"
        >
          Nitrat hóa góp phần làm đất chua thêm
        </text>

        <rect
          x="245"
          y="142"
          width="87"
          height="25"
          rx="12.5"
          fill="#FEF2F2"
          stroke="#FECACA"
        />

        <text
          x="288.5"
          y="158.5"
          textAnchor="middle"
          fill="#B91C1C"
          fontSize="10"
          fontWeight="900"
        >
          pH THẤP
        </text>

        {/* Sky zone */}
        <rect
          x="37"
          y="188"
          width="298"
          height="103"
          rx="13"
          fill="#FFF8F3"
        />

        <circle cx="66" cy="209" r="19" fill="#FDE68A" opacity="0.3" />
        <circle cx="66" cy="209" r="10" fill="#FBBF24" opacity="0.65" />

        <g
          stroke="#F59E0B"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M66 193 V188" />
          <path d="M66 225 V230" />
          <path d="M50 209 H45" />
          <path d="M82 209 H87" />
          <path d="M55 198 L51 194" />
          <path d="M77 220 L81 224" />
        </g>

        {/* Stunted seedling */}
        <g filter={`url(#${ids.shadow})`}>
          {/* Stem */}
          <path
            d="M183 283 Q181 255 185 225"
            fill="none"
            stroke="#688C3D"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Left yellow leaf */}
          <path
            d="M184 245 C164 224 143 228 149 244 C158 255 171 254 184 245 Z"
            fill="#E5C34F"
            stroke="#C9A53A"
            strokeWidth="1"
          />

          <path
            d="M182 245 Q166 237 153 238"
            fill="none"
            stroke="#F9E7A2"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Right yellow leaf */}
          <path
            d="M185 235 C203 213 224 218 218 234 C209 246 196 246 185 235 Z"
            fill="#F0D76B"
            stroke="#D4B84B"
            strokeWidth="1"
          />

          <path
            d="M187 235 Q203 227 214 228"
            fill="none"
            stroke="#FFF5BE"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Tiny top leaf */}
          <path
            d="M185 224 C171 209 179 199 188 209 C193 215 191 220 185 224 Z"
            fill="#A3B849"
            stroke="#82943B"
            strokeWidth="1"
          />
        </g>

        <rect
          x="93"
          y="194"
          width="91"
          height="23"
          rx="11.5"
          fill="#FFFFFF"
          stroke="#F3D4A8"
        />

        <text
          x="138.5"
          y="209.5"
          textAnchor="middle"
          fill="#9A6700"
          fontSize="9.5"
          fontWeight="800"
        >
          Lá vàng
        </text>

        <path
          d="M156 217 L163 231"
          stroke="#C99B3A"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soil body */}
        <path
          d="
            M37 283
            Q78 275 115 283
            T190 283
            T260 283
            T335 283
            L335 440
            Q335 451 323 451
            H49
            Q37 451 37 439 Z
          "
          fill={`url(#${ids.acid})`}
          stroke="#965742"
          strokeWidth="1.4"
        />

        {/* Soil surface */}
        <path
          d="M37 283 Q78 275 115 283 T190 283 T260 283 T335 283"
          fill="none"
          stroke="#83A65D"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Soil stratum */}
        <path
          d="M38 350 Q96 337 148 350 T250 350 T334 347"
          fill="none"
          stroke="#F5C6A2"
          strokeWidth="2"
          opacity="0.3"
        />

        <path
          d="M38 401 Q98 389 155 401 T260 401 T334 399"
          fill="none"
          stroke="#4E2C25"
          strokeWidth="2"
          opacity="0.24"
        />

        {/* Soil particles */}
        <g fill="#F7CCAC" opacity="0.55">
          <circle cx="58" cy="305" r="2.3" />
          <circle cx="85" cy="376" r="3" />
          <circle cx="117" cy="300" r="2" />
          <circle cx="302" cy="307" r="3" />
          <circle cx="285" cy="371" r="2.1" />
          <circle cx="59" cy="423" r="2.5" />
          <circle cx="236" cy="425" r="3" />
          <circle cx="310" cy="429" r="2" />
          <circle cx="278" cy="323" r="1.7" />
          <circle cx="106" cy="430" r="1.8" />
        </g>

        {/* Roots */}
        <g
          fill="none"
          stroke="#F5D0A7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M183 282 Q181 309 185 328 Q184 345 173 364" />
          <path d="M183 307 Q164 318 150 337 L143 355" />
          <path d="M184 319 Q205 329 216 351 L224 369" />
          <path d="M179 345 Q163 352 162 375" />
          <path d="M199 338 Q211 345 211 359" />
          <path d="M173 364 L167 389" />
          <path d="M224 369 L219 389" />
        </g>

        {/* H+ ions */}
        {[
          [77, 317],
          [282, 321],
          [110, 392],
          [274, 410],
        ].map(([x, y], index) => (
          <g key={`h-ion-${index}`}>
            <circle
              cx={x}
              cy={y}
              r="16"
              fill="#FEE2E2"
              stroke="#FCA5A5"
              strokeWidth="1.5"
            />
            <circle
              cx={x - 4}
              cy={y - 5}
              r="4"
              fill="#FFFFFF"
              opacity="0.7"
            />
            <text
              x={x}
              y={y + 4.5}
              textAnchor="middle"
              fill="#B91C1C"
              fontSize="12"
              fontWeight="900"
            >
              H⁺
            </text>
          </g>
        ))}

        {/* Soil warning label */}
        <rect
          x="90"
          y="427"
          width="190"
          height="25"
          rx="12.5"
          fill="#6F342A"
          stroke="#EBAE93"
          strokeWidth="1"
        />

        <text
          x="185"
          y="443.5"
          textAnchor="middle"
          fill="#FFF7ED"
          fontSize="10.5"
          fontWeight="800"
        >
          H⁺ TÍCH TỤ • pH GIẢM
        </text>

        {/* Bottom caption */}
        <text
          x="186"
          y="470"
          textAnchor="middle"
          fill="#9A3412"
          fontSize="10"
          fontWeight="800"
        >
          Nitrat hóa giải phóng H⁺
        </text>
      </g>

      {/* ====================================================
          03. RIGHT CARD — AMMONIA VOLATILIZATION
      ==================================================== */}

      <g fontFamily="Inter, Arial, sans-serif">
        <rect
          x="370"
          y="128"
          width="328"
          height="355"
          rx="20"
          fill="#FFFFFF"
          fillOpacity="0.96"
          stroke="#F2D9A8"
          strokeWidth="1.4"
          filter={`url(#${ids.shadow})`}
        />

        {/* Section heading */}
        <rect
          x="385"
          y="142"
          width="32"
          height="32"
          rx="10"
          fill="#FEF3C7"
        />

        <path
          d="M401 149 V160 M397 156 L401 161 L405 156"
          fill="none"
          stroke="#B45309"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="427"
          y="154"
          fill="#92400E"
          fontSize="11.5"
          fontWeight="900"
          letterSpacing="0.15"
        >
          02 / GẶP VÔI
        </text>

        <text
          x="427"
          y="171"
          fill="#9A8061"
          fontSize="10"
          fontWeight="500"
        >
          Nguy cơ thất thoát nitơ dạng NH₃
        </text>

        <rect
          x="610"
          y="142"
          width="72"
          height="25"
          rx="12.5"
          fill="#FFF7ED"
          stroke="#FED7AA"
        />

        <text
          x="646"
          y="158.5"
          textAnchor="middle"
          fill="#C2410C"
          fontSize="9.5"
          fontWeight="900"
        >
          CẢNH BÁO
        </text>

        {/* Sky */}
        <rect
          x="385"
          y="188"
          width="298"
          height="103"
          rx="13"
          fill="#FFF8F5"
        />

        <circle
          cx="541"
          cy="229"
          r="62"
          fill={`url(#${ids.glow})`}
        />

        {/* Volatilization arrow */}
        <path
          d="M535 300 C536 276 536 252 540 224"
          fill="none"
          stroke="#E11D48"
          strokeWidth="3"
          strokeLinecap="round"
          markerEnd={`url(#${ids.arrow})`}
          className="gas-flow"
        />

        {/* NH3 bubbles */}
        <g className="gas-bubble" filter={`url(#${ids.shadow})`}>
          <circle
            cx="492"
            cy="238"
            r="21"
            fill={`url(#${ids.gas})`}
            stroke="#FB7185"
            strokeWidth="1.7"
          />

          <ellipse
            cx="486"
            cy="231"
            rx="7"
            ry="4"
            fill="#FFFFFF"
            opacity="0.85"
          />

          <text
            x="492"
            y="242.5"
            textAnchor="middle"
            fill="#BE123C"
            fontSize="11.5"
            fontWeight="900"
          >
            NH₃
          </text>
        </g>

        <g className="gas-bubble-delayed" filter={`url(#${ids.shadow})`}>
          <circle
            cx="572"
            cy="212"
            r="26"
            fill={`url(#${ids.gas})`}
            stroke="#FB7185"
            strokeWidth="1.7"
          />

          <ellipse
            cx="564"
            cy="203"
            rx="8"
            ry="4.2"
            fill="#FFFFFF"
            opacity="0.9"
          />

          <text
            x="572"
            y="217"
            textAnchor="middle"
            fill="#BE123C"
            fontSize="13"
            fontWeight="900"
          >
            NH₃
          </text>
        </g>

        <g className="gas-bubble">
          <circle
            cx="625"
            cy="247"
            r="15"
            fill="#FFE4E6"
            stroke="#FDA4AF"
            strokeWidth="1.4"
          />

          <text
            x="625"
            y="251"
            textAnchor="middle"
            fill="#BE123C"
            fontSize="9.5"
            fontWeight="900"
          >
            NH₃
          </text>
        </g>

        <rect
          x="458"
          y="190"
          width="92"
          height="21"
          rx="10.5"
          fill="#FFFFFF"
          stroke="#FECDD3"
        />

        <text
          x="504"
          y="204.5"
          textAnchor="middle"
          fill="#BE123C"
          fontSize="9.2"
          fontWeight="900"
        >
          KHÍ BAY LÊN
        </text>

        {/* Soil body */}
        <path
          d="
            M385 283
            Q425 275 463 283
            T538 283
            T610 283
            T683 283
            L683 440
            Q683 451 671 451
            H397
            Q385 451 385 439 Z
          "
          fill={`url(#${ids.lime})`}
          stroke="#B5A48C"
          strokeWidth="1.4"
        />

        {/* Ground surface */}
        <path
          d="M385 283 Q425 275 463 283 T538 283 T610 283 T683 283"
          fill="none"
          stroke="#A9B78A"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Soil layers */}
        <path
          d="M386 350 Q440 337 494 350 T594 350 T682 347"
          fill="none"
          stroke="#F8F0DF"
          strokeWidth="2"
          opacity="0.8"
        />

        <path
          d="M386 400 Q445 388 499 400 T598 400 T682 397"
          fill="none"
          stroke="#8E806D"
          strokeWidth="2"
          opacity="0.24"
        />

        {/* Lime particles */}
        <g
          fill="#F9F4E8"
          stroke="#B9AC96"
          strokeWidth="1"
        >
          <path d="M405 304 L415 299 L424 306 L421 316 L409 317 Z" />
          <path d="M615 305 L627 302 L634 310 L630 319 L618 318 Z" />
          <path d="M443 378 L452 372 L462 380 L459 390 L447 391 Z" />
          <path d="M648 391 L659 386 L667 395 L663 405 L652 403 Z" />
          <path d="M586 420 L596 416 L605 424 L600 433 L590 432 Z" />
        </g>

        <g fill="#8C7F6D" opacity="0.5">
          <circle cx="432" cy="327" r="2" />
          <circle cx="606" cy="341" r="2.5" />
          <circle cx="472" cy="420" r="2" />
          <circle cx="659" cy="329" r="2" />
          <circle cx="406" cy="420" r="2.5" />
          <circle cx="551" cy="391" r="2" />
        </g>

        {/* NH4+ ion */}
        <g filter={`url(#${ids.shadow})`}>
          <circle
            cx="455"
            cy="326"
            r="23"
            fill="#8B5CF6"
            stroke="#E9D5FF"
            strokeWidth="2"
          />

          <ellipse
            cx="448"
            cy="318"
            rx="7"
            ry="4"
            fill="#FFFFFF"
            opacity="0.32"
          />

          <text
            x="455"
            y="330.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="11.5"
            fontWeight="900"
          >
            NH₄⁺
          </text>
        </g>

        {/* Plus sign */}
        <text
          x="496"
          y="331"
          textAnchor="middle"
          fill="#64574A"
          fontSize="22"
          fontWeight="800"
        >
          +
        </text>

        {/* OH- ion */}
        <g filter={`url(#${ids.shadow})`}>
          <circle
            cx="537"
            cy="326"
            r="23"
            fill="#0EA5E9"
            stroke="#BAE6FD"
            strokeWidth="2"
          />

          <ellipse
            cx="530"
            cy="318"
            rx="7"
            ry="4"
            fill="#FFFFFF"
            opacity="0.34"
          />

          <text
            x="537"
            y="330.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12.5"
            fontWeight="900"
          >
            OH⁻
          </text>
        </g>

        {/* Reaction connector */}
        <path
          d="M561 326 H588"
          stroke="#875C27"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M582 320 L589 326 L582 332"
          stroke="#875C27"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Lime label */}
        <rect
          x="594"
          y="315"
          width="73"
          height="23"
          rx="11.5"
          fill="#FFF7ED"
          stroke="#D6C2A0"
        />

        <text
          x="630.5"
          y="330.5"
          textAnchor="middle"
          fill="#854D0E"
          fontSize="9.5"
          fontWeight="900"
        >
          VÔI / KIỀM
        </text>

        {/* Chemical equation */}
        <rect
          x="396"
          y="365"
          width="276"
          height="42"
          rx="10"
          fill="#FFFBEB"
          stroke="#EACB95"
          strokeWidth="1.3"
        />

        <text
          x="534"
          y="382"
          textAnchor="middle"
          fill="#854D0E"
          fontSize="9"
          fontWeight="800"
        >
          KHI pH TĂNG
        </text>

        <text
          x="534"
          y="397"
          textAnchor="middle"
          fill="#78350F"
          fontSize="12.2"
          fontWeight="900"
        >
          NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O
        </text>

        {/* Bottom caption */}
        <text
          x="534"
          y="470"
          textAnchor="middle"
          fill="#B91C1C"
          fontSize="10"
          fontWeight="800"
        >
          NH₃ thoát ra → thất thoát nitơ
        </text>
      </g>

      {/* ====================================================
          04. BOTTOM WARNING / PRACTICAL TAKEAWAY
      ==================================================== */}

      <g fontFamily="Inter, Arial, sans-serif">
        <rect
          x="22"
          y="497"
          width="676"
          height="79"
          rx="17"
          fill="#FFFFFF"
          stroke="#F0C7BC"
          strokeWidth="1.3"
          filter={`url(#${ids.shadow})`}
        />

        {/* Warning icon */}
        <circle
          cx="54"
          cy="526"
          r="17"
          fill="#FEE2E2"
          stroke="#FECACA"
        />

        <path
          d="M54 516 L65 535 H43 Z"
          fill="#DC2626"
          stroke="#B91C1C"
          strokeWidth="1"
          strokeLinejoin="round"
        />

        <path
          d="M54 522 V528"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="54" cy="531.5" r="1.2" fill="#FFFFFF" />

        <text
          x="82"
          y="519"
          fill="#991B1B"
          fontSize="10"
          fontWeight="900"
          letterSpacing="1"
        >
          NGUYÊN TẮC BÓN PHÂN
        </text>

        <text
          x="82"
          y="538"
          fill="#442D29"
          fontSize="12"
          fontWeight="900"
        >
          Không trộn trực tiếp phân đạm amoni với vôi bột.
        </text>

        <text
          x="82"
          y="555"
          fill="#806B63"
          fontSize="10.5"
          fontWeight="500"
        >
          Bón riêng thời điểm, theo khuyến cáo kỹ thuật và điều kiện đất.
        </text>

        <g transform="translate(636 512)">
          <rect
            width="47"
            height="43"
            rx="11"
            fill="#FFF7ED"
            stroke="#FED7AA"
          />

          <path
            d="M12 21 L19 28 L35 12"
            fill="none"
            stroke="#C2410C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <text
            x="23.5"
            y="38"
            textAnchor="middle"
            fill="#9A3412"
            fontSize="7.5"
            fontWeight="900"
          >
            LƯU Ý
          </text>
        </g>
      </g>
    </svg>
  );
}
