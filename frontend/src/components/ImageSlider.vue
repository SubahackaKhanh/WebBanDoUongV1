<template>
    <div class="slider">
      <img :src="images[currentIndex]" alt="Slider Image">
    </div>
  </template>
  
  <script>
  export default {
    name: "ImageSlider",
    data() {
      return {
        images: [
          require("@/assets/c.jpg"),
          require("@/assets/nuocngot.jpg"),
          require("@/assets/a.jpg")
        ],
        currentIndex: 0
      };
    },
    mounted() {
      this.startSlideshow();
    },
    methods: {
      startSlideshow() {
        setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }, 10000); // Chuyển ảnh sau mỗi 10 giây
      }
    }
  };
  </script>
  
  <style scoped>
  .slider {
  width: 100vw;
  height: 50vh; 
  overflow: hidden;
  }

  .slider img {
  width: 100vw;
  height: 50vh;
  object-fit: cover;
  }

  </style>
  