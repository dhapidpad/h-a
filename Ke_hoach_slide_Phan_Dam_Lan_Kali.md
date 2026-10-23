# BRIEF THIẾT KẾ PRESENTATION REACT — PHÂN ĐẠM, PHÂN LÂN, PHÂN KALI

> **Mục tiêu:** biến 15 câu hỏi trong tài liệu `NHÓM TÀI.txt` thành bài thuyết trình trực quan (Visual-First), siêu ít chữ, dễ nói, có đáp án chính xác, đồ họa minh họa tự vẽ bằng SVG và linh vật Mascot tương tác độc đáo.  
> **Cấu trúc:** 19 slide = 1 trang chủ đề/bìa + 1 video intro được dựng bằng React + 1 giới thiệu thành viên + 15 slide trả lời đủ 15 câu hỏi + 1 slide kết thúc.  
> **Nền tảng triển khai:** React + Vite, CSS responsive 16:9 ("Mobile-as-Desktop"), SVG inline tương tác, Mascot hoạt hình điều khiển luồng; nội dung và lời thuyết trình tách riêng để dễ sửa.

---

## 1. Định hướng tổng thể

### 1.1. Ý tưởng sáng tạo: “NPK — Bộ ba nuôi dưỡng mùa xanh”

Trình bày như một hành trình khám phá ba nguyên tố dinh dưỡng đa lượng:

- **N — Đạm:** lá xanh, sinh trưởng thân lá, protein và diệp lục.
- **P — Lân:** bộ rễ, chuyển hóa năng lượng, phát triển hoa và hạt.
- **K — Kali:** điều hòa nước, vận chuyển đường, tăng sức chống chịu và chất lượng nông sản.

Không trình bày như một trang sách giáo khoa nhiều chữ. Mỗi slide có **một câu hỏi lớn, một thông điệp trả lời, một hình minh họa trung tâm**. Công thức, số liệu, phương trình được cho vào thẻ nội dung hoặc sơ đồ ngắn. Phần lời giải thích dài hơn nằm trong **speaker notes** để người thuyết trình nói, không nhồi lên màn hình.

### 1.2. Phong cách hình ảnh

- **Cảm giác:** sáng, hiện đại, thân thiện học đường, có chiều sâu nhẹ, giống infographic khoa học cao cấp.
- **Nền chính:** `#F6FAFF` (trắng xanh rất nhạt), thỉnh thoảng dùng nền `#FFFFFF`.
- **Màu chữ:** `#17243A` (xanh đen dễ đọc).
- **Màu Đạm/N:** `#36B86A` — xanh lá.
- **Màu Lân/P:** `#8C6BFA` — tím sáng.
- **Màu Kali/K:** `#FFB547` — vàng cam.
- **Màu nhấn phụ:** `#2F80ED` — xanh dương; `#FF6B7A` — san hô.
- **Thẻ nội dung:** trắng, bo góc 22–28 px, viền rất nhạt, bóng mềm; hạn chế dùng quá nhiều khung lồng nhau.
- **Chữ:** tiêu đề ngắn, đậm; không sử dụng font display khó đọc cho công thức. Gợi ý font: Inter, Be Vietnam Pro hoặc system sans-serif.
- **Hình ảnh:** ưu tiên SVG tự dựng để đồng nhất; ảnh thật chỉ dùng ở slide về nhà máy hoặc quặng apatit. Không dùng ảnh stock có watermark.

### 1.3. Quy tắc chữ trên slide (Visual-First — Siêu ít chữ)

- Tiêu đề: khoảng **36–52 px** trên khung thiết kế 1600 × 900.
- Ý chính: khoảng **24–30 px**; nhãn biểu đồ tối thiểu 20–22 px.
- **Quy tắc vàng:** Mỗi slide tối đa **2–3 thẻ badge/từ khóa then chốt**, mỗi ý 1 dòng cực ngắn; toàn bộ nội dung dài được diễn đạt bằng hình học SVG tự giải thích (nhìn vào là hiểu ngay nguyên lý).
- Trên slide chỉ ghi đáp án tóm tắt; phần lý giải đầy đủ để ở ghi chú người nói (Speaker Notes).
- Không đặt chữ đè lên hình nhiều chi tiết. Không dùng chữ trắng trên nền vàng sáng.

### 1.4. Quy tắc hình SVG trực quan

- Vẽ SVG inline, có `viewBox`, nét bo tròn, số lượng chi tiết vừa đủ.
- Các minh họa chính: cây có rễ/lá/quả, hạt phân bón, ion N/P/K, sơ đồ đất, biểu đồ cột, bản đồ Việt Nam giản lược, nhà máy, đường đi của chất dinh dưỡng.
- SVG có thể animate các thành phần như hạt phân, mũi tên, ion và đường dẫn; chuyển động phải nhẹ, không làm phân tán người xem.
- Không dùng emoji làm hình ảnh chính; emoji chỉ dùng làm điểm nhấn nhỏ nếu phù hợp.

### 1.5. Bộ ba Mascot Chibi "Bé NPK" siêu dễ thương (The Adorable NPK Mascot Trio)

Để bài thuyết trình không khô khan như sách giáo khoa, toàn bộ deck được dẫn dắt bởi **Bộ ba Mascot Chibi NPK** với phong cách vẽ hoạt hình ngộ nghĩnh, má hồng phúng phính, mắt to tròn lấp lánh chuẩn anime:

1. **Bé Đạm — Sprouty N (Mầm Xanh Lá `#36B86A`):**
   - *Ngoại hình:* Bé mầm cây tròn xoe mũm mĩm, trên đầu có hai nhánh lá mầm xanh ngắt ve vẩy theo nhịp thở, hai má ửng hồng phấn, đeo kính bảo hộ hóa học tí hon trên trán.
   - *Biểu cảm & Phụ kiện:* Cầm que chỉ bảng phát sáng, giơ cúp vô địch "TOP 1: 46% N" (Slide 05), đeo khẩu trang phòng độc ôm mũi hoảng hốt khi đạm amoni gặp vôi bốc khí $NH_3\uparrow$ (Slide 06), đội mũ kỹ sư công nghiệp (Slide 07), cầm xẻng nhỏ cùng giun đất xới đất mùn vi sinh (Slide 08).
2. **Bé Lân — Sparky P (Rễ Tím Năng Lượng `#8C6BFA`):**
   - *Ngoại hình:* Bé củ rễ phát quang tím pastel mềm mại, đầu đội mũ viên ngọc photphat lấp lánh, hai mắt to tròn long lanh hình ngôi sao (`*‿*`), luôn ôm trước ngực cục pin sinh học ATP phát tia chớp tím.
   - *Biểu cảm & Phụ kiện:* Cầm kính lúp to tròn soi từng hạt lân tan trong axit rễ cây (Slide 11), làm động tác bệ phóng tên lửa cắm rễ non vào tầng phân bón lót (Slide 12), đội mũ thợ mỏ địa chất cầm quặng Apatit Lào Cai (Slide 13).
3. **Bé Kali — Sunny K (Quả Vàng Cam `#FFB547`):**
   - *Ngoại hình:* Bé quả tròn vo màu vàng cam nắng ấm, đầu cài một nụ hoa nhỏ xíu hé nở, thân hình núng nính đáng yêu, tay cầm chiếc khiên mini hình chiếc lá xanh vững chắc.
   - *Biểu cảm & Phụ kiện:* Đứng điều khiển 2 cánh cổng Khí khổng mở toang đón gió (Slide 14), bưng cân tiểu ly so sánh khay muối ớt KCl và khay muối trắng $K_2SO_4$ (Slide 15), toát mồ hôi ôm mặt xót xa khi thấy lá cây bị cháy viền mép và đất bị nhiễm mặn chai cứng (Slide 16, 18), bưng giỏ hoa quả trĩu cành múa mừng bội thu ở đỉnh dốc bón thúc (Slide 17).
4. **Animation kéo chuyển Slide siêu cute (Mascot Rope-Pull Transition):**
   - Khi người dùng bấm Next (hoặc vuốt màn hình): Bé Mascot của chương đó chạy tót ra mép màn hình, hai tay nắm sợi dây thừng neon, phồng hai má chu môi gồng mình kéo slide mới trượt vào (`>_<`).
   - Ngay khi slide mới cập bến an toàn, Bé Mascot nhảy cẫng lên xoay 1 vòng 360°, hai tay tung hoa giấy confetti chúc mừng (`^o^`), rồi tung tăng chạy về góc nghỉ.

### 1.6. Chuẩn Responsive "Mobile-as-Desktop" (Xoay ngang màn hình)

- **Máy tính / Laptop:** Hiển thị khung sân khấu chuẩn 16:9 cân đối, phím điều hướng đầy đủ.
- **Điện thoại màn hình dọc:** Tự động kích hoạt màn hình gợi ý thông minh với hoạt ảnh chiếc điện thoại nghiêng 90° cùng thông điệp: *"Vui lòng xoay ngang điện thoại để trải nghiệm trình chiếu sân khấu đỉnh nhất"*, kèm nút bấm *"Bật Toàn Màn Hình & Khóa Xoay Ngang"* (sử dụng Screen Orientation API).
- **Điện thoại màn hình ngang:** Toàn bộ sân khấu 16:9 tự động căn giữa và phóng to (contain) vừa khít chiều cao màn hình; các nút bấm điều hướng to rõ ngón tay cái, hình vẽ SVG sắc nét không bị vỡ hạt, mang lại trải nghiệm thuyết trình điện ảnh y như trên máy tính.

---

## 2. Bố cục kỹ thuật cho React

### 2.1. Công nghệ và cấu trúc đề xuất

```text
src/
├─ app/
│  ├─ App.jsx                 # trạng thái trình chiếu, điều hướng slide, quản lý Mascot
│  ├─ slideData.js            # tiêu đề, từ khóa visual, speaker notes, câu hỏi gốc
│  └─ theme.css               # token màu, layout 16:9, responsive mobile-as-desktop
├─ components/
│  ├─ SlideFrame.jsx          # khung slide 16:9 scale contain
│  ├─ SlideNavigation.jsx     # số trang, tiến trình, nút trước/sau, fullscreen, notes toggle
│  ├─ SpeakerNotes.jsx        # ghi chú chuyên sâu cho người thuyết trình
│  ├─ SectionPill.jsx         # nhãn ĐẠM / LÂN / KALI
│  ├─ SproutyMascot.jsx       # Bộ ba Mascot N-P-K chibi tương tác & kéo chuyển slide
│  ├─ OrientationGuard.jsx    # Lớp nhắc xoay ngang trên điện thoại
│  └─ illustrations/          # các SVG tự dựng chuẩn infographic
├─ slides/
│  ├─ Slide01Topic.jsx
│  ├─ Slide02VideoIntro.jsx
│  ├─ Slide03Members.jsx
│  ├─ Slide04To18Questions.jsx
│  └─ Slide19Closing.jsx
└─ main.jsx
```

- React + Vite là đủ cho cấu trúc này; không cần dựng 3D/WebGL vì không đem lại lợi ích đáng kể cho nội dung hóa học và dễ làm máy yếu bị lag.
- Nếu có cài Framer Motion, dùng `layoutId` hoặc shared-layout transition để tạo **morph mềm** giữa hình N → P → K và các thẻ nội dung. Nếu không, dùng CSS transform/opacity; không làm hiệu ứng khác nhau quá nhiều giữa các slide.
- Các nội dung, tên thành viên và ghi chú thuyết trình phải nằm trong dữ liệu dễ sửa, không hard-code lặp nhiều nơi.

### 2.2. Điều hướng và trình chiếu

- Phím **← / →**, **Space**, **PageUp / PageDown**: chuyển slide.
- Hỗ trợ click/tap nút trước/sau; hỗ trợ vuốt ngang trên màn hình cảm ứng.
- Có nút **Toàn màn hình**; có thanh tiến trình mảnh phía dưới.
- Không tự động chuyển slide khi người nói chưa sẵn sàng.
- Chuyển cảnh dùng morph/transform nhẹ trong 350–500 ms; tôn trọng `prefers-reduced-motion`.
- Chế độ trình chiếu ẩn thanh điều hướng sau vài giây không thao tác, nhưng vẫn có thể gọi lại bằng tap/click.

### 2.3. Responsive cho máy tính và điện thoại

- Khung thiết kế gốc **16:9**, tương đương 1600 × 900; nội dung dùng grid/flex, tránh tọa độ tuyệt đối cho toàn bộ chữ.
- Máy tính: slide ở giữa màn hình, có khoảng thở; biểu đồ và minh họa đặt cạnh nội dung.
- Điện thoại: khi xoay ngang, slide chiếm gần toàn bộ viewport và tự co theo chiều rộng/chiều cao, chữ vẫn đọc được; nút điều hướng đủ lớn để bấm.
- Khi điện thoại đang dọc, hiện overlay gọn: **“Xoay ngang để xem slide rõ hơn”**, có nút **“Tiếp tục ở chế độ dọc”** để người dùng không bị khóa thao tác.
- Khi người dùng bấm “Bắt đầu trình chiếu”, thử vào fullscreen và khóa landscape **chỉ khi trình duyệt/thiết bị hỗ trợ và được phép**. Nếu không hỗ trợ, vẫn hiển thị hướng dẫn xoay ngang, không được làm trang bị lỗi.
- Không ép xoay bằng cách xoay toàn bộ giao diện CSS theo cách làm chữ khó đọc. Dùng `aspect-ratio: 16 / 9`, giới hạn chiều cao theo viewport và scale đều cả khung.
- Kiểm tra tối thiểu ở 1920 × 1080, 1366 × 768, 844 × 390, 915 × 412 và 390 × 844.

### 2.4. Quy chuẩn hiệu năng

- Không dùng video nền chạy liên tục; **riêng slide 02 là một đoạn intro hoạt họa** dựng trực tiếp bằng React + SVG/CSS, không phụ thuộc file video nặng và không dùng hạt particle hàng nghìn phần tử.
- SVG phải gọn, tránh filter blur lớn trên nhiều layer.
- Không render lại toàn bộ deck khi chỉ thay đổi notes; memoize minh họa nặng nếu cần.
- Với từng slide, kiểm tra nội dung không bị tràn, công thức không gãy dòng, điều hướng phím không bị gọi hai lần.

---

## 3. Đáp án kiến thức — quy tắc trình bày

1. **Phần trăm N** là hàm lượng khối lượng nitơ trong phân bón; giá trị phổ biến gần đúng: urê 46%, NH₄Cl 26%, (NH₄)₂SO₄ 21%, NaNO₃ 16%. Đây là tỷ lệ dinh dưỡng, không phải phần trăm khối lượng của toàn bộ chất dinh dưỡng cây hấp thụ.
2. **Phân lân** thường công bố độ dinh dưỡng theo % P₂O₅ hữu hiệu; **phân kali** theo % K₂O quy đổi. Khi so sánh, phải nói rõ đang dùng dạng quy ước P₂O₅/K₂O, không nhầm với phần trăm nguyên tố P/K.
3. Không nên nói tất cả các loại phân đạm làm đất chua như nhau. Quá trình nitrat hóa amoni có thể tạo H⁺ và góp phần chua hóa đất; mức độ phụ thuộc loại phân, đất, cây và cách bón.
4. Không khẳng định mọi phân lân đều hoàn toàn không tan trong nước. Supe lân chứa dạng lân dễ tan; lân nung chảy ít tan trong nước nhưng có thể hòa tan trong môi trường axit yếu.
5. Kali clorua không phải luôn luôn xấu. KCl có hàm lượng K₂O cao, giá thường thấp; cần thận trọng ở cây nhạy với clo/mặn hoặc ở điều kiện dễ tích lũy muối.
6. Bón lót/bón thúc là khuyến nghị phụ thuộc cây trồng, đất và thời điểm. Không mô tả một lịch bón duy nhất đúng cho mọi loại cây.

---

# 4. Kịch bản chi tiết từng slide

## SLIDE 01 — TRANG CHỦ ĐỀ / BÌA REACT

**Tên slide:** `PHÂN BÓN VÔ CƠ: ĐẠM – LÂN – KALI`  
**Vai trò:** giới thiệu chính xác chủ đề ngay từ đầu; đây là trang bìa tĩnh có chuyển động nhẹ, **không phải video intro**. Người xem phải đọc được chủ đề, tên nhóm/lớp trước khi đoạn intro bắt đầu.

### Chữ hiển thị
- Nhãn nhỏ: `HÓA HỌC TRONG NÔNG NGHIỆP`
- Tiêu đề lớn: `PHÂN BÓN VÔ CƠ`
- Dòng chủ đề: `PHÂN ĐẠM • PHÂN LÂN • PHÂN KALI`
- Thông điệp ngắn: `Ba nguyên tố — Một nền tảng cho cây khỏe`
- Nhãn cuối: `Đúng chất • Đúng lúc • Đúng cách`
- Trường chỉnh sửa: `[Tên nhóm]` · `[Lớp]` · `[Tên giáo viên nếu cần]`
- Nút lớn: `KHÁM PHÁ CHỦ ĐỀ →` (chuyển sang Slide 02)

### Bố cục
- Tỉ lệ thiết kế 16:9, nền trắng xanh `#F6FAFF`, có mảng gradient xanh lá → xanh dương mờ ở phía phải.
- Bên trái chiếm khoảng 54%: nhãn môn học nhỏ, tiêu đề chính 2 dòng, tên chủ đề, thông điệp ngắn và nút bắt đầu. Không căn tất cả vào giữa.
- Bên phải chiếm khoảng 46%: minh họa SVG cây non nhìn xuyên xuống bộ rễ, ba vòng nguyên tố `N`, `P`, `K` bao quanh cây.
- Dưới cùng có một dải mảnh ghi tên nhóm/lớp; không chèn thông tin thừa.
- Nội dung tên nhóm/lớp lưu trong `slideData.js`, có thể sửa mà không phải đổi component.

### SVG và chuyển động
- Dựng cây, rễ, lá, các vòng N/P/K bằng SVG inline; không tải ảnh raster làm hình chính.
- Khi trang mở: đường viền cây hiện trước, lá mọc lên nhẹ, vòng N/P/K fade-in từng nhịp trong 500–800 ms.
- Chuyển động chỉ là điểm nhấn; chủ đề phải đọc rõ ngay lập tức.
- Nút `KHÁM PHÁ CHỦ ĐỀ` chuyển sang Slide 02 và khởi chạy intro. Phím `→` hoặc Space cũng đi tiếp.

### Speaker notes
“Bài thuyết trình tìm hiểu ba nhóm phân bón vô cơ quen thuộc: phân đạm, phân lân và phân kali. Nhóm sẽ lần lượt giải đáp các câu hỏi về vai trò, hàm lượng dinh dưỡng, cách sử dụng, nguyên liệu sản xuất và ảnh hưởng đến đất.”

---

## SLIDE 02 — VIDEO INTRO DỰNG BẰNG REACT

**Tên slide:** `TỪ HẠT DINH DƯỠNG ĐẾN MÙA MÀNG XANH`  
**Vai trò:** một đoạn mở màn dạng motion-graphic/video ngắn, chạy ngay sau trang chủ đề. Toàn bộ cảnh được dựng bằng **React + SVG + CSS animation**; không phải ảnh tĩnh gắn hiệu ứng, không bắt buộc cần file MP4.

### Thời lượng và nhịp cảnh
- Tổng thời lượng mặc định: **12–15 giây**; tự chạy một lần khi người dùng chuyển từ Slide 01 sang Slide 02.
- Có thanh tiến trình nhỏ, nút `Bỏ qua intro` và nút `Phát lại`; không tự lặp vô hạn.
- Không phát âm thanh tự động. Có thể thêm nút bật/tắt nhạc nền nếu nhóm chủ động cung cấp file âm thanh hợp lệ; mặc định tắt.
- Khi intro kết thúc, hiện nút `BẮT ĐẦU TÌM HIỂU →`; người xem bấm để sang Slide 03 — Thành viên. Có thể cho tự chuyển sau 1,5 giây nếu bật cấu hình `autoAdvanceAfterIntro`, mặc định **false** để người nói kiểm soát.

### Kịch bản hình ảnh theo giây
1. **0–2 giây — Hạt và đất:** nền sáng chuyển thành lát cắt đất. Một hạt giống rơi xuống, đất mở ra thành các lớp mềm; chữ nhỏ: `MỌI SỰ SỐNG BẮT ĐẦU TỪ DINH DƯỠNG`.
2. **2–5 giây — Rễ tìm dưỡng chất:** rễ cây lan xuống; các hạt ion minh họa di chuyển chậm từ đất tới vùng rễ. Không gán ion sai loại cho từng nguyên tố nếu không có nhãn giải thích.
3. **5–8 giây — Ba nhân vật N/P/K:** ba vòng nguyên tố hiện lên theo đường cong: `N — THÂN LÁ`, `P — RỄ & NĂNG LƯỢNG`, `K — ĐIỀU HÒA NƯỚC & CHỐNG CHỊU`.
4. **8–11 giây — Cây phát triển:** cây non lớn dần, lá xanh mở rộng; rễ vẫn nhìn thấy dưới đất. Chuyển đổi bằng morph giữa cùng một SVG cây, không cắt cảnh giật mạnh.
5. **11–15 giây — Câu hỏi dẫn nhập:** các vòng N/P/K hội tụ quanh cây; hiện câu hỏi lớn `BÓN THẾ NÀO ĐỂ CÂY KHỎE, ĐẤT BỀN?`; sau đó hiện nút `BẮT ĐẦU TÌM HIỂU →`.

### Bố cục và mỹ thuật
- Tạo một sân khấu 16:9 toàn màn hình, dùng cùng bảng màu của bộ slide: xanh lá `#36B86A`, tím `#8C6BFA`, vàng cam `#FFB547`, nền `#F6FAFF`.
- Hình ảnh chiếm khoảng 75–80% diện tích; chữ chỉ dùng như lời dẫn ngắn, tối đa một câu tại mỗi nhịp cảnh.
- Cảnh đất ở nửa dưới, cây là trục trung tâm; vòng N/P/K có kích thước đủ lớn để đọc được khi điện thoại xoay ngang.
- Không đưa bảng số liệu, công thức dài hay lời giải 15 câu hỏi vào intro.

