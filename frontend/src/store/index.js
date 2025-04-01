import { createStore } from 'vuex';
import userStore from './userStore'; // Import module userStore
import adminStore from './adminStore'; // Import module adminStore

export default createStore({
  modules: {
    userStore, // Đăng ký module userStore
    adminStore // Đăng ký module adminStore
  }
});