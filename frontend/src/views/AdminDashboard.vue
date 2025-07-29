<template>
  <div class="dashboard">
    <h2>Panel de Administrador</h2>
    <p>Bienvenido, {{ authStore.user?.username }} (Rol: {{ authStore.user?.role }})</p>

    <h3>Gestión de Usuarios</h3>
    <button @click="loadUsers">Cargar Usuarios</button>
    <div v-if="users.length">
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.username }} ({{ user.role }})
          <button @click="deleteUser(user.id)" :disabled="user.role === 'admin'">Eliminar</button>
        </li>
      </ul>
      <p v-if="userMessage">{{ userMessage }}</p>
    </div>

    <h3>Gestión de Productos</h3>
    <button @click="loadProducts">Cargar Productos</button>
    <div v-if="products.length">
      <div class="product-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product">
          <template #actions>
            <button @click="updateStockAdmin(product.id, -1, 'Venta Admin')">Vender 1</button>
            <button @click="updateStockAdmin(product.id, 5, 'Recepción Admin')">Añadir 5</button>
          </template>
        </ProductCard>
      </div>
      <p v-if="productMessage">{{ productMessage }}</p>
    </div>

    <h3>Alertas de Inventario</h3>
    <button @click="loadAlerts">Cargar Alertas de Bajo Stock</button>
    <div v-if="alerts.length">
      <ul>
        <li v-for="alert in alerts" :key="alert.productId">
          {{ alert.message }} (Stock: {{ alert.currentStock }})
        </li>
      </ul>
    </div>
    <p v-else-if="alertsLoaded">No hay alertas de bajo stock.</p>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import apiClient from '../api/apiClient';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'AdminDashboard',
  components: {
    ProductCard
  },
  setup() {
    const authStore = useAuthStore();
    const users = ref([]);
    const userMessage = ref('');
    const products = ref([]);
    const productMessage = ref('');
    const alerts = ref([]);
    const alertsLoaded = ref(false);

    // Método para cargar usuarios
    const loadUsers = async () => {
      userMessage.value = '';
      try {
        const response = await apiClient.get('/users');
        users.value = response.data;
      } catch (error) {
        userMessage.value = error.response?.data?.message || 'Error al cargar usuarios.';
        console.error('Error loading users:', error);
      }
    };

    // Método para eliminar usuario
    const deleteUser = async (userId) => {
      userMessage.value = '';
      try {
        await apiClient.delete(`/users/${userId}`);
        userMessage.value = 'Usuario eliminado con éxito.';
        await loadUsers(); // Recargar lista de usuarios
      } catch (error) {
        userMessage.value = error.response?.data?.message || 'Error al eliminar usuario.';
        console.error('Error deleting user:', error);
      }
    };

    // Método para cargar productos
    const loadProducts = async () => {
      productMessage.value = '';
      try {
        const response = await apiClient.get('/products');
        products.value = response.data;
      } catch (error) {
        productMessage.value = error.response?.data?.message || 'Error al cargar productos.';
        console.error('Error loading products:', error);
      }
    };

    // --- Polimorfismo en Tiempo de Compilación (Sobrecarga de actualizarStock en backend) ---
    // Este frontend envía el parámetro 'motivo' opcional, activando la sobrecarga en el backend
    const updateStockAdmin = async (productId, quantity, motivo) => {
      productMessage.value = '';
      try {
        const response = await apiClient.put(`/inventory/stock/${productId}`, { quantity, motivo });
        productMessage.value = response.data.message;
        await loadProducts(); // Recargar la lista de productos para ver el stock actualizado
      } catch (error) {
        productMessage.value = error.response?.data?.message || 'Error al actualizar stock.';
        console.error('Error updating stock:', error);
      }
    };

    // Cargar alertas de inventario
    const loadAlerts = async () => {
        alerts.value = [];
        alertsLoaded.value = false;
        try {
            const response = await apiClient.get('/inventory/alerts?type=low_stock'); // Ejemplo de uso de sobrecarga
            alerts.value = response.data;
            alertsLoaded.value = true;
        } catch (error) {
            console.error('Error loading alerts:', error);
            alertsLoaded.value = true;
        }
    };

    onMounted(() => {
      loadProducts(); // Cargar productos al iniciar
      loadAlerts(); // Cargar alertas al iniciar
    });

    return {
      authStore,
      users,
      userMessage,
      loadUsers,
      deleteUser,
      products,
      productMessage,
      loadProducts,
      updateStockAdmin,
      alerts,
      alertsLoaded,
      loadAlerts
    };
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  text-align: left;
}
.dashboard h2, .dashboard h3 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
button {
  background-color: #42b983;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  margin: 5px;
}
button:hover {
  background-color: #368a68;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  background-color: #f0f0f0;
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>