### Triển khai bằng React
- Tạo component `Slide02VideoIntro.jsx` có trạng thái `sceneIndex` và tiến trình thời gian; dùng `requestAnimationFrame` hoặc CSS keyframes với cleanup rõ ràng, không tạo nhiều timer chồng nhau.
- Có thể dùng Framer Motion nếu dự án đã cài; nếu chưa, CSS keyframes + SVG là đủ, không thêm dependency chỉ để làm intro.
- Dùng một scene timeline dễ chỉnh trong `slideData.js` hoặc `introTimeline.js`; hỗ trợ tạm dừng, phát lại, bỏ qua.
- Khi người dùng chuyển slide giữa chừng, phải dọn listener/animation và dừng tiến trình intro; quay lại slide thì hiện nút phát lại, không tự chạy chồng animation.
- Nếu `prefers-reduced-motion: reduce` bật, thay chuyển động dài bằng 3–4 cảnh fade ngắn; vẫn giữ nút bỏ qua và tiếp tục.
- Không dùng WebGL, video nền nặng, hoặc hàng nghìn hạt động. Mục tiêu là mượt trên laptop học tập và điện thoại phổ thông.

### Speaker notes — lời dẫn gợi ý
“Cây trồng muốn phát triển cần được cung cấp dinh dưỡng cân đối. Trong bài hôm nay, chúng ta sẽ tập trung vào ba nguyên tố N, P và K: mỗi nguyên tố có chức năng riêng, vì vậy điều quan trọng không chỉ là bón phân mà còn là chọn đúng loại và sử dụng hợp lý.”

---

## SLIDE 03 — GIỚI THIỆU THÀNH VIÊN

**Tên slide:** `NHỮNG MẢNH GHÉP CỦA NHÓM`  
**Vai trò:** giới thiệu nhóm, tạo nhịp trước khi vào kiến thức.

### Bố cục
- Tiêu đề căn trái phía trên; bên phải có minh họa nhỏ chiếc lá và kính lúp.
- Phần chính là **lưới 3 × 3 gồm 9 thẻ thành viên**; mỗi thẻ có số thứ tự lớn, tên thành viên, nhiệm vụ ngắn.
- Không có ảnh chân dung thì dùng avatar SVG trừu tượng (hình học/chiếc lá), không tự sinh khuôn mặt giả.
- Tên là placeholder dễ sửa: `[Tên thành viên 01]`…`[Tên thành viên 09]`.

### Nội dung gợi ý cho 9 thẻ
1. `[Tên 01]` — Dẫn nhập và giới thiệu chủ đề
2. `[Tên 02]` — Khái niệm và vai trò của đạm
3. `[Tên 03]` — So sánh hàm lượng nitơ
4. `[Tên 04]` — Đạm, đất và sản xuất tại Việt Nam
5. `[Tên 05]` — Vai trò và các dạng phân lân
6. `[Tên 06]` — Lân nung chảy và cách bón lân
7. `[Tên 07]` — Quặng apatit và sản xuất phân lân
8. `[Tên 08]` — Vai trò và các loại phân kali
9. `[Tên 09]` — Thiếu kali, sử dụng an toàn và kết luận

> Đây là phương án chia phần gợi ý; giáo viên/nhóm có thể đổi nhiệm vụ theo người thực tế. Không để nhiệm vụ dài hơn một dòng.

### SVG và chuyển động
- Mỗi thẻ xuất hiện theo từng hàng, độ trễ 60–80 ms.
- Đường cong nhỏ nối 9 thẻ thành một mạch, nhưng không dùng đường nối chồng lên chữ.
- Khi bấm chuyển slide, các thẻ thu gọn thành chín chấm và chuyển thành dải điều hướng.

### Speaker notes
“Nhóm gồm chín thành viên. Mỗi người phụ trách một phần để bảo đảm các câu hỏi về phân đạm, phân lân và phân kali được giải thích lần lượt. Tên và nhiệm vụ trên slide cần thay bằng thông tin thật của nhóm trước khi trình chiếu.”

---

## SLIDE 04 — PHÂN ĐẠM, CÂU HỎI 1

**Câu hỏi gốc (NHÓM TÀI.txt):** *Phân đạm là gì? Vai trò quyết định của nguyên tố Nitơ (N) đối với sự sinh trưởng và phát triển của cây trồng là gì?*

### Chữ hiển thị
- Tiêu đề: `N — ĐỘNG CƠ CỦA MÀU XANH & SINH KHỐI`
- Ba thẻ badge trực quan:
  - `🌱 SINH KHỐI: Cây vươn cao, cành lá phát triển`
  - `🍃 DIỆP LỤC: Lá xanh quang hợp hấp thụ ánh sáng`
  - `🧬 PROTEIN: Cấu tạo tế bào & enzyme sự sống`

### Bố cục
- Trái 45%: Cây non đang tăng tốc vươn cao với thước đo chiều cao nhảy số liên tục; lát cắt lá hiển thị mô hình nhà máy lục lạp tí hon.
- Phải 55%: Biểu tượng ion Nitơ ($NH_4^+$, $NO_3^-$) màu xanh lá `#36B86A` phát sáng, kết nối với chuỗi xoắn Protein và phân tử diệp lục.

### SVG và Mascot
- Mascot Bé Mầm đứng cạnh rễ cây, hai tay ôm chiếc lá xanh mướt, miệng cười rạng rỡ và chỉ que sáng vào lục lạp.
- Dòng dưỡng chất xanh lục chạy từ đất qua thân lên từng phiến lá.

### Speaker notes — đáp án đầy đủ
Phân đạm là loại phân bón hóa học cung cấp nguyên tố dinh dưỡng Nitơ ($N$) cho cây trồng dưới dạng các ion hấp thụ chính là amoni ($NH_4^+$) và nitrat ($NO_3^-$).
Vai trò quyết định của Nitơ:
1. **Thành phần cốt lõi của vật chất sống:** Nitơ là nguyên tố cấu tạo nên axit amin, protein – đơn vị cấu trúc cơ bản của mọi tế bào thực vật.
2. **Quyết định khả năng quang hợp:** Nitơ là thành phần hạt nhân trong phân tử chất diệp lục ($C_{55}H_{72}O_5N_4Mg$). Thiếu đạm, cây không tổng hợp được diệp lục khiến lá chuyển sang màu vàng nhạt, hiệu suất quang hợp sụt giảm nghiêm trọng.
3. **Thúc đẩy tăng trưởng sinh khối:** Đạm kích thích sự phân chia tế bào, giúp cây đâm chồi, nảy lộc, tăng nhanh chiều cao thân, diện tích phiến lá, quyết định trực tiếp đến năng suất sinh khối của cây trồng.

---

## SLIDE 05 — PHÂN ĐẠM, CÂU HỎI 2

**Câu hỏi gốc (NHÓM TÀI.txt):** *Dựa vào đâu để đánh giá chất lượng (độ dinh dưỡng) của phân đạm? Hãy so sánh hàm lượng phần trăm về khối lượng của Nitơ (%N) trong các loại phân phổ biến: Ure CO(NH2)2, Amoni clorua NH4Cl, Amoni sunfat (NH4)2SO4 và Natri nitrat NaNO3. Loại nào có hàm lượng cao nhất?*

### Chữ hiển thị
- Tiêu đề: `ĐỘ DINH DƯỠNG: URE DẪN ĐẦU VỚI 46% N`
- Nhãn chỉ số: `Đánh giá theo % khối lượng Nitơ (%N)`
- Cột so sánh trực quan:
  - `Urê — CO(NH₂)₂` **46%** 👑 *(Cao nhất)*
  - `Amoni clorua — NH₄Cl` **26.2%**
  - `Amoni sunfat — (NH₄)₂SO₄` **21.2%**
  - `Natri nitrat — NaNO₃` **16.5%**

### Bố cục
- 70% slide là 4 ống đong dung dịch thủy tinh trong suốt, mực nước màu xanh ngọc dâng cao theo đúng tỉ lệ phần trăm dinh dưỡng thực tế.
- Ống đong Urê có vương miện vàng phát quang; bên dưới gắn cấu trúc phân tử que-cầu 3D của $CO(NH_2)_2$.
- 30% bên phải là thẻ ghi nhớ nhanh: "Urê: Hàm lượng N cao nhất, dễ bảo quản, tan nhanh trong nước".

### SVG và Mascot
- Cột đo dâng lên từ 0 đến mức đỉnh trong 500ms.
- Mascot Bé Mầm đứng bên ống đong Urê, hai tay giơ bảng "TOP 1: 46% N" và nháy mắt chào người xem.

### Speaker notes — đáp án đầy đủ
1. **Tiêu chuẩn đánh giá:** Chất lượng (độ dinh dưỡng) của phân đạm được đánh giá dựa trên **hàm lượng phần trăm về khối lượng của nguyên tố Nitơ (%N)** có trong phân bón.
2. **So sánh hàm lượng %N lý thuyết:**
   - **Urê $[CO(NH_2)_2]$:** $M = 60 \text{ g/mol} \rightarrow \%N = \frac{28}{60} \times 100\% \approx \mathbf{46.67\%}$ (thực tế công nghiệp khoảng 46%).
   - **Amoni clorua $[NH_4Cl]$:** $M = 53.5 \text{ g/mol} \rightarrow \%N = \frac{14}{53.5} \times 100\% \approx \mathbf{26.17\%}$.
   - **Amoni sunfat $[(NH_4)_2SO_4]$:** $M = 132 \text{ g/mol} \rightarrow \%N = \frac{28}{132} \times 100\% \approx \mathbf{21.21\%}$.
   - **Natri nitrat $[NaNO_3]$:** $M = 85 \text{ g/mol} \rightarrow \%N = \frac{14}{85} \times 100\% \approx \mathbf{16.47\%}$.
3. **Kết luận:** **Phân Urê** có hàm lượng dinh dưỡng Nitơ cao nhất trong các loại phân đạm phổ biến hiện nay, do đó rất được ưa chuộng trong sản xuất nông nghiệp vì giảm được chi phí vận chuyển và công lao động bón phân.

---

## SLIDE 06 — PHÂN ĐẠM, CÂU HỎI 3

**Câu hỏi gốc (NHÓM TÀI.txt):** *Hiện tượng hóa học nào xảy ra khi bón phân đạm amoni (NH4+) vào loại đất chua (đất có tính axit) hoặc đất vôi (CaCO3)? Giải thích tại sao một số loại phân đạm không nên bón cùng vôi bột.*

### Chữ hiển thị
- Tiêu đề: `ĐẠM AMONI VỚI ĐẤT CHUA & ĐẤT VÔI`
- Hai thẻ cảnh báo đối nghịch:
  - ⚠️ `ĐẤT VÔI / GẶP VÔI: MẤT ĐẠM (NH₃ bay hơi!)`
  - ⚠️ `ĐẤT CHUA: TĂNG TÍNH AXIT (Đất càng chua)`
- Phương trình then chốt: `NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O`

### Bố cục
- Chia đôi màn hình trực quan:
  - Nửa trái (Đất chua): Tông màu đỏ gắt với các ion $H^+$ nhọn hoắt tích tụ làm pH giảm sâu.
  - Nửa phải (Đất vôi / bón cùng vôi): Các bong bóng khí $NH_3\uparrow$ bốc lên cuồn cuộn bay mất vào không khí kèm dấu chéo đỏ cảnh báo lãng phí.
- Dưới cùng là tấm biển: "TUYỆT ĐỐI KHÔNG BÓN CHUNG ĐẠM AMONI VỚI VÔI BỘT!".

### SVG và Mascot
- Mascot Bé Mầm đứng giữa ranh giới, tay đeo khẩu trang phòng độc, một tay ôm mũi, nét mặt hoảng hốt chỉ vào làn khói khí $NH_3$ đang bốc hơi.

### Speaker notes — đáp án đầy đủ
1. **Khi bón đạm amoni vào đất chua:**
   Trong đất, các ion amoni ($NH_4^+$) bị các vi sinh vật nitrat hóa chuyển thành nitrat ($NO_3^-$), giải phóng thêm các ion hiđro ($H^+$):
   $NH_4^+ + 2O_2 \rightarrow NO_3^- + H_2O + 2H^+$
   Lượng $H^+$ sinh ra làm tăng độ chua của đất, khiến đất vốn đã chua lại càng bị chua hóa và chai cứng nghiêm trọng hơn. Do đó đất chua không nên bón nhiều phân đạm amoni sinh chua sinh lý.
2. **Khi bón đạm amoni vào đất vôi ($CaCO_3$) hoặc bón cùng vôi bột ($Ca(OH)_2$):**
   Môi trường kiềm chứa nhiều ion $OH^-$ sẽ phản ứng ngay lập tức với ion $NH_4^+$ theo phương trình trao đổi proton:
   $NH_4^+ + OH^- \rightleftharpoons NH_3\uparrow + H_2O$
   Khí amoniac ($NH_3$) có tính bay hơi mạnh sẽ thoát ra ngoài khí quyển, gây thất thoát nghiêm trọng lượng đạm dinh dưỡng đã bón, làm lãng phí tiền của người nông dân.
3. **Khuyến cáo:** Nếu cần khử chua cho đất bằng vôi, phải bón vôi trước từ 15–20 ngày để vôi trung hòa axit đất, sau đó mới tiến hành bón phân đạm.

---

## SLIDE 07 — PHÂN ĐẠM, CÂU HỎI 4

**Câu hỏi gốc (NHÓM TÀI.txt):** *Tại Việt Nam, các nhà máy sản xuất phân đạm lớn (như Đạm Phú Mỹ, Đạm Cà Mau, Đạm Ninh Bình) sử dụng những nguồn nguyên liệu tự nhiên nào (khí thiên nhiên, than đá,...) và có những đóng góp gì cho nền kinh tế nông nghiệp nước nhà?*

### Chữ hiển thị
- Tiêu đề: `CÔNG NGHIỆP ĐẠM: KHÍ THIÊN NHIÊN & THAN ĐÁ`
- Ba trụ cột nguyên liệu:
  - `🔥 ĐẠM PHÚ MỸ: Khí thiên nhiên (Bể Nam Côn Sơn)`
  - `🔥 ĐẠM CÀ MAU: Khí thiên nhiên (Mỏ PM3-CAA)`
  - `⛏️ ĐẠM NINH BÌNH: Than đá (Khí hóa than cám)`
- Đóng góp: `Tự chủ 100% nhu cầu đạm trong nước • An ninh lương thực`

### Bố cục
- Bản đồ Việt Nam SVG phát sáng, 3 điểm sáng rực rỡ tại Ninh Bình, Bà Rịa - Vũng Tàu (Phú Mỹ), và Cà Mau.
- Chuỗi quy trình công nghệ thu nhỏ: `Khí gas/Than → Khí tổng hợp (CO + H₂) → NH₃ → Hạt Urê tròn bóng`.

### SVG và Mascot
- Mascot Bé Mầm đội mũ bảo hộ kỹ sư công nghiệp, tay cầm hạt đạm ngọc trai trắng muốt giới thiệu các cụm công nghiệp.

### Speaker notes — đáp án đầy đủ
1. **Nguồn nguyên liệu tự nhiên sử dụng:**
   - **Đạm Phú Mỹ (Tổng công ty PVFCCo - Bà Rịa Vũng Tàu):** Sử dụng **khí thiên nhiên** (chủ yếu là khí metan $CH_4$) dẫn từ các mỏ khí ngoài khơi thềm lục địa phía Nam (bể Nam Côn Sơn).
   - **Đạm Cà Mau (Công ty PVCFC - Cụm Khí - Điện - Đạm Cà Mau):** Sử dụng **khí thiên nhiên** khai thác từ vùng mỏ chồng lấn PM3-CAA (vịnh Thái Lan).
   - **Đạm Ninh Bình:** Sử dụng **than đá (than cám)** từ vùng than Quảng Ninh thông qua công nghệ khí hóa than ở nhiệt độ cao để sản xuất khí tổng hợp ($CO + H_2$).
2. **Đóng góp to lớn cho nền kinh tế nông nghiệp nước nhà:**
   - **Tự chủ nguồn cung phân bón:** Trước thập niên 2000, Việt Nam phải nhập khẩu gần 100% phân đạm. Sự ra đời của các nhà máy đã giúp nước ta chủ động hoàn toàn nguồn đạm nội địa với sản lượng trên 2.6 triệu tấn/năm.
   - **Bảo đảm an ninh lương thực quốc gia:** Giúp ổn định giá phân bón trong nước trước biến động thị trường thế giới, hỗ trợ hàng triệu bà con nông dân sản xuất lúa gạo và cây công nghiệp.
   - **Tạo thặng dư xuất khẩu:** Đạm Cà Mau và Phú Mỹ hiện nay đã xuất khẩu phân bón sang nhiều nước Đông Nam Á, Ấn Độ và châu Mỹ Latinh.

---

## SLIDE 08 — PHÂN ĐẠM, CÂU HỎI 5

**Câu hỏi gốc (NHÓM TÀI.txt):** *Làm thế nào để khắc phục tình trạng đất bị thoái hóa, chua hóa do sử dụng phân đạm hóa học lâu năm? Có những giải pháp thay thế hoặc kết hợp nào hiệu quả?*

### Chữ hiển thị
- Tiêu đề: `PHỤC HỒI ĐẤT CHUA: "4 ĐÚNG" & VI SINH HỮU CƠ`
- Bộ tứ giải pháp vàng:
  - `⚖️ BÓN VÔI KHỬ CHUA: Nâng pH về mức cân bằng`
  - `🌱 PHÂN HỮU CƠ VI SINH: Tái tạo tầng mùn & độ xốp`
  - `🔄 LUÂN CANH CÂY HỌ ĐẬU: Cố định đạm tự nhiên`
  - `⏳ PHÂN TAN CHẬM: Giảm thất thoát & bón vừa đủ`

### Bố cục
- Trung tâm là cán cân bập bênh sinh thái: Một bên là bao đạm vô cơ, một bên là phân hữu cơ vi sinh + bao vôi bột giúp đất tơi xốp.
- Lát cắt đất: Đất nứt nẻ xám xịt chuyển dần thành màu nâu tơi xốp, có chú giun đất đội mũ công nhân mỉm cười.

### SVG và Mascot
- Mascot Bé Mầm cầm xẻng làm vườn, tưới dung dịch chế phẩm vi sinh phát quang vào đất; các bong bóng mùn sinh học nở rộng quanh rễ.

### Speaker notes — đáp án đầy đủ
1. **Nguyên nhân thoái hóa:** Bón đạm hóa học vô cơ lâu năm (đặc biệt các gốc amoni, clo, sunfat) làm rửa trôi canxi, magie, suy giảm độ pH (chua hóa), làm kiệt quệ hệ vi sinh vật bản địa và khiến đất bị nén chặt, mất kết cấu hạt xốp.
2. **Các giải pháp khắc phục và thay thế hiệu quả:**
   - **Bón vôi bột ($CaCO_3$ hoặc $Ca(OH)_2$):** Trung hòa ion $H^+$ dư thừa, nâng độ pH đất lên mức thích hợp (6.0 – 6.8) để bộ rễ phát triển thuận lợi.
   - **Tăng cường bón phân hữu cơ vi sinh:** Bổ sung phân chuồng ủ hoai mục, phân trùn quế, than sinh học (biochar) để tăng hàm lượng mùn, tái tạo độ phì nhiêu và tạo môi trường sống cho vi sinh vật có lợi.
   - **Áp dụng kỹ thuật luân canh cây họ Đậu:** Tận dụng vi khuẩn nốt sần *Rhizobium* sống cộng sinh ở rễ đậu để cố định Nitơ tự do từ khí quyển thành đạm hữu cơ bồi bổ lại cho đất một cách tự nhiên.
   - **Ứng dụng công nghệ phân bón thông minh:** Sử dụng phân đạm bọc polymer giải phóng chậm (Controlled Release Fertilizer - CRF) hoặc phân urê có chất ức chế men urease (chống bay hơi, chống rửa trôi), tuân thủ nguyên tắc "4 đúng": Đúng loại - Đúng liều - Đúng lúc - Đúng cách.

---

## SLIDE 09 — PHÂN LÂN, CÂU HỎI 1

**Câu hỏi gốc (NHÓM TÀI.txt):** *Phân lân cung cấp nguyên tố dinh dưỡng nào cho cây trồng và dưới dạng ion nào? Vai trò cốt lõi của Photpho đối với quá trình phát triển bộ rễ, sự ra hoa, đậu quả và vận chuyển năng lượng (ATP) trong cây là gì?*

### Chữ hiển thị
- Tiêu đề: `P — BỘ RỄ VỮNG VÀNG & PIN NĂNG LƯỢNG ATP`
- Các ion hấp thụ: `H₂PO₄⁻ (Đất chua)  &  HPO₄²⁻ (Đất kiềm)`
- Ba sức mạnh sinh học:
  - `⚡ PIN ATP/ADP: Trạm phát năng lượng tế bào`
  - `🌿 KÍCH BỘ RỄ: Đâm sâu tỏa rộng, chống hạn`
  - `🌸 RA HOA ĐẬU QUẢ: Tăng tỷ lệ thụ phấn, chắc hạt`

### Bố cục
- Giữa slide là bộ rễ chùm phát sáng màu tím `#8C6BFA` đâm sâu vào lòng đất.
- Mô hình cục pin sinh học ATP đang phóng tia chớp năng lượng truyền thẳng lên các nụ hoa đang bung nở trên cành.

### SVG và Mascot
- Mascot Bé Mầm đeo kính hiển vi, tay cầm cục pin năng lượng ATP nhấp nháy tím rực, chỉ vào chùm rễ khỏe khoắn.

### Speaker notes — đáp án đầy đủ
1. **Dạng nguyên tố và ion hấp thụ:**
   Phân lân cung cấp nguyên tố dinh dưỡng **Photpho (P)** cho cây trồng. Cây hấp thụ P qua dung dịch đất dưới dạng các ion photphat:
   - Dihydrophotphat ($H_2PO_4^-$): hấp thụ chủ yếu trong môi trường đất chua nhẹ (pH 5.0 – 6.5).
   - Hydrophotphat ($HPO_4^{2-}$): hấp thụ trong môi trường đất trung tính hoặc kiềm nhẹ (pH > 7.0).
