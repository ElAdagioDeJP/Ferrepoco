<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
      
  <div class="relative hidden lg:flex flex-col justify-between p-10 text-card-foreground bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div>
          <div class="flex items-center gap-3 mb-10">
    <img src="/logo.png" alt="Ferrepoco" class="w-12 h-12 rounded-xl object-cover" />
            <h2 class="font-heading text-3xl font-bold text-primary-foreground">Ferrepoco</h2>
          </div>
          
          <div class="space-y-6">
            <h1 class="font-heading text-4xl font-bold leading-tight text-primary-foreground">
              Sistema de Gestión Empresarial
            </h1>
            <p class="text-lg text-primary-foreground/90 leading-relaxed">
              Plataforma integral para la gestión de inventario, pedidos y clientes de tu ferretería.
            </p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-primary-foreground/10 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-2">
                <svg class="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
                <span class="font-medium text-primary-foreground">Inventario</span>
              </div>
              <p class="text-sm text-primary-foreground/80">Control total de stock</p>
            </div>
            
            <div class="bg-primary-foreground/10 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-2">
                <svg class="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <span class="font-medium text-primary-foreground">Pedidos</span>
              </div>
              <p class="text-sm text-primary-foreground/80">Gestión eficiente</p>
            </div>
          </div>
          
          <div class="flex items-center gap-3 text-primary-foreground/90">
            <div class="flex -space-x-2">
              <img src="/iconoferre.png" alt="A" class="w-8 h-8 rounded-full border-2 border-primary" />
              <img src="/iconoferre.png" alt="E" class="w-8 h-8 rounded-full border-2 border-primary" />
              <img src="/iconoferre.png" alt="C" class="w-8 h-8 rounded-full border-2 border-primary" />
            </div>
            <span class="text-sm">Roles: Admin, Empleado, Cliente</span>
          </div>
        </div>
      </div>

      
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LoginForm from '../components/LoginForm.vue'
</script>
