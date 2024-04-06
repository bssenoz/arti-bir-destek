<template>
    <div class="logo">
        <NuxtLink to="/" class="font-mansalva font-weight-bold color-pink-1 text-decoration-none font-weight-bold">
            Artı Bir Destek
        </NuxtLink>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
