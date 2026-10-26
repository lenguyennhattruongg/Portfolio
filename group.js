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
    rank: 'THÀNH VIÊN 01 // TRƯỞNG NHÓM',
    focus: 'Software Engineer Trainee, định hướng chuyên sâu Backend và kiến trúc phần mềm.',
    role: 'Trưởng nhóm · Kỹ sư Phần mềm',
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
    rank: 'THÀNH VIÊN 02 // LẬP TRÌNH WEB',
    focus: 'Lập trình viên Web Full-Stack và Quản trị hệ thống mạng.',
    role: 'Thành viên · Lập trình Full-Stack & Mạng',
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
    rank: 'THÀNH VIÊN 03 // PHÁT TRIỂN GIAO DIỆN',
    focus: 'Xây dựng giao diện web chuẩn responsive và tối ưu hiệu năng người dùng.',
    role: 'Thành viên · Phát triển Giao diện Web',
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
    isLinked: true,
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
    rank: 'THÀNH VIÊN 04 // THIẾT KẾ TRẢI NGHIỆM',
    focus: 'Thiết kế giao diện người dùng tinh gọn, thẩm mỹ và trực quan.',
    role: 'Thành viên · Thiết kế Giao diện UI/UX',
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
    isLinked: true,
    frequency: 783.99, // G5 harmonic
    statusText: 'PORT_04 · 784.0MHz'
  },
  {
    id: 5,
    slug: 'nguyen-pham-y-huynh',
    fullName: 'Nguyễn Phạm Y Huỳnh',
    displayName: 'Huỳnh',
    symbol: 'Hy',
    port: 'PORT_05',
    rank: 'THÀNH VIÊN 05 // NỀN TẢNG PHẦN MỀM',
    focus: 'Phát triển nền tảng web vững chắc và xây dựng logic xử lý hệ thống.',
    role: 'Thành viên · Logic & Nền tảng Web',
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
    isLinked: true,
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
    rank: 'THÀNH VIÊN 06 // TRUYỀN THÔNG SỐ',
    focus: 'Thiết kế truyền thông số, đồ họa trực quan và tương tác web sáng tạo.',
    role: 'Thành viên · Truyền thông & Đồ họa Số',
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
    isLinked: true,
    frequency: 987.77, // B5 harmonic
    statusText: 'PORT_06 · 987.8MHz'
  }
];

// -------------------------------------------------------------
// 2. GLOBAL SYSTEM STATE
// -------------------------------------------------------------
const SystemState = {
  activeNodeId: 1,
  audioEnabled: true, // Enabled by default; wakes up on first interaction
  searchQuery: '',
  activeFilter: 'all',
  matchedNodeIds: [1, 2, 3, 4, 5, 6]
};

// -------------------------------------------------------------
// 3. UTILITIES: VIETNAMESE & TOKEN NORMALIZATION
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
  str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return str;
}

function normalizeToken(str) {
  if (!str) return '';
  return removeVietnameseTones(str)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ''); // strip punctuation, slashes, hyphens
}

// -------------------------------------------------------------
// 4. ADVANCED WEB AUDIO API SYNTHESIZER
// -------------------------------------------------------------
let audioCtx = null;

function initAudioContext() {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch (err) {
    console.warn('AudioContext init prevented:', err);
  }
}

// Cybernetic Frequency Note for Node Synchronize
function playCyberChirp(freq = 440, duration = 0.14) {
  if (!SystemState.audioEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    
    // Primary Tone
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);
    osc1.frequency.exponentialRampToValueAtTime(freq * 1.35, now + duration);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.14, now + 0.015);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(now);
    osc1.stop(now + duration);

    // Harmonic Shimmer Tone (Octave + subtle detune)
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, now);
    osc2.frequency.exponentialRampToValueAtTime(freq * 2.05, now + duration * 0.7);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.05, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(now);
    osc2.stop(now + duration * 0.7);
  } catch (err) {
    console.warn('Audio playback inhibited:', err);
  }
}

