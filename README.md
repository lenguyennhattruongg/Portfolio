# 🪐 Portfolio Nhóm 06 — Hệ Mặt Trời 3D (Cosmic 3D Portfolio)

<div align="center">

![Vite](https://img.shields.io/badge/Vite-5.4.21-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r186-000000?style=for-the-badge&logo=three.dot.js&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Modern%20HUD-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Hosted-222222?style=for-the-badge&logo=github&logoColor=white)
![UTH](https://img.shields.io/badge/UTH-Khoa%20CNTT-008080?style=for-the-badge)

<p align="center">
  <b>Đồ án môn học Lập trình Web — Trường Đại học Giao thông Vận tải TP.HCM (UTH)</b><br>
  <i>Một không gian mô phỏng vũ trụ 3D viễn tưởng thời gian thực, kết nối 6 thiên thể đại diện cho 6 thành viên sinh viên UTH thông qua kiến trúc Multi-Page Application tân tiến.</i>
</p>

[🌐 Trực Tiếp Trải Nghiệm (Live Demo)](#-trực-tiếp-trải-nghiệm-live-demo) •
[✨ Tính Năng Nổi Bật](#-tính-năng-nổi-bật-key-features) •
[📁 Cấu Trúc Dự Án](#-cấu-trúc-thư-mục-dự-án) •
[👥 Danh Sách Thành Viên](#-bảng-trạng-thái-thành-viên-team-roster--status-table) •
[🚀 Cài Đặt Local](#-hướng-dẫn-cài-đặt--khởi-chạy-local) •
[🤝 Quy Trình Gộp Code](#-quy-trình-đóng-góp--gộp-nhánh-contribution-guidelines)

</div>

---

## 🌐 Trực Tiếp Trải Nghiệm (Live Demo)

Dự án được xây dựng và triển khai tự động qua **GitHub Actions** lên **GitHub Pages**:

* 🌌 **Trang Chủ Cổng Không Gian 3D (Cosmic 3D Solar System):**  
  👉 **[https://nguyenxuanhieu2903.github.io/portfolio-group/](https://nguyenxuanhieu2903.github.io/portfolio-group/)**  
  *(Không gian WebGL 3D tương tác toàn diện, vật liệu PBR 2K, hậu kỳ Unreal Bloom, âm thanh synthesizer không gian và bộ điều khiển HUD viễn tưởng).*

* 🚀 **Truy Cập Nhanh Portfolio Cá Nhân Đã Hoàn Thành (3/6 Thành Viên):**
  * 🌍 **Lê Nguyễn Nhật Trường** *(Trái Đất — Earth):*  
    👉 **[Xem Portfolio Tuyến Metro K24 ↗](https://nguyenxuanhieu2903.github.io/portfolio-group/members/le-nguyen-nhat-truong/index.html)**  
    *(Chủ đề UTH Metro Bespoke, chuyển ga tàu động GA 01 - GA 06, giả lập Terminal CLI, đo lường chỉ số động và CV chi tiết).*
  * 🔴 **Nguyễn Xuân Hiếu** *(Sao Hỏa — Mars):*  
    👉 **[Xem Portfolio UTH Lanyard Badge ↗](https://nguyenxuanhieu2903.github.io/portfolio-group/members/nguyen-xuan-hieu/index.html)**  
    *(Điểm nhấn Thẻ sinh viên UTH treo dây đàn hồi tương tác vật lý, hệ màu Jade Pebble Morning, sơ đồ kiến trúc hệ thống SVG và Metrics Dashboard).*
  * ♃ **Lê Hữu Châu** *(Sao Mộc — Jupiter):*  
    👉 **[Xem Portfolio Khung Tranh Nghệ Thuật ↗](https://nguyenxuanhieu2903.github.io/portfolio-group/members/le-huu-chau/index.html)**  
    *(Ý tưởng phòng trưng bày mỹ thuật số, khung tranh tương tác vật lý kéo thả, nền WebGL Canvas nghệ thuật và typography Playfair Display).*

---

## 📖 Giới Thiệu Đồ Án

Thay vì đi theo khuôn mẫu danh sách thẻ thành viên 2D truyền thống, đồ án **Portfolio Nhóm 06 — UTH** được kiến tạo như một **Trạm điều khiển không gian (Spatial Cockpit)**:

1. **Ý tưởng trung tâm:** Toàn bộ nhóm được quy tụ thành một **Hệ Mặt Trời 3D**. Mặt Trời tượng trưng cho năng lượng tri thức chung, trong khi **6 hành tinh** tương ứng với 6 thành viên trong nhóm.
2. **Triết lý kiến trúc:** Kết hợp giữa vẻ đẹp công nghệ viễn tưởng (Sci-Fi HUD, WebGL Three.js) và nền tảng kỹ thuật vững chắc: **Vite Multi-Page Application (MPA)**. Mỗi thành viên được thỏa sức tự do sáng tạo không gian riêng biệt trong thư mục cá nhân mà không làm phá vỡ sự ổn định của hệ thống lõi.

---

## ✨ Tính Năng Nổi Bật (Key Features)

### 1. 🌌 Cosmic 3D Spatial Cockpit (WebGL & Three.js Engine)
* **Quỹ đạo thiên văn học chuẩn xác:** Mô phỏng chuyển động Keplerian của Mặt Trời cùng 9 thiên thể (Sao Thủy, Sao Kim, Trái Đất, Sao Hỏa, Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương, Sao Diêm Vương) với độ nghiêng trục và vận tốc tương quan thực tế.
* **Bộ điều khiển góc nhìn kép (Dual-Perspective Kinematic Switch):**
  * `[Q] Quỹ đạo 360°:` Tự do xoay, nghiêng, thu phóng quanh tâm Hệ Mặt Trời với bộ điều khiển `OrbitControls`.
  * `[W] Du hành siêu tốc (Warp Drive):` Camera tăng tốc lướt xuyên qua các vành đai không gian với hiệu ứng vệt sao điện ảnh.
* **Chế độ chụp ảnh toàn cảnh (Clean Photo Mode):**
  * Nhấn `[H]` để ẩn tức thì toàn bộ bảng điều khiển HUD, cho phép người dùng thưởng lãm vũ trụ bao la ở chế độ màn hình sạch (Clean Viewport).
* **Hiệu ứng đồ họa hậu kỳ (Post-Processing FX):** Tích hợp `EffectComposer` cùng bộ lọc `UnrealBloomPass` mang lại vầng nhật hoa rực rỡ, phát quang khí quyển chân thực và hệ vành đai PBR lộng lẫy của Sao Thổ và Sao Mộc.
* **Âm thanh vũ trụ tương tác (Web Audio API Synthesizer):** Tự động phát âm thanh nền synthwave tần số thấp, điều biến Doppler sống động khi chuyển góc nhìn và có nút bật/tắt tiện lợi.

### 2. 🎛️ Trung Tâm Chỉ Huy HUD Không Gian (Spatial HUD Control Center)
* **Thanh tìm kiếm tọa độ thông minh:** Tra cứu tức thì thiên thể hoặc thành viên với thuật toán chuẩn hóa tiếng Việt không phân biệt dấu.
* **Thanh trượt điều hướng quỹ đạo (Orbit Pills Navigation):** Thanh cuộn ngang hiển thị ký hiệu chiêm tinh học và tên hành tinh, cho phép dịch chuyển camera tức thời.
* **Trạm quan sát thiên thể AR (Spatial Detail Drawer):** Bảng trượt hiển thị chi tiết thông số viễn trắc NASA (bán trục lớn AU, vận tốc quỹ đạo, chu kỳ quay, độ lệch tâm, số lượng vệ tinh) cùng hồ sơ năng lực thành viên và nút tiến vào Portfolio cá nhân.
* **Bộ điều khiển dòng thời gian (Time Scrubbing):** Tạm dừng chuyển động quỹ đạo bằng phím `[Space]`, tua nhanh tốc độ từ `0.25x` đến `4.0x`, hoặc đảo chiều quỹ đạo thời gian thực.
* **Cụm nút thu phóng chuyên dụng:** Thu phóng nhanh với nút `+`, `-` và phím tắt `[Esc]` để khôi phục góc nhìn toàn cảnh.

### 3. 📑 Kiến Trúc Đa Trang Độc Lập (Multi-Page Application — MPA)
* **Tách biệt tuyệt đối:** Mỗi thành viên toàn quyền quản lý mã nguồn HTML/CSS/JS và tài nguyên trong thư mục riêng `members/<slug>/`.
* **Cơ chế quét động tự động (Dynamic Entry Detection):** File `vite.config.js` sử dụng Node.js `fs.existsSync` để tự động dò quét các trang HTML thực tế có trong dự án, ngăn chặn triệt để lỗi gãy build khi các thành viên nộp bài theo từng giai đoạn.
* **Đường dẫn tương đối 100%:** Thiết lập `base: './'` đảm bảo mọi tài nguyên (hình ảnh, fonts, stylesheet, script, file CV PDF) hoạt động hoàn hảo trên mọi môi trường máy chủ tĩnh và thư mục con của GitHub Pages.

### 4. 🚀 Tự Động Hóa CI/CD Toàn Diện (GitHub Actions Pipeline)
* Pipeline cấu hình tại `.github/workflows/deploy.yml` tự động kích hoạt khi có commit mới vào nhánh `main`.
* Thực thi kiểm tra phụ thuộc nghiêm ngặt (`npm ci`), đóng gói bản phát hành (`npm run build`), và đẩy sản phẩm lên GitHub Pages mà không cần can thiệp thủ công.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
portfolio-group/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Quy trình CI/CD tự động build & deploy GitHub Pages
├── members/                        # Không gian Portfolio độc lập của 6 thành viên
│   ├── nguyen-xuan-hieu/           # Portfolio Trưởng nhóm (Mars — UTH Lanyard Badge)
│   ├── le-nguyen-nhat-truong/      # Portfolio thành viên (Earth — UTH Metro Concept)
│   ├── le-huu-chau/                # Portfolio thành viên (Jupiter — Khung Tranh Nghệ Thuật)
│   ├── nguyen-thi-thao-nhu/        # Portfolio thành viên (Venus — Backend Developer Aspirant)
│   ├── nguyen-pham-y-huynh/        # Portfolio thành viên (Mercury — Đang hoàn thiện)
│   └── nguyen-anh-thu/             # Portfolio thành viên (Saturn — Đang hoàn thiện)
├── public/                         # Thư mục tài nguyên tĩnh công cộng (Vite phục vụ trực tiếp)
│   ├── avatars/                    # Ảnh chân dung đại diện của các thành viên
│   └── planets/                    # Bộ texture độ phân giải cao 2K (Sun, Earth, Mars...)
├── group.css                       # Hệ thống định kiểu HUD viễn tưởng, Drawer và Responsive
├── group.js                        # Engine 3D Three.js, xử lý quỹ đạo, Shader Bloom & Web Audio
├── index.html                      # Trang chủ Cổng thông tin vũ trụ 3D Hệ Mặt Trời
├── members.data.js                 # Single Source of Truth (SSOT): Dữ liệu thành viên & hành tinh
├── package.json                    # Khai báo dependencies (Three.js, Vite) và scripts chạy
├── package-lock.json               # Khóa phiên bản gói thư viện chuẩn hóa CI/CD
├── vite.config.js                  # Cấu hình đóng gói Vite MPA tự động quét entrypoint
└── README.md                       # Tài liệu hướng dẫn kỹ thuật toàn diện của đồ án
```

---

## 👥 Bảng Trạng Thái Thành Viên (Team Roster & Status Table)

| STT | Họ và Tên | Thiên Thể Đại Diện | Vai Trò / Định Hướng Kỹ Thuật | Thư Mục Mã Nguồn | Trạng Thái Gộp Nhánh |
| :---: | :--- | :---: | :--- | :--- | :---: |
| 1 | **Nguyễn Xuân Hiếu** | 🔴 **Sao Hỏa** *(Mars)* | Trưởng nhóm • Full-Stack & System Admin | `members/nguyen-xuan-hieu/` | ![Merged](https://img.shields.io/badge/Merged-Done-success?style=flat-square) |
| 2 | **Lê Nguyễn Nhật Trường** | 🌍 **Trái Đất** *(Earth)* | Thành viên • Full-Stack & Creative UI (Metro Concept) | `members/le-nguyen-nhat-truong/` | ![Merged](https://img.shields.io/badge/Merged-Done-success?style=flat-square) |
| 3 | **Lê Hữu Châu** | ♃ **Sao Mộc** *(Jupiter)* | Thành viên • Frontend & Gallery Digital Artist | `members/le-huu-chau/` | ![Merged](https://img.shields.io/badge/Merged-Done-success?style=flat-square) |
| 4 | **Nguyễn Thị Thảo Như** | ♀️ **Sao Kim** *(Venus)* | Thành viên • Backend Developer Aspirant | `members/nguyen-thi-thao-nhu/` | ![In Progress](https://img.shields.io/badge/In%20Progress-Pending-orange?style=flat-square) |
| 5 | **Nguyễn Phạm Y Huỳnh** | ☿️ **Sao Thủy** *(Mercury)* | Thành viên • Frontend Developer Aspirant | `members/nguyen-pham-y-huynh/` | ![In Progress](https://img.shields.io/badge/In%20Progress-Pending-orange?style=flat-square) |
| 6 | **Nguyễn Anh Thư** | ♄ **Sao Thổ** *(Saturn)* | Thành viên • Frontend & Web Designer Aspirant | `members/nguyen-anh-thu/` | ![In Progress](https://img.shields.io/badge/In%20Progress-Pending-orange?style=flat-square) |

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy Local

### 1. Yêu cầu môi trường
* Đã cài đặt **Git**.
* Đã cài đặt **Node.js** phiên bản LTS (khuyến nghị từ `v18.x` hoặc `v20.x` trở lên).

### 2. Các bước cài đặt và khởi chạy
Mở Terminal / PowerShell và thực hiện tuần tự các lệnh sau:

```bash
# 1. Sao chép (clone) repository về máy cá nhân
git clone https://github.com/nguyenxuanhieu2903/portfolio-group.git
cd portfolio-group

# 2. Cài đặt các gói thư viện phụ thuộc (bao gồm Three.js và Vite)
npm install
# (Nếu bạn dùng Windows PowerShell gặp chặn script thực thi, hãy dùng: npm.cmd install)

# 3. Khởi chạy máy chủ phát triển (Development Server)
npm run dev
# (Hoặc: npm.cmd run dev)
```

Sau khi chạy lệnh, truy cập trình duyệt tại địa chỉ: `http://localhost:3000/` để tương tác trực tiếp với Hệ Mặt Trời 3D.

### 3. Kiểm thử đóng gói sản phẩm (Production Build)
Để thẩm định chất lượng đóng gói trước khi triển khai hoặc nộp bài:

```bash
# Kiểm tra đóng gói toàn bộ 7 trang HTML và tài nguyên ra thư mục dist/
npm run build
# (Hoặc: npm.cmd run build)

# Xem thử bản đóng gói tĩnh trên máy tính (Preview Server)
npm run preview
# (Hoặc: npm.cmd run preview)
```

Quá trình build sẽ biên dịch toàn bộ mã nguồn vào thư mục `dist/` với kết quả chuẩn mực `0 Error`.

---

## 🤝 Quy Trình Đóng Góp & Gộp Nhánh (Contribution Guidelines)

Nhằm đảm bảo quá trình tích hợp mã nguồn của 3 thành viên còn lại diễn ra trơn tru, không gây xung đột với Trang chủ 3D hay cấu hình hệ thống, nhóm áp dụng **Quy tắc 3 bước chuẩn công nghiệp**:

```text
[Nhánh cá nhân: member/<slug>]
  ├── Chỉ chỉnh sửa trong thư mục members/<slug>/
  ├── Kiểm tra đường dẫn ảnh (./images/...) và nút về trang chủ (../../index.html)
  └── git merge main (Đồng bộ code mới nhất)
             ↓
[Mở Pull Request vào main]
  └── Kiểm tra tab "Files changed" (Chỉ chứa file của thành viên)
             ↓
[Leader Review & Squash Merge]
  └── GitHub Actions tự động build và xuất bản lên GitHub Pages trong 60 giây!
```

### Chi tiết các bước thực hiện:

1. **Bước 1: Làm việc độc lập trên nhánh cá nhân**
   * Tạo và làm việc trên nhánh riêng: `git checkout -b member/<slug-cua-ban>`.
   * **Nguyên tắc vàng:** Chỉ thêm/sửa file trong thư mục `members/<slug-cua-ban>/`. Tuyệt đối **không chỉnh sửa** các file hệ thống chung (`index.html`, `group.js`, `group.css`, `vite.config.js`).
   * Đảm bảo đường dẫn tài nguyên là đường dẫn tương đối: hình ảnh dùng `./images/...`, nút quay về Trang chủ dùng `<a href="../../index.html">`.

2. **Bước 2: Đồng bộ nhánh trước khi tạo PR**
   * Kéo code mới nhất từ nhánh `main` về nhánh của bạn để giải quyết sớm mọi sai lệch:
     ```bash
     git checkout main
     git pull origin main
     git checkout member/<slug-cua-ban>
     git merge main
     npm run build
     ```
   * Khi lệnh `npm run build` đạt `0 Error`, đẩy nhánh lên GitHub: `git push origin member/<slug-cua-ban>`.

3. **Bước 3: Mở Pull Request (PR)**
   * Mở PR trên GitHub từ `member/<slug-cua-ban>` vào `main`.
   * Kiểm tra tab **"Files changed"**: Đảm bảo **chỉ có** các file nằm trong thư mục cá nhân của bạn.
   * Trưởng nhóm sẽ duyệt qua, cập nhật thông tin hiển thị của bạn trên quả cầu 3D (nếu cần) và thực hiện **Squash and merge**. Pipeline CI/CD sẽ tự động cập nhật sản phẩm lên GitHub Pages sau 1-2 phút!

---

## 🛠️ Công Nghệ & Thư Viện Cốt Lõi

* **Core Engine:** [Three.js r186](https://threejs.org/) (WebGL 3D Rendering, Perspective Camera, OrbitControls).
* **Post-Processing FX:** `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `OutputPass`.
* **Audio Synthesis:** Web Audio API (Sine/Triangle Oscillator, Low-pass Biquad Filter, Doppler Modulator).
* **Build System:** [Vite 5](https://vitejs.dev/) (Rollup MPA Bundler, ES Module HMR).
* **Styling & HUD:** Vanilla CSS3 (Custom Variables, Flexbox, Grid, Backdrop-Filter Glassmorphism, CSS Animation).
* **Typography:** Google Fonts (`Outfit`, `Plus Jakarta Sans`, `JetBrains Mono`).
* **CI/CD Automation:** GitHub Actions (`actions/checkout@v4`, `actions/setup-node@v4`, `actions/deploy-pages@v4`).

---

<div align="center">

**ĐỒ ÁN MÔN HỌC LẬP TRÌNH WEB — HỌC KỲ II**  
**Trường Đại học Giao thông Vận tải TP.HCM (UTH)**  
*Dành tặng thầy cô và các bạn yêu thích công nghệ lập trình Web & đồ họa không gian 3D.* ✨

</div>
