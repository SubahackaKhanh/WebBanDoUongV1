<template>
    <div class="about-container">
      <div class="about-layout">
        <!-- Phần slider bên trái -->
        <div class="founder-slider">
          <button class="arrow left-arrow" @click="prevSlide">←</button>
          <div class="slider-content">
            <div class="founder-card">
              <img :src="founders[currentIndex].image" :alt="founders[currentIndex].name" />
              <div class="founder-info">
                <h3>{{ founders[currentIndex].name }}</h3>
                <p>{{ founders[currentIndex].role }}</p>
                <p>{{ founders[currentIndex].bio }}</p>
              </div>
            </div>
          </div>
          <button class="arrow right-arrow" @click="nextSlide">→</button>
        </div>
  
        <!-- Phần nội dung bên phải -->
        <div class="about-content">
          <h1 class="title">Giới Thiệu</h1>
          <p class="intro">Đây là trang giới thiệu về Trang Web của chúng tôi.</p>
  
          <h2 class="subtitle">Dịch vụ chúng tôi cung cấp</h2>
          <ul class="services">
            <li><LucideCupHot /> Đồ uống ngọt</li>
            <li><LucideDroplet /> Đồ uống lọc</li>
            <li><LucideActivity /> Đồ uống thể thao</li>
            <li><LucideBeer /> Đồ uống có cồn</li>
          </ul>
  
          <h2 class="subtitle">Liên hệ với chúng tôi</h2>
          <ul class="contact-info">
            <li><LucideMail /> Email: <a href="danhdt22150538@student.giadinh.edu.vn">Danhditbu@gmail.com</a></li>
            <li><LucideMapPin /> Địa chỉ: 371 Nguyễn Kiệm, TP.HCM</li>
            <li><LucidePhoneCall /> Hotline: <a href="tel:+11234567890">0918950012</a></li>
            <li><LucideGlobe /> Website: <a href="https://www.facebook.com/profile.php?id=100040219725971" target="_blank">www.DanhNgauLoi.com</a></li>
          </ul>
  
          <h2 class="subtitle">Kết nối mạng xã hội</h2>
          <ul class="social-links">
            <li><LucideFacebook /> <a href="https://www.facebook.com/profile.php?id=100040219725971" target="_blank">Facebook</a></li>
            <li><LucideInstagram /> <a href="https://www.instagram.com/kazuramihara" target="_blank">Instagram</a></li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {
    LucideCupHot,
    LucideDroplet,
    LucideActivity,
    LucideBeer,
    LucideMail,
    LucideMapPin,
    LucidePhoneCall,
    LucideGlobe,
    LucideFacebook,
    LucideInstagram,
  } from "lucide-vue-next";
  
  export default {
    name: "About",
    components: {
      LucideCupHot,
      LucideDroplet,
      LucideActivity,
      LucideBeer,
      LucideMail,
      LucideMapPin,
      LucidePhoneCall,
      LucideGlobe,
      LucideFacebook,
      LucideInstagram,
    },
    data() {
      return {
        founders: [
          {
            name: "Mai Đình Đại",
            role: "Bảo Kê",
            bio: "Người tiên phong trong việc Bảo vệ thương hiệu chúng tôi và ngoài đời cũng vậy nói chung là siêu bảo vệ.",
            image: require("@/assets/daikysi.jpg"), 
          },
          {
            name: "Đỗ Thành Danh",
            role: "Nhà Sáng Lập",
            bio: "Sáng lập nên thương hiệu Danh DRINKS khi ngày xưa anh xin nước mà không ai cho nên anh tự lập rồi không cho ai uống vì anh quá cay nên chỉ bán",
            image: require("@/assets/DanhChuTich.jpg"), 
          },
          {
            name: "Trần Hữu Trường",
            role: "Giám đốc trách nhiệm an toàn thực phẩm",
            bio: "Đảm bảo chất lượng sản phẩm, vận hành quy trình sản xuất, bắt mấy thằng ranh lười làm để ruồi bọ bu đầy cốc nước của khách hàng làm khách hàng chê trách.",
            image: require("@/assets/truong.jpg"), 
          },
          {
            name: "Phan Hữu Phong",
            role: "Giám đốc Nhân Sự",
            bio: "Đam mê đồ uống có cồn, khi anh say anh hay Đánh nhân viên nên hãy né anh nếu anh say anh là anh em của anh Danh DRINKS.",
            image: require("@/assets/Phong.jpg"),
          }
        ],
        currentIndex: 0
      };
    },
    methods: {
      nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.founders.length;
      },
      prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.founders.length) % this.founders.length;
      }
    }
  };
  </script>
  
  <style scoped>
  .about-container {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
  }
  
  .about-layout {
    display: flex;
    gap: 20px;
  }
  
  .founder-slider {
    flex: 1;
    position: relative;
    max-width: 400px;
  }
  
  .slider-content {
    position: relative;
    overflow: hidden;
  }
  
  .founder-card {
    position: relative;
  }
  
  .founder-card img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .founder-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  
  .founder-card:hover .founder-info {
    opacity: 1;
  }
  
  .founder-info h3 {
    margin: 0 0 5px;
    font-size: 18px;
  }
  
  .founder-info p {
    margin: 0;
    font-size: 14px;
  }
  
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    z-index: 1;
  }
  
  .left-arrow {
    left: 10px;
  }
  
  .right-arrow {
    right: 10px;
  }
  
  .arrow:hover {
    background: rgba(0, 0, 0, 0.8);
  }
  
  .about-content {
    flex: 2;
    text-align: center;
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }
  
  .intro {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-top: 30px;
    color: #555;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  .services li, .contact-info li, .social-links li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    margin: 10px 0;
  }
  
  a {
    color: #42b983;
    text-decoration: none;
    font-weight: bold;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>