import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgStomataShield from '../components/illustrations/SvgStomataShield';

const PILLARS = [
  {
    id: 'stomata',
    number: '01',
    tone: 'amber',
    title: 'ĐIỀU HÒA ĐÓNG MỞ KHÍ KHỔNG — CHỐNG HẠN RÉT',
    badge: 'ĐIỀU TIẾT K⁺',
    desc: (
      <>
        Kali tồn tại dạng <strong>ion K⁺ tự do lưu động</strong> trong dịch bào. K⁺ bơm vào mở khí khổng đón CO₂; khi khô hạn K⁺ rút ra khép lỗ khí giữ nước chống héo.
      </>
    ),
  },
  {
    id: 'sugar',
    number: '02',
    tone: 'green',
    title: 'TRẠM VẬN CHUYỂN ĐƯỜNG BỘT VỀ CỦ QUẢ',
    badge: 'VẬN CHUYỂN ĐƯỜNG',
    desc: (
      <>
        Đóng vai trò "xe tải" dẫn truyền đường saccarozơ và tinh bột từ lá <strong>về tích trữ ở quả, củ, hạt</strong>, giúp tăng độ ngọt (Brix), củ to, hạt chắc mẩy.
      </>
    ),
  },
  {
    id: 'shield',
    number: '03',
    tone: 'blue',
    title: 'HIỆP SĨ ĐỀ KHÁNG: CỨNG CÂY, CHỐNG ĐỔ NGÃ',
    badge: 'CỨNG CÂY CHỐNG ĐỔ',
    desc: (
      <>
        Tăng độ dày thành tế bào và mô cơ lóng thân, giúp thân lúa cứng cáp, <strong>chống chịu giông lốc đổ ngã</strong> và ngăn nấm bệnh xâm nhập biểu bì.
      </>
    ),
  },
];

export default function Slide14KaliQ1({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU HỎI 01 / 15"
      title="K — VỆ SĨ ĐỀ KHÁNG & TRẠM BƠM ĐƯỜNG BỘT"
      badgeIcon="K"
      badgeSub="DẠNG ION TỒN TẠI"
      badgeMain="Ion K⁺ tự do lưu động trong tế bào"
      question="Phân kali cung cấp nguyên tố nào, tồn tại dạng ion gì? Vai trò của Kali trong điều hòa khí khổng, vận chuyển đường bột và chống hạn rét?"
      pillars={PILLARS}
      note={{
        tag: '60+',
        title: 'Hoạt hóa Enzyme:',
        text: 'Ion K⁺ là cofactor kích hoạt hơn 60 hệ thống enzyme điều khiển quang hợp, hô hấp và tổng hợp tinh bột.',
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'knight',
        speech: 'Có tớ bảo vệ, cây trồng cứng cáp vững vàng, quả ngọt mọng nước thơm ngon! 🛡️🍊',
      }}
      svgCard={{
        title: 'BƠM ION K⁺ & LÁ CHẮN KHÍ KHỔNG',
        subtitle: 'Áp suất thẩm thấu • Cơ chế đóng mở tế bào hạt đậu & vận chuyển đường bột',
        badge: 'Ion K⁺ Tự Do',
        takeaway:
          'Kali không tham gia cấu trúc hữu cơ mà tồn tại tự do dạng ion K⁺ trong dịch bào. Bơm K⁺ điều hòa đóng mở khí khổng giữ nước chống hạn hán và hoạt hóa hơn 60 enzyme vận chuyển đường bột vào quả ngọt.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgStomataShield />
    </QuestionSlide>
  );
}
