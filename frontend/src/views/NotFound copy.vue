<template>
  <div class="not-found">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que buscas no existe o no tienes permiso para verla.</p>
    <router-link to="/">Volver al inicio</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  margin-top: 50px;
  text-align: center;
}
h1 {
  color: #e74c3c;
}
p {
  margin-bottom: 20px;
}
</style>