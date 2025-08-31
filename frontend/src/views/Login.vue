<template>
  <div class="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
       Brand panel with hardware store theme 
      <div class="relative hidden lg:flex flex-col justify-between p-10 text-card-foreground bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div>
          <div class="flex items-center gap-3 mb-10">
            <div class="w-12 h-12 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <svg class="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
              </svg>
            </div>
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
              <div class="w-8 h-8 bg-secondary rounded-full border-2 border-primary flex items-center justify-center">
                <span class="text-xs font-bold text-secondary-foreground">A</span>
              </div>
              <div class="w-8 h-8 bg-accent rounded-full border-2 border-primary flex items-center justify-center">
                <span class="text-xs font-bold text-accent-foreground">E</span>
              </div>
              <div class="w-8 h-8 bg-muted rounded-full border-2 border-primary flex items-center justify-center">
                <span class="text-xs font-bold text-muted-foreground">C</span>
              </div>
            </div>
            <span class="text-sm">Roles: Admin, Empleado, Cliente</span>
          </div>
        </div>
      </div>

       Login form panel with modern design 
      <div class="p-8 lg:p-12 bg-background">
        <div class="max-w-md mx-auto">
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
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
