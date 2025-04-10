import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // 빌드시 결과물이 dist 폴더에 생성됨
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @로 src 경로 단축 가능
    },
  },
  server: {
    port: 5173, // Electron과 맞추기 위해 고정
  },
});
