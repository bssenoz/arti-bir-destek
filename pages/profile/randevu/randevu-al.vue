<script setup lang="ts">
import TakeMeet from '@/components/pages/meet/TakeMeet.vue';
definePageMeta({
  layout: "page",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});
</script>
<template>
  <TakeMeet />
</template>
