/**
 * group.js — TRUE 3D WEBGL SPATIAL UNIVERSE (THREE.JS ENGINE)
 * Nhóm 06 — Đại học Giao thông Vận tải TP.HCM (UTH)
 * Kiến trúc: WebGL 3D Scene Graph + Cinematic Camera Rig + AR Projected Spatial HUD
 * Không dùng 6 card 2D phẳng. Toàn bộ 6 thành viên là 6 Thiên thể 3D trong không gian.
 */

import * as THREE from 'three';
import { MEMBERS, TAGS, normalizeText, getMemberHaystack } from './members.data.js';

// -------------------------------------------------------------
// 1. TRẠNG THÁI KHÔNG GIAN (SPATIAL STATE)
// -------------------------------------------------------------
const state = {
  selectedId: null,      // 'hieu' | 'truong' | 'nhu' | 'huynh' | 'chau' | 'thu' | null
  hoveredId: null,
  isFlying: false,
  camTargetPos: new THREE.Vector3(0, 8, 38),
  camTargetLookAt: new THREE.Vector3(0, 0, 0),
  defaultCamPos: new THREE.Vector3(0, 8, 38),
  defaultCamLookAt: new THREE.Vector3(0, 0, 0),
  query: ''
};

// Cấu hình vật lý 6 Thiên thể trong không gian 3D (Tọa độ quỹ đạo Kepler)
const CELESTIAL_CONFIGS = [
  { id: 'hieu',   order: 1, name: 'Nguyễn Xuân Hiệu',       symbol: 'NXH-01', radius: 14, angle: 0,                   size: 1.6, color: 0x3B82F6, emissive: 0x1D4ED8, ringColor: 0x60A5FA, title: 'Lead / System Architecture' },
  { id: 'truong', order: 2, name: 'Lê Nguyễn Nhật Trường',   symbol: 'LNT-02', radius: 19, angle: (Math.PI / 3) * 1,   size: 1.7, color: 0xF59E0B, emissive: 0xD97706, ringColor: 0xFBBF24, title: 'Backend / Systems Engineer' },
  { id: 'nhu',    order: 3, name: 'Nguyễn Thị Thảo Như',     symbol: 'NTN-03', radius: 24, angle: (Math.PI / 3) * 2,   size: 1.5, color: 0x8B5CF6, emissive: 0x6D28D9, ringColor: 0xA78BFA, title: 'UI/UX & Micro-interactions' },
  { id: 'huynh',  order: 4, name: 'Nguyễn Phạm Ý Huỳnh',     symbol: 'NPY-04', radius: 29, angle: (Math.PI / 3) * 3,   size: 1.5, color: 0x10B981, emissive: 0x059669, ringColor: 0x34D399, title: 'Data Analytics & Pipelines' },
  { id: 'chau',   order: 5, name: 'Lê Hữu Châu',            symbol: 'LHC-05', radius: 34, angle: (Math.PI / 3) * 4,   size: 1.6, color: 0xEF4444, emissive: 0xB91C1C, ringColor: 0xF87171, title: 'DevOps & Cloud Security' },
  { id: 'thu',    order: 6, name: 'Nguyễn Anh Thư',          symbol: 'NAT-06', radius: 39, angle: (Math.PI / 3) * 5,   size: 1.5, color: 0x06B6D4, emissive: 0x0891B2, ringColor: 0x22D3EE, title: 'Quality Assurance & Automated QA' }
];

// -------------------------------------------------------------
// 2. DOM CACHED ELEMENTS
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// 3. KHỞI TẠO THREE.JS WEBGL SPATIAL ENGINE
// -------------------------------------------------------------
let scene, camera, renderer, raycaster, mouse;
let singularityCore, particlesField, constellationLines;
const celestialBodies = new Map(); // id -> { mesh, orbitRing, light, config, currentAngle }
let currentLookAt = new THREE.Vector3(0, 0, 0);

