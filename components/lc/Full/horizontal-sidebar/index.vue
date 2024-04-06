<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { mdAndUp } = useDisplay();
</script>

<template >
    <div v-if="!mdAndUp" class="mobile-menu">
        <LcFullVerticalSidebar />
    </div>
</template>
<style lang="scss"></style>
