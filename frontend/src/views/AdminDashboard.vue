<template>
  <div id="webcrumbs">
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1519520104014-df63821cb6f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxmZXJyZXRlcmlhfGVufDB8fHx8MTc1Mzc2NjI5OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Ferrepoco Logo"
                class="h-10 w-10 mr-3 rounded-md bg-primary-500"
                keywords="ferreteria, logo, construccion, herramientas"
              />
              <h1 class="text-2xl font-bold text-primary-700">Ferrepoco</h1>
            </div>
            <nav class="hidden md:flex space-x-8">
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors">Inicio</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors">Productos</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors">Pedidos</a>
              <a href="#" class="text-gray-700 hover:text-primary-600 transition-colors">Reportes</a>
            </nav>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <details class="group">
                  <summary class="list-none cursor-pointer">
                    <button class="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                      <span class="material-symbols-outlined">notifications</span>
                      <span class="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
                    </button>
                  </summary>
                  <div class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div class="p-3 border-b border-gray-200">
                      <h3 class="font-semibold">Notificaciones</h3>
                    </div>
                    <div class="max-h-96 overflow-y-auto">
                      <a href="#" class="block p-4 hover:bg-gray-50 border-b border-gray-100">
                        <p class="font-medium text-sm">Stock bajo en producto: Clavos 2″</p>
                        <p class="text-xs text-gray-500 mt-1">Hace 5 minutos</p>
                      </a>
                      <a href="#" class="block p-4 hover:bg-gray-50 border-b border-gray-100">
                        <p class="font-medium text-sm">Nuevo pedido #1082</p>
                        <p class="text-xs text-gray-500 mt-1">Hace 30 minutos</p>
                      </a>
                      <a href="#" class="block p-4 hover:bg-gray-50">
                        <p class="font-medium text-sm">Actualización de precio completada</p>
                        <p class="text-xs text-gray-500 mt-1">Hace 2 horas</p>
                      </a>
                    </div>
                  </div>
                </details>
              </div>
              <UserProfileBadge />
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">Ventas Totales</p>
                <h3 class="text-2xl font-bold">${{ totalSales.toFixed(2) }}</h3>
                <p class="text-xs text-green-500 mt-2 flex items-center">
                  <span class="material-symbols-outlined text-sm mr-1">trending_up</span> 12% más que ayer
                </p>
              </div>
              <div class="p-3 bg-blue-100 rounded-full">
                <span class="material-symbols-outlined text-blue-600">point_of_sale</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">Pedidos Nuevos</p>
                <h3 class="text-2xl font-bold">{{ ordersThisMonth }}</h3>
                <p class="text-xs text-green-500 mt-2 flex items-center">
                  <span class="material-symbols-outlined text-sm mr-1">trending_up</span> 5% más que ayer
                </p>
              </div>
              <div class="p-3 bg-green-100 rounded-full">
                <span class="material-symbols-outlined text-green-600">shopping_cart</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">Clientes Nuevos</p>
                <h3 class="text-2xl font-bold">{{ clientsCount }}</h3>
                <p class="text-xs text-green-500 mt-2 flex items-center">
                  <span class="material-symbols-outlined text-sm mr-1">trending_up</span> 2% más que ayer
                </p>
              </div>
              <div class="p-3 bg-purple-100 rounded-full">
                <span class="material-symbols-outlined text-purple-600">person_add</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">Alertas de Stock</p>
                <h3 class="text-2xl font-bold">{{ lowStockProducts.length }}</h3>
                <p class="text-xs text-red-500 mt-2 flex items-center">
                  <span class="material-symbols-outlined text-sm mr-1">warning</span> Requiere atención
                </p>
              </div>
              <div class="p-3 bg-red-100 rounded-full">
                <span class="material-symbols-outlined text-red-600">inventory</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div class="bg-white rounded-lg shadow col-span-1 lg:col-span-2">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold">Ventas Mensuales</h3>
            </div>
            <div class="p-6 h-80">
              <canvas id="monthlySalesChart"></canvas>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold">Productos con Stock Bajo</h3>
            </div>
            <div class="p-4">
              <ul class="divide-y divide-gray-200">
                <li class="py-3 flex justify-between items-center" v-for="product in lowStockProducts" :key="product.id">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                      <span class="material-symbols-outlined text-gray-600">build</span>
                    </div>
                    <div>
                      <p class="font-medium">{{ product.name }}</p>
                      <p class="text-sm text-gray-500">{{ product.stock }} unidades</p>
                    </div>
                  </div>
                  <button class="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors">
                    <span class="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </li>
              </ul>
              <div class="pt-3 text-center">
                <a
                  href="#"
                  class="text-primary-600 hover:text-primary-800 font-medium text-sm inline-flex items-center"
                >
                  Ver todos los productos con stock bajo
                  <span class="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow mb-8">
          <div class="p-6 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-semibold">Usuarios</h3>
            <div class="flex space-x-2">
              <button class="p-2 rounded-md hover:bg-gray-100 transition-colors" @click="fetchUsers">
                <span class="material-symbols-outlined">refresh</span>
              </button>
              <RouterLink to="/admin/users" class="inline-flex items-center px-3 py-2 rounded-md bg-primary-600 text-white text-sm hover:bg-primary-700">
                <span class="material-symbols-outlined mr-1">group_add</span> Gestionar usuarios
              </RouterLink>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> ID </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Usuario </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Rol </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Acciones </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.id }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.username }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-red-600 hover:text-red-900" @click="disableUser(user.id)">
                      <span class="material-symbols-outlined">block</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold">Actividades Recientes</h3>
            </div>
            <div class="p-6">
              <ul class="space-y-4">
                <li class="flex items-start">
                  <div class="bg-blue-100 rounded-full p-2 mr-4">
                    <span class="material-symbols-outlined text-blue-600">inventory</span>
                  </div>
                  <div>
                    <p class="text-sm">
                      <span class="font-medium">Ana Sánchez</span> ha actualizado el inventario de
                      <span class="font-medium">Tuercas 5mm</span>.
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Hace 10 minutos</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="bg-green-100 rounded-full p-2 mr-4">
                    <span class="material-symbols-outlined text-green-600">shopping_cart</span>
                  </div>
                  <div>
                    <p class="text-sm">
                      <span class="font-medium">Pedro González</span> ha procesado el pedido
                      <span class="font-medium">#1082</span>.
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Hace 30 minutos</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="bg-purple-100 rounded-full p-2 mr-4">
                    <span class="material-symbols-outlined text-purple-600">person_add</span>
                  </div>
                  <div>
                    <p class="text-sm">
                      <span class="font-medium">Admin</span> ha registrado un nuevo cliente:
                      <span class="font-medium">Roberto Méndez</span>.
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Hace 2 horas</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="bg-yellow-100 rounded-full p-2 mr-4">
                    <span class="material-symbols-outlined text-yellow-600">payments</span>
                  </div>
                  <div>
                    <p class="text-sm">
                      <span class="font-medium">Sistema</span> ha actualizado los precios de
                      <span class="font-medium">15 productos</span>.
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Hace 3 horas</p>
                  </div>
                </li>
              </ul>
              <div class="pt-4 text-center">
                <a
                  href="#"
                  class="text-primary-600 hover:text-primary-800 font-medium text-sm inline-flex items-center"
                >
                  Ver todas las actividades
                  <span class="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-lg shadow">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-semibold">Categorías Más Vendidas</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium">Herramientas Manuales</span>
                    <span class="text-sm text-gray-500">32%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-primary-600 h-2 rounded-full" style="width:32%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium">Materiales de Construcción</span>
                    <span class="text-sm text-gray-500">28%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width:28%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium">Pinturas y Acabados</span>
                    <span class="text-sm text-gray-500">18%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-500 h-2 rounded-full" style="width:18%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium">Plomería</span>
                    <span class="text-sm text-gray-500">15%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-yellow-500 h-2 rounded-full" style="width:15%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-sm font-medium">Electricidad</span>
                    <span class="text-sm text-gray-500">7%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-red-500 h-2 rounded-full" style="width:7%"></div>
                  </div>
                </div>
              </div>
              <div class="pt-6 h-52">
                <div class="w-full h-full">
                  <div class="flex items-center justify-center h-full bg-gray-50 rounded">
                    <div class="text-center">
                      <span class="material-symbols-outlined text-4xl text-gray-400 mb-3">pie_chart</span>
                      <p class="text-gray-500">Gráfico de categorías más vendidas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer class="bg-white shadow-inner mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="md:flex md:items-center md:justify-between">
            <div class="flex justify-center md:order-2">
              <a href="#" class="text-gray-400 hover:text-gray-500 mx-2">
                <i class="fa-brands fa-facebook text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500 mx-2">
                <i class="fa-brands fa-instagram text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-gray-500 mx-2">
                <i class="fa-brands fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

