// Dữ liệu minigame "Bóc Túi Mù Hóa Học NPK" — tách riêng để dễ chỉnh sửa nội dung.

export const BASE_SCORE = 100;   // Điểm tối đa mỗi túi (trả lời đúng ngay lần đầu)
export const PENALTY = 30;       // Trừ mỗi lần chọn sai
export const MIN_SCORE = 20;     // Điểm tối thiểu khi vẫn trả lời đúng

export const BLIND_BAGS = [
  {
    id: 1,
    code: 'BAG-N',
    name: 'Túi Mù Đạm Diệp Lục',
    shortName: 'TÚI ĐẠM (N)',
    themeColor: '#16A34A',
    accentColor: '#22C55E',
    softColor: '#DCFCE7',
    borderColor: '#86EFAC',
    glowColor: 'rgba(34, 197, 94, 0.35)',
    mascotName: 'Bé Đạm Sprouty N Chibi',
    mascotEmoji: '🌱',
    rewardTitle: 'Linh Thú Diệp Lục Cấp SS',
    rewardDesc: 'Giúp lá xanh mướt, đâm chồi vươn cao',
    question:
      'Loại phân đạm nào sau đây có hàm lượng Nitơ cao nhất (khoảng 46%) và là "vua phân đạm" được bà con nông dân sử dụng phổ biến nhất toàn cầu?',
    options: [
      'Amoni clorua (NH₄Cl)',
      'Urê — CO(NH₂)₂',
      'Amoni sunfat — Phân SA ((NH₄)₂SO₄)',
      'Natri nitrat (NaNO₃)'
    ],
    correctIndex: 1,
    hint: 'Nhớ lại chương Đạm: loại phân đơn có %N cao nhất.',
    explanation:
      'Phân Urê CO(NH₂)₂ chứa ~46% Nitơ nguyên chất — hàm lượng đạm cao nhất trong các loại phân vô cơ đơn, kích thích diệp lục quang hợp mạnh mẽ.'
  },
  {
    id: 2,
    code: 'BAG-P',
    name: 'Túi Mù Lân Năng Lượng',
    shortName: 'TÚI LÂN (P)',
    themeColor: '#7C3AED',
    accentColor: '#8C6BFA',
    softColor: '#EDE9FE',
    borderColor: '#C4B5FD',
    glowColor: 'rgba(140, 107, 250, 0.35)',
    mascotName: 'Bé Lân Sparky P Tia Chớp',
    mascotEmoji: '⚡',
    rewardTitle: 'Linh Thú Tinh Thể Năng Lượng ATP',
    rewardDesc: 'Rễ cắm sâu vững chãi, nụ hoa hé sớm',
    question:
      'Tại sao phân lân nung chảy (FMP) bón cho đất đồi dốc gặp mưa lũ dài ngày lại KHÔNG bị nước mưa cuốn trôi mất?',
    options: [
      'Vì hạt phân hóa thành thể khí bốc hơi lên trời',
      'Vì hạt phân kết tủa bám chặt vào mặt lá cây',
      'Vì phân không tan trong nước mưa trung tính (pH 7), chỉ tan khi gặp axit hữu cơ do rễ cây tiết ra',
      'Vì giun đất đã nuốt hết hạt phân vào sâu trong tổ đất'
    ],
    correctIndex: 2,
    hint: 'Nước mưa gần như trung tính. Rễ cây tiết ra chất gì để hòa tan phân?',
    explanation:
      'Lân nung chảy có tính kiềm vô định hình, trơ trước nước mưa nhưng tan hoàn toàn trong dịch axit xitric yếu quanh rễ cây — chống rửa trôi cực đỉnh!'
  },
  {
    id: 3,
    code: 'BAG-K',
    name: 'Túi Mù Kali Cường Lực',
    shortName: 'TÚI KALI (K)',
    themeColor: '#D97706',
    accentColor: '#F59E0B',
    softColor: '#FEF3C7',
    borderColor: '#FDE68A',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    mascotName: 'Bé Kali Sunny K Vương Miện',
    mascotEmoji: '👑',
    rewardTitle: 'Linh Thú Quả Chín Ngọt Ngào',
    rewardDesc: 'Cứng cáp chống đổ ngã, quả ngọt củ to',
    question:
      'Bác nông dân chuẩn bị bón phân cho vườn Sầu Riêng đang nuôi cơm quả thơm béo. Bác TUYỆT ĐỐI KHÔNG NÊN dùng loại phân kali nào kẻo cơm bị nhão sượng?',
    options: [
      'Kali sunfat (K₂SO₄)',
      'Kali clorua (KCl — Phân muối ớt đỏ)',
      'Phân chuồng hoai mục ủ vi sinh',
      'Tro bếp giàu kali tự nhiên'
    ],
    correctIndex: 1,
    hint: 'Cây nhạy cảm với ion Cl⁻ thì phải tránh loại kali nào?',
    explanation:
      'Cây sầu riêng, khoai tây rất nhạy cảm với gốc Cl⁻. Bón KCl sẽ gây tích nước, cơm nhão sượng và mất vị béo bùi. Nên dùng K₂SO₄!'
  },
  {
    id: 4,
    code: 'BAG-NPK',
    name: 'Túi Mù Bí Kíp Bội Thu',
    shortName: 'BÍ KÍP NPK',
    themeColor: '#DB2777',
    accentColor: '#EC4899',
    softColor: '#FCE7F3',
    borderColor: '#FBCFE8',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    mascotName: 'Biệt Đội Linh Thú NPK Vàng',
    mascotEmoji: '🏆',
    rewardTitle: 'Cúp Nhà Nông Thông Thái Huyền Thoại',
    rewardDesc: 'Cân đối vạn năng, mùa vàng thịnh vượng',
    question:
      'Để cây trồng đạt năng suất cao nhất, đất luôn phì nhiêu tơi xốp mà không bị chua hay chai cứng thoái hóa, nguyên tắc vàng "4 ĐÚNG" là gì?',
    options: [
      'Bón càng nhiều càng tốt, bón dồn 1 lần duy nhất',
      'Đúng loại • Đúng liều • Đúng lúc • Đúng cách',
      'Chỉ bón phân hóa học đơn, không cần phân hữu cơ',
      'Bón phân đạm cùng lúc với vôi bột tươi giữa trưa nắng'
    ],
    correctIndex: 1,
    hint: 'Bón dồn một lần hay bón bừa đều không bền vững. Nhớ slide tổng kết!',
    explanation:
      'Nguyên tắc 4 ĐÚNG kết hợp cân đối phân vô cơ và hữu cơ vi sinh là bí kíp giúp nông nghiệp phát triển xanh và bền vững.'
  }
];

export const getRank = (score) => {
  if (score >= 400) return { emoji: '🏆', title: 'Nhà Nông Thông Thái Huyền Thoại' };
  if (score >= 300) return { emoji: '🥇', title: 'Kỹ Sư Nông Nghiệp Xuất Sắc' };
  if (score >= 200) return { emoji: '🌾', title: 'Nông Dân Chăm Chỉ' };
  return { emoji: '🌱', title: 'Mầm Non Nhiệt Huyết' };
};