// Crisp Mechanical Click Sound for Buttons
function playClickSound() {
  if (!SystemState.audioEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch (err) {}
}

// High-tech Filter Blip Sound
function playFilterSound() {
  if (!SystemState.audioEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.linearRampToValueAtTime(1100, now + 0.06);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch (err) {}
}

// Descending Sweep Sound for Reset Operations
function playResetSound() {
  if (!SystemState.audioEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1050, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.12);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (err) {}
}

// Toggle Audio System (Desktop & Mobile synchronized)
function toggleAudio() {
  initAudioContext();
  SystemState.audioEnabled = !SystemState.audioEnabled;

  const audioToggle = document.getElementById('audioToggleBtn');
  const mobileToggle = document.getElementById('mobileAudioToggleBtn');
  const mobileLabel = document.getElementById('mobileAudioLabel');

  const statusLabel = audioToggle ? audioToggle.querySelector('.audio-status-label') : null;
  const icon = SystemState.audioEnabled ? '🔊' : '🔇';
  const labelText = SystemState.audioEnabled ? 'SOUND: ON' : 'SOUND: MUTE';
  const mobileText = SystemState.audioEnabled ? 'ÂM THANH: BẬT' : 'ÂM THANH: TẮT';

  if (audioToggle) {
    audioToggle.setAttribute('aria-pressed', SystemState.audioEnabled ? 'true' : 'false');
    const iconSpan = audioToggle.querySelector('.audio-wave-icon');
    if (iconSpan) iconSpan.textContent = icon;
    if (statusLabel) statusLabel.textContent = labelText;
  }

  if (mobileToggle) {
    mobileToggle.setAttribute('aria-pressed', SystemState.audioEnabled ? 'true' : 'false');
    const mobIcon = mobileToggle.querySelector('.audio-wave-icon');
    if (mobIcon) mobIcon.textContent = icon;
    if (mobileLabel) mobileLabel.textContent = mobileText;
  }

  if (SystemState.audioEnabled) {
    playCyberChirp(660, 0.12);
  }
}

// -------------------------------------------------------------
// 5. REACT BITS INTEGRATION: SPLIT-TEXT, MAGNET, ANIMATED-CONTENT
// -------------------------------------------------------------
function initReactBitsSplitText() {
  const headline = document.querySelector('[data-react-bits="split-text"]');
  if (!headline) return;

  const rawText = headline.innerText.trim();
  headline.innerHTML = '';
  
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

function initReactBitsMagnet() {
  const magnetButtons = document.querySelectorAll('[data-react-bits="magnet"]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  magnetButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - btnCenterX) * 0.25;
      const deltaY = (e.clientY - btnCenterY) * 0.25;
      
      btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

function triggerAnimatedContent(element) {
  if (!element) return;
  element.style.opacity = '0';
  element.style.transform = 'translateY(8px)';
  
  requestAnimationFrame(() => {
    element.style.transition = 'opacity 0.26s cubic-bezier(0.16, 1, 0.3, 1), transform 0.26s cubic-bezier(0.16, 1, 0.3, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0px)';
  });
}

// -------------------------------------------------------------
// 6. CONSTELLATION NEXUS CANVAS (INTERACTIVE 6-NODE MESH)
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

      // Update cursor when hovering near any node
      let isNearNode = false;
      for (let n of this.nodes) {
        const dist = Math.hypot(this.mouse.x - n.currentX, this.mouse.y - n.currentY);
        if (dist <= n.radius + 14) {
          isNearNode = true;
          break;
        }
      }
      this.canvas.style.cursor = isNearNode ? 'pointer' : 'crosshair';
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
      this.mouse.isHovering = false;
      this.canvas.style.cursor = 'default';
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      for (let n of this.nodes) {
        const dist = Math.hypot(clickX - n.currentX, clickY - n.currentY);
        if (dist <= n.radius + 18) {
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

      const dx = n.cx - n.currentX;
      const dy = n.cy - n.currentY;
      n.vx += dx * 0.05;
      n.vy += dy * 0.05;

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

      n.vx *= 0.85;
      n.vy *= 0.85;

      n.currentX += n.vx;
      n.currentY += n.vy;
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw connection lines
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

    // Draw nodes
    this.nodes.forEach((n) => {
      const isActive = n.memberId === SystemState.activeNodeId;

      if (isActive) {
        const pulseR = n.radius + 8 + Math.sin(n.pulse) * 4;
        this.ctx.beginPath();
        this.ctx.arc(n.currentX, n.currentY, pulseR, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      }

      this.ctx.beginPath();
      this.ctx.arc(n.currentX, n.currentY, n.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = isActive ? '#00F0FF' : '#0E1424';
      this.ctx.fill();
      this.ctx.strokeStyle = isActive ? '#FFFFFF' : '#7928CA';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      this.ctx.font = `600 ${isActive ? '11px' : '10px'} "IBM Plex Mono", monospace`;
      this.ctx.fillStyle = isActive ? '#00F0FF' : '#8A99AD';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`N.0${n.memberId} ${n.label}`, n.currentX, n.currentY + n.radius + 16);
    });
  }
}

// -------------------------------------------------------------
// 7. OPTICAL SPECTRUM CANVAS (HARMONIC OSCILLOSCOPE)
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
// 8. SYNCHRONIZED NODE SWITCHING CONTROLLER
// -------------------------------------------------------------
function syncActiveNode(nodeId) {
  const member = NEXUS_MEMBERS_DATA.find((m) => m.id === Number(nodeId));
  if (!member) return;

  SystemState.activeNodeId = member.id;
  playCyberChirp(member.frequency || 440);

  // 1. Update Hero Quick Buttons
  document.querySelectorAll('.node-btn').forEach((btn) => {
    const isTarget = Number(btn.getAttribute('data-node')) === member.id;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
  });

  // 2. Update Hero Active Badge & Header Status Pill
  const heroBadge = document.getElementById('activeNodeBadge');
  if (heroBadge) {
    heroBadge.textContent = `FOCUSED: N.0${member.id} [${member.displayName}]`;
  }
  const hudStatus = document.getElementById('hudStatusReadout');
  if (hudStatus) {
    hudStatus.textContent = `NODE 0${member.id} [${member.displayName.toUpperCase()}] SYNCHRONIZED`;
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
    const btnSpan = telLaunchBtn.querySelector('span:first-child');
    if (btnSpan) {
      btnSpan.textContent = member.id === 1 
        ? 'TRUY CẬP PORTFOLIO CHI TIẾT' 
        : 'TRUY CẬP KHUNG PORTFOLIO';
    }
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
// 9. MULTI-VECTOR SIGNAL ROUTER (SEARCH & FILTER ENGINE)
// -------------------------------------------------------------
function filterNodes() {
  const queryNormalized = removeVietnameseTones(SystemState.searchQuery.trim());
  const activeFilterTag = SystemState.activeFilter.trim();
  const normalizedActiveTag = normalizeToken(activeFilterTag);

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

    // 2. Vector Tag matching (Robust Diacritic-Insensitive & Symbol-Neutral)
    let matchesTag = true;
    if (activeFilterTag !== 'all' && normalizedActiveTag.length > 0) {
      // Collect all tokens from member
      const memberTokens = [
        ...member.strengths.map(normalizeToken),
        normalizeToken(member.displayName),
        normalizeToken(member.focus),
        normalizeToken(member.role)
      ];

      // Match against normalized active tag
      matchesTag = memberTokens.some((token) => 
        token.includes(normalizedActiveTag) || normalizedActiveTag.includes(token)
      );

      // Special alias checks
      if (!matchesTag) {
        if (normalizedActiveTag === 'mang' && memberTokens.some((t) => t.includes('network') || t.includes('mang'))) {
          matchesTag = true;
        }
        if (normalizedActiveTag === 'fullstack' && memberTokens.some((t) => t.includes('fullstack') || t.includes('full'))) {
          matchesTag = true;
        }
        if (normalizedActiveTag === 'cc' && memberTokens.some((t) => t.includes('c') || t.includes('cc'))) {
          matchesTag = true;
        }
      }
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
// 10. EVENT LISTENERS INITIALIZATION
// -------------------------------------------------------------
function initEventListeners() {
  // Global User Gesture Listener to Unlock AudioContext
  const unlockAudio = () => {
    initAudioContext();
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };
  window.addEventListener('click', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
  window.addEventListener('touchstart', unlockAudio);

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

  // 3. Member Terminal Card Click (syncs node when clicking card body)
  document.querySelectorAll('.identity-terminal').forEach((term) => {
    term.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // Allow natural link navigation
      const targetId = Number(term.getAttribute('data-member-id'));
      syncActiveNode(targetId);
    });
  });

  // 4. Click Sound on Action Links & Buttons
  document.querySelectorAll('.terminal-link, .btn').forEach((el) => {
    el.addEventListener('click', () => {
      playClickSound();
    });
  });

  // 5. Router Search Input
  const searchInput = document.getElementById('routerSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      SystemState.searchQuery = e.target.value;
      filterNodes();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        SystemState.searchQuery = '';
        filterNodes();
        playResetSound();
      }
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      SystemState.searchQuery = '';
      filterNodes();
      searchInput.focus();
      playClickSound();
    });
  }

  // 6. Router Tag Filter Buttons
  document.querySelectorAll('.tag-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tag-filter-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      SystemState.activeFilter = btn.getAttribute('data-filter') || 'all';
      playFilterSound();
      filterNodes();
    });
  });

  // 7. Router Reset Buttons
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

    playResetSound();
    filterNodes();
  };
  if (resetBtn) resetBtn.addEventListener('click', resetRouter);
  if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetRouter);

  // 8. Audio FX Toggle Buttons (Header & Mobile Drawer)
  const audioToggle = document.getElementById('audioToggleBtn');
  const mobileAudioToggle = document.getElementById('mobileAudioToggleBtn');
  if (audioToggle) audioToggle.addEventListener('click', toggleAudio);
  if (mobileAudioToggle) mobileAudioToggle.addEventListener('click', toggleAudio);

  // 9. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileDrawer.setAttribute('aria-hidden', isExpanded ? 'true' : 'false');
      playClickSound();
    });

    mobileDrawer.querySelectorAll('.mobile-nav-item:not(.mobile-audio-toggle)').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
        playClickSound();
      });
    });
  }

  // 10. Footer Node Quick Jump Links
  document.querySelectorAll('.footer-nav-matrix .group-link[href^="#node-card-"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const match = href.match(/#node-card-(\d+)/);
      if (match) {
        syncActiveNode(Number(match[1]));
      }
    });
  });

  // 11. Contact & Feedback Form Handler
  const contactForm = document.getElementById('contactForm');
  const contactSuccessAlert = document.getElementById('contactSuccessAlert');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const msg = document.getElementById('contactMsg')?.value.trim();

      if (!name || !email || !msg) {
        alert('Vui lòng điền đầy đủ họ tên, email và nội dung phản hồi!');
        return;
      }

      playCyberChirp(880, 0.18);
      if (contactSuccessAlert) {
        contactSuccessAlert.classList.remove('hidden');
        contactSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      contactForm.reset();

      setTimeout(() => {
        if (contactSuccessAlert) contactSuccessAlert.classList.add('hidden');
      }, 7000);
    });

    const contactResetBtn = document.getElementById('contactResetBtn');
    if (contactResetBtn) {
      contactResetBtn.addEventListener('click', () => {
        playResetSound();
        if (contactSuccessAlert) contactSuccessAlert.classList.add('hidden');
      });
    }
  }

  // 12. Search Suggestion Chips
  document.querySelectorAll('.sugg-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query') || chip.textContent.trim();
      if (searchInput) {
        searchInput.value = query;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        searchInput.focus();
        playClickSound();
      }
    });
  });
}

// -------------------------------------------------------------
// 11. BOOTSTRAP INITIALIZATION
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

  console.info('NEXUS-06 // Neo-Futuristic Digital System initialized with active audio.');
});
