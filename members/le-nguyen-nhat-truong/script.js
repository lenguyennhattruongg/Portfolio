/**
 * ============================================================================
 * PORTFOLIO LÊ NGUYỄN NHẬT TRƯỜNG — JAVASCRIPT THUẦN (VANILLA JS)
 * Khối dữ liệu cấu hình độc lập + Logic tương tác Metro, Form mailto & Modal
 * Chạy được cả khi mở trực tiếp bằng file:/// (không lỗi CORS) và khi build Vite
 * ============================================================================
 */

/* ==========================================================================
   KHỐI DỮ LIỆU CẤU HÌNH (DỄ DÀNG CHỈNH SỬA)
   ========================================================================== */
const PORTFOLIO_DATA = {
  // Thông tin chủ nhân portfolio
  profile: {
    fullName: "Lê Nguyễn Nhật Trường",
    role: "Software Engineer Trainee (Backend)",
    email: "truonglnn0882@ut.edu.vn",
    githubUrl: "https://github.com/lenguyennhattruongg",
    university: "Đại học Giao thông Vận tải TP.HCM (UTH)",
    cohort: "Khóa K24 (2024 — Hiện tại)"
  },

  // Dữ liệu chi tiết 3 Đồ án cho Modal
  projects: {
    'remote-desktop': {
      title: 'Remote Desktop Application',
      category: 'Môn Lập trình Mạng // Kiến trúc Client-Server TCP',
      techStack: 'Java Core (SE 21), C++, Socket TCP, Screen Capture Buffer, Network Protocol',
      githubLink: 'https://github.com/duypham26/prj_UDM_06',
      details: [
        {
          label: 'Mô tả bài toán',
          text: 'Xây dựng phần mềm điều khiển màn hình máy tính từ xa qua mạng LAN/Internet mà không cần cài đặt phần mềm bên thứ ba.'
        },
        {
          label: 'Kiến trúc kỹ thuật',
          text: 'Mô hình Client-Server độc lập: ServerSocket lắng nghe cổng chỉ định, tạo luồng xử lý riêng cho Client kết nối. Phía Client định kỳ chụp màn hình, nén byte stream và gửi qua Socket TCP. Server nhận byte buffer, giải nén và vẽ lại trên panel; đồng thời bắt sự kiện chuột/phím gửi ngược về Server để điều khiển bằng Robot class.'
        },
        {
          label: 'Vai trò của tôi',
          text: 'Thiết kế luồng ServerSocket, tối ưu hóa bộ đệm truyền nhận byte stream và cơ chế bắt sự kiện ngoại vi.'
        },
        {
          label: 'Bài học rút ra',
          text: 'Hiểu sâu về kiểm soát tắc nghẽn buffer mạng, độ trễ truyền dữ liệu và xử lý ngoại lệ đa luồng thời gian thực.'
        }
      ]
    },
    'freshvend': {
      title: 'FreshVend Management System',
      category: 'Môn Lập trình Java // Hướng Đối Tượng OOP',
      techStack: 'Java Core, 4 Tính chất OOP (Đóng gói, Kế thừa, Đa hình, Trừu tượng), Quản lý Tồn kho, Xử lý Giao dịch',
      githubLink: 'https://github.com/nguyenxuanhieu2903/freshvend-java',
      details: [
        {
          label: 'Mô tả bài toán',
          text: 'Mô hình hóa và quản lý vận hành chuỗi máy bán hàng tự động với đa dạng mặt hàng đồ uống và đồ ăn nhẹ.'
        },
        {
          label: 'Kiến trúc kỹ thuật',
          text: 'Ứng dụng triệt để 4 tính chất OOP để thiết kế các lớp Domain. Xây dựng module quản lý số lượng tồn, cập nhật giá linh hoạt và thuật toán tính tiền thừa (hoàn lại số lượng tờ tiền tối ưu nhất cho khách).'
        },
        {
          label: 'Vai trò của tôi',
          text: 'Thiết kế class diagram, phụ trách module quản lý danh mục và logic thanh toán, viết unit test kiểm thử lỗi giao dịch.'
        },
        {
          label: 'Bài học rút ra',
          text: 'Kỹ năng trừu tượng hóa bài toán thực tế thành các đối tượng phần mềm độc lập, viết code dễ bảo trì và mở rộng.'
        }
      ]
    },
    'portfolio-hub': {
      title: 'Group Portfolio Website Hub',
      category: 'Môn Lập trình Web // Đa trang Vite MPA',
      techStack: 'HTML5 Semantic, CSS3 Thuần, JavaScript ES6+, Vite MPA, GitHub Actions CI',
      githubLink: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
      details: [
        {
          label: 'Mô tả bài toán',
          text: 'Xây dựng website trung tâm cho nhóm 6 sinh viên UTH kết nối 6 trang portfolio độc lập với hiệu năng cao.'
        },
        {
          label: 'Kiến trúc kỹ thuật',
          text: 'Cấu hình Vite đa trang (MPA) biên dịch đồng thời 7 file HTML. Tích hợp thanh tìm kiếm lọc realtime và pipeline GitHub Actions xác minh toàn vẹn artifact đầu ra trước khi merge code.'
        },
        {
          label: 'Vai trò của tôi',
          text: 'Phát triển portfolio cá nhân Tuyến Metro Sài Gòn độc lập và thiết lập CI workflow kiểm thử build trên nhánh develop.'
        },
        {
          label: 'Bài học rút ra',
          text: 'Nắm vững quy trình làm việc nhóm chuyên nghiệp bằng Git Flow, CI automation và tối ưu hóa tài nguyên tĩnh.'
        }
      ]
    }
  }
};

