/**
 * ==========================================================================
 * TASK MANAGEMENT DASHBOARD - JAVASCRIPT LOGIC
 * ==========================================================================
 * Các tính năng đáp ứng 100% Checklist:
 * 1. Header & Realtime Clock: Đồng hồ Giờ/Phút/Giây chạy liên tục bằng setInterval.
 * 2. Thử thách chống Input trống: Kiểm tra chuỗi rỗng và alert() cảnh báo.
 * 3. Thêm công việc: Lấy dữ liệu, sinh thẻ <li> động, cập nhật State.
 * 4. Đánh dấu hoàn thành: Click trực tiếp vào nội dung công việc để gạch ngang chữ.
 * 5. Xóa công việc: Mỗi dòng có nút xóa riêng biệt.
 * 6. Bộ lọc Task (Filter): Tất cả (All) / Chưa xong (Active) / Đã xong (Completed).
 * 7. LocalStorage: Lưu trữ (JSON.stringify) và đọc (JSON.parse), xử lý mảng rỗng [] an toàn.
 * 8. Footer: Đếm tổng số công việc chính xác.
 * 9. Mobile Responsive: Toggle ẩn/hiện Sidebar Drawer bằng nút Hamburger mượt mà.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Quản lý State & LocalStorage (Khởi tạo mảng rỗng [] an toàn)
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'taskflow_tasks_data';

  const loadTasksFromStorage = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Lỗi khi đọc LocalStorage:', error);
      return [];
    }
  };

  const saveTasksToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Lỗi khi lưu LocalStorage:', error);
    }
  };

  // Mảng dữ liệu tasks chính
  let tasks = loadTasksFromStorage();

  // Dữ liệu mẫu ban đầu nếu lần đầu mở ứng dụng chưa có task nào
  if (tasks.length === 0 && !localStorage.getItem(STORAGE_KEY)) {
    tasks = [
      { id: '1', title: 'Plan 1: Thiết kế Wireframe & Bố cục hệ thống', completed: false },
      { id: '2', title: 'Plan 2: Xây dựng giao diện CSS Grid & Flexbox chuẩn Mobile', completed: true },
      { id: '3', title: 'Plan 3: Tối ưu logic JavaScript và lưu trữ LocalStorage', completed: false }
    ];
    saveTasksToStorage();
  }

  // Bộ lọc hiện tại: 'all' | 'active' | 'completed'
  let currentFilter = 'all';

  // --------------------------------------------------------------------------
  // 2. DOM Elements
  // --------------------------------------------------------------------------
  const dashboardLayout = document.querySelector('.dashboard-layout');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const liveClock = document.getElementById('liveClock');
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const taskCount = document.getElementById('taskCount');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // --------------------------------------------------------------------------
  // 3. Đồng hồ thời gian thực (Giờ/Phút/Giây) chạy bằng setInterval
  // --------------------------------------------------------------------------
  const startRealtimeClock = () => {
    const updateTime = () => {
      const now = new Date();
      const pad = (num) => String(num).padStart(2, '0');
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const seconds = pad(now.getSeconds());
      const timeString = `${hours}:${minutes}:${seconds}`;

      if (liveClock) {
        liveClock.textContent = timeString;
        liveClock.setAttribute('datetime', timeString);
      }
    };

    updateTime(); // Chạy ngay lập tức khi load trang
    setInterval(updateTime, 1000); // Lặp lại mỗi giây
  };

  startRealtimeClock();

  // --------------------------------------------------------------------------
  // 4. Toggle Sidebar (Desktop & Mobile Drawer)
  // --------------------------------------------------------------------------
  const toggleDesktopSidebar = () => {
    if (dashboardLayout) {
      dashboardLayout.classList.toggle('sidebar-expanded');
    }
  };

  const openMobileSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.add('mobile-open');
      sidebarOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileSidebar = () => {
    if (sidebar && sidebarOverlay) {
      sidebar.classList.remove('mobile-open');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileSidebar();
      } else {
        toggleDesktopSidebar();
      }
    });
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeMobileSidebar);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileSidebar();
    }
  });

  // --------------------------------------------------------------------------
  // 5. Cập nhật Footer đếm số lượng công việc
  // --------------------------------------------------------------------------
  const updateFooterCounter = () => {
    if (taskCount) {
      taskCount.textContent = tasks.length;
    }
  };

  // Hàm bảo vệ chống XSS an toàn khi chèn text
  const escapeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  // --------------------------------------------------------------------------
  // 6. Render Task List theo Filter (Tất cả / Chưa xong / Đã xong)
  // --------------------------------------------------------------------------
  const renderTasks = () => {
    if (!taskList) return;

    taskList.innerHTML = '';

    // Lọc danh sách công việc dựa theo trạng thái
    const filteredTasks = tasks.filter((task) => {
      if (currentFilter === 'active') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      return true; // 'all'
    });

    if (filteredTasks.length === 0) {
      let emptyMsg = 'Chưa có công việc nào. Hãy thêm công việc mới ở trên!';
      if (currentFilter === 'active') emptyMsg = 'Tuyệt vời! Không còn công việc nào chưa hoàn thành.';
      if (currentFilter === 'completed') emptyMsg = 'Chưa có công việc nào được hoàn thành.';

      taskList.innerHTML = `
        <li class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 12h8"></path>
          </svg>
          <p class="empty-state-text">${emptyMsg}</p>
        </li>
      `;
      updateFooterCounter();
      return;
    }

    filteredTasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      li.setAttribute('data-id', task.id);

      li.innerHTML = `
        <div class="task-item-left" title="Nhấn để đổi trạng thái hoàn thành">
          <button type="button" class="task-checkbox-btn" aria-label="${task.completed ? 'Đánh dấu chưa xong' : 'Đánh dấu đã xong'}">
            <svg class="check-mark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </button>
          <span class="task-title">${escapeHTML(task.title)}</span>
        </div>
        <div class="task-actions">
          <button type="button" class="action-btn delete-btn" aria-label="Xóa công việc" title="Xóa công việc">
            <svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `;

      // 1. Click vào nội dung công việc (hoặc checkbox) -> Toggle hoàn thành (Gạch ngang chữ)
      const taskItemLeft = li.querySelector('.task-item-left');
      taskItemLeft.addEventListener('click', () => {
        toggleTaskStatus(task.id);
      });

      // 2. Click nút "Xóa" riêng biệt cho mỗi dòng
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Không kích hoạt sự kiện toggle hoàn thành
        deleteTask(task.id);
      });

      taskList.appendChild(li);
    });

    updateFooterCounter();
  };

  // --------------------------------------------------------------------------
  // 7. Thao tác Logic Task: Thêm / Toggle / Xóa
  // --------------------------------------------------------------------------

  // Thêm công việc (Kèm bẫy chống Input trống bằng alert)
  if (taskForm) {
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const taskTitle = taskInput ? taskInput.value.trim() : '';

      // BẪY LOGIC BẮT BUỘC: Nếu input rỗng -> alert() và chặn không cho thêm
      if (!taskTitle) {
        alert('Vui lòng nhập nội dung công việc trước khi thêm!');
        if (taskInput) taskInput.focus();
        return;
      }

      // Tạo công việc mới
      const newTask = {
        id: Date.now().toString(),
        title: taskTitle,
        completed: false
      };

      tasks.unshift(newTask);
      saveTasksToStorage();
      renderTasks();

      // Reset form input
      taskInput.value = '';
      taskInput.focus();
    });
  }

  // Đổi trạng thái hoàn thành (Toggle complete)
  const toggleTaskStatus = (id) => {
    tasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    saveTasksToStorage();
    renderTasks();
  };

  // Xóa công việc
  const deleteTask = (id) => {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasksToStorage();
    renderTasks();
  };

  // --------------------------------------------------------------------------
  // 8. Xử lý Bộ lọc Task (All / Active / Completed)
  // --------------------------------------------------------------------------
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderTasks();
    });
  });

  // --------------------------------------------------------------------------
  // 9. Khởi chạy hiển thị lần đầu
  // --------------------------------------------------------------------------
  renderTasks();
});
