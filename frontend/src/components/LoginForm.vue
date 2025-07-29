<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Usuario (email):</label>
      <input type="text" id="username" v-model="username" required>
    </div>
    <div>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Iniciar Sesión</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<script>
import { ref } from 'vue';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginForm',
  setup() {
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const authStore = useAuthStore();
    const router = useRouter();

    const handleSubmit = async () => {
      errorMessage.value = '';
      try {
        const response = await apiClient.post('/auth/login', {
          username: username.value,
          password: password.value
        });
        const user = response.data.user;
        authStore.login(user); // Guarda la información del usuario en el store

        // --- Polimorfismo en Tiempo de Ejecución (Sobreescritura de iniciarSesion simulada) ---
        // Redirigir según el rol del usuario
        if (user.role === 'admin') {
          router.push('/admin');
        } else if (user.role === 'employee') {
          router.push('/employee');
        } else if (user.role === 'client') {
          router.push('/client');
        } else {
          errorMessage.value = 'Role not recognized.';
        }

      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'Error al iniciar sesión.';
        console.error('Login error:', error);
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleSubmit
    };
  }
};
</script>

<style scoped>
form {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 400px;
  background-color: #f9f9f9;
}
div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="text"],
input[type="password"] {
  width: calc(100% - 20px);
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  background-color: #42b983;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #368a68;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>