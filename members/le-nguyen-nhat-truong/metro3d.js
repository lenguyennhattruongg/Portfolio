/**
 * =========================================================
 * TUYẾN T24 METRO 3D — LÊ NGUYỄN NHẬT TRƯỜNG PORTFOLIO
 * Chuẩn Three.js r186 (Procedural Geometries + PBR Materials)
 * Không dùng model .glb ngoài, không dùng EffectComposer / Bloom.
 * Khống chế Draw Calls <= 35, Triangles <= 60k, 60 FPS ổn định.
 * =========================================================
 */

import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Bảng điểm dừng & Tọa độ Camera cho 6 Ga (Góc nhìn điện ảnh chân thực)
const STATION_WAYPOINTS = {
  hero: {
    name: 'GA 01: Xuất Phát',
    camPos: new THREE.Vector3(-22.0, 3.2, 5.8),
    lookAt: new THREE.Vector3(-21.0, 1.6, -3.8),
    trainPos: 0
  },
  about: {
    name: 'GA 02: Về Tôi',
    camPos: new THREE.Vector3(-14.0, 2.5, 5.5),
    lookAt: new THREE.Vector3(-14.0, 1.6, -4.0),
    trainPos: 0
  },
  skills: {
    name: 'GA 03: Khoang Tải',
    camPos: new THREE.Vector3(-6.0, 2.6, 6.0),
    lookAt: new THREE.Vector3(-6.0, 1.7, -4.0),
    trainPos: 0
  },
  projects: {
    name: 'GA 04: Vé Đồ Án',
    camPos: new THREE.Vector3(4.0, 2.4, 5.5),
    lookAt: new THREE.Vector3(4.0, 1.6, -4.0),
    trainPos: 0.5
  },
  education: {
    name: 'GA 05: Lộ Trình',
    camPos: new THREE.Vector3(14.0, 3.2, 6.0),
    lookAt: new THREE.Vector3(14.0, 1.8, -4.0),
    trainPos: 1.0
  },
  contact: {
    name: 'GA 06: Điều Hành',
    camPos: new THREE.Vector3(20.0, 3.2, 5.0),
    lookAt: new THREE.Vector3(16.0, 1.8, -4.0),
    trainPos: 0
  }
};

let renderer = null;
let scene = null;
let camera = null;
let controls = null;
let trainGroup = null;
let animationFrameId = null;
let isDirty = true;
let isRunning = false;
let isUserInteracting = false;

// Bộ Giám Sát Hiệu Năng & DPR Thích Ứng (Theo khuyến nghị Hội đồng ChatGPT)
let baseDpr = 1.0;
let currentDpr = 1.0;
let lastFpsTime = performance.now();
let frameCount = 0;
let measuredFps = 60;
let lowFpsSeconds = 0;
let highFpsSeconds = 0;
let lastDprChangeTime = 0;
const DPR_COOLDOWN_MS = 12000; // 12s cooldown chống quality thrashing

// Trạng thái Camera Interpolation
const currentCamPos = new THREE.Vector3();
const currentLookAt = new THREE.Vector3();
const startCamPos = new THREE.Vector3();
const startLookAt = new THREE.Vector3();
const targetCamPos = new THREE.Vector3();
const targetLookAt = new THREE.Vector3();

let transitionProgress = 1.0;
// Hỗ trợ prefers-reduced-motion chuẩn WCAG AA (chuyển động tức thời 0.05s nếu người dùng bật giảm chuyển động)
let prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    prefersReducedMotion = e.matches;
    transitionDuration = prefersReducedMotion ? 0.05 : 1.1;
  });
}
let transitionDuration = prefersReducedMotion ? 0.0 : 1.1; // 0.0s tức thời hoàn toàn khi bật reduced-motion
let transitionStartTime = 0;
let currentStationId = 'hero';

