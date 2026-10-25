# IMPLEMENTATION_PLAN.md

# Kế hoạch & quy trình triển khai — Group Portfolio Website

| Thuộc tính | Giá trị |
|---|---|
| Phiên bản | 1.2 |
| Tài liệu chuẩn về yêu cầu | `PRODUCT_SPEC.md` |
| Nhóm | 6 thành viên |
| Hạn nội bộ | 25/10/2026 |
| Hạn giảng viên | 28/10/2026 |

> **Cách dùng:** làm theo giai đoạn, kiểm tra kết quả trước khi chuyển bước. Những bảng phân công bên dưới là mẫu để nhóm tự điền; không tự gán công việc cho một thành viên khi chưa được thống nhất.

---

## 1. Mục tiêu triển khai

- Hoàn thành trang chủ nhóm và sáu portfolio cá nhân.
- Đảm bảo các trang đáp ứng rubric và chạy tốt trên điện thoại/desktop.
- Tổ chức code dễ hiểu, mỗi thành viên có thể phát triển phần riêng.
- Tích hợp bằng Vite, build thành website tĩnh và triển khai GitHub Pages.
- Dành thời gian cho kiểm thử và sửa lỗi trước hạn nội bộ.
- Trang cá nhân của Hiếu dùng phong cách Modern Creative & Spatial Depth (bảng màu Jade Pebble Morning: #E6E6E6, #404E3B, #BAC8B1, #7B9669), hỗ trợ song ngữ VI/EN bằng JavaScript và tích hợp các thư viện micro-interaction siêu nhẹ (Lenis Scroll, Motion One, Typed.js, Lucide Icons).
- Một repository chứa trang nhóm và sáu portfolio; mỗi thành viên tự phát triển trang riêng, trang nhóm liên kết tới các trang sau khi tích hợp.

## 2. Quy tắc làm việc bắt buộc

### 2.1. Kiểm tra trước khi sửa

Trước khi viết code hoặc tạo file:

1. Đọc `PRODUCT_SPEC.md` và kế hoạch này.
2. Xác nhận đang ở đúng repository portfolio.
3. Kiểm tra branch, trạng thái Git và các thay đổi chưa commit.
4. Kiểm tra cấu trúc hiện có trước khi tạo hoặc di chuyển file.
5. Kiểm tra `node -v`, `npm -v` và `git --version`.
6. Đối chiếu rubric chính thức nếu có file đề bài.
7. Báo rõ phần nào đã có, phần nào thiếu và quyết định nào cần nhóm xác nhận.

Không tạo lại file hoặc cấu hình hàng loạt khi chưa kiểm tra trạng thái hiện tại.

### 2.2. Làm theo giai đoạn

- Chỉ triển khai giai đoạn đang được giao.
- Không tự chuyển sang giai đoạn tiếp theo khi chưa báo cáo kết quả.
- Nếu kiểm thử thất bại, ưu tiên tìm nguyên nhân và sửa trong phạm vi hiện tại.
- Không thêm tính năng P1 khi P0 chưa đạt.
- Mỗi giai đoạn phải có đầu ra và tiêu chí hoàn thành rõ ràng.

### 2.3. Bảo vệ code và repository

- Không xóa, ghi đè hoặc di chuyển file người dùng khi chưa xác nhận.
- Không force-push hoặc viết lại lịch sử Git nếu chưa được cho phép.
- Không tự thay đổi visibility, ruleset, branch protection hay quyền GitHub.
- Không tự push/deploy nếu người dùng chưa yêu cầu.
- Không commit token, mật khẩu, file `.env` hoặc thông tin bí mật.
- Không commit thư mục `node_modules/` hoặc thư mục build `dist/` nếu quy trình deploy không yêu cầu lưu nó trong repository.

### 2.4. Nội dung phải trung thực

- Không tự bịa chứng chỉ, giải thưởng, kinh nghiệm hoặc số liệu.
- Không gán mức thành thạo kỹ năng nếu thành viên chưa xác nhận.
- Không mô tả dự án đang phát triển là đã hoàn thành.
- Không tự tạo email, URL demo hoặc liên kết mạng xã hội.
- Khi thiếu nội dung, ghi rõ mục cần thành viên bổ sung; không thay bằng thông tin giả.

---

## 3. Cấu trúc làm việc thống nhất

Dùng cấu trúc đề xuất trong `PRODUCT_SPEC.md`: HTML, CSS, JavaScript và ảnh của mỗi thành viên được đặt gần nhau.

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
│   └── <member-slug>/
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

Cây trên là đích dự kiến, không khẳng định repository hiện tại đã có đủ file. Nếu repository đã có cấu trúc khác, kiểm tra và thống nhất phương án di chuyển trước khi sửa.

### 3.1. Quy ước sở hữu file

- Trang chủ nhóm: `index.html`, `group.css`, `group.js`.
- Portfolio cá nhân: các file trong `members/<slug>/`.
- Cấu hình build/dependency/deploy: do người được nhóm phân công phụ trách.
- Không tự sửa file thuộc phần của người khác nếu chưa trao đổi.
- Mỗi portfolio cần có đường dẫn ổn định và link chính xác trên trang chủ.

### 3.2. Kết nối HTML với tài nguyên

Trong từng `members/<slug>/index.html`, quy ước ban đầu là:

```html
<link rel="stylesheet" href="./style.css">
<script type="module" src="./script.js"></script>
```

Ảnh riêng có thể tham chiếu tương đối, ví dụ `./images/profile.jpg`. Người phụ trách tích hợp phải xác minh đường dẫn sau khi build và deploy; ví dụ trên là quy ước mẫu, cần điều chỉnh nếu cách viết HTML/Vite thực tế khác.

---

## 4. Công nghệ và trách nhiệm

| Công nghệ | Dùng để làm gì? | Người phụ trách |
|---|---|---|
| HTML5 | Cấu trúc từng trang | Thành viên sở hữu trang |
| CSS3 | Giao diện, responsive, animation | Thành viên sở hữu trang |
| JavaScript thuần | Tương tác DOM/Event | Thành viên sở hữu trang |
| npm | Quản lý thư viện và scripts | Người phụ trách cấu hình; cả nhóm dùng lệnh |
| Vite | Dev server và build nhiều trang HTML | Người phụ trách tích hợp |
| Bootstrap / Bootstrap Icons | Thành phần giao diện và icon nếu phù hợp | Theo quy ước nhóm |
| Git/GitHub | Version control, branch, PR | Cả nhóm |
| GitHub Pages | Hosting website tĩnh | Người phụ trách deploy |

### 4.1. Lệnh cơ bản

```bash
npm install
npm run dev
npm run build
```

- `npm install`: cài dependency dựa trên `package.json` và cập nhật lockfile khi cần.
- `npm run dev`: chạy server phát triển.
- `npm run build`: tạo bản build để kiểm tra/triển khai.

Nếu repository đã có `package-lock.json` và cần cài đúng theo lockfile trong môi trường CI, dùng `npm ci`. Không chạy các lệnh này trước khi kiểm tra thư mục hiện tại và `package.json`.

### 4.2. Quy tắc dependency

- Không tự ý thêm thư viện lớn hoặc không cần thiết.
- Nếu cần thêm package, nêu lý do và thông báo người phụ trách cấu hình.
- Commit `package-lock.json`.
- Không commit `node_modules/`.
- Bootstrap không có nghĩa mọi portfolio phải dùng chung một giao diện; mỗi thành viên vẫn có thể tùy chỉnh CSS.

### 4.3. Yêu cầu triển khai riêng cho portfolio Hiếu

- Thứ tự section: `Hero → About → Skills → Projects → Process → Team Hub → Contact`.
- Xây dựng nút VI/EN bằng JavaScript để chuyển toàn bộ nội dung mà không tải lại trang.
- Trải nghiệm giao diện & Micro-interactions: Sử dụng Lenis Scroll cho hiệu ứng cuộn mượt (Smooth Scroll), Motion One cho hiệu ứng cuộn xuất hiện (Scroll Reveal), Typed.js cho gõ chữ Tagline Hero, Lucide Icons cho bộ icon nét mảnh và hover viền sáng #7B9669; tuyệt đối không dùng các thư viện cồng kềnh như GSAP hay AOS.
- Mỗi project card có số `01`/`02`, công nghệ, vai trò, trạng thái và modal chi tiết.
- Contact form validate phía client; dữ liệu sai hiện lỗi tại trường tương ứng, dữ liệu hợp lệ báo sẽ mở ứng dụng email qua `mailto` để người dùng tự gửi.
- Ảnh chân dung do Hiếu bổ sung sau vào `members/nguyen-xuan-hieu/images/`.
- Không thêm demo hoặc LinkedIn cho tới khi có URL thật.

---

## 5. Phân công nhóm

### 5.1. Bảng phân công cần nhóm xác nhận

| Thành viên | Phần chính | Phần hỗ trợ | Deadline nội bộ | Trạng thái |
|---|---|---|---|---|
| Nguyễn Xuân Hiếu | Chưa chốt | Chưa chốt | Điền khi nhóm thống nhất | Chưa xác nhận |
| Lê Nguyễn Nhật Trường | Chưa chốt | Chưa chốt | Điền khi nhóm thống nhất | Chưa xác nhận |
| Nguyễn Thị Thảo Như | Chưa chốt | Chưa chốt | Điền khi nhóm thống nhất | Chưa xác nhận |
| Nguyễn Phạm Y Huỳnh | Chưa chốt | Chưa chốt | Điền khi nhóm thống nhất | Chưa xác nhận |
| Lê Hữu Châu | Chưa chốt | Chưa chốt | Điền khi nhóm thống nhất | Chưa xác nhận |
| Nguyễn Anh Thư | Chưa chốt | Chưa chốt | Điền khi nhóm thống nhất | Chưa xác nhận |

Không cần phân công mọi người theo cùng một loại việc. Mỗi người nên sở hữu một portfolio cá nhân; các việc tích hợp, QA và deploy có thể do một hoặc vài người nhận thêm tùy năng lực và thời gian.

### 5.2. Vai trò cần có

- **Điều phối/leader:** theo dõi deadline, gỡ vướng và xác nhận ưu tiên.
- **Phụ trách trang chủ:** đảm bảo trang chủ và link tới thành viên.
- **Phụ trách tích hợp/build:** kiểm tra Vite, dependencies, nhiều HTML entrypoints và đường dẫn.
- **Phụ trách QA:** dùng checklist rubric để kiểm tra từng trang và toàn site.
- **Phụ trách deploy:** cấu hình GitHub Pages/GitHub Actions và kiểm tra URL sau deploy.

Một người có thể đảm nhiệm nhiều vai trò. Đây là danh sách vai trò cần phân công, không phải quyết định ai làm việc gì.

### 5.3. Trạng thái công việc thống nhất

Dùng các trạng thái:

- `Todo`: chưa bắt đầu.
- `In Progress`: đang thực hiện.
- `Review`: đã có bản để kiểm tra.
- `Blocked`: bị chặn, cần hỗ trợ/quyết định.
- `Done`: đã kiểm tra và đạt tiêu chí.

Không dùng `Done` chỉ vì code đã được viết.

---

## 6. Quy trình Git và phối hợp

### 6.1. Quy ước branch

Tên branch gợi ý:

- `feat/group-home`
- `feat/portfolio-nguyen-xuan-hieu`
- `feat/portfolio-le-nguyen-nhat-truong`
- `fix/broken-links`
- `fix/github-pages-paths`
- `docs/update-readme`

Tên branch có thể điều chỉnh theo quy ước repo, nhưng phải dễ hiểu và không trùng nhau.

### 6.2. Quy trình đề xuất

1. Đồng bộ branch chính.
2. Tạo branch cho công việc.
3. Chỉ sửa các file thuộc phạm vi đã nhận.
4. Chạy kiểm tra cơ bản trước khi commit.
5. Commit với message rõ ràng.
6. Push branch và tạo Pull Request nếu nhóm sử dụng PR.
7. Kiểm tra diff, build và link trước khi merge.
8. Sau khi merge, cập nhật branch làm việc.

Ví dụ commit message:

```text
feat: add group landing page
feat: add Hieu portfolio sections
fix: correct member page links
docs: update setup instructions
```

### 6.3. Giảm xung đột

- Không để nhiều người cùng sửa một file cấu hình tích hợp mà không báo nhau.
- Mỗi người ưu tiên làm trong thư mục portfolio của mình.
- Thay đổi `package.json`, `package-lock.json`, `vite.config.js` và workflow cần thông báo người phụ trách tích hợp.
- Không copy code của người khác đè lên file đang làm.
- Nếu có conflict, dừng và so sánh thay đổi; không chọn “Accept Current/Incoming” hàng loạt khi chưa hiểu khác biệt.

### 6.4. Bàn giao portfolio cá nhân

Mỗi thành viên khi chuyển sang trạng thái `Review` cần cung cấp:

- Link branch/PR hoặc commit.
- Các mục nội dung đã hoàn thành.
- Hai tương tác JavaScript và cách kiểm thử.
- Ảnh/tài nguyên đã sử dụng.
- Những phần còn thiếu hoặc cần người khác hỗ trợ.
- Xác nhận các thông tin cá nhân và link công khai là chính xác.

---

## 7. Kế hoạch theo giai đoạn

Thời gian dự kiến rất ngắn. Các portfolio có thể được phát triển song song sau khi chốt cấu trúc và quy tắc tích hợp. Thời lượng dưới đây là gợi ý; leader cần điều chỉnh theo tiến độ thực tế.

### Giai đoạn 0 — Kiểm tra repository và môi trường

**Mục tiêu:** xác nhận đúng repository, công cụ và trạng thái ban đầu.

**Việc cần làm**
1. Xác nhận repository đang dùng cho bài portfolio và quyền truy cập.
2. Kiểm tra `git status`, branch và file đang có.
3. Kiểm tra Node.js, npm và Git.
4. Kiểm tra rubric chính thức.
5. So sánh cấu trúc hiện tại với cấu trúc mục tiêu.
6. Ghi lại vấn đề và các quyết định còn mở.

**Đầu ra:** báo cáo kiểm tra; danh sách việc cần làm; không thay đổi code lớn nếu chưa được đồng ý.

**Hoàn thành khi:** đúng repository, không bỏ sót thay đổi hiện có và nhóm hiểu rõ phần nào cần tạo/chỉnh.

### Giai đoạn 1 — Chốt phạm vi, slug và quy ước

**Mục tiêu:** tránh thay đổi đường dẫn hoặc yêu cầu giữa chừng.

**Việc cần làm**
1. Chốt slug của sáu thành viên.
2. Xác nhận nội dung bắt buộc theo rubric.
3. Chốt cấu trúc thư mục và cách tham chiếu CSS/JS/ảnh.
4. Chốt vai trò trang chủ, tích hợp, QA và deploy.
5. Chốt quy trình branch/PR.
6. Ghi các quyết định vào tài liệu/README.

**Đầu ra:** cấu trúc thống nhất và bảng phân công đã được nhóm xác nhận.

**Hoàn thành khi:** mỗi người biết thư mục mình sở hữu và cách bàn giao.

### Giai đoạn 2 — Thiết lập npm và Vite

**Mục tiêu:** tạo môi trường chạy và build được nhiều trang HTML.

**Việc cần làm**
1. Kiểm tra `package.json` và dependency hiện có.
2. Chỉ khởi tạo npm nếu project chưa có cấu hình phù hợp.
3. Cài Vite và các dependency đã được nhóm thống nhất.
4. Cấu hình scripts `dev` và `build`.
5. Cấu hình Vite với trang chủ và sáu trang HTML làm đầu vào.
6. Chạy `npm run dev`.
7. Chạy `npm run build` và kiểm tra kết quả.

**Đầu ra:** môi trường chạy được và build được bản tối thiểu.

**Hoàn thành khi:** các trang HTML đầu vào được nhận diện và build thành công. Chưa cần hoàn thiện thiết kế ở giai đoạn này.

### Giai đoạn 3 — Xây dựng trang chủ nhóm

**Mục tiêu:** tạo điểm vào chung cho sáu portfolio.

**Việc cần làm**
1. Tạo nội dung giới thiệu nhóm.
2. Tạo khu vực/thẻ cho sáu thành viên.
3. Thêm link tới slug đã chốt.
4. Hoàn thiện CSS responsive và điều hướng.
5. Thêm JavaScript chỉ khi có tương tác phù hợp.
6. Kiểm tra link trên máy local.

**Đầu ra:** trang chủ nhóm hoạt động với sáu link.

**Hoàn thành khi:** không có link thiếu/sai; trang dùng được trên desktop và mobile.

### Giai đoạn 4 — Phát triển sáu portfolio cá nhân song song

**Mục tiêu:** mỗi thành viên hoàn thiện trang của mình theo rubric.

**Việc cần làm cho từng portfolio**
1. Chuẩn bị nội dung và xác nhận thông tin.
2. Tạo `index.html` semantic.
3. Tạo `style.css` cho giao diện riêng.
4. Tạo `script.js` cho tương tác.
5. Đưa ảnh vào thư mục `images/` của thành viên.
6. Bổ sung đủ các mục nội dung P0.
7. Kiểm tra responsive và link.
8. Ghi rõ phần nào chưa hoàn thành.

Mỗi thành viên tự quyết định nội dung và thiết kế; nhóm chỉ thống nhất cấu trúc thư mục và yêu cầu tối thiểu. Không yêu cầu năm thành viên còn lại sao chép phong cách của Hiếu.

**Đầu ra:** sáu portfolio ở trạng thái `Review`.

**Hoàn thành khi:** nội dung P0 có đủ, thông tin được xác nhận và các tương tác chính có thể kiểm thử.

### Giai đoạn 5 — Tích hợp và sửa đường dẫn

**Mục tiêu:** làm cho tất cả trang hoạt động trong một bản build thống nhất.

**Việc cần làm**
1. Merge các portfolio theo quy trình nhóm.
2. Kiểm tra danh sách HTML entrypoints trong Vite.
3. Kiểm tra đường dẫn CSS/JS/ảnh tương đối.
4. Kiểm tra các link giữa trang chủ và portfolio.
5. Kiểm tra lỗi tên thư mục, chữ hoa/chữ thường và file thiếu.
6. Chạy build sau mỗi đợt tích hợp.

**Đầu ra:** một bản build chứa trang chủ và sáu portfolio.

**Hoàn thành khi:** `npm run build` thành công và các trang/ảnh chính tải đúng trong bản build.

### Giai đoạn 6 — JavaScript và kiểm tra rubric

**Mục tiêu:** bảo đảm tương tác hoạt động thực tế.

**Việc cần làm**
1. Liệt kê tối thiểu hai tương tác đã chọn cho từng portfolio.
2. Kiểm tra DOM/Event và phản hồi giao diện.
3. Kiểm tra form: dữ liệu trống, email không hợp lệ và dữ liệu hợp lệ.
4. Với portfolio Hiếu, kiểm tra nút VI/EN đổi toàn bộ nội dung mà không tải lại trang.
5. Với Contact form của Hiếu, xác nhận dữ liệu sai hiện lỗi tại trường tương ứng; dữ liệu hợp lệ báo sẽ mở ứng dụng email qua `mailto`.
6. Xác nhận form không tuyên bố email đã được gửi thành công.
7. Mở Console và sửa lỗi nghiêm trọng.
8. Kiểm tra thao tác bằng bàn phím nếu phù hợp.

**Đầu ra:** checklist JavaScript cho từng trang.

**Hoàn thành khi:** các tương tác bắt buộc hoạt động và có thể trình diễn cho giảng viên.

### Giai đoạn 7 — QA toàn website

**Mục tiêu:** kiểm tra sản phẩm như người chấm bài.

**Checklist**
- [ ] Trang chủ có đủ sáu thành viên.
- [ ] Mỗi link mở đúng trang.
- [ ] Mỗi portfolio có đủ nội dung bắt buộc.
- [ ] Mỗi portfolio có ít nhất hai dự án/sản phẩm theo rubric.
- [ ] Có semantic HTML.
- [ ] Có Flexbox/Grid phù hợp.
- [ ] Responsive, không tràn ngang.
- [ ] Có hiệu ứng phù hợp.
- [ ] Có tối thiểu hai tương tác JavaScript được kiểm tra.
- [ ] Form có validation/feedback phù hợp.
- [ ] Không có ảnh lỗi, link hỏng hoặc lỗi Console nghiêm trọng.
- [ ] Nội dung và thông tin liên hệ được thành viên xác nhận.
- [ ] Không mô tả nhầm trạng thái dự án.
- [ ] README có hướng dẫn chạy.

**Đầu ra:** danh sách lỗi có mức độ ưu tiên và trạng thái sửa.

**Hoàn thành khi:** lỗi nghiêm trọng đã được sửa; các mục P0 đều có bằng chứng kiểm tra.

### Giai đoạn 8 — Build và triển khai GitHub Pages

**Mục tiêu:** publish bản đã kiểm tra.

**Việc cần làm**
1. Xác nhận tên repository và URL Pages.
2. Xác nhận `base` của Vite phù hợp URL triển khai.
3. Xác nhận các slug đã chốt và cập nhật URL thực tế của sáu trang vào Team Hub/trang nhóm.
4. Chạy build sạch.
5. Cấu hình GitHub Actions/Pages theo cách nhóm chọn.
6. Chạy workflow và kiểm tra trạng thái.
7. Mở URL public trên trình duyệt.
8. Kiểm tra lại tất cả đường dẫn, ảnh, CSS và JS trên môi trường đã deploy.

**Đầu ra:** URL GitHub Pages hoạt động.

**Hoàn thành khi:** trang chủ và cả sáu portfolio truy cập được; tài nguyên và link chính không lỗi.

### Giai đoạn 9 — Nghiệm thu và bàn giao

**Mục tiêu:** chuẩn bị nộp bài và trình bày.

**Việc cần làm**
1. Chốt checklist rubric.
2. Chốt URL triển khai.
3. Cập nhật README.
4. Kiểm tra repository không chứa file thừa hoặc secret.
5. Chuẩn bị thứ tự trình bày website.
6. Ghi nhận các phần chưa làm nếu có.
7. Tạo tag/release nếu nhóm thấy cần; không bắt buộc.

**Đầu ra:** website, source code, README và checklist nghiệm thu.

**Hoàn thành khi:** nhóm có thể mở website và giải thích các phần chính mà không phụ thuộc vào máy của một thành viên.

---

## 8. Timeline đề xuất

Vì hạn nội bộ là **25/10/2026**, không nên chờ mọi phần hoàn tất mới tích hợp. Dùng lịch dưới đây như mốc điều phối, có thể điều chỉnh theo tiến độ thực tế.

| Mốc | Ưu tiên | Kết quả cần đạt |
|---|---|---|
| 22/10 | Chốt repo, rubric, slug, cấu trúc và phân công | Mọi người biết phần việc và quy tắc |
| 22–23/10 | Thiết lập Vite và làm trang chủ khung; thành viên bắt đầu portfolio | Có bản chạy/build tối thiểu |
| 23–24/10 | Phát triển nội dung và giao diện sáu portfolio song song | Sáu trang có nội dung chính |
| 24/10 | Tích hợp, kiểm tra JS, responsive và sửa lỗi | Có bản ứng viên để nghiệm thu |
| 25/10 | Đóng băng tính năng, kiểm thử, deploy và sửa lỗi quan trọng | Bản nội bộ sẵn sàng |
| 26–27/10 | Dự phòng sửa lỗi và hoàn thiện nội dung/README | Ổn định bản nộp |
| 28/10 | Kiểm tra URL cuối và nộp bài | Bản nộp đã xác nhận |

**Quy tắc đóng băng:** từ mốc 25/10, không thêm tính năng mới trừ khi P0 đã đạt và thay đổi được kiểm tra đầy đủ.

---

## 9. Quy trình kiểm thử

### 9.1. Kiểm thử local

1. Chạy `npm run dev`.
2. Mở trang chủ.
3. Mở lần lượt sáu portfolio.
4. Thử tất cả liên kết và tương tác.
5. Kiểm tra responsive bằng DevTools hoặc cửa sổ trình duyệt có kích thước khác nhau.
6. Mở Console để kiểm tra lỗi.
7. Chạy `npm run build`.

### 9.2. Kiểm thử sau build

- Xác nhận thư mục build có trang chủ và đủ sáu portfolio.
- Xác nhận các file CSS/JS/ảnh cần thiết có mặt.
- Nếu có thể, preview bản build theo scripts/tooling của project.
- Không chỉ dựa vào việc trang chạy trong `npm run dev`.

### 9.3. Kiểm thử sau deploy

- Mở URL Pages trực tiếp.
- Mở một URL portfolio cá nhân trực tiếp, không chỉ đi từ trang chủ.
- Tải lại trang ở URL lồng nhau.
- Kiểm tra ảnh, CSS, JavaScript và link.
- Kiểm tra ít nhất một điện thoại hoặc viewport nhỏ.
- Kiểm tra ở cửa sổ riêng tư hoặc trình duyệt khác để tránh nhầm cache với kết quả thật.

---

## 10. Xử lý rủi ro

| Rủi ro | Dấu hiệu | Cách xử lý |
|---|---|---|
| Thành viên trễ tiến độ | Chưa có trang ở mốc tích hợp | Báo leader sớm; chốt nội dung tối thiểu trung thực và phân công người hỗ trợ |
| Sai link/slug | Trang 404 hoặc link không mở | Dùng một bảng slug duy nhất; kiểm tra lại link trang chủ |
| CSS ảnh hưởng trang khác | Một thay đổi làm vỡ trang khác | Giữ CSS trong file riêng theo thành viên; tránh selector toàn cục quá rộng |
| Vite không build đủ trang | Thiếu HTML trong `dist` | Kiểm tra cấu hình multi-page input |
| Lỗi đường dẫn GitHub Pages | Trang có HTML nhưng thiếu CSS/ảnh/JS | Kiểm tra `base` và đường dẫn tương đối trên URL triển khai |
| Conflict Git | Cùng file bị sửa | Trao đổi, so sánh diff và giải quyết thủ công; không ghi đè mù |
| Nội dung chưa được xác nhận | Có dữ liệu/đường dẫn đáng ngờ | Yêu cầu chủ sở hữu xác nhận; không tự bịa |
| Form bị hiểu nhầm là gửi thật | Hiển thị “đã gửi email” dù không có backend | Đổi thông báo thành trạng thái kiểm tra tại giao diện |
| Thiếu thời gian QA | Chỉ kiểm tra trên máy người viết | Ưu tiên P0, đóng băng tính năng và dùng checklist chung |

---

## 11. Mẫu báo cáo sau mỗi giai đoạn

Mỗi người hoặc người điều phối báo cáo ngắn theo mẫu:

```text
Giai đoạn:
Người phụ trách:
Trạng thái: Todo / In Progress / Review / Blocked / Done

Đã hoàn thành:
- ...

File đã tạo/chỉnh:
- ...

Kiểm thử đã chạy:
- ...

Kết quả:
- Đạt / Chưa đạt

Vấn đề còn lại:
- ...

Cần ai xác nhận/hỗ trợ:
- ...

Bước tiếp theo được đề xuất:
- ...
```

Chỉ ghi `Done` khi đầu ra đã được kiểm tra theo tiêu chí của giai đoạn.

---

## 12. Các vấn đề còn mở

Các mục đã được chốt: cấu trúc thư mục theo từng thành viên (`index.html`, `style.css`, `script.js`, `images/`); mỗi thành viên tự phát triển thiết kế/nội dung; một repository chứa trang nhóm và sáu portfolio; slug sáu thành viên; portfolio Hiếu dùng VI/EN bằng JavaScript, Contact validate + `mailto`, và animation tự làm bằng CSS/Vanilla JS.

Các mục còn cần bổ sung hoặc xác minh:

- [ ] Tên repository cuối cùng và URL GitHub Pages.
- [ ] Phân công cụ thể trang chủ, tích hợp/build, QA và deploy.
- [ ] Đối chiếu rubric chính thức của giảng viên.
- [ ] Nhận nội dung, ảnh và liên kết công khai từ từng thành viên.
- [ ] Xác minh URL thực tế của sáu trang khi tích hợp.
- [ ] Nhận demo HIUNXSTAR/Website Thú y và LinkedIn của Hiếu nếu có; có thể để trống đến khi sẵn sàng.
- [ ] Chốt cấu hình Vite/GitHub Actions sau khi kiểm tra repository thực tế.

Các mục thiếu demo, ảnh hoặc LinkedIn không ngăn việc bắt đầu code; không được tự tạo liên kết giả.
---

## 13. Nguyên tắc cuối

1. Làm P0 trước P1.
2. Tích hợp sớm; không chờ đến cuối mới ghép sáu trang.
3. Mỗi thành viên sở hữu phần của mình và chịu trách nhiệm kiểm thử cơ bản.
4. Người phụ trách tích hợp chịu trách nhiệm build/deploy, nhưng không thay thế việc kiểm tra nội dung của từng chủ portfolio.
5. Không bịa thông tin, không che giấu phần chưa hoàn thành.
7. Khi phát sinh thay đổi cấu trúc hoặc yêu cầu, cập nhật tài liệu và thông báo cả nhóm.
