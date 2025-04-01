<template>
    <div class="chat-container">
      <div class="chat-header" @click="toggleChat">
        <h3>ChatBot</h3>
        <button class="toggle-btn">{{ isOpen ? "↓" : "↑" }}</button>
      </div>
      <div class="chat-box" v-show="isOpen">
        <iframe
          src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/12/19/20250312195931-V6I1NRXP.json"
          width="100%"
          height="500"
          style="border: none;"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChatBot",
    data() {
      return {
        isOpen: false, // Đổi thành false để ẩn ban đầu
      };
    },
    methods: {
      toggleChat() {
        this.isOpen = !this.isOpen; // Khi nhấn, đổi trạng thái ẩn/hiện
      },
    },
  };
  </script>
  
  <style scoped>
  .chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 300px;
    border: 1px solid #ccc;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    background: #42b983;
    color: white;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  
  .toggle-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
  
  .chat-box {
    padding: 10px;
    flex-grow: 1;
    max-height: 500px; /* Điều chỉnh để khớp với iframe */
    overflow-y: auto;
  }
  </style>