# 🌿 PHÂN BÓN HÓA HỌC NPK — BÀI THUYẾT TRÌNH TƯƠNG TÁC 20 SLIDES (16:9 TV & WEB)

Ứng dụng web thuyết trình tương tác chủ đề **Phân bón vô cơ NPK (Đạm – Lân – Kali)** môn Hóa học / Công nghệ nông nghiệp, được thiết kế chuẩn khung hình **16:9 (`1280×720` base stage tự động co giãn)** cho màn hình TV lớp học (`1920×1080`, `4K`), máy chiếu (`1280×720`), laptop và điện thoại xoay ngang.

---

## 🎯 Điểm nổi bật của bản hợp nhất (Master Spec)

1. **Bảo toàn trọn vẹn 20 Slides & trả lời đầy đủ 15/15 câu hỏi gốc (`NHÓM TÀI.txt`):**
   - **Slide 1:** Trang bìa (`PHÂN BÓN HÓA HỌC NPK`).
   - **Slide 2:** Video giới thiệu (`public/video_intro_720.mp4`, thời lượng thực `~51.77s` / `~52s`, **tốc độ mặc định `1×`**).
   - **Slide 3:** Đội ngũ 9 thành viên hiển thị trực tiếp trên lưới `3×3`, đọc rõ toàn bộ họ tên và nhiệm vụ mà không cần lật thẻ, không bị cắt `...`.
   - **Slides 4–8:** Giải đáp 5 câu hỏi phần **Phân Đạm (N)**.
   - **Slides 9–13:** Giải đáp 5 câu hỏi phần **Phân Lân (P)**.
   - **Slides 14–18:** Giải đáp 5 câu hỏi phần **Phân Kali (K)**.
   - **Slide 19:** Mini Game tương tác **Bóc Túi Mù Hóa Học NPK** (có nút chuyển thẳng sang Tổng kết để giữ thời lượng thuyết trình 8–9 phút).
   - **Slide 20:** Tổng kết vai trò N – P – K và nguyên tắc **4 ĐÚNG** (`Đúng loại · Đúng liều · Đúng lúc · Đúng cách`).
2. **Chuẩn hóa học thuật & công nghiệp phân bón Việt Nam:**
   - Phân biệt rõ **Đạm Ninh Bình** (Slide 7: khí hóa than cám → khí tổng hợp → NH₃ → urê) và **Công ty Cổ phần Phân lân Ninh Bình / NIFERCO** (Slide 13: sản xuất phân lân nung chảy và NPK).
   - Chuẩn hóa công thức hóa học (`K₂SO₄`, `CO(NH₂)₂`, `NH₄Cl`, `(NH₄)₂SO₄`, `NaNO₃`, `Ca(H₂PO₄)₂`, `NH₄⁺`, `NO₃⁻`, `H₂PO₄⁻`, `HPO₄²⁻`, `K⁺`, `Cl⁻`, độ dinh dưỡng thương mại `N–P₂O₅–K₂O`).
   - Loại bỏ các khẳng định tuyệt đối thiếu điều kiện (như "tự chủ 100%", "bón vôi cách đạm đúng 15 ngày", "lân nung chảy không bao giờ rửa trôi", "dùng KCl chắc chắn làm sầu riêng nhão múi / đất chai cứng như bê tông").
   - Mọi slide câu hỏi (4–18) đều có **Ghi chú thuyết trình (`Phím N`)** chứa câu hỏi gốc từ `NHÓM TÀI.txt` và phần trả lời học thuật đầy đủ để người thuyết trình đối chiếu.
3. **Chuyển cảnh Morph mượt & an toàn (View Transitions API + CSS Fallback):**
   - Hỗ trợ `document.startViewTransition` trên trình duyệt hiện đại và tự động chuyển sang CSS overlap fallback trên trình duyệt không hỗ trợ.
   - Cơ chế `sequenceToken` + `fallbackTimerRef` chống kẹt slide khi bấm Next/Prev liên tục; tự động dừng video/audio của Slide 2 và dọn timer của Mini Game ngay khi chuyển trang.
   - Tôn trọng cài đặt `prefers-reduced-motion: reduce`.
4. **Sơ đồ SVG Vector & Lightbox (`Phím Z`):**
   - Toàn bộ SVG dùng `useId()` sinh ID duy nhất cho `<linearGradient>`, `<radialGradient>`, `<clipPath>`, `<pattern>`, đảm bảo mở Lightbox phóng to cùng lúc với slide không bị trùng ID hoặc mất màu.

