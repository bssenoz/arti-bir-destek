<script setup lang="ts">
import { ref } from 'vue';
/* Breadcrumb component */
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

/*Call Components*/
import Followers from '@/components/widgets/charts/Followers.vue';
import Views from '@/components/widgets/charts/Views.vue';
import Earned from '@/components/widgets/charts/Earned.vue';
import TotalEarning from '@/components/widgets/charts/TotalEarning.vue';
import CurrentValue from '@/components/widgets/charts/CurrentValue.vue';
import MostVisited from '@/components/widgets/charts/MostVisited.vue';
import PageImpression from '@/components/widgets/charts/PageImpression.vue';

// theme breadcrumb
const page = ref({ title: 'Charts' });
const breadcrumbs = ref([
    {
        text: 'Home',
        disabled: false,
        href: '#'
    },
    {
        text: 'Charts',
        disabled: true,
        href: '#'
    }
]);



</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>        
    <v-row>
        <!-- Followers Chart -->
        <v-col cols="12" sm="3">
            <Followers />
        </v-col>
        <!-- Views Chart -->
        <v-col cols="12" sm="3">
            <Views />
        </v-col>
        <!-- Earned Chart -->
        <v-col cols="12" sm="3">
            <Earned />
        </v-col>
        <!-- TotalEarning Chart -->
        <v-col cols="12" sm="3">
            <TotalEarning />
        </v-col>
        <!-- Current Value -->
        <v-col cols="12">
            <CurrentValue />
        </v-col>
        <v-col cols="12" md="4">
            <!-- Most Visited -->
            <MostVisited />
        </v-col>
        <v-col cols="12" md="4">
            <!-- Page Impression -->
            <PageImpression />
        </v-col>

    </v-row>
</template>