// Easing cơ học dứt khoát cubic-bezier(0.2, 0, 0, 1)
function easeMechanical(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * 1. Khởi tạo môi trường WebGL Three.js r186
 */
export function initMetro3D() {
  const container = document.getElementById('metroCanvasContainer');
  const canvas = document.getElementById('metro3dCanvas');
  if (!container || !canvas) return false;

  // Kiểm tra hỗ trợ WebGL
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (err) {
    console.warn('[Metro3D] WebGL không được hỗ trợ:', err);
    const fallback = document.getElementById('stageFallbackNotice');
    if (fallback) fallback.style.display = 'flex';
    return false;
  }

  // Cấu hình Renderer chuẩn ACESFilmic & sRGB (DPR thích ứng)
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  baseDpr = isCoarse ? 1.5 : Math.min(window.devicePixelRatio || 1, 2.0);
  currentDpr = baseDpr;
  renderer.setPixelRatio(currentDpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Khởi tạo Scene & Camera
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x14161D); // Nền hầm ga ngầm Metro trầm sang trọng

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 150);
  
  // Thiết lập camera ban đầu ở Ga Xuất Phát (Góc 3/4 điện ảnh)
  const initialStation = STATION_WAYPOINTS.hero;
  currentCamPos.set(-21.5, 2.5, 4.2);
  currentLookAt.set(-15.5, 1.6, -4.0);
  camera.position.copy(currentCamPos);
  camera.lookAt(currentLookAt);

  // Ánh xạ phản chiếu kim loại & kính qua PMREMGenerator + RoomEnvironment (0 asset ngoài)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const roomEnv = new RoomEnvironment();
  scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
  roomEnv.dispose();
  pmremGenerator.dispose();

  // Khởi tạo OrbitControls hỗ trợ xoay 360 độ và tương tác chuột/touch
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.maxPolarAngle = Math.PI / 2 - 0.03; // Không đi xuống dưới ray
  controls.minDistance = 3.5;
  controls.maxDistance = 32.0;
  controls.target.copy(currentLookAt);
  controls.addEventListener('start', () => {
    isUserInteracting = true;
    const hint = document.querySelector('.stage-drag-hint');
    if (hint && !hint.classList.contains('is-hidden')) {
      hint.classList.add('is-hidden');
    }
  });
  controls.addEventListener('end', () => {
    isUserInteracting = false;
  });

  // Khởi tạo Ánh sáng
  setupLighting();

  // Dựng Nhà Ga, Trần Hầm & Đường Ray (C3.1)
  buildStationEnvironment();

  // Dựng Đoàn Tàu 4 Toa (C3.2)
  buildMetroTrain4Cars();

  // Đăng ký sự kiện
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('visibilitychange', onVisibilityChange);
  canvas.addEventListener('webglcontextlost', onContextLost);
  canvas.addEventListener('webglcontextrestored', onContextRestored);

  // Gắn lớp .has-3d lên <html> sau khi WebGL khởi tạo hoàn tất
  document.documentElement.classList.add('has-3d');

  // Khởi chạy vòng lặp render
  isRunning = true;
  renderer.setAnimationLoop(renderLoop);

  console.log(
    `%c[Metro3D] Đã khởi tạo thành công Tuyến T24 Metro 3D (r186, DPR: ${maxDPR.toFixed(1)}, Calls: ${renderer.info.render.calls})`,
    'background: #121316; color: #FF4D00; font-weight: bold; padding: 4px 8px;'
  );

  return true;
}

/**
 * 2. Thiết lập hệ thống ánh sáng chân thực
 */
function setupLighting() {
  // Ánh sáng môi trường mềm
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.9);
  scene.add(ambientLight);

  // Đèn định hướng nhẹ từ trần ga
  const mainDirLight = new THREE.DirectionalLight(0xFFFAF0, 1.6);
  mainDirLight.position.set(5, 12, 10);
  scene.add(mainDirLight);

  // Đèn hắt ngược từ sàn ray tạo viền gầm
  const fillLight = new THREE.DirectionalLight(0xD8DDE8, 0.8);
  fillLight.position.set(-8, -2, -6);
  scene.add(fillLight);

  // Các điểm đèn ấm dọc sân ga
  const platformLight1 = new THREE.PointLight(0xFFEECC, 2.5, 18, 1.2);
  platformLight1.position.set(-10, 4.0, 3.0);
  scene.add(platformLight1);

  const platformLight2 = new THREE.PointLight(0xFFEECC, 2.5, 18, 1.2);
  platformLight2.position.set(6, 4.0, 3.0);
  scene.add(platformLight2);
}

/**
 * 3. Dựng Sân Ga, Tường Hầm & Đường Ray Đôi (C3.1)
 */
