<script setup lang="ts">
import { ref  } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import DoctorTableUnConfirmed from '@/components/table/DoctorTableUnConfirmed.vue';

const page = ref({ title: 'Danışmanlar' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '/admin/'
    },
    {
        text: 'Danışman',
        disabled: false,
        href: '/danismanlar/'
    },
    {
        text: 'Onay Bekleyenler',
        disabled: true,
        href: '#'
    }
]);

</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <DoctorTableUnConfirmed />
        </v-card-text>
    </v-card>
</template>

