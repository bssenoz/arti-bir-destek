
<script setup lang="ts">
import { ref } from 'vue';
const slider7 = ref(40);
const slider8 = ref(40);
</script>
<template>
    <div class="d-flex">
        <v-slider v-model="slider7" direction="vertical" label="Regular" color="primary"></v-slider>
        <v-slider v-model="slider8" direction="vertical" label="Regular" color="primary" disabled></v-slider>
    </div>
</template>
