# PRODUCT_SPEC.md

# Đặc tả sản phẩm & kỹ thuật — Group Portfolio Website

| Thuộc tính | Giá trị |
|---|---|
| Phiên bản | 1.2 |
| Trạng thái | Bản cập nhật theo các quyết định đã xác nhận; một số thông tin tích hợp còn mở |
| Môn học | Lập trình Web — bài giữa kỳ |
| Sản phẩm | Website portfolio nhóm gồm 1 trang chung và 6 portfolio cá nhân |
| Công nghệ nền | HTML5, CSS3, JavaScript thuần, npm, Vite |
| Thư viện giao diện | Bootstrap 5 / Bootstrap Icons theo thống nhất của nhóm; không bắt buộc mọi portfolio có giao diện giống nhau |
| Triển khai dự kiến | GitHub Pages |
| Hạn nội bộ | 25/10/2026 |
| Hạn giảng viên | 28/10/2026 |

> **Nguyên tắc:** Đây là tài liệu mô tả sản phẩm cần xây dựng. Quy trình triển khai nằm trong `IMPLEMENTATION_PLAN.md`. Nếu rubric chính thức của giảng viên khác với tài liệu này, rubric chính thức được ưu tiên và tài liệu phải được cập nhật.

---

## 1. Tổng quan sản phẩm

### 1.1. Mục tiêu

Xây dựng một website portfolio nhóm để giới thiệu sáu thành viên. Từ trang chủ chung, người xem có thể mở portfolio riêng của từng thành viên và tìm hiểu thông tin, mục tiêu, kỹ năng, học tập/hoạt động, dự án và các nội dung cá nhân phù hợp.

Sản phẩm cần:

- Đáp ứng các mục nội dung và kỹ thuật trong rubric giữa kỳ.
- Có giao diện dễ sử dụng trên điện thoại và máy tính.
- Có JavaScript tương tác thực sự, không chỉ là hiệu ứng trang trí.
- Có mã nguồn dễ đọc, cấu trúc nhất quán và thuận tiện cho sáu người cùng đóng góp.
- Có thể build thành website tĩnh và triển khai trên GitHub Pages.

### 1.2. Thành phần sản phẩm

1. **Trang chủ nhóm:** giới thiệu ngắn gọn nhóm và cung cấp liên kết đến sáu portfolio.
2. **Sáu portfolio cá nhân:** mỗi thành viên chịu trách nhiệm nội dung, thiết kế và kiểm tra trang của mình.
3. **Tài nguyên:** ảnh đại diện, ảnh dự án, icon và các tài nguyên được phép sử dụng.
4. **Tài liệu:** đặc tả sản phẩm, kế hoạch triển khai và README hướng dẫn chạy project.
5. **Bản triển khai:** website đã build và được kiểm tra trên GitHub Pages.

### 1.3. Danh sách thành viên và slug đã chốt

| STT | Thành viên | Slug dự kiến |
|---:|---|---|
| 1 | Nguyễn Xuân Hiếu | `nguyen-xuan-hieu` |
| 2 | Lê Nguyễn Nhật Trường | `le-nguyen-nhat-truong` |
| 3 | Nguyễn Thị Thảo Như | `nguyen-thi-thao-nhu` |
| 4 | Nguyễn Phạm Y Huỳnh | `nguyen-pham-y-huynh` |
| 5 | Lê Hữu Châu | `le-huu-chau` |
| 6 | Nguyễn Anh Thư | `nguyen-anh-thu` |

Slug là tên thư mục và một phần của URL. Nhóm cần chốt slug trước khi tạo liên kết trên trang chủ; không đổi tùy tiện sau khi tích hợp.

### 1.4. Người dùng mục tiêu

- Giảng viên chấm bài.
- Các thành viên trong nhóm và bạn học.
- Người xem portfolio công khai, bao gồm nhà tuyển dụng tiềm năng.
- Người truy cập bằng điện thoại, máy tính bảng và máy tính.

---

## 2. Phạm vi và mức độ ưu tiên

### 2.1. P0 — Bắt buộc để nghiệm thu

Các mục dưới đây được tổng hợp từ yêu cầu bài đã trao đổi. Trước khi nghiệm thu, nhóm phải đối chiếu lại với rubric/file đề bài chính thức để bảo đảm không bỏ sót tiêu chí nào.

