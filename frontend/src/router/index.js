import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import EmployeeDashboard from '../views/EmployeeDashboard.vue';
import ClientDashboard from '../views/ClientDashboard.vue';
import NotFound from '../views/NotFound.vue';
import Register from '../views/Register.vue';
import ProductsManager from '../views/ProductsManager.vue';
import OrdersManager from '../views/OrdersManager.vue';
import AdminUsers from '../views/AdminUsers.vue';
<<<<<<< HEAD
=======
import PasarelaDePago from '../views/PasarelaDePago.vue';
import Payment from '../views/Payment.vue';
import CategoryView from '../views/CategoryView.vue';
import ClientProfile from '../views/ClientProfile.vue';
>>>>>>> unificado

const routes = [
  {
    path: '/',
    name: 'Login',
  component: Login,
  alias: ['/login']
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: AdminUsers,
    meta: { requiresAuth: true, roles: ['admin'] }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
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
<<<<<<< HEAD
=======
    path: '/checkout',
    name: 'Checkout',
    component: PasarelaDePago,
    meta: { requiresAuth: true, roles: ['client'] }
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    meta: { requiresAuth: true, roles: ['client'] }
  },
  {
    path: '/me',
    name: 'ClientProfile',
    component: ClientProfile,
    meta: { requiresAuth: true, roles: ['client'] }
  },
  {
    path: '/categories/:id',
    name: 'Category',
    component: CategoryView,
    meta: { requiresAuth: true, roles: ['client'] }
  },
  {
>>>>>>> unificado
    path: '/products',
    name: 'ProductsManager',
    component: ProductsManager,
    meta: { requiresAuth: true, roles: ['admin', 'employee'] }
  },
  {
    path: '/orders',
    name: 'OrdersManager',
    component: OrdersManager,
    meta: { requiresAuth: true, roles: ['admin', 'employee'] }
  },
  {
    path: '/:catchAll(.*)', // Ruta para 404
    name: 'NotFound',
    component: NotFound
  }
];

const base = (import.meta?.env?.BASE_URL) ?? (globalThis?.process?.env?.BASE_URL) ?? '/';

const router = createRouter({
  // Works in both Vite (import.meta.env.BASE_URL) and Vue CLI (process.env.BASE_URL)
  history: createWebHistory(base),
  routes
});

// Guardia de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.user) authStore.initializeAuth();
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