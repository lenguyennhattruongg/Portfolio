import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Base path './' ensures assets are resolved correctly in both nested GitHub Pages paths and local builds
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'nguyen-xuan-hieu': resolve(__dirname, 'members/nguyen-xuan-hieu/index.html'),
        'le-nguyen-nhat-truong': resolve(__dirname, 'members/le-nguyen-nhat-truong/index.html'),
        'nguyen-thi-thao-nhu': resolve(__dirname, 'members/nguyen-thi-thao-nhu/index.html'),
        'nguyen-pham-y-huynh': resolve(__dirname, 'members/nguyen-pham-y-huynh/index.html'),
        'le-huu-chau': resolve(__dirname, 'members/le-huu-chau/index.html'),
        'nguyen-anh-thu': resolve(__dirname, 'members/nguyen-anh-thu/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
