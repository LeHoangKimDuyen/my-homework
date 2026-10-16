# NHẬT KÝ SỬ DỤNG AI TRONG QUÁ TRÌNH PHÁT TRIỂN DỰ ÁN (có AI hỗ trợ)

**Môn học:** Thiết kế web
**Dự án:** Ứng dụng Quản lý công việc cá nhân (Task Management Dashboard)  
**Sinh viên thực hiện:** Lê Hoàng Kim Duyên
**Mục tiêu:** Ghi lại tiến trình sử dụng vibe code để đồng hành, định hướng cấu trúc, lập trình tương tác và tối ưu hóa dữ liệu theo phương pháp học tập chủ động.

---

## GIAI ĐOẠN 1: THIẾT KẾ CẤU TRÚC (THE SKELETON)

### 1. Mục tiêu & Nội dung thực hiện

Trong giai đoạn đầu tiên, em tập trung vào việc xác định layout và giao diện dựa trên bản vẽ phác thảo tay:

- Xây dựng cấu trúc bằng các thẻ HTML5 Semantic chuẩn mực (`<header>`, `<aside>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
- Sử dụng mô hình bố cục kết hợp: **CSS Grid** phân chia khung Dashboard tổng quan (Sidebar và Main Content) và **Flexbox** để căn chỉnh các thành phần con bên trong (Thanh input, Card dự án, Header).
- Thiết kế hệ thống Navigation Sidebar có nút bấm Hamburger hỗ trợ Toggle ẩn/hiện mượt mà trên thiết bị di động (Mobile Drawer với lớp phủ Backdrop).
- Áp dụng các biến màu CSS Variables theo phong cách Tối giản (Minimalism) với tone màu Slate/Charcoal sang trọng.

### 2. Prompt mẫu đã sử dụng

> _"Tôi đang có một bản vẽ tay phác thảo giao diện Web Quản lý công việc (Dashboard). Hãy đóng vai trò là một Senior Frontend Developer giúp tôi dựng bộ khung HTML5 Semantic hoàn chỉnh gồm `<header>`, `<aside>`, `<main>`, `<nav>`, và `<section>`. Về mặt CSS, hãy sử dụng CSS Grid cho bố cục 2 cột chính (Sidebar và Nội dung), dùng Flexbox cho các khối bên trong. Đặc biệt, hãy thiết kế Sidebar có nút bấm Hamburger để có thể Toggle ẩn/hiện mượt mà dưới dạng Drawer trên màn hình điện thoại (Mobile-first). Chia tách rõ ràng giữa `index.html` và `style.css` theo phong cách Minimalism hiện đại."_

### 3. Kết quả đầu ra

- File `index.html`: Chứa đầy đủ các thẻ semantic, cấu trúc lời chào cá nhân hóa có hỗ trợ `line-clamp-2`, thẻ hiển thị đồng hồ thời gian thực, ô nhập liệu dạng viên thuốc và khối danh sách `YOUR PROJECT` đã đổi thành `Task List`.
- File `style.css`: Hệ thống CSS Variables đồng bộ, Grid template 2 cột tự co giãn trên desktop và chuyển sang fixed drawer với translate mượt mà trên màn hình nhỏ (`@media (max-width: 768px)`).

---

## GIAI ĐOẠN 2: LẬP TRÌNH CHỨC NĂNG "TĨNH" (THE INTERACTIONS)

### 1. Mục tiêu & Nội dung thực hiện

Sau khi đã có giao diện tĩnh, em tiến hành sử dụng JavaScript thuần (Vanilla JS ES6+) để thao tác trực tiếp với DOM:

- **Thêm công việc mới:** Lắng nghe sự kiện `submit` của Form, lấy dữ liệu text từ ô Input, kiểm tra hợp lệ và sinh mã HTML `<li>` gắn vào danh sách `<ul>`.
- **Đánh dấu hoàn thành:** Cho phép người dùng nhấp trực tiếp vào nội dung công việc (hoặc icon tròn) để chuyển đổi trạng thái hoàn thành (Toggle class `.completed` tạo hiệu ứng gạch ngang chữ `text-decoration: line-through`).
- **Xóa công việc:** Mỗi dòng task có một nút xóa độc lập, khi bấm sẽ loại bỏ phần tử đó mà không kích hoạt nhầm sự kiện toggle hoàn thành nhờ `e.stopPropagation()`.
- **Đồng hồ thời gian thực:** Viết hàm cập nhật Giờ:Phút:Giây liên tục mỗi giây bằng `setInterval` định dạng chuẩn `HH:mm:ss`.
- **Bẫy logic chống Input trống:** Kiểm tra chuỗi rỗng (`!taskTitle.trim()`), nếu người dùng chưa nhập gì mà ấn Thêm thì lập tức bật `alert()` cảnh báo và dùng `focus()` đưa con trỏ chuột quay lại ô input.
- **Bộ lọc công việc:** Mở rộng thêm 3 nút lọc (Tất cả / Chưa xong / Đã xong) để lọc trạng thái hiển thị của các thẻ `<li>`.

### 2. Prompt mẫu đã sử dụng

> \*"Hãy viết mã JavaScript thuần (ES6+) trong file `script.js` để xử lý các tương tác sau:
>
> 1. Đồng hồ thời gian thực: Hiển thị và cập nhật liên tục Giờ:Phút:Giây trên Header bằng hàm `setInterval`.
> 2. Chống lỗi nhập rỗng: Khi nhấn nút 'Thêm' mà ô input để trống hoặc chỉ có khoảng trắng, hãy dùng `alert()` nhắc nhở và ngăn không cho thêm task rỗng.
> 3. Thao tác DOM: Lấy text từ ô nhập, tạo thẻ `<li>` mới đưa vào danh sách; khi người dùng click vào nội dung dòng thì gạch ngang chữ để đánh dấu hoàn thành; mỗi dòng có nút Xóa riêng biệt.
> 4. Bộ lọc trạng thái: Tích hợp 3 nút lọc Tất cả (All), Chưa xong (Active), Đã xong (Completed) để cập nhật danh sách hiển thị tương ứng."\*

### 3. Kết quả đầu ra

- File `script.js` hoạt động độc lập, bắt trọn các sự kiện click, submit mà không phát sinh bất kỳ lỗi đỏ nào trong Tab Console của trình duyệt. Ứng dụng phản hồi nhanh và chính xác với từng thao tác của người dùng.

---

## GIAI ĐOẠN 3: TỐI ƯU HÓA DỮ LIỆU (THE PERSISTENCE)

### 1. Mục tiêu & Nội dung thực hiện

Để ứng dụng trở thành một sản phẩm thực tế, danh sách công việc không được phép biến mất mỗi khi người dùng tải lại trang (F5) hoặc vô tình đóng trình duyệt:

- Chuyển đổi mô hình quản lý sang hướng dữ liệu tập trung (State-driven): Mọi thao tác Thêm, Sửa trạng thái, Xóa đều thao tác trên mảng đối tượng `tasks`.
- Lưu trữ đồng bộ trạng thái của mảng `tasks` vào Web Storage API (`localStorage`).
- Tự động đồng bộ số lượng công việc ở phần Footer thông qua hàm đếm `updateFooterCounter()`.

### 2. Prompt mẫu đã sử dụng

> _"Hiện tại khi F5 lại trang web thì dữ liệu công việc bị mất hết. Hãy giúp tôi nâng cấp mã nguồn `script.js` để tích hợp `localStorage`. Dữ liệu danh sách công việc cần được lưu trữ sau mỗi lần thêm, xóa hoặc đổi trạng thái hoàn thành. Hãy đảm bảo quá trình đọc và ghi dữ liệu diễn ra an toàn, có giá trị dự phòng nếu bộ nhớ chưa có dữ liệu và cập nhật số đếm công việc ở footer theo thời gian thực."_

### 3. Phần Tự kiểm tra của Sinh Viên (Self-Check)

Sau khi AI đề xuất giải pháp, em đã chủ động soi lại mã nguồn và xác nhận các tiêu chí kỹ thuật:

- [x] **Xác nhận tuần tự hóa dữ liệu khi Lưu:**  
       Mã nguồn đã sử dụng phương thức `JSON.stringify()` để chuyển đổi mảng đối tượng JavaScript thành chuỗi JSON trước khi gọi `localStorage.setItem(STORAGE_KEY, ...)`:

  ```javascript
  const saveTasksToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Lỗi khi lưu LocalStorage:", error);
    }
  };
  ```

- [x] **Xác nhận giải mã và phòng ngừa rỗng mảng khi Tải:**  
       Mã nguồn đã bọc khối xử lý trong `try/catch`, sử dụng `JSON.parse()` và luôn có toán tử fallback hoặc giá trị mặc định mảng rỗng `[]` để tránh hoàn toàn các lỗi `null`, `undefined` hoặc lỗi cú pháp JSON làm sập ứng dụng:
  ```javascript
  const loadTasksFromStorage = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Lỗi khi đọc LocalStorage:", error);
      return [];
    }
  };
  ```

---

## KẾT LUẬN & ĐÁNH GIÁ CỦA SINH VIÊN

- **Ưu điểm khi làm việc cùng AI:** Tiết kiệm thời gian tra cứu cú pháp, được gợi ý các quy chuẩn Semantic và kỹ thuật Responsive hiện đại, đồng thời phát hiện sớm các "bẫy logic" (như input trống hay lỗi parse JSON).
- **Kinh nghiệm rút ra:** AI là một trợ lý đắc lực, tuy nhiên sinh viên cần có tư duy phản biện, nắm chắc kiến thức nền tảng về DOM và CSS Grid/Flexbox để kiểm tra, tinh chỉnh và đảm bảo sản phẩm hoạt động trơn tru đúng như yêu cầu của đề bài.