import apiClient from '../api/apiClient';
import Chart from 'chart.js/auto';
import { useAuthStore } from '../stores/auth';
import UserProfileBadge from '../components/UserProfileBadge.vue';

export default {
  components: { UserProfileBadge },
  data() {
    return {
      users: [],
      totalSales: 0,
      orders: [], // Initialize orders as an empty array
      lowStockProducts: [], // Initialize low-stock products array
      monthlySalesChartInstance: null, // Store Chart.js instance
      authStore: null, // Pinia auth store instance
    };
  },
  computed: {
    ordersThisMonth() {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      return this.orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getFullYear() === currentYear && orderDate.getMonth() === currentMonth;
      }).length;
    },
    clientsCount() {
      return this.users.filter(user => user.role === 'client' || user.role === 'cliente').length;
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await apiClient.get('/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async disableUser(userId) {
      try {
        await apiClient.delete(`/users/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
      } catch (error) {
        console.error('Error disabling user:', error);
      }
    },
    async fetchTotalSales() {
      try {
        const response = await apiClient.get('/orders');
        this.orders = response.data;
        this.totalSales = this.orders.reduce((sum, order) => sum + order.total, 0);
        // Ensure chart is rendered after DOM update
        this.$nextTick(() => {
          this.renderMonthlySalesChart();
        });
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    },
    async fetchLowStockProducts() {
      try {
        const response = await apiClient.get('/products');
        this.lowStockProducts = response.data.filter(product => product.stock <= 50); // Filter products with stock <= 50
      } catch (error) {
        console.error('Error fetching low-stock products:', error);
      }
    },
    renderMonthlySalesChart() {
      const ctx = document.getElementById('monthlySalesChart').getContext('2d');

      // Destroy previous chart instance if it exists
      if (this.monthlySalesChartInstance) {
        this.monthlySalesChartInstance.destroy();
      }

      // Get the current year
      const currentYear = new Date().getFullYear();

      // Initialize an array to count orders per month
      const monthlyOrderCounts = Array(12).fill(0);

      // Count orders for each month
      this.orders.forEach(order => {
        const orderDate = new Date(order.date);
        if (orderDate.getFullYear() === currentYear) {
          const month = orderDate.getMonth(); // 0 = January, 11 = December
          monthlyOrderCounts[month] += 1;
        }
      });

      // Create the chart and store the instance
      this.monthlySalesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          datasets: [
            {
              label: `Orders in ${currentYear}`,
              data: monthlyOrderCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  async mounted() {
    this.authStore = useAuthStore();
    this.authStore.initializeAuth();
    await Promise.all([
      this.fetchUsers(),
      this.fetchTotalSales(),
      this.fetchLowStockProducts()
    ]);
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css);

*,
:after,
:before {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
} /*! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com*/
*,
:after,
:before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}
:after,
:before {
  --tw-content: "";
}
:host,
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family:
    Open Sans,
    ui-sans-serif,
    system-ui,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -moz-tab-size: 4;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
}
body {
  line-height: inherit;
  margin: 0;
}
hr {
  border-top-width: 1px;
  color: inherit;
  height: 0;
}
abbr:where([title]) {
  text-decoration: underline dotted;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  text-decoration: inherit;
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
pre,
samp {
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    Liberation Mono,
    Courier New,
    monospace;
  font-feature-settings: normal;
  font-size: 1em;
  font-variation-settings: normal;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
table {
  border-collapse: collapse;
  border-color: inherit;
  text-indent: 0;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font-family: inherit;
  font-feature-settings: inherit;
  font-size: 100%;
  font-variation-settings: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
}
button,
select {
  text-transform: none;
}
button,
input:where([type="button"]),
input:where([type="reset"]),
input:where([type="submit"]) {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}
:-moz-focusring {
  outline: auto;
}
:-moz-ui-invalid {
  box-shadow: none;
}
progress {
  vertical-align: baseline;
}
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}
[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}
summary {
  display: list-item;
}
blockquote,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
}
fieldset,
legend {
  padding: 0;
}
menu,
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
dialog {
  padding: 0;
}
textarea {
  resize: vertical;
}
input::placeholder,
textarea::placeholder {
  color: #9ca3af;
  opacity: 1;
}
[role="button"],
button {
  cursor: pointer;
}
:disabled {
  cursor: default;
}
audio,
canvas,
embed,
iframe,
img,
object,
svg,
video {
  display: block;
  vertical-align: middle;
}
img,
video {
  height: auto;
  max-width: 100%;
}
[hidden]:where(:not([hidden="until-found"])) {
  display: none;
}
#webcrumbs .absolute {
  position: absolute;
}
#webcrumbs .relative {
  position: relative;
}
#webcrumbs .right-0 {
  right: 0;
}
#webcrumbs .top-0 {
  top: 0;
}
#webcrumbs .z-10 {
  z-index: 10;
}
#webcrumbs .col-span-1 {
  grid-column: span 1 / span 1;
}
#webcrumbs .mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}
#webcrumbs .mx-auto {
  margin-left: auto;
  margin-right: auto;
}
#webcrumbs .my-1 {
  margin-top: 4px;
}
#webcrumbs .mb-1,
#webcrumbs .my-1 {
  margin-bottom: 4px;
}
#webcrumbs .mb-3 {
  margin-bottom: 12px;
}
#webcrumbs .mb-8 {
  margin-bottom: 32px;
}
#webcrumbs .ml-1 {
  margin-left: 4px;
}
#webcrumbs .ml-4 {
  margin-left: 16px;
}
#webcrumbs .mr-1 {
  margin-right: 4px;
}
#webcrumbs .mr-3 {
  margin-right: 12px;
}
#webcrumbs .mr-4 {
  margin-right: 16px;
}
#webcrumbs .mt-1 {
  margin-top: 4px;
}
#webcrumbs .mt-12 {
  margin-top: 48px;
}
#webcrumbs .mt-2 {
  margin-top: 8px;
}
#webcrumbs .block {
  display: block;
}
#webcrumbs .flex {
  display: flex;
}
#webcrumbs .inline-flex {
  display: inline-flex;
}
#webcrumbs .grid {
  display: grid;
}
#webcrumbs .hidden {
  display: none;
}
#webcrumbs .h-10 {
  height: 40px;
}
#webcrumbs .h-2 {
  height: 8px;
}
#webcrumbs .h-4 {
  height: 16px;
}
#webcrumbs .h-52 {
  height: 208px;
}
#webcrumbs .h-8 {
  height: 32px;
}
#webcrumbs .h-80 {
  height: 320px;
}
#webcrumbs .h-full {
  height: 100%;
}
#webcrumbs .max-h-96 {
  max-height: 384px;
}
#webcrumbs .min-h-screen {
  min-height: 100vh;
}
#webcrumbs .w-10 {
  width: 40px;
}
#webcrumbs .w-4 {
  width: 16px;
}
#webcrumbs .w-48 {
  width: 192px;
}
#webcrumbs .w-8 {
  width: 32px;
}
#webcrumbs .w-80 {
  width: 320px;
}
#webcrumbs .w-full {
  width: 100%;
}
#webcrumbs .min-w-full {
  min-width: 100%;
}
#webcrumbs .max-w-7xl {
  max-width: 80rem;
}
#webcrumbs .cursor-pointer {
  cursor: pointer;
}
#webcrumbs .list-none {
  list-style-type: none;
}
#webcrumbs .grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
#webcrumbs .flex-row {
  flex-direction: row;
}
#webcrumbs .items-start {
  align-items: flex-start;
}
#webcrumbs .items-center {
  align-items: center;
}
#webcrumbs .justify-center {
  justify-content: center;
}
#webcrumbs .justify-between {
  justify-content: space-between;
}
#webcrumbs .gap-4 {
  gap: 16px;
}
#webcrumbs .gap-6 {
  gap: 24px;
}
#webcrumbs .gap-8 {
  gap: 32px;
}
#webcrumbs :is(.space-x-2 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(8px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(8px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.space-x-4 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(16px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(16px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.space-x-8 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(32px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(32px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.space-y-4 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-y-reverse: 0;
  margin-bottom: calc(16px * var(--tw-space-y-reverse));
  margin-top: calc(16px * (1 - var(--tw-space-y-reverse)));
}
#webcrumbs :is(.divide-y > :not([hidden]) ~ :not([hidden])) {
  --tw-divide-y-reverse: 0;
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
  border-top-width: calc(1px * (1 - var(--tw-divide-y-reverse)));
}
#webcrumbs :is(.divide-gray-200 > :not([hidden]) ~ :not([hidden])) {
  --tw-divide-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-divide-opacity, 1));
}
#webcrumbs .overflow-x-auto {
  overflow-x: auto;
}
#webcrumbs .overflow-y-auto {
  overflow-y: auto;
}
#webcrumbs .whitespace-nowrap {
  white-space: nowrap;
}
#webcrumbs .rounded {
  border-radius: 12px;
}
#webcrumbs .rounded-full {
  border-radius: 9999px;
}
#webcrumbs .rounded-lg {
  border-radius: 24px;
}
#webcrumbs .rounded-md {
  border-radius: 18px;
}
#webcrumbs .border {
  border-width: 1px;
}
#webcrumbs .border-2 {
  border-width: 2px;
}
#webcrumbs .border-b {
  border-bottom-width: 1px;
}
#webcrumbs .border-t {
  border-top-width: 1px;
}
#webcrumbs .border-gray-100 {
  --tw-border-opacity: 1;
  border-color: rgb(243 244 246 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
#webcrumbs .border-primary-300 {
  --tw-border-opacity: 1;
  border-color: rgb(183 169 255 / var(--tw-border-opacity, 1));
}
#webcrumbs .bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-gray-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(229 231 235 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 241 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(115 65 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-primary-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(99 27 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-purple-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 232 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
#webcrumbs .bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
#webcrumbs .p-2 {
  padding: 8px;
}
#webcrumbs .p-3 {
  padding: 12px;
}
#webcrumbs .p-4 {
  padding: 16px;
}
#webcrumbs .p-6 {
  padding: 24px;
}
#webcrumbs .px-2 {
  padding-left: 8px;
  padding-right: 8px;
}
#webcrumbs .px-3 {
  padding-left: 12px;
  padding-right: 12px;
}
#webcrumbs .px-4 {
  padding-left: 16px;
  padding-right: 16px;
}
#webcrumbs .px-6 {
  padding-left: 24px;
  padding-right: 24px;
}
#webcrumbs .py-1 {
  padding-bottom: 4px;
  padding-top: 4px;
}
#webcrumbs .py-2 {
  padding-bottom: 8px;
  padding-top: 8px;
}
#webcrumbs .py-3 {
  padding-bottom: 12px;
  padding-top: 12px;
}
#webcrumbs .py-4 {
  padding-bottom: 16px;
  padding-top: 16px;
}
#webcrumbs .py-6 {
  padding-bottom: 24px;
  padding-top: 24px;
}
#webcrumbs .py-8 {
  padding-bottom: 32px;
  padding-top: 32px;
}
#webcrumbs .pt-3 {
  padding-top: 12px;
}
#webcrumbs .pt-4 {
  padding-top: 16px;
}
#webcrumbs .pt-6 {
  padding-top: 24px;
}
#webcrumbs .text-left {
  text-align: left;
}
#webcrumbs .text-center {
  text-align: center;
}
#webcrumbs .text-2xl {
  font-size: 24px;
  line-height: 31.200000000000003px;
}
#webcrumbs .text-4xl {
  font-size: 36px;
  line-height: 41.4px;
}
#webcrumbs .text-lg {
  font-size: 18px;
  line-height: 27px;
}
#webcrumbs .text-sm {
  font-size: 14px;
  line-height: 21px;
}
#webcrumbs .text-xl {
  font-size: 20px;
  line-height: 28px;
}
#webcrumbs .text-xs {
  font-size: 12px;
  line-height: 19.200000000000003px;
}
#webcrumbs .font-bold {
  font-weight: 700;
}
#webcrumbs .font-medium {
  font-weight: 500;
}
#webcrumbs .font-semibold {
  font-weight: 600;
}
#webcrumbs .uppercase {
  text-transform: uppercase;
}
#webcrumbs .leading-5 {
  line-height: 1.25rem;
}
#webcrumbs .tracking-wider {
  letter-spacing: 0.05em;
}
#webcrumbs .text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-green-500 {
  --tw-text-opacity: 1;
  color: rgb(34 197 94 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-indigo-600 {
  --tw-text-opacity: 1;
  color: rgb(79 70 229 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-primary-600 {
  --tw-text-opacity: 1;
  color: rgb(99 27 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-primary-700 {
  --tw-text-opacity: 1;
  color: rgb(97 27 248 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-purple-600 {
  --tw-text-opacity: 1;
  color: rgb(147 51 234 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
#webcrumbs .text-yellow-800 {
  --tw-text-opacity: 1;
  color: rgb(133 77 14 / var(--tw-text-opacity, 1));
}
#webcrumbs .shadow {
  --tw-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
}
#webcrumbs .shadow,
#webcrumbs .shadow-inner {
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
#webcrumbs .shadow-inner {
  --tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  --tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);
}
#webcrumbs .shadow-lg {
  --tw-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
}
#webcrumbs .shadow-lg,
#webcrumbs .shadow-md {
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
#webcrumbs .shadow-md {
  --tw-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
}
#webcrumbs .transition-colors {
  transition-duration: 0.15s;
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#webcrumbs .transition-shadow {
  transition-duration: 0.15s;
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
#webcrumbs {
  font-family: Open Sans !important;
  font-size: 16px !important;
}
#webcrumbs :is(.bg-primary-50) {
  color: rgba(0, 0, 0, 0.9) !important;
}
#webcrumbs :is(.bg-primary-500) {
  color: hsla(0, 0%, 100%, 0.9) !important;
}
#webcrumbs :is(.bg-primary-600) {
  color: hsla(0, 0%, 100%, 0.9) !important;
}
#webcrumbs .hover\:bg-gray-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-gray-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-primary-100:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(233 229 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:bg-primary-50:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(243 241 255 / var(--tw-bg-opacity, 1));
}
#webcrumbs .hover\:text-gray-500:hover {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:text-indigo-900:hover {
  --tw-text-opacity: 1;
  color: rgb(49 46 129 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:text-primary-600:hover {
  --tw-text-opacity: 1;
  color: rgb(99 27 255 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:text-primary-800:hover {
  --tw-text-opacity: 1;
  color: rgb(70 7 208 / var(--tw-text-opacity, 1));
}
#webcrumbs .hover\:shadow-lg:hover {
  --tw-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored:
    0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow:
    var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
    var(--tw-shadow);
}
@media (min-width: 640px) {
  #webcrumbs .sm\:px-6 {
    padding-left: 24px;
    padding-right: 24px;
  }
}
@media (min-width: 768px) {
  #webcrumbs .md\:order-2 {
    order: 2;
  }
  #webcrumbs .md\:block {
    display: block;
  }
  #webcrumbs .md\:flex {
    display: flex;
  }
  #webcrumbs .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  #webcrumbs .md\:items-center {
    align-items: center;
  }
  #webcrumbs .md\:justify-between {
    justify-content: space-between;
  }
}
@media (min-width: 1024px) {
  #webcrumbs .lg\:col-span-2 {
    grid-column: span 2 / span 2;
  }
  #webcrumbs .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  #webcrumbs .lg\:grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  #webcrumbs .lg\:px-8 {
    padding-left: 32px;
    padding-right: 32px;
  }
}
</style>