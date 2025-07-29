import axios from 'axios';

// Configura la base URL para todas las peticiones
const apiClient = axios.create({
  baseURL: '/api' // Esto usará el proxy configurado en vue.config.js
});

// Opcional: Interceptor para enviar el rol del usuario en cada petición
// Esto simula la autenticación basada en roles para el backend JSON
apiClient.interceptors.request.use(config => {
  const userRole = localStorage.getItem('userRole');
  if (userRole) {
    config.headers['x-user-role'] = userRole;
  }
  return config;
}, error => {
  return Promise.reject(error);
});


export default apiClient;