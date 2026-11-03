/**
 * members.data.js — Nguồn dữ liệu duy nhất và chính xác cho 6 thành viên Nhóm 02
 * Quy tắc: Các trường chưa xác minh để null hoặc mảng rỗng [], tuyệt đối KHÔNG điền phỏng đoán.
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
    role: 'Trưởng nhóm',
    headline: null,
    tags: [],
    github: null,
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
    role: null,
    headline: null,
    tags: [],
    github: null,
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
    role: null,
    headline: null,
    tags: [],
    github: null,
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
    role: null,
    headline: null,
    tags: [],
    github: null,
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
    role: null,
    headline: null,
    tags: [],
    github: null,
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
    role: null,
    headline: null,
    tags: [],
    github: null,
    avatar: null,
    portfolio: './members/nguyen-anh-thu/index.html',
    portfolioStatus: 'live'
  }
];

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
