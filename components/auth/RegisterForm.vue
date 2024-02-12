<script setup lang="ts">
import { ref } from "vue";
import Logo from "@/layouts/full/logo/Logo.vue";
/*Social icons*/
import google from "/images/svgs/google-icon.svg";
import facebook from "/images/svgs/facebook-icon.svg";

const checkbox = ref(false);
const valid = ref(true);
const show1 = ref(false);
const password = ref("");
const email = ref("");
const passwordRules = ref([
  (v: string) => !!v || "Şifre gerekli!",
  (v: string) =>
    (v && v.length <= 10) || "Password must be less than 10 characters",
]);
const emailRules = ref([
  (v: string) => !!v || "Email gerekli!",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);
const fname = ref("");
const fnameRules = ref([
  (v: string) => !!v || "Ad Soyad gerekli!",
  (v: string) =>
    (v && v.length <= 10) || "Name must be less than 10 characters",
]);
</script>
<template>
  <v-row class="d-flex mb-6">
    <v-col cols="6" sm="6">
      <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
        <img :src="google" height="16" class="mr-2" alt="google" />
        <span class="d-sm-flex d-none mr-1">Google ile Giriş Yap</span>
      </v-btn>
    </v-col>
    <v-col cols="6" sm="6">
      <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
        <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />
        <span class="d-sm-flex d-none mr-1">Facebook ile Giriş Yap</span>
      </v-btn>
    </v-col>
  </v-row>
  <div class="d-flex align-center text-center mb-6">
    <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
      <span class="bg-surface px-5 py-3 position-relative">+</span>
    </div>
  </div>
  <v-form ref="form" class="mt-5">
    <v-label class="text-subtitle-1 font-weight-medium pb-2">Ad Soyad</v-label>
    <VTextField v-model="fname" :rules="fnameRules" required></VTextField>
    <v-label class="text-subtitle-1 font-weight-medium pb-2">Email</v-label>
    <VTextField v-model="email" :rules="emailRules" required></VTextField>
    <v-label class="text-subtitle-1 font-weight-medium pb-2">Şifre</v-label>
    <VTextField v-model="password" :counter="10" :rules="passwordRules" required variant="outlined" type="password"
      color="primary"></VTextField>
    <v-btn size="large" class="mt-2" block submit flat style="background-color: rgb(237 50 162);color:#fff">Kayıt Ol</v-btn>
  </v-form>
</template>
