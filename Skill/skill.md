---
name: web-development-project-standards
description: Quy chuẩn bắt buộc về công nghệ (HTML/CSS/JS thuần), cấu trúc thư mục phân tách và quy trình làm việc (lập kế hoạch trước, đưa ra lựa chọn cho người dùng trước khi thay đổi code).
version: 1.0.0
---

# SKILL: Quy Chuẩn Phát Triển Dự Án Web Tĩnh

## 1. Ràng Buộc Công Nghệ & Kiến Trúc

- **Công nghệ cốt lõi:** Chỉ được phép sử dụng **HTML5** (Semantic), **CSS3** (Flexbox/Grid), và **JavaScript thuần** (Vanilla JS).
  - _Tuyệt đối cấm:_ Không sử dụng bất kỳ thư viện, framework hay plugin bên ngoài nào (như Bootstrap, Tailwind CSS, React, Vue, jQuery, v.v.).
- **Tách biệt tệp nguồn (External Files):**
  - CSS bắt buộc phải được viết tách rời thành các tệp external (ví dụ: `style.css`, `minimalism.css`, `cute.css`).
  - JavaScript bắt buộc phải được viết tách rời thành các tệp external (ví dụ: `script.js`).

## 2. Cấu Trúc Thư Mục Bắt Buộc

Dự án phải được tổ chức ngăn nắp theo cấu trúc phân tầng thư mục sau:

```text
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── video/
```
