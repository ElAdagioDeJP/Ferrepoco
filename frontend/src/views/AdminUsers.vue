<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import apiClient from '../api/apiClient';

const auth = useAuthStore();
auth.initializeAuth();

const users = ref([]);
const loading = ref(false);
const error = ref('');

const form = ref({ username: '', password: '', role: 'employee' });
const canSubmit = computed(() => form.value.username && form.value.password?.length >= 6 && ['employee','admin'].includes(form.value.role));

async function fetchUsers() {
	try {
		const { data } = await apiClient.get('/users');
		users.value = data;
	} catch (e) {
		error.value = e.response?.data?.message || 'Error cargando usuarios';
	}
}

async function createUser() {
	error.value = '';
	if (!canSubmit.value) return;
	loading.value = true;
	try {
		const { data } = await apiClient.post('/users', { username: form.value.username, password: form.value.password, role: form.value.role });
		users.value.push(data.user);
		form.value = { username: '', password: '', role: 'employee' };
	} catch (e) {
		error.value = e.response?.data?.message || 'No se pudo crear el usuario';
	} finally {
		loading.value = false;
	}
}

async function deleteUser(id){
	try {
		await apiClient.delete(`/users/${id}`);
		users.value = users.value.filter(u => u.id !== id);
	} catch (e) {
		error.value = e.response?.data?.message || 'No se pudo eliminar';
	}
}

onMounted(fetchUsers);
</script>

<template>
	<div class="max-w-5xl mx-auto p-4">
		<div class="mb-6">
			<h1 class="text-2xl font-bold">Gestión de usuarios</h1>
			<p class="text-sm text-gray-600">Solo administradores pueden crear empleados y administradores.</p>
		</div>

		<div class="bg-white rounded-lg shadow border border-gray-100 p-4 mb-8">
			<h2 class="text-lg font-semibold mb-4">Crear usuario</h2>
			<form @submit.prevent="createUser" class="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div>
							<label for="au-username" class="block text-sm font-medium text-gray-700 mb-1">Correo/Usuario</label>
							<input id="au-username" v-model="form.username" type="email" placeholder="usuario@ferrepoco.com" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required />
						</div>
						<div>
							<label for="au-password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
							<input id="au-password" v-model="form.password" type="password" minlength="6" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500" required />
					<p class="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
				</div>
						<div>
							<label for="au-role" class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
							<select id="au-role" v-model="form.role" class="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
						<option value="employee">Empleado</option>
						<option value="admin">Administrador</option>
					</select>
				</div>
				<div class="md:col-span-3 flex items-center gap-3">
					<button :disabled="loading || !canSubmit" type="submit" class="bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700 text-white font-medium rounded-md px-4 py-2">{{ loading ? 'Creando...' : 'Crear usuario' }}</button>
					<span v-if="error" class="text-sm text-red-600">{{ error }}</span>
				</div>
			</form>
		</div>

		<div class="bg-white rounded-lg shadow border border-gray-100">
			<div class="p-4 border-b border-gray-100 flex items-center justify-between">
				<h2 class="text-lg font-semibold">Usuarios</h2>
				<button @click="fetchUsers" class="p-2 rounded hover:bg-gray-100">
					<span class="material-symbols-outlined">refresh</span>
				</button>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr v-for="u in users" :key="u.id" class="hover:bg-gray-50">
							<td class="px-6 py-4 text-sm">{{ u.id }}</td>
							<td class="px-6 py-4 text-sm">{{ u.username }}</td>
							<td class="px-6 py-4 text-sm">{{ u.role }}</td>
							<td class="px-6 py-4 text-sm">
								<button @click="deleteUser(u.id)" class="text-red-600 hover:text-red-800">Eliminar</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped>
.material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
</style>
