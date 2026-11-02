/**
 * =========================================================
 * JAVASCRIPT ĐIỀU HÀNH — LÊ NGUYỄN NHẬT TRƯỜNG PORTFOLIO
 * Concept: TUYẾN METRO SÀI GÒN (Saigon Metro Transit System)
 * Tiêu chuẩn: Vanilla JavaScript ES6+, Không phụ thuộc thư viện ngoài
 * Tương thích: Chạy mượt mà 100% trên giao thức file:/// và HTTP
 * =========================================================
 */

'use strict';

/* =========================================================
   1. KHỐI DỮ LIỆU CẤU HÌNH TRUNG TÂM (DỄ SỬA ĐỔI)
   ========================================================= */
const METRO_CONFIG = {
  // Thông tin kỹ sư vận hành
  operator: {
    fullName: 'Lê Nguyễn Nhật Trường',
    university: 'Đại học Giao thông Vận tải TP.HCM (UTH)',
    faculty: 'Khoa Công nghệ Thông tin',
    cohort: 'K24 (2024 — Hiện tại)',
    targetRole: 'Software Engineer Trainee (Backend Focus)',
    internshipGoal: 'Thực tập SE Intern 2026',
    email: 'truonglnn0882@ut.edu.vn',
    githubUrl: 'https://github.com/lenguyennhattruongg'
  },

  // Danh mục 3 đồ án chính xác theo concept Vé Tàu Metro
    // Danh mục 4 đồ án chính xác theo concept Vé Tàu Metro (Dữ liệu thực chiến 100%)
  projects: {
    'remote-desktop': {
      id: 'remote-desktop',
      serial: 'TICKET № NET-01',
      routeCode: 'TCP/IP',
      course: 'Môn: Lập trình Mạng (Đồ án prj_UDM_06)',
      category: 'network',
      title: 'Remote Desktop Application (Client - Server)',
      summary: 'Ứng dụng điều khiển máy tính từ xa hoạt động theo mô hình Client - Server qua TCP/IP Socket. Hệ thống truyền phát luồng ảnh chụp màn hình và đồng bộ các sự kiện điều khiển chuột, bàn phím theo thời gian thực.',
      myRole: 'Lập trình viên Giao thức & ServerSocket (feature/protocol): Thiết kế cấu trúc gói tin nhị phân (Packet Protocol: Type + Payload Length + Body), lập trình cơ chế bắt tay kết nối TCP trên cổng 5000, tối ưu hóa bộ đệm phân mảnh mảng byte buffer nén để truyền tải stream màn hình mượt mà và đồng bộ sự kiện chuột/bàn phím không đơ giao diện.',
      whatILearned: 'Thấu hiểu sâu sắc tầng Transport TCP, xử lý bắt tay 3 bước (3-way handshake), kỹ thuật lập trình đa luồng (Multithreading Task.Run) tách biệt luồng nhận tín hiệu mạng và luồng giao diện WinForms, kiểm soát ngoại lệ SocketException khi mất kết nối đột ngột.',
      technologies: ['C# .NET 8.0', 'Socket TCP/IP', 'Screen Capture Stream', 'Custom Protocol', 'Multithreading'],
      githubUrl: 'https://github.com/duypham26/prj_UDM_06',
      status: 'Đã hoàn thành nghiệm thu',
      proofImages: [
        { src: './images/project-rdp-code.png', caption: 'ẢNH CHẠY THỰC TẾ: Visual Studio Debug mã nguồn ServerSocket & Command Protocol' },
        { src: './images/project-rdp-spec.png', caption: 'TÀI LIỆU KỸ THUẬT: Đặc tả gói tin nhị phân và bắt tay Socket TCP/IP (Protocol.md)' },
        { src: './images/project-rdp-pr.png', caption: 'MINH CHỨNG GITHUB: Pull Request chính thức bởi lenguyennhattruongg (11 commits)' }
      ]
    },

    'freshvend': {
      id: 'freshvend',
      serial: 'TICKET № OOP-02',
      routeCode: 'JAVA-SE',
      course: 'Môn: Lập trình Java & IoT (ThS. Nguyễn Văn Chiến)',
      category: 'java',
      title: 'FreshVend IoT Vending Machine System',
      summary: 'Hệ thống quản lý và vận hành máy bán hàng tự động thông minh bằng Java Spring Boot 3 kết nối IoT ESP32. Tiếp nhận dữ liệu quan trắc nhiệt độ/độ ẩm, kiểm soát khay chứa và kích hoạt motor Servo nhả hàng tự động.',
      myRole: 'Backend Developer (BE3): Xây dựng REST API tiếp nhận dữ liệu quan trắc nhiệt độ/độ ẩm từ vi điều khiển ESP32 (/api/iot/telemetry). Xây dựng DTO, Bean Validation (chặn nhiệt độ ngoài dải -40°C đến 80°C), Service layer xử lý cảnh báo quá nhiệt và điều khiển Servo nhả hàng.',
      whatILearned: 'Ứng dụng 4 nguyên lý OOP (Kế thừa, Đóng gói, Đa hình, Trừu tượng) vào kiến trúc phân lớp Controller-Service-Repository, xử lý bất đồng bộ kết nối phần cứng IoT với backend Java Spring Boot 3, viết unit test kiểm tra thuộc tính MQTT và REST API.',
      technologies: ['Java Spring Boot 3', 'ESP32 Wokwi IoT', 'REST API Telemetry', 'OOP Architecture', 'Thunder Client'],
      githubUrl: 'https://github.com/nguyenxuanhieu2903/freshvend-java',
      status: 'Đã hoàn thành nghiệm thu',
      proofImages: [
        { src: './images/project-freshvend-api-test.png', caption: 'ẢNH CHẠY THỰC TẾ: Test REST API Telemetry trên Thunder Client (200 OK • 6.5ms)' },
        { src: './images/project-freshvend-terminal.png', caption: 'LOG TERMINAL: Spring Boot 3 Embedded Tomcat chạy cổng 8080 nhận telemetry' },
        { src: './images/project-freshvend-wokwi.png', caption: 'MÔ PHỎNG PHẦN CỨNG: Mạch ESP32 + Cảm biến DHT22 + Servo nhả khay trên Wokwi' }
      ]
    },

    'vet-center': {
      id: 'vet-center',
      serial: 'TICKET № WEB-04',
      routeCode: 'MED-VET',
      course: 'Môn: Lập trình Web (ThS. Trần Thịnh Mạnh Đức)',
      category: 'web',
      title: 'Website Trung Tâm Thú Y (PetCare Vet Center)',
      summary: 'Hệ thống quản lý phòng khám và bệnh viện thú y trực tuyến (Đề tài Nhóm 2 - Mã HP 012012103105). Phân hệ quản lý hồ sơ thú cưng, đặt lịch khám dịch vụ, bệnh án y tế và kê đơn thuốc cho bác sĩ.',
      myRole: 'Vai trò thực tế (TV2 - Backend Dev 1): Thiết kế Sơ đồ thực thể quan hệ (ERD) MySQL 8.0 chuẩn 3NF, lập trình Models Django cho Pet, Appointment, MedicalRecord, PrescriptionItem. Xây dựng thuật toán chống trùng lịch bác sĩ và chống IDOR bảo mật thông tin chủ nuôi.',
      whatILearned: 'Chuẩn hóa CSDL 3NF, đánh chỉ mục Composite Index trên [appointment_date, doctor] đạt tốc độ truy vấn O(log N), kiểm tra ràng buộc toàn vẹn dữ liệu và cấu hình giao diện Django Admin chuyên nghiệp.',
      technologies: ['Python Django', 'MySQL 8.0 3NF', 'Anti Double-Booking', 'Anti-IDOR Security', 'Django Admin'],
      githubUrl: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
      status: 'Đang vận hành chính thức',
      proofImages: [
        { src: '../../assets/veterinary-erd-VdpYieiX.svg', caption: 'CSDL QUAN HỆ: Sơ đồ ERD 6 bảng chuẩn 3NF MySQL 8.0 phân hệ Y tế & Đặt lịch' },
        { src: './images/project-vet-architecture.png', caption: 'KIẾN TRÚC HỆ THỐNG: Mô hình phân lớp 3 tầng (Layered / 3-Tier MVC Architecture)' },
        { src: './images/project-vet-backend.png', caption: 'BÁO CÁO KỸ THUẬT: Đặc tả phân hệ Backend Django ORM & Quản trị Django Admin' }
      ]
    },

    'portfolio-group': {
      id: 'portfolio-group',
      serial: 'TICKET № WEB-03',
      routeCode: 'MPA-UTH',
      course: 'Môn: Lập trình Web (Nhóm 02)',
      category: 'web',
      title: 'Group Portfolio Website Hub',
      summary: 'Nền tảng website Nhóm 02 (6 sinh viên UTH) kiến trúc đa trang (Multi-Page Application) tối ưu bằng Vite. Tích hợp thanh tìm kiếm thành viên theo thời gian thực, responsive đa thiết bị và không gian portfolio cá nhân độc lập.',
      myRole: 'Thiết kế và hoàn thiện toàn bộ không gian portfolio cá nhân Tuyến Metro T24 độc lập, tích hợp bộ lọc vé đồ án theo thời gian thực, modal soi vé, form liên hệ và chế độ Dark/Light theme.',
      whatILearned: 'Tư duy cấu trúc đa trang MPA, chuẩn hóa semantic HTML5, kiểm soát responsive di động không tràn thanh cuộn ngang và tối ưu hiệu suất build Vite production.',
      technologies: ['HTML5 Semantic', 'CSS3 Grid / Flex', 'JavaScript ES6+', 'Vite MPA'],
      githubUrl: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
      status: 'Đang vận hành chính thức',
      proofImages: [
        { src: './images/project-portfolio-group.svg', caption: 'CỔNG NHÓM 02: Kiến trúc đa trang Multi-Page Application (MPA) tối ưu bằng Vite' }
      ]
    }
  }
};

