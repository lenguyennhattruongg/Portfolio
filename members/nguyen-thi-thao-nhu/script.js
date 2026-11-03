// Portfolio Nguyen Thi Thao Nhu - Base Script
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
      if (window.__liquidEther) {
        if (fxOn()) window.__liquidEther.start();
        else window.__liquidEther.pause();
      }
      if (window.__contactHands) {
        if (fxOn()) window.__contactHands.start();
        else window.__contactHands.stop();
      }
    });
  }

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

  initContactHands();

  function initContactHands() {
    const canvas = document.getElementById('contactDots');
    const section = document.getElementById('contact');
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    const SRC = {
      LA: [0, 0.06, 0.47, 0.40],
      RA: [0.53, 0.06, 0.47, 0.40],
      LB: [0, 0.55, 0.47, 0.40],
      RB: [0.53, 0.55, 0.47, 0.40]
    };
    let tiles = null;
    let cols = 0;
    let rows = 0;
    let step = 7;
    let rowStep = 14;
    let radius = 3;
    let viewW = 1;
    let viewH = 1;
    let dpr = 1;
    let fieldA;
    let fieldB;
    let running = false;
    let visible = false;
    const started = performance.now();
    const LOOP = 20;

    function hash(a, b) {
      const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
      return x - Math.floor(x);
    }
    function smooth(edge0, edge1, value) {
      const t = Math.max(0, Math.min(1, (value - edge0) / ((edge1 - edge0) || 1)));
      return t * t * (3 - 2 * t);
    }
    function mixAt(time, on, off, duration) {
      return smooth(on, on + duration, time) * (1 - smooth(off, off + duration, time));
    }

    function resize() {
      const rect = section.getBoundingClientRect();
      viewW = Math.max(1, Math.floor(rect.width));
      viewH = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(viewW * dpr);
      canvas.height = Math.floor(viewH * dpr);
      step = Math.max(5, viewW / 205);
      rowStep = step * 2.05;
      cols = Math.ceil(viewW / step);
      rows = Math.ceil(viewH / rowStep);
      radius = step * 0.46;
      fieldA = document.createElement('canvas');
      fieldB = document.createElement('canvas');
      fieldA.width = fieldB.width = cols;
      fieldA.height = fieldB.height = rows;
    }

    function sliceTiles(image) {
      const sheetW = image.naturalWidth;
      const sheetH = image.naturalHeight;
      tiles = {};
      Object.keys(SRC).forEach((key) => {
        const [fx, fy, fw, fh] = SRC[key];
        const tile = document.createElement('canvas');
        const sourceW = fw * sheetW;
        const sourceH = fh * sheetH;
        tile.width = 420;
        tile.height = Math.max(1, Math.round(420 * (sourceH / sourceW)));
        const tileCtx = tile.getContext('2d');
        tileCtx.imageSmoothingQuality = 'high';
        tileCtx.drawImage(image, fx * sheetW, fy * sheetH, sourceW, sourceH, 0, 0, tile.width, tile.height);
        tiles[key] = tile;
      });
    }

    function handCenterY() {
      const hello = section.querySelector('.contact-hello');
      if (!hello) return viewH * (viewH > viewW ? 0.66 : 0.54);
      const sectionBox = section.getBoundingClientRect();
      const helloBox = hello.getBoundingClientRect();
      return (helloBox.top + helloBox.bottom) / 2 - sectionBox.top;
    }

    function drawHand(field, tile, side, time, centerY) {
      const portrait = viewH > viewW;
      const angle = (Math.PI * 2 * time) / LOOP;
      const phase = side === 'L' ? 0 : Math.PI;
      const handW = viewW * (portrait ? 0.66 : 0.53);
      const handH = handW * ((0.40 * 1520) / (0.47 * 2688));
      const reach = (0.035 * Math.sin(angle + phase) + 0.012 * Math.sin(2 * angle + 1.3 + phase)) * viewW;
      const scale = 1 + 0.07 * Math.sin(angle + 0.9 + phase);
      const roll = (side === 'L' ? 1 : -1) * 0.045 * Math.sin(angle + 2.1 + phase);
      const x = side === 'L' ? reach - viewW * 0.045 : viewW - handW + viewW * 0.045 - reach;
      const pivotX = side === 'L' ? x : x + handW;
      const fieldCtx = field.getContext('2d', { willReadFrequently: true });
      fieldCtx.save();
      fieldCtx.imageSmoothingEnabled = false;
      fieldCtx.scale(cols / viewW, rows / viewH);
      fieldCtx.translate(pivotX, centerY);
      fieldCtx.rotate(roll);
      fieldCtx.scale(scale, scale);
      fieldCtx.translate(-pivotX, -centerY);
      fieldCtx.drawImage(tile, x, centerY - handH / 2, handW, handH);
      fieldCtx.restore();
      return fieldCtx;
    }

    function render(now) {
      if (!running) return;
      if (!tiles || !fieldA) {
        requestAnimationFrame(render);
        return;
      }
      const time = ((now - started) / 1000) % LOOP;
      const centerY = handCenterY();
      const ctxA = fieldA.getContext('2d', { willReadFrequently: true });
      const ctxB = fieldB.getContext('2d', { willReadFrequently: true });
      ctxA.setTransform(1, 0, 0, 1, 0, 0);
      ctxB.setTransform(1, 0, 0, 1, 0, 0);
      ctxA.fillStyle = '#fff';
      ctxB.fillStyle = '#fff';
      ctxA.fillRect(0, 0, cols, rows);
      ctxB.fillRect(0, 0, cols, rows);
      drawHand(fieldA, tiles.LA, 'L', time, centerY);
      drawHand(fieldA, tiles.RA, 'R', time, centerY);
      drawHand(fieldB, tiles.LB, 'L', time, centerY);
      drawHand(fieldB, tiles.RB, 'R', time, centerY);
      const dataA = ctxA.getImageData(0, 0, cols, rows).data;
      const dataB = ctxB.getImageData(0, 0, cols, rows).data;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, viewW, viewH);
      ctx.fillStyle = document.body.classList.contains('dark-mode') ? '#f8fafc' : '#1e1b4b';
      const tick = Math.floor(time * 7);
      const mixLeft = mixAt(time, 6.2, 14.6, 1.6);
      const mixRight = mixAt(time, 2.4, 10.4, 1.6);
      const shifts = [];
      for (let row = 0; row < rows; row += 1) {
        shifts[row] = hash(row, tick) > 0.965 ? Math.round((hash(tick, row) - 0.5) * 8) : 0;
      }
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const seed = 0.55 * hash(col, row) + 0.45 * hash(row * 3.1, 7.7);
          const mix = col < cols / 2 ? mixLeft : mixRight;
          let sample = col - shifts[row];
          if (sample < 0) sample = 0;
          if (sample > cols - 1) sample = cols - 1;
          const index = (row * cols + sample) * 4;
          const lum = ((seed < mix ? dataB : dataA)[index]) / 255;
          let value = (1 - lum - 0.16) / 0.42;
          if (value < 0) value = 0;
          if (value > 1) value = 1;
          if (value <= 0) continue;
          value *= 0.86 + 0.14 * Math.sin(time * 3.2 + seed * 40);
          if (mix > 0.001 && mix < 0.999 && Math.abs(seed - mix) < 0.12) {
            value *= Math.abs(seed - mix) / 0.12;
            if (hash(col + tick, row) <= 0.4) value *= 0.3;
          }
          const levels = [0, 0.26, 0.52, 0.78, 1];
          let level = 0;
          levels.forEach((item) => {
            if (value >= item - 0.13) level = item;
          });
          if (level <= 0) continue;
          ctx.beginPath();
          ctx.arc((col + 0.5) * step, (row + 0.5) * rowStep, level === 0.26 ? radius * 0.38 : radius * level, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      requestAnimationFrame(render);
    }

    function start() {
      if (running || !visible || !tiles || !fxOn() || document.hidden) return;
      running = true;
      requestAnimationFrame(render);
    }
    function stop() {
      running = false;
    }

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      sliceTiles(image);
      resize();
      start();
    };
    image.src = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261030_025250_100df7b8-31fd-4614-aa4a-c1b7d5b6b273.png&w=1600&q=85';
    resize();
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      if (visible) start();
      else stop();
    }, { threshold: 0.08 });
    observer.observe(section);
    window.addEventListener('resize', () => {
      resize();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
    window.__contactHands = { start, stop };
  }

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
     INTERESTS
     -------------------------------------------------------------------------- */
  const interestSwitch = document.getElementById('interestSwitch');
  if (interestSwitch) {
    const frames = [...interestSwitch.querySelectorAll('.interest-frame')];
    const copy = document.getElementById('interestCopy');
    const kicker = document.getElementById('interestKicker');
    const title = document.getElementById('interestTitle');
    const body = document.getElementById('interestBody');
    const meta = document.getElementById('interestMeta');
    let current = -1;
    let swapToken = 0;

    const show = (frame) => {
      const index = frames.indexOf(frame);
      if (index === current) return;
      current = index;
      const token = ++swapToken;
      copy.classList.add('is-swap');
      window.setTimeout(() => {
        if (token !== swapToken) return;
        kicker.textContent = frame.dataset.kicker;
        title.textContent = frame.dataset.title;
        body.textContent = frame.dataset.body;
        meta.textContent = frame.dataset.meta;
        copy.classList.remove('is-swap');
      }, 140);
    };

    const pick = () => {
      const mid = window.innerHeight * 0.5;
      let nearest = frames[0];
      let distance = Infinity;
      frames.forEach((frame) => {
        const box = frame.getBoundingClientRect();
        const delta = Math.abs(box.top + box.height / 2 - mid);
        if (delta < distance) {
          distance = delta;
          nearest = frame;
        }
      });
      if (nearest) show(nearest);
    };

    pick();
    window.addEventListener('scroll', pick, { passive: true });
    window.addEventListener('resize', pick);
  }

  const goalStage = document.getElementById('goalStage');
  if (goalStage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const panels = [...goalStage.querySelectorAll('.goal-card')];
    const dots = [...goalStage.querySelectorAll('.goal-dot')];
    const showGoal = (index) => {
      panels.forEach((panel, i) => {
        const on = i === index;
        panel.classList.toggle('is-on', on);
        panel.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach((dot, i) => {
        const on = i === index;
        dot.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showGoal(index));
    });
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
  document.querySelectorAll('.skill-file').forEach((file) => {
    const hit = file.querySelector('.skill-file-hit');
    let locked = false;
    const setOpen = (open) => {
      file.classList.toggle('is-open', open);
      if (hit) hit.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    file.addEventListener('pointerenter', () => setOpen(true));
    file.addEventListener('pointerleave', () => {
      if (!locked) setOpen(false);
    });
    file.addEventListener('click', () => {
      locked = !locked;
      setOpen(locked || file.matches(':hover'));
    });
    file.querySelectorAll('.skill-icon').forEach((icon) => {
      icon.addEventListener('pointermove', (event) => {
        if (!file.classList.contains('is-open') || !fxOn()) return;
        const box = icon.getBoundingClientRect();
        const x = (event.clientX - (box.left + box.width / 2)) * 0.22;
        const y = (event.clientY - (box.top + box.height / 2)) * 0.22;
        icon.style.setProperty('--drift-x', `${x.toFixed(1)}px`);
        icon.style.setProperty('--drift-y', `${y.toFixed(1)}px`);
      });
      icon.addEventListener('pointerleave', () => {
        icon.style.removeProperty('--drift-x');
        icon.style.removeProperty('--drift-y');
      });
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootPortfolio);
} else {
  bootPortfolio();
}
