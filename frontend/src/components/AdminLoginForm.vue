<template>
  <div class="Admin-login-container">
    <h2>Đăng Nhập Admin</h2>
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
      <p class="admin-login">trang đăng nhập cho user ở đây <a href="/login">Nhấn vào đây</a></p>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  name: "AdminLoginForm",
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    ...mapActions('adminStore',["adminLogin"]), // Định nghĩa action từ Vuex

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async handleLogin() {
      try {
        const API_URL = process.env.VUE_APP_ADMIN_API || "http://localhost:5000/admin/login";
        console.log("API URL:", API_URL);
        console.log("Sending login request with:", { username: this.username });

        const response = await axios.post(API_URL, {
          username: this.username,
          password: this.password,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 5000 // 5 second timeout
        });

        console.log("Login response:", response.data);
        alert("✅ Đăng nhập thành công!");

        // Gọi Vuex action để lưu admin vào store
        this.adminLogin(response.data.admin); 

        // Handle redirect after login
        const redirectPath = this.$route.query.redirect || '/admin-page';
        this.$router.push(redirectPath);
      } catch (error) {
        console.error("❌ Lỗi khi đăng nhập:", error);
        if (error.code === 'ERR_NETWORK') {
          console.error("Network error details:", {
            message: error.message,
            config: error.config,
            request: error.request
          });
          alert("Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng và đảm bảo server đang chạy.");
        } else if (error.code === 'ECONNABORTED') {
          alert("Kết nối đến server quá chậm. Vui lòng thử lại.");
        } else {
          alert(error.response?.data?.message || "Đăng nhập thất bại!");
        }
      }
    },
  },
};
</script>

  
  <style scoped>
.Admin-login-container {
  max-width: 450px;
  margin: 80px auto;
  padding: 30px;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 30px;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 1px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
  color: #34495e;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.password-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #7f8c8d;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #007bff;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #007bff, #0062cc);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: linear-gradient(to right, #0062cc, #0052b3);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
}

.login-btn:active {
  transform: translateY(0);
}
  </style>
  ;