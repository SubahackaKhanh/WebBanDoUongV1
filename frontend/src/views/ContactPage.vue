<template>
    <div class="contact-container">
      <div class="contact-content">
        <ContactForm /> 
        <div>
          <ComponentsFooter />
        </div>
        <ChatBot />
      </div>
    </div>
  </template>
  
  <script>
  import ContactForm from "@/components/ContactForm.vue";
  import ComponentsFooter from "@/components/ComponentsFooter.vue";
  import ChatBot from "@/components/ChatBot.vue";

  export default {
    name: "ContactPage",
    components: {
        ContactForm,
        ComponentsFooter,
        ChatBot
    },
  };
  </script>
  