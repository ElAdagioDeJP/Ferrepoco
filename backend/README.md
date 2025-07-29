# Plataforma Ferrepoco

Este repositorio contiene el código base para la plataforma Ferrepoco, un sistema comercial para la gestión de inventario y la interacción con clientes, desarrollado con Vue.js (Frontend) y Node.js (Backend). La base de datos está simulada con archivos JSON.

## Estructura del Proyecto
ferrepoco-app/
├── backend/       # Código del servidor Node.js
└── frontend/      # Código de la aplicación Vue.js
## Configuración y Ejecución

Sigue estos pasos para poner en marcha la aplicación:

### 1. Backend (Node.js)

1.  Navega a la carpeta `backend`:
    ```bash
    cd backend
    ```
2.  Instala las dependencias de Node.js:
    ```bash
    npm install
    ```
3.  Inicia el servidor backend:
    ```bash
    npm run dev  # Usar 'dev' para nodemon (recarga automática) o 'start' para ejecución normal
    ```
    El servidor se ejecutará en `http://localhost:3000`.

### 2. Frontend (Vue.js)

1.  En una **nueva terminal**, navega a la carpeta `frontend`:
    ```bash
    cd frontend
    ```
2.  Instala las dependencias de Vue.js:
    ```bash
    npm install
    ```
3.  Inicia la aplicación frontend:
    ```bash
    npm run serve
    ```
    La aplicación se ejecutará en `http://localhost:8080` (o un puerto similar).

### 3. Acceso a la Aplicación

Abre tu navegador web y ve a `http://localhost:8080`.

**Usuarios de Prueba (Simulados):**

* **Administrador:** `admin@ferrepoco.com` / `password`
* **Empleado:** `empleado@ferrepoco.com` / `password`
* **Cliente:** `cliente@ferrepoco.com` / `password`

## Funcionalidades Implementadas (Base)

* **Autenticación básica:** Login de usuarios (Admin, Empleado, Cliente).
* **Gestión de Usuarios (Admin):** Visualización y eliminación (simplificada).
* **Gestión de Productos (Admin/Empleado/Cliente):** Visualización de productos.
* **Gestión de Stock (Admin/Empleado):** Actualización de stock (ejemplos de sobrecarga de `actualizarStock`).
* **Alertas de Inventario (Admin/Empleado):** Generación de alertas de bajo stock.
* **Gestión de Pedidos (Cliente/Empleado):** Clientes pueden añadir al carrito y "realizar compra". Empleados pueden ver y actualizar el estado de los pedidos.

## Consideraciones y Simplificaciones

* **Base de Datos JSON:** Todos los datos se almacenan en archivos JSON planos (`data/*.json`). **Los cambios realizados en la aplicación se guardarán en estos archivos, pero si el servidor se reinicia y no has implementado una persistencia robusta de escritura de archivos en el backend, los datos podrían resetearse a los del JSON inicial.** Para una aplicación real, se usaría una base de datos como MongoDB, PostgreSQL, etc.
* **Autenticación Simplificada:** No se usan tokens JWT ni hasheo de contraseñas. La autenticación se basa en la coincidencia directa de usuario/contraseña. Los roles se pasan en los headers (`x-user-role`) para simular la autorización.
* **Polimorfismo:**
    * **Tiempo de Ejecución (Sobreescritura):** Simulada en el `authRoutes.js` del backend, donde el rol del usuario logueado determina la redirección del frontend.
    * **Tiempo de Compilación (Sobrecarga):** Implementada en `backend/utils/dataHandler.js` (ej. `updateProductStock`, `findProducts`) y en las rutas que los invocan.
* **Interfaz `IGestionable`:** No se implementa una interfaz explícita como en lenguajes como Java/TypeScript, pero el concepto se refleja en cómo `AdminDashboard.vue` y `EmployeeDashboard.vue` llaman a métodos de gestión (`loadProducts`, `updateStock`) que tienen diferentes implicaciones según el rol.
* **Validaciones y Errores:** La gestión de errores es básica.
* **Estilos:** Mínimos, enfocados en la funcionalidad.