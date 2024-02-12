<script setup lang="ts">
import { ref } from 'vue';
const includeFiles = ref(true);
const enabled = ref(false);
</script>
<template>
    <div class="d-flex">
        <v-checkbox-btn v-model="includeFiles" class="pr-2"></v-checkbox-btn>
        <v-text-field variant="outlined" label="Include files" hide-details></v-text-field>
    </div>
    <div class="d-flex mt-3">
        <v-checkbox-btn v-model="enabled" class="pr-2"></v-checkbox-btn>
        <v-text-field variant="outlined" :disabled="!enabled" hide-details label="I only work if you check the box"></v-text-field>
    </div>
</template>