| Mã | Yêu cầu | Cách xác nhận đạt |
|---|---|---|
| P0-01 | Có trang chủ nhóm | Trang tải được, giới thiệu nhóm và có liên kết đến đủ 6 portfolio |
| P0-02 | Navbar/banner | Điều hướng rõ ràng và có khu vực giới thiệu nổi bật |
| P0-03 | Giới thiệu cá nhân | Mỗi portfolio có phần giới thiệu chủ nhân |
| P0-04 | Mục tiêu | Trình bày mục tiêu học tập/nghề nghiệp phù hợp |
| P0-05 | Kỹ năng | Kỹ năng được nhóm hợp lý; không tự nhận mức thành thạo chưa xác nhận |
| P0-06 | Học tập/hoạt động | Có thông tin học tập, hoạt động hoặc kinh nghiệm phù hợp |
| P0-07 | Dự án | Mỗi portfolio có ít nhất 2 dự án/sản phẩm theo yêu cầu bài; nếu thiếu, cần báo nhóm để xử lý trung thực |
| P0-08 | Chứng chỉ/giải thưởng/sở thích | Có nội dung phù hợp; không bịa chứng chỉ hoặc giải thưởng |
| P0-09 | HTML ngữ nghĩa | Dùng các phần tử semantic hợp lý như `header`, `nav`, `main`, `section`, `footer` |
| P0-10 | CSS layout | Có sử dụng Flexbox và/hoặc CSS Grid phù hợp |
| P0-11 | Responsive | Nội dung và điều hướng dùng được trên màn hình nhỏ và lớn |
| P0-12 | CSS effects | Có hiệu ứng phù hợp, không làm giảm khả năng đọc hoặc sử dụng |
| P0-13 | JavaScript DOM/Event | Có thao tác DOM và xử lý sự kiện phù hợp |
| P0-14 | Tương tác JavaScript | Mỗi portfolio có ít nhất 2 tính năng tương tác hoạt động thực tế, theo rubric đã xác nhận |
| P0-15 | Form liên hệ | Có kiểm tra dữ liệu phía trình duyệt và thông báo dễ hiểu; không tuyên bố gửi email thật nếu chưa tích hợp dịch vụ |
| P0-16 | Chất lượng mã | Tên file/biến rõ ràng, code dễ đọc, không có lỗi nghiêm trọng |
| P0-17 | Liên kết | Link nội bộ, link đến dự án và tài nguyên hoạt động đúng |
| P0-18 | Triển khai | Website truy cập được trên GitHub Pages và các trang không lỗi đường dẫn |

### 2.2. Ánh xạ rubric và bằng chứng nghiệm thu

Bảng này dùng để theo dõi tiến độ. Điểm số bên dưới phản ánh rubric đã trao đổi trước đó; hãy kiểm tra lại file đề chính thức trước khi chốt.

| Nhóm tiêu chí | Điểm tham chiếu | Bằng chứng cần có | Trạng thái ban đầu |
|---|---:|---|---|
| Nội dung portfolio | 3.5 | Đủ các phần nội dung bắt buộc, thông tin chính xác | Chưa nghiệm thu |
| HTML/CSS | 2.5 | HTML semantic, layout, responsive, hiệu ứng | Chưa nghiệm thu |
| JavaScript/tương tác | 2.0 | Tối thiểu 2 tương tác thực tế, DOM/Event, kiểm tra form | Chưa nghiệm thu |
| Chất lượng mã | 1.0 | Cấu trúc rõ, tên có ý nghĩa, không lỗi nghiêm trọng | Chưa nghiệm thu |
| Sáng tạo | 1.0 | Thiết kế có dấu ấn riêng, phù hợp và dễ dùng | Chưa nghiệm thu |

**Cách sử dụng:** mỗi mục P0 cần có người kiểm tra, kết quả kiểm tra và ghi chú lỗi. Không đánh dấu đạt chỉ vì file đã được tạo.

### 2.3. P1 — Làm sau khi P0 ổn định

Chỉ triển khai nếu nhóm đã đáp ứng P0 và còn thời gian:

- Dark/Light Mode.
- Lọc dự án theo công nghệ hoặc loại dự án.
- Nút quay lại đầu trang (đã chọn cho portfolio Hiếu; với các portfolio khác là tùy chọn).
- Hiệu ứng xuất hiện khi cuộn ở mức nhẹ.
- Nút sao chép email.
- Cải thiện metadata, accessibility và hiệu năng.
- Tối ưu ảnh và nội dung chia sẻ.

### 2.4. Ngoài phạm vi MVP

Không cần xây dựng các phần sau để hoàn thành bài ban đầu:

- Backend hoặc cơ sở dữ liệu riêng (Website triển khai dưới dạng Static Site trên GitHub Pages).
- Đăng nhập / đăng ký tài khoản.
- Hệ thống CMS quản lý nội dung động.
- Form gửi email tự động qua backend (chỉ dùng xử lý client-side và mở ứng dụng mail qua `mailto`).
- Các thư viện animation quá nặng gây ảnh hưởng hiệu năng như GSAP, Three.js hoặc AOS.
---

## 3. Nội dung và trải nghiệm người dùng

### 3.1. Trang chủ nhóm

Trang chủ tối thiểu cần có:

- Tên/tiêu đề website nhóm.
- Phần giới thiệu ngắn về nhóm hoặc mục tiêu website.
- Danh sách/thẻ giới thiệu sáu thành viên.
- Liên kết rõ ràng để mở portfolio của từng thành viên.
- Footer có thông tin phù hợp.

Không cần ép các portfolio cá nhân dùng cùng một thiết kế. Vai trò của trang chủ là tạo điểm vào thống nhất và giúp người xem tìm đúng trang.

### 3.2. Nội dung tối thiểu của mỗi portfolio

Mỗi thành viên cần chuẩn bị nội dung thật cho các phần:

1. Navbar và banner/hero.
2. Giới thiệu bản thân.
3. Mục tiêu học tập hoặc nghề nghiệp.
4. Kỹ năng.
5. Học tập, hoạt động hoặc kinh nghiệm.
6. Ít nhất hai dự án/sản phẩm theo yêu cầu đề bài.
7. Chứng chỉ, giải thưởng, sở thích hoặc nội dung thay thế phù hợp khi không có chứng chỉ/giải thưởng.
8. Liên hệ và các liên kết công khai đã xác nhận.

