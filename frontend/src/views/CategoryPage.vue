<template>
    <div>
        <DrinksCategory />
        <ChatBot />
    </div>
</template>

<script>
import DrinksCategory from "@/components/DrinksCategory.vue";
import ChatBot from "@/components/ChatBot.vue";

export default {
    components: { 
        DrinksCategory,
        ChatBot
    },
};
</script>