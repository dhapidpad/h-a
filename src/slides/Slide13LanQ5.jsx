import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgApatiteMine from '../components/illustrations/SvgApatiteMine';

const PILLARS = [
  {
    id: 'mine',
    number: '01',
    tone: 'purple',
    title: 'MỎ APATIT LÀO CAI: TRỮ LƯỢNG HÀNG ĐẦU ĐÔNG NAM Á',
    badge: 'LÀO CAI ~2.5B TẤN',
    desc: (
      <>
        Quặng Apatit <strong>3Ca₃(PO₄)₂·CaF₂</strong> tại Lào Cai dài hơn <strong>100 km dọc sông Hồng</strong> (trữ lượng ~2.5 tỷ tấn) là mỏ photphat lớn nhất Đông Nam Á.
      </>
    ),
  },
  {
    id: 'factories',
    number: '02',
    tone: 'blue',
    title: '3 NHÀ MÁY TRỤ CỘT NGÀNH LÂN VIỆT NAM',
    badge: '3 ĐẠI NHÀ MÁY',
    desc: (
      <>
        1. <strong>Supe Phốt phát Lâm Thao</strong> (Phú Thọ) • 2. <strong>Lân Nung Chảy Văn Điển</strong> (Hà Nội) • 3. <strong>Lân Nung Chảy Ninh Bình</strong>.
      </>
    ),
  },
  {
    id: 'challenge',
    number: '03',
    tone: 'red',
    title: 'THÁCH THỨC: CẠN KIỆT QUẶNG GIÀU LOẠI 1',
    badge: 'TUYỂN NỔI QUẶNG',
    desc: (
      <>
        Quặng loại 1 (&gt;28% P₂O₅) dần cạn kiệt; phải đẩy mạnh <strong>công nghệ tuyển nổi quặng nghèo loại 2, 3</strong> và xử lý bãi thải thạch cao phosphogypsum.
      </>
    ),
  },
];

export default function Slide13LanQ5({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="lan"
      pillText="PHÂN LÂN (P) • CÂU HỎI 05 / 15"
      title="QUẶNG APATIT LÀO CAI & BÀI TOÁN TÀI NGUYÊN"
      badgeIcon="2.5B"
      badgeSub="MỎ APATIT LÀO CAI"
      badgeMain="Trữ lượng hàng đầu Đông Nam Á"
      question="Nguyên liệu tự nhiên sản xuất phân lân là gì? Vai trò của mỏ Apatit Lào Cai, 3 nhà máy lớn và thách thức cạn kiệt quặng giàu?"
      pillars={PILLARS}
      note={{
        tag: 'ECO',
        title: 'Kinh tế tuần hoàn:',
        text: 'Tận dụng xỉ quặng lân nung chảy và bã thạch cao nhân tạo sau chế biến để sản xuất phụ gia xi măng và vật liệu xây dựng.',
      }}
      mascot={{
        mascotType: 'SPARKY_P',
        emotion: 'curious',
        speech: 'Tài nguyên quặng tự nhiên là hữu hạn, chúng mình phải khai thác tiết kiệm và tái chế tuần hoàn bạn nhé! 🏔️⚡',
      }}
      svgCard={{
        title: 'MỎ APATITE LÀO CAI & CÔNG NGHIỆP LÂN',
        subtitle: 'Tài nguyên quốc gia • 3 trụ cột Lâm Thao, Văn Điển, Ninh Bình & Kinh tế tuần hoàn',
        badge: 'Quặng Loại 1–4',
        takeaway:
          'Quặng Apatit Lào Cai là nguồn báu vật tự nhiên duy nhất sản xuất phân lân tại Việt Nam. Công nghệ hiện đại tuyển quặng nghèo và tái chế phụ phẩm xỉ quặng làm xi măng thúc đẩy nền kinh tế tuần hoàn bền vững.',
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgApatiteMine />
    </QuestionSlide>
  );
}
