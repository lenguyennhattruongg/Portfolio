# Profile & Developer Portfolio - Nguyễn Thị Thảo Như

Website Portfolio cá nhân hoàn chỉnh, hiện đại, thanh lịch và chuyên nghiệp dành cho sinh viên Công nghệ Thông tin định hướng phát triển **Backend Developer**.

- **URL Public GitHub Pages**: [https://nhuthinguyen.github.io/profile/](https://nhuthinguyen.github.io/profile/)
- **GitHub Repository**: [https://github.com/NhuThiNguyen/profile](https://github.com/NhuThiNguyen/profile)

---

## 📁 1. Cấu Trúc Thư Mục Dự Án

```
profile me/
│
├── index.html                  # File HTML5 Semantic chuẩn SEO, hỗ trợ Open Graph & Responsive
├── style.css                   # Định kiểu giao diện Sáng/Tối (CSS Variables, Flexbox, Grid, Animations)
├── script.js                   # Xử lý tương tác: Gõ chữ, Modal, Menu di động, Form Validation, Sao chép email, Đổi Theme
│
├── images/                     # Thư mục hình ảnh & icon vector SVG (Đường dẫn tương đối)
│   ├── 3x4.jpg                 # Ảnh thẻ chân dung đại diện chính thức của bạn
│   ├── project-trekking.svg    # Ảnh minh họa Dự án 1: Trekking & Leo núi
│   ├── project-love.svg        # Ảnh minh họa Dự án 2: Interactive Love Website
│   └── avatar-placeholder.svg  # Ảnh vector dự phòng
│
└── README.md                   # Tài liệu hướng dẫn sử dụng, chỉnh sửa và deploy lên GitHub Pages
```

> **Ghi chú kỹ thuật quan trọng**:
> - Toàn bộ mã nguồn sử dụng **100% đường dẫn tương đối** (`./style.css`, `./script.js`, `./images/3x4.jpg`,...).
> - Tuyệt đối không chứa đường dẫn tuyệt đối dạng `C:/Users/...` hay `file:///...`.
> - Không dùng backend, không PHP, không Node.js, không database -> Hoàn toàn tương thích và chạy tức thì trên GitHub Pages.

---

## ✨ 2. Các Tính Năng & Điểm Nhấn Của Website

1. **Giao diện hiện đại & Nữ tính (Soft Aesthetic Mode)**:
   - Tông màu sáng dịu nhẹ với dải màu pastel Rose Blush (`#f472b6`), Soft Lavender (`#a855f7`) và Indigo (`#6366f1`).
   - Nền trắng ngọc trai êm mắt, thẻ card bo tròn mềm mại và bóng đổ bồng bềnh.
2. **Nút chuyển đổi giao diện Sáng / Tối (Theme Toggle)**:
   - Cho phép người xem linh hoạt chuyển đổi giữa giao diện Sáng thanh lịch và giao diện Tối (Developer Dark Mode).
   - Tự động ghi nhớ tùy chọn của người dùng qua `localStorage`.
3. **Hero Section sống động**:
   - Hiệu ứng gõ chữ (typing effect) cho các vị trí: *"Backend Developer"*, *"Web Developer"*, *"IT Student"*.
   - Khung avatar tròn hiển thị chân dung thật `3x4.jpg` có viền hào quang phát sáng.
4. **Giới thiệu bản thân & Học vấn (About Me & Education Timeline)**:
   - Trình bày thông tin chính quy: Đại học Giao thông Vận tải TP.HCM (2024 – 2028), Ngành Công nghệ Thông tin.
   - Thể hiện rõ các môn học nền tảng: Cấu trúc dữ liệu & Giải thuật, CSDL & SQL, OOP, Phân tích thiết kế hệ thống.
5. **Kỹ năng chuyên môn (Skills)**:
   - Phân loại 5 nhóm: Programming Languages, Web Development, Database, Tools, Computer Science.
   - Hiển thị dạng badge/card trực quan, không dùng thanh % cứng nhắc.
6. **Dự án thực tế (Projects & Modal Chi Tiết)**:
   - **Dự án 1**: *Trekking & Leo núi* (Outdoor & Web Application).
   - **Dự án 2**: *Interactive Love Website* (Đã liên kết trực tiếp tới repository chính thức: `https://github.com/NhuThiNguyen/love-web`).
   - **Dự án chờ (Placeholder)**: Sẵn sàng mở rộng thêm đồ án Backend.
   - **Modal Popup**: Cung cấp chi tiết 10 tiêu chí kỹ thuật (Overview, Problem, Solution, Technologies, Features, Algorithms, Challenges, What I Learned, GitHub, Live Demo).
7. **Khu vực liên hệ (Contact Me)**:
   - **Nút Gửi tin nhắn cho tôi**: Cuộn đến biểu mẫu gửi tin nhắn trong phần liên hệ.
   - **Nút Sao chép email**: Click vào sẽ tự động lưu email vào bộ nhớ tạm (Clipboard) và hiển thị thông báo Toast xác nhận `Đã sao chép email vào bộ nhớ tạm! 📋`.
   - **Nút Mở GitHub cá nhân**: Trỏ thẳng tới `https://github.com/NhuThiNguyen`.
   - **Biểu mẫu gửi tin nhắn**: Kiểm tra dữ liệu, sau đó mở ứng dụng email mặc định với nội dung đã điền sẵn (`mailto:`). Người gửi cần xác nhận gửi trong ứng dụng email; website tĩnh không tự gửi email.
8. **Chân trang (Footer)**:
   - Tên thương hiệu: **Nguyễn Thị Thảo Như**.
   - Phương châm: *"Kiên trì học hỏi mỗi ngày, từng bước xây dựng nền tảng Backend vững chắc và tạo ra giá trị qua từng dòng mã."*
   - Bản quyền `© 2026 Nguyễn Thị Thảo Như. All Rights Reserved.`.
   - Nút quay lại đầu trang (Back to top) mượt mà.

---

## 🚀 3. HƯỚNG DẪN TỪNG BƯỚC ĐƯA WEBSITE LÊN GITHUB PAGES (PUBLIC)

Để có một đường link công khai dạng `https://nhuthinguyen.github.io/profile/` để gửi cho nhà tuyển dụng hoặc bạn bè mở được ngay trên điện thoại và máy tính, bạn làm theo các bước đơn giản sau:

### Bước 1: Tạo Repository mới trên GitHub
1. Truy cập [github.com](https://github.com) và đăng nhập vào tài khoản của bạn (**NhuThiNguyen**).
2. Nhấp vào dấu **`+`** ở góc trên bên phải ➔ chọn **New repository** (hoặc truy cập `https://github.com/new`).
3. Điền thông tin:
   - **Repository name**: Nhập `profile` (hoặc tên bạn muốn).
   - **Description**: `Personal Portfolio of Nguyễn Thị Thảo Như` (tùy chọn).
   - **Public / Private**: Chọn **Public** (Bắt buộc chọn Public để GitHub Pages hoạt động miễn phí).
   - Các mục *"Add a README file"*, *".gitignore"*, *"license"*: **Bỏ tích** (Không tích chọn, vì chúng ta đã có sẵn file trên máy).
4. Bấm nút màu xanh **Create repository**.

---

### Bước 2: Đẩy (Push) toàn bộ mã nguồn lên GitHub bằng VS Code

1. Mở phần mềm **Visual Studio Code**.
2. Chọn menu **File** ➔ **Open Folder...** ➔ Chọn thư mục `profile me` tại đường dẫn máy bạn:  
   `c:\Users\nhu\OneDrive\Máy tính\profile me`
3. Mở Terminal trong VS Code bằng cách nhấn tổ hợp phím **`Ctrl + \``** (hoặc vào menu **Terminal** ➔ **New Terminal**).
4. Lần lượt sao chép và dán từng lệnh sau vào Terminal rồi nhấn Enter:

```bash
# 1. Khởi tạo kho lưu trữ Git cục bộ
git init

# 2. Thêm tất cả các file vào Git
git add .

# 3. Tạo commit đầu tiên
git commit -m "Initial commit: Complete Profile Portfolio Website"

# 4. Đặt tên nhánh chính là main
git branch -M main

# 5. Liên kết kho lưu trữ trên máy với GitHub của bạn
git remote add origin https://github.com/NhuThiNguyen/profile.git

# 6. Đẩy toàn bộ mã nguồn lên GitHub
git push -u origin main
```

*(Nếu Terminal yêu cầu đăng nhập tài khoản GitHub, bạn chỉ cần chọn Đăng nhập bằng trình duyệt để xác thực là xong).*

---

### Bước 3: Kích hoạt GitHub Pages để xuất bản Website

1. Trên trình duyệt, truy cập vào Repository bạn vừa tạo: `https://github.com/NhuThiNguyen/profile`.
2. Bấm vào tab **Settings** (biểu tượng bánh răng ⚙️ ở menu trên cùng của repository).
3. Ở cột danh mục bên trái, cuộn xuống tìm và nhấp vào mục **Pages** (mục con của Code and automation).
4. Tại phần **Build and deployment**:
   - **Source**: Giữ nguyên chọn `Deploy from a branch`.
   - **Branch**: Ở ô chọn nhánh đang là `None`, bạn nhấp chọn **`main`**.
   - Ở ô thư mục bên cạnh, giữ nguyên **`/(root)`**.
   - Bấm nút **Save** màu trắng cạnh đó.
5. GitHub Pages sẽ bắt đầu tự động triển khai website (mất khoảng từ 1 đến 2 phút).
6. Tải lại trang Settings ➔ Pages, bạn sẽ thấy xuất hiện một hộp thông báo màu xanh lá cây với dòng chữ:  
   **"Your site is live at https://nhuthinguyen.github.io/profile/"**

---

### Bước 4: Kiểm tra và chia sẻ Website

1. **Mở trên máy tính**: Nhấp trực tiếp vào đường link [https://nhuthinguyen.github.io/profile/](https://nhuthinguyen.github.io/profile/).
2. **Mở trên điện thoại di động**: 
   - Sao chép đường link trên gửi qua Zalo, Messenger hoặc gõ vào trình duyệt điện thoại (Safari, Chrome).
   - Website sẽ tự động hiển thị hoàn hảo ở chế độ Mobile (menu hamburger trượt mượt mà, layout 1 cột gọn gàng, không bị tràn thanh cuộn ngang).
3. **Đính kèm vào CV**: Bạn có thể chèn link này vào mục **Portfolio / Website cá nhân** trong CV xin thực tập Backend Intern!

---

## 🛠️ 4. Hướng Dẫn Tùy Biến Khi Cần Sau Này

- **Đổi lại thông tin cá nhân**: Mở file `index.html` và chỉnh sửa các văn bản tương ứng.
- **Thêm dự án mới**: Tham khảo cấu trúc `<div class="project-card">` của Dự án 1 trong file `index.html` và thêm dữ liệu vào biến `projectsData` trong file `script.js`.
- **Cập nhật code sau khi chỉnh sửa**:
  ```bash
  git add .
  git commit -m "Cập nhật nội dung website"
  git push
  ```
  GitHub Pages sẽ tự động làm mới website chỉ sau khoảng 1 phút!
