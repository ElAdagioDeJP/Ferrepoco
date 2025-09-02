const BASE_URL = '/api';

<<<<<<< HEAD
async function fetchApi(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`);
=======
async function fetchApi(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  const response = await fetch(`${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(userRole ? { 'x-user-role': userRole } : {}),
      ...options.headers
    },
    ...options
  });

>>>>>>> unificado
  if (!response.ok) {
    throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
  }
  return response.json();
}

export const apiService = {
  getUsers: () => fetchApi('/users'),
  getProducts: () => fetchApi('/products'),
  getOrders: () => fetchApi('/orders'),
<<<<<<< HEAD
};
=======
  // DB endpoints
  getDbAll: () => fetchApi('/db/all'),
  getDbRoles: () => fetchApi('/db/roles'),
  getDbUsuarios: () => fetchApi('/db/usuarios'),
  getDbCategorias: () => fetchApi('/db/categorias'),
  getDbProductos: () => fetchApi('/db/productos'),
  getDbInventario: () => fetchApi('/db/inventario'),
  getDbAlertas: () => fetchApi('/db/alertas_stock'),
  getDbPedidos: () => fetchApi('/db/pedidos'),
  getDbDetallePedido: () => fetchApi('/db/detalle_pedido'),
  getDbMetodosPago: () => fetchApi('/db/metodos_pago'),
  getDbPagos: () => fetchApi('/db/pagos'),
  getDbBusquedas: () => fetchApi('/db/busquedas_clientes'),

  // Agregar función para actualizar orden
  updateOrderStatus: (orderId, status) =>
    fetchApi(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
};
>>>>>>> unificado
