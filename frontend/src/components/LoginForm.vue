<template>
  <div class="login-container">
    <h2>Đăng Nhập</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required placeholder="Nhập username của bạn" />
      </div>
      <div class="input-group">
        <label for="password">Mật khẩu</label>
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required placeholder="Nhập mật khẩu của bạn" />
          <span class="toggle-password" @click="togglePassword">
            <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
      </div>
      <button type="submit" class="login-btn">Đăng nhập</button>
      <p class="register-link">Chưa có tài khoản? <router-link to="/user/register">Đăng ký ngay</router-link></p>
      <p class="admin-login">Trang đăng nhập cho admin <router-link to="/admin/login">Nhấn vào đây</router-link></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      try {
        const API_URL = process.env.VUE_APP_USER_API || "http://localhost:5000/user/login";
        console.log("API URL:", API_URL);

        const response = await axios.post(API_URL, {
          username: this.username,
          password: this.password,
        });

        this.$store.dispatch("userStore/login", response.data.user); // Dùng namespace userStore
        this.$router.push("/");

        alert("✅ Đăng nhập thành công!");
        console.log(response.data);
      } catch (error) {
        console.error("❌ Lỗi khi đăng nhập:", error);
        alert(error.response?.data?.message || "Đăng nhập thất bại!");
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.login-btn:hover {
  background: #0056b3;
}

.register-link {
  margin-top: 10px;
}

.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
