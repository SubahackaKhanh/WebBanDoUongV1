<template>
  <div>
    <div>
      <h1>Trang Chủ</h1>
    </div>
    <ImageSlider />
    <div>
      <h2>Sản phẩm</h2>
      <ProductGrid />
    </div>
    <div>
      <ComponentsFooter />
    </div>
    <ChatBot />
  </div>
</template>

<script>
import ImageSlider from "@/components/ImageSlider.vue";
import ProductGrid from "@/components/ProductGrid.vue";
import ComponentsFooter from "@/components/ComponentsFooter.vue";
import ChatBot from "@/components/ChatBot.vue";

export default {
  components: {
    ImageSlider,
    ProductGrid,
    ComponentsFooter,
    ChatBot
  }
};
</script>
