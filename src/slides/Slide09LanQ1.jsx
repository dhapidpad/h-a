import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgRootAtpStation from '../components/illustrations/SvgRootAtpStation';

/* ==========================================================================
   SLIDE 09 — LÂN CÂU 1: ION PHOTPHAT, RỄ, RA HOA VÀ ATP (MỤC 5 - SLIDE 09)
   - Tiêu đề: P — NĂNG LƯỢNG ATP VÀ GIAI ĐOẠN HÌNH THÀNH RỄ
   - Màn hình:
     1. Cây hấp thụ P chủ yếu dạng H₂PO₄⁻ / HPO₄²⁻
     2. P tham gia ATP, axit nucleic và màng tế bào
     3. Hỗ trợ phát triển rễ và sinh trưởng sinh sản khi không thiếu/thừa
   ========================================================================== */

const PILLARS = [
  {
    id: 'ions',
    number: '01',
    tone: 'purple',
    title: 'CÂY HẤP THỤ P CHỦ YẾU DẠNG H₂PO₄⁻ VÀ HPO₄²⁻',
    badge: 'H₂PO₄⁻ / HPO₄²⁻',
    desc: (
      <>
        Trong dung dịch đất, cây hấp thụ photpho chủ yếu ở dạng ion photphat vô cơ <strong>H₂PO₄⁻</strong> và{' '}
        <strong>HPO₄²⁻</strong>; tỷ lệ tương đối phụ thuộc độ pH đất.
      </>
    )
  },
  {
    id: 'atp',
    number: '02',
    tone: 'blue',
    title: 'P THAM GIA ATP, AXIT NUCLEIC VÀ MÀNG TẾ BÀO',
    badge: 'ATP ↔ ADP + Pi',
    desc: (
      <>
        Photpho là thành phần cấu tạo của hệ thống truyền năng lượng <strong>ATP/ADP, axit nucleic (ADN, ARN)</strong> và lớp màng tế bào{' '}
        <strong>phospholipid</strong>.
      </>
    )
  },
  {
    id: 'roots',
    number: '03',
    tone: 'green',
    title: 'HỖ TRỢ PHÁT TRIỂN RỄ & SINH TRƯỞNG SINH SẢN KHI CÂN ĐỐI',
    badge: 'Rễ · Hoa · Hạt · Quả',
    desc: (
      <>
        Đủ P giúp <strong>bộ rễ non phát triển sớm</strong> và hỗ trợ các giai đoạn hình thành hoa, hạt và quả khi dinh dưỡng được cân đối (không thiếu/thừa).
      </>
    )
  }
];

export default function Slide09LanQ1({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU 06 / 15"
      title="P — NĂNG LƯỢNG ATP VÀ GIAI ĐOẠN HÌNH THÀNH RỄ"
      badgeIcon="P"
      badgeSub="DẠNG HẤP THỤ"
      badgeMain="H₂PO₄⁻ và HPO₄²⁻"
      question="Photpho tham gia chuyển hóa năng lượng ATP, cấu trúc tế bào và hỗ trợ hình thành bộ rễ khỏe."
      questionChips={[
        { label: 'H₂PO₄⁻', tone: 'purple' },
        { label: 'HPO₄²⁻', tone: 'blue' },
        { label: 'ATP', tone: 'green' }
      ]}
      pillars={PILLARS}
      note={{
        tag: 'QUY ƯỚC',
        title: 'Chỉ số %P₂O₅ trên nhãn:',
        text: 'Là cách quy đổi hàm lượng dinh dưỡng thương mại trên bao bì, không có nghĩa trong phân chứa phân tử P₂O₅ tự do.'
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'scientist',
        speech: 'Rễ hấp thụ ion H₂PO₄⁻ và HPO₄²⁻ để tạo năng lượng ATP và phát triển hệ rễ khỏe mạnh! ⚡'
      }}
      svgCard={{
        title: 'CHU TRÌNH NĂNG LƯỢNG ATP ↔ ADP + Pi & HỆ RỄ',
        subtitle: 'Hấp thụ ion H₂PO₄⁻ / HPO₄²⁻ · Chuyển hóa ATP · Phát triển bộ rễ & cơ quan sinh sản',
        badge: 'ATP ↔ ADP + Pi',
        takeaway:
          'Cây hấp thụ photpho dạng ion H₂PO₄⁻ và HPO₄²⁻. Photpho có mặt trong ATP/ADP, axit nucleic và phospholipid, hỗ trợ phát triển rễ non và quá trình hình thành hoa, hạt, quả.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgRootAtpStation />
    </QuestionSlide>
  );
}
