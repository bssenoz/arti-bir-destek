<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import TitleTable from '@/components/table/TitleTable.vue';
const page = ref({ title: 'Danışman Ünvanları' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '/admin/'
    },
    {
        text: 'Danışman Ünvanları',
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
    <BaseBreadcrumb :title="page.title"  :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <TitleTable />
        </v-card-text>
    </v-card>
</template>
