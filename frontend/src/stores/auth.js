"esto es un ejemplo de código para un store de autenticación en Vue.js que maneja el estado del usuario autenticado, incluyendo su rol y la información del token JWT."
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null, // No usado en esta simulación, pero común en apps reales
    userRole: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserRole: (state) => state.userRole
  },
  actions: {
    login(userData) {
      this.user = userData;
      this.userRole = userData.role;
      // En una app real, guardar token en localStorage
      localStorage.setItem('userRole', userData.role); // Para persistir el rol
      localStorage.setItem('userId', userData.id); // Para persistir el ID del usuario
    },
    logout() {
      this.user = null;
      this.token = null;
      this.userRole = null;
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
    },
    // Método para cargar el estado del usuario al recargar la página
    initializeAuth() {
      const storedRole = localStorage.getItem('userRole');
      const storedId = localStorage.getItem('userId');
      if (storedRole && storedId) {
        this.user = { id: storedId, role: storedRole };
        this.userRole = storedRole;
      }
    }
  }
});