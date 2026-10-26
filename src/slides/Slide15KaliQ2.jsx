import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgKClvsK2SO4 from '../components/illustrations/SvgKClvsK2SO4';

/* ==========================================================================
   SLIDE 15 — KALI CÂU 2: KCl VÀ K₂SO₄ (MỤC 5 - SLIDE 15)
   - Tiêu đề: KCL ≈ 60% K₂O · K₂SO₄ ≈ 50% K₂O
   - Màn hình: Bảng 3 hàng, 2 cột đối chiếu KCl và K₂SO₄
   - Chú thích: Cả hai thường tan tốt trong nước; grade thật theo nhãn sản phẩm.
   ========================================================================== */

const PILLARS = [
  {
    id: 'k2o',
    number: '01',
    tone: 'amber',
    title: 'CHỈ TIÊU ĐÁNH GIÁ: % KHỐI LƯỢNG K₂O QUY ĐỔI TRÊN NHÃN',
    badge: '%K₂O quy đổi',
    desc: (
      <>
        Độ dinh dưỡng phân kali thương mại được công bố theo <strong>% K₂O quy đổi</strong>. Cả <strong>KCl</strong> và{' '}
        <strong>K₂SO₄</strong> đều tan tốt trong nước; grade thực tế đọc theo nhãn sản phẩm.
      </>
    )
  }
];

export default function Slide15KaliQ2({ onOpenNotes }) {
  const compareTable = (
    <div className="spec-compare-table-wrap">
      <table className="spec-compare-table" aria-label="Bảng so sánh KCl và K₂SO₄">
        <thead>
          <tr>
            <th>Tiêu chí</th>
            <th>Kali clorua (KCl / MOP)</th>
            <th>Kali sunfat (K₂SO₄ / SOP)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>K₂O quy đổi</td>
            <td>
              <strong>Thường khoảng 60% K₂O</strong>
            </td>
            <td>
              <strong>Thường khoảng 50% K₂O</strong>
            </td>
          </tr>
          <tr>
            <td>Ion đi kèm</td>
            <td>
              Đi kèm ion <strong>Cl⁻</strong> (clorua)
            </td>
            <td>
              Đi kèm ion <strong>SO₄²⁻</strong>, cung cấp thêm lưu huỳnh (S)
            </td>
          </tr>
          <tr>
            <td>Định hướng sử dụng</td>
            <td>Phổ biến, kinh tế; cần cân nhắc lượng Cl⁻ với cây nhạy clo và đất mặn</td>
            <td>Hữu ích khi cần bổ sung S hoặc với cây nhạy Cl⁻ theo khuyến cáo</td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          padding: '5px 10px',
          fontSize: 12.6,
          fontWeight: 600,
          color: 'var(--ink-mute)',
          background: 'rgba(247, 245, 236, 0.7)',
          borderTop: '1px solid var(--line)'
        }}
      >
        Chú thích: Cả hai thường tan tốt trong nước; màu sắc KCl (trắng/hồng/đỏ) phụ thuộc tạp chất khoáng; grade thật theo nhãn sản phẩm.
      </div>
    </div>
  );

  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU 12 / 15"
      title="KCl ≈ 60% K₂O · K₂SO₄ ≈ 50% K₂O"
      badgeIcon="%K₂O"
      badgeSub="CHỈ TIÊU THƯƠNG MẠI"
      badgeMain="KCl ~60% · K₂SO₄ ~50% K₂O"
      question="Cả KCl và K₂SO₄ đều tan tốt trong nước; lựa chọn dựa trên nhu cầu lưu huỳnh, độ nhạy Cl⁻ của cây, đất và chi phí."
      pillars={PILLARS}
      customBottomCard={compareTable}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'scientist',
        speech: 'KCl (~60% K₂O) phổ biến và kinh tế; K₂SO₄ (~50% K₂O) cung cấp thêm lưu huỳnh và không kèm Cl⁻! ⚖️'
      }}
      svgCard={{
        title: 'SO SÁNH KCl (≈ 60% K₂O) VÀ K₂SO₄ (≈ 50% K₂O)',
        subtitle: 'Đối chiếu hàm lượng K₂O quy đổi, ion đi kèm (Cl⁻ vs SO₄²⁻) và định hướng sử dụng',
        badge: 'KCl vs K₂SO₄',
        takeaway:
          'KCl thường đạt khoảng 60% K₂O quy đổi, kinh tế nhưng có Cl⁻. K₂SO₄ thường đạt khoảng 50% K₂O, cung cấp thêm lưu huỳnh và phù hợp khi cần hạn chế chloride.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgKClvsK2SO4 />
    </QuestionSlide>
  );
}
