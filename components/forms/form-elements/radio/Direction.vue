<script setup lang="ts">
import { ref } from 'vue';
const radioColumn = ref('1');
const radioInline = ref('1');
</script>
<template>
    <div class="d-flex gap-3 align-center flex-column flex-sm-row">
        <v-radio-group v-model="radioColumn" column>
            <v-radio label="Option 1" color="primary" value="1"></v-radio>
            <v-radio label="Option 2" color="primary" value="2"></v-radio>
        </v-radio-group>
        <v-radio-group v-model="radioInline" inline>
            <v-radio label="Option 1" color="primary" value="1"></v-radio>
            <v-radio label="Option 2" color="primary" value="2"></v-radio>
        </v-radio-group>
    </div>
</template>
