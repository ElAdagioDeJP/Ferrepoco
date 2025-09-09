<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
      
  <AuthMarketingPanel />

      
      <div class="p-8 lg:p-12 bg-background">
        <div class="max-w-md mx-auto">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 overflow-hidden">
              <img src="/iconoferre.png" alt="Logo" class="w-12 h-12 object-cover" />
            </div>
            <h1 class="font-heading text-2xl font-bold text-foreground mb-2">Iniciar Sesión</h1>
            <p class="text-muted-foreground">Accede a tu panel de control</p>
          </div>

          <LoginForm />
          <div class="mt-6 text-center space-y-2">
            <router-link to="/forgot-password" class="text-sm text-cyan-700 hover:underline">¿Olvidaste tu contraseña?</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
import AuthMarketingPanel from '../components/AuthMarketingPanel.vue'
</script>
