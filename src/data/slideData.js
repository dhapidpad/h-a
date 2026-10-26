// Dữ liệu trình chiếu 20 Slide — Chuẩn hóa theo MASTER SPEC & NHÓM TÀI.txt
// Quy tắc: "Ngắn trên màn hình, đầy đủ trong speakerNotes", phân biệt rõ Đạm Ninh Bình và Phân lân Ninh Bình (NIFERCO).

export const CHAPTERS = {
  INTRO: { id: 'INTRO', name: 'MỞ ĐẦU', color: '#174B37', softColor: '#F7F5EC' },
  DAM: { id: 'DAM', name: 'PHÂN ĐẠM (N)', color: '#16A36A', softColor: '#ECFDF5', mascot: 'SPROUTY_N' },
  LAN: { id: 'LAN', name: 'PHÂN LÂN (P)', color: '#7862E8', softColor: '#F5F3FF', mascot: 'SPARKY_P' },
  KALI: { id: 'KALI', name: 'PHÂN KALI (K)', color: '#E8A13A', softColor: '#FFFAEB', mascot: 'SUNNY_K' },
  GAME: { id: 'GAME', name: 'MINI GAME', color: '#174B37', softColor: '#ECFDF5' },
  CLOSING: { id: 'CLOSING', name: 'TỔNG KẾT', color: '#174B37', softColor: '#F7F5EC' }
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
    role: 'Thư ký / Biên tập viên',
    badge: 'Thư ký',
    tasks: ['Tổng hợp toàn bộ nội dung', 'Rà soát tiến độ']
  },
  {
    id: '03',
    name: 'Lê Thị Ngọc Ánh',
    role: 'Nội dung & tài liệu',
    badge: 'Nội dung',
    tasks: ['Biên soạn nội dung hoàn chỉnh từ nguồn tài liệu']
  },
  {
    id: '04',
    name: 'Phạm Vũ Thanh Phúc',
    role: 'Nội dung & phân tích',
    badge: 'Phân tích',
    tasks: ['Tóm tắt nội dung', 'Phân tích dữ liệu']
  },
  {
    id: '05',
    name: 'Nguyễn Mạnh Trường',
    role: 'Chắt lọc và viết báo cáo',
    badge: 'Chắt lọc',
    tasks: ['Chắt lọc dữ liệu và biên tập báo cáo']
  },
  {
    id: '06',
    name: 'Nguyễn Quốc Việt',
    role: 'Tra cứu tài liệu, sách báo, dữ liệu',
    badge: 'Tra cứu',
    tasks: ['Tra cứu tài liệu, sách báo và bảng số liệu']
  },
  {
    id: '07',
    name: 'Vũ Anh Tài',
    role: 'Thiết kế slide & video',
    badge: 'Slide & Video',
    tasks: ['Thiết kế bố cục slide', 'Biên tập và dựng video intro']
  },
  {
    id: '08',
    name: 'Lương Việt Anh',
    role: 'Trực quan hóa / mỹ thuật',
    badge: 'Mỹ thuật',
    tasks: ['Định hướng phong cách hình ảnh và minh họa SVG']
  },
  {
    id: '09',
    name: 'Nguyễn Hữu Khánh',
    role: 'Phản biện và kiểm duyệt lỗi',
    badge: 'Kiểm duyệt',
    tasks: ['Rà soát khoa học, nhận diện và hiệu đính lỗi']
  }
];

