<script setup lang="ts">
import { ref  } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DoctorTable from '@/components/table/DoctorTable.vue';

const page = ref({ title: 'Danışmanlar' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '/admin'
    },
    {
        text: 'Danışman',
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
            <DoctorTable />
        </v-card-text>
    </v-card>
</template>

