<script setup lang="ts">
// assets
import imageEmpty from '/images/products/empty-shopping-cart.svg';
</script>

<template>
    <v-row class="justify-center">
        <v-col class="text-center" lg="7">
            <v-img :src="imageEmpty" alt="cover" />
            <h1 class="text-h1 mt-6">There is no Product</h1>
            <p>Try checking your spelling or use more general terms</p>
        </v-col>
    </v-row>
</template>
