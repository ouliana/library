import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      // You can also add more configuration options here
      exclude: ['node_modules/**', 'test/**'] // Exclude files or directories from coverage
    }
  }
});
