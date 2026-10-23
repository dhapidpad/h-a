import React, { useId } from 'react';

export default function SvgChlorophyllFactory() {
  const uid = useId().replace(/:/g, '');

  const id = {
    bg: `bio-bg-${uid}`,
    leaf: `leaf-${uid}`,
    chloroplast: `chloroplast-${uid}`,
    ionPurple: `ion-purple-${uid}`,
    ionBlue: `ion-blue-${uid}`,
    sun: `sun-${uid}`,
    shadow: `shadow-${uid}`,
    softGlow: `soft-glow-${uid}`,
    dots: `dots-${uid}`,
    arrow: `arrow-${uid}`,
  };

  return (
    <svg
      viewBox="0 0 720 600"
      width="100%"
      height="auto"
      role="img"
      aria-label="Infographic mô tả lá cây, lục lạp, các dạng nitơ khoáng và quá trình đồng hóa nitơ để tổng hợp protein"
      style={{
        display: 'block',
        width: '100%',
        height: 'auto',
        maxHeight: '100%',
        borderRadius: 22,
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Nền sinh học cao cấp */}
        <linearGradient id={id.bg} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7FFF8" />
          <stop offset="48%" stopColor="#E7FBEF" />
          <stop offset="100%" stopColor="#E8F5FF" />
        </linearGradient>

        <linearGradient id={id.leaf} x1="15%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="35%" stopColor="#4ADE80" />
          <stop offset="72%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>

        <linearGradient id={id.chloroplast} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFCCB" />
          <stop offset="42%" stopColor="#BBF7D0" />
          <stop offset="100%" stopColor="#6EE7B7" />
        </linearGradient>

        <linearGradient id={id.ionPurple} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="48%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>

        <linearGradient id={id.ionBlue} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="48%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        <linearGradient id={id.sun} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        <radialGradient id={id.softGlow}>
          <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.8" />
          <stop offset="65%" stopColor="#86EFAC" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#86EFAC" stopOpacity="0" />
        </radialGradient>

        <pattern
          id={id.dots}
          width="19"
          height="19"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.15" fill="#16A34A" opacity="0.12" />
        </pattern>

        <filter id={id.shadow} x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow
            dx="0"
            dy="7"
            stdDeviation="8"
            floodColor="#14532D"
            floodOpacity="0.13"
          />
        </filter>

        <filter id={id.softGlow} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <marker
          id={id.arrow}
          markerWidth="7"
          markerHeight="7"
          refX="5.5"
          refY="3.5"
          orient="auto"
        >
          <path d="M0 0 L7 3.5 L0 7 Z" fill="#16A34A" />
        </marker>
      </defs>

      <style>{`
        .bio-float {
          animation: bioFloat 3.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        .bio-float-delayed {
          animation: bioFloat 3.8s ease-in-out 1.1s infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        .bio-flow {
          stroke-dasharray: 5 5;
          animation: bioFlow 8s linear infinite;
        }

        @keyframes bioFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes bioFlow {
          to { stroke-dashoffset: -80; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bio-float,
          .bio-float-delayed,
          .bio-flow {
            animation: none;
          }
        }
      `}</style>

      {/* ======================================================
          01. KHUNG NỀN VÀ HEADER
      ====================================================== */}

      <rect
        width="720"
        height="600"
        rx="22"
        fill={`url(#${id.bg})`}
        stroke="#BBEACB"
        strokeWidth="1.5"
      />

      <rect
        x="0"
        y="0"
        width="720"
        height="600"
        rx="22"
        fill={`url(#${id.dots})`}
      />

      <circle cx="690" cy="65" r="83" fill="#BAE6FD" opacity="0.16" />
      <circle cx="14" cy="440" r="98" fill="#86EFAC" opacity="0.13" />

      <g>
        <rect
          x="24"
          y="18"
          width="246"
          height="25"
          rx="12.5"
          fill="#FFFFFF"
          fillOpacity="0.94"
          stroke="#BBF7D0"
        />
        <circle cx="39" cy="30.5" r="4" fill="#22C55E" />

        <text
          x="50"
          y="34.5"
          fill="#15803D"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="1"
          fontFamily="Inter, Arial, sans-serif"
        >
          SINH HỌC  •  INFOGRAPHIC 04
        </text>

        <text
          x="24"
          y="70"
          fill="#123B2A"
          fontSize="26"
          fontWeight="900"
          letterSpacing="-0.7"
          fontFamily="Inter, Arial, sans-serif"
        >
          Dinh dưỡng nitơ ở thực vật
        </text>

        <text
          x="26"
          y="92"
          fill="#557566"
          fontSize="12"
          fontWeight="500"
          fontFamily="Inter, Arial, sans-serif"
        >
          Từ ion khoáng đến axit amin và protein
        </text>

        <g transform="translate(578 24)">
          <rect
            width="116"
            height="34"
            rx="17"
            fill="#123B2A"
          />
          <circle cx="18" cy="17" r="5" fill="#4ADE80" />
          <text
            x="31"
            y="21"
            fill="#FFFFFF"
            fontSize="10.5"
            fontWeight="800"
            letterSpacing="0.7"
            fontFamily="Inter, Arial, sans-serif"
          >
            PLANT LAB
          </text>
        </g>
      </g>

      <path
        d="M24 101 H696"
        stroke="#B7DCC6"
        strokeWidth="1"
      />

      {/* ======================================================
          02. THẺ LÁ CÂY
      ====================================================== */}

      <g>
        <rect
          x="20"
          y="112"
          width="254"
          height="334"
          rx="19"
          fill="#FFFFFF"
          fillOpacity="0.9"
          stroke="#D4F0DC"
          strokeWidth="1.3"
          filter={`url(#${id.shadow})`}
        />

        <rect
          x="20"
          y="112"
          width="254"
          height="334"
          rx="19"
          fill={`url(#${id.dots})`}
          opacity="0.6"
        />

        <g>
          <rect
            x="36"
            y="127"
            width="24"
            height="24"
            rx="8"
            fill="#DCFCE7"
          />
          <path
            d="M43 143 C42 135 49 132 54 132 C54 139 50 143 43 143 Z"
            fill="#16A34A"
          />
          <path
            d="M43 143 L51 135"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          <text
            x="68"
            y="143"
            fill="#166534"
            fontSize="12"
            fontWeight="900"
            letterSpacing="0.4"
            fontFamily="Inter, Arial, sans-serif"
          >
            01 / PHIẾN LÁ
          </text>

          <text
            x="38"
            y="163"
            fill="#739183"
            fontSize="10"
            fontWeight="500"
            fontFamily="Inter, Arial, sans-serif"
          >
            Nơi tiếp nhận ánh sáng
          </text>
        </g>

        {/* Hào quang dịu sau chiếc lá */}
        <circle
          cx="143"
          cy="276"
          r="108"
          fill={`url(#${id.softGlow})`}
          opacity="0.8"
        />

        {/* Mặt trời và tia sáng */}
        <g className="bio-float" transform="translate(57 190)">
          <g
            stroke="#F59E0B"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M0 -17 V-12" />
            <path d="M0 12 V17" />
            <path d="M-17 0 H-12" />
            <path d="M12 0 H17" />
            <path d="M-12 -12 L-8 -8" />
            <path d="M12 -12 L8 -8" />
            <path d="M-12 12 L-8 8" />
            <path d="M12 12 L8 8" />
          </g>
          <circle
            r="10.5"
            fill={`url(#${id.sun})`}
            stroke="#FBBF24"
            strokeWidth="1"
          />
          <circle r="5" fill="#FFF7CC" opacity="0.9" />
        </g>

        <path
          d="M68 203 Q79 211 91 222"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 4"
          fill="none"
          opacity="0.85"
        />

        {/* Chiếc lá nổi khối */}
        <g filter={`url(#${id.shadow})`}>
          <path
            d="
              M 139 388
              C 82 360, 45 291, 59 230
              C 69 183, 104 155, 147 158
              C 184 160, 219 181, 240 205
              C 238 278, 201 352, 139 388 Z
            "
            fill={`url(#${id.leaf})`}
            stroke="#15803D"
            strokeWidth="1.7"
          />

          {/* Ánh sáng phản chiếu trên phiến lá */}
          <path
            d="
              M 82 225
              C 99 185, 129 174, 153 176
              C 117 201, 91 256, 102 304
              C 84 286, 76 254, 82 225 Z
            "
            fill="#FFFFFF"
            opacity="0.13"
          />

          {/* Gân lá chính */}
          <path
            d="M139 388 C125 317 124 253 147 164"
            stroke="#D9FBE4"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />

          {/* Các gân phụ */}
          <g
            stroke="#D1FAE5"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.92"
          >
            <path d="M131 343 Q91 326 74 286" />
            <path d="M128 318 Q168 305 202 266" />
            <path d="M125 288 Q88 269 68 239" />
            <path d="M130 267 Q173 253 219 223" />
            <path d="M137 236 Q106 221 91 197" />
            <path d="M140 213 Q169 202 188 184" />
          </g>

          {/* Điểm sáng trên bề mặt */}
          <g fill="#FFFFFF">
            <circle cx="103" cy="247" r="2.5" opacity="0.6" />
            <circle cx="184" cy="235" r="2" opacity="0.55" />
            <circle cx="157" cy="291" r="2.4" opacity="0.6" />
            <circle cx="111" cy="310" r="1.8" opacity="0.55" />
          </g>
        </g>

        {/* Nhãn diệp lục */}
        <g>
          <rect
            x="38"
            y="401"
            width="218"
            height="29"
            rx="14.5"
            fill="#F0FDF4"
            stroke="#BBF7D0"
          />
          <circle cx="53" cy="415.5" r="5" fill="#22C55E" />
          <text
            x="65"
            y="419.5"
            fill="#166534"
            fontSize="10.5"
            fontWeight="800"
            fontFamily="Inter, Arial, sans-serif"
          >
            DIỆP LỤC
          </text>
          <path
            d="M119 408 V423"
            stroke="#BBF7D0"
            strokeWidth="1"
          />
          <text
            x="128"
            y="419.5"
            fill="#3F6C52"
            fontSize="10"
            fontWeight="600"
            fontFamily="Inter, Arial, sans-serif"
          >
            C₅₅H₇₂O₅N₄Mg
          </text>
        </g>
      </g>

      {/* ======================================================
          03. ĐƯỜNG NỐI PHÓNG ĐẠI
      ====================================================== */}

      <g
        fill="none"
        stroke="#22A35A"
        strokeWidth="1.8"
        strokeDasharray="5 5"
        opacity="0.8"
      >
        <path d="M246 218 L294 226" />
        <path d="M244 334 L294 320" />
      </g>

      <circle cx="246" cy="218" r="3.5" fill="#16A34A" />
      <circle cx="244" cy="334" r="3.5" fill="#16A34A" />

      {/* ======================================================
          04. THẺ LỤC LẠP VÀ CÁC DẠNG NITƠ
      ====================================================== */}

      <g>
        <rect
          x="290"
          y="112"
          width="410"
          height="334"
          rx="19"
          fill="#FFFFFF"
          fillOpacity="0.93"
          stroke="#D4F0DC"
          strokeWidth="1.3"
          filter={`url(#${id.shadow})`}
        />

        {/* Tiêu đề thẻ */}
        <rect
          x="306"
          y="127"
          width="24"
          height="24"
          rx="8"
          fill="#DCFCE7"
        />
        <path
          d="M313 144 C312 136 320 132 324 133 C324 140 320 144 313 144 Z"
          fill="#16A34A"
        />

        <text
          x="338"
          y="143"
          fill="#166534"
          fontSize="12"
          fontWeight="900"
          letterSpacing="0.2"
          fontFamily="Inter, Arial, sans-serif"
        >
          02 / LỤC LẠP
        </text>

        <g transform="translate(590 126)">
          <rect
            width="92"
            height="25"
            rx="12.5"
            fill="#ECFDF5"
            stroke="#BBF7D0"
          />
          <circle cx="12" cy="12.5" r="3.5" fill="#22C55E" />
          <text
            x="22"
            y="16.5"
            fill="#15803D"
            fontSize="9.5"
            fontWeight="800"
            fontFamily="Inter, Arial, sans-serif"
          >
            CHLOROPLAST
          </text>
        </g>

        {/* Vùng phát sáng */}
        <ellipse
          cx="495"
          cy="274"
          rx="160"
          ry="105"
          fill={`url(#${id.softGlow})`}
          opacity="0.7"
        />

        {/* Vỏ lục lạp */}
        <ellipse
          cx="495"
          cy="270"
          rx="141"
          ry="79"
          fill={`url(#${id.chloroplast})`}
          stroke="#16A34A"
          strokeWidth="3"
        />

        <ellipse
          cx="495"
          cy="270"
          rx="132"
          ry="70"
          fill="none"
          stroke="#F0FDF4"
          strokeWidth="2"
          opacity="0.9"
        />

        {/* Phản quang màng lục lạp */}
        <path
          d="M376 239 C405 204 468 195 517 199"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          opacity="0.68"
          strokeLinecap="round"
        />

        {/* Nhãn cơ quan */}
        <text
          x="495"
          y="223"
          textAnchor="middle"
          fill="#166534"
          fontSize="10.5"
          fontWeight="900"
          letterSpacing="0.5"
          fontFamily="Inter, Arial, sans-serif"
        >
          LỤC LẠP • DIỆP LỤC
        </text>

        {/* Các chồng tilacôit / grana */}
        <g
          fill="#15803D"
          stroke="#166534"
          strokeWidth="0.45"
        >
          {/* Cụm trái */}
          <g>
            <ellipse cx="425" cy="244" rx="19" ry="6.5" />
            <ellipse cx="425" cy="251" rx="19" ry="6.5" />
            <ellipse cx="425" cy="258" rx="19" ry="6.5" />
            <ellipse cx="425" cy="265" rx="19" ry="6.5" />
          </g>

          {/* Cụm giữa */}
          <g>
            <ellipse cx="495" cy="240" rx="22" ry="7" />
            <ellipse cx="495" cy="248" rx="22" ry="7" />
            <ellipse cx="495" cy="256" rx="22" ry="7" />
            <ellipse cx="495" cy="264" rx="22" ry="7" />
          </g>

          {/* Cụm phải */}
          <g>
            <ellipse cx="565" cy="244" rx="19" ry="6.5" />
            <ellipse cx="565" cy="251" rx="19" ry="6.5" />
            <ellipse cx="565" cy="258" rx="19" ry="6.5" />
            <ellipse cx="565" cy="265" rx="19" ry="6.5" />
          </g>
        </g>

        {/* Dải màng nối giữa các grana */}
        <g
          fill="none"
          stroke="#22A35A"
          strokeWidth="2"
          opacity="0.75"
        >
          <path d="M444 251 Q459 238 473 248" />
          <path d="M517 249 Q535 238 546 250" />
        </g>

        {/* Ion amoni NH4+ */}
        <g className="bio-float">
          <circle
            cx="438"
            cy="297"
            r="25"
            fill="#A855F7"
            opacity="0.12"
          />
          <circle
            cx="438"
            cy="297"
            r="21"
            fill={`url(#${id.ionPurple})`}
            stroke="#F3E8FF"
            strokeWidth="2"
          />
          <ellipse
            cx="431"
            cy="289"
            rx="7"
            ry="3.5"
            fill="#FFFFFF"
            opacity="0.28"
          />
          <text
            x="438"
            y="302"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12.5"
            fontWeight="900"
            fontFamily="Inter, Arial, sans-serif"
          >
            NH₄⁺
          </text>
          <text
            x="438"
            y="328"
            textAnchor="middle"
            fill="#6B21A8"
            fontSize="9.5"
            fontWeight="800"
            fontFamily="Inter, Arial, sans-serif"
          >
            AMONI
          </text>
        </g>

        {/* Ion nitrat NO3- */}
        <g className="bio-float-delayed">
          <circle
            cx="552"
            cy="297"
            r="25"
            fill="#0EA5E9"
            opacity="0.13"
          />
          <circle
            cx="552"
            cy="297"
            r="21"
            fill={`url(#${id.ionBlue})`}
            stroke="#E0F2FE"
            strokeWidth="2"
          />
          <ellipse
            cx="545"
            cy="289"
            rx="7"
            ry="3.5"
            fill="#FFFFFF"
            opacity="0.3"
          />
          <text
            x="552"
            y="302"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="12.5"
            fontWeight="900"
            fontFamily="Inter, Arial, sans-serif"
          >
            NO₃⁻
          </text>
          <text
            x="552"
            y="328"
            textAnchor="middle"
            fill="#0369A1"
            fontSize="9.5"
            fontWeight="800"
            fontFamily="Inter, Arial, sans-serif"
          >
            NITRAT
          </text>
        </g>

        {/* Các ion được đồng hóa thành hợp chất hữu cơ chứa nitơ */}
        <path
          d="M438 335 Q444 348 467 350"
          fill="none"
          stroke="#16A34A"
          strokeWidth="1.8"
          markerEnd={`url(#${id.arrow})`}
        />
        <path
          d="M552 335 Q546 348 523 350"
          fill="none"
          stroke="#16A34A"
          strokeWidth="1.8"
          markerEnd={`url(#${id.arrow})`}
        />

        <rect
          x="459"
          y="341"
          width="72"
          height="20"
          rx="10"
          fill="#166534"
          stroke="#BBF7D0"
          strokeWidth="1"
        />
        <text
          x="495"
          y="354.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="900"
          letterSpacing="0.4"
          fontFamily="Inter, Arial, sans-serif"
        >
          ĐỒNG HÓA N
        </text>

        {/* Vai trò của quang hợp và sản phẩm */}
        <g>
          <rect
            x="307"
            y="386"
            width="177"
            height="30"
            rx="10"
            fill="#FFFBEB"
            stroke="#FDE68A"
          />
          <circle cx="321" cy="401" r="4" fill="#F59E0B" />
          <text
            x="331"
            y="398.5"
            fill="#92400E"
            fontSize="8.7"
            fontWeight="800"
            fontFamily="Inter, Arial, sans-serif"
          >
            ÁNH SÁNG
          </text>
          <text
            x="331"
            y="408.5"
            fill="#A16207"
            fontSize="8.2"
            fontWeight="600"
            fontFamily="Inter, Arial, sans-serif"
          >
            + Khung carbon
          </text>

          <rect
            x="493"
            y="386"
            width="188"
            height="30"
            rx="10"
            fill="#F0FDF4"
            stroke="#BBF7D0"
          />
          <path
            d="M504 401 L510 407 L516 395"
            stroke="#16A34A"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="523"
            y="398.5"
            fill="#166534"
            fontSize="9.1"
            fontWeight="800"
            fontFamily="Inter, Arial, sans-serif"
          >
            TẠO AXIT AMIN
          </text>
          <text
            x="523"
            y="408.5"
            fill="#15803D"
            fontSize="8.5"
            fontWeight="600"
            fontFamily="Inter, Arial, sans-serif"
          >
            Nguyên liệu tổng hợp protein
          </text>
        </g>
      </g>

      {/* ======================================================
          05. LỘ TRÌNH ĐỒNG HÓA NITƠ
      ====================================================== */}

      <g>
        <rect
          x="20"
          y="460"
          width="680"
          height="120"
          rx="19"
          fill="#FFFFFF"
          fillOpacity="0.95"
          stroke="#CDEBD7"
          strokeWidth="1.3"
          filter={`url(#${id.shadow})`}
        />

        <text
          x="36"
          y="485"
          fill="#123B2A"
          fontSize="13"
          fontWeight="900"
          letterSpacing="0.15"
          fontFamily="Inter, Arial, sans-serif"
        >
          LỘ TRÌNH ĐỒNG HÓA NITƠ
        </text>

        <text
          x="684"
          y="484.5"
          textAnchor="end"
          fill="#6B8B79"
          fontSize="9.3"
          fontWeight="600"
          fontFamily="Inter, Arial, sans-serif"
        >
          TỪ DẠNG VÔ CƠ ĐẾN HỮU CƠ
        </text>

        {/* NO3- */}
        <g>
          <rect
            x="34"
            y="501"
            width="104"
            height="48"
            rx="11"
            fill="#EFF6FF"
            stroke="#BFDBFE"
          />
          <circle cx="45" cy="512" r="3" fill="#38BDF8" />
          <text
            x="86"
            y="522"
            textAnchor="middle"
            fill="#075985"
            fontSize="14"
            fontWeight="900"
            fontFamily="Inter, Arial, sans-serif"
          >
            NO₃⁻
          </text>
          <text
            x="86"
            y="538"
            textAnchor="middle"
            fill="#0369A1"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="Inter, Arial, sans-serif"
          >
            Nitrat
          </text>
        </g>

        {/* Mũi tên 1 */}
        <path
          d="M141 525 H157"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#${id.arrow})`}
        />

        {/* NO2- */}
        <g>
          <rect
            x="165"
            y="501"
            width="104"
            height="48"
            rx="11"
            fill="#F0FDFA"
            stroke="#99F6E4"
          />
          <circle cx="176" cy="512" r="3" fill="#2DD4BF" />
          <text
            x="217"
            y="522"
            textAnchor="middle"
            fill="#115E59"
            fontSize="14"
            fontWeight="900"
            fontFamily="Inter, Arial, sans-serif"
          >
            NO₂⁻
          </text>
          <text
            x="217"
            y="538"
            textAnchor="middle"
            fill="#0F766E"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="Inter, Arial, sans-serif"
          >
            Nitrit
          </text>
        </g>

        {/* Mũi tên 2 */}
        <path
          d="M272 525 H288"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#${id.arrow})`}
        />

        {/* NH4+ */}
        <g>
          <rect
            x="296"
            y="501"
            width="104"
            height="48"
            rx="11"
            fill="#FAF5FF"
            stroke="#E9D5FF"
          />
          <circle cx="307" cy="512" r="3" fill="#A855F7" />
          <text
            x="348"
            y="522"
            textAnchor="middle"
            fill="#6B21A8"
            fontSize="14"
            fontWeight="900"
            fontFamily="Inter, Arial, sans-serif"
          >
            NH₄⁺
          </text>
          <text
            x="348"
            y="538"
            textAnchor="middle"
            fill="#7E22CE"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="Inter, Arial, sans-serif"
          >
            Amoni
          </text>
        </g>

        {/* Mũi tên 3 */}
        <path
          d="M403 525 H419"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#${id.arrow})`}
        />

        {/* Axit amin */}
        <g>
          <rect
            x="427"
            y="501"
            width="104"
            height="48"
            rx="11"
            fill="#F0FDF4"
            stroke="#BBF7D0"
          />
          <circle cx="438" cy="512" r="3" fill="#22C55E" />
          <text
            x="479"
            y="522"
            textAnchor="middle"
            fill="#166534"
            fontSize="11.5"
            fontWeight="900"
            fontFamily="Inter, Arial, sans-serif"
          >
            AXIT AMIN
          </text>
          <text
            x="479"
            y="538"
            textAnchor="middle"
            fill="#15803D"
            fontSize="9.2"
            fontWeight="700"
            fontFamily="Inter, Arial, sans-serif"
          >
            Hợp chất hữu cơ
          </text>
        </g>

        {/* Mũi tên 4 */}
        <path
          d="M534 525 H550"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
          markerEnd={`url(#${id.arrow})`}
        />

        {/* Protein */}
        <g>
          <rect
            x="558"
            y="501"
            width="104"
            height="48"
            rx="11"
            fill="#166534"
            stroke="#15803D"
          />
          <circle cx="569" cy="512" r="3" fill="#86EFAC" />
          <text
            x="610"
            y="522"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="13"
            fontWeight="900"
            fontFamily="Inter, Arial, sans-serif"
          >
            PROTEIN
          </text>
          <text
            x="610"
            y="538"
            textAnchor="middle"
            fill="#D1FAE5"
            fontSize="9.2"
            fontWeight="600"
            fontFamily="Inter, Arial, sans-serif"
          >
            Chất đạm
          </text>
        </g>

        <text
          x="360"
          y="566"
          textAnchor="middle"
          fill="#63816F"
          fontSize="9.5"
          fontWeight="600"
          fontFamily="Inter, Arial, sans-serif"
        >
          Nitrat được khử thành nitrit, rồi amoni trước khi đi vào quá trình tổng hợp axit amin.
        </text>
      </g>
    </svg>
  );
}