function buildStationEnvironment() {
  const stationGroup = new THREE.Group();

  // Vật liệu
  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0x989BA0,
    roughness: 0.85,
    metalness: 0.1
  });

  const platformMat = new THREE.MeshStandardMaterial({
    color: 0xD2D0C8,
    roughness: 0.7,
    metalness: 0.05
  });

  const yellowSafetyMat = new THREE.MeshStandardMaterial({
    color: 0xFFCC00,
    roughness: 0.4,
    metalness: 0.1,
    emissive: 0x332200
  });

  const railSteelMat = new THREE.MeshStandardMaterial({
    color: 0xC0C4CC,
    roughness: 0.28,
    metalness: 0.85
  });

  const tieWoodMat = new THREE.MeshStandardMaterial({
    color: 0x3C3632,
    roughness: 0.9,
    metalness: 0.05
  });

  const tunnelMat = new THREE.MeshStandardMaterial({
    color: 0x32353B,
    roughness: 0.9,
    metalness: 0.15,
    side: THREE.BackSide
  });

  const tubeLightMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFFFFF,
    emissiveIntensity: 2.0
  });

  // 3.1 Vòm hầm ngầm bê tông bán nguyệt (Tunnel Vault)
  const tunnelGeo = new THREE.CylinderGeometry(8.5, 8.5, 120, 24, 1, true, 0, Math.PI);
  tunnelGeo.rotateZ(Math.PI / 2);
  const tunnelMesh = new THREE.Mesh(tunnelGeo, tunnelMat);
  tunnelMesh.position.set(0, 3.5, -4.5);
  stationGroup.add(tunnelMesh);

  // Dải đèn tube LED âm trần chạy dọc vòm hầm (Perspective Vanishing Guide)
  const tubeGeo = new THREE.BoxGeometry(110, 0.08, 0.15);
  const tubeMesh = new THREE.Mesh(tubeGeo, tubeLightMat);
  tubeMesh.position.set(0, 7.8, -4.5);
  stationGroup.add(tubeMesh);

  // 3.2 Sân ga (Passenger Platform) cao 0.4 đơn vị
  const platformGeo = new THREE.BoxGeometry(100, 0.8, 12);
  const platformMesh = new THREE.Mesh(platformGeo, platformMat);
  platformMesh.position.set(0, 0.0, 4.5);
  stationGroup.add(platformMesh);

  // Vạch an toàn màu vàng nổi bật ở mép sân ga (Yellow Tactile Safety Strip)
  const safetyGeo = new THREE.BoxGeometry(100, 0.02, 0.25);
  const safetyMesh = new THREE.Mesh(safetyGeo, yellowSafetyMat);
  safetyMesh.position.set(0, 0.41, -1.35);
  stationGroup.add(safetyMesh);

  // Cột chống chịu lực sân ga (Concrete Columns)
  const colGeo = new THREE.BoxGeometry(0.5, 4.5, 0.5);
  const colCount = 7;
  const colMesh = new THREE.InstancedMesh(colGeo, concreteMat, colCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < colCount; i++) {
    dummy.position.set(-30 + i * 10, 2.25, 2.5);
    dummy.updateMatrix();
    colMesh.setMatrixAt(i, dummy.matrix);
  }
  stationGroup.add(colMesh);

  // 3.3 Đường ray sắt đôi (Steel Rails)
  const railGeo = new THREE.BoxGeometry(100, 0.18, 0.1);
  const leftRail = new THREE.Mesh(railGeo, railSteelMat);
  leftRail.position.set(0, 0.14, -3.2);
  const rightRail = new THREE.Mesh(railGeo, railSteelMat);
  rightRail.position.set(0, 0.14, -4.8);
  stationGroup.add(leftRail);
  stationGroup.add(rightRail);

  // Tà vẹt dập nổi dọc đường ray (Railway Ties - InstancedMesh)
  const tieCount = 110;
  const tieGeo = new THREE.BoxGeometry(0.35, 0.14, 2.4);
  const tieInstanced = new THREE.InstancedMesh(tieGeo, tieWoodMat, tieCount);
  for (let i = 0; i < tieCount; i++) {
    dummy.position.set(-45 + i * 0.85, 0.04, -4.0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tieInstanced.setMatrixAt(i, dummy.matrix);
  }
  stationGroup.add(tieInstanced);

  // Lớp đệm sỏi nền ray (Ballast Bed)
  const bedGeo = new THREE.BoxGeometry(100, 0.1, 3.2);
  const bedMesh = new THREE.Mesh(bedGeo, new THREE.MeshStandardMaterial({ color: 0x2A2B2E, roughness: 0.95 }));
  bedMesh.position.set(0, -0.05, -4.0);
  stationGroup.add(bedMesh);

  scene.add(stationGroup);
}

/**
 * 4. Dựng Đoàn Tàu Metro 4 Toa Bằng Mã Thủ Công (C3.2)
 * Gộp mesh theo vật liệu bằng BufferGeometryUtils.mergeGeometries
 */
