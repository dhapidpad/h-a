
import React from "react";

export default function SvgBasalRocket() {
  const id = React.useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 960 720"
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
        So sánh bón lót và bón thúc phân lân
      </title>

      <desc id={`${id}-desc`}>
        Minh họa hai lát cắt đất: bón lót giúp rễ non tiếp cận
        nguồn lân sớm hơn, trong khi lân bón trên mặt đất có thể
        nằm xa vùng rễ hấp thụ.
      </desc>

      <defs>
        {/* Nền tổng thể */}
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="55%" stopColor="#F0FDF4" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>

        {/* Màu đất */}
        <linearGradient
          id={`${id}-soil`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#70513D" />
          <stop offset="52%" stopColor="#59402F" />
          <stop offset="100%" stopColor="#3E3028" />
        </linearGradient>

        <linearGradient
          id={`${id}-soil-deep`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#987052" stopOpacity=".12" />
          <stop offset="100%" stopColor="#1F2937" stopOpacity=".28" />
        </linearGradient>

        {/* Thảm cỏ */}
        <linearGradient
          id={`${id}-grass`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>

        {/* Phân lân */}
        <linearGradient
          id={`${id}-phosphorus`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="52%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>

        {/* Thân cây */}
        <linearGradient
          id={`${id}-stem`}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>

        {/* Bóng đổ */}
        {/* Texture đất */}
        <pattern
          id={`${id}-texture`}
          width="38"
          height="34"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="8" cy="9" r="1.2" fill="#E7C9A5" opacity=".24" />
          <circle cx="27" cy="21" r="1.6" fill="#241A14" opacity=".23" />
          <path
            d="M17 5l3 2M5 27l4-1"
            stroke="#D6B28D"
            strokeWidth="1"
            opacity=".22"
          />
          <circle cx="34" cy="5" r=".8" fill="#FFFFFF" opacity=".17" />
        </pattern>

        <clipPath id={`${id}-left-soil`}>
          <rect x="54" y="236" width="394" height="244" rx="8" />
        </clipPath>

        <clipPath id={`${id}-right-soil`}>
          <rect x="512" y="236" width="394" height="244" rx="8" />
        </clipPath>
      </defs>

      {/* =====================================================
          01. BACKGROUND & HEADING
      ===================================================== */}

      <rect
        width="960"
        height="720"
        rx="28"
        fill={`url(#${id}-bg)`}
        stroke="#DDD6FE"
        strokeWidth="1.5"
      />

      {/* Trang trí nền */}
      <circle cx="910" cy="54" r="72" fill="#BBF7D0" opacity=".18" />
      <circle cx="878" cy="80" r="35" fill="#C4B5FD" opacity=".14" />
      <circle cx="36" cy="575" r="48" fill="#86EFAC" opacity=".12" />

      <rect
        x="40"
        y="27"
        width="7"
        height="24"
        rx="3.5"
        fill="#22C55E"
      />

      <text
        x="60"
        y="43"
        fontSize="12"
        fontWeight="800"
        letterSpacing="2.2"
        fill="#15803D"
      >
        KIẾN THỨC NÔNG NGHIỆP
      </text>

      <text
        x="40"
        y="79"
        fontSize="27"
        fontWeight="900"
        fill="#172B24"
        letterSpacing="-.8"
      >
        LÂN: BÓN ĐÚNG CHỖ,
        <tspan fill="#16A34A"> RỄ HẤP THU TỐT HƠN</tspan>
      </text>

      <text
        x="41"
        y="105"
        fontSize="13"
        fontWeight="500"
        fill="#64748B"
      >
        So sánh vị trí phân lân và khả năng tiếp cận của bộ rễ non
      </text>

      {/* =====================================================
          02. LEFT PANEL — BÓN LÓT
      ===================================================== */}

      <g>
        <rect
          x="32"
          y="130"
          width="438"
          height="470"
          rx="23"
          fill="#FFFFFF"
          stroke="#D1FAE5"
          strokeWidth="1.5"
        />
      </g>

      {/* Header bên trái */}
      <rect
        x="53"
        y="151"
        width="35"
        height="35"
        rx="12"
        fill="#DCFCE7"
      />

      <circle cx="70.5" cy="168.5" r="9" fill="#16A34A" />

      <path
        d="M66 168l3 3 6-7"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <text
        x="98"
        y="165"
        fontSize="15"
        fontWeight="900"
        fill="#166534"
      >
        BÓN LÓT ĐÚNG CÁCH
      </text>

      <text
        x="98"
        y="181"
        fontSize="13"
        fontWeight="600"
        fill="#65A30D"
        letterSpacing=".6"
      >
        ĐƯA PHÂN GẦN VÙNG RỄ
      </text>

      <rect
        x="370"
        y="153"
        width="77"
        height="27"
        rx="13.5"
        fill="#F0FDF4"
      />

      <text
        x="408.5"
        y="170.5"
        fontSize="13"
        fontWeight="800"
        textAnchor="middle"
        fill="#15803D"
      >
        TỐI ƯU
      </text>

      {/* Lát cắt đất */}
      <rect
        x="54"
        y="236"
        width="394"
        height="244"
        rx="9"
        fill={`url(#${id}-soil)`}
      />

      <rect
        x="54"
        y="236"
        width="394"
        height="244"
        rx="9"
        fill={`url(#${id}-texture)`}
      />

      <rect
        x="54"
        y="236"
        width="394"
        height="244"
        rx="9"
        fill={`url(#${id}-soil-deep)`}
      />

      {/* Mặt đất */}
      <rect
        x="54"
        y="223"
        width="394"
        height="17"
        rx="5"
        fill={`url(#${id}-grass)`}
      />

      <path
        d="M54 231 Q65 226 76 231 T98 230 T120 231 T143 230 T165 231 T188 230 T211 231 T234 230 T257 231 T280 230 T303 231 T326 230 T349 231 T372 230 T395 231 T418 230 T448 231"
        fill="none"
        stroke="#15803D"
        strokeWidth="1.4"
        opacity=".8"
      />

      {/* Lớp phân bón lót */}
      <rect
        x="74"
        y="366"
        width="354"
        height="44"
        rx="10"
        fill="#A78BFA"
        opacity=".19"
      />

      <rect
        x="74"
        y="366"
        width="354"
        height="44"
        rx="10"
        fill={`url(#${id}-phosphorus)`}
        opacity=".5"
      />

      <rect
        x="74"
        y="366"
        width="354"
        height="44"
        rx="10"
        fill="none"
        stroke="#C4B5FD"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />

      {/* Hạt phân lân trong đất */}
      {[
        [92, 378, 3],
        [111, 395, 3.5],
        [132, 380, 2.5],
        [151, 398, 3],
        [171, 378, 3.2],
        [191, 396, 2.5],
        [211, 379, 3],
        [231, 396, 3.3],
        [275, 379, 2.5],
        [297, 397, 3.2],
        [319, 379, 3],
        [340, 397, 2.7],
        [361, 380, 3.2],
        [383, 396, 3],
        [404, 379, 2.8],
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={i % 2 ? "#DDD6FE" : "#F5F3FF"}
          stroke="#7C3AED"
          strokeWidth=".8"
        />
      ))}

      {/* Thân cây và hai lá mầm */}
      <path
        d="M251 237 C250 226 251 214 251 202"
        fill="none"
        stroke={`url(#${id}-stem)`}
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path
        d="M251 215 C228 213 222 195 229 190 C241 190 250 201 251 215Z"
        fill="#4ADE80"
        stroke="#16A34A"
        strokeWidth="1.2"
      />

      <path
        d="M251 207 C257 188 276 187 282 193 C282 205 267 214 251 215Z"
        fill="#86EFAC"
        stroke="#22C55E"
        strokeWidth="1.2"
      />

      <path
        d="M232 195 Q243 202 249 212 M275 196 Q262 203 253 212"
        fill="none"
        stroke="#16A34A"
        strokeWidth="1.1"
        opacity=".8"
      />

      {/* Hạt đang nảy mầm */}
      <ellipse
        cx="251"
        cy="247"
        rx="10"
        ry="13"
        fill="#EAB308"
        stroke="#FDE68A"
        strokeWidth="1.5"
      />

      <path
        d="M245 241 Q252 247 256 254"
        fill="none"
        stroke="#FEF3C7"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Rễ chính */}
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M251 258 C248 283 253 308 250 332 C250 350 253 369 250 394 C250 401 249 405 248 409"
          stroke="#F5DEB3"
          strokeWidth="3.5"
        />

        {/* Rễ cấp một bên trái */}
        <path
          d="M250 293 C235 305 228 316 220 331 C215 342 211 350 202 357"
          stroke="#E8C99A"
          strokeWidth="2.7"
        />

        <path
          d="M225 322 Q211 318 204 311 M216 341 Q229 342 235 350"
          stroke="#F5DEB3"
          strokeWidth="1.8"
        />

        {/* Rễ cấp một bên phải */}
        <path
          d="M251 315 C268 326 278 341 289 355 C297 365 302 372 310 379"
          stroke="#F5DEB3"
          strokeWidth="2.7"
        />

        <path
          d="M278 341 Q290 334 300 336 M297 369 Q282 375 278 386"
          stroke="#E8C99A"
          strokeWidth="1.8"
        />

        {/* Rễ phụ */}
        <path
          d="M250 349 Q235 359 231 374 M252 366 Q265 376 268 388 M249 382 Q240 390 237 400"
          stroke="#E8C99A"
          strokeWidth="1.6"
        />
      </g>

      {/* Nhãn lớp phân */}
      <rect
        x="286"
        y="374"
        width="132"
        height="27"
        rx="8"
        fill="#6D28D9"
      />

      <circle cx="298" cy="387.5" r="3" fill="#DDD6FE" />

      <text
        x="305"
        y="391"
        fontSize="13"
        fontWeight="900"
        fill="#FFFFFF"
      >
        VÙNG PHÂN LÂN
      </text>

      {/* Chú thích dưới lát cắt */}
      <circle cx="72" cy="520" r="7" fill="#DCFCE7" />

      <path
        d="M68.5 520l2.5 2.5 4.5-5"
        fill="none"
        stroke="#16A34A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <text
        x="87"
        y="524"
        fontSize="12"
        fontWeight="800"
        fill="#166534"
      >
        Rễ non sớm tiếp cận nguồn lân
      </text>

      <text
        x="68"
        y="547"
        fontSize="13"
        fill="#64748B"
      >
        Tạo điều kiện cho cây phát triển bộ rễ ban đầu.
      </text>

      <rect
        x="68"
        y="562"
        width="174"
        height="22"
        rx="11"
        fill="#F0FDF4"
      />

      <text
        x="155"
        y="576.5"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="800"
        fill="#15803D"
      >
        ✓  PHÂN ĐƯỢC ĐẶT TRƯỚC
      </text>

      {/* =====================================================
          03. RIGHT PANEL — BÓN TRÊN MẶT ĐẤT
      ===================================================== */}

      <g>
        <rect
          x="490"
          y="130"
          width="438"
          height="470"
          rx="23"
          fill="#FFFFFF"
          stroke="#FECACA"
          strokeWidth="1.5"
        />
      </g>

      {/* Header bên phải */}
      <rect
        x="511"
        y="151"
        width="35"
        height="35"
        rx="12"
        fill="#FEE2E2"
      />

      <circle cx="528.5" cy="168.5" r="9" fill="#EF4444" />

      <path
        d="M525 165l7 7 M532 165l-7 7"
        stroke="#FFFFFF"
        strokeWidth="2.1"
        strokeLinecap="round"
      />

      <text
        x="556"
        y="165"
        fontSize="15"
        fontWeight="900"
        fill="#991B1B"
      >
        BÓN LÂN TRÊN MẶT
      </text>

      <text
        x="556"
        y="181"
        fontSize="13"
        fontWeight="600"
        fill="#DC2626"
        letterSpacing=".5"
      >
        PHÂN CÓ THỂ XA VÙNG RỄ
      </text>

      <rect
        x="828"
        y="153"
        width="77"
        height="27"
        rx="13.5"
        fill="#FEF2F2"
      />

      <text
        x="866.5"
        y="170.5"
        fontSize="13"
        fontWeight="800"
        textAnchor="middle"
        fill="#B91C1C"
      >
        KÉM HƠN
      </text>

      {/* Lát cắt đất */}
      <rect
        x="512"
        y="236"
        width="394"
        height="244"
        rx="9"
        fill={`url(#${id}-soil)`}
      />

      <rect
        x="512"
        y="236"
        width="394"
        height="244"
        rx="9"
        fill={`url(#${id}-texture)`}
      />

      <rect
        x="512"
        y="236"
        width="394"
        height="244"
        rx="9"
        fill={`url(#${id}-soil-deep)`}
      />

      {/* Mặt đất */}
      <rect
        x="512"
        y="223"
        width="394"
        height="17"
        rx="5"
        fill={`url(#${id}-grass)`}
      />

      <path
        d="M512 231 Q524 226 535 231 T558 230 T581 231 T604 230 T627 231 T650 230 T673 231 T696 230 T719 231 T742 230 T765 231 T788 230 T811 231 T834 230 T857 231 T880 230 T906 231"
        fill="none"
        stroke="#15803D"
        strokeWidth="1.4"
        opacity=".8"
      />

      {/* Hạt phân nằm trên bề mặt */}
      <g>
        <ellipse
          cx="661"
          cy="222"
          rx="15"
          ry="4"
          fill="#1F2937"
          opacity=".15"
        />

        {[
          [649, 219, 5],
          [661, 214, 6],
          [674, 219, 5],
          [687, 213, 5.5],
          [701, 220, 4.5],
          [714, 214, 5],
          [727, 220, 4],
        ].map(([cx, cy, r], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill={i % 2 ? "#A78BFA" : "#8B5CF6"}
            stroke="#DDD6FE"
            strokeWidth="1.2"
          />
        ))}
      </g>

      {/* Cây non nhỏ, sinh trưởng yếu trong minh họa */}
      <path
        d="M709 238 C709 229 708 223 710 216"
        fill="none"
        stroke="#84CC16"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <path
        d="M709 223 C699 215 691 219 694 225 C699 229 704 226 709 223Z"
        fill="#A3E635"
        stroke="#65A30D"
        strokeWidth="1"
      />

      <path
        d="M710 220 C716 213 724 215 724 220 C721 224 715 224 710 220Z"
        fill="#BEF264"
        stroke="#84CC16"
        strokeWidth="1"
      />

      <ellipse
        cx="709"
        cy="247"
        rx="8"
        ry="10"
        fill="#CA8A04"
        stroke="#EAB308"
        strokeWidth="1.2"
      />

      {/* Bộ rễ ngắn trong sơ đồ */}
      <g
        fill="none"
        stroke="#C59A65"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <path d="M709 256 C709 271 709 288 711 306" />

        <path d="M709 274 Q698 283 696 293" />

        <path d="M710 286 Q719 293 721 300" />

        <path d="M711 306l-5 8" />
      </g>

      {/* Mũi tên: sự di chuyển chậm của lân */}
      <path
        d="M757 251 L757 329"
        fill="none"
        stroke="#FB7185"
        strokeWidth="2.5"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />

      <path
        d="M750 322 L757 334 L764 322"
        fill="none"
        stroke="#FB7185"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Điểm cuối mũi tên */}
      <circle cx="757" cy="340" r="5" fill="#FCA5A5" opacity=".3" />
      <circle cx="757" cy="340" r="2.5" fill="#EF4444" />

      {/* Khu vực cảnh báo */}
      <rect
        x="535"
        y="365"
        width="348"
        height="66"
        rx="12"
        fill="#7F1D1D"
        opacity=".45"
      />

      <rect
        x="535"
        y="365"
        width="348"
        height="66"
        rx="12"
        fill="#FEE2E2"
        stroke="#FCA5A5"
        strokeWidth="1.2"
      />

      <rect
        x="548"
        y="377"
        width="32"
        height="32"
        rx="10"
        fill="#FECACA"
      />

      <path
        d="M564 384l8 15h-16z"
        fill="#DC2626"
        stroke="#B91C1C"
        strokeWidth="1"
        strokeLinejoin="round"
      />

      <path
        d="M564 389v5 M564 397v.5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <text
        x="590"
        y="387"
        fontSize="12"
        fontWeight="900"
        fill="#991B1B"
      >
        LÂN DI CHUYỂN RẤT CHẬM
      </text>

      <text
        x="590"
        y="405"
        fontSize="13"
        fontWeight="600"
        fill="#9F1239"
      >
        Khó xuống sâu đến vùng rễ đang phát triển.
      </text>

      <text
        x="590"
        y="420"
        fontSize="12.5"
        fill="#9F1239"
      >
        Khả năng hấp thu phụ thuộc đất và cách bón.
      </text>

      {/* Chú thích dưới lát cắt */}
      <circle cx="530" cy="520" r="7" fill="#FEE2E2" />

      <path
        d="M526.5 516.5l7 7 M533.5 516.5l-7 7"
        fill="none"
        stroke="#DC2626"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <text
        x="545"
        y="524"
        fontSize="12"
        fontWeight="800"
        fill="#991B1B"
      >
        Rễ non khó tiếp cận nguồn lân
      </text>

      <text
        x="526"
        y="547"
        fontSize="13"
        fill="#64748B"
      >
        Có thể làm giảm hiệu quả sử dụng phân.
      </text>

      <rect
        x="526"
        y="562"
        width="181"
        height="22"
        rx="11"
        fill="#FEF2F2"
      />

      <text
        x="616.5"
        y="576.5"
        textAnchor="middle"
        fontSize="12.5"
        fontWeight="800"
        fill="#B91C1C"
      >
        !  PHÂN NẰM TRÊN MẶT
      </text>

      {/* =====================================================
          04. KẾT LUẬN CUỐI INFOGRAPHIC
      ===================================================== */}

      <rect
        x="32"
        y="620"
        width="896"
        height="70"
        rx="19"
        fill="#F3EEFF"
        stroke="#C4B5FD"
        strokeWidth="1.3"
      />

      {/* Icon */}
      <circle cx="70" cy="655" r="22" fill="#DDD6FE" />

      <path
        d="M70 669v-24 M70 653 C57 653 56 643 58 640 C66 640 70 647 70 653Z"
        fill="#16A34A"
        stroke="#15803D"
        strokeWidth="1"
      />

      <path
        d="M70 650 C75 638 86 640 85 645 C82 652 76 653 70 655Z"
        fill="#4ADE80"
        stroke="#15803D"
        strokeWidth="1"
      />

      <path
        d="M70 663l-7 7 M70 659l8 7"
        stroke="#A16207"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <text
        x="108"
        y="648"
        fontSize="14"
        fontWeight="900"
        fill="#5B21B6"
      >
        NGUYÊN TẮC VÀNG
      </text>

      <text
        x="108"
        y="669"
        fontSize="13"
        fontWeight="700"
        fill="#4C1D95"
      >
        Đặt phân lân phù hợp với vùng rễ sẽ phát triển.
      </text>

      <line
        x1="612"
        y1="634"
        x2="612"
        y2="676"
        stroke="#C4B5FD"
        strokeWidth="1.3"
      />

      <circle cx="641" cy="649" r="4" fill="#8B5CF6" />

      <text
        x="654"
        y="653"
        fontSize="13"
        fontWeight="700"
        fill="#5B21B6"
      >
        Bón đúng vị trí
      </text>

      <circle cx="641" cy="669" r="4" fill="#22C55E" />

      <text
        x="654"
        y="673"
        fontSize="13"
        fontWeight="700"
        fill="#166534"
      >
        Tránh sát hạt, rễ non
      </text>
    </svg>
  );
}
