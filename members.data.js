/**
 * members.data.js — Nguồn dữ liệu duy nhất và chính xác cho 6 thành viên Nhóm 06
 * Cập nhật định danh GitHub và chuyên môn kỹ thuật chính xác cho từng thành viên.
 */

export const TAGS = {};

export const MEMBERS = [
  {
    id: 'hieu',
    order: 1,
    slug: 'nguyen-xuan-hieu',
    name: 'Nguyễn Xuân Hiếu',
    shortName: 'Hiếu',
    symbol: 'Hi',
    role: 'Trưởng nhóm / Full-Stack & System',
    headline: 'Xây dựng ứng dụng toàn diện từ giao diện người dùng, logic hệ thống cho đến hạ tầng mạng vững chắc.',
    tags: ['Full-Stack', 'Python', 'PHP / PDO', 'PostgreSQL', 'Docker', 'Network Admin'],
    github: 'https://github.com/nguyenxuanhieu2903',
    avatar: './avatars/nguyen-xuan-hieu.jpg',
    portfolio: './members/nguyen-xuan-hieu/index.html',
    portfolioStatus: 'live'
  },
  {
    id: 'truong',
    order: 2,
    slug: 'le-nguyen-nhat-truong',
    name: 'Lê Nguyễn Nhật Trường',
    shortName: 'Trường',
    symbol: 'Tr',
    role: 'Software Engineer Trainee (Backend Focus)',
    headline: 'Tập trung kiến trúc hướng đối tượng Java OOP, truyền nhận Socket TCP/IP và hệ thống backend hiệu năng cao.',
    tags: ['Java Core', 'OOP Architecture', 'Socket TCP/IP', 'Multithreading', 'SQL', 'C/C++'],
    github: 'https://github.com/lenguyennhattruongg',
    avatar: './avatars/le-nguyen-nhat-truong.png',
    portfolio: './members/le-nguyen-nhat-truong/index.html',
    portfolioStatus: 'live'
  },
  {
    id: 'nhu',
    order: 3,
    slug: 'nguyen-thi-thao-nhu',
    name: 'Nguyễn Thị Thảo Như',
    shortName: 'Như',
    symbol: 'Nh',
    role: 'Thành viên / Frontend Developer',
    headline: 'Thiết kế giao diện hiện đại, tối ưu trải nghiệm người dùng và thẩm mỹ tương tác web.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'UI/UX'],
    github: 'https://github.com/NhuThiNguyen',
    avatar: null,
    portfolio: './members/nguyen-thi-thao-nhu/index.html',
    portfolioStatus: 'live'
  },
  {
    id: 'huynh',
    order: 4,
    slug: 'nguyen-pham-y-huynh',
    name: 'Nguyễn Phạm Y Huỳnh',
    shortName: 'Huỳnh',
    symbol: 'Hy',
    role: 'Thành viên / Frontend & Data Processing',
    headline: 'Xử lý dữ liệu và phát triển giao diện người dùng thân thiện, trực quan.',
    tags: ['JavaScript', 'HTML5/CSS3', 'Data Processing', 'API Integration'],
    github: 'https://github.com/yhuynh06',
    avatar: null,
    portfolio: './members/nguyen-pham-y-huynh/index.html',
    portfolioStatus: 'live'
  },
  {
    id: 'chau',
    order: 5,
    slug: 'le-huu-chau',
    name: 'Lê Hữu Châu',
    shortName: 'Châu',
    symbol: 'Ch',
    role: 'Thành viên / Web Developer',
    headline: 'Lập trình ứng dụng web, kiểm thử giao diện và tích hợp tính năng hệ thống.',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Web Development'],
    github: 'https://github.com/lechau06',
    avatar: null,
    portfolio: './members/le-huu-chau/index.html',
    portfolioStatus: 'live'
  },
  {
    id: 'thu',
    order: 6,
    slug: 'nguyen-anh-thu',
    name: 'Nguyễn Anh Thư',
    shortName: 'Thư',
    symbol: 'Th',
    role: 'Thành viên / UI/UX & Web Designer',
    headline: 'Thiết kế trải nghiệm người dùng tinh tế, phối màu hài hòa và giao diện trực quan.',
    tags: ['UI/UX Design', 'HTML5', 'CSS3', 'Frontend Layout'],
    github: 'https://github.com/geneyeah',
    avatar: null,
    portfolio: './members/nguyen-anh-thu/index.html',
    portfolioStatus: 'live'
  }
];

export const members = MEMBERS;

/**
 * Chuẩn hóa chuỗi tiếng Việt phục vụ tìm kiếm không phân biệt dấu và chữ đ/Đ
 */
export const normalizeText = (s) =>
  (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .trim();

/**
 * Tạo haystack văn bản phục vụ tìm kiếm thành viên
 */
export const getMemberHaystack = (m) => {
  const parts = [m.name, m.shortName];
  if (m.role) parts.push(m.role);
  return normalizeText(parts.join(' '));
};
