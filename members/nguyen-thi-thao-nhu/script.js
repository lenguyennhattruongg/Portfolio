// Portfolio Nguyen Thi Thao Nhu - Base Script
console.log('Portfolio Nguyen Thi Thao Nhu initialized.');
/**
 * ==========================================================================
 * PERSONAL PORTFOLIO - NGUYỄN THỊ THẢO NHƯ
 * JavaScript Logic: Typing Effect, Mobile Menu, Active Scrollspy, 
 *                   Scroll Reveal, Project Modal, Form Validation & Toast.
 * ==========================================================================
 */

let portfolioBooted = false;
function bootPortfolio() {
  if (portfolioBooted) return;
  portfolioBooted = true;

  function fxOn() {
    return !document.documentElement.classList.contains('fx-off');
  }

  function syncFxButton() {
    const btn = document.getElementById('fxToggleBtn');
    if (!btn) return;
    const on = fxOn();
    btn.classList.toggle('is-off', !on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Tắt hiệu ứng' : 'Bật hiệu ứng');
    btn.title = on ? 'Tắt hiệu ứng' : 'Bật hiệu ứng';
    btn.innerHTML = on
      ? '<i class="fa-solid fa-wand-magic-sparkles"></i>'
      : '<i class="fa-solid fa-pause"></i>';
  }

  syncFxButton();
  const fxToggleBtn = document.getElementById('fxToggleBtn');
  if (fxToggleBtn) {
    fxToggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('fx-off');
      try {
        localStorage.setItem('portfolio-fx', fxOn() ? 'on' : 'off');
      } catch (e) {}
      syncFxButton();
    });
  }

  /* --------------------------------------------------------------------------
     1. TYPING EFFECT (HERO SECTION)
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('typingText');
  const wordsToType = [
    'Backend Developer',
    'Web Developer',
    'IT Student'
  ];

  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeTextEffect() {
    if (!typingElement) return;

    const currentWord = wordsToType[currentWordIndex];

    if (isDeleting) {
      // Đang xóa chữ
      typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50; // Tốc độ xóa nhanh hơn
    } else {
      // Đang gõ chữ
      typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 110; // Tốc độ gõ tự nhiên
    }

    // Khi đã gõ hết từ
    if (!isDeleting && currentCharIndex === currentWord.length) {
      typingSpeed = 1800; // Dừng lại để người xem kịp đọc
      isDeleting = true;
    } 
    // Khi đã xóa hết từ
    else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % wordsToType.length;
      typingSpeed = 400; // Nghỉ một chút trước khi gõ từ tiếp theo
    }

    setTimeout(typeTextEffect, typingSpeed);
  }

  // Khởi động hiệu ứng typing
  typeTextEffect();

  const heroTitle = document.getElementById('heroTitle');
  const heroButtons = document.querySelectorAll('.btn-hero-outline, .btn-hero-ghost');
  const reduceHeroMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceHeroMotion && heroTitle) {
    let lookX = 0;
    let lookY = 0;
    let targetX = 0;
    let targetY = 0;
    let idle = 0;
    heroTitle.addEventListener('pointermove', (event) => {
      const box = heroTitle.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / box.width - 0.5) * 8;
      targetY = ((event.clientY - box.top) / box.height - 0.5) * -6;
    });
    heroTitle.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
    });
    function tickTitle() {
      if (!fxOn()) {
        requestAnimationFrame(tickTitle);
        return;
      }
      idle += 0.016;
      lookX += (targetX - lookX) * 0.08;
      lookY += (targetY - lookY) * 0.08;
      const floatY = Math.sin(idle * 0.9) * 3;
      heroTitle.style.transform = `translateY(${floatY}px) rotateX(${lookY}deg) rotateY(${lookX}deg)`;
      requestAnimationFrame(tickTitle);
    }
    requestAnimationFrame(tickTitle);
  }

  if (!reduceHeroMotion) {
    heroButtons.forEach((btn) => {
      btn.addEventListener('pointermove', (event) => {
        if (!fxOn()) return;
        const box = btn.getBoundingClientRect();
        const x = event.clientX - box.left - box.width / 2;
        const y = event.clientY - box.top - box.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.16}px)`;
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transform = '';
      });
    });
  }


  /* --------------------------------------------------------------------------
     2. NAVBAR: SCROLL BLUR & ACTIVE SCROLLSPY
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navTrack = document.getElementById('navTrack');
  const navBlob = document.getElementById('navBlob');
  const navShell = document.getElementById('navShell');

  function placeNavBlob(el) {
    if (!navBlob || !navTrack || !el) return;
    if (window.matchMedia('(max-width: 1100px)').matches) {
      navBlob.classList.remove('is-on');
      return;
    }
    const track = navTrack.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    navBlob.style.width = `${box.width}px`;
    navBlob.style.height = `${box.height}px`;
    navBlob.style.transform = `translate(${box.left - track.left}px, ${box.top - track.top}px)`;
    navBlob.classList.add('is-on');
  }

  function blobToActive() {
    placeNavBlob(document.querySelector('.nav-link.active') || navLinks[0]);
  }

  navLinks.forEach((link) => {
    link.addEventListener('pointerenter', () => placeNavBlob(link));
  });
  if (navTrack) {
    navTrack.addEventListener('pointerleave', blobToActive);
  }
  if (navShell) {
    navShell.addEventListener('pointermove', (event) => {
      if (!fxOn()) return;
      const box = navShell.getBoundingClientRect();
      navShell.style.setProperty('--mx', `${event.clientX - box.left}px`);
      navShell.style.setProperty('--my', `${event.clientY - box.top}px`);
    });
  }
  window.addEventListener('resize', blobToActive);

  function handleNavbarScroll() {
    // Thêm hiệu ứng nền đục khi scroll xuống
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scrollspy: Làm sáng menu tương ứng với section đang hiển thị
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        blobToActive();
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();
  requestAnimationFrame(blobToActive);


  /* --------------------------------------------------------------------------
     3. MOBILE NAVIGATION TOGGLE (HAMBURGER)
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Tự động đóng menu khi click vào link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (event) => {
      if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
        navMenu.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }


  /* --------------------------------------------------------------------------
     4. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Chỉ chạy animation 1 lần
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Dự phòng cho trình duyệt cũ
    revealElements.forEach(el => el.classList.add('revealed'));
  }


  /* --------------------------------------------------------------------------
     5. PROJECT DETAIL MODAL DATA & LOGIC
     -------------------------------------------------------------------------- */
  // Dữ liệu chi tiết của các dự án
  const projectsData = {
    p1: {
      name: "Trekking & Leo núi",
      category: "Outdoor & Web Application",
      overview: "Ứng dụng hỗ trợ lên kế hoạch trekking và leo núi, khám phá các cung đường dã ngoại, quản lý lịch trình và trang bị an toàn cho người đam mê dã ngoại.",
      problem: "Người đi dã ngoại và leo núi thường thiếu nguồn thông tin tổng hợp đáng tin cậy về độ dốc, thời tiết, độ cao và danh mục hành trang cần thiết cho từng cung đường.",
      solution: "Phát triển nền tảng web trực quan cung cấp hướng dẫn chi tiết các cung đường trekking, phân loại độ khó, bản đồ lộ trình và tính năng tạo danh sách chuẩn bị trang bị cá nhân.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Local Storage"],
      algorithms: ["Search & Filter Algorithm", "Dynamic Checklist Calculation", "Responsive Grid Layout"],
      features: [
        "Khám phá danh sách các cung đường trekking nổi tiếng kèm độ khó và cự ly",
        "Bộ lọc thông minh theo thời gian di chuyển, địa hình và độ cao",
        "Bảng kiểm tra (checklist) trang phục, đồ y tế và thực phẩm cần mang",
        "Giao diện tối ưu thân thiện trên thiết bị di động khi đi dã ngoại",
        "Tích hợp các lời khuyên an toàn và số điện thoại cứu hộ khẩn cấp"
      ],
      challenges: "Tối ưu hóa dung lượng tài nguyên và hình ảnh để trang web tải nhanh và mượt mà ngay cả khi kết nối mạng 3G/4G chập chờn ở vùng đồi núi.",
      learned: "Nâng cao kỹ năng phân tích bài toán thực tế, quản lý dữ liệu JSON linh hoạt và thiết kế giao diện thân thiện với người dùng (UI/UX).",
      github: "https://github.com/NhuThiNguyen/Trekking-Leo-n-i-.git",
      demo: "https://nhuthinguyen.github.io/Trekking-Leo-n-i/"
    },
    p3: {
      name: "Interactive Love Website",
      category: "Web Interaction & UI",
      overview: "Website tương tác được xây dựng với mục đích tạo trải nghiệm web cá nhân hóa, sử dụng animation, hình ảnh, hiệu ứng và các tương tác JavaScript.",
      problem: "Tạo ra một trang web tương tác giàu tính thẩm mỹ, hiệu ứng mượt mà và mang lại trải nghiệm cảm xúc độc đáo nhưng không gây giật lag hay ngốn tài nguyên thiết bị.",
      solution: "Kết hợp CSS Keyframe Animations với JavaScript tương tác sự kiện và Canvas particle system, tạo nên không gian tương tác sinh động với các nút bấm chuyển động và hiệu ứng phát sáng.",
      technologies: ["HTML5", "CSS3 Animations", "JavaScript", "Canvas API", "Audio API"],
      algorithms: [
        "Particle Physics System (Vận tốc, góc xoay, trọng lực)",
        "Collision Detection",
        "RequestAnimationFrame Rendering Loop"
      ],
      features: [
        "Hệ thống hạt bay (Particles) hình trái tim phát sáng sinh động",
        "Nút tương tác né chuột vui nhộn và hiệu ứng mở khóa thông điệp",
        "Trình phát nhạc nền nhẹ nhàng với tương tác audio",
        "Hiệu ứng chuyển cảnh mượt mà chuẩn 60fps",
        "Tối ưu hoàn hảo cho cả trải nghiệm lướt web trên smartphone"
      ],
      challenges: "Điều khiển vòng lặp requestAnimationFrame mượt mà trên các dòng điện thoại di động có phần cứng hạn chế mà không làm nóng máy hay tụt pin nhanh.",
      learned: "Làm chủ việc thao tác trên HTML5 Canvas, xử lý sự kiện tương tác chuột/touch, và hiểu sâu cơ chế hoạt động của CSS Animations kết hợp JavaScript.",
      github: "https://github.com/NhuThiNguyen/love-web",
      demo: "https://nhuthinguyen.github.io/love-web/"
    },
    p4: {
      name: "Personal Portfolio",
      category: "Personal Branding & UI",
      overview: "Trang portfolio cá nhân kể hành trình học tập, kỹ năng và các dự án thực hành với giao diện thẩm mỹ, animation nhẹ và tương tác.",
      problem: "Cần một không gian online vừa thể hiện định hướng Backend, vừa đủ cá tính để người xem nhớ đến phong cách và quá trình học tập.",
      solution: "Thiết kế website tĩnh bằng HTML/CSS/JavaScript, bố cục theo từng chương hành trình, kết hợp polaroid, coverflow và lanyard để giữ nhịp xem.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "GitHub Pages"],
      algorithms: ["Intersection Observer reveal", "Canvas starfield", "CSS 3D transforms"],
      features: [
        "Giao diện thẩm mỹ với chuyển động nhẹ, có thể tạm dừng hiệu ứng",
        "Kể chuyện hành trình học tập theo từng mục",
        "Chi tiết dự án mở trong modal",
        "Tối ưu hiển thị trên máy tính và điện thoại",
        "Triển khai trên GitHub Pages"
      ],
      challenges: "Giữ hiệu ứng mượt mà mà không làm rối nội dung, đồng thời vẫn dễ tắt animation khi cần tập trung đọc.",
      learned: "Kết hợp bố cục, chuyển động và kể chuyện để một trang tĩnh vẫn có chiều sâu và cá tính.",
      github: "https://github.com/NhuThiNguyen/profile",
      demo: "https://nhuthinguyen.github.io/profile/"
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  // DOM elements bên trong modal
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalOverview = document.getElementById('modalOverview');
  const modalProblem = document.getElementById('modalProblem');
  const modalSolution = document.getElementById('modalSolution');
  const modalTechnologies = document.getElementById('modalTechnologies');
  const modalAlgorithms = document.getElementById('modalAlgorithms');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalChallenges = document.getElementById('modalChallenges');
  const modalLearned = document.getElementById('modalLearned');
  const modalGithubLink = document.getElementById('modalGithubLink');
  const modalDemoLink = document.getElementById('modalDemoLink');

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalBadge.textContent = data.category;
    modalTitle.textContent = data.name;
    modalOverview.textContent = data.overview;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;
    modalChallenges.textContent = data.challenges;
    modalLearned.textContent = data.learned;

    // Technologies Tags
    modalTechnologies.innerHTML = '';
    data.technologies.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'modal-tag';
      tag.textContent = tech;
      modalTechnologies.appendChild(tag);
    });

    // Algorithms Tags
    modalAlgorithms.innerHTML = '';
    data.algorithms.forEach(algo => {
      const tag = document.createElement('span');
      tag.className = 'modal-tag';
      tag.textContent = algo;
      modalAlgorithms.appendChild(tag);
    });

    // Key Features List
    modalFeatures.innerHTML = '';
    data.features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      modalFeatures.appendChild(li);
    });

    // Action Links
    modalGithubLink.href = data.github;
    modalDemoLink.href = data.demo;

    // Hiển thị modal
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang phía sau
  }

  function closeModal() {
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Mở lại cuộn trang
  }

  // Lắng nghe sự kiện click mở modal
  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  const reduceProjectMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.project-fan-card[data-project]').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('a, button')) return;
      const projectId = card.getAttribute('data-project');
      if (projectId) openModal(projectId);
    });
  });

  function initCoverflow(fan) {
    if (!fan) return;
    const cards = Array.from(fan.querySelectorAll('.project-fan-card'));
    const sparksCanvas = fan.querySelector('.projects-fan-sparks');
    if (!cards.length) return;

    const n = cards.length;
    let focusF = n <= 3 ? 1 : Math.floor((n - 1) / 2);
    let pausedUntil = 0;
    let hovering = false;

    cards.forEach((card, index) => {
      if (card.getAttribute('data-project')) return;
      card.addEventListener('click', (event) => {
        if (event.target.closest('a, button')) return;
        let offset = index - focusF;
        if (offset > n / 2) offset -= n;
        if (offset < -n / 2) offset += n;
        if (offset < -0.2) focusF = (Math.round(focusF) - 1 + n) % n;
        else if (offset > 0.2) focusF = (Math.round(focusF) + 1) % n;
        pausedUntil = performance.now() + 4200;
      });
    });

    if (reduceProjectMotion) return;

    let lookX = 0;
    let lookY = 0;
    let targetX = 0;
    let targetY = 0;
    let idle = 0;
    const sparks = [];
    const sparkCtx = sparksCanvas ? sparksCanvas.getContext('2d') : null;

    function layoutSparks() {
      if (!sparksCanvas) return;
      const rect = fan.getBoundingClientRect();
      sparksCanvas.width = Math.floor(rect.width);
      sparksCanvas.height = Math.floor(rect.height);
    }

    function placeCards() {
      idle += 0.012;
      lookX += (targetX - lookX) * 0.08;
      lookY += (targetY - lookY) * 0.08;
      const wave = Math.sin(idle) * 6;

      if (n > 3 && fxOn() && !hovering && performance.now() > pausedUntil) {
        focusF += 0.0042;
        if (focusF >= n) focusF -= n;
      }

      cards.forEach((card, index) => {
        let slotOffset = index - 1;
        if (n > 3) {
          let offset = index - focusF;
          if (offset > n / 2) offset -= n;
          if (offset < -n / 2) offset += n;
          const visible = Math.abs(offset) <= 1.28;
          card.classList.toggle('is-away', !visible);
          if (!visible) return;
          slotOffset = offset;
        }

        const slot = slotOffset * 40 + lookX * 20 + wave * slotOffset;
        const depth = Math.cos((slot * Math.PI) / 180);
        const tx = Math.sin((slot * Math.PI) / 180) * 300;
        const tz = 60 + depth * 150;
        const lift = lookY * -18 + Math.sin(idle * 1.4 + index) * 8;
        const scale = 0.86 + depth * 0.2;
        const glow = 0.25 + Math.max(0, depth) * 0.85;
        card.style.setProperty('--ry', `${slot}deg`);
        card.style.setProperty('--tx', `${tx}px`);
        card.style.setProperty('--tz', `${tz}px`);
        card.style.setProperty('--lift', `${lift}px`);
        card.style.setProperty('--scale', scale.toFixed(3));
        card.style.setProperty('--glow', glow.toFixed(3));
        card.classList.toggle('is-active', depth > 0.65);
        card.classList.toggle('is-dim', depth < 0.35);
      });
    }

    function drawSparks() {
      if (!sparkCtx || !sparksCanvas) return;
      sparkCtx.clearRect(0, 0, sparksCanvas.width, sparksCanvas.height);
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.life -= 0.02;
        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        sparkCtx.beginPath();
        sparkCtx.fillStyle = `rgba(${spark.c}, ${spark.life})`;
        sparkCtx.arc(spark.x, spark.y, spark.s * spark.life, 0, Math.PI * 2);
        sparkCtx.fill();
      }
    }

    function tick() {
      if (fxOn()) {
        placeCards();
        drawSparks();
      }
      requestAnimationFrame(tick);
    }

    layoutSparks();
    window.addEventListener('resize', layoutSparks);
    fan.addEventListener('pointerenter', () => {
      hovering = n > 3;
    });
    fan.addEventListener('pointermove', (event) => {
      hovering = n > 3;
      const rect = fan.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (sparks.length < 40) {
        sparks.push({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          vx: (Math.random() - 0.5) * 1.6,
          vy: -1 - Math.random() * 1.4,
          s: 1.4 + Math.random() * 2.2,
          life: 1,
          c: ['244,114,182', '168,85,247', '255,255,255'][Math.floor(Math.random() * 3)]
        });
      }
    });
    fan.addEventListener('pointerleave', () => {
      hovering = false;
      targetX = 0;
      targetY = 0;
    });
    requestAnimationFrame(tick);
  }

  initCoverflow(document.getElementById('activitiesFan'));

  function initWorksDesk() {
    const desk = document.getElementById('worksDesk');
    if (!desk) return;
    const rows = Array.from(desk.querySelectorAll('.works-row'));
    const folders = Array.from(desk.querySelectorAll('.works-folder'));
    let selected = '0';

    function setActive(index) {
      const id = String(index);
      rows.forEach((el) => el.classList.toggle('is-on', el.dataset.folder === id));
      folders.forEach((el) => el.classList.toggle('is-on', el.dataset.folder === id));
    }

    function bind(el) {
      el.addEventListener('pointerenter', () => setActive(el.dataset.folder));
      el.addEventListener('focus', () => setActive(el.dataset.folder));
      el.addEventListener('click', () => {
        selected = el.dataset.folder || '0';
        setActive(selected);
        const projectId = el.getAttribute('data-project');
        if (projectId) openModal(projectId);
      });
    }

    rows.forEach(bind);
    folders.forEach(bind);
    desk.addEventListener('pointerleave', () => setActive(selected));
    setActive(selected);
  }

  initWorksDesk();

  // Đóng modal qua nút đóng
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Đóng modal khi click ra ngoài hộp thoại
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeModal();
      }
    });
  }

  // Đóng modal khi nhấn phím Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('open')) {
      closeModal();
    }
  });


  /* --------------------------------------------------------------------------
     6. CONTACT TOAST + TABLET TILT
     -------------------------------------------------------------------------- */
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message) {
    if (!toastNotification) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4500);
  }

  const contactLanyard = document.getElementById('contactLanyard');
  const contactBadge = document.getElementById('contactBadge');
  const passStrap = document.getElementById('passStrap');
  const lanyardArm = document.getElementById('lanyardArm');
  const reduceLanyardMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (contactLanyard && contactBadge && passStrap && lanyardArm && !reduceLanyardMotion) {
    const REST_LEN = 88;
    const MIN_LEN = 72;
    const MAX_LEN = 220;
    let angle = 0;
    let length = REST_LEN;
    let targetAngle = 0;
    let targetLen = REST_LEN;
    let angVel = 0;
    let lenVel = 0;
    let dragging = false;
    let hovering = false;
    let hoverX = 0;
    let time = 0;

    function anchorPoint() {
      const box = contactLanyard.getBoundingClientRect();
      return {
        x: box.left + box.width / 2,
        y: box.top + 6
      };
    }

    function applyPose() {
      const sway = Math.sin(time * 1.1) * 2.2;
      const lift = Math.sin(time * 0.85) * 3;
      lanyardArm.style.transform = `rotate(${-(angle + sway)}deg)`;
      passStrap.style.height = `${length}px`;
      contactBadge.style.transform = `translateY(${lift}px) rotate(${angle * 0.16}deg) rotateY(${-angle * 0.28}deg)`;
    }

    function aimAt(clientX, clientY) {
      const a = anchorPoint();
      const dx = clientX - a.x;
      const dy = Math.max(40, clientY - a.y);
      targetAngle = Math.atan2(dx, dy) * (180 / Math.PI);
      targetLen = Math.max(MIN_LEN, Math.min(MAX_LEN, Math.hypot(dx, dy) - 24));
    }

    function tick() {
      if (!fxOn() && !dragging) {
        requestAnimationFrame(tick);
        return;
      }
      time += 0.016;
      if (!dragging) {
        if (hovering) {
          targetAngle += (hoverX * 12 - targetAngle) * 0.06;
          targetLen += (REST_LEN + Math.abs(hoverX) * 10 - targetLen) * 0.06;
        } else {
          targetAngle = Math.sin(time * 0.65) * 8 + Math.sin(time * 1.05) * 3.2;
          targetLen = REST_LEN + Math.sin(time * 0.8) * 7;
        }
      }
      angVel += (targetAngle - angle) * 0.055;
      angVel *= 0.9;
      angle += angVel;
      lenVel += (targetLen - length) * 0.07;
      lenVel *= 0.88;
      length += lenVel;
      applyPose();
      requestAnimationFrame(tick);
    }

    contactLanyard.addEventListener('pointermove', (event) => {
      const box = contactLanyard.getBoundingClientRect();
      hoverX = ((event.clientX - box.left) / box.width - 0.5) * 2;
      hovering = !dragging;
      if (dragging) aimAt(event.clientX, event.clientY);
    });
    contactLanyard.addEventListener('pointerleave', () => {
      hovering = false;
    });

    contactBadge.addEventListener('pointerdown', (event) => {
      if (event.button !== undefined && event.button !== 0) return;
      event.preventDefault();
      dragging = true;
      hovering = false;
      lanyardArm.classList.add('is-dragging');
      contactBadge.classList.add('is-dragging');
      contactBadge.setPointerCapture(event.pointerId);
      aimAt(event.clientX, event.clientY);
    });

    contactBadge.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      aimAt(event.clientX, event.clientY);
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      lanyardArm.classList.remove('is-dragging');
      contactBadge.classList.remove('is-dragging');
    }

    contactBadge.addEventListener('pointerup', endDrag);
    contactBadge.addEventListener('pointercancel', endDrag);
    applyPose();
    requestAnimationFrame(tick);
  }


  /* --------------------------------------------------------------------------
     7. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* --------------------------------------------------------------------------
     8. THEME TOGGLE (LIGHT / DARK MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Áp dụng theme đã lưu từ trước (nếu có)
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện Sáng');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      if (isDark) {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện Sáng');
        localStorage.setItem('portfolio-theme', 'dark');
        showToast('Đã chuyển sang giao diện Tối (Dark Mode) 🌙');
      } else {
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện Tối');
        localStorage.setItem('portfolio-theme', 'light');
        showToast('Đã chuyển sang giao diện Sáng (Light Mode) ☀️');
      }
    });
  }


  /* --------------------------------------------------------------------------
     9. COPY EMAIL TO CLIPBOARD
     -------------------------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  function promptCopyFallback(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast('Đã sao chép email: ' + text + ' 📋');
    } catch (err) {
      showToast('Email: ' + text);
    }
    document.body.removeChild(tempInput);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'nguyenthithaonhu.9a7@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
          .then(() => {
            showToast('Đã sao chép email vào bộ nhớ tạm: ' + email + ' 📋');
          })
          .catch(() => {
            promptCopyFallback(email);
          });
      } else {
        promptCopyFallback(email);
      }
    });
  }


  /* --------------------------------------------------------------------------
     10. EDUCATION JOURNEY: CURVED PATH + SCROLL-LINKED TRAVELER
     -------------------------------------------------------------------------- */
  const eduJourney = document.getElementById('eduJourney');
  const eduSvg = document.getElementById('eduJourneySvg');
  const eduPath = document.getElementById('eduPathLine');
  const eduTraveler = document.getElementById('eduTraveler');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let eduProgress = 0;
  let eduTarget = 0;
  let eduPathReady = false;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function catmullRomToBezier(points) {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  function buildEducationPath() {
    if (!eduJourney || !eduSvg || !eduPath || !eduTraveler) return;

    const width = eduJourney.offsetWidth;
    const height = eduJourney.offsetHeight;
    if (width < 40 || height < 40) return;

    eduSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    eduSvg.setAttribute('width', width);
    eduSvg.setAttribute('height', height);

    const stops = Array.from(eduJourney.querySelectorAll('[data-edu-stop]'));
    const isNarrow = width < 768;
    const cx = isNarrow ? 18 : width / 2;
    const amp = isNarrow ? 0 : Math.min(width * 0.2, 190);
    const points = [{ x: cx, y: 18 }];

    stops.forEach((stop, index) => {
      const y = stop.offsetTop + stop.offsetHeight / 2;
      const dir = index % 2 === 0 ? 1 : -1;
      points.push({
        x: cx + dir * amp * 0.35,
        y: stop.offsetTop + stop.offsetHeight * 0.18
      });
      points.push({ x: cx + dir * amp * 0.06, y });
      points.push({
        x: cx - dir * amp * 0.35,
        y: stop.offsetTop + stop.offsetHeight * 0.82
      });
    });

    points.push({ x: cx, y: height - 18 });
    eduPath.setAttribute('d', catmullRomToBezier(points));

    eduPathReady = true;
    placeTraveler(eduProgress);
  }

  function getEducationProgress() {
    if (!eduJourney) return 0;
    const rect = eduJourney.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const start = viewport * 0.62;
    const end = viewport * 0.28;
    const traveled = start - rect.top;
    const range = rect.height - (end - (viewport - start));
    return clamp(traveled / Math.max(range, 1), 0, 1);
  }

  function placeTraveler(t) {
    if (!eduPathReady || !eduPath || !eduTraveler) return;
    const length = eduPath.getTotalLength();
    if (!length) return;
    const point = eduPath.getPointAtLength(t * length);
    eduTraveler.setAttribute('cx', point.x);
    eduTraveler.setAttribute('cy', point.y);
  }

  function tickEducationTraveler() {
    eduTarget = getEducationProgress();
    const delta = eduTarget - eduProgress;
    const follow = reduceMotion ? 1 : 0.09 + Math.min(0.42, Math.abs(delta) * 1.35);
    eduProgress += delta * follow;
    if (Math.abs(delta) < 0.0004) eduProgress = eduTarget;
    placeTraveler(eduProgress);
    requestAnimationFrame(tickEducationTraveler);
  }

  const aboutCard = document.querySelector('.about-card-text');
  if (aboutCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    aboutCard.addEventListener('pointermove', (event) => {
      const rect = aboutCard.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      aboutCard.style.setProperty('--spot-x', `${x}%`);
      aboutCard.style.setProperty('--spot-y', `${y}%`);
      aboutCard.style.setProperty('--tilt-y', `${((x - 50) / 50) * 7}deg`);
      aboutCard.style.setProperty('--tilt-x', `${((50 - y) / 50) * 7}deg`);
    });

    aboutCard.addEventListener('pointerleave', () => {
      aboutCard.style.setProperty('--tilt-x', '0deg');
      aboutCard.style.setProperty('--tilt-y', '0deg');
    });
  }

  /* --------------------------------------------------------------------------
     SITE STARFIELD: twinkle, shooting stars, cursor glow, click bursts
     -------------------------------------------------------------------------- */
  const starCanvas = document.getElementById('siteStars');
  if (starCanvas) {
    const starCtx = starCanvas.getContext('2d');
    const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const starColors = [
      [219, 39, 119],
      [244, 114, 182],
      [147, 51, 234],
      [168, 85, 247],
      [79, 70, 229],
      [236, 72, 153]
    ];

    let stars = [];
    let meteors = [];
    let sparks = [];
    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.35;
    let parallaxX = 0;
    let parallaxY = 0;
    let lastMeteor = 0;

    function isDarkSky() {
      return document.body.classList.contains('dark-mode');
    }

    function resizeStarfield() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      starCanvas.width = Math.floor(window.innerWidth * dpr);
      starCanvas.height = Math.floor(window.innerHeight * dpr);
      starCanvas.style.width = `${window.innerWidth}px`;
      starCanvas.style.height = `${window.innerHeight}px`;
      starCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    }

    function seedStars() {
      const count = Math.round(Math.min(220, Math.max(110, window.innerWidth * 0.14)));
      stars = Array.from({ length: count }, (_, index) => {
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const hero = index % 7 === 0;
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: hero ? 3.4 + Math.random() * 2.8 : 1.4 + Math.random() * 2.2,
          twinkle: Math.random() * Math.PI * 2,
          speed: 0.028 + Math.random() * 0.045,
          depth: 0.2 + Math.random() * 0.8,
          sparkle: hero || Math.random() > 0.62,
          color
        };
      });
    }

    function drawSparkle(x, y, size, r, g, b, alpha) {
      starCtx.save();
      starCtx.translate(x, y);
      starCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      starCtx.beginPath();
      starCtx.moveTo(0, -size * 3.4);
      starCtx.lineTo(size * 0.55, 0);
      starCtx.lineTo(0, size * 3.4);
      starCtx.lineTo(-size * 0.55, 0);
      starCtx.closePath();
      starCtx.fill();
      starCtx.beginPath();
      starCtx.moveTo(-size * 3.4, 0);
      starCtx.lineTo(0, size * 0.55);
      starCtx.lineTo(size * 3.4, 0);
      starCtx.lineTo(0, -size * 0.55);
      starCtx.closePath();
      starCtx.fill();
      starCtx.restore();
    }

    function spawnMeteor(fromX, fromY) {
      const startX = fromX ?? (window.innerWidth * (Math.random() > 0.5 ? -0.05 : 0.08 + Math.random() * 0.7));
      const startY = fromY ?? (Math.random() * window.innerHeight * 0.55);
      const speed = 13 + Math.random() * 10;
      const angle = (16 + Math.random() * 28) * (Math.PI / 180);
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        length: 140 + Math.random() * 120,
        width: 2.6 + Math.random() * 2.2
      });
    }

    function spawnBurst(x, y) {
      for (let i = 0; i < 22; i += 1) {
        const angle = (Math.PI * 2 * i) / 22 + Math.random() * 0.35;
        const speed = 1.8 + Math.random() * 4.6;
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          size: 2.2 + Math.random() * 2.8,
          color
        });
      }
      spawnMeteor(x, y);
      spawnMeteor(x - 24, y - 10);
    }

    function drawStarfield(time) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (!fxOn()) {
        requestAnimationFrame(drawStarfield);
        return;
      }
      const dark = isDarkSky();
      starCtx.clearRect(0, 0, width, height);

      parallaxX += ((mouseX - width / 2) * 0.06 - parallaxX) * 0.08;
      parallaxY += ((mouseY - height / 2) * 0.06 - parallaxY) * 0.08;

      stars.forEach((star) => {
        star.twinkle += star.speed;
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = Math.max(0, 1 - dist / 260);
        const pulse = 0.25 + Math.abs(Math.sin(star.twinkle)) * 0.75 + near * 0.7;
        const px = star.x + parallaxX * star.depth + (near > 0 ? dx * -0.08 * near : 0);
        const py = star.y + parallaxY * star.depth + (near > 0 ? dy * -0.08 * near : 0);
        const [r, g, b] = star.color;
        const alpha = (dark ? 1 : 0.95) * Math.min(1, pulse);
        const radius = star.size + near * 2.2;
        drawSparkle(px, py, radius, r, g, b, alpha);
      });

      if (!prefersLessMotion && time - lastMeteor > 1100 + Math.random() * 900) {
        spawnMeteor();
        if (Math.random() > 0.55) spawnMeteor();
        lastMeteor = time;
      }

      meteors = meteors.filter((meteor) => meteor.life > 0);
      meteors.forEach((meteor) => {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life -= 0.012;
        const fade = Math.max(0, meteor.life);
        const tailX = meteor.x - meteor.vx * (meteor.length / 10);
        const tailY = meteor.y - meteor.vy * (meteor.length / 10);
        const glow = starCtx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
        glow.addColorStop(0, 'rgba(168, 85, 247, 0)');
        glow.addColorStop(0.35, `rgba(244, 114, 182, ${0.45 * fade})`);
        glow.addColorStop(0.75, `rgba(255, 255, 255, ${0.85 * fade})`);
        glow.addColorStop(1, `rgba(255, 255, 255, ${fade})`);
        starCtx.strokeStyle = glow;
        starCtx.lineWidth = meteor.width + 2;
        starCtx.lineCap = 'round';
        starCtx.beginPath();
        starCtx.moveTo(tailX, tailY);
        starCtx.lineTo(meteor.x, meteor.y);
        starCtx.stroke();
        starCtx.lineWidth = meteor.width;
        starCtx.stroke();
        starCtx.beginPath();
        starCtx.fillStyle = `rgba(255, 255, 255, ${fade})`;
        starCtx.arc(meteor.x, meteor.y, 3.2, 0, Math.PI * 2);
        starCtx.fill();
        starCtx.beginPath();
        starCtx.fillStyle = `rgba(244, 114, 182, ${0.45 * fade})`;
        starCtx.arc(meteor.x, meteor.y, 8, 0, Math.PI * 2);
        starCtx.fill();
      });

      sparks = sparks.filter((spark) => spark.life > 0);
      sparks.forEach((spark) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.03;
        spark.life -= 0.03;
        const [r, g, b] = spark.color;
        starCtx.beginPath();
        starCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0, spark.life)})`;
        starCtx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2);
        starCtx.fill();
      });

      requestAnimationFrame(drawStarfield);
    }

    window.addEventListener('resize', resizeStarfield);
    window.addEventListener('pointermove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });
    window.addEventListener('pointerdown', (event) => {
      if (!fxOn()) return;
      if (event.target.closest('a, button, input, textarea, select, label, #contactBadge, #contactLanyard, #lanyardArm')) return;
      spawnBurst(event.clientX, event.clientY);
    });

    resizeStarfield();
    requestAnimationFrame(drawStarfield);
    setTimeout(() => {
      if (fxOn() && !prefersLessMotion) spawnMeteor();
    }, 900);
  }

  /* --------------------------------------------------------------------------
     INTERESTS CINEMA REEL
     -------------------------------------------------------------------------- */
  const interestsReel = document.getElementById('interestsReel');
  const reelCards = interestsReel ? Array.from(interestsReel.querySelectorAll('.reel-card')) : [];
  const reelPrev = document.getElementById('reelPrev');
  const reelNext = document.getElementById('reelNext');
  const reelDots = document.getElementById('reelDots');
  const reduceReelMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (interestsReel && reelCards.length) {
    let active = 0;
    let timer = null;
    let lookX = 0;
    let lookY = 0;
    let targetX = 0;
    let targetY = 0;
    let hovering = false;

    reelCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Sở thích ${index + 1}`);
      dot.addEventListener('click', () => goTo(index, true));
      reelDots.appendChild(dot);
    });

    function wrapOffset(index) {
      const n = reelCards.length;
      let offset = index - active;
      if (offset > n / 2) offset -= n;
      if (offset < -n / 2) offset += n;
      return offset;
    }

    function layout() {
      lookX += (targetX - lookX) * 0.08;
      lookY += (targetY - lookY) * 0.08;
      reelCards.forEach((card, index) => {
        const offset = wrapOffset(index);
        const tx = offset * 235 + lookX * 22;
        const ry = offset * -28;
        const tz = 110 - Math.abs(offset) * 130;
        const scale = offset === 0 ? 1.12 : 0.88;
        const lift = (offset === 0 ? -8 : 18) + lookY * -12;
        card.style.setProperty('--tx', `${tx}px`);
        card.style.setProperty('--ry', `${ry}deg`);
        card.style.setProperty('--tz', `${tz}px`);
        card.style.setProperty('--scale', scale.toFixed(3));
        card.style.setProperty('--lift', `${lift}px`);
        card.classList.toggle('is-active', offset === 0);
        card.classList.toggle('is-side', Math.abs(offset) === 1);
        card.classList.toggle('is-far', Math.abs(offset) >= 2);
        if (offset !== 0) card.classList.remove('is-open');
      });
      Array.from(reelDots.children).forEach((dot, index) => {
        dot.classList.toggle('is-on', index === active);
      });
    }

    function goTo(index, fromUser) {
      const n = reelCards.length;
      active = ((index % n) + n) % n;
      if (fromUser) restartTimer();
      layout();
    }

    function restartTimer() {
      clearInterval(timer);
      if (reduceReelMotion) return;
      timer = setInterval(() => {
        const storyOpen = reelCards.some((card) => card.classList.contains('is-open'));
        if (!hovering && !storyOpen) goTo(active + 1);
      }, 4500);
    }

    reelPrev.addEventListener('click', () => goTo(active - 1, true));
    reelNext.addEventListener('click', () => goTo(active + 1, true));

    reelCards.forEach((card, index) => {
      card.addEventListener('click', (event) => {
        if (event.target.closest('.reel-play')) return;
        if (!card.classList.contains('is-active')) {
          goTo(index, true);
          return;
        }
        card.classList.toggle('is-open');
      });
      const play = card.querySelector('.reel-play');
      if (play) {
        play.addEventListener('click', (event) => {
          event.stopPropagation();
          goTo(index, true);
          card.classList.add('is-open');
        });
      }
    });

    interestsReel.addEventListener('pointermove', (event) => {
      const rect = interestsReel.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      hovering = true;
    });
    interestsReel.addEventListener('pointerleave', () => {
      targetX = 0;
      targetY = 0;
      hovering = false;
    });

    document.addEventListener('keydown', (event) => {
      const rect = interestsReel.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (event.key === 'ArrowLeft') goTo(active - 1, true);
      if (event.key === 'ArrowRight') goTo(active + 1, true);
    });

    function tick() {
      if (fxOn()) layout();
      requestAnimationFrame(tick);
    }

    layout();
    restartTimer();
    if (!reduceReelMotion) requestAnimationFrame(tick);
  }

  if (eduJourney) {
    buildEducationPath();
    window.addEventListener('resize', () => {
      window.requestAnimationFrame(buildEducationPath);
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(buildEducationPath);
    }
    requestAnimationFrame(tickEducationTraveler);
  }

  /* --------------------------------------------------------------------------
     SKILL ICONS: gentle float + magnetic pointer
     -------------------------------------------------------------------------- */
  const skillsStage = document.querySelector('.skills-stage');
  const skillIcons = skillsStage ? [...skillsStage.querySelectorAll('.skill-icon')] : [];
  const reduceSkillMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (skillsStage && skillIcons.length && !reduceSkillMotion) {
    const bits = skillIcons.map((el, i) => ({
      el,
      phase: i * 0.84,
      ampX: 3.5 + (i % 4) * 1.2,
      ampY: 5.5 + (i % 5) * 1.1,
      speed: 0.62 + (i % 6) * 0.07,
      tilt: 1.4 + (i % 3) * 0.45,
      x: 0,
      y: 0,
      s: 1,
      r: 0
    }));

    skillIcons.forEach((el) => el.classList.add('is-live'));

    let pointerX = 0;
    let pointerY = 0;
    let pointerIn = false;

    skillsStage.addEventListener('pointermove', (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerIn = true;
    });
    skillsStage.addEventListener('pointerleave', () => {
      pointerIn = false;
    });
    skillIcons.forEach((el) => {
      el.addEventListener('click', () => {
        if (!fxOn()) return;
        el.style.transition = 'transform 0.18s ease';
        const current = bits.find((b) => b.el === el);
        if (!current) return;
        current.s = 1.22;
        requestAnimationFrame(() => {
          el.style.transition = '';
        });
      });
    });

    function tickSkills(now) {
      if (fxOn()) {
        const t = now * 0.001;
        bits.forEach((bit) => {
          const bobX = Math.sin(t * bit.speed + bit.phase) * bit.ampX;
          const bobY = Math.cos(t * bit.speed * 0.86 + bit.phase * 1.25) * bit.ampY;
          const bobR = Math.sin(t * bit.speed * 0.55 + bit.phase) * bit.tilt;

          let magX = 0;
          let magY = 0;
          let extra = 0;
          const box = bit.el.getBoundingClientRect();
          const cx = box.left + box.width / 2;
          const cy = box.top + box.height / 2;

          if (pointerIn) {
            const dx = pointerX - cx;
            const dy = pointerY - cy;
            const dist = Math.hypot(dx, dy);
            const radius = 150;
            if (dist < radius) {
              const force = 1 - dist / radius;
              const eased = force * force;
              magX = dx * eased * 0.22;
              magY = dy * eased * 0.22;
              extra = eased * 0.16;
              bit.el.classList.toggle('is-near', force > 0.35);
            } else {
              bit.el.classList.remove('is-near');
            }
          } else {
            bit.el.classList.remove('is-near');
          }

          const tx = bobX + magX;
          const ty = bobY + magY;
          const ts = 1 + extra;
          const tr = bobR + magX * 0.04;

          bit.x += (tx - bit.x) * 0.1;
          bit.y += (ty - bit.y) * 0.1;
          bit.s += (ts - bit.s) * 0.12;
          bit.r += (tr - bit.r) * 0.1;

          bit.el.style.transform = `translate3d(${bit.x.toFixed(2)}px, ${bit.y.toFixed(2)}px, 0) rotate(${bit.r.toFixed(2)}deg) scale(${bit.s.toFixed(3)})`;
        });
      }
      requestAnimationFrame(tickSkills);
    }

    requestAnimationFrame(tickSkills);
  }

}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootPortfolio);
} else {
  bootPortfolio();
}
