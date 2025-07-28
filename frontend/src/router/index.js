import { createRouter, createWebHistory } from 'vue-router';
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

export default router;
