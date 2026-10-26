/**
 * THE COLLECTIVE MACHINE — KINETIC JAVASCRIPT ENGINE
 * Concept: Interactive Team Experience × Modular Digital Instrument × React Bits
 * Architecture: Clean Vanilla ES6+ (0 build dependency requirement)
 */

// -------------------------------------------------------------
// 1. REPOSITORY DATA SOURCE OF TRUTH (6 MODULES)
// -------------------------------------------------------------
const COLLECTIVE_MACHINE_DATA = [
  {
    id: 1,
    slug: 'le-nguyen-nhat-truong',
    fullName: 'Lê Nguyễn Nhật Trường',
    displayName: 'Trường',
    symbol: 'Tr',
    channel: 'CH.01',
    focus: 'Software Engineer Trainee, thiên về Backend; mục tiêu thực tập SE Intern 2026',
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
    frequency: 440.0, // A4 Note
    statusText: 'HOST LINK ONLINE // PATCHED'
  },
  {
    id: 2,
    slug: 'nguyen-xuan-hieu',
    fullName: 'Nguyễn Xuân Hiếu',
    displayName: 'Hiếu',
    symbol: 'Hi',
    channel: 'CH.02',
    focus: 'Full-Stack Web Developer & Network Administrator',
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
    frequency: 523.25, // C5 Note
    statusText: 'FOUNDATION READY // STANDBY'
  },
  {
    id: 3,
    slug: 'le-huu-chau',
    fullName: 'Lê Hữu Châu',
    displayName: 'Châu',
    symbol: 'Ch',
    channel: 'CH.03',
    focus: 'Web Foundation · Sẵn sàng tích hợp Phase 3',
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
    frequency: 659.25, // E5 Note
    statusText: 'STANDBY // PHASE 3 INTEGRATION'
  },
  {
    id: 4,
    slug: 'nguyen-anh-thu',
    fullName: 'Nguyễn Anh Thư',
    displayName: 'Thư',
    symbol: 'Th',
    channel: 'CH.04',
    focus: 'Web Foundation · Sẵn sàng tích hợp Phase 3',
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
    frequency: 783.99, // G5 Note
    statusText: 'STANDBY // PHASE 3 INTEGRATION'
  },
  {
    id: 5,
    slug: 'nguyen-pham-y-huynh',
    fullName: 'Nguyễn Phạm Ý Huỳnh',
    displayName: 'Huỳnh',
    symbol: 'Hy',
    channel: 'CH.05',
    focus: 'Web Foundation · Sẵn sàng tích hợp Phase 3',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Web Foundation', 'Logic Modules'],
    strengthsMatrix: [
      { label: 'Logic', val: 80 },
      { label: 'Web Core', val: 78 }
    ],
    github: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
    githubHandle: 'Group Contributor',
    portfolioUrl: './members/nguyen-pham-y-huynh/index.html',
    avatarUrl: '',
    hasRealAvatar: false,
    isLinked: false,
    frequency: 880.00, // A5 Note
    statusText: 'STANDBY // PHASE 3 INTEGRATION'
  },
  {
    id: 6,
    slug: 'nguyen-thi-thao-nhu',
    fullName: 'Nguyễn Thị Thảo Như',
    displayName: 'Như',
    symbol: 'Nh',
    channel: 'CH.06',
    focus: 'Web Foundation · Sẵn sàng tích hợp Phase 3',
    role: '[CẦN XÁC NHẬN]',
    strengths: ['Web Foundation', 'Creative Media'],
    strengthsMatrix: [
      { label: 'Creative', val: 84 },
      { label: 'Web Styling', val: 80 }
    ],
    github: 'https://github.com/nguyenxuanhieu2903/portfolio-group',
    githubHandle: 'Group Contributor',
    portfolioUrl: './members/nguyen-thi-thao-nhu/index.html',
    avatarUrl: '',
    hasRealAvatar: false,
    isLinked: false,
    frequency: 987.77, // B5 Note
    statusText: 'STANDBY // PHASE 3 INTEGRATION'
  }
];

// -------------------------------------------------------------
// 2. TACTILE AUDIO SYNTHESIZER (WEB AUDIO API)
// -------------------------------------------------------------
class MachineAudioFeedback {
  constructor() {
    this.ctx = null;
    this.enabled = false;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playBlip(freq = 440, type = 'sine', duration = 0.08) {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio context errors gracefully
    }
  }
}

