/**
 * NEXUS-06 // NEO-FUTURISTIC DIGITAL SYSTEM ENGINE
 * Architecture: Clean Vanilla ES6+ & Web Audio API
 * React Bits Integrated: SplitText • AnimatedContent • Magnet
 */

// -------------------------------------------------------------
// 1. REPOSITORY SOURCE OF TRUTH (6 VERIFIED MEMBERS)
// -------------------------------------------------------------
const NEXUS_MEMBERS_DATA = [
  {
    id: 1,
    slug: 'le-nguyen-nhat-truong',
    fullName: 'Lê Nguyễn Nhật Trường',
    displayName: 'Trường',
    symbol: 'Tr',
    port: 'PORT_01',
    rank: 'NODE 01 // HOST VERIFIED',
    focus: 'Software Engineer Trainee, thiên về Backend; mục tiêu thực tập SE Intern 2026.',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Java', 'Mạng', 'C/C++', 'CSDL', 'Backend'],
    strengthsMatrix: [
      { label: 'Java', val: 90 },
      { label: 'Mạng', val: 85 },
      { label: 'C/C++', val: 80 },
      { label: 'CSDL', val: 88 }
    ],
    github: 'https://github.com/lenguyennhattruongg',
    githubHandle: '@lenguyennhattruongg',
    portfolioUrl: './members/le-nguyen-nhat-truong/index.html',
    avatarUrl: './members/le-nguyen-nhat-truong/images/avatar.png',
    hasRealAvatar: true,
    isLinked: true,
    frequency: 440.0, // A4 harmonic
    statusText: 'PORT_01 · 440.0MHz'
  },
  {
    id: 2,
    slug: 'nguyen-xuan-hieu',
    fullName: 'Nguyễn Xuân Hiếu',
    displayName: 'Hiếu',
    symbol: 'Hi',
    port: 'PORT_02',
    rank: 'NODE 02 // FOUNDATION',
    focus: 'Full-Stack Web Developer & Network Administrator. Khung sẵn sàng cho Phase 3.',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Full-Stack', 'Network', 'HTML/CSS', 'Web'],
    strengthsMatrix: [
      { label: 'Full-Stack', val: 85 },
      { label: 'Network', val: 88 },
      { label: 'HTML/CSS', val: 90 }
    ],
    github: 'https://github.com/nguyenxuanhieu2903',
    githubHandle: '@nguyenxuanhieu2903',
    portfolioUrl: './members/nguyen-xuan-hieu/index.html',
    avatarUrl: '',
    hasRealAvatar: false,
    isLinked: true,
    frequency: 523.25, // C5 harmonic
    statusText: 'PORT_02 · 523.2MHz'
  },
  {
    id: 3,
    slug: 'le-huu-chau',
    fullName: 'Lê Hữu Châu',
    displayName: 'Châu',
    symbol: 'Ch',
    port: 'PORT_03',
    rank: 'NODE 03 // STANDBY',
    focus: 'Portfolio Foundation sẵn sàng tích hợp đồng bộ trong giai đoạn Phase 3.',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Web Foundation', 'Frontend'],
    strengthsMatrix: [
      { label: 'HTML/CSS', val: 80 },
      { label: 'Frontend', val: 78 }
    ],
    github: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
    githubHandle: 'Group Contributor',
    portfolioUrl: './members/le-huu-chau/index.html',
    avatarUrl: '',
    hasRealAvatar: false,
    isLinked: false,
    frequency: 659.25, // E5 harmonic
    statusText: 'PORT_03 · 659.2MHz'
  },
  {
    id: 4,
    slug: 'nguyen-anh-thu',
    fullName: 'Nguyễn Anh Thư',
    displayName: 'Thư',
    symbol: 'Th',
    port: 'PORT_04',
    rank: 'NODE 04 // STANDBY',
    focus: 'Khung giao diện sẵn sàng tích hợp đồng bộ trong giai đoạn Phase 3.',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Web Foundation', 'UI Design', 'Frontend'],
    strengthsMatrix: [
      { label: 'UI Design', val: 82 },
      { label: 'Web', val: 80 }
    ],
    github: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
    githubHandle: 'Group Contributor',
    portfolioUrl: './members/nguyen-anh-thu/index.html',
    avatarUrl: '',
    hasRealAvatar: false,
    isLinked: false,
    frequency: 783.99, // G5 harmonic
    statusText: 'PORT_04 · 784.0MHz'
  },
  {
    id: 5,
    slug: 'nguyen-pham-y-huynh',
    fullName: 'Nguyễn Phạm Ý Huỳnh',
    displayName: 'Huỳnh',
    symbol: 'Hy',
    port: 'PORT_05',
    rank: 'NODE 05 // STANDBY',
    focus: 'Cấu trúc logic module sẵn sàng tích hợp đồng bộ trong giai đoạn Phase 3.',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Web Foundation', 'Logic Modules'],
    strengthsMatrix: [
      { label: 'Logic', val: 80 },
      { label: 'Web', val: 78 }
    ],
    github: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
    githubHandle: 'Group Contributor',
    portfolioUrl: './members/nguyen-pham-y-huynh/index.html',
    avatarUrl: '',
    hasRealAvatar: false,
    isLinked: false,
    frequency: 880.0, // A5 harmonic
    statusText: 'PORT_05 · 880.0MHz'
  },
  {
    id: 6,
    slug: 'nguyen-thi-thao-nhu',
    fullName: 'Nguyễn Thị Thảo Như',
    displayName: 'Như',
    symbol: 'Nh',
    port: 'PORT_06',
    rank: 'NODE 06 // STANDBY',
    focus: 'Thành phần truyền thông số sẵn sàng tích hợp đồng bộ trong giai đoạn Phase 3.',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Web Foundation', 'Creative Media'],
    strengthsMatrix: [
      { label: 'Media', val: 82 },
      { label: 'Web', val: 78 }
    ],
    github: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
    githubHandle: 'Group Contributor',
    portfolioUrl: './members/nguyen-thi-thao-nhu/index.html',
    avatarUrl: '',
    hasRealAvatar: false,
    isLinked: false,
    frequency: 987.77, // B5 harmonic
    statusText: 'PORT_06 · 987.8MHz'
  }
];

