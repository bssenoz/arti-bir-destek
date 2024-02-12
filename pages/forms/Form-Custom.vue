<script setup lang="ts">
import { ref } from 'vue';
// common components
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import CustomForm from '~~/components/forms/form-custom/CustomForm.vue'
// theme breadcrumb
const page = ref({ title: 'Form Layouts' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Form Layouts',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
   <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
   <v-row>
        <v-col cols="12" class="mb-12">
            <UiParentCard title="Custom Form">
                <CustomForm/>
            </UiParentCard>           
        </v-col>
   </v-row>           
</template>
