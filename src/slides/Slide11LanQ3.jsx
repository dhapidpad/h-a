import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgFusedPhosphateCups from '../components/illustrations/SvgFusedPhosphateCups';

/* ==========================================================================
   SLIDE 11 — LÂN CÂU 3: LÂN NUNG CHẢY SO VỚI SUPE LÂN (MỤC 5 - SLIDE 11)
   - Tiêu đề: LÂN NUNG CHẢY: KHÁC CƠ CHẾ HÒA TAN VỚI SUPE LÂN
   - Màn hình:
     1. Supe lân: lân dễ tiêu, có phần hòa tan trong nước; thường có tính acid do quy trình/sản phẩm.
     2. Lân nung chảy: phosphate dạng thủy tinh/cấu trúc silicat, không tan hoặc ít tan trong nước nhưng có thể hòa tan trong môi trường acid yếu/acid citric theo phép thử chất lượng; cung cấp P cùng Ca, Mg, Si tùy sản phẩm.
     3. Lựa chọn theo pH đất, cây trồng và thông số trên nhãn.
   ========================================================================== */

const PILLARS = [
  {
    id: 'super',
    number: '01',
    tone: 'blue',
    title: 'SUPE LÂN: CÓ PHẦN HÒA TAN TRONG NƯỚC, THƯỜNG CÓ TÍNH ACID',
    badge: 'Tan trong nước',
    desc: (
      <>
        Supe lân được chế biến bằng axit để tăng phần lân dễ tiêu <strong>hòa tan trong nước</strong>; sản phẩm thường có phản ứng <strong>chua (acid)</strong>.
      </>
    )
  },
  {
    id: 'fmp',
    number: '02',
    tone: 'purple',
    title: 'LÂN NUNG CHẢY: DẠNG THỦY TINH SILICAT, TAN TRONG MÔI TRƯỜNG ACID YẾU',
    badge: 'P + Ca, Mg, Si',
    desc: (
      <>
        Thường <strong>không tan hoặc ít tan trong nước</strong> nhưng phần P hữu hiệu hòa tan được trong <strong>môi trường acid yếu / acid citric</strong>; có tính kiềm và bổ sung Ca, Mg, Si tùy sản phẩm.
      </>
    )
  },
  {
    id: 'choice',
    number: '03',
    tone: 'green',
    title: 'LỰA CHỌN THEO pH ĐẤT, CÂY TRỒNG VÀ THÔNG SỐ TRÊN NHÃN',
    badge: 'Đất chua · Nhãn phân',
    desc: (
      <>
        Lân nung chảy thường phù hợp với một số <strong>chân đất chua hoặc đất cần bổ sung Ca–Mg–Si</strong>; mức hiệu quả thực tế phụ thuộc độ mịn, pH đất và cách bón.
      </>
    )
  }
];

export default function Slide11LanQ3({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU 08 / 15"
      title="LÂN NUNG CHẢY: KHÁC CƠ CHẾ HÒA TAN VỚI SUPE LÂN"
      badgeIcon="FMP"
      badgeSub="CƠ CHẾ HÒA TAN"
      badgeMain="Môi trường acid yếu · +Ca, Mg, Si"
      question="Lân nung chảy ít tan trong nước nhưng hòa tan trong môi trường acid yếu và bổ sung thêm Ca, Mg, Si."
      pillars={PILLARS}
      note={{
        tag: 'KIỂM NGHIỆM',
        title: 'Phép thử chất lượng:',
        text: 'Hàm lượng P₂O₅ hữu hiệu của lân nung chảy được đánh giá qua độ hòa tan trong dung dịch axit citric 2% theo tiêu chuẩn chất lượng.'
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'scientist',
        speech: 'Lân nung chảy ít tan trong nước nhưng hòa tan trong môi trường acid yếu vùng rễ và bổ sung Ca, Mg, Si! 🧪'
      }}
      svgCard={{
        title: 'SO SÁNH TRONG NƯỚC & MÔI TRƯỜNG ACID YẾU',
        subtitle: 'Không/ít tan trong nước trung tính · Hòa tan trong môi trường acid yếu · Bổ sung Ca, Mg, Si',
        badge: 'Cấu trúc thủy tinh silicat',
        takeaway:
          'Lân nung chảy được sản xuất bằng cách nung chảy quặng photphat với khoáng Mg/Ca/Si rồi làm lạnh nhanh. Phân ít tan trong nước nhưng tan trong môi trường acid yếu, thích hợp với nhiều chân đất chua.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgFusedPhosphateCups />
    </QuestionSlide>
  );
}