const audioFX = new MachineAudioFeedback();

// -------------------------------------------------------------
// 3. REACT BITS: SPLIT TEXT COMPONENT
// -------------------------------------------------------------
function initReactBitsSplitText() {
  const elements = document.querySelectorAll('[data-react-bits="split-text"]');
  elements.forEach((el) => {
    const rawText = el.textContent.trim();
    el.innerHTML = '';
    
    // Split into words and characters to preserve layout wrapping
    const words = rawText.split(' ');
    let charIndex = 0;

    words.forEach((word, wIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline';

      for (let i = 0; i < word.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.textContent = word[i];
        charSpan.style.transitionDelay = `${charIndex * 28}ms`;
        wordSpan.appendChild(charSpan);
        charIndex++;
      }

      el.appendChild(wordSpan);

      // Add space between words
      if (wIdx < words.length - 1) {
        const space = document.createTextNode(' ');
        el.appendChild(space);
      }
    });

    // Trigger reveal sequence
    requestAnimationFrame(() => {
      setTimeout(() => {
        el.classList.add('split-text-loaded');
      }, 80);
    });
  });
}

// -------------------------------------------------------------
// 4. REACT BITS: MAGNET POINTER EFFECT
// -------------------------------------------------------------
function initReactBitsMagnet() {
  const magnetButtons = document.querySelectorAll('[data-react-bits="magnet"]');
  
  // Disable magnet on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  magnetButtons.forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.22;
      const deltaY = (e.clientY - centerY) * 0.22;

      btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    });

    btn.addEventListener('pointerleave', () => {
      btn.style.transform = 'translate3d(0, 0, 0)';
    });
  });
}

// -------------------------------------------------------------
// 5. CRT OSCILLOSCOPE WAVEFORM ENGINE
// -------------------------------------------------------------
class OscilloscopeEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.phase = 0;
    this.frequency = 440;
    this.targetFrequency = 440;
    this.animId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.render = this.render.bind(this);
    this.start();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = this.canvas.parentElement.clientWidth || 560;
    this.canvas.height = this.canvas.parentElement.clientHeight || 200;
  }

  setFrequency(freq) {
    this.targetFrequency = freq;
  }

  start() {
    if (!this.animId) {
      this.animId = requestAnimationFrame(this.render);
    }
  }

  render() {
    if (!this.ctx || !this.canvas) return;
    const w = this.canvas.width;
    const h = this.canvas.height;

    // Smoothly interpolate frequency
    this.frequency += (this.targetFrequency - this.frequency) * 0.08;
    this.phase += 0.04;

    // Fade trail
    this.ctx.fillStyle = 'rgba(11, 7, 18, 0.25)';
    this.ctx.fillRect(0, 0, w, h);

    // Center baseline
    const midY = h / 2;

    // Draw main harmonic wave
    this.ctx.beginPath();
    this.ctx.lineWidth = 2.5;
    this.ctx.strokeStyle = '#D8FF3E'; // Acid lime glow
    this.ctx.shadowColor = '#D8FF3E';
    this.ctx.shadowBlur = 8;

    const cycles = (this.frequency / 120);
    const amplitude = h * 0.32;

    for (let x = 0; x < w; x++) {
      const normX = x / w;
      // Harmonic wave formula with modulation
      const y = midY + Math.sin(normX * Math.PI * 2 * cycles + this.phase) * amplitude * Math.sin(normX * Math.PI);
      if (x === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();

    // Reset shadow
    this.ctx.shadowBlur = 0;

    this.animId = requestAnimationFrame(this.render);
  }
}

// -------------------------------------------------------------
// 6. VIETNAMESE DIACRITIC-INSENSITIVE STRING NORMALIZATION
// -------------------------------------------------------------
function normalizeVietnamese(str = '') {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[ưƯ]/g, 'u')
    .replace(/[ơƠ]/g, 'o')
    .toLowerCase()
    .trim();
}

