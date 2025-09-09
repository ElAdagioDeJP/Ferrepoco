<template>
  <div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center p-4">
    <div class="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 border border-neutral-200 mt-8 mb-4">
      <button @click="goBack" class="mb-6 px-4 py-2 bg-cyan-800 text-white rounded hover:bg-cyan-700 font-medium">← Volver</button>
      <h1 class="text-3xl font-heading font-bold mb-6 text-neutral-900 text-center">Términos y Condiciones de Ferrepoco</h1>
      <div class="space-y-6 text-neutral-800 text-base">
        <section>
          <h2 class="text-xl font-bold mb-2">1. Aceptación de los Términos</h2>
          <p>Al registrarte y utilizar los servicios de Ferrepoco, aceptas de manera irrevocable estos términos y condiciones. Si no estás de acuerdo, debes abandonar la plataforma inmediatamente. El uso indebido de la plataforma será perseguido legalmente.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">2. Registro y Cuenta</h2>
          <ul class="list-disc pl-6">
            <li>Debes proporcionar información veraz, actualizada y completa al crear tu cuenta. Cualquier falsedad será motivo de suspensión inmediata y denuncia.</li>
            <li>Eres el único responsable de la confidencialidad de tu contraseña y datos de acceso. Ferrepoco no se hace responsable por accesos no autorizados derivados de negligencia del usuario.</li>
            <li>Está estrictamente prohibido crear cuentas falsas, duplicadas o suplantar a otras personas. Ferrepoco se reserva el derecho de eliminar cuentas sospechosas sin previo aviso.</li>
            <li>El usuario será responsable de todas las actividades realizadas desde su cuenta.</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">3. Uso de la Plataforma</h2>
          <ul class="list-disc pl-6">
            <li>Ferrepoco es exclusivamente para la compra y gestión de productos ferreteros. Cualquier otro uso está prohibido.</li>
            <li>No se permite el uso de la plataforma para actividades ilegales, fraudulentas, ofensivas, difamatorias o que atenten contra la moral y buenas costumbres.</li>
            <li>Ferrepoco se reserva el derecho de suspender, bloquear o eliminar cuentas y pedidos que incumplan estos términos, sin derecho a reembolso.</li>
            <li>El usuario acepta que cualquier intento de manipulación, hackeo o acceso no autorizado será reportado a las autoridades competentes.</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">4. Compras, Pagos y Fraudes</h2>
          <ul class="list-disc pl-6">
            <li>Los precios, promociones y disponibilidad pueden cambiar en cualquier momento y sin previo aviso.</li>
            <li>Las compras están sujetas a verificación de stock y validación de pago. Ferrepoco puede cancelar cualquier pedido sospechoso de fraude.</li>
            <li>Los pagos deben realizarse a través de los métodos autorizados. Cualquier intento de pago fraudulento será denunciado.</li>
            <li>Ferrepoco se reserva el derecho de retener, cancelar o investigar cualquier transacción sospechosa.</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">5. Devoluciones, Garantías y Exclusiones</h2>
          <ul class="list-disc pl-6">
            <li>Las devoluciones deben solicitarse dentro del plazo indicado en la plataforma. Solicitudes fuera de plazo serán rechazadas sin excepción.</li>
            <li>Los productos deben estar en condiciones originales, sin uso y con empaque intacto para aplicar a devolución. Productos dañados, usados o incompletos no serán aceptados.</li>
            <li>Las garantías se aplican según la política de cada fabricante. Ferrepoco no se responsabiliza por garantías no cubiertas por el fabricante.</li>
            <li>Ferrepoco se reserva el derecho de rechazar devoluciones que no cumplan con los requisitos establecidos.</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">6. Privacidad, Protección de Datos y Seguridad</h2>
          <ul class="list-disc pl-6">
            <li>Tu información personal será tratada conforme a nuestra <RouterLink to="/privacidad" class="text-primary underline">Política de Privacidad</RouterLink>. El usuario acepta el uso de sus datos para fines comerciales y de seguridad.</li>
            <li>No compartimos tus datos con terceros sin tu consentimiento, salvo requerimiento legal o por orden judicial.</li>
            <li>Ferrepoco implementa medidas de seguridad, pero no garantiza protección absoluta contra ataques informáticos. El usuario asume el riesgo de uso.</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">7. Propiedad Intelectual y Restricciones</h2>
          <ul class="list-disc pl-6">
            <li>Todo el contenido, marcas, logos y software de Ferrepoco son propiedad exclusiva de Ferrepoco o sus proveedores. Está prohibida su reproducción, distribución o uso sin autorización expresa.</li>
            <li>El usuario no podrá copiar, modificar, descompilar ni realizar ingeniería inversa sobre la plataforma.</li>
          </ul>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">8. Modificaciones y Terminación</h2>
          <p>Ferrepoco puede modificar estos términos en cualquier momento y sin previo aviso. Si se realizan cambios, serás notificado por correo electrónico a la dirección registrada en tu cuenta. Si no contactas al equipo de Ferrepoco para solicitar la eliminación de tu cuenta dentro de una semana desde la notificación, se considerará que aceptas automáticamente los nuevos términos y condiciones. El uso continuado de la plataforma implica aceptación de los cambios. Ferrepoco puede suspender o terminar el servicio en cualquier momento, sin responsabilidad alguna.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">9. Limitación de Responsabilidad</h2>
          <p>Ferrepoco no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes derivados del uso o imposibilidad de uso de la plataforma, productos o servicios.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">10. Jurisdicción y Ley Aplicable</h2>
          <p>Estos términos se rigen por las leyes de Venezuela. Cualquier controversia será resuelta ante los tribunales competentes de la ciudad de Caracas.</p>
        </section>
        <section>
          <h2 class="text-xl font-bold mb-2">11. Contacto</h2>
          <p>Para dudas, reclamos o denuncias, contáctanos a través de WhatsApp al <a href="https://wa.me/584244252755" target="_blank" class="text-primary underline">0424-4252755</a> o por correo electrónico. El usuario acepta que cualquier comunicación podrá ser registrada y utilizada como evidencia.</p>
        </section>
      </div>
      <div class="mt-8 flex justify-center">
        <button @click="goRegister" class="px-6 py-3 bg-primary text-white rounded-lg font-heading font-bold hover:bg-primary/90">He leído todo</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter();
function goBack() {
  router.push('/register');
}
function goRegister() {
  router.push('/register');
}
</script>

<style scoped>
.font-heading {
  font-family: 'Montserrat', sans-serif;
}
</style>
