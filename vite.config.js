import fs from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// Resolve current directory for ESM environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Danh sách 6 thành viên chính thức của nhóm
 */
const MEMBER_SLUGS = [
  'nguyen-xuan-hieu',
  'le-nguyen-nhat-truong',
  'nguyen-thi-thao-nhu',
  'nguyen-pham-y-huynh',
  'le-huu-chau',
  'nguyen-anh-thu',
];

/**
 * Cơ chế quét tự động (Dynamic Entry Detection):
 * Tự động kiểm tra sự tồn tại của index.html cho trang chủ nhóm và từng thành viên.
 * Chỉ đăng ký những trang thực sự tồn tại vào rollupOptions.input để tránh lỗi build khi thiếu file.
 */
function getHtmlEntries() {
  const entries = {};

  // 1. Trang chủ Cổng thông tin nhóm (Group Portal)
  const rootIndex = resolve(__dirname, 'index.html');
  if (fs.existsSync(rootIndex)) {
    entries['main'] = rootIndex;
  }

  // 2. Quét các trang thành viên chính thức
  for (const slug of MEMBER_SLUGS) {
    const memberHtmlPath = resolve(__dirname, `members/${slug}/index.html`);
    if (fs.existsSync(memberHtmlPath)) {
      entries[slug] = memberHtmlPath;
    }
  }

  // 3. Tự động phát hiện thêm bất kỳ thư mục thành viên hợp lệ nào trong members/
  const membersDir = resolve(__dirname, 'members');
  if (fs.existsSync(membersDir)) {
    const subDirs = fs.readdirSync(membersDir, { withFileTypes: true });
    for (const dirent of subDirs) {
      if (dirent.isDirectory()) {
        const slug = dirent.name;
        const memberHtmlPath = resolve(membersDir, slug, 'index.html');
        if (fs.existsSync(memberHtmlPath) && !entries[slug]) {
          entries[slug] = memberHtmlPath;
        }
      }
    }
  }

  console.log(`[Vite MPA] Đã phát hiện ${Object.keys(entries).length} trang HTML đầu vào:`, Object.keys(entries));
  return entries;
}

export default defineConfig({
  // Base path './' đảm bảo 100% đường dẫn tương đối hoạt động hoàn hảo trên GitHub Pages / Sub-path deployment
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(),
    },
  },

  server: {
    port: 3000,
    open: true,
  },
});
