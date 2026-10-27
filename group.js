/**
 * ============================================================================
 * Nhóm 06 — Hệ Mặt Trời 3D (Milky Way & Solar System Engine)
 * Trường Đại học Giao thông Vận tải TP.HCM (UTH)
 * ============================================================================
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { MEMBERS, normalizeText } from './members.data.js';
import truongAvatarUrl from './members/le-nguyen-nhat-truong/images/avatar.png';

// ============================================================================
// 1. DATA CONTRACT: 10 THIÊN THỂ HỆ MẶT TRỜI & 6 THÀNH VIÊN NHÓM 06
// ============================================================================
const MEMBERS_DATA = MEMBERS.map((m, idx) => ({
  id: m.slug,
  name: m.name,
  shortName: m.shortName,
  role: m.role || 'Thành viên',
  seq: `THÀNH VIÊN // 0${idx + 1}`,
  portfolio: m.portfolio,
  github: m.github || 'https://github.com/lenguyennhattruongg/Portfolio',
  avatar: m.avatar || (m.slug === 'le-nguyen-nhat-truong' ? truongAvatarUrl : null),
  tags: Array.isArray(m.tags) ? m.tags : []
}));

const SOLAR_SYSTEM_DATA = [
  {
    id: 'sun',
    order: 0,
    name: 'The Sun',
    vnName: 'Mặt Trời',
    symbol: '☉',
    isStar: true,
    size: 58.0,
    a: 0,
    speed: 0,
    tilt: 0.126,
    rotationSpeed: 0.18,
    incAmp: 0,
    color: 0xfff7ed,
    glowColor: 0xf59e0b,
    textureFile: './planets/sun.jpg',
    title: 'Trái Tim Năng Lượng Vũ Trụ (Mặt Trời)',
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
    size: 17.5,
    a: 95.0,
    speed: 0.046,
    tilt: 0.001,
    rotationSpeed: 0.14,
    incAmp: 11.5,
    color: 0x94a3b8,
    glowColor: 0x64748b,
    textureFile: './planets/mercury.jpg',
    title: 'Hành Tinh Lửa & Băng (Sao Thủy)',
    headline: 'Thiên thể nhỏ nhất và gần Mặt Trời nhất, chuyển động nhanh nhất trong Hệ Mặt Trời với biên độ nhiệt cực đoan. Đại diện thiên văn cho Nguyễn Phạm Y Huỳnh.',
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
    memberId: 'nguyen-pham-y-huynh',
    memberName: 'Nguyễn Phạm Y Huỳnh',
    memberRole: 'Thành viên'
  },
  {
    id: 'venus',
    order: 2,
    name: 'Venus',
    vnName: 'Sao Kim',
    symbol: '♀',
    size: 26.0,
    a: 155.0,
    speed: 0.035,
    tilt: 3.09, // Tự quay nghịch hành (Retrograde 177.3°)
    rotationSpeed: -0.08,
    incAmp: 8.5,
    color: 0xfde047,
    glowColor: 0xeab308,
    textureFile: './planets/venus.jpg',
    title: 'Hải Đăng Ánh Kim (Sao Kim)',
    headline: 'Hành tinh nóng nhất Hệ Mặt Trời với hiệu ứng nhà kính cực hạn, lớp mây axit sulfuric dày đặc phản chiếu ánh sáng rực rỡ. Đại diện thiên văn cho Nguyễn Thị Thảo Như.',
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
    memberId: 'nguyen-thi-thao-nhu',
    memberName: 'Nguyễn Thị Thảo Như',
    memberRole: 'Thành viên'
  },
  {
    id: 'earth',
    order: 3,
    name: 'Earth',
    vnName: 'Trái Đất',
    symbol: '⊕',
    size: 28.5,
    a: 230.0,
    speed: 0.028,
    tilt: 0.409, // Nghiêng trục 23.44°
    rotationSpeed: 0.45,
    incAmp: 0.0,
    color: 0x38bdf8,
    glowColor: 0x0284c7,
    textureFile: './planets/earth.jpg',
    title: 'Địa Cầu Xanh — Cái Nôi Sự Sống (Trái Đất)',
    headline: 'Hành tinh xanh độc nhất với đại dương lỏng, bầu khí quyển bảo vệ giàu oxy và hệ sinh thái sự sống rực rỡ. Đại diện thiên văn cho Lê Nguyễn Nhật Trường.',
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
    memberRole: 'Thành viên',
    moons: [
      { name: 'Mặt Trăng', size: 3.8, dist: 42.0, speed: 2.2, color: 0xe2e8f0 }
    ]
  },
  {
    id: 'mars',
    order: 4,
    name: 'Mars',
    vnName: 'Sao Hỏa',
    symbol: '♂',
    size: 24.5,
    a: 310.0,
    speed: 0.022,
    tilt: 0.440, // Nghiêng trục 25.19°
    rotationSpeed: 0.42,
    incAmp: 9.5,
    color: 0xf97316,
    glowColor: 0xc2410c,
    textureFile: './planets/mars.jpg',
    title: 'Hành Tinh Đỏ — Tiền Đồn Thám Hiểm (Sao Hỏa)',
    headline: 'Hành tinh đất đá giàu oxit sắt với hẻm vực Valles Marineris và ngọn núi lửa Olympus Mons cao nhất Hệ Mặt Trời. Đại diện thiên văn cho Nguyễn Xuân Hiếu (Trưởng nhóm).',
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
    memberRole: 'Trưởng nhóm',
    moons: [
      { name: 'Phobos', size: 1.6, dist: 33.0, speed: 3.4, color: 0xa8a29e },
      { name: 'Deimos', size: 1.2, dist: 43.0, speed: 2.4, color: 0x78716c }
    ]
  },
  {
    id: 'jupiter',
    order: 5,
    name: 'Jupiter',
    vnName: 'Sao Mộc',
    symbol: '♃',
    size: 52.0,
    a: 450.0,
    speed: 0.014,
    tilt: 0.055, // Nghiêng trục 3.13°
    rotationSpeed: 0.92, // Tự quay nhanh nhất Hệ Mặt Trời (~9.9h)
    incAmp: 10.0,
    color: 0xfbbf24,
    glowColor: 0xd97706,
    textureFile: './planets/jupiter.jpg',
    title: 'Đại Khí Vương — Khiên Chắn Hấp Dẫn (Sao Mộc)',
    headline: 'Hành tinh khí khổng lồ lớn nhất Hệ Mặt Trời với Vết Đỏ Lớn trường tồn hàng thế kỷ, lá chắn hấp dẫn bảo vệ các hành tinh phía trong. Đại diện thiên văn cho Lê Hữu Châu.',
    telemetry: {
      a: '5.20 AU',
      v: '13.1 km/s',
      t: '11.86 Năm',
      e: '0.0484',
      moons: '95 (4 Vệ tinh Galilean)',
      inc: '1.30°'
    },
    hasRings: true,
    ringInner: 56.0,
    ringOuter: 64.0,
    hasAtmosphere: true,
    memberId: 'le-huu-chau',
    memberName: 'Lê Hữu Châu',
    memberRole: 'Thành viên',
    moons: [
      { name: 'Io', size: 2.5, dist: 68.0, speed: 2.8, color: 0xfacc15 },
      { name: 'Europa', size: 2.2, dist: 80.0, speed: 2.2, color: 0xe0f2fe },
      { name: 'Ganymede', size: 3.2, dist: 96.0, speed: 1.7, color: 0xd6d3d1 },
      { name: 'Callisto', size: 2.8, dist: 114.0, speed: 1.2, color: 0x94a3b8 }
    ]
  },
  {
    id: 'saturn',
    order: 6,
    name: 'Saturn',
    vnName: 'Sao Thổ',
    symbol: '♄',
    size: 42.0,
    a: 600.0,
    speed: 0.010,
    tilt: 0.467, // Nghiêng trục 26.73° (vành nghiêng theo trục)
    rotationSpeed: 0.85,
    incAmp: 14.0,
    color: 0xfde68a,
    glowColor: 0xb45309,
    textureFile: './planets/saturn.jpg',
    title: 'Tuyệt Tác Vành Đai Vũ Trụ (Sao Thổ)',
    headline: 'Tuyệt tác vũ trụ với hệ vành đai băng đá kỳ vĩ nhất dải Ngân Hà và vệ tinh Titan sở hữu bầu khí quyển nguyên sơ dày đặc. Đại diện thiên văn cho Nguyễn Anh Thư.',
    telemetry: {
      a: '9.58 AU',
      v: '9.7 km/s',
      t: '29.45 Năm',
      e: '0.0541',
      moons: '146 (Vệ tinh Titan)',
      inc: '2.49°'
    },
    hasRings: true,
    ringInner: 50.0,
    ringOuter: 98.0,
    hasAtmosphere: true,
    memberId: 'nguyen-anh-thu',
    memberName: 'Nguyễn Anh Thư',
    memberRole: 'Thành viên',
    moons: [
      { name: 'Titan', size: 3.4, dist: 118.0, speed: 1.4, color: 0xf59e0b },
      { name: 'Rhea', size: 1.8, dist: 136.0, speed: 1.0, color: 0xe2e8f0 }
    ]
  },
  {
    id: 'uranus',
    order: 7,
    name: 'Uranus',
    vnName: 'Sao Thiên Vương',
    symbol: '♅',
    size: 29.0,
    a: 740.0,
    speed: 0.007,
    tilt: 1.706, // Nghiêng trục 97.77° (Lăn ngang trên mặt phẳng quỹ đạo)
    rotationSpeed: -0.62,
    incAmp: 9.0,
    color: 0x67e8f9,
    glowColor: 0x0891b2,
    textureFile: './planets/uranus.jpg',
    title: 'Hành Tinh Băng Nghiêng Quỹ Đạo (Sao Thiên Vương)',
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
    ringInner: 36.0,
    ringOuter: 54.0,
    hasAtmosphere: true,
    memberId: null,
    memberName: null,
    memberRole: null,
    moons: [
      { name: 'Titania', size: 2.0, dist: 64.0, speed: 1.6, color: 0xcfd8dc }
    ]
  },
  {
    id: 'neptune',
    order: 8,
    name: 'Neptune',
    vnName: 'Sao Hải Vương',
    symbol: '♆',
    size: 28.5,
    a: 860.0,
    speed: 0.0055,
    tilt: 0.494, // Nghiêng trục 28.32°
    rotationSpeed: 0.58,
    incAmp: 12.0,
    color: 0x3b82f6,
    glowColor: 0x1d4ed8,
    textureFile: './planets/neptune.jpg',
    title: 'Đại Dương Lam Bão Tố (Sao Hải Vương)',
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
    ringInner: 35.0,
    ringOuter: 48.0,
    hasAtmosphere: true,
    memberId: null,
    memberName: null,
    memberRole: null,
    moons: [
      { name: 'Triton', size: 2.6, dist: 64.0, speed: -1.6, color: 0xbfdbfe }
    ]
  },
  {
    id: 'pluto',
    order: 9,
    name: 'Pluto',
    vnName: 'Sao Diêm Vương',
    symbol: '♇',
    size: 16.5,
    a: 970.0,
    speed: 0.0042,
    tilt: 2.139, // Nghiêng trục 122.5°
    rotationSpeed: -0.18,
    incAmp: 28.0, // Độ nghiêng quỹ đạo 17.16° ngoạn mục
    color: 0xc2410c,
    glowColor: 0xea580c,
    textureFile: './planets/pluto.jpg',
    title: 'Cửa Ngõ Vành Đai Kuiper (Sao Diêm Vương)',
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
      { name: 'Charon', size: 2.2, dist: 26.0, speed: 1.8, color: 0xa8a29e }
    ]
  }
];

// ============================================================================
// 2. TẠO ÂM THANH KHÔNG GIAN (WEB AUDIO API PROCEDURAL SYNTH)
// ============================================================================
class SpaceAudioSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.stereoPanner = null;
    this.droneOsc = null;
    this.droneFilter = null;
    this.droneGain = null;
    this.shimmerOsc1 = null;
    this.shimmerOsc2 = null;
    this.shimmerGain = null;
    this.hasStarted = false;
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('solar_audio_enabled') : null;
    this.isMuted = saved === 'true' ? false : true;
    this.tempVec = new THREE.Vector3();
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0.0001 : 0.45, this.ctx.currentTime);

        if (this.ctx.createStereoPanner) {
          this.stereoPanner = this.ctx.createStereoPanner();
          this.masterGain.connect(this.stereoPanner);
          this.stereoPanner.connect(this.ctx.destination);
        } else {
          this.masterGain.connect(this.ctx.destination);
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startAmbience() {
    if (this.hasStarted) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.hasStarted = true;

    try {
      const now = this.ctx.currentTime;

      // 1. Tần số vũ trụ ấm áp (C3 - 130.81Hz + bộ lọc Lowpass 450Hz)
      this.droneOsc = this.ctx.createOscillator();
      this.droneOsc.type = 'triangle';
      this.droneOsc.frequency.setValueAtTime(130.81, now);

      this.droneFilter = this.ctx.createBiquadFilter();
      this.droneFilter.type = 'lowpass';
      this.droneFilter.frequency.setValueAtTime(450, now);
      this.droneFilter.Q.setValueAtTime(2.0, now);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.20, now);

      this.droneOsc.connect(this.droneFilter);
      this.droneFilter.connect(this.droneGain);
      this.droneGain.connect(this.masterGain);

      // 2. Hợp âm dải ngân hà huyền ảo ngân vang (G3 - 196.00Hz + E4 - 329.63Hz)
      this.shimmerOsc1 = this.ctx.createOscillator();
      this.shimmerOsc1.type = 'sine';
      this.shimmerOsc1.frequency.setValueAtTime(196.00, now);

      this.shimmerOsc2 = this.ctx.createOscillator();
      this.shimmerOsc2.type = 'sine';
      this.shimmerOsc2.frequency.setValueAtTime(329.63, now);

      this.shimmerGain = this.ctx.createGain();
      this.shimmerGain.gain.setValueAtTime(0.14, now);

      this.shimmerOsc1.connect(this.shimmerGain);
      this.shimmerOsc2.connect(this.shimmerGain);
      this.shimmerGain.connect(this.masterGain);

      this.droneOsc.start(now);
      this.shimmerOsc1.start(now);
      this.shimmerOsc2.start(now);
    } catch (_) {}
  }

  updateSpatial(camera, focusedMesh, sunMesh) {
    if (this.isMuted || !this.ctx || !this.hasStarted) return;
    const now = this.ctx.currentTime;

    // A. Biến thiên độ mở tần số khi camera áp sát Mặt Trời hoặc Sao Mộc
    if (this.droneFilter && this.droneGain && camera) {
      let minDistance = 2000;
      if (sunMesh) {
        minDistance = Math.min(minDistance, camera.position.distanceTo(sunMesh.position));
      }
      if (focusedMesh) {
        focusedMesh.getWorldPosition(this.tempVec);
        minDistance = Math.min(minDistance, camera.position.distanceTo(this.tempVec));
      }

      const t = Math.max(0, Math.min(1, (900 - minDistance) / 750));
      const targetFreq = 350 + t * 450;
      const targetGain = 0.16 + t * 0.12;

      this.droneFilter.frequency.setTargetAtTime(targetFreq, now, 0.15);
      this.droneGain.gain.setTargetAtTime(targetGain, now, 0.15);
    }

    // B. Đảo kênh trái/phải không gian theo vị trí màn hình của thiên thể
    if (this.stereoPanner && camera) {
      let targetPos = null;
      if (focusedMesh) {
        focusedMesh.getWorldPosition(this.tempVec);
        targetPos = this.tempVec;
      } else if (sunMesh) {
        targetPos = sunMesh.position;
      }

      if (targetPos) {
        const proj = this.tempVec.copy(targetPos).project(camera);
        if (Number.isFinite(proj.x)) {
          const panVal = Math.max(-0.85, Math.min(0.85, proj.x));
          this.stereoPanner.pan.setTargetAtTime(panVal, now, 0.1);
        }
      }
    }
  }

  playCelestialChime(freq = 523) {
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

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch (_) {}
  }

  playWelcomeChime() {
    if (this.isMuted || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99]; // Hợp âm Đô trưởng vũ trụ (C5 -> E5 -> G5)
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.12;
        const duration = 0.55;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain || this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
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
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.55);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.masterGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch (_) {}
  }

  toggleMute() {
    this.ensureContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('solar_audio_enabled', String(!this.isMuted));
    }
    if (!this.isMuted) {
      this.startAmbience();
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      }
      this.playWelcomeChime();
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      }
    }
    return this.isMuted;
  }
}

const audio = new SpaceAudioSystem();

// ============================================================================
// 2.1 HỆ THỐNG SAO CHỔI ĐỊNH KỲ (PERIODIC COMET EVENT — 45s CYCLE)
// ============================================================================
class CosmicCometSystem {
  constructor(scene) {
    this.scene = scene;
    this.isActive = false;
    this.progress = 0;
    this.speed = 0.08;
    this.lastTriggerTime = 10;
    this.triggerInterval = 45;

    // Lõi sao chổi
    const nucleusGeom = new THREE.SphereGeometry(2.4, 16, 16);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xecfeff,
      toneMapped: false
    });
    this.nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
    this.nucleus.visible = false;
    this.scene.add(this.nucleus);

    this.light = new THREE.PointLight(0x38bdf8, 3.0, 150);
    this.nucleus.add(this.light);

    // Đuôi bụi ion hạt vi mô (Particle Dust Tail)
    this.particleCount = 180;
    this.tailGeom = new THREE.BufferGeometry();
    this.tailPositions = new Float32Array(this.particleCount * 3);
    this.tailAlphas = new Float32Array(this.particleCount);
    this.history = [];

    this.tailGeom.setAttribute('position', new THREE.BufferAttribute(this.tailPositions, 3));
    this.tailGeom.setAttribute('alpha', new THREE.BufferAttribute(this.tailAlphas, 1));

    this.tailMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x38bdf8) },
        uCoreColor: { value: new THREE.Color(0xffffff) }
      },
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (14.0 * alpha + 2.0) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uCoreColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float strength = pow(1.0 - d * 2.0, 1.6) * vAlpha;
          vec3 col = mix(uColor, uCoreColor, strength * 0.6);
          gl_FragColor = vec4(col * 1.6, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.tailPoints = new THREE.Points(this.tailGeom, this.tailMat);
    this.tailPoints.visible = false;
    this.scene.add(this.tailPoints);

    this.startPos = new THREE.Vector3();
    this.perihelionPos = new THREE.Vector3();
    this.endPos = new THREE.Vector3();
    this.tempAway = new THREE.Vector3();
  }

  triggerComet() {
    this.isActive = true;
    this.progress = 0;
    this.nucleus.visible = true;
    this.tailPoints.visible = true;
    this.history = [];

    const angle = Math.random() * Math.PI * 2;
    const periDist = 80 + Math.random() * 60;
    const height = (Math.random() - 0.5) * 140;

    this.startPos.set(Math.cos(angle) * 1400, height + 160, Math.sin(angle) * 1400);
    this.perihelionPos.set(Math.cos(angle + Math.PI * 0.72) * periDist, height * 0.2, Math.sin(angle + Math.PI * 0.72) * periDist);
    this.endPos.set(Math.cos(angle + Math.PI * 1.45) * 1500, height - 160, Math.sin(angle + Math.PI * 1.45) * 1500);

    if (audio && audio.playCelestialChime) {
      audio.playCelestialChime(580);
    }
  }

  update(dt, elapsedTime) {
    if (!this.isActive) {
      if (elapsedTime - this.lastTriggerTime > this.triggerInterval) {
        this.lastTriggerTime = elapsedTime;
        this.triggerComet();
      }
      return;
    }

    const distToMid = Math.abs(this.progress - 0.5);
    const speedFactor = 1.0 + (0.5 - distToMid) * 2.2;
    this.progress += dt * this.speed * speedFactor;

    if (this.progress >= 1.0) {
      this.isActive = false;
      this.nucleus.visible = false;
      this.tailPoints.visible = false;
      this.lastTriggerTime = elapsedTime;
      return;
    }

    const p = this.progress;
    const inv = 1 - p;
    const currentX = inv * inv * this.startPos.x + 2 * inv * p * this.perihelionPos.x + p * p * this.endPos.x;
    const currentY = inv * inv * this.startPos.y + 2 * inv * p * this.perihelionPos.y + p * p * this.endPos.y;
    const currentZ = inv * inv * this.startPos.z + 2 * inv * p * this.perihelionPos.z + p * p * this.endPos.z;

    this.nucleus.position.set(currentX, currentY, currentZ);

    this.tempAway.set(currentX, currentY, currentZ).normalize();
    this.history.unshift({
      x: currentX + (Math.random() - 0.5) * 1.8,
      y: currentY + (Math.random() - 0.5) * 1.8,
      z: currentZ + (Math.random() - 0.5) * 1.8,
      age: 0
    });

    if (this.history.length > this.particleCount) {
      this.history.pop();
    }

    for (let i = 0; i < this.particleCount; i++) {
      if (i < this.history.length) {
        const item = this.history[i];
        item.age += dt * 1.5;
        item.x += this.tempAway.x * dt * 40;
        item.y += this.tempAway.y * dt * 40;
        item.z += this.tempAway.z * dt * 40;

        this.tailPositions[i * 3] = item.x;
        this.tailPositions[i * 3 + 1] = item.y;
        this.tailPositions[i * 3 + 2] = item.z;
        this.tailAlphas[i] = Math.max(0, 1.0 - (i / this.particleCount) * 1.15);
      } else {
        this.tailPositions[i * 3] = currentX;
        this.tailPositions[i * 3 + 1] = currentY;
        this.tailPositions[i * 3 + 2] = currentZ;
        this.tailAlphas[i] = 0;
      }
    }
    this.tailGeom.attributes.position.needsUpdate = true;
    this.tailGeom.attributes.alpha.needsUpdate = true;
  }
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
  btnPillScrollLeft: document.getElementById('btnPillScrollLeft'),
  btnPillScrollRight: document.getElementById('btnPillScrollRight'),
  btnHelpGuide: document.getElementById('btnHelpGuide'),
  btnModeOrbit: document.getElementById('btnModeOrbit'),
  btnModeWarp: document.getElementById('btnModeWarp'),
  btnAudioToggle: document.getElementById('btnAudioToggle'),
  audioStatusText: document.getElementById('audioStatusText'),
  btnResetOrbit: document.getElementById('btnResetOrbit'),
  btnZoomIn: document.getElementById('btnZoomIn'),
  btnZoomOut: document.getElementById('btnZoomOut'),
  btnZoomReset: document.getElementById('btnZoomReset'),

  // Các phần tử mới nâng cấp
  preloader: document.getElementById('sciFiPreloader'),
  preloaderPercent: document.getElementById('preloaderPercent'),
  preloaderFillBar: document.getElementById('preloaderFillBar'),
  preloaderItemText: document.getElementById('preloaderItemText'),
  btnPhotoMode: document.getElementById('btnPhotoMode'),
  photoModeToast: document.getElementById('photoModeToast'),
  btnExitPhoto: document.getElementById('btnExitPhoto'),
  hudTimeControl: document.getElementById('hudTimeControl'),
  btnTimeToggle: document.getElementById('btnTimeToggle'),
  timePlayIcon: document.getElementById('timePlayIcon'),
  timeSpeedButtons: document.querySelectorAll('.btn-time-speed')
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

/**
 * Lớp mây Trái Đất xoáy đa tầng và bão nhiệt đới (Earth Clouds Layer 2048x1024)
 */
function createEarthCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 2048, 1024);

  // 1. Dải mây khí quyển vĩ độ cao & xích đạo
  for (let y = 140; y < 900; y += 45) {
    const latFactor = Math.sin((y / 1024) * Math.PI);
    const waveCount = 12 + Math.floor(latFactor * 8);

    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 2048; x += 32) {
      const swirl = Math.sin((x / 2048) * Math.PI * waveCount + y * 0.05) * (18 * latFactor);
      const micro = Math.cos((x / 2048) * Math.PI * 48) * 8;
      ctx.lineTo(x, y + swirl + micro);
    }
    ctx.lineWidth = 14 + latFactor * 22;
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.28 + latFactor * 0.42})`;
    ctx.stroke();
  }

  // 2. Các cụm bão xoáy nhiệt đới (Cyclonic Spirals)
  const storms = [
    { x: 380, y: 380, r: 120 },
    { x: 820, y: 440, r: 140 },
    { x: 1320, y: 350, r: 160 },
    { x: 1680, y: 620, r: 130 },
    { x: 540, y: 680, r: 110 }
  ];

  storms.forEach((st) => {
    const stormGrad = ctx.createRadialGradient(st.x, st.y, 10, st.x, st.y, st.r);
    stormGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)');
    stormGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.75)');
    stormGrad.addColorStop(0.70, 'rgba(255, 255, 255, 0.35)');
    stormGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');

    ctx.fillStyle = stormGrad;
    ctx.beginPath();
    ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
    ctx.fill();

    // Vành xoắn ốc của bão
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 4; a += 0.2) {
      const rad = 10 + (a / (Math.PI * 4)) * (st.r * 0.85);
      const px = st.x + Math.cos(a) * rad;
      const py = st.y + Math.sin(a) * rad;
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  });

  // 3. Mũ băng địa cực (Polar Ice & Cirrus Haze)
  const northIce = ctx.createLinearGradient(0, 0, 0, 110);
  northIce.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  northIce.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = northIce;
  ctx.fillRect(0, 0, 2048, 110);

  const southIce = ctx.createLinearGradient(0, 1024, 0, 914);
  southIce.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  southIce.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
  ctx.fillStyle = southIce;
  ctx.fillRect(0, 914, 2048, 110);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

/**
 * Bản đồ độ nhám phản chiếu Trái Đất (Earth Roughness Map: Đại dương bóng loáng, lục địa tán xạ mờ)
 */
function createEarthRoughnessMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Đại dương: độ nhẵn cực cao (Roughness ~ 0.11 -> phản chiếu gương)
  ctx.fillStyle = '#1c1c1c';
  ctx.fillRect(0, 0, 1024, 512);

  // Lục địa: độ nhám cao (Roughness ~ 0.77 -> tán xạ mờ tự nhiên)
  ctx.fillStyle = '#c5c5c5';
  ctx.beginPath();
  ctx.ellipse(550, 210, 170, 110, 0.2, 0, Math.PI * 2);
  ctx.ellipse(630, 340, 120, 135, -0.1, 0, Math.PI * 2);
  ctx.ellipse(225, 190, 95, 125, -0.3, 0, Math.PI * 2);
  ctx.ellipse(295, 360, 85, 135, 0.2, 0, Math.PI * 2);
  ctx.ellipse(780, 375, 75, 60, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Băng tuyết địa cực: độ nhám trung bình
  ctx.fillStyle = '#555555';
  ctx.fillRect(0, 0, 1024, 40);
  ctx.fillRect(0, 472, 1024, 40);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

/**
 * Bản đồ cao độ lồi lõm địa hình (Terrain Bump Map: Miệng hố va chạm, hẻm vực và rặng núi)
 */
function createTerrainBumpMap(bodyId) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Cao độ trung tính
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 1024, 512);

  if (bodyId === 'mercury' || bodyId === 'moon') {
    const craterCount = bodyId === 'mercury' ? 140 : 180;
    for (let i = 0; i < craterCount; i++) {
      const cx = Math.random() * 1024;
      const cy = 40 + Math.random() * 432;
      const rad = 6 + Math.random() * 28;

      const rimGrad = ctx.createRadialGradient(cx, cy, rad * 0.4, cx, cy, rad);
      rimGrad.addColorStop(0.0, '#303030');
      rimGrad.addColorStop(0.7, '#606060');
      rimGrad.addColorStop(0.85, '#ffffff');
      rimGrad.addColorStop(1.0, '#808080');

      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();

      if (rad > 18) {
        ctx.fillStyle = '#eeeeee';
        ctx.beginPath();
        ctx.arc(cx, cy, rad * 0.15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (bodyId === 'mars') {
    // Núi lửa Olympus Mons
    const oGrad = ctx.createRadialGradient(280, 220, 10, 280, 220, 95);
    oGrad.addColorStop(0.0, '#ffffff');
    oGrad.addColorStop(0.3, '#d0d0d0');
    oGrad.addColorStop(0.8, '#a0a0a0');
    oGrad.addColorStop(1.0, '#808080');
    ctx.fillStyle = oGrad;
    ctx.beginPath();
    ctx.arc(280, 220, 95, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#202020';
    ctx.beginPath();
    ctx.arc(280, 220, 16, 0, Math.PI * 2);
    ctx.fill();

    // Hẻm vực Valles Marineris
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(380, 280);
    ctx.bezierCurveTo(460, 290, 560, 260, 640, 275);
    ctx.stroke();

    // Hố va chạm phụ
    for (let i = 0; i < 75; i++) {
      const cx = Math.random() * 1024;
      const cy = 60 + Math.random() * 392;
      const rad = 4 + Math.random() * 18;
      ctx.fillStyle = '#404040';
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (bodyId === 'earth') {
    ctx.fillStyle = '#e8e8e8';
    ctx.beginPath();
    ctx.ellipse(620, 195, 60, 15, -0.2, 0, Math.PI * 2);
    ctx.ellipse(310, 370, 16, 85, 0.1, 0, Math.PI * 2);
    ctx.ellipse(210, 165, 20, 65, 0.25, 0, Math.PI * 2);
    ctx.fill();
  } else if (bodyId === 'pluto') {
    ctx.fillStyle = '#e0e0e0';
    ctx.beginPath();
    ctx.arc(480, 250, 80, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(480, 250, 95, 0, Math.PI * 1.5);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  return tex;
}

/**
 * Vành đai băng lục lam Sao Thiên Vương (Uranus Rings)
 */
function createUranusRingsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0.00, 'rgba(103, 232, 249, 0.00)');
  grad.addColorStop(0.35, 'rgba(103, 232, 249, 0.25)');
  grad.addColorStop(0.60, 'rgba(165, 243, 252, 0.75)');
  grad.addColorStop(0.85, 'rgba(34, 211, 238, 0.40)');
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
 * Vành đai xanh thẳm Sao Hải Vương (Neptune Rings)
 */
function createNeptuneRingsTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0.00, 'rgba(59, 130, 246, 0.00)');
  grad.addColorStop(0.40, 'rgba(59, 130, 246, 0.20)');
  grad.addColorStop(0.70, 'rgba(96, 165, 250, 0.60)');
  grad.addColorStop(0.90, 'rgba(37, 99, 235, 0.30)');
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
 * Shader hào quang tán xạ khí quyển (Rayleigh Atmospheric Rim Scattering)
 */
function createAtmosphereShaderMaterial(color, opacity = 0.85, power = 2.4) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uPower: { value: power }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uPower;
      varying vec3 vNormal;
      varying vec3 vViewPosition;
      void main() {
        vec3 viewDir = normalize(vViewPosition);
        float rim = 1.0 - clamp(dot(vNormal, viewDir), 0.0, 1.0);
        float intensity = pow(rim, uPower);
        gl_FragColor = vec4(uColor, intensity * uOpacity);
      }
    `,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    depthWrite: false
  });
}

