import React, { useState } from 'react';
import QuestionSlide from './QuestionSlide';
import SvgGasLoss from '../components/illustrations/SvgGasLoss';

/* ==========================================================================
   SLIDE 06 — ĐẠM CÂU 3: ĐẠM AMONI, ĐẤT CHUA VÀ BÓN VÔI (MỤC 5 - SLIDE 06)
   - Tiêu đề: ĐẠM AMONI + VẬT LIỆU KIỀM: CÓ THỂ MẤT N DẠNG NH₃
   - Màn hình (split-screen 2 trường hợp + nguyên tắc):
     1. Bón cùng vật liệu kiềm/vôi: NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O → nguy cơ bay hơi NH₃.
     2. Quá trình nitrat hóa: NH₄⁺ + 2O₂ → NO₃⁻ + 2H⁺ + H₂O → có thể làm đất chua thêm.
   - Không tuyên bố cứng "cách đúng 15 ngày cho mọi đất/cây".
   ========================================================================== */

const PILLARS = [
  {
    id: 'lime',
    number: '01',
    tone: 'red',
    title: 'BÓN CÙNG VẬT LIỆU KIỀM / VÔI: NGUY CƠ BAY HƠI NH₃',
    badge: 'NH₃↑ Thất thoát',
    equation: 'NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O',
    desc: (
      <>
        Trong môi trường kiềm, ion <strong>NH₄⁺</strong> chuyển dịch cân bằng sang khí <strong>amoniac (NH₃) dễ bay hơi</strong>, gây thất thoát nitơ.
      </>
    )
  },
  {
    id: 'acid',
    number: '02',
    tone: 'amber',
    title: 'QUÁ TRÌNH NITRAT HÓA: CÓ THỂ LÀM ĐẤT CHUA THÊM',
    badge: 'Sinh ra H⁺',
    equation: 'NH₄⁺ + 2O₂ → NO₃⁻ + 2H⁺ + H₂O',
    desc: (
      <>
        Vi sinh vật oxy hóa <strong>NH₄⁺ thành NO₃⁻</strong> và giải phóng ion <strong>H⁺</strong>; dùng lặp lại các nguồn N có tính acid hóa có thể làm giảm pH đất.
      </>
    )
  },
  {
    id: 'rule',
    number: '03',
    tone: 'green',
    title: 'NGUYÊN TẮC: KHÔNG TRỘN / BÓN ĐỒNG THỜI ĐẠM AMONI VỚI VÔI',
    badge: 'Bón cách thời điểm',
    desc: (
      <>
        Không trộn hoặc bón cùng lúc phân đạm amoni với vôi/vật liệu kiềm mạnh; <strong>bón cách thời điểm</strong> theo kết quả phân tích đất, loại vật liệu và hướng dẫn canh tác.
      </>
    )
  }
];

export default function Slide06DamQ3({ onOpenNotes }) {
  const [activeCard, setActiveCard] = useState('lime');

  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU 03 / 15"
      title="ĐẠM AMONI + VẬT LIỆU KIỀM: CÓ THỂ MẤT N DẠNG NH₃"
      badgeIcon={{ text: 'NH₃↑', bg: 'linear-gradient(135deg, var(--danger) 0%, var(--danger-deep) 100%)' }}
      badgeSub="CÂN BẰNG HÓA HỌC"
      badgeMain="NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O"
      question="Không trộn hoặc bón đồng thời đạm amoni với vôi; quản lý pH đất chua hợp lý để hạn chế thất thoát N."
      pillars={PILLARS}
      activeCardId={activeCard}
      onSelectCard={setActiveCard}
      note={{
        tag: 'LƯU Ý',
        title: 'Phân biệt vật liệu vôi:',
        text: 'Đá vôi nghiền CaCO₃ và vôi tôi Ca(OH)₂ có độ kiềm và tốc độ phản ứng khác nhau; cần bón theo pH đất thực tế.'
      }}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: activeCard === 'lime' ? 'shocked' : 'teacher',
        speech: 'Không trộn chung phân đạm amoni với vôi để tránh mất nitơ dưới dạng khí NH₃ bay hơi nhé! ⚠️'
      }}
      svgCard={{
        title: 'SO SÁNH 2 QUÁ TRÌNH: ĐẤT CHUA & GẶP VÔI KIỀM',
        subtitle: 'Nitrat hóa tạo H⁺ (NH₄⁺ + 2O₂ → NO₃⁻ + 2H⁺ + H₂O) · Gặp kiềm bay hơi NH₃↑',
        badge: 'NH₄⁺ ⇌ NH₃↑',
        takeaway:
          'Bón đạm amoni cùng vôi/kiềm thúc đẩy phản ứng NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O làm mất đạm. Quá trình nitrat hóa NH₄⁺ sinh ra H⁺ nên đất chua cần được quản lý pH và hữu cơ cân đối.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgGasLoss />
    </QuestionSlide>
  );
}
