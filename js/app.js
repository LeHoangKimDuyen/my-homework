/**
 * WEATHER & TRAVEL PLANNER - JAVASCRIPT ENGINE
 * Tech Stack: Pure Vanilla JavaScript (ES6+)
 * Features:
 *  1. City Weather Data & Dynamic Theme Gradient Switching (Option 1A & 3A)
 *  2. Smart Suggestions Engine (Temperature-based apparel/gear advice)
 *  3. Realtime Departure Countdown Pill Timer with LocalStorage & Celebration (Option 2B)
 *  4. Full Itinerary List Management (Search, Filter, Sort by Title, Pagination: 10, 20, 50, all)
 */

document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 0. THEME PERSISTENCE ENGINE (css/style.css vs css/minimalism.css)
  // =========================================================================
  const THEME_STORAGE_KEY = "planner_active_theme_href";
  const themeStylesheet = document.getElementById("theme-stylesheet");

  function applyTheme(href) {
    if (themeStylesheet && href) {
      themeStylesheet.setAttribute("href", href);
      localStorage.setItem(THEME_STORAGE_KEY, href);
    }
  }

  // Restore saved theme from localStorage on load
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // Expose global helper in console/window for convenience
  window.setAppTheme = function(themeNameOrHref) {
    if (themeNameOrHref === "anti" || themeNameOrHref === "editorial" || themeNameOrHref.includes("anti.css")) {
      applyTheme("css/anti.css");
    } else if (themeNameOrHref === "minimalism" || themeNameOrHref === "cute" || themeNameOrHref.includes("minimalism.css")) {
      applyTheme("css/minimalism.css");
    } else {
      applyTheme("css/style.css");
    }
  };

  // =========================================================================
  // 1. DATASETS & CITY WEATHER (Option 1A)
  // =========================================================================
  const CITIES_DATA = [
    {
      id: "hanoi",
      name: "Hà Nội",
      country: "Việt Nam",
      temp: 24,
      feels: 25,
      condition: "Nhiều mây, dịu mát",
      humidity: "72%",
      wind: "14 km/h",
      uv: "4 - Trung bình",
      theme: "theme-pleasant",
      iconType: "cloudy"
    },
    {
      id: "danang",
      name: "Đà Nẵng",
      country: "Việt Nam",
      temp: 29,
      feels: 31,
      condition: "Nắng nhẹ ven biển",
      humidity: "65%",
      wind: "18 km/h",
      uv: "6 - Cao",
      theme: "theme-pleasant",
      iconType: "sun-cloud"
    },
    {
      id: "saigon",
      name: "TP. Hồ Chí Minh",
      country: "Việt Nam",
      temp: 34,
      feels: 38,
      condition: "Nắng gắt, oi bức",
      humidity: "58%",
      wind: "11 km/h",
      uv: "9 - Rất cao",
      theme: "theme-hot",
      iconType: "sunny"
    },
    {
      id: "sapa",
      name: "Sa Pa",
      country: "Việt Nam",
      temp: 11,
      feels: 9,
      condition: "Sương mù, se lạnh",
      humidity: "88%",
      wind: "16 km/h",
      uv: "2 - Thấp",
      theme: "theme-cold",
      iconType: "cold"
    },
    {
      id: "tokyo",
      name: "Tokyo",
      country: "Nhật Bản",
      temp: 14,
      feels: 13,
      condition: "Gió lạnh thu đông",
      humidity: "50%",
      wind: "20 km/h",
      uv: "3 - Trung bình",
      theme: "theme-cold",
      iconType: "cold"
    },
    {
      id: "bangkok",
      name: "Bangkok",
      country: "Thái Lan",
      temp: 35,
      feels: 41,
      condition: "Trời nắng chói chang",
      humidity: "62%",
      wind: "12 km/h",
      uv: "10 - Rất cao",
      theme: "theme-hot",
      iconType: "sunny"
    }
  ];

  // SVG Weather Icons Generator
  function getWeatherSvg(type) {
    switch (type) {
      case "cold":
        return `
          <svg viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"></line>
            <circle cx="12" cy="12" r="3" fill="#38bdf8" fill-opacity="0.3"></circle>
          </svg>`;
      case "sunny":
        return `
          <svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5" fill="#fb923c" fill-opacity="0.25"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
      case "sun-cloud":
        return `
          <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="10" r="4" stroke="#fbbf24"></circle>
            <path d="M17.5 19H9a5 5 0 0 1 0-10 5 5 0 0 1 8.5 3.5 3.5 3.5 0 0 1 0 6.5Z"></path>
          </svg>`;
      default: // cloudy
        return `
          <svg viewBox="0 0 24 24" fill="none" stroke="#93c5fd" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="#93c5fd" fill-opacity="0.2"></path>
          </svg>`;
    }
  }

  // =========================================================================
  // 2. DOM ELEMENTS
  // =========================================================================
  const citySelect = document.getElementById("city-select");
  const weatherCity = document.getElementById("weather-city");
  const weatherCountry = document.getElementById("weather-country");
  const weatherDate = document.getElementById("weather-date");
  const weatherTemp = document.getElementById("weather-temp");
  const weatherCondition = document.getElementById("weather-condition");
  const weatherFeels = document.getElementById("weather-feels");
  const weatherHumidity = document.getElementById("weather-humidity");
  const weatherWind = document.getElementById("weather-wind");
  const weatherUv = document.getElementById("weather-uv");
  const weatherIconWrapper = document.getElementById("weather-icon-wrapper");
  const suggestionContainer = document.getElementById("suggestion-container");

  // Countdown Elements
  const departureInput = document.getElementById("departure-datetime");
  const btnSaveDatetime = document.getElementById("btn-save-datetime");
  const timerDays = document.getElementById("timer-days");
  const timerHours = document.getElementById("timer-hours");
  const timerMinutes = document.getElementById("timer-minutes");
  const timerSeconds = document.getElementById("timer-seconds");
  const celebrationBanner = document.getElementById("celebration-banner");
  const countdownStatus = document.getElementById("countdown-status");

  // Planner Elements
  const itineraryForm = document.getElementById("itinerary-form");
  const itineraryInput = document.getElementById("itinerary-input");
  const searchInput = document.getElementById("search-input");
  const filterStatus = document.getElementById("filter-status");
  const sortTitle = document.getElementById("sort-title");
  const pageSizeSelect = document.getElementById("page-size-select");
  const itineraryList = document.getElementById("itinerary-list");
  const itemCounter = document.getElementById("item-counter");
  const paginationFooter = document.getElementById("pagination-footer");

  // =========================================================================
  // 3. WEATHER & SMART SUGGESTIONS LOGIC
  // =========================================================================
  function renderCityOptions() {
    citySelect.innerHTML = CITIES_DATA.map(
      (c) => `<option value="${c.id}">${c.name} (${c.country})</option>`
    ).join("");
  }

  function updateSmartSuggestions(temp) {
    let suggestionHtml = "";

    if (temp < 15) {
      suggestionHtml = `
        <div class="suggestion-box cold">
          <div class="suggestion-icon-circle">🧣</div>
          <div class="suggestion-info">
            <h4>Nhiệt độ thấp (${temp}°C) — Chú ý giữ ấm</h4>
            <p>Thời tiết khá lạnh. Hãy mang theo áo len, áo khoác dày, khăn quàng cổ và giữ ấm cơ thể khi di chuyển ngoài trời.</p>
            <div class="suggestion-tags">
              <span class="suggestion-tag">🧥 Áo khoác dày</span>
              <span class="suggestion-tag">🧣 Khăn choàng</span>
              <span class="suggestion-tag">🧤 Găng tay</span>
              <span class="suggestion-tag">☕ Bình nước ấm</span>
            </div>
          </div>
        </div>
      `;
    } else if (temp <= 30) {
      suggestionHtml = `
        <div class="suggestion-box pleasant">
          <div class="suggestion-icon-circle">👟</div>
          <div class="suggestion-info">
            <h4>Nhiệt độ lý tưởng (${temp}°C) — Thoải mái trải nghiệm</h4>
            <p>Khí hậu rất thuận lợi cho các hoạt động ngoài trời. Khuyên bạn nên chuẩn bị trang phục nhẹ nhàng, giày thể thao êm ái.</p>
            <div class="suggestion-tags">
              <span class="suggestion-tag">👕 Áo thun thoáng khí</span>
              <span class="suggestion-tag">👟 Giày thể thao</span>
              <span class="suggestion-tag">🎒 Balo du lịch nhẹ</span>
            </div>
          </div>
        </div>
      `;
    } else {
      suggestionHtml = `
        <div class="suggestion-box hot">
          <div class="suggestion-icon-circle">🕶️</div>
          <div class="suggestion-info">
            <h4>Nhiệt độ cao (${temp}°C) — Chống nắng & Cấp nước</h4>
            <p>Thời tiết nắng nóng, chỉ số nhiệt cao. Hãy uống nhiều nước lọc, thoa kem chống nắng, đội mũ rộng vành và đeo kính râm.</p>
            <div class="suggestion-tags">
              <span class="suggestion-tag">🧴 Kem chống nắng</span>
              <span class="suggestion-tag">🕶️ Kính râm</span>
              <span class="suggestion-tag">🧢 Mũ che nắng</span>
              <span class="suggestion-tag">💧 Nước bù khoáng</span>
            </div>
          </div>
        </div>
      `;
    }

    suggestionContainer.innerHTML = suggestionHtml;
  }

  function applyCityWeather(cityId) {
    const city = CITIES_DATA.find((c) => c.id === cityId) || CITIES_DATA[0];

    // Dynamic Atmospheric Theme Background (Option 3A)
    document.body.className = city.theme;

    weatherCity.textContent = city.name;
    weatherCountry.textContent = city.country;
    weatherTemp.textContent = city.temp;
    weatherFeels.textContent = `${city.feels}°C`;
    weatherCondition.textContent = city.condition;
    weatherHumidity.textContent = city.humidity;
    weatherWind.textContent = city.wind;
    weatherUv.textContent = city.uv;
    weatherIconWrapper.innerHTML = getWeatherSvg(city.iconType);

    // Format current date nicely
    const now = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    weatherDate.textContent = now.toLocaleDateString("vi-VN", options);

    // Update suggestions based on temperature
    updateSmartSuggestions(city.temp);
  }

  citySelect.addEventListener("change", (e) => {
    applyCityWeather(e.target.value);
  });

  // =========================================================================
  // 4. DEPARTURE COUNTDOWN PILL TIMER (Option 2B)
  // =========================================================================
  const COUNTDOWN_STORAGE_KEY = "planner_departure_datetime";
  let countdownInterval = null;

  function padZero(num) {
    return num.toString().padStart(2, "0");
  }

  function startCountdown(targetIsoString) {
    if (countdownInterval) clearInterval(countdownInterval);

    const targetDate = new Date(targetIsoString).getTime();

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (isNaN(distance)) {
        timerDays.textContent = "00";
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        countdownStatus.textContent = "Chưa thiết lập";
        celebrationBanner.classList.add("hidden");
        return;
      }

      if (distance <= 0) {
        clearInterval(countdownInterval);
        timerDays.textContent = "00";
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
        countdownStatus.textContent = "Đã khởi hành";
        celebrationBanner.classList.remove("hidden");
        return;
      }

      // Calculations
      celebrationBanner.classList.add("hidden");
      countdownStatus.textContent = "Đang đếm ngược";

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      timerDays.textContent = padZero(days);
      timerHours.textContent = padZero(hours);
      timerMinutes.textContent = padZero(minutes);
      timerSeconds.textContent = padZero(seconds);
    }

    update();
    countdownInterval = setInterval(update, 1000);
  }

  function initCountdown() {
    const saved = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    if (saved) {
      departureInput.value = saved;
      startCountdown(saved);
    } else {
      // Default to 3 days in the future for a lively preview
      const defaultDeparture = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000);
      const isoLocal = new Date(defaultDeparture.getTime() - defaultDeparture.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      departureInput.value = isoLocal;
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, isoLocal);
      startCountdown(isoLocal);
    }
  }

  btnSaveDatetime.addEventListener("click", () => {
    if (departureInput.value) {
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, departureInput.value);
      startCountdown(departureInput.value);
    }
  });

  departureInput.addEventListener("change", () => {
    if (departureInput.value) {
      localStorage.setItem(COUNTDOWN_STORAGE_KEY, departureInput.value);
      startCountdown(departureInput.value);
    }
  });

  // =========================================================================
  // 5. TRAVEL ITINERARY & CHECKLIST ENGINE
  // (Search, Filter, Sort by title, Pagination: 10, 20, 50, all)
  // =========================================================================
  const ITINERARY_STORAGE_KEY = "planner_itinerary_items";

  // Initial Sample Items
  const DEFAULT_ITEMS = [
    { id: 1, title: "Kiểm tra vé máy bay và check-in online", completed: true },
    { id: 2, title: "Chuẩn bị hộ chiếu / CCCD và giấy tờ tùy thân", completed: true },
    { id: 3, title: "Đóng gói vali theo gợi ý thời tiết", completed: false },
    { id: 4, title: "Mang theo sạc dự phòng và bộ chuyển đổi nguồn", completed: false },
    { id: 5, title: "Đặt trước vé tham quan viện bảo tàng & danh lam", completed: false },
    { id: 6, title: "Cài đặt ứng dụng bản đồ ngoại tuyến (offline maps)", completed: false },
    { id: 7, title: "Đổi một ít tiền mặt mệnh giá nhỏ", completed: false },
    { id: 8, title: "Chuẩn bị thuốc cá nhân và băng keo y tế", completed: false },
    { id: 9, title: "Kiểm tra dự báo thời tiết giờ chót trước khi ra sân bay", completed: false },
    { id: 10, title: "Khóa cửa nhà cẩn thận và tắt các thiết bị điện", completed: false },
    { id: 11, title: "Đặt xe đưa đón sân bay", completed: false },
    { id: 12, title: "Gửi lịch trình di chuyển cho người thân", completed: false }
  ];

  let items = [];
  try {
    const raw = localStorage.getItem(ITINERARY_STORAGE_KEY);
    items = raw ? JSON.parse(raw) : DEFAULT_ITEMS;
  } catch (e) {
    items = DEFAULT_ITEMS;
  }

  let currentPage = 1;

  function saveItems() {
    localStorage.setItem(ITINERARY_STORAGE_KEY, JSON.stringify(items));
    renderItinerary();
  }

  function getProcessedItems() {
    let result = [...items];

    // 1. Search Query
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      result = result.filter((item) => item.title.toLowerCase().includes(query));
    }

    // 2. Status Filter
    const status = filterStatus.value;
    if (status === "pending") {
      result = result.filter((item) => !item.completed);
    } else if (status === "completed") {
      result = result.filter((item) => item.completed);
    }

    // 3. Sort on Title
    const sort = sortTitle.value;
    if (sort === "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title, "vi"));
    } else if (sort === "desc") {
      result.sort((a, b) => b.title.localeCompare(a.title, "vi"));
    }

    return result;
  }

  function renderItinerary() {
    const processed = getProcessedItems();
    const totalItems = processed.length;
    itemCounter.textContent = `${items.length} mục`;

    // Pagination Calculation
    const pageSizeVal = pageSizeSelect.value;
    const isAll = pageSizeVal === "all";
    const pageSize = isAll ? totalItems : parseInt(pageSizeVal, 10);
    const totalPages = isAll ? 1 : Math.max(1, Math.ceil(totalItems / pageSize));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = isAll ? 0 : (currentPage - 1) * pageSize;
    const paginatedItems = isAll ? processed : processed.slice(startIndex, startIndex + pageSize);

    // Render list
    if (paginatedItems.length === 0) {
      itineraryList.innerHTML = `
        <li class="empty-state">
          <p>Không tìm thấy mục nào phù hợp với bộ lọc.</p>
        </li>
      `;
    } else {
      itineraryList.innerHTML = paginatedItems
        .map(
          (item) => `
          <li class="itinerary-item ${item.completed ? "completed" : ""}" data-id="${item.id}">
            <div class="item-left">
              <input type="checkbox" class="item-checkbox" ${item.completed ? "checked" : ""} aria-label="Hoàn thành công việc">
              <span class="item-title">${escapeHtml(item.title)}</span>
            </div>
            <button type="button" class="btn-delete" title="Xóa mục này" aria-label="Xóa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </li>
        `
        )
        .join("");
    }

    // Render Pagination Controls
    renderPagination(totalItems, startIndex, paginatedItems.length, totalPages, isAll);
  }

  function renderPagination(total, start, count, totalPages, isAll) {
    if (total === 0) {
      paginationFooter.innerHTML = `<span class="pagination-info">0 kết quả</span>`;
      return;
    }

    const end = start + count;
    const infoText = isAll
      ? `Hiển thị toàn bộ ${total} mục`
      : `Hiển thị ${start + 1}–${end} trong số ${total} mục`;

    let buttonsHtml = "";
    if (!isAll && totalPages > 1) {
      buttonsHtml = `
        <div class="pagination-controls">
          <button type="button" class="page-btn" id="btn-prev" ${currentPage === 1 ? "disabled" : ""}>&laquo;</button>
          ${Array.from({ length: totalPages }, (_, i) => i + 1)
            .map(
              (p) =>
                `<button type="button" class="page-btn ${p === currentPage ? "active" : ""}" data-page="${p}">${p}</button>`
            )
            .join("")}
          <button type="button" class="page-btn" id="btn-next" ${currentPage === totalPages ? "disabled" : ""}>&raquo;</button>
        </div>
      `;
    }

    paginationFooter.innerHTML = `
      <span class="pagination-info">${infoText}</span>
      ${buttonsHtml}
    `;

    // Pagination events
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderItinerary();
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage++;
          renderItinerary();
        }
      });
    }

    paginationFooter.querySelectorAll(".page-btn[data-page]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        currentPage = parseInt(e.target.dataset.page, 10);
        renderItinerary();
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Event Listeners for Planner Form & List
  itineraryForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = itineraryInput.value.trim();
    if (!title) return;

    const newItem = {
      id: Date.now(),
      title: title,
      completed: false
    };

    items.unshift(newItem);
    itineraryInput.value = "";
    saveItems();
  });

  itineraryList.addEventListener("click", (e) => {
    const itemEl = e.target.closest(".itinerary-item");
    if (!itemEl) return;
    const id = parseInt(itemEl.dataset.id, 10);

    // Checkbox toggle
    if (e.target.classList.contains("item-checkbox")) {
      const targetItem = items.find((i) => i.id === id);
      if (targetItem) {
        targetItem.completed = e.target.checked;
        saveItems();
      }
      return;
    }

    // Delete item
    if (e.target.closest(".btn-delete")) {
      items = items.filter((i) => i.id !== id);
      saveItems();
    }
  });

  // Filter, Search, Sort, Page Size Events
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderItinerary();
  });

  filterStatus.addEventListener("change", () => {
    currentPage = 1;
    renderItinerary();
  });

  sortTitle.addEventListener("change", () => {
    renderItinerary();
  });

  pageSizeSelect.addEventListener("change", () => {
    currentPage = 1;
    renderItinerary();
  });

  // =========================================================================
  // 6. INITIALIZATION
  // =========================================================================
  renderCityOptions();
  applyCityWeather(CITIES_DATA[0].id);
  initCountdown();
  renderItinerary();
});
