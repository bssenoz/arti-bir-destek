<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import PatientTableAdmin from '~/components/table/PatientTableAdmin.vue';
const page = ref({ title: 'Danışanlar' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '/admin'
    },
    {
        text: 'Danışanlar',
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
    <v-card elevation="10">
        <v-card-text>
            <PatientTableAdmin />
        </v-card-text>
    </v-card>
</template>