// -------------------------------------------------------------
// 7. SYSTEM INTERACTIVE ENGINE (SELECTION, SEARCH & TELEMETRY)
// -------------------------------------------------------------
class CollectiveMachineController {
  constructor() {
    this.activeMemberId = 1;
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.oscilloscope = new OscilloscopeEngine('oscilloscopeCanvas');
    this.initDOM();
    this.bindEvents();
    this.updateSystemState(1);
  }

  initDOM() {
    // Sequencer
    this.sequencerSteps = document.getElementById('sequencerSteps');
    this.sequencerDisplay = document.getElementById('sequencerDisplay');

    // Modules Rack
    this.modulesGrid = document.getElementById('modulesGrid');
    this.moduleCards = document.querySelectorAll('.hardware-module');

    // Telemetry Panel Elements
    this.telemetryActiveTag = document.getElementById('telemetryActiveTag');
    this.crtFreqDisplay = document.getElementById('crtFreqDisplay');
    this.crtAvatarFrame = document.getElementById('crtAvatarFrame');
    this.crtAvatarImg = document.getElementById('crtAvatarImg');
    this.crtAvatarTitle = document.getElementById('crtAvatarTitle');
    this.crtAvatarSub = document.getElementById('crtAvatarSub');

    this.telChannelNum = document.getElementById('telChannelNum');
    this.telChannelName = document.getElementById('telChannelName');
    this.telChannelRole = document.getElementById('telChannelRole');
    this.telSymbol = document.getElementById('telSymbol');
    this.telPath = document.getElementById('telPath');
    this.telGroupRole = document.getElementById('telGroupRole');
    this.telGithub = document.getElementById('telGithub');
    this.telMeters = document.getElementById('telMeters');
    this.telLaunchBtn = document.getElementById('telLaunchBtn');
    this.telGithubBtn = document.getElementById('telGithubBtn');

    // Search & Filter
    this.routerSearchInput = document.getElementById('routerSearchInput');
    this.clearSearchBtn = document.getElementById('clearSearchBtn');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.resetSignalBtn = document.getElementById('resetSignalBtn');
    this.routerMatchCounter = document.getElementById('routerMatchCounter');
    this.routerAriaLive = document.getElementById('routerAriaLive');
    this.routerEmptyState = document.getElementById('routerEmptyState');
    this.emptyResetBtn = document.getElementById('emptyResetBtn');

    // Header Controls
    this.audioToggleBtn = document.getElementById('audioToggleBtn');
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileDrawer = document.getElementById('mobileDrawer');
  }

