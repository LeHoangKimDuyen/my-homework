/**
 * ==============================================================================
 * WonderBook Hub - script.js
 * Tập lệnh xử lý logic Vanilla JavaScript cho Thư viện Xứ Sở Kỳ Diệu:
 * 1. Danh mục dữ liệu sách & trích dẫn kinh điển
 * 2. Quote Generator: Chọn ngẫu nhiên trích dẫn
 * 3. Detail Page Loader: Đọc tham số URL (?id=...) và render chi tiết tương ứng
 * 4. Xử lý tương tác: Thêm vào tủ sách, gửi form bình luận
 * ==============================================================================
 */

// =============================================================================
// 1. DỮ LIỆU GIẢ LẬP (MOCK DATA)
// =============================================================================

// Danh sách các câu trích dẫn văn học kinh điển
const CLASSIC_QUOTES = [
  {
    quote: "Không phải tất cả những ai lang thang đều bị lạc lối.",
    author: "J.R.R. Tolkien",
    work: "Chúa tể những chiếc nhẫn (The Fellowship of the Ring)"
  },
  {
    quote: "Bí mật của việc tiến lên phía trước là bắt đầu ngay bây giờ.",
    author: "Mark Twain",
    work: "Trích văn chương & ghi chép"
  },
  {
    quote: "Điều bất khả thi thường chỉ là điều chưa được chứng minh là có thể.",
    author: "Agatha Christie",
    work: "Án mạng trên chuyến tàu Tốc hành Phương Đông"
  },
  {
    quote: "Người ta chỉ thấy rõ bằng trái tim. Cái cốt tử vô hình trước mắt trần.",
    author: "Antoine de Saint-Exupéry",
    work: "Hoàng Tử Bé (Le Petit Prince)"
  },
  {
    quote: "Có những cuốn sách để nếm thử, những cuốn để nuốt chửng, và một số ít để nhai và tiêu hóa.",
    author: "Francis Bacon",
    work: "Tiểu luận về Đọc sách"
  }
];

// Danh bạ dữ liệu sách kinh điển dùng chung
const BOOKS_DATABASE = {
  "1": {
    id: "1",
    title: "Hoàng Tử Bé",
    originalTitle: "Le Petit Prince",
    author: "Antoine de Saint-Exupéry",
    genre: "Văn học kinh điển, Triết lý, Thiếu nhi",
    publishedYear: 1943,
    rating: 4.9,
    stars: "★★★★★",
    badge: "Kinh điển",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80",
    synopsis: "Hoàng Tử Bé là tác phẩm văn học nổi tiếng nhất của nhà văn và phi công người Pháp Antoine de Saint-Exupéry. Cuốn sách kể về cuộc gặp gỡ kỳ lạ giữa một phi công bị rơi máy bay trên sa mạc Sahara và một hoàng tử bé nhỏ đến từ một tiểu hành tinh xa xôi. Tác phẩm mang thông điệp sâu sắc về tình bạn, tình yêu, sự gắn kết và góc nhìn trong sáng của trẻ thơ trước thế giới người lớn đầy toan tính.",
    notableQuote: "Người ta chỉ thấy rõ bằng trái tim. Cái cốt tử thì vô hình trước mắt trần.",
    pages: 112,
    language: "Tiếng Việt (Bản dịch chuẩn)"
  },
  "2": {
    id: "2",
    title: "Chúa Tể Những Chiếc Nhẫn",
    originalTitle: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Sử thi kỳ ảo, Phiêu lưu",
    publishedYear: 1954,
    rating: 4.8,
    stars: "★★★★★",
    badge: "Sử thi",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80",
    synopsis: "Tác phẩm kinh điển định hình thể loại kỳ ảo (fantasy) hiện đại. Hành trình đầy cam go của người Hobbit bé nhỏ Frodo Baggins cùng những người bạn trong Hiệp Hội Nhẫn Thần nhằm tiêu hủy Chiếc Nhẫn Quyền Năng tại ngọn núi Doom, giải cứu vùng Trung Địa khỏi sự thống trị hắc ám của Chúa tể Sauron.",
    notableQuote: "Ngay cả người nhỏ bé nhất cũng có thể thay đổi tiến trình tương lai.",
    pages: 1178,
    language: "Tiếng Việt (Bản trọn bộ)"
  },
  "3": {
    id: "3",
    title: "Án Mạng Trên Chuyến Tàu Tốc Hành Phương Đông",
    originalTitle: "Murder on the Orient Express",
    author: "Agatha Christie",
    genre: "Trinh thám, Bí ẩn kinh dị",
    publishedYear: 1934,
    rating: 4.7,
    stars: "★★★★☆",
    badge: "Trinh thám",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80",
    synopsis: "Chuyến tàu tốc hành sang trọng vượt qua châu Âu bất ngờ bị chặn lại giữa cơn bão tuyết dữ dội. Một vụ án mạng tinh vi xảy ra ngay trong đêm, và thám tử tài ba Hercule Poirot phải chạy đua với thời gian để tìm ra kẻ thủ ác trong số những hành khách bí ẩn mang nhiều bí mật không thể thốt nên lời.",
    notableQuote: "Điều bất khả thi không thể xảy ra, do đó điều tưởng chừng không thể chắc chắn phải khả thi.",
    pages: 256,
    language: "Tiếng Việt"
  },
  "4": {
    id: "4",
    title: "Kiêu Hãnh Và Định Kiến",
    originalTitle: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Lãng mạn, Hiện thực xã hội",
    publishedYear: 1813,
    rating: 4.6,
    stars: "★★★★☆",
    badge: "Lãng mạn",
    cover: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=700&q=80",
    synopsis: "Bức tranh châm biếm sâu cay mà tinh tế về xã hội quý tộc Anh thế kỷ 19, xoay quanh mối quan hệ oan gia nhưng đầy cuốn hút giữa cô gái thông minh sắc sảo Elizabeth Bennet và chàng quý tộc giàu có nhưng kiêu hãnh Fitzwilliam Darcy.",
    notableQuote: "Kiêu hãnh liên quan đến cảm nhận của ta về bản thân; còn định kiến lại dính dáng đến những gì ta muốn người khác nghĩ về mình.",
    pages: 432,
    language: "Tiếng Việt"
  }
};