### 3.3. Quy tắc nội dung

- Không bịa bằng cấp, chứng chỉ, giải thưởng, kinh nghiệm, số liệu hoặc liên kết.
- Không mô tả dự án đang phát triển như đã hoàn thành.
- Chỉ công khai thông tin liên hệ mà thành viên đồng ý đưa lên website.
- Nếu chưa có ảnh thật, dùng placeholder có chủ đích; không giả mạo ảnh cá nhân.
- Nội dung tiếng Việt hoặc song ngữ được phép, miễn là nhất quán và dễ đọc.
- Không sử dụng hình ảnh, icon, font hoặc nội dung có bản quyền theo cách không được phép.

### 3.4. Thông tin đã xác nhận cho portfolio Nguyễn Xuân Hiếu

Thông tin dưới đây áp dụng cho portfolio của Hiếu; không phải mẫu bắt buộc về nội dung hoặc thiết kế cho năm thành viên còn lại.

**Thông tin cá nhân và định hướng**
- Họ tên: Nguyễn Xuân Hiếu.
- Chức danh: `Full-Stack Web Developer & Network Administrator`.
- Tagline: “Xây dựng ứng dụng toàn diện từ giao diện người dùng, logic hệ thống cho đến hạ tầng mạng vững chắc.”
- Định hướng nghề nghiệp: tập trung Backend trước, sau đó mở rộng sang Full-Stack.
- About Me cần thể hiện tư duy hệ thống, học qua dự án, kinh nghiệm hỗ trợ/quản lý phòng máy tại UTH Campus 2 và vai trò điều phối nhóm sáu thành viên.
- Câu trích dẫn: `Think in systems. Build with purpose. Deliver with discipline.`

**Thống kê Hero**
- `02` — Dự án tiêu biểu.
- `03` — Năm nền tảng CNTT.
- `02` — Lĩnh vực chuyên môn.
- `10+` — Công nghệ & Công cụ.

**Kỹ năng đã cung cấp**
- Ngôn ngữ/nền tảng Web: C/C++, Java, Python, PHP, JavaScript, HTML5/CSS3.
- Framework: Spring Boot, Django, React, Vue.js.
- Cơ sở dữ liệu: MySQL, Microsoft SQL Server, Redis.
- Công cụ/DevOps: Docker, Git/GitHub.
- Mạng/hệ thống: Cisco Packet Tracer, GNS3, Linux/Windows Server.
- Không tự gán cấp độ, phần trăm thành thạo hoặc khẳng định mọi công nghệ đều đã được làm chủ.

**Dự án 1 — HIUNXSTAR**
- Tên hiển thị: `HIUNXSTAR — Hệ thống quản lý và đặt vé xem phim trực tuyến`.
- Trạng thái: đã hoàn thành; demo trực tuyến chưa có.
- Vai trò: Full-Stack Developer.
- Công nghệ: PHP thuần theo MVC/3-Tier, Microsoft SQL Server, HTML5, CSS3, JavaScript.
- Chức năng đã cung cấp: danh sách phim, lịch chiếu, chọn ghế và đặt vé; quản trị danh mục phim, rạp/phòng chiếu, lịch chiếu và thống kê doanh thu.
- Kỹ thuật Hiếu xác nhận đã triển khai và có thể giải thích: chuẩn hóa 3NF, giao dịch ACID, xử lý đồng thời/deadlock và cập nhật ghế realtime.
- Source: `https://github.com/nguyenxuanhieu2903/hiunx-cinema-manager`.

**Dự án 2 — Website Trung tâm Thú y**
- Tên hiển thị: `Website Trung tâm Thú y — Hệ thống quản lý thú cưng, đặt lịch khám, bệnh án điện tử và hỗ trợ mua sắm sản phẩm/dịch vụ`.
- Trạng thái: sản phẩm đang phát triển; Backend đã hoàn thành theo phạm vi hiện tại.
- Vai trò: Leader / Backend & DevOps.
- Công nghệ: Python, Django, MySQL 8.0, Redis, Celery, Docker, Docker Compose.
- Các chức năng đã nêu: đặt lịch khám, bệnh án điện tử, đặt hàng COD, tác vụ nền và thông báo. Khi trình bày, cần phân biệt tính năng đã kiểm thử với phần đang hoàn thiện; không tự khẳng định tất cả tính năng đã nghiệm thu nếu chưa có bằng chứng.
- Source: `https://github.com/nguyenxuanhieu2903/veterinary-center-web`.
- Demo: chưa có; sẽ cập nhật sau.

**Hoạt động, liên hệ và tài nguyên**
- Kinh nghiệm liên quan: hỗ trợ kỹ thuật/quản lý phòng máy tại UTH Campus 2; hỗ trợ bảo trì mạng nội bộ và các kỳ thi/sự kiện của trường. Không tự đặt chức danh chính thức chưa được xác nhận.
- GitHub: `https://github.com/nguyenxuanhieu2903`.
- Email: `nguyenxuanhieu2903@gmail.com`.
- LinkedIn: chưa cung cấp, không tạo URL giả.
- Ảnh chân dung thật: Hiếu sẽ tự thêm vào thư mục `members/nguyen-xuan-hieu/images/`.
- Demo HIUNXSTAR và demo Website Thú y: chưa cung cấp.

