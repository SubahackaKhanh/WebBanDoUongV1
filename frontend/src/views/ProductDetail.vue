<template>
    <div class="product-detail" v-if="product">
      <img :src="product.image || 'https://via.placeholder.com/300'" :alt="product.name" class="product-image" />
      <h2>{{ product.name }}</h2>
      <p><strong>Giá:</strong> {{ product.price }} VNĐ</p>
      <p><strong>Loại:</strong> {{ product.type }}</p>
      <p class="product-description"><strong>Mô tả:</strong> {{ product.detail }}</p>
      <button @click="goBack">Quay lại</button>
    </div>
    <p v-else>Đang tải dữ liệu...</p>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "ProductDetail",
    data() {
      return {
        product: null,
      };
    },
    async created() {
      await this.fetchProductDetail();
    },
    methods: {
      async fetchProductDetail() {
        try {
          const productId = this.$route.params.id; // Lấy ID từ URL
          const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
          this.product = response.data;
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        }
      },
      goBack() {
        this.$router.push("/"); // Chuyển về trang chính
      },
    },
  };
  </script>
  
  <style scoped>
  .product-detail {
    max-width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    background: #fff;
  }
  
  .product-image {
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: 5px;
  }
  
  .product-description {
    text-align: justify;
  }
  
  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
  }
  
  button:hover {
    background: #0056b3;
  }
  </style>
  