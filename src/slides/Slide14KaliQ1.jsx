import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgStomataShield from '../components/illustrations/SvgStomataShield';

/* ==========================================================================
   SLIDE 14 — KALI CÂU 1: VAI TRÒ CỦA K⁺ (MỤC 5 - SLIDE 14)
   - Tiêu đề: K — ĐIỀU HÒA NƯỚC, HOẠT HÓA ENZYME, VẬN CHUYỂN ĐƯỜNG
   - Màn hình:
     1. Kali được cây hấp thụ chủ yếu dưới dạng K⁺
     2. Điều hòa khí khổng và cân bằng thẩm thấu
     3. Hỗ trợ enzyme, vận chuyển đường và hình thành củ/hạt/quả
   ========================================================================== */

const PILLARS = [
  {
    id: 'ion',
    number: '01',
    tone: 'amber',
    title: 'KALI ĐƯỢC CÂY HẤP THỤ CHỦ YẾU DƯỚI DẠNG K⁺',
    badge: 'Ion K⁺ tự do',
    desc: (
      <>
        Kali được rễ hấp thụ và tồn tại trong tế bào chủ yếu dưới dạng <strong>ion K⁺</strong>; không phải thành phần tạo bộ khung phân tử hữu cơ như N trong protein.
      </>
    )
  },
  {
    id: 'stomata',
    number: '02',
    tone: 'blue',
    title: 'ĐIỀU HÒA KHÍ KHỔNG VÀ CÂN BẰNG THẨM THẤU',
    badge: 'Sử dụng nước hiệu quả',
    desc: (
      <>
        Ion <strong>K⁺</strong> điều tiết áp suất thẩm thấu và cơ chế đóng mở khí khổng, giúp cây giữ nước và hỗ trợ khả năng chống chịu một số điều kiện bất lợi.
      </>
    )
  },
  {
    id: 'sugar',
    number: '03',
    tone: 'green',
    title: 'HỖ TRỢ ENZYME, VẬN CHUYỂN ĐƯỜNG VÀ HÌNH THÀNH CỦ/HẠT/QUẢ',
    badge: 'Enzyme · Đường bột',
    desc: (
      <>
        Hoạt hóa nhiều hệ enzyme quang hợp, tham gia cân bằng ion và <strong>vận chuyển đường từ lá về cơ quan dự trữ</strong> (củ, hạt, quả), hỗ trợ độ cứng cáp của cây.
      </>
    )
  }
];

export default function Slide14KaliQ1({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU 11 / 15"
      title="K — ĐIỀU HÒA NƯỚC, HOẠT HÓA ENZYME, VẬN CHUYỂN ĐƯỜNG"
      badgeIcon="K⁺"
      badgeSub="DẠNG HẤP THỤ"
      badgeMain="Ion K⁺ trong tế bào"
      question="Ion K⁺ điều hòa thẩm thấu và khí khổng, hoạt hóa enzyme, vận chuyển đường và hỗ trợ sức chống chịu của cây."
      questionChips={[
        { label: 'Ion K⁺', tone: 'amber' },
        { label: 'Khí khổng', tone: 'blue' },
        { label: 'Vận chuyển đường', tone: 'green' }
      ]}
      pillars={PILLARS}
      note={{
        tag: 'SINH LÝ',
        title: 'Vai trò cân đối:',
        text: 'Đủ K giúp cây sử dụng nước hiệu quả và hỗ trợ độ cứng cây, nhưng cần kết hợp cân đối với N, P và kỹ thuật canh tác.'
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'knight',
        speech: 'Ion K⁺ giúp điều tiết đóng mở khí khổng, hoạt hóa enzyme và vận chuyển đường về củ, hạt, quả! 🛡️'
      }}
      svgCard={{
        title: 'ĐIỀU HÒA KHÍ KHỔNG & VẬN CHUYỂN ĐƯỜNG BẰNG ION K⁺',
        subtitle: 'K⁺ điều tiết tế bào bảo vệ khí khổng · Hoạt hóa enzyme · Đưa sản phẩm quang hợp về hạt/củ/quả',
        badge: 'Ion K⁺',
        takeaway:
          'Kali được cây hấp thụ dưới dạng K⁺, đóng vai trò thiết yếu trong điều hòa thẩm thấu, đóng mở khí khổng, hoạt hóa enzyme và vận chuyển đường từ lá về củ, hạt, quả.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgStomataShield />
    </QuestionSlide>
  );
}
