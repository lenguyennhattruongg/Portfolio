/**
 * group.js — SNU 3D UNIVERSE: MILKY WAY SOLAR SYSTEM & TECHGROUP.06 CORE
 * Nhóm 06 — Đại học Giao thông Vận tải TP.HCM (UTH)
 *
 * Đồng tham vấn kỹ thuật & giải thuật bởi:
 * 1. Seanpm2001 (SNU 3D Universe Solar System Specification):
 *    https://github.com/seanpm2001/SNU_3D_Universe_MilkyWay_SolarSystem
 * 2. ChatGPT 5.6 Terra (Senior Computer Graphics & WebGL Expert):
 *    - FBM Continuous Plasma Sun Shader
 *    - Rayleigh Atmospheric Scattering Fresnel Rim Glow for Earth
 *    - Anisotropic Radial Saturn Rings with Cassini Gap
 *    - Exponential Time-Damped Kinematic Camera Lerp (1 - exp(-7.5 * dt))
 *    - Sub-Pixel Antialiased Gaussian Starfield
 *    - Zero-Allocation Render Loop & Strict Anti-Grain / Anti-Pixelation Pipeline
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MEMBERS, normalizeText } from './members.data.js';

// ============================================================================
// 1. COSMIC AUDIO ENGINE (THUẦN WEB AUDIO API — ZERO EXTERNAL DEPENDENCIES)
// ============================================================================
class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = localStorage.getItem('cosmic-audio-muted') === 'true';
    this.isAmbienceStarted = false;
  }

  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.isMuted ? 0.0 : 0.28;
    this.masterGain.connect(this.ctx.destination);

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  async startAmbience() {
    await this.init();
    if (!this.ctx || this.isAmbienceStarted) return;
    this.isAmbienceStarted = true;

    const ctx = this.ctx;

    // Dual Sub-Bass Drone (48Hz & 52Hz) mô phỏng từ trường nhật quyển
    const oscA = ctx.createOscillator();
    const oscB = ctx.createOscillator();
    const gainA = ctx.createGain();
    const gainB = ctx.createGain();

    oscA.type = 'sine';
    oscB.type = 'sine';
    oscA.frequency.value = 48.0;
    oscB.frequency.value = 52.0;

    gainA.gain.value = 0.24;
    gainB.gain.value = 0.18;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 160.0;
    filter.Q.value = 1.2;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.04;
    lfoGain.gain.value = 55.0;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    oscA.connect(gainA);
    oscB.connect(gainB);
    gainA.connect(filter);
    gainB.connect(filter);
    filter.connect(this.masterGain);

    oscA.start();
    oscB.start();
    lfo.start();
  }

  playCelestialChime(freq = 440) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.8);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.25);
  }

  playWarpSound() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.9);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.0);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('cosmic-audio-muted', this.isMuted.toString());

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(
        this.isMuted ? 0.0 : 0.28,
        this.ctx.currentTime,
        0.04
      );
    }
    return this.isMuted;
  }
}

const audio = new CosmicAudioEngine();

// ============================================================================
// 2. DỮ LIỆU THIÊN THỂ HỆ MẶT TRỜI CHUẨN THIÊN VĂN (SEANPM2001 SOLAR SYSTEM)
// ============================================================================
const SOLAR_SYSTEM_DATA = [
  {
    id: 'sun',
    order: 0,
    name: 'The Sun',
    vnName: 'Mặt Trời (Thái Dương)',
    symbol: '☉',
    memberId: null,
    isStar: true,
    a: 0,
    period: 25.38,
    speed: 0,
    size: 4.8,
    color: 0xffb703,
    glowColor: 0xfb8500,
    title: 'Lõi Năng Lượng & Điều Phối Hệ Sao',
    headline: 'Trung tâm hấp dẫn của Hệ Mặt Trời, cung cấp năng lượng và định hình toàn bộ không gian quỹ đạo cho các trạm thành viên TechGroup.06.',
    telemetry: {
      a: '0.00 AU',
      v: '0.0 km/s',
      t: '25.38 Ngày (Trục quay)',
      e: '0.0000',
      moons: '8 Hành tinh + Tiểu hành tinh',
      inc: '7.25°'
    },
    hasRings: false,
    hasAtmosphere: true,
    hasClouds: false,
    moons: []
  },
  {
    id: 'mercury',
    order: 1,
    name: 'Mercury',
    vnName: 'Sao Thủy',
    symbol: '☿',
    memberId: 'thu',
    memberName: 'Nguyễn Anh Thư',
    memberRole: 'Quality Assurance & Automated QA',
    a: 10.2,
    period: 87.97,
    speed: 0.45,
    size: 0.88,
    color: 0x94a3b8,
    glowColor: 0x64748b,
    title: 'Trạm Kiểm Thử Tốc Độ Cao (Hermes Outpost)',
    headline: 'Hành tinh gần Mặt Trời nhất với vận tốc quỹ đạo nhanh nhất hệ sao, phụ trách rà soát điều kiện biên, kiểm thử tự động và đảm bảo chất lượng hệ thống.',
    telemetry: {
      a: '0.387 AU',
      v: '47.4 km/s',
      t: '87.97 Ngày',
      e: '0.2056',
      moons: '0',
      inc: '7.00°'
    },
    hasRings: false,
    hasAtmosphere: false,
    hasClouds: false,
    moons: []
  },
  {
    id: 'venus',
    order: 2,
    name: 'Venus',
    vnName: 'Sao Kim',
    symbol: '♀',
    memberId: 'nhu',
    memberName: 'Nguyễn Thị Thảo Như',
    memberRole: 'UI/UX & Micro-interactions',
    a: 15.4,
    period: 224.7,
    speed: 0.34,
    size: 1.25,
    color: 0xfde047,
    glowColor: 0xeab308,
    title: 'Trạm Nghệ Thuật & Thị Giác (Aphrodite Station)',
    headline: 'Hành tinh sáng rực rỡ nhất bầu trời đêm với lớp mây phản quang lộng lẫy, phụ trách thiết kế giao diện, phối màu hài hòa và vi tương tác mượt mà.',
    telemetry: {
      a: '0.723 AU',
      v: '35.0 km/s',
      t: '224.7 Ngày',
      e: '0.0067',
      moons: '0',
      inc: '3.39°'
    },
    hasRings: false,
    hasAtmosphere: true,
    hasClouds: true,
    moons: []
  },
  {
    id: 'earth',
    order: 3,
    name: 'Earth',
    vnName: 'Trái Đất (Địa Cầu)',
    symbol: '⊕',
    memberId: 'truong',
    memberName: 'Lê Nguyễn Nhật Trường',
    memberRole: 'Backend & Systems Engineer (Tuyến Metro UTH)',
    a: 21.5,
    period: 365.25,
    speed: 0.27,
    size: 1.38,
    color: 0x2563eb,
    glowColor: 0x38bdf8,
    title: 'Trạm Trung Tâm Điều Hành & Tuyến Metro UTH',
    headline: 'Hành tinh xanh — cái nôi của sự sống và trạm kết nối hạt nhân của nhóm. Vận hành hệ thống Backend, Java Core, Socket TCP và không gian Portfolio Metro Sài Gòn độc lập.',
    telemetry: {
      a: '1.000 AU',
      v: '29.8 km/s',
      t: '365.25 Ngày',
      e: '0.0167',
      moons: '1 (Mặt Trăng / Luna)',
      inc: '0.00°'
    },
    hasRings: false,
    hasAtmosphere: true,
    hasClouds: true,
    moons: [
      { name: 'Mặt Trăng (Luna)', size: 0.34, dist: 2.8, speed: 1.7, color: 0xe2e8f0 }
    ]
  },
  {
    id: 'mars',
    order: 4,
    name: 'Mars',
    vnName: 'Sao Hỏa',
    symbol: '♂',
    memberId: 'huynh',
    memberName: 'Nguyễn Phạm Y Huỳnh',
    memberRole: 'Data Analytics & Pipelines',
    a: 28.0,
    period: 686.98,
    speed: 0.22,
    size: 1.05,
    color: 0xe11d48,
    glowColor: 0xf43f5e,
    title: 'Trạm Thám Hiểm Dữ Liệu (Ares Outpost)',
    headline: 'Hành tinh đỏ với địa hình hẻm vực kỳ vĩ và chỏm băng địa cực, phụ trách phân tích số liệu, kiến trúc dữ liệu và xử lý thuật toán phân tích.',
    telemetry: {
      a: '1.524 AU',
      v: '24.1 km/s',
      t: '686.98 Ngày',
      e: '0.0934',
      moons: '2 (Phobos, Deimos)',
      inc: '1.85°'
    },
    hasRings: false,
    hasAtmosphere: true,
    hasClouds: false,
    moons: [
      { name: 'Phobos', size: 0.16, dist: 1.8, speed: 2.5, color: 0x94a3b8 },
      { name: 'Deimos', size: 0.12, dist: 2.4, speed: 1.8, color: 0x64748b }
    ]
  },
  {
    id: 'jupiter',
    order: 5,
    name: 'Jupiter',
    vnName: 'Sao Mộc',
    symbol: '♃',
    memberId: 'hieu',
    memberName: 'Nguyễn Xuân Hiếu',
    memberRole: 'Lead / System Architecture',
    a: 44.5,
    period: 4332.6,
    speed: 0.15,
    size: 2.70,
    color: 0xd97706,
    glowColor: 0xfbbf24,
    title: 'Trạm Trưởng Nhóm & Kiến Trúc Hệ Thống (Zeus Hub)',
    headline: 'Vua của các hành tinh, người khổng lồ khí bảo hộ Hệ Mặt Trời. Đại diện cho vai trò thủ lĩnh, quy hoạch kiến trúc toàn hệ thống và điều phối dự án.',
    telemetry: {
      a: '5.204 AU',
      v: '13.1 km/s',
      t: '11.86 Năm',
      e: '0.0489',
      moons: '95 (4 Vệ tinh Galilean)',
      inc: '1.30°'
    },
    hasRings: false,
    hasAtmosphere: true,
    hasClouds: true,
    moons: [
      { name: 'Io', size: 0.28, dist: 4.4, speed: 1.9, color: 0xfef08a },
      { name: 'Europa', size: 0.24, dist: 5.4, speed: 1.4, color: 0xe0f2fe },
      { name: 'Ganymede', size: 0.36, dist: 6.6, speed: 1.1, color: 0x94a3b8 },
      { name: 'Callisto', size: 0.32, dist: 7.8, speed: 0.85, color: 0x475569 }
    ]
  },
  {
    id: 'saturn',
    order: 6,
    name: 'Saturn',
    vnName: 'Sao Thổ',
    symbol: '♄',
    memberId: 'chau',
    memberName: 'Lê Hữu Châu',
    memberRole: 'DevOps & Cloud Security',
    a: 57.5,
    period: 10759,
    speed: 0.12,
    size: 2.20,
    color: 0xf59e0b,
    glowColor: 0xfcd34d,
    title: 'Trạm Vành Đai Phòng Thủ & DevOps (Kronos Station)',
    headline: 'Viên ngọc lộng lẫy nhất của Hệ Mặt Trời với hệ thống vành đai Cassini kỳ vĩ. Đại diện cho hạ tầng triển khai vững chắc, tự động hóa và bảo mật đám mây.',
    telemetry: {
      a: '9.582 AU',
      v: '9.7 km/s',
      t: '29.45 Năm',
      e: '0.0565',
      moons: '146 (Vệ tinh Titan)',
      inc: '2.49°'
    },
    hasRings: true,
    ringInner: 3.0,
    ringOuter: 6.2,
    ringColor: 0xfbbf24,
    hasAtmosphere: true,
    hasClouds: false,
    moons: [
      { name: 'Titan', size: 0.40, dist: 7.6, speed: 0.95, color: 0xf59e0b }
    ]
  },
  {
    id: 'uranus',
    order: 7,
    name: 'Uranus',
    vnName: 'Sao Thiên Vương',
    symbol: '♅',
    memberId: null,
    a: 70.5,
    period: 30685,
    speed: 0.09,
    size: 1.68,
    color: 0x38bdf8,
    glowColor: 0x7dd3fc,
    title: 'Trạm Viễn Thám Băng (Uranus Ice Outpost)',
    headline: 'Người khổng lồ băng với trục quay nghiêng độc nhất vô nhị (97.8°), trạm tiền đồn nghiên cứu các hiện tượng khí quyển băng giá cực đoan.',
    telemetry: {
      a: '19.22 AU',
      v: '6.8 km/s',
      t: '84.02 Năm',
      e: '0.0463',
      moons: '28 Vệ tinh',
      inc: '0.77°'
    },
    hasRings: true,
    ringInner: 2.2,
    ringOuter: 3.0,
    ringColor: 0x7dd3fc,
    hasAtmosphere: true,
    hasClouds: false,
    moons: []
  },
  {
    id: 'neptune',
    order: 8,
    name: 'Neptune',
    vnName: 'Sao Hải Vương',
    symbol: '♆',
    memberId: null,
    a: 84.0,
    period: 60190,
    speed: 0.075,
    size: 1.62,
    color: 0x1d4ed8,
    glowColor: 0x60a5fa,
    title: 'Trạm Bão Lam Sâu Thẳm (Neptune Deep Station)',
    headline: 'Hành tinh xa nhất trong 8 hành tinh chính quy, sở hữu những cơn gió siêu thanh mạnh nhất Hệ Mặt Trời (2.100 km/h) và Vết Tối Lớn.',
    telemetry: {
      a: '30.05 AU',
      v: '5.4 km/s',
      t: '164.8 Năm',
      e: '0.0095',
      moons: '16 (Vệ tinh Triton)',
      inc: '1.77°'
    },
    hasRings: false,
    hasAtmosphere: true,
    hasClouds: false,
    moons: [
      { name: 'Triton', size: 0.28, dist: 4.0, speed: -1.2, color: 0x93c5fd }
    ]
  },
  {
    id: 'pluto',
    order: 9,
    name: 'Pluto',
    vnName: 'Sao Diêm Vương (Dwarf Planet)',
    symbol: '♇',
    memberId: null,
    a: 96.5,
    period: 90560,
    speed: 0.058,
    size: 0.75,
    color: 0x9a3412,
    glowColor: 0xd97706,
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
    hasClouds: false,
    moons: [
      { name: 'Charon', size: 0.24, dist: 1.8, speed: 1.8, color: 0x78716c }
    ]
  }
];

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
  btnResetOrbit: document.getElementById('btnResetOrbit')
};

// ============================================================================
// 4. BỘ SINH VẬT LIỆU PROCEDURAL ULTRA-SHARP (CHATGPT 5.6 TERRA SPECIFICATION)
// ============================================================================

/**
 * Tạo kết cấu Canvas Texture toán học độ phân giải cao (2048x1024) với Mipmap mượt mà
 */