/* ==========================================================================
   LOGIC TƯƠNG TÁC GIAO DIỆN
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Tương tác chữ ký: Ray tàu Metro cuộn theo trang ---
  const trackFill = document.getElementById('metroTrackFill');
  const trainIndicator = document.getElementById('metroTrainIndicator');

  function handleScrollProgress() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    if (trackFill) {
      trackFill.style.width = `${progress}%`;
    }

    if (trainIndicator) {
      // Cập nhật tên ga gần nhất
      if (progress < 20) {
        trainIndicator.textContent = 'GA 01 // BẾN THÀNH';
      } else if (progress < 45) {
        trainIndicator.textContent = 'GA 02 // NĂNG LỰC';
      } else if (progress < 75) {
        trainIndicator.textContent = 'GA 03 // 3 ĐỒ ÁN';
      } else if (progress < 90) {
        trainIndicator.textContent = 'GA 04 // BẢN LĨNH';
      } else {
        trainIndicator.textContent = 'GA 05 // TRẠM UTH';
      }
    }
  }

  window.addEventListener('scroll', handleScrollProgress, { passive: true });
  handleScrollProgress();

  // --- 2. Bộ lọc Thẻ Vé Đồ Án (Ticket Filters) ---
  const filterTabs = document.querySelectorAll('.metro-filter-tab');
  const passItems = document.querySelectorAll('.metro-pass-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Đổi trạng thái tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const selectedCategory = tab.getAttribute('data-category');

      passItems.forEach(item => {
        const itemType = item.getAttribute('data-type');
        if (selectedCategory === 'all' || itemType === selectedCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- 3. Modal Xem Chi Tiết Đồ Án (Hỗ trợ phím ESC và quản lý focus) ---
  const modal = document.getElementById('ticketModal');
  const modalOverlay = document.getElementById('modalDimOverlay');
  const modalCloseBtn = document.getElementById('modalCloseTrigger');
  const modalBody = document.getElementById('modalBodyContent');
  const detailButtons = document.querySelectorAll('.btn-pass-detail');
  let lastFocusedElement = null;

  function openProjectModal(projectId) {
    const data = PORTFOLIO_DATA.projects[projectId];
    if (!data || !modal || !modalBody) return;

    lastFocusedElement = document.activeElement;

    // Render nội dung modal từ dữ liệu cấu hình
    let detailsHtml = '';
    data.details.forEach(item => {
      detailsHtml += `
        <div style="margin-bottom: 16px;">
          <h4 style="font-family: var(--font-mono); font-size: 0.8125rem; font-weight: 700; color: var(--metro-orange); text-transform: uppercase; margin-bottom: 4px;">
            ${item.label}
          </h4>
          <p style="font-size: 0.9375rem; color: var(--text-main); line-height: 1.6;">
            ${item.text}
          </p>
        </div>
      `;
    });

    modalBody.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">
        ${data.category}
      </div>
      <h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 800; line-height: 1.2; margin-bottom: 14px;">
        ${data.title}
      </h2>
      <div style="background: #FFFFFF; border: 1px solid var(--border-line); padding: 10px 14px; margin-bottom: 24px; font-size: 0.8125rem;">
        <span style="font-family: var(--font-mono); font-weight: 700; color: var(--text-muted);">CÔNG NGHỆ: </span>
        <span style="font-weight: 600;">${data.techStack}</span>
      </div>
      <div style="border-top: 1px dashed var(--border-line); padding-top: 20px;">
        ${detailsHtml}
      </div>
      <div style="margin-top: 24px; border-top: 2px solid var(--border-ink); padding-top: 20px; display: flex; gap: 12px;">
        <a href="${data.githubLink}" target="_blank" rel="noopener noreferrer" class="btn-pass-github" style="flex: 1; text-align: center; text-decoration: none;">
          TRUY CẬP REPOSITORY TRÊN GITHUB &rarr;
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus vào nút đóng modal
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Trả lại focus cho nút đã bấm trước đó
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  detailButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project-id');
      openProjectModal(pId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

  // Đóng bằng phím Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --- 4. Nút Sao Chép Email Dự Phòng (1-Click Copy) ---
  const copyMailBtn = document.getElementById('copyMailBtn');
  const copyAlert = document.getElementById('copyAlert');

  if (copyMailBtn && copyAlert) {
    copyMailBtn.addEventListener('click', async () => {
      const email = PORTFOLIO_DATA.profile.email;
      try {
        await navigator.clipboard.writeText(email);
        copyAlert.classList.add('visible');
        setTimeout(() => {
          copyAlert.classList.remove('visible');
        }, 2000);
      } catch (err) {
        prompt('Vui lòng sao chép email:', email);
      }
    });
  }

  // --- 5. Form Liên Hệ Gửi Mail Thật (Kiểm tra lỗi 4 trường & mở mailto) ---
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('senderSubject');
      const messageInput = document.getElementById('senderMessage');

      const errName = document.getElementById('errName');
      const errEmail = document.getElementById('errEmail');
      const errSubject = document.getElementById('errSubject');
      const errMessage = document.getElementById('errMessage');

      // Reset thông báo lỗi
      errName.textContent = '';
      errEmail.textContent = '';
      errSubject.textContent = '';
      errMessage.textContent = '';

      let isValid = true;

      // 1. Kiểm tra Họ tên
      const nameVal = nameInput.value.trim();
      if (!nameVal) {
        errName.textContent = 'Vui lòng nhập họ và tên của bạn.';
        isValid = false;
      } else if (nameVal.length < 2) {
        errName.textContent = 'Họ tên phải có ít nhất 2 ký tự.';
        isValid = false;
      }

      // 2. Kiểm tra Email
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        errEmail.textContent = 'Vui lòng nhập địa chỉ email.';
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        errEmail.textContent = 'Địa chỉ email không đúng định dạng.';
        isValid = false;
      }

      // 3. Kiểm tra Tiêu đề
      const subjectVal = subjectInput.value.trim();
      if (!subjectVal) {
        errSubject.textContent = 'Vui lòng nhập tiêu đề thư liên hệ.';
        isValid = false;
      }

      // 4. Kiểm tra Nội dung
      const messageVal = messageInput.value.trim();
      if (!messageVal) {
        errMessage.textContent = 'Vui lòng nhập nội dung tin nhắn.';
        isValid = false;
      } else if (messageVal.length < 10) {
        errMessage.textContent = 'Nội dung tin nhắn cần ít nhất 10 ký tự.';
        isValid = false;
      }

      // Nếu tất cả hợp lệ -> Mã hóa encodeURIComponent và mở mailto
      if (isValid) {
        const targetEmail = PORTFOLIO_DATA.profile.email;
        const encodedSubject = encodeURIComponent(`[Portfolio UTH Contact] ${subjectVal}`);
        const encodedBody = encodeURIComponent(
          `Kính gửi Lê Nguyễn Nhật Trường,\n\n` +
          `Tôi là: ${nameVal}\n` +
          `Email phản hồi: ${emailVal}\n\n` +
          `Nội dung trao đổi:\n${messageVal}\n\n` +
          `---\nThư được gửi từ trang cá nhân Portfolio K24 UTH.`
        );

        const mailtoUrl = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
        
        // Mở mailto
        window.location.href = mailtoUrl;
      }
    });
  }
});