function buildMetroTrain4Cars() {
  trainGroup = new THREE.Group();

  // Bảng vật liệu PBR cho toàn bộ đoàn tàu
  const carBodyMat = new THREE.MeshStandardMaterial({
    color: 0xC8CCD2,       // Thép không gỉ sáng bạc
    metalness: 0.82,
    roughness: 0.28
  });

  const carOrangeStripeMat = new THREE.MeshStandardMaterial({
    color: 0xFF4D00,       // Cam tín hiệu Metro T24 UTH
    metalness: 0.5,
    roughness: 0.35
  });

  const carDarkGlassMat = new THREE.MeshStandardMaterial({
    color: 0x111318,       // Kính tối màu bóng bẩy
    metalness: 0.92,
    roughness: 0.08
  });

  const carRubberMat = new THREE.MeshStandardMaterial({
    color: 0x1A1B1D,       // Cao su khớp nối & váy gầm
    metalness: 0.1,
    roughness: 0.88
  });

  const bogieSteelMat = new THREE.MeshStandardMaterial({
    color: 0x4A4E54,       // Kim loại cơ khí gầm & bánh
    metalness: 0.85,
    roughness: 0.35
  });

  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    emissive: 0xFFF5DD,
    emissiveIntensity: 3.0
  });

  const redTaillightMat = new THREE.MeshStandardMaterial({
    color: 0xFF0033,
    emissive: 0xFF0022,
    emissiveIntensity: 2.5
  });

  const ledSignMat = new THREE.MeshStandardMaterial({
    color: 0x00FF88,
    emissive: 0x00EE77,
    emissiveIntensity: 1.8
  });

  // Mảng lưu các hình học để gộp theo vật liệu (Merge by material)
  const bodyGeos = [];
  const orangeGeos = [];
  const glassGeos = [];
  const rubberGeos = [];
  const bogieGeos = [];

  const carLength = 8.0;
  const carWidth = 2.4;
  const carHeight = 2.6;
  const carGap = 0.7; // Khoảng hở giữa các toa dành cho khớp nối cao su

  // Tên 4 khoang kỹ năng
  const bayLabels = [
    'BAY-01 · JAVA CORE & OOP',
    'BAY-02 · SOCKET TCP & C++',
    'BAY-03 · SQL & WEB CORE',
    'BAY-04 · TOOLS & GIT DEV'
  ];

  // ==========================================================
  // XÂY DỰNG 4 TOA TÀU (Car 0: Đầu tàu -> Car 3: Đuôi tàu)
  // ==========================================================
  for (let c = 0; c < 4; c++) {
    const carCenter = -13.5 + c * (carLength + carGap);

    // 4.1 Thân toa xe chính (Car Cabin Body)
    const cabinGeo = new THREE.BoxGeometry(carLength, carHeight, carWidth);
    cabinGeo.translate(carCenter, 1.7, -4.0);
    bodyGeos.push(cabinGeo);

    // Dải sơn cam tín hiệu T24 chạy ngang thân toa
    const stripeGeo = new THREE.BoxGeometry(carLength + 0.02, 0.22, carWidth + 0.02);
    stripeGeo.translate(carCenter, 1.25, -4.0);
    orangeGeos.push(stripeGeo);

    // Mái vát cong (Chamfered Roof)
    const roofGeo = new THREE.BoxGeometry(carLength, 0.25, carWidth - 0.25);
    roofGeo.translate(carCenter, 3.05, -4.0);
    bodyGeos.push(roofGeo);

    // Váy gầm che thiết bị (Undercarriage Skirt)
    const skirtGeo = new THREE.BoxGeometry(carLength * 0.92, 0.45, carWidth * 0.88);
    skirtGeo.translate(carCenter, 0.35, -4.0);
    rubberGeos.push(skirtGeo);

    // 4.2 Cửa ra vào & Cửa sổ hành khách (Phía nhìn ra sân ga: Z = -2.78)
    // Ít nhất 2 cửa mỗi bên có khe cửa và kính cửa
    for (const doorXOffset of [-2.4, 2.4]) {
      // Khung cửa cao su
      const doorFrameGeo = new THREE.BoxGeometry(1.2, 1.9, 0.04);
      doorFrameGeo.translate(carCenter + doorXOffset, 1.6, -2.79);
      rubberGeos.push(doorFrameGeo);

      // Kính 2 cánh cửa
      const doorGlassGeo = new THREE.BoxGeometry(0.9, 1.2, 0.06);
      doorGlassGeo.translate(carCenter + doorXOffset, 1.8, -2.78);
      glassGeos.push(doorGlassGeo);
    }

    // >= 3 cửa sổ giữa các cửa (3 Panoramic Windows)
    for (const winXOffset of [-1.1, 0.0, 1.1]) {
      const winGeo = new THREE.BoxGeometry(0.85, 0.95, 0.06);
      winGeo.translate(carCenter + winXOffset, 1.9, -2.78);
      glassGeos.push(winGeo);
    }

    // Bảng điểm đến LED trên mỗi toa (Toa nào ghi đúng tên khoang đó)
    const signBoxGeo = new THREE.BoxGeometry(2.0, 0.28, 0.06);
    signBoxGeo.translate(carCenter, 2.65, -2.78);
    orangeGeos.push(signBoxGeo);

    // 4.3 Hệ thống 2 Bogie trục cơ khí dưới mỗi toa (2 Bogies per car)
    for (const bogieOffset of [-2.5, 2.5]) {
      const bx = carCenter + bogieOffset;

      // Khung thép chữ H của Bogie
      const bogieFrameGeo = new THREE.BoxGeometry(1.6, 0.2, 1.8);
      bogieFrameGeo.translate(bx, 0.25, -4.0);
      bogieGeos.push(bogieFrameGeo);

      // 4 Bánh xe hình trụ kim loại (Cylinder wheels, r=0.36)
      for (const wheelX of [-0.65, 0.65]) {
        for (const wheelZ of [-0.85, 0.85]) {
          const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.14, 16);
          wheelGeo.rotateX(Math.PI / 2);
          wheelGeo.translate(bx + wheelX, 0.16, -4.0 + wheelZ);
          bogieGeos.push(wheelGeo);
        }
      }
    }

    // 4.4 Khớp nối cao su mềm giữa các toa (Rubber Bellows)
    if (c < 3) {
      const bellowsX = carCenter + (carLength / 2) + (carGap / 2);
      // Gồm 4 lớp gấp nếp mô phỏng đàn hồi
      for (let f = 0; f < 3; f++) {
        const foldGeo = new THREE.BoxGeometry(0.18, carHeight * 0.92, carWidth * 0.9);
        foldGeo.translate(bellowsX - 0.18 + f * 0.18, 1.7, -4.0);
        rubberGeos.push(foldGeo);
      }
    }
  }

  // 4.5 Mũi tàu đầu tiên vát khí động học (Car 0: Head Aerodynamic Nose)
  const headCenterX = -13.5 - (carLength / 2);

  // Dựng mũi vát thuôn bằng Extrude Shape
  const noseShape = new THREE.Shape();
  noseShape.moveTo(0, 0.4);
  noseShape.lineTo(-1.6, 0.6);
  noseShape.lineTo(-1.3, 2.4);
  noseShape.lineTo(0, 2.7);
  noseShape.closePath();

  const noseExtrudeSettings = {
    steps: 1,
    depth: carWidth,
    bevelEnabled: true,
    bevelThickness: 0.18,
    bevelSize: 0.18,
    bevelSegments: 3
  };
  const noseGeo = new THREE.ExtrudeGeometry(noseShape, noseExtrudeSettings);
  noseGeo.translate(headCenterX, 0.2, -4.0 - (carWidth / 2));
  bodyGeos.push(noseGeo);

  // Kính chắn gió buồng lái tối màu bóng bẩy (Cabin Windshield)
  const windshieldGeo = new THREE.BoxGeometry(0.9, 0.95, carWidth * 0.82);
  windshieldGeo.rotateZ(0.28);
  windshieldGeo.translate(headCenterX - 0.7, 2.0, -4.0);
  glassGeos.push(windshieldGeo);

  // Cặp đèn pha LED phát sáng rực rỡ phía trước đầu tàu
  const headlightLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 16), headlightMat);
  headlightLeft.rotateZ(Math.PI / 2);
  headlightLeft.position.set(headCenterX - 1.45, 0.85, -3.4);
  trainGroup.add(headlightLeft);

  const headlightRight = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.1, 16), headlightMat);
  headlightRight.rotateZ(Math.PI / 2);
  headlightRight.position.set(headCenterX - 1.45, 0.85, -4.6);
  trainGroup.add(headlightRight);

  // Luồng sáng chiếu rọi đường ray phía trước
  const headSpotLeft = new THREE.SpotLight(0xFFF8E7, 8.0, 32, Math.PI / 6, 0.45, 1.2);
  headSpotLeft.position.set(headCenterX - 1.5, 0.85, -3.4);
  headSpotLeft.target.position.set(headCenterX - 18.0, 0.1, -3.4);
  trainGroup.add(headSpotLeft);
  trainGroup.add(headSpotLeft.target);

  const headSpotRight = new THREE.SpotLight(0xFFF8E7, 8.0, 32, Math.PI / 6, 0.45, 1.2);
  headSpotRight.position.set(headCenterX - 1.5, 0.85, -4.6);
  headSpotRight.target.position.set(headCenterX - 18.0, 0.1, -4.6);
  trainGroup.add(headSpotRight);
  trainGroup.add(headSpotRight.target);

  // Biển điểm đến LED phía trước cabin lái: "UTH METRO · T24"
  const frontDestBox = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.32, 1.4), ledSignMat);
  frontDestBox.position.set(headCenterX - 1.25, 2.62, -4.0);
  trainGroup.add(frontDestBox);

  // 4.6 Đèn hậu đỏ ở đuôi toa cuối (Car 3: Rear Red Taillights)
  const tailCenterX = -13.5 + 3 * (carLength + carGap) + (carLength / 2);
  const tailLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.18), redTaillightMat);
  tailLeft.position.set(tailCenterX + 0.05, 1.2, -3.3);
  const tailRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.18), redTaillightMat);
  tailRight.position.set(tailCenterX + 0.05, 1.2, -4.7);
  trainGroup.add(tailLeft);
  trainGroup.add(tailRight);

  // ==========================================================
  // THỰC THI GỘP HÌNH HỌC (MERGE GEOMETRIES BY MATERIAL)
  // Khống chế cực đại số lượng Draw Calls
  // ==========================================================
  if (bodyGeos.length > 0) {
    const mergedBody = mergeGeometries(bodyGeos);
    trainGroup.add(new THREE.Mesh(mergedBody, carBodyMat));
  }
  if (orangeGeos.length > 0) {
    const mergedOrange = mergeGeometries(orangeGeos);
    trainGroup.add(new THREE.Mesh(mergedOrange, carOrangeStripeMat));
  }
  if (glassGeos.length > 0) {
    const mergedGlass = mergeGeometries(glassGeos);
    trainGroup.add(new THREE.Mesh(mergedGlass, carDarkGlassMat));
  }
  if (rubberGeos.length > 0) {
    const mergedRubber = mergeGeometries(rubberGeos);
    trainGroup.add(new THREE.Mesh(mergedRubber, carRubberMat));
  }
  if (bogieGeos.length > 0) {
    const mergedBogies = mergeGeometries(bogieGeos);
    trainGroup.add(new THREE.Mesh(mergedBogies, bogieSteelMat));
  }

  scene.add(trainGroup);
}