/* =========================================================
   2. KHỞI CHẠY HỆ THỐNG KHI DOM SẴN SÀNG
   ========================================================= */
function bootMetroSystem() {
  initRailStationTracker();
  initTicketFilter();
  initProjectInspectionModal();
  initContactFormValidation();
  initCopyEmailFallback();

  console.log(
    `%c[UTH-METRO] Hệ thống portfolio Lê Nguyễn Nhật Trường (K24) sẵn sàng vận hành!`,
    'background: #FF4D00; color: #FFFFFF; font-weight: bold; padding: 4px 8px; border: 1px solid #121316;'
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootMetroSystem);
} else {
  bootMetroSystem();
}

/* =========================================================
   3. MICRO-INTERACTION CHỮ KÝ: THEO DÕI VẠCH RAY VÀ GA TÀU
   Cập nhật thanh tiến trình ray và con trỏ tàu theo cuộn trang
   ========================================================= */
function initRailStationTracker() {
  const stationSections = document.querySelectorAll('.station-section');
  const stationStops = document.querySelectorAll('.station-stop');
  const railLineBg = document.querySelector('.rail-line-bg');
  const railProgress = document.getElementById('railProgress');
  const trainIndicator = document.getElementById('trainIndicator');
  const railNav = document.getElementById('railNav');

  if (!stationSections.length || !stationStops.length || !railNav) return;

  // Lấy tọa độ Y chính xác tâm của nốt dừng ga so với khung railNav
  const getNodeCenterY = (stopEl) => {
    const node = stopEl.querySelector('.station-node');
    if (!node) return 0;
    const navRect = railNav.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    return (nodeRect.top + nodeRect.height / 2) - navRect.top;
  };

  // Căn chỉnh đường ray nối chính xác từ tâm Ga 01 đến tâm Ga 06
  const setupRailTrackDimensions = () => {
    if (window.innerWidth <= 900) return; // Trên mobile chuyển sang giao diện thanh trạm ngang

    const firstY = getNodeCenterY(stationStops[0]);
    const lastY = getNodeCenterY(stationStops[stationStops.length - 1]);
    const trackSpan = Math.max(0, lastY - firstY);

    if (railLineBg) {
      railLineBg.style.top = `${firstY}px`;
      railLineBg.style.height = `${trackSpan}px`;
    }

    if (railProgress) {
      railProgress.style.top = `${firstY}px`;
    }

    return { firstY, lastY, trackSpan };
  };

  // Cập nhật vị trí của toa tàu và thanh ray tiến trình
  const updateRailPosition = () => {
    if (window.innerWidth <= 900) return;

    const dimensions = setupRailTrackDimensions();
    if (!dimensions) return;
    const { firstY, lastY, trackSpan } = dimensions;

    // Xác định ga đang ở trong tầm đọc của người dùng
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const isAtBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 30;

    let activeIndex = 0;

    if (isAtBottom) {
      // Khi cuộn hết trang, chắc chắn Ga 06 (Điều hành) là ga kích hoạt
      activeIndex = stationStops.length - 1;
    } else if (scrollY <= 80) {
      // Khi ở đầu trang, Ga 01 (Xuất phát)
      activeIndex = 0;
    } else {
      const triggerY = scrollY + window.innerHeight * 0.36;
      stationSections.forEach((section, index) => {
        if (triggerY >= section.offsetTop) {
          activeIndex = index;
        }
      });
    }

    // Cập nhật trạng thái active cho danh sách ga
    stationStops.forEach((stop, index) => {
      if (index === activeIndex) {
        stop.classList.add('active');
      } else {
        stop.classList.remove('active');
      }
    });

    // Tính toán tọa độ tâm của ga kích hoạt
    const activeStop = stationStops[activeIndex];
    const targetY = getNodeCenterY(activeStop);

    // Di chuyển con trỏ toa tàu đến đúng tâm nốt ga (cùng trục X = 16px)
    if (trainIndicator) {
      trainIndicator.style.top = `${targetY}px`;
    }

    // Cập nhật chiều dài vạch tiến trình màu cam khớp với ga đang dừng
    if (railProgress) {
      const progressHeight = Math.max(0, targetY - firstY);
      railProgress.style.height = `${progressHeight}px`;
    }
  };

  // Lắng nghe sự kiện scroll và resize với passive optimization
  window.addEventListener('scroll', updateRailPosition, { passive: true });
  window.addEventListener('resize', () => {
    setupRailTrackDimensions();
    updateRailPosition();
  }, { passive: true });

  // Khởi chạy khi DOM và font chữ đã render xong
  setTimeout(() => {
    setupRailTrackDimensions();
    updateRailPosition();
  }, 120);
}

