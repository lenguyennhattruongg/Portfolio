// =========================================================
// COSMIC TEAM PORTFOLIO — INTERACTIVE CELESTIAL ENGINE
// Mysterious Universe × Celestial Cartography × React Bits
// Vanilla ES6+ DOM & Canvas Engine (100% Offline Compatible)
// =========================================================

'use strict';

/**
 * 1. NGUỒN SỰ THẬT DUY NHẤT (SINGLE SOURCE OF TRUTH)
 * Dữ liệu thành viên được phân định rõ ràng giữa đã xác minh và đang cập nhật.
 */
const CELESTIAL_CREW_DATA = [
  {
    id: '01',
    slug: 'le-nguyen-nhat-truong',
    fullName: 'Lê Nguyễn Nhật Trường',
    displayName: 'Trường',
    symbol: 'Tr',
    coordinate: 'RA 14h 29m · DEC +60° 11\'',
    role: '[CẦN XÁC NHẬN]',
    focus: 'Software Engineer Trainee, thiên về Backend; mục tiêu thực tập SE Intern 2026.',
    strengths: ['Java', 'Mạng', 'C/C++', 'CSDL'],
    github: 'https://github.com/lenguyennhattruongg',
    portfolio: './members/le-nguyen-nhat-truong/index.html',
    avatar: './members/le-nguyen-nhat-truong/images/avatar.png',
    isConfirmed: true
  },
  {
    id: '02',
    slug: 'nguyen-xuan-hieu',
    fullName: 'Nguyễn Xuân Hiếu',
    displayName: 'Hiếu',
    symbol: 'Hi',
    coordinate: 'RA 16h 41m · DEC +36° 28\'',
    role: 'Trưởng nhóm',
    focus: 'Hồ sơ thành viên đang được cập nhật.',
    strengths: [],
    github: 'https://github.com/nguyenxuanhieu2903',
    portfolio: null,
    avatar: null,
    isConfirmed: false
  },
  {
    id: '03',
    slug: 'nguyen-thi-thao-nhu',
    fullName: 'Nguyễn Thị Thảo Như',
    displayName: 'Như',
    symbol: 'Nh',
    coordinate: 'RA 18h 36m · DEC +38° 47\'',
    role: 'Thành viên',
    focus: 'Hồ sơ thành viên đang được cập nhật.',
    strengths: [],
    github: null,
    portfolio: null,
    avatar: null,
    isConfirmed: false
  },
  {
    id: '04',
    slug: 'nguyen-pham-y-huynh',
    fullName: 'Nguyễn Phạm Y Huỳnh',
    displayName: 'Huỳnh',
    symbol: 'Hu',
    coordinate: 'RA 19h 50m · DEC +08° 52\'',
    role: 'Thành viên',
    focus: 'Hồ sơ thành viên đang được cập nhật.',
    strengths: [],
    github: null,
    portfolio: null,
    avatar: null,
    isConfirmed: false
  },
  {
    id: '05',
    slug: 'le-huu-chau',
    fullName: 'Lê Hữu Châu',
    displayName: 'Châu',
    symbol: 'Ch',
    coordinate: 'RA 20h 41m · DEC +45° 16\'',
    role: 'Thành viên',
    focus: 'Hồ sơ thành viên đang được cập nhật.',
    strengths: [],
    github: null,
    portfolio: null,
    avatar: null,
    isConfirmed: false
  },
  {
    id: '06',
    slug: 'nguyen-anh-thu',
    fullName: 'Nguyễn Anh Thư',
    displayName: 'Thư',
    symbol: 'Th',
    coordinate: 'RA 22h 57m · DEC -29° 37\'',
    role: 'Thành viên',
    focus: 'Hồ sơ thành viên đang được cập nhật.',
    strengths: [],
    github: null,
    portfolio: null,
    avatar: null,
    isConfirmed: false
  }
];

/**
 * 2. THUẬT TOÁN CHUẨN HÓA TIẾNG VIỆT (UNICODE NFD ENGINE)
 * Xóa sạch dấu thanh, dấu mũ, dấu râu (ư, ơ -> u, o) và chữ đ/Đ -> d.
 */
