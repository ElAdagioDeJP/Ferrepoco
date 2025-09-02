<template>
   
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-heading font-bold text-neutral-900">Gestión de Usuarios</h1>
      <p class="text-neutral-600 font-body mt-1">Solo administradores pueden crear empleados y administradores</p>
    </div>

    
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
      <div class="flex items-center mb-6">
        <div class="w-10 h-10 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg flex items-center justify-center mr-3">
          <svg class="w-5 h-5 text-cyan-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-heading font-semibold text-neutral-900">Crear nuevo usuario</h2>
      </div>
      
      <form @submit.prevent="createUser" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label for="au-username" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Correo electrónico</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input 
                id="au-username" 
                v-model="form.username" 
                type="email" 
                placeholder="usuario@ferrepoco.com" 
                class="pl-10 w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body" 
                required 
              />
            </div>
          </div>
          <div>
            <label for="au-password" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Contraseña</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input 
                id="au-password" 
                v-model="form.password" 
                type="password" 
                minlength="6" 
                placeholder="Mínimo 6 caracteres"
                class="pl-10 w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body" 
                required 
              />
            </div>
            <p class="text-xs text-neutral-500 mt-1 font-body">La contraseña debe tener al menos 6 caracteres</p>
          </div>
          <div>
            <label for="au-role" class="block text-sm font-medium text-neutral-700 mb-2 font-body">Rol del usuario</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <select id="au-role" v-model="form.role" class="pl-10 w-full border border-neutral-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-body">
                <option value="employee">Empleado</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-between pt-4 border-t border-neutral-200">
          <div class="flex items-center">
            <span v-if="error" class="text-sm text-red-600 font-body flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ error }}
            </span>
          </div>
          <button 
            :disabled="loading || !canSubmit" 
            type="submit" 
            class="px-6 py-3 bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors font-body flex items-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            {{ loading ? 'Creando usuario...' : 'Crear usuario' }}
          </button>
        </div>
      </form>
    </div>

     
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
        <h2 class="text-lg font-heading font-semibold text-neutral-900">Lista de Usuarios</h2>
        <button @click="fetchUsers" class="p-2 rounded-lg hover:bg-neutral-100 transition-colors">
          <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-neutral-200">
          <thead class="bg-neutral-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Usuario</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Rol</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Estado</th>
              <th class="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider font-body">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-neutral-200">
            <tr v-for="u in users" :key="u.id" class="hover:bg-neutral-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mr-3">
                    <svg class="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="font-medium text-neutral-900 font-body">{{ u.username }}</div>
                    <div class="text-sm text-neutral-500 font-body">ID: {{ u.id }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-body"
                  :class="u.role === 'admin' ? 'bg-purple-100 text-purple-800' : (u.role === 'employee' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800')">
                  <div class="w-2 h-2 rounded-full mr-2"
                    :class="u.role === 'admin' ? 'bg-purple-500' : (u.role === 'employee' ? 'bg-blue-500' : 'bg-emerald-500')">
                  </div>
                  {{ u.role_label || (u.role === 'admin' ? 'Administrador' : (u.role === 'employee' ? 'Empleado' : 'Cliente')) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 font-body">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Activo
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="deleteUser(u.id)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="users.length === 0" class="p-12 text-center">
        <svg class="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h3 class="text-lg font-heading font-medium text-neutral-900 mb-2">No hay usuarios</h3>
        <p class="text-neutral-500 font-body">Crea el primer usuario del sistema usando el formulario de arriba.</p>
      </div>
    </div>
  </div>
  <!-- Pagination controls -->
  <div class="max-w-6xl mx-auto mt-4 mb-8 flex items-center justify-between">
    <div class="text-sm text-neutral-600 font-body">
      Mostrando <span class="font-medium">{{ users.length }}</span> de <span class="font-medium">{{ total }}</span> usuarios
    </div>
    <div class="flex items-center gap-2">
      <button @click="goPrev" :disabled="!canPrev" class="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-700 disabled:opacity-50">Anterior</button>
      <span class="text-sm text-neutral-700 font-body">Página {{ page }} de {{ totalPages }}</span>
      <button @click="goNext" :disabled="!canNext" class="px-3 py-2 rounded-lg border border-neutral-300 text-neutral-700 disabled:opacity-50">Siguiente</button>
      <select @change="onPageSizeChange" :value="pageSize" class="ml-3 px-2 py-2 border border-neutral-300 rounded-lg text-sm">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import apiClient from '@/api/apiClient'

// Variables reactivas
const users = ref([])
const loading = ref(false)
const error = ref('')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const form = reactive({
  username: '',
  password: '',
  role: 'employee'
})

// Cargar usuarios al montar el componente
const fetchUsers = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await apiClient.get('/users', { params: { page: page.value, pageSize: pageSize.value } })
    // Soportar respuesta paginada y no paginada
    if (Array.isArray(response.data)) {
      users.value = response.data
      total.value = response.data.length
    } else {
      users.value = response.data.data || []
      total.value = response.data.total || 0
      page.value = response.data.page || 1
      pageSize.value = response.data.pageSize || pageSize.value
    }
  } catch (err) {
    error.value = 'Error al cargar usuarios'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Crear nuevo usuario
const createUser = async () => {
  loading.value = true
  error.value = ''
  try {
    await apiClient.post('/users', form)
    
    // Limpiar formulario
    form.username = ''
    form.password = ''
    form.role = 'employee'
    
  // Recargar lista de usuarios desde la primera página
  page.value = 1
  await fetchUsers()
  } catch (err) {
    error.value = 'Error al crear usuario'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// deshabilitar usuario
const deleteUser = async (userId) => {
  if (!confirm('¿Estás seguro de que quieres deshabilitar este usuario?')) return
  
  try {
    await apiClient.delete(`/users/${userId}`)
  // Ajustar página si la actual queda vacía
  const newTotal = Math.max(total.value - 1, 0)
  const maxPage = Math.max(1, Math.ceil(newTotal / pageSize.value))
  if (page.value > maxPage) page.value = maxPage
  await fetchUsers() // Recargar lista
  } catch (err) {
    error.value = 'Error al deshabilitar usuario'
    console.error(err)
  }
}

// Computed property para validar formulario
const canSubmit = ref(true)

// Paginación
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const canPrev = computed(() => page.value > 1)
const canNext = computed(() => page.value < totalPages.value)
const goPrev = async () => { if (canPrev.value) { page.value -= 1; await fetchUsers() } }
const goNext = async () => { if (canNext.value) { page.value += 1; await fetchUsers() } }
const onPageSizeChange = async (e) => { pageSize.value = parseInt(e.target.value, 10) || 10; page.value = 1; await fetchUsers() }

// Cargar usuarios al iniciar
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.font-heading {
  font-family: 'Montserrat', sans-serif;
}

.font-body {
  font-family: 'Open Sans', sans-serif;
}
</style>