export const SLIDES = [
  // SLIDE 01: BÌA CHỦ ĐỀ
  {
    id: 1,
    type: 'topic',
    chapter: CHAPTERS.INTRO,
    eyebrow: 'HÓA HỌC ỨNG DỤNG NÔNG NGHIỆP',
    title: 'NPK — BỘ BA NUÔI DƯỠNG MÙA XANH',
    subtitle: 'Hóa học dinh dưỡng cho nền nông nghiệp bền vững',
    speakerNotes:
      'Kính chào thầy cô và các bạn! Hôm nay nhóm chúng em xin trình bày chuyên đề "NPK — Bộ ba nuôi dưỡng mùa xanh". Bài trình bày sẽ giải thích vai trò sinh học và hóa học của ba nguyên tố đa lượng Đạm (N), Lân (P), Kali (K); so sánh các loại phân bón phổ biến; tìm hiểu hệ thống nhà máy sản xuất cùng nguồn nguyên liệu tại Việt Nam; và nguyên tắc sử dụng phân bón hiệu quả, có trách nhiệm với đất và môi trường.'
  },

  // SLIDE 02: VIDEO INTRO
  {
    id: 2,
    type: 'video_intro',
    chapter: CHAPTERS.INTRO,
    eyebrow: 'VIDEO GIỚI THIỆU • TỐC ĐỘ 1× (~52S)',
    title: 'HÀNH TRÌNH CỦA HẠT MẦM',
    subtitle: 'N nuôi thân lá · P hỗ trợ bộ rễ · K điều hòa nước và vận chuyển đường',
    speakerNotes:
      'Video giới thiệu dài khoảng 52 giây (phát ở tốc độ chuẩn 1×) mô phỏng quá trình cây trồng tiếp nhận dinh dưỡng để phát triển. Nitơ (N) hỗ trợ sinh trưởng thân lá, Photpho (P) tham gia chuyển hóa năng lượng ATP và phát triển bộ rễ, còn Kali (K) giúp điều hòa nước và vận chuyển sản phẩm quang hợp. Ba nguyên tố này không hoạt động tách rời mà cần được phối hợp cân đối cùng các dưỡng chất khác.'
  },

  // SLIDE 03: GIỚI THIỆU 9 THÀNH VIÊN
  {
    id: 3,
    type: 'members',
    chapter: CHAPTERS.INTRO,
    eyebrow: 'ĐỘI NGŨ THỰC HIỆN BÁO CÁO',
    title: 'GIỚI THIỆU 9 THÀNH VIÊN NHÓM',
    subtitle: 'Phối hợp tra cứu, biên tập, trực quan hóa, thiết kế và kiểm duyệt nội dung',
    speakerNotes:
      'Nhóm có 9 thành viên, cùng thực hiện tra cứu tài liệu, biên tập học thuật, trực quan hóa sơ đồ, thiết kế slide, dựng video và phản biện kiểm duyệt nội dung cho 15 câu hỏi trọng tâm.'
  },

  // SLIDE 04: ĐẠM - CÂU 1
  {
    id: 4,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q1',
    sourceQuestion:
      'Câu hỏi 1 (Đạm): Phân đạm là gì? Vai trò quyết định của nguyên tố Nitơ (N) đối với sự sinh trưởng và phát triển của cây trồng là gì?',
    title: 'N — VẬT LIỆU CHO MÀU XANH VÀ SINH KHỐI',
    badges: [
      { text: 'Cung cấp N khoáng: cây hấp thụ chủ yếu NH₄⁺ và NO₃⁻', color: '#16A36A' },
      { text: 'Tham gia cấu tạo amino acid/protein, axit nucleic và diệp lục', color: '#174B37' },
      { text: 'Thiếu N thường làm lá già vàng, cây chậm lớn', color: '#C94F52' }
    ],
    mascotEmotion: 'teacher',
    mascotSpeech: 'Rễ hấp thụ NH₄⁺ và NO₃⁻ để tổng hợp protein và diệp lục nuôi cây! 🌱',
    speakerNotes:
      'Phân đạm là loại phân cung cấp nitơ cho cây, thường qua các dạng khoáng như ion amoni (NH₄⁺) và nitrat (NO₃⁻). Nitơ tham gia tạo amino acid và protein, axit nucleic, enzyme và diệp lục; nhờ vậy cây tạo mô mới và phát triển thân lá. Thiếu N thường biểu hiện vàng trước ở lá già và sinh trưởng chậm; ngược lại, thừa N có thể làm cây phát triển thân lá quá mạnh, mô mềm, chậm chín hoặc tăng nguy cơ đổ ngã và sâu bệnh tùy loại cây và điều kiện. Lưu ý màu lá không đủ để chẩn đoán duy nhất vì ngập úng, pH hay bệnh hại cũng có thể gây vàng lá.'
  },

  // SLIDE 05: ĐẠM - CÂU 2
  {
    id: 5,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q2',
    sourceQuestion:
      'Câu hỏi 2 (Đạm): Dựa vào đâu để đánh giá chất lượng (độ dinh dưỡng) của phân đạm? Hãy so sánh hàm lượng phần trăm về khối lượng của Nitơ (%N) trong các loại phân phổ biến: Ure CO(NH2)2, Amoni clorua NH4Cl, Amoni sunfat (NH4)2SO4 và Natri nitrat NaNO3. Loại nào có hàm lượng cao nhất?',
    title: 'ĐỌC %N: URÊ CÓ HÀM LƯỢNG LÝ THUYẾT CAO NHẤT',
    badges: [
      { text: 'Urê CO(NH₂)₂: ≈ 46,7% N (cao nhất theo công thức)', color: '#16A36A' },
      { text: 'NH₄Cl: ≈ 26,2% N · (NH₄)₂SO₄: ≈ 21,2% N', color: '#174B37' },
      { text: 'NaNO₃: ≈ 16,5% N · Thương mại đọc theo nhãn sản phẩm', color: '#52645A' }
    ],
    mascotEmotion: 'champion',
    mascotSpeech: 'Tính từ khối lượng mol, Urê đạt khoảng 46,7% N — cao nhất trong 4 loại! 📊',
    speakerNotes:
      'Độ dinh dưỡng của phân đạm được đánh giá theo phần trăm khối lượng nitơ (%N). Từ khối lượng mol gần đúng của hợp chất tinh khiết:\n- Urê CO(NH₂)₂: M ≈ 60 g/mol, có 28 g N → (28/60) × 100% ≈ 46,7% N.\n- Amoni clorua NH₄Cl: M ≈ 53,5 g/mol, có 14 g N → ≈ 26,2% N.\n- Amoni sunfat (NH₄)₂SO₄: M ≈ 132 g/mol, có 28 g N → ≈ 21,2% N.\n- Natri nitrat NaNO₃: M ≈ 85 g/mol, có 14 g N → ≈ 16,5% N.\nKết luận: theo tính toán công thức, urê có %N cao nhất. Phân bón thương mại trên thị trường thường công bố hàm lượng theo tiêu chuẩn/độ tinh khiết (ví dụ urê thương mại khoảng 46% N); khi sử dụng cần đọc kỹ nhãn sản phẩm.'
  },

  // SLIDE 06: ĐẠM - CÂU 3
  {
    id: 6,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q3',
    sourceQuestion:
      'Câu hỏi 3 (Đạm): Hiện tượng hóa học nào xảy ra khi bón phân đạm amoni (NH_4^+) vào loại đất chua (đất có tính axit) hoặc đất vôi (CaCO_3)? Giải thích tại sao một số loại phân đạm không nên bón cùng vôi bột.',
    title: 'ĐẠM AMONI + VẬT LIỆU KIỀM: CÓ THỂ MẤT N DẠNG NH₃',
    badges: [
      { text: 'Bón cùng vôi/kiềm: NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O (bay hơi NH₃)', color: '#C94F52' },
      { text: 'Nitrat hóa: NH₄⁺ + 2O₂ → NO₃⁻ + 2H⁺ + H₂O (tạo H⁺ gây chua)', color: '#E8A13A' },
      { text: 'Nguyên tắc: Không trộn/bón đồng thời đạm amoni với vôi', color: '#16A36A' }
    ],
    mascotEmotion: 'shocked',
    mascotSpeech: 'Không trộn chung đạm amoni với vôi để tránh thất thoát khí NH₃ nhé! ⚠️',
    speakerNotes:
      'Trong điều kiện kiềm, ion amoni chuyển dịch cân bằng sang khí amoniac: NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O, làm thất thoát nitơ dạng khí NH₃ bay hơi. Vì vậy không trộn hoặc bón đồng thời phân đạm chứa NH₄⁺ (hoặc urê thủy phân tạo NH₄⁺) với vôi bột hay vật liệu kiềm mạnh; cần bón cách thời điểm theo kết quả phân tích pH đất, loại vật liệu và hướng dẫn canh tác địa phương. Trong đất, quá trình nitrat hóa do vi sinh vật: NH₄⁺ + 2O₂ → NO₃⁻ + 2H⁺ + H₂O giải phóng ion H⁺, nên sử dụng lặp lại nguồn N có tính acid hóa có thể làm pH đất giảm thêm. Lưu ý CaCO₃ và Ca(OH)₂ có mức độ kiềm và tốc độ phản ứng khác nhau.'
  },

  // SLIDE 07: ĐẠM - CÂU 4
  {
    id: 7,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q4',
    sourceQuestion:
      'Câu hỏi 4 (Đạm): Tại Việt Nam, các nhà máy sản xuất phân đạm lớn (như Đạm Phú Mỹ, Đạm Cà Mau, Đạm Ninh Bình) sử dụng những nguồn nguyên liệu tự nhiên nào (khí thiên nhiên, than đá,...) và có những đóng góp gì cho nền kinh tế nông nghiệp nước nhà?',
    title: 'BA NHÀ MÁY — HAI NHÓM NGUYÊN LIỆU CHÍNH',
    badges: [
      { text: 'Đạm Phú Mỹ & Đạm Cà Mau: Khí thiên nhiên → NH₃ → urê', color: '#16A36A' },
      { text: 'Đạm Ninh Bình: Than cám → khí hóa than → NH₃ → urê', color: '#174B37' },
      { text: 'Góp phần chủ động nguồn cung trong nước, hỗ trợ nông nghiệp', color: '#E8A13A' }
    ],
    mascotEmotion: 'engineer',
    mascotSpeech: 'Đạm Phú Mỹ & Cà Mau dùng khí thiên nhiên; Đạm Ninh Bình khí hóa than cám! 🏭',
    speakerNotes:
      'Ba nhà máy phân đạm lớn trong đề bài đại diện cho hai nhóm nguyên liệu tự nhiên chính:\n1. Nhóm đi từ khí thiên nhiên: Nhà máy Đạm Phú Mỹ (Bà Rịa – Vũng Tàu) sử dụng khí thiên nhiên hệ thống phía Nam để tổng hợp NH₃ và urê; Nhà máy Đạm Cà Mau sử dụng nguồn khí thiên nhiên từ lô PM3-CAA và mỏ Cái Nước qua hệ thống khí PM3–Cà Mau.\n2. Nhóm đi từ than: Nhà máy Đạm Ninh Bình sử dụng công nghệ khí hóa than cám tạo khí tổng hợp, sau tinh chế dùng để tổng hợp NH₃ rồi sản xuất urê (cần phân biệt rõ với Công ty Cổ phần Phân lân Ninh Bình/NIFERCO sản xuất phân lân).\nĐóng góp kinh tế: các nhà máy góp phần chủ động nguồn cung phân đạm nội địa, giảm một phần phụ thuộc nhập khẩu, hỗ trợ chuỗi cung ứng vật tư nông nghiệp và tạo việc làm địa phương.'
  },

  // SLIDE 08: ĐẠM - CÂU 5
  {
    id: 8,
    type: 'question',
    chapter: CHAPTERS.DAM,
    questionId: 'DAM_Q5',
    sourceQuestion:
      'Câu hỏi 5 (Đạm): Làm thế nào để khắc phục tình trạng đất bị thoái hóa, chua hóa do sử dụng phân đạm hóa học lâu năm? Có những giải pháp thay thế hoặc kết hợp nào hiệu quả?',
    title: 'BẢO VỆ ĐẤT: GIẢM CHUA, TĂNG HỮU CƠ, BÓN THEO NHU CẦU',
    badges: [
      { text: 'Đo pH/kiểm tra đất → bón vôi đúng nhu cầu', color: '#16A36A' },
      { text: 'Bổ sung hữu cơ hoai mục, trả phụ phẩm an toàn', color: '#174B37' },
      { text: 'Chia lần bón, bón đúng loại/liều/lúc/cách; cân đối N–P–K', color: '#E8A13A' }
    ],
    mascotEmotion: 'gardener',
    mascotSpeech: 'Kiểm tra pH đất, bổ sung hữu cơ hoai mục và bón cân đối 4 Đúng nhé! 🌿',
    speakerNotes:
      'Đất chua hóa và thoái hóa có nhiều nguyên nhân, trong đó quá trình nitrat hóa và việc lạm dụng một số phân đạm có tính acid hóa lâu năm có thể góp phần làm giảm pH. Giải pháp khắc phục và kết hợp:\n1. Kiểm tra pH và dinh dưỡng đất, bón vôi hoặc vật liệu cải tạo độ chua theo đúng nhu cầu thay vì áp một mức cố định.\n2. Bổ sung phân hữu cơ đã ủ hoai mục, quản lý phụ phẩm cây trồng và che phủ đất để cải thiện chất hữu cơ, độ đệm và hoạt động vi sinh.\n3. Chia lần bón theo giai đoạn sinh trưởng, tránh bón trước mưa lớn, áp dụng nguyên tắc 4 Đúng (đúng loại, đúng liều, đúng lúc, đúng cách) và cân đối N–P–K; có thể kết hợp phân chậm tan khi phù hợp.\n4. Luân canh hoặc xen canh cây họ Đậu giúp bổ sung nguồn nitơ sinh học nhờ vi khuẩn nốt sần trong điều kiện canh tác phù hợp.'
  },

  // SLIDE 09: LÂN - CÂU 1
  {
    id: 9,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q1',
    sourceQuestion:
      'Câu hỏi 1 (Lân): Phân lân cung cấp nguyên tố dinh dưỡng nào cho cây trồng và dưới dạng ion nào? Vai trò cốt lõi của Photpho đối với quá trình phát triển bộ rễ, sự ra hoa, đậu quả và vận chuyển năng lượng (ATP) trong cây là gì?',
    title: 'P — NĂNG LƯỢNG ATP VÀ GIAI ĐOẠN HÌNH THÀNH RỄ',
    badges: [
      { text: 'Cây hấp thụ P chủ yếu dạng H₂PO₄⁻ / HPO₄²⁻', color: '#7862E8' },
      { text: 'P tham gia ATP, axit nucleic và màng tế bào', color: '#174B37' },
      { text: 'Hỗ trợ phát triển rễ và sinh trưởng sinh sản khi cân đối', color: '#16A36A' }
    ],
    mascotEmotion: 'energy',
    mascotSpeech: 'Photpho được rễ hấp thụ dạng H₂PO₄⁻, HPO₄²⁻ để tạo ATP và phát triển bộ rễ! ⚡',
    speakerNotes:
      'Phân lân cung cấp nguyên tố photpho (P). Trong dung dịch đất, cây hấp thụ photpho chủ yếu dưới dạng các ion photphat vô cơ là H₂PO₄⁻ và HPO₄²⁻, với tỷ lệ tương đối phụ thuộc vào độ pH của đất. Về vai trò sinh học, P là thành phần của hệ thống truyền năng lượng ATP/ADP, axit nucleic (ADN, ARN) và màng tế bào phospholipid. Đủ P giúp cây phát triển bộ rễ khỏe ngay từ giai đoạn cây con và hỗ trợ các quá trình sinh trưởng sinh sản như phân hóa mầm hoa, tạo hạt và quả khi dinh dưỡng được cân đối.'
  },

  // SLIDE 10: LÂN - CÂU 2
  {
    id: 10,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q2',
    sourceQuestion:
      'Câu hỏi 2 (Lân): Độ dinh dưỡng của phân lân được đánh giá theo tiêu chuẩn nào? Phân biệt thành phần hóa học và độ tan trong nước giữa Superphotphat đơn và Superphotphat kép. Tại sao Superphotphat kép lại có hàm lượng dinh dưỡng cao hơn?',
    title: 'SUPE LÂN ĐƠN vs SUPE LÂN KÉP: KHÁC Ở ĐỘ ĐẬM ĐẶC P₂O₅',
    badges: [
      { text: 'Đánh giá theo %P₂O₅ hữu hiệu quy đổi công bố trên nhãn', color: '#7862E8' },
      { text: 'Supe đơn: Ca(H₂PO₄)₂ + thạch cao CaSO₄ (khoảng 16–20% P₂O₅)', color: '#52645A' },
      { text: 'Supe kép: chủ yếu Ca(H₂PO₄)₂, đậm đặc hơn (khoảng 37–47% P₂O₅)', color: '#16A36A' }
    ],
    mascotEmotion: 'detective',
    mascotSpeech: 'Supe kép ít/không lẫn thạch cao CaSO₄ nên %P₂O₅ hữu hiệu cao hơn hẳn! 🔍',
    speakerNotes:
      'Độ dinh dưỡng của phân lân được đánh giá theo phần trăm khối lượng P₂O₅ hữu hiệu quy đổi ghi trên nhãn sản phẩm (đây là quy ước thương mại, không có nghĩa phân chứa phân tử P₂O₅ tự do).\n- Supe lân đơn (SSP): sản xuất bằng cách cho quặng photphat tác dụng với axit sulfuric, thành phần chính gồm monocalcium phosphate Ca(H₂PO₄)₂ dễ tan trong nước đi kèm thạch cao (CaSO₄). Hàm lượng P₂O₅ hữu hiệu thường gặp khoảng 16–20%, đồng thời cung cấp thêm canxi và lưu huỳnh.\n- Supe lân kép (TSP): thường sản xuất bằng cách xử lý quặng với axit phosphoric (H₃PO₄), nên thành phần chính chủ yếu là Ca(H₂PO₄)₂ có phần lân dễ tiêu tan tốt trong nước và ít/không lẫn thạch cao như supe đơn. Nhờ giảm phần CaSO₄ đi kèm, hàm lượng P₂O₅ hữu hiệu của supe kép đạt cao hơn, thường khoảng 37–47% tùy tiêu chuẩn sản phẩm.'
  },

  // SLIDE 11: LÂN - CÂU 3
  {
    id: 11,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q3',
    sourceQuestion:
      'Câu hỏi 3 (Lân): Phân lân nung chảy (phân lân gốm/lân canxi magiê) khác phân superphotphat như thế nào về thành phần và tính chất? Tại sao loại phân này không tan trong nước nhưng lại tan được trong axit yếu do rễ cây tiết ra?',
    title: 'LÂN NUNG CHẢY: KHÁC CƠ CHẾ HÒA TAN VỚI SUPE LÂN',
    badges: [
      { text: 'Supe lân: có phần lân tan trong nước, phản ứng thường có tính chua', color: '#7862E8' },
      { text: 'Lân nung chảy: dạng thủy tinh silicat–photphat, bổ sung Ca, Mg, Si', color: '#16A36A' },
      { text: 'Không/ít tan trong nước; hòa tan trong môi trường acid yếu', color: '#E8A13A' }
    ],
    mascotEmotion: 'scientist',
    mascotSpeech: 'Lân nung chảy ít tan trong nước nhưng hòa tan trong môi trường acid yếu vùng rễ! 🧪',
    speakerNotes:
      'Phân lân nung chảy (FMP) được sản xuất bằng cách nung chảy quặng apatit với đá chứa magie/silic (như xà vân/serpentine) ở nhiệt độ cao rồi làm lạnh đột ngột bằng nước để tạo cấu trúc thủy tinh silicat – canxi – magie photphat. Khác với supe lân được chế biến bằng axit để tạo muối lân tan trong nước, lân nung chảy có tính kiềm, thường không tan hoặc rất ít tan trong nước thuần túy nhưng phần P₂O₅ hữu hiệu có thể hòa tan trong môi trường axit yếu (như axit hữu cơ do rễ cây và vi sinh vật tiết ra, hoặc dung dịch axit citric 2% dùng trong kiểm nghiệm chất lượng). Ngoài P, sản phẩm còn cung cấp Ca, Mg, Si nên thường phù hợp với một số chân đất chua hoặc đất thiếu kiềm.'
  },

  // SLIDE 12: LÂN - CÂU 4
  {
    id: 12,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q4',
    sourceQuestion:
      'Câu hỏi 4 (Lân): Tại sao phân lân thường được dùng để bón lót (bón trước khi gieo trồng) chứ ít khi dùng để bón thúc như phân đạm?',
    title: 'LÂN THƯỜNG ĐƯỢC BÓN SỚM VÌ ÍT DI ĐỘNG TRONG ĐẤT',
    badges: [
      { text: 'P dễ bị giữ/hấp phụ hoặc kết tủa trong nhiều loại đất', color: '#E8A13A' },
      { text: 'Rễ non cần P sớm để phát triển và chuyển hóa năng lượng', color: '#7862E8' },
      { text: 'Đặt phân gần vùng rễ ngay đầu vụ theo đúng khuyến cáo', color: '#16A36A' }
    ],
    mascotEmotion: 'astronaut',
    mascotSpeech: 'Ion photphat ít di động trong đất nên cần bón lót gần vùng rễ non từ sớm! 🌱',
    speakerNotes:
      'Phân lân thường được ưu tiên bón lót vì hai lý do chính:\n1. Độ di động thấp trong đất: các ion photphat dễ bị keo đất hấp phụ hoặc phản ứng kết tủa với sắt (Fe), nhôm (Al) trong đất chua và canxi (Ca) trong đất giàu vôi, nên phạm vi khuếch tán trong đất rất hạn chế so với nitrat của phân đạm.\n2. Nhu cầu sớm của cây: cây con ngay từ giai đoạn nảy mầm và ra rễ non đã cần P để phân chia tế bào và tạo năng lượng ATP. Bón lót và đặt phân ở tầng đất gần vùng rễ giúp rễ non tiếp cận nguồn P kịp thời. Tuy nhiên, tùy loại cây lâu năm, loại phân dễ tan hay hệ thống tưới phân, người trồng vẫn có thể bổ sung lân ở các giai đoạn tiếp theo theo quy trình kỹ thuật.'
  },

  // SLIDE 13: LÂN - CÂU 5
  {
    id: 13,
    type: 'question',
    chapter: CHAPTERS.LAN,
    questionId: 'LAN_Q5',
    sourceQuestion:
      'Câu hỏi 5 (Lân): Nguyên liệu chính trong tự nhiên để sản xuất phân lân là gì (quặng apatit, phosphorite, Việt Nam có những mỏ quặng apatit lớn nào (ví dụ: Lào Cai) và các nhà máy sản xuất phân lân tiêu biểu nào (Lâm Thao, Văn Điển, Ninh Bình...)? Quá trình khai thác quặng apatit đặt ra những thách thức gì về tài nguyên?',
    title: 'TỪ QUẶNG APATIT ĐẾN PHÂN LÂN — TÀI NGUYÊN CẦN SỬ DỤNG HIỆU QUẢ',
    badges: [
      { text: 'Nguyên liệu tự nhiên: quặng apatit, phosphorit · Mỏ tiêu biểu: Lào Cai', color: '#7862E8' },
      { text: 'Nhà máy: Supe Lâm Thao · Lân nung chảy Văn Điển · Phân lân Ninh Bình (NIFERCO)', color: '#16A36A' },
      { text: 'Thách thức: chất lượng quặng, tuyển quặng, bãi thải, nước/bụi & phục hồi môi trường', color: '#C94F52' }
    ],
    mascotEmotion: 'miner',
    mascotSpeech: 'Mỏ apatit Lào Cai cung cấp quặng cho Lâm Thao, Văn Điển và Phân lân Ninh Bình (NIFERCO)! ⛏️',
    speakerNotes:
      '1. Nguyên liệu và mỏ: Nguyên liệu tự nhiên chính để sản xuất phân lân là quặng apatit và quặng phosphorit. Tại Việt Nam, vùng mỏ apatit Lào Cai là nguồn nguyên liệu photphat quan trọng nhất.\n2. Các nhà máy sản xuất phân lân tiêu biểu:\n- Công ty CP Supe Phốt phát và Hóa chất Lâm Thao (Phú Thọ): sản xuất supe lân và NPK.\n- Công ty CP Phân lân nung chảy Văn Điển (Hà Nội): sản xuất phân lân nung chảy và NPK.\n- Công ty Cổ phần Phân lân Ninh Bình (NIFERCO, tại Ninh Bình): sản xuất phân lân nung chảy và NPK. Cần phân biệt rõ đơn vị này với Nhà máy Đạm Ninh Bình (sản xuất urê từ than).\n3. Thách thức tài nguyên và môi trường: Quặng apatit là tài nguyên không tái tạo; hàm lượng quặng giàu giảm dần đòi hỏi công nghệ tuyển quặng và tiêu tốn năng lượng; quá trình khai thác và chế biến đặt ra yêu cầu quản lý đất đai, bụi, nước thải, bùn thải đuôi quặng, bã thạch cao (phosphogypsum) và phục hồi môi trường sau khai thác.'
  },

  // SLIDE 14: KALI - CÂU 1
  {
    id: 14,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q1',
    sourceQuestion:
      'Câu hỏi 1 (Kali): Phân kali cung cấp nguyên tố dinh dưỡng nào cho cây trồng và tồn tại dưới dạng ion gì? Vai trò cốt lõi của nguyên tố Kali (K) đối với quá trình quang hợp, tổng hợp đường/tinh bột, điều hòa áp suất thẩm thấu và tăng sức đề kháng (chống hạn, chống rét, chống đổ) cho cây là gì?',
    title: 'K — ĐIỀU HÒA NƯỚC, HOẠT HÓA ENZYME, VẬN CHUYỂN ĐƯỜNG',
    badges: [
      { text: 'Kali được cây hấp thụ chủ yếu dưới dạng ion K⁺', color: '#E8A13A' },
      { text: 'Điều hòa khí khổng và cân bằng áp suất thẩm thấu', color: '#174B37' },
      { text: 'Hỗ trợ enzyme, vận chuyển đường và hình thành củ/hạt/quả', color: '#16A36A' }
    ],
    mascotEmotion: 'knight',
    mascotSpeech: 'Ion K⁺ giúp điều tiết khí khổng, hoạt hóa enzyme và đưa đường về quả, củ, hạt! 🛡️',
    speakerNotes:
      'Phân kali cung cấp nguyên tố kali (K), được rễ cây hấp thụ và tồn tại trong tế bào chủ yếu dưới dạng ion K⁺. Khác với N và P, K không tham gia trực tiếp vào khung cấu trúc phân tử hữu cơ bền vững mà đảm nhận các chức năng sinh lý cốt lõi:\n- Điều hòa áp suất thẩm thấu của tế bào và kiểm soát đóng mở khí khổng, giúp cây sử dụng nước tiết kiệm hơn.\n- Hoạt hóa nhiều hệ enzyme liên quan đến quang hợp và tổng hợp đường, tinh bột.\n- Hỗ trợ vận chuyển sản phẩm quang hợp từ lá về cơ quan dự trữ như hạt, củ, quả.\n- Góp phần cải thiện độ cứng cáp của mô cây và hỗ trợ sức chống chịu trước điều kiện hạn, rét hoặc nguy cơ đổ ngã khi được bón cân đối.'
  },

  // SLIDE 15: KALI - CÂU 2
  {
    id: 15,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q2',
    sourceQuestion:
      'Câu hỏi 2 (Kali): Độ dinh dưỡng của phân kali được đánh giá dựa trên chỉ tiêu nào (%K_2 O)? Hãy so sánh thành phần hóa học, độ tan và đặc điểm giữa hai loại phân kali phổ biến nhất: Kali clorua (KCl) và Kali sunfat (K_2 SO_4).',
    title: 'KCl ≈ 60% K₂O · K₂SO₄ ≈ 50% K₂O',
    badges: [
      { text: 'Chỉ tiêu đánh giá: %K₂O quy đổi trên nhãn; cả hai đều tan tốt trong nước', color: '#E8A13A' },
      { text: 'KCl (MOP): thường khoảng 60% K₂O, đi kèm ion Cl⁻, phổ biến và kinh tế', color: '#174B37' },
      { text: 'K₂SO₄ (SOP): thường khoảng 50% K₂O, đi kèm SO₄²⁻ (thêm S), không chứa Cl⁻', color: '#16A36A' }
    ],
    mascotEmotion: 'scale',
    mascotSpeech: 'KCl (~60% K₂O) phổ biến và kinh tế; K₂SO₄ (~50% K₂O) thêm lưu huỳnh và không có Cl⁻! ⚖️',
    speakerNotes:
      'Độ dinh dưỡng của phân kali thương mại được đánh giá theo phần trăm khối lượng K₂O quy đổi trên nhãn sản phẩm.\nSo sánh hai loại phổ biến:\n1. Kali clorua (KCl / MOP): thường có hàm lượng khoảng 60% K₂O quy đổi, tan tốt trong nước, giá thành cạnh tranh và được sử dụng rộng rãi nhất; tuy nhiên phân đi kèm ion clorua (Cl⁻). Màu sắc KCl thương mại có thể trắng, hồng hoặc đỏ nâu tùy tạp chất khoáng đi kèm, không dùng màu làm căn cứ duy nhất đánh giá chất lượng.\n2. Kali sunfat (K₂SO₄ / SOP): thường có khoảng 50% K₂O quy đổi, tan trong nước, không chứa Cl⁻ và cung cấp thêm lưu huỳnh (dạng SO₄²⁻, khoảng 17–18% S). K₂SO₄ phù hợp khi cây trồng cần bổ sung S hoặc khi cần hạn chế đầu vào chloride.'
  },

  // SLIDE 16: KALI - CÂU 3
  {
    id: 16,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q3',
    sourceQuestion:
      'Câu hỏi 3 (Kali): Hiện tượng "đói kali" biểu hiện như thế nào trên cây trồng (ví dụ: mép lá cháy vàng, cây dễ đổ)? Tại sao phân Kali clorua (KCl) không nên dùng cho các loại cây nhạy cảm với ion clorua (như thuốc lá, khoai tây, sầu riêng, cà chua chất lượng cao) mà phải dùng Kali sunfat (K₂SO₄)?',
    title: 'THIẾU K CÓ THỂ CHÁY MÉP LÁ GIÀ — CHỌN NGUỒN K THEO CÂY',
    badges: [
      { text: 'Thiếu K: thường vàng và cháy khô từ mép/chóp lá già, cây kém cứng cáp', color: '#C94F52' },
      { text: 'Một số cây nhạy Cl⁻ (thuốc lá, một số cây ăn quả/cây lấy củ) cần hạn chế chloride', color: '#E8A13A' },
      { text: 'K₂SO₄ là lựa chọn phù hợp khi cần cung cấp K và S mà không kèm Cl⁻', color: '#16A36A' }
    ],
    mascotEmotion: 'worried',
    mascotSpeech: 'Lá già cháy mép gợi ý thiếu K; với cây nhạy Cl⁻ nên ưu tiên K₂SO₄ theo khuyến cáo! 🍂',
    speakerNotes:
      '1. Biểu hiện thiếu kali ("đói kali"): Do K⁺ di động trong cây và được ưu tiên điều chuyển về lá non, triệu chứng thiếu K thường xuất hiện ở lá già trước với biểu hiện vàng rồi cháy khô dọc mép lá và chóp lá; cây có thể mềm yếu, dễ đổ và giảm chất lượng hạt, củ, quả. Tuy nhiên, cháy mép lá cũng có thể do mặn, hạn hoặc bệnh hại nên cần chẩn đoán kết hợp.\n2. Lựa chọn giữa KCl và K₂SO₄ (lưu ý công thức đúng là K₂SO₄, không phải K₂O₄): KCl đưa thêm ion Cl⁻ vào đất. Ở các cây trồng nhạy cảm với chloride (như thuốc lá làm giảm độ cháy và hương, hoặc một số giống khoai tây, sầu riêng, cà chua và cây ăn quả chất lượng cao trong điều kiện đất/nước dễ tích lũy Cl⁻), thừa Cl⁻ có thể ảnh hưởng bất lợi đến sinh lý và phẩm chất nông sản. Khi đó, sử dụng K₂SO₄ giúp cung cấp K⁺ và lưu huỳnh mà không làm tăng Cl⁻.'
  },

  // SLIDE 17: KALI - CÂU 4
  {
    id: 17,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q4',
    sourceQuestion:
      'Câu hỏi 4 (Kali): Tại sao phân kali thường được khuyến cáo sử dụng để bón thúc (đặc biệt vào giai đoạn cây chuẩn bị ra hoa, tạo hạt, phình củ, nuôi quả) thay vì bón lót toàn bộ từ đầu?',
    title: 'CHIA LẦN BÓN K THEO NHU CẦU CỦA CÂY VÀ ĐIỀU KIỆN ĐẤT',
    badges: [
      { text: 'Đầu vụ: căn cứ nhu cầu từng loại cây và lượng K sẵn có trong đất', color: '#52645A' },
      { text: 'Ra hoa, tạo hạt, phình củ, nuôi quả: nhu cầu K thường tăng cao', color: '#E8A13A' },
      { text: 'Chia lần bón giúp giảm thất thoát rửa trôi trên đất nhẹ/mưa nhiều', color: '#16A36A' }
    ],
    mascotEmotion: 'harvest',
    mascotSpeech: 'Chia lần bón kali theo giai đoạn nuôi hoa, hạt, củ, quả giúp cây hấp thu hiệu quả hơn! 🌾',
    speakerNotes:
      'Phân kali thường được khuyến cáo chia lần và chú trọng bón thúc thay vì dồn toàn bộ vào một lần bón lót vì:\n1. Động thái nhu cầu của cây: Ở nhiều loại cây trồng, nhu cầu K tăng mạnh trong giai đoạn vươn lóng, phân hóa mầm hoa, tạo hạt, phình củ và nuôi quả để phục vụ vận chuyển đường và tích lũy chất khô.\n2. Hạn chế thất thoát và sốc muối: Các phân kali thông dụng (KCl, K₂SO₄) đều dễ tan trong nước. Nếu bón toàn bộ lượng lớn ngay từ đầu vụ, đặc biệt trên đất cát nhẹ, đất có khả năng giữ cation (CEC) thấp hoặc vùng mưa lớn/tưới nhiều, ion K⁺ có thể bị rửa trôi một phần và làm tăng nồng độ muối cục bộ quanh rễ non. Việc bón lót một phần kết hợp chia lần bón thúc tùy loại cây, đất và quy trình kỹ thuật sẽ nâng cao hiệu suất sử dụng phân.'
  },

  // SLIDE 18: KALI - CÂU 5
  {
    id: 18,
    type: 'question',
    chapter: CHAPTERS.KALI,
    questionId: 'KALI_Q5',
    sourceQuestion:
      'Câu hỏi 5 (Kali): Việc lạm dụng phân kali chứa gốc clorua (KCl) lâu dài có thể làm gia tăng độ mặn của đất, ảnh hưởng ra sao đến hệ sinh thái vi sinh vật đất và cấu trúc đất (làm đất chai cứng, bí khí)?',
    title: 'LẠM DỤNG MUỐI PHÂN BÓN: THEO DÕI EC, THOÁT NƯỚC VÀ CÂN BẰNG DINH DƯỠNG',
    badges: [
      { text: 'Muối hòa tan tích lũy → độ dẫn điện EC tăng, rễ khó hút nước', color: '#C94F52' },
      { text: 'Cl⁻ cao có thể gây stress cho cây nhạy chloride và hệ vi sinh vật đất', color: '#E8A13A' },
      { text: 'Giải pháp: đúng liều · kiểm tra EC/pH · thoát nước · bổ sung hữu cơ', color: '#16A36A' }
    ],
    mascotEmotion: 'soil_doctor',
    mascotSpeech: 'Theo dõi EC đất, quản lý thoát nước, bổ sung hữu cơ và chọn nguồn K phù hợp! 🩺',
    speakerNotes:
      'Khi lạm dụng KCl vượt nhu cầu trong thời gian dài, nhất là ở đất thoát nước kém, canh tác nhà màng hoặc nguồn nước tưới đã có muối:\n1. Tăng muối hòa tan và EC: Ion Cl⁻ và muối hòa tan tích lũy làm tăng độ dẫn điện (EC) và áp suất thẩm thấu của dung dịch đất, khiến rễ khó hút nước và dễ gặp stress thẩm thấu.\n2. Ảnh hưởng hệ sinh thái vi sinh vật đất: Độ mặn và nồng độ Cl⁻ cao có thể ức chế hoạt động của nhiều nhóm vi sinh vật có lợi và làm suy giảm tốc độ phân giải chất hữu cơ.\n3. Về cấu trúc đất: Cần phân biệt hiện tượng tích lũy muối hòa tan (salinity) với sự suy thoái cấu trúc vật lý của đất; đất trở nên nén chặt, bí khí phụ thuộc tổng hợp vào việc thiếu hụt chất hữu cơ, mất cân bằng các cation trao đổi (như Ca²⁺, Mg²⁺, Na⁺), thành phần cơ giới và chế độ canh tác. Giải pháp là bón đúng liều, kiểm tra EC/pH, bảo đảm thoát nước, luân phiên nguồn K không chứa clo khi cần và duy trì phân hữu cơ.'
  },

  // SLIDE 19: MINI GAME
  {
    id: 19,
    type: 'game',
    chapter: CHAPTERS.GAME,
    title: 'BÓC TÚI MÙ HÓA HỌC NPK',
    badges: [
      { text: '4 TÚI CÂU HỎI TƯƠNG TÁC', color: '#16A36A' },
      { text: 'ÔN TẬP NHANH TRỌNG TÂM N–P–K', color: '#7862E8' },
      { text: 'PHẢN HỒI & GIẢI THÍCH KHOA HỌC', color: '#E8A13A' }
    ],
    speakerNotes:
      'Phần tương tác ngắn "Bóc túi mù Hóa học NPK" dùng để củng cố nhanh kiến thức vừa trình bày: nhận diện %N của urê, cơ chế hòa tan của phân lân nung chảy, lựa chọn giữa KCl và K₂SO₄ cho cây nhạy chloride, và nguyên tắc 4 Đúng. Để giữ thời lượng toàn bài thuyết trình gọn trong 8–9 phút, người dẫn có thể mời lớp mở 1 túi đại diện rồi nhấn nút chuyển sang phần Tổng kết, hoặc mở thêm túi khi giáo viên yêu cầu.'
  },

  // SLIDE 20: TỔNG KẾT
  {
    id: 20,
    type: 'closing',
    chapter: CHAPTERS.CLOSING,
    eyebrow: 'TỔNG KẾT & NGUYÊN TẮC SỬ DỤNG PHÂN BÓN',
    title: 'CÂN ĐỐI N–P–K & NGUYÊN TẮC 4 ĐÚNG CHO MÙA XANH BỀN VỮNG',
    subtitle: 'Đúng loại · Đúng liều · Đúng lúc · Đúng cách',
    speakerNotes:
      'Tổng kết lại: Nitơ (N) hỗ trợ phát triển thân lá và tổng hợp protein/diệp lục; Photpho (P) tham gia chuyển hóa năng lượng ATP và phát triển bộ rễ; Kali (K) điều hòa nước, hoạt hóa enzyme và vận chuyển đường. Ba nguyên tố hỗ trợ lẫn nhau và không thể thay thế cho nhau. Khi sử dụng phân bón, cần đọc kỹ nhãn sản phẩm, dựa trên loại cây, giai đoạn sinh trưởng, đặc tính đất và tuân thủ nguyên tắc 4 Đúng (đúng loại, đúng liều, đúng lúc, đúng cách) kết hợp hữu cơ để vừa đạt hiệu quả nông học vừa bảo vệ tài nguyên đất và nước. Cảm ơn thầy cô và các bạn đã lắng nghe! Nhóm rất mong nhận được câu hỏi và ý kiến đóng góp.'
  }
];