2. **Vai trò cốt lõi của Photpho:**
   - **Trung tâm của chuyển hóa năng lượng (ATP):** Photpho cấu thành phân tử Adenosine Triphosphate (ATP) – "đồng tiền năng lượng" của tế bào. Mọi hoạt động sống từ phân chia tế bào, quang hợp, hô hấp đến vận chuyển chủ động khoáng chất đều phụ thuộc vào năng lượng giải phóng từ liên kết photphat cao năng của ATP.
   - **Phát triển bộ rễ:** Lân kích thích phân hóa tế bào mô phân sinh rễ, giúp rễ cọc đâm sâu và rễ tơ bung tỏa rộng, tăng khả năng chống đổ ngã và hấp thụ nước, dinh dưỡng từ tầng đất sâu.
   - **Kích thích ra hoa, đậu quả:** Photpho tham gia cấu tạo axit nucleic (ADN, ARN), kích thích quá trình hình thành mầm hoa, tăng sức sống hạt phấn, nâng cao tỷ lệ đậu quả và giúp hạt lúa, bắp mẩy tròn, chín sớm.

---

## SLIDE 10 — PHÂN LÂN, CÂU HỎI 2

**Câu hỏi gốc (NHÓM TÀI.txt):** *Độ dinh dưỡng của phân lân được đánh giá theo tiêu chuẩn nào? Phân biệt thành phần hóa học và độ tan trong nước giữa Superphotphat đơn và Superphotphat kép. Tại sao Superphotphat kép lại có hàm lượng dinh dưỡng cao hơn?*

### Chữ hiển thị
- Tiêu đề: `SUPE LÂN ĐƠN (14–20%) vs KÉP (40–50% P₂O₅)`
- Tiêu chuẩn: `Đánh giá theo % khối lượng P₂O₅ quy đổi`
- Hai thẻ so sánh:
  - `📦 SUPE LÂN ĐƠN: Chứa Ca(H₂PO₄)₂ + 50% thạch cao CaSO₄ (ít tan)`
  - `💎 SUPE LÂN KÉP: 100% Ca(H₂PO₄)₂ tinh chất (tan hoàn toàn)`
- Kết luận: `Kép hàm lượng cao gấp đôi vì đã loại bỏ tạp chất thạch cao.`

### Bố cục
- Hai mặt cắt bao phân đặt song song:
  - Bao Đơn có một nửa màu xám biểu thị thạch cao $CaSO_4$ không tan làm nặng bao và đặc đất.
  - Bao Kép chỉ chứa tinh thể muối tan monocalci photphat $Ca(H_2PO_4)_2$ tím phát quang.
- Biểu đồ thanh ngang so sánh nồng độ dinh dưỡng $\%P_2O_5$: 16% vs 46%.

### SVG và Mascot
- Mascot Bé Mầm cầm kính lúp soi vào bao Supe Lân Đơn, gõ ngón tay vào khối thạch cao có dấu gạch chéo đỏ, sau đó giơ ngón tay cái thích thú trước bao Supe Lân Kép.

### Speaker notes — đáp án đầy đủ
1. **Tiêu chuẩn đánh giá:** Độ dinh dưỡng của phân lân được đánh giá theo **hàm lượng phần trăm khối lượng của $P_2O_5$ quy đổi** tương ứng với lượng photpho có trong phân bón.
2. **Phân biệt Supephotphat đơn và Supephotphat kép:**
   - **Supephotphat đơn:**
     - Thành phần: Hỗn hợp gồm muối tan canxi dihydrophotphat $Ca(H_2PO_4)_2$ và canxi sunfat $CaSO_4$ (thạch cao).
     - Độ tan: $Ca(H_2PO_4)_2$ tan tốt trong nước, nhưng $CaSO_4$ hầu như không tan (kết tủa làm rắn và nén đất).
     - Độ dinh dưỡng: Thấp, chỉ đạt khoảng **14% – 20% $P_2O_5$**.
   - **Supephotphat kép:**
     - Thành phần: Chỉ chứa muối tan canxi dihydrophotphat $Ca(H_2PO_4)_2$, không có thạch cao $CaSO_4$.
     - Độ tan: Tan hoàn toàn trong nước, cây hấp thụ cực nhanh.
     - Độ dinh dưỡng: Rất cao, đạt từ **40% – 50% $P_2O_5$**.
3. **Tại sao Supephotphat kép có hàm lượng cao hơn:**
   Trong quy trình sản xuất supephotphat kép, người ta dùng axit photphoric ($H_3PO_4$) để khử quặng apatit thay vì dùng axit sunfuric ($H_2SO_4$):
   $Ca_3(PO_4)_2 + 4H_3PO_4 \rightarrow 3Ca(H_2PO_4)_2$
   Phản ứng không tạo ra kết tủa thạch cao $CaSO_4$ vô ích chiếm thể tích và khối lượng. Nhờ loại bỏ hoàn toàn lượng thạch cao trơ này, tỉ lệ khối lượng của hợp chất photpho tan trong phân bón tăng vọt, giúp độ dinh dưỡng cao gấp 2 – 3 lần supe đơn.

---

## SLIDE 11 — PHÂN LÂN, CÂU HỎI 3

**Câu hỏi gốc (NHÓM TÀI.txt):** *Phân lân nung chảy (phân lân gốm/lân canxi magiê) khác phân superphotphat như thế nào về thành phần và tính chất? Tại sao loại phân này không tan trong nước nhưng lại tan được trong axit yếu do rễ cây tiết ra?*

### Chữ hiển thị
- Tiêu đề: `LÂN NUNG CHẢY: ĐẶC TRỊ CHO ĐẤT CHUA PHÈN`
- Sự khác biệt bản chất:
  - `💧 NƯỚC MƯA: Trơ đáy, không tan, không bị rửa trôi`
  - `🌱 AXIT RỄ CÂY: Hòa tan nhanh chóng, nuôi dưỡng cây`
- Tính chất: `Có tính kiềm (pH 8–8.5), khử chua và bồi bổ Ca, Mg, Si`

### Bố cục
- Thí nghiệm 2 cốc đối lập trực quan:
  - Cốc 1 (Nước mưa trút xuống): Các hạt lân nung chảy thủy tinh thể trơ ra nguyên vẹn, không bị rửa trôi theo dòng nước.
  - Cốc 2 (Lông hút rễ cây chạm vào): Đầu rễ tiết ra những giọt axit hữu cơ yếu (axit xitric, malic) $\rightarrow$ Ngay lập tức hạt lân tan chảy sáng bừng và dòng ion photphat tím chạy thẳng vào trong rễ.

### SVG và Mascot
- Mascot Bé Mầm đứng cạnh rễ cây, mỉm cười gật đầu tán thưởng cơ chế tự điều tiết thông minh: "Cây cần đến đâu, rễ tiết axit hòa tan đến đó!".

### Speaker notes — đáp án đầy đủ
1. **Khác biệt về thành phần và tính chất giữa lân nung chảy và superphotphat:**
   - **Thành phần:** Lân nung chảy (lân canxi magie - FMP) là hỗn hợp phức tạp của photphat và silicat canxi, magie: thành phần chính là photphat canxi magie vô định hình, bổ sung giàu $MgO$ (15–18%), $CaO$ (25–30%), $SiO_2$ (24–30%). Trong khi superphotphat chủ yếu là muối $Ca(H_2PO_4)_2$.
   - **Tính chất môi trường:** Superphotphat có tính axit (pH 3.5 – 4.5), trong khi lân nung chảy có **tính kiềm (pH 8.0 – 8.5)** nên có khả năng khử chua, hạ phèn cực tốt cho đất.
2. **Tại sao không tan trong nước nhưng tan trong axit yếu của rễ tiết ra:**
   - Lân nung chảy được sản xuất bằng cách nung chảy quặng apatit cùng than cốc và quặng sa thạch/dolomit ở nhiệt độ cực cao ($1450^\circ\text{C}$), sau đó làm lạnh đột ngột bằng tia nước áp lực lớn để tạo thành các hạt thủy tinh vô định hình. Cấu trúc liên kết mạng silicat-photphat bền vững này **không bị các phân tử nước trung tính bẻ gãy**.
   - Tuy nhiên, khi bón vào đất, các tế bào lông hút của rễ cây và vi sinh vật đất liên tục bài tiết các axit hữu cơ yếu (như axit xitric, axit malic, axit oxalic) cùng khí carbonic hòa tan ($H_2CO_3$). Các axit yếu này cung cấp ion $H^+$ phá vỡ liên kết kiềm của canxi photphat, hòa tan lân từ từ thành ion $H_2PO_4^-$ ngay tại bề mặt rễ.
3. **Ưu điểm vượt trội:** Phân không bị nước mưa rửa trôi trôi mất trên đất đồi dốc, giải phóng dinh dưỡng chậm theo đúng nhu cầu hấp thụ của rễ.

---

## SLIDE 12 — PHÂN LÂN, CÂU HỎI 4

**Câu hỏi gốc (NHÓM TÀI.txt):** *Tại sao phân lân thường được dùng để bón lót (bón trước khi gieo trồng) chứ ít khi dùng để bón thúc như phân đạm?*

### Chữ hiển thị
- Tiêu đề: `VÌ SAO PHÂN LÂN LUÔN BÓN LÓT TỪ ĐẦU VỤ?`
- Hai lý do khoa học cốt tử:
  - `🐢 TỐC ĐỘ DI CHUYỂN: Lân di chuyển cực chậm trong đất (vài cm/vụ)`
  - `🚀 BỆ PHÓNG RỄ NON: Mầm mới nhú cần lân ngay để phát triển rễ`

### Bố cục
- Lát cắt tầng đất theo trục thời gian sinh trưởng:
  - Nửa trái: Hạt giống vừa đâm chồi, rễ non vừa chạm xuống đất đã gặp ngay tầng lân bón lót sẵn sàng $\rightarrow$ Rễ bung tỏa rực rỡ.
  - Nửa phải: Bón thúc trên mặt đất $\rightarrow$ Hạt lân nằm trơ trên mặt đất, rễ cây ở sâu không thể với tới do lân không tự ngấm sâu xuống được.

### SVG và Mascot
- Mascot Bé Mầm chỉ vào mầm cây non: "Rễ non cần bệ phóng ngay từ ngày đầu tiên!".
- Mũi tên so sánh: Đạm ($N$) tan nhanh di chuyển như xe đua $\leftrightarrow$ Lân ($P$) di chuyển chậm như rùa bò.

### Speaker notes — đáp án đầy đủ
1. **Độ hòa tan và khả năng di động cực kém của lân trong đất:**
   Không giống như đạm nitrat hay kali rất dễ tan và di chuyển tự do theo dòng nước mao dẫn trong đất, các ion photphat ($H_2PO_4^-$) tan chậm và bị các hạt keo đất, các ion sắt ($Fe^{3+}$), nhôm ($Al^{3+}$) trong đất chua hoặc canxi ($Ca^{2+}$) trong đất kiềm hấp phụ, giữ chặt (hiện tượng cố định lân). Lân chỉ dịch chuyển được một khoảng cách rất ngắn (chỉ từ 1 – 3 cm trong suốt cả mùa vụ). Nếu bón thúc rải trên mặt đất, lân sẽ nằm lại ở lớp đất mặt, rễ cây ăn sâu không thể hút được.
2. **Nhu cầu sinh lý cấp thiết của cây con giai đoạn đầu:**
   Ngay khi hạt nảy mầm, phôi mầm cần photpho để phân chia tế bào, tổng hợp năng lượng ATP và phát triển hệ thống rễ non. Nếu giai đoạn cây con bị thiếu lân, bộ rễ sẽ còi cọc, cây bị "chết nghẹt" và không bao giờ phục hồi được sinh khối sau này kể cả khi bón bổ sung muộn màng.
3. **Kết luận kỹ thuật:** Phân lân bắt buộc phải bón lót sâu xuống dưới rãnh gieo, trộn đều với tầng đất canh tác trước khi đặt hạt giống hoặc cây con để rễ non vừa nhú ra là tiếp xúc trực tiếp ngay với vùng dinh dưỡng lân.

---

## SLIDE 13 — PHÂN LÂN, CÂU HỎI 5

