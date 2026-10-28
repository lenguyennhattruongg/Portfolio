(() => {
  /* 0. THEME + LANGUAGE TOGGLE (VI/EN) */
  const root = document.documentElement;
  const tr = (vi, en) => root.lang === 'en' ? en : vi;
  const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const load = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };

  const EN = {
    // Menu
    'Trang chủ':'Home',
    'Kỹ năng':'Skills',
    'Dự án':'Projects',
    'Kinh nghiệm':'Experience',
    'Liên hệ':'Contact',
    'Điều hướng chính':'Main navigation',
    'Mở menu':'Open menu',

    // Hero Section
    'Xin chào, tôi là':'Hi, I am',
    'Sinh viên Công nghệ Thông tin định hướng phát triển Web Front-End. Chuyên xây dựng giao diện tối ưu trải nghiệm người dùng (UX), đảm bảo tính tương thích đa thiết bị và chuyển đổi thiết kế thành các sản phẩm web hiện đại.':'An IT student aiming for Web Front-End Development. Specializing in building user-optimized interfaces (UX), ensuring cross-device compatibility, and transforming designs into modern web products.',

    // Contact Info
    'Quê quán: Châu Phú, An Giang':'Hometown: Chau Phu, An Giang',
    'TP. Hồ Chí Minh, Việt Nam':'Ho Chi Minh City, Vietnam',

    // Section Titles & Subtitles
    'Kỹ năng & công cụ':'Skills & tools',
    'Lọc theo nhóm để xem đúng thứ bạn quan tâm.':'Filter by group to see what matters to you.',
    'Tất cả':'All',
    'Core Tech':'Core Tech',
    'Công cụ & môi trường':'Tools & environment',
    'Kỹ năng mềm & kiểm thử':'Soft skills & testing',
    'Kỹ năng mềm':'Soft skills',
    'Làm việc nhóm, thuyết trình, quản lý thời gian':'Teamwork, presenting, time management',
    'Giao tiếp':'Communication',
    'Tự học':'Self-learning',
    'Quy trình kiểm thử':'Testing process',
    'Test case, kiểm thử thủ công, DevTools, kiểm tra responsive':'Test cases, manual testing, DevTools, responsive checks',

      // Projects
    'Dự án & sản phẩm':'Projects & products',
    'Các dự án cá nhân và học thuật được phát triển trong quá trình học tập cùng nhóm trong môi trường đại học.':'Personal and academic projects built during my studies, including teamwork at university.',
    'Vai trò: Thiết kế Frontend & lập trình':'Role: Frontend design & development',
    'Công cụ tải nhiều tệp, hỗ trợ xử lý các tác vụ tải xuống.':'A tool for downloading multiple files and handling download tasks.',
    'Dự án cá nhân':'Personal project',
    'Trang web cá nhân giới thiệu thông tin bản thân, kinh nghiệm và dự án.':'A personal website introducing myself, my experience and projects.',
    'Dự án học tập':'Academic project',
    'Dự án liên quan đến phát triển API bằng Flask.':'A project about building APIs with Flask.',
    'Đang phát triển':'In development',
    'Website trung tâm thú y, đang trong quá trình xây dựng và hoàn thiện.':'A veterinary center website, currently under development.',
    // Experience & Timeline
    'Kinh nghiệm & thành tựu':'Experience & achievements',
    'Hoạt động nhóm, nghiên cứu và đồ án đã hoàn thành.':'Teamwork, research and completed projects.',
    'Sẵn sàng học hỏi':'Ready to learn',
    'Tìm hiểu công nghệ mới.':'Exploring new tech.',
    'Design UI/UX':'UI/UX Design',
    'Thích biến ý tưởng thành sản phẩm.':'Love bringing ideas to life.',
    'CLB Lập trình – thành viên ban Truyền thông':'Programming Club – Media Team Member',
    'Thiết kế ấn phẩm, tổ chức workshop HTML/CSS cho 80 bạn sinh viên năm nhất.':'Designed media publications, organized HTML/CSS workshop for 80 freshman students.',
    'Giải Ba hội thi tin học trẻ':'3rd Prize Young Informatics Contest',
    'Nội dung lập trình C++.':'C++ programming category.',
    'Sinh viên năm 3':'3rd Year Student',
    'Tìm cơ hội Thực tập.':'Seeking Internship.',

    // Form & Footer
    'Có cơ hội thực tập hoặc muốn hợp tác? Gửi tin nhắn, tôi sẽ phản hồi trong 24 giờ.':'Have an internship opportunity or want to collaborate? Send a message and I will reply within 24 hours.',
    'Họ và tên':'Full name',
    'Nguyễn Văn A':'John Doe',
    'ban@email.com':'you@email.com',
    'Tin nhắn':'Message',
    'Bạn muốn trao đổi điều gì?':'What would you like to discuss?',
    'Gửi tin nhắn':'Send message',
    '© 2026 Nguyễn Phạm Y Huỳnh. Thiết kế và code bằng HTML, CSS, JavaScript thuần.':'© 2026 Nguyen Pham Y Huynh. Designed and coded with plain HTML, CSS and JavaScript.',

    // Additional translations for the marquee info bar
    'Sở thích':'Interests',
    'Tìm hiểu công nghệ mới':'Exploring new technologies',
    'Thích biến ý tưởng thành sản phẩm':'Love turning ideas into products',
    'CLB Lập trình':'Programming Club',
    'Ban Truyền thông & Workshop HTML/CSS':'Media Team & HTML/CSS Workshop',
    'Giải Ba Tin học trẻ':'Third Prize in the Young Informatics Contest',
    'Nội dung C++':'C++ Programming',
    'Hiện tại':'Currently',
    'Tìm cơ hội Thực tập':'Seeking an internship'
  };

  function applyLanguage(l) {
    // Dynamically scan all text each time the language switch is triggered
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const n = walker.currentNode;

      if (!n.parentElement || n.parentElement.closest('script,style,#c,.wave')) continue;

      const val = n.nodeValue.trim().replace(/\s+/g, ' ');

      if (l === 'en') {
        if (EN[val]) {
          n._vi = n.nodeValue;
          n.nodeValue = n.nodeValue.replace(val, EN[val]);
        }
      } else {
        if (n._vi) n.nodeValue = n._vi;
      }
    }

    document.querySelectorAll('[placeholder],[aria-label]').forEach(el => {
      ['placeholder', 'aria-label'].forEach(a => {
        const v = el.getAttribute(a);

        if (v) {
          if (l === 'en' && EN[v]) {
            el.setAttribute('_vi_' + a, v);
            el.setAttribute(a, EN[v]);
          } else if (l === 'vi' && el.getAttribute('_vi_' + a)) {
            el.setAttribute(a, el.getAttribute('_vi_' + a));
          }
        }
      });
    });
  }

  const themeBtn = document.getElementById('theme-btn');
  const langBtn = document.getElementById('lang-btn');
  const langBox = document.getElementById('lang');
  const langList = langBox.querySelector('.lang-list');
  const langName = document.getElementById('lang-name');

  function setTheme(t) {
    root.dataset.theme = t;
    themeBtn.textContent = t === 'light' ? '🌙' : '☀️';

    themeBtn.setAttribute(
      'aria-label',
      t === 'light'
        ? tr('Chuyển sang giao diện tối', 'Switch to dark mode')
        : tr('Chuyển sang giao diện sáng', 'Switch to light mode')
    );

    save('pf-theme', t);
  }
    /* Country flags (SVG) */
  const FLAGS = {
    vi: '<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#da251d"/><polygon fill="#ffff00" points="15,4 16.35,8.14 20.71,8.15 17.19,10.71 18.53,14.85 15,12.3 11.47,14.85 12.81,10.71 9.29,8.15 13.65,8.14"/></svg>',
    en: '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0L0 40" stroke="#c8102e" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/><path d="M30 0v40M0 20h60" stroke="#c8102e" stroke-width="8"/></svg>'
  };

  // Flags inside the dropdown list (render once)
  document.querySelectorAll('[data-flag]').forEach(el => {
    el.innerHTML = FLAGS[el.dataset.flag];
  });

  function setLang(l) {
    root.lang = l;    applyLanguage(l);

    langName.textContent = l === 'en' ? 'English' : 'Tiếng Việt';
    document.getElementById('lang-flag').innerHTML = FLAGS[l];

    langBtn.setAttribute('aria-label', tr('Chọn ngôn ngữ', 'Select language'));

    langList.querySelectorAll('[data-lang]').forEach(li => {
      li.setAttribute('aria-selected', li.dataset.lang === l);
    });

    save('pf-lang', l);

    // Notify dependent components to refresh their language-dependent content
    document.dispatchEvent(new Event('langchange'));
  }

  themeBtn.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  });

  const toggleList = open => {
    langList.hidden = !open;
    langBtn.setAttribute('aria-expanded', open);
  };

  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    toggleList(langList.hidden);
  });

  langList.querySelectorAll('[data-lang]').forEach(li => {
    const pick = () => {
      setLang(li.dataset.lang);
      toggleList(false);
      langBtn.focus();
    };

    li.addEventListener('click', pick);

    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        pick();
      }
    });
  });

  document.addEventListener('click', e => {
    if (!langBox.contains(e.target)) toggleList(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleList(false);
  });

  setTheme(load('pf-theme') === 'light' ? 'light' : 'dark');
  setLang(load('pf-lang') === 'en' ? 'en' : 'vi');


  /* 1. 3D tilt on mouse movement + reflective highlight */
  const heroCards = document.querySelectorAll('.hero-card, .hero-container .avatar');
  const filter = document.getElementById('liquid');
  const feImg = document.getElementById('dispMap');

  function buildLiquidMap() {
    const target = heroCards[0];
    if (!target) return;

    const w = Math.round(target.offsetWidth);
    const h = Math.round(target.offsetHeight);

    if (!w || !h) return;

    const R = 26, bezel = 40;

    const cv = document.createElement('canvas');
    cv.width = w;
    cv.height = h;

    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(w, h);
    const d = img.data;

    const hx = w / 2, hy = h / 2;
    const bx = hx - R, by = hy - R;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const px = x + .5 - hx;
        const py = y + .5 - hy;

        const qx = Math.abs(px) - bx;
        const qy = Math.abs(py) - by;

        const ox = Math.max(qx, 0);
        const oy = Math.max(qy, 0);
        const len = Math.hypot(ox, oy);

        const sd = len + Math.min(Math.max(qx, qy), 0) - R;
        const dist = -sd;

        let r = 128, gch = 128;

        if (dist < bezel) {
          let nx, ny;

          if (qx > 0 && qy > 0) {
            nx = Math.sign(px) * ox / len;
            ny = Math.sign(py) * oy / len;
          } else if (qx > qy) {
            nx = Math.sign(px);
            ny = 0;
          } else {
            nx = 0;
            ny = Math.sign(py);
          }

          const t = Math.max(dist, 0) / bezel;
          const m = Math.pow(1 - t, 2.2);

          r = 128 - nx * m * 127;
          gch = 128 - ny * m * 127;
        }

        const i = (y * w + x) * 4;

        d[i] = r;
        d[i + 1] = gch;
        d[i + 2] = 128;
        d[i + 3] = 255;
      }
    }

    ctx.putImageData(img, 0, 0);

    if (filter && feImg) {
      filter.setAttribute('width', w);
      filter.setAttribute('height', h);

      feImg.setAttribute('width', w);
      feImg.setAttribute('height', h);

      const url = cv.toDataURL();
      feImg.setAttribute('href', url);
    }
  }

  buildLiquidMap();

  if (heroCards[0]) {
    new ResizeObserver(buildLiquidMap).observe(heroCards[0]);
  }

  // Independent 3D tilt on mouse movement for both hero cards
  document.addEventListener('mousemove', e => {
    heroCards.forEach(card => {
      const r = card.getBoundingClientRect();

      const rx = ((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * -8;
      const ry = ((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;

      card.style.setProperty('--lx', (((e.clientX - r.left) / r.width) * 100) + '%');
      card.style.setProperty('--ly', (((e.clientY - r.top) / r.height) * 100) + '%');

      const nx = ry / 8;
      const ny = -rx / 8;

      card.style.setProperty('--sx', (-nx * 14) + 'px');
      card.style.setProperty('--sy', (-ny * 12) + 'px');
    });
  });

  document.addEventListener('mouseleave', () => {
    heroCards.forEach(card => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.setProperty('--sx', '0px');
      card.style.setProperty('--sy', '0px');
    });
  });


  /* 2. Menu mobile */
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');

  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  menu.addEventListener('click', e => {
    if (e.target.tagName === 'A') menu.classList.remove('open');
  });


  /* 3. Highlight the active menu item */
  const links = [...document.querySelectorAll('.menu a')];

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(a => {
          a.classList.toggle(
            'active',
            a.getAttribute('href') === '#' + en.target.id
          );
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section').forEach(s => io.observe(s));


  /* 4. Skills & Projects filters */
  document.querySelectorAll('[data-filter]').forEach(bar => {
    const grid = document.getElementById(bar.dataset.filter + '-grid');

    bar.addEventListener('click', e => {
      const btn = e.target.closest('.tab');
      if (!btn) return;

      bar.querySelectorAll('.tab').forEach(b => {
        b.classList.toggle('on', b === btn);
      });

      grid.querySelectorAll('[data-cat]').forEach(c => {
        c.classList.toggle(
          'hide',
          btn.dataset.f !== 'all' && c.dataset.cat !== btn.dataset.f
        );
      });
    });
  });


  /* 5. Animated skill bars when they enter view */
  const bio = new IntersectionObserver(es => {
    es.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.width = en.target.dataset.w + '%';
        bio.unobserve(en.target);
      }
    });
  }, { threshold: .4 });

  document.querySelectorAll('.bar i').forEach(b => bio.observe(b));


  /* 7. Contact form */
  const form = document.getElementById('contact-form');
  const status = form.querySelector('.status');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const d = new FormData(form);
    const name = d.get('name').trim();
    const email = d.get('email').trim();
    const msg = d.get('msg').trim();

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
      status.textContent = tr(
        'Vui lòng nhập đủ họ tên, email hợp lệ và tin nhắn.',
        'Please enter your name, a valid email and a message.'
      );
      return;
    }

    status.textContent = tr(
      'Đang mở ứng dụng email để gửi tin nhắn…',
      'Opening your email app to send the message…'
    );

    location.href = `mailto:minhanh@example.com?subject=${encodeURIComponent(
      tr('Liên hệ từ ', 'Message from ') + name
    )}&body=${encodeURIComponent(msg + '\n\n' + name + ' – ' + email)}`;

    form.reset();
  });
})();

