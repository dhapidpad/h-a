
import React, { useId } from 'react';

export default function SvgPercentTubes() {
  const uid = useId().replace(/:/g, '');

  const tubes = [
    {
      name: 'Urê',
      formula: 'CO(NH₂)₂',
      percent: 46.7,
      color: '#16A34A',
      light: '#86EFAC',
      dark: '#166534',
      tag: 'CAO NHẤT',
      winner: true,
    },
    {
      name: 'Amoni clorua',
      formula: 'NH₄Cl',
      percent: 26.2,
      color: '#2878E5',
      light: '#93C5FD',
      dark: '#1D4ED8',
    },
    {
      name: 'Amoni sunfat',
      formula: '(NH₄)₂SO₄',
      percent: 21.2,
      color: '#8956E8',
      light: '#C4B5FD',
      dark: '#6D28D9',
    },
    {
      name: 'Natri nitrat',
      formula: 'NaNO₃',
      percent: 16.5,
      color: '#64748B',
      light: '#CBD5E1',
      dark: '#334155',
    },
  ];

  const chart = {
    bottom: 380,
    scale: 5,
    tubeTop: 113,
    tubeHeight: 267,
    tubeWidth: 76,
    centers: [158, 322, 486, 650],
  };

  const gridValues = [50, 40, 30, 20, 10];

  return (
    <svg
      viewBox="0 0 800 560"
      width="100%"
      height="auto"
      role="img"
      aria-label="Biểu đồ so sánh hàm lượng nitơ trong urê, amoni clorua, amoni sunfat và natri nitrat"
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 24,
      }}
    >
      <defs>
        {/* Background */}
        <linearGradient
          id={`${uid}-background`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#F8FFFB" />
          <stop offset="52%" stopColor="#F0FDF7" />
          <stop offset="100%" stopColor="#EFF6FF" />
        </linearGradient>

        {/* Glass */}
        <linearGradient
          id={`${uid}-glass`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.24" />
          <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.3" />
        </linearGradient>

        <linearGradient
          id={`${uid}-glass-edge`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient
          id={`${uid}-gold`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient
          id={`${uid}-floor`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#DCE9E1" />
          <stop offset="100%" stopColor="#B8CCBF" />
        </linearGradient>

        <radialGradient id={`${uid}-ambient`}>
          <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
        </radialGradient>

        <pattern
          id={`${uid}-dots`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="2"
            cy="2"
            r="1.1"
            fill="#16A34A"
            opacity="0.12"
          />
        </pattern>

        <filter
          id={`${uid}-shadow`}
          x="-30%"
          y="-25%"
          width="160%"
          height="165%"
        >
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="7"
            floodColor="#17412A"
            floodOpacity="0.12"
          />
        </filter>

        <filter
          id={`${uid}-glow`}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <marker
          id={`${uid}-arrow`}
          markerWidth="7"
          markerHeight="7"
          refX="5.5"
          refY="3.5"
          orient="auto"
        >
          <path
            d="M0 0 L7 3.5 L0 7 Z"
            fill="#15803D"
          />
        </marker>

        {tubes.map((tube, index) => {
          const x = chart.centers[index] - chart.tubeWidth / 2;
          const top =
            chart.bottom - tube.percent * chart.scale;

          return (
            <React.Fragment key={`defs-${index}`}>
              <linearGradient
                id={`${uid}-liquid-${index}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0.8"
              >
                <stop
                  offset="0%"
                  stopColor={tube.light}
                />
                <stop
                  offset="35%"
                  stopColor={tube.color}
                />
                <stop
                  offset="100%"
                  stopColor={tube.dark}
                />
              </linearGradient>

              <clipPath id={`${uid}-tube-clip-${index}`}>
                <rect
                  x={x + 4}
                  y={chart.tubeTop + 5}
                  width={chart.tubeWidth - 8}
                  height={chart.tubeHeight - 9}
                  rx="11"
                />
              </clipPath>

              <clipPath id={`${uid}-liquid-clip-${index}`}>
                <rect
                  x={x + 4}
                  y={top}
                  width={chart.tubeWidth - 8}
                  height={chart.bottom - top}
                  rx="9"
                />
              </clipPath>
            </React.Fragment>
          );
        })}
      </defs>

      <style>{`
        .percent-fill {
          transform-box: fill-box;
          transform-origin: center bottom;
          animation: percent-rise 850ms cubic-bezier(.2,.8,.2,1) both;
        }

        .percent-bubble {
          animation: percent-bubble 3s ease-in-out infinite;
        }

        .percent-bubble-delay {
          animation: percent-bubble 3.4s ease-in-out 0.8s infinite;
        }

        @keyframes percent-rise {
          from { transform: scaleY(.12); opacity: .25; }
          to { transform: scaleY(1); opacity: 1; }
        }

        @keyframes percent-bubble {
          0%, 100% { opacity: .36; }
          50% { opacity: .88; }
        }

        @media (prefers-reduced-motion: reduce) {
          .percent-fill,
          .percent-bubble,
          .percent-bubble-delay {
            animation: none;
          }
        }
      `}</style>

      {/* =====================================================
          01. BACKGROUND
      ===================================================== */}

      <rect
        width="800"
        height="560"
        rx="24"
        fill={`url(#${uid}-background)`}
        stroke="#D4E8DA"
        strokeWidth="1.5"
      />

      <rect
        width="800"
        height="560"
        rx="24"
        fill={`url(#${uid}-dots)`}
      />

      <circle
        cx="692"
        cy="180"
        r="160"
        fill={`url(#${uid}-ambient)`}
      />

      <circle
        cx="94"
        cy="318"
        r="120"
        fill="#86EFAC"
        opacity="0.07"
      />

      {/* =====================================================
          02. HEADER
      ===================================================== */}

      <g fontFamily="Inter, Arial, sans-serif">
        <rect
          x="28"
          y="20"
          width="218"
          height="25"
          rx="12.5"
          fill="#FFFFFF"
          stroke="#BBF7D0"
        />

        <circle
          cx="43"
          cy="32.5"
          r="4"
          fill="#22C55E"
        />

        <text
          x="55"
          y="36.5"
          fill="#166534"
          fontSize="10"
          fontWeight="900"
          letterSpacing="1"
        >
          AGRI SCIENCE / DATA LAB
        </text>

        <text
          x="28"
          y="76"
          fill="#123B2A"
          fontSize="25"
          fontWeight="900"
          letterSpacing="-0.7"
        >
          Hàm lượng nitơ trong phân bón
        </text>

        <text
          x="30"
          y="98"
          fill="#658071"
          fontSize="11"
          fontWeight="500"
        >
          So sánh tỷ lệ nitơ theo khối lượng trong các hợp chất
        </text>

        {/* Unit badge */}
        <g transform="translate(624 25)">
          <rect
            width="148"
            height="42"
            rx="13"
            fill="#123B2A"
          />

          <text
            x="74"
            y="17"
            textAnchor="middle"
            fill="#BBF7D0"
            fontSize="9"
            fontWeight="700"
            letterSpacing="1"
          >
            CHỈ SỐ ĐO
          </text>

          <text
            x="74"
            y="33"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="900"
          >
            Nitơ (N) · %
          </text>
        </g>

        <path
          d="M28 112 H772"
          stroke="#D5E7DA"
          strokeWidth="1.2"
        />
      </g>

      {/* =====================================================
          03. CHART GRID
      ===================================================== */}

      <g fontFamily="Inter, Arial, sans-serif">
        <text
          x="35"
          y="132"
          fill="#668173"
          fontSize="9"
          fontWeight="800"
          letterSpacing="0.7"
        >
          % N
        </text>

        {gridValues.map((value) => {
          const y = chart.bottom - value * chart.scale;

          return (
            <g key={`grid-${value}`}>
              <line
                x1="76"
                y1={y}
                x2="762"
                y2={y}
                stroke={value === 10 ? '#D3E3D8' : '#DCE9E0'}
                strokeWidth={value === 10 ? 1.3 : 1}
                strokeDasharray="4 6"
              />

              <text
                x="65"
                y={y + 4}
                textAnchor="end"
                fill="#82988A"
                fontSize="11"
                fontWeight="700"
              >
                {value}%
              </text>
            </g>
          );
        })}

        {/* Ground shadow */}
        <ellipse
          cx="404"
          cy="387"
          rx="315"
          ry="13"
          fill="#14532D"
          opacity="0.07"
        />

        {/* Display platform */}
        <rect
          x="82"
          y="380"
          width="680"
          height="7"
          rx="3.5"
          fill={`url(#${uid}-floor)`}
        />

        <rect
          x="106"
          y="387"
          width="632"
          height="3"
          rx="1.5"
          fill="#B6CCBF"
          opacity="0.5"
        />
      </g>

      {/* =====================================================
          04. FOUR PRECISION TUBES
      ===================================================== */}

      {tubes.map((tube, index) => {
        const center = chart.centers[index];
        const x = center - chart.tubeWidth / 2;
        const top =
          chart.bottom - tube.percent * chart.scale;
        const height = chart.bottom - top;
        const bottom = chart.bottom;
        const w = chart.tubeWidth;

        return (
          <g
            key={tube.formula}
            fontFamily="Inter, Arial, sans-serif"
          >
            {/* Winner halo */}
            {tube.winner && (
              <g>
                <ellipse
                  cx={center}
                  cy={252}
                  rx="65"
                  ry="151"
                  fill="#86EFAC"
                  opacity="0.12"
                />

                <ellipse
                  cx={center}
                  cy={252}
                  rx="49"
                  ry="135"
                  fill="#86EFAC"
                  opacity="0.09"
                />
              </g>
            )}

            {/* Glass tube shadow */}
            <rect
              x={x}
              y={chart.tubeTop}
              width={w}
              height={chart.tubeHeight}
              rx="14"
              fill="#FFFFFF"
              fillOpacity="0.48"
              stroke="#B8C9C3"
              strokeWidth="1.7"
              filter={`url(#${uid}-shadow)`}
            />

            {/* Liquid */}
            <g
              clipPath={`url(#${uid}-tube-clip-${index})`}
            >
              <g className="percent-fill">
                <g
                  clipPath={`url(#${uid}-liquid-clip-${index})`}
                >
                  <path
                    d={`
                      M ${x + 4} ${top + 8}
                      Q ${x + 4} ${top} ${x + 12} ${top}
                      H ${x + w - 12}
                      Q ${x + w - 4} ${top} ${x + w - 4} ${top + 8}
                      V ${bottom - 10}
                      Q ${x + w / 2} ${bottom + 3} ${x + 4} ${bottom - 10}
                      Z
                    `}
                    fill={`url(#${uid}-liquid-${index})`}
                    opacity="0.94"
                  />

                  {/* Curved liquid surface */}
                  <ellipse
                    cx={center}
                    cy={top + 2}
                    rx={w / 2 - 5}
                    ry="5"
                    fill={tube.light}
                    opacity="0.95"
                  />

                  <ellipse
                    cx={center}
                    cy={top + 3}
                    rx={w / 2 - 11}
                    ry="2.3"
                    fill="#FFFFFF"
                    opacity="0.4"
                  />

                  {/* Micro bubbles */}
                  <g fill="#FFFFFF">
                    <circle
                      className="percent-bubble"
                      cx={x + 22}
                      cy={top + 28}
                      r="3.1"
                      opacity="0.65"
                    />

                    <circle
                      className="percent-bubble-delay"
                      cx={x + 51}
                      cy={top + 54}
                      r="4"
                      opacity="0.58"
                    />

                    <circle
                      cx={x + 29}
                      cy={top + 84}
                      r="2.3"
                      opacity="0.7"
                    />

                    <circle
                      cx={x + 47}
                      cy={top + 112}
                      r="2"
                      opacity="0.4"
                    />

                    <circle
                      cx={x + 20}
                      cy={top + 145}
                      r="2.5"
                      opacity="0.4"
                    />
                  </g>
                </g>
              </g>
            </g>

            {/* Glass reflections */}
            <path
              d={`
                M ${x + 9} ${chart.tubeTop + 18}
                V ${chart.tubeTop + chart.tubeHeight - 25}
              `}
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.78"
            />

            <path
              d={`
                M ${x + w - 8} ${chart.tubeTop + 23}
                V ${chart.tubeTop + chart.tubeHeight - 34}
              `}
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Measurement ticks */}
            <g
              stroke="#FFFFFF"
              strokeWidth="1.4"
              opacity="0.85"
            >
              {[0, 1, 2, 3, 4].map((tick) => {
                const tickY = chart.tubeTop + 59 + tick * 40;

                return (
                  <line
                    key={tick}
                    x1={x + 6}
                    y1={tickY}
                    x2={x + 14}
                    y2={tickY}
                  />
                );
              })}
            </g>

            {/* Glass rim */}
            <ellipse
              cx={center}
              cy={chart.tubeTop + 2}
              rx={w / 2 - 2}
              ry="5.5"
              fill={`url(#${uid}-glass-edge)`}
              stroke="#B9C9C3"
              strokeWidth="1.1"
            />

            <ellipse
              cx={center}
              cy={chart.tubeTop + 2}
              rx={w / 2 - 7}
              ry="2.5"
              fill="#FFFFFF"
              opacity="0.8"
            />

            {/* Percentage label */}
            <g filter={`url(#${uid}-shadow)`}>
              <rect
                x={center - 43}
                y={top - 29}
                width="86"
                height="24"
                rx="8"
                fill={tube.winner ? '#166534' : tube.color}
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />

              <text
                x={center}
                y={top - 12.5}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="900"
              >
                {tube.percent.toFixed(1)}%
              </text>
            </g>

            {/* Gold winner crown */}
            {tube.winner && (
              <g transform={`translate(${center}, 91)`}>
                <ellipse
                  cx="0"
                  cy="16"
                  rx="25"
                  ry="7"
                  fill="#D97706"
                  opacity="0.16"
                />

                <path
                  d="M-21 0 L-14 14 L-7 5 L0 14 L7 5 L14 14 L21 0 L17 20 L-17 20 Z"
                  fill={`url(#${uid}-gold)`}
                  stroke="#B7790A"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />

                <path
                  d="M-15 16 H15"
                  stroke="#FEF3C7"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <circle cx="-21" cy="-1" r="3.3" fill="#FDE68A" />
                <circle cx="-7" cy="4" r="3.3" fill="#FDE68A" />
                <circle cx="7" cy="4" r="3.3" fill="#FDE68A" />
                <circle cx="21" cy="-1" r="3.3" fill="#FDE68A" />
              </g>
            )}

            {/* Chemical identity card */}
            <g>
              <rect
                x={center - 72}
                y="398"
                width="144"
                height="50"
                rx="12"
                fill="#FFFFFF"
                stroke={tube.winner ? '#86EFAC' : '#E2E8F0'}
                strokeWidth={tube.winner ? '1.8' : '1.2'}
                filter={`url(#${uid}-shadow)`}
              />

              <rect
                x={center - 62}
                y="408"
                width="4"
                height="29"
                rx="2"
                fill={tube.color}
              />

              <text
                x={center + 4}
                y="419"
                textAnchor="middle"
                fill="#172D21"
                fontSize={tube.name.length > 12 ? '10.8' : '12'}
                fontWeight="900"
              >
                {tube.name}
              </text>

              <text
                x={center + 4}
                y="436"
                textAnchor="middle"
                fill={tube.dark}
                fontSize="11.5"
                fontWeight="700"
              >
                {tube.formula}
              </text>
            </g>
          </g>
        );
      })}

      {/* =====================================================
          05. CONCLUSION PANEL
      ===================================================== */}

      <g fontFamily="Inter, Arial, sans-serif">
        <rect
          x="28"
          y="465"
          width="744"
          height="76"
          rx="17"
          fill="#FFFFFF"
          stroke="#CDE8D6"
          strokeWidth="1.2"
          filter={`url(#${uid}-shadow)`}
        />

        {/* Accent */}
        <rect
          x="28"
          y="465"
          width="7"
          height="76"
          rx="3.5"
          fill="#22C55E"
        />

        {/* Icon */}
        <circle
          cx="67"
          cy="503"
          r="22"
          fill="#DCFCE7"
          stroke="#BBF7D0"
        />

        <path
          d="M56 503 L64 511 L79 494"
          fill="none"
          stroke="#15803D"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="104"
          y="490"
          fill="#15803D"
          fontSize="9.5"
          fontWeight="900"
          letterSpacing="1.2"
        >
          KẾT LUẬN
        </text>

        <text
          x="104"
          y="510"
          fill="#163D29"
          fontSize="13"
          fontWeight="900"
        >
          Urê có tỷ lệ nitơ theo khối lượng cao nhất trong nhóm so sánh.
        </text>

        <text
          x="104"
          y="526"
          fill="#6A8374"
          fontSize="10.5"
          fontWeight="500"
        >
          Số liệu xấp xỉ tính theo công thức hóa học của các hợp chất tinh khiết.
        </text>

        <g transform="translate(683 485)">
          <rect
            width="70"
            height="36"
            rx="10"
            fill="#F0FDF4"
            stroke="#BBF7D0"
          />
          <text
            x="35"
            y="14"
            textAnchor="middle"
            fill="#658071"
            fontSize="8"
            fontWeight="800"
          >
            TOP
          </text>
          <text
            x="35"
            y="28"
            textAnchor="middle"
            fill="#15803D"
            fontSize="14"
            fontWeight="900"
          >
            #01
          </text>
        </g>
      </g>
    </svg>
  );
}
