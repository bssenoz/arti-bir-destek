<script setup lang="ts">
import { ref } from 'vue';
// icons
const min = ref(-50);
const max = ref(90);
const slider3 = ref(40);
const slider4 = ref(40);
</script>
<template>
    <div class="d-flex gap-3 align-center flex-column flex-sm-row">
        <v-label class="text-subtitlte-1">Progress</v-label>
        <v-slider v-model="slider3" class="align-center" :max="max" :min="min" step="1" hide-details color="primary">
            <template v-slot:append>
                <v-text-field variant="plain" v-model="slider3"></v-text-field>
            </template>
        </v-slider>
    </div>
    <div class="d-flex gap-3 align-center flex-column flex-sm-row">
        <v-label class="text-subtitlte-1">Progress</v-label>
        <v-slider v-model="slider4" class="align-center" :max="max" :min="min" step="1" hide-details color="secondary">
            <template v-slot:append>
                <v-text-field variant="plain" v-model="slider4"></v-text-field>
            </template>
        </v-slider>
    </div>
</template>
