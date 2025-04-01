<template>
    <div class="drink-category-container">
      <h2 class="category-title">Khám phá loại đồ uống</h2>
      <div class="category-list">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="category-card"
          @click="selectCategory(category)"
        >
          <div class="image-wrapper">
            <img :src="category.image" :alt="category.name" class="category-image" />
            <div class="overlay"></div>
          </div>
          <h3 class="category-name">{{ category.name }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DrinkCategory",
    data() {
      return {
        categories: [
          {
            name: "Nước ép trái cây",
            image: require ("@/assets/robotraicay.jpg"),
          },
          {
            name: "Cà phê",
            image: require ("@/assets/caphe.jpg"),
          },
          {
            name: "Sinh tố",
            image: require ("@/assets/sinhto.jpg"),
          },
          {
            name: "Trà",
            image: require ("@/assets/tra.jpg"),
          },
          {
            name: "Nước ngọt",
            image: require ("@/assets/nuocngot.jpg"),
          },
        ],
      };
    },
    methods: {
      selectCategory(category) {
        alert(`Bạn đã chọn: ${category.name}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .drink-category-container {
    padding: 40px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    max-width: 1200px;
  }
  
  .category-title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .category-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 25px;
    justify-items: center;
  }
  
  .category-card {
    position: relative;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
  }
  
  .category-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  .image-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 15px;
  }
  
  .category-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  
  .category-card:hover .category-image {
    transform: scale(1.1);
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .category-card:hover .overlay {
    opacity: 1;
  }
  
  .category-name {
    font-size: 20px;
    font-weight: 600;
    color: #34495e;
    margin: 0;
    transition: color 0.3s ease;
  }
  
  .category-card:hover .category-name {
    color: #42b983;
  }
  </style>