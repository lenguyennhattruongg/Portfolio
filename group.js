/**
 * group.js — AWWWARDS-GRADE 3D WEBGL SPATIAL UNIVERSE & COSMIC AUDIO ENGINE
 * Nhóm 06 — Đại học Giao thông Vận tải TP.HCM (UTH)
 *
 * Chuẩn mực Vibe Coding 3D Vũ trụ Đỉnh cao:
 * 1. Dải ngân hà 3D xoắn ốc (Logarithmic Spiral Galaxy) 12.000 hạt:
 *    Tâm sáng trắng rực rỡ, 4 nhánh xoắn ốc chuyển sắc neon cyan, tím deep violet, hồng magenta.
 * 2. Hậu kỳ điện ảnh UnrealBloomPass (EffectComposer):
 *    Tạo hiệu ứng phát sáng mờ ảo lung linh như ảnh chụp kính viễn vọng không gian James Webb.
 * 3. Tương tác chuột Gyroscope Parallax (Lerp Easing):
 *    Khi di chuột, toàn bộ không gian và thiên hà nghiêng nhẹ tạo chiều sâu 3D chân thực.
 * 4. Bay xuyên không gian cuộn chuột (Scroll-driven Hyperspace Starfield Tunnel):
 *    Tốc độ bay tăng vọt khi cuộn chuột và giảm tốc mượt mà có damping.
 * 5. Bộ âm thanh không gian vũ trụ thuần Web Audio API:
 *    Dual Sub-bass drone (48Hz/52Hz), Sonar radar chirp, Warp whoosh, Celestial chord.
 * 6. Vành đai sao Thổ 3D (Planetary Rings) với Cassini Division cho Node 02 & 05.
 * 7. Lớp mây 3D khí quyển (Cloud Layer Sphere) quay độc lập.
 * 8. Hố đen Singularity bẻ cong ánh sáng Gravitational Lensing (Interstellar look).
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { MEMBERS, TAGS, normalizeText, getMemberHaystack } from './members.data.js';

// ============================================================================
// 1. COSMIC AUDIO ENGINE (THUẦN WEB AUDIO API — ZERO EXTERNAL MP3 DEPENDENCY)
// ============================================================================
class CosmicAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isMuted = localStorage.getItem('cosmic-audio-muted') === 'true';
    this.isAmbienceStarted = false;
    this.ambienceNodes = null;
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

    // Dual Sub-Bass Drone (48Hz & 52Hz) + Lowpass sweeping filter
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

    // LFO dao động nhẹ tần số cắt của filter (0.04Hz = 25 giây một chu kỳ)
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

    const outGain = ctx.createGain();
    outGain.gain.value = 0.65;
    filter.connect(outGain);
    outGain.connect(this.masterGain);

    oscA.start();
    oscB.start();
    lfo.start();

    this.ambienceNodes = { oscA, oscB, lfo, outGain };
  }

  playSonarBlip(pitch = 1.0) {
    if (!this.ctx || this.isMuted) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(950 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(1750 * pitch, now + 0.08);

    filter.type = 'highpass';
    filter.frequency.value = 650;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playWarpWhoosh() {
    if (!this.ctx || this.isMuted) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const duration = 0.9;

    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const fade = 1.0 - i / bufferSize;
      data[i] = (Math.random() * 2.0 - 1.0) * fade;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.Q.value = 3.5;
    bandpass.frequency.setValueAtTime(180, now);
    bandpass.frequency.exponentialRampToValueAtTime(2200, now + 0.38);
    bandpass.frequency.exponentialRampToValueAtTime(240, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.35, now + 0.09);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    source.connect(bandpass);
    bandpass.connect(gain);
    gain.connect(this.masterGain);

    source.start(now);
  }

  playSelectChord() {
    if (!this.ctx || this.isMuted) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const notes = [220.0, 277.18, 329.63, 440.0];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.value = freq;

      const startTime = now + idx * 0.045;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.09, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 1.5);
    });
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
// 2. GLSL SHADER CHUNKS: FAST ANALYTIC SIMPLEX NOISE
// ============================================================================
const GLSL_COMMON_NOISE = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// ============================================================================
// 3. CẤU HÌNH 6 THIÊN THỂ KEPLER & ĐẶC TÍNH 3D RIÊNG BIỆT
// ============================================================================
const PLANET_CONFIGS = [
  { id: 'hieu',   order: 1, name: 'Nguyễn Xuân Hiệu',     symbol: 'NXH-01', a: 11.5, e: 0.05, inc: 0.06,  speed: 0.38, size: 1.15, base: 0x2563EB, ocean: 0x0A1838, atmo: 0x60A5FA, title: 'Lead / System Architecture', hasRings: false, hasClouds: true, moons: [{ name: 'NXH-1α', size: 0.24, dist: 2.1, speed: 1.6, color: 0x93C5FD }] },
  { id: 'truong', order: 2, name: 'Lê Nguyễn Nhật Trường', symbol: 'LNT-02', a: 16.0, e: 0.03, inc: -0.05, speed: 0.30, size: 1.30, base: 0xF59E0B, ocean: 0x3D1B04, atmo: 0xFBBF24, title: 'Backend / Systems Engineer',  hasRings: true,  hasClouds: true, ringColor: 0xF59E0B, moons: [{ name: 'LNT-2β', size: 0.28, dist: 3.8, speed: 1.15, color: 0xFDE68A }] },
  { id: 'nhu',    order: 3, name: 'Nguyễn Thị Thảo Như',   symbol: 'NTN-03', a: 21.0, e: 0.06, inc: 0.08,  speed: 0.24, size: 1.10, base: 0x8B5CF6, ocean: 0x1F0B3D, atmo: 0xC084FC, title: 'UI/UX & Micro-interactions', hasRings: false, hasClouds: true, moons: [] },
  { id: 'huynh',  order: 4, name: 'Nguyễn Phạm Ý Huỳnh',   symbol: 'NPY-04', a: 26.0, e: 0.02, inc: 0.03,  speed: 0.19, size: 1.12, base: 0x10B981, ocean: 0x032418, atmo: 0x34D399, title: 'Data Analytics & Pipelines',  hasRings: false, hasClouds: true, moons: [] },
  { id: 'chau',   order: 5, name: 'Lê Hữu Châu',          symbol: 'LHC-05', a: 31.0, e: 0.07, inc: -0.07, speed: 0.15, size: 1.25, base: 0xEF4444, ocean: 0x3D0B0B, atmo: 0xF87171, title: 'DevOps & Cloud Security',     hasRings: true,  hasClouds: true, ringColor: 0xF87171, moons: [{ name: 'LHC-5γ', size: 0.26, dist: 3.2, speed: 1.25, color: 0xFCA5A5 }] },
  { id: 'thu',    order: 6, name: 'Nguyễn Anh Thư',        symbol: 'NAT-06', a: 36.5, e: 0.04, inc: 0.05,  speed: 0.12, size: 1.10, base: 0x06B6D4, ocean: 0x04252E, atmo: 0x22D3EE, title: 'Quality Assurance & Automated QA', hasRings: false, hasClouds: true, moons: [] }
];

// ============================================================================
// 4. DOM ELEMENTS CACHED
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
  panelSkillsBlock: document.getElementById('panelSkillsBlock'),
  panelPortfolioLink: document.getElementById('panelPortfolioLink'),
  panelGithubLink: document.getElementById('panelGithubLink'),
  panelAvatarImg: document.getElementById('panelAvatarImg'),
  panelMonogram: document.getElementById('panelMonogram'),
  telemetryA: document.getElementById('telemetryA'),
  telemetryV: document.getElementById('telemetryV'),
  telemetryT: document.getElementById('telemetryT'),
  telemetryE: document.getElementById('telemetryE'),
  telemetryMoons: document.getElementById('telemetryMoons'),
  telemetryInc: document.getElementById('telemetryInc'),
  navPills: document.getElementById('spatialNavPills'),
  searchInput: document.getElementById('spatialSearchInput'),
  searchClearBtn: document.getElementById('spatialSearchClearBtn'),
  searchStatus: document.getElementById('spatialSearchStatus'),
  searchEmpty: document.getElementById('spatialSearchEmpty'),
  btnResetOrbit: document.getElementById('btnResetOrbit'),
  currentFocusReadout: document.getElementById('currentFocusReadout'),
  btnAudioToggle: document.getElementById('btnAudioToggle'),
  audioStatusText: document.getElementById('audioStatusText')
};

// ============================================================================
// 5. MAIN THREE.JS SPATIAL UNIVERSE ENGINE
// ============================================================================
let scene, camera, renderer, controls, clock, composer;
let universeGroup, singularityGroup, accretionDisk, reticleGroup;
let spiralGalaxyGroup, nebulaDustGroup, warpStreaksGroup, reticleLine;
let asteroidBeltMesh, diffractionSpikes;
const planets = [];
const planetMeshes = [];
let hoveredPlanet = null;
let selectedPlanet = null;
let isCameraTransitioning = false;
const cameraTargetPos = new THREE.Vector3();
const cameraLookTarget = new THREE.Vector3();
const defaultCamPos = new THREE.Vector3(0, 24, 48);
const defaultLookTarget = new THREE.Vector3(0, 0, 0);

// Mouse Parallax Dynamic Gyroscope variables (Lerp Easing)
let targetTiltX = 0;
let targetTiltZ = 0;
let currentTiltX = 0;
let currentTiltZ = 0;

// Scratchpad vectors for zero-allocation performance (60 FPS)
const _vRayOrigin = new THREE.Vector3();
const _vRayDir = new THREE.Vector3();
const _vDiff = new THREE.Vector3();
const _vTemp = new THREE.Vector3();
const pointer = new THREE.Vector2(-999, -999);

function initUniverseEngine() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  clock = new THREE.Clock();

  // 1. Scene & Deep Space Fog
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080B16, 0.0075);

  // 2. Camera 3D Perspective
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.copy(defaultCamPos);

  // 3. WebGL Renderer with High-DPI clamping & ACES ToneMapping
  renderer = new THREE.WebGLRenderer({
    canvas: dom.canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // 4. Post-processing UnrealBloomPass (Hậu kỳ phát sáng điện ảnh James Webb chuẩn mực)
  composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    0.38,  // strength dịu dàng chuẩn điện ảnh, không cháy sáng
    0.38,  // radius
    0.55   // threshold chọn lọc, giữ nền vũ trụ sâu thẳm
  );
  composer.addPass(bloomPass);

  // 5. OrbitControls: Xoay tự do 360 độ & Scroll Zoom mượt mà có Damping
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.minDistance = 4.5;
  controls.maxDistance = 130;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.85;
  controls.target.copy(defaultLookTarget);

  // 6. Universe Root Group
  universeGroup = new THREE.Group();
  scene.add(universeGroup);

  // 7. Lighting Layer
  const ambientLight = new THREE.AmbientLight(0x1E293B, 1.4);
  scene.add(ambientLight);

  const singularityLight = new THREE.PointLight(0xF0C879, 4.5, 120, 1.1);
  singularityLight.position.set(0, 0, 0);
  scene.add(singularityLight);

  // 8. Xây dựng các lớp thiên văn 3D
  buildSingularity();
  buildSpiralParticleGalaxy(); // Dải Ngân Hà 3D xoắn ốc tinh tế
  build3DStarfield();
  buildVolumetricNebulaDust();
  buildHyperspaceWarpStreaks();
  buildAsteroidBelt(); // Vành đai tiểu hành tinh 3D (1.200 mảnh thiên thạch — Solar-Wanderer style)
  buildPlanetarySystem();
  buildReticleWithRadarLine();
  createSpatialLabels();
  createNavPills();
  initAudioControls();

  // Event Listeners
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('click', onPointerClick);

  // Scroll wheel Hyperspace Tunnel acceleration
  window.addEventListener('wheel', (e) => {
    if (warpStreaksGroup && warpStreaksGroup.userData) {
      warpStreaksGroup.userData.speed = Math.min(warpStreaksGroup.userData.speed + 0.9, 5.0);
      warpStreaksGroup.userData.mat.uniforms.uActive.value = 1.0;
    }
  }, { passive: true });

  // Bắt sự kiện tương tác đầu tiên để kích hoạt âm thanh không gian (Web Audio API policy)
  window.addEventListener('pointerdown', () => {
    audio.startAmbience();
  }, { once: true });

  // Start 60 FPS Render Loop
  animate();
}

// ----------------------------------------------------------------------------
// 5.1. DẢI NGÂN HÀ 3D XOẮN ỐC (SPIRAL PARTICLE GALAXY)
// ----------------------------------------------------------------------------
function buildSpiralParticleGalaxy() {
  spiralGalaxyGroup = new THREE.Group();
  const count = 5500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const branches = 4;
  const radiusMax = 42.0;
  const spinAngle = 1.7;

  const colorInside = new THREE.Color(0xF0C879); // Vàng kim hổ phách ấm áp
  const colorCyan = new THREE.Color(0x06B6D4);   // Xanh Cyan Neon
  const colorMagenta = new THREE.Color(0xEC4899); // Hồng Magenta
  const colorViolet = new THREE.Color(0x8B5CF6);  // Tím Deep Violet

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Khoét tâm bán kính r >= 5.0 để hố đen và đĩa bồi tụ trung tâm hiển thị sắc nét
    const r = 5.2 + Math.pow(Math.random(), 1.4) * (radiusMax - 5.2);
    const branchAngle = ((i % branches) / branches) * Math.PI * 2.0;
    const spin = r * spinAngle;

    // Phân tán 3D không gian
    const randomX = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * (r + 1.0);
    const randomY = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.35) * (1.0 - r / radiusMax) * 4.0;
    const randomZ = (Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3) * (r + 1.0);

    positions[i3]     = Math.cos(branchAngle + spin) * r + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spin) * r + randomZ;

    // Phối màu chuyển sắc
    const mixedColor = colorInside.clone();
    const ratio = (r - 5.2) / (radiusMax - 5.2);
    if (ratio < 0.32) {
      mixedColor.lerp(colorCyan, ratio / 0.32);
    } else if (ratio < 0.68) {
      mixedColor.lerp(colorMagenta, (ratio - 0.32) / 0.36);
    } else {
      mixedColor.lerp(colorViolet, (ratio - 0.68) / 0.32);
    }

    colors[i3]     = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    sizes[i] = (1.0 - ratio * 0.4) * (1.6 + Math.random() * 3.0);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      attribute float aSize;
      varying vec3 vColor;
      uniform float uPixelRatio;

      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio * (155.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float glow = pow(1.0 - d * 2.0, 2.6);
        gl_FragColor = vec4(vColor, glow * 0.42);
      }
    `
  });

  const spiralMesh = new THREE.Points(geo, mat);
  spiralGalaxyGroup.add(spiralMesh);
  spiralGalaxyGroup.rotation.x = Math.PI * 0.12;
  universeGroup.add(spiralGalaxyGroup);
}

// ----------------------------------------------------------------------------
// 5.2. LÕI HỐ ĐEN SINGULARITY + ĐĨA BỒI TỤ DOPPLER + GRAVITATIONAL LENSING ARC
// ----------------------------------------------------------------------------
function buildSingularity() {
  singularityGroup = new THREE.Group();

  // 1. Lõi đen hố đen (Event Horizon Core)
  const coreGeo = new THREE.SphereGeometry(2.1, 36, 36);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  singularityGroup.add(core);

  // 2. Vành đĩa bồi tụ quang học (Relativistic Accretion Disk Shader)
  const diskGeo = new THREE.RingGeometry(2.5, 8.8, 128, 1);
  const diskMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      ${GLSL_COMMON_NOISE}

      void main() {
        vec2 centered = vUv * 2.0 - 1.0;
        float r = length(centered);
        if (r < 0.28 || r > 1.0) discard;

        float theta = atan(centered.y, centered.x);
        float spiral = theta * 4.0 - uTime * 2.5 - log(r) * 9.0;
        float n = snoise(vec3(cos(spiral) * 1.6, sin(spiral) * 1.6, r * 4.0));

        // Relativistic Doppler Beaming
        float doppler = 1.0 - sin(theta) * 0.45;
        float density = smoothstep(0.28, 0.45, r) * (1.0 - smoothstep(0.85, 1.0, r));
        density *= (0.65 + 0.35 * n);

        vec3 blueShift = vec3(0.35, 0.7, 1.0) * 1.3;
        vec3 redShift = vec3(1.0, 0.36, 0.08) * 0.95;
        vec3 color = mix(redShift, blueShift, clamp((doppler - 0.5) * 1.4, 0.0, 1.0));

        color *= doppler * 1.25;
        float alpha = density * clamp(doppler, 0.15, 1.0);

        gl_FragColor = vec4(color, alpha);
      }
    `,
    uniforms: {
      uTime: { value: 0 }
    },
    transparent: true,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  accretionDisk = new THREE.Mesh(diskGeo, diskMat);
  accretionDisk.rotation.x = Math.PI * 0.42;
  singularityGroup.add(accretionDisk);

  // 3. Gravitational Lensing Arcs (Bẻ cong ánh sáng trên và dưới chân trời sự kiện)
  function createLensingArc(radius, yOffset, colorHex) {
    const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.42, 0, Math.PI, false, 0);
    const pts = curve.getPoints(96).map(p => new THREE.Vector3(p.x, yOffset, p.y));
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    return new THREE.Line(geo, mat);
  }

  const upperArc = createLensingArc(3.4, 1.4, 0xF0C879);
  const lowerArc = createLensingArc(3.4, -1.4, 0x8E9CFF);
  singularityGroup.add(upperArc);
  singularityGroup.add(lowerArc);

  // 4. Vầng sáng nhật hoa đa tầng (Volumetric Corona Spheres)
  const coronaGeo1 = new THREE.SphereGeometry(2.9, 32, 32);
  const coronaMat1 = new THREE.MeshBasicMaterial({
    color: 0xF0C879,
    transparent: true,
    opacity: 0.05,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  singularityGroup.add(new THREE.Mesh(coronaGeo1, coronaMat1));

  const coronaGeo2 = new THREE.SphereGeometry(4.0, 32, 32);
  const coronaMat2 = new THREE.MeshBasicMaterial({
    color: 0x8E9CFF,
    transparent: true,
    opacity: 0.025,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  singularityGroup.add(new THREE.Mesh(coronaGeo2, coronaMat2));

  // 5. Tia quang học 4 cánh (Anamorphic Diffraction Spikes — James Webb / Hubble Signature)
  diffractionSpikes = new THREE.Group();
  const spikeGeo = new THREE.PlaneGeometry(16.0, 0.18);
  const spikeMat = new THREE.MeshBasicMaterial({
    color: 0xF0C879,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const sp1 = new THREE.Mesh(spikeGeo, spikeMat);
  const sp2 = new THREE.Mesh(spikeGeo, spikeMat);
  sp2.rotation.z = Math.PI * 0.5;
  diffractionSpikes.add(sp1);
  diffractionSpikes.add(sp2);
  singularityGroup.add(diffractionSpikes);

  universeGroup.add(singularityGroup);
}

// ----------------------------------------------------------------------------
// 5.3. MÂY BỤI TINH VÂN VŨ TRỤ 3D (VOLUMETRIC NEBULA DUST CLOUDS)
// ----------------------------------------------------------------------------
function buildVolumetricNebulaDust() {
  nebulaDustGroup = new THREE.Group();
  const count = 7500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  const palette = [
    new THREE.Color(0x923CFF), // Tím Cosmic
    new THREE.Color(0x24C8FF), // Xanh Cyan Electric
    new THREE.Color(0xFFCA54), // Vàng Kim Celestial
    new THREE.Color(0x4F46E5)  // Indigo Deep
  ];

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.pow(Math.random(), 0.55) * 48;
    const theta = Math.random() * Math.PI * 2;
    const height = (Math.random() - 0.5) * 18;
    const turb = Math.sin(theta * 3.0) * 2.5;

    positions[i3]     = Math.cos(theta) * (radius + turb);
    positions[i3 + 1] = height + Math.sin(radius * 0.35) * 2.2;
    positions[i3 + 2] = Math.sin(theta) * (radius + turb);

    const c = palette[i % palette.length];
    colors[i3]     = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    sizes[i] = 1.8 + Math.random() * 4.2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
    },
    vertexShader: `
      attribute float aSize;
      varying vec3 vColor;
      uniform float uPixelRatio;

      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uPixelRatio * (160.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        if (d > 0.5) discard;
        float glow = pow(1.0 - d * 2.0, 2.6);
        gl_FragColor = vec4(vColor, glow * 0.45);
      }
    `
  });

  const nebulaPoints = new THREE.Points(geo, mat);
  nebulaDustGroup.add(nebulaPoints);
  universeGroup.add(nebulaDustGroup);
}

function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.25, 'rgba(235,245,255,0.85)');
  gradient.addColorStop(0.65, 'rgba(142,156,255,0.25)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

// ----------------------------------------------------------------------------
// 5.4. BIỂN 8.000 HẠT BỤI SAO 3D ĐA TẦNG ĐỘ SÂU (CIRCULAR GLOW ORBS)
// ----------------------------------------------------------------------------
function build3DStarfield() {
  const count = 8000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const colWhite = new THREE.Color(0xF3F5FA);
  const colBlue = new THREE.Color(0x8E9CFF);
  const colGold = new THREE.Color(0xF0C879);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = 35 + Math.random() * 150;
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);

    positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    let c = colWhite;
    const r = Math.random();
    if (r > 0.85) c = colGold;
    else if (r > 0.6) c = colBlue;

    colors[i3]     = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const starTexture = createStarTexture();
  const mat = new THREE.PointsMaterial({
    size: 0.85,
    map: starTexture,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  universeGroup.add(new THREE.Points(geo, mat));
}

// ----------------------------------------------------------------------------
// 5.5. VỆT SAO HYPERSPACE WARP STREAKS KHI DU HÀNH
// ----------------------------------------------------------------------------
function buildHyperspaceWarpStreaks() {
  warpStreaksGroup = new THREE.Group();
  const count = 1600;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const angle = Math.random() * Math.PI * 2;
    const radius = 4 + Math.random() * 45;
    const z = -Math.random() * 90;

    positions[i3]     = Math.cos(angle) * radius;
    positions[i3 + 1] = Math.sin(angle) * radius;
    positions[i3 + 2] = z;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uActive: { value: 0.0 },
      uColor: { value: new THREE.Color(0x8E9CFF) }
    },
    vertexShader: `
      varying float vDepth;
      void main() {
        vec4 p = modelViewMatrix * vec4(position, 1.0);
        vDepth = clamp(1.0 - (-p.z / 90.0), 0.0, 1.0);
        gl_PointSize = (1.5 + vDepth * 3.5);
        gl_Position = projectionMatrix * p;
      }
    `,
    fragmentShader: `
      uniform float uActive;
      uniform vec3 uColor;
      varying float vDepth;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        if (length(uv) > 0.5) discard;
        gl_FragColor = vec4(uColor, uActive * (0.2 + vDepth * 0.8));
      }
    `
  });

  const streaks = new THREE.Points(geo, mat);
  streaks.frustumCulled = false;
  warpStreaksGroup.add(streaks);
  camera.add(warpStreaksGroup);
  scene.add(camera);

  warpStreaksGroup.userData = {
    mat,
    streaks,
    speed: 0,
    targetSpeed: 0,
    triggerWarp: (durationMs = 900) => {
      mat.uniforms.uActive.value = 1.0;
      warpStreaksGroup.userData.targetSpeed = 4.2;
      setTimeout(() => {
        warpStreaksGroup.userData.targetSpeed = 0.0;
        mat.uniforms.uActive.value = 0.0;
      }, durationMs);
    }
  };
}

// ----------------------------------------------------------------------------
// 5.6. VÀNH ĐAI TIỂU HÀNH TINH 3D (ASTEROID BELT — SOLAR-WANDERER STYLE)
// Nằm giữa quỹ đạo Node 03 (Thảo Như, a=21) và Node 04 (Ý Huỳnh, a=26)
// ----------------------------------------------------------------------------
function buildAsteroidBelt() {
  const count = 1200;
  const baseGeo = new THREE.DodecahedronGeometry(0.13, 1);

  // Làm méo các đỉnh để tạo hình khối đá thiên thạch gồ ghề ngẫu nhiên
  const posAttr = baseGeo.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const deform = 1.0 + (Math.sin(x * 12.0) * Math.cos(y * 11.0) * Math.sin(z * 10.0)) * 0.32;
    posAttr.setXYZ(i, x * deform, y * deform, z * deform);
  }
  baseGeo.computeVertexNormals();

  const asteroidMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vColor;
      attribute vec3 aInstanceColor;

      void main() {
        vNormal = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
        vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vColor = aInstanceColor;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPos;
      varying vec3 vColor;

      void main() {
        vec3 L = normalize(-vWorldPos); // Ánh sáng phát ra từ Singularity tại (0,0,0)
        float diff = max(dot(vNormal, L), 0.0);
        vec3 lit = vColor * (diff * 1.5 + 0.16);
        gl_FragColor = vec4(lit, 1.0);
      }
    `
  });

  asteroidBeltMesh = new THREE.InstancedMesh(baseGeo, asteroidMat, count);
  asteroidBeltMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const colors = new Float32Array(count * 3);
  const colorPalette = [
    new THREE.Color(0x9CA3AF), // Silicate xám đá
    new THREE.Color(0x6B7280), // Carbonaceous tối
    new THREE.Color(0xD97706), // Iron-rich nâu đất
    new THREE.Color(0xCBD5E1)  // Chondrite sáng
  ];

  const dummy = new THREE.Object3D();
  const asteroidData = [];

  for (let i = 0; i < count; i++) {
    const r = 22.8 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const speed = 0.20 + Math.random() * 0.06;
    const yAmp = (Math.random() - 0.5) * 1.2;
    const rotSpeedX = (Math.random() - 0.5) * 1.2;
    const rotSpeedY = (Math.random() - 0.5) * 1.5;
    const scale = 0.6 + Math.random() * 0.8;

    asteroidData.push({ r, theta, speed, yAmp, rotSpeedX, rotSpeedY, scale });

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3]     = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    dummy.position.set(Math.cos(theta) * r, yAmp, Math.sin(theta) * r);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    asteroidBeltMesh.setMatrixAt(i, dummy.matrix);
  }

  baseGeo.setAttribute('aInstanceColor', new THREE.InstancedBufferAttribute(colors, 3));
  asteroidBeltMesh.userData = { asteroidData, dummy };
  universeGroup.add(asteroidBeltMesh);
}

// ----------------------------------------------------------------------------
// 5.7. VÀNH ĐAI 3D PLANETARY RINGS (CASSINI DIVISION + ANALYTIC SHADOW)
// ----------------------------------------------------------------------------
function createPlanetaryRings(innerR, outerR, colorHex, planetSize) {
  const geo = new THREE.RingGeometry(innerR, outerR, 128, 2);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.NormalBlending,
    uniforms: {
      uColor: { value: new THREE.Color(colorHex) },
      uPlanetRadius: { value: planetSize || 1.2 },
      uPlanetPos: { value: new THREE.Vector3() },
      uTime: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform vec3 uPlanetPos;
      uniform float uPlanetRadius;
      varying vec2 vUv;
      varying vec3 vWorldPos;

      void main() {
        vec2 p = vUv - 0.5;
        float radius = length(p) * 2.0;

        // Khe hở Cassini Division ở bán kính 0.60
        float cassini = smoothstep(0.04, 0.012, abs(radius - 0.60));
        float innerGap = smoothstep(0.02, 0.007, abs(radius - 0.35));

        float striations = sin(radius * 110.0) * 0.09;
        float alpha = (0.55 + striations) * cassini * innerGap;

        // Fade viền trong và ngoài
        alpha *= smoothstep(1.0, 0.85, radius);
        alpha *= smoothstep(0.06, 0.16, radius);

        if (alpha < 0.02) discard;

        // Bóng đổ giải tích của hành tinh mẹ lên vành đai rings (Analytic Sphere Shadow)
        vec3 ringOffset = vWorldPos - uPlanetPos;
        vec3 sunDir = normalize(uPlanetPos);
        float proj = dot(ringOffset, sunDir);
        float shadow = 1.0;
        if (proj > 0.0) {
          vec3 perp = ringOffset - sunDir * proj;
          shadow = smoothstep(uPlanetRadius * 0.85, uPlanetRadius * 1.2, length(perp));
        }

        vec3 finalColor = uColor * (0.22 + 0.78 * shadow);
        gl_FragColor = vec4(finalColor, alpha * 0.85);
      }
    `
  });

  const ringsMesh = new THREE.Mesh(geo, mat);
  ringsMesh.rotation.x = Math.PI * 0.46;
  ringsMesh.rotation.z = -0.22;
  return ringsMesh;
}

// ----------------------------------------------------------------------------
// 5.7. LỚP MÂY 3D KHÍ QUYỂN (ATMOSPHERIC CLOUD LAYER)
// ----------------------------------------------------------------------------
function createCloudLayerSphere(radius) {
  const geo = new THREE.SphereGeometry(radius * 1.025, 36, 36);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0xE2F1FF) }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorld;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        gl_Position = projectionMatrix * viewMatrix * world;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vNormal;
      varying vec3 vWorld;
      ${GLSL_COMMON_NOISE}

      void main() {
        vec3 p = vWorld * 2.5;
        float n = snoise(p + vec3(uTime * 0.04, uTime * 0.02, 0.0));
        float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.2);

        float alpha = smoothstep(0.12, 0.45, n) * (0.22 + fresnel * 0.55);
        if (alpha < 0.02) discard;

        gl_FragColor = vec4(uColor, alpha);
      }
    `
  });

  const cloudsMesh = new THREE.Mesh(geo, mat);
  cloudsMesh.rotation.z = 0.28;
  return cloudsMesh;
}

// ----------------------------------------------------------------------------
// 5.8. SÁU THIÊN THỂ PROCEDURAL NOISE SHADER + FRESNEL KHÍ QUYỂN + RINGS + CLOUDS
// ----------------------------------------------------------------------------
function buildPlanetarySystem() {
  const sharedGeo = new THREE.SphereGeometry(1, 48, 48);
  const sharedAtmoGeo = new THREE.SphereGeometry(1.08, 32, 32);

  PLANET_CONFIGS.forEach((cfg) => {
    const anchor = new THREE.Group();

    // 1. Quỹ đạo Elip Kepler vẽ mờ trong không gian
    const orbitPts = [];
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const th = (i / segments) * Math.PI * 2;
      const r = (cfg.a * (1.0 - cfg.e * cfg.e)) / (1.0 + cfg.e * Math.cos(th));
      const ox = Math.cos(th) * r;
      const oz = Math.sin(th) * r;
      const oy = Math.sin(th + cfg.inc) * (r * cfg.inc);
      orbitPts.push(new THREE.Vector3(ox, oy, oz));
    }
    const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(orbitPts);
    const orbitLineMat = new THREE.LineBasicMaterial({
      color: 0x29344D,
      transparent: true,
      opacity: 0.45
    });
    const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
    universeGroup.add(orbitLine);

    // 2. Bề mặt hành tinh Procedural Simplex Noise Shader
    const planetMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        void main() {
          vNormal = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPosition = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uBaseColor;
        uniform vec3 uOceanColor;
        uniform vec3 uLightPos;
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;
        ${GLSL_COMMON_NOISE}

        void main() {
          vec3 N = normalize(vNormal);
          vec3 L = normalize(uLightPos - vWorldPosition);

          float diff = max(dot(N, L), 0.0);

          // Simplex noise địa hình lục địa và biển
          float terrain = snoise(N * 3.8 + vec3(uTime * 0.02));
          float elevation = smoothstep(-0.15, 0.25, terrain);

          vec3 surface = mix(uOceanColor, uBaseColor, elevation);

          // Vùng ngày / đêm
          vec3 finalColor = surface * (diff * 1.5 + 0.12);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      uniforms: {
        uBaseColor: { value: new THREE.Color(cfg.base) },
        uOceanColor: { value: new THREE.Color(cfg.ocean) },
        uLightPos: { value: new THREE.Vector3(0, 0, 0) },
        uTime: { value: 0 }
      }
    });

    const mesh = new THREE.Mesh(sharedGeo, planetMat);
    mesh.scale.setScalar(cfg.size);
    mesh.userData = { id: cfg.id, config: cfg, radius: cfg.size, isPlanet: true };
    anchor.add(mesh);

    // 3. Vành đai khí quyển phát quang Fresnel Inverted Hull
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vViewDir = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform vec3 uAtmoColor;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float fresnel = 1.0 - abs(dot(vNormal, vViewDir));
          fresnel = pow(fresnel, 2.6);
          gl_FragColor = vec4(uAtmoColor * 1.6, fresnel * 0.85);
        }
      `,
      uniforms: {
        uAtmoColor: { value: new THREE.Color(cfg.atmo) }
      },
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    const atmoMesh = new THREE.Mesh(sharedAtmoGeo, atmoMat);
    atmoMesh.scale.setScalar(cfg.size * 1.1);
    anchor.add(atmoMesh);

    // 4. Lớp mây 3D khí quyển quay độc lập (3D Cloud Layer)
    let cloudsMesh = null;
    if (cfg.hasClouds) {
      cloudsMesh = createCloudLayerSphere(cfg.size);
      anchor.add(cloudsMesh);
    }

    // 5. Vành đai 3D Planetary Rings với bóng đổ giải tích (dành riêng cho Node 02 & 05)
    let ringsMesh = null;
    if (cfg.hasRings) {
      ringsMesh = createPlanetaryRings(cfg.size * 1.35, cfg.size * 2.45, cfg.ringColor || cfg.base, cfg.size);
      anchor.add(ringsMesh);
    }

    // 5.2. Hệ thống Mặt trăng Vệ tinh tự nhiên (Natural Moons — Solar-Wanderer hierarchy)
    const moonMeshes = [];
    if (cfg.moons && cfg.moons.length > 0) {
      cfg.moons.forEach((mCfg) => {
        // Vòng quỹ đạo con của vệ tinh
        const mPts = [];
        const mSegments = 48;
        for (let j = 0; j <= mSegments; j++) {
          const mTh = (j / mSegments) * Math.PI * 2;
          mPts.push(new THREE.Vector3(Math.cos(mTh) * mCfg.dist, Math.sin(mTh) * mCfg.dist * 0.15, Math.sin(mTh) * mCfg.dist));
        }
        const mOrbitGeo = new THREE.BufferGeometry().setFromPoints(mPts);
        const mOrbitMat = new THREE.LineBasicMaterial({
          color: mCfg.color,
          transparent: true,
          opacity: 0.35,
          blending: THREE.AdditiveBlending
        });
        const mOrbitLine = new THREE.Line(mOrbitGeo, mOrbitMat);
        anchor.add(mOrbitLine);

        // Quả cầu mặt trăng với crater roughness
        const mGeo = new THREE.SphereGeometry(mCfg.size, 20, 20);
        const mMat = new THREE.MeshStandardMaterial({
          color: mCfg.color,
          roughness: 0.78,
          metalness: 0.22
        });
        const mMesh = new THREE.Mesh(mGeo, mMat);
        anchor.add(mMesh);

        moonMeshes.push({
          cfg: mCfg,
          mesh: mMesh,
          orbitLine: mOrbitLine,
          theta: Math.random() * Math.PI * 2
        });
      });
    }

    // 6. Vệt bụi sao quỹ đạo Circular Ring Buffer (Zero Allocation 60 FPS)
    const TRAIL_POINTS = 54;
    const trailPositions = new Float32Array(TRAIL_POINTS * 3);
    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));

    const trailMat = new THREE.LineBasicMaterial({
      color: cfg.atmo,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });

    const trailLine = new THREE.Line(trailGeo, trailMat);
    trailLine.frustumCulled = false;
    universeGroup.add(trailLine);

    universeGroup.add(anchor);

    planets.push({
      cfg,
      anchor,
      mesh,
      atmoMesh,
      cloudsMesh,
      ringsMesh,
      moonMeshes,
      orbitLine,
      trailLine,
      trailPositions,
      trailHead: 0,
      trailCount: 0,
      theta: Math.random() * Math.PI * 2
    });

    planetMeshes.push(mesh);
  });
}

// ----------------------------------------------------------------------------
// 5.9. VÒNG TÂM NGẮM THIÊN VĂN AR & ĐƯỜNG LINE RADAR KẾT NỐI
// ----------------------------------------------------------------------------
function buildReticleWithRadarLine() {
  reticleGroup = new THREE.Group();

  // Vòng ngắm chính
  const ringGeo = new THREE.RingGeometry(1.3, 1.36, 48);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xF0C879,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  reticleGroup.add(ring);

  // Vòng chấm định vị
  const dotPoints = new THREE.EllipseCurve(0, 0, 1.55, 1.55, 0, Math.PI * 2).getPoints(36);
  const dotGeo = new THREE.BufferGeometry().setFromPoints(dotPoints);
  const dotMat = new THREE.PointsMaterial({
    color: 0x8E9CFF,
    size: 0.12,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  reticleGroup.add(new THREE.Points(dotGeo, dotMat));

  reticleGroup.visible = false;
  scene.add(reticleGroup);

  // Đường line vector radar nối từ tâm thiên thể đến Reticle
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, 0)
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xF0C879,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });
  reticleLine = new THREE.Line(lineGeo, lineMat);
  reticleLine.visible = false;
  scene.add(reticleLine);
}

// ----------------------------------------------------------------------------
// 5.10. NHÃN AR CHIẾU TỪ TỌA ĐỘ 3D SANG 2D SCREEN SPACE
// ----------------------------------------------------------------------------
function createSpatialLabels() {
  if (!dom.labelsContainer) return;
  dom.labelsContainer.innerHTML = '';

  PLANET_CONFIGS.forEach((cfg) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'spatial-node-tag font-mono';
    btn.id = `spatial-tag-${cfg.id}`;
    btn.innerHTML = `
      <span class="tag-dot" style="background-color: #${cfg.base.toString(16)}"></span>
      <span class="tag-title">[${cfg.symbol}] ${cfg.name}</span>
    `;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      flyToPlanet(cfg.id);
    });

    dom.labelsContainer.appendChild(btn);
  });
}

function updateSpatialLabels() {
  if (!dom.labelsContainer) return;

  if (selectedPlanet) {
    dom.labelsContainer.style.opacity = '0';
    return;
  }
  dom.labelsContainer.style.opacity = '1';

  planets.forEach((p) => {
    const label = document.getElementById(`spatial-tag-${p.cfg.id}`);
    if (!label) return;

    p.anchor.getWorldPosition(_vTemp);
    _vTemp.project(camera);

    if (_vTemp.z < 1) {
      const x = (_vTemp.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(_vTemp.y * 0.5) + 0.5) * window.innerHeight;

      label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      label.style.display = 'flex';

      const isHovered = hoveredPlanet && hoveredPlanet.userData.id === p.cfg.id;
      label.classList.toggle('tag-hovered', isHovered);
    } else {
      label.style.display = 'none';
    }
  });
}

// ----------------------------------------------------------------------------
// 5.11. QUICK NAVIGATION PILLS Ở DƯỚI CÙNG
// ----------------------------------------------------------------------------
function createNavPills() {
  if (!dom.navPills) return;
  dom.navPills.innerHTML = '';

  PLANET_CONFIGS.forEach((cfg) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'orbit-pill font-mono';
    pill.setAttribute('data-id', cfg.id);
    pill.innerHTML = `✦ ${cfg.symbol}`;

    pill.addEventListener('click', () => {
      flyToPlanet(cfg.id);
    });

    dom.navPills.appendChild(pill);
  });
}

function updateNavPills() {
  if (!dom.navPills) return;
  dom.navPills.querySelectorAll('.orbit-pill').forEach((pill) => {
    const id = pill.getAttribute('data-id');
    const isAct = selectedPlanet && selectedPlanet.userData.id === id;
    pill.classList.toggle('active-pill', isAct);
  });
}

// ----------------------------------------------------------------------------
// 6. CAMERA FLIGHT (HYPERSPACE JUMP & SLERP) VÀ QUAN SÁT THIÊN THỂ
// ----------------------------------------------------------------------------
function flyToPlanet(memberId) {
  const target = planets.find(p => p.cfg.id === memberId);
  const member = MEMBERS.find(m => m.id === memberId);

  if (!target || !member) {
    resetToOrbit();
    return;
  }

  // Âm thanh Warp Speed và hiệu ứng kéo dãn vệt sao
  audio.playWarpWhoosh();
  audio.playSelectChord();
  if (warpStreaksGroup && warpStreaksGroup.userData.triggerWarp) {
    warpStreaksGroup.userData.triggerWarp(1100);
  }

  selectedPlanet = target.mesh;
  isCameraTransitioning = true;

  // Lấy vị trí thế giới của thiên thể
  target.anchor.getWorldPosition(_vTemp);

  cameraLookTarget.copy(_vTemp);
  cameraTargetPos.copy(_vTemp).add(new THREE.Vector3(0, 1.2, target.cfg.size * 3.6));

  openSpatialDetailDrawer(member, target.cfg);
  history.replaceState(null, '', `#${member.id}`);

  if (dom.currentFocusReadout) {
    dom.currentFocusReadout.textContent = `TARGET: [${target.cfg.symbol}] ${member.name.toUpperCase()}`;
  }

  updateNavPills();
}

function resetToOrbit() {
  if (selectedPlanet) {
    audio.playWarpWhoosh();
  }
  selectedPlanet = null;
  isCameraTransitioning = true;

  cameraLookTarget.copy(defaultLookTarget);
  cameraTargetPos.copy(defaultCamPos);

  if (dom.detailPanel) {
    dom.detailPanel.hidden = true;
    dom.detailPanel.classList.remove('panel-open');
  }

  history.replaceState(null, '', window.location.pathname + window.location.search);

  if (dom.currentFocusReadout) {
    dom.currentFocusReadout.textContent = `SECTOR: TECHGROUP 06 // ORBIT PANORAMA`;
  }

  updateNavPills();
}

// ----------------------------------------------------------------------------
// 6.1. MỞ PANEL CHI TIẾT AR HOLOGRAPHIC
// ----------------------------------------------------------------------------
function openSpatialDetailDrawer(member, cfg) {
  if (!dom.detailPanel) return;

  dom.detailPanel.hidden = false;
  dom.detailPanel.classList.add('panel-open');

  if (dom.panelMemberSeq) {
    dom.panelMemberSeq.textContent = `CELESTIAL BODY // 0${member.order} · [${cfg.symbol}]`;
  }

  if (dom.panelMemberName) {
    dom.panelMemberName.textContent = member.name;
  }

  if (dom.panelMemberRole) {
    dom.panelMemberRole.textContent = `✦ ${member.role || cfg.title}`;
  }

  if (dom.panelMemberHeadline) {
    dom.panelMemberHeadline.textContent = member.headline || `Thành viên nhóm nghiên cứu và phát triển hệ thống Website Nhóm 06 — UTH.`;
  }

  // Cập nhật thông số vật lý thiên văn thời gian thực (Live Astronomical Telemetry — Tycho style)
  if (dom.telemetryA) {
    dom.telemetryA.textContent = `${cfg.a.toFixed(1)} AU`;
  }
  if (dom.telemetryV) {
    const v = (29.8 / Math.sqrt(cfg.a / 10)).toFixed(1);
    dom.telemetryV.textContent = `${v} km/s`;
  }
  if (dom.telemetryT) {
    const t = Math.round(Math.pow(cfg.a / 10, 1.5) * 365.25);
    dom.telemetryT.textContent = `${t} Days`;
  }
  if (dom.telemetryE) {
    dom.telemetryE.textContent = cfg.e.toFixed(3);
  }
  if (dom.telemetryMoons) {
    const moonStr = (cfg.moons && cfg.moons.length > 0) ? `${cfg.moons.length} Satellite${cfg.moons.length > 1 ? 's' : ''}` : (cfg.hasRings ? 'Ring System' : 'None');
    dom.telemetryMoons.textContent = moonStr;
  }
  if (dom.telemetryInc) {
    const incDeg = (Math.abs(cfg.inc) * (180 / Math.PI)).toFixed(1);
    dom.telemetryInc.textContent = `${incDeg}°`;
  }

  if (dom.panelAvatarImg && dom.panelMonogram) {
    if (member.avatar) {
      dom.panelAvatarImg.src = member.avatar;
      dom.panelAvatarImg.alt = member.name;
      dom.panelAvatarImg.hidden = false;
      dom.panelMonogram.hidden = true;
      dom.panelAvatarImg.onerror = () => {
        dom.panelAvatarImg.hidden = true;
        dom.panelMonogram.hidden = false;
        dom.panelMonogram.textContent = member.symbol || '✦';
      };
    } else {
      dom.panelAvatarImg.hidden = true;
      dom.panelMonogram.hidden = false;
      dom.panelMonogram.textContent = member.symbol || '✦';
    }
  }

  if (dom.panelSkillsBlock && dom.panelTagsList) {
    dom.panelTagsList.innerHTML = '';
    const tags = Array.isArray(member.tags) ? member.tags : [];
    if (tags.length > 0) {
      tags.forEach((tagKey) => {
        const tag = TAGS[tagKey] || { label: tagKey };
        const badge = document.createElement('span');
        badge.className = 'skill-tag';
        badge.textContent = `✦ ${tag.label}`;
        dom.panelTagsList.appendChild(badge);
      });
      dom.panelSkillsBlock.hidden = false;
    } else {
      dom.panelSkillsBlock.hidden = true;
    }
  }

  if (dom.panelPortfolioLink) {
    dom.panelPortfolioLink.href = member.portfolio || `./members/${member.slug}/index.html`;
    dom.panelPortfolioLink.innerHTML = `TIẾN VÀO HỆ QUY CHIẾU 3D ↗`;
  }

  if (dom.panelGithubLink) {
    if (member.github) {
      dom.panelGithubLink.href = member.github;
      dom.panelGithubLink.hidden = false;
    } else {
      dom.panelGithubLink.hidden = true;
    }
  }

  if (dom.panelCloseBtn) {
    setTimeout(() => {
      try { dom.panelCloseBtn.focus(); } catch (e) {}
    }, 150);
  }
}

// ----------------------------------------------------------------------------
// 7. THUẬT TOÁN RAY-SPHERE GIẢI TÍCH (O(1) CPU RAYCASTING) & RETICLE RADAR
// ----------------------------------------------------------------------------
function testAnalyticIntersection(pCoord) {
  _vRayOrigin.copy(camera.position);
  _vRayDir.set(pCoord.x, pCoord.y, 0.5).unproject(camera).sub(_vRayOrigin).normalize();

  let closestDist = Infinity;
  let hit = null;

  for (let i = 0; i < planets.length; i++) {
    const p = planets[i];
    p.anchor.getWorldPosition(_vTemp);

    _vDiff.subVectors(_vTemp, _vRayOrigin);
    const tca = _vDiff.dot(_vRayDir);
    if (tca < 0) continue;

    const d2 = _vDiff.dot(_vDiff) - tca * tca;
    const r2 = (p.cfg.size * 1.5) * (p.cfg.size * 1.5);

    if (d2 <= r2) {
      const thc = Math.sqrt(r2 - d2);
      const t0 = tca - thc;
      if (t0 < closestDist) {
        closestDist = t0;
        hit = p.mesh;
      }
    }
  }

  if (hit !== hoveredPlanet) {
    hoveredPlanet = hit;
    if (hit) {
      audio.playSonarBlip(hit.userData.radius > 1.2 ? 0.92 : 1.15);
      reticleGroup.visible = true;
      hit.getWorldPosition(reticleGroup.position);
      const scale = hit.userData.radius * 2.2;
      reticleGroup.scale.set(scale, scale, scale);

      if (reticleLine) {
        reticleLine.visible = true;
        const linePos = reticleLine.geometry.attributes.position.array;
        hit.getWorldPosition(_vTemp);
        linePos[0] = _vTemp.x;
        linePos[1] = _vTemp.y;
        linePos[2] = _vTemp.z;
        linePos[3] = _vTemp.x + 1.2;
        linePos[4] = _vTemp.y + 1.5;
        linePos[5] = _vTemp.z;
        reticleLine.geometry.attributes.position.needsUpdate = true;
      }

      document.body.style.cursor = 'pointer';
    } else {
      reticleGroup.visible = false;
      if (reticleLine) reticleLine.visible = false;
      document.body.style.cursor = 'default';
    }
  }
}

function onPointerMove(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  // Tính toán góc nghiêng Gyroscope Parallax theo hướng chuột
  targetTiltX = pointer.y * 0.14;  // Nghiêng nhẹ trục X
  targetTiltZ = -pointer.x * 0.14; // Nghiêng nhẹ trục Z

  if (!selectedPlanet) {
    testAnalyticIntersection(pointer);
  }
}

function onPointerClick(e) {
  if (e.target.closest('.spatial-hud-element') || e.target.closest('#spatialDetailPanel')) {
    return;
  }

  if (hoveredPlanet) {
    flyToPlanet(hoveredPlanet.userData.id);
  }
}

function onResize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  if (composer) {
    composer.setSize(w, h);
  }
}

// ----------------------------------------------------------------------------
// 8. VÒNG LẶP ĐỒ HỌA CHÍNH (60 FPS HOT LOOP VỚI EFFECT COMPOSER BLOOM)
// ----------------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.1);
  const time = clock.getElapsedTime();

  // A. Cập nhật Đĩa bồi tụ Singularity & Tia quang học James Webb
  if (accretionDisk) {
    accretionDisk.material.uniforms.uTime.value = time;
    accretionDisk.rotation.z += delta * 0.18;
  }
  if (diffractionSpikes) {
    diffractionSpikes.quaternion.copy(camera.quaternion);
    diffractionSpikes.rotation.z += delta * 0.06;
  }

  // B. Xoay dải ngân hà 3D xoắn ốc (Spiral Galaxy)
  if (spiralGalaxyGroup) {
    spiralGalaxyGroup.rotation.y += delta * 0.025;
  }

  // C. Xoay nhẹ mây bụi tinh vân đa sắc
  if (nebulaDustGroup) {
    nebulaDustGroup.rotation.y += delta * 0.012;
    nebulaDustGroup.rotation.z += delta * 0.005;
  }

  // D. Cập nhật Vành đai tiểu hành tinh 3D (Asteroid Belt — 1.200 mảnh đá)
  if (asteroidBeltMesh) {
    const data = asteroidBeltMesh.userData.asteroidData;
    const dummy = asteroidBeltMesh.userData.dummy;
    const timeDelta = delta * 0.18;
    for (let i = 0; i < data.length; i++) {
      const ast = data[i];
      ast.theta += timeDelta * ast.speed;
      const x = Math.cos(ast.theta) * ast.r;
      const z = Math.sin(ast.theta) * ast.r;
      const y = Math.sin(ast.theta * 3.0) * ast.yAmp;

      dummy.position.set(x, y, z);
      dummy.rotation.x += delta * ast.rotSpeedX;
      dummy.rotation.y += delta * ast.rotSpeedY;
      dummy.scale.setScalar(ast.scale);
      dummy.updateMatrix();
      asteroidBeltMesh.setMatrixAt(i, dummy.matrix);
    }
    asteroidBeltMesh.instanceMatrix.needsUpdate = true;
  }

  // E. Cập nhật Hyperspace Warp Streaks & Damping tốc độ
  if (warpStreaksGroup) {
    const ud = warpStreaksGroup.userData;
    ud.speed = THREE.MathUtils.lerp(ud.speed, ud.targetSpeed, 0.08);
    if (ud.speed > 0.01) {
      const pos = ud.streaks.geometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 2] += ud.speed;
        if (pos[i + 2] > 5) {
          pos[i + 2] = -90 - Math.random() * 20;
        }
      }
      ud.streaks.geometry.attributes.position.needsUpdate = true;
    }
  }

  // F. Cập nhật góc nghiêng Parallax theo chuột bằng Lerp Easing mượt mà
  currentTiltX = THREE.MathUtils.lerp(currentTiltX, targetTiltX, 0.045);
  currentTiltZ = THREE.MathUtils.lerp(currentTiltZ, targetTiltZ, 0.045);
  universeGroup.rotation.x = currentTiltX;
  universeGroup.rotation.z = currentTiltZ;

  // G. Quỹ đạo Kepler và cập nhật Circular Trail Buffer
  for (let i = 0; i < planets.length; i++) {
    const p = planets[i];

    // Cập nhật shader thời gian cho bề mặt hành tinh
    p.mesh.material.uniforms.uTime.value = time;

    // Vận tốc quỹ đạo (chuyển động nhẹ nhàng ngay cả khi đang xem cận cảnh)
    const isSelected = selectedPlanet && selectedPlanet.userData.id === p.cfg.id;
    const speedMult = isSelected ? 0.08 : 0.35;
    p.theta += delta * p.cfg.speed * speedMult;
    const r = (p.cfg.a * (1.0 - p.cfg.e * p.cfg.e)) / (1.0 + p.cfg.e * Math.cos(p.theta));

    const x = Math.cos(p.theta) * r;
    const z = Math.sin(p.theta) * r;
    const y = Math.sin(p.theta + p.cfg.inc) * (r * p.cfg.inc);

    p.anchor.position.set(x, y, z);

    // Cập nhật Ring Buffer vệt đuôi sao
    const posArr = p.trailPositions;
    const h = p.trailHead;
    posArr[h * 3]     = x;
    posArr[h * 3 + 1] = y;
    posArr[h * 3 + 2] = z;

    p.trailHead = (h + 1) % (posArr.length / 3);
    p.trailLine.geometry.attributes.position.needsUpdate = true;

    // Tự xoay trục bề mặt hành tinh
    p.mesh.rotation.y += delta * 0.55;

    // Cập nhật lớp mây quay độc lập
    if (p.cloudsMesh) {
      p.cloudsMesh.material.uniforms.uTime.value = time;
      p.cloudsMesh.rotation.y += delta * 0.75;
      p.cloudsMesh.rotation.x += delta * 0.08;
    }

    // Cập nhật vành đai sao Thổ và bóng đổ hành tinh
    if (p.ringsMesh) {
      p.ringsMesh.material.uniforms.uTime.value = time;
      p.ringsMesh.material.uniforms.uPlanetPos.value.copy(p.anchor.position);
      p.ringsMesh.rotation.z += delta * 0.12;
    }

    // Cập nhật các mặt trăng vệ tinh tự nhiên (Natural Moons)
    if (p.moonMeshes && p.moonMeshes.length > 0) {
      for (let j = 0; j < p.moonMeshes.length; j++) {
        const m = p.moonMeshes[j];
        m.theta += delta * m.cfg.speed;
        const mx = Math.cos(m.theta) * m.cfg.dist;
        const mz = Math.sin(m.theta) * m.cfg.dist;
        const my = Math.sin(m.theta) * m.cfg.dist * 0.18;
        m.mesh.position.set(mx, my, mz);
        m.mesh.rotation.y = m.theta + Math.PI; // Khóa thủy triều (Tidal Locking)
      }
    }
  }

  // H. Camera Transition Lerp & Orbit Lock Tracking
  if (isCameraTransitioning) {
    camera.position.lerp(cameraTargetPos, 0.065);
    controls.target.lerp(cameraLookTarget, 0.065);

    if (camera.position.distanceTo(cameraTargetPos) < 0.2) {
      isCameraTransitioning = false;
    }
  } else if (selectedPlanet) {
    // Camera Orbit Lock: Bám mục tiêu camera theo tâm thực thể đang di chuyển
    const selP = planets.find(pl => pl.mesh === selectedPlanet);
    if (selP) {
      selP.anchor.getWorldPosition(_vTemp);
      controls.target.lerp(_vTemp, 0.1);
    }
  }

  // I. Cập nhật OrbitControls
  controls.update();

  // J. Cập nhật Reticle Ring & Radar vector line
  if (reticleGroup.visible) {
    reticleGroup.quaternion.copy(camera.quaternion);
    reticleGroup.rotation.z += delta * 1.5;

    if (hoveredPlanet && reticleLine) {
      hoveredPlanet.getWorldPosition(_vTemp);
      const linePos = reticleLine.geometry.attributes.position.array;
      linePos[0] = _vTemp.x;
      linePos[1] = _vTemp.y;
      linePos[2] = _vTemp.z;
      linePos[3] = _vTemp.x + Math.cos(time * 3.0) * 0.8;
      linePos[4] = _vTemp.y + Math.sin(time * 3.0) * 0.8 + 1.2;
      linePos[5] = _vTemp.z;
      reticleLine.geometry.attributes.position.needsUpdate = true;
    }
  }

  // K. Cập nhật nhãn AR chiếu lên màn hình
  updateSpatialLabels();

  // L. Render qua EffectComposer với UnrealBloomPass
  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

// ----------------------------------------------------------------------------
// 9. TÌM KIẾM THIÊN VĂN & ĐIỀU KHIỂN ÂM THANH
// ----------------------------------------------------------------------------
function filterUniverse(rawQuery) {
  const q = rawQuery.trim();
  const normalized = normalizeText(q);
  const words = normalized.split(/\s+/).filter(Boolean);

  let matchTarget = null;
  let matchCount = 0;

  planets.forEach((p) => {
    const haystack = getMemberHaystack(p.cfg.id);
    const isMatch = words.length === 0 || words.every((w) => haystack.includes(w));

    p.mesh.visible = isMatch;
    p.atmoMesh.visible = isMatch;
    if (p.cloudsMesh) p.cloudsMesh.visible = isMatch;
    if (p.ringsMesh) p.ringsMesh.visible = isMatch;
    p.orbitLine.visible = isMatch;

    const tag = document.getElementById(`spatial-tag-${p.cfg.id}`);
    if (tag) tag.style.opacity = isMatch ? '1' : '0.15';

    if (isMatch) {
      matchCount++;
      if (!matchTarget && words.length > 0) matchTarget = p.cfg.id;
    }
  });

  if (dom.searchClearBtn) dom.searchClearBtn.hidden = q.length === 0;

  if (dom.searchStatus) {
    if (q.length === 0) {
      dom.searchStatus.textContent = `✦ Khám phá 6/6 thực thể thiên văn`;
    } else {
      dom.searchStatus.textContent = `✦ Tìm thấy ${matchCount}/6 thiên thể phù hợp`;
    }
  }

  if (dom.searchEmpty) {
    dom.searchEmpty.hidden = matchCount > 0;
  }

  if (matchCount === 1 && matchTarget) {
    flyToPlanet(matchTarget);
  }
}

function initAudioControls() {
  if (!dom.btnAudioToggle) return;

  const updateAudioUI = () => {
    const muted = audio.isMuted;
    dom.btnAudioToggle.classList.toggle('audio-muted', muted);
    if (dom.audioStatusText) {
      dom.audioStatusText.textContent = muted ? 'AUDIO: OFF' : 'AUDIO: ON';
    }
    dom.btnAudioToggle.title = muted ? 'Bật âm thanh vũ trụ' : 'Tắt âm thanh vũ trụ';
  };

  updateAudioUI();

  dom.btnAudioToggle.addEventListener('click', async () => {
    await audio.init();
    if (!audio.isAmbienceStarted && !audio.isMuted) {
      await audio.startAmbience();
    }
    audio.toggleMute();
    updateAudioUI();
  });
}

// ----------------------------------------------------------------------------
// 10. KHỞI CHẠY DOM READY
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi động WebGL Scene
  initUniverseEngine();

  // 2. Nút Reset Quỹ Đạo Toàn Cảnh
  if (dom.btnResetOrbit) {
    dom.btnResetOrbit.addEventListener('click', () => {
      resetToOrbit();
    });
  }

  // 3. Nút Đóng Detail Panel
  if (dom.panelCloseBtn) {
    dom.panelCloseBtn.addEventListener('click', () => {
      resetToOrbit();
    });
  }

  // 4. Phím Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resetToOrbit();
    }
  });

  // 5. Ô tìm kiếm
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', (e) => {
      filterUniverse(e.target.value);
    });
  }

  if (dom.searchClearBtn) {
    dom.searchClearBtn.addEventListener('click', () => {
      if (dom.searchInput) {
        dom.searchInput.value = '';
        dom.searchInput.focus();
      }
      filterUniverse('');
      resetToOrbit();
    });
  }

  // 6. Deep linking URL Hash
  const hash = window.location.hash.replace('#', '').trim();
  if (hash) {
    const m = MEMBERS.find(x => x.id === hash || x.slug === hash);
    if (m) {
      flyToPlanet(m.id);
    }
  }

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '').trim();
    if (!h) {
      resetToOrbit();
    } else {
      const m = MEMBERS.find(x => x.id === h || x.slug === h);
      if (m && (!selectedPlanet || selectedPlanet.userData.id !== m.id)) {
        flyToPlanet(m.id);
      }
    }
  });
});
