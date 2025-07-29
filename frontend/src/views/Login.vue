<template>
  <div class="login-page">
    <h2>Bienvenido a Ferrepoco</h2>
    <LoginForm />
    <p>Prueba con:</p>
    <ul>
      <li>**Admin:** admin@ferrepoco.com / password</li>
      <li>**Empleado:** empleado@ferrepoco.com / password</li>
      <li>**Cliente:** cliente@ferrepoco.com / password</li>
    </ul>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import { useAuthStore } from '../stores/auth'; // Para inicializar el estado
import { onMounted } from 'vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
  },
  setup() {
    const authStore = useAuthStore();
    onMounted(() => {
      authStore.initializeAuth(); // Intenta cargar el usuario si ya ha iniciado sesión
    });
  }
};
</script>

<style scoped>
.login-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 5px;
}
</style>