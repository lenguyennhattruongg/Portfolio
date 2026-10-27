# Group Portfolio Website — Lập Trình Web (UTH)

> 🌌 **Nhánh tính năng:** [`cosmic-3`](https://github.com/lenguyennhattruongg/Portfolio/tree/cosmic-3) (Milky Way Solar System 3D Engine — Visual Fidelity 2K & Compact Expandable Search)  
> 🛸 **Thành viên phụ trách:** **Lê Nguyễn Nhật Trường** (K24 CNTT, ĐH Giao thông Vận tải TP.HCM — UTH)  
> 🌐 **Deploy Trang Chủ Nhóm (Hệ Mặt Trời 3D):** **[https://lenguyennhattruongg.github.io/Portfolio/](https://lenguyennhattruongg.github.io/Portfolio/)**  
> 🧑‍🚀 **Deploy Portfolio Cá Nhân (Lê Nguyễn Nhật Trường):** **[https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/index.html](https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/index.html)**

---

## 🌐 Đường Dẫn Trực Tuyến & Triển Khai (Live Deployment Links)

| Nền tảng / Hạng mục | Địa chỉ truy cập trực tiếp | Ghi chú kỹ thuật |
|---|---|---|
| 🌌 **Trang Chủ Nhóm (Hệ Mặt Trời 3D WebGL)** | 🚀 **[https://lenguyennhattruongg.github.io/Portfolio/](https://lenguyennhattruongg.github.io/Portfolio/)** | Mô phỏng Hệ Mặt Trời chuẩn khoa học 3D: Mặt Trời Plasma Granulation, 8 hành tinh + Pluto texture 2K Equirectangular, vành đai Thổ tinh Cassini, vành đai 2.200 tiểu hành tinh, khí quyển tán xạ Rayleigh, Web Audio API |
| 🧑‍🚀 **Portfolio Cá Nhân (Lê Nguyễn Nhật Trường)** | 🚅 **[https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/index.html](https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/index.html)** | Bản thiết kế Tuyến Metro Sài Gòn (UTH Metro Transit System) nguyên bản độc lập (Socket TCP, Java Core, Ticket Inspection Modal) |
| 💻 **Máy chủ xem trước cục bộ (Local Preview)** | 🖥️ [http://127.0.0.1:3000/](http://127.0.0.1:3000/) | Môi trường preview Vite Production (Port 3000) |

---

## 1. Tổng quan dự án

- **Mục tiêu:** Giới thiệu tập thể nhóm, năng lực kỹ thuật và sản phẩm tiêu biểu của từng thành viên; tích hợp 6 không gian portfolio cá nhân độc lập vào một nền tảng web tĩnh hoạt động ổn định.
- **Phạm vi học thuật:** Đây là đồ án môn học, không phải sản phẩm thương mại. Toàn bộ thông tin được trình bày trung thực, đúng năng lực và tiến độ thực tế của sinh viên.
- **Đặc trưng kiến trúc:** Mỗi thành viên tự chủ sáng tạo phong cách giao diện và logic tương tác trong thư mục riêng; toàn bộ dự án dùng chung hệ thống build và quy trình tích hợp Git/GitHub.

---

## 2. Trạng thái dự án hiện tại

Ghi nhận tại nhánh `cosmic-3`:

| Thành phần | Trạng thái hiện tại | Ghi chú kỹ thuật |
|---|:---:|---|
| **Trang chủ nhóm (`index.html`)** | **Sẵn sàng nghiệm thu** | Giao diện **Hệ Mặt Trời 3D WebGL (Three.js)** chuẩn Studio Cinematic: Unreal Bloom Post-processing (`EffectComposer`, `UnrealBloomPass`), Time Scrubbing (`Spacebar` tạm dừng, tua `0.2x` - `8x`), Âm thanh vòm vũ trụ 3D Spatial Audio (`StereoPannerNode` & Sub-bass rumble), Màn hình chờ viễn trắc Sci-Fi (`THREE.LoadingManager`), Chế độ quan sát toàn cảnh (`Clean Photo Mode [H]`), Sao chổi định kỳ (`Cosmic Comet Event` 45s). |
| **Dữ liệu thành viên (`members.data.js`)** | **Xác minh 100% (PASS)** | Dữ liệu thực tế 100%: bảo tồn thông tin, không gán nhãn kỹ năng phỏng đoán, hiển thị avatar cá nhân hoặc ký hiệu monogram thiên văn. |
| **06 Thư mục Portfolio cá nhân (`members/`)** | **Bảo toàn nguyên vẹn** | 06 Thư mục Portfolio khung cơ sở (`hieu`, `truong`, `nhu`, `huynh`, `chau`, `thu`). Không chỉnh sửa hay đổi tên bất kỳ file/thư mục nào trong `members/`. |
| **Kiến trúc phân trang tĩnh** | **Hoạt động ổn định (PASS)** | Hỗ trợ mở trực tiếp tĩnh trên trình duyệt / GitHub Pages (ES Module) và cấu hình sẵn sàng cho đóng gói Vite đa trang (7 HTML entrypoints). |
| **Tương thích thiết bị di động** | **Đạt chuẩn (PASS)** | Tối ưu responsive 1 hàng ngang duy nhất cho thanh footer điều khiển (375px đến 1440px desktop), không tràn thanh cuộn ngang (`overflow-x: hidden`). |
| **Hệ thống build đa trang (`npm run build`)** | **Xác minh 100% (PASS)** | Đã kiểm thử thực tế trên Vite v5.4.21: Biên dịch 36 modules thành công, xuất đủ 7 file HTML đầu ra và toàn vẹn liên kết tài nguyên hashed assets. |

---

## 3. Công nghệ sử dụng

Dự án tuân thủ nghiêm ngặt stack công nghệ cốt lõi đã chốt, không cài đặt các framework ngoài phạm vi:

- **HTML5 Ngữ nghĩa:** Thẻ `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, `<footer>` chuẩn SEO và ARIA (`aria-live="polite"`, `aria-controls`, `aria-pressed`).
- **Vanilla CSS3 hiện đại:** Hệ biến CSS Tokens (`--bg-canvas`, `--ink-primary`, `--accent-orange`), bố cục CSS Grid linh hoạt (3×2 co lại 2×3), Flexbox, hỗ trợ `prefers-reduced-motion`.
- **Vanilla JavaScript ES6+ (Native Modules):** Tách `members.data.js` và `group.js`, quản lý trạng thái tập trung, tìm kiếm debounce 250ms chuẩn hóa bỏ dấu tiếng Việt và chữ `đ`/`Đ`.
- **Phông chữ:** `Outfit` (Tiêu đề), `Plus Jakarta Sans` (Nội dung), `JetBrains Mono` (Thông số kỹ thuật) hỗ trợ tiếng Việt đầy đủ.
- **Git & GitHub:** Phân nhánh chuẩn `feature/group-homepage-redesign` sẵn sàng mở Pull Request vào `develop`.

---

## 4. Cấu trúc thư mục thực tế

Cây thư mục thực tế của repository:

```text
Portfolio_group/
├── index.html                      # Trang chủ giới thiệu nhóm (Landing Page)
├── group.css                       # Stylesheet chính cho trang chủ nhóm (Editorial Studio)
├── group.js                        # JavaScript xử lý tương tác trang chủ (Search, Navbar, Scroll)
├── members/                        # Không gian phát triển riêng của 6 thành viên
│   ├── nguyen-xuan-hieu/           # Portfolio của Nguyễn Xuân Hiếu (Trưởng nhóm)
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── le-nguyen-nhat-truong/      # Portfolio của Lê Nguyễn Nhật Trường
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── nguyen-thi-thao-nhu/        # Portfolio của Nguyễn Thị Thảo Như
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── nguyen-pham-y-huynh/        # Portfolio của Nguyễn Phạm Y Huỳnh
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── le-huu-chau/                # Portfolio của Lê Hữu Châu
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   └── nguyen-anh-thu/             # Portfolio của Nguyễn Anh Thư
│       ├── index.html
│       ├── style.css
│       ├── script.js
│       └── images/
├── public/                         # Thư mục tài nguyên tĩnh công cộng
│   └── images/
│       └── group/                  # Ảnh tĩnh dùng chung cho trang chủ nhóm
├── package.json                    # Khai báo dependencies và scripts của npm
├── package-lock.json               # Khóa chính xác phiên bản các gói phụ thuộc
├── vite.config.js                  # Cấu hình đa trang (7 entrypoints) và base path cho Vite
├── .gitignore                      # Danh sách các file/thư mục không đưa lên Git
└── README.md                       # Tài liệu hướng dẫn sử dụng và phát triển dự án
```

---

## 5. Danh sách thành viên & Phân công thư mục

Mỗi thành viên chịu trách nhiệm chính về nội dung, thẩm mỹ và mã nguồn trong thư mục portfolio cá nhân của mình:

| STT | Họ và tên | Slug thư mục cá nhân | Trách nhiệm chính |
|:---:|---|---|---|
| 1 | **Nguyễn Xuân Hiếu** | `members/nguyen-xuan-hieu/` | Trưởng nhóm, phát triển portfolio cá nhân, phụ trách tích hợp & review |
| 2 | **Lê Nguyễn Nhật Trường** | `members/le-nguyen-nhat-truong/` | Phát triển portfolio cá nhân, kiểm thử giao diện |
| 3 | **Nguyễn Thị Thảo Như** | `members/nguyen-thi-thao-nhu/` | Phát triển portfolio cá nhân, kiểm thử giao diện |
| 4 | **Nguyễn Phạm Y Huỳnh** | `members/nguyen-pham-y-huynh/` | Phát triển portfolio cá nhân, kiểm thử giao diện |
| 5 | **Lê Hữu Châu** | `members/le-huu-chau/` | Phát triển portfolio cá nhân, kiểm thử giao diện |
| 6 | **Nguyễn Anh Thư** | `members/nguyen-anh-thu/` | Phát triển portfolio cá nhân, kiểm thử giao diện |

> **Nguyên tắc bất biến:** Tuyệt đối không tự ý đổi tên thư mục slug cá nhân vì sẽ phá vỡ liên kết điều hướng từ Trang chủ và cấu hình build trong `vite.config.js`.

---

## 6. Yêu cầu môi trường & Lệnh thực thi

### 6.1. Yêu cầu phần mềm
Trước khi bắt đầu, đảm bảo máy tính đã cài đặt các công cụ sau:
- **Git:** Phiên bản 2.30+ trở lên.
- **Node.js:** Phiên bản LTS khuyến nghị (v20.x hoặc v22.x/v24.x).
- **npm:** Đi kèm cùng Node.js (v10.x trở lên).

Kiểm tra phiên bản trong terminal:
```powershell
node -v
npm.cmd -v
git --version
```
*(Trên Windows PowerShell, nếu lệnh `npm` gặp lỗi do Execution Policy, hãy sử dụng `npm.cmd`).*

---

### 6.2. Hướng dẫn clone và chạy local

1. **Clone repository về máy:**
   ```powershell
   git clone <REPOSITORY_URL>
   cd Portfolio_group
   ```
   *(Thay `<REPOSITORY_URL>` bằng địa chỉ GitHub chính thức của nhóm).*

2. **Cài đặt các thư viện phụ thuộc:**
   ```powershell
   npm.cmd install
   ```

3. **Khởi chạy Development Server:**
   ```powershell
   npm.cmd run dev
   ```
   Terminal sẽ in ra đường dẫn cục bộ (thường là `http://localhost:3000/` hoặc `http://127.0.0.1:3000/`). Mở đường dẫn này trên trình duyệt để xem trực tiếp website với cơ chế Hot Module Replacement (HMR).

4. **Kiểm tra đóng gói Production Build:**
   ```powershell
   npm.cmd run build
   ```
   Lệnh này biên dịch toàn bộ mã nguồn vào thư mục `dist/`. Luôn chạy lệnh này để bảo đảm không có lỗi cú pháp trước khi gửi yêu cầu tích hợp.

5. **Xem thử bản build (Preview):**
   ```powershell
   npm.cmd run preview
   ```
   Khởi chạy server giả lập môi trường production tĩnh để kiểm tra đường dẫn tài nguyên sau khi build.

---

## 7. Chiến lược phân nhánh Git & Quy trình làm việc

Nhóm áp dụng mô hình phân nhánh chuẩn để bảo đảm tính ổn định của mã nguồn:

```text
main (Nhánh bảo vệ — Phiên bản ổn định cao nhất)
 └── develop (Nhánh tích hợp chung của cả nhóm)
      ├── feature/portfolio-hieu
      ├── feature/portfolio-truong
      ├── feature/portfolio-thao-nhu
      ├── feature/portfolio-y-huynh
      ├── feature/portfolio-huu-chau
      └── feature/portfolio-anh-thu
```

### 7.1. Vai trò của từng nhánh
- **`main`:** Nhánh chính chứa bản phát hành chính thức, sẵn sàng nộp bài hoặc deploy GitHub Pages. Chỉ trưởng nhóm mới có quyền merge vào `main` sau khi toàn bộ website đã được nghiệm thu.
- **`develop`:** Nhánh tích hợp trung tâm. Mọi tính năng cá nhân sau khi hoàn thiện sẽ được gửi Pull Request vào nhánh này để kiểm thử phối hợp.
- **`feature/portfolio-*`:** Nhánh riêng của từng thành viên để phát triển portfolio cá nhân, độc lập và không ảnh hưởng đến người khác.

---

### 7.2. Quy trình làm việc 10 bước chuẩn

1. **Clone repo:** Thành viên clone dự án về máy.
2. **Chuyển sang nhánh develop:** Đồng bộ mã nguồn mới nhất từ remote:
   ```powershell
   git status
   git fetch origin
   git switch develop
   git pull origin develop
   ```
   *(Nếu remote chưa có nhánh `develop`, trưởng nhóm sẽ khởi tạo nhánh này trước).*
3. **Tạo nhánh feature cá nhân:** Khởi tạo branch từ `develop`:
   ```powershell
   # Ví dụ cho thành viên Hiếu:
   git switch -c feature/portfolio-hieu

   # Ví dụ cho thành viên Trường:
   git switch -c feature/portfolio-truong
   ```
4. **Phát triển mã nguồn:** Chỉ chỉnh sửa các file bên trong thư mục `members/<slug-cua-ban>/`.
5. **Kiểm tra trạng thái:** Xác nhận các file đã thay đổi:
   ```powershell
   git status
   ```
6. **Staging có chủ đích:** Tuyệt đối không dùng `git add .` bừa bãi. Chỉ thêm các file thuộc phạm vi cá nhân:
   ```powershell
   git add members/<slug-cua-ban>/
   ```
7. **Commit với thông điệp rõ ràng:**
   ```powershell
   git commit -m "feat: complete personal portfolio layout and interactive modal"
   ```
8. **Đẩy branch lên GitHub:**
   ```powershell
   git push -u origin feature/<ten-branch-cua-ban>
   ```
9. **Tạo Pull Request (PR):** Truy cập GitHub, tạo PR với mục tiêu: **Base: `develop`** &larr; **Compare: `feature/<ten-branch-cua-ban>`**. Mô tả ngắn gọn những gì đã thực hiện.
10. **Review & Merge:** Trưởng nhóm kiểm tra code, chạy thử build. Nếu đạt, PR sẽ được merge vào `develop`.

---

### 7.3. Các quy tắc an toàn bắt buộc (Safety Rules)
- **Không bao giờ commit trực tiếp lên `main` hoặc `develop`.**
- **Không sử dụng `git push --force`** hoặc viết lại lịch sử commit chung.
- **Không tự ý sửa file của thành viên khác.**
- **Không commit thư mục `node_modules/`, `dist/` hoặc các file cache:** File `.gitignore` đã được cấu hình sẵn để tự động loại trừ.
- **Bảo mật tuyệt đối:** Không đưa mật khẩu, token, API keys hoặc file `.env` lên GitHub.

---

## 8. Khuyến nghị cấu hình GitHub Rulesets & Quyền Merge

Để vận hành quy trình nhóm an toàn trên GitHub, nhóm đề xuất cấu hình cài đặt repository như sau:

- **Bảo vệ nhánh `main`:**
  - Bật yêu cầu bắt buộc tạo Pull Request trước khi merge (*Require a pull request before merging*).
  - Yêu cầu ít nhất 01 review phê duyệt từ Trưởng nhóm (*Require approvals*).
  - Giới hạn quyền merge trực tiếp (*Restrict deletions & restrict pushes*).
- **Bảo vệ nhánh `develop`:**
  - Yêu cầu mọi thay đổi tích hợp phải thông qua Pull Request từ các nhánh `feature/*`.
  - Kiểm tra trạng thái build thành công trước khi merge.
- *Lưu ý:* Việc thiết lập chi tiết phụ thuộc vào gói tài khoản GitHub (Free/Team) và quyền của chủ sở hữu repository trong phần **Settings &rarr; Rulesets**.

---

## 9. Hướng dẫn dành cho từng thành viên khi làm Portfolio

1. **Phạm vi làm việc:** Toàn bộ công việc của bạn nằm trong `members/<slug-cua-ban>/`:
   - `index.html`: Soạn thảo cấu trúc HTML ngữ nghĩa (Navbar, Hero/Giới thiệu, Kỹ năng, Dự án, Hoạt động, Form liên hệ).
   - `style.css`: Viết CSS riêng cho portfolio của bạn, tự do sáng tạo màu sắc và bố cục.
   - `script.js`: Viết các tính năng JavaScript tương tác thực tế (xử lý sự kiện, modal, validate form,...).
   - `images/`: Đặt ảnh chân dung thật và ảnh minh họa dự án của bạn tại đây.
2. **Quy tắc đường dẫn tương đối:**
   - Trong file `members/<slug>/index.html`, luôn dẫn tài nguyên cục bộ dạng `./style.css`, `./script.js`, `./images/ten-anh.jpg`.
   - Nút quay lại trang chủ dùng đường dẫn `../../index.html`.
3. **Thảo luận trước khi sửa file chung:**
   - Nếu bạn cần sửa các file cấu hình hoặc tài nguyên chung (`vite.config.js`, `package.json`, `index.html` trang chủ, `group.css`, `group.js`), **bắt buộc phải thông báo và thống nhất với trưởng nhóm trước**.

---

## 10. Checklist trước khi tạo Pull Request

Trước khi tạo Pull Request để gửi duyệt, mỗi thành viên phải tự kiểm tra danh sách sau:

- [ ] Portfolio mở và hiển thị chính xác trên máy local qua lệnh `npm.cmd run dev`.
- [ ] Mở Console trình duyệt (F12) và bảo đảm **không có lỗi JavaScript đỏ (0 runtime errors)**.
- [ ] Toàn bộ hình ảnh hiển thị rõ ràng, không bị vỡ đường dẫn (404).
- [ ] Giao diện co giãn tốt trên điện thoại di động (không bị tràn ngang thanh cuộn).
- [ ] Liên kết `&larr; Về trang chủ nhóm` hoạt động chính xác.
- [ ] Đã chạy thử lệnh `npm.cmd run build` và **build thành công 100%**.
- [ ] Lệnh `git status` xác nhận chỉ stage các file thuộc thư mục cá nhân.
- [ ] Không có file tạm, file cấu hình IDE cá nhân hoặc dữ liệu nhạy cảm trong commit.

---

## 11. Quy ước Code & Nội dung

- **Tính trung thực:** Trình bày đúng kỹ năng, dự án và kinh nghiệm của bản thân. Không bịa đặt giải thưởng hoặc chứng chỉ chưa được kiểm chứng.
- **Bản quyền tài nguyên:** Chỉ sử dụng hình ảnh cá nhân thật hoặc hình ảnh, icon miễn phí bản quyền (như Bootstrap Icons).
- **Clean Code:** Đặt tên class CSS, tên biến và hàm JavaScript có ý nghĩa bằng tiếng Anh hoặc tiếng Việt nhất quán; giữ mã nguồn gọn gàng, có chú thích cần thiết.
- **Không tự ý cài thêm package ngoài:** Nếu cần thư viện mới, phải trao đổi để bổ sung tập trung vào `package.json` của cả nhóm.

---

## 12. Lộ trình triển khai tiếp theo

1. **Phase 3:** Triển khai hoàn chỉnh Portfolio cá nhân của Nguyễn Xuân Hiếu theo đặc tả đã chốt.
2. **Phase 4:** Các thành viên phát triển và hoàn thiện 5 portfolio cá nhân còn lại; gửi PR vào `develop`.
3. **Phase 5:** Tích hợp tổng thể, chạy bộ kiểm thử QA toàn site, rà soát liên kết và cấu hình GitHub Actions tự động triển khai lên GitHub Pages.

---

## 13. Ghi chú tài liệu nội bộ

- File `README.md` này là tài liệu hướng dẫn vận hành kỹ thuật và quy chuẩn làm việc công khai của repository.
- Các tài liệu phân tích nghiệp vụ, đặc tả chi tiết sản phẩm và kế hoạch nội bộ của nhóm được quản lý và lưu trữ riêng, không đưa vào mã nguồn công khai khi chưa có yêu cầu.
