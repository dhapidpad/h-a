import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgSoilCompaction from '../components/illustrations/SvgSoilCompaction';

const PILLARS = [
  {
    id: 'ec',
    number: '01',
    tone: 'red',
    title: 'TÍCH TỤ ĐỘ MẶN (EC TĂNG) — NGUY CƠ HẠN SINH LÝ',
    badge: 'TĂNG ĐỘ MẶN EC',
    desc: (
      <>
        Ion <strong>Cl⁻ dư thừa</strong> làm tăng độ dẫn điện (EC). Áp suất thẩm thấu đất cao hơn dịch rễ gây <strong>hạn sinh lý: rút ngược nước khỏi rễ</strong> làm cháy lông hút.
      </>
    ),
  },
  {
    id: 'compaction',
    number: '02',
    tone: 'amber',
    title: 'PHÁ HỦY KEO ĐẤT — NÉN CHẶT CHAI CỨNG BÍ KHÍ',
    badge: 'ĐẤT CHAI CỨNG',
    desc: (
      <>
        Cl⁻ kéo <strong>Ca²⁺, Mg²⁺</strong> tạo muối tan rửa trôi mất cầu nối keo đất. Đất mất cấu trúc viên đoàn, <strong>nén chặt bí khí</strong> làm nghẹt rễ và hại vi sinh vật.
      </>
    ),
  },
  {
    id: 'recovery',
    number: '03',
    tone: 'green',
    title: 'GIẢI PHÁP: LUÂN PHIÊN K₂SO₄ & BỒI BỔ HỮU CƠ',
    badge: 'PHỤC HỒI HỮU CƠ',
    desc: (
      <>
        Luân phiên sang <strong>K₂SO₄ hoặc kali hữu cơ</strong> (tro trấu, phân ủ), bón vôi bù Ca²⁺ và bổ sung mùn hữu cơ, nấm <strong>Trichoderma</strong> làm tơi xốp đất.
      </>
    ),
  },
];

export default function Slide18KaliQ5({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="kali"
      pillText="PHÂN KALI (K) • CÂU HỎI 05 / 15"
      title="HỆ LỤY LẠM DỤNG KCL: ĐẤT CHAI CỨNG & BÍ KHÍ"
      badgeIcon={{ text: 'EC', bg: 'linear-gradient(135deg, var(--danger) 0%, var(--danger-deep) 100%)' }}
      badgeSub="NGƯỠNG AN TOÀN ĐẤT"
      badgeMain="Độ dẫn điện EC < 1.5 mS/cm"
      question="Lạm dụng KCl lâu dài làm tăng độ mặn (EC) đất ra sao? Cơ chế phá vỡ cấu trúc keo đất, làm đất chai cứng bí khí và suy giảm vi sinh vật?"
      pillars={PILLARS}
      note={{
        tag: 'EC',
        title: 'Kiểm soát định kỳ:',
        text: 'Đo độ dẫn điện EC đất (< 1.5 mS/cm là an toàn) trước khi quyết định bón thêm phân muối khoáng KCl.',
      }}
      mascot={{
        mascotType: 'SUNNY_K',
        emotion: 'worried',
        speech: 'Đừng bón KCl quá liều kẻo đất bị nghẹt thở và khát nước ngược đó nha! 🩺🧪',
      }}
      svgCard={{
        title: 'THOÁI HÓA ĐẤT & BẢO VỆ ĐẤT BỀN VỮNG',
        subtitle: 'Tích lũy muối Cl⁻ • Gia tăng độ dẫn điện EC & phá vỡ keo đất chai cứng',
        badge: 'EC < 1.5 mS/cm',
        takeaway:
          'Lạm dụng KCl liên tục tích tụ gốc clo làm tăng chỉ số độ mặn EC của dung dịch đất, gây hiện tượng hạn sinh lý rút ngược nước khỏi tế bào rễ, đồng thời rửa trôi canxi làm đất bị nén chặt chai cứng và suy kiệt vi sinh vật có ích.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgSoilCompaction />
    </QuestionSlide>
  );
}