// -------------------------------------------------------------
// 2. GLOBAL SYSTEM STATE
// -------------------------------------------------------------
const SystemState = {
  activeNodeId: 1,
  audioEnabled: false,
  searchQuery: '',
  activeFilter: 'all',
  matchedNodeIds: [1, 2, 3, 4, 5, 6]
};

// -------------------------------------------------------------
// 3. UTILITY: COMPREHENSIVE VIETNAMESE NORMALIZATION
// -------------------------------------------------------------
function removeVietnameseTones(str) {
  if (!str) return '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Combine accents removal
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return str;
}

// -------------------------------------------------------------
// 4. WEB AUDIO API SYNTHESIZER (OPTIC FEEDBACK CHIRP)
// -------------------------------------------------------------
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playOpticChirp(freq = 440, duration = 0.08) {
  if (!SystemState.audioEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);
    
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.warn('Audio playback inhibited:', err);
  }
}

// -------------------------------------------------------------
// 5. REACT BITS INTEGRATION 1: SPLIT-TEXT COMPONENT
// -------------------------------------------------------------
function initReactBitsSplitText() {
  const headline = document.querySelector('[data-react-bits="split-text"]');
  if (!headline) return;

  const rawText = headline.innerText.trim();
  headline.innerHTML = '';
  
  // Split into words, then letters to maintain proper wrapping
  const words = rawText.split(' ');
  words.forEach((word, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';
    
    for (let char of word) {
      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    }
    
    headline.appendChild(wordSpan);
    if (wIdx < words.length - 1) {
      headline.appendChild(document.createTextNode(' '));
    }
  });
}

// -------------------------------------------------------------
// 6. REACT BITS INTEGRATION 2: MAGNET COMPONENT
// -------------------------------------------------------------
function initReactBitsMagnet() {
  const magnetButtons = document.querySelectorAll('[data-react-bits="magnet"]');
  
  // Check if reduced motion is requested
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  magnetButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - btnCenterX) * 0.28;
      const deltaY = (e.clientY - btnCenterY) * 0.28;
      
      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