function initWebGLScene() {
  const container = document.body;
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080B16, 0.012);

  // Camera 3D Perspective
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.copy(state.defaultCamPos);
  currentLookAt.copy(state.defaultCamLookAt);
  camera.lookAt(currentLookAt);

  // WebGL Renderer
  renderer = new THREE.WebGLRenderer({
    canvas: dom.canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  // Raycaster & Mouse Vector
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2(-999, -999);

  // Ánh sáng Vũ trụ (Cosmic Lights)
  const ambientLight = new THREE.AmbientLight(0x1E293B, 1.2);
  scene.add(ambientLight);

  const coreLight = new THREE.PointLight(0xF0C879, 3.5, 90, 1.2);
  coreLight.position.set(0, 0, 0);
  scene.add(coreLight);

  // 1. Hạt Nhân Năng Lượng Trung Tâm (Cosmic Singularity)
  createSingularityCore();

  // 2. Biển 10.000 Hạt Sao Không Gian 3D (3D Star Field)
  create3DStarField();

  // 3. Sáu Thiên Thể Thành Viên (6 Celestial Nodes)
  createCelestialBodies();

  // 4. Mạng Lưới Tia Chòm Sao (Constellation Network)
  createConstellationNetwork();

  // 5. Gắn nhãn không gian AR (Spatial DOM Labels)
  createSpatialLabels();

  // 6. Navigation Quick Pills
  createNavPills();

  // Window resize listener
  window.addEventListener('resize', onWindowResize);

  // Mouse move parallax & raycasting
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onCanvasClick);

  // Animation Loop (60 FPS RAF)
  animate();
}

// -------------------------------------------------------------
// 3.1. HẠT NHÂN NĂNG LƯỢNG TRUNG TÂM (SINGULARITY CORE)
// -------------------------------------------------------------
function createSingularityCore() {
  const coreGroup = new THREE.Group();

  // Cầu plasma trung tâm
  const coreGeo = new THREE.SphereGeometry(2.8, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xFFFBEB,
    wireframe: false
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(coreMesh);

  // Vành đai nhật hoa (Corona Glow Wireframe)
  const coronaGeo = new THREE.IcosahedronGeometry(3.6, 2);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xF0C879,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  coreGroup.add(coronaMesh);

  // Vòng bụi quang học xoay quanh hạt nhân
  const ringGeo = new THREE.RingGeometry(4.2, 5.0, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x8E9CFF,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.25
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2.3;
  coreGroup.add(ringMesh);

  singularityCore = { group: coreGroup, corona: coronaMesh, ring: ringMesh };
  scene.add(coreGroup);
}

// -------------------------------------------------------------
// 3.2. BIỂN 10.000 HẠT BỤI SAO 3D (3D POINT FIELD)
// -------------------------------------------------------------
function create3DStarField() {
  const starCount = 6000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  const colorWhite = new THREE.Color(0xF3F5FA);
  const colorBlue = new THREE.Color(0x8E9CFF);
  const colorGold = new THREE.Color(0xF0C879);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    const radius = 30 + Math.random() * 120;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    const rand = Math.random();
    let pickedColor = colorWhite;
    if (rand > 0.8) pickedColor = colorBlue;
    else if (rand > 0.6) pickedColor = colorGold;

    colors[i3]     = pickedColor.r;
    colors[i3 + 1] = pickedColor.g;
    colors[i3 + 2] = pickedColor.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.85,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });

  particlesField = new THREE.Points(geo, mat);
  scene.add(particlesField);
}

// -------------------------------------------------------------
// 3.3. SÁU THIÊN THỂ THÀNH VIÊN (6 CELESTIAL ORBS)
// -------------------------------------------------------------
function createCelestialBodies() {
  CELESTIAL_CONFIGS.forEach((config) => {
    const nodeGroup = new THREE.Group();

    // Vành đai quỹ đạo quanh hạt nhân
    const orbitCurve = new THREE.EllipseCurve(0, 0, config.radius, config.radius * 0.92, 0, 2 * Math.PI, false, 0);
    const orbitPoints = orbitCurve.getPoints(120);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x29344D,
      transparent: true,
      opacity: 0.4
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.rotation.x = Math.PI / 2;
    scene.add(orbitLine);

    // Thiên thể chính (Sphere)
    const sphereGeo = new THREE.SphereGeometry(config.size, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: config.color,
      emissive: config.emissive,
      emissiveIntensity: 0.55,
      roughness: 0.35,
      metalness: 0.75
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.userData = { memberId: config.id, config };

    // Vành đai khí quyển xung quanh thiên thể (Atmospheric Halo)
    const haloGeo = new THREE.TorusGeometry(config.size * 1.5, 0.04, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: config.ringColor,
      transparent: true,
      opacity: 0.6
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.2;
    sphereMesh.add(haloMesh);

    // Điểm sáng vệ tinh (Satellite Beacon)
    const beaconLight = new THREE.PointLight(config.ringColor, 1.2, 12);
    sphereMesh.add(beaconLight);

    // Đặt vị trí ban đầu
    const x = Math.cos(config.angle) * config.radius;
    const z = Math.sin(config.angle) * (config.radius * 0.92);
    const y = Math.sin(config.angle * 2) * 2.5; // Nhấp nhô nhẹ trục Y tạo độ sâu
    sphereMesh.position.set(x, y, z);

    scene.add(sphereMesh);

    celestialBodies.set(config.id, {
      mesh: sphereMesh,
      halo: haloMesh,
      orbitLine: orbitLine,
      light: beaconLight,
      config: config,
      currentAngle: config.angle,
      basePos: new THREE.Vector3(x, y, z)
    });
  });
}

// -------------------------------------------------------------
// 3.4. MẠNG LƯỚI TIA CHÒM SAO NỐI 6 THIÊN THỂ (CONSTELLATION LINES)
// -------------------------------------------------------------
function createConstellationNetwork() {
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x8E9CFF,
    transparent: true,
    opacity: 0.25,
    linewidth: 1
  });

  const lineGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(8 * 2 * 3); // 8 cặp nối
  lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  const pairs = [
    ['hieu', 'truong'], ['truong', 'nhu'], ['nhu', 'huynh'],
    ['huynh', 'chau'], ['chau', 'thu'], ['thu', 'hieu'],
    ['hieu', 'huynh'], ['truong', 'chau']
  ];

  constellationLines = { mesh: lines, pairs };
}