/**
 * Bản đồ đèn thành phố đêm Trái Đất (Earth Night-side City Lights 2048x1024)
 */
function createEarthNightTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Nền đại dương và hoang mạc tối hoàn toàn
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 2048, 1024);

  // Vẽ chùm đèn thành phố màu vàng hổ phách chân thực
  function drawCityCluster(cx, cy, count, radius, color = 'rgba(255, 214, 120, 0.85)') {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.pow(Math.random(), 1.5) * radius;
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;
      const sz = Math.random() < 0.15 ? 2.5 : (Math.random() < 0.5 ? 1.5 : 1.0);
      ctx.fillRect(px, py, sz, sz);
    }
  }

  // Châu Âu & Địa Trung Hải
  drawCityCluster(1050, 360, 280, 75, 'rgba(255, 225, 140, 0.95)');
  drawCityCluster(1120, 380, 220, 60, 'rgba(255, 210, 110, 0.90)');
  // Bờ Đông Bắc Mỹ (New York, Chicago, Washington DC)
  drawCityCluster(480, 360, 320, 85, 'rgba(255, 230, 150, 0.95)');
  // Bờ Tây Bắc Mỹ (California, Seattle)
  drawCityCluster(340, 390, 180, 55, 'rgba(255, 210, 120, 0.90)');
  // Đông Á (Tokyo, Bắc Kinh, Thượng Hải, Seoul)
  drawCityCluster(1580, 420, 350, 90, 'rgba(255, 240, 170, 0.95)');
  drawCityCluster(1720, 410, 250, 50, 'rgba(255, 235, 160, 0.95)');
  // Đông Nam Á & Việt Nam
  drawCityCluster(1520, 560, 190, 55, 'rgba(255, 205, 110, 0.90)');
  // Nam Á (Ấn Độ rực rỡ)
  drawCityCluster(1400, 480, 260, 70, 'rgba(255, 215, 125, 0.90)');
  // Nam Mỹ & Châu Phi
  drawCityCluster(580, 740, 140, 65, 'rgba(255, 195, 95, 0.80)');
  drawCityCluster(1080, 580, 120, 80, 'rgba(255, 190, 90, 0.75)');

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
    this.sunMat = null;
    this.earthCloudMesh = null;

    this.focusedPlanet = null;
    this.isWarpMode = false;
    this.warpSpeed = 0;
    this.targetFOV = 48;

    // Cinematic Spline Transition System (Milestone D)
    this.isTransitioning = false;
    this.transitionProgress = 0;
    this.transitionDuration = 1.6;
    this.transStartCam = new THREE.Vector3();
    this.transEndCam = new THREE.Vector3();
    this.transStartTarget = new THREE.Vector3();
    this.transEndTarget = new THREE.Vector3();
    this.transMidControl = new THREE.Vector3();
    this.targetFocusMesh = null;
    this.targetFollowOffset = new THREE.Vector3();
    this.targetLateralOffset = new THREE.Vector3();

    // Vectors
    this.tempVecA = new THREE.Vector3();
    this.tempVecB = new THREE.Vector3();
    this.lastTargetPos = new THREE.Vector3();
    this.camFollowOffset = new THREE.Vector3(0, 40, 90);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1000, -1000);

    this.arLabels = new Map();
    this.arLabelEntries = [];
    this.clock = new THREE.Clock();

    // Điều khiển dòng thời gian & Chế độ Chụp ảnh
    this.timeScale = 1.0;
    this.isPaused = false;
    this.sunShaderTime = 0.0;
    this.isPhotoMode = false;

    // Loading Manager cho Sci-Fi Telemetry Preloader
    this.loadingManager = new THREE.LoadingManager(
      () => {
        if (dom.preloader) {
          if (dom.preloaderPercent) dom.preloaderPercent.textContent = '100%';
          if (dom.preloaderFillBar) dom.preloaderFillBar.style.width = '100%';
          if (dom.preloaderItemText) dom.preloaderItemText.textContent = 'ĐÃ ĐỒNG BỘ TOÀN DIỆN THIÊN VĂN // SẴN SÀNG';
          setTimeout(() => {
            dom.preloader.classList.add('preloader-fade-out');
            setTimeout(() => { dom.preloader.hidden = true; }, 800);
          }, 350);
        }
      },
      (url, itemsLoaded, itemsTotal) => {
        const pct = Math.round((itemsLoaded / itemsTotal) * 100);
        if (dom.preloaderPercent) dom.preloaderPercent.textContent = `${pct.toString().padStart(2, '0')}%`;
        if (dom.preloaderFillBar) dom.preloaderFillBar.style.width = `${pct}%`;
        const filename = url.split('/').pop() || url;
        if (dom.preloaderItemText) dom.preloaderItemText.textContent = `NẠP DỮ LIỆU VIỄN TRẮC: ${filename}`;
      }
    );
    this.textureLoader = new THREE.TextureLoader(this.loadingManager);

    // Unreal Bloom Post-Processing Pipeline & Comet
    this.composer = null;
    this.bloomPass = null;
    this.cometSystem = null;

    // Camera-attached objects
    this.cameraFillLight = null;
    this.warpTunnelGroup = null;
    this.warpStreakPositions = null;
    this.warpStreakGeom = null;
    this.warpTunnelLines = null;

    // Performance & Dynamic Quality Scaler (Milestone E)
    this.rafId = null;
    this.fpsWindow = [];
    this.fpsWindowSize = 45;
    this.lastFpsCheckTime = 0;
    this.qualityTier = 2; // 2: High (DPR 2.0), 1: Balanced (DPR 1.4), 0: PowerSave (DPR 1.0)
    this.lowFpsDuration = 0;
    this.highFpsDuration = 0;
    this.currentDpr = Math.min(window.devicePixelRatio || 1, 2.0);
  }

  init() {
    if (!dom.canvas) return;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04060e);

    // 2. Camera & Overview Position (Lỗi 6: Tự động tính toán để vừa khung với lề >= 4%)
    this.camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 1.0, 6000);
    const initialCamPos = this.getOverviewCameraPosition();
    this.camera.position.copy(initialCamPos);
    this.scene.add(this.camera);

    // 3. WebGL Renderer & Pipeline Tone Mapping ACESFilmic (DPR Clamped to 2.0)
    this.renderer = new THREE.WebGLRenderer({
      canvas: dom.canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(this.currentDpr);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    // 3.1 Unreal Bloom Post-Processing Pipeline (Threshold 0.85 giữ sắc đen sâu thẳm Ngân Hà)
    const renderScene = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.68, // Strength: vầng plasma rực rỡ nhưng không chói lóa
      0.35, // Radius
      0.85  // Threshold > 0.85: chỉ phát quang các nguồn năng lượng cực đại
    );
    const outputPass = new OutputPass();

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(outputPass);
    this.composer.setPixelRatio(this.currentDpr);

    // 4. Controls (Smooth Damping & 100% Free Mouse Zoom & Touch Normalization)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.055;
    this.controls.rotateSpeed = 0.55;
    this.controls.zoomSpeed = 1.15;
    this.controls.minDistance = 8.0;
    this.controls.maxDistance = 3500;
    this.controls.target.set(0, 0, 0);

    // Chuẩn hóa cảm ứng di động: 1 ngón xoay góc nhìn, 2 ngón zoom / trượt (Milestone E)
    this.controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    };

    // Hỗ trợ ngắt chuyển cảnh an toàn (Zero-jump Interruptibility) trên chuột, con lăn và cảm ứng chạm
    const interruptTransition = () => {
      if (this.isTransitioning) {
        this.isTransitioning = false;
        if (this.targetFocusMesh) {
          this.targetFocusMesh.getWorldPosition(this.lastTargetPos);
          this.camFollowOffset.copy(this.camera.position).sub(this.lastTargetPos);
        }
      }
    };

    this.controls.addEventListener('start', interruptTransition);
    if (dom.canvas) {
      dom.canvas.addEventListener('touchstart', interruptTransition, { passive: true });
      dom.canvas.addEventListener('wheel', interruptTransition, { passive: true });
    }

    // 6. Hệ Thống Ánh Sáng Vũ Trụ Chuẩn Vật Lý (Physical Space Lighting Hierarchy)
    // a. Nguồn sáng Mặt Trời trung tâm (PointLight tỏa ra toàn hệ, decay=0 trong chân không vũ trụ)
    const sunLight = new THREE.PointLight(0xfff5e6, 5.8, 0, 0.0);
    sunLight.position.set(0, 0, 0);
    this.scene.add(sunLight);

    // b. Ánh sáng môi trường vũ trụ sâu (Faint Ambient Galactic Starlight)
    const ambientLight = new THREE.AmbientLight(0x0e1726, 0.22);
    this.scene.add(ambientLight);

    // c. Ánh sáng nhẹ bổ trợ góc nhìn camera (Subtle Directional Rim Fill)
    this.cameraFillLight = new THREE.DirectionalLight(0xd1d5db, 0.35);
    this.camera.add(this.cameraFillLight);

    // 7. Xây dựng môi trường vũ trụ đa tầng
    this.buildCosmicNebulaSkybox();
    this.buildMultiTierStarfield();
    this.buildTheSun();
    this.buildPlanetsAndOrbits();
    this.buildAsteroidBelt();
    this.buildCameraWarpTunnel();
    this.buildWarpSpline();

    // 7.1 Hệ thống Sao chổi Định kỳ (Cosmic Comet Event — 45s cycle)
    this.cometSystem = new CosmicCometSystem(this.scene);

    // 8. Giao diện HUD và sự kiện
    this.buildHUDNavigationPills();
    this.setupEventListeners();

    // 9. Bắt đầu vòng lặp render
    this.animate();

    // Công cụ đo kiểm tra đường kính chiếu hành tinh theo pixel (Lỗi 5)
    window.solarEngine = this;
    window.getPlanetPixelDiameters = () => {
      const results = {};
      SOLAR_SYSTEM_DATA.forEach((data) => {
        const mesh = this.planetMeshes.get(data.id);
        if (!mesh) return;
        const c = mesh.getWorldPosition(new THREE.Vector3());
        const e = c.clone().add(new THREE.Vector3(data.size, 0, 0).applyQuaternion(this.camera.quaternion));
        const a = c.clone().project(this.camera);
        const b = e.clone().project(this.camera);
        const px = 2 * Math.abs(b.x - a.x) * this.renderer.domElement.clientWidth / 2;
        results[data.id] = parseFloat(px.toFixed(1));
      });
      console.table(results);
      return results;
    };
  }

  /**
   * Tính toán vị trí camera tổng quan tự động theo FOV và bán kính Pluto (Lỗi 6)
   */
  getOverviewCameraPosition() {
    const maxR = 970.0;
    const margin = 1.06; // Lề >= 4%
    const fovRad = (this.camera.fov * Math.PI) / 180;
    const aspect = Math.max(0.1, window.innerWidth / window.innerHeight);
    const halfH = Math.tan(fovRad * 0.5);
    const halfW = halfH * aspect;
    const distV = (maxR * margin) / halfH;
    const distH = (maxR * margin) / halfW;
    const requiredDist = Math.max(distV, distH) * 0.94;
    const elevation = Math.PI * 0.32; // Góc nâng ~57 độ
    return new THREE.Vector3(
      0,
      requiredDist * Math.sin(elevation),
      requiredDist * Math.cos(elevation)
    );
  }

  /**
   * Bầu trời sâu dải Ngân Hà (Lỗi 7: Xanh đen trung tính, không dùng tím/hồng)
   */
  buildCosmicNebulaSkybox() {
    const skyGeom = new THREE.SphereGeometry(3500, 48, 48);
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

          // Xanh đen vũ trụ trung tính không tím/hồng
          vec3 deepSpace = vec3(0.012, 0.016, 0.028);
          vec3 cosmicBlue = vec3(0.022, 0.038, 0.068);
          vec3 faintDust = vec3(0.028, 0.046, 0.078);

          float phaseA = sin(dir.x * 2.0 + dir.z * 1.5) * 0.5 + 0.5;
          vec3 col = mix(deepSpace, cosmicBlue, phaseA * 0.40);
          col += faintDust * pow(max(0.0, sin(dir.z * 1.2 + dir.x * 0.9)), 4.0) * 0.22;

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });

    const skyMesh = new THREE.Mesh(skyGeom, skyMat);
    this.scene.add(skyMesh);
  }

  /**
   * Trường sao đa tầng theo luật lũy thừa & 6 nhiệt độ màu Harvard (Lỗi 13)
   */
  buildMultiTierStarfield() {
    const spectralColors = [
      new THREE.Color(0x9db4ff), // O/B Xanh lam sâu
      new THREE.Color(0xf8f9fa), // A Trắng tinh khiết
      new THREE.Color(0xfff4e8), // F Trắng ngà
      new THREE.Color(0xffdd6f), // G Hoàng kim Mặt Trời
      new THREE.Color(0xffa847), // K Cam ấm
      new THREE.Color(0xff6f59)  // M Đỏ cam
    ];

    // Tầng 1: 7.200 hạt sao mờ nền xa (85% sao tổng thể, size 1.4 - 2.5px)
    const faintCount = 7200;
    const faintGeom = new THREE.BufferGeometry();
    const faintPos = new Float32Array(faintCount * 3);
    const faintColors = new Float32Array(faintCount * 3);

    for (let i = 0; i < faintCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1200 + Math.random() * 1200;

      faintPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      faintPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      faintPos[i * 3 + 2] = r * Math.cos(phi);

      const c = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      const dimFactor = 0.45 + Math.random() * 0.45;
      faintColors[i * 3] = c.r * dimFactor;
      faintColors[i * 3 + 1] = c.g * dimFactor;
      faintColors[i * 3 + 2] = c.b * dimFactor;
    }
    faintGeom.setAttribute('position', new THREE.BufferAttribute(faintPos, 3));
    faintGeom.setAttribute('color', new THREE.BufferAttribute(faintColors, 3));

    const faintMat = new THREE.PointsMaterial({
      size: 2.0,
      map: createGaussianStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: false
    });
    this.scene.add(new THREE.Points(faintGeom, faintMat));

    // Tầng 2: 1.200 sao trung bình (12% sao, size 4 - 6px)
    const midCount = 1200;
    const midGeom = new THREE.BufferGeometry();
    const midPos = new Float32Array(midCount * 3);
    const midColors = new Float32Array(midCount * 3);

    for (let i = 0; i < midCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1100 + Math.random() * 1300;

      midPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      midPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      midPos[i * 3 + 2] = r * Math.cos(phi);

      const c = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      midColors[i * 3] = c.r;
      midColors[i * 3 + 1] = c.g;
      midColors[i * 3 + 2] = c.b;
    }
    midGeom.setAttribute('position', new THREE.BufferAttribute(midPos, 3));
    midGeom.setAttribute('color', new THREE.BufferAttribute(midColors, 3));

    const midMat = new THREE.PointsMaterial({
      size: 5.0,
      map: createGaussianStarTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: false
    });
    this.scene.add(new THREE.Points(midGeom, midMat));

    // Tầng 3: 120 Đại Tinh Tú lấp lánh 4 cánh (3% sao, sáng rực rỡ)
    const gemCount = 120;
    const gemGeom = new THREE.BufferGeometry();
    const gemPos = new Float32Array(gemCount * 3);
    const gemColors = new Float32Array(gemCount * 3);

    for (let i = 0; i < gemCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1000 + Math.random() * 1400;

      gemPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      gemPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      gemPos[i * 3 + 2] = r * Math.cos(phi);

      const c = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      gemColors[i * 3] = c.r * 1.3;
      gemColors[i * 3 + 1] = c.g * 1.3;
      gemColors[i * 3 + 2] = c.b * 1.3;
    }
    gemGeom.setAttribute('position', new THREE.BufferAttribute(gemPos, 3));
    gemGeom.setAttribute('color', new THREE.BufferAttribute(gemColors, 3));

    const gemMat = new THREE.PointsMaterial({
      size: 24.0,
      map: createStellarGemTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
    this.scene.add(new THREE.Points(gemGeom, gemMat));
  }

  /**
   * Mặt Trời trung tâm tự phát sáng HDR, không có vùng đen (Lỗi 2)
   */
  buildTheSun() {
    const sunGeom = new THREE.SphereGeometry(SOLAR_SYSTEM_DATA[0].size || 58.0, 96, 96);
    const fallbackTex = createSmoothVectorTexture('sun', 0xffb703, 0xfb8500);

    const sunUniforms = {
      uTime: { value: 0.0 },
      uSunTex: { value: fallbackTex }
    };

    const sunMat = new THREE.ShaderMaterial({
      uniforms: sunUniforms,
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform sampler2D uSunTex;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;

        void main() {
          // Dynamic Solar Convection Granulation
          vec2 p1 = vUv * 24.0 + vec2(uTime * 0.020, uTime * 0.012);
          vec2 p2 = vUv * 48.0 - vec2(uTime * 0.035, uTime * 0.025);
          float gran1 = sin(p1.x) * cos(p1.y);
          float gran2 = sin(p2.x) * cos(p2.y);
          float gran = (gran1 + gran2 * 0.5) * 0.5 + 0.5;

          // View Space Limb Darkening (Tự phát sáng, không có nửa tối)
          vec3 viewDir = normalize(vViewPosition);
          float NdotV = clamp(dot(normalize(vNormal), viewDir), 0.0, 1.0);
          float limb = pow(NdotV, 0.38);

          vec4 texColor = texture2D(uSunTex, vUv);
          vec3 coreHot = vec3(1.0, 0.96, 0.88);
          vec3 midSun = vec3(1.0, 0.72, 0.20);
          vec3 limbSun = vec3(0.85, 0.32, 0.05);

          vec3 baseSun = mix(midSun, coreHot, gran * 0.35);
          vec3 solarGrad = mix(limbSun, baseSun, limb);
          vec3 finalColor = solarGrad * texColor.rgb * 1.35;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    this.sunMat = sunMat;
    this.sunMesh = new THREE.Mesh(sunGeom, sunMat);
    this.sunMesh.userData = { isPlanet: true, data: SOLAR_SYSTEM_DATA[0] };
    this.scene.add(this.sunMesh);

    // Tải ảnh thực tế NASA từ thư mục public/planets/sun.jpg
    this.textureLoader.load('./planets/sun.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      if (this.renderer) {
        tex.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
      }
      sunUniforms.uSunTex.value = tex;
    });

    // Vầng hào quang nhật hoa 3 tầng (Triple-tier Additive Corona Halo Sprites)
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 256;
    haloCanvas.height = 256;
    const hCtx = haloCanvas.getContext('2d');
    const hGrad = hCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    hGrad.addColorStop(0.0, 'rgba(255, 252, 235, 1.0)');
    hGrad.addColorStop(0.20, 'rgba(254, 215, 170, 0.85)');
    hGrad.addColorStop(0.48, 'rgba(249, 115, 22, 0.50)');
    hGrad.addColorStop(0.75, 'rgba(194, 65, 12, 0.22)');
    hGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0.0)');
    hCtx.fillStyle = hGrad;
    hCtx.fillRect(0, 0, 256, 256);

    const haloTex = new THREE.CanvasTexture(haloCanvas);

    // Tầng 1: Lõi quang cầu rực rỡ
    const haloMatA = new THREE.SpriteMaterial({
      map: haloTex,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const spriteA = new THREE.Sprite(haloMatA);
    spriteA.scale.set(170, 170, 1);
    this.sunMesh.add(spriteA);
    this.sunHaloA = spriteA;

    // Tầng 2: Vầng sắc cầu trung gian
    const haloMatB = new THREE.SpriteMaterial({
      map: haloTex,
      color: 0xfb923c,
      transparent: true,
      opacity: 0.70,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const spriteB = new THREE.Sprite(haloMatB);
    spriteB.scale.set(260, 260, 1);
    this.sunMesh.add(spriteB);
    this.sunHaloB = spriteB;

    // Tầng 3: Vành nhật hoa lan tỏa
    const haloMatC = new THREE.SpriteMaterial({
      map: haloTex,
      color: 0xea580c,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const spriteC = new THREE.Sprite(haloMatC);
    spriteC.scale.set(380, 380, 1);
    this.sunMesh.add(spriteC);
    this.sunHaloC = spriteC;

    this.planetMeshes.set('sun', this.sunMesh);
    this.createARLabel(SOLAR_SYSTEM_DATA[0], this.sunMesh);
  }

  /**
   * Xây dựng 8 Hành tinh + Diêm Vương tinh chuẩn PBR AAA với bề mặt chi tiết cao
   */
  buildPlanetsAndOrbits() {
    SOLAR_SYSTEM_DATA.forEach((data) => {
      if (data.isStar) return;

      // 1. Quỹ đạo thiên văn 3D (với độ nghiêng trục z-y chân thực)
      const orbitPoints = [];
      const segments = 360;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const ox = Math.cos(theta) * data.a;
        const oz = Math.sin(theta) * data.a;
        const oy = Math.sin(theta) * (data.incAmp || 0);
        orbitPoints.push(new THREE.Vector3(ox, oy, oz));
      }
      const orbitGeom = new THREE.BufferGeometry().setFromPoints(orbitPoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: data.color || 0x64748b,
        transparent: true,
        opacity: 0.35
      });
      const orbitLine = new THREE.Line(orbitGeom, orbitMat);
      this.scene.add(orbitLine);
      this.orbitLines.push(orbitLine);

      // 2. Nhóm Neo Quỹ Đạo (Orbit Anchor) đặt tại tọa độ quỹ đạo
      const orbitAnchor = new THREE.Group();
      orbitAnchor.userData = { isPlanet: true, data };
      this.scene.add(orbitAnchor);

      // 3. Nhóm Nghiêng Trục Tự Quay Chuẩn Thiên Văn (Axial Tilt Group)
      const tiltGroup = new THREE.Group();
      if (data.tilt) {
        tiltGroup.rotation.z = data.tilt;
      }
      orbitAnchor.add(tiltGroup);

      // 4. Khối cầu hành tinh kích thước lớn, vật liệu PBR đặc thù cho từng thiên thể
      const planetGeom = new THREE.SphereGeometry(data.size, 96, 96);
      const fallbackTex = createSmoothVectorTexture(data.id, data.color, data.glowColor);

      // Tinh chỉnh PBR khoa học cho từng hành tinh với kết cấu 2K Equirectangular
      let roughness = 0.45;
      let metalness = 0.02;
      let bumpScale = 0.0;
      let bumpMap = null;
      let roughnessMap = null;

      if (data.id === 'mercury') {
        roughness = 0.90;
        metalness = 0.05;
        bumpScale = 0.38;
        bumpMap = createTerrainBumpMap('mercury');
      } else if (data.id === 'venus') {
        roughness = 0.72;
        metalness = 0.01;
      } else if (data.id === 'earth') {
        roughness = 0.48;
        metalness = 0.03;
        roughnessMap = createEarthRoughnessMap();
        bumpScale = 0.32;
        bumpMap = createTerrainBumpMap('earth');
      } else if (data.id === 'mars') {
        roughness = 0.82;
        metalness = 0.05;
        bumpScale = 0.42;
        bumpMap = createTerrainBumpMap('mars');
      } else if (data.id === 'jupiter') {
        roughness = 0.38;
        metalness = 0.01;
      } else if (data.id === 'saturn') {
        roughness = 0.40;
        metalness = 0.01;
      } else if (data.id === 'uranus') {
        roughness = 0.46;
        metalness = 0.01;
      } else if (data.id === 'neptune') {
        roughness = 0.44;
        metalness = 0.01;
      } else if (data.id === 'pluto') {
        roughness = 0.82;
        metalness = 0.04;
        bumpScale = 0.35;
        bumpMap = createTerrainBumpMap('pluto');
      }

      // Không dùng emissive màu phẳng để tạo đường phân cách sáng/tối sắc nét như không gian thực
      const planetMat = new THREE.MeshStandardMaterial({
        map: fallbackTex,
        roughness,
        metalness,
        bumpMap,
        bumpScale,
        roughnessMap,
        emissive: new THREE.Color(0x000000)
      });

      const planetMesh = new THREE.Mesh(planetGeom, planetMat);
      planetMesh.userData = { isPlanet: true, data };
      tiltGroup.add(planetMesh);

      // Nạp ảnh chụp NASA 2K thực tế từ thư mục public/planets/ với Anisotropic Filtering
      if (data.textureFile) {
        this.textureLoader.load(data.textureFile, (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.wrapS = THREE.RepeatWrapping;
          tex.wrapT = THREE.ClampToEdgeWrapping;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = true;
          if (this.renderer) {
            tex.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
          }
          planetMat.map = tex;
          planetMat.needsUpdate = true;
        });
      }

      // 5. Mây khí quyển độc lập 2K & Hào quang tán xạ Rayleigh cho Trái Đất
      if (data.id === 'earth') {
        // a. Lớp mây xoáy độc lập (Earth Cloud Sphere) dùng kết cấu 2K thực tế
        const cloudGeom = new THREE.SphereGeometry(data.size * 1.014, 64, 64);
        const cloudMat = new THREE.MeshStandardMaterial({
          transparent: true,
          opacity: 0.90,
          roughness: 0.92,
          metalness: 0.0,
          depthWrite: false,
          blending: THREE.NormalBlending
        });

        this.textureLoader.load('./planets/earth_clouds.jpg', (cTex) => {
          cTex.colorSpace = THREE.SRGBColorSpace;
          cTex.wrapS = THREE.RepeatWrapping;
          cTex.wrapT = THREE.ClampToEdgeWrapping;
          cTex.minFilter = THREE.LinearMipmapLinearFilter;
          cTex.magFilter = THREE.LinearFilter;
          cTex.generateMipmaps = true;
          if (this.renderer) {
            cTex.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
          }
          cloudMat.map = cTex;
          cloudMat.alphaMap = cTex;
          cloudMat.needsUpdate = true;
        });

        const cloudMesh = new THREE.Mesh(cloudGeom, cloudMat);
        tiltGroup.add(cloudMesh);
        this.earthCloudMesh = cloudMesh;

        // b. Hào quang tán xạ khí quyển Rayleigh (Atmospheric Rim Glow)
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.045, 64, 64);
        const atmoMat = createAtmosphereShaderMaterial(0x38bdf8, 0.95, 2.2);
        const atmoMesh = new THREE.Mesh(atmoGeom, atmoMat);
        tiltGroup.add(atmoMesh);
      } else if (data.id === 'venus') {
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.04, 64, 64);
        const atmoMat = createAtmosphereShaderMaterial(0xfde047, 0.75, 2.5);
        tiltGroup.add(new THREE.Mesh(atmoGeom, atmoMat));
      } else if (data.id === 'mars') {
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.035, 64, 64);
        const atmoMat = createAtmosphereShaderMaterial(0xf97316, 0.55, 3.0);
        tiltGroup.add(new THREE.Mesh(atmoGeom, atmoMat));
      } else if (data.id === 'jupiter') {
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.035, 64, 64);
        const atmoMat = createAtmosphereShaderMaterial(0xfef08a, 0.50, 2.8);
        tiltGroup.add(new THREE.Mesh(atmoGeom, atmoMat));
      } else if (data.id === 'saturn') {
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.035, 64, 64);
        const atmoMat = createAtmosphereShaderMaterial(0xfde68a, 0.45, 2.8);
        tiltGroup.add(new THREE.Mesh(atmoGeom, atmoMat));
      } else if (data.id === 'uranus') {
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.04, 64, 64);
        const atmoMat = createAtmosphereShaderMaterial(0x67e8f9, 0.70, 2.4);
        tiltGroup.add(new THREE.Mesh(atmoGeom, atmoMat));
      } else if (data.id === 'neptune') {
        const atmoGeom = new THREE.SphereGeometry(data.size * 1.04, 64, 64);
        const atmoMat = createAtmosphereShaderMaterial(0x3b82f6, 0.80, 2.3);
        tiltGroup.add(new THREE.Mesh(atmoGeom, atmoMat));
      }

      // 6. Hệ thống vành đai thiên văn gắn theo trục nghiêng (Saturn, Uranus, Neptune)
      if (data.hasRings) {
        if (data.id === 'saturn') {
          const ringGeom = new THREE.RingGeometry(data.ringInner, data.ringOuter, 256, 1);
          const pos = ringGeom.attributes.position;
          const uvs = ringGeom.attributes.uv;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const r = Math.sqrt(x * x + y * y);
            const u = (r - data.ringInner) / (data.ringOuter - data.ringInner);
            uvs.setXY(i, u, 0.5);
          }
          uvs.needsUpdate = true;
          ringGeom.rotateX(Math.PI * 0.5);

          const ringTex = createSaturnRingsTexture();
          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95,
            roughness: 0.45,
            depthWrite: false
          });
          const ringMesh = new THREE.Mesh(ringGeom, ringMat);
          ringMesh.renderOrder = 2;
          tiltGroup.add(ringMesh);
        } else if (data.id === 'uranus') {
          const ringGeom = new THREE.RingGeometry(data.ringInner, data.ringOuter, 180, 1);
          const pos = ringGeom.attributes.position;
          const uvs = ringGeom.attributes.uv;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const r = Math.sqrt(x * x + y * y);
            const u = (r - data.ringInner) / (data.ringOuter - data.ringInner);
            uvs.setXY(i, u, 0.5);
          }
          uvs.needsUpdate = true;
          ringGeom.rotateX(Math.PI * 0.5);

          const ringTex = createUranusRingsTexture();
          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.75,
            roughness: 0.50,
            depthWrite: false
          });
          const ringMesh = new THREE.Mesh(ringGeom, ringMat);
          ringMesh.renderOrder = 2;
          tiltGroup.add(ringMesh);
        } else if (data.id === 'neptune') {
          const ringGeom = new THREE.RingGeometry(data.ringInner, data.ringOuter, 180, 1);
          const pos = ringGeom.attributes.position;
          const uvs = ringGeom.attributes.uv;
          for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const r = Math.sqrt(x * x + y * y);
            const u = (r - data.ringInner) / (data.ringOuter - data.ringInner);
            uvs.setXY(i, u, 0.5);
          }
          uvs.needsUpdate = true;
          ringGeom.rotateX(Math.PI * 0.5);

          const ringTex = createNeptuneRingsTexture();
          const ringMat = new THREE.MeshStandardMaterial({
            map: ringTex,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.60,
            roughness: 0.50,
            depthWrite: false
          });
          const ringMesh = new THREE.Mesh(ringGeom, ringMat);
          ringMesh.renderOrder = 2;
          tiltGroup.add(ringMesh);
        }
      }

      // 7. Vệ tinh tự nhiên (Moons) với quỹ đạo độc lập quanh hành tinh
      if (data.moons && data.moons.length > 0) {
        data.moons.forEach((m) => {
          const moonPivot = new THREE.Group();
          moonPivot.rotation.x = (Math.random() - 0.5) * 0.25;
          orbitAnchor.add(moonPivot);

          const moonGeom = new THREE.SphereGeometry(m.size, 32, 32);
          const moonMat = new THREE.MeshStandardMaterial({
            color: m.color,
            roughness: m.name === 'Europa' ? 0.20 : 0.88,
            metalness: 0.04,
            bumpMap: createTerrainBumpMap('moon'),
            bumpScale: 0.25,
            emissive: new THREE.Color(0x000000)
          });

          if (m.name === 'Mặt Trăng') {
            this.textureLoader.load('./planets/moon.jpg', (mTex) => {
              mTex.colorSpace = THREE.SRGBColorSpace;
              mTex.wrapS = THREE.RepeatWrapping;
              mTex.wrapT = THREE.ClampToEdgeWrapping;
              mTex.minFilter = THREE.LinearMipmapLinearFilter;
              mTex.magFilter = THREE.LinearFilter;
              mTex.generateMipmaps = true;
              if (this.renderer) {
                mTex.anisotropy = Math.min(16, this.renderer.capabilities.getMaxAnisotropy());
              }
              moonMat.map = mTex;
              moonMat.needsUpdate = true;
            });
          }

          const moonMesh = new THREE.Mesh(moonGeom, moonMat);
          moonMesh.position.set(m.dist, 0, 0);
          moonPivot.add(moonMesh);
          moonPivot.userData = { speed: m.speed };
        });
      }

      this.planets.push({
        data,
        anchor: orbitAnchor,
        planetMesh: planetMesh,
        tiltGroup: tiltGroup,
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
    const asteroidCount = 2200;
    const geom = new THREE.DodecahedronGeometry(0.55, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.75,
      metalness: 0.25,
      emissive: new THREE.Color(0x334155).multiplyScalar(0.15)
    });

    const instancedMesh = new THREE.InstancedMesh(geom, mat, asteroidCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < asteroidCount; i++) {
      const angle = (i / asteroidCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const radius = 380.0 + (Math.random() - 0.5) * 55.0; // Giữa Hỏa tinh (310.0) và Mộc tinh (450.0)
      const height = (Math.random() - 0.5) * 12.0;

      dummy.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      const scale = 0.8 + Math.random() * 2.2;
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(instancedMesh);
    this.asteroidBeltMesh = instancedMesh;
  }

  /**
   * Quỹ đạo hành trình Du hành siêu tốc (Cinematic Hyper-Warp Cruise Spline)
   */
  buildWarpSpline() {
    this.warpSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 260, 680),       // 0. High cosmic approach
      new THREE.Vector3(95, 35, 110),       // 1. Mercury flyby & glowing Sun
      new THREE.Vector3(155, -28, 175),     // 2. Skim past Venus golden cloud deck
      new THREE.Vector3(230, 34, 240),      // 3. Bank past Earth's azure oceans & Moon
      new THREE.Vector3(310, -24, 320),     // 4. Dive through red canyon skies of Mars
      new THREE.Vector3(450, 65, 460),      // 5. Grand sweep past giant Jupiter & Galilean moons
      new THREE.Vector3(600, -42, 610),     // 6. Thrilling glide directly along the luminous rings of Saturn
      new THREE.Vector3(740, 70, -360),     // 7. Dive past rolling ice giant Uranus & vertical rings
      new THREE.Vector3(860, -55, -640),    // 8. Sweep past deep azure storms of Neptune & Triton
      new THREE.Vector3(970, 85, -840),     // 9. Reach the icy heart of Pluto at Kuiper belt edge
      new THREE.Vector3(400, 380, 300)      // 10. Rocket up into deep space to loop seamlessly back
    ], true, 'catmullrom', 0.25);
    this.warpProgress = 0;
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

    const memberSub = data.memberName ? `<span class="ar-label-member">${data.memberName.split(' ').pop()}</span>` : '';
    labelEl.innerHTML = `
      <div class="ar-label-marker">
        <span class="ar-label-symbol">${data.symbol}</span>
        <span class="ar-label-name">${data.vnName}</span>
        ${memberSub}
      </div>
    `;

    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.focusPlanet(data.id);
    });

    dom.labelsContainer.appendChild(labelEl);
    this.arLabels.set(data.id, { el: labelEl, mesh });

    // Pre-allocated entry cho pipeline Zero-Allocation trong RAF (Milestone E)
    this.arLabelEntries.push({
      id: data.id,
      el: labelEl,
      mesh,
      x: 0,
      y: 0,
      opacity: 1.0,
      isFocused: false,
      prevX: -9999,
      prevY: -9999,
      prevOpacity: -1,
      prevVisible: true
    });
  }

  /**
   * Cập nhật vị trí nhãn 2D với cơ chế Zero-Allocation & GPU Composited Transforms (Milestone E)
   */
  updateARLabels() {
    const camDist = this.camera.position.length();
    const count = this.arLabelEntries.length;

    // Bước 1: Tính toán tọa độ chiếu 2D và độ rõ nét trực tiếp trên pool có sẵn (0 GC churn)
    for (let i = 0; i < count; i++) {
      const entry = this.arLabelEntries[i];
      entry.mesh.getWorldPosition(this.tempVecA);
      const rad = entry.mesh.geometry && entry.mesh.geometry.parameters ? entry.mesh.geometry.parameters.radius : 4.0;
      this.tempVecA.y += rad + 4.5; // Neo ngay trên đỉnh cực bắc hành tinh

      this.tempVecA.project(this.camera);

      // Nếu nằm sau camera thì ẩn
      if (this.tempVecA.z > 1.0) {
        entry.opacity = 0.0;
        continue;
      }

      // Tọa độ màn hình 2D
      let screenX = (this.tempVecA.x * 0.5 + 0.5) * window.innerWidth;
      let screenY = (-(this.tempVecA.y * 0.5) + 0.5) * window.innerHeight;

      // Giới hạn biên màn hình (Viewport Bounds Clamping)
      entry.x = THREE.MathUtils.clamp(screenX, 50, window.innerWidth - 65);
      entry.y = THREE.MathUtils.clamp(screenY, 70, window.innerHeight - 70);

      const isFocused = this.focusedPlanet && this.focusedPlanet.id === entry.id;
      const isSun = entry.id === 'sun';

      let targetOpacity = 1.0;
      if (camDist > 2600 && !isFocused && !isSun) {
        targetOpacity = 0.0;
      } else if (camDist > 1900 && !isFocused && !isSun) {
        targetOpacity = THREE.MathUtils.lerp(1.0, 0.40, (camDist - 1900) / 700);
      }

      if (isFocused) {
        targetOpacity = 1.0;
        if (!entry.isFocused) {
          entry.el.classList.add('active-ar-label');
          entry.isFocused = true;
        }
      } else {
        if (entry.isFocused) {
          entry.el.classList.remove('active-ar-label');
          entry.isFocused = false;
        }
      }

      entry.opacity = targetOpacity;
    }

    // Bước 2: Khử chồng lấn (Screen-space 2D Collision Resolution) trực tiếp trên mảng pool
    for (let i = 0; i < count; i++) {
      const a = this.arLabelEntries[i];
      if (a.opacity < 0.1) continue;

      for (let j = i + 1; j < count; j++) {
        const b = this.arLabelEntries[j];
        if (b.opacity < 0.1) continue;

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist2D = Math.sqrt(dx * dx + dy * dy);

        // Nếu 2 nhãn nằm đè lên nhau trong phạm vi 46px
        if (dist2D < 46) {
          if (a.isFocused) {
            b.y += 24;
          } else if (b.isFocused) {
            a.y -= 24;
          } else {
            a.y -= 14;
            b.y += 14;
          }
        }
      }
    }

    // Bước 3: Áp dụng vị trí và độ mờ lên GPU Compositor (Zero Reflow via translate3d)
    for (let i = 0; i < count; i++) {
      const entry = this.arLabelEntries[i];
      const el = entry.el;

      if (entry.opacity < 0.05) {
        if (entry.prevVisible) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          entry.prevVisible = false;
          entry.prevOpacity = 0;
        }
        continue;
      }

      entry.prevVisible = true;

      // Chỉ cập nhật transform khi vị trí dịch chuyển vượt quá threshold 0.4px (triệt tiêu style recalc)
      if (Math.abs(entry.x - entry.prevX) > 0.4 || Math.abs(entry.y - entry.prevY) > 0.4) {
        el.style.transform = `translate3d(${Math.round(entry.x)}px, ${Math.round(entry.y)}px, 0) translate(-50%, -100%)`;
        entry.prevX = entry.x;
        entry.prevY = entry.y;
      }

      // Chỉ cập nhật opacity khi độ lệch lớn hơn 0.02
      if (Math.abs(entry.opacity - entry.prevOpacity) > 0.02) {
        el.style.opacity = entry.opacity.toFixed(2);
        entry.prevOpacity = entry.opacity;
        el.style.pointerEvents = entry.opacity > 0.3 ? 'auto' : 'none';
      }
    }
  }

  /**
   * Nút điều hướng quỹ đạo dưới chân trang (Tiếng Việt đồng bộ)
   */
  buildHUDNavigationPills() {
    if (!dom.navPillsContainer) return;
    dom.navPillsContainer.innerHTML = '';

    SOLAR_SYSTEM_DATA.forEach((data) => {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'orbit-pill font-mono';
      pill.setAttribute('data-id', data.id);

      const memberBadge = data.memberName ? `<span class="orbit-pill-member">${data.memberName.split(' ').pop()}</span>` : '';

      pill.innerHTML = `
        <span class="orbit-pill-symbol">${data.symbol}</span>
        <span class="orbit-pill-name">${data.vnName}</span>
        ${memberBadge}
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
    if (this.isTransitioning) {
      this.isTransitioning = false;
      if (this.targetFocusMesh) {
        this.targetFocusMesh.getWorldPosition(this.lastTargetPos);
        this.camFollowOffset.copy(this.camera.position).sub(this.lastTargetPos);
      }
    }

    const camToTarget = this.tempVecA.copy(this.camera.position).sub(this.controls.target);
    const currentDist = camToTarget.length();
    const newDist = THREE.MathUtils.clamp(currentDist * factor, this.controls.minDistance, this.controls.maxDistance);

    camToTarget.setLength(newDist);
    this.camera.position.copy(this.controls.target).add(camToTarget);
    this.controls.update();
  }

  /**
   * Tạm dừng / Tiếp tục dòng thời gian Hệ Mặt Trời (Spacebar Orbit Pause)
   */
  togglePause() {
    this.isPaused = !this.isPaused;
    if (dom.btnTimeToggle) {
      dom.btnTimeToggle.classList.toggle('is-paused', this.isPaused);
    }
    if (dom.timePlayIcon) {
      dom.timePlayIcon.textContent = this.isPaused ? '▶' : '❚❚';
    }
    if (dom.currentFocusReadout) {
      if (this.isPaused) {
        dom.currentFocusReadout.textContent = 'DÒNG THỜI GIAN // TẠM DỪNG QUỸ ĐẠO [SPACE]';
      } else {
        dom.currentFocusReadout.textContent = this.focusedPlanet
          ? `${this.focusedPlanet.name.toUpperCase()} // KHÓA MỤC TIÊU // ${this.timeScale}x`
          : `HỆ MẶT TRỜI // TOÀN CẢNH QUỸ ĐẠO // ${this.timeScale}x`;
      }
    }
    audio.playCelestialChime(this.isPaused ? 320 : 520);
  }

  /**
   * Thay đổi tốc độ mô phỏng thiên văn (Time Scrubbing 0.2x – 8x)
   */
  setTimeScale(scale) {
    this.timeScale = Math.max(0.1, Math.min(10.0, scale));
    if (this.isPaused) {
      this.isPaused = false;
      if (dom.btnTimeToggle) dom.btnTimeToggle.classList.remove('is-paused');
      if (dom.timePlayIcon) dom.timePlayIcon.textContent = '❚❚';
    }
    if (dom.timeSpeedButtons) {
      dom.timeSpeedButtons.forEach((btn) => {
        const s = parseFloat(btn.dataset.speed);
        btn.classList.toggle('active', Math.abs(s - this.timeScale) < 0.05);
      });
    }
    if (dom.currentFocusReadout) {
      dom.currentFocusReadout.textContent = this.focusedPlanet
        ? `${this.focusedPlanet.name.toUpperCase()} // TỐC ĐỘ: ${this.timeScale}x`
        : `HỆ MẶT TRỜI // TỐC ĐỘ: ${this.timeScale}x`;
    }
    audio.playCelestialChime(380 + this.timeScale * 35);
  }

  /**
   * Bật / Tắt chế độ quan sát toàn cảnh không HUD (Clean Photo Mode [H])
   */
  togglePhotoMode() {
    this.isPhotoMode = !this.isPhotoMode;
    document.body.classList.toggle('hud-photo-mode', this.isPhotoMode);
    if (dom.photoModeToast) {
      dom.photoModeToast.hidden = !this.isPhotoMode;
    }
    audio.playCelestialChime(this.isPhotoMode ? 600 : 420);
  }

  /**
   * Tiếp cận hành tinh (Cinematic 3D Bezier Flight & Orbit Lock)
   */
  focusPlanet(id) {
    const data = SOLAR_SYSTEM_DATA.find((p) => p.id === id);
    if (!data) return;

    if (this.isWarpMode) {
      this.isWarpMode = false;
      this.controls.enabled = true;
      if (dom.btnModeOrbit && dom.btnModeWarp) {
        dom.btnModeOrbit.classList.add('active');
        dom.btnModeWarp.classList.remove('active');
      }
      if (this.warpTunnelLines) {
        this.warpTunnelLines.material.opacity = 0.0;
      }
      this.targetFOV = 48;
    }

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
      this.targetFocusMesh = mesh;
      mesh.getWorldPosition(this.lastTargetPos);

      // Khoảng cách camera tối ưu cho từng hành tinh lớn
      const dist = data.isStar ? 135.0 : data.size * 2.6 + 25.0;
      this.targetFollowOffset.set(dist * 0.7, dist * 0.35, dist * 0.85);

      // Cinematic Framing: dịch nhẹ target sang bên để thiên thể nằm tại 60% bên trái màn hình
      const camDir = new THREE.Vector3();
      this.camera.getWorldDirection(camDir);
      const sideVec = new THREE.Vector3().crossVectors(camDir, this.camera.up).normalize();
      this.targetLateralOffset.copy(window.innerWidth > 900 ? sideVec.multiplyScalar(dist * 0.24) : new THREE.Vector3());

      // Thiết lập tọa độ điểm xuất phát
      this.transStartCam.copy(this.camera.position);
      this.transStartTarget.copy(this.controls.target);

      // Thiết lập tọa độ điểm đích
      this.transEndTarget.copy(this.lastTargetPos).add(this.targetLateralOffset);
      this.transEndCam.copy(this.lastTargetPos).add(this.targetFollowOffset);

      // Tính điểm uốn cong không gian (Apex Curve): Nâng nhẹ trục Y để tránh va chạm đĩa hành tinh
      const flightDist = this.transStartCam.distanceTo(this.transEndCam);
      this.transMidControl.copy(this.transStartCam).lerp(this.transEndCam, 0.5);
      const arcElevation = THREE.MathUtils.clamp(flightDist * 0.22, 45, 140);
      this.transMidControl.y += arcElevation;

      // Thời lượng chuyển cảnh tối ưu hóa theo khoảng cách
      this.transitionDuration = this.isWarpMode ? 0.75 : THREE.MathUtils.clamp(1.1 + flightDist * 0.0015, 1.1, 2.0);
      this.transitionProgress = 0;
      this.isTransitioning = true;
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
   * Mở bảng chi tiết thiên văn & thành viên UTH (Milestone A)
   */
  openDetailPanel(data) {
    if (!dom.detailPanel) return;
    dom.detailPanel.hidden = false;
    dom.detailPanel.classList.add('panel-active');
    dom.detailPanel.classList.add('panel-open');
    document.body.classList.add('detail-panel-open');

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

    const avatarImg = document.getElementById('panelAvatarImg');
    const monogramEl = document.getElementById('panelMonogram');

    if (avatarImg && mem) {
      // Xác định nguồn ảnh đại diện an toàn đa tầng (Vite bundle asset -> Public avatars -> Relative member path -> SVG fallback -> Monogram)
      const primaryAvatar = (mem.id === 'le-nguyen-nhat-truong')
        ? (truongAvatarUrl || mem.avatar || './avatars/le-nguyen-nhat-truong.png')
        : (mem.avatar || `./avatars/${mem.id}.png`);

      avatarImg.src = primaryAvatar;
      avatarImg.alt = mem.name;
      avatarImg.hidden = false;
      if (monogramEl) monogramEl.hidden = true;

      const fallbackList = [
        `./avatars/${mem.id}.png`,
        `./members/${mem.id}/images/avatar.png`,
        `./members/${mem.id}/images/avatar.svg`,
        `./avatars/${mem.id}.svg`
      ];
      let fallbackIndex = 0;

      avatarImg.onerror = () => {
        while (fallbackIndex < fallbackList.length) {
          const nextSrc = fallbackList[fallbackIndex++];
          if (nextSrc !== avatarImg.src) {
            avatarImg.src = nextSrc;
            return;
          }
        }
        avatarImg.hidden = true;
        if (monogramEl) {
          monogramEl.hidden = false;
          monogramEl.textContent = data.symbol;
        }
      };
    } else {
      if (avatarImg) avatarImg.hidden = true;
      if (monogramEl) {
        monogramEl.hidden = false;
        monogramEl.textContent = data.symbol;
      }
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

    const panelSkillsBlock = document.getElementById('panelSkillsBlock');
    if (panelSkillsBlock && dom.panelTagsList) {
      dom.panelTagsList.innerHTML = '';
      const tags = (mem && Array.isArray(mem.tags)) ? mem.tags : [];
      if (tags.length > 0) {
        panelSkillsBlock.hidden = false;
        tags.forEach((tag) => {
          const span = document.createElement('span');
          span.className = 'panel-skill-tag font-mono';
          span.textContent = tag;
          dom.panelTagsList.appendChild(span);
        });
      } else {
        panelSkillsBlock.hidden = true;
      }
    }
  }

  /**
   * Trở về góc nhìn toàn cảnh Hệ Mặt Trời (Overview Orbit — Smooth Pull-back Arc)
   */
  resetToOverview() {
    if (this.isWarpMode) {
      this.isWarpMode = false;
      this.controls.enabled = true;
      if (dom.btnModeOrbit && dom.btnModeWarp) {
        dom.btnModeOrbit.classList.add('active');
        dom.btnModeWarp.classList.remove('active');
      }
      if (this.warpTunnelLines) {
        this.warpTunnelLines.material.opacity = 0.0;
      }
      this.targetFOV = 48;
    }

    this.focusedPlanet = null;
    this.targetFocusMesh = null;

    if (dom.currentFocusReadout) {
      dom.currentFocusReadout.textContent = `HỆ MẶT TRỜI // TOÀN CẢNH QUỸ ĐẠO`;
    }

    document.querySelectorAll('.orbit-pill').forEach((p) => p.classList.remove('active-pill'));

    if (dom.detailPanel) {
      dom.detailPanel.hidden = true;
      dom.detailPanel.classList.remove('panel-active');
      dom.detailPanel.classList.remove('panel-open');
    }
    document.body.classList.remove('detail-panel-open');

    // Chuyển động lùi camera góc rộng toàn cảnh mềm mại (Cinematic Pull-back Arc)
    this.transStartCam.copy(this.camera.position);
    this.transStartTarget.copy(this.controls.target);
    this.transEndTarget.set(0, 0, 0);
    this.transEndCam.copy(this.getOverviewCameraPosition());

    const flightDist = this.transStartCam.distanceTo(this.transEndCam);
    this.transMidControl.copy(this.transStartCam).lerp(this.transEndCam, 0.5);
    this.transMidControl.y += THREE.MathUtils.clamp(flightDist * 0.18, 50, 140);

    this.transitionDuration = 1.35;
    this.transitionProgress = 0;
    this.isTransitioning = true;
  }

  /**
   * Vòng lặp Render 60 FPS — Độc lập Zoom chuột & Bám quỹ đạo mượt mà
   */
  animate() {
    this.rafId = requestAnimationFrame(() => this.animate());

    const dt = this.clock.getDelta();

    // 0. Giám sát & Điều tiết hiệu năng thích ứng (Adaptive Performance Sentinel — Milestone E)
    this.evaluateAdaptivePerformance(dt);

    // Thời gian hiệu dụng (Effective Time Delta) do Tạm dừng / Tốc độ quỹ đạo chi phối
    const effectiveDt = this.isPaused ? 0 : dt * this.timeScale;

    // 1. Tự quay Mặt Trời & cập nhật động lực học Plasma nhiệt hạch
    if (this.sunMesh) {
      this.sunMesh.rotation.y += effectiveDt * 0.04;
    }
    if (this.sunMat && this.sunMat.uniforms && this.sunMat.uniforms.uTime) {
      this.sunShaderTime += effectiveDt;
      this.sunMat.uniforms.uTime.value = this.sunShaderTime;
    }

    // Hiệu ứng thở nhật hoa Mặt Trời (Corona Breathing Pulse)
    const elapsedTime = this.clock.getElapsedTime();
    const pulseB = 1.0 + Math.sin(elapsedTime * 1.5) * 0.04;
    if (this.sunHaloB) this.sunHaloB.scale.set(260 * pulseB, 260 * pulseB, 1);
    const pulseC = 1.0 + Math.sin(elapsedTime * 0.8) * 0.06;
    if (this.sunHaloC) this.sunHaloC.scale.set(380 * pulseC, 380 * pulseC, 1);

    // Tự quay dạt dào lớp mây Trái Đất (Differential Atmospheric Drift)
    if (this.earthCloudMesh) {
      this.earthCloudMesh.rotation.y += effectiveDt * 0.52;
      this.earthCloudMesh.rotation.x += effectiveDt * 0.012;
    }

    // Tự quay vành đai tiểu hành tinh (Asteroid Belt Drift)
    if (this.asteroidBeltMesh) {
      this.asteroidBeltMesh.rotation.y += effectiveDt * 0.018;
    }

    // 2. Chuyển động quỹ đạo & tự quay chuẩn thiên văn của các hành tinh
    this.planets.forEach((p) => {
      p.angle += effectiveDt * p.data.speed * 0.45;
      const x = Math.cos(p.angle) * p.data.a;
      const z = Math.sin(p.angle) * p.data.a;
      const y = Math.sin(p.angle) * (p.data.incAmp || 0);
      p.anchor.position.set(x, y, z);

      if (p.planetMesh) {
        p.planetMesh.rotation.y += effectiveDt * (p.data.rotationSpeed || 0.4);
      }
      if (p.data.id === 'earth' && this.earthCloudMesh) {
        this.earthCloudMesh.rotation.y += effectiveDt * ((p.data.rotationSpeed || 0.4) * 1.15);
      }

      // Vệ tinh tự quay quanh hành tinh mẹ
      p.anchor.children.forEach((child) => {
        if (child.userData && child.userData.speed) {
          child.rotation.y += effectiveDt * child.userData.speed * 0.7;
        }
      });
    });

    // 2.1 Cập nhật Sao chổi định kỳ (Periodic Comet Event)
    if (this.cometSystem) {
      this.cometSystem.update(dt, elapsedTime);
    }

    // 2.2 Cập nhật Âm thanh Vũ trụ 3D (Spatial 3D Audio Panner & Sub-bass rumble)
    if (audio && audio.updateSpatial) {
      const activeMesh = this.focusedPlanet ? this.planetMeshes.get(this.focusedPlanet.id) : null;
      audio.updateSpatial(this.camera, activeMesh, this.sunMesh);
    }

    // 3. Xử lý bay Du hành siêu tốc (Cinematic Hyper-Warp Spline Flight) hoặc Chuyển cảnh Bezier / Bám hành tinh
    if (this.isWarpMode && this.warpSpline) {
      this.warpProgress = (this.warpProgress + dt * 0.035) % 1.0;
      this.warpSpline.getPointAt(this.warpProgress, this.tempVecA);
      const lookProgress = (this.warpProgress + 0.018) % 1.0;
      this.warpSpline.getPointAt(lookProgress, this.tempVecB);

      this.camera.position.lerp(this.tempVecA, 0.10);
      this.controls.target.lerp(this.tempVecB, 0.10);
      this.camera.lookAt(this.tempVecB);

      if (dom.currentFocusReadout) {
        dom.currentFocusReadout.textContent = 'DU HÀNH SIÊU TỐC // TỐC ĐỘ: 0.92c // DUYỆT HỆ MẶT TRỜI';
      }
    } else if (this.isTransitioning) {
      this.transitionProgress += dt / this.transitionDuration;
      if (this.transitionProgress >= 1.0) {
        this.transitionProgress = 1.0;
        this.isTransitioning = false;
        if (this.targetFocusMesh) {
          this.targetFocusMesh.getWorldPosition(this.lastTargetPos);
          this.camFollowOffset.copy(this.camera.position).sub(this.lastTargetPos);
        }
      }

      const p = this.transitionProgress;
      // Đường cong mượt phi tuyến tính (Smooth Ease-in-out Cubic)
      const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      // Cập nhật vị trí đích thời gian thực nếu hành tinh đích đang bay trên quỹ đạo
      if (this.targetFocusMesh) {
        this.targetFocusMesh.getWorldPosition(this.lastTargetPos);
        this.transEndTarget.copy(this.lastTargetPos).add(this.targetLateralOffset);
        this.transEndCam.copy(this.lastTargetPos).add(this.targetFollowOffset);
      }

      // Đường cong Bezier bậc 2 (Quadratic Bezier Flight Curve)
      const inv = 1 - ease;
      const w0 = inv * inv;
      const w1 = 2 * inv * ease;
      const w2 = ease * ease;

      this.camera.position.set(
        w0 * this.transStartCam.x + w1 * this.transMidControl.x + w2 * this.transEndCam.x,
        w0 * this.transStartCam.y + w1 * this.transMidControl.y + w2 * this.transEndCam.y,
        w0 * this.transStartCam.z + w1 * this.transMidControl.z + w2 * this.transEndCam.z
      );

      this.controls.target.lerpVectors(this.transStartTarget, this.transEndTarget, ease);
    } else if (this.focusedPlanet) {
      // Khi đã ở trạng thái khóa quỹ đạo (Orbit Lock):
      // Camera tịnh tiến đồng bộ cùng chuyển động của hành tinh mà NGƯỜI DÙNG TỰ DO CUỘN CHUỘT / XOAY GÓC
      const mesh = this.planetMeshes.get(this.focusedPlanet.id);
      if (mesh) {
        mesh.getWorldPosition(this.tempVecA);

        if (!this.lastTargetPos.equals(this.tempVecA)) {
          this.tempVecB.copy(this.tempVecA).sub(this.lastTargetPos);
          this.camera.position.add(this.tempVecB);

          // Giữ nguyên độ lệch thẩm mỹ, tránh bị giật góc nhìn
          this.tempVecB.copy(this.tempVecA).add(this.targetLateralOffset);
          this.controls.target.copy(this.tempVecB);
          this.lastTargetPos.copy(this.tempVecA);
        }
      }
    }

    // 4. Hiệu ứng vệt lượng tử đường hầm Hyper-Warp
    if (this.warpStreakPositions && this.warpStreakGeom) {
      if (this.isWarpMode) {
        this.warpSpeed = THREE.MathUtils.lerp(this.warpSpeed, 650, 0.08);
      } else {
        this.warpSpeed = THREE.MathUtils.lerp(this.warpSpeed, 0, 0.12);
      }

      if (this.warpTunnelLines) {
        const targetOpacity = this.isWarpMode ? 0.90 : 0.0;
        this.warpTunnelLines.material.opacity = THREE.MathUtils.lerp(this.warpTunnelLines.material.opacity, targetOpacity, 0.10);
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

    // 6. Cập nhật Controls (chỉ khi không ở chế độ du hành siêu tốc)
    if (!this.isWarpMode) {
      this.controls.update();
    }

    // 7. Cập nhật nhãn AR
    this.updateARLabels();

    // 8. Render chuẩn điện ảnh qua Unreal Bloom Postprocessing EffectComposer
    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(this.currentDpr);
      if (this.composer) {
        this.composer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setPixelRatio(this.currentDpr);
      }
      if (!this.focusedPlanet && !this.isTransitioning) {
        this.camera.position.copy(this.getOverviewCameraPosition());
      }
    });

    if (dom.btnPillScrollLeft && dom.navPillsContainer) {
      dom.btnPillScrollLeft.addEventListener('click', () => {
        dom.navPillsContainer.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }
    if (dom.btnPillScrollRight && dom.navPillsContainer) {
      dom.btnPillScrollRight.addEventListener('click', () => {
        dom.navPillsContainer.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }

    if (dom.btnHelpGuide) {
      dom.btnHelpGuide.addEventListener('click', () => {
        alert('HƯỚNG DẪN ĐIỀU KHIỂN HỆ MẶT TRỜI 3D:\n\n• Kéo chuột trái / Cảm ứng: Xoay tự do 360° quanh hệ thống.\n• Cuộn chuột / Nút +/-: Phóng to / Thu nhỏ camera.\n• Kéo chuột phải: Di chuyển mặt phẳng nhìn (Pan).\n• Nhấp vào hành tinh hoặc thanh điều hướng: Xem thông tin & bám sát quỹ đạo.\n• Phím ESC / Nút Reset: Trở về góc nhìn toàn cảnh.\n• Phím 0 - 9: Phím tắt chọn nhanh thiên thể.');
      });
    }

    let pointerStartX = 0;
    let pointerStartY = 0;

    window.addEventListener('pointerdown', (e) => {
      pointerStartX = e.clientX;
      pointerStartY = e.clientY;
    });

    window.addEventListener('pointerup', (e) => {
      // 1. Nếu đang trong chế độ toàn cảnh (Photo mode), chạm nhẹ vào màn hình là thoát ngay
      if (this.isPhotoMode) {
        const deltaX = Math.abs(e.clientX - pointerStartX);
        const deltaY = Math.abs(e.clientY - pointerStartY);
        if (deltaX < 15 && deltaY < 15) {
          this.togglePhotoMode();
          return;
        }
      }

      if (e.target.closest('#hudOverlay') || e.target.closest('.spatial-ar-label') || e.target.closest('#hudZoomControls')) return;

      // Độ nhạy chạm cảm ứng thông minh: ngón tay cảm ứng cho phép xê dịch 16px, chuột là 6px
      const maxDelta = (e.pointerType === 'touch') ? 16 : 6;
      const deltaX = Math.abs(e.clientX - pointerStartX);
      const deltaY = Math.abs(e.clientY - pointerStartY);
      if (deltaX > maxDelta || deltaY > maxDelta) return;

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
      } else {
        // Chạm vào khoảng trống vũ trụ khi panel chi tiết đang mở -> Đóng panel trở về toàn cảnh
        if (this.focusedPlanet) {
          this.resetToOverview();
        }
      }
    });

    if (dom.panelCloseBtn) {
      dom.panelCloseBtn.addEventListener('click', () => this.resetToOverview());
    }

    // Hỗ trợ cử chỉ vuốt xuống trên màn hình cảm ứng để đóng Drawer chi tiết
    if (dom.detailPanel) {
      let touchSheetStartY = 0;
      dom.detailPanel.addEventListener('touchstart', (e) => {
        touchSheetStartY = e.touches[0].clientY;
      }, { passive: true });

      dom.detailPanel.addEventListener('touchend', (e) => {
        const touchSheetEndY = e.changedTouches[0].clientY;
        const delta = touchSheetEndY - touchSheetStartY;
        // Vuốt xuống hơn 55px từ mép trên panel -> Đóng panel trở về toàn cảnh
        if (delta > 55 && dom.detailPanel.scrollTop <= 5) {
          this.resetToOverview();
        }
      }, { passive: true });
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
      // Bỏ qua nếu đang nhập liệu trong ô tìm kiếm
      if (document.activeElement === dom.searchInput || (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA'))) {
        if (e.key === 'Escape') {
          if (dom.searchInput) dom.searchInput.blur();
        }
        return;
      }

      // Phím tắt nhanh mở tìm kiếm: "/" hoặc Ctrl+K / Cmd+K
      if (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        if (dom.searchInput) {
          e.preventDefault();
          dom.searchInput.focus();
          dom.searchInput.select();
        }
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePause();
      } else if (e.key.toLowerCase() === 'h' || e.key.toLowerCase() === 'c') {
        this.togglePhotoMode();
      } else if (e.key === 'Escape') {
        if (this.isPhotoMode) {
          this.togglePhotoMode();
        } else {
          this.resetToOverview();
        }
      } else if (e.key === '[' || e.key === '<') {
        const speeds = [0.2, 1.0, 3.0, 8.0];
        const curIdx = speeds.findIndex((s) => Math.abs(s - this.timeScale) < 0.1);
        if (curIdx > 0) this.setTimeScale(speeds[curIdx - 1]);
      } else if (e.key === ']' || e.key === '>') {
        const speeds = [0.2, 1.0, 3.0, 8.0];
        const curIdx = speeds.findIndex((s) => Math.abs(s - this.timeScale) < 0.1);
        if (curIdx !== -1 && curIdx < speeds.length - 1) this.setTimeScale(speeds[curIdx + 1]);
      } else if (e.key.toLowerCase() === 'q') {
        if (dom.btnModeOrbit) dom.btnModeOrbit.click();
      } else if (e.key.toLowerCase() === 'w') {
        if (dom.btnModeWarp) dom.btnModeWarp.click();
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
        if (this.isWarpMode) {
          this.resetToOverview();
        }
      });

      dom.btnModeWarp.addEventListener('click', () => {
        if (!this.isWarpMode) {
          this.isWarpMode = true;
          this.controls.enabled = false;
          this.focusedPlanet = null;
          this.targetFocusMesh = null;
          this.isTransitioning = false;
          if (dom.detailPanel) {
            dom.detailPanel.hidden = true;
            dom.detailPanel.classList.remove('panel-active', 'panel-open');
          }
          document.querySelectorAll('.orbit-pill').forEach((p) => p.classList.remove('active-pill'));

          dom.btnModeWarp.classList.add('active');
          dom.btnModeOrbit.classList.remove('active');
          audio.playWarpSound();

          // Kích hoạt vệt sáng lượng tử & mở rộng FOV
          if (this.warpTunnelLines) {
            this.warpTunnelLines.material.opacity = 0.95;
          }
          this.targetFOV = 78;
        }
      });
    }

    if (dom.btnAudioToggle) {
      dom.btnAudioToggle.classList.toggle('audio-muted', audio.isMuted);
      dom.btnAudioToggle.setAttribute('aria-pressed', String(!audio.isMuted));
      if (dom.audioStatusText) {
        dom.audioStatusText.textContent = audio.isMuted ? 'ÂM THANH: TẮT' : 'ÂM THANH: BẬT';
      }

      dom.btnAudioToggle.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        dom.btnAudioToggle.classList.toggle('audio-muted', isMuted);
        dom.btnAudioToggle.setAttribute('aria-pressed', String(!isMuted));
        if (dom.audioStatusText) {
          dom.audioStatusText.textContent = isMuted ? 'ÂM THANH: TẮT' : 'ÂM THANH: BẬT';
        }
      });
    }

    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', (e) => {
        const query = normalizeText(e.target.value.trim().toLowerCase());
        const searchCluster = dom.searchInput.closest('.hud-search-cluster');

        // Giữ ô tìm kiếm luôn mở rộng nếu đang có từ khóa
        if (searchCluster) {
          searchCluster.classList.toggle('is-active', Boolean(query));
        }

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

      dom.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const firstVisiblePill = document.querySelector('.orbit-pill:not([hidden])');
          if (firstVisiblePill) {
            const id = firstVisiblePill.getAttribute('data-id');
            this.focusPlanet(id);
          }
        } else if (e.key === 'Escape') {
          dom.searchInput.value = '';
          dom.searchInput.dispatchEvent(new Event('input'));
          dom.searchInput.blur();
          const searchCluster = dom.searchInput.closest('.hud-search-cluster');
          if (searchCluster) searchCluster.classList.remove('is-active');
        }
      });

      // Khi nhấn Clear hoặc Esc thì thu gọn lại
      if (dom.searchClearBtn) {
        dom.searchClearBtn.addEventListener('click', () => {
          dom.searchInput.value = '';
          dom.searchInput.dispatchEvent(new Event('input'));
          const searchCluster = dom.searchInput.closest('.hud-search-cluster');
          if (searchCluster) searchCluster.classList.remove('is-active');
        });
      }
    }

    // Điều khiển dòng thời gian (Time Scrubbing & Orbit Pause)
    if (dom.btnTimeToggle) {
      dom.btnTimeToggle.addEventListener('click', () => this.togglePause());
    }
    if (dom.timeSpeedButtons) {
      dom.timeSpeedButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const speed = parseFloat(btn.dataset.speed) || 1.0;
          this.setTimeScale(speed);
        });
      });
    }

    // Chế độ quan sát toàn cảnh / Chụp ảnh (Clean Photo Mode [H])
    if (dom.btnPhotoMode) {
      dom.btnPhotoMode.addEventListener('click', () => this.togglePhotoMode());
    }

    if (dom.btnExitPhoto) {
      dom.btnExitPhoto.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePhotoMode();
      });
    }

    if (dom.photoModeToast) {
      dom.photoModeToast.addEventListener('click', () => this.togglePhotoMode());
    }

    window.addEventListener('click', () => audio.startAmbience(), { once: true });
    window.addEventListener('keydown', () => audio.startAmbience(), { once: true });
  }

  /**
   * Sentinel giám sát và điều tiết hiệu năng thích ứng (Adaptive Performance Sentinel — Milestone E)
   */
  evaluateAdaptivePerformance(dt) {
    if (dt <= 0) return;
    const currentFps = 1.0 / dt;
    this.fpsWindow.push(currentFps);
    if (this.fpsWindow.length > this.fpsWindowSize) {
      this.fpsWindow.shift();
    }

    const now = performance.now();
    if (now - this.lastFpsCheckTime > 1000) {
      this.lastFpsCheckTime = now;
      if (this.fpsWindow.length >= 25) {
        let sum = 0;
        for (let i = 0; i < this.fpsWindow.length; i++) {
          sum += this.fpsWindow[i];
        }
        const avgFps = sum / this.fpsWindow.length;

        // Nếu FPS sụt dưới 42 trong 2.5s liên tiếp -> Giảm cấu hình để bảo toàn 60 FPS
        if (avgFps < 42) {
          this.lowFpsDuration += 1.0;
          this.highFpsDuration = 0;
          if (this.lowFpsDuration >= 2.5 && this.qualityTier > 0) {
            this.adjustQualityTier(this.qualityTier - 1);
            this.lowFpsDuration = 0;
          }
        } else if (avgFps >= 57) {
          this.highFpsDuration += 1.0;
          this.lowFpsDuration = 0;
          if (this.highFpsDuration >= 6.0 && this.qualityTier < 2) {
            this.adjustQualityTier(this.qualityTier + 1);
            this.highFpsDuration = 0;
          }
        } else {
          this.lowFpsDuration = 0;
          this.highFpsDuration = 0;
        }
      }
    }
  }

  /**
   * Điều tiết chất lượng hiển thị thích ứng theo phần cứng client (Dynamic Quality Tiering)
   */
  adjustQualityTier(newTier) {
    if (newTier === this.qualityTier) return;
    this.qualityTier = newTier;

    if (newTier === 2) {
      // Cấu hình cao: Màn hình Desktop / GPU mạnh (DPR 2.0 max)
      this.currentDpr = Math.min(window.devicePixelRatio || 1, 2.0);
    } else if (newTier === 1) {
      // Cấu hình cân bằng: Laptop mỏng nhẹ / Điện thoại tầm trung
      this.currentDpr = Math.min(window.devicePixelRatio || 1, 1.4);
    } else {
      // Cấu hình tiết kiệm năng lượng: Đảm bảo 60 FPS mượt mà tuyệt đối
      this.currentDpr = 1.0;
    }

    if (this.renderer) {
      this.renderer.setPixelRatio(this.currentDpr);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    if (this.composer) {
      this.composer.setPixelRatio(this.currentDpr);
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
    if (this.bloomPass) {
      this.bloomPass.enabled = (this.qualityTier >= 1);
    }
  }

  /**
   * Thu hồi và giải phóng tài nguyên WebGL triệt để chống rò rỉ VRAM (Disposal Hygiene — Milestone E)
   */
  dispose() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.controls) {
      this.controls.dispose();
    }

    if (this.composer) {
      this.composer.dispose();
    }

    if (this.scene) {
      this.scene.traverse((obj) => {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => this.disposeMaterial(m));
          } else {
            this.disposeMaterial(obj.material);
          }
        }
      });
    }

    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  disposeMaterial(mat) {
    if (!mat) return;
    ['map', 'roughnessMap', 'metalnessMap', 'bumpMap', 'normalMap', 'emissiveMap'].forEach((key) => {
      if (mat[key] && typeof mat[key].dispose === 'function') {
        mat[key].dispose();
      }
    });
    if (mat.uniforms) {
      Object.keys(mat.uniforms).forEach((uKey) => {
        const uVal = mat.uniforms[uKey].value;
        if (uVal && typeof uVal.dispose === 'function') {
          uVal.dispose();
        }
      });
    }
    mat.dispose();
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