// -------------------------------------------------------------
// 7. REACT BITS INTEGRATION 3: ANIMATED-CONTENT TRANSITIONS
// -------------------------------------------------------------
function triggerAnimatedContent(element) {
  if (!element) return;
  element.style.opacity = '0';
  element.style.transform = 'translateY(10px)';
  
  requestAnimationFrame(() => {
    element.style.transition = 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0px)';
  });
}

// -------------------------------------------------------------
// 8. CONSTELLATION NEXUS CANVAS (INTERACTIVE 6-NODE MESH)
// -------------------------------------------------------------
class ConstellationCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.mouse = { x: -1000, y: -1000, isHovering: false };
    this.animId = null;

    this.initNodes();
    this.bindEvents();
    this.resize();
    this.loop();
  }

  initNodes() {
    // 6 Orbital Nodes arranged harmoniously across 2D plane
    const basePositions = [
      { x: 0.16, y: 0.45, memberId: 1, label: 'Trường' },
      { x: 0.30, y: 0.70, memberId: 2, label: 'Hiếu' },
      { x: 0.48, y: 0.35, memberId: 3, label: 'Châu' },
      { x: 0.65, y: 0.65, memberId: 4, label: 'Thư' },
      { x: 0.78, y: 0.30, memberId: 5, label: 'Huỳnh' },
      { x: 0.90, y: 0.60, memberId: 6, label: 'Như' }
    ];

    this.nodes = basePositions.map((pos) => ({
      ...pos,
      cx: 0,
      cy: 0,
      currentX: 0,
      currentY: 0,
      vx: 0,
      vy: 0,
      radius: pos.memberId === 1 ? 14 : 11,
      pulse: Math.random() * Math.PI
    }));
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;

    // Recalculate target positions
    this.nodes.forEach((n) => {
      n.cx = n.x * this.width;
      n.cy = n.y * this.height;
      if (n.currentX === 0) {
        n.currentX = n.cx;
        n.currentY = n.cy;
      }
    });
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
      this.mouse.isHovering = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.isHovering = false;
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Detect node click
      for (let n of this.nodes) {
        const dist = Math.hypot(clickX - n.currentX, clickY - n.currentY);
        if (dist <= n.radius + 14) {
          syncActiveNode(n.memberId);
          break;
        }
      }
    });
  }

  loop() {
    this.update();
    this.render();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  update() {
    this.nodes.forEach((n) => {
      n.pulse += 0.04;

      // Spring physics to base center
      const dx = n.cx - n.currentX;
      const dy = n.cy - n.currentY;
      n.vx += dx * 0.05;
      n.vy += dy * 0.05;

      // Mouse repulsion
      if (this.mouse.isHovering) {
        const mdx = n.currentX - this.mouse.x;
        const mdy = n.currentY - this.mouse.y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < 100 && mdist > 0) {
          const force = (100 - mdist) / 100;
          n.vx += (mdx / mdist) * force * 3;
          n.vy += (mdy / mdist) * force * 3;
        }
      }

      // Damping
      n.vx *= 0.85;
      n.vy *= 0.85;

      n.currentX += n.vx;
      n.currentY += n.vy;
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw connection lines between nodes
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        const dist = Math.hypot(n1.currentX - n2.currentX, n1.currentY - n2.currentY);

        if (dist < 260) {
          const alpha = (1 - dist / 260) * 0.35;
          const isConnectedToActive = n1.memberId === SystemState.activeNodeId || n2.memberId === SystemState.activeNodeId;

          this.ctx.beginPath();
          this.ctx.moveTo(n1.currentX, n1.currentY);
          this.ctx.lineTo(n2.currentX, n2.currentY);
          
          if (isConnectedToActive) {
            this.ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 1.5})`;
            this.ctx.lineWidth = 1.6;
          } else {
            this.ctx.strokeStyle = `rgba(121, 40, 202, ${alpha})`;
            this.ctx.lineWidth = 1.0;
          }
          this.ctx.stroke();
        }
      }
    }

    // Draw each node
    this.nodes.forEach((n) => {
      const isActive = n.memberId === SystemState.activeNodeId;

      // Outer Pulse Ring for active node
      if (isActive) {
        const pulseR = n.radius + 8 + Math.sin(n.pulse) * 4;
        this.ctx.beginPath();
        this.ctx.arc(n.currentX, n.currentY, pulseR, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      }

      // Core Node Body
      this.ctx.beginPath();
      this.ctx.arc(n.currentX, n.currentY, n.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = isActive ? '#00F0FF' : '#0E1424';
      this.ctx.fill();
      this.ctx.strokeStyle = isActive ? '#FFFFFF' : '#7928CA';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      // Node Label
      this.ctx.font = `600 ${isActive ? '11px' : '10px'} "IBM Plex Mono", monospace`;
      this.ctx.fillStyle = isActive ? '#00F0FF' : '#8A99AD';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`N.0${n.memberId} ${n.label}`, n.currentX, n.currentY + n.radius + 16);
    });
  }
}

// -------------------------------------------------------------
// 9. OPTICAL SPECTRUM CANVAS (HARMONIC OSCILLOSCOPE)
// -------------------------------------------------------------
class OpticalSpectrumVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.phase = 0;
    this.animId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  }

  loop() {
    this.render();
    this.phase += 0.05;
    this.animId = requestAnimationFrame(() => this.loop());
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const activeMember = NEXUS_MEMBERS_DATA.find((m) => m.id === SystemState.activeNodeId) || NEXUS_MEMBERS_DATA[0];
    const baseFreq = (activeMember.frequency || 440) / 140;

    const midY = this.height / 2;
    const points = 120;
    const step = this.width / points;

    // Harmonic Wave 1 (Primary Cyan)
    this.ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const x = i * step;
      const angle = (i / points) * Math.PI * baseFreq + this.phase;
      const y = midY + Math.sin(angle) * (this.height * 0.28);
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.strokeStyle = '#00F0FF';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Harmonic Wave 2 (Ultraviolet Secondary Phase)
    this.ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const x = i * step;
      const angle = (i / points) * Math.PI * (baseFreq * 1.5) - this.phase * 0.8;
      const y = midY + Math.cos(angle) * (this.height * 0.16);
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.strokeStyle = 'rgba(157, 78, 221, 0.7)';
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
  }
}

// -------------------------------------------------------------
// 10. SYNCHRONIZED NODE SWITCHING CONTROLLER
// -------------------------------------------------------------
function syncActiveNode(nodeId) {
  const member = NEXUS_MEMBERS_DATA.find((m) => m.id === Number(nodeId));
  if (!member) return;

  SystemState.activeNodeId = member.id;
  playOpticChirp(member.frequency || 440);

  // 1. Update Hero Quick Buttons
  document.querySelectorAll('.node-btn').forEach((btn) => {
    const isTarget = Number(btn.getAttribute('data-node')) === member.id;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // 2. Update Hero Badge
  const heroBadge = document.getElementById('activeNodeBadge');
  if (heroBadge) {
    heroBadge.textContent = `FOCUSED: N.0${member.id} [${member.displayName}]`;
  }

  // 3. Update Member Terminal Cards
  document.querySelectorAll('.identity-terminal').forEach((term) => {
    const isTarget = Number(term.getAttribute('data-member-id')) === member.id;
    term.classList.toggle('active', isTarget);
    
    const syncBtn = term.querySelector('.btn-sync');
    if (syncBtn) {
      syncBtn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
      const label = syncBtn.querySelector('.sync-label');
      if (label) label.textContent = isTarget ? 'ACTIVE NODE' : 'SYNC NODE';
    }
  });

  // 4. Update Spatial Telemetry Readouts
  const telSection = document.getElementById('telemetry');
  const telActiveCallsign = document.getElementById('telActiveCallsign');
  const apertureCoord = document.getElementById('apertureCoord');
  const hudAvatarImg = document.getElementById('hudAvatarImg');
  const hudAvatarTitle = document.getElementById('hudAvatarTitle');
  const hudAvatarSub = document.getElementById('hudAvatarSub');
  const telNodeNum = document.getElementById('telNodeNum');
  const telFullName = document.getElementById('telFullName');
  const telFocus = document.getElementById('telFocus');
  const telSymbol = document.getElementById('telSymbol');
  const telPath = document.getElementById('telPath');
  const telRole = document.getElementById('telRole');
  const telGithub = document.getElementById('telGithub');
  const telLaunchBtn = document.getElementById('telLaunchBtn');
  const telGithubBtn = document.getElementById('telGithubBtn');
  const telBars = document.getElementById('telBars');

  if (telActiveCallsign) telActiveCallsign.textContent = `NODE_0${member.id} CONNECTED`;
  if (apertureCoord) apertureCoord.textContent = member.statusText;
  
  if (hudAvatarImg) {
    if (member.hasRealAvatar) {
      hudAvatarImg.src = member.avatarUrl;
      hudAvatarImg.alt = `Ảnh chân dung màu thực tế của ${member.fullName}`;
    } else {
      // Clean SVG vector fallback for members without photographic asset
      hudAvatarImg.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%230E1424"/><text x="50%" y="54%" font-family="monospace" font-size="28" fill="%2300F0FF" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${member.symbol}</text></svg>`;
      hudAvatarImg.alt = `Biểu trưng số của ${member.fullName}`;
    }
  }

  if (hudAvatarTitle) hudAvatarTitle.textContent = member.fullName.toUpperCase();
  if (hudAvatarSub) hudAvatarSub.textContent = `UTH K24 SE · ${member.port}`;
  if (telNodeNum) telNodeNum.textContent = `NODE 0${member.id}`;
  if (telFullName) telFullName.textContent = member.fullName;
  if (telFocus) telFocus.textContent = member.focus;
  if (telSymbol) telSymbol.textContent = member.symbol;
  if (telPath) telPath.textContent = member.portfolioUrl;
  if (telRole) telRole.textContent = member.role;
  if (telGithub) telGithub.textContent = member.githubHandle;

  if (telLaunchBtn) {
    telLaunchBtn.href = member.portfolioUrl;
    telLaunchBtn.querySelector('span:first-child').textContent = member.isLinked 
      ? 'TRUY CẬP PORTFOLIO CHI TIẾT' 
      : 'XEM KHUNG SẴN SÀNG PHASE 3';
  }

  if (telGithubBtn) {
    telGithubBtn.href = member.github;
  }

  // Render Radar Progress Bars
  if (telBars && member.strengthsMatrix) {
    telBars.innerHTML = member.strengthsMatrix.map((item) => `
      <div class="radar-row font-mono">
        <span class="r-label">${item.label}</span>
        <div class="r-track"><div class="r-fill" style="width: ${item.val}%;"></div></div>
        <span class="r-val">${item.val}%</span>
      </div>
    `).join('');
  }

  // Trigger React Bits AnimatedContent smooth transition
  const stage = document.querySelector('.telemetry-stage');
  triggerAnimatedContent(stage);
}