---

## 4. Định hướng thiết kế

### 4.1. Nguyên tắc Thiết kế & Trợ năng (UX & Accessibility Principles)

- **Độ tương phản & Khả năng đọc (WCAG 2.1 AA):** Đảm bảo tỷ lệ tương phản tối thiểu 4.5:1 đối với văn bản thường và 3.0:1 đối với văn bản cỡ lớn / các thành phần tương tác UI. Điều hướng giao diện trực quan, mạch lạc.
- **Tính nhất quán hệ thống:** Mỗi portfolio thành viên có thể chọn nét cá tính riêng nhưng phải tuân thủ nghiêm ngặt các bộ quy chuẩn chung về màu sắc chủ đạo, khoảng cách (spacing grid) và typography toàn trang.
- **Tối ưu chuyển động (Motion & Performance):** Tránh lạm dụng animation phức tạp, hiệu ứng parallax quá mạnh hoặc các hiệu ứng chuyển động liên tục gây mỏi mắt/chóng mặt.
- **Tương tác Đa nền tảng (Mobile-First Touch):** Không để bất kỳ nội dung hay chức năng quan trọng nào chỉ xuất hiện khi hover; đảm bảo tất cả phần tử tương tác hoàn hảo trên màn hình cảm ứng di động.
- **Tôn trọng Trợ năng Hệ thống (`prefers-reduced-motion`):** Tự động tắt hoặc đơn giản hóa tối đa các hiệu ứng chuyển động khi người dùng bật chế độ giảm chuyển động trên hệ điều hành (OS).
- **Trạng thái Đa dấu hiệu (Multi-cue Status):** Không dùng màu sắc làm dấu hiệu duy nhất để thể hiện trạng thái (luôn bổ sung icon, hình dạng hoặc nhãn văn bản đi kèm).
- **Hỗ trợ Điều hướng Bàn phím (Keyboard & Focus Navigation):** Mọi nút bấm, liên kết và thẻ tương tác phải có lớp viền nhận diện (Focus Ring) rõ ràng khi duyệt bằng phím `Tab`, hỗ trợ phím `Esc` để đóng Modal/Popup.
- **Phản hồi Thị giác Trực tiếp (Immediate Visual Feedback):** Mọi thao tác từ người dùng (gửi form, click nút, copy thông tin) đều phải có thông báo phản hồi ngay lập tức (Toast message, hiệu ứng đổi trạng thái nút).

### 4.2. Định hướng Thiết kế & Kỹ thuật Chốt cho Hiếu (General Software Engineer Focus)

Phong cách: Modern Creative & Spatial Depth Portfolio
(Bố cục đan lớp không gian thanh lịch của Perry Wang kết hợp triết lý Tạp chí/Triển lãm tĩnh lặng của Gabriel Valdivia; sử dụng bảng màu Jade Pebble Morning dịu mắt, tương phản chuẩn WCAG AAA; không dùng giao diện terminal hay hiệu ứng Cyberpunk).

1. Bảng màu & Quy chuẩn Tương phản (Jade Pebble Morning System)
- #E6E6E6 (Trắng ngà đá cuội): Nền tổng thể toàn trang (Canvas Base); Màu chữ chính trên các khối nền tối.
- #404E3B (Xanh rêu đậm): Văn bản chính (Primary Text), Tiêu đề H1/H2, Nút chính (CTA), Khối Quote điểm nhấn (Tương phản 7.2:1 - Chuẩn WCAG AAA).
- #BAC8B1 (Xanh sương mù): Nền thẻ Card (Elevated Layers), nền section xen kẽ, khung quote highlight.
- #7B9669 (Xanh lá xám/Sage): Điểm nhấn chính (Accent Color): Viền hover card, Custom Cursor, số đếm 01/02, status badge "Open to Work", icon sáng. (Không dùng làm chữ nhỏ).
- #6C8480 (Xanh xám đá phiến): Đường viền phân lớp (1px Border), icon phụ, văn bản mô tả phụ (Secondary Text).

2. Cấu trúc Layout & Mô tả Chi tiết từng Section
Thứ tự cuộn: Hero ➔ About ➔ Skills ➔ Projects ➔ Process ➔ Team Hub ➔ Contact

- Navigation: Navbar cố định với hiệu ứng kính mờ (backdrop-filter: blur(12px)), tích hợp thanh tiến trình cuộn trang (Scroll Progress Indicator) và ScrollSpy tự động nhận diện mục menu đang xem.

- Hero Section: 
  + Typography chìm: Chữ `PORTFOLIO` cỡ siêu lớn (10rem+, opacity 0.08) nằm ở lớp nền dưới cùng.
  + Ảnh chân dung thật (bo góc 24px) đặt đè nhẹ lên lớp chữ nền.
  + Cột trái: Tagline Kỹ sư Phần mềm tích hợp hiệu ứng gõ chữ (Typewriter Effect) + Bộ đôi nút thao tác `[Tải CV (.PDF)]` & `[Khám phá Dự án ↓]`.
  + Cột phải: 4 khối thống kê thực tế (Dự án hoàn thành, Dòng code sạch, GPA/Giải thưởng, Tech Stack) tích hợp hiệu ứng đếm số tự động (Number Counter Animate).

