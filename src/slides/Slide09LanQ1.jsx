import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgRootAtpStation from '../components/illustrations/SvgRootAtpStation';

const PILLARS = [
  {
    id: 'atp',
    number: '01',
    tone: 'purple',
    title: 'TRẠM PIN NĂNG LƯỢNG ATP TẾ BÀO',
    badge: 'ATP ~30.5 kJ/mol',
    desc: (
      <>
        Photpho là trung tâm cấu tạo phân tử <strong>ATP (Adenosine Triphosphate)</strong>. Liên kết photphat cao năng giải phóng năng lượng cho mọi hoạt động sống của tế bào.
      </>
    ),
  },
  {
    id: 'root',
    number: '02',
    tone: 'green',
    title: 'KÍCH BỘ RỄ ĐÂM SÂU TỎA RỘNG',
    badge: 'BỘ RỄ KHỎE',
    desc: (
      <>
        Thúc đẩy phân chia tế bào mô phân sinh chóp rễ, giúp <strong>rễ cọc ăn sâu, rễ tơ bung rộng</strong>, tăng khả năng hút nước và chống hạn, chống đổ ngã.
      </>
    ),
  },
  {
    id: 'flower',
    number: '03',
    tone: 'amber',
    title: 'ĐẬU QUẢ SỚM & 2 DẠNG ION HẤP THỤ',
    badge: 'H₂PO₄⁻ & HPO₄²⁻',
    desc: (
      <>
        Kích thích phân hóa mầm hoa, hạt mẩy chín sớm. Rễ hút P dưới dạng ion <strong>H₂PO₄⁻ (đất chua nhẹ)</strong> và <strong>HPO₄²⁻ (đất trung tính/kiềm)</strong>.
      </>
    ),
  },
];

export default function Slide09LanQ1({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU HỎI 01 / 15"
      title="PHOTPHO (P) — NĂNG LƯỢNG ATP & BỘ RỄ ĐÂM SÂU"
      badgeIcon="P"
      badgeSub="TIÊU CHUẨN ĐỘ LÂN"
      badgeMain="Đo bằng %P₂O₅ tương ứng"
      question="Phân lân cung cấp nguyên tố nào, dưới dạng ion gì? Vai trò cốt lõi của Photpho với bộ rễ, ra hoa đậu quả và năng lượng ATP?"
      pillars={PILLARS}
      note={{
        tag: 'P₂O₅',
        title: 'Chỉ tiêu đánh giá:',
        text: 'Độ dinh dưỡng của mọi loại phân lân đều được quy đổi và tính toán theo % khối lượng P₂O₅ tương ứng.',
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'scientist',
        speech: 'Có tớ tiếp lửa ATP, rễ non sẽ bung tỏa đâm sâu giữ đất vững vàng, hoa trái trĩu cành nha! ⚡🌱',
      }}
      svgCard={{
        title: 'TRẠM PIN ATP & HỆ RỄ CÂY',
        subtitle: 'Chuyển hóa năng lượng sinh học • Kích thích bộ rễ đâm sâu & đậu quả',
        badge: 'ATP ~30.5 kJ/mol',
        takeaway:
          'Photpho là trung tâm cấu tạo đồng tiền năng lượng ATP và axit nucleic ADN/ARN. Cây hút ion H₂PO₄⁻ và HPO₄²⁻ giúp hệ rễ phân nhánh khỏe mạnh, chịu hạn tốt và kích hoạt phân hóa mầm hoa.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgRootAtpStation />
    </QuestionSlide>
  );
}