function updateConstellationLines() {
  if (!constellationLines) return;
  const positions = constellationLines.mesh.geometry.attributes.position.array;
  let idx = 0;

  constellationLines.pairs.forEach(([idA, idB]) => {
    const bodyA = celestialBodies.get(idA);
    const bodyB = celestialBodies.get(idB);
    if (bodyA && bodyB) {
      positions[idx++] = bodyA.mesh.position.x;
      positions[idx++] = bodyA.mesh.position.y;
      positions[idx++] = bodyA.mesh.position.z;

      positions[idx++] = bodyB.mesh.position.x;
      positions[idx++] = bodyB.mesh.position.y;
      positions[idx++] = bodyB.mesh.position.z;
    }
  });

  constellationLines.mesh.geometry.attributes.position.needsUpdate = true;

  // Nếu có sao được chọn: Tăng độ sáng và chuyển sang màu vàng hoàng kim
  if (state.selectedId || state.hoveredId) {
    const activeId = state.selectedId || state.hoveredId;
    constellationLines.mesh.material.color.setHex(0xF0C879);
    constellationLines.mesh.material.opacity = 0.55;
  } else {
    constellationLines.mesh.material.color.setHex(0x8E9CFF);
    constellationLines.mesh.material.opacity = 0.25;
  }
}

// -------------------------------------------------------------
// 3.5. CHIẾU TỌA ĐỘ 3D THÀNH NHÃN THIÊN VĂN AR (PROJECTED SPATIAL LABELS)
// -------------------------------------------------------------
function createSpatialLabels() {
  if (!dom.labelsContainer) return;
  dom.labelsContainer.innerHTML = '';

  CELESTIAL_CONFIGS.forEach((config) => {
    const label = document.createElement('button');
    label.type = 'button';
    label.className = 'spatial-node-tag font-mono';
    label.id = `tag-${config.id}`;
    label.setAttribute('data-member-id', config.id);
    label.innerHTML = `
      <span class="tag-dot" style="background-color: #${config.color.toString(16)}"></span>
      <span class="tag-title">[${config.symbol}] ${config.name}</span>
    `;

    label.addEventListener('click', (e) => {
      e.stopPropagation();
      flyToCelestialBody(config.id);
    });

    label.addEventListener('mouseenter', () => {
      state.hoveredId = config.id;
    });

    label.addEventListener('mouseleave', () => {
      state.hoveredId = null;
    });

    dom.labelsContainer.appendChild(label);
  });
}

