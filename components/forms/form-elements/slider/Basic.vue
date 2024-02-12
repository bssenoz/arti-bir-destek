<script setup lang="ts">
import { ref } from 'vue';
const slider1 = ref(50);
</script>
<template>
    <UiChildCard title="Basic Slider">
        <v-slider v-model="slider1" color="primary" label="basic"></v-slider>
    </UiChildCard>
</template>
