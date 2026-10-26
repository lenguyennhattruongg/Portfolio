/**
 * ============================================================================
 * Nhóm 06 — True 3D WebGL Spatial Universe (Milky Way & Solar System Engine)
 * ĐH Giao thông Vận tải TP.HCM (UTH)
 *
 * Tích hợp & Nâng cấp Toàn diện (Chống Pixel, Tăng Kích thước, Đầy đủ Ánh sáng & Hyper-Warp):
 * 1. Khử hoàn toàn đồ họa pixel: Bầu trời sâu dải Ngân Hà rực rỡ, trường sao đa tầng khử răng cưa.
 * 2. Hệ thống chiếu sáng rực rỡ: Sun PointLight + Camera Headlight Fill Light giúp mọi góc nhìn đều sáng bừng màu sắc NASA.
 * 3. Kích thước hành tinh bề thế, tráng lệ: Mặt Trời (r=24), Trái Đất (r=8.8), Sao Mộc (r=18.5), Sao Thổ (r=15.5)...
 * 4. Nhãn thiên văn AR vi mô (Micro-badges) tinh tế, chữ nhỏ gọn, không che khuất hành tinh.
 * 5. Nút Zoom HUD chuyên dụng [+] / [−] / [⟲] và tự do cuộn chuột zoom 100% không bị xung đột khóa vị trí.
 * 6. Chế độ [2] HYPER-WARP thực thụ: Vệt sáng lượng tử gắn kèm Camera lao vút qua không gian, mở rộng FOV 85°.
 * ============================================================================
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================================
// 1. DATA CONTRACT: 10 THIÊN THỂ HỆ MẶT TRỜI & 6 THÀNH VIÊN KỸ THUẬT UTH
// ============================================================================
const MEMBERS_DATA = [
  {
    id: 'le-nguyen-nhat-truong',
    name: 'Lê Nguyễn Nhật Trường',
    role: 'Trưởng nhóm / Full-stack Developer',
    seq: 'MEMBER // 01',
    portfolio: './members/le-nguyen-nhat-truong/index.html',
    github: 'https://github.com/lenguyennhattruongg',
    tags: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Three.js', 'System Architecture', 'UI/UX']
  },
  {
    id: 'nguyen-xuan-hieu',
    name: 'Nguyễn Xuân Hiếu',
    role: 'Frontend Architect',
    seq: 'MEMBER // 02',
    portfolio: './members/nguyen-xuan-hieu/index.html',
    github: 'https://github.com/nguyenxuanhieu2903',
    tags: ['React', 'CSS Architecture', 'Canvas API', 'State Machines', 'WebGL']
  },
  {
    id: 'truong-dinh-duy-phuoc',
    name: 'Trương Đình Duy Phước',
    role: 'Creative Developer',
    seq: 'MEMBER // 03',
    portfolio: './members/truong-dinh-duy-phuoc/index.html',
    github: 'https://github.com',
    tags: ['Interactive Audio', 'Web Audio API', 'Creative Coding', 'GSAP']
  },
  {
    id: 'phan-pham-thanh-tam',
    name: 'Phan Phạm Thành Tâm',
    role: 'Backend & Data Engineer',
    seq: 'MEMBER // 04',
    portfolio: './members/phan-pham-thanh-tam/index.html',
    github: 'https://github.com',
    tags: ['Node.js', 'PostgreSQL', 'Docker', 'REST API', 'Redis']
  },
  {
    id: 'bui-phuoc-thanh',
    name: 'Bùi Phước Thành',
    role: 'DevOps & Cloud Engineer',
    seq: 'MEMBER // 05',
    portfolio: './members/bui-phuoc-thanh/index.html',
    github: 'https://github.com',
    tags: ['CI/CD Pipeline', 'Docker', 'GitHub Actions', 'Linux Server', 'Nginx']
  },
  {
    id: 'phan-gia-huy',
    name: 'Phan Gia Huy',
    role: 'QA & Security Engineer',
    seq: 'MEMBER // 06',
    portfolio: './members/phan-gia-huy/index.html',
    github: 'https://github.com',
    tags: ['Web Security', 'Penetration Testing', 'Test Automation', 'Jest', 'Cypress']
  }
];

const SOLAR_SYSTEM_DATA = [
  {
    id: 'sun',
    order: 0,
    name: 'The Sun',
    vnName: 'Mặt Trời',
    symbol: '☉',
    isStar: true,
    size: 24.0,
    a: 0,
    speed: 0,
    color: 0xfff7ed,
    glowColor: 0xf59e0b,
    textureFile: './planets/sun.jpg',
    title: 'Trái Tim Năng Lượng Vũ Trụ (The Solar Core)',
    headline: 'Ngôi sao mẹ loại G2V tại trung tâm Hệ Mặt Trời, chiếm 99.86% khối lượng toàn hệ thống, nuôi dưỡng sự sống và điều phối trường hấp dẫn cho toàn bộ dải thiên thể.',
    telemetry: {
      a: '0.00 AU',
      v: '220 km/s',
      t: '230 Triệu Năm',
      e: '0.0000',
      moons: '8 Hành tinh',
      inc: '7.25°'
    },
    hasRings: false,
    hasAtmosphere: true,
    memberId: null,
    memberName: null,
    memberRole: null
  },
  {
    id: 'mercury',
    order: 1,
    name: 'Mercury',
    vnName: 'Sao Thủy',
    symbol: '☿',
    size: 4.2,
    a: 75.0,
    speed: 0.048,
    color: 0x94a3b8,
    glowColor: 0x64748b,
    textureFile: './planets/mercury.jpg',
    title: 'Hành Tinh Lửa & Băng (Speed Sentinel)',
    headline: 'Thiên thể nhỏ nhất và gần Mặt Trời nhất, chuyển động nhanh nhất trong Hệ Mặt Trời với biên độ nhiệt cực đoan và bề mặt phủ kín miệng hố va chạm.',
    telemetry: {
      a: '0.39 AU',
      v: '47.4 km/s',
      t: '88.0 Ngày',
      e: '0.2056',
      moons: '0',
      inc: '7.00°'
    },
    hasRings: false,
    hasAtmosphere: false,
    memberId: 'phan-gia-huy',
    memberName: 'Phan Gia Huy',
    memberRole: 'QA & Security Engineer'
  },
  {
    id: 'venus',
    order: 2,
    name: 'Venus',
    vnName: 'Sao Kim',
    symbol: '♀',
    size: 7.2,
    a: 115.0,
    speed: 0.035,
    color: 0xfde047,
    glowColor: 0xeab308,
    textureFile: './planets/venus.jpg',
    title: 'Hải Đăng Ánh Kim (Volcanic Furnace)',
    headline: 'Hành tinh nóng nhất Hệ Mặt Trời với hiệu ứng nhà kính cực hạn, lớp mây axit sulfuric dày đặc phản chiếu ánh sáng rực rỡ nhất bầu trời đêm.',
    telemetry: {
      a: '0.72 AU',
      v: '35.0 km/s',
      t: '224.7 Ngày',
      e: '0.0067',
      moons: '0',
      inc: '3.39°'
    },
    hasRings: false,
    hasAtmosphere: true,
    memberId: 'bui-phuoc-thanh',
    memberName: 'Bùi Phước Thành',
    memberRole: 'DevOps & Cloud Engineer'
  },
  {
    id: 'earth',
    order: 3,
    name: 'Earth',
    vnName: 'Trái Đất',
    symbol: '⊕',
    size: 8.8,
    a: 165.0,
    speed: 0.029,
    color: 0x38bdf8,
    glowColor: 0x0284c7,
    textureFile: './planets/earth.jpg',
    title: 'Địa Cầu Xanh — Cái Nôi Sự Sống (Blue Marble)',
    headline: 'Hành tinh xanh độc nhất với đại dương lỏng, bầu khí quyển bảo vệ giàu oxy và hệ sinh thái sự sống rực rỡ, trung tâm liên kết các dự án của Lê Nguyễn Nhật Trường.',
    telemetry: {
      a: '1.00 AU',
      v: '29.8 km/s',
      t: '365.25 Ngày',
      e: '0.0167',
      moons: '1 (Mặt Trăng)',
      inc: '0.00°'
    },
    hasRings: false,
    hasAtmosphere: true,
    memberId: 'le-nguyen-nhat-truong',
    memberName: 'Lê Nguyễn Nhật Trường',
    memberRole: 'Trưởng nhóm / Full-stack Developer',
    moons: [
      { name: 'Moon', size: 2.4, dist: 19.0, speed: 2.5, color: 0xe2e8f0 }
    ]
  },
  {
    id: 'mars',
    order: 4,
    name: 'Mars',
    vnName: 'Sao Hỏa',
    symbol: '♂',
    size: 5.8,
    a: 220.0,
    speed: 0.024,
    color: 0xf97316,
    glowColor: 0xc2410c,
    textureFile: './planets/mars.png',
    title: 'Hành Tinh Đỏ — Tiền Đồn Thám Hiểm (Red Frontier)',
    headline: 'Hành tinh đất đá giàu oxit sắt với hẻm vực Valles Marineris và ngọn núi lửa Olympus Mons cao nhất Hệ Mặt Trời, mục tiêu thám hiểm của nhân loại.',
    telemetry: {
      a: '1.52 AU',
      v: '24.1 km/s',
      t: '687.0 Ngày',
      e: '0.0934',
      moons: '2 (Phobos & Deimos)',
      inc: '1.85°'
    },
    hasRings: false,
    hasAtmosphere: true,
    memberId: 'nguyen-xuan-hieu',
    memberName: 'Nguyễn Xuân Hiếu',
    memberRole: 'Frontend Architect',
    moons: [
      { name: 'Phobos', size: 0.8, dist: 10.0, speed: 3.2, color: 0xa8a29e },
      { name: 'Deimos', size: 0.6, dist: 14.5, speed: 2.2, color: 0x78716c }
    ]
  },
  {
    id: 'jupiter',
    order: 5,
    name: 'Jupiter',
    vnName: 'Sao Mộc',
    symbol: '♃',
    size: 18.5,
    a: 350.0,
    speed: 0.013,
    color: 0xfbbf24,
    glowColor: 0xd97706,
    textureFile: './planets/jupiter.jpg',
    title: 'Đại Khí Vương — Khiên Chắn Hấp Dẫn (King of Gas Giants)',
    headline: 'Hành tinh khí khổng lồ lớn nhất Hệ Mặt Trời với Vết Đỏ Lớn trường tồn hàng thế kỷ, hoạt động như một lá chắn hấp dẫn bảo vệ các hành tinh phía trong khỏi thiên thạch.',
    telemetry: {
      a: '5.20 AU',
      v: '13.1 km/s',
      t: '11.86 Năm',
      e: '0.0484',
      moons: '95 (4 Vệ tinh Galilean)',
      inc: '1.30°'
    },
    hasRings: true,
    hasAtmosphere: true,
    memberId: 'truong-dinh-duy-phuoc',
    memberName: 'Trương Đình Duy Phước',
    memberRole: 'Creative Developer',
    moons: [
      { name: 'Io', size: 1.5, dist: 28.0, speed: 2.8, color: 0xfacc15 },
      { name: 'Europa', size: 1.3, dist: 35.0, speed: 2.2, color: 0xe0f2fe },
      { name: 'Ganymede', size: 1.8, dist: 44.0, speed: 1.7, color: 0xd6d3d1 },
      { name: 'Callisto', size: 1.6, dist: 54.0, speed: 1.2, color: 0x94a3b8 }
    ]
  },
  {
    id: 'saturn',
    order: 6,
    name: 'Saturn',
    vnName: 'Sao Thổ',
    symbol: '♄',
    size: 15.5,
    a: 450.0,
    speed: 0.0097,
    color: 0xfde68a,
    glowColor: 0xb45309,
    textureFile: './planets/saturn.jpg',
    title: 'Tuyệt Tác Vành Đai Vũ Trụ (The Ringed Jewel)',
    headline: 'Tuyệt tác vũ trụ với hệ vành đai băng đá kỳ vĩ nhất dải Ngân Hà và vệ tinh Titan sở hữu bầu khí quyển nguyên sơ dày đặc chứa hồ hydrocacbon lỏng.',
    telemetry: {
      a: '9.58 AU',
      v: '9.7 km/s',
      t: '29.45 Năm',
      e: '0.0541',
      moons: '146 (Vệ tinh Titan)',
      inc: '2.49°'
    },
    hasRings: true,
    ringInner: 21.0,
    ringOuter: 39.0,
    hasAtmosphere: true,
    memberId: 'phan-pham-thanh-tam',
    memberName: 'Phan Phạm Thành Tâm',
    memberRole: 'Backend & Data Engineer',
    moons: [
      { name: 'Titan', size: 1.9, dist: 48.0, speed: 1.4, color: 0xf59e0b }
    ]
  },
  {
    id: 'uranus',
    order: 7,
    name: 'Uranus',
    vnName: 'Sao Thiên Vương',
    symbol: '♅',
    size: 10.5,
    a: 550.0,
    speed: 0.0068,
    color: 0x67e8f9,
    glowColor: 0x0891b2,
    textureFile: './planets/uranus.jpg',
    title: 'Hành Tinh Băng Nghiêng Quỹ Đạo (The Sideways Giant)',
    headline: 'Khổng lồ băng với trục tự quay nghiêng gần 98 độ độc nhất vô nhị, quay như một quả bóng lăn trên mặt phẳng quỹ đạo với màu xanh ngọc lục bảo.',
    telemetry: {
      a: '19.22 AU',
      v: '6.8 km/s',
      t: '84.0 Năm',
      e: '0.0472',
      moons: '28 (Titania & Oberon)',
      inc: '0.77°'
    },
    hasRings: true,
    ringInner: 14.0,
    ringOuter: 22.0,
    hasAtmosphere: true,
    memberId: null,
    memberName: null,
    memberRole: null
  },
  {
    id: 'neptune',
    order: 8,
    name: 'Neptune',
    vnName: 'Sao Hải Vương',
    symbol: '♆',
    size: 10.0,
    a: 650.0,
    speed: 0.0054,
    color: 0x3b82f6,
    glowColor: 0x1d4ed8,
    textureFile: './planets/neptune.jpg',
    title: 'Đại Dương Lam Bão Tố (Stormy Blue Giant)',
    headline: 'Hành tinh xa nhất trong các hành tinh chính với màu xanh cô-ban quyến rũ và những cơn bão siêu thanh mạnh nhất Hệ Mặt Trời vượt ngưỡng 2.100 km/h.',
    telemetry: {
      a: '30.05 AU',
      v: '5.4 km/s',
      t: '164.8 Năm',
      e: '0.0086',
      moons: '16 (Vệ tinh Triton)',
      inc: '1.77°'
    },
    hasRings: true,
    ringInner: 13.0,
    ringOuter: 18.0,
    hasAtmosphere: true,
    memberId: null,
    memberName: null,
    memberRole: null,
    moons: [
      { name: 'Triton', size: 1.4, dist: 24.0, speed: -1.8, color: 0xbfdbfe }
    ]
  },
  {
    id: 'pluto',
    order: 9,
    name: 'Pluto',
    vnName: 'Sao Diêm Vương',
    symbol: '♇',
    size: 3.8,
    a: 740.0,
    speed: 0.0047,
    color: 0xc2410c,
    glowColor: 0xea580c,
    textureFile: './planets/pluto.jpg',
    title: 'Cửa Ngõ Vành Đai Kuiper (Pluto Gateway)',
    headline: 'Hành tinh lùn huyền thoại tại rìa ngoài Hệ Mặt Trời với sông băng hình trái tim Tombaugh Regio, cửa ngõ mở ra không gian sâu thẳm của dải Ngân Hà.',
    telemetry: {
      a: '39.48 AU',
      v: '4.7 km/s',
      t: '248.0 Năm',
      e: '0.2488',
      moons: '5 (Vệ tinh Charon)',
      inc: '17.16°'
    },
    hasRings: false,
    hasAtmosphere: false,
    memberId: null,
    memberName: null,
    memberRole: null,
    moons: [
      { name: 'Charon', size: 1.2, dist: 9.0, speed: 1.6, color: 0xa8a29e }
    ]
  }
];

// ============================================================================
// 2. TẠO ÂM THANH KHÔNG GIAN (WEB AUDIO API PROCEDURAL SYNTH)
// ============================================================================
class SpaceAudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambienceGain = null;
    this.hasStarted = false;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startAmbience() {
    if (this.hasStarted || this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.hasStarted = true;

    try {
      this.ambienceGain = this.ctx.createGain();
      this.ambienceGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.ambienceGain.connect(this.ctx.destination);

      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110, this.ctx.currentTime);

      osc1.connect(this.ambienceGain);
      osc2.connect(this.ambienceGain);

      osc1.start();
      osc2.start();
    } catch (_) {}
  }

  playCelestialChime(freq = 440) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.35);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch (_) {}
  }

  playWarpSound() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.6);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch (_) {}
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.ambienceGain && this.ctx) {
      this.ambienceGain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

const audio = new SpaceAudioSystem();

function normalizeText(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

// ============================================================================
// 3. CACHED DOM ELEMENTS
// ============================================================================
const dom = {
  canvas: document.getElementById('webglCanvas'),
  hudOverlay: document.getElementById('hudOverlay'),
  labelsContainer: document.getElementById('spatialLabels'),
  detailPanel: document.getElementById('spatialDetailPanel'),
  panelCloseBtn: document.getElementById('panelCloseBtn'),
  panelMemberSeq: document.getElementById('panelMemberSeq'),
  panelMemberName: document.getElementById('panelMemberName'),
  panelMemberRole: document.getElementById('panelMemberRole'),
  panelMemberHeadline: document.getElementById('panelMemberHeadline'),
  panelTagsList: document.getElementById('panelTagsList'),
  panelPortfolioLink: document.getElementById('panelPortfolioLink'),
  panelGithubLink: document.getElementById('panelGithubLink'),
  telemetryA: document.getElementById('telemetryA'),
  telemetryV: document.getElementById('telemetryV'),
  telemetryT: document.getElementById('telemetryT'),
  telemetryE: document.getElementById('telemetryE'),
  telemetryMoons: document.getElementById('telemetryMoons'),
  telemetryInc: document.getElementById('telemetryInc'),
  currentFocusReadout: document.getElementById('currentFocusReadout'),
  searchInput: document.getElementById('spatialSearchInput'),
  searchClearBtn: document.getElementById('spatialSearchClearBtn'),
  searchStatus: document.getElementById('spatialSearchStatus'),
  searchEmpty: document.getElementById('spatialSearchEmpty'),
  navPillsContainer: document.getElementById('spatialNavPills'),
  btnModeOrbit: document.getElementById('btnModeOrbit'),
  btnModeWarp: document.getElementById('btnModeWarp'),
  btnAudioToggle: document.getElementById('btnAudioToggle'),
  audioStatusText: document.getElementById('audioStatusText'),
  btnResetOrbit: document.getElementById('btnResetOrbit'),
  btnZoomIn: document.getElementById('btnZoomIn'),
  btnZoomOut: document.getElementById('btnZoomOut'),
  btnZoomReset: document.getElementById('btnZoomReset')
};

// ============================================================================
// 4. BỘ SINH VẬT LIỆU PROCEDURAL VECTOR 2048x1024 (SIÊU MỊN, ZERO PIXEL)
// ============================================================================
function createSmoothVectorTexture(id, baseHex, glowHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const bCol = new THREE.Color(baseHex);
  const gCol = new THREE.Color(glowHex);

  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, `rgb(${Math.round(gCol.r * 255)}, ${Math.round(gCol.g * 255)}, ${Math.round(gCol.b * 255)})`);
  grad.addColorStop(0.5, `rgb(${Math.round(bCol.r * 255)}, ${Math.round(bCol.g * 255)}, ${Math.round(bCol.b * 255)})`);
  grad.addColorStop(1, `rgb(${Math.round(gCol.r * 255)}, ${Math.round(gCol.g * 255)}, ${Math.round(gCol.b * 255)})`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 1024);

  if (id === 'earth') {
    ctx.fillStyle = '#0f3a8a';
    ctx.fillRect(0, 0, 2048, 1024);
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(1100, 420, 340, 220, 0.2, 0, Math.PI * 2);
    ctx.ellipse(1260, 680, 240, 270, -0.1, 0, Math.PI * 2);
    ctx.ellipse(450, 380, 190, 250, -0.3, 0, Math.PI * 2);
    ctx.ellipse(590, 720, 170, 270, 0.2, 0, Math.PI * 2);
    ctx.ellipse(1560, 750, 150, 120, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 2048, 80);
    ctx.fillRect(0, 944, 2048, 80);
  } else if (id === 'jupiter') {
    for (let i = 0; i < 32; i++) {
      const y = (i / 32) * 1024;
      const h = 1024 / 32;
      ctx.fillStyle = i % 2 === 0 ? '#fde68a' : '#d97706';
      ctx.fillRect(0, y, 2048, h);
    }
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.ellipse(1350, 680, 120, 75, 0.08, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

function createStellarGemTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  // Lõi tròn phát sáng Gaussian
  const radGrad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  radGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  radGrad.addColorStop(0.18, 'rgba(224, 242, 254, 0.95)');
  radGrad.addColorStop(0.45, 'rgba(147, 197, 253, 0.4)');
  radGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, 128, 128);

  // Tia sáng 4 cánh phong cách kính viễn vọng không gian (Diffraction Spikes)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(64, 10);
  ctx.lineTo(64, 118);
  ctx.moveTo(10, 64);
  ctx.lineTo(118, 64);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createGaussianStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
  grad.addColorStop(0.25, 'rgba(224, 242, 254, 0.85)');
  grad.addColorStop(0.55, 'rgba(186, 230, 253, 0.35)');
  grad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSaturnRingsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0.00, 'rgba(251, 191, 36, 0.05)');
  grad.addColorStop(0.18, 'rgba(251, 191, 36, 0.80)');
  grad.addColorStop(0.52, 'rgba(254, 240, 138, 0.98)');
  grad.addColorStop(0.58, 'rgba(0, 0, 0, 0.00)'); // Rãnh Cassini Gap
  grad.addColorStop(0.66, 'rgba(0, 0, 0, 0.00)');
  grad.addColorStop(0.70, 'rgba(253, 230, 138, 0.88)');
  grad.addColorStop(0.95, 'rgba(251, 191, 36, 0.65)');
  grad.addColorStop(1.00, 'rgba(0, 0, 0, 0.00)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

// ============================================================================
// 5. MASTER 3D UNIVERSE ENGINE
// ============================================================================
class MilkyWaySolarSystemEngine {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.planets = [];
    this.planetMeshes = new Map();
    this.orbitLines = [];
    this.sunMesh = null;

    this.focusedPlanet = null;
    this.isWarpMode = false;
    this.warpSpeed = 0;
    this.targetFOV = 48;

    // Vectors
    this.tempVecA = new THREE.Vector3();
    this.tempVecB = new THREE.Vector3();
    this.lastTargetPos = new THREE.Vector3();
    this.camFollowOffset = new THREE.Vector3(0, 40, 90);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1000, -1000);

    this.arLabels = new Map();
    this.clock = new THREE.Clock();
    this.textureLoader = new THREE.TextureLoader();

    // Camera-attached objects
    this.cameraFillLight = null;
    this.warpTunnelGroup = null;
    this.warpStreakPositions = null;
    this.warpStreakGeom = null;
    this.warpTunnelLines = null;
  }

  init() {
    if (!dom.canvas) return;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060919);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 1.0, 5000);
    this.camera.position.set(0, 260, 520);
    this.scene.add(this.camera);

    // 3. WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: dom.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.45;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Controls (Smooth Damping & 100% Free Mouse Zoom)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.055;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 1.15;
    this.controls.minDistance = 8.0;
    this.controls.maxDistance = 1800;
    this.controls.target.set(0, 0, 0);

    // 5. Hệ Thống Ánh Sáng Vũ Trụ Rực Rỡ (Dual Illumination)
    // a. Nguồn sáng Mặt Trời trung tâm (PointLight tỏa ra toàn hệ)
    const sunLight = new THREE.PointLight(0xfffbeb, 6.0, 0, 0);
    sunLight.position.set(0, 0, 0);
    this.scene.add(sunLight);

    // b. Nguồn sáng Headlight gắn kèm Camera (Chiếu sáng mặt đối diện người quan sát)
    this.cameraFillLight = new THREE.DirectionalLight(0xffffff, 2.2);
    this.cameraFillLight.position.set(0, 0, 1);
    this.camera.add(this.cameraFillLight);

    // c. Ánh sáng môi trường vũ trụ (Ambient Starlight)
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.8);
    this.scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffedd5, 0x1e1b4b, 1.4);
    this.scene.add(hemiLight);

    // 6. Xây dựng môi trường vũ trụ
    this.buildCosmicNebulaSkybox();
    this.buildMultiTierStarfield();
    this.buildTheSun();
    this.buildPlanetsAndOrbits();
    this.buildAsteroidBelt();
    this.buildCameraWarpTunnel();

    // 7. Giao diện HUD và sự kiện
    this.buildHUDNavigationPills();
    this.setupEventListeners();

    // 8. Bắt đầu vòng lặp render
    this.animate();
  }

  /**
   * Bầu trời sâu dải Ngân Hà (Cosmic Nebula Skybox) — Mượt mà, đa sắc, không vỡ hạt
   */
  buildCosmicNebulaSkybox() {
    const skyGeom = new THREE.SphereGeometry(2200, 48, 48);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec3 dir = normalize(vWorldPosition);
          float y = dir.y * 0.5 + 0.5;

          vec3 deepSpace = vec3(0.04, 0.06, 0.15); // Xanh đen vũ trụ sâu thẳm
          vec3 purpleNebula = vec3(0.28, 0.08, 0.48); // Tím dải Ngân Hà
          vec3 radiantMagenta = vec3(0.52, 0.10, 0.55); // Hồng ngọc tinh vân
          vec3 brightCyan = vec3(0.04, 0.45, 0.75); // Lam viễn thám
          vec3 goldenDust = vec3(0.65, 0.45, 0.12); // Bụi vàng sao trung tâm

          float phaseA = sin(dir.x * 2.5 + dir.z * 1.8) * 0.5 + 0.5;
          float phaseB = cos(dir.z * 3.0 - dir.y * 2.2) * 0.5 + 0.5;

          vec3 col = mix(deepSpace, purpleNebula, phaseA * 0.65);
          col = mix(col, radiantMagenta, pow(phaseB * y, 2.0) * 0.55);
          col += brightCyan * pow(max(0.0, sin(dir.z * 1.5 + dir.x * 1.2)), 3.5) * 0.45;
          col += goldenDust * pow(max(0.0, 1.0 - abs(dir.y)), 6.0) * 0.35; // Vành đĩa Ngân Hà

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });

    const skyMesh = new THREE.Mesh(skyGeom, skyMat);
    this.scene.add(skyMesh);
  }

  /**
   * Trường sao đa tầng khử răng cưa (Multi-tier Anti-Aliased Starfield)
   * Tuyệt đối không bị vỡ hạt hay giật pixel
   */
  buildMultiTierStarfield() {
    // 1. Tầng 1: 160 Đại Tinh Tú rực rỡ có tia sáng 4 cánh (Stellar Gems)
    const gemCount = 160;
    const gemGeom = new THREE.BufferGeometry();
    const gemPos = new Float32Array(gemCount * 3);
    const gemColors = new Float32Array(gemCount * 3);

    const gemPalette = [
      new THREE.Color(0x38bdf8), // Lam sáng
      new THREE.Color(0xffffff), // Trắng tinh
      new THREE.Color(0xfef08a), // Hoàng kim
      new THREE.Color(0xf472b6)  // Hồng thạch
    ];

    for (let i = 0; i < gemCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 900 + Math.random() * 800;

      gemPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      gemPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      gemPos[i * 3 + 2] = r * Math.cos(phi);

      const c = gemPalette[Math.floor(Math.random() * gemPalette.length)];
      gemColors[i * 3] = c.r;
      gemColors[i * 3 + 1] = c.g;
      gemColors[i * 3 + 2] = c.b;
    }
    gemGeom.setAttribute('position', new THREE.BufferAttribute(gemPos, 3));
    gemGeom.setAttribute('color', new THREE.BufferAttribute(gemColors, 3));

    const gemMat = new THREE.PointsMaterial({
      size: 26.0,
      map: createStellarGemTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    this.scene.add(new THREE.Points(gemGeom, gemMat));

    // 2. Tầng 2: 1.600 Tinh Cầu phát sáng Gaussian mềm mại
    const midCount = 1600;
    const midGeom = new THREE.BufferGeometry();
    const midPos = new Float32Array(midCount * 3);
    const midColors = new Float32Array(midCount * 3);

    for (let i = 0; i < midCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 850 + Math.random() * 950;

      midPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      midPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      midPos[i * 3 + 2] = r * Math.cos(phi);

      const c = gemPalette[Math.floor(Math.random() * gemPalette.length)];
      midColors[i * 3] = c.r;
      midColors[i * 3 + 1] = c.g;
      midColors[i * 3 + 2] = c.b;
    }
    midGeom.setAttribute('position', new THREE.BufferAttribute(midPos, 3));
    midGeom.setAttribute('color', new THREE.BufferAttribute(midColors, 3));

    const midMat = new THREE.PointsMaterial({
      size: 10.0,
      map: createGaussianStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    this.scene.add(new THREE.Points(midGeom, midMat));

    // 3. Tầng 3: 7.500 Hạt bụi tinh vân xa xăm khử răng cưa
    const dustCount = 7500;
    const dustGeom = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 800 + Math.random() * 1100;

      dustPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPos[i * 3 + 2] = r * Math.cos(phi);
    }
    dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 4.5,
      map: createGaussianStarTexture(),
      color: 0xbae6fd,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: false
    });
    this.scene.add(new THREE.Points(dustGeom, dustMat));
  }

  /**
   * Mặt Trời trung tâm bề thế, tỏa sáng lộng lẫy (NASA Sun Texture + Coronal Flares)
   */
  buildTheSun() {
    const sunGeom = new THREE.SphereGeometry(24.0, 96, 96);
    const fallbackTex = createSmoothVectorTexture('sun', 0xffb703, 0xfb8500);

    const sunMat = new THREE.MeshBasicMaterial({
      map: fallbackTex,
      color: 0xffffff
    });

    this.sunMesh = new THREE.Mesh(sunGeom, sunMat);
    this.sunMesh.userData = { isPlanet: true, data: SOLAR_SYSTEM_DATA[0] };
    this.scene.add(this.sunMesh);

    // Tải ảnh thực tế NASA từ thư mục public/planets/sun.jpg
    this.textureLoader.load('./planets/sun.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      sunMat.map = tex;
      sunMat.needsUpdate = true;
    });

    // Vầng hào quang nhật hoa đa tầng (Additive Corona Halo Sprites)
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 256;
    haloCanvas.height = 256;
    const hCtx = haloCanvas.getContext('2d');
    const hGrad = hCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    hGrad.addColorStop(0.0, 'rgba(255, 245, 210, 0.98)');
    hGrad.addColorStop(0.28, 'rgba(251, 146, 60, 0.70)');
    hGrad.addColorStop(0.60, 'rgba(234, 88, 12, 0.30)');
    hGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    hCtx.fillStyle = hGrad;
    hCtx.fillRect(0, 0, 256, 256);

    const haloTex = new THREE.CanvasTexture(haloCanvas);
    const haloMatA = new THREE.SpriteMaterial({
      map: haloTex,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const spriteA = new THREE.Sprite(haloMatA);
    spriteA.scale.set(90, 90, 1);
    this.sunMesh.add(spriteA);

    const haloMatB = new THREE.SpriteMaterial({
      map: haloTex,
      color: 0xfb923c,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const spriteB = new THREE.Sprite(haloMatB);
    spriteB.scale.set(140, 140, 1);
    this.sunMesh.add(spriteB);

    this.planetMeshes.set('sun', this.sunMesh);
    this.createARLabel(SOLAR_SYSTEM_DATA[0], this.sunMesh);
  }

  /**
   * Xây dựng 8 Hành tinh + Diêm Vương tinh kích thước lớn, sáng rõ và sắc nét
   */
  buildPlanetsAndOrbits() {
    SOLAR_SYSTEM_DATA.forEach((data) => {
      if (data.isStar) return;

      // 1. Quỹ đạo thiên văn
      const orbitPoints = [];
      const segments = 320;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        orbitPoints.push(new THREE.Vector3(Math.cos(theta) * data.a, 0, Math.sin(theta) * data.a));
      }
      const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x64748b,
        transparent: true,
        opacity: 0.45
      });
      const orbitLine = new THREE.Line(orbitGeom, orbitMat);
      this.scene.add(orbitLine);
      this.orbitLines.push(orbitLine);

      // 2. Nhóm trục quỹ đạo
      const orbitGroup = new THREE.Group();
      this.scene.add(orbitGroup);

      // 3. Khối cầu hành tinh kích thước lớn, vật liệu PBR sắc nét rực rỡ
      const planetGeom = new THREE.SphereGeometry(data.size, 96, 96);
      const fallbackTex = createSmoothVectorTexture(data.id, data.color, data.glowColor);

      const planetMat = new THREE.MeshStandardMaterial({
        map: fallbackTex,
        roughness: 0.35,
        metalness: 0.05,
        emissive: new THREE.Color(data.color).multiplyScalar(0.25) // Mặt khuất luôn sáng bừng màu sắc
      });

      const planetMesh = new THREE.Mesh(planetGeom, planetMat);
      planetMesh.position.set(data.a, 0, 0);
      planetMesh.userData = { isPlanet: true, data };
      orbitGroup.add(planetMesh);

      // Nạp ảnh chụp NASA thực tế từ thư mục public/planets/
      if (data.textureFile) {
        this.textureLoader.load(data.textureFile, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = true;
          planetMat.map = tex;
          planetMat.needsUpdate = true;
        });
      }

      // 4. Lớp mây & Hào quang Rayleigh cho Trái Đất
      if (data.id === 'earth') {
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.05, 64, 64);
        const atmoMat = new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
              gl_FragColor = vec4(0.25, 0.70, 1.0, intensity * 0.95);
            }
          `,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false
        });
        const atmoMesh = new THREE.Mesh(atmoGeom, atmoMat);
        planetMesh.add(atmoMesh);
      }

      // 5. Vành đai Thổ tinh (Saturn Rings) khổng lồ, chi tiết
      if (data.hasRings && data.id === 'saturn') {
        const ringGeom = new THREE.RingGeometry(data.ringInner, data.ringOuter, 256, 1);
        const ringTex = createSaturnRingsTexture();
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.98,
          roughness: 0.35,
          emissive: new THREE.Color(0xfbbf24).multiplyScalar(0.20)
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.rotation.x = Math.PI * 0.45;
        ringMesh.rotation.y = -0.15;
        planetMesh.add(ringMesh);
      }

      // 6. Vệ tinh tự nhiên (Moons)
      if (data.moons && data.moons.length > 0) {
        data.moons.forEach((m) => {
          const moonGeom = new THREE.SphereGeometry(m.size, 32, 32);
          const moonMat = new THREE.MeshStandardMaterial({
            color: m.color,
            roughness: 0.65,
            emissive: new THREE.Color(m.color).multiplyScalar(0.20)
          });
          const moonMesh = new THREE.Mesh(moonGeom, moonMat);
          moonMesh.position.set(m.dist, 0, 0);

          const moonPivot = new THREE.Group();
          moonPivot.add(moonMesh);
          moonPivot.userData = { speed: m.speed };
          planetMesh.add(moonPivot);
        });
      }

      this.planets.push({
        data,
        group: orbitGroup,
        mesh: planetMesh,
        angle: Math.random() * Math.PI * 2
      });

      this.planetMeshes.set(data.id, planetMesh);
      this.createARLabel(data, planetMesh);
    });
  }

  /**
   * Vành đai 1.800 tiểu hành tinh kim loại (Asteroid Belt)
   */
  buildAsteroidBelt() {
    const asteroidCount = 1800;
    const geom = new THREE.DodecahedronGeometry(0.45, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.7,
      metalness: 0.25,
      emissive: new THREE.Color(0x475569).multiplyScalar(0.25)
    });

    const instancedMesh = new THREE.InstancedMesh(geom, mat, asteroidCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < asteroidCount; i++) {
      const angle = (i / asteroidCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const radius = 270.0 + (Math.random() - 0.5) * 35.0; // Giữa Hỏa tinh (220.0) và Mộc tinh (350.0)
      const height = (Math.random() - 0.5) * 7.5;

      dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      const scale = 0.8 + Math.random() * 2.0;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(instancedMesh);
  }

  /**
   * Đường hầm Hyper-Warp gắn trực tiếp vào Camera — Vệt sáng lượng tử lao vút
   */
  buildCameraWarpTunnel() {
    const streakCount = 800;
    this.warpStreakPositions = new Float32Array(streakCount * 6);

    for (let i = 0; i < streakCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 15.0 + Math.random() * 110.0;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -Math.random() * 600.0;
      const len = 40.0 + Math.random() * 60.0;

      this.warpStreakPositions[i * 6] = x;
      this.warpStreakPositions[i * 6 + 1] = y;
      this.warpStreakPositions[i * 6 + 2] = z;

      this.warpStreakPositions[i * 6 + 3] = x;
      this.warpStreakPositions[i * 6 + 4] = y;
      this.warpStreakPositions[i * 6 + 5] = z + len;
    }

    this.warpStreakGeom = new THREE.BufferGeometry();
    this.warpStreakGeom.setAttribute('position', new THREE.BufferAttribute(this.warpStreakPositions, 3));

    const warpMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending
    });

    this.warpTunnelLines = new THREE.LineSegments(this.warpStreakGeom, warpMat);
    this.warpTunnelGroup = new THREE.Group();
    this.warpTunnelGroup.add(this.warpTunnelLines);
    this.camera.add(this.warpTunnelGroup);
  }

  /**
   * Nhãn AR vi mô tinh tế (Micro Floating Badges) — Chữ nhỏ gọn, không che khuất hành tinh
   */
  createARLabel(data, mesh) {
    const labelEl = document.createElement('div');
    labelEl.className = 'spatial-ar-label';
    labelEl.setAttribute('data-id', data.id);

    labelEl.innerHTML = `
      <div class="ar-label-marker">
        <span class="ar-label-symbol">${data.symbol}</span>
        <span class="ar-label-name">${data.name}</span>
      </div>
    `;

    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.focusPlanet(data.id);
    });

    dom.labelsContainer.appendChild(labelEl);
    this.arLabels.set(data.id, { el: labelEl, mesh });
  }

  /**
   * Cập nhật vị trí nhãn 2D với cơ chế Occlusion
   */
  updateARLabels() {
    this.arLabels.forEach(({ el, mesh }) => {
      mesh.getWorldPosition(this.tempVecA);
      const rad = mesh.geometry && mesh.geometry.parameters ? mesh.geometry.parameters.radius : 4.0;
      this.tempVecA.y += rad + 4.5; // Neo ngay trên đỉnh vành đai hành tinh

      this.tempVecA.project(this.camera);

      // Nếu nằm sau camera thì ẩn
      if (this.tempVecA.z > 1.0) {
        el.style.opacity = '0';
        return;
      }

      const x = (this.tempVecA.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(this.tempVecA.y * 0.5) + 0.5) * window.innerHeight;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.opacity = '1';
    });
  }

  /**
   * Nút điều hướng quỹ đạo dưới chân trang
   */
  buildHUDNavigationPills() {
    if (!dom.navPillsContainer) return;
    dom.navPillsContainer.innerHTML = '';

    SOLAR_SYSTEM_DATA.forEach((data) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'orbit-pill font-mono';
      pill.setAttribute('data-id', data.id);

      const memberBadge = data.memberName ? ` • ${data.memberName.split(' ').pop()}` : '';

      pill.innerHTML = `
        <span class="pill-symbol">${data.symbol}</span>
        <span class="pill-name">${data.name}${memberBadge}</span>
      `;

      pill.addEventListener('click', () => {
        this.focusPlanet(data.id);
      });

      dom.navPillsContainer.appendChild(pill);
    });
  }

  /**
   * Thu phóng camera mượt mà qua các nút điều khiển HUD
   */
  zoom(factor) {
    const camToTarget = this.tempVecA.copy(this.camera.position).sub(this.controls.target);
    const currentDist = camToTarget.length();
    const newDist = THREE.MathUtils.clamp(currentDist * factor, this.controls.minDistance, this.controls.maxDistance);

    camToTarget.setLength(newDist);
    this.camera.position.copy(this.controls.target).add(camToTarget);
    this.controls.update();
  }

  /**
   * Tiếp cận hành tinh (Orbit Lock) — HOÀN TOÀN KHÔNG KHÓA ZOOM CUỘN CHUỘT
   */
  focusPlanet(id) {
    const data = SOLAR_SYSTEM_DATA.find((p) => p.id === id);
    if (!data) return;

    this.focusedPlanet = data;

    audio.playWarpSound();
    audio.playCelestialChime(data.isStar ? 587 : 440 + data.order * 35);

    if (dom.currentFocusReadout) {
      dom.currentFocusReadout.textContent = `TARGET LOCKED // ${data.symbol} ${data.name.toUpperCase()} (${data.vnName.toUpperCase()})`;
    }

    document.querySelectorAll('.orbit-pill').forEach((pill) => {
      pill.classList.toggle('active-pill', pill.getAttribute('data-id') === id);
    });

    const mesh = this.planetMeshes.get(id);
    if (mesh) {
      mesh.getWorldPosition(this.lastTargetPos);
      this.controls.target.copy(this.lastTargetPos);

      // Khoảng cách camera tối ưu cho từng hành tinh lớn
      const dist = data.isStar ? 65.0 : data.size * 3.4 + 14.0;
      this.camFollowOffset.set(dist * 0.7, dist * 0.35, dist * 0.85);

      this.camera.position.copy(this.lastTargetPos).add(this.camFollowOffset);
      this.controls.update();
    }

    // Nếu đang bật Hyper-Warp, kích hoạt vệt phóng lượng tử
    if (this.isWarpMode && this.warpTunnelLines) {
      this.warpTunnelLines.material.opacity = 0.95;
      this.targetFOV = 85;

      setTimeout(() => {
        if (!this.isWarpMode && this.warpTunnelLines) {
          this.warpTunnelLines.material.opacity = 0.0;
        }
        this.targetFOV = 48;
      }, 750);
    }

    this.openDetailPanel(data);
  }

  /**
   * Mở bảng chi tiết thiên văn & thành viên UTH
   */
  openDetailPanel(data) {
    if (!dom.detailPanel) return;
    dom.detailPanel.hidden = false;
    dom.detailPanel.classList.add('panel-active');

    const mem = MEMBERS_DATA.find((m) => m.id === data.memberId);

    if (dom.panelMemberSeq) {
      dom.panelMemberSeq.textContent = mem
        ? `${mem.seq} // ${data.name.toUpperCase()}`
        : `SOLAR SYSTEM // ${data.name.toUpperCase()} (${data.symbol})`;
    }

    if (dom.panelMemberName) {
      dom.panelMemberName.textContent = mem ? mem.name : data.title;
    }

    if (dom.panelMemberRole) {
      dom.panelMemberRole.textContent = mem ? mem.role : `Thiên Thể Hệ Mặt Trời (Dải Ngân Hà)`;
    }

    if (dom.panelMemberHeadline) {
      dom.panelMemberHeadline.textContent = data.headline;
    }

    const monogram = document.getElementById('panelMonogram');
    if (monogram) {
      monogram.textContent = data.symbol;
    }

    if (dom.telemetryA) dom.telemetryA.textContent = data.telemetry.a;
    if (dom.telemetryV) dom.telemetryV.textContent = data.telemetry.v;
    if (dom.telemetryT) dom.telemetryT.textContent = data.telemetry.t;
    if (dom.telemetryE) dom.telemetryE.textContent = data.telemetry.e;
    if (dom.telemetryMoons) dom.telemetryMoons.textContent = data.telemetry.moons;
    if (dom.telemetryInc) dom.telemetryInc.textContent = data.telemetry.inc;

    if (dom.panelPortfolioLink) {
      if (data.memberId) {
        dom.panelPortfolioLink.hidden = false;
        if (mem && mem.portfolio) {
          dom.panelPortfolioLink.href = mem.portfolio;
          dom.panelPortfolioLink.textContent = `TIẾN VÀO PORTFOLIO 3D (${mem.name.split(' ').pop()}) ↗`;
        }
      } else {
        dom.panelPortfolioLink.hidden = true;
      }
    }

    if (dom.panelGithubLink) {
      if (mem && mem.github) {
        dom.panelGithubLink.hidden = false;
        dom.panelGithubLink.href = mem.github;
      } else {
        dom.panelGithubLink.hidden = true;
      }
    }

    if (dom.panelTagsList) {
      dom.panelTagsList.innerHTML = '';
      const tags = mem ? mem.tags : ['NASA Observation', 'Astrophysics', 'Orbital Mechanics', 'Milky Way'];
      tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'panel-skill-tag font-mono';
        span.textContent = tag;
        dom.panelTagsList.appendChild(span);
      });
    }
  }

  /**
   * Trở về góc nhìn toàn cảnh Hệ Mặt Trời (Overview Orbit)
   */
  resetToOverview() {
    this.focusedPlanet = null;

    if (dom.currentFocusReadout) {
      dom.currentFocusReadout.textContent = `SECTOR: MILKY WAY // SOLAR SYSTEM OVERVIEW`;
    }

    document.querySelectorAll('.orbit-pill').forEach((p) => p.classList.remove('active-pill'));

    this.controls.target.set(0, 0, 0);
    this.camera.position.set(0, 260, 520);
    this.controls.update();

    if (dom.detailPanel) {
      dom.detailPanel.hidden = true;
      dom.detailPanel.classList.remove('panel-active');
    }
  }

  /**
   * Vòng lặp Render 60 FPS — Độc lập Zoom chuột & Bám quỹ đạo mượt mà
   */
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = this.clock.getDelta();

    // 1. Tự quay Mặt Trời
    if (this.sunMesh) {
      this.sunMesh.rotation.y += dt * 0.04;
    }

    // 2. Chuyển động quỹ đạo các hành tinh
    this.planets.forEach((p) => {
      p.angle += dt * p.data.speed * 0.5;
      const x = Math.cos(p.angle) * p.data.a;
      const z = Math.sin(p.angle) * p.data.a;
      p.mesh.position.set(x, 0, z);

      p.mesh.rotation.y += dt * 0.35;

      // Vệ tinh tự quay
      p.mesh.children.forEach((child) => {
        if (child.userData && child.userData.speed) {
          child.rotation.y += dt * child.userData.speed;
        }
      });
    });

    // 3. Theo dõi hành tinh được chọn MÀ KHÔNG GÂY LỖI ZOOM CUỘN CHUỘT
    if (this.focusedPlanet) {
      const mesh = this.planetMeshes.get(this.focusedPlanet.id);
      if (mesh) {
        mesh.getWorldPosition(this.tempVecA);

        // Tính độ dời vị trí của hành tinh trong frame này
        if (!this.lastTargetPos.equals(this.tempVecA)) {
          this.tempVecB.copy(this.tempVecA).sub(this.lastTargetPos);

          // Áp dụng độ dời cho camera và target (người dùng tự do cuộn chuột / xoay góc!)
          this.camera.position.add(this.tempVecB);
          this.controls.target.copy(this.tempVecA);
          this.lastTargetPos.copy(this.tempVecA);
        }
      }
    }

    // 4. Hiệu ứng đường hầm Hyper-Warp
    if (this.warpStreakPositions && this.warpStreakGeom) {
      if (this.isWarpMode) {
        this.warpSpeed = THREE.MathUtils.lerp(this.warpSpeed, 650, 0.08);
      } else {
        this.warpSpeed = THREE.MathUtils.lerp(this.warpSpeed, 0, 0.12);
      }

      if (this.warpSpeed > 5) {
        const count = this.warpStreakPositions.length / 6;
        for (let i = 0; i < count; i++) {
          this.warpStreakPositions[i * 6 + 2] += dt * this.warpSpeed;
          this.warpStreakPositions[i * 6 + 5] += dt * this.warpSpeed;

          // Khi vệt sáng vượt qua camera, reset về phía sau
          if (this.warpStreakPositions[i * 6 + 2] > 20.0) {
            this.warpStreakPositions[i * 6 + 2] -= 600.0;
            this.warpStreakPositions[i * 6 + 5] -= 600.0;
          }
        }
        this.warpStreakGeom.attributes.position.needsUpdate = true;
      }
    }

    // 5. Mượt mà FOV máy quay
    if (Math.abs(this.camera.fov - this.targetFOV) > 0.1) {
      this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, this.targetFOV, 0.06);
      this.camera.updateProjectionMatrix();
    }

    // 6. Cập nhật Controls
    this.controls.update();

    // 7. Cập nhật nhãn AR
    this.updateARLabels();

    // 8. Render
    this.renderer.render(this.scene, this.camera);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    });

    window.addEventListener('pointerdown', (e) => {
      if (e.target.closest('#hudOverlay') || e.target.closest('.spatial-ar-label') || e.target.closest('#hudZoomControls')) return;

      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(Array.from(this.planetMeshes.values()), true);

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData.isPlanet) {
          obj = obj.parent;
        }
        if (obj && obj.userData.data) {
          this.focusPlanet(obj.userData.data.id);
        }
      }
    });

    if (dom.panelCloseBtn) {
      dom.panelCloseBtn.addEventListener('click', () => this.resetToOverview());
    }

    if (dom.btnResetOrbit) {
      dom.btnResetOrbit.addEventListener('click', () => this.resetToOverview());
    }

    // Nút Zoom HUD
    if (dom.btnZoomIn) {
      dom.btnZoomIn.addEventListener('click', () => this.zoom(0.70));
    }
    if (dom.btnZoomOut) {
      dom.btnZoomOut.addEventListener('click', () => this.zoom(1.35));
    }
    if (dom.btnZoomReset) {
      dom.btnZoomReset.addEventListener('click', () => this.resetToOverview());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.resetToOverview();
      } else if (e.key === '+' || e.key === '=') {
        this.zoom(0.70);
      } else if (e.key === '-' || e.key === '_') {
        this.zoom(1.35);
      } else if (e.key >= '0' && e.key <= '9') {
        const idx = parseInt(e.key, 10);
        if (SOLAR_SYSTEM_DATA[idx]) {
          this.focusPlanet(SOLAR_SYSTEM_DATA[idx].id);
        }
      }
    });

    // Kích hoạt Hyper-Warp
    if (dom.btnModeOrbit && dom.btnModeWarp) {
      dom.btnModeOrbit.addEventListener('click', () => {
        this.isWarpMode = false;
        dom.btnModeOrbit.classList.add('active');
        dom.btnModeWarp.classList.remove('active');
        if (this.warpTunnelLines) {
          this.warpTunnelLines.material.opacity = 0.0;
        }
        this.targetFOV = 48;
      });

      dom.btnModeWarp.addEventListener('click', () => {
        this.isWarpMode = true;
        dom.btnModeWarp.classList.add('active');
        dom.btnModeOrbit.classList.remove('active');
        audio.playWarpSound();

        // Kích hoạt vệt sáng lượng tử & mở rộng FOV
        if (this.warpTunnelLines) {
          this.warpTunnelLines.material.opacity = 0.95;
          this.targetFOV = 85;
        }
      });
    }

    if (dom.btnAudioToggle) {
      dom.btnAudioToggle.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        dom.btnAudioToggle.classList.toggle('audio-muted', isMuted);
        if (dom.audioStatusText) {
          dom.audioStatusText.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
        }
      });
    }

    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        const query = normalizeText(e.target.value.trim().toLowerCase());

        if (dom.searchClearBtn) dom.searchClearBtn.hidden = !query;

        if (!query) {
          document.querySelectorAll('.orbit-pill').forEach((pill) => (pill.hidden = false));
          if (dom.searchEmpty) dom.searchEmpty.hidden = true;
          return;
        }

        let foundCount = 0;
        document.querySelectorAll('.orbit-pill').forEach((pill) => {
          const id = pill.getAttribute('data-id');
          const data = SOLAR_SYSTEM_DATA.find((p) => p.id === id);
          if (!data) return;

          const haystack = normalizeText(`${data.name} ${data.vnName} ${data.memberName || ''} ${data.title} ${data.symbol}`).toLowerCase();
          const isMatch = haystack.includes(query);
          pill.hidden = !isMatch;
          if (isMatch) foundCount++;
        });

        if (dom.searchEmpty) dom.searchEmpty.hidden = foundCount > 0;
      });

      if (dom.searchClearBtn) {
        dom.searchClearBtn.addEventListener('click', () => {
          dom.searchInput.value = '';
          dom.searchInput.dispatchEvent(new Event('input'));
        });
      }
    }

    window.addEventListener('click', () => audio.startAmbience(), { once: true });
    window.addEventListener('keydown', () => audio.startAmbience(), { once: true });
  }
}

// Khởi tạo Engine an toàn bất kể thời điểm script thực thi
function launchEngine() {
  const engine = new MilkyWaySolarSystemEngine();
  engine.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', launchEngine);
} else {
  launchEngine();
}
