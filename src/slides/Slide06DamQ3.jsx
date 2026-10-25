import React, { useState } from 'react';
import QuestionSlide from './QuestionSlide';
import SvgGasLoss from '../components/illustrations/SvgGasLoss';

const PILLARS = [
  {
    id: 'hydrolysis',
    number: '01',
    tone: 'blue',
    title: 'CƠ CHẾ THỦY PHÂN URÊ TRONG ĐẤT',
    badge: 'THỦY PHÂN',
    equation: 'Phản ứng: CO(NH₂)₂ + 2H₂O ⟶ (NH₄)₂CO₃',
    desc: (
      <>
        Nhờ enzyme Urease của vi sinh vật đất, Urê chuyển thành <strong>(NH₄)₂CO₃</strong> tan trong nước, phân li ra ion <strong>NH₄⁺</strong> cho rễ hấp thu.
      </>
    ),
  },
  {
    id: 'lime',
    number: '02',
    tone: 'red',
    title: 'BỐC HƠI KHI GẶP ĐẤT KIỀM / TRỘN VÔI',
    badge: 'MẤT NH₃↑',
    equation: 'Phản ứng: NH₄⁺ + OH⁻ ⟶ NH₃↑ + H₂O',
    desc: (
      <>
        Gốc <strong>OH⁻</strong> của vôi kiềm đẩy NH₄⁺ thành khí <strong>NH₃ bay hơi</strong>. Trộn vôi hoặc phơi nắng mặt ruộng làm mất <strong>30% – 50% đạm</strong>!
      </>
    ),
  },
  {
    id: 'leaching',
    number: '03',
    tone: 'amber',
    title: 'RỬA TRÔI NƯỚC NGẦM & CHUA HÓA ĐẤT',
    badge: 'RỬA TRÔI',
    equation: 'Nitrat hóa: NH₄⁺ + 2O₂ ⟶ NO₃⁻ + 2H⁺ + H₂O',
    desc: (
      <>
        Ion <strong>NO₃⁻ (-)</strong> không bám keo đất âm nên dễ bị mưa rửa trôi gây phú dưỡng; còn <strong>H⁺ sinh ra</strong> làm đất chua càng thêm chua.
      </>
    ),
  },
];

export default function Slide06DamQ3({ onOpenNotes }) {
  const [activeCard, setActiveCard] = useState('lime');

  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU HỎI 03 / 15"
      title="ĐẠM AMONI VỚI ĐẤT CHUA & ĐẤT VÔI (THẤT THOÁT NH₃)"
      badgeIcon={{ text: 'NH₃↑', bg: 'linear-gradient(135deg, var(--danger) 0%, var(--danger-deep) 100%)' }}
      badgeSub="TƯƠNG KỴ HÓA HỌC"
      badgeMain="NH₄⁺ + OH⁻ ⟶ NH₃↑ + H₂O"
      question="Urê chuyển hóa trong đất thế nào? Tại sao bón đạm amoni trên đất chua làm đất thêm chua, còn trộn chung với vôi bột lại bay hơi mất đạm?"
      pillars={PILLARS}
      activeCardId={activeCard}
      onSelectCard={setActiveCard}
      note={{
        tag: 'MẸO',
        title: 'Kỹ thuật chống mất đạm:',
        text: 'Vùi sâu 5–7 cm rồi lấp đất kín; cách ly thời gian bón vôi khử chua và bón đạm ít nhất 15–20 ngày.',
      }}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: activeCard === 'lime' ? 'shocked' : 'teacher',
        speech:
          activeCard === 'lime'
            ? 'Ối dồi ôi! Gặp vôi bột là tớ biến thành khí NH₃ bay mất lên mây liền, phí tiền của bà con lắm đó! 😱'
            : 'Hãy vùi sâu tớ xuống đất rồi tưới ẩm nhẹ nhàng, rễ cây sẽ hút trọn vẹn 100% nha! 🌱✨',
      }}
      svgCard={{
        title: 'BỐC HƠI NH₃ & RỬA TRÔI NITRAT',
        subtitle: 'Cơ chế thủy phân Urê • Tương kỵ NH₄⁺ + OH⁻ ⟶ NH₃↑ & rửa trôi NO₃⁻',
        badge: 'NH₃↑ Bốc hơi',
        takeaway:
          'Trộn đạm với vôi hoặc bón rải mặt gặp nắng gắt làm NH₄⁺ chuyển thành khí NH₃ bay hơi mất 30–50% đạm. Ion NO₃⁻ không bám keo đất dễ bị mưa lớn cuốn trôi gây ô nhiễm nguồn nước ngầm.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgGasLoss />
    </QuestionSlide>
  );
}
