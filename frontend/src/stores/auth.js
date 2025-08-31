import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    userRole: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserRole: (state) => state.userRole,
    isAdmin: (state) => state.userRole === 'admin',
    displayName: (state) => {
      const u = state.user || {};
      const nameParts = [u.nombre, u.apellido].filter(Boolean).join(' ').trim();
      return nameParts || u.username || u.correo_electronico || 'Usuario';
    },
    roleLetter: (state) => {
      const map = { admin: 'A', employee: 'E', client: 'C' };
      return map[state.userRole] || '?';
    }
  },
  actions: {
    login(userData) {
      this.user = userData;
      this.userRole = (userData.role || '').toLowerCase();
      this.token = userData.token;

      // Persistir datos en localStorage (¡IMPORTANTE!)
      localStorage.setItem('userRole', this.userRole);
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('token', userData.token); // ← ¡ESTA LÍNEA FALTABA!

      if (userData.nombre) localStorage.setItem('nombre', userData.nombre);
      if (userData.apellido) localStorage.setItem('apellido', userData.apellido);
      if (userData.username || userData.correo_electronico) {
        localStorage.setItem('username', userData.username || userData.correo_electronico);
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.userRole = null;

      // Eliminar datos de localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('token'); // ← ¡ESTA LÍNEA FALTABA!
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      localStorage.removeItem('username');
    },
    initializeAuth() {
      const storedRole = localStorage.getItem('userRole');
      const storedId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token'); // ← Recuperar token
      const nombre = localStorage.getItem('nombre') || undefined;
      const apellido = localStorage.getItem('apellido') || undefined;
      const username = localStorage.getItem('username') || undefined;

      if (storedRole && storedId && storedToken) {
        this.user = {
          id: storedId,
          role: storedRole,
          nombre,
          apellido,
          username
        };
        this.userRole = storedRole;
        this.token = storedToken; // ← Establecer token en el estado
      }
    }
  }
});