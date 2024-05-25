<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';

import AppointmentDoctor from '~/components/pages/meet/AppointmentDoctor.vue';
import AppointmentPatient from '~/components/pages/meet/AppointmentPatient.vue';

definePageMeta({
    middleware: [
    'auth',
  ],
});
const userStore = useUserStore();

const userRole = computed(() => {
    return userStore.userRole;
})

onMounted(() => {
    userStore.getCurrentUser();
});

</script>

<template>
    <AppointmentPatient v-if="userRole == 'Patient'"/>
    <AppointmentDoctor v-if="userRole == 'Doctor'"/>
</template>

<style scoped>
::v-deep(.vc-container) {
    width: 325px;
}
</style>
