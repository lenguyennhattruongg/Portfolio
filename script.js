/**
 * ==========================================================================
 * PERSONAL PORTFOLIO - NGUYỄN THỊ THẢO NHƯ
 * JavaScript Logic: Typing Effect, Mobile Menu, Active Scrollspy, 
 *                   Scroll Reveal, Project Modal, Form Validation & Toast.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

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


  /* --------------------------------------------------------------------------
     2. NAVBAR: SCROLL BLUR & ACTIVE SCROLLSPY
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

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
      }
    });
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Chạy ngay khi tải trang


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
     6. CONTACT FORM VALIDATION & EMAIL COMPOSER
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
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

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.toLowerCase());
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const subjectInput = document.getElementById('formSubject');
      const messageInput = document.getElementById('formMessage');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const subjectError = document.getElementById('subjectError');
      const messageError = document.getElementById('messageError');

      let isValid = true;

      // Kiểm tra họ tên
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        nameError.classList.remove('visible');
      }

      // Kiểm tra email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
        emailError.classList.remove('visible');
      }

      // Kiểm tra tiêu đề
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('invalid');
        subjectError.classList.add('visible');
        isValid = false;
      } else {
        subjectInput.classList.remove('invalid');
        subjectError.classList.remove('visible');
      }

      // Kiểm tra nội dung tin nhắn
      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
        messageError.classList.remove('visible');
      }

      // Mở ứng dụng email với nội dung đã điền sẵn; người dùng tự xác nhận gửi.
      if (isValid) {
        const recipient = 'nguyenthithaonhu.9a7@gmail.com';
        const subject = subjectInput.value.trim();
        const body = [
          `Họ và tên: ${nameInput.value.trim()}`,
          `Email liên hệ: ${emailInput.value.trim()}`,
          '',
          'Nội dung tin nhắn:',
          messageInput.value.trim()
        ].join('\n');
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        showToast('Ứng dụng email sẽ mở để bạn kiểm tra và nhấn Gửi.');
        window.location.href = mailtoUrl;
      }
    });

    // Tự động tắt báo lỗi khi người dùng bắt đầu nhập lại
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const errSpan = input.parentElement.querySelector('.form-error');
        if (errSpan) errSpan.classList.remove('visible');
      });
    });
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

});
