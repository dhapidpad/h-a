import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgSuperPhosphatePouch from '../components/illustrations/SvgSuperPhosphatePouch';

const PILLARS = [
  {
    id: 'ssp',
    number: '01',
    tone: 'blue',
    title: 'SUPEPHOTPHAT ĐƠN (SSP): 14% – 20% P₂O₅',
    badge: '1 GIAI ĐOẠN',
    equation: 'Ca₃(PO₄)₂ + 2H₂SO₄ ⟶ Ca(H₂PO₄)₂ + 2CaSO₄↓',
    desc: (
      <>
        Gồm muối tan <strong>Ca(H₂PO₄)₂</strong> trộn lẫn ~50% thạch cao không tan <strong>CaSO₄</strong> (bổ sung thêm S nhưng làm nặng cước vận chuyển).
      </>
    ),
  },
  {
    id: 'tsp',
    number: '02',
    tone: 'purple',
    title: 'SUPEPHOTPHAT KÉP (TSP): 40% – 50% P₂O₅',
    badge: '2 GIAI ĐOẠN',
    equation: 'Ca₃(PO₄)₂ + 4H₃PO₄ ⟶ 3Ca(H₂PO₄)₂',
    desc: (
      <>
        Chỉ chứa <strong>Ca(H₂PO₄)₂ tinh khiết</strong> (không sinh CaSO₄), tan hoàn toàn trong nước, mật độ dinh dưỡng lân cao gấp <strong>2.5 lần</strong> phân đơn.
      </>
    ),
  },
  {
    id: 'econ',
    number: '03',
    tone: 'green',
    title: 'TIẾT KIỆM CHI PHÍ VẬN CHUYỂN ĐƯỜNG DÀI',
    badge: '1 BAO = 2.5 BAO',
    desc: (
      <>
        Nhờ hàm lượng P₂O₅ đậm đặc (40–50%), chỉ cần vận chuyển <strong>1 bao phân kép thay vì 2.5 bao phân đơn</strong> lên vùng cao Tây Bắc, Tây Nguyên.
      </>
    ),
  },
];

export default function Slide10LanQ2({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU HỎI 02 / 15"
      title="SUPERPHOTPHAT ĐƠN (SSP) vs KÉP (TSP) — BẢN CHẤT %P₂O₅"
      badgeIcon="TSP"
      badgeSub="HÀM LƯỢNG CAO NHẤT"
      badgeMain="40% – 50% P₂O₅ (Gấp 2.5 lần)"
      question="So sánh thành phần hóa học, hàm lượng %P₂O₅ và quy trình sản xuất giữa Supephotphat đơn (SSP) và Supephotphat kép (TSP)?"
      pillars={PILLARS}
      note={{
        tag: 'TAN',
        title: 'Độ tan thực tế:',
        text: 'Cả 2 loại supe lân đều chứa muối Ca(H₂PO₄)₂ tan tốt trong nước, rễ cây hút nhanh chóng ngay sau khi bón.',
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'proud',
        speech: 'Supe kép TSP nhỏ mà có võ, đậm đặc gấp 2.5 lần supe đơn, mang vác lên nương rẫy nhẹ tênh! ⚡🎒',
      }}
      svgCard={{
        title: 'SUPEPHOTPHAT ĐƠN VS KÉP',
        subtitle: 'So sánh thành phần hóa học • Ca(H₂PO₄)₂ tinh khiết vs chứa thạch cao CaSO₄',
        badge: 'TSP 40–50% P₂O₅',
        takeaway:
          'Supe đơn (SSP, 14–20% P₂O₅) chứa tới ~50% thạch cao CaSO₄ làm tăng khối lượng vận chuyển. Supe kép (TSP, 40–50% P₂O₅) được điều chế bằng axit photphoric, loại bỏ hoàn toàn CaSO₄, cho độ đậm đặc lân gấp 2.5 lần.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgSuperPhosphatePouch />
    </QuestionSlide>
  );
}