/* ===== 6. 3D WHALE EFFECT SCRIPT (RUNS ONLY ON THE HOME SECTION) ===== */
  const cv = document.getElementById('c');
  const ctx = cv.getContext('2d');

  let W, H, dpr, S, stars = [];

  const P = [], NODES = [], EDGES = [];

  const mouse = {
    x: -9999,
    y: -9999,
    down: false,
    burst: 0,
    r: 100
  };

  let userYaw = 0;
  let userPitch = 0.12;
  let lastX = 0;
  let lastY = 0;
  let velYaw = 0;

  function norm(v) {
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  }

  function add(x, y, z, n, ad, b, s, opt) {
    const p = Object.assign({
      x, y, z,
      nx: n[0], ny: n[1], nz: n[2],
      ar: ad[0], ag: ad[1], ab: ad[2],
      b, s,
      ox: 0, oy: 0,
      vx: 0, vy: 0,
      back: true,
      dim: 1,
      node: false,
      sx: 0, sy: 0
    }, opt || {});

    p.u = Math.min(1, Math.max(0, (x + 2) / 3.6));

    P.push(p);

    if (p.node) NODES.push(p);
  }

  function C(t) {
    return [-2 + 3.6 * t, .3 - .85 * Math.pow(t, 2.2)];
  }

  function Rad(t) {
    if (t < .3) {
      const k = (.3 - t) / .3;
      return .55 * Math.sqrt(Math.max(0, 1 - k * k));
    }

    return .55 * Math.pow(1 - (t - .3) / .7, 1.3) + .04 * (1 - t);
  }

  function surf(t, phi, k) {
    const c = C(t);
    const r = Rad(t) * (k || 1);

    return [
      c[0],
      c[1] + r * .88 * Math.cos(phi),
      r * Math.sin(phi)
    ];
  }

  function tri(a, b, c, count, n, ad, nodeProb) {
    for (let i = 0; i < count; i++) {
      let u = Math.random();
      let v = Math.random();

      if (u + v > 1) {
        u = 1 - u;
        v = 1 - v;
      }

      const isN = Math.random() < nodeProb;

      add(
        a[0] + u * (b[0] - a[0]) + v * (c[0] - a[0]),
        a[1] + u * (b[1] - a[1]) + v * (c[1] - a[1]),
        a[2] + u * (b[2] - a[2]) + v * (c[2] - a[2]) + (Math.random() - .5) * .03,
        n,
        ad,
        isN ? 1.5 : .6 + Math.random() * .6,
        isN ? 2.8 + Math.random() * 1.2 : 1 + Math.random() * .9,
        { back: false, two: true, node: isN }
      );
    }
  }

  function buildModel() {
    P.length = 0;
    NODES.length = 0;
    EDGES.length = 0;

    let n = 0;

    while (n < 4600) {
      const t = Math.random();
      const phi = Math.random() * Math.PI * 2;

      if (Math.random() > (Rad(t) + .05) / .6) continue;

      const p = surf(t, phi);
      const belly = Math.cos(phi) > .35;
      const isN = Math.random() < .075;

      add(
        p[0], p[1], p[2],
        norm([0, Math.cos(phi), Math.sin(phi)]),
        belly ? [30, 75, 90] : [0, 0, 0],
        isN ? 1.5 : .55 + Math.random() * .6,
        isN ? 2.8 + Math.random() * 1.2 : 1 + Math.random() * .9,
        { node: isN }
      );

      n++;
    }

    for (let i = 0; i < 600; i++) {
      const t = Math.random();
      const phi = Math.random() * 6.283;
      const k = Math.cbrt(Math.random()) * .85;
      const p = surf(t, phi, k);

      add(
        p[0], p[1], p[2],
        norm([0, Math.cos(phi), Math.sin(phi)]),
        [0, 0, 0],
        .5 + Math.random() * .4,
        1 + Math.random() * .6,
        { dim: .35 }
      );
    }

    for (const phi of [-.9, -.6, -.3, 0, .3, .6, .9]) {
      for (let i = 0; i < 100; i++) {
        const t = .08 + Math.random() * .47;
        const p = surf(t, phi, 1.02);

        add(
          p[0], p[1], p[2],
          norm([0, Math.cos(phi), Math.sin(phi)]),
          [40, 95, 115],
          1.1,
          1 + Math.random() * .8,
          { back: false }
        );
      }
    }

    for (const s of [1, -1]) {
      const phi = s * 1.2;

      for (let i = 0; i < 220; i++) {
        const t = .02 + Math.random() * .26;
        const p = surf(t, phi, 1.03);

        add(
          p[0], p[1], p[2],
          norm([0, Math.cos(phi), Math.sin(phi)]),
          [70, 140, 170],
          1.2,
          1 + Math.random() * .8,
          { back: false }
        );
      }

      for (let i = 0; i < 25; i++) {
        const p = surf(.2, s * 1.5, 1.04);

        add(
          p[0] + (Math.random() - .5) * .05,
          p[1] - .12 + (Math.random() - .5) * .05,
          p[2] + (Math.random() - .5) * .03,
          [0, 0, s],
          [150, 190, 220],
          1.4,
          1.6,
          { back: false }
        );
      }
    }

    for (const s of [1, -1]) {
      tri(
        [-1.05, .35, s * .5],
        [-.55, .4, s * .5],
        [-.4, .85, s * 1.1],
        450,
        [0, .5, s * .85],
        [0, 20, 50],
        .04
      );

      tri(
        [1.45, -.55, 0],
        [1.85, -.55, 0],
        [2.05, -.7, s * .9],
        450,
        [0, 1, 0],
        [0, 20, 50],
        .05
      );
    }

    for (let i = 0; i < 350; i++) {
      add(
        -.6 + Math.random() * 2.8,
        -1 + Math.random() * 1.8,
        (Math.random() - .5) * 2.4,
        norm([
          Math.random() - .5,
          Math.random() - .5,
          Math.random() - .5
        ]),
        [25, 65, 110],
        .5 + Math.random() * .7,
        .8 + Math.random() * .9,
        { back: false }
      );
    }

    const seen = new Set();

    NODES.forEach((a, i) => {
      NODES
        .map((b, j) => [
          j,
          Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
        ])
        .filter(d => d[0] !== i && d[1] < .5)
        .sort((p, q) => p[1] - q[1])
        .slice(0, 3)
        .forEach(d => {
          const k = i < d[0] ? i + '-' + d[0] : d[0] + '-' + i;

          if (!seen.has(k)) {
            seen.add(k);
            EDGES.push([a, NODES[d[0]]]);
          }
        });
    });
  }

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);

    const heroSec = document.getElementById('home');

    W = heroSec.clientWidth;
    H = heroSec.clientHeight;

    cv.width = W * dpr;
    cv.height = H * dpr;

    S = Math.min(W * .30, H * .40);

    stars = Array.from({ length: 110 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      s: Math.random() * 1.4 + .3,
      p: Math.random() * 6
    }));
  }

  function mul(a, b) {
    const r = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        r[i][j] =
          a[i][0] * b[0][j] +
          a[i][1] * b[1][j] +
          a[i][2] * b[2][j];
      }
    }

    return r;
  }

  function rot(yaw, pitch, roll) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw);
    const cx = Math.cos(pitch), sx = Math.sin(pitch);
    const cz = Math.cos(roll), sz = Math.sin(roll);

    return mul(
      mul(
        [[cy, 0, sy], [0, 1, 0], [-sy, 0, cy]],
        [[1, 0, 0], [0, cx, -sx], [0, sx, cx]]
      ),
      [[cz, -sz, 0], [sz, cz, 0], [0, 0, 1]]
    );
  }

  const LW = norm([-.7, -.4, .6]);
  const LC = norm([.8, .1, .5]);

  function frame(t) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#040a16';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#bfe0ff';

    for (const s of stars) {
      ctx.globalAlpha = .2 + .45 * Math.abs(Math.sin(t / 1300 + s.p));
      ctx.fillRect(s.x, s.y, s.s, s.s);
    }

    ctx.globalAlpha = 1;

    if (!mouse.down) {
      userYaw += (0 - userYaw) * 0.05;
      userPitch += (0.12 - userPitch) * 0.05;
    }

    const yaw = userYaw + Math.sin(t / 6000) * 0.08;
    const pitch = userPitch + Math.cos(t / 5000) * 0.03;

    const m = rot(yaw, pitch, -.1);
    const sway = .08 * Math.sin(t / 800);

    const cx = W / 2;
    const cy = H / 2;
    const R = mouse.r + mouse.burst * 55;
    const force = 2 * (1 + mouse.burst * 3.5);

    mouse.burst *= .9;

    ctx.globalCompositeOperation = 'lighter';

    for (const p of P) {
      const py = p.y + sway * p.u * p.u;

      const X = m[0][0] * p.x + m[0][1] * py + m[0][2] * p.z;
      const Y = m[1][0] * p.x + m[1][1] * py + m[1][2] * p.z;
      const Z = m[2][0] * p.x + m[2][1] * py + m[2][2] * p.z;

      const nx = m[0][0] * p.nx + m[0][1] * p.ny + m[0][2] * p.nz;
      const ny = m[1][0] * p.nx + m[1][1] * p.ny + m[1][2] * p.nz;
      const nz = m[2][0] * p.nx + m[2][1] * p.ny + m[2][2] * p.nz;

      const f = 4 / (4 - Z);
      const sx = cx + X * f * S + p.ox;
      const sy = cy + Y * f * S + p.oy;

      p.sx = sx;
      p.sy = sy;

      p.vx -= p.ox * .06;
      p.vy -= p.oy * .06;

      const dx = sx - mouse.x;
      const dy = sy - mouse.y;
      const d2 = dx * dx + dy * dy;

      if (d2 < R * R) {
        const d = Math.sqrt(d2) || 1;
        const k = Math.pow(1 - d / R, 2) * force;

        p.vx += dx / d * k;
        p.vy += dy / d * k;
      }

      p.vx *= .86;
      p.vy *= .86;

      p.ox += p.vx;
      p.oy += p.vy;

      let dw = nx * LW[0] + ny * LW[1] + nz * LW[2];
      let dc = nx * LC[0] + ny * LC[1] + nz * LC[2];

      if (p.two) {
        dw = Math.abs(dw);
        dc = Math.abs(dc);
      } else {
        dw = Math.max(0, dw);
        dc = Math.max(0, dc);
      }

      let br = p.b * p.dim * (.55 + .45 * Math.min(1, Math.max(0, (Z + 2) / 4)));

      if (p.back && nz < 0) br *= .5;

      const r = Math.min(255, ((140 * dw + 40 * dc + 6) * br + p.ar * .8) * .85);
      const g = Math.min(255, ((225 * dw + 110 * dc + 22) * br + p.ag * .8) * .85);
      const b = Math.min(255, ((255 * dw + 255 * dc + 50) * br + p.ab * .8) * .85);

      const sz = p.s * f * .95;

      ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
      ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz);

      if (p.node) {
        ctx.globalAlpha = .16;
        ctx.fillRect(sx - sz * 1.6, sy - sz * 1.6, sz * 3.2, sz * 3.2);
        ctx.globalAlpha = 1;
      }
    }

    ctx.strokeStyle = 'rgba(110,190,255,.2)';
    ctx.lineWidth = .8;
    ctx.beginPath();

    for (const e of EDGES) {
      ctx.moveTo(e[0].sx, e[0].sy);
      ctx.lineTo(e[1].sx, e[1].sy);
    }

    ctx.stroke();

    ctx.globalCompositeOperation = 'source-over';

    if (mouse.x > -999) {
      ctx.strokeStyle = 'rgba(207,230,255,.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    requestAnimationFrame(frame);
  }

  cv.addEventListener('pointerdown', e => {
    const rect = cv.getBoundingClientRect();

    mouse.x = lastX = e.clientX - rect.left;
    mouse.y = lastY = e.clientY - rect.top;

    mouse.down = true;
    mouse.burst = 1;
  });

  addEventListener('pointerup', () => {
    mouse.down = false;
  });

  cv.addEventListener('pointerleave', () => {
    mouse.x = mouse.y = -9999;
    mouse.down = false;
  });

  addEventListener('resize', resize);

  buildModel();
  resize();
  requestAnimationFrame(frame);
