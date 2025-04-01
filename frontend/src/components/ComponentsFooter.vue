<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h2>Danh DRINKS</h2>
            <p>Chào mừng đến với Danh DRINKS!</p>
            <p>Uống là Mê, Mê là Phê mà Phê là ghiền!</p>
            <p>Rượu Chè Nước ngọt Gì Cũng có</p>
            <p>Đây là nơi bạn có thể đắm mình vào thức uống!</p>
            <p>Chúng tôi luôn đem đến cho bạn "NƯỚC"</p>
            <p>WEB CẤM MẤY THẰNG CALI!</p>
          </div>
          <div class="footer-links">
            <h3>Liên kết</h3>
            <ul>
              <li><a href="/">Trang chủ</a></li>
              <li><a href="/about">Về chúng tôi</a></li>
              <li><a href="/products">Sản Phẩm</a></li>
              <li><a href="/contact">Liên hệ</a></li>
            </ul>
          </div>
          <div class="footer-contact">
            <h3>Liên hệ</h3>
            <ul>
                <li><a href="https://www.facebook.com/profile.php?id=100040219725971">Facebook</a></li>
                <li><a href="https://www.instagram.com/kazuramihara">Instagram</a></li>
            </ul>
            <div class="social-icons">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2025 Danh Drinks, Web bán đồ uống rẻ top 1 server việt nam</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: "FooterComponent",
  };
  </script>
  
  <style scoped>
  .footer {
    background: #42b983;
    color: #fff;
    padding: 40px 0;
    text-align: center;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
  }
  
  .footer-logo h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .footer-links h3,
  .footer-contact h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .footer-links ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-links li {
    margin: 5px 0;
  }
  
  .footer-links a {
    color: #fff;
    text-decoration: none;
  }
  
  .footer-links a:hover {
    text-decoration: underline;
  }
  
  .footer-contact p {
    margin: 5px 0;
  }
  
  .social-icons a {
    color: #fff;
    font-size: 20px;
    margin: 0 10px;
  }
  
  .footer-bottom {
    margin-top: 20px;
    font-size: 14px;
    opacity: 0.7;
  }
  </style>
  