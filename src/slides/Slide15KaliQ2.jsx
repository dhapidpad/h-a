import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgKClvsK2SO4 from '../components/illustrations/SvgKClvsK2SO4';

const PILLARS = [
  {
    id: 'k2o',
    number: '01',
    tone: 'blue',
    title: 'TIÊU CHÍ ĐÁNH GIÁ: % KHỐI LƯỢNG K₂O QUY ĐỔI',
    badge: 'QUY ĐỔI %K₂O',
    desc: (
      <>
        Độ dinh dưỡng của mọi loại phân kali đều được quy đổi và đánh giá theo <strong>% khối lượng K₂O tương ứng</strong> có trong muối phân bón.
      </>
    ),
  },
  {
    id: 'kcl',
    number: '02',
    tone: 'amber',
    title: 'KALI CLORUA (KCl): 60% K₂O — MUỐI ĐỎ BÌNH DÂN',
    badge: 'PHỔ BIẾN >90%',
    desc: (
      <>
        Tinh thể đỏ hồng chứa <strong>~60% K₂O</strong>, tan nhanh, giá rẻ, chiếm &gt;90% thị phần. Nhược điểm: chứa <strong>ion Cl⁻</strong> gây mặn đất nếu bón thừa.
      </>
    ),
  },
  {
    id: 'k2so4',
    number: '03',
    tone: 'green',
    title: 'KALI SUNFAT (K₂SO₄): 50% K₂O — CAO CẤP KHÔNG CLO',
    badge: '+18% LƯU HUỲNH',
    desc: (
      <>
        Tinh thể trắng chứa <strong>~50% K₂O</strong>, hoàn toàn không có Clo và cung cấp thêm <strong>18% Lưu huỳnh (S)</strong> tạo hương thơm, tinh dầu cho trái cây.
      </>
    ),
  },
];

export default function Slide15KaliQ2({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU HỎI 02 / 15"
      title="KALI CLORUA (60%) vs KALI SUNFAT (50% K₂O)"
      badgeIcon="%K₂O"
      badgeSub="TIÊU CHÍ DINH DƯỠNG"
      badgeMain="Đo bằng % khối lượng K₂O quy đổi"
      question="Độ dinh dưỡng của phân kali đánh giá theo chỉ tiêu nào? So sánh thành phần, độ tan và đặc điểm giữa Kali Clorua (KCl) và Kali Sunfat (K₂SO₄)?"
      pillars={PILLARS}
      note={{
        tag: 'GIÁ',
        title: 'Kinh tế nông nghiệp:',
        text: 'KCl dùng cho lúa ngô đại trà; K₂SO₄ đắt gấp đôi nhưng bắt buộc cho nông sản xuất khẩu cao cấp (sầu riêng, cà phê, khoai tây).',
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'scientist',
        speech: 'Cây ưa ngọt thơm hãy chọn K₂SO₄ của tớ nhé, không lo gốc Clo làm sượng múi đâu! 🧪✨',
      }}
      svgCard={{
        title: 'ĐỐI CHIẾU KALI CLORUA VS SUNFAT',
        subtitle: 'Độ dinh dưỡng %K₂O • KCl 60% K₂O (đỏ ớt) vs K₂SO₄ 50% K₂O + Lưu huỳnh',
        badge: 'Độ Dinh Dưỡng %K₂O',
        takeaway:
          'Độ dinh dưỡng của phân kali tính bằng %K₂O. KCl (60% K₂O) giá rẻ nhất, chiếm 90% lượng tiêu thụ nhưng chứa Cl⁻ gây hại cây mẫn cảm. K₂SO₄ (50% K₂O + 18% S) là phân bón cao cấp không clo giúp quả ngọt, tinh bột thơm ngon.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgKClvsK2SO4 />
    </QuestionSlide>
  );
}
