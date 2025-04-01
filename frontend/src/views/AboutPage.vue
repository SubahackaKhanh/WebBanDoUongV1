<template>
  <div>
    <AboutForm />
    <ComponentsFooter />
    <ChatBot />
  </div>
</template>

<script>
import AboutForm from '@/components/AboutForm.vue';
import ComponentsFooter from '@/components/ComponentsFooter.vue';
import ChatBot from '@/components/ChatBot.vue';

export default {
  components: {
    AboutForm,
    ComponentsFooter,
    ChatBot
  }
};
</script>