function createHighResPlanetTexture(id, baseHex, accentHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const baseCol = new THREE.Color(baseHex);
  const accCol = new THREE.Color(accentHex || baseHex);

  const baseStyle = `rgb(${Math.round(baseCol.r * 255)}, ${Math.round(baseCol.g * 255)}, ${Math.round(baseCol.b * 255)})`;
  const accStyle = `rgb(${Math.round(accCol.r * 255)}, ${Math.round(accCol.g * 255)}, ${Math.round(accCol.b * 255)})`;

  // Nền gradient cầu mượt mà
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  bgGrad.addColorStop(0, accStyle);
  bgGrad.addColorStop(0.5, baseStyle);
  bgGrad.addColorStop(1, accStyle);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 2048, 1024);

  if (id === 'earth') {
    // Đại dương xanh thẳm
    ctx.fillStyle = '#0a235c';
    ctx.fillRect(0, 0, 2048, 1024);

    // Lục địa Á-Âu-Phi (Vector Contours sắc nét)
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    // Eurasia / Africa
    ctx.ellipse(1100, 420, 320, 220, 0.2, 0, Math.PI * 2);
    ctx.ellipse(1250, 680, 220, 260, -0.1, 0, Math.PI * 2);
    // Americas
    ctx.ellipse(450, 380, 180, 240, -0.3, 0, Math.PI * 2);
    ctx.ellipse(580, 720, 160, 260, 0.2, 0, Math.PI * 2);
    // Australia
    ctx.ellipse(1550, 750, 140, 110, 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Điểm nhấn sa mạc và đồi núi
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.ellipse(1120, 520, 160, 90, 0, 0, Math.PI * 2); // Sahara
    ctx.ellipse(480, 430, 80, 90, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Chỏm băng Bắc Cực và Nam Cực
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 2048, 90);
    ctx.fillRect(0, 934, 2048, 90);
  } else if (id === 'jupiter') {
    // Các dải mây khí quyển đối lưu đặc trưng của Sao Mộc
    const numBands = 40;
    for (let i = 0; i < numBands; i++) {
      const y = (i / numBands) * 1024;
      const h = 1024 / numBands;
      const phase = Math.sin(i * 0.8) * 0.5 + 0.5;
      const col = phase > 0.5 ? '#d97706' : (phase > 0.25 ? '#fde68a' : '#92400e');
      ctx.fillStyle = col;
      ctx.fillRect(0, y, 2048, h);

      // Sóng đối lưu vi phân
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      for (let x = 0; x <= 2048; x += 32) {
        const wave = Math.sin((x / 2048) * Math.PI * 12 + i) * 6;
        if (x === 0) ctx.moveTo(x, y + wave);
        else ctx.lineTo(x, y + wave);
      }
      ctx.lineTo(2048, y + h);
      ctx.lineTo(0, y + h);
      ctx.closePath();
      ctx.fill();
    }

    // Vết Đỏ Lớn (Great Red Spot) tại vĩ độ nam
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.ellipse(1350, 680, 110, 70, 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 12;
    ctx.stroke();
  } else if (id === 'saturn') {
    // Các dải khí quyển êm dịu màu vàng bơ
    for (let i = 0; i < 24; i++) {
      const y = (i / 24) * 1024;
      const h = 1024 / 24;
      ctx.fillStyle = (i % 2 === 0) ? '#fef3c7' : '#f59e0b';
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, y, 2048, h);
    }
    ctx.globalAlpha = 1.0;
  } else if (id === 'mars') {
    // Vùng trũng sẫm màu Syrtis Major
    ctx.fillStyle = '#7f1d1d';
    ctx.beginPath();
    ctx.ellipse(850, 520, 240, 180, 0.4, 0, Math.PI * 2);
    ctx.ellipse(1650, 480, 210, 150, -0.3, 0, Math.PI * 2);
    ctx.fill();

    // Chỏm băng cực Bắc trắng muốt
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 2048, 60);
    ctx.fillRect(0, 964, 2048, 60);
  } else if (id === 'pluto') {
    // Trái tim băng Tombaugh Regio
    ctx.fillStyle = '#fef2f2';
    ctx.beginPath();
    ctx.arc(950, 520, 140, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  return texture;
}

/**
 * Tạo kết cấu vành đai Thổ tinh (Saturn Rings) có khe chia Cassini trong suốt
 */
function createSaturnRingsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0.00, 'rgba(251, 191, 36, 0.05)'); // Vành C trong
  grad.addColorStop(0.25, 'rgba(251, 191, 36, 0.65)'); // Vành B dày
  grad.addColorStop(0.55, 'rgba(245, 158, 11, 0.95)'); // Đỉnh sáng vành B
  grad.addColorStop(0.60, 'rgba(0, 0, 0, 0.00)');       // Rãnh Cassini Division trong suốt
  grad.addColorStop(0.66, 'rgba(0, 0, 0, 0.00)');
  grad.addColorStop(0.70, 'rgba(253, 230, 138, 0.85)'); // Vành A ngoài
  grad.addColorStop(0.92, 'rgba(251, 191, 36, 0.70)');
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

