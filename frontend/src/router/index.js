import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import EmployeeDashboard from '../views/EmployeeDashboard.vue';
import ClientDashboard from '../views/ClientDashboard.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/employee',
    name: 'EmployeeDashboard',
    component: EmployeeDashboard,
    meta: { requiresAuth: true, roles: ['employee'] }
  },
  {
    path: '/client',
    name: 'ClientDashboard',
    component: ClientDashboard,
    meta: { requiresAuth: true, roles: ['client'] }
  },
  {
    path: '/:catchAll(.*)', // Ruta para 404
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Guardia de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.meta.requiresAuth;
  const authorizedRoles = to.meta.roles;

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' }); // Redirigir al login si no está autenticado
  } else if (requiresAuth && authorizedRoles && !authorizedRoles.includes(authStore.userRole)) {
    next({ name: 'NotFound' }); // Redirigir a 404 o una página de acceso denegado
  } else {
    next(); // Continuar
  }
});

export default router;