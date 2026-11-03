# LÊ NGUYỄN NHẬT TRƯỜNG
**SOFTWARE ENGINEER TRAINEE (SYSTEMS & BACKEND FOCUS)**  
*Mục tiêu dài hạn: Senior Software Engineer tại NVIDIA*

- 🏫 **Trường:** Đại học Giao thông Vận tải TP.HCM (UTH) — Lớp CNTT24A • MSSV: `082206010882`
- 📧 **Email:** [truonglnn0882@ut.edu.vn](mailto:truonglnn0882@ut.edu.vn)
- 📞 **Điện thoại / Zalo:** `0909 xxx 882 (Zalo liên hệ)`
- 🐙 **GitHub:** [github.com/lenguyennhattruongg](https://github.com/lenguyennhattruongg)
- 🔗 **LinkedIn:** *Đang khởi tạo chuyên nghiệp*
- 🌐 **Portfolio Live:** [Tuyến Metro T24 UTH](https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/)

---

## 1. HỌC VẤN & TIẾN ĐỘ ĐÀO TẠO

- **Trường Đại học Giao thông Vận tải TP.HCM (UTH)** (2024 – 2028 • Dự kiến tốt nghiệp 2028)
  - Chuyên ngành: Công nghệ Thông tin • Lớp CNTT24A • Hệ Chính quy 4 năm
  - **Tiến độ tích lũy:** `77 / 120 tín chỉ`
  - **GPA Tích lũy:** `3.31 / 4.0` *(Xếp loại: Khá - Giỏi • Đa số môn đạt B+ tới A)*
  - **Điểm môn cốt lõi:**
    - Lập trình Hướng đối tượng Java (OOP): **Điểm A**
    - Mạng máy tính & Socket TCP/IP: **Điểm A**
    - Hệ quản trị CSDL & Chuẩn hóa 3NF MySQL: **Điểm A**
    - Cấu trúc Dữ liệu & Giải thuật: **Điểm A**
    - Kiến trúc Máy tính & Hệ điều hành: **Điểm B+**
  - **Cam kết liêm chính học thuật:** Hiện tại tập trung toàn bộ cho chương trình đào tạo chính quy K24 và đồ án thực tế; mục chứng chỉ chính thức ghi nhận trung thực là *Chưa có*. Đang trong lộ trình ôn luyện chứng chỉ **TOEIC 650+** (Kế hoạch dự thi năm 2026).

---

## 2. KỸ NĂNG KỸ THUẬT PHÂN TẦNG (3 TIERS)

| Tầng năng lực | Chi tiết công nghệ & Mức độ thực tế |
|:---|:---|
| **Đã thực chiến trong đồ án (Used)** | Socket TCP/IP, Custom Binary Protocol, C# (.NET 8.0), Java SE 21 Core, Spring Boot 3 REST API, PHP thuần (PDO), MySQL 8.0 chuẩn 3NF, HTML5/CSS3/JavaScript ES6+, Git/GitHub Flow |
| **Đang rèn luyện chuyên sâu (Learning)** | C/C++ (Quản lý con trỏ, cấp phát bộ nhớ động Stack/Heap), Multithreading & Concurrency (Task.Run, ThreadPool, synchronized), Linux Bash CLI, 50+ bài toán DSA LeetCode |
| **Đang nghiên cứu & Định hướng (Researching)** | AI Agent Workflows (Gemini, Claude), Kiến trúc hệ thống doanh nghiệp lớn, Nền tảng điện toán song song & Kiến trúc phần cứng GPU NVIDIA |

---

## 3. DỰ ÁN KỸ THUẬT TIÊU BIỂU (CHUẨN HÓA 8 MỤC)

### 1. Remote Desktop Application (Client - Server)
- **Tổng quan bài toán:** Ứng dụng điều khiển máy tính từ xa Client - Server qua TCP/IP Socket, truyền phát màn hình và đồng bộ chuột/phím theo thời gian thực.
- **Quy mô nhóm:** Nhóm 6 thành viên (Môn Lập trình Mạng UTH - Đề tài `prj_UDM_06` • Đạt Điểm A).
- **Vai trò thực tế:** Lập trình viên Thiết kế Giao thức Mạng (Custom Binary Protocol Layer - branch `feature/protocol`).
- **Đóng góp trực tiếp:** Định nghĩa cấu trúc gói tin nhị phân (Type 1B + Length 4B + Payload NB), lập trình ServerSocket bắt tay TCP cổng 5000, xử lý phân mảnh và gộp mảng byte buffer stream nén `DeflateStream`; tách biệt I/O Worker Thread và UI Thread chống nghẽn giao diện WinForms.
- **Thách thức & Giải pháp:** Khắc phục nghẽn luồng UI WinForms bằng cách tách biệt Worker Thread và UI Invocation; Header Length Framing và bắt tay ACK chống trôi byte.
- **Công nghệ:** C# .NET 8.0, Socket TCP/IP, Custom Binary Protocol, DeflateStream, Multithreading Task.Run.
- **Kho lưu trữ:** [Source Code GitHub (duypham26/prj_UDM_06)](https://github.com/duypham26/prj_UDM_06)

### 2. FreshVend – Hệ Thống Máy Bán Nước Tự Động Thông Minh IoT
- **Tổng quan bài toán:** Hệ thống backend quản lý và vận hành máy bán hàng tự động bằng Java Spring Boot 3 kết nối vi điều khiển ESP32 giả lập Wokwi.
- **Quy mô nhóm:** Đồ án nhóm môn Lập trình Java OOP (UTH).
- **Vai trò thực tế:** Backend Developer phụ trách RESTful API & Máy trạng thái đơn hàng (Order State Machine).
- **Đóng góp trực tiếp:** Xây dựng RESTful API (/api/iot/telemetry) với Spring Boot 3, thiết kế DTO và Bean Validation chặn dữ liệu cảm biến dị thường, mô hình hóa máy trạng thái đơn hàng (`PENDING` → `DISPENSING` → `COMPLETED` / `REFUNDED`), đồng bộ trạng thái kho hàng và doanh thu về CSDL.
- **Thách thức & Giải pháp:** Xử lý Race Condition khi rớt mạng bằng Two-Phase State Machine kết hợp Heartbeat ping định kỳ 3s và tự động rollback/hoàn tiền nếu cảm biến nhả hàng không xác nhận.
- **Công nghệ:** Java Spring Boot 3, ESP32 Wokwi IoT, RESTful API, Order State Machine, Bean Validation.
- **Kho lưu trữ:** [Source Code GitHub (lenguyennhattruongg/freshvend-java)](https://github.com/lenguyennhattruongg/freshvend-java)

### 3. PetCare Vet Center – Hệ Thống Quản Lý Trung Tâm Thú Y
- **Tổng quan bài toán:** Website phòng khám và bệnh viện thú y trực tuyến toàn diện (Đề tài Nhóm 02 - Mã HP `012012103105`).
- **Quy mô nhóm:** Nhóm 02 gồm 6 sinh viên K24 UTH.
- **Vai trò thực tế:** Backend Developer phụ trách Kiến trúc Dữ liệu & Tính năng Cốt lõi của hệ thống.
- **Đóng góp trực tiếp:** Thiết kế lược đồ CSDL MySQL 8.0 chuẩn 3NF (12 bảng quan hệ), lập trình toàn bộ phân hệ Đặt lịch khám, Bệnh án thú cưng và Kê đơn thuốc bằng PHP thuần kết nối PDO Prepared Statements; xử lý Transaction ACID với khóa dòng `SELECT ... FOR UPDATE` ngăn chặn trùng lịch bác sĩ và kiểm soát quyền chống IDOR.
- **Thách thức & Giải pháp:** Xử lý hiện tượng Double-booking bằng Transaction ACID khóa dòng tại tầng CSDL; kiểm tra quyền sở hữu `owner_id == session.user_id` server-side trước khi truy xuất dữ liệu bệnh án.
- **Công nghệ:** PHP thuần PDO, MySQL 8.0 3NF, Transaction ACID, Anti Double-Booking, Anti-IDOR Security.

### 4. Group Portfolio Website Hub & Tuyến Metro T24 Cá Nhân
- **Tổng quan bài toán:** Nền tảng portfolio đa trang (Multi-Page Application) của Nhóm 02 UTH tối ưu bằng Vite.
- **Quy mô nhóm:** 6 sinh viên UTH K24.
- **Vai trò thực tế:** Tác giả thiết kế và phát triển toàn bộ không gian portfolio cá nhân Tuyến Metro T24 độc lập.
- **Đóng góp trực tiếp:** Xây dựng giao diện Metro T24 bằng HTML5/CSS3/JavaScript thuần không phụ thuộc thư viện, lập trình thanh ray tiến độ động, bộ lọc vé đồ án theo thời gian thực, modal soi vé chi tiết, chế độ Dark/Light theme và tối ưu hóa touch targets di động.
- **Công nghệ:** HTML5 Semantic, CSS3 Grid/Flex, JavaScript ES6+, Vite MPA Build Tool.
- **Kho lưu trữ:** [Source Code GitHub (nguyenxuanhieu2903/portfolio-group)](https://github.com/nguyenxuanhieu2903/portfolio-group)

---

## 4. BEYOND CODING & KỶ LUẬT KỸ THUẬT

- **Rèn luyện thể lực:** Chạy bộ đường trường đều đặn, rèn luyện sự bền bỉ thể chất và giữ sự tỉnh táo, minh mẫn khi đối mặt với các bài toán deadlock logic phức tạp.
- **Đam mê công nghệ:** Chủ động nghiên cứu tài liệu AI, Agentic Workflows (Gemini, Claude) và cách AI giải quyết các bài toán lớn trong kiến trúc doanh nghiệp; hướng tầm nhìn tới nền tảng phần cứng tăng tốc của **NVIDIA**.
- **Kỷ luật làm việc:** Tuân thủ nghiêm ngặt Git Feature Branch, Commit Convention chuẩn mực, tinh thần chủ động tìm hiểu root-cause và ham học hỏi công nghệ mới.