/* =========================================================
   4. BỘ LỌC VÉ ĐỒ ÁN (TICKET FILTER)
   Lọc vé theo tuyến công nghệ: Tất cả, Mạng, Java, Web
   ========================================================= */
function initTicketFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const ticketCards = document.querySelectorAll('.metro-ticket-card');

  if (!filterButtons.length || !ticketCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filterValue = button.getAttribute('data-filter');

      // Cập nhật trạng thái active của nút
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // Lọc các thẻ vé đồ án
      ticketCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'grid';
          // Hiệu ứng xuất hiện cơ học
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* =========================================================
   5. CỬA SỔ SOÁT VÉ ĐỒ ÁN (PROJECT INSPECTION MODAL)
   Xem chi tiết đồ án, quản lý focus, đóng bằng phím ESC
   ========================================================= */
function initProjectInspectionModal() {
  const modal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBodyContent = document.getElementById('modalBodyContent');
  const modalSeries = document.getElementById('modalProjectSeries');
  const inspectButtons = document.querySelectorAll('.open-modal-btn');

  if (!modal || !modalBodyContent) return;

  let lastActiveElement = null;

  // Hàm mở modal và đổ dữ liệu
  const openModal = (projectId) => {
    const project = METRO_CONFIG.projects[projectId];
    if (!project) return;

    lastActiveElement = document.activeElement;

    if (modalSeries) {
      modalSeries.textContent = `BẢN KIỂM SOÁT • ${project.serial}`;
    }

    // Đổ nội dung chi tiết vào modal
    const techBadgesHtml = project.technologies
      .map(tech => `<span class="modal-tech-badge">${tech}</span>`)
      .join('');

    const proofGalleryHtml = project.proofImages && project.proofImages.length ? `
      <div class="modal-section-title" style="margin-top: 18px;">HÌNH ẢNH MINH CHỨNG VẬN HÀNH THỰC TẾ</div>
      <div class="modal-proof-gallery">
        ${project.proofImages.map(img => `
          <div class="modal-proof-item">
            <img src="${img.src}" alt="${img.caption}" class="modal-proof-img" loading="lazy" onerror="this.src='./images/project-portfolio-group.svg';">
            <div class="modal-proof-caption">
              <span class="proof-dot"></span>
              <span>${img.caption}</span>
            </div>
          </div>
        `).join('')}
      </div>
    ` : '';

    modalBodyContent.innerHTML = `
      <div class="modal-project-header">
        <span class="modal-project-cat">${project.course.toUpperCase()} • TUYẾN ${project.routeCode}</span>
        <h3 class="modal-project-title" id="modalProjectTitle">${project.title}</h3>
      </div>

      <div class="modal-desc-box">
        <div class="modal-section-title">MÔ TẢ CHI TIẾT ĐỒ ÁN</div>
        <p class="modal-desc-text">${project.summary}</p>
      </div>

      ${proofGalleryHtml}

      <div class="modal-duties-grid">
        <div class="modal-duty-item">
          <span class="modal-duty-label">VAI TRÒ TRONG ĐỒ ÁN</span>
          <p class="modal-duty-content">${project.myRole}</p>
        </div>
        <div class="modal-duty-item">
          <span class="modal-duty-label">ĐIỀU TÔI ĐÃ HỌC ĐƯỢC</span>
          <p class="modal-duty-content">${project.whatILearned}</p>
        </div>
      </div>

      <div class="modal-tech-box">
        <div class="modal-section-title">CÔNG NGHỆ ÁP DỤNG TRÊN TOA TÀU</div>
        <div class="modal-tech-list">
          ${techListHtml}
        </div>
      </div>

      <div class="modal-actions-bar">
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-transit btn-transit-primary">
          <span>Xem Kho Mã Nguồn GitHub</span>
          <span aria-hidden="true">&#8599;</span>
        </a>
        <button type="button" class="btn-transit btn-transit-ghost" id="modalCloseAction">
          <span>Đóng Cửa Toa (Esc)</span>
        </button>
      </div>
    `;

    // Hiển thị modal
    modal.classList.add('is-active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Bắt sự kiện cho nút đóng bên trong nội dung vừa tạo
    const innerCloseBtn = document.getElementById('modalCloseAction');
    if (innerCloseBtn) {
      innerCloseBtn.addEventListener('click', closeModal);
    }

    // Đưa tiêu điểm focus vào nút đóng
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  };

  // Hàm đóng modal
  const closeModal = () => {
    modal.classList.remove('is-active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Trả lại focus cho phần tử vừa kích hoạt
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  };

  // Lắng nghe sự kiện mở modal
  inspectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  // Đóng bằng nút X
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Đóng khi click backdrop
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  // Đóng khi bấm phím Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* =========================================================
   6. KIỂM SOÁT FORM LIÊN HỆ & GỌI GIAO THỨC MAILTO THẬT
   Kiểm tra 4 trường và kích hoạt mở ứng dụng thư điện tử
   ========================================================= */
function initContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const alertBox = document.getElementById('formAlertBox');

  const fullNameError = document.getElementById('fullNameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Regex kiểm tra địa chỉ email tiêu chuẩn
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Xóa cảnh báo lỗi khi người dùng đang nhập
  const clearError = (inputEl, errorEl) => {
    if (!inputEl) return;
    inputEl.classList.remove('is-invalid');
    if (errorEl) errorEl.textContent = '';
  };

  const setError = (inputEl, errorEl, message) => {
    if (!inputEl) return;
    inputEl.classList.add('is-invalid');
    if (errorEl) errorEl.textContent = message;
  };

  // Lắng nghe input để xóa lỗi theo thời gian thực
  if (fullNameInput) fullNameInput.addEventListener('input', () => clearError(fullNameInput, fullNameError));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailInput, emailError));
  if (subjectInput) subjectInput.addEventListener('input', () => clearError(subjectInput, subjectError));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageInput, messageError));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // 1. Kiểm tra Họ và tên (tối thiểu 2 ký tự)
    const nameVal = fullNameInput ? fullNameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      setError(fullNameInput, fullNameError, 'Vui lòng nhập họ và tên của bạn (ít nhất 2 ký tự).');
      isValid = false;
    } else {
      clearError(fullNameInput, fullNameError);
    }

    // 2. Kiểm tra Địa chỉ Email
    const emailVal = emailInput ? emailInput.value.trim() : '';
    if (!emailVal || !emailRegex.test(emailVal)) {
      setError(emailInput, emailError, 'Vui lòng nhập địa chỉ email hợp lệ để nhận phản hồi.');
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // 3. Kiểm tra Tiêu đề
    const subjectVal = subjectInput ? subjectInput.value.trim() : '';
    if (!subjectVal || subjectVal.length < 3) {
      setError(subjectInput, subjectError, 'Vui lòng nhập tiêu đề tin nhắn (ít nhất 3 ký tự).');
      isValid = false;
    } else {
      clearError(subjectInput, subjectError);
    }

    // 4. Kiểm tra Nội dung (tối thiểu 10 ký tự)
    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (!messageVal || messageVal.length < 10) {
      setError(messageInput, messageError, 'Nội dung trao đổi cần ít nhất 10 ký tự.');
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    // Nếu có lỗi, dừng và tập trung vào ô lỗi đầu tiên
    if (!isValid) {
      if (alertBox) {
        alertBox.className = 'form-alert is-error';
        alertBox.textContent = 'Vui lòng kiểm tra và hoàn thành các trường bắt buộc màu đỏ phía dưới.';
      }
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Đóng gói nội dung thư điện tử
    const recipient = METRO_CONFIG.operator.email;
    const formattedSubject = `[PORTFOLIO UTH] ${subjectVal} — từ ${nameVal}`;
    const formattedBody = [
      `Kính gửi Lê Nguyễn Nhật Trường (Sinh viên K24 UTH),`,
      ``,
      `Thông tin người liên hệ:`,
      `- Họ và tên: ${nameVal}`,
      `- Địa chỉ email: ${emailVal}`,
      `- Tiêu đề: ${subjectVal}`,
      ``,
      `Nội dung tin nhắn:`,
      messageVal,
      ``,
      `---`,
      `[Tín hiệu được gửi từ Tuyến Portfolio Metro UTH]`
    ].join('\n');

    // Tạo liên kết mailto an toàn bằng encodeURIComponent
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(formattedSubject)}&body=${encodeURIComponent(formattedBody)}`;

    // Thông báo trạng thái tích cực
    if (alertBox) {
      alertBox.className = 'form-alert is-success';
      alertBox.textContent = `Tín hiệu hợp lệ! Đang mở ứng dụng thư điện tử trên máy để gửi đến ${recipient}...`;
    }

    // Kích hoạt giao thức mailto
    window.location.href = mailtoUrl;
  });
}

/* =========================================================
   7. SAO CHÉP EMAIL DỰ PHÒNG (COPY EMAIL FALLBACK)
   Sao chép vào clipboard khi thiết bị không mở được ứng dụng mail
   ========================================================= */
function initCopyEmailFallback() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const toast = document.getElementById('copyAlertToast');
  const targetEmail = METRO_CONFIG.operator.email;

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    let success = false;

    // Cách 1: Sử dụng Clipboard API hiện đại
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(targetEmail);
        success = true;
      } catch (err) {
        console.warn('[UTH-METRO] Không thể dùng navigator.clipboard, thử phương thức dự phòng:', err);
      }
    }

    // Cách 2: Phương thức dự phòng qua thẻ input tạm thời
    if (!success) {
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = targetEmail;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.select();
        success = document.execCommand('copy');
        document.body.removeChild(tempInput);
      } catch (err) {
        console.error('[UTH-METRO] Sao chép email thất bại:', err);
      }
    }

    // Cập nhật giao diện thông báo
    if (success) {
      if (copyBtnText) copyBtnText.textContent = 'ĐÃ SAO CHÉP EMAIL VÀO BỘ NHỚ TẠM!';
      if (toast) {
        toast.classList.remove('d-none');
        toast.textContent = `Đã sao chép thành công: ${targetEmail}`;
      }

      // Trở lại trạng thái ban đầu sau 3 giây
      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Sao chép địa chỉ email vào bộ nhớ tạm';
        if (toast) toast.classList.add('d-none');
      }, 3200);
    } else {
      alert(`Địa chỉ email của tôi là: ${targetEmail}`);
    }
  });
}


/* =========================================================
   6. BẬT/TẮT GIAO DIỆN TÀU NGÀY / TÀU ĐÊM (DARK / LIGHT THEME)
   Hỗ trợ lưu trạng thái vào localStorage và phím tắt [T]
   ========================================================= */
function initThemeToggle() {
  const toggleBtn = document.getElementById('btnThemeToggle');
  const icon = document.getElementById('themeToggleIcon');
  const text = document.getElementById('themeToggleText');

  // Lấy trạng thái lưu trữ hoặc mặc định theo hệ thống
  const savedTheme = localStorage.getItem('metro_theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (icon) icon.textContent = '🌙';
    if (text) text.textContent = 'ĐÊM';
  }

  const toggleTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    if (nextTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('metro_theme', 'dark');
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = 'ĐÊM';
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('metro_theme', 'light');
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = 'NGÀY';
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  // Phím tắt bàn phím [T] để đổi theme
  window.addEventListener('keydown', (e) => {
    if (e.key === 't' || e.key === 'T') {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea') return;
      toggleTheme();
    }
  });
}
