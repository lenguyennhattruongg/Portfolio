# 🪐 Group Portfolio Website — Nhóm 06 (UTH)

> **Đồ án môn học Lập trình Web** — Trường Đại học Giao thông Vận tải TP.HCM (UTH)  
> Kho mã nguồn chính thức của nhóm: [https://github.com/nguyenxuanhieu2903/portfolio-group](https://github.com/nguyenxuanhieu2903/portfolio-group)

---

## 🌐 Trực Tiếp Trải Nghiệm (Live Demo)

Dự án đã được triển khai trực tiếp trên GitHub Pages, mời thầy cô và các bạn trải nghiệm qua 2 liên kết chính thức:

- 🌌 **1. Cổng Thông Tin Nhóm 3D (Cosmic 3D Solar System):**  
  👉 **[https://lenguyennhattruongg.github.io/Portfolio/](https://lenguyennhattruongg.github.io/Portfolio/)**  
  *(Mô phỏng vũ trụ 3D Three.js WebGL, vật liệu PBR 2K, Unreal Bloom, âm thanh không gian và tối ưu điều khiển trên di động).*

- 🌍 **2. Portfolio Cá Nhân — Lê Nguyễn Nhật Trường:**  
  👉 **[https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/index.html](https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/index.html)**  
  *(Không gian cá nhân phong cách UTH Metro Bespoke, 3 dự án tiêu biểu, đo lường chỉ số động và CV chi tiết).*

---

## 📖 Giới Thiệu Đồ Án

Chào mừng thầy cô và các bạn đã ghé thăm website Portfolio của **Nhóm 06**. 

Trong học phần Lập trình Web, nhóm chúng mình đặt mục tiêu không chỉ tạo ra một trang danh sách thông thường, mà xây dựng một **Cổng thông tin không gian 3D (3D Solar System)** sống động kết nối với **6 không gian portfolio cá nhân độc lập**. 

Tại đây, mỗi thành viên trong nhóm đóng vai trò như một thiên thể trong Hệ Mặt Trời, vừa kết nối chặt chẽ trong một tập thể, vừa có không gian riêng để thỏa sức sáng tạo về phong cách giao diện, giới thiệu dự án, kỹ năng chuyên môn và định hướng nghề nghiệp của bản thân.

---

## 👥 Danh Sách Thành Viên & Phân Công

| STT | Họ và tên | Vai trò | Thiên thể đại diện | Thư mục mã nguồn |
| :---: | :--- | :---: | :---: | :--- |
| 1 | **Nguyễn Xuân Hiếu** | Trưởng nhóm | 🔴 Sao Hỏa (*Mars*) | `members/nguyen-xuan-hieu/` |
| 2 | **Lê Nguyễn Nhật Trường** | Thành viên | 🌍 Trái Đất (*Earth*) | `members/le-nguyen-nhat-truong/` |
| 3 | **Nguyễn Thị Thảo Như** | Thành viên | ♀️ Sao Kim (*Venus*) | `members/nguyen-thi-thao-nhu/` |
| 4 | **Nguyễn Phạm Y Huỳnh** | Thành viên | ☿️ Sao Thủy (*Mercury*) | `members/nguyen-pham-y-huynh/` |
| 5 | **Lê Hữu Châu** | Thành viên | ♃ Sao Mộc (*Jupiter*) | `members/le-huu-chau/` |
| 6 | **Nguyễn Anh Thư** | Thành viên | ♄ Sao Thổ (*Saturn*) | `members/nguyen-anh-thu/` |

---

## ✨ Điểm Nổi Bật Của Website

### 1. Cổng Thông Tin Nhóm 3D (Solar System Engine)
* **Mô phỏng 3D WebGL với Three.js:** Mô phỏng quỹ đạo thực tế của Hệ Mặt Trời, sử dụng bộ texture PBR 2K equirectangular, vầng hào quang rực rỡ và hiệu ứng hậu kỳ Unreal Bloom.
* **Âm thanh không gian (3D Spatial Audio):** Tích hợp Web Audio API phát ra giai điệu synthwave không gian dịu nhẹ, tần số tự động điều chế nhẹ nhàng theo quỹ đạo quay và có nút bật/tắt tiện lợi.
* **Thanh tua thời gian (Time Scrubbing):** Cho phép người xem tăng tốc, làm chậm hoặc quay ngược thời gian để quan sát chuyển động của các hành tinh.
* **Chế độ toàn cảnh (Photo Mode):** Ẩn các thanh công cụ để chiêm ngưỡng vũ trụ toàn màn hình.
* **Tối ưu trải nghiệm trên di động (Mobile UX):** Thiết kế drawer kéo vuốt mượt mà, nút thoát toàn cảnh dạng capsule nổi dễ bấm và tự động ẩn các thanh điều khiển khi xem thông tin chi tiết.

### 2. Không Gian Portfolio Cá Nhân
* **Kiến trúc đa trang (Multi-Page Application):** Mỗi thành viên toàn quyền quản lý mã nguồn trong thư mục `members/<slug>/` với file HTML, CSS và JavaScript riêng biệt.
* **Portfolio Nhật Trường:** Phong cách *UTH Metro Bespoke* với bảng màu Cyan & Deep Space, tích hợp 3 dự án tiêu biểu (FreshVend, Remote Desktop, Portfolio Group), bảng đo lường chỉ số động và CV chi tiết.
* **Portfolio Xuân Hiếu:** Điểm nhấn thẻ sinh viên UTH Lanyard có hiệu ứng đàn hồi vật lý tương tác chuột, thư viện ảnh chụp giao diện và sơ đồ kiến trúc hệ thống.

---

## 🛠️ Công Nghệ Sử Dụng

Dự án được xây dựng dựa trên nền tảng web tiêu chuẩn, đề cao tính ổn định, tốc độ và trải nghiệm người dùng:

* **Ngôn ngữ cốt lõi:** HTML5 (chuẩn ngữ nghĩa Semantic), Modern CSS3 (CSS Grid, Flexbox, Animation), Vanilla JavaScript (ES6+).
* **Đồ họa 3D & Âm thanh:** [Three.js](https://threejs.org/) (WebGL), OrbitControls, EffectComposer (UnrealBloomPass), Web Audio API.
* **Giao diện & Biểu tượng:** Bootstrap 5 (Grid System), Bootstrap Icons.
* **Công cụ đóng gói (Build Tool):** [Vite](https://vitejs.dev/) — Hỗ trợ phát triển nhanh với HMR và cơ chế quét tự động mọi trang HTML (`getHtmlEntries`) để đóng gói chuẩn tĩnh.
* **Tự động hóa & Triển khai:** Git, GitHub Actions, GitHub Pages.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Thử Local

Nếu muốn chạy thử dự án trên máy cá nhân, bạn chỉ cần thực hiện theo các bước đơn giản sau:

### 1. Yêu cầu hệ thống
* Đã cài đặt **Git** và **Node.js** (khuyến nghị phiên bản LTS v20.x hoặc v22.x).

### 2. Các bước khởi chạy

```bash
# 1. Clone repository về máy
git clone https://github.com/nguyenxuanhieu2903/portfolio-group.git
cd portfolio-group

# 2. Cài đặt các thư viện cần thiết
npm install
# (Nếu bạn dùng Windows PowerShell gặp chặn script, hãy dùng: npm.cmd install)

# 3. Khởi chạy máy chủ phát triển (Dev Server)
npm run dev
# (Hoặc: npm.cmd run dev)
```

Trình duyệt sẽ tự động mở trang web tại địa chỉ: `http://localhost:3000/`.

### 3. Kiểm tra đóng gói (Build Production)

```bash
npm run build
# (Hoặc: npm.cmd run build)
```
Mã nguồn sẽ được biên dịch sạch sẽ vào thư mục `dist/` với 100% đường dẫn tương đối (`base: './'`), sẵn sàng đưa lên bất kỳ máy chủ tĩnh nào.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
portfolio-group/
├── .github/workflows/          # Cấu hình GitHub Actions tự động deploy lên Pages
├── index.html                  # Trang chủ Cổng thông tin 3D Hệ Mặt Trời của nhóm
├── group.js                    # Engine Three.js 3D, âm thanh không gian & tương tác UI
├── group.css                   # Định kiểu giao diện không gian, HUD và responsive mobile
├── members.data.js             # Dữ liệu danh sách thành viên và cấu hình hành tinh
├── public/                     # Tài nguyên tĩnh công cộng
│   ├── avatars/                # Ảnh chân dung của các thành viên
│   └── planets/                # Bộ texture PBR 2K và biểu tượng SVG các hành tinh
├── members/                    # Không gian portfolio độc lập của 6 thành viên
│   ├── nguyen-xuan-hieu/       # Portfolio của Nguyễn Xuân Hiếu
│   ├── le-nguyen-nhat-truong/  # Portfolio của Lê Nguyễn Nhật Trường
│   ├── nguyen-thi-thao-nhu/    # Portfolio của Nguyễn Thị Thảo Như
│   ├── nguyen-pham-y-huynh/    # Portfolio của Nguyễn Phạm Y Huỳnh
│   ├── le-huu-chau/            # Portfolio của Lê Hữu Châu
│   └── nguyen-anh-thu/         # Portfolio của Nguyễn Anh Thư
├── package.json                # Quản lý dependencies và scripts chạy
├── vite.config.js              # Cấu hình đa trang (MPA) tự động nhận diện entrypoints
└── README.md                   # Tài liệu giới thiệu và hướng dẫn đồ án
```

---

## 🤝 Quy Trình Làm Việc Nhóm Trên Git

Để đảm bảo các thành viên làm việc mượt mà và không bao giờ xảy ra xung đột mã nguồn:

1. Mỗi thành viên làm việc độc lập trên nhánh tính năng riêng: `feature/portfolio-<ten-thanh-vien>`.
2. Mọi thay đổi về nội dung cá nhân chỉ thực hiện bên trong thư mục `members/<slug-cua-ban>/`.
3. Khi hoàn thiện, chạy thử `npm run build` để đảm bảo 0 lỗi.
4. Mở Pull Request từ nhánh cá nhân vào nhánh `main` để Trưởng nhóm review và merge.
5. Sau khi merge vào `main`, GitHub Actions sẽ tự động cập nhật bản mới nhất lên GitHub Pages trong vòng 1-2 phút!

---

*Cảm ơn thầy cô và các bạn đã dành thời gian theo dõi đồ án của Nhóm 06!* ✨
