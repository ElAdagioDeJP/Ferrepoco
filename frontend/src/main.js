import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router"; // Use central router with named routes and guards

// Styles
import "./assets/styles/main.css";
import "./style.css";

// Pinia
const pinia = createPinia();

// App
const app = createApp(App);
// Important: register Pinia before Router since guards use the store
app.use(pinia);
app.use(router);
app.mount("#app");
