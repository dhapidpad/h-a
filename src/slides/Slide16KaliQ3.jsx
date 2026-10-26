import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgLeafScorchAlert from '../components/illustrations/SvgLeafScorchAlert';

/* ==========================================================================
   SLIDE 16 — KALI CÂU 3: THIẾU K VÀ CÂY NHẠY CHLORIDE (MỤC 5 - SLIDE 16)
   - Tiêu đề: THIẾU K CÓ THỂ CHÁY MÉP LÁ GIÀ — CHỌN NGUỒN K THEO CÂY
   - Màn hình:
     1. Thiếu K: vàng/cháy mép lá già, cây có thể yếu
     2. Một số cây nhạy Cl⁻ cần hạn chế nguồn chloride
     3. K₂SO₄ là lựa chọn khi cần K không kèm Cl⁻
   - Chuẩn hóa công thức: K₂SO₄ (không viết K₂O₄).
   ========================================================================== */

const PILLARS = [
  {
    id: 'deficiency',
    number: '01',
    tone: 'red',
    title: 'THIẾU K: VÀNG / CHÁY MÉP LÁ GIÀ, CÂY CÓ THỂ YẾU',
    badge: 'Lá già biểu hiện trước',
    desc: (
      <>
        Thiếu K thường xuất hiện trên <strong>lá già trước với mép/chóp lá vàng rồi cháy xém</strong>, thân cây yếu hoặc giảm chất lượng nông sản (cần phân biệt với hạn, mặn hoặc bệnh).
      </>
    )
  },
  {
    id: 'sensitive',
    number: '02',
    tone: 'amber',
    title: 'MỘT SỐ CÂY NHẠY Cl⁻ CẦN HẠN CHẾ NGUỒN CHLORIDE',
    badge: 'Cân nhắc ion Cl⁻',
    desc: (
      <>
        KCl đưa cả K⁺ và Cl⁻ vào đất; ở <strong>cây nhạy chloride</strong> (như thuốc lá, một số cây ăn quả/cây lấy củ chất lượng cao) hoặc đất/nước tích lũy Cl⁻, thừa Cl⁻ có thể gây bất lợi.
      </>
    )
  },
  {
    id: 'k2so4',
    number: '03',
    tone: 'green',
    title: 'K₂SO₄ LÀ LỰA CHỌN KHI CẦN K KHÔNG KÈM Cl⁻',
    badge: 'K₂SO₄ (+S, không Cl⁻)',
    desc: (
      <>
        <strong>Kali sunfat (K₂SO₄)</strong> cung cấp K⁺ và lưu huỳnh mà không bổ sung Cl⁻; lựa chọn nguồn K cần dựa trên loại cây, giống, đất, nước tưới và khuyến cáo kỹ thuật.
      </>
    )
  }
];

export default function Slide16KaliQ3({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU 13 / 15"
      title="THIẾU K CÓ THỂ CHÁY MÉP LÁ GIÀ — CHỌN NGUỒN K THEO CÂY"
      badgeIcon="K₂SO₄"
      badgeSub="CHỌN NGUỒN KALI"
      badgeMain="Hạn chế Cl⁻ cho cây nhạy clo"
      question="Nhận diện triệu chứng cháy mép lá già khi thiếu K và ưu tiên K₂SO₄ khi cây trồng hoặc đất cần hạn chế chloride."
      pillars={PILLARS}
      note={{
        tag: 'CHẨN ĐOÁN',
        title: 'Lưu ý phân biệt:',
        text: 'Cháy mép lá có thể trùng với tổn thương mặn, khô hạn hoặc bệnh hại; chất lượng quả/củ còn phụ thuộc giống, nước tưới và quy trình canh tác.'
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'worried',
        speech: 'Khi lá già vàng cháy mép hãy kiểm tra thiếu K; với cây nhạy Cl⁻ nên cân nhắc K₂SO₄ theo khuyến cáo! 🍂'
      }}
      svgCard={{
        title: 'TRIỆU CHỨNG THIẾU K TRÊN LÁ GIÀ & LƯU Ý CÂY NHẠY Cl⁻',
        subtitle: 'Mép lá già vàng/cháy xém (cần chẩn đoán phân biệt) · Chọn K₂SO₄ khi cần tránh thêm Cl⁻',
        badge: 'Thiếu K & Nhạy Cl⁻',
        takeaway:
          'Thiếu kali thường biểu hiện vàng và cháy mép ở lá già trước. Với cây nhạy chloride hoặc đất/nước dễ tích lũy Cl⁻, K₂SO₄ giúp cung cấp K và S mà không đưa thêm Cl⁻.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgLeafScorchAlert />
    </QuestionSlide>
  );
}
