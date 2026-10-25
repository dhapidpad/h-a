import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgFusedPhosphateCups from '../components/illustrations/SvgFusedPhosphateCups';

const PILLARS = [
  {
    id: 'water',
    number: '01',
    tone: 'blue',
    title: 'KHÔNG TAN TRONG NƯỚC: TRÁNH RỬA TRÔI MÙA MƯA',
    badge: 'H₂O KHÔNG TAN',
    desc: (
      <>
        Nung chảy <strong>quặng Apatit + Secpentin ở 1450°C</strong> rồi làm lạnh đột ngột bằng nước áp lực cao, tạo hạt thủy tinh trơ trước nước mưa trên đồi dốc.
      </>
    ),
  },
  {
    id: 'acid',
    number: '02',
    tone: 'purple',
    title: 'RỄ TIẾT AXIT ĐẾN ĐÂU — HÒA TAN LÂN ĐẾN ĐÓ',
    badge: 'H⁺ AXIT RỄ',
    desc: (
      <>
        Lông hút rễ tiết <strong>axit hữu cơ yếu (citric, malic)</strong> cung cấp H⁺ phá vỡ mạng silicat, hòa tan lân ngay bề mặt rễ mà không bị keo đất khóa chặt.
      </>
    ),
  },
  {
    id: 'alkaline',
    number: '03',
    tone: 'green',
    title: 'TÍNH KIỀM (pH 8 – 8.5): KHỬ CHUA, BỔ SUNG CA, MG, SI',
    badge: 'pH 8 – 8.5',
    desc: (
      <>
        Giàu <strong>CaO (25–30%), MgO (15–18%), SiO₂ (24–30%)</strong> giúp nâng pH, hạ phèn và hóa giải độc tố Al³⁺, Fe³⁺ trên đất chua phèn, đất đỏ bazan.
      </>
    ),
  },
];

export default function Slide11LanQ3({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU HỎI 03 / 15"
      title="LÂN NUNG CHẢY: ĐẶC TRỊ CHO ĐẤT CHUA PHÈN"
      badgeIcon="FMP"
      badgeSub="ĐẶC TÍNH KHỬ CHUA"
      badgeMain="Tính kiềm pH 8 – 8.5 (Ca, Mg, Si)"
      question="Phân lân nung chảy (FMP) khác superphotphat thế nào? Tại sao không tan trong nước mưa nhưng lại tan tốt trong axit yếu do rễ tiết ra?"
      pillars={PILLARS}
      note={{
        tag: 'VN',
        title: 'Thương hiệu Việt:',
        text: 'Lân nung chảy Văn Điển và Ninh Bình là phân bón chủ lực cho chè Thái Nguyên, cà phê Tây Nguyên và lúa đất phèn.',
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'scientist',
        speech: 'Nước mưa không cuốn trôi được tớ, chỉ giọt axit rễ cây mới đánh thức tớ dậy thôi nha! 🧪⚡',
      }}
      svgCard={{
        title: 'ĐỘ TAN CỦA LÂN NUNG CHẢY',
        subtitle: 'Thí nghiệm 2 cốc: Không tan trong nước mưa • Tan tốt trong axit rễ cây',
        badge: 'FMP Tính Kiềm',
        takeaway:
          'Lân nung chảy (Văn Điển, Ninh Bình) không tan trong nước mưa nên không bị rửa trôi trên đất đồi dốc. Axit hữu cơ do đầu rễ cây tiết ra hòa tan từ từ lân, đồng thời thành phần vôi và magie kiềm hóa khử chua đất phèn hiệu quả.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgFusedPhosphateCups />
    </QuestionSlide>
  );
}
