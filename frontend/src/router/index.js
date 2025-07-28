import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import AppLayout from '../components/layout/AppLayout.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProductsView from '../views/ProductsView.vue';
import OrdersView from '../views/OrdersView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: AppLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: DashboardView,
      },
      {
        path: 'products',
        name: 'Products',
        component: ProductsView,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: OrdersView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Redirigir al login si no está autenticado y la ruta lo requiere
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } 
  // Si el usuario está autenticado y trata de acceder al login, redirigir al dashboard
  else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/dashboard');
  } 
  // Permitir la navegación
  else {
    next();
  }
});

export default router;
