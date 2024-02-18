<script setup lang="ts">
import { ref } from "vue";
import { Form } from "vee-validate";
import { useUserStore } from '@/stores/apps/user'; // Kullanıcı mağazasını içe aktarın
import { UserType } from '@/types/apps/UserType'; // Kullanıcı türünü içe aktarın

import google from "/images/svgs/google-icon.svg";
import facebook from "/images/svgs/facebook-icon.svg";

const userStore = useUserStore();
const dialogError = ref(false);
const errorText = ref("");
const router = useRouter();
const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref("");
const email = ref("");
const passwordRules = ref([
  (v: string) => !!v || "Şifre gerekli!",
]);
const emailRules = ref([
  (v: string) => !!v || "Email gerekli!",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail tanımına uymuyor!",
]);
const login = async () => {
  try {
    const user: UserType = {
      email: email.value,
      password: password.value,
      id: 0,
      name: "",
      surname: "",
      confirmPassword: ""
    };
    await userStore.login(user);
    router.push({ path: "/profile" });
  } catch (error) {
    console.error("login error: ", error);
    errorText.value = error.message;
    dialogError.value = true;

  }
};
const closeDialog = () => {
  dialogError.value = false;
};

</script>

<template>
  <v-row class="d-flex mb-3">
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
      <span class="bg-surface px-5 py-3 position-relative"> + </span>
    </div>
  </div>

  <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
  <VTextField v-model="email" :rules="emailRules" class="mb-8" required hide-details="auto"></VTextField>
  <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Şifre</v-label>
  <VTextField v-model="password" :rules="passwordRules" required hide-details="auto" type="password" class="pwdInput">
  </VTextField>
  <div class="d-flex flex-wrap align-center my-3 ml-n2">
    <v-checkbox v-model="checkbox" :rules="[(v: any) => !!v || 'You must agree to continue!']" required hide-details
      color="primary">
      <template v-slot:label class="">Beni hatırla</template>
    </v-checkbox>
    <div class="ml-sm-auto">
      <NuxtLink to="" class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">Şifremi Unuttum
        ?</NuxtLink>
    </div>
  </div>
  <v-btn size="large" :disabled="!password" block type="submit" flat style="background-color: rgb(237 50 162);color:#fff"
    @click="login">Giriş Yap</v-btn>
  <v-dialog v-model="dialogError" width="500">
    <v-card title="Hata">
      <v-card-text>
        {{ errorText }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Kapat" @click="closeDialog"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
