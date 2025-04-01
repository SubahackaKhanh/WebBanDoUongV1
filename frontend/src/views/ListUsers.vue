<template>
  <div class="list-users">
    <h2>Danh Sách Tài Khoản</h2>

    <table v-if="users.length > 0">
      <thead>
        <tr>
          <th>#</th>
          <th>Tên tài khoản</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Không có tài khoản nào.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListUsers",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5000/admin/users");
        this.users = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài khoản:", error);
      }
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.list-users {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #007bff;
  color: white;
}

tr:hover {
  background: #f1f1f1;
}

p {
  font-size: 16px;
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
// Compare this snippet from frontend/src/views/ListUsers.vue: