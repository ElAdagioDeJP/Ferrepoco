import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiService } from '../services/apiService';
import router from '../router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')));
  const token = ref(localStorage.getItem('token'));

  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role);

  async function login(email, password) {
    try {
      const users = await apiService.getUsers();
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        // Simular la creación de un token
        const simulatedToken = btoa(`${email}:${password}`);
        
        user.value = { id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role };
        token.value = simulatedToken;

        localStorage.setItem('user', JSON.stringify(user.value));
        localStorage.setItem('token', token.value);
        
        await router.push('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  }

  function checkAuth() {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      user.value = JSON.parse(storedUser);
      token.value = storedToken;
    }
  }

  // Cargar estado de autenticación al iniciar
  checkAuth();

  return { user, token, isAuthenticated, userRole, login, logout };
});