function updateSpatialLabels() {
  if (!dom.labelsContainer || state.selectedId) {
    // Khi đang zoom vào chi tiết thì ẩn các nhãn toàn cảnh
    if (dom.labelsContainer) dom.labelsContainer.style.opacity = state.selectedId ? '0' : '1';
    return;
  }

  dom.labelsContainer.style.opacity = '1';

  CELESTIAL_CONFIGS.forEach((config) => {
    const body = celestialBodies.get(config.id);
    const label = document.getElementById(`tag-${config.id}`);
    if (!body || !label) return;

    // Chiếu vector 3D sang màn hình 2D
    const pos = body.mesh.position.clone();
    pos.project(camera);

    // Kiểm tra xem thiên thể có nằm trong tầm nhìn phía trước camera không (Z < 1)
    if (pos.z < 1) {
      const x = (pos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (-(pos.y * 0.5) + 0.5) * window.innerHeight;

      label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      label.style.display = 'flex';

      const isHovered = state.hoveredId === config.id;
      label.classList.toggle('tag-hovered', isHovered);
    } else {
      label.style.display = 'none';
    }
  });
}

// -------------------------------------------------------------
// 3.6. QUICK NAVIGATION PILLS Ở DƯỚI CÙNG
// -------------------------------------------------------------
function createNavPills() {
  if (!dom.navPills) return;
  dom.navPills.innerHTML = '';

  CELESTIAL_CONFIGS.forEach((config) => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'orbit-pill font-mono';
    pill.setAttribute('data-member-id', config.id);
    pill.innerHTML = `✦ ${config.symbol}`;

    pill.addEventListener('click', () => {
      flyToCelestialBody(config.id);
    });

    dom.navPills.appendChild(pill);
  });
}

function updateNavPills() {
  if (!dom.navPills) return;
  dom.navPills.querySelectorAll('.orbit-pill').forEach((pill) => {
    const id = pill.getAttribute('data-member-id');
    pill.classList.toggle('active-pill', id === state.selectedId);
  });
}

// -------------------------------------------------------------
// 4. CAMERA CHOREOGRAPHY: CHUYỂN ĐỘNG SIÊU TỐC SLERP (HYPER-ZOOM)
// -------------------------------------------------------------
function flyToCelestialBody(memberId) {
  const member = MEMBERS.find((m) => m.id === memberId);
  const body = celestialBodies.get(memberId);

  if (!member || !body) {
    resetCameraToOrbit();
    return;
  }

  state.selectedId = memberId;
  state.isFlying = true;

  // Tính toán vị trí đỗ của camera: Trước mặt thiên thể một khoảng vừa đủ
  const bodyPos = body.mesh.position;
  const offset = new THREE.Vector3(0, 1.2, body.config.size * 3.8);
  state.camTargetPos.copy(bodyPos).add(offset);
  state.camTargetLookAt.copy(bodyPos);

  // Mở Panel thông tin chi tiết AR
  openDetailPanel(member, body.config);

  // Cập nhật URL Hash
  history.replaceState(null, '', `#${member.id}`);

  // Cập nhật HUD Readout
  if (dom.currentFocusReadout) {
    dom.currentFocusReadout.textContent = `TARGET: [${body.config.symbol}] ${member.name.toUpperCase()}`;
  }

  updateNavPills();
}

function resetCameraToOrbit() {
  state.selectedId = null;
  state.isFlying = true;

  state.camTargetPos.copy(state.defaultCamPos);
  state.camTargetLookAt.copy(state.defaultCamLookAt);

  // Đóng panel
  if (dom.detailPanel) {
    dom.detailPanel.hidden = true;
    dom.detailPanel.classList.remove('panel-open');
  }

  // Xóa hash
  history.replaceState(null, '', window.location.pathname + window.location.search);

  // Cập nhật HUD Readout
  if (dom.currentFocusReadout) {
    dom.currentFocusReadout.textContent = `SECTOR: TECHGROUP 06 // ORBIT PANORAMA`;
  }

  updateNavPills();
}

// -------------------------------------------------------------
// 5. HIỂN THỊ CHI TIẾT THIÊN THỂ (AR SPATIAL DETAIL DRAWER)
// -------------------------------------------------------------
function openDetailPanel(member, config) {
  if (!dom.detailPanel) return;

  dom.detailPanel.hidden = false;
  dom.detailPanel.classList.add('panel-open');

  if (dom.panelMemberSeq) {
    dom.panelMemberSeq.textContent = `CELESTIAL BODY // 0${member.order} · [${config.symbol}]`;
  }

  if (dom.panelMemberName) {
    dom.panelMemberName.textContent = member.name;
  }

  if (dom.panelMemberRole) {
    dom.panelMemberRole.textContent = `✦ ${member.role || config.title}`;
    dom.panelMemberRole.hidden = false;
  }

  if (dom.panelMemberHeadline) {
    if (member.headline) {
      dom.panelMemberHeadline.textContent = member.headline;
      dom.panelMemberHeadline.hidden = false;
    } else {
      dom.panelMemberHeadline.textContent = `Thành viên dự án phát triển hệ thống Website Nhóm 06 — Đại học Giao thông Vận tải TP.HCM (UTH).`;
      dom.panelMemberHeadline.hidden = false;
    }
  }

  // Avatar / Monogram
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

  // Kỹ năng chuyên môn
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

  // Link Portfolio cá nhân
  if (dom.panelPortfolioLink) {
    dom.panelPortfolioLink.href = member.portfolio || `./members/${member.slug}/index.html`;
    dom.panelPortfolioLink.innerHTML = `TIẾN VÀO HỆ QUY CHIẾU 3D ↗`;
  }

  // Link GitHub cá nhân
  if (dom.panelGithubLink) {
    if (member.github) {
      dom.panelGithubLink.href = member.github;
      dom.panelGithubLink.hidden = false;
    } else {
      dom.panelGithubLink.hidden = true;
    }
  }

  // Focus trap
  if (dom.panelCloseBtn) {
    setTimeout(() => {
      try { dom.panelCloseBtn.focus(); } catch (e) {}
    }, 150);
  }
}

