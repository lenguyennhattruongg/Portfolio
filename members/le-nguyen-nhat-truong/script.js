/**
 * PORTFOLIO LÊ NGUYỄN NHẬT TRƯỜNG — SCRIPT TUYẾN METRO SÀI GÒN
 * Các tương tác micro-interaction, bộ lọc vé đồ án, modal chi tiết và theo dõi tiến trình
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dữ liệu chi tiết cho 3 Modal Đồ án
  const projectDetails = {
    'modal-project-1': {
      title: 'Remote Desktop Application',
      category: 'Môn Lập trình Mạng // Socket TCP/IP',
      tech: 'Java Core (SE 21), C++, Socket TCP/IP, Screen Capture Buffer, Network Protocol',
      github: 'https://github.com/duypham26/prj_UDM_06',
      architecture: `
        <h4>Kiến trúc & Kỹ thuật chi tiết:</h4>
        <p>Hệ thống hoạt động theo mô hình Client-Server độc lập:</p>
        <ul>
          <li><strong>Phía Server:</strong> Lắng nghe kết nối qua <code>ServerSocket</code>, khởi tạo luồng xử lý riêng biệt cho từng Client kết nối (Thread-per-client model).</li>
          <li><strong>Screen Capture Buffer:</strong> Sử dụng thư viện đồ họa chụp liên tục các khung hình màn hình, nén dữ liệu dạng byte stream và truyền qua Socket TCP với thuật toán kiểm soát nghẽn.</li>
          <li><strong>Điều khiển Ngoại vi:</strong> Bắt các sự kiện chuột (Mouse Event) và phím (Key Event) từ Client, gửi ngược về Server để mô phỏng thao tác phần cứng bằng Robot class.</li>
        </ul>
        <h4>Vai trò đóng góp chính:</h4>
        <p>Phụ trách toàn bộ module truyền nhận dữ liệu byte stream, xử lý ngoại lệ ngắt kết nối đột ngột (Socket Exception Handling) và tối ưu độ trễ hiển thị.</p>
      `
    },
    'modal-project-2': {
      title: 'FreshVend Management System',
      category: 'Môn Lập trình Java // Hướng Đối Tượng (OOP)',
      tech: 'Java Core, OOP Design Patterns, Collections Framework, Xử lý giao dịch máy bán hàng',
      github: 'https://github.com/nguyenxuanhieu2903/freshvend-java',
      architecture: `
        <h4>Kiến trúc & Kỹ thuật chi tiết:</h4>
        <p>Phần mềm mô phỏng hệ thống máy bán hàng tự động thông minh:</p>
        <ul>
          <li><strong>Thiết kế Hướng đối tượng:</strong> Phân tách rõ ràng các thực thể <code>Product</code>, <code>Beverage</code>, <code>Snack</code>, <code>VendingMachine</code>, <code>Transaction</code> bằng 4 tính chất OOP cốt lõi.</li>
          <li><strong>Quản lý tồn kho:</strong> Sử dụng <code>HashMap</code> và <code>ArrayList</code> của Collections Framework để quản lý số lượng tồn, cảnh báo hết hàng và định giá động.</li>
          <li><strong>Xử lý giao dịch:</strong> Thuật toán tính tiền thừa tối ưu số lượng tờ tiền/đồng xu thối lại cho khách, bảo đảm tính toàn vẹn số dư tài chính máy.</li>
        </ul>
        <h4>Vai trò đóng góp chính:</h4>
        <p>Xây dựng class diagram, code module quản lý sản phẩm và thuật toán hoàn tiền; viết Unit Test kiểm thử các trường hợp nạp tiền không hợp lệ.</p>
      `
    },
    'modal-project-3': {
      title: 'Group Portfolio Website Hub',
      category: 'Môn Lập trình Web // Multi-page Application (MPA)',
      tech: 'HTML5 Semantic, CSS3 Vanilla, JavaScript ES6+, Vite MPA, GitHub Actions CI',
      github: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
      architecture: `
        <h4>Kiến trúc & Kỹ thuật chi tiết:</h4>
        <p>Website trung tâm kết nối 6 thành viên nhóm UTH:</p>
        <ul>
          <li><strong>Vite Multi-page Architecture:</strong> Cấu hình <code>vite.config.js</code> biên dịch đồng thời trang chủ và 6 trang thành viên độc lập trong một build duy nhất.</li>
          <li><strong>CI Verification Pipeline:</strong> Viết GitHub Actions workflow xác minh tính toàn vẹn của cả 7 file HTML đầu ra và bundle tài nguyên trong thư mục <code>dist/</code>.</li>
          <li><strong>Tìm kiếm Realtime:</strong> Lọc thành viên theo tên, vai trò và kỹ năng cốt lõi không cần reload trang.</li>
        </ul>
        <h4>Vai trò đóng góp chính:</h4>
        <p>Phát triển độc lập trang portfolio cá nhân Tuyến Metro UTH, tham gia chuẩn hóa CI pipeline bảo vệ mã nguồn repository.</p>
      `
    }
  };

  // 2. Thanh tiến trình cuộn trang & Ray tàu Metro
  const progressBar = document.getElementById('metroProgressBar');
  const railTrain = document.getElementById('railTrain');
  const stations = document.querySelectorAll('.metro-station');
  const navLinks = document.querySelectorAll('.nav-link');
  const railNodes = document.querySelectorAll('.rail-node');

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    if (railTrain) {
      // Giới hạn chạy dọc theo thanh rail bên trái
      const maxTop = 220; // chiều cao đường ray
      railTrain.style.top = `${(scrollPercent / 100) * maxTop}px`;
    }

    // Xác định ga tàu đang hoạt động (Active station)
    stations.forEach((station, idx) => {
      const rect = station.getBoundingClientRect();
      if (rect.top <= 200 && rect.bottom >= 200) {
        const stationNum = idx + 1;
        
        // Update nav links
        navLinks.forEach(link => {
          if (link.getAttribute('data-station') == stationNum) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update rail nodes
        railNodes.forEach((node, nodeIdx) => {
          if (nodeIdx === idx) {
            node.classList.add('active');
          } else {
            node.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // Click vào rail nodes bên trái để cuộn đến ga tương ứng
  railNodes.forEach(node => {
    node.addEventListener('click', () => {
      const targetId = node.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Bộ lọc Vé Đồ án (Project Filters)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.metro-ticket-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Modal Chi tiết Đồ án
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const detailBtns = document.querySelectorAll('.btn-ticket-detail');

  function openModal(modalKey) {
    const data = projectDetails[modalKey];
    if (!data || !modal || !modalContent) return;

    modalContent.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--metro-orange); font-weight: 700; margin-bottom: 8px;">
        ${data.category}
      </div>
      <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">
        ${data.title}
      </h2>
      <div style="background: var(--bg-card); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); font-size: 0.8125rem; margin-bottom: 20px;">
        <span style="color: var(--text-muted); font-family: var(--font-mono); text-transform: uppercase;">Stack:</span>
        <span style="color: var(--text-secondary); font-weight: 500;">${data.tech}</span>
      </div>
      <div style="color: var(--text-secondary); font-size: 0.9375rem; line-height: 1.7; margin-bottom: 24px;">
        ${data.architecture}
      </div>
      <div style="display: flex; gap: 12px; border-top: 1px dashed var(--border-bright); padding-top: 20px;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-metro-primary" style="flex: 1; text-align: center;">
          <span>Xem GitHub Repository</span>
          &rarr;
        </a>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      openModal(modalKey);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Nhấn ESC để đóng modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // 5. Sao chép Email nhanh (1-Click Copy)
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyTooltip = document.getElementById('copyTooltip');
  const emailText = 'truonglnn0882@ut.edu.vn';

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText);
        copyTooltip.classList.add('show');
        setTimeout(() => {
          copyTooltip.classList.remove('show');
        }, 2000);
      } catch (err) {
        // Fallback prompt
        prompt('Sao chép địa chỉ email:', emailText);
      }
    });
  }
});
