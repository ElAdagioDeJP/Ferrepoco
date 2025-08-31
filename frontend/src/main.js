import { createApp } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import { createPinia } from "pinia"
import App from "./App.vue"

// Import views
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import AdminDashboard from "./views/AdminDashboard.vue"
import EmployeeDashboard from "./views/EmployeeDashboard.vue"
import ClientDashboard from "./views/ClientDashboard.vue"
import ProductsManager from "./views/ProductsManager.vue"
import OrdersManager from "./views/OrdersManager.vue"
import AdminUsers from "./views/AdminUsers.vue"
import NotFound from "./views/NotFound.vue"

// Import styles
import "./assets/styles/main.css"

// Create router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/login" },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/admin", component: AdminDashboard },
        { path: "/employee", component: EmployeeDashboard },
        { path: "/client", component: ClientDashboard },
        { path: "/products", component: ProductsManager },
        { path: "/orders", component: OrdersManager },
        { path: "/admin/users", component: AdminUsers },
        { path: "/:pathMatch(.*)*", component: NotFound },
    ],
})

// Create Pinia store
const pinia = createPinia()

// Create and mount app
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount("#app")
