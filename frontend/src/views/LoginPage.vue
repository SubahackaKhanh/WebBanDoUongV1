<template>    
    <div>
        <LoginForm />
        <ComponentsFooter />
    </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import ComponentsFooter from '@/components/ComponentsFooter.vue';


export default {
    components: {
        LoginForm,
        ComponentsFooter
    }
};
</script>