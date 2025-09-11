<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden">
      <AuthMarketingPanel />
      <div class="p-8 lg:p-10 overflow-y-auto max-h-[90vh]">
        <div class="max-w-2xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-heading font-bold text-neutral-900">Manual de Usuario</h1>
            <router-link to="/login" class="px-4 py-2 bg-cyan-800 text-white rounded hover:bg-cyan-700 font-medium">Volver</router-link>
          </div>
          <div class="space-y-8 text-neutral-800 leading-relaxed">
            <section>
              <h2 class="text-xl font-bold mb-2">Introducción</h2>
              <p>Este manual explica cómo usar Ferrepoco según tu rol (Administrador, Empleado o Cliente).</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">Acceso y Autenticación</h2>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>Registro: completa el formulario y acepta los términos.</li>
                <li>Login: ingresa correo y contraseña.</li>
                <li>Recuperar contraseña: usa "¿Olvidaste tu contraseña?" en la pantalla de inicio.</li>
              </ul>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">Panel Cliente</h2>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>Navega productos, agrega al carrito y procede a la pasarela de pago.</li>
                <li>Verifica tus pedidos en "Mis Pedidos" y solicita soporte si es necesario.</li>
              </ul>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">Panel Empleado</h2>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>Gestiona inventario y pedidos asignados.</li>
                <li>Actualiza estados de pedido (pendiente, enviado, completado).</li>
              </ul>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">Panel Administrador</h2>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>CRUD de productos y usuarios.</li>
                <li>Acceso a reportes e inventario global.</li>
                <li>Gestión de roles y controles avanzados.</li>
              </ul>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">Consejos de Seguridad</h2>
              <ul class="list-disc pl-6 space-y-1 text-sm">
                <li>No compartas tu contraseña.</li>
                <li>Cierra sesión en equipos públicos.</li>
                <li>Actualiza tu contraseña periódicamente.</li>
              </ul>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">Soporte</h2>
              <p>Para ayuda adicional contáctanos vía WhatsApp o revisa la sección de Preguntas Frecuentes.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AuthMarketingPanel from '../components/AuthMarketingPanel.vue';
</script>

<style scoped></style>
