import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgBasalRocket from '../components/illustrations/SvgBasalRocket';

/* ==========================================================================
   SLIDE 12 — LÂN CÂU 4: VÌ SAO THƯỜNG BÓN LÓT (MỤC 5 - SLIDE 12)
   - Tiêu đề: LÂN THƯỜNG ĐƯỢC BÓN SỚM VÌ ÍT DI ĐỘNG TRONG ĐẤT
   - Màn hình:
     1. P dễ bị giữ/hấp phụ hoặc kết tủa trong nhiều loại đất
     2. Rễ non cần P sớm để phát triển
     3. Đặt phân gần vùng rễ theo đúng khuyến cáo
   ========================================================================== */

const PILLARS = [
  {
    id: 'mobility',
    number: '01',
    tone: 'amber',
    title: 'P DỄ BỊ GIỮ / HẤP PHỤ HOẶC KẾT TỦA TRONG NHIỀU LOẠI ĐẤT',
    badge: 'Ít di động trong đất',
    desc: (
      <>
        Ion photphat thường có độ di động thấp trong đất do bị <strong>hấp phụ lên keo đất</strong> hoặc <strong>kết tủa với Fe, Al</strong> (đất chua) và <strong>Ca</strong> (đất giàu vôi).
      </>
    )
  },
  {
    id: 'early',
    number: '02',
    tone: 'purple',
    title: 'RỄ NON CẦN P SỚM ĐỂ PHÁT TRIỂN',
    badge: 'Nhu cầu đầu vụ',
    desc: (
      <>
        Ngay từ giai đoạn nảy mầm và ra rễ non, cây cần photpho cho <strong>phân chia tế bào và chuyển hóa năng lượng ATP</strong> để hình thành bộ rễ khỏe.
      </>
    )
  },
  {
    id: 'placement',
    number: '03',
    tone: 'green',
    title: 'ĐẶT PHÂN GẦN VÙNG RỄ THEO ĐÚNG KHUYẾN CÁO',
    badge: 'Bón lót hợp lý',
    desc: (
      <>
        Bón lót và đặt phân ở tầng đất gần vùng rễ giúp tăng khả năng tiếp cận P sớm (tùy cây lâu năm hoặc hệ thống tưới phân vẫn có thể chia lần theo quy trình).
      </>
    )
  }
];

export default function Slide12LanQ4({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU 09 / 15"
      title="LÂN THƯỜNG ĐƯỢC BÓN SỚM VÌ ÍT DI ĐỘNG TRONG ĐẤT"
      badgeIcon="P"
      badgeSub="VỊ TRÍ & THỜI ĐIỂM"
      badgeMain="Bón lót gần vùng rễ non"
      question="Vì photphat ít di động trong đất và rễ non cần P sớm, phân lân thường được ưu tiên bón lót gần vùng rễ."
      pillars={PILLARS}
      note={{
        tag: 'THỰC HÀNH',
        title: 'Lưu ý kỹ thuật:',
        text: 'Đặt phân ở tầng đất rễ non dễ tiếp cận nhưng tránh để phân nồng độ cao tiếp xúc trực tiếp làm xót hạt giống hoặc rễ tơ.'
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'astronaut',
        speech: 'Photphat ít di chuyển trong đất nên đặt phân gần vùng rễ ngay đầu vụ giúp cây con tiếp cận P kịp thời! 🌱'
      }}
      svgCard={{
        title: 'ĐỘ DI ĐỘNG THẤP CỦA P & VỊ TRÍ BÓN LÓT GẦN RỄ',
        subtitle: 'So sánh đặt phân gần vùng rễ non (bón lót) và rải trên mặt đất xa tầng rễ',
        badge: 'Ít di động · Bón sớm',
        takeaway:
          'Ion photphat dễ bị keo đất giữ lại nên di chuyển hạn chế. Bón lót và đặt phân gần vùng rễ non giúp cây tiếp cận P ngay từ giai đoạn khởi đầu.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgBasalRocket />
    </QuestionSlide>
  );
}
