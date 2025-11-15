/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // hooksディレクトリ内のテストファイルのみを対象
    include: ['src/features/**/hooks/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  }
});
