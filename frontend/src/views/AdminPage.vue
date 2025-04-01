<template>
    <div class="admin-layout">
      <ComponentsHeader />
      <div class="content">
        <AdminMenu />
        <div class="main-content">
          <router-view /> <!-- Nội dung của route con sẽ hiển thị ở đây -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AdminMenu from '../components/AdminMenu.vue'; // Sử dụng đúng tên component
  
  export default {
    components: {
      AdminMenu
    }
  };
  </script>
  
  <style scoped>
  .admin-layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .content {
    display: flex;
    flex: 1;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    background: #f5f5f5;
    overflow-y: auto;
  }
  </style>