/**
 * 5. Điều hướng Camera theo Ga (Ngắt được, mượt mà <= 1.2s)
 */
export function navigateToStation(stationId) {
  const target = STATION_WAYPOINTS[stationId];
  if (!target || !camera) return;

  currentStationId = stationId;

  // Lấy vị trí bắt đầu từ vị trí hiện tại của camera
  startCamPos.copy(camera.position);
  startLookAt.copy(currentLookAt);

  targetCamPos.copy(target.camPos);
  targetLookAt.copy(target.lookAt);

  // Kiểm tra prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    camera.position.copy(targetCamPos);
    currentLookAt.copy(targetLookAt);
    if (controls) controls.target.copy(currentLookAt);
    camera.lookAt(currentLookAt);
    transitionProgress = 1.0;
    isDirty = true;
    return;
  }

  // Khởi tạo chuyển động
  transitionProgress = 0.0;
  transitionStartTime = performance.now();
  isDirty = true;

  // Cập nhật thông báo Trợ năng aria-live
  const announcer = document.getElementById('a11yStationAnnouncer');
  if (announcer) {
    announcer.textContent = `Đã cập bến ${target.name}`;
  }
}

/**
 * Điều chỉnh góc nhìn 3D trực quan theo nhu cầu người dùng
 */
