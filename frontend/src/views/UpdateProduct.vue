<template>
  <div class="update-product">
    <h2>Cập Nhật Sản Phẩm</h2>

    <form @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="name">Tên sản phẩm:</label>
        <input type="text" id="name" v-model="name" />
      </div>

      <div class="form-group">
        <label for="price">Giá:</label>
        <input type="number" id="price" v-model="price" />
      </div>

      <div class="form-group">
        <label for="type">Loại sản phẩm:</label>
        <input type="text" id="type" v-model="type" />
      </div>

      <button type="submit">Lưu thay đổi</button>

    </form>

    <router-link to="/admin-page/admin-product-list" class="back-button">
      Quay lại danh sách sản phẩm
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UpdateProduct",
  data() {
    return {
      id: this.$route.query.id || "",
      name: this.$route.query.name || "",
      price: this.$route.query.price || "",
      type: this.$route.query.type || "",
    };
  },
  methods: {
    async updateProduct() {
  console.log("ID sản phẩm:", this.id);
  try {
    await axios.put(`http://localhost:5000/admin/products/${this.id}`, {
      name: this.name,
      price: this.price,
      type: this.type,
    });
      alert("Cập nhật sản phẩm thành công!");
      this.$router.push("/admin-page/admin-product-list");
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
      }
    },
  },
};
</script>

<style scoped>
.update-product {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