- About Section:
  + Bố cục dạng Tạp chí (Editorial 2 Cột): Cột trái giới thiệu định hướng sự nghiệp Kỹ sư phần mềm (tập trung Clean Code & Kiến trúc mở rộng); Cột phải dạng Quick Specs Grid (Trường HUTECH, Chứng chỉ kỹ thuật, Địa điểm và Badge `🟢 Available for Hire`).

- Skills Section:
  + Phân nhóm kỹ năng chuyên môn: Backend (Python/Django, Node.js), Frontend (HTML/Tailwind/JS, React), Database & Async (MySQL, Redis, Celery), DevOps & Tools (Docker, Git Flow, Nginx). Hiển thị dưới dạng thẻ Badges có tương tác hover viền sáng `#7B9669`.

- Projects Section (Project Cards Grid): 
  + Bố cục dạng Lưới 2 Cột với số lớn 01, 02 giới thiệu các sản phẩm tiêu biểu của nhóm/cá nhân.
  + Mỗi card chứa: Tên dự án, vai trò (Full-stack / Lead), Tech Pills, status badge [🟢 Live Demo].
  + Hiệu ứng Spotlight Hover: Viền sáng theo tọa độ chuột. Click card bật Modal Dialog (hỗ trợ Tab xem Kiến trúc hệ thống, ERD và link Live Demo/GitHub).

- Work Process Section (Quy trình SDLC 5 Bước Chuẩn Kỹ nghệ Phát triển Website):
  Bố cục 2 cột Tạp chí chuyên nghiệp (Editorial Layout):
  + Cột trái - Timeline 5 bước SDLC (Đường kẻ SVG tự động vẽ nối các bước theo đà cuộn chuột):
    • 01. Specialization & Analysis: Xác định mục tiêu website, phân tích đối tượng người dùng, đặc tả yêu cầu chức năng và xây dựng sơ đồ luồng nghiệp vụ (User Flow).
    • 02. System & UI Design: Thiết kế sơ đồ kiến trúc cơ sở dữ liệu (ERD), xác định mô hình MVT/MVC, xây dựng Wireframe/UI Design System chuẩn Responsive và thiết lập quy trình Git Flow.
    • 03. Development: Lập trình cấu trúc mã nguồn theo chuẩn Clean Code, phát triển các module dùng chung, tích hợp xử lý tác vụ ngầm và xây dựng tính năng theo phân quyền.
    • 04. Testing & Optimization: Kiểm thử chức năng, kiểm tra bảo mật & phân quyền URL, đo lường tốc độ tải trang, tối ưu câu lệnh truy vấn CSDL và tinh chỉnh giao diện đa thiết bị.
    • 05. Deployment & Operations: Đóng gói ứng dụng dạng Container, cấu hình tên miền & chứng chỉ bảo mật HTTPS/SSL, triển khai lên máy chủ VPS/Cloud và khởi tạo dữ liệu mẫu (Seed Data).

  + Cột phải - Highlight Quote Card: Khối Card bo góc dùng nền tối #404E3B, chữ #E6E6E6 và ngoặc kép lớn màu #7B9669 với tuyên ngôn: 
    "Phát triển phần mềm chuẩn mực là tuân thủ chặt chẽ quy trình từ Đặc tả, Thiết kế, Lập trình đến Kiểm thử và Triển khai."

- Team Hub Section: Lưới 6 thẻ thành viên nhóm phát triển (hiển thị Avatar, Tên, Chuyên môn Backend/Frontend/QA, Status Tag và Nút xem Portfolio từng thành viên).

- Contact & Footer: Form liên hệ tối giản + Tiện ích 1-Click Copy Email (kèm Toast thông báo mượt) + Nút Scroll-to-top cố định.

3. Quy chuẩn Kỹ thuật, Thư viện & Hiệu năng Code (Tech Stack & Libraries)

- Framework & Core UI:
  - HTML5 Semantic + Tailwind CSS (Cấu hình Custom Theme theo hệ màu Jade Pebble Morning).
  - JavaScript (ES6+) / ReactJS hoặc Next.js (Tùy chọn cấu trúc dự án).

- Thư viện Hiệu ứng & Tương tác (Lightweight Visual Libraries):
  - Motion One / Framer Motion: Xử lý chuyển động cuộn (Scroll Reveal), biến đổi thẻ Card và hiệu ứng mượt mà (Thay thế hoàn hảo cho GSAP/AOS nặng nề).
  - Lenis Scroll: Tạo trải nghiệm cuộn mượt (Smooth Scrolling) cao cấp đúng tinh thần Perry Wang.
  - Typed.js: Tạo hiệu ứng gõ chữ linh hoạt (Typewriter Effect) ở phần Hero Section.
  - Lucide Icons: Bộ icon nét mảnh tối giản chuẩn phong cách Editorial của Gabriel Valdivia.

