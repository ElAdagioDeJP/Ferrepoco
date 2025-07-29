const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // Esto es para que el frontend pueda proxy las peticiones al backend durante el desarrollo
    // Evita problemas de CORS en desarrollo
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Apunta a tu backend de Node.js
        changeOrigin: true
      }
    }
  }
})