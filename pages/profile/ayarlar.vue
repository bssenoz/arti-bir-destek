<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import AccountTab from '@/components/pages/account-settings/AccountTab.vue';

const userStore = useUserStore();
onMounted(() => {
    userStore.getCurrentUser()
});
const user = computed(() => {
    return userStore.currentUser;
});

definePageMeta({
    layout: "default",
    middleware: [
        function (to, from) {
            // Custom inline middleware
        },
        'auth',
    ],
});

</script>

<template>
    <AccountTab :user="user" />
</template>
