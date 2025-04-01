<template>
  <div class="delete-product">
    <h2>Xóa Sản Phẩm</h2>
    <div v-if="products.length === 0" class="no-products">
      <p>Chưa có sản phẩm nào trong danh sách.</p>
    </div>
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }} VNĐ</p>
        <div class="button-group">
          <button class="delete-btn" @click="deleteProduct(product.id)">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "DeleteProduct",
data() {
  return {
    products: [],
  };
},
created() {
  this.fetchProducts();
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
  async deleteProduct(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await axios.delete(`http://localhost:5000/admin/products/${id}`);
        alert("Xóa sản phẩm thành công!");
        // Cập nhật danh sách sản phẩm sau khi xóa
        this.products = this.products.filter(product => product.id !== id);
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        alert("Có lỗi xảy ra khi xóa sản phẩm!");
      }
    }
  },
},
};
</script>

<style scoped>
.delete-product {
padding: 20px;
}

.delete-product h2 {
text-align: center;
margin-bottom: 20px;
}

.no-products {
text-align: center;
color: #888;
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
position: relative;
overflow: hidden;
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

.button-group {
display: flex;
justify-content: center;
gap: 10px;
position: absolute;
bottom: -50px;
left: 0;
right: 0;
padding: 10px;
background: rgba(255, 255, 255, 0.9);
transition: bottom 0.3s ease;
}

.product-card:hover .button-group {
bottom: 0;
}

.delete-btn {
padding: 8px 12px;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 14px;
background: #ff4d4d;
color: white;
transition: background 0.3s;
}

.delete-btn:hover {
background: #cc0000;
}
</style>