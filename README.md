# ỨNG DỤNG TRÌNH CHIẾU REACT: "NPK — BỘ BA NUÔI DƯỠNG MÙA XANH"

Ứng dụng web thuyết trình chuẩn 16:9 chất lượng cao, xây dựng bằng **React + Vite**, tích hợp **Bộ ba Mascot Chibi NPK siêu cute** và đồ họa **SVG trực quan tự giải thích (Visual-First)**.

---

## 🚀 Hướng dẫn khởi chạy

### 1. Cài đặt thư viện (nếu chưa có `node_modules`)
```bash
npm install
```

### 2. Chạy máy chủ phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt tại đường dẫn: `http://localhost:3000` (hoặc cổng hiển thị trên terminal).

### 3. Đóng gói bản Production
```bash
npm run build
npm run preview
```

---

## ⌨️ Phím tắt điều khiển (Keyboard Shortcuts)
| Phím | Chức năng |
|---|---|
| `→` / `Space` / `PageDown` | Chuyển sang Slide tiếp theo |
| `←` / `PageUp` | Quay lại Slide trước đó |
| `Home` / `End` | Nhảy về Slide đầu tiên (Slide 01) / Slide cuối (Slide 19) |
| `N` | Bật / Tắt ngăn kéo Ghi chú người thuyết trình (Speaker Notes) |
| `F` | Bật / Tắt chế độ Toàn Màn Hình (Fullscreen) |
| `Esc` | Đóng ngăn kéo ghi chú |

---

## 📱 Trải nghiệm "Mobile-as-Desktop" (Trên điện thoại & máy tính bảng)
- **Màn hình dọc (Portrait):** Tự động hiển thị màn hình hướng dẫn xoay ngang với hoạt ảnh điện thoại xoay 90° cùng nút *"Bật Toàn Màn Hình & Xoay Ngang"*.
- **Màn hình ngang (Landscape):** Toàn bộ giao diện 16:9 tự động căn giữa và co giãn vừa khít màn hình, các nút bấm điều hướng to rộng chuẩn ngón tay cảm ứng y như rạp chiếu phim mini.
- **Vuốt cảm ứng:** Hỗ trợ vuốt sang trái để Next slide, vuốt sang phải để Prev slide.

---

## 🎨 Cấu trúc 19 Slide
1. **Slide 01:** Trang bìa chủ đề "NPK — Bộ ba nuôi dưỡng mùa xanh"
2. **Slide 02:** Video Intro chuyển động React (16s Motion-Graphic mầm cây vươn chồi)
3. **Slide 03:** Giới thiệu biệt đội 9 thành viên nhóm
4. **Slide 04 – 08:** Phân Đạm (5 câu hỏi: Khái niệm & vai trò N, %N Ure dẫn đầu, đạm amoni với đất vôi/chua, 3 nhà máy Phú Mỹ/Cà Mau/Ninh Bình, phục hồi đất chua)
5. **Slide 09 – 13:** Phân Lân (5 câu hỏi: Dạng ion & pin ATP, Supe đơn vs Supe kép, Lân nung chảy khử phèn, lý do bón lót, mỏ Apatit Lào Cai)
6. **Slide 14 – 18:** Phân Kali (5 câu hỏi: Đóng mở khí khổng & đường bột, KCl vs K₂SO₄, bệnh đói K & cấm KCl cho cây nhạy clo, thời điểm bón thúc, hệ lụy đất chai cứng)
7. **Slide 19:** Tổng kết nguyên tắc "4 Đúng" & Phiên thảo luận Q&A