export function setCameraAngle(angleKey) {
  const angles = {
    cab3d: {
      camPos: new THREE.Vector3(-22.0, 3.2, 5.8),
      lookAt: new THREE.Vector3(-21.0, 1.6, -3.8)
    },
    sideView: {
      camPos: new THREE.Vector3(-1.0, 3.5, 15.0),
      lookAt: new THREE.Vector3(-6.0, 1.6, -4.0)
    },
    platformView: {
      camPos: new THREE.Vector3(-18.5, 1.2, 2.5),
      lookAt: new THREE.Vector3(-17.0, 1.6, -3.5)
    }
  };

  const target = angles[angleKey];
  if (!target || !camera) return;

  startCamPos.copy(camera.position);
  startLookAt.copy(currentLookAt);
  targetCamPos.copy(target.camPos);
  targetLookAt.copy(target.lookAt);

  transitionProgress = 0.0;
  transitionStartTime = performance.now();
  isDirty = true;
}

/**
 * 6. Vòng lặp Render Loop (Dirty Flag, Throttling & Adaptive DPR)
 */
function updatePerformanceMonitor() {
  const now = performance.now();
  frameCount++;
  if (now - lastFpsTime >= 1000) {
    measuredFps = frameCount;

    // Chỉ thay đổi DPR nếu đã hết cooldown 12s chống dao động chất lượng (thrashing)
    if (now - lastDprChangeTime >= DPR_COOLDOWN_MS) {
      // Nếu FPS < 30 liên tục 3 giây: tự động hạ DPR xuống 1.0 tiết kiệm GPU
      if (measuredFps < 30) {
        lowFpsSeconds++;
        highFpsSeconds = 0;
        if (lowFpsSeconds >= 3 && currentDpr > 1.0) {
          currentDpr = 1.0;
          renderer.setPixelRatio(currentDpr);
          const stageEl = document.getElementById('stageDragTarget') || document.getElementById('metroCanvasContainer');
          if (stageEl) { renderer.setSize(stageEl.clientWidth, stageEl.clientHeight, false); }
          lastDprChangeTime = now;
          console.info(`[Metro3D Performance] Tự động hạ DPR xuống 1.0 do FPS thấp (${measuredFps} FPS)`);
          lowFpsSeconds = 0;
          isDirty = true;
        }
      } else if (measuredFps > 54) {
        highFpsSeconds++;
        lowFpsSeconds = 0;
        if (highFpsSeconds >= 8 && currentDpr < baseDpr) {
          currentDpr = baseDpr;
          renderer.setPixelRatio(currentDpr);
          const stageEl = document.getElementById('stageDragTarget') || document.getElementById('metroCanvasContainer');
          if (stageEl) { renderer.setSize(stageEl.clientWidth, stageEl.clientHeight, false); }
          lastDprChangeTime = now;
          console.info(`[Metro3D Performance] FPS ổn định (${measuredFps} FPS). Khôi phục DPR ${baseDpr.toFixed(1)}`);
          highFpsSeconds = 0;
          isDirty = true;
        }
      } else {
        lowFpsSeconds = 0;
        highFpsSeconds = 0;
      }
    }

    frameCount = 0;
    lastFpsTime = now;
  }
}