// =============================================================================
// 2. KHỞI CHẠY KHI TẢI TRANG (DOM CONTENT LOADED)
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // 2.1 Khởi tạo Quote Generator nếu đang ở trang có khối Quote
  initQuoteGenerator();

  // 2.2 Khởi tạo Trình tải dữ liệu chi tiết sách nếu ở trang detail.html
  initDetailPageLoader();

  // 2.3 Khởi tạo tương tác nút thêm vào tủ sách
  initBookshelfButtons();

  // 2.4 Khởi tạo Form đánh giá sách trên trang chi tiết
  initReviewForm();
});

// =============================================================================
// 3. QUOTE GENERATOR (Trích dẫn ngẫu nhiên)
// =============================================================================
function initQuoteGenerator() {
  const quoteTextEl = document.getElementById("quoteText");
  const quoteAuthorEl = document.getElementById("quoteAuthor");
  const quoteWorkEl = document.getElementById("quoteWork");
  const nextQuoteBtn = document.getElementById("nextQuoteBtn");

  // Nếu không tìm thấy thành phần trên trang thì bỏ qua
  if (!quoteTextEl || !nextQuoteBtn) return;

  let currentQuoteIndex = -1;

  function displayRandomQuote() {
    let randomIndex;
    // Đảm bảo không trùng với câu đang hiển thị
    do {
      randomIndex = Math.floor(Math.random() * CLASSIC_QUOTES.length);
    } while (CLASSIC_QUOTES.length > 1 && randomIndex === currentQuoteIndex);

    currentQuoteIndex = randomIndex;
    const item = CLASSIC_QUOTES[currentQuoteIndex];

    // Hiệu ứng mờ nhẹ khi đổi câu trích dẫn
    quoteTextEl.style.opacity = "0.2";
    setTimeout(() => {
      quoteTextEl.textContent = `“${item.quote}”`;
      if (quoteAuthorEl) quoteAuthorEl.textContent = item.author;
      if (quoteWorkEl) quoteWorkEl.textContent = `— ${item.work}`;
      quoteTextEl.style.opacity = "1";
    }, 150);
  }

  // Gán sự kiện click nút đổi trích dẫn
  nextQuoteBtn.addEventListener("click", displayRandomQuote);

  // Hiển thị ngay 1 câu lúc ban đầu
  displayRandomQuote();
}

