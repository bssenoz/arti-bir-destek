<script setup lang="ts">
import TakeMeetAdmin from '@/components/pages/meet/TakeMeetAdmin.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'Videolar' });
const breadcrumbs = ref([
  {
    text: 'Admin',
    disabled: false,
    href: '#'
  },
  {
    text: 'Danışmanların Takvimi',
    disabled: true,
    href: '#'
  }
]);

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
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <TakeMeetAdmin />
</template>
