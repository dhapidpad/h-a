import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgVietnamFactories from '../components/illustrations/SvgVietnamFactories';

/* ==========================================================================
   SLIDE 07 — ĐẠM CÂU 4: NHÀ MÁY ĐẠM Ở VIỆT NAM & NGUYÊN LIỆU (MỤC 5 - SLIDE 07)
   - Tiêu đề: BA NHÀ MÁY — HAI NHÓM NGUYÊN LIỆU CHÍNH
   - Màn hình:
     1. Đạm Phú Mỹ — Khí thiên nhiên — sản xuất urê/NH₃.
     2. Đạm Cà Mau — Khí thiên nhiên — nguồn khí gồm PM3-CAA và mỏ Cái Nước qua hệ thống khí PM3–Cà Mau.
     3. Đạm Ninh Bình — Than cám → khí hóa than → NH₃ → urê (phân biệt rõ với Phân lân Ninh Bình/NIFERCO).
   - Chân trang: Góp phần chủ động nguồn cung phân bón trong nước và hỗ trợ sản xuất nông nghiệp.
   ========================================================================== */

const PILLARS = [
  {
    id: 'phumy',
    number: '01',
    tone: 'green',
    title: 'ĐẠM PHÚ MỸ: NGUYÊN LIỆU KHÍ THIÊN NHIÊN',
    badge: 'Khí thiên nhiên → NH₃ → Urê',
    desc: (
      <>
        Sử dụng <strong>khí thiên nhiên</strong> (hệ thống khí khu vực phía Nam) làm nguyên liệu và nhiên liệu tổng hợp{' '}
        <strong>ammonia (NH₃) và phân đạm urê</strong>.
      </>
    )
  },
  {
    id: 'camau',
    number: '02',
    tone: 'blue',
    title: 'ĐẠM CÀ MAU: KHÍ THIÊN NHIÊN (PM3-CAA & MỎ CÁI NƯỚC)',
    badge: 'Hệ thống khí PM3–Cà Mau',
    desc: (
      <>
        Sử dụng nguồn <strong>khí thiên nhiên từ lô PM3-CAA và mỏ Cái Nước</strong> qua hệ thống đường ống khí PM3–Cà Mau để sản xuất NH₃ và urê hạt đục.
      </>
    )
  },
  {
    id: 'ninhbinh',
    number: '03',
    tone: 'slate',
    title: 'ĐẠM NINH BÌNH: THAN CÁM → KHÍ HÓA THAN → NH₃ → URÊ',
    badge: 'Công nghệ khí hóa than',
    desc: (
      <>
        Sử dụng <strong>than cám qua công nghệ khí hóa than</strong> tạo khí tổng hợp, sau tinh chế dùng sản xuất NH₃ rồi tổng hợp urê (khác với Phân lân Ninh Bình/NIFERCO).
      </>
    )
  }
];

export default function Slide07DamQ4({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU 04 / 15"
      title="BA NHÀ MÁY — HAI NHÓM NGUYÊN LIỆU CHÍNH"
      badgeIcon="VN"
      badgeSub="NGUYÊN LIỆU TỰ NHIÊN"
      badgeMain="Khí thiên nhiên & Than cám"
      question="Góp phần chủ động nguồn cung phân bón trong nước, giảm một phần phụ thuộc nhập khẩu và hỗ trợ sản xuất nông nghiệp."
      questionChips={[
        { label: 'Đạm Phú Mỹ', tone: 'green' },
        { label: 'Đạm Cà Mau', tone: 'blue' },
        { label: 'Đạm Ninh Bình', tone: 'slate' }
      ]}
      pillars={PILLARS}
      note={{
        tag: 'PHÂN BIỆT',
        title: 'Lưu ý tên đơn vị tại Ninh Bình:',
        text: 'Đạm Ninh Bình sản xuất urê từ than cám; còn Công ty CP Phân lân Ninh Bình (NIFERCO, ở Slide 13) sản xuất phân lân nung chảy và NPK.'
      }}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: 'proud',
        speech: 'Đạm Phú Mỹ & Cà Mau đi từ khí thiên nhiên; Đạm Ninh Bình đi từ khí hóa than cám! 🏭'
      }}
      svgCard={{
        title: 'BA NHÀ MÁY ĐẠM TIÊU BIỂU & SƠ ĐỒ NGUYÊN LIỆU',
        subtitle: 'Khí thiên nhiên (Phú Mỹ, Cà Mau) hoặc Than cám (Đạm Ninh Bình) → khí tổng hợp/NH₃ → urê',
        badge: 'Khí & Than → Urê',
        takeaway:
          'Đạm Phú Mỹ và Đạm Cà Mau sử dụng khí thiên nhiên; Đạm Ninh Bình sử dụng công nghệ khí hóa than cám. Các nhà máy góp phần chủ động nguồn cung nội địa và hỗ trợ chuỗi cung ứng nông nghiệp.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgVietnamFactories />
    </QuestionSlide>
  );
}