function renderLoop(time) {
  if (!isRunning || !renderer || !scene || !camera) return;

  // Giám sát FPS thích ứng
  updatePerformanceMonitor();

  // Cập nhật OrbitControls khi người dùng tương tác kéo chuột xoay 360 độ
  if (controls && controls.enabled) {
    controls.update();
  }

  // Xử lý chuyển cảnh Camera (Khóa controls khi đang tween để chống giật)
  if (transitionProgress < 1.0) {
    if (controls && controls.enabled) {
      controls.enabled = false;
    }

    const elapsed = (time - transitionStartTime) / 1000;
    const t = Math.min(elapsed / transitionDuration, 1.0);
    const easeT = easeMechanical(t);

    camera.position.lerpVectors(startCamPos, targetCamPos, easeT);
    currentLookAt.lerpVectors(startLookAt, targetLookAt, easeT);
    camera.lookAt(currentLookAt);

    transitionProgress = t;
    if (transitionProgress >= 1.0) {
      if (controls) {
        controls.target.copy(currentLookAt);
        controls.enabled = true;
        controls.update();
      }
    }
    isDirty = true;
  }

  // Nhẹ nhàng mô phỏng nhịp thở của tàu (tắt khi bật reduced motion)
  if (trainGroup && !prefersReducedMotion) {
    const idleOscillation = Math.sin(time * 0.0018) * 0.008;
    trainGroup.position.y = idleOscillation;
  }

  // Luôn render khi đang tương tác hoặc chuyển cảnh
  if (isDirty || transitionProgress < 1.0 || isUserInteracting) {
    renderer.render(scene, camera);
    if (transitionProgress >= 1.0 && !isUserInteracting) {
      isDirty = false;
    }
  }
}

/**
 * 7. Xử lý Thay Đổi Kích Thước Màn Hình (Responsive)
 */
function onWindowResize() {
  if (!renderer || !camera) return;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  baseDpr = isCoarse ? 1.5 : Math.min(window.devicePixelRatio || 1, 2.0);
  currentDpr = baseDpr;
  renderer.setPixelRatio(currentDpr);
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  isDirty = true;
}

