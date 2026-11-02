# LÊ NGUYỄN NHẬT TRƯỜNG
**BACKEND SOFTWARE ENGINEER INTERN**

- 🏫 **Trường:** Đại học Giao thông Vận tải TP.HCM (UTH) — Lớp CNTT24A • MSSV: `082206010882`
- 📧 **Email:** [truonglnn0882@ut.edu.vn](mailto:truonglnn0882@ut.edu.vn)
- 📞 **Điện thoại / Zalo:** `0909 xxx 882 (Zalo)`
- 🐙 **GitHub:** [github.com/lenguyennhattruongg](https://github.com/lenguyennhattruongg)
- 🔗 **LinkedIn:** [linkedin.com/in/lenguyennhattruongg](https://linkedin.com/in/lenguyennhattruongg)
- 🌐 **Portfolio Live:** [Tuyến Metro T24 UTH](https://lenguyennhattruongg.github.io/Portfolio/members/le-nguyen-nhat-truong/)

---

## 1. HỌC VẤN & NỀN TẢNG HỌC THUẬT

- **Trường Đại học Giao thông Vận tải TP.HCM (UTH)** (2024 – Hiện tại)
  - Chuyên ngành: Công nghệ Thông tin • Lớp CNTT24A • Hệ Chính quy
  - **GPA Tích lũy:** `3.25 / 4.0` *(Xếp loại: Khá - Giỏi)*
  - **Điểm môn cốt lõi:**
    - Lập trình Hướng đối tượng Java (OOP): **Điểm A**
    - Mạng máy tính & Socket TCP/IP: **Điểm A**
    - Hệ quản trị CSDL & Chuẩn hóa 3NF MySQL: **Điểm A**
    - Cấu trúc Dữ liệu & Giải thuật: **Điểm A**
    - Kiến trúc Máy tính & Hệ điều hành: **Điểm B+**
  - **Ngoại ngữ:** Tiếng Anh kỹ thuật CNTT, mục tiêu đạt **TOEIC 650+** (Dự kiến thi Quý 4/2026).

---

## 2. KỸ NĂNG KỸ THUẬT (TECHNICAL SKILLS)

| Nhóm kỹ năng | Chi tiết |
|:---|:---|
| **Ngôn ngữ** | Java Core (OOP, Collections, Multithreading, Socket), C# (.NET 8.0), PHP thuần (PDO), SQL, HTML5/CSS3/JavaScript ES6+ |
| **Backend & Mạng** | TCP/IP Socket Programming, Custom Binary Protocol, Byte Buffer Stream, Spring Boot 3 RESTful API, Transaction ACID, Anti-IDOR Security |
| **Cơ sở Dữ liệu** | MySQL 8.0, Chuẩn hóa 3NF, Khóa ngoại (CASCADE/RESTRICT), Composite Indexing O(log N), Prepared Statements chống 100% SQLi |
| **Công cụ & Hệ thống** | Git & GitHub Flow, Postman, Wireshark, Wokwi ESP32 Simulator, Vite MPA, Linux Bash |

---

## 3. DỰ ÁN KỸ THUẬT TIÊU BIỂU (4 ĐỒ ÁN MÔN HỌC THỰC CHIẾN)

### 1. Remote Desktop Application (Client - Server)
- **Công nghệ:** C# .NET 8.0 • Socket TCP/IP • Multithreading • Task.Run
- **Môn học:** Lập trình Mạng (Đồ án `prj_UDM_06`) • [Source Code GitHub](https://github.com/duypham26/prj_UDM_06)
- **Vai trò:** Thiết kế kiến trúc Packet Protocol (Header Type, Length, Payload), lập trình ServerSocket bắt tay TCP cổng 5000, xử lý phân mảnh mảng byte buffer stream ảnh màn hình và điều khiển chuột/phím.
- **Điểm nổi bật:** Xử lý đa kết nối đồng thời với Task.Run, nén dữ liệu DeflateStream giảm 40% dung lượng byte buffer, truyền phát màn hình 25–30 FPS với độ trễ thấp (< 60ms).
- **Thách thức & Giải pháp:** Khắc phục nghẽn luồng UI WinForms bằng cách tách biệt Worker Thread và UI Invocation; Header Length Framing và bắt tay ACK chống trôi byte.

### 2. FreshVend – Hệ Thống Máy Bán Nước Tự Động Thông Minh IoT
- **Công nghệ:** Java Core • Spring Boot 3 • ESP32 Wokwi • REST API
- **Môn học:** Lập trình Java OOP • [Source Code GitHub](https://github.com/lenguyennhattruongg/freshvend-java)
- **Vai trò:** Thiết kế kiến trúc Backend RESTful API và máy trạng thái đơn hàng (PENDING → DISPENSING → COMPLETED / REFUNDED), kết nối vi điều khiển ESP32 giả lập Wokwi.
- **Điểm nổi bật:** Xử lý 100+ req/s với thời gian phản hồi API < 45ms (Thunder Client 200 OK • 6.5ms); đồng bộ tức thời số lượng tồn kho và doanh thu về MySQL.
- **Thách thức & Giải pháp:** Xử lý Race Condition khi rớt mạng bằng Heartbeat ping định kỳ 3s và tự động rollback/hoàn tiền nếu cảm biến nhả hàng không xác nhận.

### 3. PetCare Vet Center – Hệ Thống Quản Lý Trung Tâm Thú Y
- **Công nghệ:** PHP thuần • PDO • MySQL 8.0 3NF • Apache / XAMPP
- **Môn học:** Lập trình Web Nhóm 2 (Mã HP `012012103105`) • Vai trò: Backend Developer 1
- **Vai trò:** Thiết kế lược đồ CSDL MySQL 3NF (12 bảng), viết phân hệ đặt lịch khám, hồ sơ bệnh án và đơn thuốc thú y.
- **Bảo mật & Tối ưu:** 100% Prepared Statements qua PDO, Transaction ACID với `SELECT ... FOR UPDATE` chống trùng lịch khám (Double-booking) và kiểm tra quyền sở hữu chống IDOR.

### 4. Group Portfolio Website Hub & Tuyến Metro T24 Cá Nhân
- **Công nghệ:** HTML5 Semantic • CSS3 Grid/Flex • JavaScript ES6+ • Vite MPA
- **Nền tảng:** Cổng Nhóm 02 UTH • [Source Code GitHub](https://github.com/nguyenxuanhieu2903/portfolio-group)
- **Vai trò:** Xây dựng toàn bộ không gian portfolio cá nhân Tuyến Metro T24 UTH, tích hợp bộ lọc vé đồ án thời gian thực, modal soi vé, responsive không tràn ngang và Dark/Light mode.

---

## 4. CHỨNG CHỈ & KỶ LUẬT KỸ THUẬT

- **Chứng chỉ & Kỹ năng:** Git & GitHub Professional Workflow; Linux Command Line & Bash Basics; LeetCode 50+ DSA Solutions.
- **Kỷ luật làm việc:** Tuân thủ nghiêm ngặt Git Feature Branch, Commit Convention chuẩn mực, tinh thần chủ động tìm hiểu root-cause và ham học hỏi công nghệ mới.
