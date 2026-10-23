import React from 'react';

/**
 * SVG Minh Họa Trực Quan Slide 04:
 * Nhà Máy Quang Hợp Diệp Lục, Quá Trình Hấp Thụ Ion Đạm NH4+ / NO3- & Tổng Hợp Protein
 */
export default function SvgChlorophyllFactory() {
  return (
    <svg 
      viewBox="0 0 600 480" 
      width="100%" 
      height="100%" 
      style={{ display: 'block', maxHeight: '100%', borderRadius: 20 }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradient nền công nghệ sinh học */}
        <linearGradient id="bioBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0FDF4" />
          <stop offset="50%" stopColor="#DCFCE7" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>

        {/* Gradient chiếc lá xanh */}
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="50%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>

        {/* Gradient lục lạp */}
        <linearGradient id="chloroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BBF7D0" />
          <stop offset="100%" stopColor="#86EFAC" />
        </linearGradient>

        {/* Gradient ion NH4+ */}
        <linearGradient id="nh4Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>

        {/* Gradient ion NO3- */}
        <linearGradient id="no3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Đổ bóng mềm */}
        <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.12" />
        </filter>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Khung nền tràn viền */}
      <rect x="0" y="0" width="600" height="480" rx="20" fill="url(#bioBg)" stroke="#86EFAC" strokeWidth="1.5" />

      {/* Tiêu đề đồ họa */}
      <rect x="24" y="20" width="220" height="32" rx="16" fill="rgba(255,255,255,0.9)" stroke="#22C55E" strokeWidth="1.5" />
      <circle cx="40" cy="36" r="6" fill="#22C55E" />
      <text x="56" y="41" fill="#15803D" fontSize="13" fontWeight="800" fontFamily="Space Grotesk, sans-serif">
        MÔ PHỎNG TẾ BÀO LÁ & ION N
      </text>

      {/* ================= KHỐI TRÁI: CHIẾC LÁ KHỔNG LỒ & MẠCH DẪN ================= */}
      <g transform="translate(30, 70)" filter="url(#softShadow)">
        {/* Phiến lá */}
        <path 
          d="M 40 330 C -30 200, 20 50, 180 20 C 260 140, 210 270, 40 330 Z" 
          fill="url(#leafGrad)" 
        />
        {/* Gân lá chính & gân nhánh phát sáng */}
        <path d="M 40 330 Q 110 180, 180 20" stroke="#DCFCE7" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M 75 260 Q 125 240, 165 270" stroke="#DCFCE7" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M 105 190 Q 155 170, 195 200" stroke="#DCFCE7" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
        <path d="M 135 120 Q 175 100, 205 130" stroke="#DCFCE7" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />

        {/* Huy hiệu diệp lục trên lá */}
        <rect x="50" y="270" width="130" height="30" rx="15" fill="rgba(15, 23, 42, 0.85)" />
        <text x="115" y="290" textAnchor="middle" fill="#4ADE80" fontSize="11" fontWeight="800">
          🌱 DIỆP LỤC (C₅₅H₇₂O₅N₄Mg)
        </text>
      </g>

      {/* Tia laser kính hiển vi phóng đại */}
      <line x1="210" y1="180" x2="310" y2="150" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="6 4" />
      <line x1="210" y1="260" x2="310" y2="290" stroke="#22C55E" strokeWidth="2.5" strokeDasharray="6 4" />

      {/* ================= KHỐI PHẢI: KÍNH HIỂN VI SOI LỤC LẠP & ION ================= */}
      <g transform="translate(425, 220)" filter="url(#softShadow)">
        {/* Vòng kính hiển vi tròn lớn */}
        <circle cx="0" cy="0" r="140" fill="#FFFFFF" stroke="#22C55E" strokeWidth="6" />
        <circle cx="0" cy="0" r="132" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

        {/* Bào quan Lục lạp (Chloroplast) */}
        <ellipse cx="0" cy="-35" rx="100" ry="58" fill="url(#chloroGrad)" stroke="#16A34A" strokeWidth="3" />
        <text x="0" y="-72" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="800">
          NHÀ MÁY LỤC LẠP (CHLOROPLAST)
        </text>

        {/* Các thylakoid xếp chồng (Granum) */}
        <g fill="#15803D" opacity="0.9">
          {/* Cột 1 */}
          <ellipse cx="-55" cy="-45" rx="18" ry="7" />
          <ellipse cx="-55" cy="-38" rx="18" ry="7" />
          <ellipse cx="-55" cy="-31" rx="18" ry="7" />
          {/* Cột 2 */}
          <ellipse cx="0" cy="-50" rx="22" ry="8" />
          <ellipse cx="0" cy="-42" rx="22" ry="8" />
          <ellipse cx="0" cy="-34" rx="22" ry="8" />
          {/* Cột 3 */}
          <ellipse cx="55" cy="-45" rx="18" ry="7" />
          <ellipse cx="55" cy="-38" rx="18" ry="7" />
          <ellipse cx="55" cy="-31" rx="18" ry="7" />
        </g>

        {/* 2 Viên Ngọc Ion N được rễ hút lên */}
        {/* Ion NH4+ */}
        <g transform="translate(-48, 48)">
          <circle cx="0" cy="0" r="24" fill="url(#nh4Grad)" filter="url(#glow)" />
          <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900" fontFamily="Space Grotesk">
            NH₄⁺
          </text>
          <text x="0" y="36" textAnchor="middle" fill="#7E22CE" fontSize="10.5" fontWeight="800">
            Amoni tan
          </text>
        </g>

        {/* Mũi tên kết hợp */}
        <path d="M -16 48 L 16 48" stroke="#16A34A" strokeWidth="3" strokeDasharray="3 3" />
        <polygon points="18,48 12,44 12,52" fill="#16A34A" />

        {/* Ion NO3- */}
        <g transform="translate(48, 48)">
          <circle cx="0" cy="0" r="24" fill="url(#no3Grad)" filter="url(#glow)" />
          <text x="0" y="6" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900" fontFamily="Space Grotesk">
            NO₃⁻
          </text>
          <text x="0" y="36" textAnchor="middle" fill="#0369A1" fontSize="10.5" fontWeight="800">
            Nitrat tan
          </text>
        </g>

        {/* Dải băng kết quả: TỔNG HỢP PROTEIN */}
        <rect x="-85" y="85" width="170" height="28" rx="14" fill="#0F172A" />
        <text x="0" y="103" textAnchor="middle" fill="#38BDF8" fontSize="11" fontWeight="800" letterSpacing="0.04em">
          ★ TỔNG HỢP PROTEIN & ADN ★
        </text>
      </g>

      {/* Thước đo tăng trưởng chiều cao cây bên mép phải */}
      <g transform="translate(565, 90)">
        <rect x="0" y="0" width="16" height="290" rx="8" fill="#E2E8F0" />
        <rect x="0" y="45" width="16" height="245" rx="8" fill="#22C55E" />
        <line x1="-8" y1="65" x2="24" y2="65" stroke="#15803D" strokeWidth="2.5" />
        <text x="-12" y="70" textAnchor="end" fill="#15803D" fontSize="12" fontWeight="900">+200%</text>
        <line x1="-8" y1="180" x2="24" y2="180" stroke="#15803D" strokeWidth="2.5" />
        <text x="-12" y="185" textAnchor="end" fill="#15803D" fontSize="12" fontWeight="900">+100%</text>
        <text x="8" y="315" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="700">SINH KHỐI</text>
      </g>
    </svg>
  );
}
