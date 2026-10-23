import React from 'react';

export default function SvgGasLoss() {
  return (
    <svg viewBox="0 0 540 460" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {/* Vách ngăn chia đôi 2 trường hợp */}
      <line x1="270" y1="30" x2="270" y2="400" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" />

      {/* =========================================================
          TRƯỜNG HỢP 1: BÓN VÀO ĐẤT CHUA (BÊN TRÁI)
         ========================================================= */}
      <g transform="translate(20, 20)">
        {/* Tiêu đề góc */}
        <rect x="15" y="10" width="180" height="28" rx="8" fill="#FEE2E2" />
        <text x="105" y="29" textAnchor="middle" fill="#DC2626" fontSize="13" fontWeight="800">
          ⚠️ ĐẤT CHUA HÓA (pH &lt; 5)
        </text>

        {/* Lát cắt tầng đất chua màu đỏ hung */}
        <rect x="15" y="180" width="210" height="190" rx="16" fill="#F87171" opacity="0.25" stroke="#EF4444" strokeWidth="2" />

        {/* Cây non còi cọc */}
        <g transform="translate(120, 180)">
          <path d="M 0 0 L 0 -70" stroke="#84CC16" strokeWidth="4" />
          <path d="M 0 -70 C -20 -90, -30 -60, 0 -50" fill="#EAB308" />
          <path d="M 0 -70 C 20 -90, 30 -60, 0 -50" fill="#EAB308" />
          <text x="0" y="-95" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="700">Lá vàng còi cọc</text>

          {/* Rễ ngắn */}
          <path d="M 0 0 Q -10 30, -15 50 M 0 0 Q 10 30, 15 50" stroke="#8A654A" strokeWidth="2.5" fill="none" />
        </g>

        {/* Các ion H+ tích tụ nhọn hoắt trong đất */}
        <g fill="#DC2626" fontSize="13" fontWeight="900">
          <circle cx="50" cy="240" r="14" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
          <text x="50" y="245" textAnchor="middle">H⁺</text>

          <circle cx="180" cy="250" r="14" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
          <text x="180" y="255" textAnchor="middle">H⁺</text>

          <circle cx="80" cy="320" r="14" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
          <text x="80" y="325" textAnchor="middle">H⁺</text>

          <circle cx="160" cy="330" r="14" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5" />
          <text x="160" y="335" textAnchor="middle">H⁺</text>
        </g>

        <text x="120" y="390" textAnchor="middle" fill="#991B1B" fontSize="12" fontWeight="700">
          Nitrat hóa sinh ra nhiều H⁺
        </text>
      </g>

      {/* =========================================================
          TRƯỜNG HỢP 2: GẶP ĐẤT VÔI / BÓN CÙNG VÔI (BÊN PHẢI)
         ========================================================= */}
      <g transform="translate(290, 20)">
        {/* Tiêu đề góc */}
        <rect x="15" y="10" width="200" height="28" rx="8" fill="#FEF3C7" />
        <text x="115" y="29" textAnchor="middle" fill="#D97706" fontSize="13" fontWeight="800">
          🚫 GẶP VÔI: BAY HƠI MẤT ĐẠM
        </text>

        {/* Đất vôi màu xám be */}
        <rect x="15" y="180" width="210" height="190" rx="16" fill="#F5F5F4" stroke="#D6D3D1" strokeWidth="2" />

        {/* Hạt phân đạm amoni tiếp xúc vôi */}
        <circle cx="70" cy="230" r="16" fill="#8C6BFA" />
        <text x="70" y="235" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">NH₄⁺</text>

        <text x="105" y="236" fontSize="18" fontWeight="bold" fill="#64748B">+</text>

        <circle cx="140" cy="230" r="16" fill="#0EA5E9" />
        <text x="140" y="235" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800">OH⁻</text>

        {/* Các bong bóng khí NH3 bốc lên cao bay mất */}
        <g transform="translate(105, 170)">
          {/* Mũi tên bốc hơi */}
          <path d="M 0 0 L 0 -80" stroke="#FF6B7A" strokeWidth="3" strokeDasharray="5 3" />
          <polygon points="-6,-80 0,-92 6,-80" fill="#FF6B7A" />

          {/* Bong bóng khí NH3 */}
          <circle cx="-30" cy="-60" r="22" fill="#FFEAEB" stroke="#FF6B7A" strokeWidth="2" />
          <text x="-30" y="-54" textAnchor="middle" fill="#E11D48" fontSize="13" fontWeight="800">NH₃↑</text>

          <circle cx="35" cy="-85" r="26" fill="#FFEAEB" stroke="#FF6B7A" strokeWidth="2" />
          <text x="35" y="-78" textAnchor="middle" fill="#E11D48" fontSize="15" fontWeight="900">NH₃↑</text>

          <text x="0" y="-105" textAnchor="middle" fill="#BE123C" fontSize="12" fontWeight="800">
            MẤT HẾT ĐẠM!
          </text>
        </g>

        {/* Phương trình phản ứng */}
        <rect x="20" y="295" width="200" height="42" rx="8" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="120" y="321" textAnchor="middle" fill="#B45309" fontSize="12" fontWeight="800">
          NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O
        </text>
      </g>

      {/* Dải cảnh báo đáy */}
      <rect x="60" y="415" width="420" height="34" rx="17" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
      <text x="270" y="437" textAnchor="middle" fill="#B91C1C" fontSize="13" fontWeight="800">
        ⛔ TUYỆT ĐỐI KHÔNG TRỘN ĐẠM AMONI VỚI VÔI BỘT KHI BÓN RUỘNG
      </text>
    </svg>
  );
}
