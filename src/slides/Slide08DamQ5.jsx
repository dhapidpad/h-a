import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgSoilBalance from '../components/illustrations/SvgSoilBalance';

const PILLARS = [
  {
    id: 'lime',
    number: '01',
    tone: 'amber',
    title: 'BÓN VÔI KHỬ CHUA CÂN BẰNG PH',
    badge: 'pH 6.0 – 6.8',
    desc: (
      <>
        Bón vôi nông nghiệp (CaCO₃, CaO) định kỳ để <strong>trung hòa ion H⁺ tự do</strong> từ quá trình nitrat hóa, nâng pH đất chua (&lt; 5.0) về mức tối ưu.
      </>
    ),
  },
  {
    id: 'organic',
    number: '02',
    tone: 'green',
    title: 'HỮU CƠ VI SINH: TÁI TẠO TẦNG MÙN & KEO ĐẤT',
    badge: 'BIOCHAR',
    desc: (
      <>
        Bổ sung <strong>phân chuồng hoai mục, trùn quế, than sinh học</strong> giúp tái tạo keo mùn xốp, tăng dung tích hấp phụ CEC và nuôi giun đất, vi sinh vật có lợi.
      </>
    ),
  },
  {
    id: 'crf',
    number: '03',
    tone: 'purple',
    title: 'ĐẠM TAN CHẬM (CRF) & LUÂN CANH HỌ ĐẬU',
    badge: 'CÔNG NGHỆ CAO',
    desc: (
      <>
        Dùng <strong>Urê bọc polymer tan chậm</strong> nhả dinh dưỡng 60–90 ngày; kết hợp luân canh cây họ Đậu có vi khuẩn <strong>Rhizobium</strong> cố định N₂ tự nhiên.
      </>
    ),
  },
];

export default function Slide08DamQ5({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU HỎI 05 / 15"
      title='PHỤC HỒI ĐẤT CHUA: NGUYÊN TẮC "4 ĐÚNG" & VI SINH HỮU CƠ'
      badgeIcon="4Đ"
      badgeSub="MỤC TIÊU BỀN VỮNG"
      badgeMain="Đúng Loại • Đúng Liều • Lúc • Cách"
      question="Làm thế nào để khắc phục đất bị chua hóa, thoái hóa do lạm dụng đạm hóa học lâu năm? Các giải pháp kết hợp hiệu quả là gì?"
      pillars={PILLARS}
      note={{
        tag: '4Đ',
        title: 'Công thức bền vững:',
        text: 'Giảm 20–30% đạm hóa học, bù đắp bằng phân hữu cơ vi sinh giúp đất tơi xốp, giữ ẩm tốt và chống bạc màu.',
      }}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: 'happy',
        speech: 'Cho đất ăn thêm phân hữu cơ và rải vôi khử chua, đất sẽ khỏe mạnh và nuôi tớ tốt nhất bạn nhé! 🌱✨',
      }}
      svgCard={{
        title: 'CÂN BẰNG ĐẤT & NGUYÊN TẮC 4 ĐÚNG',
        subtitle: 'Khử chua bằng vôi • Tái tạo keo đất với vi sinh hữu cơ',
        badge: '4 ĐÚNG',
        takeaway:
          'Khắc phục đất chua thoái hóa bằng chiến lược phối hợp: Bón vôi nông nghiệp nâng pH, bổ sung phân hữu cơ vi sinh gia tăng dung tích hấp phụ CEC và tuân thủ nghiêm ngặt nguyên tắc bón phân 4 Đúng.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgSoilBalance />
    </QuestionSlide>
  );
}
