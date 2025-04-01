<template>    
    <div>
        <AdminLoginForm />
        <ComponentsFooter />
    </div>
</template>

<script>
import AdminLoginForm from '@/components/AdminLoginForm.vue';
import ComponentsFooter from '@/components/ComponentsFooter.vue';


export default {
    components: {
        AdminLoginForm,
        ComponentsFooter
    }
};
</script>