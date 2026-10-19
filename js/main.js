/**
 * ROLIFE SUPER CREATOR - PHIÊN BẢN GIÁNG SINH
 * File: js/main.js
 * Công nghệ: Vanilla JavaScript thuần (ES6+)
 * Tính năng chính:
 * 1. Từ điển Đa ngôn ngữ (i18n VI/EN) chuyển đổi tức thì
 * 2. Sticky Header cuộn trang & Mobile Hamburger Navigation
 * 3. Tự động mở Modal Khuyến mãi sau 10 giây (Timed Promo Modal)
 * 4. Quản lý Tabs & Tải động (Dynamic Loading) 12 căn phòng mini
 * 5. Interactive Accordion cho khối Thông số kỹ thuật
 * 6. Gallery Modal xem trọn bộ 6-7 ảnh chi tiết của từng căn phòng
 * 7. Xử lý đặt hàng nhanh & Sao chép mã Voucher
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. TỪ ĐIỂN ĐA NGÔN NGỮ (I18N DICTIONARY)
     ========================================================================== */
  const i18nData = {
    vi: {
      nav_home: "Trang chủ",
      nav_features: "Điểm Nổi Bật",
      nav_collection: "12 Căn Phòng",
      nav_specs: "Thông Số Kỹ Thuật",
      header_cta: "Sở Hữu Ngay",
      hero_badge: "Phiên Bản Giới Hạn Mùa Lễ Hội 2026",
      hero_title: `Ngôi Nhà Giáng Sinh <br><span class="text-gold">Rolife Super Creator</span>`,
      hero_desc: "Thắp sáng đêm đông bằng kiệt tác mô hình kiến trúc mini. 100% khớp nối snap-fit không cần keo, tích hợp đèn LED ấm áp cùng hệ sinh thái 12 căn phòng kết nối không giới hạn.",
      hero_cta_primary: "Đặt Mua Bản Giáng Sinh",
      hero_cta_secondary: "Khám Phá Chi Tiết",
      trust_glue_free: "Không Dùng Keo",
      trust_warm_light: "Đèn Vàng Ấm Áp",
      trust_rooms: "Căn Phòng Ghép Nối",
      badge_special: "Đặc Quyền Mùa Đông",
      badge_bonus: "Kèm Bộ Chi Tiết Noel",
      
      feat_eyebrow: "Bộ Sưu Tập Nổi Bật",
      feat_title: "Những Căn Phòng Thu Nhỏ Đầy Cảm Hứng",
      feat_subtitle: "Khám phá 6 kiệt tác mô hình mini được yêu thích nhất với thiết kế thẻ kính mờ nghệ thuật và trượt tương tác mượt mà.",
      card_1_badge: "Bản Giới Hạn",
      card_1_title: "Ngôi Nhà Giáng Sinh",
      card_1_desc: "Khớp nối snap-fit 100% không keo, tích hợp đèn LED vàng ấm thắp sáng đêm đông.",
      card_2_badge: "Yêu Thích Nhất",
      card_2_title: "Nông Trại Thư Thái",
      card_2_desc: "Bếp lửa đồng quê mộc mạc, giỏ hoa quả tươi mới cùng các chi tiết đan lát tinh xảo.",
      card_3_badge: "Bán Chạy Nhất",
      card_3_title: "Tiệm Sách Cổ Tích",
      card_3_desc: "Tủ sách gỗ kịch trần, thang trượt vintage và hàng trăm tựa sách văn học kinh điển.",
      card_4_badge: "Mới Ra Mắt",
      card_4_title: "Quán Cà Phê Góc Phố",
      card_4_desc: "Quầy bar đá cẩm thạch sang trọng, máy pha espresso bóng bẩy và menu phấn vẽ tay.",
      card_5_badge: "Ngọt Ngào",
      card_5_title: "Tiệm Bánh Ngọt Ngào",
      card_5_desc: "Tủ bánh kem thu nhỏ đa tầng, khay bánh sừng bò giòn rụm và ngập tràn sắc màu ấm.",
      card_6_badge: "Ấm Cúng",
      card_6_title: "Phòng Khách Sum Vầy",
      card_6_desc: "Sofa bọc nỉ êm ái, máy quay đĩa than cổ điển cùng chậu cây xanh thanh lọc không gian.",
      card_cta_explore: "Khám Phá",

      coll_eyebrow: "Hệ Sinh Thái Super Creator",
      coll_title: "Bộ Sưu Tập 12 Căn Phòng Ghép Nối Vô Hạn",
      coll_subtitle: "Tự do bài trí, xếp chồng lên nhau thành tòa lâu đài thu nhỏ. Chọn danh mục dưới đây để khám phá chi tiết từng gian phòng.",
      tab_all: "Tất Cả (12)",
      tab_living: "Không Gian Sống",
      tab_culinary: "Ẩm Thực & Thư Giãn",
      tab_lifestyle: "Sở Thích & Mua Sắm",
      
      spec_eyebrow: "Chất Lượng Vượt Trội",
      spec_title: "Được Thiết Kế Cho Trải Nghiệm Lắp Ráp Hoàn Hảo",
      spec_desc: "Mỗi chi tiết của Rolife Super Creator đều được kiểm định an toàn nghiêm ngặt theo tiêu chuẩn quốc tế. Tận hưởng trọn vẹn từng khoảnh khắc tĩnh tâm sau những giờ học tập và làm việc căng thẳng.",
      spec_hl_time_title: "Thời gian hoàn thành",
      spec_hl_time_val: "1.5 - 2 giờ (Lắp ghép thảnh thơi)",
      spec_hl_pieces_title: "Số lượng chi tiết",
      spec_hl_pieces_val: "172 mảnh khuôn nhựa cao cấp",
      spec_hl_skill_title: "Độ khó đánh giá",
      spec_hl_skill_val: "★★★☆☆ (Dễ dàng cho người mới)",
      
      acc_dim_title: "Kích Thước & Trọng Lượng Chuẩn",
      acc_dim_body: `<ul>
        <li><strong>Kích thước hoàn thiện:</strong> 163mm × 163mm × 152mm (Dài × Rộng × Cao).</li>
        <li><strong>Kích thước hộp đóng gói:</strong> 245mm × 180mm × 65mm.</li>
        <li><strong>Trọng lượng sản phẩm:</strong> Khoảng 650g (Đầm tay, chắc chắn).</li>
        <li><strong>Tỷ lệ chuẩn:</strong> Thu nhỏ tỉ lệ 1:20 chuẩn xác với kiến trúc thực tế.</li>
      </ul>`,
      acc_mat_title: "Chất Liệu & Độ An Toàn Cao Cấp",
      acc_mat_body: `<ul>
        <li><strong>Chất liệu chính:</strong> Nhựa nguyên sinh ABS và PVC chuẩn an toàn quốc tế (CE, RoHS, ASTM).</li>
        <li><strong>Màu sắc:</strong> Đúc màu nguyên khối cao cấp, không phai màu theo thời gian, thân thiện với môi trường.</li>
        <li><strong>Tấm chắn bụi:</strong> Kính mica Acrylic trong suốt phủ màng bảo vệ chống trầy xước.</li>
        <li><strong>Mùi hương:</strong> Hoàn toàn không mùi độc hại, an toàn tuyệt đối khi tiếp xúc trực tiếp.</li>
      </ul>`,
      acc_elec_title: "Hệ Thống Đèn LED & Nguồn Điện",
      acc_elec_body: `<ul>
        <li><strong>Bóng đèn:</strong> Vi sợi LED nhiệt độ màu vàng ấm 2700K êm mắt.</li>
        <li><strong>Công tắc:</strong> Nút bấm cảm ứng / switch tinh tế giấu kín phía sau tường.</li>
        <li><strong>Nguồn điện:</strong> Sử dụng 2 pin AAA tiện lợi, dễ dàng thay thế không cần dây điện rườm rà.</li>
        <li><strong>Tuổi thọ đèn:</strong> Hơn 10.000 giờ chiếu sáng liên tục không sinh nhiệt.</li>
      </ul>`,
      acc_age_title: "Độ Tuổi & Hướng Dẫn Lắp Ráp",
      acc_age_body: `<ul>
        <li><strong>Độ tuổi phù hợp:</strong> Khuyến nghị từ 8 tuổi trở lên. Rất thích hợp cho người lớn giải tỏa áp lực.</li>
        <li><strong>Công cụ phụ trợ:</strong> Kèm kẹp nhíp chuyên dụng và sách hướng dẫn minh họa màu 3D từng bước.</li>
        <li><strong>Không cần keo:</strong> Các mối mộng thông minh tự khóa chặt khi ghép vào vị trí.</li>
      </ul>`,

      cta_box_eyebrow: "Ưu Đãi Đặc Biệt Mùa Giáng Sinh",
      cta_box_title: "Sẵn Sàng Thắp Sáng Không Gian Của Bạn?",
      cta_box_desc: "Tặng ngay bộ phụ kiện trang trí Noel độc quyền & miễn phí vận chuyển toàn quốc cho 100 đơn hàng đầu tiên.",
      cta_box_btn: "Đặt Mua Ngay - 699.000đ",
      
      footer_tagline: "Khơi nguồn sáng tạo, kiến tạo thế giới mini của riêng bạn trong từng phút giây thư giãn.",
      footer_col_nav: "Khám Phá",
      footer_col_support: "Hỗ Trợ Khách Hàng",
      footer_col_commit: "Cam Kết Thương Hiệu",
      footer_hotline: "Hotline: 1900 6868",
      footer_email: "Email: contact@rolife-creator.vn",
      footer_warranty: "Bảo hành 1 đổi 1 mảnh ghép lỗi",
      footer_commit_desc: "100% Sản phẩm chính hãng Robotime / Rolife. Đầy đủ tem chống hàng giả và chứng nhận an toàn quốc tế.",
      footer_note: "Bài tập thiết kế Landing Page Quảng bá Thương hiệu Cao cấp.",

      modal_title: "Món Quà Giáng Sinh Dành Riêng Cho Bạn!",
      modal_desc: `Nhập mã ưu đãi bên dưới để được <strong>giảm ngay 10%</strong> cho đơn hàng mô hình Rolife đầu tiên hôm nay.`,
      btn_copy: "Sao Chép Mã",
      modal_cta: "Áp Dụng & Đặt Hàng Ngay",
      toast_copied: "Đã sao chép mã ưu đãi thành công!",

      gallery_modal_order: "Đặt Mua Mẫu Này",
      order_title: "Đặt Mua Mô Hình Rolife",
      order_desc: "Để lại thông tin nhận hàng, tư vấn viên của chúng tôi sẽ liên hệ xác nhận trong vòng 15 phút.",
      form_name: "Họ và tên *",
      form_phone: "Số điện thoại nhận hàng *",
      form_product: "Chọn phiên bản *",
      form_voucher: "Mã ưu đãi (nếu có)",
      form_submit: "Xác Nhận Đặt Hàng",
      opt_house: "Phiên bản Giáng Sinh (Chính) - 699.000đ",
      opt_farm: "Nông trại thư thái (Cozy Farmhouse) - 499.000đ",
      opt_book: "Tiệm sách cổ tích (Vintage Bookshop) - 499.000đ",
      opt_cafe: "Quán cà phê góc phố (Corner Cafe) - 499.000đ",
      opt_cake: "Tiệm bánh ngọt ngào (Sweet Bakery) - 499.000đ",
      opt_combo: "Combo Nhà Giáng Sinh + 3 Căn Phòng Tùy Chọn - Giảm 20%",
      order_success_title: "Đặt Hàng Thành Công!",
      order_success_desc: "Cảm ơn bạn đã lựa chọn Rolife. Chúng tôi sẽ sớm liên hệ gửi quà tặng và đơn hàng đến bạn!",
      btn_view_gallery: "Xem Chi Tiết",
      btn_buy: "Mua Ngay"
    },
    en: {
      nav_home: "Home",
      nav_features: "Highlights",
      nav_collection: "12 Rooms",
      nav_specs: "Specifications",
      header_cta: "Order Now",
      hero_badge: "Holiday Limited Edition 2026",
      hero_title: `Christmas Dream Cottage <br><span class="text-gold">Rolife Super Creator</span>`,
      hero_desc: "Brighten cold winter nights with a miniature architectural wonder. 100% snap-fit glue-free joints, cozy warm LED lights, and an infinite modular ecosystem of 12 stackable rooms.",
      hero_cta_primary: "Order Christmas Edition",
      hero_cta_secondary: "Explore Features",
      trust_glue_free: "Glue-Free Snap",
      trust_warm_light: "Warm Ambient LED",
      trust_rooms: "Modular Rooms",
      badge_special: "Winter Exclusive",
      badge_bonus: "Includes Holiday Deco Kit",

      feat_eyebrow: "Featured Showcase",
      feat_title: "Inspiring Miniature Rooms",
      feat_subtitle: "Explore the 6 most coveted miniature rooms featuring artisan glassmorphism cards and smooth interactive sliding.",
      card_1_badge: "Limited Edition",
      card_1_title: "Christmas Dream Cottage",
      card_1_desc: "100% snap-fit glue-free joints with ambient warm LED nightlight.",
      card_2_badge: "Top Pick",
      card_2_title: "Cozy Farmhouse",
      card_2_desc: "Rustic country kitchen with fresh farm produce and woven baskets.",
      card_3_badge: "Best Seller",
      card_3_title: "Vintage Bookshop",
      card_3_desc: "Classic wooden bookstacks, sliding ladder, and hundreds of tiny novels.",
      card_4_badge: "New Release",
      card_4_title: "Corner Coffee Bar",
      card_4_desc: "Marble espresso counter, polished coffee gear, and handwritten menu.",
      card_5_badge: "Sweet Delight",
      card_5_title: "Sweet Bakery Shop",
      card_5_desc: "Tiered patisserie showcase, golden croissants, and pastel decorations.",
      card_6_badge: "Cozy Vibe",
      card_6_title: "Warm Living Room",
      card_6_desc: "Plush lounge armchair, retro vinyl phonograph, and green monstera plant.",
      card_cta_explore: "Explore",

      coll_eyebrow: "Super Creator Ecosystem",
      coll_title: "Infinite Modular 12-Room Collection",
      coll_subtitle: "Freely arrange, combine, and stack these rooms into a sprawling miniature mansion. Select a category below to explore each.",
      tab_all: "All Rooms (12)",
      tab_living: "Living Spaces",
      tab_culinary: "Culinary & Dining",
      tab_lifestyle: "Hobbies & Boutiques",

      spec_eyebrow: "Superior Engineering",
      spec_title: "Designed For a Flawless Building Experience",
      spec_desc: "Each Rolife Super Creator component undergoes stringent international safety audits. Indulge in hours of calming mindfulness away from everyday screen fatigue.",
      spec_hl_time_title: "Assembly Time",
      spec_hl_time_val: "1.5 - 2 Hours (Gentle & Relaxing)",
      spec_hl_pieces_title: "Piece Count",
      spec_hl_pieces_val: "172 Molded Eco-Polymer Parts",
      spec_hl_skill_title: "Skill Rating",
      spec_hl_skill_val: "★★★☆☆ (Beginner Friendly)",

      acc_dim_title: "Dimensions & Scale",
      acc_dim_body: `<ul>
        <li><strong>Finished Dimensions:</strong> 163mm × 163mm × 152mm (L × W × H).</li>
        <li><strong>Package Dimensions:</strong> 245mm × 180mm × 65mm.</li>
        <li><strong>Product Weight:</strong> Approx. 650g (Solid and premium feel).</li>
        <li><strong>Scale:</strong> True 1:20 miniature architectural ratio.</li>
      </ul>`,
      acc_mat_title: "Materials & Safety Standards",
      acc_mat_body: `<ul>
        <li><strong>Core Materials:</strong> High-grade virgin ABS & PVC certified safe (CE, RoHS, ASTM).</li>
        <li><strong>Coloring:</strong> Molded solid dyes, immune to fading, completely odorless.</li>
        <li><strong>Dust Cover:</strong> Optical-grade transparent Acrylic with anti-scratch film.</li>
        <li><strong>Safety:</strong> 100% non-toxic, safe for mindful hands-on assembly.</li>
      </ul>`,
      acc_elec_title: "Warm LED Circuitry & Power",
      acc_elec_body: `<ul>
        <li><strong>Lighting:</strong> Soft 2700K warm-amber filament micro-LEDs.</li>
        <li><strong>Switch:</strong> Discreet touch/rocker switch concealed behind the wall.</li>
        <li><strong>Power Source:</strong> Powered by 2 standard AAA batteries (cable-free layout).</li>
        <li><strong>Lifespan:</strong> Over 10,000 illumination hours with zero heat generation.</li>
      </ul>`,
      acc_age_title: "Recommended Age & Instructions",
      acc_age_body: `<ul>
        <li><strong>Recommended Age:</strong> 8+ years. Ideal for adults seeking mindful relaxation.</li>
        <li><strong>Included Tools:</strong> Fine precision tweezers & step-by-step full color 3D guide.</li>
        <li><strong>Glue-Free:</strong> Interlocking mortise-and-tenon joints snap firmly into place.</li>
      </ul>`,

      cta_box_eyebrow: "Holiday Exclusive Promotion",
      cta_box_title: "Ready to Illuminate Your Miniature World?",
      cta_box_desc: "Enjoy a complimentary Christmas accessory set and free nationwide courier delivery for the first 100 orders.",
      cta_box_btn: "Order Now - $29.99",

      footer_tagline: "Ignite pure creativity and build your miniature sanctuary, one mindful piece at a time.",
      footer_col_nav: "Explore",
      footer_col_support: "Customer Care",
      footer_col_commit: "Brand Guarantee",
      footer_hotline: "Hotline: +84 1900 6868",
      footer_email: "Email: contact@rolife-creator.vn",
      footer_warranty: "1-to-1 Replacement for Any Missing Piece",
      footer_commit_desc: "100% Authentic Robotime / Rolife products with official anti-counterfeit seals and international safety compliance.",
      footer_note: "Luxury Brand Landing Page Showcase Project.",

      modal_title: "Your Special Holiday Reward!",
      modal_desc: `Enter the voucher code below to unlock an <strong>instant 10% discount</strong> on your first Rolife order today.`,
      btn_copy: "Copy Code",
      modal_cta: "Claim & Order Now",
      toast_copied: "Voucher code copied to clipboard!",

      gallery_modal_order: "Order This Room",
      order_title: "Order Your Rolife Kit",
      order_desc: "Leave your delivery info; our concierge will contact you within 15 minutes to confirm.",
      form_name: "Full Name *",
      form_phone: "Phone Number *",
      form_product: "Select Model *",
      form_voucher: "Voucher Code (Optional)",
      form_submit: "Confirm Order",
      opt_house: "Christmas Cottage Edition (Main) - $29.99",
      opt_farm: "Cozy Farmhouse Room - $21.99",
      opt_book: "Vintage Bookshop - $21.99",
      opt_cafe: "Corner Coffee Bar - $21.99",
      opt_cake: "Sweet Bakery Shop - $21.99",
      opt_combo: "Holiday Cottage + 3 Modular Rooms Bundle - 20% OFF",
      order_success_title: "Order Placed Successfully!",
      order_success_desc: "Thank you for choosing Rolife. We will contact you shortly to dispatch your order and gifts!",
      btn_view_gallery: "View Details",
      btn_buy: "Buy Now"
    }
  };

  let currentLang = 'vi';

  // Function to apply language changes
  function applyLanguage(lang) {
    currentLang = lang;
    const dictionary = i18nData[lang];
    if (!dictionary) return;

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dictionary[key]) {
        el.innerHTML = dictionary[key];
      }
    });

    // Update Lang Switcher UI
    const currentLangEl = document.getElementById('current-lang');
    if (currentLangEl) {
      currentLangEl.textContent = lang.toUpperCase();
    }

    // Re-render products to update language in dynamic elements
    renderProducts(activeCategory);
  }

  // Switch language button listener
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const newLang = currentLang === 'vi' ? 'en' : 'vi';
      applyLanguage(newLang);
    });
  }


  /* ==========================================================================
     2. DỮ LIỆU 12 CĂN PHÒNG MINI (SUB-PRODUCTS DATA)
     ========================================================================== */
  const products = [
    {
      id: "farm-house",
      prefix: "farm-house",
      category: "living",
      imageCount: 7,
      name_vi: "Nông Trại Thư Thái",
      name_en: "Cozy Farmhouse",
      category_vi: "Không Gian Sống",
      category_en: "Living Spaces",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Căn bếp đồng quê ngập tràn hoa cỏ, nông sản và giỏ mây mộc mạc.",
      desc_en: "Rustic countryside kitchen with fresh produce and woven baskets."
    },
    {
      id: "book-store",
      prefix: "book-store",
      category: "lifestyle",
      imageCount: 7,
      name_vi: "Tiệm Sách Cổ Tích",
      name_en: "Vintage Bookshop",
      category_vi: "Sở Thích & Mua Sắm",
      category_en: "Hobbies & Boutiques",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Kệ sách gỗ cao chạm trần với hàng trăm tựa sách cổ và thang cuốn mini.",
      desc_en: "Floor-to-ceiling wooden shelves packed with antique tomes."
    },
    {
      id: "cafe",
      prefix: "cafe",
      category: "culinary",
      imageCount: 7,
      name_vi: "Quán Cà Phê Góc Phố",
      name_en: "Corner Coffee Bar",
      category_vi: "Ẩm Thực & Thư Giãn",
      category_en: "Culinary & Dining",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Máy pha espresso sáng bóng, menu phấn vẽ tay và bàn đá cẩm thạch.",
      desc_en: "Polished espresso machine, chalkboard menu, and marble counter."
    },
    {
      id: "cake-shop",
      prefix: "cake-shop",
      category: "culinary",
      imageCount: 7,
      name_vi: "Tiệm Bánh Ngọt Ngào",
      name_en: "Sweet Bakery Shop",
      category_vi: "Ẩm Thực & Thư Giãn",
      category_en: "Culinary & Dining",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Tủ bánh kem đa tầng, bánh sừng bò giòn rụm và mùi vani thoang thoảng.",
      desc_en: "Tiered cake vitrine, golden croissants, and delicate patisseries."
    },
    {
      id: "ice-cream",
      prefix: "ice-cream",
      category: "culinary",
      imageCount: 7,
      name_vi: "Cửa Hàng Kem Sắc Màu",
      name_en: "Frosty Ice Cream Parlor",
      category_vi: "Ẩm Thực & Thư Giãn",
      category_en: "Culinary & Dining",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Quầy kem ốc quế gelato tươi mát với bảng màu pastel rực rỡ vui tươi.",
      desc_en: "Vibrant gelato parlor with pastel waffle cones and sundae cups."
    },
    {
      id: "kitchen",
      prefix: "kitchen",
      category: "living",
      imageCount: 6,
      name_vi: "Gian Bếp Hiện Đại",
      name_en: "Gourmet Kitchen",
      category_vi: "Không Gian Sống",
      category_en: "Living Spaces",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Đảo bếp tinh gọn, xoong chảo inox siêu nhỏ và gia vị sắp đặt ngăn nắp.",
      desc_en: "Minimalist island kitchen, micro cookware, and spice organizers."
    },
    {
      id: "living-room",
      prefix: "living-room",
      category: "living",
      imageCount: 7,
      name_vi: "Phòng Khách Sum Vầy",
      name_en: "Warm Living Room",
      category_vi: "Không Gian Sống",
      category_en: "Living Spaces",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Ghế sofa êm ái, máy hát đĩa vinyl cổ và chậu cây trầu bà xanh mát.",
      desc_en: "Plush sectional sofa, vintage turntable, and lush houseplants."
    },
    {
      id: "bedroom",
      prefix: "bedroom",
      category: "living",
      imageCount: 7,
      name_vi: "Phòng Ngủ Mơ Màng",
      name_en: "Dreamy Bedroom",
      category_vi: "Không Gian Sống",
      category_en: "Living Spaces",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Chiếc giường êm ái với gối nhung, bàn đèn ngủ và rèm cửa mềm mại.",
      desc_en: "Cozy bed with velvet throw cushions and bedside reading lamp."
    },
    {
      id: "pet-shop",
      prefix: "pet-shop",
      category: "lifestyle",
      imageCount: 7,
      name_vi: "Tiệm Thú Cưng Đáng Yêu",
      name_en: "Fluffy Pet Care Hub",
      category_vi: "Sở Thích & Mua Sắm",
      category_en: "Hobbies & Boutiques",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Ngôi nhà nhỏ cho chó mèo, nhà leo trèo cào móng và thức ăn hạt mini.",
      desc_en: "Cat scratching posts, puppy beds, and miniature pet essentials."
    },
    {
      id: "tea",
      prefix: "tea",
      category: "culinary",
      imageCount: 6,
      name_vi: "Trà Quán An Yên",
      name_en: "Zen Tea House",
      category_vi: "Ẩm Thực & Thư Giãn",
      category_en: "Culinary & Dining",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Ấm trà tử sa, bàn trà đạo phong cách thiền định và hộp trà thượng hạng.",
      desc_en: "Zen tea table, ceramic teapot, and fragrant artisanal tea leaves."
    },
    {
      id: "bar",
      prefix: "bar",
      category: "culinary",
      imageCount: 6,
      name_vi: "Quầy Bar Hoàng Hôn",
      name_en: "Twilight Bistro & Bar",
      category_vi: "Ẩm Thực & Thư Giãn",
      category_en: "Culinary & Dining",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Dàn ly cocktail thủy tinh lấp lánh cùng bộ bình lắc shaker chuyên nghiệp.",
      desc_en: "Gleaming cocktail glasses, vintage spirits, and shaker accessories."
    },
    {
      id: "beauty-secret",
      prefix: "beauty-secret",
      category: "lifestyle",
      imageCount: 7,
      name_vi: "Bàn Trang Điểm Quý Phái",
      name_en: "Beauty Boudoir",
      category_vi: "Sở Thích & Mua Sắm",
      category_en: "Hobbies & Boutiques",
      price_vi: "499.000đ",
      price_en: "$21.99",
      originalPrice_vi: "599.000đ",
      originalPrice_en: "$26.99",
      desc_vi: "Gương đèn viền sang trọng, bộ son môi phấn mắt và chai nước hoa thanh lịch.",
      desc_en: "Illuminated vanity mirror, luxury perfumes, and cosmetic bottles."
    }
  ];

  /* ==========================================================================
     3. RENDER PRODUCTS & TABS FILTERING (DYNAMIC LOADING)
     ========================================================================== */
  const productsGrid = document.getElementById('products-grid');
  const tabButtons = document.querySelectorAll('.tab-btn');
  let activeCategory = 'all';

  function renderProducts(category = 'all') {
    if (!productsGrid) return;
    activeCategory = category;

    const filtered = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    const isEn = currentLang === 'en';

    // Tạo HTML các thẻ sản phẩm với loading lazy và dynamic gallery trigger
    productsGrid.innerHTML = filtered.map(item => {
      const name = isEn ? item.name_en : item.name_vi;
      const catName = isEn ? item.category_en : item.category_vi;
      const price = isEn ? item.price_en : item.price_vi;
      const origPrice = isEn ? item.originalPrice_en : item.originalPrice_vi;
      const btnViewText = isEn ? i18nData.en.btn_view_gallery : i18nData.vi.btn_view_gallery;
      const btnBuyText = isEn ? i18nData.en.btn_buy : i18nData.vi.btn_buy;
      
      return `
        <article class="product-card" data-id="${item.id}">
          <div class="product-thumb-wrap">
            <img src="images/${item.prefix}-1.webp" 
                 alt="${name}" 
                 loading="lazy" 
                 decoding="async" 
                 width="400" 
                 height="400">
            <span class="product-badge-tag">${catName}</span>
            <span class="product-img-count">📷 ${item.imageCount}</span>
          </div>
          <div class="product-info">
            <h3 class="product-title">${name}</h3>
            <p class="product-category-name">${isEn ? item.desc_en : item.desc_vi}</p>
            <div class="product-price-bar">
              <span class="product-price">${price}</span>
              <span class="product-original-price">${origPrice}</span>
            </div>
            <div class="product-actions-bar">
              <a href="product.html?id=${item.id}" class="btn-view-gallery" style="text-align: center;">
                ${btnViewText}
              </a>
              <button type="button" class="btn-buy-card open-order-modal" data-product-name="${name}">
                ${btnBuyText}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Gắn sự kiện click mở modal Gallery cho các nút vừa tạo
    attachGalleryTriggers();
  }

  // Khởi chạy render lần đầu
  renderProducts('all');

  // Xử lý chuyển Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      
      const category = btn.getAttribute('data-category');
      renderProducts(category);
    });
  });


  /* ==========================================================================
     4. STICKY HEADER & MOBILE NAVIGATION LOGIC
     ========================================================================== */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Bắt sự kiện cuộn trang đổi màu nền header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Toggle Hamburger Menu trên Mobile
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Tự động đóng menu khi nhấp vào bất kỳ link nào
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });
  }


  /* ==========================================================================
     5. ACCORDION LOGIC CHO THÔNG SỐ KỸ THUẬT
     ========================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const btn = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');

    // Thiết lập chiều cao mở ban đầu nếu có class active
    if (item.classList.contains('active') && content) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Đóng tất cả các item khác để tạo trải nghiệm tinh gọn
      accordionItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.accordion-header');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Bật/tắt item hiện tại
      if (isActive) {
        item.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });


  /* ==========================================================================
     6. TIMED PROMOTION MODAL (TỰ ĐỘNG BẬT SAU 10S)
     ========================================================================== */
  const promoModal = document.getElementById('promo-modal');
  const promoClose = document.getElementById('promo-close');
  const copyVoucherBtn = document.getElementById('copy-voucher-btn');
  const voucherCodeEl = document.getElementById('voucher-code');
  const voucherToast = document.getElementById('voucher-toast');

  let promoShown = false;

  // Hẹn giờ 10 giây (10,000ms)
  setTimeout(() => {
    // Chỉ bật nếu chưa hiển thị và chưa đóng trong session
    if (!promoShown && !sessionStorage.getItem('promo_dismissed')) {
      openModal(promoModal);
      promoShown = true;
    }
  }, 10000);

  if (promoClose) {
    promoClose.addEventListener('click', () => {
      closeModal(promoModal);
      sessionStorage.setItem('promo_dismissed', 'true');
    });
  }

  // Sao chép mã Voucher nhanh chóng
  if (copyVoucherBtn && voucherCodeEl && voucherToast) {
    copyVoucherBtn.addEventListener('click', () => {
      const code = voucherCodeEl.textContent.trim();
      navigator.clipboard.writeText(code).then(() => {
        const msg = currentLang === 'en' ? i18nData.en.toast_copied : i18nData.vi.toast_copied;
        voucherToast.textContent = msg;
        copyVoucherBtn.textContent = '✓ ' + (currentLang === 'en' ? 'Copied' : 'Đã Chép');
        setTimeout(() => {
          voucherToast.textContent = '';
          copyVoucherBtn.textContent = currentLang === 'en' ? i18nData.en.btn_copy : i18nData.vi.btn_copy;
        }, 2500);
      });
    });
  }


  /* ==========================================================================
     7. GALLERY PREVIEW MODAL (XEM CHI TIẾT 6-7 ẢNH CỦA PHÒNG)
     ========================================================================== */
  const galleryModal = document.getElementById('gallery-modal');
  const galleryModalClose = document.getElementById('gallery-modal-close');
  const galleryTitle = document.getElementById('gallery-modal-title');
  const gallerySubtitle = document.getElementById('gallery-modal-subtitle');
  const galleryMainImg = document.getElementById('gallery-modal-main-img');
  const galleryThumbs = document.getElementById('gallery-modal-thumbs');

  function attachGalleryTriggers() {
    document.querySelectorAll('.btn-view-gallery').forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.getAttribute('data-product-id');
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const isEn = currentLang === 'en';
        galleryTitle.textContent = isEn ? product.name_en : product.name_vi;
        gallerySubtitle.textContent = isEn ? product.desc_en : product.desc_vi;

        // Ảnh chính ban đầu
        galleryMainImg.src = `images/${product.prefix}-1.webp`;
        galleryMainImg.alt = isEn ? product.name_en : product.name_vi;

        // Tạo danh sách ảnh thumbnails
        let thumbsHTML = '';
        for (let i = 1; i <= product.imageCount; i++) {
          const imgSrc = `images/${product.prefix}-${i}.webp`;
          thumbsHTML += `
            <button type="button" class="gallery-thumb-btn ${i === 1 ? 'active' : ''}" data-src="${imgSrc}">
              <img src="${imgSrc}" alt="Thumbnail ${i}" loading="lazy" width="70" height="70">
            </button>
          `;
        }
        galleryThumbs.innerHTML = thumbsHTML;

        // Bắt sự kiện chọn thumbnail
        const thumbButtons = galleryThumbs.querySelectorAll('.gallery-thumb-btn');
        thumbButtons.forEach(tBtn => {
          tBtn.addEventListener('click', () => {
            thumbButtons.forEach(b => b.classList.remove('active'));
            tBtn.classList.add('active');
            galleryMainImg.src = tBtn.getAttribute('data-src');
          });
        });

        openModal(galleryModal);
      });
    });
  }

  if (galleryModalClose) {
    galleryModalClose.addEventListener('click', () => {
      closeModal(galleryModal);
    });
  }


  /* ==========================================================================
     8. ORDER MODAL & FORM SUBMISSION
     ========================================================================== */
  const orderModal = document.getElementById('order-modal');
  const orderModalClose = document.getElementById('order-modal-close');
  const orderForm = document.getElementById('order-form');
  const orderSuccessMsg = document.getElementById('order-success-msg');
  const productSelect = document.getElementById('product-select');

  // Lắng nghe sự kiện mở Modal Đặt Hàng (Event Delegation toàn diện)
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-order-modal');
    if (!btn) return;

    closeModal(promoModal);
    closeModal(galleryModal);

    const productName = btn.getAttribute('data-product-name');
    if (productName && productSelect) {
      const matchingOption = Array.from(productSelect.options).find(opt => opt.text.includes(productName));
      if (matchingOption) {
        matchingOption.selected = true;
      }
    }

    openModal(orderModal);
  });

  if (orderModalClose) {
    orderModalClose.addEventListener('click', () => {
      closeModal(orderModal);
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Giả lập gửi đơn hàng thành công
      orderForm.style.display = 'none';
      if (orderSuccessMsg) {
        orderSuccessMsg.style.display = 'block';
      }
      setTimeout(() => {
        closeModal(orderModal);
        // Reset form sau khi đóng
        setTimeout(() => {
          orderForm.reset();
          orderForm.style.display = 'flex';
          if (orderSuccessMsg) orderSuccessMsg.style.display = 'none';
        }, 500);
      }, 3000);
    });
  }


  /* ==========================================================================
     9. COMMON MODAL CONTROLLERS (OVERLAY CLICK & ESCAPE KEY)
     ========================================================================== */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('show');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Khóa cuộn trang khi mở modal
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('show');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Đóng modal khi nhấp ra ngoài nền mờ
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Đóng bằng phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.show').forEach(m => closeModal(m));
    }
  });

  /* ==========================================================================
     10. CAROUSEL SLIDER CONTROLS & TOUCH/SWIPE (SECTION ĐIỂM NỔI BẬT)
     ========================================================================== */
  const featSlider = document.getElementById('featured-slider');
  const featPrevBtn = document.getElementById('feat-slider-prev');
  const featNextBtn = document.getElementById('feat-slider-next');

  if (featSlider && featPrevBtn && featNextBtn) {
    // Tính toán độ rộng trượt của 1 card (bao gồm khoảng cách gap)
    function getCardScrollStep() {
      const firstCard = featSlider.querySelector('.glass-card');
      if (!firstCard) return 380;
      const computedStyle = window.getComputedStyle(featSlider);
      const gap = parseFloat(computedStyle.gap) || 24;
      return firstCard.offsetWidth + gap;
    }

    // Cập nhật trạng thái hiển thị (disabled) của 2 nút mũi tên
    function updateArrowStatus() {
      const scrollLeft = Math.ceil(featSlider.scrollLeft);
      const maxScrollLeft = featSlider.scrollWidth - featSlider.clientWidth;

      if (scrollLeft <= 10) {
        featPrevBtn.classList.add('disabled');
        featPrevBtn.setAttribute('aria-disabled', 'true');
      } else {
        featPrevBtn.classList.remove('disabled');
        featPrevBtn.setAttribute('aria-disabled', 'false');
      }

      if (scrollLeft >= maxScrollLeft - 10) {
        featNextBtn.classList.add('disabled');
        featNextBtn.setAttribute('aria-disabled', 'true');
      } else {
        featNextBtn.classList.remove('disabled');
        featNextBtn.setAttribute('aria-disabled', 'false');
      }
    }

    // Sự kiện click nút mũi tên Trái (Prev)
    featPrevBtn.addEventListener('click', () => {
      const step = getCardScrollStep();
      featSlider.scrollBy({
        left: -step,
        behavior: 'smooth'
      });
    });

    // Sự kiện click nút mũi tên Phải (Next)
    featNextBtn.addEventListener('click', () => {
      const step = getCardScrollStep();
      featSlider.scrollBy({
        left: step,
        behavior: 'smooth'
      });
    });

    // Lắng nghe sự kiện cuộn để cập nhật nút mũi tên
    featSlider.addEventListener('scroll', () => {
      window.requestAnimationFrame(updateArrowStatus);
    }, { passive: true });

    // Khởi tạo kiểm tra vị trí ban đầu
    setTimeout(updateArrowStatus, 250);
    window.addEventListener('resize', updateArrowStatus, { passive: true });

    // Hỗ trợ kéo chuột trên Desktop (Mouse Drag-to-Scroll)
    let isMouseDown = false;
    let startPageX = 0;
    let initialScrollLeft = 0;

    featSlider.addEventListener('mousedown', (e) => {
      isMouseDown = true;
      featSlider.style.cursor = 'grabbing';
      featSlider.style.userSelect = 'none';
      startPageX = e.pageX - featSlider.offsetLeft;
      initialScrollLeft = featSlider.scrollLeft;
    });

    window.addEventListener('mouseup', () => {
      if (isMouseDown) {
        isMouseDown = false;
        featSlider.style.cursor = '';
        featSlider.style.removeProperty('user-select');
      }
    });

    featSlider.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const currentX = e.pageX - featSlider.offsetLeft;
      const walk = (currentX - startPageX) * 1.4; // Tỉ lệ gia tốc cuộn
      featSlider.scrollLeft = initialScrollLeft - walk;
    });
  }

});
