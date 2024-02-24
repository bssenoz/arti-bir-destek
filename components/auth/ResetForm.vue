<script setup lang="ts">
import { ref } from 'vue';
const valid = ref(true);
const email = ref('');
const emailRules = ref([(v: string) => !!v || 'Email gerekli!', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);
</script>
<template>
    <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/modern" class="mt-sm-13 mt-8">
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email Adresi</v-label>
        <VTextField v-model="email" :rules="emailRules" required ></VTextField>
        <v-btn size="large" to="/" block  submit flat style="background-color: rgb(237 50 162);color:#fff">Şifremi Unuttum</v-btn>
    </v-form>
</template>
