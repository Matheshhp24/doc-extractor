import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // Optional: Use if your assets or routes break on hosted links
  // base: './', // or set to '/' if deploying at root
});
