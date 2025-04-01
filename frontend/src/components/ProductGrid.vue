<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.image || 'https://via.placeholder.com/150'" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }} VNĐ</p>
      <div class="button-group">
        <button class="detail-btn" @click="viewDetail(product.id)">Chi tiết</button>
        <button class="buy-btn" @click="buyProduct(product)">Mua</button>
        <button class="cart-btn" @click="addToCart(product)">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "ProductGrid",
  data() {
    return {
      products: [],
    };
  },
  computed: {
    ...mapGetters("userStore", ["userId", "isLoggedIn"]),
  },
  async created() {
    await this.fetchProducts();
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
    viewDetail(productId) {
      this.$router.push(`/detail/${productId}`);
    },
    buyProduct(product) {
      alert(`Bạn đã chọn mua: ${product.name}`);
    },
    async addToCart(product) {
      if (!this.isLoggedIn) {
        alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
        this.$router.push("/login");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/cart", {
          user_id: this.userId,
          product_id: product.id,
          quantity: 1,
        });
        alert(response.data.message);
      } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!");
      }
    },
  },
};
</script>

<style scoped>
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

.detail-btn,
.buy-btn,
.cart-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.detail-btn {
  background: #ff9800;
  color: white;
}

.detail-btn:hover {
  background: #e68900;
}

.buy-btn {
  background: #42b983;
  color: white;
}

.buy-btn:hover {
  background: #2e8f6a;
}

.cart-btn {
  background: #007bff;
  color: white;
}

.cart-btn:hover {
  background: #0056b3;
}
</style>
