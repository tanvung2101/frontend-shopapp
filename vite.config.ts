import { defineConfig } from 'vitest/config'
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()] as any,
  test: {
    environment: "jsdom"
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'axios'], // Tách thư viện lớn ra riêng
        },
      },
    },
  },

});
