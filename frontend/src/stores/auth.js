"esto es un ejemplo de código para un store de autenticación en Vue.js que maneja el estado del usuario autenticado, incluyendo su rol y la información del token JWT."
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: 12345, // Usado para almacenar el token JWT
    userRole: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserRole: (state) => state.userRole,
    isAdmin: (state) => state.userRole === 'Admin', // Admin has all privileges
  },
  actions: {
    login(userData) {
      this.user = userData;
      this.userRole = userData.role;
      this.token = userData.token; // Guardar el token en el estado
      // Persistir datos en localStorage
      localStorage.setItem('userRole', userData.role); // Para persistir el rol
      localStorage.setItem('userId', userData.id); // Para persistir el ID del usuario
      localStorage.setItem('token', userData.token); // Para persistir el token
      // Admin is the highest role and has all privileges
    },
    logout() {
      this.user = null;
      this.token = null;
      this.userRole = null;
      // Eliminar datos de localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('token'); // Eliminar el token
    },
    // Método para cargar el estado del usuario al recargar la página
    initializeAuth() {
      const storedRole = localStorage.getItem('userRole');
      const storedId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token'); // Recuperar el token
      if (storedRole && storedId && storedToken) {
        this.user = { id: storedId, role: storedRole };
        this.userRole = storedRole;
        this.token = storedToken; // Establecer el token en el estado
      }
    }
  }
});