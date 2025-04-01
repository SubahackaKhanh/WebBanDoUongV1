<template>
    <div class="register-container">
      <h2>Đăng Ký</h2>
      <form @submit.prevent="handleRegister">
        <!-- Tên đăng nhập -->
        <div class="input-group">
          <label for="username">Tài khoản</label>
          <input type="text" id="username" v-model="username" required placeholder="Nhập tài khoản" />
        </div>
  
        <!-- Mật khẩu -->
        <div class="input-group">
          <label for="password">Mật khẩu</label>
          <div class="password-wrapper">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required placeholder="Nhập mật khẩu" />
            <span class="toggle-password" @click="togglePassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>
  
        <!-- Xác nhận mật khẩu -->
        <div class="input-group">
          <label for="confirmPassword">Xác nhận mật khẩu</label>
          <div class="password-wrapper">
            <input :type="showPassword ? 'text' : 'password'" id="confirmPassword" v-model="confirmPassword" required placeholder="Nhập lại mật khẩu" />
            <span class="toggle-password" @click="togglePassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>
  
        <button type="submit" class="register-btn">Đăng Ký</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "RegisterForm",
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      },
      async handleRegister() {
        if (this.password !== this.confirmPassword) {
          alert("⚠️ Mật khẩu xác nhận không khớp!");
          return;
        }
  
        try {
          const API_URL = process.env.VUE_APP_REGISTER_API || "http://localhost:5000/user/register";
          console.log("API URL:", API_URL);
  
          const response = await axios.post(API_URL, {
            username: this.username,
            password: this.password,
          });
  
          alert("✅ Đăng ký thành công!");
          console.log(response.data);
  
          // Chuyển hướng sang trang đăng nhập sau khi đăng ký thành công
          this.$router.push("/login");
        } catch (error) {
          console.error("❌ Lỗi khi đăng ký:", error);
          alert(error.response?.data?.message || "Đăng ký thất bại!");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
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
  
  .register-btn {
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
  
  .register-btn:hover {
    background: linear-gradient(to right, #0062cc, #0052b3);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  }
  
  .register-btn:active {
    transform: translateY(0);
  }
  </style>
  