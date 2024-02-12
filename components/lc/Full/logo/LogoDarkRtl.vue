<script setup lang="ts">
import { RouterLink } from 'vue-router';
import RtlDarklogo from '/images/logos/light-logo-rtl.svg';
</script>
<template>
    <div class="logo">
        <NuxtLink to="/">
            <img :src="RtlDarklogo" alt="home" />
        </NuxtLink>
    </div>
</template>
