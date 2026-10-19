/**
 * ==========================================================================
 * BÀI TẬP 3: GOOGLE APPS SCRIPT (GAS) BACKEND
 * ==========================================================================
 * - Tiếp nhận dữ liệu từ Landing Page qua POST
 * - Kiểm tra giới hạn 50 người tham gia (dựa vào số dòng trên Sheet)
 * - Tự động ghi thông tin vào Google Sheets
 * - Tự động gửi Email xác nhận kèm mã vé tham dự
 * - Trả về số lượng chỗ còn lại qua hàm GET
 */

var MAX_CAPACITY = 50;

/**
 * Xử lý yêu cầu GET: Trả về số chỗ còn lại cho Landing Page hiển thị
 */
function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = getOrCreateSheet();
    var lastRow = sheet.getLastRow();
    // Dòng 1 là Tiêu đề (Header), số người đã đăng ký là lastRow - 1
    var registeredCount = Math.max(0, lastRow - 1);
    var remainingSeats = Math.max(0, MAX_CAPACITY - registeredCount);

    var responseData = {
      status: "success",
      registeredCount: registeredCount,
      remainingSeats: remainingSeats,
      maxCapacity: MAX_CAPACITY,
      isSoldOut: remainingSeats <= 0
    };

    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Xử lý yêu cầu POST: Tiếp nhận thông tin, ghi vào Sheet và gửi Email tự động
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Khóa script trong 30 giây để tránh race condition khi nhiều người đăng ký cùng lúc
  lock.waitLock(30000);

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Không tìm thấy dữ liệu gửi lên.");
    }

    var data = JSON.parse(e.postData.contents);
    var fullName = (data.fullName || "").trim();
    var email = (data.email || "").trim();
    var phone = (data.phone || "").trim();

    if (!fullName || !email || !phone) {
      throw new Error("Dữ liệu không đầy đủ.");
    }

    var sheet = getOrCreateSheet();
    var lastRow = sheet.getLastRow();
    var registeredCount = Math.max(0, lastRow - 1);

    // Kiểm tra giới hạn tối đa 50 người
    if (registeredCount >= MAX_CAPACITY) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "sold_out",
        message: "Sự kiện đã đủ số lượng 50 người.",
        remainingSeats: 0
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Sinh mã vé duy nhất (Ví dụ: EVT-X9A2B)
    var ticketCode = "EVT-" + Utilities.getUuid().substring(0, 6).toUpperCase();
    var registrationTime = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

    // Thêm dòng mới vào Google Sheet: [STT, Mã Vé, Họ Tên, Email, SĐT, Thời Gian Đăng Ký]
    var stt = registeredCount + 1;
    sheet.appendRow([stt, ticketCode, fullName, email, "'" + phone, registrationTime]);

    var remainingSeats = MAX_CAPACITY - (registeredCount + 1);

    // Gửi email xác nhận tự động tới người đăng ký
    sendConfirmationEmail(fullName, email, ticketCode);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Đăng ký thành công!",
      ticketCode: ticketCode,
      remainingSeats: remainingSeats
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Lấy trang tính hiện tại hoặc tạo mới và thêm dòng Header nếu chưa có
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  if (sheet.getLastRow() === 0) {
    // Tạo tiêu đề bảng nếu Sheet còn trắng
    var headers = ["STT", "Mã Vé", "Họ và Tên", "Email", "Số Điện Thoại", "Thời Gian Đăng Ký"];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#F2EFE9");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * Gửi email xác nhận đăng ký và đính kèm mã vé
 */
function sendConfirmationEmail(fullName, recipientEmail, ticketCode) {
  try {
    var subject = "Xác nhận đăng ký tham dự Hội thảo Web Engineering 2026 [" + ticketCode + "]";
    
    // Tạo link ảnh QR Code từ QuickChart API để nhúng vào Email
    var qrContent = encodeURIComponent("EVENT2026|" + ticketCode + "|" + fullName + "|" + recipientEmail);
    var qrImageUrl = "https://quickchart.io/qr?text=" + qrContent + "&size=180&ecLevel=M&margin=1";

    var htmlBody = ""
      + "<div style='font-family: Arial, sans-serif; line-height: 1.6; color: #181716; max-width: 560px; margin: 0 auto; border: 1px solid #E5E1D8; border-radius: 8px; padding: 28px; background-color: #FFFFFF;'>"
      + "  <div style='text-transform: uppercase; font-size: 11px; font-weight: bold; color: #264653; letter-spacing: 1px; margin-bottom: 8px;'>Thư xác nhận tham dự</div>"
      + "  <h2 style='color: #181716; margin-top: 0; font-size: 20px;'>Kính chào " + fullName + ",</h2>"
      + "  <p>Cảm ơn bạn đã đăng ký tham gia hội thảo <strong>Thiết Kế Web Hiện Đại & Tự Động Hóa Dữ Liệu</strong>. Hệ thống đã xác nhận chỗ ngồi của bạn thành công.</p>"
      
      + "  <div style='background-color: #F9F8F6; border: 1px dashed #264653; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;'>"
      + "    <div style='font-size: 13px; color: #646059; margin-bottom: 6px;'>MÃ VÉ ĐIỂM DANH CỦA BẠN:</div>"
      + "    <div style='font-size: 22px; font-weight: bold; color: #264653; font-family: monospace; letter-spacing: 2px;'>" + ticketCode + "</div>"
      + "    <div style='margin-top: 16px;'>"
      + "      <img src='" + qrImageUrl + "' alt='QR Code Vé mời' width='160' height='160' style='border: 1px solid #E5E1D8; border-radius: 4px; padding: 6px; background-color: #FFFFFF;' />"
      + "    </div>"
      + "    <p style='font-size: 12px; color: #646059; margin-top: 10px;'>Vui lòng xuất trình mã QR này tại bàn lễ tân để check-in nhanh.</p>"
      + "  </div>"

      + "  <h4 style='margin-bottom: 6px; font-size: 14px;'>Thông tin sự kiện:</h4>"
      + "  <ul style='font-size: 13px; color: #4A463F; padding-left: 20px; margin-top: 4px;'>"
      + "    <li><strong>Thời gian:</strong> 08:30 — Thứ Bảy, 31/10/2026</li>"
      + "    <li><strong>Địa điểm:</strong> Hội trường A, Tầng 3 — Tòa nhà Công nghệ</li>"
      + "  </ul>"
      
      + "  <hr style='border: none; border-top: 1px solid #E5E1D8; margin: 24px 0;' />"
      + "  <p style='font-size: 12px; color: #8C877D; margin-bottom: 0;'>Đây là email gửi tự động từ hệ thống quản lý sự kiện. Vui lòng không trả lời thư này.</p>"
      + "</div>";

    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (e) {
    // Ghi log nếu có lỗi khi gửi mail (ví dụ hạn mức quota Gmail hoặc cấu hình tài khoản)
    Logger.log("Lỗi khi gửi email: " + e.toString());
  }
}
