/**
 * ==========================================================================
 * BÀI TẬP 3: XỬ LÝ LOGIC ĐĂNG KÝ SỰ KIỆN & GOOGLE APPS SCRIPT INTEGRATION
 * ==========================================================================
 * - Validation tức thì (Real-time Validation)
 * - Quản lý trạng thái tải (Loading state) & Chống gửi trùng lặp (Anti-spam)
 * - Gửi dữ liệu bất đồng bộ qua fetch() & async/await
 * - Kiểm tra số lượng chỗ còn lại (Giới hạn tối đa 50 người)
 * - Tích hợp QuickChart API tạo QR Code điểm danh
 */

// URL triển khai Google Apps Script Web App (Người dùng sẽ thay URL này sau khi deploy)
const GAS_API_URL =
  "https://script.google.com/macros/s/AKfycbw4lgvLmOBdXvtoTvTdtqKB_auq_uu976_xrPmD7jWVwl3iv7d4dz2W1WFQ17blQ1OT/exec";
const MAX_CAPACITY = 50;

// Các phần tử DOM chính
const form = document.getElementById("registrationForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");

const groupFullName = document.getElementById("groupFullName");
const groupEmail = document.getElementById("groupEmail");
const groupPhone = document.getElementById("groupPhone");

const remainingSeatsEl = document.getElementById("remainingSeats");
const progressFillEl = document.getElementById("progressFill");
const statusDotEl = document.getElementById("statusDot");
const statusLabelEl = document.getElementById("statusLabel");
const soldOutBanner = document.getElementById("soldOutBanner");
const generalErrorEl = document.getElementById("generalError");