function normalizeVietnamese(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[ưƯ]/g, 'u')
    .replace(/[ơƠ]/g, 'o')
    .trim();
}

/**
 * 3. HỆ THỐNG THÔNG BÁO TOAST THIÊN THỂ
 */
let toastTimeoutId = null;

function showCosmicToast(message) {
  const toastEl = document.getElementById('cosmicToast');
  if (!toastEl) return;

  toastEl.textContent = message;
  toastEl.removeAttribute('hidden');

  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = setTimeout(() => {
    toastEl.setAttribute('hidden', '');
  }, 3200);
}

/**
 * 4. STARFIELD & CONSTELLATION CANVAS ENGINE (REACT BITS INSPIRED)
 * Mô phỏng bầu trời sao sâu và sợi quang nối các thực thể thiên văn
 */
function initCosmicCanvas() {
  const canvas = document.getElementById('cosmicCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Kiểm tra chế độ giảm chuyển động
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Tạo quần thể hạt sao
  const STAR_COUNT = Math.min(Math.floor((width * height) / 14000), 85);
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      velocity: (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
      twinkleSpeed: Math.random() * 0.02 + 0.005
    });
  }

  let animationFrameId = null;
  let isRunning = true;

  function renderStars() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // Vẽ từng ngôi sao
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];

      star.alpha += star.twinkleSpeed;
      if (star.alpha > 0.9 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 245, 250, ${star.alpha})`;
      ctx.fill();

      // Di chuyển chậm trong không gian
      star.y += star.velocity;
      if (star.y < 0) star.y = height;
      if (star.y > height) star.y = 0;

      // Nối các sợi chòm sao gần nhau (Constellation lines)
      for (let j = i + 1; j < stars.length; j++) {
        const other = stars[j];
        const dx = star.x - other.x;
        const dy = star.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(142, 156, 255, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(renderStars);
  }

  renderStars();

  // Resize canvas linh hoạt
  let resizeTimer = null;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  };

  window.addEventListener('resize', handleResize, { passive: true });

  // Tạm dừng khi chuyển tab để tiết kiệm GPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      if (!isRunning) {
        isRunning = true;
        renderStars();
      }
    }
  });
}

/**
 * 5. KHỞI CHẠY TỔNG THỂ TRANG CHỦ
 */
document.addEventListener('DOMContentLoaded', () => {
  initCosmicCanvas();
  initNavigation();
  initConstellationAtlas();
});

/**
 * 6. ĐIỀU HƯỚNG & MENU MOBILE
 */
function initNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavMenu');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    if (isExpanded) {
      drawer.setAttribute('hidden', '');
    } else {
      drawer.removeAttribute('hidden');
    }
  });

  // Tự động đóng drawer khi click vào liên kết
  const links = drawer.querySelectorAll('.mobile-link');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.setAttribute('hidden', '');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * 7. BẢN ĐỒ CHÒM SAO & TÌM KIẾM
 */
function initConstellationAtlas() {
  const gridContainer = document.getElementById('celestialEntitiesGrid');
  const searchInput = document.getElementById('cosmicSearchInput');
  const filtersWrap = document.getElementById('strengthFiltersWrap');
  const countText = document.getElementById('discoveryCountText');
  const emptyAlert = document.getElementById('noMatchAlert');
  const resetBtn = document.getElementById('resetDiscoveryBtn');

  if (!gridContainer) return;

  let activeIndex = 0; // Mặc định khóa tín hiệu vào Member 01
  let currentFilter = 'all';

  // 7.1 Render 6 Thẻ Thực Thể Thiên Văn
  renderEntityCards(gridContainer, (clickedIndex) => {
    setActiveEntity(clickedIndex);
  });

  // 7.2 Render Thanh Bộ Lọc Thế Mạnh
  renderFilterButtons(filtersWrap, (filterKey) => {
    currentFilter = filterKey;
    applySearchAndFilter();
  });

  // 7.3 Lắng nghe Tìm kiếm thời gian thực
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applySearchAndFilter();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        resetFilters();
      }
    });
  }

  // 7.4 Nút Đặt lại Bộ Lọc
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetFilters();
    });
  }

  // Khởi tạo bảng chi tiết ban đầu cho Member 01
  setActiveEntity(0);

  /**
   * Cập nhật Thực thể Thiên văn Đang Kích Hoạt (Lock Signal)
   */
  function setActiveEntity(index) {
    activeIndex = index;
    const member = CELESTIAL_CREW_DATA[index];
    if (!member) return;

    // Cập nhật class active trên các thẻ
    const cards = gridContainer.querySelectorAll('.entity-card');
    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('is-active');
        card.setAttribute('aria-current', 'true');
      } else {
        card.classList.remove('is-active');
        card.removeAttribute('aria-current');
      }
    });

    // Cập nhật thông tin vào Panel bên phải
    const signalText = document.getElementById('activeEntitySignal');
    const indexText = document.getElementById('activeEntityIndex');
    const titleText = document.getElementById('activeEntityTitle');
    const roleText = document.getElementById('activeEntityRole');
    const focusText = document.getElementById('activeEntityFocus');
    const strengthsWrap = document.getElementById('activeEntityStrengths');
    const avatarWrap = document.getElementById('activeEntityAvatarWrap');
    const avatarImg = document.getElementById('activeEntityAvatar');
    const portfolioBtn = document.getElementById('activeEntityPortfolioBtn');
    const githubBtn = document.getElementById('activeEntityGithubBtn');

    if (signalText) signalText.textContent = member.isConfirmed ? 'SIGNAL LOCKED' : 'SIGNAL PENDING';
    if (indexText) indexText.textContent = `NODE ${member.id} · ${member.coordinate}`;
    if (titleText) titleText.textContent = member.isConfirmed ? member.fullName : `${member.fullName} (Chưa cập nhật)`;
    if (roleText) roleText.textContent = member.role || 'THÀNH VIÊN ĐỒ ÁN';
    if (focusText) focusText.textContent = member.focus;

    // Avatar
    if (avatarWrap && avatarImg) {
      if (member.isConfirmed && member.avatar) {
        avatarWrap.style.display = 'block';
        avatarImg.src = member.avatar;
        avatarImg.alt = `Ảnh đại diện ${member.fullName}`;
      } else {
        avatarWrap.style.display = 'none';
      }
    }

    // Strengths
    if (strengthsWrap) {
      strengthsWrap.replaceChildren();
      if (member.isConfirmed && member.strengths.length > 0) {
        member.strengths.forEach((st) => {
          const tag = document.createElement('span');
          tag.className = 'cosmic-strength-tag';
          tag.textContent = st;
          strengthsWrap.appendChild(tag);
        });
      } else {
        const pendingSpan = document.createElement('span');
        pendingSpan.className = 'font-mono';
        pendingSpan.style.color = 'var(--text-muted)';
        pendingSpan.style.fontSize = '0.78rem';
        pendingSpan.textContent = 'Dữ liệu kỹ thuật đang được cập nhật.';
        strengthsWrap.appendChild(pendingSpan);
      }
    }

    // Portfolio Action Button
    if (portfolioBtn) {
      if (member.isConfirmed && member.portfolio) {
        portfolioBtn.href = member.portfolio;
        portfolioBtn.removeAttribute('tabindex');
        portfolioBtn.removeAttribute('aria-disabled');
        portfolioBtn.classList.remove('btn-cosmic-ghost');
        portfolioBtn.classList.add('btn-cosmic-gold');
        portfolioBtn.querySelector('span').textContent = 'Mở Portfolio Cá Nhân →';
        portfolioBtn.onclick = null;
      } else {
        portfolioBtn.removeAttribute('href');
        portfolioBtn.setAttribute('tabindex', '-1');
        portfolioBtn.setAttribute('aria-disabled', 'true');
        portfolioBtn.classList.remove('btn-cosmic-gold');
        portfolioBtn.classList.add('btn-cosmic-ghost');
        portfolioBtn.querySelector('span').textContent = 'Hồ Sơ Đang Cập Nhật';
        portfolioBtn.onclick = (e) => {
          e.preventDefault();
          showCosmicToast(`Hồ sơ thành viên ${member.id} đang được cập nhật.`);
        };
      }
    }

    // GitHub Button
    if (githubBtn) {
      if (member.isConfirmed && member.github) {
        githubBtn.href = member.github;
        githubBtn.style.display = 'inline-flex';
      } else {
        githubBtn.style.display = 'none';
      }
    }
  }

  /**
   * Bộ lọc và Tìm kiếm thời gian thực (AND Logic)
   */
  function applySearchAndFilter() {
    const query = searchInput ? normalizeVietnamese(searchInput.value) : '';
    const isFiltering = query !== '' || currentFilter !== 'all';

    let matchCount = 0;
    const cards = gridContainer.querySelectorAll('.entity-card');

    cards.forEach((card) => {
      const index = parseInt(card.getAttribute('data-index'), 10);
      const member = CELESTIAL_CREW_DATA[index];

      if (!isFiltering) {
        card.classList.remove('is-inert');
        card.removeAttribute('inert');
        matchCount++;
        return;
      }

      // Thành viên chưa xác nhận: không tham gia kết quả tìm kiếm/lọc
      if (!member.isConfirmed) {
        card.classList.add('is-inert');
        card.setAttribute('inert', '');
        return;
      }

      // Chuỗi tìm kiếm tổng hợp
      const searchableStr = normalizeVietnamese(
        `${member.fullName} ${member.displayName} ${member.symbol} ${member.role} ${member.focus} ${member.strengths.join(' ')}`
      );

      const matchesQuery = query === '' || searchableStr.includes(query);
      const matchesStrength = currentFilter === 'all' || member.strengths.includes(currentFilter);

      if (matchesQuery && matchesStrength) {
        card.classList.remove('is-inert');
        card.removeAttribute('inert');
        matchCount++;
      } else {
        card.classList.add('is-inert');
        card.setAttribute('inert', '');
      }
    });

    // Cập nhật dòng đếm kết quả
    if (countText) {
      if (!isFiltering) {
        countText.textContent = 'Đang hiển thị 6 / 6 thực thể thiên văn';
      } else {
        countText.textContent = `Đang hiển thị ${matchCount} / 6 thực thể thiên văn (phù hợp)`;
      }
    }

    // Hiển thị panel không có kết quả nếu = 0
    if (emptyAlert) {
      if (matchCount === 0) {
        emptyAlert.removeAttribute('hidden');
      } else {
        emptyAlert.setAttribute('hidden', '');
      }
    }
  }

  /**
   * Đặt lại bộ lọc về mặc định
   */
  function resetFilters() {
    if (searchInput) searchInput.value = '';
    currentFilter = 'all';

    if (filtersWrap) {
      const btns = filtersWrap.querySelectorAll('.filter-btn');
      btns.forEach((b) => {
        b.setAttribute('aria-pressed', b.getAttribute('data-filter') === 'all' ? 'true' : 'false');
      });
    }

    applySearchAndFilter();
    if (searchInput) searchInput.focus();
    showCosmicToast('Đã đặt lại toàn bộ bộ lọc thiên văn.');
  }
}

/**
 * 8. RENDER 6 THẺ THỰC THỂ THIÊN VĂN BẰNG DOM API
 */
function renderEntityCards(container, onSelect) {
  container.replaceChildren();

  CELESTIAL_CREW_DATA.forEach((member, idx) => {
    const card = document.createElement('article');
    card.className = 'entity-card';
    card.setAttribute('data-index', idx.toString());
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Thực thể thiên văn ${member.id}: ${member.fullName}`);

    // Header thẻ: Tọa độ & Trạng thái tín hiệu
    const topBar = document.createElement('div');
    topBar.className = 'entity-top-bar';

    const coordCode = document.createElement('span');
    coordCode.className = 'entity-coord-code font-mono';
    coordCode.textContent = `[${member.id}] ${member.coordinate}`;
    topBar.appendChild(coordCode);

    const beacon = document.createElement('span');
    beacon.className = 'entity-status-beacon font-mono';
    const dot = document.createElement('span');
    dot.className = 'status-dot';
    beacon.appendChild(dot);
    beacon.appendChild(document.createTextNode(member.isConfirmed ? ' ACTIVE' : ' PENDING'));
    topBar.appendChild(beacon);

    card.appendChild(topBar);

    // Body thẻ: Ký hiệu & Tên
    const body = document.createElement('div');
    body.className = 'entity-body';

    const symbolBox = document.createElement('div');
    symbolBox.className = 'entity-symbol-box';
    symbolBox.textContent = member.symbol;
    body.appendChild(symbolBox);

    const titleGroup = document.createElement('div');
    const nameHeading = document.createElement('h3');
    nameHeading.className = 'entity-name-heading';
    nameHeading.textContent = member.fullName;
    titleGroup.appendChild(nameHeading);

    const subRole = document.createElement('div');
    subRole.className = 'entity-sub-role font-mono';
    subRole.textContent = member.isConfirmed ? (member.role || 'THÀNH VIÊN') : 'VỊ TRÍ CHỜ CẬP NHẬT';
    titleGroup.appendChild(subRole);

    body.appendChild(titleGroup);
    card.appendChild(body);

    // Strengths tag strip
    if (member.isConfirmed && member.strengths.length > 0) {
      const strengthsStrip = document.createElement('div');
      strengthsStrip.className = 'entity-strengths-strip';
      member.strengths.forEach((st) => {
        const tag = document.createElement('span');
        tag.className = 'cosmic-strength-tag';
        tag.textContent = st;
        strengthsStrip.appendChild(tag);
      });
      card.appendChild(strengthsStrip);
    }

    // Bottom Bar
    const bottomBar = document.createElement('div');
    bottomBar.className = 'entity-bottom-bar font-mono';

    const hint = document.createElement('span');
    hint.style.color = 'var(--text-muted)';
    hint.textContent = member.isConfirmed ? '✦ Tín hiệu đã xác minh' : '— Đang cập nhật';
    bottomBar.appendChild(hint);

    const ctaLink = document.createElement('span');
    ctaLink.className = 'entity-link-cta';
    ctaLink.textContent = member.isConfirmed ? 'Xem tọa độ →' : 'Khóa tín hiệu';
    bottomBar.appendChild(ctaLink);

    card.appendChild(bottomBar);

    // Event listener: Click
    card.addEventListener('click', () => {
      onSelect(idx);
      if (!member.isConfirmed) {
        showCosmicToast(`Hồ sơ thành viên ${member.id} đang được cập nhật.`);
      }
    });

    // Event listener: Keyboard Enter / Space
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(idx);
        if (!member.isConfirmed) {
          showCosmicToast(`Hồ sơ thành viên ${member.id} đang được cập nhật.`);
        }
      }
    });

    container.appendChild(card);
  });
}