**Câu hỏi gốc (NHÓM TÀI.txt):** *Nguyên liệu chính trong tự nhiên để sản xuất phân lân là gì (quặng apatit, phosphorite, Việt Nam có những mỏ quặng apatit lớn nào (ví dụ: Lào Cai) và các nhà máy sản xuất phân lân tiêu biểu nào (Lâm Thao, Văn Điển, Ninh Bình...)? Quá trình khai thác quặng apatit đặt ra những thách thức gì về tài nguyên?*

### Chữ hiển thị
- Tiêu đề: `QUẶNG APATIT LÀO CAI & BÀI TOÁN TÀI NGUYÊN`
- Nguyên liệu & Địa danh mỏ:
  - `⛏️ QUẶNG TỰ NHIÊN: Apatit & Phosphorit (Lào Cai — Trữ lượng hàng đầu ĐNA)`
  - `🏭 BA NHÀ MÁY LỚN: Supe Lâm Thao • Lân Văn Điển • Lân Ninh Bình`
- Thách thức: `Cạn kiệt quặng giàu loại 1 • Bài toán tuyển quặng nghèo & Bùn thải`

### Bố cục
- Lát cắt địa chất mỏ Apatit Lào Cai với các vỉa quặng phân tầng.
- Bản đồ kết nối quặng Lào Cai vận chuyển về Nhà máy Supe Phốt phát Lâm Thao (Phú Thọ), Phân lân nung chảy Văn Điển (Hà Nội) và Ninh Bình.
- Góc phải là tấm biển cảnh báo đỏ: "Tài nguyên không tái tạo — Cần khai thác chế biến sâu và bảo vệ môi trường".

### SVG và Mascot
- Mascot Bé Mầm đội mũ bảo hộ mỏ, tay cầm hòn đá quặng apatit lấp lánh vân phốt phát, nét mặt nghiêm túc nhắc nhở việc bảo tồn tài nguyên thiên nhiên.

### Speaker notes — đáp án đầy đủ
1. **Nguồn nguyên liệu tự nhiên:**
   Nguyên liệu chính để sản xuất phân lân là các khoáng vật photphat tự nhiên, chủ yếu là **quặng Apatit** (thành phần chính $3Ca_3(PO_4)_2\cdot CaF_2$) và quặng **Phosphorit** (khoáng canxi photphat trầm tích thứ sinh).
2. **Mỏ quặng và nhà máy tiêu biểu tại Việt Nam:**
   - **Mỏ Apatit Lào Cai:** Kéo dài hơn 100 km dọc sông Hồng từ Bát Xát đến Bảo Thắng, trữ lượng ước tính hơn 2.5 tỷ tấn, là nguồn cung quặng photphat lớn nhất Đông Nam Á.
   - **Các nhà máy sản xuất lân tiêu biểu:**
     - *Công ty CP Supe Phốt phát và Hóa chất Lâm Thao (Phú Thọ):* Sản xuất supephotphat đơn lớn nhất nước.
     - *Công ty CP Phân lân nung chảy Văn Điển (Hà Nội):* Sản xuất lân nung chảy canxi magie xuất khẩu quốc tế.
     - *Công ty CP Phân lân nung chảy Ninh Bình:* Cung ứng lân nung chảy cho miền Trung và đồng bằng sông Hồng.
3. **Thách thức lớn về tài nguyên và môi trường:**
   - **Cạn kiệt quặng giàu:** Quặng Apatit loại 1 (hàm lượng $P_2O_5 > 28\%$) đã bị khai thác cạn kiệt; hiện nay phải chuyển sang khai thác và tuyển nổi quặng loại 2, loại 3 (nghèo lân), tiêu tốn nhiều năng lượng, hóa chất và chi phí.
   - **Áp lực môi trường:** Quá trình khai thác lộ thiên gây xói mòn đất, ô nhiễm nguồn nước sông Hồng do bùn thải quặng đuôi (tailings); bãi thải thạch cao phosphogypsum từ sản xuất supe lân đặt ra bài toán tái chế làm vật liệu xây dựng.

---

## SLIDE 14 — PHÂN KALI, CÂU HỎI 1

**Câu hỏi gốc (NHÓM TÀI.txt):** *Phân kali cung cấp nguyên tố dinh dưỡng nào cho cây trồng và tồn tại dưới dạng ion gì? Vai trò cốt lõi của nguyên tố Kali (K) đối với quá trình quang hợp, tổng hợp đường/tinh bột, điều hòa áp suất thẩm thấu và tăng sức đề kháng (chống hạn, chống rét, chống đổ) cho cây là gì?*

### Chữ hiển thị
- Tiêu đề: `K — VỆ SĨ ĐỀ KHÁNG & TRẠM BƠM ĐƯỜNG BỘT`
- Ion hấp thụ: `K⁺ (Lưu động cao nhất trong dịch bào tế bào)`
- Ba vai trò chiến lược:
  - `🚪 ĐÓNG MỞ KHÍ KHỔNG: Điều tiết thoát hơi nước, chống hạn rét`
  - `🚚 VẬN CHUYỂN ĐƯỜNG BỘT: Đẩy nông sản vào hạt, phình to củ quả`
  - `🛡️ TĂNG SỨC CHỐNG CHỊU: Dày thành tế bào, chống đổ ngã & sâu bệnh`

### Bố cục
- Trung tâm là mô hình tế bào Khí khổng (Stomata) phóng đại: Khi ion $K^+$ tràn vào, tế bào no nước uốn cong mở toang lỗ thở để đón khí $CO_2$; khi trời nắng hạn $K^+$ bơm ngược ra ngoài làm khí khổng khép chặt khóa nước lại.
- Dòng nhựa luyện chứa các hạt tinh thể đường/tinh bột vàng óng được bơm từ lá dồn về củ khoai tây và trái cây căng mọng.

### SVG và Mascot
- Mascot Bé Mầm mặc áo giáp hiệp sĩ, tay cầm khiên chắn Kali ngăn gió lốc và rét buốt, thân cây đứng thẳng tắp kiên cường trước giông bão.

### Speaker notes — đáp án đầy đủ
1. **Dạng nguyên tố và ion tồn tại:**
   Phân kali cung cấp nguyên tố dinh dưỡng **Kali (K)**. Trong cây trồng, kali không tham gia vào thành phần cấu trúc các chất hữu cơ bền vững (như protein hay lipit) mà tồn tại hoàn toàn dưới dạng **ion tự do $K^+$** hòa tan trong dịch bào tế bào và có độ linh động cao nhất.
2. **Vai trò cốt lõi của Kali:**
   - **Kích hoạt enzyme & Quang hợp:** Ion $K^+$ là chất kích hoạt cho hơn 60 loại enzyme chuyển hóa quan trọng tham gia vào quá trình quang hợp và tổng hợp protein, đường, tinh bột.
   - **Điều hòa áp suất thẩm thấu và đóng mở khí khổng:** Kali kiểm soát thế nước trong tế bào hạt đậu của khí khổng. Khi có đủ $K^+$, nước đi vào làm tế bào trương phồng, mở khí khổng để hấp thụ $CO_2$. Khi cây gặp hạn hán hoặc rét đậm, $K^+$ được chủ động bơm ra ngoài, khí khổng lập tức đóng kín lại để hạn chế tối đa sự mất nước thoát hơi, giúp cây chống hạn và chống rét tuyệt vời.
   - **Vận chuyển đường bột về cơ quan tích lũy:** Kali đóng vai trò như chiếc "xe tải" thúc đẩy vận chuyển sản phẩm quang hợp (đường saccarozơ) từ lá về củ, hạt, quả, giúp củ phình to, quả ngọt đậm đà, hạt lúa mẩy chắc.
   - **Cơ tính vững chắc chống đổ ngã:** $K^+$ làm dày thành tế bào và kích thích tạo mô cơ lóng thân cây, giúp thân cây cứng cáp, không bị rạp đổ khi gặp mưa to gió lớn.

---

## SLIDE 15 — PHÂN KALI, CÂU HỎI 2

**Câu hỏi gốc (NHÓM TÀI.txt):** *Độ dinh dưỡng của phân kali được đánh giá dựa trên chỉ tiêu nào (%K_2 O)? Hãy so sánh thành phần hóa học, độ tan và đặc điểm giữa hai loại phân kali phổ biến nhất: Kali clorua (KCl) và Kali sunfat (K_2 SO_4).*

### Chữ hiển thị
- Tiêu đề: `KALI CLORUA (60%) vs KALI SUNFAT (50% K₂O)`
- Tiêu chuẩn: `Đánh giá theo % khối lượng K₂O quy đổi`
- Hai thẻ sản phẩm so sánh:
  - `🧂 KALI CLORUA (KCl): 60% K₂O • Muối ớt đỏ hồng • Tan nhanh • Giá rẻ • Chứa Cl⁻`
  - `👑 KALI SUNFAT (K₂SO₄): 50% K₂O • Tinh thể trắng • Cao cấp • Không Clo • Có thêm Lưu huỳnh (S)`

### Bố cục
- Hai khay thủy tinh đựng mẫu phân bón song song:
  - Khay KCl: Tinh thể màu đỏ hồng (muối ớt quen thuộc), thanh độ dinh dưỡng chạm mức 60%, kèm ký hiệu ion $Cl^-$.
  - Khay $K_2SO_4$: Tinh thể màu trắng ngà tinh khiết, thanh độ dinh dưỡng 50%, kèm vương miện và huy hiệu Lưu huỳnh ($S$ 18%).
- Dòng kết luận: "KCl dùng đại trà cho lúa, ngô; K₂SO₄ chuyên dùng cho cây ăn trái đặc sản và cây nhạy clo".

### SVG và Mascot
- Mascot Bé Mầm cầm bảng cân đo so sánh giữa khay phân đỏ và khay phân trắng, tay trỏ vào biểu tượng Lưu huỳnh $S$ của phân kali sunfat.

### Speaker notes — đáp án đầy đủ
1. **Chỉ tiêu đánh giá độ dinh dưỡng:**
   Độ dinh dưỡng của phân kali được đánh giá dựa trên **hàm lượng phần trăm khối lượng của $K_2O$ quy đổi** tương ứng với lượng kali có trong phân bón.
2. **So sánh chi tiết Kali clorua (KCl) và Kali sunfat ($K_2SO_4$):**
   - **Kali clorua ($KCl$ - Phân MOP):**
     - Thành phần: Muối $KCl$, chứa khoảng **50% – 60% $K_2O$** (thường gọi là Kali 60).
     - Hình thái & độ tan: Tinh thể màu đỏ hồng, màu xám hoặc trắng đục; tan rất nhanh và hoàn toàn trong nước.
     - Đặc điểm: Là loại phân kali phổ biến nhất thế giới (chiếm >90% sản lượng), giá thành rẻ. Nhược điểm: Chứa ion clorua ($Cl^-$) làm tăng độ mặn của đất và có hại cho một số nhóm cây mẫn cảm clo.
   - **Kali sunfat ($K_2SO_4$ - Phân SOP):**
     - Thành phần: Muối $K_2SO_4$, chứa khoảng **48% – 52% $K_2O$**.
     - Hình thái & độ tan: Tinh thể dạng bột màu trắng tinh khiết, tan tốt trong nước nhưng tốc độ tan chậm hơn KCl một chút.
     - Đặc điểm: Không chứa gốc clo ($Cl^-$); đặc biệt cung cấp thêm khoảng **18% nguyên tố Lưu huỳnh (S)** – chất dinh dưỡng trung lượng cực kỳ cần thiết cho quá trình tạo tinh dầu và hương thơm nông sản. Giá thành cao gấp đôi KCl, là dòng phân bón cao cấp.

---

## SLIDE 16 — PHÂN KALI, CÂU HỎI 3

**Câu hỏi gốc (NHÓM TÀI.txt):** *Hiện tượng "đói kali" biểu hiện như thế nào trên cây trồng (ví dụ: mép lá cháy vàng, cây dễ đổ)? Tại sao phân Kali clorua (KCl) không nên dùng cho các loại cây nhạy cảm với ion clorua (như thuốc lá, khoai tây, sầu riêng, cà chua chất lượng cao) mà phải dùng Kali sunfat (K₂SO₄)?*

### Chữ hiển thị
- Tiêu đề: `NHẬN DIỆN CÂY THIẾU KALI`
- Hình lá lớn có viền mép vàng cháy rụi từ lá già vào trong.
- Ba nhãn: `Mép lá cháy vàng` · `Thân yếu, dễ đổ` · `Chất lượng hạt/quả giảm`
- Cảnh báo: `CẤM KCl CHO CÂY NHẠY CLO: Sầu riêng, Khoai tây, Cà chua, Thuốc lá`

### Bố cục
- 60% diện tích là minh họa hai lá cạnh nhau: lá khỏe xanh mướt và lá thiếu K với mép cháy vàng rơm.
- 40% là ba dấu hiệu dạng thẻ nhỏ và một nhãn lựa chọn phân bón đặc thù.
- Biểu tượng cấm $Cl^-$ gắn trên hình ảnh sầu riêng (tránh nhão múi/sượng), củ khoai tây (tránh giảm tinh bột), lá thuốc lá (tránh cháy khét mất hương).

### SVG và Mascot
- Mascot Bé Mầm đứng góc bên phải vẻ mặt lo lắng, toát mồ hôi, chỉ que phát sáng vào viền mép lá bị cháy khô.
- Vòng zoom quang phổ mép lá hoại tử tế bào do mất cân bằng ion.

### Speaker notes — đáp án đầy đủ
Hiện tượng “đói kali” biểu hiện đặc trưng nhất ở lá già: mép lá và chóp lá bị vàng trước, sau đó lan dần vào trong và mép lá khô cháy như bị lửa sém (cháy rìa lá), phiến lá quăn queo; cây yếu, lóng ngắn, thân mềm dễ đổ ngã khi gặp gió mưa, sức đề kháng sâu bệnh và hạn rét giảm sút nghiêm trọng.
Lý do không nên bón Kali clorua (KCl) cho cây nhạy cảm với clo:
1. **Sầu riêng:** Ion $Cl^-$ tích lũy làm sầu riêng bị cháy múi, nhão cơm, giảm độ béo ngậy và hương thơm đặc trưng.
2. **Khoai tây:** Clo cản trở quá trình tổng hợp và tích lũy tinh bột trong củ, làm củ nhỏ, nhiều nước, nhão khi chế biến.
3. **Cây thuốc lá:** $Cl^-$ làm lá thuốc lá giữ nước kém, cháy khét, tàn thuốc đen và làm mất mùi thơm đặc trưng khi hút.
4. **Cà chua chất lượng cao:** Clo làm tăng áp suất thẩm thấu, giảm lượng đường và hương vị tự nhiên của quả.
Vì vậy, đối với các nhóm cây trồng đặc sản có giá trị kinh tế cao và nhạy cảm với clo, bắt buộc phải sử dụng **Kali sunfat ($K_2SO_4$)** để vừa cung cấp $K^+$ tinh khiết vừa bổ sung Lưu huỳnh ($S$) giúp tăng phẩm chất nông sản mà không gây độc hại clo.

---

## SLIDE 17 — PHÂN KALI, CÂU HỎI 4

**Câu hỏi gốc (NHÓM TÀI.txt):** *Tại sao phân kali thường được khuyến cáo sử dụng để bón thúc (đặc biệt vào giai đoạn cây chuẩn bị ra hoa, tạo hạt, phình củ, nuôi quả) thay vì bón lót toàn bộ từ đầu?*

### Chữ hiển thị
- Tiêu đề: `THỜI ĐIỂM VÀNG CHO BÓN THÚC KALI`
- Ba mốc chu kỳ sinh trưởng:
  - `🌱 CÂY NON: Nhu cầu kali thấp, chỉ cần lót nhẹ`
  - `🌸 RA HOA — TẠO NỤ: Đón đầu dòng năng lượng chuyển hóa`
  - `🍇 PHÌNH CỦ — NUÔI TRÁI: Đỉnh cao trào hấp thụ đường bột`

### Bố cục
- Biểu đồ hình quả núi (Parabol nhu cầu Kali) trải dài toàn bộ chiều ngang:
  - Chân sóng (Giai đoạn cây non): Đường nhu cầu nằm là là sát mặt đất.
  - Đỉnh sóng vọt lên dốc đứng ở giai đoạn cây trổ hoa, làm đòng, nuôi quả và phình củ.
- Trục tiến trình cây trồng biến đổi trực quan: Cây non $\rightarrow$ Ra nụ hoa $\rightarrow$ Trái non $\rightarrow$ Chùm quả chín mọng nước và củ khoai tây to tròn.

### SVG và Mascot
- Mascot Bé Mầm đứng ở đỉnh dốc parabol, hai tay bưng giỏ trái cây trĩu quả, cầm bình tưới kali đón đầu thời điểm vàng giúp quả to ngọt đậm đà.

### Speaker notes — đáp án đầy đủ
1. **Quy luật sinh lý nhu cầu dinh dưỡng của cây:**
   Ở giai đoạn đầu (cây non mọc mầm và đẻ nhánh), nhu cầu kali của cây rất thấp vì sinh khối còn nhỏ. Nhu cầu kali chỉ thực sự tăng vọt và đạt đỉnh cao nhất vào thời điểm cây bước vào giai đoạn sinh sản: chuẩn bị phân hóa mầm hoa, trổ hoa, tượng hạt, nuôi trái non và phình to củ. Lúc này, cây cần một lượng kali cực lớn để thúc đẩy dòng vận chuyển đường saccarozơ từ lá dồn về tích lũy tại quả và củ.
2. **Hiện tượng rửa trôi và cố định kali nếu bón lót toàn bộ:**
   Phân kali rất dễ tan trong nước. Nếu người nông dân bón lót toàn bộ 100% lượng kali ngay từ đầu vụ, khi cây non chưa kịp hấp thụ, các trận mưa rào hoặc nước tưới sẽ làm rửa trôi một lượng lớn ion $K^+$ xuống tầng nước ngầm hoặc bị các khoáng sét giữ chặt (hiện tượng cố định kali), gây lãng phí kinh tế rất lớn.
3. **Khuyến cáo kỹ thuật:** Bón kali phải chia làm nhiều lần và tập trung bón thúc đón đòng, bón nuôi hoa và nuôi trái (chiếm 60–70% tổng lượng kali cả vụ) để phát huy tối đa hiệu quả kinh tế.

---

## SLIDE 18 — PHÂN KALI, CÂU HỎI 5

**Câu hỏi gốc (NHÓM TÀI.txt):** *Việc lạm dụng phân kali chứa gốc clorua (KCl) lâu dài có thể làm gia tăng độ mặn của đất, ảnh hưởng ra sao đến hệ sinh thái vi sinh vật đất và cấu trúc đất (làm đất chai cứng, bí khí)?*

### Chữ hiển thị
- Tiêu đề: `HỆ LỤY LẠM DỤNG KCL: ĐẤT CHAI CỨNG & BÍ KHÍ`
- Chuỗi tác động tiêu cực:
  - `⚠️ ĐỘ MẶN VỌT CAO: Tăng chỉ số EC, cản trở rễ hút nước`
  - `🪨 KẾT CẤU CHAI CỨNG: Phá vỡ cấu trúc viên xốp, đất nén chặt bí khí`
  - `🦠 HẠI VI SINH VẬT: Mất cân bằng hệ sinh thái đất màu mỡ`

### Bố cục
- Lát cắt đối chiếu 50/50 giữa 2 trạng thái đất:
  - Nửa trái (Đất cân bằng): Màu nâu xốp, vi sinh vật và giun đất phát triển mạnh, rễ cây đâm tua tủa hút nước ngọt ngào.
  - Nửa phải (Đất ngộ độc dư thừa muối KCl): Đất bạc màu nứt nẻ, bề mặt kết tảng xi măng chai cứng, các tinh thể muối bám nghẹt quanh rễ khiến lông hút bị teo tóp (thẩm thấu ngược rút nước khỏi rễ).

### SVG và Mascot
- Mascot Bé Mầm đứng bên nửa đất chai cứng, hai tay ôm đầu toát mồ hôi, nét mặt xót xa cảnh báo hậu quả của việc lạm dụng phân bón hóa học mất cân đối.

### Speaker notes — đáp án đầy đủ
1. **Gia tăng độ mặn của đất (Hiện tượng ngộ độc muối):**
   Khi lạm dụng phân $KCl$ kéo dài vượt quá khả năng hấp thụ của cây trồng và không có đủ nước tưới rửa mặn, các ion $K^+$ và đặc biệt là ion $Cl^-$ tồn dư sẽ tích tụ lại trong dung dịch đất làm tăng vọt chỉ số dẫn điện (EC) và áp suất thẩm thấu của đất. Khi áp suất thẩm thấu của dung dịch đất cao hơn dịch bào tế bào rễ, rễ cây không những không hút được nước mà còn bị nước rút ngược từ trong rễ ra ngoài đất (hiện tượng hạn sinh lý), làm rễ cây bị cháy đen, teo tóp lông hút và cây héo úa.
2. **Phá vỡ cấu trúc đất làm đất chai cứng, bí khí:**
   Lượng ion $Cl^-$ dư thừa kết hợp với hiện tượng rửa trôi các cation kiềm canxi ($Ca^{2+}$), magie ($Mg^{2+}$) làm mất đi các cầu nối liên kết hạt keo đất. Đất mất dần kết cấu viên xốp tự nhiên, các hạt sét mịn bị nén chặt dính kết lại với nhau thành từng tảng cứng như bê tông khi khô và nhão nhoét khi ướt. Đất mất đi các khe hở chứa oxy, gây nên tình trạng **bí khí**, rễ cây không hô hấp được và bị nghẹt rễ thối rữa.
3. **Ảnh hưởng tiêu cực đến hệ vi sinh vật đất:**
   Nồng độ muối clorua quá cao gây ức chế và tiêu diệt các vi sinh vật hảo khí có lợi trong đất (như vi khuẩn cố định đạm, vi khuẩn phân giải xenlulozo), tạo điều kiện cho các loại nấm bệnh kỵ khí phát triển tấn công rễ cây.
4. **Giải pháp:** Luân phiên sử dụng $K_2SO_4$, kiểm tra định kỳ chỉ số EC của đất, kết hợp bón phân hữu cơ và tưới tiêu hợp lý để rửa trôi muối tồn dư.

### SVG
- Các chấm muối tăng dần quanh rễ khi chuyển cảnh; cây hơi héo nhưng không “chết ngay”.
- Các vi sinh vật được biểu thị bằng icon đơn giản, giảm mật độ trong khu vực stress, không tạo hình đáng sợ.

### Speaker notes — đáp án đầy đủ
Nếu bón KCl quá nhiều, đặc biệt khi đất thoát nước kém hoặc tưới tiêu không đủ để rửa muối, tổng lượng muối hòa tan và chloride trong vùng rễ có thể tăng. Áp suất thẩm thấu cao khiến rễ khó hút nước; chloride tích lũy ở mức không phù hợp có thể gây hại cho cây nhạy cảm. Độ mặn và mất cân bằng ion cũng có thể làm thay đổi hoạt động của vi sinh vật đất và chu trình dinh dưỡng. Tuy nhiên, không nên khẳng định KCl luôn làm đất chai cứng: suy giảm kết cấu đất thường liên quan mạnh tới tính chất sét, chất hữu cơ, quản lý canh tác và đặc biệt là vấn đề natri hóa ở các đất sodic. Cần xét nghiệm độ dẫn điện EC, pH, chất lượng nước, thoát nước và thành phần ion trước khi đề xuất cải tạo. Không tự động bón thạch cao nếu chưa xác định đất có vấn đề natri.

---

## SLIDE 19 — KẾT THÚC

**Tên slide:** `CẢM ƠN THẦY CÔ VÀ CÁC BẠN!`

### Chữ hiển thị
- Dòng lớn: `CẢM ƠN!`
- Dòng phụ: `Dinh dưỡng cân đối — mùa màng bền vững`
- Ba thẻ nhỏ: `N — Thân lá` · `P — Rễ, năng lượng` · `K — Nước, chất lượng`
- Dòng cuối: `Đúng chất • Đúng liều • Đúng lúc • Đúng cách`

### Bố cục
- Nền sáng, một cây khỏe ở chính giữa; lá, rễ, hoa, hạt và quả đại diện các chức năng.
- Ba vòng N/P/K quay nhẹ rồi ổn định thành bố cục cân bằng.
- Chữ `CẢM ƠN!` là điểm nhấn lớn nhất; không đặt đoạn văn hoặc thêm kiến thức mới.
- Có thể thêm dòng nhỏ `Mời thầy cô và các bạn đặt câu hỏi`.

### Speaker notes
“Qua ba nhóm phân bón, có thể thấy mỗi nguyên tố có vai trò riêng và không thể thay thế hoàn toàn cho nhau. Điều quan trọng là chọn đúng loại, đúng liều, đúng thời điểm và cách bón; đồng thời giữ gìn đất và nguồn nước. Nhóm xin cảm ơn thầy cô và các bạn đã lắng nghe.”

---

# 5. Đặc tả hành vi và hiệu ứng cho toàn bộ deck

## 5.1. Chuyển slide kiểu morph kết hợp Mascot kéo Slide (Mascot Pull Animation)

- **Cơ chế chuyển cảnh linh vật (Sprouty Drag Transition):** Khi bấm Next/Prev hoặc vuốt trên điện thoại:
  1. *Pha 1 (0–100ms):* Bé Mầm NPK lướt ra mép slide, tung dây móc neon vào cạnh slide mới.
  2. *Pha 2 (100–400ms):* Kéo slide trượt sang với gia tốc lò xo mềm mại (`cubic-bezier(0.25, 1, 0.5, 1)`), slide cũ trượt ra và mờ dần trong khi slide mới lướt êm vào tâm màn hình.
  3. *Pha 3 (400–550ms):* Bé Mầm xoay nhẹ và quay về góc phải dưới, tạo dáng chỉ tay vào tiêu đề mới.
- **Morph hình học:** Những hình cùng ý nghĩa được morph mượt mà giữa các slide: vòng N/P/K trên trang chủ đề và intro biến thành biểu tượng nguyên tố ở phần nội dung; hạt phân chuyển thành biểu đồ; rễ ở slide lân biến thành lát cắt đất.
- Không dùng quá nhiều kiểu chuyển cảnh riêng biệt như xoay 3D, flash, glitch hoặc zoom quá mạnh.
- Chỉ animate các chi tiết có ý nghĩa: đường dẫn, cột biểu đồ, mũi tên ion, cây lớn lên, vùng rễ. Công thức và đoạn chữ không bay loạn.
- Tôn trọng `prefers-reduced-motion`: thay morph và hoạt ảnh kéo dây bằng hiệu ứng fade ngắn (200ms) để bảo đảm tối ưu hiệu năng.

## 5.2. Thanh điều hướng và điều khiển thông minh

- Dưới cùng có tiến trình dạng dải mảnh: `01 / 19`.
- Nhãn phần màu theo chương: Đạm xanh lá, Lân tím, Kali vàng cam.
- Nút `Trước` và `Tiếp` tối giản, vùng bấm tối thiểu 44 × 44 px, tối ưu ngón tay cái khi cầm điện thoại xoay ngang.
- Tích hợp phím tắt: `←` / `→` (hoặc `Space`), phím `F` (bật/tắt Fullscreen), phím `N` (bật/tắt Speaker Notes drawer).
- Không đặt nút điều hướng đè vào nhãn biểu đồ hoặc nội dung quan trọng.

## 5.3. Ghi chú người nói và đáp án (Speaker Notes System)

- Mỗi slide nội dung có trường `speakerNotes` chứa đầy đủ câu trả lời học thuật, phương trình hóa học và kịch bản thuyết trình sinh động 2–3 phút.
- Mặc định không hiển thị notes trên màn chiếu lớn. Người thuyết trình có thể bấm phím `N` hoặc nút "Ghi chú" để trượt ngăn kéo Speaker Notes từ cạnh phải màn hình.
- Nội dung trả lời câu hỏi được chuẩn hóa trong `slideData.js`, liên kết trực tiếp với mã câu hỏi gốc (`questionId: 'DAM_Q1'...'KALI_Q5'`).

## 5.4. Quy tắc kiểm tra trước khi bàn giao

- [ ] Đủ đúng **19 slide** theo thứ tự: trang chủ đề, video intro React, thành viên, 15 câu hỏi, kết thúc.
- [ ] Slide 02 là intro hoạt họa thực sự chạy bằng React/SVG/CSS (16s), có tiến trình, phát lại và bỏ qua; không chỉ là ảnh tĩnh và không cần video MP4 nặng.
- [ ] Intro không tự phát âm thanh; có hỗ trợ `prefers-reduced-motion`, cleanup khi rời slide và không chạy animation chồng nhau.
- [ ] Đủ 5 câu hỏi Đạm, 5 câu hỏi Lân, 5 câu hỏi Kali; không câu nào bị bỏ; 100% đối chiếu chính xác với tài liệu nguồn `NHÓM TÀI.txt`.
- [ ] Công thức hiển thị đúng chỉ số dưới/trên: NH₄⁺, NO₃⁻, H₂PO₄⁻, HPO₄²⁻, P₂O₅, K₂O, K₂SO₄ (đã sửa dứt điểm lỗi K₂O₄ của văn bản gốc).
- [ ] Triết lý Visual-First: Chữ trên slide siêu ít (tối đa 2–3 thẻ badge/từ khóa), 100% hình vẽ SVG tự giải thích bản chất hóa học.
- [ ] Mascot "Bé Mầm NPK" hiển thị sinh động, hoạt ảnh kéo chuyển slide mượt mà, biểu cảm thay đổi đúng ngữ cảnh (đất chua, bốc khí NH₃, cháy mép lá).
- [ ] Trải nghiệm Mobile-as-Desktop: Chế độ dọc hiện màn hình nhắc xoay ngang với hoạt ảnh điện thoại xoay 90°; chế độ xoay ngang tự động scale 16:9 sắc nét, nút bấm to rộng y như máy tính.
- [ ] Các số phần trăm N, P₂O₅ và K₂O phân biệt đúng tiêu chí quy ước.
- [ ] Tên thành viên là dữ liệu có thể sửa trong file dữ liệu; không để placeholder khi xuất bản cuối.
- [ ] Không có chữ tràn khỏi thẻ, không che hình, không bị cắt ở điện thoại.
- [ ] Dùng phím mũi tên/Space được; vuốt cảm ứng được; fullscreen có fallback.
- [ ] Tắt/giảm hiệu ứng khi `prefers-reduced-motion` bật.
- [ ] Chạy kiểm tra nội dung, lỗi console, tốc độ tải và thử trình chiếu hết từ slide 1 đến 19.

---

# 6. Nguồn tham khảo để đối chiếu kiến thức

> Các nguồn dưới đây dùng để xác minh số liệu và diễn giải khoa học. Khi thuyết trình, chỉ cần ghi nguồn nhỏ ở slide có số liệu/ảnh hoặc để thành slide/tài liệu tham khảo riêng nếu giáo viên yêu cầu.

1. **FAO — Plant nutrition for food security:** thông tin về tỷ lệ nitơ của các loại phân đạm phổ biến và kiến thức quản lý dinh dưỡng.  
   https://www.fao.org/4/a0443e/a0443e.pdf
2. **FAO — Fertilizer Specifications:** giải thích cấp phân bón và cách ghi N – P₂O₅ – K₂O.  
   https://www.fao.org/agriculture/crops/thematic-sitemap/theme/spi/plantnutrition/fertspecs/en/
3. **University of Florida IFAS Extension — Understanding Fertilizers and Soil Amendments:** bảng hàm lượng dinh dưỡng điển hình trong phân bón, gồm urê, supe lân, KCl và K₂SO₄.  
   https://ask.ifas.ufl.edu/publication/AG494
4. **University of Nebraska–Lincoln Extension — Soil acidity and nitrogen transformations:** cơ chế nitrat hóa amoni sinh H⁺ và ảnh hưởng tới độ chua đất.  
   https://extensionpubs.unl.edu/publication/g1503/na/html/view
5. **USDA NRCS — Single Superphosphate:** thành phần supe lân đơn gồm monocalcium phosphate và thạch cao.  
   https://efotg.sc.egov.usda.gov/references/Public/AZ/Single_SuperPhosphate.pdf
6. **California Department of Food and Agriculture (CDFA) — Fertilization Guidelines:** sự di động thấp của lân trong đất, cách bón lân và thận trọng với phân kali chứa chloride.  
   https://www.cdfa.ca.gov/is/ffldrs/frep/FertilizationGuidelines/Annual_Crops.html
7. **University of Minnesota Extension — Potassium for crop production:** chức năng kali, biểu hiện thiếu kali và hàm lượng K₂O của KCl/K₂SO₄.  
   https://extension.umn.edu/agriculture/crop-production/nutrient-management-for-minnesota-crops/potassium-for-crop-production
8. **Nhà máy Đạm Ninh Bình — Giới thiệu chung:** thông tin công nghệ khí hóa than của nhà máy.  
   https://damninhbinh.com.vn/gioi-thieu-chung/
9. **Institute of Agricultural Science for Southern Vietnam — Tài liệu về lân nung chảy:** đặc điểm ít tan trong nước và tan trong axit citric/yếu.  
   https://iasvn.org/phan-lan-nung-chay-phan-bon-dac-biet-cua-nong-nghiep

---

# 7. Prompt bàn giao cho Antigravity / Gemini

Hãy đọc toàn bộ file Markdown này trước khi lập trình. Xây dựng một bộ slide thuyết trình chạy trực tiếp trên trình duyệt bằng **React + Vite**, đúng thứ tự và đủ 19 slide. Không tự cắt bớt câu hỏi. Không thay đáp án khoa học bằng nội dung chung chung. Hãy triển khai từng slide theo mục “Bố cục”, “Chữ hiển thị”, “SVG”, và “Speaker notes”.

**Yêu cầu bắt buộc:**
- Giao diện sáng, bắt mắt, hiện đại; hình SVG tự vẽ; không dùng layout mặc định giống trang văn bản.
- Chữ trên slide ít nhưng đáp án chi tiết phải nằm trong speaker notes hoặc vùng giải thích có thể mở.
- Bài chạy mượt trên máy tính và điện thoại; ưu tiên trình chiếu điện thoại ở chế độ ngang, có hướng dẫn nếu đang dọc.
- Điều hướng bằng bàn phím, chạm và vuốt; có fullscreen và fallback nếu khóa landscape không được hỗ trợ.
- Morph nhất quán, không lạm dụng hiệu ứng nặng; kiểm tra reduced-motion.
- Tên thành viên có thể sửa; không bịa tên thật.
- Sau khi code xong, tự chạy, tự test toàn bộ 19 slide — đặc biệt kiểm tra nhịp cảnh, nút bỏ qua/phát lại và việc dừng animation ở Slide 02 — rà lỗi tràn chữ/cắt công thức, responsive và console. Sửa lỗi trước khi bàn giao.

**Tiêu chí nghiệm thu:** bài trình chiếu phải trả lời đủ 15 câu hỏi gốc, người xem nhìn mỗi slide hiểu được một ý chính, người nói có đủ speaker notes để giải thích, và không có slide nào bị vỡ khi xem trên màn hình nhỏ.

---

# PHỤ LỤC A — BẢN ĐẶC TẢ BỐ CỤC VÀ CÁCH SẮP XẾP CHI TIẾT TỪNG SLIDE

> Phần này là bản hướng dẫn để AI/dev dựng giao diện đúng ý, không chỉ hiểu chủ đề chung. Hãy kết hợp phụ lục này với nội dung, đáp án và speaker notes của từng slide phía trên. Nếu có xung đột, giữ đúng thứ tự 19 slide và kiến thức gốc; có thể điều chỉnh khoảng cách nhỏ để bảo đảm khả năng đọc.

## A1. Lưới thiết kế dùng chung

### Khung chuẩn 16:9

- Xem mỗi slide như một sân khấu 16:9, khung tham chiếu `1600 × 900`. Không thiết kế như một trang web cuộn dọc.
- Vùng an toàn nội dung: cách mép trái/phải tối thiểu `64 px`; cách mép trên `42 px`; cách mép dưới `48 px`. Không đặt tiêu đề, công thức hay nhãn biểu đồ trong vùng sát cạnh.
- Dải tiêu đề: từ `y = 42–150`. Tiêu đề căn trái là mặc định; tiêu đề dài tối đa 2 dòng. Nhãn chương nhỏ đặt phía trên tiêu đề, không để hai nhãn cạnh tranh độ nổi bật.
- Vùng nội dung chính: từ `y = 170–800`. Dải chân trang: `y = 830–870`, chỉ dành cho số trang/tiến trình hoặc nguồn ngắn khi thực sự cần.
- Dùng đơn vị tương đối theo khung slide: 1% chiều rộng = 16 px và 1% chiều cao = 9 px trên khung chuẩn. Với màn hình thật, scale đồng đều hoặc điều chỉnh grid; không đặt từng thành phần bằng `position:absolute` độc lập khiến chúng chồng lấn.
- Grid cơ bản: khoảng cách giữa các cột `24–32 px`; khoảng cách giữa các thẻ `16–22 px`; lề trong thẻ `22–28 px`; bo góc `20–26 px`. Chỉ dùng bóng nhẹ ở các thẻ quan trọng, không tạo quá nhiều lớp card lồng nhau.
- Nội dung có thứ bậc rõ: **(1) tiêu đề/câu hỏi, (2) kết luận chính, (3) hình hoặc biểu đồ, (4) bằng chứng/công thức ngắn, (5) số slide**. Không để icon hoặc trang trí lớn hơn kết luận chính.
- Chỉ dùng 1 tiêu đề chính trên mỗi slide. Không lặp nguyên câu hỏi dài thành tiêu đề rồi lại lặp toàn bộ trong một card khác.
- Mỗi slide nội dung nên có: một nhãn chương `PHÂN ĐẠM / PHÂN LÂN / PHÂN KALI`, một tiêu đề ngắn, một minh họa trung tâm, tối đa 3 nhóm ý và một câu chốt. Toàn bộ giải thích dài để trong `speakerNotes`.

### Quy chuẩn chữ và tương phản

- Trên khung `1600 × 900`: tiêu đề `42–54 px`; dòng kết luận chính `28–34 px`; tiêu đề thẻ `22–26 px`; nội dung thẻ `19–23 px`; nhãn biểu đồ/công thức `20–24 px`; chân trang tối thiểu `16 px`.
- Nếu bố cục không đủ chỗ, rút ngắn dòng hiển thị và chuyển phần diễn giải sang notes; **không** thu nhỏ toàn bộ chữ dưới ngưỡng dễ đọc để nhét thêm thông tin.
- Nền sáng `#F6FAFF` hoặc trắng; chữ chính `#17243A`. Màu Đạm `#36B86A`, Lân `#8C6BFA`, Kali `#FFB547`. Trên nền vàng/cam phải dùng chữ xanh đen, không dùng chữ trắng nhạt.
- Có thể dùng mảng gradient nhẹ phía sau minh họa nhưng vùng đặt chữ phải sạch. Không dùng nền có hạt, đường kẻ hoặc lá trang trí dày ở sau câu chữ.
- Công thức hóa học phải dùng chỉ số dưới/trên chuẩn. Trước khi xuất bản, kiểm tra font tiếng Việt và ký hiệu hóa học trên Windows/Chrome, không để công thức xuống dòng giữa cụm.

### Khung nội dung chung cho slide 04–18

1. **Nhãn chương:** góc trên trái, dạng viên nhỏ cao khoảng 28–34 px; màu theo chương.
2. **Tiêu đề:** ngay dưới nhãn, căn trái, chiếm tối đa 70% chiều rộng nếu có hình trang trí bên phải.
3. **Khu vực chính:** bắt đầu khoảng `y = 190`, kết thúc trước `y = 790`.
4. **Câu chốt:** nếu slide cần kết luận, đặt ở dải dưới khu vực chính; không biến câu chốt thành một đoạn văn dài.
5. **Điều hướng:** số trang `04 / 19` hoặc tiến trình mảnh ở cạnh đáy; không dùng thanh điều hướng dày chiếm diện tích trình bày.

### Responsive: máy tính, điện thoại ngang và dọc

- **Máy tính:** giữ bố cục theo phần trăm; nội dung chính ở giữa sân khấu. Với màn 1366 × 768, ưu tiên rút khoảng trống/trang trí trước, không cắt chân trang hoặc hạ chữ quá nhỏ.
- **Điện thoại xoay ngang:** kiểm tra cả `844 × 390` và `915 × 412`. Giữ nguyên ý đồ bố cục hai cột nếu còn đủ chỗ; nếu không, chuyển thành cột `60/40` hoặc hình ở trên, nội dung ở dưới theo thứ tự đọc. Tiêu đề thường `clamp(22px, 3.5vw, 34px)`, nội dung chính không thấp hơn khoảng `16–18 px` trên thiết bị thật.
- **Điện thoại dọc:** hiện lớp gợi ý nhẹ `Xoay ngang để xem slide rõ hơn`, có nút `Tiếp tục ở chế độ dọc`. Nếu tiếp tục dọc, xếp lần lượt tiêu đề → kết luận → minh họa → các nhãn/so sánh; cho phép cuộn nội dung bên trong slide chỉ trong chế độ này, không cắt mất thông tin.
- Không bắt buộc xoay thiết bị bằng CSS. Chỉ thử `screen.orientation.lock('landscape')` sau hành động người dùng và nếu trình duyệt cho phép; nếu thất bại, giao diện vẫn hoạt động bình thường.
- Nút điều hướng chạm tối thiểu `44 × 44 px`, đặt xa nội dung. Hỗ trợ phím mũi tên/Space trên máy tính và vuốt ngang trên điện thoại.

## A2. Bố cục chính xác từng slide

### SLIDE 01 — Trang chủ đề / bìa

**Sơ đồ phân vùng:** trái `54%` — phải `46%`.

- **Trái (x 6–56%, y 13–83%):** xếp theo trục dọc: nhãn môn học ở y≈18%; tiêu đề `PHÂN BÓN VÔ CƠ` ở y≈29–43%; dòng `PHÂN ĐẠM • PHÂN LÂN • PHÂN KALI` ở y≈47%; slogan ở y≈56%; thông tin nhóm/lớp ở y≈68%; nút `KHÁM PHÁ CHỦ ĐỀ →` ở y≈76%. Khoảng cách giữa tiêu đề và dòng chủ đề nhỏ hơn khoảng cách giữa các cụm lớn.
- **Phải (x 56–96%, y 8–90%):** minh họa SVG cây non với thân/lá phía trên mặt đất và bộ rễ bên dưới. Ba vòng N/P/K bao quanh cây thành tam giác mềm: N trái trên, P phải trên, K phía dưới; không đặt vòng tròn che tiêu đề hoặc vùng rễ.
- **Nền:** nền xanh trắng sạch, một vùng glow xanh lá/xanh dương rất nhạt sau cây. Không tạo viền khung bao quanh cả slide.
- **Điểm nhìn đầu tiên:** tiêu đề; thứ hai là cây và rễ; thứ ba là nút bắt đầu. Đảm bảo nút nổi nhưng không giống quảng cáo.
- **Chuyển động:** lá mở nhẹ, ba vòng nguyên tố lần lượt hiện ra. Không chạy intro tự động tại trang này; chỉ bắt đầu intro khi bấm nút hoặc phím đi tiếp.

### SLIDE 02 — Video intro dựng bằng React

**Sơ đồ phân vùng:** sân khấu toàn màn hình; hình chiếm `75–80%`, chữ `20–25%`.

- **0–2 giây:** lát cắt đất chiếm `y 58–100%`; hạt giống nằm chính giữa ở khoảng `x 50%, y 62%`. Dòng dẫn nhỏ nằm `x 50%, y 18%`, căn giữa.
- **2–5 giây:** rễ phát triển từ hạt giống xuống phần đất. Các chấm ion xuất hiện quanh rễ, chuyển động chậm theo đường cong; không đặt nhãn đè lên gốc cây.
- **5–8 giây:** ba vòng N/P/K bố trí quanh cây, tạo tam giác cân: N ở góc trái trên, P ở góc phải trên, K ở gần đáy chính giữa. Dưới mỗi ký hiệu có một nhãn ngắn, chỉ hiện đúng lúc vòng xuất hiện.
- **8–11 giây:** cây trở thành hình trung tâm chiếm khoảng 35–45% chiều cao; rễ vẫn hiện rõ. Dùng morph cùng một hình cây từ cây nhỏ thành cây lớn, không cắt cảnh giật.
- **11–15 giây:** các vòng hội tụ quanh cây; câu hỏi `BÓN THẾ NÀO ĐỂ CÂY KHỎE, ĐẤT BỀN?` ở giữa dưới vùng tán cây; nút `BẮT ĐẦU TÌM HIỂU →` nằm thấp hơn câu hỏi tối thiểu 20 px.
- **Điều khiển:** góc trên phải có `Bỏ qua intro`; cạnh đáy có thanh tiến trình mảnh; góc dưới phải có `Phát lại` sau khi kết thúc. Nút điều khiển không che cây hoặc câu hỏi.
- **Chuyển tiếp:** bấm `BẮT ĐẦU TÌM HIỂU` đưa thẳng sang Slide 03. Không tự chuyển khi `autoAdvanceAfterIntro=false`.

### SLIDE 03 — Thành viên

**Sơ đồ phân vùng:** header `12–18%` chiều cao; lưới thành viên `70–74%`; chân trang `8%`.

- **Header:** nhãn `NHÓM THỰC HIỆN` nhỏ trên cùng; tiêu đề `NHỮNG MẢNH GHÉP CỦA NHÓM` căn trái ở x≈6%, y≈9–16%. Minh họa lá/kính lúp nhỏ phía trên bên phải, không quá 10% khung.
- **Lưới chính:** từ x≈6–94%, y≈23–88%, chia **3 cột × 3 hàng**. Mỗi thẻ rộng khoảng 28%, cao khoảng 18% khung; khoảng cách ngang/dọc đủ tách biệt. Giữ chiều cao đồng nhất cho cả 9 thẻ.
- **Trong mỗi thẻ:** số thứ tự/avatar SVG ở góc trên trái; tên thành viên nổi bật ngay dưới hoặc bên cạnh avatar; nhiệm vụ đặt dòng dưới, tối đa hai dòng trên desktop và một đến hai dòng trên mobile ngang. Không để nhiệm vụ đẩy tên xuống thấp.
- **Màu:** thẻ trắng, đường viền rất nhạt; một chi tiết nhỏ xanh/tím/vàng luân phiên để nhóm trông đa dạng nhưng thống nhất. Không gán màu chương cho từng thành viên theo cách gây hiểu nhầm về vai trò.
- **Chuyển động:** các thẻ lần lượt xuất hiện theo hàng, khoảng cách 60–80 ms. Không vẽ dây nối chằng chịt giữa các thẻ.

### SLIDE 04 — Đạm Câu 1: khái niệm và vai trò N

**Sơ đồ phân vùng:** minh họa cây bên trái `43%`, nội dung ba tác dụng bên phải `51%`, phần còn lại là lề.

- Tiêu đề ở trên trái; nhãn `PHÂN ĐẠM` nhỏ phía trên tiêu đề.
- Cây khỏe và lá vàng do thiếu đạm nằm trong một vùng minh họa lớn ở x≈6–46%, y≈26–78%. Đặt nhãn `ĐỦ N` và `THIẾU N` ngay dưới hai cụm, không chồng lên lá.
- Bên phải chia thành 3 thẻ ngang xếp dọc: `Diệp lục`, `Protein`, `Sinh trưởng thân lá`. Icon SVG nằm trái mỗi thẻ; tiêu đề và mô tả ngắn nằm phải.
- Chốt `Thiếu N → lá nhạt màu, cây chậm lớn` đặt thành dải mảnh ở đáy vùng nội dung, không chiếm toàn chiều rộng bằng khung màu gắt.
- Màu xanh lá chỉ dùng cho chữ/đường dẫn quan trọng; phần nền vẫn trắng xanh.

### SLIDE 05 — Đạm Câu 2: so sánh %N

**Sơ đồ phân vùng:** biểu đồ chiếm `68–72%`, thẻ kết luận chiếm `24–27%`.

- Tiêu đề trên cùng; đơn vị `% khối lượng nitơ` đặt ngay phía trên biểu đồ.
- Biểu đồ thanh ngang bắt đầu tại x≈7%, kết thúc x≈73%, chạy từ y≈27–75%. Bốn hàng cách đều; nhãn hóa chất ở đầu hàng, thanh màu ở giữa, phần trăm in ngoài đầu thanh.
- Thứ tự từ cao đến thấp: urê 46%, NH₄Cl 26%, (NH₄)₂SO₄ 21%, NaNO₃ 16%. Dùng cùng một thang chiều dài tối đa 50%, không tự chuẩn hóa từng thanh.
- Bên phải x≈76–94% có một thẻ kết luận lớn `URÊ 46% N` và hình túi phân SVG nhỏ. Không đưa thêm đoạn giải thích dài vào thẻ.
- Kết thúc reveal bằng đường viền nhẹ quanh thanh Urê. Màu xanh đậm nhất cho Urê, các thanh còn lại dùng biến thể nhạt hơn; số phần trăm phải luôn đọc được không phụ thuộc màu.

### SLIDE 06 — Đạm Câu 3: amoni, đất chua và đất vôi

**Sơ đồ phân vùng:** hai vùng so sánh ngang `44% / 44%`, ngăn bằng khoảng trắng.

- Tiêu đề toàn chiều rộng phía trên.
- **Cột trái — ĐẤT CHUA:** lát cắt đất tím/nâu nhạt ở giữa; ion NH₄⁺ và H⁺ nằm gần rễ; phía dưới có kết luận `Có thể góp phần làm đất chua dần`.
- **Cột phải — ĐẤT VÔI / pH CAO:** lớp đất be; minh họa cân bằng `NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O`; một vài ký hiệu NH₃ bay lên. Kết luận `Nguy cơ thất thoát N dưới dạng NH₃`.
- Phương trình đặt trong dải vàng nhạt ngang gần đáy, không dùng toàn bộ slide nền vàng.
- Câu cảnh báo `Không trộn trực tiếp phân đạm amoni với vôi` ở đáy dải, chữ đậm vừa phải; tránh biểu tượng cảnh báo quá lớn.

### SLIDE 07 — Đạm Câu 4: nguồn nguyên liệu và nhà máy Việt Nam

**Sơ đồ phân vùng:** bản đồ `40%` phía trên-trái, thông tin nhà máy `55%` phía trên-phải, chuỗi quy trình toàn chiều rộng phía dưới.

- Tiêu đề căn trái trên cùng.
- Bản đồ Việt Nam tối giản ở x≈5–42%, y≈24–63%; đánh dấu vị trí tương đối của Phú Mỹ, Cà Mau, Ninh Bình bằng chấm và nhãn ngắn. Không cần tọa độ quá chi tiết nếu không xác minh được.
- Phía phải có 3 hàng thông tin gọn: tên nhà máy đậm, nguồn nguyên liệu bên dưới (`khí thiên nhiên` hoặc `khí hóa than`). Mỗi hàng dùng một icon nhà máy nhỏ, không dùng ba ảnh chụp rời làm nền.
- Phía dưới y≈68–84% có chuỗi 4 nút nối mũi tên: `Nguyên liệu → NH₃ → Urê → Nông nghiệp`. Nút cuối có icon cây trồng.
- Câu đóng góp kinh tế đặt ở dải đáy, tối đa một dòng. Nếu đưa ảnh thật nhà máy vào, chỉ đặt một ảnh phụ nhỏ trong vùng phải và vẫn giữ sơ đồ làm nội dung chính.

### SLIDE 08 — Đạm Câu 5: phục hồi đất và bón hợp lý

**Sơ đồ phân vùng:** đất so sánh ở giữa `45–50%`, bốn thẻ giải pháp chia xung quanh.

- Tiêu đề nằm trên cùng; câu chốt `Cân đối N–P–K, không lạm dụng riêng N` có thể ở góc phải phía trên vùng nội dung.
- Minh họa trung tâm là lát cắt đất chia đôi: bên trái đất suy thoái/chua (ít mùn, rễ thưa); bên phải đất được quản lý tốt (cấu trúc viên, rễ khỏe). Gắn nhãn `TRƯỚC` và `QUẢN LÝ TỐT`, không gọi là “sau 1 ngày”.
- Bốn giải pháp bố trí quanh hình: trên trái `Kiểm tra pH/dinh dưỡng`; trên phải `Bón vôi khi cần`; dưới trái `Bổ sung hữu cơ/phân xanh`; dưới phải `Chia lần bón, đúng liều`. Mỗi giải pháp chỉ 1 icon và 1–2 dòng.
- Không xếp 4 thẻ thành vòng tròn chặt quanh cây nếu sẽ che mất lát cắt đất; ưu tiên grid 2 × 2 hai bên.
- Chân slide có nhãn nhỏ `ĐẤT • CÂY • PHÂN • NƯỚC` theo thứ tự, như checklist.

### SLIDE 09 — Lân Câu 1: vai trò của P

**Sơ đồ phân vùng:** cây/rễ trung tâm `50%`, ba điểm giải thích chia hai bên.

- Tiêu đề và nhãn `PHÂN LÂN` ở vùng header.
- Cây con chiếm x≈34–66%, từ y≈25–83%; đường mặt đất nằm ngang khoảng y≈53%, rễ ở dưới đường mặt đất và phải lớn đủ để nhìn thấy.
- Bên trái trên là thẻ `Rễ phát triển`; bên phải trên là `ATP/ADP — năng lượng`; bên phải dưới là `Hoa và hạt`. Các thẻ nối tới vùng tương ứng bằng đường cong mảnh.
- Nhãn ion `H₂PO₄⁻ / HPO₄²⁻` đặt trong một pill nhỏ gần vùng rễ, không rải công thức khắp đất.
- Các chấm P di chuyển rất ngắn về phía rễ, nhấn vào tính di động thấp; không tạo cảm giác ion tự bay rất xa trong đất.

### SLIDE 10 — Lân Câu 2: supe lân đơn và kép

**Sơ đồ phân vùng:** hai thẻ so sánh song song, mỗi thẻ `42%` chiều rộng; dải tiêu chuẩn/biểu đồ phía dưới.

- Tiêu đề phía trên; dưới tiêu đề có câu định chuẩn `Độ dinh dưỡng thường ghi theo % P₂O₅ hữu hiệu` trên một dòng.
- Thẻ trái là `SUPE LÂN ĐƠN`: icon hạt phân/phễu; công thức `Ca(H₂PO₄)₂ + CaSO₄`; thanh `16–20% P₂O₅` ở đáy thẻ.
- Thẻ phải là `SUPE LÂN KÉP`: icon hạt phân cô đặc; nhãn `Chủ yếu Ca(H₂PO₄)₂`; thanh `40–50% P₂O₅` cùng trục tỷ lệ với thanh bên trái.
- Chốt `Supe lân kép cô đặc hơn, ít thạch cao hơn` nằm dưới hai thẻ, không nằm trong một hộp thứ ba lớn.
- Màu tím dùng làm điểm nhấn. Nếu số liệu hiển thị là khoảng, phải viết dấu gạch nối rõ ràng, không biến thành một con số chính xác giả tạo.

### SLIDE 11 — Lân Câu 3: lân nung chảy và supe lân

**Sơ đồ phân vùng:** so sánh hai nửa `46% / 46%`; dải đối chiếu môi trường ở dưới.

- Tiêu đề dài được chia tối đa 2 dòng; cỡ chữ nhỏ hơn các tiêu đề ngắn khác một chút nhưng vẫn rõ.
- Nửa trái `SUPE LÂN`: hạt phân bên cạnh cốc nước; một phần hạt tan, các chấm phosphate đi vào nước. Nhãn phụ `Có dạng phosphate dễ tan`.
- Nửa phải `LÂN NUNG CHẢY`: hạt khoáng cạnh giọt nước vẫn gần nguyên; phía dưới minh họa rễ cạnh vùng axit yếu, một vài ion P thoát ra. Nhãn phụ `Ít tan trong nước; hòa tan tốt hơn trong môi trường axit yếu`.
- Một vòng tròn zoom nhỏ quanh điểm tiếp xúc rễ–hạt được đặt ở phía dưới-phải, không chiếm quá 20% diện tích.
- Dải đáy so sánh bằng hai cụm `NƯỚC` và `VÙNG RỄ AXIT YẾU`, ngăn nhau bằng mũi tên nhẹ; không viết đoạn mô tả dài.

### SLIDE 12 — Lân Câu 4: vì sao thường bón lót

**Sơ đồ phân vùng:** timeline trên `22%`, lát cắt đất dưới `65%`.

- Tiêu đề phía trên; dưới tiêu đề là ba bước ngang `Bón lót → Rễ non phát triển → Hấp thụ P gần vùng rễ`.
- Lát cắt đất chiếm phần lớn phía dưới; chia hai nửa bằng một đường phân cách mảnh. Trái: phân lân đặt gần vùng rễ non, rễ tập trung quanh hạt phân. Phải: vùng P xa rễ, mũi tên ngắn biểu thị di chuyển hạn chế.
- Nhãn ở góc trái-dưới `P ít di động trong đất`; nhãn góc phải-dưới `Một phần P có thể bị giữ/cố định`.
- Minh họa không ngụ ý bón lân xa rễ là luôn vô ích hay mọi loại lân đều khó tan. Có ghi chú nhỏ `Cách bón phụ thuộc loại phân, cây và đất`.

### SLIDE 13 — Lân Câu 5: quặng apatit và sản xuất

**Sơ đồ phân vùng:** bản đồ/tài nguyên bên trái `36%`, quy trình bên phải `60%`, dải thách thức phía dưới.

- Header chứa tiêu đề `TỪ QUẶNG APATIT ĐẾN PHÂN LÂN`.
- Bên trái, bản đồ miền Bắc/Việt Nam giản lược với vị trí Lào Cai được đánh dấu rõ, dưới bản đồ là hình minh họa lớp quặng apatit.
- Bên phải, sơ đồ 4 bước xếp ngang hoặc dọc tùy không gian: `Quặng → Chế biến → Phân lân → Cây trồng`. Mỗi bước có hình SVG đơn giản, mũi tên thống nhất.
- Nhãn nhà máy `Lâm Thao`, `Văn Điển`, `Ninh Bình` đặt thành 3 pill bên dưới sơ đồ quy trình; không cắm 3 nhãn lên bản đồ nếu vị trí không liên quan chính xác.
- Dải đáy chia 3 thẻ nhỏ `Tài nguyên hữu hạn`, `Bụi/nước thải`, `Phục hồi đất`. Dùng màu cảnh báo dịu, không dùng đỏ gắt phủ toàn bộ khu vực.

### SLIDE 14 — Kali Câu 1: vai trò của K

**Sơ đồ phân vùng:** lá và khí khổng ở giữa `40%`, bốn tác dụng ở xung quanh.

- Tiêu đề trên cùng; ký hiệu `K⁺` là điểm nhấn phụ, đặt gần lá nhưng nhỏ hơn tiêu đề.
- Minh họa lá chiếm vùng giữa x≈36–64%, y≈28–70%; một vòng zoom khí khổng nằm gần góc phải của lá, có đường nối về bề mặt lá.
- Bốn nhánh thông tin: góc trên trái `Điều tiết khí khổng`; trên phải `Hoạt hóa enzyme`; dưới trái `Vận chuyển đường`; dưới phải `Tăng sức chống chịu`. Mỗi nhánh có icon và một dòng giải thích, nối bằng đường mảnh.
- Dưới cùng là câu chốt `K giúp cây điều hòa nước và vận chuyển chất hữu cơ hiệu quả hơn` trên một dải thoáng.
- Màu vàng cam dùng cho điểm nhấn; các vùng chữ vẫn có nền sáng và chữ tối tương phản cao.

### SLIDE 15 — Kali Câu 2: KCl và K₂SO₄

**Sơ đồ phân vùng:** hai thẻ sản phẩm song song, dải so sánh K₂O ở giữa-dưới, kết luận ở đáy.

- Tiêu đề và dòng `Độ dinh dưỡng thường ghi theo % K₂O quy đổi` ở trên.
- Thẻ trái: `KALI CLORUA (KCl)`, hình cụm tinh thể/hạt, nhãn `60–62% K₂O`, `tan tốt`, `có Cl⁻`. Thẻ phải: `KALI SUNFAT (K₂SO₄)`, hình hạt tương tự, nhãn `50–52% K₂O`, `cung cấp S`, `ít clo`.
- Dùng hai thanh ngang cùng thang tối đa 65% để so sánh hàm lượng; đừng dùng hai thang khác nhau hoặc chiều dài trang trí không tương ứng số liệu.
- Icon Cl⁻ chỉ đặt trong thẻ KCl; icon S chỉ đặt trong thẻ K₂SO₄. Không tô màu hạt phân thành bằng chứng về chất lượng.
- Dưới cùng có câu chốt `Chọn phân theo cây trồng, đất và chất lượng nông sản`.

### SLIDE 16 — Kali Câu 3: dấu hiệu thiếu kali

**Sơ đồ phân vùng:** lá so sánh `58–62%`, bảng dấu hiệu/lựa chọn phân `34–38%`.

- Bên trái có hai lá kích thước lớn đặt ngang: lá khỏe màu xanh và lá thiếu K với mép vàng/nâu. Vòng zoom thể hiện ranh giới vùng vàng–cháy, không tô vàng cả lá.
- Bên phải xếp dọc 3 dấu hiệu: `Mép lá vàng rồi cháy`, `Thân yếu/dễ đổ`, `Chất lượng quả/hạt giảm`. Mỗi dấu hiệu chỉ có một dòng mô tả.
- Dưới ba dấu hiệu là một thẻ lựa chọn `Cây nhạy clo → cân nhắc K₂SO₄ theo khuyến cáo`, có phân biệt đây là khuyến nghị tùy cây/đất, không phải quy tắc tuyệt đối.
- Đừng thêm ảnh bệnh cây gây sốc. Minh họa SVG khoa học, đủ rõ nhưng thân thiện môi trường học đường.

### SLIDE 17 — Kali Câu 4: thời điểm bón

**Sơ đồ phân vùng:** timeline chiếm toàn bộ chiều ngang, `x 7–93%`, `y 32–70%`.

- Tiêu đề ở trên; câu dẫn một dòng dưới tiêu đề: `Nhu cầu K thay đổi theo cây trồng và giai đoạn sinh trưởng`.
- Timeline gồm 4 mốc có khoảng cách bằng nhau: `Cây non` → `Ra hoa` → `Tạo hạt / lớn củ / nuôi quả` → `Thu hoạch`. Minh họa cây/quả tương ứng nằm trên đường timeline, label nằm dưới mốc.
- Một dải màu K xuất hiện ở giai đoạn cần minh họa bón thúc, nhưng dùng nhãn `Ví dụ minh họa — không phải lịch bón chung` để tránh diễn đạt quy tắc tuyệt đối.
- Dưới timeline có thẻ kết luận rộng `Bón thúc hoặc chia lần khi phù hợp giúp cung cấp K đúng giai đoạn`; dưới nữa là ghi chú nhỏ `Bón lót một phần vẫn có thể phù hợp tùy cây và đất`.
- Animation chỉ tăng kích thước quả/củ nhẹ qua từng mốc; không làm hình lớn che nhãn.

### SLIDE 18 — Kali Câu 5: lạm dụng KCl và đất

**Sơ đồ phân vùng:** lát cắt đất trước/sau so sánh `66%`, dải chuỗi nguyên nhân `17%`, ba giải pháp `17%`.

- Header có tiêu đề ngắn. Lưu ý: nếu dùng tiêu đề dài, chia thành hai dòng nhưng không đẩy phần đất xuống dưới vùng nhìn thấy.
- Lát cắt đất lớn ở giữa chia 50/50: trái `ĐẤT CÂN BẰNG`, rễ và dòng nước bình thường; phải `NGUY CƠ TÍCH LŨY MUỐI`, các chấm ion tập trung quanh rễ, mũi tên nước ít hơn/chậm hơn.
- Trên hoặc dưới lát cắt đặt chuỗi ba nút: `Bón quá mức + thoát nước kém → muối/Cl⁻ tích lũy → rễ khó hút nước, vi sinh vật chịu stress`.
- Chân vùng nội dung có ba hành động dạng pill: `Kiểm tra EC/pH`, `Điều chỉnh lượng bón`, `Cải thiện thoát nước`. Để EC/pH chữ rõ; không khẳng định chỉ pH là đủ chẩn đoán độ mặn.
- Cảnh báo về đất chai cứng nằm trong một note nhỏ, chữ có tương phản tốt nhưng không chiếm vai trò hình ảnh chính: `Đất chai cứng không phải hệ quả tự động của KCl; cần xét natri, kết cấu và thoát nước.`

### SLIDE 19 — Kết thúc

**Sơ đồ phân vùng:** bố cục trung tâm cân đối; chữ ở nửa trái/giữa, cây ở giữa-phải.

- Dòng `CẢM ƠN!` là chữ lớn nhất, đặt khoảng x≈14–55%, y≈30–45%. Dòng phụ `Dinh dưỡng cân đối — mùa màng bền vững` nằm ngay dưới.
- Minh họa cây khỏe chiếm x≈54–86%, y≈18–80%, có rễ, lá, hoa/quả gợi ba vai trò N–P–K. Không cho hình cây che chữ `CẢM ƠN!`.
- Ba nhãn N/P/K ở gần đáy, xếp ngang: `N — Thân lá`, `P — Rễ & năng lượng`, `K — Nước & chất lượng`. Đặt cùng kích thước và cùng độ nổi bật.
- Dòng `Đúng chất • Đúng liều • Đúng lúc • Đúng cách` ở gần đáy, trên thanh nền trong suốt nhẹ. `Mời thầy cô và các bạn đặt câu hỏi` có thể là dòng phụ nhỏ hơn.
- Kết thúc bằng vòng N/P/K hội tụ rồi dừng, không lặp vô hạn. Không tự chuyển về slide đầu.

## A3. Quy tắc bàn giao layout cho developer

- Đưa các cấu trúc lặp như nhãn chương, header, progress, card, chart, timeline thành component dùng chung; không copy-paste toàn bộ layout 19 lần.
- Dữ liệu slide nên khai báo riêng: `eyebrow`, `title`, `mainTakeaway`, `contentBlocks`, `illustrationKey`, `speakerNotes`, `sectionColor`. Giữ nội dung và vị trí trình bày tách nhau để dễ điều chỉnh.
- Các sơ đồ SVG cần có `viewBox` riêng và `preserveAspectRatio="xMidYMid meet"`; không bóp méo tỷ lệ khi co màn hình. SVG phải có `aria-label` hoặc `title` phù hợp nếu mang thông tin; SVG trang trí thì `aria-hidden="true"`.
- Ưu tiên CSS Grid/Flexbox; chỉ dùng absolute positioning bên trong sân khấu minh họa khi thật sự cần. Phần chữ phải nằm trong flow layout để reflow được trên thiết bị nhỏ.
- Ở mỗi slide, xác định `readingOrder` tương ứng thứ tự người xem cần đọc; khi chuyển sang màn hình hẹp, DOM/accessibility order vẫn là tiêu đề → câu chốt → hình → chi tiết, không theo vị trí ngẫu nhiên.
- Kiểm tra tất cả 19 slide ở cả chế độ fit-to-screen và chế độ điện thoại dọc. Không được xem việc “hiển thị vừa màn hình” là hoàn thành nếu chữ quá nhỏ hoặc người xem phải phóng to thủ công để đọc.

## A4. Checklist nghiệm thu bố cục

- [ ] 19 slide đúng thứ tự: chủ đề → intro React → thành viên → 15 câu hỏi → kết thúc.
- [ ] Mỗi slide có một điểm nhìn chính; không có 3–4 tiêu đề ngang hàng.
- [ ] Chữ không đè lên SVG, đường nối không xuyên qua chữ, nhãn biểu đồ không cắt mất đơn vị.
- [ ] Khoảng cách, bo góc, kích thước thẻ và màu sắc nhất quán trên toàn deck.
- [ ] Bốn thanh biểu đồ %N dùng chung thang đo; hai thanh %P₂O₅ và %K₂O cũng so sánh đúng đơn vị đã ghi.
- [ ] Hình đất có đường mặt đất dễ nhận biết; rễ nằm dưới đất, thân/lá nằm phía trên.
- [ ] Công thức hóa học, nhãn ion và số phần trăm không bị cắt trên điện thoại ngang.
- [ ] Slide 03 đủ 9 thẻ, ba cột ba hàng trên desktop; khi màn hình hẹp, có thể chuyển 2 cột hoặc 1 cột mà không làm mất thứ tự thành viên.
- [ ] Slide 02 có thể bỏ qua/phát lại; khi rời slide thì animation và listener được dọn sạch.
- [ ] Không có chữ hay biểu đồ quan trọng đặt sát mép; mọi nút bấm dễ chạm, không che nội dung.

---

# PHỤ LỤC B — HỢP ĐỒNG TRIỂN KHAI CHO AI AGENT (BẮT BUỘC ĐỌC)

Phụ lục này biến ý tưởng trong brief thành quy trình thi công có thể kiểm tra. AI không được hiểu brief như gợi ý tham khảo; đây là tiêu chuẩn nghiệm thu của dự án. Nếu có xung đột giữa một hiệu ứng trang trí và độ đọc/độ chính xác, ưu tiên theo thứ tự: **đúng kiến thức → đúng thứ tự/đủ nội dung → đọc rõ → responsive → hiệu năng → hiệu ứng**.

## B1. Thứ tự làm việc không được bỏ qua

1. Đọc hết `Ke_hoach_slide_Phan_Dam_Lan_Kali.md` và tài liệu gốc `NHÓM TÀI.txt` trong workspace. Đếm đúng 15 câu hỏi: Đạm 1–5, Lân 1–5, Kali 1–5.
2. Tạo bảng đối chiếu `Câu hỏi gốc → slide → câu chốt → speaker notes → nguồn kiểm tra`. Không lập trình trước khi bảng này có đủ 15 dòng.
3. Kiểm tra môi trường: Node.js/npm, cấu trúc repo, lệnh hiện có, thư viện đã cài và script test. Không ghi đè file hiện hữu trước khi đọc chúng.
4. Lập plan triển khai ngắn: data model, shell trình chiếu, intro timeline, hệ thống SVG, responsive và QA. Nêu các giả định trong file `IMPLEMENTATION_NOTES.md`; không tự bịa tên thành viên/giáo viên/lớp.
5. Xây nền trình chiếu và design tokens trước. Sau đó hoàn thành từng chương theo N → P → K; cuối cùng mới tinh chỉnh morph, Mascot kéo slide và chi tiết trang trí.
6. Chạy ứng dụng thật, đi hết 19 slide theo cả bàn phím và thao tác chạm; kiểm tra console, tràn chữ, công thức, intro pause/replay/skip và màn hình nhỏ. Sửa các lỗi tìm được rồi chạy lại.
7. Bàn giao bằng báo cáo ngắn: file đã tạo/sửa, lệnh chạy, lệnh test, các test đã thực sự chạy, lỗi chưa xử lý và cách mở trình chiếu. Không tuyên bố “đã test” nếu chưa chạy lệnh/không kiểm tra trình duyệt.

## B2. Definition of Done

Dự án chỉ được xem là hoàn thành khi tất cả điều sau đúng:

- [ ] Có đúng **19 slide**: 01 chủ đề, 02 motion-video intro React, 03 thành viên, 04–18 là 15 câu hỏi, 19 kết thúc.
- [ ] Mỗi câu hỏi trong tài liệu gốc `NHÓM TÀI.txt` được trả lời; không gộp hai câu thành một slide, không lược phần so sánh/phương trình/nguyên liệu/tác động được hỏi.
- [ ] Triết lý Visual-First: Mỗi slide chỉ giữ tiêu đề và tối đa 2–3 thẻ badge/từ khóa then chốt; 100% hình vẽ SVG tự giải thích bản chất hóa học; phần giải thích dài nằm ở speaker notes.
- [ ] Mascot Bé Mầm NPK xuất hiện tương tác, có hoạt ảnh kéo trượt chuyển slide độc đáo, biểu cảm thay đổi theo ngữ cảnh slide.
- [ ] Slide 02 thật sự là timeline hoạt họa thực hiện bằng React + SVG/CSS (16s). “Video intro” ở đây có nghĩa là trải nghiệm motion-graphic được dựng trong app, có nút Replay/Skip.
- [ ] Thành viên là dữ liệu có thể chỉnh sửa, 9 vị trí mặc định, không tự tạo tên người thật.
- [ ] Tất cả biểu đồ có nhãn, đơn vị, thang đo hợp lý; số liệu được đối chiếu với tài liệu phù hợp và có chú thích khi là giá trị điển hình/xấp xỉ.
- [ ] Có điều hướng bàn phím, nút chạm, vuốt ngang, fullscreen có fallback, progress indicator và chỉ báo slide hiện tại.
- [ ] Trải nghiệm Mobile-as-Desktop: Điện thoại dọc có overlay thông minh nhắc xoay ngang kèm nút kích hoạt toàn màn hình; điện thoại xoay ngang hiển thị 16:9 sắc nét, nút bấm to rộng y như máy tính.
- [ ] `prefers-reduced-motion` được tôn trọng; các listener/animation/timer được cleanup khi đổi slide/unmount.
- [ ] Có kiểm tra cho tràn chữ/công thức và các màn hình mục tiêu; không có lỗi console nghiêm trọng.
- [ ] `npm run build` chạy thành công. Nếu dự án có test/lint thì chúng được chạy; nếu chưa có thì ghi rõ, không bịa kết quả.
- [ ] Có README tiếng Việt hướng dẫn `npm install`, `npm run dev`, `npm run build`, `npm run preview` và trình chiếu.

## B3. Các hành vi AI không được làm

- Không kết thúc sau khi chỉ viết plan; sau plan phải triển khai trong repo nếu quyền truy cập cho phép.
- Không dựng một trang landing page duy nhất rồi gọi đó là slide deck.
- Không làm 19 slide bằng một mẫu card giống nhau chỉ đổi tiêu đề/màu; mỗi slide có layout riêng phù hợp với loại thông tin.
- Không dùng emoji hoặc icon thư viện thay cho toàn bộ minh họa khoa học chính.
- Không dùng ảnh SVG/ảnh stock để thay cho biểu đồ số liệu khi có dữ liệu định lượng.
- Không làm chữ nhỏ để “nhét cho đủ”; nếu chật phải rút gọn màn hình, chuyển giải thích xuống notes hoặc điều chỉnh layout.
- Không làm auto-advance tất cả slide; chỉ cho intro tùy chọn tự kết thúc và mặc định cần người xem bấm tiếp.
- Không cố ép xoay ngang bằng transform cả trang theo cách khiến chữ quay nghiêng hoặc điều khiển sai.
- Không thêm dependency nặng chỉ để thực hiện một hiệu ứng đơn giản.
- Không tự khẳng định một nhà máy, địa điểm, giá trị hóa học, ảnh hoặc nguồn là chính thức khi chưa kiểm tra.

---

# PHỤ LỤC C — DESIGN SYSTEM CHI TIẾT

## C1. Canvas, vùng an toàn và grid

- Canvas logic: `1600 × 900`, tỷ lệ 16:9. Responsive theo khung chứa, không khóa kích thước pixel thực.
- Vùng an toàn: 5% mỗi cạnh (xấp xỉ 80 px trên canvas chuẩn); tiêu đề không vượt x=80–1520, nội dung quan trọng không xuống dưới y=820 vì khu vực này dành cho progress/controls.
- Header: cao khoảng 12–16% canvas. Footer/slide progress: 3–5%. Vùng làm việc chính: khoảng y=160–800.
- Grid desktop: 12 cột logic, gutter khoảng 20–28 px, cạnh trong card 24–32 px. Không cần tạo 12 DOM columns cho mọi slide; đây là hệ đo để giữ alignment.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 px. Tránh padding tùy ý khác nhau giữa card tương tự.
- Border radius: pill 999 px; card lớn 24 px; card nhỏ 16–20 px; input/button 12–16 px.
- Viền mặc định 1 px `rgba(25,45,70,.09)`; shadow tán mềm và ngắn. Không đặt shadow dày quanh mọi card.

## C2. Token màu và vai trò

```css
:root {
  --canvas: #F6FAFF;
  --surface: #FFFFFF;
  --ink: #17243A;
  --muted: #5E6B7D;
  --line: rgba(23, 36, 58, 0.10);
  --nitrogen: #36B86A;
  --nitrogen-soft: #E8F8EE;
  --phosphorus: #8C6BFA;
  --phosphorus-soft: #F0EBFF;
  --potassium: #FFB547;
  --potassium-soft: #FFF3DA;
  --blue: #2F80ED;
  --coral: #FF6B7A;
  --soil: #8A654A;
  --soil-dark: #594235;
  --success: #20854A;
  --warning: #9C5B00;
  --focus: #145DCE;
}
```

Nguyên tắc áp dụng:

- Màu chương biểu thị loại dinh dưỡng xuyên suốt: Đạm/N xanh, Lân/P tím, Kali/K vàng cam.
- Vàng cam dùng làm điểm nhấn, không dùng làm nền lớn cho chữ trắng. Chữ trên nền nhạt luôn dùng `--ink` hoặc màu tối đạt tương phản.
- Màu không phải cách duy nhất để truyền đạt trạng thái: luôn đi cùng nhãn `N`, `P`, `K`, icon hoặc mô tả.
- Trạng thái cảnh báo chỉ dùng ở vị trí cần lưu ý; tránh phủ đỏ hoặc cam cả slide để không tạo cảm giác nguy hiểm quá mức.

## C3. Kiểu chữ và thang kích cỡ

Kích thước bên dưới tham chiếu canvas 1600×900; nếu dùng `clamp()`, chọn giá trị tương ứng và thử ở viewport thật.

| Vai trò | Desktop canvas | Gợi ý CSS | Quy định |
|---|---:|---|---|
| Eyebrow/nhãn chương | 16–20 px | `clamp(0.75rem, 1.2vw, 1.125rem)` | Chữ hoa vừa phải, tracking nhẹ |
| Tiêu đề slide | 38–52 px | `clamp(1.55rem, 3.2vw, 3.25rem)` | Tối đa 2 dòng trong hầu hết slide |
| Số liệu/hàm lượng lớn | 44–68 px | `clamp(2rem, 4.2vw, 4.25rem)` | Dùng tabular numbers |
| Câu chốt | 25–31 px | `clamp(1.05rem, 1.9vw, 1.95rem)` | Phải hiểu được khi đọc riêng |
| Nội dung card | 22–27 px | `clamp(0.95rem, 1.45vw, 1.7rem)` | Câu ngắn, thường 1–2 dòng |
| Nhãn biểu đồ | 19–23 px | `clamp(0.82rem, 1.2vw, 1.4rem)` | Không thấp hơn mức đọc được khi trình chiếu |
| Caption/nguồn | 14–17 px | `clamp(0.72rem, 0.9vw, 1rem)` | Chỉ dùng cho nguồn/ghi chú phụ |

Không giải quyết bố cục chật bằng cách giảm toàn bộ font-size dưới mức trên. Trước tiên hãy bỏ chữ trùng lặp, chuyển giải thích xuống notes, sắp xếp lại lưới hoặc chia cụm.

## C4. Component visual language

- `ChapterLabel`: pill có ký hiệu chương và màu chương.
- `SlideHeading`: eyebrow + title + một câu lead tối đa 1 dòng.
- `TakeawayBar`: thẻ kết luận đơn giản, không dùng gradient bão hòa.
- `MetricCard`: số lớn + đơn vị + nhãn rõ, không đặt con số cạnh màu trang trí dễ gây nhầm.
- `FormulaPanel`: công thức căn giữa với font hỗ trợ chỉ số trên/dưới; cần có `aria-label`/text equivalent.
- `ChartFrame`: tiêu đề, đơn vị, biểu đồ và ghi chú nguồn; trục/thang đo bắt buộc với so sánh định lượng.
- `DiagramNode` + `Connector`: đường nối không được che nhãn; mũi tên luôn có hướng rõ.
- `SpeakerNotesPanel`: mặc định chỉ hiện trong chế độ diễn tập, không nằm trong khung nội dung chính thức.
- `SlideProgress`: số trang `NN / 19` và một thanh tiến độ tinh tế; vùng bấm cho controls >=44×44 CSS px.

---

# PHỤ LỤC D — BẢN ĐỒ TỌA ĐỘ BỐ CỤC CHO 19 SLIDE

Các tỷ lệ x/y bên dưới là vị trí tương đối trong canvas 16:9 (x=0% bên trái, y=0% phía trên). Dùng như bản vẽ định hướng, không phải yêu cầu hard-code toàn bộ thành `position:absolute`. Tiêu đề/header và nội dung chữ nên ở normal flow; chỉ dùng tọa độ tuyệt đối bên trong minh họa nếu thật cần.

| Slide | Vùng tiêu đề | Vùng nội dung chính | Vùng kết luận/điều hướng | Điểm nhìn phải nổi bật |
|---:|---|---|---|---|
| 01 Chủ đề | x 6–54%, y 12–27% | Chữ x 6–55%, y 28–68%; SVG x 57–94%, y 10–85% | Nhóm/lớp y 88%; CTA x 6–29%, y 70–80% | Cụm chữ “PHÂN BÓN VÔ CƠ” và cây N/P/K |
| 02 Intro | Chỉ có caption ngắn ở vùng y 12–24% | Cây/đất x 10–90%, y 17–82%; vòng N/P/K x 25–78% | timeline/progress sát y 90%; skip ở góc trên phải | Cây mọc từ hạt, N/P/K hội tụ |
| 03 Thành viên | x 6–94%, y 6–15% | Lưới 3×3 x 6–94%, y 20–85% | Progress y 94% | 9 tên/nhiệm vụ dễ quét bằng mắt |
| 04 Đạm-1 | x 6–94%, y 6–16% | Cây x 7–43%; ba card x 49–94%, y 24–76% | Chốt y 82–90% | Cây khỏe/thiếu N và “N” |
| 05 Đạm-2 | x 6–94%, y 6–16% | Bar chart x 7–72%, y 22–78%; takeaway x 75–94% | Nguồn/ghi chú dưới chart | 46% Urê và thang %N chung |
| 06 Đạm-3 | x 6–94%, y 6–16% | Đất chua x 6–47%; đất vôi x 53–94%, y 22–76% | Công thức ở x 20–80%, y 79–90% | NH₄⁺ → NH₃ và phân biệt hai môi trường |
| 07 Đạm-4 | x 6–94%, y 6–16% | Bản đồ x 6–34%; quy trình x 38–94%, y 22–70% | Đóng góp kinh tế ở y 76–90% | Nguyên liệu → NH₃ → urê |
| 08 Đạm-5 | x 6–94%, y 6–16% | Lát cắt đất x 30–70%, y 27–74%; 4 giải pháp xung quanh | Checklist đất–cây–phân–nước ở y 82–90% | Đất được quản lý tốt và 4 hành động |
| 09 Lân-1 | x 6–94%, y 6–16% | Cây/rễ x 30–70%, y 20–78%; 3 nhãn xung quanh | Chốt ATP/ADP ở y 82–90% | Bộ rễ và ion phosphate |
| 10 Lân-2 | x 6–94%, y 6–16% | Hai card x 6–47% và 53–94%, y 22–74% | Thanh %P₂O₅ ở y 76–87% | Đơn so với kép theo cùng đơn vị |
| 11 Lân-3 | x 6–94%, y 6–16% | Supe lân x 7–46%; lân nung chảy x 54–93%, y 22–77% | Ghi chú tính tan ở y 80–90% | Khác biệt độ tan/thành phần |
| 12 Lân-4 | x 6–94%, y 6–16% | Timeline x 8–92%, y 23–40%; đất/rễ x 8–92%, y 44–78% | Câu chốt ở y 82–90% | Phân lân gần vùng rễ phù hợp |
| 13 Lân-5 | x 6–94%, y 6–16% | Bản đồ/quặng x 6–38%; quy trình x 42–94%, y 22–72% | 3 thách thức ở y 77–90% | Apatit → chế biến → phân lân |
| 14 Kali-1 | x 6–94%, y 6–16% | Lá x 35–65%, y 25–74%; bốn callouts ở bốn góc | Chốt điều hòa nước ở y 82–90% | Khí khổng và K⁺ |
| 15 Kali-2 | x 6–94%, y 6–16% | Thẻ KCl x 6–47%; K₂SO₄ x 53–94%, y 22–74% | Bar %K₂O ở y 76–88% | 60–62% so với 50–52% K₂O |
| 16 Kali-3 | x 6–94%, y 6–16% | Lá x 6–60%; triệu chứng/lựa chọn x 64–94%, y 22–79% | Gợi ý cây nhạy clo ở y 82–90% | Mép lá vàng/cháy |
| 17 Kali-4 | x 6–94%, y 6–16% | Timeline x 7–93%, y 26–74% | Chốt “theo cây và đất” ở y 81–90% | Giai đoạn cần K, không lịch cứng cho mọi cây |
| 18 Kali-5 | x 6–94%, y 6–16% | Hai lát cắt đất x 6–94%, y 22–68% | Chuỗi nguyên nhân/giải pháp y 70–90% | Muối quanh rễ và dòng nước |
| 19 Kết thúc | Text x 12–54%, y 29–60% | Cây x 55–90%, y 18–81% | Ba nhãn N/P/K, dòng cuối y 78–90% | “CẢM ƠN!” và cây khỏe |

## D1. Trình tự thị giác bắt buộc cho slide 04–18

Người xem phải quét theo một trật tự ổn định:

1. **Nhận diện chương** (pill ĐẠM/LÂN/KALI).
2. **Đọc tiêu đề/câu hỏi rút gọn**.
3. **Thấy minh họa trung tâm hoặc số liệu chủ chốt**.
4. **Đọc 2–3 nhãn giải nghĩa**.
5. **Nhận câu chốt** ở vùng chân nội dung.

Không đặt nguồn, số slide, điều khiển và thông tin quan trọng cùng tranh vị trí nổi bật. Nếu slide đang có hai điểm nhấn lớn, giảm độ nổi của một điểm.

## D2. Thứ tự z-layer

- Layer 0: nền/mảng màu trang trí.
- Layer 1: minh họa môi trường (đất, lá, map, card nền).
- Layer 2: sơ đồ, mũi tên, số liệu và nhãn.
- Layer 3: tiêu đề/câu chốt/chú giải quan trọng.
- Layer 4: điều khiển trình chiếu/focus state.

Connector không được đi qua chữ; nếu giao nhau, tự route đường nối, lùi connector ra sau và thêm nền mờ nhỏ sau label nếu cần. Tránh blur lớn làm nhòe văn bản.

---

# PHỤ LỤC E — KIẾN TRÚC REACT, DATA MODEL VÀ ĐIỀU HƯỚNG

## E1. Cấu trúc thư mục mục tiêu

```text
project-root/
├── .agents/
│   ├── AGENTS.md
│   └── skills/                 # các skill chuyên biệt cho Antigravity
├── public/
│   └── assets/                 # chỉ chứa ảnh/nguồn đã chọn và được phép sử dụng
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── slideRegistry.js
│   │   └── presentationState.js
│   ├── data/
│   │   ├── slides.js
│   │   ├── members.js
│   │   └── sources.js
│   ├── components/
│   │   ├── PresentationShell.jsx
│   │   ├── SlideViewport.jsx
│   │   ├── SlideControls.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── ChapterBadge.jsx
│   │   ├── SpeakerNotes.jsx
│   │   └── diagrams/
│   ├── slides/
│   │   ├── Slide01Topic.jsx
│   │   ├── Slide02Intro.jsx
│   │   ├── Slide03Members.jsx
│   │   ├── Slide04Nitrogen01.jsx
│   │   ├── ...
│   │   └── Slide19Closing.jsx
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── presentation.css
│   │   └── motion.css
│   └── main.jsx
├── tests/
│   ├── navigation.spec.js
│   ├── intro.spec.js
│   ├── slide-content.spec.js
│   └── responsive.spec.js
├── README.md
└── package.json
```

Có thể thay đổi cách tổ chức khi repo hiện hữu cần cấu trúc khác, nhưng phải giữ các ranh giới: **data/nội dung tách khỏi component, shell điều khiển tách khỏi slide, SVG độc lập, notes tách khỏi màn hình chính**. Không tạo 19 component rời rạc có cùng code lặp hoàn toàn.

## E2. Schema dữ liệu gợi ý

```js
/** @typedef {'topic'|'intro'|'members'|'nitrogen'|'phosphorus'|'potassium'|'closing'} Chapter */

/**
 * @typedef {Object} SlideRecord
 * @property {string} id             // ổn định: slide-01 ... slide-19
 * @property {number} order           // 1..19
 * @property {string} title
 * @property {string} eyebrow
 * @property {Chapter} chapter
 * @property {string} takeaway
 * @property {string[]} visibleBullets // tối đa 3 nhóm ý
 * @property {string} illustrationKey
 * @property {string} speakerNotes
 * @property {string[]} sourceIds
 * @property {boolean} allowIntroControls
 */
```

Yêu cầu dữ liệu:

- Thứ tự render lấy từ một registry duy nhất; không để đánh số slide thủ công ở nhiều file dễ lệch.
- Công thức/đơn vị lưu thành text có thể truy cập; tránh render nội dung quan trọng chỉ bằng vector không có text equivalent.
- Số liệu dùng trong biểu đồ nằm trong data object; scale được tính từ data với min/max minh bạch. Không hard-code chiều dài thanh riêng rồi để khác số liệu.
- Danh sách thành viên phải nằm trong `members.js`, trường `name`, `role`, `avatarVariant`; placeholder thể hiện rõ đang cần thay.
- `speakerNotes` được giữ đủ nội dung, có thể dài hơn slide; không lặp nguyên đoạn notes lên canvas chính.
- `sourceIds` chỉ trỏ tới nguồn đã được kiểm tra; nếu chưa xác minh thì đánh dấu `needsVerification: true` trong data/notes, không giả tạo link.

## E3. Điều hướng và trạng thái

- State tối thiểu: `activeSlideIndex`, `isFullscreen`, `isNotesOpen`, `introStatus`, `introProgress`, `isPortraitHintDismissed`.
- Chặn index ra ngoài `[0, 18]`; bàn phím không can thiệp nếu focus đang ở input, textarea, button điều khiển form hoặc element nhập liệu.
- Phím: `ArrowRight`, `PageDown`, `Space` đi tiếp; `ArrowLeft`, `PageUp` lùi; `Home` về đầu; `End` đến cuối; `Escape` thoát fullscreen/đóng overlay. Tránh bắt phím Space làm cuộn trang khi đang trình chiếu.
- Swipe: chỉ nhận gesture ngang có chủ đích, không đổi slide khi người dùng đang cuộn dọc/đang tương tác với nút. Dùng ngưỡng khoảng 48–64 px, bỏ qua khi chuyển động dọc lớn hơn.
- Fullscreen: gọi API từ thao tác người dùng; xử lý Promise reject. Nếu không hỗ trợ, tiếp tục ở khung fit-to-screen với thông báo nhẹ.
- Orientation lock: chỉ thử sau thao tác người dùng và chỉ nếu hỗ trợ; luôn có fallback. Không phụ thuộc orientation lock để ứng dụng chạy.
- Hash/history là tùy chọn; nếu triển khai, back/forward của trình duyệt phải hành xử hợp lý, không phá điều hướng bàn phím.

---

# PHỤ LỤC F — INTRO MOTION-GRAPHIC: STATE MACHINE VÀ TIMELINE

## F1. Mô hình trạng thái

`idle → playing → finished`; có thể từ `playing` chuyển sang `paused`, `skipped`, hoặc `cancelled` khi rời slide. `replay` phải reset toàn bộ tiến trình về 0, đặt `sceneIndex=0` và tạo đúng một lịch chạy.

- `idle`: cảnh đầu hiện rõ, nút Play/Start hiện.
- `playing`: timeline tăng; nút Skip luôn có thể bấm.
- `paused`: tiến trình không tăng; Resume tiếp tục từ vị trí hiện tại.
- `finished`: nút “BẮT ĐẦU TÌM HIỂU” hiện; không tự lặp.
- `skipped`: dừng animation ngay, chuyển tới trạng thái kết thúc hoặc sang slide 03 theo thao tác người dùng.
- `cancelled`: rời slide; cleanup `requestAnimationFrame`, timeout, listener và observer.

## F2. Cue sheet cụ thể

| Thời gian | Thành phần bắt đầu | Chuyển động | Chữ | Chuyển sang cảnh tiếp |
|---|---|---|---|---|
| 0.0–1.5s | Dải đất + hạt giống | Hạt rơi theo đường cong, chạm đất, nảy nhẹ một lần | `MỌI SỰ SỐNG BẮT ĐẦU TỪ DINH DƯỠNG` | Hạt chìm xuống, đất mở vùng rễ |
| 1.5–4.0s | Hệ rễ | Các đường rễ được reveal bằng stroke-dashoffset; chấm dinh dưỡng đi chậm tới rễ | Không thêm câu mới; giữ câu đầu fading out | Thân mọc lên ở tâm |
| 4.0–6.8s | Thân và lá | Thân cao lên, hai lá mở theo scale/rotate nhỏ | `N — THÂN LÁ` xuất hiện gần N | Lá ổn định, vòng P/K nhập cảnh |
| 6.8–9.2s | Ba vòng N/P/K | Vòng vào theo đường cong riêng, dừng tại vị trí cố định; không quay liên tục | `P — RỄ & NĂNG LƯỢNG` / `K — NƯỚC & CHỐNG CHỊU` | Vòng và cây hợp thành composition |
| 9.2–11.7s | Cây trưởng thành | Mở thêm nhánh/lá hoặc quả nhỏ; rễ vẫn hiển thị | `BA NGUYÊN TỐ — BA VAI TRÒ BỔ SUNG` | Camera không zoom quá lớn |
| 11.7–14.5s | Câu hỏi cuối + CTA | Mọi vật thể dừng; CTA fade/slide vào 8 px | `BÓN THẾ NÀO ĐỂ CÂY KHỎE, ĐẤT BỀN?` | Chờ người xem bấm tiếp |

Thời lượng có thể giảm xuống ~8 giây trên thiết bị/tình huống cần nhanh, nhưng không làm tốc độ chữ quá nhanh. Không phụ thuộc timeouts chồng chéo. Nếu chuyển scene theo progress, dùng một timeline duy nhất và derive scene từ progress.

## F3. Tiêu chuẩn motion

- Easing ưu tiên `cubic-bezier(.22, 1, .36, 1)` cho entrance; `ease-in-out` cho vòng chuyển vị trí; tránh bounce nặng.
- Entrance distance 8–24 px; không bay từ ngoài viewport qua toàn màn hình nếu không có lý do.
- Morph chỉ dùng khi hai trạng thái có điểm tương đồng hình học/ý nghĩa. Nếu không, dùng fade + translate nhẹ; không giả lập morph vụng bằng scale cả slide.
- Hạn chế animation đồng thời: một cảnh tối đa 2–3 nhóm chuyển động có ý nghĩa.
- Không animate `width/height/top/left` cho hàng trăm nodes nếu có thể dùng `transform` và `opacity`.
- `prefers-reduced-motion`: tắt transform dài, đổi cảnh bằng fade <=120–180 ms hoặc cảnh tĩnh; nút skip vẫn hoạt động.
- Dọn `requestAnimationFrame` id, timeout, event listeners, ResizeObserver/IntersectionObserver trong cleanup.
- Tab/visibility: nếu document ẩn, có thể pause timeline; khi quay lại, không chạy bù gây nhảy cảnh.

---

# PHỤ LỤC G — RESPONSIVE THỰC TẾ VÀ KIỂM SOÁT KHUNG TRÌNH CHIẾU

## G1. Breakpoints đề xuất

Dùng breakpoints làm điểm khởi đầu, điều chỉnh theo nội dung thực tế:

```css
.presentation-shell { width: 100%; min-height: 100dvh; }
.slide-stage {
  width: min(100vw, calc(100dvh * 16 / 9));
  aspect-ratio: 16 / 9;
  margin-inline: auto;
  overflow: hidden;
}

@media (max-width: 1100px) { /* tablet / cửa sổ hẹp */ }
@media (max-width: 760px)  { /* điện thoại / panel hẹp */ }
@media (max-width: 760px) and (orientation: landscape) { /* điện thoại ngang */ }
@media (max-width: 760px) and (orientation: portrait) { /* gợi ý xoay ngang */ }
@media (prefers-reduced-motion: reduce) { /* motion rút gọn */ }
```

Đây chỉ là khung định hướng. Không dùng `width:min(100vw, calc(100dvh * 16 / 9))` một mình trong mọi trường hợp nếu thanh điều hướng chiếm viewport; phải tính `availableHeight` hoặc dùng container có chiều cao xác định để không bị cắt đáy.

## G2. Desktop

- 16:9 ở giữa cửa sổ, controls nằm ngoài canvas hoặc trong safe area cố định.
- Khi cửa sổ ngắn, scale toàn canvas theo chiều cao và giữ 16:9; không làm tràn dọc.
- Controls hiển thị rõ nhưng không cướp điểm nhìn; `hover` chỉ là bổ trợ, mọi chức năng phải dùng keyboard/touch được.

## G3. Điện thoại xoay ngang

- Ưu tiên canvas chiếm phần lớn viewport với controls có chiều cao tiết kiệm.
- Header có thể giảm thành nhãn chương + tiêu đề gọn; không giảm nội dung cần thiết dưới mức đọc được.
- Slide 03: dùng 3 cột khi còn đủ rộng; nếu không, 2 cột có scroll trong slide chỉ khi thật cần, giữ trật tự 9 thành viên và tránh đưa cả slide ra ngoài canvas.
- Slide biểu đồ: ưu tiên nhãn bên trái, bar ở giữa, số liệu bên phải; không để số liệu trôi lên thanh nav.
- Nút điều khiển chạm nên >=44×44 px; nếu cần, đặt control row ngoài canvas với safe-area padding.

## G4. Điện thoại dọc

Có hai chế độ rõ ràng:

1. **Chế độ khuyến nghị:** lớp hướng dẫn gọn “Xoay ngang để xem slide rõ hơn”, icon xoay điện thoại dạng SVG, nút `Tiếp tục ở chế độ dọc`.
2. **Chế độ dọc thực sự:** nếu người dùng tiếp tục, bố cục chuyển thành reflow dọc — tiêu đề, hình, nội dung theo thứ tự đọc; không chỉ thu nhỏ canvas 16:9 đến mức chữ không đọc được. Có thể cho cuộn trong từng trang nếu cần, nhưng điều hướng phải phân biệt cuộn nội dung với vuốt đổi slide.

Không bắt buộc rotate lock. Nếu browser không hỗ trợ, app vẫn đầy đủ chức năng.

## G5. Safe areas và browser chrome

- Dùng `100dvh` khi phù hợp, có fallback `100vh`.
- Khi fullscreen đổi trạng thái, tính lại dimensions; lắng nghe resize/orientationchange với debounce hoặc `ResizeObserver` có cleanup.
- Thêm `padding-bottom: env(safe-area-inset-bottom)` cho thiết bị có vùng safe area.
- Kiểm tra thanh địa chỉ mobile thu/phóng không làm controls trôi khỏi màn hình.

---

# PHỤ LỤC H — NGHIÊN CỨU, NGUỒN, HÌNH ẢNH VÀ ĐỘ TIN CẬY

## H1. Quy tắc phân biệt ba lớp thông tin

- **Yêu cầu từ đề:** 15 câu hỏi trong tài liệu nhóm; đây là danh sách bài phải trả lời.
- **Kiến thức dùng để trả lời:** giải thích hoá học/nông học, số liệu thành phần, phản ứng và hướng dẫn bón; cần nguồn phù hợp hoặc xác định rõ là kiến thức phổ thông.
- **Thông tin bổ sung/hiện hành:** tên doanh nghiệp/nhà máy, công nghệ sản xuất, địa điểm, số liệu thương mại, khuyến cáo canh tác hoặc ảnh thực tế; cần kiểm tra trên nguồn hiện hành trước khi đưa vào slide.

Không tự thay đổi câu hỏi gốc hoặc âm thầm mở rộng kết luận thành khẳng định tuyệt đối. Khi nguồn không đủ hỗ trợ một con số, chuyển thành khoảng giá trị có nhãn “thường gặp/xấp xỉ” hoặc bỏ số liệu chính xác và ghi chú cần xác minh.

## H2. Quy trình xác minh

1. Lấy số liệu/claim cần kiểm tra và viết thành một câu đơn.
2. Ưu tiên cơ quan nhà nước, tổ chức nông nghiệp, trường đại học/extension, tiêu chuẩn sản phẩm và tài liệu kỹ thuật của nhà sản xuất có uy tín.
3. Kiểm tra ngày xuất bản/cập nhật, đối tượng áp dụng, điều kiện và đơn vị.
4. Đối chiếu ít nhất hai nguồn khi claim nhạy cảm, có khả năng thay đổi hoặc ảnh hưởng mạnh đến kết luận.
5. Ghi source ID + URL + claim được hỗ trợ trong `sources.js` hoặc `sources.md`.
6. Nếu nguồn mâu thuẫn, nói rõ phạm vi khác nhau (ví dụ hàm lượng theo cấp sản phẩm/tiêu chuẩn khác nhau) thay vì chọn số lớn nhất.

## H3. Hình ảnh và SVG

- Dùng SVG do dự án tự dựng cho cây, rễ, ion, cấu trúc hạt, mũi tên, biểu đồ và sơ đồ quy trình.
- Ảnh thật chỉ cần ở các nội dung mà tính chân thực đem lại ích lợi như nhà máy/quặng; dùng ảnh có nguồn rõ ràng, giấy phép phù hợp, ghi credit nhỏ.
- Không dùng ảnh thật của cơ sở sản xuất rồi gắn nhãn nhầm sang cơ sở khác.
- Không tạo sơ đồ bản đồ với marker sai vị trí địa lý. Nếu không chắc tọa độ, thể hiện vị trí tỉnh dạng sơ đồ, không đặt pin quá chính xác.
- Khi không có ảnh được xác minh, dùng illustration SVG trung tính chứ không để AI bịa ảnh và chú thích như ảnh thật.

## H4. Hạn chế khoa học phải giữ trong bài

- Các tỷ lệ 46/26/21/16% N là giá trị làm tròn thường dùng để học và so sánh; phải ghi rõ `% khối lượng N`, không trộn với % P₂O₅ hoặc % K₂O.
- Phân lân thương mại thường ghi theo P₂O₅ hữu hiệu; phân kali thường ghi theo K₂O quy đổi. Đây là hệ quy đổi nhãn dinh dưỡng, không phải phần trăm nguyên tố P hay K thuần.
- Đất chua hoá do đạm phụ thuộc nguồn đạm, chu trình N, cây trồng và quản lý; không nói mọi phân đạm tạo cùng một mức axit.
- “Bón lót” và “bón thúc” phụ thuộc đất, cây, thời vụ, loại phân và khuyến cáo kỹ thuật; tránh từ “luôn luôn/tuyệt đối”.
- Lân nung chảy ít tan trong nước, nhưng khả năng hoà tan/phát huy hiệu quả phụ thuộc môi trường đất và đặc tính sản phẩm; không mô tả là “không tan trong mọi điều kiện”.
- KCl không luôn gây hại. Cần xét cây nhạy với chloride, hàm lượng dùng, nước tưới, độ mặn và thoát nước.
- KCl không tự động khiến mọi đất bị chai cứng. Cấu trúc đất, natri, chất hữu cơ và thoát nước là các yếu tố quan trọng cần đánh giá.

---

# PHỤ LỤC I — QA, KIỂM THỬ VÀ NGHIỆM THU THỰC TẾ

## I1. Bảng test tối thiểu

| ID | Hạng mục | Cách test | Kết quả đạt |
|---|---|---|---|
| NAV-01 | Tiến/lùi | ArrowRight/Left, Space, PageDown/PageUp | Chuyển đúng 1 slide mỗi lần; không tăng gấp đôi |
| NAV-02 | Biên đầu/cuối | Home, End, bấm Trước/Tiếp tại slide 1/19 | Không xuất hiện index ngoài dải |
| NAV-03 | Focus | Dùng Tab/Enter trên controls | Focus nhìn rõ; không bị listener phím phá input |
| INTRO-01 | Chạy intro | Mở slide 02 và quan sát timeline | Đủ các cảnh, không giật/nháy; chữ xuất hiện đúng nhịp |
| INTRO-02 | Skip | Bấm Bỏ qua ở giữa intro | Timeline dừng ngay; trạng thái kết thúc ổn định |
| INTRO-03 | Replay | Bấm phát lại sau khi kết thúc | Tiến trình về đầu; chỉ một animation chạy |
| INTRO-04 | Rời/ quay lại | Đổi sang slide 03 khi intro đang chạy rồi quay lại | Không có timer/RAF cũ chạy chồng |
| INTRO-05 | Reduced motion | Bật hệ điều hành “Reduce motion” | Cảnh tĩnh/fade ngắn; vẫn dùng được controls |
| CONTENT-01 | Slide count | Inspect slide registry/UI | Có 19 slide và đúng tiêu đề/order |
| CONTENT-02 | Đủ câu hỏi | Đối chiếu bảng mapping 15 dòng | Mỗi câu xuất hiện một lần, có notes |
| CONTENT-03 | Công thức | Kiểm tra NH₄⁺, NH₃, H₂PO₄⁻, HPO₄²⁻, P₂O₅, K₂O, KCl, K₂SO₄ | Chỉ số đúng, không vỡ hàng/cắt cạnh |
| CHART-01 | %N | So sánh chiều dài bar và value | Thang đo chung 0–50% hoặc hợp lý; urê cao nhất |
| CHART-02 | P/K | Đọc đơn vị và scale | P₂O₅ tách K₂O; không dùng cùng scale khi khác đơn vị mà không giải thích |
| RESP-01 | Desktop 1920×1080 | Chạy deck hết | Không tràn/canvas không méo |
| RESP-02 | Laptop 1366×768 | Chạy deck hết | Controls và footer vẫn nhìn thấy |
| RESP-03 | Mobile landscape 844×390 và 915×412 | Chạy deck, bấm tất cả controls | Chữ đọc được; controls đủ lớn; không bị thanh browser che |
| RESP-04 | Mobile portrait 390×844 | Mở deck và tiếp tục ở portrait | Hiện hint; nút tiếp tục hoạt động; layout không thu nhỏ thành chữ li ti |
| RESP-05 | Orientation change | Đang ở slide nội dung, xoay máy | Không lỗi layout/ mất state |
| A11Y-01 | Contrast | Kiểm tra chữ trên nền pastel/ vàng | Chữ tối rõ; không dựa riêng vào màu để phân biệt |
| A11Y-02 | SVG labels | Duyệt bằng accessibility tree nếu có | SVG thông tin có title/aria-label hoặc text alternative |
| BUILD-01 | Production build | `npm run build` | Exit code 0; không có lỗi build |
| BUILD-02 | Console | DevTools khi duyệt deck | Không có exception, key warning nghiêm trọng hoặc asset 404 |

## I2. Các lệnh đề xuất

Chỉ dùng lệnh có thật trong `package.json`; nếu dự án mới, cấu hình scripts tương ứng.

```bash
npm install
npm run dev
npm run build
npm run preview
```

Nếu repo có Playwright/Vitest/ESLint đã cấu hình thì chạy scripts hiện có. Không thêm browser test nặng nếu chỉ cần một vài kiểm tra cơ bản; nhưng bắt buộc test tay trình chiếu trên kích thước thật ít nhất một vòng.

## I3. Báo cáo nghiệm thu AI phải viết

```text
DELIVERABLE SUMMARY
- Slides: 19/19 (đã đối chiếu hay chưa)
- Question coverage: 15/15 (kèm mapping)
- Build: PASS/FAIL (lệnh đã chạy)
- Unit/e2e tests: PASS/FAIL/NOT CONFIGURED (nêu lệnh)
- Responsive: desktop / mobile landscape / portrait (đã kiểm tra bằng gì)
- Intro: play / replay / skip / cleanup / reduced-motion
- Known issues: ...
- Start: npm install && npm run dev
```

Không được ghi PASS khi chưa thực hiện. Nếu không có thiết bị điện thoại thật, nêu rõ đã kiểm tra bằng viewport emulation hay chưa có điều kiện test thật.

---

# PHỤ LỤC J — CÀI BỘ SKILL CHO ANTIGRAVITY

Bộ kỹ năng đi kèm được tách thành các skill nhỏ, thay vì một tệp khổng lồ. Mỗi skill có `SKILL.md` riêng và hướng dẫn rõ tình huống kích hoạt. Gói skill gồm:

1. `npk-presentation-director` — đọc brief, bảo toàn 15 câu hỏi, điều phối plan → build → QA → bàn giao.
2. `visual-slide-composition` — hierarchy, grid, spacing, typography, bố cục không lặp khuôn.
3. `react-presentation-engine` — kiến trúc React/Vite, data registry, điều hướng, speaker notes và trạng thái.
4. `svg-infographic-studio` — sơ đồ khoa học, biểu đồ đúng tỷ lệ, SVG semantic và dễ responsive.
5. `motion-morph-performance` — motion-graphic intro, morph hợp lý, reduced-motion và cleanup.
6. `science-source-verification` — xác minh công thức/số liệu/nhà máy/khuyến cáo và quản lý nguồn.
7. `responsive-presentation-qa` — viewport desktop/mobile, accessibility, test checklist và báo cáo trung thực.

### Vị trí và cài đặt

- Vị trí workspace chuẩn: `.agents/skills/<tên-skill>/SKILL.md`.
- Gói tải kèm có `install-skills.ps1` cho Windows PowerShell và `install-skills.sh` cho macOS/Linux.
- Cài vào workspace của bài này để skills chỉ ảnh hưởng project slide, không làm nhiễu project khác. Script mặc định không ghi đè skill/AGENTS đã có; dùng tùy chọn `-Force` hoặc `--force` khi chủ động muốn thay.
- Sau khi cài, mở/reload workspace hoặc khởi động lại Antigravity nếu skills chưa xuất hiện. Có thể mở menu Customizations/Agent Skills để xác nhận đã nhận.
- Nếu muốn dùng skill thủ công, gọi tên qua slash command được tạo từ skill; nếu agent không chọn skill đúng, nói rõ: “Hãy sử dụng `npk-presentation-director`, `visual-slide-composition`, `react-presentation-engine`, `svg-infographic-studio`, `motion-morph-performance`, `science-source-verification` và `responsive-presentation-qa` cho task này.”

Lưu ý: gói zip cung cấp **skill đã soạn và script cài vào thư mục workspace**; nó không thể tự sửa cài đặt trên máy của người dùng từ trong cuộc trò chuyện. Cần chạy installer trên máy có Antigravity và chọn đúng đường dẫn dự án.

---

# PHỤ LỤC K — PROMPT TRIỂN KHAI CUỐI CÙNG (DÙNG KÈM SKILLS)

Dùng nguyên prompt này khi giao task cho Antigravity/Gemini sau khi đã đặt brief và cài skill:

> Hãy đọc toàn bộ `Ke_hoach_slide_Phan_Dam_Lan_Kali.md`, tài liệu nguồn `NHÓM TÀI.txt` và `AGENTS.md`. Kích hoạt các skill `npk-presentation-director`, `visual-slide-composition`, `react-presentation-engine`, `svg-infographic-studio`, `motion-morph-performance`, `science-source-verification`, `responsive-presentation-qa` khi phù hợp.
>
> Trước hết kiểm tra repo và tạo bảng mapping đầy đủ 15 câu hỏi. Sau đó lập plan triển khai ngắn, ghi giả định, rồi thực hiện code thật. Nếu repo có sẵn, đọc scripts/cấu trúc và sửa tại chỗ; không phá kiến trúc hiện hữu. Nếu repo trống, tạo React + Vite.
>
> Bắt buộc thực hiện đúng 19 slide và đúng thứ tự: bìa/chủ đề → motion intro React (16s) → thành viên 9 người → 15 câu hỏi → kết thúc. Mỗi slide áp dụng bố cục riêng trong đặc tả; không chỉ nhân bản một card. Dùng SVG trực quan có chủ đích (Visual-First, siêu ít chữ, nhìn là hiểu), biểu đồ dựa vào data thật, chữ chính tối giản (2-3 thẻ badge), speaker notes đầy đủ chuyên sâu. Tích hợp Mascot Bé Mầm NPK kéo chuyển slide. Tất cả nội dung tiếng Việt, công thức hoá học và đơn vị chính xác.
>
> Dựng intro như motion-graphic tương tác chạy bằng React/SVG/CSS; có play/replay/skip, progress, cleanup, reduced-motion và không phát âm thanh tự động. Thực hiện morph kết hợp chuyển cảnh linh vật.
>
> Thiết kế responsive cho desktop, mobile landscape và mobile portrait; trải nghiệm Mobile-as-Desktop tối ưu khi xoay ngang, portrait có màn hình nhắc xoay ngang với hoạt ảnh điện thoại nghiêng 90° cùng nút mở toàn màn hình. Có keyboard/touch/swipe/fullscreen fallback, focus rõ và nút chạm đủ lớn.
>
> Chạy ứng dụng, đi hết deck, đối chiếu 15 câu hỏi, kiểm tra biểu đồ/công thức/notes, responsive, console và production build. Sửa lỗi trước khi báo hoàn thành. Tuyệt đối không khai PASS cho test chưa chạy. Bàn giao báo cáo `DELIVERABLE SUMMARY`, cách khởi chạy và các vấn đề chưa giải quyết. Không dừng ở phân tích hay kế hoạch; hoàn thành implementation trong giới hạn repo/quyền truy cập hiện có.

---

# PHỤ LỤC L — MA TRẬN ĐỐI CHIẾU 15 CÂU HỎI GỐC

Dùng bảng này làm danh sách kiểm kê trước khi code và khi nghiệm thu. Đây là bản tóm lược theo 15 câu hỏi trong tài liệu `NHÓM TÀI.txt`; nếu có khác biệt nhỏ về cách viết, tài liệu gốc là căn cứ ưu tiên.

| Câu hỏi gốc | Slide | Thành phần bắt buộc phải được trả lời | Bằng chứng trực quan nên có |
|---|---:|---|---|
| Đạm 1. Phân đạm là gì; vai trò của N với sinh trưởng/phát triển cây? | 04 | Định nghĩa; N trong diệp lục/protein và sinh trưởng thân lá | Cây khỏe/thiếu N; đường nối N → diệp lục/protein/sinh trưởng |
| Đạm 2. Cách đánh giá độ dinh dưỡng; so sánh % khối lượng N của urê, NH₄Cl, (NH₄)₂SO₄, NaNO₃; loại cao nhất? | 05 | Tiêu chí `%N`; 4 số liệu cùng đơn vị; kết luận urê cao nhất | Biểu đồ cột ngang cùng thang, số hiện trực tiếp trên cột |
| Đạm 3. Bón đạm amoni vào đất chua/đất vôi gây hiện tượng gì; vì sao không bón một số đạm cùng vôi? | 06 | Quá trình nitrat hóa có thể góp phần chua hóa; NH₄⁺/NH₃ và thất thoát amoniac trong điều kiện pH cao; tránh trộn trực tiếp | Hai vùng đất đối chiếu và phương trình NH₄⁺ + OH⁻ ⇌ NH₃↑ + H₂O |
| Đạm 4. Nhà máy Phú Mỹ, Cà Mau, Ninh Bình dùng nguyên liệu tự nhiên nào và đóng góp gì cho nông nghiệp/kinh tế? | 07 | Nguồn nguyên liệu theo từng nhà máy; chuỗi sản xuất cơ bản; lợi ích và giới hạn tự chủ | Bản đồ vị trí đã kiểm tra + sơ đồ nguyên liệu → NH₃ → urê → cây trồng |
| Đạm 5. Khắc phục thoái hóa/chua hóa do dùng đạm lâu năm; giải pháp thay thế/kết hợp? | 08 | Xét nghiệm/kiểm tra đất; bón vôi khi phù hợp; hữu cơ/phân xanh; cân đối/chia lần bón | Lát cắt đất và 4 hành động quản lý |
| Lân 1. Lân cung cấp nguyên tố/ion nào; vai trò của P với rễ, hoa, quả và vận chuyển năng lượng? | 09 | P; dạng H₂PO₄⁻/HPO₄²⁻ theo pH; rễ/cơ quan sinh sản/ATP-ADP | Cây cắt lớp rễ, vùng ion và sơ đồ năng lượng đơn giản |
| Lân 2. Tiêu chuẩn độ dinh dưỡng; thành phần và độ tan supe lân đơn/kép; vì sao kép cao hơn? | 10 | Quy ước `%P₂O₅ hữu hiệu`; thành phần và mức dinh dưỡng điển hình của từng loại; hàm lượng kép cao hơn do cô đặc/ít thạch cao hơn | Hai thẻ so sánh và thanh %P₂O₅ dùng cùng thang |
| Lân 3. Lân nung chảy khác supe lân về thành phần/tính chất ra sao; vì sao ít tan trong nước nhưng tan trong axit yếu? | 11 | Khác biệt sản phẩm; độ tan và điều kiện đất; vai trò môi trường axit yếu quanh rễ theo tài liệu phù hợp | Hai loại hạt/phân và sơ đồ nước vs vùng rễ/axit yếu |
| Lân 4. Vì sao phân lân thường dùng bón lót hơn bón thúc như đạm? | 12 | Đặc điểm di động/tan của dạng lân; đặt gần vùng rễ; bón theo dạng phân và đất, không tuyệt đối hóa | Timeline bón lót → rễ non; lát cắt đất minh họa vùng lân gần rễ |
| Lân 5. Quặng apatit/phosphorit, mỏ Lào Cai, nhà máy Lâm Thao/Văn Điển/Ninh Bình; thách thức tài nguyên? | 13 | Nguyên liệu; địa điểm/nhà máy đã kiểm tra; quy trình ở mức khái quát; thách thức khai thác/tài nguyên | Bản đồ giản lược chính xác ở mức tỉnh, quặng và process flow, dải thách thức |
| Kali 1. Kali cung cấp K⁺; vai trò của K với quang hợp, đường/tinh bột, áp suất thẩm thấu và sức chống chịu? | 14 | Vai trò điều tiết nước/khí khổng, enzyme, vận chuyển carbohydrate, chống chịu; tránh tuyên bố tuyệt đối | Lá + khí khổng phóng đại và 4 callout |
| Kali 2. Chỉ tiêu độ dinh dưỡng; so sánh KCl và K₂SO₄ về thành phần, độ tan, đặc điểm? | 15 | Quy đổi `%K₂O`; có Cl⁻ trong KCl; có S trong K₂SO₄; hàm lượng điển hình và độ tan theo nguồn | Hai thẻ phân, nhãn ion và thanh %K₂O cùng thang |
| Kali 3. Dấu hiệu thiếu K; tại sao KCl không phù hợp một số cây nhạy Cl⁻ và cần cân nhắc K₂SO₄? | 16 | Mép lá vàng/cháy, sinh trưởng/chất lượng giảm; nêu cây nhạy clo theo đúng phạm vi khuyến cáo; không xem triệu chứng là chẩn đoán duy nhất | Hai lá SVG khỏe/thiếu K và thẻ lựa chọn phân |
| Kali 4. Vì sao kali thường được khuyên bón thúc ở giai đoạn ra hoa/tạo hạt/phình củ/nuôi quả thay vì toàn bộ bón lót? | 17 | Nhu cầu thay đổi theo giai đoạn; chia lần/bón thúc khi phù hợp; không khẳng định tuyệt đối không bón lót | Timeline cây non → ra hoa → tạo hạt/củ/quả → thu hoạch |
| Kali 5. Lạm dụng phân kali có gốc chloride lâu dài ảnh hưởng độ mặn, vi sinh vật và cấu trúc đất ra sao? | 18 | Điều kiện tích muối; khó hút nước/stress ion; ảnh hưởng vi sinh vật; phân biệt độ mặn với sodicity/đất chai cứng | So sánh lát cắt đất, chuỗi nguyên nhân và thẻ kiểm tra EC/điều chỉnh bón/thoát nước |

## L1. Cách sử dụng ma trận

- Khi lập trình, thêm `questionId` hoặc `sourceQuestion` vào record dữ liệu của các slide 04–18 để tránh mất câu khi chỉnh sửa.
- Trước khi bàn giao, rà từng hàng: đủ đáp án trên slide hoặc speaker notes, hình minh họa có hỗ trợ đúng câu hỏi, số liệu/công thức có đơn vị đúng.
- Nếu thay đổi thứ tự slide trong quá trình làm, phải cập nhật ma trận, registry, progress và notes đồng bộ; không để số slide giao diện khác số trên danh sách kiểm kê.
- Câu hỏi gốc có phần công thức bị trống trong file Word khi trích xuất thì cần kiểm tra trực tiếp văn bản gốc/ảnh trang trước khi diễn giải; không tự điền công thức còn thiếu như thể chắc chắn đó là nội dung ban đầu.
