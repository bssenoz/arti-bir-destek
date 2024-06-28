<script setup>
import { SearchIcon } from 'vue-tabler-icons';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- search1 -->
    <!-- ------------------------------------------------>
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn icon class="custom-hover-primary" size="small" variant="text" color="primary" v-bind="props">
                <SearchIcon stroke-width="1.5" size="20" />
            </v-btn>
        </template>
        <v-sheet width="360" elevation="10" rounded="md">
            <div class="d-flex align-center justify-space-between pa-5">
                <v-text-field placeholder="Search" color="primary" density="compact" variant="outlined" hide-details></v-text-field>
            </div>
            <v-divider></v-divider>
            <h5 class="text-h5 mt-4 px-5 pb-4">Quick Page Links</h5>

        </v-sheet>
    </v-menu>
</template>