  bindEvents() {
    // 1. Sequencer step buttons
    if (this.sequencerSteps) {
      this.sequencerSteps.addEventListener('click', (e) => {
        const btn = e.target.closest('.seq-step-btn');
        if (btn) {
          const channel = parseInt(btn.dataset.channel, 10);
          audioFX.playBlip(300 + channel * 80, 'sine');
          this.updateSystemState(channel);
        }
      });
    }

    // 2. Hardware Module Rack activation buttons
    this.moduleCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        // If clicking inside a direct anchor link, let browser navigate
        if (e.target.closest('a')) return;

        const id = parseInt(card.dataset.memberId, 10);
        audioFX.playBlip(320 + id * 70, 'triangle');
        this.updateSystemState(id);
      });
    });

    // 3. Search input real-time handler
    if (this.routerSearchInput) {
      this.routerSearchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.applyFilterAndSearch();
      });
    }

    // 4. Clear search button
    if (this.clearSearchBtn) {
      this.clearSearchBtn.addEventListener('click', () => {
        this.routerSearchInput.value = '';
        this.searchQuery = '';
        this.routerSearchInput.focus();
        this.applyFilterAndSearch();
      });
    }

    // 5. Filter tag buttons
    this.filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        this.currentFilter = btn.dataset.filter;
        audioFX.playBlip(550, 'sine', 0.05);
        this.applyFilterAndSearch();
      });
    });

    // 6. Reset Signal button
    if (this.resetSignalBtn) {
      this.resetSignalBtn.addEventListener('click', () => this.resetAllFilters());
    }
    if (this.emptyResetBtn) {
      this.emptyResetBtn.addEventListener('click', () => this.resetAllFilters());
    }

    // 7. Audio FX button
    if (this.audioToggleBtn) {
      this.audioToggleBtn.addEventListener('click', () => {
        const isEnabled = audioFX.toggle();
        this.audioToggleBtn.classList.toggle('active', isEnabled);
        this.audioToggleBtn.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
        this.audioToggleBtn.querySelector('.audio-label').textContent = isEnabled ? 'FX: ON' : 'FX: OFF';
        if (isEnabled) {
          audioFX.playBlip(880, 'sine', 0.1);
        }
      });
    }

    // 8. Mobile Menu Drawer
    if (this.mobileMenuBtn && this.mobileDrawer) {
      this.mobileMenuBtn.addEventListener('click', () => {
        const isOpen = this.mobileDrawer.classList.toggle('open');
        this.mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        this.mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
      });

      // Close mobile drawer on link click
      this.mobileDrawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          this.mobileDrawer.classList.remove('open');
          this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
          this.mobileDrawer.setAttribute('aria-hidden', 'true');
        });
      });
    }
  }

  updateSystemState(memberId) {
    const member = COLLECTIVE_MACHINE_DATA.find((m) => m.id === memberId) || COLLECTIVE_MACHINE_DATA[0];
    this.activeMemberId = member.id;

    // 1. Update Sequencer UI
    if (this.sequencerSteps) {
      const stepButtons = this.sequencerSteps.querySelectorAll('.seq-step-btn');
      stepButtons.forEach((btn) => {
        const isActive = parseInt(btn.dataset.channel, 10) === member.id;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }
    if (this.sequencerDisplay) {
      this.sequencerDisplay.textContent = `ACTIVE: ${member.channel} [${member.displayName.toUpperCase()}]`;
    }

    // 2. Update Module Rack
    this.moduleCards.forEach((card) => {
      const isActive = parseInt(card.dataset.memberId, 10) === member.id;
      card.classList.toggle('active', isActive);
      
      const toggleBtn = card.querySelector('.module-toggle-btn');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        const label = toggleBtn.querySelector('.toggle-label');
        if (label) {
          label.textContent = isActive ? 'CIRCUIT: ACTIVE' : 'ENGAGE';
        }
      }

      const ledStateText = card.querySelector('.led-state-text');
      if (ledStateText) {
        ledStateText.textContent = isActive ? 'PATCHED' : 'STANDBY';
      }
    });

    // 3. React Bits AnimatedContent transition for Telemetry Panel
    const telemetryConsole = document.querySelector('[data-react-bits="animated-content"]');
    if (telemetryConsole) {
      telemetryConsole.style.opacity = '0.4';
      telemetryConsole.style.transform = 'translateY(6px)';
      telemetryConsole.style.transition = 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        this.renderTelemetryData(member);
        telemetryConsole.style.opacity = '1';
        telemetryConsole.style.transform = 'translateY(0)';
      }, 120);
    } else {
      this.renderTelemetryData(member);
    }

    // 4. Update Oscilloscope Frequency
    if (this.oscilloscope) {
      this.oscilloscope.setFrequency(member.frequency);
    }
    if (this.crtFreqDisplay) {
      this.crtFreqDisplay.textContent = `${member.frequency.toFixed(1)} Hz`;
    }
  }

  renderTelemetryData(member) {
    if (this.telemetryActiveTag) {
      this.telemetryActiveTag.textContent = `CIRCUIT: ${member.channel} CONNECTED`;
    }
    if (this.telChannelNum) this.telChannelNum.textContent = `CHANNEL 0${member.id}`;
    if (this.telChannelName) this.telChannelName.textContent = member.fullName;
    if (this.telChannelRole) this.telChannelRole.textContent = member.focus;
    if (this.telSymbol) this.telSymbol.textContent = member.symbol;
    if (this.telPath) this.telPath.textContent = member.portfolioUrl;
    if (this.telGroupRole) this.telGroupRole.textContent = member.role;
    if (this.telGithub) this.telGithub.textContent = member.githubHandle;

    // Avatar Viewport Handling (ALWAYS 100% REAL NATURAL COLOR!)
    if (this.crtAvatarImg) {
      if (member.hasRealAvatar && member.avatarUrl) {
        this.crtAvatarImg.src = member.avatarUrl;
        this.crtAvatarImg.alt = `Ảnh chân dung màu thực tế của ${member.fullName}`;
        this.crtAvatarImg.style.display = 'block';
      } else {
        // Fallback for members without real image yet
        this.crtAvatarImg.src = './members/le-nguyen-nhat-truong/images/avatar.png'; // Verified safe asset
        this.crtAvatarImg.alt = `Chế độ chờ module ${member.fullName}`;
      }
    }
    if (this.crtAvatarTitle) {
      this.crtAvatarTitle.textContent = `${member.channel} // ${member.fullName.toUpperCase()}`;
    }
    if (this.crtAvatarSub) {
      this.crtAvatarSub.textContent = member.hasRealAvatar
        ? 'UTH K24 SE · AUTHENTICATED PORTRAIT'
        : 'FOUNDATION READY · STANDBY FOR PHASE 3';
    }

    // Strengths Matrix Bars
    if (this.telMeters && member.strengthsMatrix) {
      this.telMeters.innerHTML = member.strengthsMatrix
        .map(
          (item) => `
        <div class="meter-item font-mono">
          <span class="meter-label">${item.label}</span>
          <div class="meter-bar-track">
            <div class="meter-bar-fill" style="width: ${item.val}%;"></div>
          </div>
          <span class="meter-val">${item.val}%</span>
        </div>
      `
        )
        .join('');
    }

    // Action Buttons
    if (this.telLaunchBtn) {
      this.telLaunchBtn.href = member.portfolioUrl;
      this.telLaunchBtn.querySelector('span:first-child').textContent = member.isLinked
        ? 'TRUY CẬP PORTFOLIO CHI TIẾT'
        : 'XEM KHUNG FOUNDATION';
    }
    if (this.telGithubBtn) {
      this.telGithubBtn.href = member.github;
    }
  }

  applyFilterAndSearch() {
    const normQuery = normalizeVietnamese(this.searchQuery);
    let matchCount = 0;

    this.moduleCards.forEach((card) => {
      const id = parseInt(card.dataset.memberId, 10);
      const member = COLLECTIVE_MACHINE_DATA.find((m) => m.id === id);
      if (!member) return;

      // 1. Text Search matching (Name, Focus, Strengths)
      const textToSearch = `${member.fullName} ${member.displayName} ${member.focus} ${member.strengths.join(' ')}`;
      const matchesSearch = !normQuery || normalizeVietnamese(textToSearch).includes(normQuery);

      // 2. Tag Filter matching
      let matchesFilter = true;
      if (this.currentFilter !== 'all') {
        const normFilter = normalizeVietnamese(this.currentFilter);
        const cardStrengths = card.dataset.strengths ? card.dataset.strengths.toLowerCase() : '';
        matchesFilter = cardStrengths.includes(normFilter);
      }

      // AND Logic
      const isVisible = matchesSearch && matchesFilter;
      card.classList.toggle('filtered-out', !isVisible);

      if (isVisible) {
        matchCount++;
      }
    });

    // Update Counter & ARIA live
    if (this.routerMatchCounter) {
      this.routerMatchCounter.textContent = `KẾT QUẢ: ${matchCount} / 6 MODULES`;
    }
    if (this.routerAriaLive) {
      this.routerAriaLive.textContent = `Đã tìm thấy ${matchCount} module phù hợp với bộ lọc tín hiệu.`;
    }

    // Empty state
    if (this.routerEmptyState) {
      this.routerEmptyState.hidden = matchCount > 0;
    }
  }

  resetAllFilters() {
    if (this.routerSearchInput) {
      this.routerSearchInput.value = '';
    }
    this.searchQuery = '';
    this.currentFilter = 'all';

    this.filterButtons.forEach((b) => {
      const isAll = b.dataset.filter === 'all';
      b.classList.toggle('active', isAll);
      b.setAttribute('aria-pressed', isAll ? 'true' : 'false');
    });

    audioFX.playBlip(440, 'sine', 0.08);
    this.applyFilterAndSearch();
  }
}

// -------------------------------------------------------------
// 8. INITIALIZATION ON DOM READY
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Init SplitText Component
  initReactBitsSplitText();

  // 2. Init Magnet Pointer Component
  initReactBitsMagnet();

  // 3. Init Machine Controller
  window.collectiveMachine = new CollectiveMachineController();
});
