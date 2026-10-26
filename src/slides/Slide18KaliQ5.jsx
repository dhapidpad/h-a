import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgSoilCompaction from '../components/illustrations/SvgSoilCompaction';

/* ==========================================================================
   SLIDE 18 — KALI CÂU 5: LẠM DỤNG KCl, ĐẤT MẶN & HỆ SINH THÁI ĐẤT (MỤC 5 - SLIDE 18)
   - Tiêu đề: LẠM DỤNG MUỐI PHÂN BÓN: THEO DÕI EC, THOÁT NƯỚC VÀ CÂN BẰNG DINH DƯỠNG
   - Màn hình (3 hệ quả có điều kiện + dòng giải pháp):
     1. Muối hòa tan tích lũy → EC tăng, rễ khó hút nước
     2. Cl⁻ cao có thể gây stress cho cây nhạy chloride
     3. Độ mặn cao có thể làm thay đổi hoạt động vi sinh và tăng stress đất
   - Dòng giải pháp: Đúng liều · kiểm tra EC/pH · bảo đảm thoát nước · bổ sung hữu cơ phù hợp.
   ========================================================================== */

const PILLARS = [
  {
    id: 'ec',
    number: '01',
    tone: 'red',
    title: 'MUỐI HÒA TAN TÍCH LŨY → EC TĂNG, RỄ KHÓ HÚT NƯỚC',
    badge: 'Tăng áp suất thẩm thấu',
    desc: (
      <>
        Khi dùng KCl quá mức (nhất là nơi thoát nước kém hoặc nước tưới có muối), ion hòa tan tích lũy làm <strong>độ dẫn điện EC tăng</strong>, khiến rễ khó hút nước.
      </>
    )
  },
  {
    id: 'chloride',
    number: '02',
    tone: 'amber',
    title: 'Cl⁻ CAO CÓ THỂ GÂY STRESS CHO CÂY NHẠY CHLORIDE',
    badge: 'Stress ion Cl⁻',
    desc: (
      <>
        Nồng độ <strong>ion clorua (Cl⁻) cao</strong> trong vùng rễ có thể gây stress sinh lý và làm giảm phẩm chất ở các cây trồng nhạy cảm với chloride.
      </>
    )
  },
  {
    id: 'microbe',
    number: '03',
    tone: 'green',
    title: 'ĐỘ MẶN CAO ẢNH HƯỞNG VI SINH VẬT & CẦN QUẢN LÝ TỔNG HỢP CẤU TRÚC ĐẤT',
    badge: 'Hệ sinh thái đất',
    desc: (
      <>
        Độ mặn cao có thể làm thay đổi <strong>hoạt động vi sinh đất</strong>; riêng cấu trúc đất suy giảm (nén chặt, bí khí) còn phụ thuộc hữu cơ, natri trao đổi, cơ giới đất và tưới tiêu.
      </>
    )
  }
];

export default function Slide18KaliQ5({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU 15 / 15"
      title="LẠM DỤNG MUỐI PHÂN BÓN: THEO DÕI EC, THOÁT NƯỚC VÀ CÂN BẰNG DINH DƯỠNG"
      badgeIcon={{ text: 'EC', bg: 'linear-gradient(135deg, var(--danger) 0%, var(--danger-deep) 100%)' }}
      badgeSub="QUẢN LÝ MẶN & ĐẤT"
      badgeMain="Theo dõi EC · Thoát nước · Hữu cơ"
      question="Giải pháp: Đúng liều · kiểm tra EC/pH · bảo đảm thoát nước · bổ sung hữu cơ phù hợp."
      pillars={PILLARS}
      note={{
        tag: 'GIẢI PHÁP',
        title: 'Phòng ngừa tích lũy muối:',
        text: 'Đúng liều · kiểm tra EC/pH đất và nước tưới · bảo đảm thoát nước · bổ sung phân hữu cơ và chọn nguồn K phù hợp.'
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'worried',
        speech: 'Bón đúng liều, kiểm tra EC/pH, giữ thoát nước tốt và bổ sung hữu cơ để bảo vệ rễ và vi sinh vật đất! 🩺'
      }}
      svgCard={{
        title: 'CÂN BẰNG MUỐI HÒA TAN (EC) — NƯỚC — RỄ — VI SINH ĐẤT',
        subtitle: 'Tích lũy muối hòa tan làm tăng EC · Phân biệt độ mặn (EC) với các yếu tố cấu trúc đất',
        badge: 'Quản lý EC & Hữu cơ',
        takeaway:
          'Lạm dụng KCl trong điều kiện thoát nước kém làm tăng muối hòa tan (EC), khiến rễ khó hút nước và ảnh hưởng vi sinh đất. Cần bón đúng liều, bảo đảm thoát nước và bổ sung chất hữu cơ.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgSoilCompaction />
    </QuestionSlide>
  );
}
