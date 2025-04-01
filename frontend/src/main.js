import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router
import store from './store'; // Import store


const app = createApp(App);
app.use(router); // Sử dụng router
app.use(store); // Sử dụng store
app.mount('#app');

// Debug biến môi trường (Vue CLI sử dụng process.env)
console.log("✅ All env vars:", process.env);
console.log("✅ VUE_APP_API_URL:", process.env.VUE_APP_API_URL || "Không tìm thấy VUE_APP_API_URL");
