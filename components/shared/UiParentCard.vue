<script setup lang="ts">
const props = defineProps({
    title: String,
    isUpcoming: Boolean, 
    isPast: Boolean,
    isActive: Boolean,
});
</script>

<template>
    <v-card elevation="10" >
        <v-card-item class="py-4 px-6">
            <div class="d-sm-flex align-center justify-space-between">
                <v-card-title class="text-h5">
                    <v-badge v-if="isUpcoming" class="d-block" dot color="secondary"> </v-badge>
                    <v-badge v-else-if="isActive" class="d-block" dot color="success"> </v-badge>
                    <v-badge v-else-if="isPast" class="d-block" dot color="error"> </v-badge>
                    <span class="ml-4">{{ title }}</span> 
                </v-card-title>
                <slot name="action"></slot>
            </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
            <slot />
        </v-card-text>
    </v-card>
</template>

<style scoped>
::v-deep(.v-badge--dot .v-badge__badge) {
    left: 0 !important;
    top: .5rem !important;
}
</style>