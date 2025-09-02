import { defineStore } from 'pinia';
<<<<<<< HEAD
=======
import apiClient from '../api/apiClient';
>>>>>>> unificado

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
<<<<<<< HEAD
    userRole: null
=======
  userRole: null
>>>>>>> unificado
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUserRole: (state) => state.userRole,
    isAdmin: (state) => state.userRole === 'admin',
<<<<<<< HEAD
=======
  avatarUrl: (state) => state.user?.imagen_url || null,
>>>>>>> unificado
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
<<<<<<< HEAD
      this.token = userData.token; // Guardar el token en el estado
      // Persistir datos en localStorage
      localStorage.setItem('userRole', this.userRole);
      localStorage.setItem('userId', userData.id); // Para persistir el ID del usuario
      localStorage.setItem('token', userData.token); // Para persistir el token
      if (userData.nombre) localStorage.setItem('nombre', userData.nombre);
      if (userData.apellido) localStorage.setItem('apellido', userData.apellido);
      if (userData.username || userData.correo_electronico) localStorage.setItem('username', userData.username || userData.correo_electronico);
      // Admin is the highest role and has all privileges
=======
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
  if (userData.imagen_url) localStorage.setItem('imagen_url', userData.imagen_url);
>>>>>>> unificado
    },
    logout() {
      this.user = null;
      this.token = null;
      this.userRole = null;
<<<<<<< HEAD
      // Eliminar datos de localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('token'); // Eliminar el token
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      localStorage.removeItem('username');
    },
    // Método para cargar el estado del usuario al recargar la página
    initializeAuth() {
      const storedRole = localStorage.getItem('userRole');
      const storedId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token'); // Recuperar el token
      const nombre = localStorage.getItem('nombre') || undefined;
      const apellido = localStorage.getItem('apellido') || undefined;
      const username = localStorage.getItem('username') || undefined;
      if (storedRole && storedId && storedToken) {
        this.user = { id: storedId, role: storedRole, nombre, apellido, username };
        this.userRole = storedRole;
        this.token = storedToken; // Establecer el token en el estado
=======

      // Eliminar datos de localStorage
      localStorage.removeItem('userRole');
      localStorage.removeItem('userId');
      localStorage.removeItem('token'); // ← ¡ESTA LÍNEA FALTABA!
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      localStorage.removeItem('username');
      localStorage.removeItem('imagen_url');
    },
    initializeAuth() {
      const storedRole = localStorage.getItem('userRole');
      const storedId = localStorage.getItem('userId');
      const storedToken = localStorage.getItem('token'); // ← Recuperar token
      const nombre = localStorage.getItem('nombre') || undefined;
      const apellido = localStorage.getItem('apellido') || undefined;
      const username = localStorage.getItem('username') || undefined;
      const imagen_url = localStorage.getItem('imagen_url') || undefined;

      if (storedRole && storedId && storedToken) {
        this.user = {
          id: storedId,
          role: storedRole,
          nombre,
          apellido,
          username,
          imagen_url
        };
        this.userRole = storedRole;
        this.token = storedToken; // ← Establecer token en el estado
      }
    },
    setAvatar(url) {
      if (!this.user) this.user = {};
      this.user.imagen_url = url;
      if (url) localStorage.setItem('imagen_url', url);
      else localStorage.removeItem('imagen_url');
    },
    async refreshMe() {
      try {
        const res = await apiClient.get('/users/me');
        const u = res.data?.user;
        if (!u) return;
        this.user = { ...(this.user || {}), ...u, token: this.token };
        this.userRole = (u.role || this.userRole || '').toLowerCase();
        if (u.nombre) localStorage.setItem('nombre', u.nombre); else localStorage.removeItem('nombre');
        if (u.apellido) localStorage.setItem('apellido', u.apellido); else localStorage.removeItem('apellido');
        if (u.username) localStorage.setItem('username', u.username);
        if (u.imagen_url) localStorage.setItem('imagen_url', u.imagen_url); else localStorage.removeItem('imagen_url');
      } catch (e) {
        // ignore
>>>>>>> unificado
      }
    }
  }
});