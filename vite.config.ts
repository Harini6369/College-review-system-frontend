import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/health': 'http://localhost:5000',
      '/api-docs': 'http://localhost:5000',
      '/openapi.json': 'http://localhost:5000',
    },
  },
  preview: {
    host: '0.0.0.0',
    // Port on Render comes from `npm run preview` (--port $PORT in package.json).
    allowedHosts: true,
  },
});
