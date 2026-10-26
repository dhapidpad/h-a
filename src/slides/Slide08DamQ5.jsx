import React from 'react';
import QuestionSlide from './QuestionSlide';
import SvgSoilBalance from '../components/illustrations/SvgSoilBalance';

/* ==========================================================================
   SLIDE 08 — ĐẠM CÂU 5: HẠN CHẾ ĐẤT CHUA HÓA/THOÁI HÓA (MỤC 5 - SLIDE 08)
   - Tiêu đề: BẢO VỆ ĐẤT: GIẢM CHUA, TĂNG HỮU CƠ, BÓN THEO NHU CẦU
   - Màn hình (3 bước dạng timeline):
     1. Đo pH/kiểm tra đất → bón vôi đúng nhu cầu
     2. Bổ sung hữu cơ hoai mục, trả phụ phẩm an toàn
     3. Chia lần bón, bón đúng loại/liều/lúc/cách; cân đối N–P–K
   - Nhãn phụ: Luân canh cây họ Đậu có thể bổ sung N sinh học trong hệ thống phù hợp.
   ========================================================================== */

const PILLARS = [
  {
    id: 'step1',
    number: '01',
    tone: 'amber',
    title: 'ĐO pH / KIỂM TRA ĐẤT → BÓN VÔI ĐÚNG NHU CẦU',
    badge: 'Bước 1 · Kiểm tra pH',
    desc: (
      <>
        Kiểm tra độ chua (pH) và dinh dưỡng đất trước khi cải tạo; <strong>bón vôi hoặc đá vôi nông nghiệp theo đúng nhu cầu</strong> thực tế thay vì áp một liều cố định.
      </>
    )
  },
  {
    id: 'step2',
    number: '02',
    tone: 'green',
    title: 'BỔ SUNG HỮU CƠ HOAI MỤC, TRẢ PHỤ PHẨM AN TOÀN',
    badge: 'Bước 2 · Tái tạo mùn',
    desc: (
      <>
        Tăng cường <strong>phân hữu cơ ủ hoai mục, che phủ đất và trả phụ phẩm an toàn</strong> giúp cải thiện cấu trúc đất, khả năng giữ dinh dưỡng và hệ vi sinh vật.
      </>
    )
  },
  {
    id: 'step3',
    number: '03',
    tone: 'blue',
    title: 'CHIA LẦN BÓN, ĐÚNG LOẠI/LIỀU/LÚC/CÁCH & CÂN ĐỐI N–P–K',
    badge: 'Bước 3 · 4 Đúng',
    desc: (
      <>
        Chia lần bón theo giai đoạn cây, tránh bón trước mưa lớn, kết hợp <strong>phân chậm tan khi phù hợp</strong> và cân đối N–P–K để giảm thất thoát, hạn chế chua hóa.
      </>
    )
  }
];

export default function Slide08DamQ5({ onOpenNotes }) {
  return (
    <QuestionSlide
      chapter="dam"
      pillText="PHÂN ĐẠM (N) • CÂU 05 / 15"
      title="BẢO VỆ ĐẤT: GIẢM CHUA, TĂNG HỮU CƠ, BÓN THEO NHU CẦU"
      badgeIcon="4Đ"
      badgeSub="CANH TÁC BỀN VỮNG"
      badgeMain="Kiểm tra pH · Hữu cơ · 4 Đúng"
      question="Kết hợp kiểm tra pH, bổ sung hữu cơ hoai mục, luân canh phù hợp và bón cân đối để hạn chế thoái hóa đất."
      pillars={PILLARS}
      note={{
        tag: 'SINH HỌC',
        title: 'Luân canh cây họ Đậu:',
        text: 'Có thể bổ sung nguồn N sinh học nhờ vi khuẩn nốt sần trong hệ thống canh tác phù hợp (hỗ trợ giảm một phần phân đạm khoáng).'
      }}
      mascot={{
        mascotType: 'SPROUTY_N',
        emotion: 'happy',
        speech: 'Đo pH đất, thêm phân hữu cơ hoai mục và chia lần bón theo nhu cầu giúp đất bền sức hơn! 🌱'
      }}
      svgCard={{
        title: 'QUY TRÌNH CẢI TẠO & BẢO VỆ SỨC KHỎE ĐẤT',
        subtitle: 'Kiểm tra pH đất → Điều chỉnh vôi hợp lý → Bổ sung hữu cơ hoai mục → Bón cân đối 4 Đúng',
        badge: 'Đất khỏe bền vững',
        takeaway:
          'Phục hồi và bảo vệ đất cần tiến hành đồng bộ: kiểm tra pH để bón vôi đúng liều, bổ sung chất hữu cơ đã ủ hoai, chia đợt bón N–P–K hợp lý và kết hợp luân canh cây họ Đậu khi phù hợp.'
      }}
      onOpenNotes={onOpenNotes}
    >
      <SvgSoilBalance />
    </QuestionSlide>
  );
}
