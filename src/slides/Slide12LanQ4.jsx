import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgBasalRocket from '../components/illustrations/SvgBasalRocket';

const PILLARS = [
  {
    id: 'slow',
    number: '01',
    tone: 'amber',
    title: 'TÍNH DI ĐỘNG KÉM: CHỈ NGẤM 1 – 3 CM TRONG CẢ VỤ',
    badge: '1–3 CM / VỤ',
    desc: (
      <>
        Ion H₂PO₄⁻ bị keo đất và <strong>Fe³⁺, Al³⁺, Ca²⁺ kết tủa cố định</strong>. Nếu bón thúc rải mặt, lân nằm nguyên ở tầng mặt, rễ sâu không với tới được.
      </>
    ),
  },
  {
    id: 'rocket',
    number: '02',
    tone: 'purple',
    title: 'BỆ PHÓNG RỄ NON: MẦM NHÚ LÀ CẦN LÂN NGAY',
    badge: 'RỄ NON ATP',
    desc: (
      <>
        Cây con <strong>2–3 tuần đầu đời cần nhiều P</strong> để phân chia tế bào rễ và nạp ATP. Thiếu lân đầu vụ, bộ rễ còi cọc và không thể phục hồi về sau.
      </>
    ),
  },
  {
    id: 'depth',
    number: '03',
    tone: 'green',
    title: 'KỸ THUẬT: ĐẶT PHÂN SÂU ĐÚNG TẦNG RỄ CÂY',
    badge: 'ĐÁY RÃNH 15CM',
    desc: (
      <>
        Bón lót sâu <strong>10 – 15 cm dưới đáy rãnh</strong> cùng phân hữu cơ trước khi gieo hạt hoặc đặt cây con để rễ vừa nhú là tiếp xúc dinh dưỡng ngay.
      </>
    ),
  },
];

export default function Slide12LanQ4({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU HỎI 04 / 15"
      title="VÌ SAO PHÂN LÂN LUÔN ĐƯỢC BÓN LÓT ĐẦU VỤ?"
      badgeIcon={{ text: '100%', bg: 'linear-gradient(135deg, var(--k-main) 0%, var(--k-deep) 100%)' }}
      badgeSub="KỸ THUẬT VÀNG"
      badgeMain="Bón lót sâu 10 – 15 cm dưới rãnh"
      question="Tại sao phân lân luôn được dùng để bón lót sâu vào đất trước khi gieo trồng chứ ít khi dùng bón thúc rải mặt như phân đạm?"
      pillars={PILLARS}
      note={{
        tag: '100%',
        title: 'Tỷ lệ bón chuẩn:',
        text: 'Dành trọn 100% lượng phân lân cả mùa vụ để bón lót (khác với đạm và kali phải chia nhỏ bón thúc nhiều đợt).',
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'astronaut',
        speech: 'Hãy chôn tớ xuống sâu 10–15 cm nhé, tớ sẽ kích hoạt bệ phóng rễ non bay vút lên! 🚀⚡',
      }}
      svgCard={{
        title: 'BỆ PHÓNG BÓN LÓT RỄ SÂU',
        subtitle: 'Chiến lược 100% bón lót sâu • Khắc phục tính di động chậm của ion Photphat',
        badge: 'Bón Lót 100%',
        takeaway:
          'Photpho di động cực chậm trong đất (chỉ vài mm/tháng) và dễ bị cố định thành hợp chất khó tan. Bón lót sâu 10–15 cm trước gieo cấy đưa dinh dưỡng tới đúng tầng rễ hoạt động, làm bệ phóng kích hoạt rễ non bung tỏa sớm.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgBasalRocket />
    </QuestionSlide>
  );
}
