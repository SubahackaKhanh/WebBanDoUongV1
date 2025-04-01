<template>
  <div class="delete-user">
    <h2>Xóa Tài Khoản</h2>
    
    <label for="userId">Nhập ID tài khoản cần xóa:</label>
    <input type="number" v-model="userId" id="userId" placeholder="Nhập ID tài khoản" />

    <button @click="deleteUser" class="btn-delete">Xóa Tài Khoản</button>

    <p v-if="message" :class="{ success: success, error: !success }">
      {{ message }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: "",
      message: "",
      success: false,
    };
  },
  methods: {
    async deleteUser() {
      if (!this.userId) {
        this.message = "Vui lòng nhập ID tài khoản!";
        this.success = false;
        return;
      }

      if (!confirm(`Bạn có chắc muốn xóa tài khoản ID ${this.userId}?`)) return;

      try {
        await axios.delete(`http://localhost:5000/admin/users/${this.userId}`);
        this.message = "Xóa tài khoản thành công!";
        this.success = true;
        this.userId = ""; // Reset input
      } catch (error) {
        this.message = "Lỗi khi xóa tài khoản!";
        this.success = false;
        console.error("Lỗi khi xóa tài khoản:", error);
      }
    },
  },
};
</script>

<style scoped>
.delete-user {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}

label {
  display: block;
  margin: 10px 0;
  font-weight: bold;
}

input {
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-delete {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
}

.btn-delete:hover {
  background-color: #cc0000;
}

.success {
  color: green;
  font-weight: bold;
  margin-top: 10px;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}
</style>
