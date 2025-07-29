<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Login</router-link> |
      <router-link v-if="authStore.userRole === 'admin'" to="/admin">Admin Dashboard</router-link>
      <router-link v-if="authStore.userRole === 'employee'" to="/employee">Employee Dashboard</router-link>
      <router-link v-if="authStore.userRole === 'client'" to="/client">Client Dashboard</router-link>
      <button v-if="authStore.isAuthenticated" @click="logout">Logout</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth'; // Importa el store de autenticación
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    return {
      authStore,
      logout
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.navbar {
  margin-bottom: 20px;
}
.navbar a, .navbar button {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
.navbar button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  color: #d35400;
}
</style>