---

## ⌨️ Hệ thống phím tắt trình chiếu

| Phím tắt | Chức năng | Lưu ý |
|---|---|---|
| `→` / `PageDown` / `Space` | Chuyển sang slide tiếp theo | Trên Slide 2, phím `Space` ưu tiên Play/Pause video |
| `←` / `PageUp` | Quay lại slide trước | Khi đang kéo thanh tua (slider), phím `←/→` ưu tiên chỉnh slider |
| `Home` / `End` | Nhảy nhanh về Slide 1 / Slide 20 | Không kích hoạt khi đang nhập liệu |
| `N` | Bật / Tắt ngăn **Ghi chú thuyết trình (Speaker Notes)** | Hiển thị câu hỏi gốc `NHÓM TÀI.txt` & kịch bản trả lời |
| `Z` | Phóng to / Thu nhỏ sơ đồ SVG (**Lightbox**) | Render qua Portal toàn màn hình, tự tạm dừng SMIL ở nền |
| `F` | Bật / Tắt chế độ **Toàn màn hình (Fullscreen)** | Trên Slide 2 ưu tiên phóng to khung trình chiếu |
| `K` / `M` | Play/Pause (`K`) và Bật/Tắt tiếng (`M`) | Chỉ hoạt động khi đang ở **Slide 2 (Video Intro)** |
| `A` / `B` / `C` / `D` | Chọn nhanh đáp án A, B, C, D | Chỉ hoạt động khi đang mở câu hỏi trong **Slide 19 (Mini Game)** |
| `Esc` | Đóng lớp phủ theo thứ tự ưu tiên | Lightbox SVG → Ghi chú thuyết trình → Hộp thoại Mini Game |

---

## 🚀 Hướng dẫn cài đặt và chạy dự án

Yêu cầu môi trường: **Node.js >= 18**.

```bash
# 1. Cài đặt dependencies theo lockfile (hoặc dùng npm install)
npm ci

# 2. Chạy môi trường phát triển (Development Server)
npm run dev

# 3. Đóng gói bản dựng Production (kiểm tra bundle & tài nguyên tĩnh)
npm run build

# 4. Chạy thử bản Production để kiểm tra đường dẫn video/poster/SVG
npm run preview
```

---

## 📁 Cấu trúc thư mục chính

```text
├── public/
│   ├── video_intro_720.mp4     # Video giới thiệu 720p H.264/AAC (~51.77s, mặc định 1x)
│   ├── poster.jpg              # Ảnh poster tĩnh hiển thị khi nạp video
│   └── mascots/                # Tài nguyên SVG linh thú N - P - K
├── src/
│   ├── app/
│   │   ├── App.jsx             # Quản lý Stage 16:9, View Transitions + Fallback, Phím tắt
│   │   ├── slideRegistry.js    # Lazy-load và Preload thông minh cho 20 slides
│   │   └── theme.css           # Hệ thống màu sắc Master Spec, Typography, TV Safe Area
│   ├── components/
│   │   ├── SlideNavigation.jsx # Thanh điều hướng nổi 20 phân đoạn
│   │   ├── SpeakerNotesDrawer.jsx # Ngăn ghi chú thuyết trình (Phím N)
│   │   ├── SvgStageCard.jsx    # Khung hiển thị SVG & Lightbox Portal (Phím Z)
│   │   ├── OrientationGuard.jsx # Hướng dẫn xoay ngang trên điện thoại
│   │   ├── illustrations/      # 15 sơ đồ hóa học & công nghiệp SVG (dùng useId)
│   │   └── mascot/             # Bộ linh thú tương tác (Bé Đạm, Bé Lân, Bé Kali, Biệt Đội)
│   ├── data/
│   │   ├── slideData.js        # Dữ liệu chuẩn hóa 20 slides & Speaker Notes 15 câu hỏi
│   │   └── miniGameData.js     # Bộ câu hỏi trắc nghiệm Bóc Túi Mù Hóa Học NPK
│   └── slides/                 # 20 component trình chiếu (Slide01Topic -> Slide20Closing)
├── NHÓM TÀI.txt                # Bộ 15 câu hỏi gốc của nhóm
├── SOURCES.md                  # Danh mục nguồn tham khảo học thuật & công nghiệp
└── AUDIT_REFACTOR_REPORT.md    # Báo cáo nghiệm thu & kiểm thử chi tiết
```
