import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgTopdressingMountain from '../components/illustrations/SvgTopdressingMountain';

/* ==========================================================================
   SLIDE 17 — KALI CÂU 4: THỜI ĐIỂM BÓN (MỤC 5 - SLIDE 17)
   - Tiêu đề: CHIA LẦN BÓN K THEO NHU CẦU CỦA CÂY VÀ ĐIỀU KIỆN ĐẤT
   - Màn hình (timeline giai đoạn):
     1. Sinh trưởng đầu kỳ: nhu cầu theo cây và lượng K đất
     2. Ra hoa/tạo hạt/phình củ/nuôi quả: theo khuyến cáo có thể cần tăng cung cấp
     3. Chia lần để giảm thất thoát khi đất nhẹ/mưa nhiều hoặc tưới lớn
   ========================================================================== */

const PILLARS = [
  {
    id: 'early',
    number: '01',
    tone: 'slate',
    title: 'SINH TRƯỞNG ĐẦU KỲ: NHU CẦU THEO CÂY VÀ LƯỢNG K TRONG ĐẤT',
    badge: 'Đầu vụ · Phân tích đất',
    desc: (
      <>
        Lượng K bón đầu vụ dựa vào <strong>loại cây trồng và khả năng cung cấp K của đất</strong>; một số hệ thống canh tác vẫn kết hợp bón lót một phần hợp lý.
      </>
    )
  },
  {
    id: 'peak',
    number: '02',
    tone: 'amber',
    title: 'RA HOA / TẠO HẠT / PHÌNH CỦ / NUÔI QUẢ: NHU CẦU K THƯỜNG TĂNG',
    badge: 'Giai đoạn cao điểm',
    desc: (
      <>
        Trong các giai đoạn tăng sinh khối, <strong>ra hoa, tạo hạt, phình củ hoặc nuôi quả</strong>, cây thường cần nhiều K hơn để vận chuyển đường và tích lũy chất khô.
      </>
    )
  },
  {
    id: 'split',
    number: '03',
    tone: 'green',
    title: 'CHIA LẦN BÓN ĐỂ GIẢM THẤT THOÁT KHI ĐẤT NHẸ / MƯA NHIỀU',
    badge: 'Giảm rửa trôi K⁺',
    desc: (
      <>
        Vì phân kali dễ tan, <strong>chia lần bón thúc theo khuyến cáo kỹ thuật</strong> giúp giảm rửa trôi ở đất cát nhẹ, mưa lớn hoặc tưới nhiều và tránh tăng muối cục bộ.
      </>
    )
  }
];

export default function Slide17KaliQ4({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU 14 / 15"
      title="CHIA LẦN BÓN K THEO NHU CẦU CỦA CÂY VÀ ĐIỀU KIỆN ĐẤT"
      badgeIcon="K⁺"
      badgeSub="THỜI ĐIỂM BÓN"
      badgeMain="Chia lần theo giai đoạn & đất"
      question="Nhu cầu K thường tăng khi tạo hạt, củ, quả; chia lần bón giúp nâng cao hiệu quả và giảm thất thoát."
      pillars={PILLARS}
      note={{
        tag: 'NGUYÊN TẮC',
        title: 'Linh hoạt theo điều kiện:',
        text: 'Tỷ lệ bón lót và bón thúc không cố định cho mọi loại cây; cần dựa vào phân tích đất, thành phần cơ giới đất, lượng mưa và quy trình kỹ thuật.'
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'happy',
        speech: 'Chia lần bón kali theo giai đoạn ra hoa, tạo hạt, phình củ, nuôi quả giúp cây hấp thu hiệu quả hơn! 🌾'
      }}
      svgCard={{
        title: 'ĐƯỜNG CONG NHU CẦU KALI MINH HỌA THEO GIAI ĐOẠN',
        subtitle: 'Minh họa khái niệm (thay đổi theo cây trồng) · Chú trọng giai đoạn ra hoa, tạo hạt, củ, quả',
        badge: 'Chia lần bón hợp lý',
        takeaway:
          'Nhu cầu K thường tăng cao ở giai đoạn hình thành và nuôi hạt, củ, quả. Chia lần bón theo đặc tính đất và lượng mưa/tưới giúp sử dụng K hiệu quả hơn.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgTopdressingMountain />
    </QuestionSlide>
  );
}