// Cung cấp hàm Telemetry cho Chrome DevTools kiểm chứng trực tiếp
if (typeof window !== 'undefined') {
  window.getMetro3DTelemetry = () => {
    if (!renderer) return null;
    return {
      fps: measuredFps,
      dpr: currentDpr,
      qualityMode: currentDpr < baseDpr ? 'adaptive-power-saving' : 'full-fidelity',
      render: {
        frameDrawCalls: renderer.info.render.calls,
        frameTriangles: renderer.info.render.triangles,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timestamp: new Date().toISOString()
    };
  };
}

/**
 * 8. Quản lý Hiệu Năng: Tạm dừng khi Tab bị ẩn
 */
function onVisibilityChange() {
  if (document.hidden) {
    isRunning = false;
  } else {
    isRunning = true;
    // Đặt lại các biến tích lũy để tránh kích hoạt hạ DPR sai lệch khi tab vừa thức dậy
    lastFpsTime = performance.now();
    frameCount = 0;
    lowFpsSeconds = 0;
    highFpsSeconds = 0;
    isDirty = true;
  }
}

/**
 * 9. Phục hồi Ngữ cảnh WebGL Context Loss
 */
function onContextLost(event) {
  event.preventDefault();
  isRunning = false;
  console.warn('[Metro3D] WebGL Context Lost! Hiển thị giao diện dự phòng.');
  const fallback = document.getElementById('stageFallbackNotice');
  if (fallback) fallback.style.display = 'flex';
}

function onContextRestored() {
  console.log('[Metro3D] WebGL Context Restored! Khôi phục đồ họa.');
  isRunning = true;
  isDirty = true;
  const fallback = document.getElementById('stageFallbackNotice');
  if (fallback) fallback.style.display = 'none';
}

/**
 * 10. Chụp Ảnh Đoàn Tàu ở 3 Góc Nhìn (Kiểm chứng hình khối C3.2)
 * Góc 1: Đầu tàu 3/4
 * Góc 2: Ngang thân
 * Góc 3: Từ trên xuống
 */
export function captureTrainAngles() {
  if (!renderer || !camera || !scene) return null;

  const originalPos = camera.position.clone();
  const originalLook = currentLookAt.clone();
  const originalBg = scene.background;

  // Chuyển sang nền xám đơn sắc để nhận diện hình khối chuẩn xác
  scene.background = new THREE.Color(0x888888);

  const angles = {
    threeQuarter: {
      pos: new THREE.Vector3(-22.0, 3.8, 4.5),
      look: new THREE.Vector3(-14.0, 1.2, -4.0)
    },
    sideProfile: {
      pos: new THREE.Vector3(-10.0, 1.8, 5.8),
      look: new THREE.Vector3(-10.0, 1.5, -4.0)
    },
    topDown: {
      pos: new THREE.Vector3(-10.0, 14.0, -4.0),
      look: new THREE.Vector3(-10.0, 0.0, -4.0)
    }
  };

  const screenshots = {};
  for (const [key, cfg] of Object.entries(angles)) {
    camera.position.copy(cfg.pos);
    camera.lookAt(cfg.look);
    renderer.render(scene, camera);
    screenshots[key] = renderer.domElement.toDataURL('image/png');
  }

  // Khôi phục trạng thái ban đầu
  camera.position.copy(originalPos);
  camera.lookAt(originalLook);
  scene.background = originalBg;
  isDirty = true;

  return screenshots;
}

/**
 * 11. Giải phóng Toàn Bộ Tài Nguyên WebGL & Bộ Nhớ GPU (Dispose Lifecycle)
 * Tiêu chuẩn Three.js r186 chống rò rỉ bộ nhớ khi unmount hoặc chuyển trang
 */
export function disposeMetro3D() {
  isRunning = false;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  // Hủy lắng nghe sự kiện
  window.removeEventListener('resize', onWindowResize);
  document.removeEventListener('visibilitychange', onVisibilityChange);
  const canvas = document.getElementById('metro3dCanvas');
  if (canvas) {
    canvas.removeEventListener('webglcontextlost', onContextLost);
    canvas.removeEventListener('webglcontextrestored', onContextRestored);
  }

  // Dọn dẹp OrbitControls
  if (controls) {
    controls.dispose();
    controls = null;
  }

  // Giải phóng toàn bộ Geometries, Materials, Textures trong Scene Graph
  if (scene) {
    scene.traverse((obj) => {
      if (obj.isMesh || obj.isInstancedMesh) {
        if (obj.geometry) {
          obj.geometry.dispose();
        }
        if (obj.material) {
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      }
    });

    if (scene.environment) {
      scene.environment.dispose();
    }
  }

  // Dọn dẹp WebGLRenderer
  if (renderer) {
    renderer.setAnimationLoop(null);
    renderer.dispose();
    renderer = null;
  }

  scene = null;
  camera = null;
  trainGroup = null;

  document.documentElement.classList.remove('has-3d');
  console.log('[Metro3D] Đã giải phóng toàn bộ tài nguyên WebGL và bộ nhớ GPU an toàn.');
}