// -------------------------------------------------------------
// 11. MULTI-VECTOR SIGNAL ROUTER (SEARCH & FILTER ENGINE)
// -------------------------------------------------------------
function filterNodes() {
  const queryNormalized = removeVietnameseTones(SystemState.searchQuery.trim());
  const activeTag = SystemState.activeFilter.toLowerCase();

  const matched = NEXUS_MEMBERS_DATA.filter((member) => {
    // 1. Text Search matching
    let matchesSearch = true;
    if (queryNormalized.length > 0) {
      const nameNorm = removeVietnameseTones(member.fullName);
      const dispNorm = removeVietnameseTones(member.displayName);
      const focusNorm = removeVietnameseTones(member.focus);
      const strengthsNorm = member.strengths.map(removeVietnameseTones).join(' ');
      const searchBlob = `${nameNorm} ${dispNorm} ${focusNorm} ${strengthsNorm}`;
      
      matchesSearch = searchBlob.includes(queryNormalized);
    }

    // 2. Vector Tag matching (AND logic)
    let matchesTag = true;
    if (activeTag !== 'all') {
      const memberStrengthsLower = member.strengths.map((s) => s.toLowerCase());
      matchesTag = memberStrengthsLower.some((s) => s.includes(activeTag));
    }

    return matchesSearch && matchesTag;
  });

  SystemState.matchedNodeIds = matched.map((m) => m.id);

  // Update DOM Cards Visibility
  const terminals = document.querySelectorAll('.identity-terminal');
  terminals.forEach((term) => {
    const termId = Number(term.getAttribute('data-member-id'));
    const isVisible = SystemState.matchedNodeIds.includes(termId);
    term.style.display = isVisible ? 'flex' : 'none';
  });

  // Update Readout Display
  const matchDisplay = document.getElementById('routerMatchDisplay');
  const hudStatusReadout = document.getElementById('hudStatusReadout');
  const ariaLive = document.getElementById('routerAriaLive');
  const emptyState = document.getElementById('routerEmptyState');

  const countStr = `MATCHES: ${matched.length} / 6 NODES`;
  if (matchDisplay) matchDisplay.textContent = countStr;
  if (hudStatusReadout) hudStatusReadout.textContent = `${matched.length} NODES SYNCHRONIZED`;
  if (ariaLive) ariaLive.textContent = `Tìm thấy ${matched.length} trên 6 node thành viên.`;

  if (emptyState) {
    emptyState.hidden = matched.length > 0;
  }

  // If active node is hidden by filter, sync to first visible match
  if (matched.length > 0 && !SystemState.matchedNodeIds.includes(SystemState.activeNodeId)) {
    syncActiveNode(matched[0].id);
  }
}

