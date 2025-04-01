<template>
    <div class="sidebar" v-if="isAdminAuthenticated">
      <h3>Admin Panel</h3>
      <ul>
        <li class="section-title">SETTING MENU</li>
        <li v-for="(item, index) in todayItems" :key="'today-' + index">
          <router-link :to="item.route">{{ item.label }}</router-link>
        </li>
      </ul>
      <div class="upgrade">
        <span>Mục Setting</span>
        <small>ADMIN ONLY SETTING</small>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        todayItems: [
          { label: "Thêm sản phẩm", route: "/admin-page/add-product" },
          { label: "Cập nhật sản phẩm", route: "/admin-page/admin-product-list" },
          { label: "Xóa sản phẩm", route: "/admin-page/delete-product" },
          { label: "Lấy danh sách sản phẩm", route: "/admin-page/list-products" },
          { label: "Lấy danh sách tài khoản", route: "/admin-page/list-users" },
          { label: "Xóa user", route: "/admin-page/delete-user" },
          { label: "Lấy danh sách đơn hàng", route: "/admin-page/list-orders" },
          { label: "Cập nhật đơn hàng", route: "/admin-page/update-order" },
          { label: "Xóa đơn hàng", route: "/admin-page/delete-order" }
        ]
      };
    },
    computed: {
      ...mapGetters('adminStore', {
        isAdminAuthenticated: 'isAuthenticated'
      })
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 250px;
    background: #3a8d5c;
    color: white;
    padding: 15px;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  h3 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  .section-title {
    font-size: 20px;
    color: #999;
    margin-top: 15px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  li {
    padding: 8px 0;
  }
  
  a {
    text-decoration: none;
    color: white;
    font-size: 14px;
  }
  
  a:hover {
    color: #1a73e8;
  }
  
  .upgrade {
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid #333;
    text-align: center;
  }
  
  .upgrade span {
    font-size: 14px;
    font-weight: bold;
  }
  
  .upgrade small {
    display: block;
    font-size: 12px;
    color: #999;
  }
  </style>
  