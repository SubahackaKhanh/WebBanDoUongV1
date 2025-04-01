<template>
    <div class="admin-product-list">
      <h2>Quản Lý Sản Phẩm</h2>
      <div class="product-grid">
        <div v-for="(product, index) in products" :key="index" class="product-card">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }} VNĐ</p>
          <button class="edit-btn" @click="editProduct(product)">Chỉnh sửa</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "AdminProductsList",
    data() {
      return {
        products: [],
      };
    },
    async created() {
      await this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/admin/products"); // Thêm /admin
        this.products = response.data;
        } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        }
      },
      editProduct(product) {
        this.$router.push({
          path: "/admin-page/update-product",
          query: {
            id: product.id,
            name: product.name,
            price: product.price,
            type: product.type,
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-product-list {
    padding: 20px;
  }
  
  h2 {
    text-align: center;
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
  
  .edit-btn {
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    background: #ffc107;
    color: black;
    transition: background 0.3s;
  }
  
  .edit-btn:hover {
    background: #e0a800;
  }
  </style>
  