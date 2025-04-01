<template>
    <div class="product-cart">
      <h2>Giỏ Hàng</h2>
      <div v-if="!isLoggedIn" class="not-logged-in">
        <p>Vui lòng đăng nhập để xem giỏ hàng!</p>
      </div>
      <div v-else-if="cartItems.length === 0" class="empty-cart">
        <p>Giỏ hàng của bạn đang trống!</p>
      </div>
      <div v-else class="cart-grid">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" />
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p>Đơn giá: {{ item.price }} VNĐ</p>
            <div class="quantity-control">
              <button @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <p>Tổng: {{ item.price * item.quantity }} VNĐ</p>
            <button class="delete-btn" @click="deleteCartItem(item.id)">Xóa</button>
          </div>
        </div>
        <div class="cart-summary">
          <h3>Tổng cộng: {{ totalPrice }} VNĐ</h3>
          <button class="checkout-btn">Thanh toán</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { mapGetters } from "vuex";
  
  export default {
    name: "ProductCart",
    data() {
      return {
        cartItems: [],
      };
    },
    computed: {
      ...mapGetters("userStore",["userId", "isLoggedIn"]), // Lấy userId và trạng thái đăng nhập từ Vuex
      totalPrice() {
        return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    },
    created() {
      if (this.isLoggedIn) {
        this.fetchCartItems();
      }
    },
    methods: {
      async fetchCartItems() {
        try {
          const response = await axios.get(`http://localhost:5000/api/cart/${this.userId}`);
          this.cartItems = response.data;
        } catch (error) {
          console.error("Lỗi khi lấy danh sách giỏ hàng:", error);
        }
      },
      async updateQuantity(id, newQuantity) {
        if (newQuantity < 1) return;
        try {
          await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity });
          const item = this.cartItems.find(i => i.id === id);
          if (item) item.quantity = newQuantity;
        } catch (error) {
          console.error("Lỗi khi cập nhật số lượng:", error);
          alert("Có lỗi xảy ra khi cập nhật số lượng!");
        }
      },
      async deleteCartItem(id) {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
          try {
            await axios.delete(`http://localhost:5000/api/cart/${id}`);
            alert("Xóa sản phẩm thành công!");
            this.cartItems = this.cartItems.filter(item => item.id !== id);
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
  .product-cart {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .product-cart h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .not-logged-in, .empty-cart {
    text-align: center;
    color: #888;
  }
  
  .cart-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .cart-item img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 20px;
  }
  
  .item-details {
    flex-grow: 1;
  }
  
  .item-details h3 {
    font-size: 18px;
    margin: 0 0 10px;
  }
  
  .item-details p {
    font-size: 16px;
    margin: 5px 0;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
  }
  
  .quantity-control button {
    padding: 5px 10px;
    border: 1px solid #ddd;
    background: #f0f0f0;
    cursor: pointer;
  }
  
  .quantity-control span {
    font-size: 16px;
    min-width: 20px;
    text-align: center;
  }
  
  .delete-btn {
    background: #ff4d4d;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .delete-btn:hover {
    background: #cc0000;
  }
  
  .cart-summary {
    text-align: right;
    margin-top: 20px;
  }
  
  .cart-summary h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .checkout-btn {
    background: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .checkout-btn:hover {
    background: #2e8f6a;
  }
  </style>