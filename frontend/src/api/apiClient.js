import axios from 'axios';

<<<<<<< HEAD
// Configura la base URL para todas las peticiones
const apiClient = axios.create({
  baseURL: '/api' // Esto usará el proxy configurado en vue.config.js
=======
// Configura la base URL para todas las peticiones (usa el proxy de Vite: vite.config.js)
const apiClient = axios.create({
  baseURL: '/api' // Proxy configurado en vite.config.js
>>>>>>> unificado
});

// Opcional: Interceptor para enviar el rol del usuario en cada petición
// Esto simula la autenticación basada en roles para el backend JSON
apiClient.interceptors.request.use(config => {
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');
  if (userRole) {
    config.headers['x-user-role'] = userRole;
  }
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


export default apiClient;