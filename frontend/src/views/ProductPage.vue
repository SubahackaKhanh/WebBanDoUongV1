<template>
  <div>
    <div>
      <h1>Trang Sản Phẩm</h1>
      <ProductGrid />
    </div>
    <div>
      <ComponentsFooter />
    </div>
    <div>
      <ChatBot /> 
    </div>
  </div>
</template>

<script>
import ComponentsFooter from "@/components/ComponentsFooter.vue";
import ProductGrid from "@/components/ProductGrid.vue";
import ChatBot from "@/components/ChatBot.vue";

export default {
  components: { 
    ProductGrid, 
    ComponentsFooter,
    ChatBot
  },
};
</script>