// -------------------------------------------------------------
// 6. XỬ LÝ SỰ KIỆN CHUỘT & RAYCASTING CHÍNH XÁC
// -------------------------------------------------------------
let targetMouseX = 0;
let targetMouseY = 0;

function onMouseMove(e) {
  // Tọa độ chuẩn hóa cho Raycaster [-1, +1]
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  // Parallax nhẹ khi không trong chế độ zoom chi tiết
  if (!state.selectedId) {
    targetMouseX = mouse.x * 3.5;
    targetMouseY = mouse.y * 2.0;
  }
}

function onCanvasClick(e) {
  // Chỉ kiểm tra khi click ngoài các phần tử HUD
  if (e.target.closest('.spatial-hud-element') || e.target.closest('#spatialDetailPanel')) {
    return;
  }

  raycaster.setFromCamera(mouse, camera);
  const meshes = Array.from(celestialBodies.values()).map(b => b.mesh);
  const intersects = raycaster.intersectObjects(meshes, false);

  if (intersects.length > 0) {
    const hitMesh = intersects[0].object;
    if (hitMesh.userData && hitMesh.userData.memberId) {
      flyToCelestialBody(hitMesh.userData.memberId);
    }
  }
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// -------------------------------------------------------------
// 7. VÒNG LẶP RENDER KHÔNG GIAN 3D (60 FPS RAF)
// -------------------------------------------------------------
function animate() {
  requestAnimationFrame(animate);

  const time = performance.now() * 0.001;

  // 1. Chuyển động hạt nhân trung tâm
  if (singularityCore) {
    singularityCore.corona.rotation.y = time * 0.15;
    singularityCore.corona.rotation.x = time * 0.08;
    singularityCore.ring.rotation.z = time * 0.05;
  }

  // 2. Chuyển động bụi sao 3D
  if (particlesField) {
    particlesField.rotation.y = time * 0.015;
  }

  // 3. Quỹ đạo quay chậm của 6 Thiên thể (chỉ xoay khi không bị khóa camera)
  celestialBodies.forEach((body) => {
    if (!state.selectedId) {
      body.currentAngle += 0.0008; // Vận tốc quỹ đạo Kepler
      const x = Math.cos(body.currentAngle) * body.config.radius;
      const z = Math.sin(body.currentAngle) * (body.config.radius * 0.92);
      const y = Math.sin(body.currentAngle * 2) * 2.5;
      body.mesh.position.set(x, y, z);
    }
    // Tự xoay quanh trục
    body.mesh.rotation.y += 0.012;
    body.halo.rotation.z = time * 0.4;
  });

  // 4. Raycasting kiểm tra hover
  if (!state.selectedId) {
    raycaster.setFromCamera(mouse, camera);
    const meshes = Array.from(celestialBodies.values()).map(b => b.mesh);
    const intersects = raycaster.intersectObjects(meshes, false);

    if (intersects.length > 0) {
      const hitId = intersects[0].object.userData.memberId;
      if (state.hoveredId !== hitId) {
        state.hoveredId = hitId;
        document.body.style.cursor = 'pointer';
      }
    } else {
      if (state.hoveredId !== null) {
        state.hoveredId = null;
        document.body.style.cursor = 'default';
      }
    }
  }

  // 5. Cập nhật đường nối chòm sao
  updateConstellationLines();

  // 6. Camera Lerp (Mượt mà và có quán tính điện ảnh)
  if (!state.selectedId) {
    // Parallax theo chuột ở chế độ toàn cảnh
    const desiredX = state.camTargetPos.x + targetMouseX;
    const desiredY = state.camTargetPos.y + targetMouseY;
    camera.position.x += (desiredX - camera.position.x) * 0.05;
    camera.position.y += (desiredY - camera.position.y) * 0.05;
    camera.position.z += (state.camTargetPos.z - camera.position.z) * 0.05;
  } else {
    // Bay thẳng đến mục tiêu
    camera.position.lerp(state.camTargetPos, 0.06);
  }

  currentLookAt.lerp(state.camTargetLookAt, 0.06);
  camera.lookAt(currentLookAt);

  // 7. Cập nhật các nhãn AR chiếu lên màn hình
  updateSpatialLabels();

  // 8. Render WebGL
  renderer.render(scene, camera);
}

// -------------------------------------------------------------
// 8. TÌM KIẾM TỌA ĐỘ VÀ KHỞI TẠO DOM LISTENERS
// -------------------------------------------------------------
function filterCelestialBodies(rawQuery) {
  state.query = rawQuery.trim();
  const normalized = normalizeText(state.query);
  const words = normalized.split(/\s+/).filter(Boolean);

  let matchBodyId = null;
  let matchCount = 0;

  CELESTIAL_CONFIGS.forEach((config) => {
    const haystack = getMemberHaystack(config.id);
    const isMatch = words.length === 0 || words.every((w) => haystack.includes(w));

    const body = celestialBodies.get(config.id);
    const tag = document.getElementById(`tag-${config.id}`);

    if (body) {
      if (isMatch) {
        body.mesh.visible = true;
        body.orbitLine.visible = true;
        if (tag) tag.style.opacity = '1';
        matchCount++;
        if (!matchBodyId && words.length > 0) matchBodyId = config.id;
      } else {
        body.mesh.visible = false;
        body.orbitLine.visible = false;
        if (tag) tag.style.opacity = '0.2';
      }
    }
  });

  if (dom.searchClearBtn) dom.searchClearBtn.hidden = state.query.length === 0;

  if (dom.searchStatus) {
    if (state.query.length === 0) {
      dom.searchStatus.textContent = `✦ Khám phá 6/6 thực thể thiên văn trong hệ sao`;
    } else {
      dom.searchStatus.textContent = `✦ Tìm thấy ${matchCount}/6 thực thể phù hợp với "${state.query}"`;
    }
  }

  if (dom.searchEmpty) {
    dom.searchEmpty.hidden = matchCount > 0;
  }

  // Nếu tìm thấy 1 kết quả chính xác, tự động điều hướng Camera bay tới
  if (matchCount === 1 && matchBodyId) {
    flyToCelestialBody(matchBodyId);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Khởi động WebGL Scene
  initWebGLScene();

  // 2. Nút Reset Camera về Quỹ Đạo Toàn Cảnh
  if (dom.btnResetOrbit) {
    dom.btnResetOrbit.addEventListener('click', () => {
      resetCameraToOrbit();
    });
  }

  // 3. Nút Đóng Detail Panel
  if (dom.panelCloseBtn) {
    dom.panelCloseBtn.addEventListener('click', () => {
      resetCameraToOrbit();
    });
  }

  // 4. Phím Escape trở về quỹ đạo
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resetCameraToOrbit();
    }
  });

  // 5. Ô tìm kiếm
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', (e) => {
      filterCelestialBodies(e.target.value);
    });
  }

  if (dom.searchClearBtn) {
    dom.searchClearBtn.addEventListener('click', () => {
      if (dom.searchInput) {
        dom.searchInput.value = '';
        dom.searchInput.focus();
      }
      filterCelestialBodies('');
      resetCameraToOrbit();
    });
  }

  // 6. Kiểm tra URL Hash ban đầu (ví dụ: #truong)
  const initialHash = window.location.hash.replace('#', '').trim();
  if (initialHash) {
    const matched = MEMBERS.find((m) => m.id === initialHash || m.slug === initialHash);
    if (matched) {
      setTimeout(() => {
        flyToCelestialBody(matched.id);
      }, 500);
    }
  }

  window.addEventListener('hashchange', () => {
    const currentHash = window.location.hash.replace('#', '').trim();
    if (!currentHash) {
      resetCameraToOrbit();
    } else {
      const matched = MEMBERS.find((m) => m.id === currentHash || m.slug === currentHash);
      if (matched && matched.id !== state.selectedId) {
        flyToCelestialBody(matched.id);
      }
    }
  });
});
