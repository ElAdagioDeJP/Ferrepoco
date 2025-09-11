<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 flex items-center justify-center p-4">
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden">
      <AuthMarketingPanel />
      <div class="p-8 lg:p-10 overflow-y-auto max-h-[90vh]">
        <div class="max-w-2xl mx-auto">
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-heading font-bold text-neutral-900">Preguntas Frecuentes</h1>
            <router-link to="/login" class="px-4 py-2 bg-cyan-800 text-white rounded hover:bg-cyan-700 font-medium">Volver</router-link>
          </div>
          <div class="space-y-6 text-neutral-800 text-base leading-relaxed">
            <section>
              <h2 class="text-lg font-bold mb-2">¿Cómo creo una cuenta en Ferrepoco?</h2>
              <p>Haz clic en <RouterLink to="/register" class="text-primary underline">"Registrarse"</RouterLink> y completa el formulario con tus datos personales. Recuerda aceptar los términos y condiciones para poder crear tu cuenta.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Cómo puedo recuperar mi contraseña?</h2>
              <p>En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" y sigue las instrucciones para restablecerla. Si tienes problemas, contáctanos por WhatsApp o correo.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Qué métodos de pago aceptan?</h2>
              <p>Aceptamos pagos por transferencia bancaria, pago móvil y tarjetas de crédito/débito. Puedes ver y elegir el método en la <RouterLink to="/checkout" class="text-primary underline">pasarela de pago</RouterLink>.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Cómo solicito una devolución?</h2>
              <p>Ve a <RouterLink to="/mis-pedidos" class="text-primary underline">Mis Pedidos</RouterLink>, busca el pedido y haz clic en "Retornar". Se abrirá WhatsApp para que puedas solicitar la devolución directamente.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Dónde puedo ver el estado de mi pedido?</h2>
              <p>En <RouterLink to="/mis-pedidos" class="text-primary underline">Mis Pedidos</RouterLink> verás el historial y estado actualizado de cada pedido.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Cómo contacto al soporte?</h2>
              <p>Puedes escribirnos por WhatsApp al <a href="https://wa.me/584244252755" target="_blank" class="text-primary underline">0424-4252755</a> o también puedes usar el botón de ayuda en la plataforma.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Puedo comprar sin registrarme?</h2>
              <p>No, es necesario crear una cuenta para realizar compras y acceder a todos los beneficios y seguridad de Ferrepoco.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Cómo puedo ver mis datos y cambiar mi contraseña?</h2>
              <p>En tu perfil (<RouterLink to="/me" class="text-primary underline">Mi Panel</RouterLink>) puedes ver tus datos y cambiar tu contraseña en cualquier momento.</p>
            </section>
            <section>
              <h2 class="text-lg font-bold mb-2">¿Qué hago si tengo un problema con mi pedido?</h2>
              <p>Contáctanos por WhatsApp o desde la sección de <RouterLink to="/mis-pedidos" class="text-primary underline">Mis Pedidos</RouterLink> para que el equipo te ayude a resolverlo o realizar un reembolso.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import AuthMarketingPanel from '../components/AuthMarketingPanel.vue';
</script>

<style scoped></style>
