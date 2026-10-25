import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgVietnamFactories from '../components/illustrations/SvgVietnamFactories';

const PILLARS = [
  {
    id: 'gas',
    number: '01',
    tone: 'green',
    title: 'ĐẠM PHÚ MỸ & CÀ MAU: KHÍ THIÊN NHIÊN',
    badge: 'CH₄ + H₂O',
    desc: (
      <>
        • <strong>Đạm Phú Mỹ</strong> (BR-VT): Khí bể Nam Côn Sơn &amp; Bạch Hổ.<br />
        • <strong>Đạm Cà Mau</strong>: Khí mỏ PM3-CAA vịnh Thái Lan. Tổng hợp NH₃ theo quy trình Haber-Bosch hiện đại.
      </>
    ),
  },
  {
    id: 'coal',
    number: '02',
    tone: 'slate',
    title: 'ĐẠM NINH BÌNH & HÀ BẮC: KHÍ HÓA THAN ĐÁ',
    badge: 'THAN CÁM QN',
    desc: (
      <>
        Sử dụng nguồn <strong>than cám vùng mỏ Quảng Ninh</strong>, khí hóa ở 1300°C tạo khí tổng hợp CO + H₂ sản xuất Urê phục vụ đồng bằng Bắc Bộ.
      </>
    ),
  },
  {
    id: 'security',
    number: '03',
    tone: 'blue',
    title: 'TỰ CHỦ 100% NHU CẦU & XUẤT KHẨU',
    badge: 'TỰ CHỦ 100%',
    desc: (
      <>
        Tổng công suất 4 nhà máy đạt <strong>&gt; 2.6 triệu tấn Urê/năm</strong>, giúp Việt Nam tự chủ hoàn toàn nguồn đạm nội địa và xuất khẩu thu ngoại tệ.
      </>
    ),
  },
];

export default function Slide07DamQ4({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU HỎI 04 / 15"
      title="CÔNG NGHIỆP ĐẠM VIỆT NAM: KHÍ THIÊN NHIÊN & THAN ĐÁ"
      badgeIcon="VN"
      badgeSub="NĂNG LỰC SẢN XUẤT"
      badgeMain="> 2.6 Triệu tấn Urê / năm"
      question="Các nhà máy đạm lớn tại Việt Nam (Phú Mỹ, Cà Mau, Ninh Bình, Hà Bắc) dùng 2 nguồn nguyên liệu tự nhiên nào và đóng góp gì cho kinh tế?"
      pillars={PILLARS}
      note={{
        tag: 'TOP',
        title: 'An ninh lương thực:',
        text: '4 nhà máy đạm quốc gia là lá chắn bình ổn giá phân bón cho nông dân trước biến động thị trường thế giới.',
      }}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: 'proud',
        speech: 'Việt Nam mình tự sản xuất được hơn 2.6 triệu tấn Đạm mỗi năm từ dầu khí và than đá, xịn lắm đúng không nào! 🏭🌾',
      }}
      svgCard={{
        title: 'BẢN ĐỒ CÔNG NGHIỆP PHÂN ĐẠM VN',
        subtitle: 'Tổ hợp 4 đại công trình: Phú Mỹ, Cà Mau (Khí) & Hà Bắc, Ninh Bình (Than)',
        badge: '> 2.6 Triệu Tấn/Năm',
        takeaway:
          'Việt Nam hoàn toàn tự chủ sản xuất phân đạm với công suất vượt 2.6 triệu tấn Urê/năm, chuyển hóa khí thiên nhiên đồng hành miền Nam và than đá Quảng Ninh miền Bắc thành nguồn dinh dưỡng bảo đảm vững chắc an ninh lương thực quốc gia.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgVietnamFactories />
    </QuestionSlide>
  );
}
