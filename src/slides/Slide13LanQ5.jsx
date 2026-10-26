import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgApatiteMine from '../components/illustrations/SvgApatiteMine';

/* ==========================================================================
   SLIDE 13 — LÂN CÂU 5: APATIT LÀO CAI, NHÀ MÁY & TÀI NGUYÊN (MỤC 5 - SLIDE 13)
   - Tiêu đề: TỪ QUẶNG APATIT ĐẾN PHÂN LÂN — TÀI NGUYÊN CẦN SỬ DỤNG HIỆU QUẢ
   - Màn hình bắt buộc:
     1. Nguyên liệu tự nhiên: quặng apatit, phosphorit · Mỏ apatit tiêu biểu: Lào Cai
     2. Nhà máy tiêu biểu: Supe Lâm Thao · Lân nung chảy Văn Điển · Phân lân Ninh Bình (NIFERCO)
     3. Thách thức: chất lượng quặng, tuyển quặng, bãi thải, nước/bụi và phục hồi môi trường
   - Tuyệt đối phân biệt Phân lân Ninh Bình (NIFERCO) với Đạm Ninh Bình (ở Slide 7).
   ========================================================================== */

const PILLARS = [
  {
    id: 'ore',
    number: '01',
    tone: 'purple',
    title: 'NGUYÊN LIỆU TỰ NHIÊN: QUẶNG APATIT, PHOSPHORIT · MỎ LÀO CAI',
    badge: 'Apatit Lào Cai',
    desc: (
      <>
        Nguyên liệu photphat tự nhiên chính gồm <strong>quặng apatit và phosphorit</strong>; tại Việt Nam, <strong>mỏ apatit Lào Cai</strong> là nguồn cung cấp quặng chủ lực.
      </>
    )
  },
  {
    id: 'plants',
    number: '02',
    tone: 'green',
    title: 'NHÀ MÁY TIÊU BIỂU: SUPE LÂM THAO · VĂN ĐIỂN · PHÂN LÂN NINH BÌNH (NIFERCO)',
    badge: '3 cơ sở phân lân',
    desc: (
      <>
        • <strong>Supe Phốt phát &amp; Hóa chất Lâm Thao</strong> (Phú Thọ — supe lân/NPK) ·{' '}
        • <strong>Phân lân nung chảy Văn Điển</strong> (Hà Nội) ·{' '}
        • <strong>Công ty CP Phân lân Ninh Bình (NIFERCO)</strong> (lân nung chảy/NPK).
      </>
    )
  },
  {
    id: 'challenge',
    number: '03',
    tone: 'red',
    title: 'THÁCH THỨC: CHẤT LƯỢNG QUẶNG, TUYỂN QUẶNG, BÃI THẢI & PHỤC HỒI MÔI TRƯỜNG',
    badge: 'Tài nguyên & Môi trường',
    desc: (
      <>
        Quặng giàu giảm dần đòi hỏi <strong>tuyển quặng nghèo tốn năng lượng</strong>; cần quản lý chặt <strong>bãi thải, bùn/nước thải, bụi</strong> và phục hồi môi trường sau khai thác.
      </>
    )
  }
];

export default function Slide13LanQ5({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU 10 / 15"
      title="TỪ QUẶNG APATIT ĐẾN PHÂN LÂN — TÀI NGUYÊN CẦN SỬ DỤNG HIỆU QUẢ"
      badgeIcon="P"
      badgeSub="KHOÁNG SẢN & CÔNG NGHIỆP"
      badgeMain="Mỏ Lào Cai · 3 Nhà máy lân"
      question="Sử dụng hiệu quả quặng apatit Lào Cai, nâng cao công nghệ tuyển/chế biến và kiểm soát môi trường bền vững."
      questionChips={[
        { label: 'Lâm Thao', tone: 'green' },
        { label: 'Văn Điển', tone: 'purple' },
        { label: 'NIFERCO Ninh Bình', tone: 'blue' }
      ]}
      pillars={PILLARS}
      note={{
        tag: 'PHÂN BIỆT',
        title: 'Đúng tên cơ sở:',
        text: 'Công ty Cổ phần Phân lân Ninh Bình (NIFERCO) sản xuất phân lân nung chảy & NPK — hoàn toàn khác với Nhà máy Đạm Ninh Bình (sản xuất urê từ than).'
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'curious',
        speech: 'Từ mỏ apatit Lào Cai đến Lâm Thao, Văn Điển và Phân lân Ninh Bình (NIFERCO) — hãy dùng tài nguyên thật tiết kiệm! ⛏️'
      }}
      svgCard={{
        title: 'MỎ APATIT LÀO CAI & BA CƠ SỞ SẢN XUẤT PHÂN LÂN',
        subtitle: 'Khai thác Lào Cai → Tuyển/chế biến quặng → Lâm Thao · Văn Điển · Phân lân Ninh Bình (NIFERCO)',
        badge: 'Apatit → Phân lân',
        takeaway:
          'Quặng apatit Lào Cai là nguồn nguyên liệu quan trọng cho Supe Lâm Thao, Lân nung chảy Văn Điển và Phân lân Ninh Bình (NIFERCO). Cần kết hợp tuyển quặng hợp lý, xử lý chất thải và phục hồi môi trường.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgApatiteMine />
    </QuestionSlide>
  );
}
