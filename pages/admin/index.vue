<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Cards from "@/components/cards/Cards.vue";

const page = ref({ title: 'Admin Paneli' });

definePageMeta({
    layout: "default",
    middleware: ['auth'],
});

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <Cards />
</template>
