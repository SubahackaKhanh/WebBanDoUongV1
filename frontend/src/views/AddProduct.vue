<template>
  <div class="add-product">
    <h2>Thêm Sản Phẩm</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Tên sản phẩm:</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>
      <div class="form-group">
        <label for="price">Giá:</label>
        <input type="number" id="price" v-model="product.price" required />
      </div>
      <div class="form-group">
        <label for="category">Loại:</label>
        <select id="category" v-model="product.type" required>
          <option value="sinh-to">Sinh tố</option>
          <option value="nuoc-co-ga">Nước có ga</option>
          <option value="ca-phe">Cà phê</option>
          <option value="tra-sua">Trà sữa</option>
          <option value="khac">Khác</option>
        </select>
      </div>
      <button type="submit" :disabled="loading">{{ loading ? "Đang thêm..." : "Thêm" }}</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios"; // Import axios để gọi API

export default {
  data() {
    return {
      product: {
        name: "",
        price: 0,
        type: "sinh-to",
      },
      loading: false,
      message: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true;
      this.message = "";

      try {
        const response = await axios.post("http://localhost:5000/admin/products", this.product);
        this.message = response.data.message;

        // Reset form
        this.product = { name: "", price: 0, type: "sinh-to" };
      } catch (error) {
        this.message = "Lỗi khi thêm sản phẩm!";
        console.error("Lỗi:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.add-product {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

button:hover {
  background: #0056b3;
}

.message {
  margin-top: 10px;
  color: green;
}
</style>
