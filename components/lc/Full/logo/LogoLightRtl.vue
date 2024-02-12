<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RtlLightlogo from '/images/logos/dark-rtl-logo.svg';
</script>
<template>
    <div class="logo">
        <NuxtLink to="/">
            <img :src="RtlLightlogo" alt="home" />
        </NuxtLink>
    </div>
</template>
