// Dữ liệu trình chiếu 19 Slide - Chuẩn hóa từ NHÓM TÀI.txt và Master Plan
export const CHAPTERS = {
  INTRO: { id: 'INTRO', name: 'MỞ ĐẦU', color: '#2563EB', softColor: '#EFF6FF' },
  DAM: { id: 'DAM', name: 'PHÂN ĐẠM (N)', color: '#12B76A', softColor: '#ECFDF5', mascot: 'SPROUTY_N' },
  LAN: { id: 'LAN', name: 'PHÂN LÂN (P)', color: '#7C5CFF', softColor: '#F5F3FF', mascot: 'SPARKY_P' },
  KALI: { id: 'KALI', name: 'PHÂN KALI (K)', color: '#F79009', softColor: '#FFFAEB', mascot: 'SUNNY_K' },
  GAME: { id: 'GAME', name: 'MINI GAME', color: '#EC4899', softColor: '#FDF2F8' },
  CLOSING: { id: 'CLOSING', name: 'TỔNG KẾT', color: '#2563EB', softColor: '#EFF6FF' }
};

export const TEAM_MEMBERS = [
  { 
    id: '01', 
    name: 'Đinh Trần Ngọc Trâm', 
    role: 'Trưởng nhóm / Biên tập viên', 
    badge: 'Trưởng nhóm',
    tasks: ['Phân chia nhiệm vụ', 'Kiểm duyệt slide', 'Thuyết trình slide']
  },
  { 
    id: '02', 
    name: 'Cao Diệu Thảo', 
    role: 'Thư ký Biên tập viên', 
    badge: 'Thư ký',
    tasks: ['Tổng hợp lại toàn bộ nội dung', 'Rà soát tiến độ']
  },
  { 
    id: '03', 
    name: 'Lê Thị Ngọc Ánh', 
    role: 'Bộ Phận Nội Dung & Tài Liệu', 
    badge: 'Nội dung',
    tasks: ['Nhận thông tin từ người tìm tài liệu để viết thành văn bản hoàn chỉnh']
  },
  { 
    id: '04', 
    name: 'Phạm Vũ Thanh Phúc', 
    role: 'Bộ Phận Nội Dung & Tài Liệu', 
    badge: 'Phân tích',
    tasks: ['Tóm tắt nội dung', 'Phân tích dữ liệu']
  },
  { 
    id: '05', 
    name: 'Nguyễn Mạnh Trường', 
    role: 'Bộ Phận Nội Dung & Tài Liệu', 
    badge: 'Chắt lọc',
    tasks: ['Tiếp nhận dữ liệu thô, chắt lọc và viết thành bài báo cáo']
  },
  { 
    id: '06', 
    name: 'Nguyễn Quốc Việt', 
    role: 'Bộ Phận Nội Dung & Tài Liệu', 
    badge: 'Tra cứu',
    tasks: ['Tra cứu tài liệu, sách báo, bảng thống kê về chủ đề']
  },
  { 
    id: '07', 
    name: 'Vũ Anh Tài', 
    role: 'Bộ Phận Thiết Kế', 
    badge: 'Slide & Video',
    tasks: ['Tạo slide, sắp xếp nội dung theo thứ tự', 'Edit, tạo video']
  },
  { 
    id: '08', 
    name: 'Lương Việt Anh', 
    role: 'Trực Quan Hóa', 
    badge: 'Mỹ thuật',
    tasks: ['Tìm kiếm, thiết kế phong cách slide']
  },
  { 
    id: '09', 
    name: 'Nguyễn Hữu Khánh', 
    role: 'Phản Biện Nội Bộ', 
    badge: 'Kiểm duyệt lỗi',
    tasks: ['Đọc, nhận diện và chỉnh sửa các điểm lỗi của slide']
  }
];

