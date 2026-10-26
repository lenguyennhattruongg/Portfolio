/**
 * group.js — PRODUCTION-GRADE 3D WEBGL SPATIAL UNIVERSE
 * Nhóm 06 — Đại học Giao thông Vận tải TP.HCM (UTH)
 * Kiến trúc: Three.js WebGL + OrbitControls + Procedural Noise Shaders +
 *            Fresnel Atmosphere + Relativistic Accretion Disk +
 *            Zero-Allocation Keplerian Orbit Trails + AR Spatial HUD
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MEMBERS, TAGS, normalizeText, getMemberHaystack } from './members.data.js';

// ============================================================================
// 1. GLSL SHADER CHUNKS: FAST ANALYTIC SIMPLEX NOISE
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
// 2. CẤU HÌNH 6 THIÊN THỂ KEPLER
// ============================================================================
const PLANET_CONFIGS = [
  { id: 'hieu',   order: 1, name: 'Nguyễn Xuân Hiệu',     symbol: 'NXH-01', a: 11.5, e: 0.05, inc: 0.06,  speed: 0.38, size: 1.15, base: 0x2563EB, ocean: 0x0A1838, atmo: 0x60A5FA, title: 'Lead / System Architecture' },
  { id: 'truong', order: 2, name: 'Lê Nguyễn Nhật Trường', symbol: 'LNT-02', a: 16.0, e: 0.03, inc: -0.05, speed: 0.30, size: 1.30, base: 0xF59E0B, ocean: 0x3D1B04, atmo: 0xFBBF24, title: 'Backend / Systems Engineer' },
  { id: 'nhu',    order: 3, name: 'Nguyễn Thị Thảo Như',   symbol: 'NTN-03', a: 21.0, e: 0.06, inc: 0.08,  speed: 0.24, size: 1.10, base: 0x8B5CF6, ocean: 0x1F0B3D, atmo: 0xC084FC, title: 'UI/UX & Micro-interactions' },
  { id: 'huynh',  order: 4, name: 'Nguyễn Phạm Ý Huỳnh',   symbol: 'NPY-04', a: 26.0, e: 0.02, inc: 0.03,  speed: 0.19, size: 1.12, base: 0x10B981, ocean: 0x032418, atmo: 0x34D399, title: 'Data Analytics & Pipelines' },
  { id: 'chau',   order: 5, name: 'Lê Hữu Châu',          symbol: 'LHC-05', a: 31.0, e: 0.07, inc: -0.07, speed: 0.15, size: 1.20, base: 0xEF4444, ocean: 0x3D0B0B, atmo: 0xF87171, title: 'DevOps & Cloud Security' },
  { id: 'thu',    order: 6, name: 'Nguyễn Anh Thư',        symbol: 'NAT-06', a: 36.5, e: 0.04, inc: 0.05,  speed: 0.12, size: 1.10, base: 0x06B6D4, ocean: 0x04252E, atmo: 0x22D3EE, title: 'Quality Assurance & Automated QA' }
];

// ============================================================================
// 3. DOM ELEMENTS CACHED
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
  navPills: document.getElementById('spatialNavPills'),
  searchInput: document.getElementById('spatialSearchInput'),
  searchClearBtn: document.getElementById('spatialSearchClearBtn'),
  searchStatus: document.getElementById('spatialSearchStatus'),
  searchEmpty: document.getElementById('spatialSearchEmpty'),
  btnResetOrbit: document.getElementById('btnResetOrbit'),
  currentFocusReadout: document.getElementById('currentFocusReadout')
};

// ============================================================================
// 4. MAIN THREE.JS SPATIAL UNIVERSE ENGINE
// ============================================================================
let scene, camera, renderer, controls, clock;
let universeGroup, singularityGroup, accretionDisk, reticleGroup;
const planets = [];
const planetMeshes = [];
let hoveredPlanet = null;
let selectedPlanet = null;
let isCameraTransitioning = false;
const cameraTargetPos = new THREE.Vector3();
const cameraLookTarget = new THREE.Vector3();
const defaultCamPos = new THREE.Vector3(0, 24, 48);
const defaultLookTarget = new THREE.Vector3(0, 0, 0);

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

  // 1. Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080B16, 0.009);

  // 2. Camera 3D Perspective
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.copy(defaultCamPos);

  // 3. WebGL Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: dom.canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // 4. OrbitControls: Xoay tự do 360 độ quanh vũ trụ & Scroll Zoom mượt mà có Damping!
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.minDistance = 4.5;
  controls.maxDistance = 120;
  controls.rotateSpeed = 0.65;
  controls.zoomSpeed = 0.85;
  controls.target.copy(defaultLookTarget);

  // 5. Universe Root Group
  universeGroup = new THREE.Group();
  scene.add(universeGroup);

  // 6. Lights
  const ambientLight = new THREE.AmbientLight(0x1E293B, 1.4);
  scene.add(ambientLight);

  const singularityLight = new THREE.PointLight(0xF0C879, 4.0, 110, 1.1);
  singularityLight.position.set(0, 0, 0);
  scene.add(singularityLight);

  // Build universe components
  buildSingularity();
  build3DStarfield();
  buildPlanetarySystem();
  buildReticle();
  createSpatialLabels();
  createNavPills();

  // Event Listeners
  window.addEventListener('resize', onResize);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('click', onPointerClick);

  // Start Animation Loop
  animate();
}

// ----------------------------------------------------------------------------
// 4.1. HẠT NHÂN NĂNG LƯỢNG TRUNG TÂM VỚI ĐĨA BỒI TỤ DOPPLER BEAMING
// ----------------------------------------------------------------------------
function buildSingularity() {
  singularityGroup = new THREE.Group();

  // Lõi đen hố đen (Event Horizon)
  const coreGeo = new THREE.SphereGeometry(2.0, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const core = new THREE.Mesh(coreGeo, coreMat);
  singularityGroup.add(core);

  // Vành đĩa bồi tụ quang học (Relativistic Accretion Disk Shader)
  const diskGeo = new THREE.RingGeometry(2.4, 8.2, 128, 1);
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
        float spiral = theta * 4.0 - uTime * 2.4 - log(r) * 9.0;
        float n = snoise(vec3(cos(spiral) * 1.6, sin(spiral) * 1.6, r * 4.0));

        // Relativistic Doppler Beaming
        float doppler = 1.0 - sin(theta) * 0.45;
        float density = smoothstep(0.28, 0.45, r) * (1.0 - smoothstep(0.85, 1.0, r));
        density *= (0.65 + 0.35 * n);

        vec3 blueShift = vec3(0.4, 0.75, 1.0) * 2.2;
        vec3 redShift = vec3(1.0, 0.28, 0.05) * 0.9;
        vec3 color = mix(redShift, blueShift, clamp((doppler - 0.5) * 1.4, 0.0, 1.0));

        color *= doppler * 2.2;
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

  // Vầng sáng nhật hoa đa tầng (Volumetric Corona Spheres)
  const coronaGeo1 = new THREE.SphereGeometry(2.8, 32, 32);
  const coronaMat1 = new THREE.MeshBasicMaterial({
    color: 0xF0C879,
    transparent: true,
    opacity: 0.14,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  singularityGroup.add(new THREE.Mesh(coronaGeo1, coronaMat1));

  const coronaGeo2 = new THREE.SphereGeometry(3.8, 32, 32);
  const coronaMat2 = new THREE.MeshBasicMaterial({
    color: 0x8E9CFF,
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  singularityGroup.add(new THREE.Mesh(coronaGeo2, coronaMat2));

  universeGroup.add(singularityGroup);
}

// ----------------------------------------------------------------------------
// 4.2. BIỂN 8.000 HẠT BỤI SAO 3D ĐA TẦNG ĐỘ SÂU
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
    const radius = 35 + Math.random() * 140;
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

  const mat = new THREE.PointsMaterial({
    size: 0.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true
  });

  universeGroup.add(new THREE.Points(geo, mat));
}

// ----------------------------------------------------------------------------
// 4.3. SÁU THIÊN THỂ PROCEDURAL NOISE SHADER + FRESNEL KHÍ QUYỂN + ORBIT TRAILS
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

    // 4. Vệt bụi sao quỹ đạo Circular Ring Buffer (Zero Allocation 60 FPS)
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
// 4.4. VÒNG TÂM NGẮM THIÊN VĂN AR (TARGETING RETICLE)
// ----------------------------------------------------------------------------
function buildReticle() {
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
}

// ----------------------------------------------------------------------------
// 4.5. NHÃN AR CHIẾU TỪ TỌA ĐỘ 3D SANG 2D SCREEN SPACE
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

  // Khi đang zoom vào một hành tinh thì ẩn nhãn toàn cảnh
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
// 4.6. QUICK NAVIGATION PILLS Ở DƯỚI CÙNG
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
// 5. CAMERA FLIGHT (HYPER-ZOOM SLERP) VÀ QUAN SÁT THIÊN THỂ
// ----------------------------------------------------------------------------
function flyToPlanet(memberId) {
  const target = planets.find(p => p.cfg.id === memberId);
  const member = MEMBERS.find(m => m.id === memberId);

  if (!target || !member) {
    resetToOrbit();
    return;
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
// 5.1. MỞ PANEL CHI TIẾT AR HOLOGRAPHIC
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
// 6. THUẬT TOÁN RAY-SPHERE GIẢI TÍCH (O(1) CPU RAYCASTING)
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
      reticleGroup.visible = true;
      hit.getWorldPosition(reticleGroup.position);
      const scale = hit.userData.radius * 2.2;
      reticleGroup.scale.set(scale, scale, scale);
      document.body.style.cursor = 'pointer';
    } else {
      reticleGroup.visible = false;
      document.body.style.cursor = 'default';
    }
  }
}

function onPointerMove(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

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
}

// ----------------------------------------------------------------------------
// 7. VÒNG LẶP ĐỒ HỌA CHÍNH (60 FPS HOT LOOP)
// ----------------------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(clock.getDelta(), 0.1);
  const time = clock.getElapsedTime();

  // A. Cập nhật Đĩa bồi tụ Singularity
  if (accretionDisk) {
    accretionDisk.material.uniforms.uTime.value = time;
    accretionDisk.rotation.z += delta * 0.18;
  }

  // B. Quỹ đạo Kepler và cập nhật Circular Trail Buffer
  for (let i = 0; i < planets.length; i++) {
    const p = planets[i];

    // Cập nhật shader thời gian
    p.mesh.material.uniforms.uTime.value = time;

    // Vận tốc quỹ đạo (ngừng xoay hành tinh khi đang zoom xem chi tiết)
    if (!selectedPlanet || selectedPlanet.userData.id !== p.cfg.id) {
      p.theta += delta * p.cfg.speed * 0.35;
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
    }

    // Tự xoay trục
    p.mesh.rotation.y += delta * 0.55;
  }

  // C. Camera Transition Lerp
  if (isCameraTransitioning) {
    camera.position.lerp(cameraTargetPos, 0.065);
    controls.target.lerp(cameraLookTarget, 0.065);

    if (camera.position.distanceTo(cameraTargetPos) < 0.2) {
      isCameraTransitioning = false;
    }
  }

  // D. Cập nhật OrbitControls
  controls.update();

  // E. Cập nhật Reticle Ring
  if (reticleGroup.visible) {
    reticleGroup.quaternion.copy(camera.quaternion);
    reticleGroup.rotation.z += delta * 1.5;
  }

  // F. Cập nhật nhãn AR chiếu lên màn hình
  updateSpatialLabels();

  // G. Render WebGL
  renderer.render(scene, camera);
}

// ----------------------------------------------------------------------------
// 8. TÌM KIẾM THIÊN VĂN & KHỞI CHẠY HỆ THỐNG
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
      setTimeout(() => {
        flyToPlanet(m.id);
      }, 600);
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
