import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgSuperPhosphatePouch from '../components/illustrations/SvgSuperPhosphatePouch';

/* ==========================================================================
   SLIDE 10 — LÂN CÂU 2: SUPE LÂN ĐƠN VÀ SUPE LÂN KÉP (MỤC 5 - SLIDE 10)
   - Tiêu đề: SUPE LÂN ĐƠN vs SUPE LÂN KÉP: KHÁC Ở ĐỘ ĐẬM ĐẶC P₂O₅
   - Màn hình: Bảng 3 hàng, 2 cột đối chiếu Supe lân đơn và Supe lân kép (triple superphosphate)
   ========================================================================== */

const PILLARS = [
  {
    id: 'metric',
    number: '01',
    tone: 'purple',
    title: 'CHỈ TIÊU ĐÁNH GIÁ: %P₂O₅ HỮU HIỆU QUY ĐỔI TRÊN NHÃN',
    badge: '%P₂O₅ hữu hiệu',
    desc: (
      <>
        Độ dinh dưỡng của phân lân được công bố theo <strong>% khối lượng P₂O₅ hữu hiệu quy đổi</strong>; căn cứ chính xác cho từng lô hàng là tiêu chuẩn trên nhãn sản phẩm.
      </>
    )
  }
];

export default function Slide10LanQ2({ onOpenNotes }) {
  const compareTable = (
    <div className="spec-compare-table-wrap">
      <table className="spec-compare-table" aria-label="Bảng so sánh Supe lân đơn và Supe lân kép">
        <thead>
          <tr>
            <th>Tiêu chí</th>
            <th>Supe lân đơn (SSP)</th>
            <th>Supe lân kép (Triple Superphosphate)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Thành phần chính</td>
            <td>
              <strong>Monocalcium phosphate</strong> Ca(H₂PO₄)₂ + thạch cao (CaSO₄)
            </td>
            <td>
              Chủ yếu <strong>monocalcium phosphate</strong> Ca(H₂PO₄)₂; ít/không có lượng thạch cao như supe đơn
            </td>
          </tr>
          <tr>
            <td>P₂O₅ hữu hiệu thường gặp</td>
            <td>
              <strong>Khoảng 16–20% P₂O₅</strong> (tùy tiêu chuẩn/sản phẩm)
            </td>
            <td>
              <strong>Khoảng 37–47% P₂O₅</strong> (có sản phẩm/chuẩn khác)
            </td>
          </tr>
          <tr>
            <td>Điểm khác biệt</td>
            <td>Có CaSO₄ đi kèm, cung cấp thêm lưu huỳnh (S) và canxi (Ca)</td>
            <td>Dinh dưỡng P đậm đặc hơn trên cùng một đơn vị khối lượng phân bón</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU 07 / 15"
      title="SUPE LÂN ĐƠN vs SUPE LÂN KÉP: KHÁC Ở ĐỘ ĐẬM ĐẶC P₂O₅"
      badgeIcon="P₂O₅"
      badgeSub="SO SÁNH HÀM LƯỢNG"
      badgeMain="Đơn ~16–20% · Kép ~37–47%"
      question="Supe lân kép giảm phần thạch cao CaSO₄ đi kèm nên mật độ P₂O₅ hữu hiệu cao hơn; supe đơn bổ sung thêm S và Ca."
      pillars={PILLARS}
      customBottomCard={compareTable}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'detective',
        speech: 'Supe đơn có thêm thạch cao CaSO₄ (bổ sung S); supe kép đậm đặc P₂O₅ hơn trên cùng khối lượng! 🔍'
      }}
      svgCard={{
        title: 'ĐỐI CHIẾU SUPE LÂN ĐƠN & SUPE LÂN KÉP',
        subtitle: 'Supe đơn (~16–20% P₂O₅ + CaSO₄) vs Supe kép (~37–47% P₂O₅ đậm đặc)',
        badge: '%P₂O₅ hữu hiệu',
        takeaway:
          'Supe lân đơn xử lý quặng bằng H₂SO₄ nên có CaSO₄ đi kèm (~16–20% P₂O₅, thêm S). Supe lân kép xử lý bằng H₃PO₄ nên giảm phần thạch cao, đạt khoảng 37–47% P₂O₅ hữu hiệu.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgSuperPhosphatePouch />
    </QuestionSlide>
  );
}
