<template>
  <header class="header">
    <div class="logo">Danh DRINKS</div>
    <nav class="nav">
      <ul>
        <li><a href="/">Trang Chủ</a></li>
        <li><a href="/about">Giới Thiệu</a></li>
        <li><a href="/products">Sản Phẩm</a></li>
        <li><a href="/category">Loại</a></li>
        <li><a href="/contact">Liên Hệ</a></li>
        <li><a href="/cart">Giỏ Hàng</a></li>
        <!-- Mục Admin chỉ hiển thị khi admin đăng nhập -->
        <li v-if="isAdminAuthenticated"><a href="/admin-page">Admin</a></li>
        <!-- Hiển thị Đăng Nhập khi chưa đăng nhập -->
        <li v-if="!isUserAuthenticated && !isAdminAuthenticated">
          <a href="/login">Đăng Nhập</a>
        </li>
        <!-- Hiển thị Xin chào user khi user đăng nhập -->
        <li v-if="isUserAuthenticated">
          Xin chào, {{ userUsername }}! <button @click="handleUserLogout">Đăng xuất</button>
        </li>
        <!-- Hiển thị Xin chào admin khi admin đăng nhập -->
        <li v-if="isAdminAuthenticated">
          Xin chào, {{ adminUsername }}! <button @click="handleAdminLogout">Đăng xuất</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('userStore', {
      isUserAuthenticated: 'isAuthenticated',
      getUser: 'getUser'
    }),
    ...mapGetters('adminStore', {
      isAdminAuthenticated: 'isAuthenticated',
      getAdmin: 'getAdmin'
    }),
    userUsername() {
      return this.getUser?.username || 'User';
    },
    adminUsername() {
      return this.getAdmin?.username || 'Admin';
    }
  },
  methods: {
    ...mapActions('userStore', { userLogout: 'logout' }),
    ...mapActions('adminStore', { adminLogout: 'logout' }),
    handleUserLogout() {
      this.userLogout();
      this.$router.push('/login');
    },
    handleAdminLogout() {
      this.adminLogout();
      this.$router.push('/admin/login');
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  max-width: 1500px;
  z-index: 1000;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #42b983;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav li {
  margin: 0 15px;
}

.nav a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
}

.nav a:hover {
  color: #ffeb3b;
}

button {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s;
}

button:hover {
  background: darkred;
}
</style>