/**
 * 9. RENDER CÁC NÚT BỘ LỌC THẾ MẠNH ĐÃ XÁC MINH
 */
function renderFilterButtons(wrap, onFilterChange) {
  if (!wrap) return;

  wrap.replaceChildren();

  const label = document.createElement('span');
  label.className = 'font-mono';
  label.style.fontSize = '0.72rem';
  label.style.color = 'var(--text-muted)';
  label.style.marginRight = '0.5rem';
  label.textContent = 'LỌC THEO CÔNG NGHỆ:';
  wrap.appendChild(label);

  // Thu thập các thế mạnh đã xác minh duy nhất
  const confirmedStrengths = Array.from(
    new Set(CELESTIAL_CREW_DATA.flatMap((m) => (m.isConfirmed ? m.strengths : [])))
  );

  const filters = [
    { key: 'all', label: 'Tất cả' },
    ...confirmedStrengths.map((s) => ({ key: s, label: s }))
  ];

  filters.forEach((filter, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn';
    btn.setAttribute('data-filter', filter.key);
    btn.setAttribute('aria-pressed', idx === 0 ? 'true' : 'false');
    btn.textContent = filter.label;

    btn.addEventListener('click', () => {
      const allBtns = wrap.querySelectorAll('.filter-btn');
      allBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      onFilterChange(filter.key);
    });

    wrap.appendChild(btn);
  });
}