- Responsive & Accessibility (A11y):
  - Tương thích 100% trên mọi kích thước màn hình (Mobile < 768px, Tablet 768px - 1024px, Desktop > 1024px).
  - Tôn trọng thiết lập hệ thống `@media (prefers-reduced-motion: reduce)`: Tự động tắt / giảm thiểu các hiệu ứng chuyển động khi người dùng yêu cầu để tránh gây chóng mặt.
  - Chuẩn Accessibility: Tích hợp đầy đủ thuộc tính ARIA (`role="dialog"`, `aria-label`, `aria-expanded`), Tab Focus Ring sắc nét và hỗ trợ phím `Esc` để đóng Modal.

### 4.3. Thứ tự section portfolio Hiếu

`Hero → About → Skills → Projects → Process → Team Hub → Contact`


---

## 5. Công nghệ và vai trò

| Công nghệ | Vai trò | Quy ước & Tiêu chuẩn Kỹ thuật |
| --- | --- | --- |
| **HTML5 Semantic** | Cấu trúc nội dung chuẩn SEO & Trợ năng | Sử dụng chuẩn các thẻ semantic (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`); tích hợp đầy đủ thuộc tính ARIA (`role="dialog"`, `aria-label`, `aria-expanded`). |
| **Tailwind CSS / CSS Custom Variables** | Hệ thống Style, Bố cục Grid & Responsive | Cấu hình Custom Theme theo hệ màu *Jade Pebble Morning* (`#404E3B`, `#BAC8B1`, `#7B9669`, `#E6E6E6`, `#6C8480`); tuyệt đối không hardcode mã màu rời rạc. |
| **JavaScript (ES6+)** | Thao tác DOM, Xử lý Event & Logic Modal | Viết Vanilla JS mô-đun hóa (ES Modules); tối ưu hiệu năng render (Intersection Observer cho ScrollSpy & Counter). |
| **Vite** | Bundler, Development Server & Build Tool | Cấu hình `vite.config.js` hỗ trợ Multi-page App (build ra nhiều trang HTML riêng cho từng thành viên). |
| **npm** | Quản lý Dependencies & Build Scripts | Thống nhất package manifest (`package.json`) và lockfile (`package-lock.json`) trên toàn nhóm. |
| **Lenis Scroll & Motion One** *(Lightweight Visual Libs)* | Trải nghiệm cuộn mượt & Micro-interactions | Dùng Lenis cho Smooth Scroll; Motion One / Framer Motion cho Scroll Reveal. Tự động tắt khi gặp `@media (prefers-reduced-motion)`. |
| **Typed.js** | Hiệu ứng Typewriter | Chỉ ứng dụng cho Tagline ở Hero Section để tạo điểm nhấn thị giác. |
| **Lucide Icons** | Hệ thống Icon nét mảnh | Dùng bộ icon tối giản dạng SVG/Stroke đồng bộ toàn bộ giao diện; tránh dùng icon hỗn hợp không rõ nguồn. |
| **Git & GitHub** | Quản lý mã nguồn & Phối hợp nhóm | Tuân thủ Git Flow (nhánh `main`, `develop`, `feature/*`); 100% code vào `develop` phải qua Pull Request (PR) & Code Review. |
| **GitHub Pages** | Hosting triển khai Website tĩnh | Tự động hóa deploy từ nhánh `main`; kiểm tra kỹ đường dẫn tương đối (Relative paths) của Assets sau khi build. |
### 5.1. Phân biệt npm và Vite

- **npm** là công cụ quản lý package và chạy scripts được khai báo trong `package.json`.
- **Vite** là công cụ phục vụ phát triển và build mã nguồn web.
- `npm run dev` chạy server phát triển.
- `npm run build` tạo bản build để triển khai.
- GitHub Pages phục vụ bản website tĩnh đã build; nó không chạy backend.

### 5.2. Quy ước dependency

- Không mỗi thành viên tự sửa `package.json` theo cách riêng.
- Nếu cần thêm dependency, đề xuất trong nhóm, kiểm tra mức cần thiết rồi mới cài.
- Commit `package-lock.json` để các máy cài dependency nhất quán.
- Không commit `node_modules/` hoặc thông tin bí mật.
- Các thành viên không bắt buộc dùng Bootstrap ở mọi thành phần nếu lựa chọn đó làm hạn chế thiết kế, nhưng phải bảo đảm build chung hoạt động.

---

## 6. Cấu trúc thư mục mục tiêu

Để người mới dễ hiểu, HTML, CSS, JavaScript và ảnh của mỗi thành viên được đặt gần nhau. Cấu trúc dưới đây là **mục tiêu đề xuất**, cần được kiểm tra với repository thực tế trước khi tạo hoặc di chuyển file.

```text
portfolio-group/
├── PRODUCT_SPEC.md
├── IMPLEMENTATION_PLAN.md
├── README.md
├── package.json
├── package-lock.json
├── vite.config.js
├── index.html
├── group.css
├── group.js
├── members/
│   ├── nguyen-xuan-hieu/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── le-nguyen-nhat-truong/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── nguyen-thi-thao-nhu/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── nguyen-pham-y-huynh/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   ├── le-huu-chau/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│   │   └── images/
│   └── nguyen-anh-thu/
│       ├── index.html
│       ├── style.css
│       ├── script.js
│       └── images/
├── public/
│   └── images/
│       └── group/
└── .github/
    └── workflows/
        └── deploy.yml
```

### 6.1. Ý nghĩa các file/thư mục chính

| Đường dẫn | Trách nhiệm |
|---|---|
| `index.html` | Trang chủ nhóm |
| `group.css`, `group.js` | CSS/JS của trang chủ nhóm |
| `members/<slug>/index.html` | Trang HTML của một thành viên |
| `members/<slug>/style.css` | CSS riêng của thành viên đó |
| `members/<slug>/script.js` | JavaScript riêng của thành viên đó |
| `members/<slug>/images/` | Ảnh chỉ dùng trong portfolio đó |
| `public/images/group/` | Tài nguyên tĩnh dùng chung cho trang nhóm |
| `package.json` | Scripts và dependencies của project |
| `package-lock.json` | Khóa phiên bản dependencies được npm giải quyết |
| `vite.config.js` | Cấu hình build nhiều trang |
| `.github/workflows/deploy.yml` | Workflow triển khai tự động nếu nhóm bật GitHub Actions |

### 6.2. Quy tắc đường dẫn

- Dùng đường dẫn tương đối phù hợp với vị trí của từng file HTML.
- Từ `members/<slug>/index.html`, file CSS/JS cùng thư mục có thể tham chiếu bằng `./style.css` và `./script.js`.
- Ảnh riêng của thành viên có thể tham chiếu từ trang đó bằng `./images/ten-anh.jpg`.
- Đường dẫn cần được kiểm tra sau `npm run build`; không mặc định rằng đường dẫn chạy tốt ở máy local sẽ tự chạy đúng trên GitHub Pages.
- Cấu hình Vite phải hỗ trợ nhiều file HTML đầu vào và `base` phù hợp với URL GitHub Pages thực tế. Giá trị cuối cùng phụ thuộc repository và URL triển khai.

---

## 7. Yêu cầu kỹ thuật và chất lượng

### 7.1. Responsive

Kiểm tra ít nhất các tình huống:

- Màn hình điện thoại hẹp.
- Điện thoại ngang hoặc tablet.
- Laptop/desktop.
- Nội dung dài, tiêu đề dài và ảnh có tỷ lệ khác nhau.

Không để tràn ngang, chữ quá nhỏ, nút quá sát nhau hoặc menu không thể sử dụng bằng cảm ứng.

### 7.2. JavaScript, song ngữ và form

- Tương tác phải có mục đích và hoạt động thật; portfolio Hiếu có các hiệu ứng/điều khiển đã nêu ở mục 4.2.
- Portfolio Hiếu hỗ trợ tiếng Việt và tiếng Anh cho toàn bộ section. JavaScript chuyển nội dung ngôn ngữ ngay trên trang, không tải lại trang; cần bảo đảm nút chuyển ngôn ngữ có trạng thái dễ nhận biết.
- Có trạng thái/feedback dễ hiểu khi người dùng thao tác.
- Contact form của Hiếu kiểm tra các trường bằng JavaScript. Nếu dữ liệu không hợp lệ, hiển thị lỗi ở trường tương ứng; nếu hợp lệ, thông báo rằng ứng dụng email sẽ mở qua `mailto` để người dùng tự gửi.
- `mailto` không phải dịch vụ gửi email tự động. Không hiển thị thông báo rằng email đã được gửi thành công.
- Kiểm tra dữ liệu phía client không thay thế biện pháp bảo mật phía server nếu sau này có backend.
- Không để lỗi JavaScript nghiêm trọng trong Console.

### 7.3. Accessibility cơ bản

- Ảnh có `alt` phù hợp; ảnh trang trí có thể dùng `alt=""`.
- Form có label hoặc tên truy cập phù hợp.
- Các nút và liên kết có mục đích rõ ràng.
- Có trạng thái focus dễ nhìn khi điều hướng bằng bàn phím.
- Độ tương phản đủ để đọc.
- Không chỉ dùng màu để truyền đạt thông tin.

### 7.4. Hiệu năng và tài nguyên

- Nén ảnh ở kích thước hợp lý.
- Tránh thư viện hoặc font không cần thiết.
- Không đưa file build hoặc `node_modules/` vào repository.
- Không sử dụng tài nguyên không có quyền sử dụng.

---

## 8. Git, phối hợp và tích hợp

### 8.1. Nguyên tắc

- Dùng một nhánh chính theo cấu hình repository, thường là `main`.
- Mỗi công việc phát triển trên branch riêng.
- Tích hợp qua Pull Request nếu thời gian và cấu hình repository cho phép.
- Không force-push hoặc ghi đè thay đổi của thành viên khác khi chưa thống nhất.
- Không commit `node_modules/`, file `.env`, token hoặc mật khẩu.

### 8.2. Quy tắc sở hữu file

- Thành viên phụ trách nội dung và các file trong thư mục portfolio của mình.
- Người phụ trách trang chủ quản lý `index.html`, `group.css`, `group.js`.
- Người phụ trách build/deploy quản lý `package.json`, `package-lock.json`, `vite.config.js` và workflow.
- Chỉ người được nhóm phân công mới sửa cấu hình tích hợp; thay đổi cần được thông báo để tránh xung đột.

Đây là phân công theo **vai trò**, chưa phải gán vai trò cho một thành viên cụ thể.

### 8.3. Team Hub và quyền tự chủ thiết kế

Team Hub của portfolio Hiếu liên kết đến sáu slug đã thống nhất:

| Thành viên | Slug |
|---|---|
| Nguyễn Xuân Hiếu | `nguyen-xuan-hieu` |
| Lê Nguyễn Nhật Trường | `le-nguyen-nhat-truong` |
| Nguyễn Thị Thảo Như | `nguyen-thi-thao-nhu` |
| Nguyễn Phạm Y Huỳnh | `nguyen-pham-y-huynh` |
| Lê Hữu Châu | `le-huu-chau` |
| Nguyễn Anh Thư | `nguyen-anh-thu` |

Chỉ thống nhất cấu trúc thư mục và yêu cầu nội dung tối thiểu theo rubric. Mỗi thành viên tự quyết định nội dung và thiết kế, tự phát triển trang của mình. Trang nhóm liên kết đến từng trang khi tích hợp; URL triển khai thực tế sẽ được xác minh ở giai đoạn tích hợp.

---

## 9. Tiêu chí nghiệm thu

Website chỉ được xem là sẵn sàng nộp khi các mục sau được kiểm tra:

### 9.1. Trang chủ nhóm

- [ ] Trang tải thành công.
- [ ] Có giới thiệu nhóm.
- [ ] Hiển thị đủ sáu thành viên.
- [ ] Mỗi liên kết mở đúng portfolio.
- [ ] Responsive trên điện thoại và desktop.

### 9.2. Mỗi portfolio cá nhân

- [ ] Đủ các mục nội dung P0.
- [ ] Nội dung được thành viên xác nhận.
- [ ] Có ít nhất hai dự án/sản phẩm theo yêu cầu đề bài.
- [ ] Có Flexbox và/hoặc Grid phù hợp.
- [ ] Responsive và không tràn ngang.
- [ ] Có tối thiểu hai tương tác JavaScript đã được kiểm thử.
- [ ] Form có kiểm tra dữ liệu và phản hồi đúng với khả năng thực tế.
- [ ] Không có link hỏng, ảnh lỗi hoặc lỗi Console nghiêm trọng.
- [ ] Không tuyên bố dự án/tính năng chưa hoàn thành là đã hoàn thành.

### 9.3. Toàn bộ website và triển khai

- [ ] `npm install` hoặc `npm ci` chạy thành công theo lockfile.
- [ ] `npm run build` thành công.
- [ ] Bản build chứa đủ sáu trang thành viên.
- [ ] Link và tài nguyên vẫn hoạt động sau deploy.
- [ ] URL GitHub Pages được mở thử bằng cửa sổ riêng tư hoặc trình duyệt khác.
- [ ] README có hướng dẫn chạy và thông tin URL triển khai.
- [ ] Không có secret hoặc dữ liệu riêng tư không được phép công khai.

---

## 10. Các vấn đề còn mở

Các quyết định thiết kế cá nhân của Hiếu, công nghệ chính, slug sáu thành viên, cấu trúc từng portfolio, chuyển đổi VI/EN, contact `mailto`, việc dùng một repository và quyền tự chủ thiết kế thành viên đã được xác nhận.

Các mục sau vẫn cần bổ sung hoặc xác minh trong quá trình làm; không cần chặn việc bắt đầu triển khai:

1. Tên repository cuối cùng và URL GitHub Pages.
2. Phân công cụ thể cho trang chủ, tích hợp/build, QA và deploy.
3. Xác nhận rubric chính thức từ file đề của giảng viên.
4. Nội dung, ảnh và liên kết công khai của từng thành viên.
5. URL thực tế của sáu portfolio sau khi tích hợp.
6. Demo HIUNXSTAR, demo Website Thú y và LinkedIn của Hiếu nếu có.
7. Chi tiết kỹ thuật cuối của Vite/GitHub Actions sau khi kiểm tra repository thực tế.
8. Các tính năng dự án đã kiểm thử có thể được trình bày như hoàn thành; phần còn lại phải ghi rõ trạng thái.

---

## 11. Lịch sử cập nhật

| Phiên bản | Nội dung |
|---|---|
| 1.0 | Bản đặc tả khởi đầu |
| 1.1 | Làm rõ rubric/acceptance criteria, tách P0/P1, đơn giản hóa cấu trúc theo từng thành viên, làm rõ npm/Vite và quy tắc tích hợp |
| 1.2 | Cập nhật phong cách Modern Creative & Spatial Depth (bảng màu Jade Pebble Morning) cho Hiếu; chuẩn hóa SDLC 5 bước; cập nhật công nghệ Tailwind CSS, Lenis Scroll, Motion One, Lucide Icons, VI/EN bằng JavaScript, Contact `mailto`, Team Hub và các quyết định đã chốt |

---

## 12. Nguyên tắc cuối

- Ưu tiên đáp ứng yêu cầu bắt buộc trước khi thêm hiệu ứng hoặc tính năng mở rộng.
- Ưu tiên nội dung chính xác hơn nội dung phô trương.
- Giữ cấu trúc dễ hiểu để cả sáu thành viên có thể đóng góp.
- Nếu yêu cầu, rubric hoặc cấu trúc repository thực tế khác tài liệu, cập nhật tài liệu trước khi triển khai thay đổi lớn.
