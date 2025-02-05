import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html', // Certifique-se de que está correto
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