/**
 * Tạo kết cấu mây khí quyển Trái Đất (Earth Cloud Sphere)
 */
function createCloudsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 1024, 512);

  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 48; i++) {
    const x = Math.random() * 1024;
    const y = 80 + Math.random() * 350;
    const r = 30 + Math.random() * 90;
    ctx.globalAlpha = 0.25 + Math.random() * 0.45;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1.0;

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

// ============================================================================
// 5. CỖ MÁY 3D CHÍNH (MASTER 3D UNIVERSE ENGINE)
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
    this.sunGlowMesh = null;
    this.cloudsMesh = null;
    this.atmosphereMesh = null;

    this.focusedPlanet = null;
    this.isWarpMode = false;

    // Vector pre-allocated (Zero GC Allocation in Render Loop)
    this.tempVecA = new THREE.Vector3();
    this.tempVecB = new THREE.Vector3();
    this.targetCameraPos = new THREE.Vector3(0, 52, 98);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1000, -1000);

    this.arLabels = new Map();
    this.clock = new THREE.Clock();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x040714, 0.0014);

    // 2. Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(48, aspect, 0.1, 2500);
    this.camera.position.set(0, 52, 98);

    // 3. Renderer (Ultra-Sharp Anti-Aliasing — ChatGPT 5.6 Spec)
    this.renderer = new THREE.WebGLRenderer({
      canvas: dom.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 4. Controls (Smooth Damping)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.rotateSpeed = 0.45;
    this.controls.zoomSpeed = 0.7;
    this.controls.maxDistance = 500;
    this.controls.minDistance = 3.5;
    this.controls.maxPolarAngle = Math.PI * 0.88;

    // 5. Lights
    const sunLight = new THREE.PointLight(0xfff5ea, 3.8, 600, 0.35);
    sunLight.position.set(0, 0, 0);
    this.scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x1a243b, 0.65);
    this.scene.add(ambientLight);

    // 6. Xây dựng các thành phần thiên văn
    this.buildStarfield();
    this.buildMilkyWayNebula();
    this.buildTheSun();
    this.buildPlanetsAndOrbits();
    this.buildAsteroidBelt();

    // 7. Giao diện HUD và sự kiện
    this.buildHUDNavigationPills();
    this.setupEventListeners();

    // 8. Bắt đầu vòng lặp render 60-120 FPS
    this.animate();
  }

  /**
   * Trường sao sâu (Sub-pixel Point Starfield) với độ nét cao, không vỡ hạt bitmap
   */
  buildStarfield() {
    const starCount = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    const spectralPalette = [
      new THREE.Color(0xa5f3fc), // O/B Lam nhạt
      new THREE.Color(0xffffff), // A/F Trắng
      new THREE.Color(0xfef08a), // G Vàng Mặt Trời
      new THREE.Color(0xfca5a5)  // K/M Đỏ cam
    ];

    for (let i = 0; i < starCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 500 + Math.random() * 500;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = spectralPalette[Math.floor(Math.random() * spectralPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = 1.2 + Math.random() * 2.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom Shader vẽ điểm sao tròn mượt mà (Antialiased Discs)
    const starShaderMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.08, d);
          gl_FragColor = vec4(vColor, alpha * 0.95);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(geometry, starShaderMaterial);
    this.scene.add(starPoints);
  }

  /**
   * Bụi Ngân Hà (Milky Way Galactic Core Volumetric Dust)
   */
  buildMilkyWayNebula() {
    const dustCount = 3200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dustCount * 3);
    const colors = new Float32Array(dustCount * 3);

    const dustColA = new THREE.Color(0x6366f1); // Indigo
    const dustColB = new THREE.Color(0x38bdf8); // Cyan
    const dustColC = new THREE.Color(0xf43f5e); // Rose

    for (let i = 0; i < dustCount; i++) {
      const angle = (i / dustCount) * Math.PI * 4.0;
      const dist = 120 + Math.random() * 280;
      const spread = (Math.random() - 0.5) * 35;

      positions[i * 3] = Math.cos(angle) * dist + (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = spread;
      positions[i * 3 + 2] = Math.sin(angle) * dist + (Math.random() - 0.5) * 20;

      const pick = Math.random();
      const col = pick > 0.6 ? dustColA : (pick > 0.3 ? dustColB : dustColC);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const dustMesh = new THREE.Points(geometry, dustMaterial);
    dustMesh.rotation.x = 0.32;
    this.scene.add(dustMesh);
  }

  /**
   * Mặt Trời trung tâm (The Sun) rực rỡ với quầng sáng quang quyển FBM Shader (ChatGPT 5.6 Spec)
   */
  buildTheSun() {
    const sunGeom = new THREE.SphereGeometry(4.8, 128, 128);

    // Shader FBM Plasma Mặt Trời mượt mà (ChatGPT 5.6 Recommendation)
    const sunShaderMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uIntensity: { value: 1.25 }
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uIntensity;
        varying vec3 vPosition;
        varying vec3 vNormal;

        // Analytic Noise Hash
        float hash(vec3 p) {
          p = fract(p * 0.3183099 + 0.1);
          p *= 17.0;
          return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
        }

        float noise(vec3 x) {
          vec3 p = floor(x);
          vec3 w = fract(x);
          vec3 u = w * w * (3.0 - 2.0 * w);
          return mix(mix(mix(hash(p + vec3(0,0,0)), hash(p + vec3(1,0,0)), u.x),
                         mix(hash(p + vec3(0,1,0)), hash(p + vec3(1,1,0)), u.x), u.y),
                     mix(mix(hash(p + vec3(0,0,1)), hash(p + vec3(1,0,1)), u.x),
                         mix(hash(p + vec3(0,1,1)), hash(p + vec3(1,1,1)), u.x), u.y), u.z);
        }

        float fbm(vec3 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p = p * 2.0;
            a *= 0.5;
          }
          return v;
        }

        void main() {
          float n1 = fbm(vPosition * 1.8 + vec3(uTime * 0.05, 0.0, 0.0));
          float n2 = fbm(vPosition * 3.6 - vec3(0.0, uTime * 0.07, 0.0));
          float plasma = smoothstep(0.2, 0.85, n1 * 0.65 + n2 * 0.35);

          vec3 deepOrange = vec3(1.0, 0.22, 0.02);
          vec3 hotYellow  = vec3(1.0, 0.78, 0.15);
          vec3 coreWhite  = vec3(1.0, 0.98, 0.85);

          vec3 sunColor = mix(deepOrange, hotYellow, plasma);
          sunColor = mix(sunColor, coreWhite, pow(plasma, 2.8));

          gl_FragColor = vec4(sunColor * uIntensity, 1.0);
        }
      `
    });

    this.sunMesh = new THREE.Mesh(sunGeom, sunShaderMat);
    this.sunMesh.userData = { isPlanet: true, data: SOLAR_SYSTEM_DATA[0] };
    this.scene.add(this.sunMesh);

    // Vầng hào quang nhật hoa (Volumetric Coronal Glow)
    const glowGeom = new THREE.SphereGeometry(6.6, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
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
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(1.0, 0.48, 0.08, intensity * 0.85);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    this.sunGlowMesh = new THREE.Mesh(glowGeom, glowMat);
    this.scene.add(this.sunGlowMesh);

    this.planetMeshes.set('sun', this.sunMesh);
    this.createARLabel(SOLAR_SYSTEM_DATA[0], this.sunMesh);
  }

  /**
   * Xây dựng 8 Hành tinh + Diêm Vương tinh và đường quỹ đạo elip thực tế
   */
  buildPlanetsAndOrbits() {
    SOLAR_SYSTEM_DATA.forEach((data) => {
      if (data.isStar) return;

      // 1. Đường quỹ đạo thiên văn (Smooth Orbit Ellipse Line)
      const orbitPoints = [];
      const segments = 220;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const r = data.a;
        orbitPoints.push(new THREE.Vector3(Math.cos(theta) * r, 0, Math.sin(theta) * r));
      }
      const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: 0x334155,
        transparent: true,
        opacity: 0.35
      });
      const orbitLine = new THREE.Line(orbitGeom, orbitMat);
      this.scene.add(orbitLine);
      this.orbitLines.push(orbitLine);

      // 2. Nhóm trục quỹ đạo của hành tinh
      const orbitGroup = new THREE.Group();
      this.scene.add(orbitGroup);

      // 3. Khối cầu hành tinh đa giác cao (High polygon Sphere)
      const planetGeom = new THREE.SphereGeometry(data.size, 96, 96);
      const planetTex = createHighResPlanetTexture(data.id, data.color, data.glowColor);
      const planetMat = new THREE.MeshStandardMaterial({
        map: planetTex,
        roughness: data.id === 'earth' ? 0.25 : 0.65,
        metalness: 0.08
      });
      const planetMesh = new THREE.Mesh(planetGeom, planetMat);
      planetMesh.position.set(data.a, 0, 0);
      planetMesh.userData = { isPlanet: true, data };
      orbitGroup.add(planetMesh);

      // 4. Lớp mây & Bầu khí quyển tán xạ Rayleigh cho Trái Đất (Earth Atmosphere Spec)
      if (data.id === 'earth') {
        // Mây khí quyển
        const cloudGeom = new THREE.SphereGeometry(data.size * 1.018, 64, 64);
        const cloudTex = createCloudsTexture();
        const cloudMat = new THREE.MeshStandardMaterial({
          map: cloudTex,
          transparent: true,
          opacity: 0.45,
          blending: THREE.AdditiveBlending,
          depthWrite: false
        });
        this.cloudsMesh = new THREE.Mesh(cloudGeom, cloudMat);
        planetMesh.add(this.cloudsMesh);

        // Hào quang tán xạ khí quyển Rayleigh (Rayleigh Atmospheric Glow — ChatGPT 5.6 Spec)
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.06, 64, 64);
        const atmoMat = new THREE.ShaderMaterial({
          uniforms: {
            uSunDirection: { value: new THREE.Vector3(1, 0, 0) }
          },
          vertexShader: `
            varying vec3 vNormal;
            varying vec3 vViewDir;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
              vViewDir = normalize(-mvPosition.xyz);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            varying vec3 vViewDir;
            uniform vec3 uSunDirection;
            void main() {
              float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 3.5);
              float sunFacing = pow(max(dot(vNormal, normalize(uSunDirection)), 0.0), 1.5);
              vec3 rayleighBlue = vec3(0.18, 0.55, 1.0);
              float alpha = fresnel * (0.4 + 0.6 * sunFacing);
              gl_FragColor = vec4(rayleighBlue, alpha * 0.9);
            }
          `,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
          depthWrite: false
        });
        this.atmosphereMesh = new THREE.Mesh(atmoGeom, atmoMat);
        planetMesh.add(this.atmosphereMesh);
      }

      // 5. Vành đai Thổ tinh (Saturn Rings với độ chia Cassini chi tiết)
      if (data.hasRings && data.id === 'saturn') {
        const ringGeom = new THREE.RingGeometry(data.ringInner, data.ringOuter, 256, 1);
        const ringTex = createSaturnRingsTexture();
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          roughness: 0.5,
          alphaTest: 0.04
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
            roughness: 0.8
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
   * Vành đai tiểu hành tinh Asteroid Belt giữa Hỏa tinh và Mộc tinh (1.800 tiểu hành tinh)
   */
  buildAsteroidBelt() {
    const asteroidCount = 1800;
    const geom = new THREE.DodecahedronGeometry(0.14, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.85,
      metalness: 0.15
    });

    const instancedMesh = new THREE.InstancedMesh(geom, mat, asteroidCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < asteroidCount; i++) {
      const angle = (i / asteroidCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const radius = 33.5 + (Math.random() - 0.5) * 7.0; // Giữa Hỏa tinh (28.0) và Mộc tinh (44.5)
      const height = (Math.random() - 0.5) * 2.8;

      dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      const scale = 0.5 + Math.random() * 1.4;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(instancedMesh);
  }

  /**
   * Tạo nhãn không gian AR neo theo tọa độ 3D của thiên thể
   */
  createARLabel(data, mesh) {
    const labelEl = document.createElement('div');
    labelEl.className = 'spatial-ar-label';
    labelEl.setAttribute('data-id', data.id);

    const displayName = data.memberName ? `${data.vnName} // ${data.memberName}` : data.vnName;

    labelEl.innerHTML = `
      <span class="ar-label-symbol">${data.symbol}</span>
      <span class="ar-label-pill">${displayName}</span>
    `;

    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.focusPlanet(data.id);
    });

    dom.labelsContainer.appendChild(labelEl);
    this.arLabels.set(data.id, { el: labelEl, mesh });
  }

  /**
   * Cập nhật vị trí nhãn 2D chiếu từ vector 3D có kiểm tra Occlusion
   */
  updateARLabels() {
    this.arLabels.forEach(({ el, mesh }, id) => {
      mesh.getWorldPosition(this.tempVecA);
      this.tempVecA.y += (mesh.geometry ? mesh.geometry.parameters.radius || 1 : 1) + 1.2;

      // Chiếu tọa độ thế giới sang tọa độ màn hình
      this.tempVecA.project(this.camera);

      // Nếu nằm sau camera thì ẩn (Occlusion check)
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
   * Tạo 10 nút Pills chuyển nhanh Hệ Mặt Trời ở thanh HUD dưới
   */
  buildHUDNavigationPills() {
    dom.navPillsContainer.innerHTML = '';

    SOLAR_SYSTEM_DATA.forEach((data) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'orbit-pill font-mono';
      btn.setAttribute('data-id', data.id);

      const memberBadge = data.memberName ? `<span class="orbit-pill-member">${data.memberName.split(' ').pop()}</span>` : '';

      btn.innerHTML = `
        <span class="orbit-pill-symbol">${data.symbol}</span>
        <span>${data.name}</span>
        ${memberBadge}
      `;

      btn.addEventListener('click', () => {
        this.focusPlanet(data.id);
      });

      dom.navPillsContainer.appendChild(btn);
    });
  }

  /**
   * Tiếp cận và khóa camera vào một thiên thể (Hyper-Warp Orbit Lock)
   */
  focusPlanet(id) {
    const data = SOLAR_SYSTEM_DATA.find((p) => p.id === id);
    if (!data) return;

    this.focusedPlanet = data;
    audio.playWarpSound();
    audio.playCelestialChime(data.isStar ? 587 : 440 + data.order * 40);

    // Cập nhật trạng thái thanh trên cùng
    if (dom.currentFocusReadout) {
      dom.currentFocusReadout.textContent = `TARGET LOCKED // ${data.symbol} ${data.name.toUpperCase()} (${data.vnName.toUpperCase()})`;
    }

    // Cập nhật nút active
    document.querySelectorAll('.orbit-pill').forEach((pill) => {
      pill.classList.toggle('active-pill', pill.getAttribute('data-id') === id);
    });

    // Mở ngăn thông tin chi tiết
    this.openDetailPanel(data);
  }

  /**
   * Mở ngăn thông tin chi tiết thiên văn & thành viên UTH
   */
  openDetailPanel(data) {
    if (!dom.detailPanel) return;

    dom.detailPanel.hidden = false;
    dom.detailPanel.classList.add('panel-open');

    // Số hiệu
    if (dom.panelMemberSeq) {
      dom.panelMemberSeq.textContent = data.isStar
        ? 'SOLAR SYSTEM CORE // THE SUN'
        : `PLANETARY BODY // № 0${data.order} [${data.symbol}]`;
    }

    // Tên và Ký hiệu
    if (dom.panelMemberName) {
      dom.panelMemberName.textContent = data.memberName
        ? `${data.name} (${data.memberName})`
        : `${data.name} — ${data.vnName}`;
    }

    // Vai trò
    if (dom.panelMemberRole) {
      dom.panelMemberRole.textContent = data.memberRole || data.title;
    }

    // Headline
    if (dom.panelMemberHeadline) {
      dom.panelMemberHeadline.textContent = data.headline;
    }

    // Monogram / Symbol
    const monogram = document.getElementById('panelMonogram');
    if (monogram) {
      monogram.textContent = data.symbol;
    }

    // Telemetry Grid
    if (dom.telemetryA) dom.telemetryA.textContent = data.telemetry.a;
    if (dom.telemetryV) dom.telemetryV.textContent = data.telemetry.v;
    if (dom.telemetryT) dom.telemetryT.textContent = data.telemetry.t;
    if (dom.telemetryE) dom.telemetryE.textContent = data.telemetry.e;
    if (dom.telemetryMoons) dom.telemetryMoons.textContent = data.telemetry.moons;
    if (dom.telemetryInc) dom.telemetryInc.textContent = data.telemetry.inc;

    // Nút liên kết Portfolio cá nhân
    if (dom.panelPortfolioLink) {
      if (data.memberId) {
        const mem = MEMBERS.find((m) => m.id === data.memberId);
        if (mem && mem.portfolio) {
          dom.panelPortfolioLink.href = mem.portfolio;
          dom.panelPortfolioLink.textContent = `TIẾN VÀO PORTFOLIO ${mem.shortName.toUpperCase()} ↗`;
          dom.panelPortfolioLink.hidden = false;
        } else {
          dom.panelPortfolioLink.hidden = true;
        }
      } else {
        dom.panelPortfolioLink.hidden = true;
      }
    }
  }

  /**
   * Trở về góc nhìn toàn cảnh Hệ Mặt Trời (Reset to Solar System Panorama)
   */
  resetToOverview() {
    this.focusedPlanet = null;

    if (dom.currentFocusReadout) {
      dom.currentFocusReadout.textContent = 'SECTOR: MILKY WAY // SOLAR SYSTEM OVERVIEW';
    }

    document.querySelectorAll('.orbit-pill').forEach((pill) => {
      pill.classList.remove('active-pill');
    });

    if (dom.detailPanel) {
      dom.detailPanel.classList.remove('panel-open');
      dom.detailPanel.hidden = true;
    }

    this.targetCameraPos.set(0, 56, 108);
    this.targetLookAt.set(0, 0, 0);

    audio.playCelestialChime(330);
  }

  /**
   * Cập nhật chuyển động trong vòng lặp Render (Damped 60 FPS — ChatGPT 5.6 Spec)
   */
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.05);

    // 1. Tự quay Mặt Trời và cập nhật Shader Uniforms
    if (this.sunMesh) {
      this.sunMesh.rotation.y += dt * 0.15;
      if (this.sunMesh.material.uniforms) {
        this.sunMesh.material.uniforms.uTime.value += dt;
      }
    }
    if (this.sunGlowMesh) {
      this.sunGlowMesh.rotation.y -= dt * 0.08;
    }

    // 2. Chuyển động quay quanh Mặt Trời của các hành tinh (Keplerian Orbit Motion)
    this.planets.forEach((p) => {
      p.angle += dt * p.data.speed * 0.35;
      const x = Math.cos(p.angle) * p.data.a;
      const z = Math.sin(p.angle) * p.data.a;
      p.mesh.position.set(x, 0, z);

      // Tự quay quanh trục của hành tinh
      p.mesh.rotation.y += dt * 0.8;

      // Quay các mặt trăng quanh hành tinh
      p.mesh.children.forEach((child) => {
        if (child.userData && child.userData.speed) {
          child.rotation.y += dt * child.userData.speed;
        }
      });
    });

    // 3. Tự quay mây khí quyển Trái Đất
    if (this.cloudsMesh) {
      this.cloudsMesh.rotation.y += dt * 0.28;
    }

    // 4. Bám sát hành tinh khi được chọn (Camera Orbit Follow)
    if (this.focusedPlanet) {
      const mesh = this.planetMeshes.get(this.focusedPlanet.id);
      if (mesh) {
        mesh.getWorldPosition(this.tempVecA);
        this.targetLookAt.copy(this.tempVecA);

        const zoomOffset = this.focusedPlanet.isStar ? 16 : this.focusedPlanet.size * 3.8 + 3.2;
        this.targetCameraPos.set(
          this.tempVecA.x + zoomOffset * 0.8,
          this.tempVecA.y + zoomOffset * 0.6,
          this.tempVecA.z + zoomOffset
        );
      }
    }

    // 5. Nội suy camera mượt mà có Damping theo Delta Time (ChatGPT 5.6 Spec)
    const damping = 1 - Math.exp(-7.5 * dt);
    this.camera.position.lerp(this.targetCameraPos, damping);
    this.currentLookAt.lerp(this.targetLookAt, damping * 1.2);
    this.controls.target.copy(this.currentLookAt);
    this.controls.update();

    // 6. Cập nhật vị trí nhãn AR
    this.updateARLabels();

    // 7. Render
    this.renderer.render(this.scene, this.camera);
  }

  setupEventListeners() {
    // Resize cửa sổ
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    });

    // Raycast click chọn hành tinh trực tiếp trong không gian 3D
    window.addEventListener('pointerdown', (e) => {
      if (e.target.closest('#hudOverlay') || e.target.closest('.spatial-ar-label')) return;

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

    // Nút đóng bảng chi tiết
    if (dom.panelCloseBtn) {
      dom.panelCloseBtn.addEventListener('click', () => {
        this.resetToOverview();
      });
    }

    // Nút Reset Orbit [ESC]
    if (dom.btnResetOrbit) {
      dom.btnResetOrbit.addEventListener('click', () => {
        this.resetToOverview();
      });
    }

    // Phím tắt bàn phím (ESC = Toàn cảnh, 0-9 = Chọn hành tinh)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.resetToOverview();
      } else if (e.key >= '0' && e.key <= '9') {
        const idx = parseInt(e.key, 10);
        if (SOLAR_SYSTEM_DATA[idx]) {
          this.focusPlanet(SOLAR_SYSTEM_DATA[idx].id);
        }
      }
    });

    // Chuyển đổi góc nhìn 360° / Hyper-Warp
    if (dom.btnModeOrbit && dom.btnModeWarp) {
      dom.btnModeOrbit.addEventListener('click', () => {
        this.isWarpMode = false;
        dom.btnModeOrbit.classList.add('active');
        dom.btnModeWarp.classList.remove('active');
      });

      dom.btnModeWarp.addEventListener('click', () => {
        this.isWarpMode = true;
        dom.btnModeWarp.classList.add('active');
        dom.btnModeOrbit.classList.remove('active');
        audio.playWarpSound();
      });
    }

    // Bật / tắt âm thanh vũ trụ
    if (dom.btnAudioToggle) {
      dom.btnAudioToggle.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        dom.btnAudioToggle.classList.toggle('audio-muted', isMuted);
        if (dom.audioStatusText) {
          dom.audioStatusText.textContent = isMuted ? 'AUDIO: OFF' : 'AUDIO: ON';
        }
      });
    }

    // Tìm kiếm thiên thể thời gian thực
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        const query = normalizeText(e.target.value.trim().toLowerCase());

        if (dom.searchClearBtn) {
          dom.searchClearBtn.hidden = !query;
        }

        if (!query) {
          document.querySelectorAll('.orbit-pill').forEach((pill) => (pill.hidden = false));
          if (dom.searchEmpty) dom.searchEmpty.hidden = true;
          return;
        }

        let foundCount = 0;
        let firstMatchId = null;

        document.querySelectorAll('.orbit-pill').forEach((pill) => {
          const id = pill.getAttribute('data-id');
          const data = SOLAR_SYSTEM_DATA.find((p) => p.id === id);
          if (!data) return;

          const haystack = normalizeText(`${data.name} ${data.vnName} ${data.memberName || ''} ${data.title} ${data.symbol}`).toLowerCase();
          const isMatch = haystack.includes(query);
          pill.hidden = !isMatch;

          if (isMatch) {
            foundCount++;
            if (!firstMatchId) firstMatchId = id;
          }
        });

        if (dom.searchEmpty) {
          dom.searchEmpty.hidden = foundCount > 0;
        }
      });

      if (dom.searchClearBtn) {
        dom.searchClearBtn.addEventListener('click', () => {
          dom.searchInput.value = '';
          dom.searchInput.dispatchEvent(new Event('input'));
        });
      }
    }

    // Kích hoạt âm thanh khi tương tác lần đầu
    window.addEventListener('click', () => audio.startAmbience(), { once: true });
    window.addEventListener('keydown', () => audio.startAmbience(), { once: true });
  }
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  const engine = new MilkyWaySolarSystemEngine();
  engine.init();
});
