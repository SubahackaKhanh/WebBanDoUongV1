<template>
  <div class="list-products">
    <h2>Danh Sách Sản Phẩm Theo Loại</h2>

    <label for="type">Chọn loại sản phẩm:</label>
    <select id="type" v-model="selectedType">
      <option value="">Tất cả</option>
      <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
    </select>

    <div class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.image || 'https://via.placeholder.com/150'" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price.toLocaleString() }} VNĐ</p>
      </div>
    </div>

    <p v-if="filteredProducts.length === 0">Không có sản phẩm nào.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListProduct",
  data() {
    return {
      products: [], // Danh sách sản phẩm
      selectedType: "", // Loại sản phẩm được chọn
    };
  },
  computed: {
    uniqueTypes() {
      return [...new Set(this.products.map((p) => p.type))];
    },
    filteredProducts() {
      return this.selectedType
        ? this.products.filter((p) => p.type === this.selectedType)
        : this.products;
    },
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/admin/products");
        this.products = response.data;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.list-products {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

label {
  font-weight: bold;
  margin-right: 10px;
}

select {
  padding: 5px;
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  height: 150px;
  object-fit: contain;
  border-radius: 5px;
}

.product-card h3 {
  font-size: 16px;
  margin: 10px 0;
}

.product-card p {
  font-size: 14px;
  color: #f00;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