cv.addEventListener('pointermove', e => {
  const rect = cv.getBoundingClientRect();

  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
  /* Click highlight effect for the looping language tags (Marquee) */
  const marqueeItems = document.querySelectorAll('.marquee-item');

  marqueeItems.forEach(item => {
    item.addEventListener('click', () => {
      // Click a tag to highlight it and automatically clear the others
      marqueeItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });


 (() => {
  /* 6. Create the horizontal info marquee */
  const singleList = [
    { period: '2026', title: 'Sẵn sàng học hỏi', place: 'Tìm hiểu công nghệ mới' },
    { period: 'Sở thích', title: 'Design UI/UX', place: 'Thích biến ý tưởng thành sản phẩm' },
    { period: '2024', title: 'CLB Lập trình', place: 'Ban Truyền thông & Workshop HTML/CSS' },
    { period: '2025', title: 'Giải Ba Tin học trẻ', place: 'Nội dung C++' },
    { period: 'Hiện tại', title: 'Sinh viên năm 3', place: 'Tìm cơ hội Thực tập' }
  ];

  const sepSVG = '<svg class="sep" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>';
const marqueeEN = {
  'Sẵn sàng học hỏi': 'Ready to learn',
  'Tìm hiểu công nghệ mới': 'Exploring new technologies',
  'Sở thích': 'Interests',
  'Design UI/UX': 'UI/UX Design',
  'Thích biến ý tưởng thành sản phẩm': 'Love turning ideas into products',
  'CLB Lập trình': 'Programming Club',
  'Ban Truyền thông & Workshop HTML/CSS': 'Media Team & HTML/CSS Workshop',
  'Giải Ba Tin học trẻ': 'Third Prize in the Young Informatics Contest',
  'Nội dung C++': 'C++ Programming',
  'Hiện tại': 'Currently',
  'Sinh viên năm 3': '3rd Year Student',
  'Tìm cơ hội Thực tập': 'Seeking an internship'
};

const marqueeTr = text =>
  document.documentElement.lang === 'en'
    ? (marqueeEN[text] || text)
    : text;
  function buildMarquee(el, list, pxPerSec) {
    if (!el) return;

    const track = el.firstElementChild;
    if (!track) return;

    const html = list.map(i =>
      `<div class="item">
      <span class="period">${marqueeTr(i.period)}</span>
      <span class="title">${marqueeTr(i.title)}</span>
      <span class="place">${marqueeTr(i.place)}</span>
      </div>${sepSVG}`
    ).join('');

    // Keep the track structure so CSS can continue the scrolling animation
    track.innerHTML =
      `<div class="set" style="display:flex">${html}</div>` +
      `<div class="set" style="display:flex" aria-hidden="true">${html}</div>`;

    const set = track.firstElementChild;
    let guard = 0;

    while (
      set &&
      set.offsetWidth * (track.children.length / 2) < window.innerWidth * 1.2 &&
      guard++ < 6
    ) {
      track.insertAdjacentHTML(
        'afterbegin',
        `<div class="set" style="display:flex" aria-hidden="true">${html}</div>`
      );

      track.insertAdjacentHTML(
        'beforeend',
        `<div class="set" style="display:flex" aria-hidden="true">${html}</div>`
      );
    }

    const half = track.scrollWidth / 2;
    el.style.setProperty('--dur', (half / pxPerSec) + 's');
  }

  function initMarquee() {
    buildMarquee(
      document.getElementById('marquee-single'),
      singleList,
      60
    );
  }

  // Initialize the scrolling bar after the DOM and fonts are ready
  function startMarquee() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(initMarquee);
    } else {
      initMarquee();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startMarquee, { once: true });
  } else {
    startMarquee();
  }

  // Refresh content when the language changes
  document.addEventListener('langchange', initMarquee);

  // Fade-out effect when scrolling away from the home section
  const marqueeWrapper = document.getElementById('hero-marquee');
  const homeSection = document.getElementById('home');

  if (marqueeWrapper && homeSection) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          marqueeWrapper.classList.remove('fade-out', 'paused');
        } else {
          marqueeWrapper.classList.add('fade-out', 'paused');
        }
      });
    }, { threshold: 0.3 });

    observer.observe(homeSection);
  }
})();
/* ===== PROJECTS: 3D CAROUSEL (drag/swipe) ===== */
(() => {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('.card')];
  const countEl = document.getElementById('car-count');
  const tabs = document.querySelector('[data-filter="projects"]');

  let pos = 0, target = 0, raf = null;           // pos = current position (float), target = destination card
  let dragging = false, moved = false;
  let startX = 0, startPos = 0, lastX = 0, lastT = 0, vel = 0;

  const visible = () => cards.filter(c => !c.classList.contains('hide'));
  const maxIdx  = () => Math.max(0, visible().length - 1);
  const stepPx  = () => (grid.clientWidth < 700 ? 170 : 290);
  const clamp   = v => Math.max(0, Math.min(v, maxIdx()));

  function render() {
    const list = visible();
    const step = stepPx();

    list.forEach((c, i) => {
      const o = i - pos;
      const a = Math.abs(o);
      const angle = -Math.sign(o) * Math.min(a, 1) * 38;
      const z = -Math.min(a, 2) * 140;
      const op = a <= 1 ? 1 - a * .15 : Math.max(0, .85 - (a - 1) * .45);

      c.style.setProperty(
        'transform',
        `translateX(${o * step}px) translateZ(${z}px) rotateY(${angle}deg)`,
        'important'
      );
      c.style.opacity = op;
      c.style.filter = `brightness(${1 - Math.min(a, 1) * .45})`;
      c.style.zIndex = Math.round(100 - a * 10);
      c.style.visibility = a > 2.5 ? 'hidden' : 'visible';
      c.classList.toggle('is-active', a < .5);
    });

    if (countEl) countEl.textContent = (Math.round(clamp(pos)) + 1) + ' / ' + list.length;
  }

  function animate() {
    cancelAnimationFrame(raf);
    const tick = () => {
      pos += (target - pos) * .14;
      if (Math.abs(target - pos) < .002) { pos = target; render(); raf = null; return; }
      render();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  const go   = i => { target = clamp(Math.round(i)); animate(); };
  const next = () => go(target + 1);
  const prev = () => go(target - 1);

  document.getElementById('car-next')?.addEventListener('click', next);
  document.getElementById('car-prev')?.addEventListener('click', prev);

  grid.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
  });

  /* ---- Drag/swipe: cards follow the pointer ---- */
  grid.addEventListener('dragstart', e => e.preventDefault());

  grid.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    moved = false;
    startX = lastX = e.clientX;
    startPos = pos;
    vel = 0;
    lastT = performance.now();
    cancelAnimationFrame(raf);
  });

  addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;

    if (!moved) {
      if (Math.abs(dx) < 6) return;
      moved = true;
      grid.classList.add('dragging');
    }

    const step = stepPx();
    const now = performance.now();
    const dt = Math.max(1, now - lastT);
    vel = vel * .8 + ((lastX - e.clientX) / step / dt) * .2;   // unit: cards / ms
    lastX = e.clientX;
    lastT = now;

    let p = startPos - dx / step;
    const max = maxIdx();
    if (p < 0)   p = p * .35;                  // spring-back at the start
    if (p > max) p = max + (p - max) * .35;    // spring-back at the end
    pos = p;
    render();
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    grid.classList.remove('dragging');
    if (!moved) return;

    // inertia: faster swipes travel further (up to 2 cards)
    const boost = Math.max(-2, Math.min(2, vel * 250));
    go(pos + boost);
    setTimeout(() => { moved = false; }, 50);
  }
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', endDrag);

  /* ---- Touchpad / mouse horizontal scroll ---- */
  let wheelT;
  grid.addEventListener('wheel', e => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;   // let vertical scrolling behave normally
    e.preventDefault();
    cancelAnimationFrame(raf);
    pos = Math.max(-.3, Math.min(pos + e.deltaX / (stepPx() * 1.2), maxIdx() + .3));
    render();
    clearTimeout(wheelT);
    wheelT = setTimeout(() => go(pos), 120);
  }, { passive: false });

  /* ---- Click adjacent card -> bring it to center; ignore accidental taps right after dragging ---- */
  grid.addEventListener('click', e => {
    if (moved) { e.preventDefault(); e.stopPropagation(); return; }
    const card = e.target.closest('.card');
    if (!card || card.classList.contains('is-active')) return;
    e.preventDefault();
    e.stopPropagation();
    go(visible().indexOf(card));
  }, true);

  /* ---- Change the filter tab -> return to the first card ---- */
  tabs?.addEventListener('click', () => {
    requestAnimationFrame(() => { pos = target = 0; render(); });
  });

  addEventListener('resize', render);
  render();
})();
/* ===== TIMELINE: fade in + progress line tied to scroll ===== */
(() => {
  const tl = document.querySelector('.timeline');
  if (!tl) return;

  const items = [...tl.querySelectorAll('.tl')];
  items.forEach(el => el.classList.add('rv'));   // add the class via JS: without JS, the cards remain visible by default

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.style.setProperty('--d', (items.indexOf(en.target) % 3) * 0.12 + 's');
      en.target.classList.add('in');
      io.unobserve(en.target);
    });
  }, { threshold: .2 });
  items.forEach(el => io.observe(el));

  const update = () => {
    const r = tl.getBoundingClientRect();
    const p = (innerHeight * .65 - r.top) / r.height;
    tl.style.setProperty('--p', Math.max(0, Math.min(1, p)));
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
})();