// Các phần tử trong Modal thành công
const successModal = document.getElementById("successModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const qrCodeImage = document.getElementById("qrCodeImage");
const attendeeNameEl = document.getElementById("attendeeName");
const attendeeEmailEl = document.getElementById("attendeeEmail");
const ticketCodeEl = document.getElementById("ticketCode");

// Biểu thức chính quy (Regex) kiểm tra tính hợp lệ
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEX_PHONE_VN = /^(0)(3|5|7|8|9)[0-9]{8}$/;

/**
 * Khởi tạo ứng dụng khi DOM tải xong
 */
document.addEventListener("DOMContentLoaded", () => {
  setupValidationListeners();
  setupFormSubmit();
  setupModalEvents();
  fetchSeatAvailability();
});

/**
 * 1. Thiết lập lắng nghe sự kiện Validation tức thì (input / blur)
 */
function setupValidationListeners() {
  // Họ và tên: kiểm tra không được để trống
  fullNameInput.addEventListener("blur", () => validateFullName());
  fullNameInput.addEventListener("input", () => {
    if (groupFullName.classList.contains("has-error")) {
      validateFullName();
    }
  });

  // Email: kiểm tra đúng định dạng
  emailInput.addEventListener("blur", () => validateEmail());
  emailInput.addEventListener("input", () => {
    if (groupEmail.classList.contains("has-error")) {
      validateEmail();
    }
  });

  // Số điện thoại: kiểm tra chuẩn 10 chữ số đầu số Việt Nam
  phoneInput.addEventListener("blur", () => validatePhone());
  phoneInput.addEventListener("input", () => {
    if (groupPhone.classList.contains("has-error")) {
      validatePhone();
    }
  });
}

function validateFullName() {
  const value = fullNameInput.value.trim();
  const isValid = value.length >= 2;
  toggleFieldError(groupFullName, isValid);
  return isValid;
}

function validateEmail() {
  const value = emailInput.value.trim();
  const isValid = REGEX_EMAIL.test(value);
  toggleFieldError(groupEmail, isValid);
  return isValid;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  const isValid = REGEX_PHONE_VN.test(value);
  toggleFieldError(groupPhone, isValid);
  return isValid;
}

function toggleFieldError(groupElement, isValid) {
  if (isValid) {
    groupElement.classList.remove("has-error");
  } else {
    groupElement.classList.add("has-error");
  }
}

/**
 * 2. Lấy số lượng chỗ ngồi còn lại từ Google Apps Script (doGet)
 */
async function fetchSeatAvailability() {
  // Kiểm tra nếu chưa cấu hình URL thật thì giả lập để trải nghiệm giao diện
  if (!GAS_API_URL || GAS_API_URL.includes("YOUR_GAS_WEB_APP_URL_HERE")) {
    updateSeatUI(42); // Giả lập 42 chỗ còn lại khi chưa gắn API URL
    return;
  }

  try {
    const response = await fetch(`${GAS_API_URL}?action=checkCapacity`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error("Không thể kết nối đến máy chủ");

    const data = await response.json();
    if (data.status === "success") {
      updateSeatUI(data.remainingSeats);
    }
  } catch (error) {
    console.warn("Lỗi khi kiểm tra chỗ trống:", error);
    // Vẫn cho phép người dùng đăng ký nếu mạng bị gián đoạn lúc check capacity
  }
}

/**
 * Cập nhật giao diện thanh trạng thái số chỗ còn lại
 * @param {number} remaining Số chỗ còn lại
 */
function updateSeatUI(remaining) {
  const count = Math.max(0, Math.min(MAX_CAPACITY, remaining));
  remainingSeatsEl.textContent = count;

  // Tính phần trăm chỗ đã đăng ký
  const booked = MAX_CAPACITY - count;
  const percentBooked = (booked / MAX_CAPACITY) * 100;
  progressFillEl.style.width = `${percentBooked}%`;

  if (count <= 0) {
    // Đã hết 50 chỗ -> Khóa form
    statusDotEl.classList.add("sold-out");
    statusLabelEl.textContent = "Đã hết chỗ";
    soldOutBanner.style.display = "block";
    form.style.display = "none";
  } else {
    statusDotEl.classList.remove("sold-out");
    statusLabelEl.textContent = "Chỗ ngồi khả dụng";
    soldOutBanner.style.display = "none";
    form.style.display = "flex";
  }
}

/**
 * 3. Xử lý sự kiện gửi Form (Submit Form)
 */
function setupFormSubmit() {
  form.addEventListener("submit", async (event) => {
    // Ngăn chặn tải lại trang mặc định
    event.preventDefault();
    hideGeneralError();

    // Kiểm tra toàn bộ trường dữ liệu trước khi gửi
    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      return;
    }

    const payload = {
      fullName: fullNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      timestamp: new Date().toISOString(),
    };

    // Bật Loading State (Vô hiệu hóa nút bấm & hiện spinner)
    setLoadingState(true);

    try {
      let result;

      if (!GAS_API_URL || GAS_API_URL.includes("YOUR_GAS_WEB_APP_URL_HERE")) {
        // Chế độ mô phỏng khi chưa kết nối URL thật
        await new Promise((resolve) => setTimeout(resolve, 1200));
        result = {
          status: "success",
          ticketCode:
            "EVT-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
          remainingSeats: 41,
        };
      } else {
        // Gửi dữ liệu thực tế đến Google Apps Script Web App
        const response = await fetch(GAS_API_URL, {
          method: "POST",
          // Mode no-cors hoặc text/plain dùng để tránh CORS preflight với Google Apps Script
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });

        result = await response.json();
      }

      if (result.status === "success") {
        // Cập nhật số chỗ mới nếu có trả về
        if (typeof result.remainingSeats === "number") {
          updateSeatUI(result.remainingSeats);
        }

        // Tạo mã QR Code qua QuickChart API và hiển thị Modal
        const ticketCode =
          result.ticketCode || "REG-" + Date.now().toString(36).toUpperCase();
        openSuccessModal(payload.fullName, payload.email, ticketCode);

        // Reset dữ liệu form
        form.reset();
      } else if (result.status === "sold_out") {
        updateSeatUI(0);
        showGeneralError(
          "Sự kiện vừa đủ số lượng đăng ký. Rất tiếc quý khách chưa kịp ghi danh.",
        );
      } else {
        throw new Error(result.message || "Không thể lưu dữ liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      showGeneralError(
        "Có lỗi xảy ra trong quá trình xử lý. Vui lòng kiểm tra kết nối mạng và thử lại.",
      );
    } finally {
      setLoadingState(false);
    }
  });
}

/**
 * Quản lý trạng thái nút gửi (Loading State chống spam)
 * @param {boolean} isLoading
 */
function setLoadingState(isLoading) {
  if (isLoading) {
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");
    btnText.textContent = "Đang xử lý...";
  } else {
    submitBtn.disabled = false;
    submitBtn.classList.remove("is-loading");
    btnText.textContent = "Xác nhận đăng ký";
  }
}

function showGeneralError(message) {
  generalErrorEl.textContent = message;
  generalErrorEl.style.display = "block";
}

function hideGeneralError() {
  generalErrorEl.style.display = "none";
  generalErrorEl.textContent = "";
}

/**
 * 4. Hiển thị Modal thành công và tạo QR Code với QuickChart API
 */
function openSuccessModal(name, email, ticketCode) {
  attendeeNameEl.textContent = name;
  attendeeEmailEl.textContent = email;
  ticketCodeEl.textContent = ticketCode;

  // Dữ liệu mã hóa trong QR Code (Dạng JSON gọn để dễ quét check-in)
  const qrData = encodeURIComponent(`EVENT2026|${ticketCode}|${name}|${email}`);
  const quickChartUrl = `https://quickchart.io/qr?text=${qrData}&size=200&ecLevel=M&margin=1`;

  qrCodeImage.src = quickChartUrl;
  successModal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Khóa cuộn trang khi mở modal
}

function setupModalEvents() {
  closeModalBtn.addEventListener("click", closeModal);

  // Đóng modal khi nhấn ra ngoài nền mờ
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) {
      closeModal();
    }
  });

  // Đóng modal khi bấm phím Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && successModal.style.display === "flex") {
      closeModal();
    }
  });
}

function closeModal() {
  successModal.style.display = "none";
  document.body.style.overflow = "";
}
