<script setup lang="ts">
import TakeMeetAdmin from '@/components/pages/meet/TakeMeetAdmin.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'Danışmanların Takvimi' });
const breadcrumbs = ref([
  {
    text: 'Admin',
    disabled: false,
    href: '/admin'
  },
  {
    text: 'Danışmanların Takvimi',
    disabled: true,
    href: '#'
  }
]);

definePageMeta({
  layout: "default",
  middleware: ['auth'],
});
</script>
<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <TakeMeetAdmin />
</template>
