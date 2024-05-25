<script setup lang="ts">
import TakeMeet from '@/components/pages/meet/TakeMeet.vue';
definePageMeta({
  layout: "page",
  middleware: ['auth'],
});
</script>
<template>
  <TakeMeet />
</template>
