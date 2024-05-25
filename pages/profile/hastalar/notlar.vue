<script setup lang="ts">
import PatientTable from '@/components/table/PatientTable.vue';
definePageMeta({
    middleware: ['auth'],
});
</script>
<template>
    <v-card elevation="10">
        <v-card-text>
            <PatientTable />
        </v-card-text>
    </v-card>
</template>
