<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
const page = ref({ title: 'Video Yükle' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '/admin'
    },
    {
        text: 'Video',
        disabled: false,
        href: '/admin/video'
    },
    {
        text: 'Video Yükle',
        disabled: true,
        href: '/admin/video/add'
    }
]);

const headers = ref([
    { title: 'Video Adı', align: 'start', key: 'name', sortable: false, },
    { title: 'Video Url', align: 'start', key: 'link' },
    { title: '', align: 'start', key: 'action' },
])
</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
           
        </v-col>
    </v-row>
</template>

