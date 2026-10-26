// Dữ liệu minigame "Bóc túi mù Hóa học NPK" — chuẩn hóa khoa học theo Mục 5 & Mục 10 của Master Spec.

export const BASE_SCORE = 100;   // Điểm tối đa mỗi túi (trả lời đúng ngay lần đầu)
export const PENALTY = 30;       // Trừ mỗi lần chọn sai
export const MIN_SCORE = 20;     // Điểm tối thiểu khi vẫn trả lời đúng

export const BLIND_BAGS = [
  {
    id: 1,
    code: 'BAG-N',
    name: 'Túi Mù Đạm Diệp Lục',
    shortName: 'TÚI ĐẠM (N)',
    themeColor: '#16A36A',
    accentColor: '#22C55E',
    softColor: '#DCFCE7',
    borderColor: '#86EFAC',
    glowColor: 'rgba(22, 163, 106, 0.32)',
    mascotName: 'Bé Đạm Sprouty N',
    mascotEmoji: '🌱',
    rewardTitle: 'Huy Hiệu Đạm Diệp Lục',
    rewardDesc: 'Nắm vững cách tính %N và tránh mất NH₃ khi bón phân đạm',
    question:
      'Xét theo công thức hóa học tinh khiết, hợp chất phân đạm nào dưới đây có phần trăm khối lượng Nitơ (%N) lý thuyết cao nhất (khoảng 46,7% N)?',
    options: [
      'Amoni clorua — NH₄Cl (≈ 26,2% N)',
      'Urê — CO(NH₂)₂ (≈ 46,7% N)',
      'Amoni sunfat — (NH₄)₂SO₄ (≈ 21,2% N)',
      'Natri nitrat — NaNO₃ (≈ 16,5% N)'
    ],
    correctIndex: 1,
    hint: 'So sánh tỷ lệ m_N / M: hợp chất nào có M = 60 g/mol và chứa 2 nguyên tử N (28 g)?',
    explanation:
      'Urê CO(NH₂)₂ có M ≈ 60 g/mol chứa 28 g N nên đạt khoảng 46,7% N theo lý thuyết (thương mại thường ghi khoảng 46% N trên nhãn).'
  },
  {
    id: 2,
    code: 'BAG-P',
    name: 'Túi Mù Lân Năng Lượng',
    shortName: 'TÚI LÂN (P)',
    themeColor: '#7862E8',
    accentColor: '#8B5CF6',
    softColor: '#EDE9FE',
    borderColor: '#C4B5FD',
    glowColor: 'rgba(120, 98, 232, 0.32)',
    mascotName: 'Bé Lân Sparky P',
    mascotEmoji: '⚡',
    rewardTitle: 'Huy Hiệu Lân Năng Lượng ATP',
    rewardDesc: 'Hiểu rõ cơ chế hòa tan của lân nung chảy và supe lân',
    question:
      'Điểm khác biệt chính về tính chất hòa tan của phân lân nung chảy so với phân supephotphat là gì?',
    options: [
      'Lân nung chảy bay hơi nhanh trong không khí khi gặp nắng',
      'Lân nung chảy chỉ chứa khí nitơ tự do, không chứa photphat',
      'Lân nung chảy thường không tan hoặc ít tan trong nước, nhưng hòa tan được trong môi trường axit yếu và bổ sung thêm Ca, Mg, Si',
      'Lân nung chảy có tính axit mạnh hơn supe lân đơn'
    ],
    correctIndex: 2,
    hint: 'Nhớ lại cấu trúc thủy tinh silicat–photphat của lân nung chảy trong nước và trong môi trường axit yếu.',
    explanation:
      'Lân nung chảy có cấu trúc thủy tinh silicat–photphat và tính kiềm: ít/không tan trong nước nhưng hòa tan trong môi trường axit yếu vùng rễ hoặc dung dịch kiểm nghiệm.'
  },
  {
    id: 3,
    code: 'BAG-K',
    name: 'Túi Mù Kali Cân Bằng',
    shortName: 'TÚI KALI (K)',
    themeColor: '#E8A13A',
    accentColor: '#F59E0B',
    softColor: '#FEF3C7',
    borderColor: '#FDE68A',
    glowColor: 'rgba(232, 161, 58, 0.32)',
    mascotName: 'Bé Kali Sunny K',
    mascotEmoji: '👑',
    rewardTitle: 'Huy Hiệu Kali Điều Hòa Nước',
    rewardDesc: 'Chọn đúng nguồn KCl hoặc K₂SO₄ theo cây trồng và đất',
    question:
      'Khi canh tác các cây trồng nhạy cảm với ion clorua (như thuốc lá hoặc một số cây ăn quả, cây lấy củ theo khuyến cáo) hay nơi đất/nước có nguy cơ tích lũy Cl⁻, vì sao K₂SO₄ thường được ưu tiên hơn KCl?',
    options: [
      'Vì K₂SO₄ hoàn toàn không tan trong nước',
      'Vì K₂SO₄ cung cấp K⁺ và lưu huỳnh (SO₄²⁻) mà không đưa thêm ion Cl⁻ vào đất',
      'Vì K₂SO₄ có hàm lượng %K₂O quy đổi cao gấp đôi KCl',
      'Vì KCl chỉ chứa nguyên tố lưu huỳnh và canxi'
    ],
    correctIndex: 1,
    hint: 'So sánh ion đi kèm với K⁺ trong hai công thức KCl và K₂SO₄.',
    explanation:
      'K₂SO₄ (khoảng 50% K₂O) cung cấp kali và lưu huỳnh mà không kèm ion Cl⁻, giúp hạn chế nguy cơ stress chloride ở cây nhạy cảm.'
  },
  {
    id: 4,
    code: 'BAG-NPK',
    name: 'Túi Mù Canh Tác Bền Vững',
    shortName: 'NGUYÊN TẮC 4 ĐÚNG',
    themeColor: '#174B37',
    accentColor: '#16A36A',
    softColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    glowColor: 'rgba(23, 75, 55, 0.30)',
    mascotName: 'Biệt Đội NPK',
    mascotEmoji: '🏆',
    rewardTitle: 'Cúp Canh Tác Bền Vững',
    rewardDesc: 'Phối hợp cân đối N–P–K và bảo vệ sức khỏe đất',
    question:
      'Khi sử dụng phân đạm amoni (hoặc urê) trong canh tác, cách làm nào sau đây phù hợp để hạn chế thất thoát dinh dưỡng và bảo vệ đất?',
    options: [
      'Trộn trực tiếp phân đạm amoni với vôi bột để bón cùng lúc',
      'Không trộn/bón đồng thời đạm amoni với vôi kiềm; chia lần bón theo nhu cầu cây và kết hợp bổ sung hữu cơ',
      'Bón dồn toàn bộ lượng đạm của cả vụ ngay trước khi mưa lớn',
      'Chỉ bón nguyên phân đạm đơn liên tục nhiều năm mà không kiểm tra pH đất'
    ],
    correctIndex: 1,
    hint: 'Phản ứng NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O xảy ra khi trộn đạm amoni với vật liệu kiềm.',
    explanation:
      'Trộn đạm amoni với vôi/vật liệu kiềm làm mất N dưới dạng khí NH₃ bay hơi. Cần bón cách thời điểm, tuân thủ 4 Đúng và kết hợp phân hữu cơ.'
  }
];

export const getRank = (score) => {
  if (score >= 400) return { emoji: '🏆', title: 'Chuyên Gia Dinh Dưỡng NPK Xuất Sắc' };
  if (score >= 300) return { emoji: '🥇', title: 'Kỹ Sư Nông Học Vững Vàng' };
  if (score >= 200) return { emoji: '🌾', title: 'Người Bạn Đồng Ruộng Hiểu Biết' };
  return { emoji: '🌱', title: 'Hạt Mầm Khám Phá Hóa Học' };
};