// -------------------------------------------------------------
// 12. EVENT LISTENERS INITIALIZATION
// -------------------------------------------------------------
function initEventListeners() {
  // 1. Hero Quick Node Buttons
  document.querySelectorAll('.node-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = Number(btn.getAttribute('data-node'));
      syncActiveNode(targetId);
    });
  });

  // 2. Member Terminal Sync Buttons
  document.querySelectorAll('.btn-sync').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = Number(btn.getAttribute('data-target'));
      syncActiveNode(targetId);
    });
  });

  // 3. Member Terminal Card Click
  document.querySelectorAll('.identity-terminal').forEach((term) => {
    term.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // Allow natural navigation
      const targetId = Number(term.getAttribute('data-member-id'));
      syncActiveNode(targetId);
    });
  });

  // 4. Router Search Input
  const searchInput = document.getElementById('routerSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      SystemState.searchQuery = e.target.value;
      filterNodes();
    });
  }
  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      SystemState.searchQuery = '';
      filterNodes();
      searchInput.focus();
    });
  }

  // 5. Router Tag Filter Buttons
  document.querySelectorAll('.tag-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tag-filter-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      SystemState.activeFilter = btn.getAttribute('data-filter') || 'all';
      playOpticChirp(600, 0.05);
      filterNodes();
    });
  });

  // 6. Router Reset Buttons
  const resetBtn = document.getElementById('resetSignalBtn');
  const emptyResetBtn = document.getElementById('emptyResetBtn');
  const resetRouter = () => {
    if (searchInput) searchInput.value = '';
    SystemState.searchQuery = '';
    SystemState.activeFilter = 'all';

    document.querySelectorAll('.tag-filter-btn').forEach((b) => {
      const isAll = b.getAttribute('data-filter') === 'all';
      b.classList.toggle('active', isAll);
      b.setAttribute('aria-pressed', isAll ? 'true' : 'false');
    });

    filterNodes();
  };
  if (resetBtn) resetBtn.addEventListener('click', resetRouter);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetRouter);

  // 7. Audio FX Toggle Button
  const audioToggle = document.getElementById('audioToggleBtn');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      initAudioContext();
      SystemState.audioEnabled = !SystemState.audioEnabled;
      audioToggle.setAttribute('aria-pressed', SystemState.audioEnabled ? 'true' : 'false');
      
      const label = audioToggle.querySelector('.audio-status-label');
      if (label) label.textContent = SystemState.audioEnabled ? 'FX: ON' : 'FX: OFF';
      
      if (SystemState.audioEnabled) {
        playOpticChirp(880, 0.12);
      }
    });
  }

  // 8. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
    });

    mobileDrawer.querySelectorAll('.mobile-nav-item').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });
  }
}

// -------------------------------------------------------------
// 13. BOOTSTRAP INITIALIZATION
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize React Bits Features
  initReactBitsSplitText();
  initReactBitsMagnet();

  // 2. Initialize Interactive Visualizers
  new ConstellationCanvas('constellationCanvas');
  new OpticalSpectrumVisualizer('spectrumCanvas');

  // 3. Bind UI Interactivity
  initEventListeners();

  // 4. Sync Initial Node (Node 01: Trường)
  syncActiveNode(1);

  console.info('NEXUS-06 // Neo-Futuristic Digital System initialized successfully.');
});
