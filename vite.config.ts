import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Intercept all calls starting with /api
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // Remove '/api' before it hits json-server
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});