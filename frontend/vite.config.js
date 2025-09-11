import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
<<<<<<< HEAD
<<<<<<< HEAD
=======
import path from 'path'
>>>>>>> unificado
=======
import path from 'path'
>>>>>>> unificado

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> unificado
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
<<<<<<< HEAD
>>>>>>> unificado
=======
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