export const SLIDES = [
  // SLIDE 01: TRANG CHỦ ĐỀ
  {
    id: 1,
    type: 'topic',
    chapter: CHAPTERS.INTRO,
    eyebrow: 'HÓA HỌC ỨNG DỤNG NÔNG NGHIỆP',
    title: 'NPK — BỘ BA NUÔI DƯỠNG MÙA XANH',
    subtitle: 'Hóa học dinh dưỡng cho một nền nông nghiệp bền vững',
    speakerNotes: 'Kính chào thầy cô và các bạn! Hôm nay nhóm chúng em xin trình bày bài báo cáo về bộ ba nguyên tố dinh dưỡng vô cơ đa lượng: Phân Đạm (N), Phân Lân (P) và Phân Kali (K). Đây là ba trụ cột dinh dưỡng cốt lõi, ví như kiềng ba chân nuôi dưỡng cây trồng từ khi mới nảy mầm cho đến lúc đơm hoa kết trái bội thu.'
  },

  // SLIDE 02: VIDEO INTRO DỰNG BẰNG REACT
  {
    id: 2,
    type: 'video_intro',
    chapter: CHAPTERS.INTRO,
    eyebrow: 'MOTION-GRAPHIC CHUYỂN ĐỘNG (16S)',
    title: 'HÀNH TRÌNH BỨT PHÁ CỦA HẠT MẦM',
    subtitle: 'Nhìn cách N - P - K tiếp sức cho sự sống đâm chồi nở hoa',
    speakerNotes: 'Đoạn phim ngắn 16 giây này mô phỏng trọn vẹn chu trình tiếp sức của dinh dưỡng: Hạt giống rơi xuống đất mẹ được Lân kích thích bung rễ sâu; Đạm thúc đẩy thân vươn cao, lá bung xanh ngát; và Kali giúp giữ nước, nuôi nụ hoa biến thành chùm quả ngọt óng ả.'
  },

  // SLIDE 03: GIỚI THIỆU THÀNH VIÊN
  {
    id: 3,
    type: 'members',
    chapter: CHAPTERS.INTRO,
    eyebrow: 'ĐỘI NGŨ THỰC HIỆN BÁO CÁO',
    title: 'BIỆT ĐỘI NPK — 9 THÀNH VIÊN',
    subtitle: 'Mỗi người một mắt xích, phối hợp chặt chẽ giải đáp 15 câu hỏi',
    speakerNotes: 'Nhóm chúng em gồm 9 thành viên, phân công phụ trách lần lượt từng nội dung từ lý thuyết bản chất ion, bài toán công nghiệp sản xuất đến thực tế đồng ruộng của người nông dân.'
  },

  // SLIDE 04: ĐẠM - CÂU 1
  {
    id: 4,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q1',
    sourceQuestion: 'Phân đạm là gì? Vai trò quyết định của nguyên tố Nitơ (N) đối với sự sinh trưởng và phát triển của cây trồng là gì?',
    title: 'N — ĐỘNG CƠ CỦA MÀU XANH & SINH KHỐI',
    badges: [
      { text: '🌱 SINH KHỐI: Cây lớn nhanh, cành lá sum suê', color: '#36B86A' },
      { text: '🍃 DIỆP LỤC: Hạt nhân quang hợp màu xanh lá', color: '#2F80ED' },
      { text: '🧬 PROTEIN: Cấu tạo tế bào & enzyme sống', color: '#8C6BFA' }
    ],
    mascotEmotion: 'teacher',
    mascotSpeech: 'Có Đạm là lá xanh quang hợp, vươn cao vùn vụt nè! 🌱',
    speakerNotes: `1. Khái niệm: Phân đạm là phân bón hóa học cung cấp Nitơ (N) cho cây dưới dạng ion NH₄⁺ hoặc NO₃⁻.
2. Vai trò quyết định của N:
- Là thành phần cấu tạo axit amin, protein - vật chất sống cơ bản của mọi tế bào.
- Là nguyên tử trung tâm tạo nên phân tử Diệp lục (C₅₅H₇₂O₅N₄Mg), quyết định trực tiếp khả năng quang hợp hấp thụ ánh sáng.
- Thúc đẩy tăng trưởng sinh khối: đâm chồi, nảy lộc, phát triển thân lá.
Thiếu N lá vàng úa từ lá già, cây còi cọc ngừng lớn.`
  },

  // SLIDE 05: ĐẠM - CÂU 2
  {
    id: 5,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q2',
    sourceQuestion: 'Dựa vào đâu để đánh giá chất lượng (độ dinh dưỡng) của phân đạm? Hãy so sánh hàm lượng phần trăm về khối lượng của Nitơ (%N) trong các loại phân phổ biến: Ure CO(NH2)2, Amoni clorua NH4Cl, Amoni sunfat (NH4)2SO4 và Natri nitrat NaNO3. Loại nào có hàm lượng cao nhất?',
    title: 'ĐỘ DINH DƯỠNG: URÊ DẪN ĐẦU VỚI 46% N',
    badges: [
      { text: '👑 URÊ [CO(NH₂)₂]: 46.7% N — Vô địch hàm lượng', color: '#36B86A' },
      { text: '🥈 NH₄Cl: 26.2% N  |  🥉 (NH₄)₂SO₄: 21.2% N', color: '#5E6B7D' },
      { text: '🏷️ NaNO₃: 16.5% N — Phân đạm kiềm nồng độ thấp', color: '#5E6B7D' }
    ],
    mascotEmotion: 'champion',
    mascotSpeech: 'Urê là số 1! Cúp vàng 46% N vô địch đạm đậm đặc nè! 👑',
    speakerNotes: `1. Tiêu chí đánh giá: Độ dinh dưỡng của phân đạm được đánh giá bằng % khối lượng của nguyên tố Nitơ (%N).
2. So sánh %N:
- Urê CO(NH₂)₂: M = 60, %N = (28/60) × 100% ≈ 46.67% (~46%).
- NH₄Cl: M = 53.5, %N = (14/53.5) × 100% ≈ 26.17%.
- (NH₄)₂SO₄: M = 132, %N = (28/132) × 100% ≈ 21.21%.
- NaNO₃: M = 85, %N = (14/85) × 100% ≈ 16.47%.
Kết luận: Phân Urê có hàm lượng N cao nhất, tan rất tốt trong nước, giảm đáng kể chi phí vận chuyển.`
  },

  // SLIDE 06: ĐẠM - CÂU 3
  {
    id: 6,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q3',
    sourceQuestion: 'Hiện tượng hóa học nào xảy ra khi bón phân đạm amoni (NH_4^+) vào loại đất chua (đất có tính axit) hoặc đất vôi (CaCO_3)? Giải thích tại sao một số loại phân đạm không nên bón cùng vôi bột.',
    title: 'ĐẠM AMONI VỚI ĐẤT CHUA & ĐẤT VÔI',
    badges: [
      { text: '⚠️ GẶP VÔI: NH₄⁺ + OH⁻ → NH₃↑ + H₂O (Bay hơi mất đạm)', color: '#FF6B7A' },
      { text: '⚠️ ĐẤT CHUA: NH₄⁺ + 2O₂ → NO₃⁻ + 2H⁺ (Càng chua đất)', color: '#FFB547' },
      { text: '🚫 NGUYÊN TẮC: Cách ly bón vôi và đạm ít nhất 15 ngày', color: '#2F80ED' }
    ],
    mascotEmotion: 'shocked',
    mascotSpeech: 'Huhu bón chung với vôi là đạm bốc mùi khai bay mất tiêu! ⚠️',
    speakerNotes: `1. Với đất vôi / bón cùng vôi bột Ca(OH)₂:
Môi trường kiềm OH⁻ làm phản ứng xảy ra:
NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O
Khí amoniac (NH₃) có mùi khai bay hơi vào khí quyển, làm mất sạch lượng đạm vừa bón, gây thất thoát kinh tế nghiêm trọng.
2. Với đất chua:
Amoni bị vi khuẩn nitrat hóa: NH₄⁺ + 2O₂ → NO₃⁻ + H₂O + 2H⁺.
Lượng H⁺ sinh ra làm giảm tiếp pH, đất đã chua càng thêm chua. Do đó đất chua phải bón vôi trước 15-20 ngày để khử chua rồi mới bón đạm.`
  },

  // SLIDE 07: ĐẠM - CÂU 4
  {
    id: 7,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q4',
    sourceQuestion: 'Tại Việt Nam, các nhà máy sản xuất phân đạm lớn (như Đạm Phú Mỹ, Đạm Cà Mau, Đạm Ninh Bình) sử dụng những nguồn nguyên liệu tự nhiên nào (khí thiên nhiên, than đá,...) và có những đóng góp gì cho nền kinh tế nông nghiệp nước nhà?',
    title: 'CÔNG NGHIỆP ĐẠM: KHÍ THIÊN NHIÊN & THAN ĐÁ',
    badges: [
      { text: '🔥 PHÚ MỸ & CÀ MAU: Khí thiên nhiên thềm lục địa Nam Bộ', color: '#36B86A' },
      { text: '⛏️ NINH BÌNH: Khí hóa than cám vùng mỏ Quảng Ninh', color: '#5E6B7D' },
      { text: '🌾 TỰ CHỦ 100% NỘI ĐỊA: Bảo đảm an ninh lương thực quốc gia', color: '#2F80ED' }
    ],
    mascotEmotion: 'engineer',
    mascotSpeech: 'Kỹ sư Phú Mỹ - Cà Mau - Ninh Bình chạy hết công suất! 🏭',
    speakerNotes: `1. Nguồn nguyên liệu tự nhiên:
- Đạm Phú Mỹ (Bà Rịa - Vũng Tàu): Khí thiên nhiên từ bể Nam Côn Sơn.
- Đạm Cà Mau: Khí thiên nhiên từ mỏ PM3-CAA vịnh Thái Lan.
- Đạm Ninh Bình: Than đá (than cám) từ Quảng Ninh qua công nghệ khí hóa than ở nhiệt độ cao.
2. Đóng góp kinh tế:
Tự chủ hoàn toàn nguồn cung phân đạm (>2.6 triệu tấn/năm), không phụ thuộc nhập khẩu, giữ giá phân bón bình ổn, phục vụ hàng triệu hecta lúa gạo và xuất khẩu thu ngoại tệ.`
  },

  // SLIDE 08: ĐẠM - CÂU 5
  {
    id: 8,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q5',
    sourceQuestion: 'Làm thế nào để khắc phục tình trạng đất bị thoái hóa, chua hóa do sử dụng phân đạm hóa học lâu năm? Có những giải pháp thay thế hoặc kết hợp nào hiệu quả?',
    title: 'PHỤC HỒI ĐẤT CHUA: "4 ĐÚNG" & VI SINH HỮU CƠ',
    badges: [
      { text: '⚖️ BÓN VÔI KHỬ CHUA: Đưa pH đất về ngưỡng 6.0 – 6.8', color: '#36B86A' },
      { text: '🌱 HỮU CƠ VI SINH: Bồi đắp tầng mùn & vi sinh vật đất', color: '#2F80ED' },
      { text: '🔄 LUÂN CANH CÂY ĐẬU: Tận dụng nốt sần Rhizobium cố định N', color: '#8C6BFA' }
    ],
    mascotEmotion: 'gardener',
    mascotSpeech: 'Cùng giun nhỏ xới đất mùn vi sinh, nuôi đất khỏe cây mới tốt! 🌿',
    speakerNotes: `Giải pháp phục hồi đất thoái hóa:
1. Bón vôi bột đúng liều lượng dựa trên xét nghiệm đất để trung hòa axit H⁺.
2. Tăng cường phân chuồng ủ hoai mục, phân trùn quế, than sinh học (biochar) để tái tạo kết cấu xốp và nuôi vi sinh vật có lợi.
3. Luân canh với cây họ Đậu (lạc, đậu tương) để cố định nitơ tự nhiên từ không khí vào đất.
4. Chuyển sang phân đạm tan chậm (CRF) bọc polymer, tuân thủ nguyên tắc 4 Đúng (Đúng loại - Đúng liều - Đúng lúc - Đúng cách).`
  },

  // SLIDE 09: LÂN - CÂU 1
  {
    id: 9,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q1',
    sourceQuestion: 'Phân lân cung cấp nguyên tố dinh dưỡng nào cho cây trồng và dưới dạng ion nào? Vai trò cốt lõi của Photpho đối với quá trình phát triển bộ rễ, sự ra hoa, đậu quả và vận chuyển năng lượng (ATP) trong cây là gì?',
    title: 'P — PIN NĂNG LƯỢNG ATP & KÍCH THÍCH BỘ RỄ',
    badges: [
      { text: '⚡ PIN ATP/ADP: Trạm phát năng lượng tế bào sống', color: '#8C6BFA' },
      { text: '🌿 KÍCH BỘ RỄ: Đâm sâu tỏa rộng, chống hạn vững vàng', color: '#36B86A' },
      { text: '🌸 HOA & QUẢ: Phân hóa mầm hoa, tăng tỷ lệ đậu trái', color: '#FFB547' }
    ],
    mascotEmotion: 'energy',
    mascotSpeech: 'Có Lân là rễ tớ đâm sâu tít dưới đất, nạp đầy pin ATP phát quang! ⚡',
    speakerNotes: `1. Nguyên tố & Ion: Phân lân cung cấp Photpho (P) dưới dạng ion H₂PO₄⁻ (đất chua nhẹ) và HPO₄²⁻ (đất trung tính/kiềm).
2. Vai trò cốt lõi:
- Trung tâm chuyển hóa năng lượng ATP (Adenosine Triphosphate): liên kết photphat cao năng giải phóng năng lượng nuôi sống mọi hoạt động tế bào.
- Kích thích phân chia tế bào mô phân sinh rễ, giúp rễ cọc đâm sâu, rễ tơ bung rộng.
- Thúc đẩy phân hóa mầm hoa, tăng sức sống hạt phấn, giúp hạt lúa mẩy, bắp to, trái ngọt chín sớm.`
  },

  // SLIDE 10: LÂN - CÂU 2
  {
    id: 10,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q2',
    sourceQuestion: 'Độ dinh dưỡng của phân lân được đánh giá theo tiêu chuẩn nào? Phân biệt thành phần hóa học và độ tan trong nước giữa Superphotphat đơn và Superphotphat kép. Tại sao Superphotphat kép lại có hàm lượng dinh dưỡng cao hơn?',
    title: 'SUPE LÂN ĐƠN (14–20%) vs KÉP (40–50% P₂O₅)',
    badges: [
      { text: '📦 SUPE ĐƠN: Ca(H₂PO₄)₂ + 50% thạch cao CaSO₄ (rắn đất)', color: '#5E6B7D' },
      { text: '💎 SUPE KÉP: 100% Ca(H₂PO₄)₂ tinh chất (tan hoàn toàn)', color: '#8C6BFA' },
      { text: '🎯 NGUYÊN DO: Kép dùng H₃PO₄ phá quặng, không sinh CaSO₄', color: '#36B86A' }
    ],
    mascotEmotion: 'detective',
    mascotSpeech: 'Thám tử soi kính lúp: Supe Kép lọc bỏ thạch cao xám xịt, xịn gấp đôi! 🔍',
    speakerNotes: `1. Tiêu chuẩn đánh giá: Đánh giá theo % khối lượng P₂O₅ quy đổi.
2. So sánh đơn vs kép:
- Supe đơn: Hỗn hợp Ca(H₂PO₄)₂ + CaSO₄ (thạch cao). CaSO₄ không tan, chiếm 50% khối lượng, làm nén đất. Hàm lượng: 14-20% P₂O₅.
- Supe kép: Chỉ chứa muối tan Ca(H₂PO₄)₂, không có thạch cao. Tan hoàn toàn. Hàm lượng: 40-50% P₂O₅.
3. Vì sao kép cao hơn: Supe kép điều chế bằng H₃PO₄: Ca₃(PO₄)₂ + 4H₃PO₄ → 3Ca(H₂PO₄)₂, không tạo CaSO₄ vô dụng nên mật độ dinh dưỡng tăng vọt gấp 2-3 lần.`
  },

  // SLIDE 11: LÂN - CÂU 3
  {
    id: 11,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q3',
    sourceQuestion: 'Phân lân nung chảy (phân lân gốm/lân canxi magiê) khác phân superphotphat như thế nào về thành phần và tính chất? Tại sao loại phân này không tan trong nước nhưng lại tan được trong axit yếu do rễ cây tiết ra?',
    title: 'LÂN NUNG CHẢY: ĐẶC TRỊ CHO ĐẤT CHUA PHÈN',
    badges: [
      { text: '💧 NƯỚC MƯA: Trơ đáy, không tan, không bị rửa trôi', color: '#2F80ED' },
      { text: '🌱 AXIT RỄ CÂY: Rễ tiết axit yếu hòa tan lân từ từ', color: '#8C6BFA' },
      { text: '⛰️ ĐẶC TÍNH KIỀM: pH 8–8.5, bồi bổ Ca, Mg, Si khử chua', color: '#36B86A' }
    ],
    mascotEmotion: 'scientist',
    mascotSpeech: 'Nước mưa không cuốn trôi được tớ, chỉ giọt axit rễ cây mới đánh thức tớ dậy! 🧪',
    speakerNotes: `1. Thành phần & Tính chất: Lân nung chảy (FMP) là thủy tinh silicat canxi magie photphat vô định hình nung ở 1450°C. Giàu MgO (15-18%), CaO (25-30%), SiO₂ (24-30%), có tính kiềm (pH 8-8.5) giúp khử chua hạ phèn. Superphotphat thì có tính axit.
2. Vì sao tan trong axit rễ: Mạng silicat-photphat không tan trong nước trung tính, nhưng lông hút của rễ cây tiết ra axit hữu cơ yếu (axit citric, malic) cung cấp H⁺ hòa tan lân ngay tại bề mặt rễ.
Rất phù hợp đất đồi dốc mưa nhiều và đất phèn trũng.`
  },

  // SLIDE 12: LÂN - CÂU 4
  {
    id: 12,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q4',
    sourceQuestion: 'Tại sao phân lân thường được dùng để bón lót (bón trước khi gieo trồng) chứ ít khi dùng để bón thúc như phân đạm?',
    title: 'VÌ SAO PHÂN LÂN LUÔN BÓN LÓT ĐẦU VỤ?',
    badges: [
      { text: '🐢 DI CHUYỂN CHẬM: Lân chỉ ngấm 1–3 cm trong cả mùa vụ', color: '#FFB547' },
      { text: '🚀 BỆ PHÓNG RỄ NON: Mầm vừa nhú cần lân ăn ngay lập tức', color: '#8C6BFA' },
      { text: '📍 BÓN ĐÚNG VỊ TRÍ: Trộn sâu dưới đáy rãnh trước khi tra hạt', color: '#36B86A' }
    ],
    mascotEmotion: 'astronaut',
    mascotSpeech: 'Phải lót sẵn dưới đất làm bệ phóng tên lửa cho rễ non cắm sâu nha! 🚀',
    speakerNotes: `1. Tính di động kém: Ion photphat H₂PO₄⁻ di chuyển cực kỳ chậm trong đất do bị hạt keo đất và ion Fe³⁺, Al³⁺, Ca²⁺ hấp phụ cố định chặt. Nếu bón thúc rải mặt đất, lân chỉ nằm ở tầng mặt, rễ sâu không với tới.
2. Nhu cầu cấp thiết của rễ non: Mầm non cần ATP và photpho để phân chia tế bào rễ ngay từ những ngày đầu. Thiếu lân đầu vụ, rễ còi cọc và không bao giờ phục hồi được. Do đó phân lân phải bón lót sâu vào đất trước khi gieo trồng.`
  },

  // SLIDE 13: LÂN - CÂU 5
  {
    id: 13,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q5',
    sourceQuestion: 'Nguyên liệu chính trong tự nhiên để sản xuất phân lân là gì (quặng apatit, phosphorite, Việt Nam có những mỏ quặng apatit lớn nào (ví dụ: Lào Cai) và các nhà máy sản xuất phân lân tiêu biểu nào (Lâm Thao, Văn Điển, Ninh Bình...)? Quá trình khai thác quặng apatit đặt ra những thách thức gì về tài nguyên?',
    title: 'QUẶNG APATIT LÀO CAI & BÀI TOÁN TÀI NGUYÊN',
    badges: [
      { text: '⛏️ MỎ LÀO CAI: Trữ lượng quặng Apatit hàng đầu Đông Nam Á', color: '#8C6BFA' },
      { text: '🏭 3 NHÀ MÁY LỚN: Supe Lâm Thao • Lân Văn Điển • Ninh Bình', color: '#2F80ED' },
      { text: '⚠️ NGUY CƠ: Quặng giàu loại 1 cạn kiệt, xử lý bãi thải xỉ quặng', color: '#FF6B7A' }
    ],
    mascotEmotion: 'miner',
    mascotSpeech: 'Thợ mỏ ôm đá quặng Apatit Lào Cai quý giá, phải khai thác tiết kiệm! ⛏️',
    speakerNotes: `1. Nguyên liệu: Quặng Apatit 3Ca₃(PO₄)₂·CaF₂ và Phosphorit trầm tích.
2. Vị trí & Nhà máy: Mỏ Apatit Lào Cai trải dài hơn 100km dọc sông Hồng (trữ lượng ~2.5 tỷ tấn). Ba nhà máy trụ cột: Supe Phốt phát Lâm Thao (Phú Thọ), Lân Nung chảy Văn Điển (Hà Nội), Lân Nung chảy Ninh Bình.
3. Thách thức: Quặng loại 1 (>28% P₂O₅) đã cạn kiệt, phải tuyển nổi quặng nghèo loại 2, 3 tốn kém; nguy cơ sạt lở, ô nhiễm bùn thải quặng đuôi và bài toán xử lý bãi thải thạch cao phosphogypsum.`
  },

  // SLIDE 14: KALI - CÂU 1
  {
    id: 14,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q1',
    sourceQuestion: 'Phân kali cung cấp nguyên tố dinh dưỡng nào cho cây trồng và tồn tại dưới dạng ion gì? Vai trò cốt lõi của nguyên tố Kali (K) đối với quá trình quang hợp, tổng hợp đường/tinh bột, điều hòa áp suất thẩm thấu và tăng sức đề kháng (chống hạn, chống rét, chống đổ) cho cây là gì?',
    title: 'K — VỆ SĨ ĐỀ KHÁNG & TRẠM BƠM ĐƯỜNG BỘT',
    badges: [
      { text: '🚪 ĐÓNG MỞ KHÍ KHỔNG: Điều tiết thoát hơi nước, chống hạn rét', color: '#FFB547' },
      { text: '🚚 VẬN CHUYỂN ĐƯỜNG BỘT: Đẩy dinh dưỡng về củ to, quả ngọt', color: '#36B86A' },
      { text: '🛡️ TĂNG SỨC CHỐNG CHỊU: Dày thành tế bào, chống đổ ngã', color: '#2F80ED' }
    ],
    mascotEmotion: 'knight',
    mascotSpeech: 'Hiệp sĩ giơ khiên lá K: Thân cây vững chãi, khí khổng điều hòa chống hạn rét! 🛡️',
    speakerNotes: `1. Dạng ion: Cung cấp Kali tồn tại dưới dạng ion K⁺ tự do lưu động trong dịch bào, không tạo mô hữu cơ bền vững.
2. Vai trò cốt lõi:
- Kích hoạt >60 enzyme chuyển hóa và quang hợp.
- Điều hòa đóng mở khí khổng: K⁺ đi vào làm khí khổng mở đón CO₂; khi hạn rét K⁺ rút ra khép lỗ khí giữ nước chống khô héo.
- Đóng vai trò xe tải vận chuyển đường saccarozơ từ lá về củ, hạt, quả giúp phình củ, ngọt quả, mẩy hạt.
- Tăng độ dày thành tế bào và mô cơ lóng thân, chống đổ ngã giông lốc.`
  },

  // SLIDE 15: KALI - CÂU 2
  {
    id: 15,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q2',
    sourceQuestion: 'Độ dinh dưỡng của phân kali được đánh giá dựa trên chỉ tiêu nào (%K_2 O)? Hãy so sánh thành phần hóa học, độ tan và đặc điểm giữa hai loại phân kali phổ biến nhất: Kali clorua (KCl) và Kali sunfat (K_2 SO_4).',
    title: 'KALI CLORUA (60%) vs KALI SUNFAT (50% K₂O)',
    badges: [
      { text: '🧂 KALI CLORUA (KCl): 60% K₂O • Muối đỏ hồng • Rẻ • Có ion Cl⁻', color: '#FFB547' },
      { text: '👑 KALI SUNFAT (K₂SO₄): 50% K₂O • Trắng tinh • Không Clo • Có 18% S', color: '#36B86A' },
      { text: '🎯 ỨNG DỤNG: KCl cho lúa ngô đại trà; K₂SO₄ cho quả đặc sản', color: '#2F80ED' }
    ],
    mascotEmotion: 'scale',
    mascotSpeech: 'Cân tiểu ly so sánh: Muối đỏ KCl bình dân, muối trắng K₂SO₄ quý tộc thêm Lưu huỳnh (S)! ⚖️',
    speakerNotes: `1. Chỉ tiêu đánh giá: Đánh giá bằng % khối lượng K₂O quy đổi.
2. So sánh KCl vs K₂SO₄:
- KCl (MOP): Muối ớt đỏ hồng, chứa ~60% K₂O, tan rất nhanh, giá rẻ, chiếm >90% sản lượng. Chứa Cl⁻ gây mặn đất nếu lạm dụng.
- K₂SO₄ (SOP): Muối trắng tinh khiết, chứa ~50% K₂O, tan tốt, không chứa Clo và cung cấp thêm 18% Lưu huỳnh (S) kích tạo hương thơm và tinh dầu cho cây ăn trái. Giá đắt gấp đôi.`
  },

  // SLIDE 16: KALI - CÂU 3
  {
    id: 16,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q3',
    sourceQuestion: 'Hiện tượng "đói kali" biểu hiện như thế nào trên cây trồng (ví dụ: mép lá cháy vàng, cây dễ đổ)? Tại sao phân Kali clorua (KCl) không nên dùng cho các loại cây nhạy cảm với ion clorua (như thuốc lá, khoai tây, sầu riêng, cà chua chất lượng cao) mà phải dùng Kali sunfat (K₂SO₄)?',
    title: 'NHẬN DIỆN CÂY ĐÓI KALI & CÂY NHẠY CLO',
    badges: [
      { text: '🍂 BỆNH ĐÓI K: Cháy khô từ rìa mép lá già vào trong', color: '#FF6B7A' },
      { text: '🚫 CẤM KCl CHO: Sầu riêng (nhão múi), Khoai tây (sượng bột)', color: '#FFB547' },
      { text: '✅ BẮT BUỘC: Dùng Kali Sunfat (K₂SO₄) cho cây nhạy clo', color: '#36B86A' }
    ],
    mascotEmotion: 'crying',
    mascotSpeech: 'Đói K mép lá cháy khô, sầu riêng mà bón KCl là nhão múi xót xa lắm nè! 😢',
    speakerNotes: `1. Dấu hiệu đói kali: Bắt đầu từ lá già, mép lá và chóp lá bị vàng rồi cháy khô như lửa sém (cháy rìa lá); thân yếu mềm dễ đổ rạp, quả teo nhỏ.
2. Cây nhạy cảm Clo và hậu quả của KCl:
- Sầu riêng: Cl⁻ làm cháy múi, cơm nhão nước, mất vị béo bùi.
- Khoai tây: Cl⁻ cản trở tích lũy tinh bột làm củ nhão sượng.
- Thuốc lá: Cl⁻ làm lá dày bí nước, cháy khét đen tàn, mất mùi thơm.
- Cà chua: Cl⁻ làm giảm lượng đường tự nhiên.
Bắt buộc phải dùng K₂SO₄ để bảo vệ chất lượng nông sản cao cấp!`
  },

  // SLIDE 17: KALI - CÂU 4
  {
    id: 17,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q4',
    sourceQuestion: 'Tại sao phân kali thường được khuyến cáo sử dụng để bón thúc (đặc biệt vào giai đoạn cây chuẩn bị ra hoa, tạo hạt, phình củ, nuôi quả) thay vì bón lót toàn bộ từ đầu?',
    title: 'THỜI ĐIỂM VÀNG CHO BÓN THÚC KALI',
    badges: [
      { text: '🌱 CÂY NON: Nhu cầu kali thấp, chỉ cần lót nhẹ', color: '#5E6B7D' },
      { text: '📈 ĐỈNH CAO TRÀO: Đơm hoa — Tạo hạt — Phình củ — Nuôi quả', color: '#FFB547' },
      { text: '💧 TRÁNH RỬA TRÔI: Kali tan nhanh, bón lót sớm dễ trôi mất', color: '#36B86A' }
    ],
    mascotEmotion: 'harvest',
    mascotSpeech: 'Đúng lúc ra hoa tạo quả bón thúc Kali là giỏ hoa quả trĩu cành bội thu! 🍇🍊',
    speakerNotes: `1. Đường cong nhu cầu sinh lý: Cây con sinh khối nhỏ cần ít kali. Đến khi phân hóa mầm hoa, tạo hạt, phình củ, nhu cầu kali tăng vọt lên đỉnh parabol để dồn đường bột về quả/củ.
2. Tránh rửa trôi: Phân kali tan rất nhanh trong nước. Nếu lót 100% từ đầu, mưa lớn sẽ rửa trôi ion K⁺ xuống sâu gây lãng phí lớn.
Do đó phải chia lần bón và tập trung 60-70% bón thúc nuôi hoa, đón đòng và nuôi trái.`
  },

  // SLIDE 18: KALI - CÂU 5
  {
    id: 18,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q5',
    sourceQuestion: 'Việc lạm dụng phân kali chứa gốc clorua (KCl) lâu dài có thể làm gia tăng độ mặn của đất, ảnh hưởng ra sao đến hệ sinh thái vi sinh vật đất và cấu trúc đất (làm đất chai cứng, bí khí)?',
    title: 'HỆ LỤY LẠM DỤNG KCL: ĐẤT CHAI CỨNG & BÍ KHÍ',
    badges: [
      { text: '⚠️ ĐỘ MẶN VỌT CAO: Tăng EC, hút ngược nước khỏi rễ cây', color: '#FF6B7A' },
      { text: '🪨 KẾT CẤU CHAI CỨNG: Mất độ tơi xốp, nén chặt bí khí ngạt rễ', color: '#FFB547' },
      { text: '🦠 HẠI VI SINH VẬT: Mất cân bằng hệ sinh thái đất màu mỡ', color: '#5E6B7D' }
    ],
    mascotEmotion: 'soil_doctor',
    mascotSpeech: 'Bác sĩ cấp cứu: Lạm dụng KCl đất mặn nén cứng ngạt thở, mau giải cứu rễ cây! 🩺',
    speakerNotes: `Hệ lụy lạm dụng phân KCl:
1. Gây mặn đất (hạn sinh lý): Ion Cl⁻ tích lũy làm chỉ số EC tăng vọt, áp suất thẩm thấu đất cao hơn rễ làm nước bị hút ngược ra ngoài, rễ teo tóp cháy khô lông hút.
2. Phá vỡ kết cấu đất: Rửa trôi Ca²⁺, Mg²⁺ làm mất cầu nối liên kết keo đất, đất bị nén chặt như bê tông, mất khe hở chứa oxy gây bí khí ngạt rễ.
3. Tiêu diệt vi sinh vật hảo khí có lợi trong đất.
Khắc phục: Dùng luân phiên K₂SO₄, kiểm tra EC đất và bón nhiều phân hữu cơ.`
  },

  // SLIDE 19: MINI GAME BÓC TÚI MÙ
  {
    id: 19,
    type: 'game',
    chapter: CHAPTERS.GAME,
    title: 'MINI GAME: BÓC TÚI MÙ HÓA HỌC NPK',
    badges: [
      { text: '🎁 4 TÚI MÙ KỲ BÍ', color: '#EC4899' },
      { text: '⭐ THỬ TÀI NHANH TRÍ', color: '#8B5CF6' },
      { text: '🏆 QUÀ TẶNG LINH THÚ', color: '#F59E0B' }
    ],
    speakerNotes: `Hướng dẫn tổ chức Mini Game "Bóc Túi Mù Hóa Học NPK":
1. Giới thiệu hào hứng: "Sau khi đã cùng nhau khám phá trọn vẹn cả 3 chương Đạm - Lân - Kali, nhóm xin mời thầy cô và các bạn tham gia vào phần được mong chờ nhất hôm nay: BÓC TÚI MÙ HÓA HỌC NPK!"
2. Luật chơi:
- Trên màn hình có 4 túi mù may mắn tương ứng 4 chủ đề then chốt: Đạm diệp lục, Lân năng lượng, Kali cường lực và Bí kíp nhà nông.
- Mỗi bạn giơ tay xung phong sẽ được chọn 1 túi mù yêu thích để "xé túi".
- Sau khi xé túi, câu hỏi bí mật sẽ xuất hiện. Trả lời chính xác sẽ nhận ngay 1 tượng Linh Thú độc quyền và phần quà hấp dẫn từ ban tổ chức!
3. Khuyến khích: Mời bạn trả lời kèm giải thích ngắn gọn dựa trên kiến thức vừa được tìm hiểu.`
  },

  // SLIDE 20: TỔNG KẾT
  {
    id: 20,
    type: 'closing',
    chapter: CHAPTERS.CLOSING,
    eyebrow: 'BỘ BA HỘI TỤ — NÔNG NGHIỆP BỀN VỮNG',
    title: 'NPK CÂN ĐỐI — VÌ MỘ MÙA XANH BỀN VỮNG',
    subtitle: 'Đúng Loại • Đúng Liều • Đúng Lúc • Đúng Cách',
    speakerNotes: 'Bộ ba N - P - K như chiếc kiềng ba chân: Đạm cho lá tốt chồi xanh, Lân cho rễ khỏe năng lượng bền, Kali cho quả ngọt củ to chống chịu tốt. Sử dụng cân đối, khoa học kết hợp hữu cơ vi sinh chính là chìa khóa vàng cho nền nông nghiệp thịnh vượng bền lâu. Nhóm xin chân thành cảm ơn thầy cô và các bạn đã chú ý lắng nghe!'
  }
];
