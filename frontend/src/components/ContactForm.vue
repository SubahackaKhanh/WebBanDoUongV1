<template>
    <div class="contact-container">
      <h2>Liên Hệ Chúng Tôi</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="input-group">
          <label for="name">Họ và Tên</label>
          <input type="text" id="name" v-model="form.name" required placeholder="Nhập họ và tên của bạn" />
        </div>
  
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required placeholder="Nhập email của bạn" />
        </div>
  
        <div class="input-group">
          <label for="message">Nội dung tin nhắn</label>
          <textarea id="message" v-model="form.message" rows="5" required placeholder="Nhập nội dung cần gửi"></textarea>
        </div>
  
        <button type="submit" class="contact-btn">Gửi tin nhắn</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactForm",
    data() {
      return {
        form: {
          name: "",
          email: "",
          message: "",
        },
      };
    },
    methods: {
      submitForm() {
        alert(`Cảm ơn bạn, ${this.form.name}! Chúng tôi sẽ liên hệ với bạn sớm nhất.`);
        this.form.name = "";
        this.form.email = "";
        this.form.message = "";
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    margin-bottom: 20px;
  }
  
  .input-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    transition: border 0.3s;
  }
  
  input:focus,
  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .contact-btn {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .contact-btn:hover {
    background: #0056b3;
  }
  </style>
  