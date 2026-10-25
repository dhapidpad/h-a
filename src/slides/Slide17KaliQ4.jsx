import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgTopdressingMountain from '../components/illustrations/SvgTopdressingMountain';

const PILLARS = [
  {
    id: 'curve',
    number: '01',
    tone: 'amber',
    title: 'ĐƯỜNG CONG NHU CẦU: CAO TRÀO ĐƠM HOA KẾT TRÁI',
    badge: 'ĐỈNH CAO TRÀO',
    desc: (
      <>
        Cây con sinh khối nhỏ cần ít Kali. Nhu cầu K⁺ <strong>tăng vọt lên đỉnh khi làm đòng, phân hóa hoa, phình củ và nuôi quả</strong> để vận chuyển đường bột.
      </>
    ),
  },
  {
    id: 'leach',
    number: '02',
    tone: 'blue',
    title: 'TAN CỰC NHANH — BÓN LÓT SỚM DỄ BỊ RỬA TRÔI',
    badge: 'DỄ RỬA TRÔI',
    desc: (
      <>
        Muối kali (KCl, K₂SO₄) tan rất nhanh trong nước. Nếu bón lót 100% từ đầu, mưa lớn sẽ <strong>rửa trôi K⁺ xuống tầng sâu</strong> trước khi rễ kịp hấp thu.
      </>
    ),
  },
  {
    id: 'schedule',
    number: '03',
    tone: 'green',
    title: 'PHÂN BỔ KHOA HỌC: 60% – 70% KALI BÓN THÚC',
    badge: 'BÓN THÚC 70%',
    desc: (
      <>
        • Bón lót đầu vụ: <strong>20–30% K</strong>.<br />
        • Bón thúc đón đòng / trổ hoa: <strong>40% K</strong> • Bón thúc nuôi hạt / dưỡng quả ngọt: <strong>30% K</strong>.
      </>
    ),
  },
];

export default function Slide17KaliQ4({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU HỎI 04 / 15"
      title="THỜI ĐIỂM VÀNG CHO BÓN THÚC KALI"
      badgeIcon="70%"
      badgeSub="TỶ LỆ BÓN THÚC"
      badgeMain="Dành 60% – 70% Kali bón thúc"
      question="Tại sao phân kali luôn được ưu tiên bón thúc vào giai đoạn đón đòng, trổ hoa, phình củ, nuôi quả thay vì bón lót toàn bộ từ đầu?"
      pillars={PILLARS}
      note={{
        tag: 'LÚA',
        title: 'Bí quyết nhà nông:',
        text: 'Bón thúc kali đón đòng trước trổ 15–20 ngày giúp bông lúa trổ thoát, hạt vàng sáng chắc mẩy và giảm tỷ lệ lép.',
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'happy',
        speech: 'Cứ đón đòng và nuôi trái là tớ xuất hiện tiếp sức ngay, mùa màng bội thu chắc luôn! 🌾✨',
      }}
      svgCard={{
        title: 'ĐỈNH ĐỒI BÓN THÚC ĐÚNG THỜI ĐIỂM',
        subtitle: 'Chiến lược bón chia đợt • Đón đòng, nuôi hạt & dồn đường nuôi quả ngọt',
        badge: 'Bón Thúc Đúng Lúc',
        takeaway:
          'Kali tan nhanh và dễ bị rửa trôi nếu bón lót quá nhiều từ đầu vụ. Cây cần kali nhiều nhất vào các giai đoạn sinh sản: làm đòng, trổ hoa và nuôi quả để bơm tinh bột chắc hạt và tích tụ đường thơm ngọt.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgTopdressingMountain />
    </QuestionSlide>
  );
}
