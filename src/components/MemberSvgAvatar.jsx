import React from 'react';

/**
 * 9 SVG AVATAR ĐỘC QUYỀN CHO 9 THÀNH VIÊN THEO ĐÚNG PHÂN CÔNG NHIỆM VỤ NHÓM
 * 100% Vector nguyên bản sắc nét, màu sắc hài hòa, không dùng bất kỳ emoji nào
 */
export default function MemberSvgAvatar({ memberId, size = 48 }) {
  switch (memberId) {
    case '01':
      /* Đinh Trần Ngọc Trâm: Trưởng nhóm / Biên tập viên — Vương miện lãnh đạo & Micro thuyết trình */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#EAF2FF" />
          {/* Vương miện vàng kim */}
          <polygon points="12,28 16,15 24,22 32,15 36,28" fill="#FDE047" stroke="#D97706" strokeWidth="1.8" />
          <circle cx="16" cy="14" r="2.2" fill="#EF4444" />
          <circle cx="24" cy="21" r="2.4" fill="#3B82F6" />
          <circle cx="32" cy="14" r="2.2" fill="#10B981" />
          <rect x="12" y="28" width="24" height="4" rx="2" fill="#F59E0B" />
          {/* Micro thuyết trình thu nhỏ phía trước */}
          <rect x="22" y="27" width="4" height="7" rx="2" fill="#334155" stroke="#1E293B" strokeWidth="1" />
          <line x1="24" y1="34" x2="24" y2="39" stroke="#1E293B" strokeWidth="1.6" />
          <line x1="20" y1="39" x2="28" y2="39" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );

    case '02':
      /* Cao Diệu Thảo: Thư ký Biên tập viên — Cuốn sổ thư ký, ngòi bút lông & đồng hồ tiến độ */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#FDF2F8" />
          {/* Cuốn sổ tay thư ký */}
          <rect x="13" y="12" width="20" height="25" rx="3" fill="#FFFFFF" stroke="#DB2777" strokeWidth="1.8" />
          <rect x="13" y="12" width="4" height="25" rx="1.5" fill="#F472B6" />
          {/* Các dòng ghi chép tiến độ */}
          <line x1="20" y1="18" x2="29" y2="18" stroke="#DB2777" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="23" x2="28" y2="23" stroke="#DB2777" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="20" y1="28" x2="26" y2="28" stroke="#DB2777" strokeWidth="1.5" strokeLinecap="round" />
          {/* Cây bút lông hồng bắt chéo */}
          <line x1="26" y1="33" x2="36" y2="15" stroke="#BE185D" strokeWidth="2.2" strokeLinecap="round" />
          <polygon points="36,15 39,12 38,17" fill="#F43F5E" />
          <circle cx="26" cy="33" r="1.5" fill="#DB2777" />
        </svg>
      );

    case '03':
      /* Lê Thị Ngọc Ánh: Bộ Phận Nội Dung & Tài Liệu — Văn bản bài viết hoàn chỉnh & ngòi bút */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#E8F8EE" />
          {/* Tờ văn bản hoàn chỉnh có góc gấp */}
          <polygon points="14,11 29,11 34,16 34,37 14,37" fill="#FFFFFF" stroke="#15803D" strokeWidth="1.8" />
          <polygon points="29,11 29,16 34,16" fill="#BBF7D0" stroke="#15803D" strokeWidth="1.2" />
          {/* Các dòng chữ ngay ngắn */}
          <line x1="18" y1="19" x2="26" y2="19" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="18" y1="24" x2="30" y2="24" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="29" x2="28" y2="29" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />
          {/* Con dấu son đỏ đã duyệt */}
          <circle cx="27" cy="33" r="3" fill="#EF4444" opacity="0.85" />
        </svg>
      );

    case '04':
      /* Phạm Vũ Thanh Phúc: Bộ Phận Nội Dung & Tài Liệu — Tóm tắt nội dung & Biểu đồ phân tích dữ liệu */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#F0EBFF" />
          {/* Bảng biểu đồ phân tích 3 cột */}
          <rect x="13" y="27" width="5" height="10" rx="1.5" fill="#8B5CF6" />
          <rect x="21" y="20" width="5" height="17" rx="1.5" fill="#6366F1" />
          <rect x="29" y="14" width="5" height="23" rx="1.5" fill="#A855F7" />
          {/* Đường đồ thị xu hướng */}
          <polyline points="15,26 23,19 31,13" fill="none" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="31" cy="13" r="2.2" fill="#EF4444" />
        </svg>
      );

    case '05':
      /* Nguyễn Mạnh Trường: Bộ Phận Nội Dung & Tài Liệu — Phễu chắt lọc dữ liệu thô & Báo cáo */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#FEF3C7" />
          {/* Phễu chắt lọc dữ liệu */}
          <polygon points="13,13 35,13 27,24 27,31 21,34 21,24" fill="#FBBF24" stroke="#B45309" strokeWidth="1.8" />
          {/* Các hạt dữ liệu thô rơi vào phễu */}
          <circle cx="19" cy="17" r="1.8" fill="#1D4ED8" />
          <circle cx="24" cy="16" r="1.8" fill="#10B981" />
          <circle cx="29" cy="18" r="1.8" fill="#EF4444" />
          {/* Giọt tinh hoa chất lượng rơi xuống */}
          <circle cx="24" cy="37" r="2.5" fill="#2563EB" />
        </svg>
      );

    case '06':
      /* Nguyễn Quốc Việt: Bộ Phận Nội Dung & Tài Liệu — Tra cứu thư viện, sách báo & kính tra cứu */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#E0F2FE" />
          {/* Chồng sách tài liệu tra cứu */}
          <rect x="13" y="29" width="22" height="6" rx="1.5" fill="#0284C7" stroke="#0369A1" strokeWidth="1.2" />
          <rect x="15" y="23" width="18" height="6" rx="1.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />
          <rect x="17" y="17" width="14" height="6" rx="1.5" fill="#7DD3FC" stroke="#0284C7" strokeWidth="1.2" />
          {/* Kính lúp tra cứu tài liệu */}
          <circle cx="29" cy="18" r="6" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" opacity="0.95" />
          <line x1="33" y1="23" x2="38" y2="29" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case '07':
      /* Vũ Anh Tài: Bộ Phận Thiết Kế — Màn hình thiết kế slide & Cuộn phim video */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#EDE9FE" />
          {/* Màn hình máy tính thiết kế */}
          <rect x="12" y="13" width="24" height="17" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
          <rect x="14" y="15" width="20" height="13" fill="#38BDF8" />
          {/* Chân đế màn hình */}
          <rect x="22" y="30" width="4" height="4" fill="#64748B" />
          <rect x="18" y="34" width="12" height="2" rx="1" fill="#475569" />
          {/* Khung hình video đang dựng */}
          <polygon points="21,18 28,21.5 21,25" fill="#FFFFFF" />
          <circle cx="34" cy="14" r="3.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
      );

    case '08':
      /* Lương Việt Anh: Trực Quan Hóa — Bảng màu Palette & Cọ vẽ mỹ thuật */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#FFFBEB" />
          {/* Bảng phối màu Palette hình hạt đậu */}
          <path d="M 14 26 C 12 18, 22 12, 30 13 C 38 14, 38 24, 32 30 C 27 34, 25 28, 21 29 C 18 30, 16 34, 14 26 Z" 
            fill="#FDE68A" stroke="#D97706" strokeWidth="1.8" />
          {/* Các giọt màu nghệ thuật */}
          <circle cx="20" cy="18" r="2.2" fill="#EF4444" />
          <circle cx="26" cy="17" r="2.2" fill="#3B82F6" />
          <circle cx="32" cy="21" r="2.2" fill="#10B981" />
          <circle cx="30" cy="27" r="2.2" fill="#8B5CF6" />
          {/* Cây cọ vẽ mỹ thuật */}
          <line x1="16" y1="36" x2="28" y2="24" stroke="#78350F" strokeWidth="2.4" strokeLinecap="round" />
          <polygon points="16,36 13,38 18,37" fill="#2563EB" />
        </svg>
      );

    case '09':
      /* Nguyễn Hữu Khánh: Phản Biện Nội Bộ — Khiên kiểm định & Dấu tích xanh kiểm duyệt lỗi */
      return (
        <svg viewBox="0 0 48 48" width={size} height={size}>
          <circle cx="24" cy="24" r="22" fill="#ECFDF5" />
          {/* Khiên kiểm định chất lượng */}
          <path d="M 24 10 C 34 10, 36 21, 24 37 C 12 21, 14 10, 24 10 Z" fill="#10B981" stroke="#047857" strokeWidth="1.8" />
          <path d="M 24 13 C 31 13, 33 21, 24 33 C 15 21, 17 13, 24 13 Z" fill="#34D399" />
          {/* Dấu tích xanh hoàn hảo (Checkmark QA) */}
          <polyline points="18,22 22,27 30,17" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return null;
  }
}
