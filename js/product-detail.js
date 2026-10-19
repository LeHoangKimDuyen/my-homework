/**
 * ROLIFE SUPER CREATOR - LOGIC TRANG CHI TIẾT SẢN PHẨM (product.html)
 * File: js/product-detail.js
 * Công nghệ: Vanilla JavaScript thuần (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. TỪ ĐIỂN ĐA NGÔN NGỮ CHO TRANG CHI TIẾT
  const detailI18n = {
    vi: {
      nav_home: "Trang chủ",
      nav_features: "Điểm Nổi Bật",
      nav_collection: "12 Căn Phòng",
      nav_specs: "Thông Số Kỹ Thuật",
      header_cta: "Bộ Sưu Tập",
      btn_back_catalog: "Quay lại danh sách sản phẩm",
      gallery_hint: "Nhấp vào từng ảnh nhỏ để xem cận cảnh các chi tiết mô hình",
      heading_desc: "Mô Tả Sản Phẩm",
      heading_specs: "Thông Số Kỹ Thuật",
      spec_lbl_pieces: "Số lượng chi tiết:",
      spec_lbl_time: "Thời gian lắp ráp:",
      spec_lbl_dimensions: "Kích thước chuẩn:",
      spec_lbl_light: "Hệ thống chiếu sáng:",
      spec_lbl_material: "Chất liệu cao cấp:",
      spec_lbl_age: "Độ tuổi khuyến nghị:",
      btn_buy_now_action: "MUA NGAY - GIAO TẬN NƠI",
      guarantee_note: "✓ Kiểm tra hàng trước khi thanh toán • 1 đổi 1 nếu lỗi mảnh ghép",
      price_holiday_note: "⚡ Ưu đãi độc quyền mùa lễ hội Giáng Sinh 2026",
      trust_b1_t: "100% Chính Hãng",
      trust_b1_d: "Tem Robotime / Rolife",
      trust_b2_t: "Freeship Toàn Quốc",
      trust_b2_d: "Đơn từ 499.000đ",
      trust_b3_t: "Bảo Hành Mảnh Lỗi",
      trust_b3_d: "Miễn phí 1 đổi 1",
      checkout_title: "Xác Nhận Đặt Mua",
      checkout_subtitle: "Tư vấn viên sẽ gọi xác nhận thông tin nhận hàng trong vòng 15 phút.",
      form_name: "Họ và tên người nhận *",
      form_phone: "Số điện thoại nhận hàng *",
      form_address: "Địa chỉ giao hàng *",
      form_voucher: "Mã ưu đãi (nếu có)",
      form_submit_order: "Hoàn Tất Đặt Hàng",
      order_success_title: "Đặt Hàng Thành Công!",
      order_success_desc: "Cảm ơn bạn đã lựa chọn Rolife. Chúng tôi sẽ sớm liên hệ gửi quà tặng và đơn hàng đến bạn!",
      footer_tagline: "Khơi nguồn sáng tạo, kiến tạo thế giới mini của riêng bạn trong từng phút giây thư giãn.",
      footer_col_nav: "Khám Phá",
      footer_col_support: "Hỗ Trợ Khách Hàng",
      footer_col_commit: "Cam Kết Thương Hiệu",
      footer_hotline: "Hotline: 1900 6868",
      footer_email: "Email: contact@rolife-creator.vn",
      footer_warranty: "Bảo hành 1 đổi 1 mảnh ghép lỗi",
      footer_commit_desc: "100% Sản phẩm chính hãng Robotime / Rolife. Đầy đủ tem chống hàng giả và chứng nhận an toàn quốc tế.",
      footer_note: "Bài tập thiết kế Landing Page Quảng bá Thương hiệu Cao cấp."
    },
    en: {
      nav_home: "Home",
      nav_features: "Highlights",
      nav_collection: "12 Rooms",
      nav_specs: "Specifications",
      header_cta: "Collection",
      btn_back_catalog: "Back to Product Catalog",
      gallery_hint: "Click any thumbnail to inspect high-resolution miniature details",
      heading_desc: "Product Details",
      heading_specs: "Technical Specifications",
      spec_lbl_pieces: "Piece Count:",
      spec_lbl_time: "Assembly Time:",
      spec_lbl_dimensions: "Dimensions:",
      spec_lbl_light: "Lighting System:",
      spec_lbl_material: "Premium Material:",
      spec_lbl_age: "Recommended Age:",
      btn_buy_now_action: "BUY NOW - EXPRESS DELIVERY",
      guarantee_note: "✓ Inspect upon delivery • 1-to-1 free part replacement",
      price_holiday_note: "⚡ Exclusive Holiday Season Special 2026",
      trust_b1_t: "100% Authentic",
      trust_b1_d: "Official Rolife / Robotime",
      trust_b2_t: "Free Delivery",
      trust_b2_d: "On all holiday orders",
      trust_b3_t: "Piece Guarantee",
      trust_b3_d: "Free replacement",
      checkout_title: "Confirm Your Order",
      checkout_subtitle: "Our concierge will contact you within 15 minutes to confirm delivery.",
      form_name: "Full Name *",
      form_phone: "Phone Number *",
      form_address: "Delivery Address *",
      form_voucher: "Voucher Code (Optional)",
      form_submit_order: "Complete Order",
      order_success_title: "Order Placed Successfully!",
      order_success_desc: "Thank you for choosing Rolife. Your miniature masterpiece is on its way!",
      footer_tagline: "Ignite pure creativity and build your miniature sanctuary, one mindful piece at a time.",
      footer_col_nav: "Explore",
      footer_col_support: "Customer Care",
      footer_col_commit: "Brand Guarantee",
      footer_hotline: "Hotline: +84 1900 6868",
      footer_email: "Email: contact@rolife-creator.vn",
      footer_warranty: "1-to-1 Replacement for Any Missing Piece",
      footer_commit_desc: "100% Authentic Robotime / Rolife products with official anti-counterfeit seals and international safety compliance.",
      footer_note: "Luxury Brand Landing Page Showcase Project."
    }
  };

  let currentLang = 'vi';

  // 2. XÁC ĐỊNH SẢN PHẨM TỪ QUERY PARAMETER (?id=...)
  const urlParams = new URLSearchParams(window.location.search);
  const requestedId = urlParams.get('id') || 'house';
  const product = findProductByIdOrSlug(requestedId);

  // 3. RENDER NỘI DUNG SẢN PHẨM LÊN TRANG
  function renderProductDetails() {
    const isEn = currentLang === 'en';
    const name = isEn ? product.name_en : product.name_vi;
    const badgeText = isEn ? product.badge_en : product.badge_vi;
    const tagline = isEn ? product.tagline_en : product.tagline_vi;
    const fullDesc = isEn ? product.desc_en : product.desc_vi;
    const categoryName = isEn ? product.category_en : product.category_vi;
    const currentPrice = isEn ? product.price_en : product.price_vi;
    const origPrice = isEn ? product.originalPrice_en : product.originalPrice_vi;

    // Cập nhật Page Title
    document.title = `${name} | Rolife Super Creator`;

    // Cập nhật Breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumb-current-product');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = name;

    // Cập nhật Thông tin Header Sản phẩm
    const titleEl = document.getElementById('product-title-large');
    if (titleEl) titleEl.textContent = name;

    const taglineEl = document.getElementById('product-tagline');
    if (taglineEl) taglineEl.textContent = tagline;

    const categoryTag = document.getElementById('product-category-tag');
    if (categoryTag) categoryTag.textContent = categoryName;

    const badgeEl = document.getElementById('gallery-badge');
    if (badgeEl) {
      badgeEl.textContent = badgeText;
      badgeEl.className = `gallery-badge ${product.badgeType || 'badge-red'}`;
    }

    // Cập nhật Giá
    const curPriceEl = document.getElementById('product-current-price');
    if (curPriceEl) curPriceEl.textContent = currentPrice;

    const origPriceEl = document.getElementById('product-original-price');
    if (origPriceEl) origPriceEl.textContent = origPrice;

    const discountEl = document.getElementById('product-discount-badge');
    if (discountEl) discountEl.textContent = product.discount || '-20%';

    // Cập nhật Mô tả
    const fullDescEl = document.getElementById('product-full-desc');
    if (fullDescEl) fullDescEl.textContent = fullDesc;

    // Cập nhật Thông Số Kỹ Thuật
    const specPieces = document.getElementById('spec-val-pieces');
    if (specPieces) specPieces.textContent = product.specs.pieces;

    const specTime = document.getElementById('spec-val-time');
    if (specTime) specTime.textContent = product.specs.time;

    const specDim = document.getElementById('spec-val-dimensions');
    if (specDim) specDim.textContent = product.specs.dimensions;

    const specLight = document.getElementById('spec-val-light');
    if (specLight) specLight.textContent = product.specs.light;

    const specMat = document.getElementById('spec-val-material');
    if (specMat) specMat.textContent = product.specs.material;

    const specAge = document.getElementById('spec-val-age');
    if (specAge) specAge.textContent = product.specs.age;

    // Cập nhật Thư Viện Hình Ảnh
    const mainImgEl = document.getElementById('product-main-view');
    const defaultImgSrc = `images/${product.prefix}-1.webp`;
    if (mainImgEl) {
      mainImgEl.src = defaultImgSrc;
      mainImgEl.alt = name;
    }

    // Tạo danh sách Thumbnails
    const thumbsStrip = document.getElementById('gallery-thumbnails-strip');
    if (thumbsStrip) {
      let thumbsHTML = '';
      for (let i = 1; i <= product.imageCount; i++) {
        const imgSrc = `images/${product.prefix}-${i}.webp`;
        thumbsHTML += `
          <button type="button" class="gallery-thumb-item ${i === 1 ? 'active' : ''}" data-src="${imgSrc}" aria-label="Góc chụp ${i}">
            <img src="${imgSrc}" alt="${name} góc ${i}" loading="lazy" width="75" height="75">
          </button>
        `;
      }
      thumbsStrip.innerHTML = thumbsHTML;

      // Gắn sự kiện click đổi ảnh chính
      const thumbButtons = thumbsStrip.querySelectorAll('.gallery-thumb-item');
      thumbButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          thumbButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const newSrc = btn.getAttribute('data-src');
          if (mainImgEl) {
            mainImgEl.style.opacity = '0.5';
            setTimeout(() => {
              mainImgEl.src = newSrc;
              mainImgEl.style.opacity = '1';
            }, 120);
          }
        });
      });
    }

    // Cập nhật thông tin trong Modal Mua Hàng
    const modalThumb = document.getElementById('checkout-mini-img');
    if (modalThumb) {
      modalThumb.src = defaultImgSrc;
      modalThumb.alt = name;
    }

    const modalName = document.getElementById('checkout-mini-name');
    if (modalName) modalName.textContent = name;

    const modalPrice = document.getElementById('checkout-mini-price');
    if (modalPrice) modalPrice.textContent = currentPrice;
  }

  // 4. CHUYỂN ĐỔI NGÔN NGỮ (VI/EN)
  function applyLanguage(lang) {
    currentLang = lang;
    const dictionary = detailI18n[lang];
    if (!dictionary) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[key]) el.innerHTML = dictionary[key];
    });

    const currentLangEl = document.getElementById('current-lang');
    if (currentLangEl) currentLangEl.textContent = lang.toUpperCase();

    renderProductDetails();
  }

  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      applyLanguage(currentLang === 'vi' ? 'en' : 'vi');
    });
  }

  // Khởi chạy render chi tiết lần đầu
  renderProductDetails();

  // 5. XỬ LÝ NÚT MUA SẢN PHẨM & MODAL THANH TOÁN (PHƯƠNG ÁN 3A)
  const buyBtn = document.getElementById('btn-buy-primary');
  const checkoutModal = document.getElementById('product-checkout-modal');
  const checkoutCloseBtn = document.getElementById('modal-checkout-close');
  const checkoutForm = document.getElementById('product-checkout-form');
  const checkoutSuccessMsg = document.getElementById('checkout-success-msg');

  function openCheckoutModal() {
    if (!checkoutModal) return;
    checkoutModal.classList.add('show');
    checkoutModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    if (!checkoutModal) return;
    checkoutModal.classList.remove('show');
    checkoutModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (buyBtn) {
    buyBtn.addEventListener('click', openCheckoutModal);
  }

  if (checkoutCloseBtn) {
    checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  }

  if (checkoutModal) {
    checkoutModal.addEventListener('click', (e) => {
      if (e.target === checkoutModal) closeCheckoutModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && checkoutModal?.classList.contains('show')) {
      closeCheckoutModal();
    }
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      checkoutForm.style.display = 'none';
      if (checkoutSuccessMsg) checkoutSuccessMsg.style.display = 'block';

      setTimeout(() => {
        closeCheckoutModal();
        setTimeout(() => {
          checkoutForm.reset();
          checkoutForm.style.display = 'flex';
          if (checkoutSuccessMsg) checkoutSuccessMsg.style.display = 'none';
        }, 500);
      }, 3000);
    });
  }

  // 6. HAMBURGER MENU TRÊN MOBILE CHO PRODUCT.HTML
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });
  }

});
