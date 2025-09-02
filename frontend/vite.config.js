import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<<<<<<< HEAD
=======
import path from 'path'
>>>>>>> unificado

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
<<<<<<< HEAD
=======
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
>>>>>>> unificado
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
