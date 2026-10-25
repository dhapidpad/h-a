import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgLeafScorchAlert from '../components/illustrations/SvgLeafScorchAlert';

const PILLARS = [
  {
    id: 'scorch',
    number: '01',
    tone: 'red',
    title: 'BỆNH ĐÓI KALI: CHÁY KHÔ TỪ RÌA MÉP LÁ GIÀ',
    badge: 'CHÁY MÉP LÁ',
    desc: (
      <>
        Do K⁺ linh động rút lên nuôi chồi non, triệu chứng thiếu K xuất hiện sớm ở <strong>mép và chóp lá già</strong>: vàng sém rồi cháy khô giòn, thân cây yếu dễ đổ.
      </>
    ),
  },
  {
    id: 'chlorine',
    number: '02',
    tone: 'amber',
    title: 'TÁC HẠI KHI BÓN KCL CHO CÂY NHẠY CẢM CLO',
    badge: 'CÂY KỴ CL⁻',
    desc: (
      <>
        • <strong>Sầu riêng:</strong> Cl⁻ làm múi nhão nước, sượng cơm. • <strong>Khoai tây:</strong> giảm tinh bột, củ sượng. • <strong>Thuốc lá:</strong> lá ẩm khó cháy, mất hương thơm.
      </>
    ),
  },
  {
    id: 'solution',
    number: '03',
    tone: 'green',
    title: 'GIẢI PHÁP: DÙNG K₂SO₄ HOẶC KNO₃ BẢO VỆ CHẤT LƯỢNG',
    badge: 'K₂SO₄ / KNO₃',
    desc: (
      <>
        Với cây ăn trái đặc sản và cây lấy củ tinh bột, bắt buộc dùng <strong>Kali Sunfat (K₂SO₄)</strong> để giữ vị ngọt đậm, cơm dẻo vàng và đạt chuẩn xuất khẩu.
      </>
    ),
  },
];

export default function Slide16KaliQ3({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU HỎI 03 / 15"
      title="NHẬN DIỆN CÂY ĐÓI KALI & CÂY NHẠY CẢM VỚI CLO"
      badgeIcon={{ text: 'KỴ Cl⁻', bg: 'linear-gradient(135deg, var(--danger) 0%, var(--danger-deep) 100%)' }}
      badgeSub="CẢNH BÁO NÔNG HỌC"
      badgeMain="Cấm dùng KCl cho cây mẫn cảm Clo"
      question='Hiện tượng "đói kali" biểu hiện thế nào trên lá? Tại sao các cây nhạy cảm Clo (sầu riêng, khoai tây, thuốc lá) phải dùng K₂SO₄ thay vì KCl?'
      pillars={PILLARS}
      note={{
        tag: 'MẸO',
        title: 'Phân biệt nhanh trên lá già:',
        text: 'Thiếu Đạm vàng chữ V từ chóp dọc theo gân chính; Thiếu Kali cháy khô dọc hai rìa mép lá bên ngoài vào trong.',
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'worried',
        speech: 'Thấy mép lá già khô cháy như hơ lửa là cây đang khát Kali cấp cứu đó nha! 🍂',
      }}
      svgCard={{
        title: 'CẢNH BÁO CHÁY CHÓP LÁ & NGỘ ĐỘC CLO',
        subtitle: 'Triệu chứng đói Kali mép lá già • Nguy cơ sượng cơm sầu riêng do ion Cl⁻',
        badge: 'Cảnh Báo Cháy Lá',
        takeaway:
          'Thiếu Kali làm mép lá già khô cháy quăn lại như hơ lửa do K rút lên nuôi chồi non. Nhóm cây mẫn cảm clo (sầu riêng, thanh long, khoai tây) tuyệt đối không dùng KCl vì tích tụ Cl⁻ gây sượng múi cơm, teo củ và rụng hoa hàng loạt.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgLeafScorchAlert />
    </QuestionSlide>
  );
}