// =============================================================================
// 4. DETAIL PAGE DATA LOADER (URLSearchParams)
// =============================================================================
function initDetailPageLoader() {
  // Kiểm tra xem trang hiện tại có phải là trang chi tiết (detail-page)
  const detailContainer = document.getElementById("bookDetailContainer");
  if (!detailContainer) return;

  // Lấy giá trị tham số 'id' từ URL (ví dụ: detail.html?id=2)
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id") || "1"; // Mặc định hiển thị sách số 1 nếu không truyền id

  // Tra cứu dữ liệu sách từ cơ sở dữ liệu giả lập
  const book = BOOKS_DATABASE[bookId] || BOOKS_DATABASE["1"];

  // Cập nhật thẻ tiêu đề của trang Web
  document.title = `${book.title} | WonderBook Hub`;

  // Cập nhật các phần tử HTML trên trang detail.html
  const elCover = document.getElementById("detailCover");
  const elTitle = document.getElementById("detailTitle");
  const elOriginalTitle = document.getElementById("detailOriginalTitle");
  const elAuthor = document.getElementById("detailAuthor");
  const elGenre = document.getElementById("detailGenre");
  const elYear = document.getElementById("detailYear");
  const elPages = document.getElementById("detailPages");
  const elScore = document.getElementById("detailScore");
  const elStars = document.getElementById("detailStars");
  const elSynopsis = document.getElementById("detailSynopsis");
  const elQuote = document.getElementById("detailNotableQuote");
  const elReviewBookName = document.getElementById("reviewBookName");

  if (elCover) {
    elCover.src = book.cover;
    elCover.alt = `Bìa sách ${book.title}`;
  }
  if (elTitle) elTitle.textContent = book.title;
  if (elOriginalTitle) elOriginalTitle.textContent = book.originalTitle ? `(${book.originalTitle})` : "";
  if (elAuthor) elAuthor.textContent = book.author;
  if (elGenre) elGenre.textContent = book.genre;
  if (elYear) elYear.textContent = book.publishedYear;
  if (elPages) elPages.textContent = `${book.pages} trang`;
  if (elScore) elScore.textContent = `${book.rating}/5.0`;
  if (elStars) elStars.textContent = book.stars;
  if (elSynopsis) elSynopsis.textContent = book.synopsis;
  if (elQuote) elQuote.textContent = `“${book.notableQuote}”`;
  if (elReviewBookName) elReviewBookName.textContent = book.title;
}

// =============================================================================
// 5. TƯƠNG TÁC THÊM VÀO TỦ SÁCH (BOOKSHELF INTERACTION)
// =============================================================================
function initBookshelfButtons() {
  const shelfButtons = document.querySelectorAll(".btn-add-shelf");
  
  shelfButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const bookTitle = btn.getAttribute("data-title") || "tác phẩm";
      
      // Đổi trạng thái nút bấm
      btn.textContent = "✓ Đã lưu";
      btn.style.backgroundColor = "#d4af37";
      btn.style.borderColor = "#d4af37";
      btn.style.color = "#1a120b";
      
      alert(`Đã thêm cuốn "${bookTitle}" vào Tủ sách cá nhân của bạn thành công!`);
    });
  });
}

// =============================================================================
// 6. XỬ LÝ FORM ĐÁNH GIÁ (REVIEW FORM)
// =============================================================================
function initReviewForm() {
  const reviewForm = document.getElementById("bookReviewForm");
  if (!reviewForm) return;

  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const reviewerName = document.getElementById("reviewerName")?.value.trim() || "Độc giả ẩn danh";
    const reviewRating = document.getElementById("reviewRating")?.value || "5";
    const reviewComment = document.getElementById("reviewComment")?.value.trim() || "";

    if (!reviewComment) {
      alert("Vui lòng nhập lời bình luận của bạn trước khi gửi!");
      return;
    }

    // Hiển thị thông báo cảm ơn (giả lập lưu trữ thành công)
    alert(`Cảm ơn bạn ${reviewerName} đã gửi đánh giá (${reviewRating} sao) cho tác phẩm!\nLời bình: "${reviewComment}"`);

    // Reset lại form
    reviewForm.reset();
  });
}
