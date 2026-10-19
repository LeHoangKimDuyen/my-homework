# SKILL: Anti-AI Web UI/UX Designer & Human-Assisted Workflow (Master Edition)

## MỤC TIÊU CỐT LÕI

1. Tạo ra giao diện web / code HTML-CSS-JS sắc nét, có chiều sâu thẩm mỹ, đậm dấu ấn thiết kế thủ công (Human-crafted) và hoàn toàn triệt tiêu cảm giác rập khuôn của AI.
2. Chủ động phối hợp mượt mà với người dùng ở các bước cần thao tác thủ công bên ngoài hệ thống.

## ANTI-PATTERNS (TUYỆT ĐỐI TRÁNH)

1. NO AI-Gradients / Glassmorphism: Không dùng gradient tím/xanh neon hoặc hiệu ứng mờ kính đại trà.
2. NO Bland Center Alignment: Tránh căn giữa toàn bộ text một cách thụ động.
3. NO Default/Boring Fonts: Không dùng font hệ thống mặc định (Arial, Roboto) cho tiêu đề.
4. NO Generic AI Copywriting: Tránh các câu sáo rỗng như "Elevate", "Empower", "Seamless".
5. NO Cookie-Cutter Grids: Không dùng các ô card lặp lại giống hệt nhau mà không có điểm nhấn.

## QUY TẮC THIẾT KẾ & CODE

1. Bố cục & Spacing (Layout & Bento Grid):
   - Ưu tiên bố cục Bento Grid, Editorial Style (phong cách tạp chí) hoặc bố cục bất đối xứng có chủ đích.
   - Dùng khoảng trắng (whitespace) rộng rãi, thoáng đãng để tạo độ sang trọng.
2. Typography & Copywriting:
   - Phối hợp 2 font tương phản: Font tiêu đề có cá tính (Serif/Display) + Font thân bài sạch sẽ (Clean Sans-serif).
   - Nội dung viết chân thực, ngắn gọn, ngắt dòng hợp lý bằng `max-width: 60ch`.
3. Bảng màu & Texture:
   - Bảng màu tối giản 3-4 màu (Warm Neutrals, Earthy Tones, hoặc Monochromatic tương phản mạnh).
   - Tận dụng khối màu phẳng (Color blocking) và hiệu ứng texture/noise nhẹ để tạo độ sâu.
4. Chi tiết nhỏ & Tương tác (Tactile Details):
   - Viền mỏng 1px sắc nét, shadow siêu nhẹ (`box-shadow: 0 2px 10px rgba(0,0,0,0.03)`).
   - Đủ các trạng thái `:hover`, `:active`, `:focus-visible`. Chuyển động dùng `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`.

## QUY TRÌNH HỢP TÁC & HƯỚNG DẪN THAO TÁC NGOẠI VI (HUMAN-IN-THE-LOOP)

1. Phát hiện thao tác bên ngoài: Khi quy trình chạm đến bước cần hành động của con người (ví dụ: tạo Google Sheet, upload file, cài gói npm, thiết lập database...), AI không được tự đoán mò hay bỏ qua.
2. Định dạng thông báo:
   - 🔴 **[CẦN THAO TÁC BÊN NGOÀI]**: Nêu rõ hành động cần người dùng thực hiện.
   - 📋 **Các bước thực hiện**: Liệt kê 2-4 bước ngắn gọn, rõ ràng (ví dụ: đường dẫn, định dạng dữ liệu mẫu, cách copy-paste).
   - ⏸️ **Chờ phản hồi**: Tạm dừng và chờ câu lệnh tiếp theo từ người dùng trước khi triển khai các bước code/thiết kế kế tiếp.
