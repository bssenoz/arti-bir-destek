<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from '@/stores/user';
import { DoctorType } from '@/types/UserType';

const userStore = useUserStore();

const router = useRouter();

const errorText = ref("");
const password = ref("");
const passwordConfirm = ref("");
const email = ref("");
const phoneNumber = ref("");
const title = ref("");
const firstName = ref("");
const lastName = ref("");
const show1 = ref(false);
const show2 = ref(false);

const passwordRules = ref([
  (v: string) => !!v || "Şifre gerekli!",
]);
const emailRules = ref([
  (v: string) => !!v || "E-posta gerekli!",
  (v: string) => /.+@.+\..+/.test(v) || "E-posta geçerli olmalıdır!",
]);
const titleRules = ref([
  (v: string) => !!v || "Ünvan gerekli!"
]);
const nameRules = ref([
  (v: string) => !!v || "Ad gerekli!",
]);
const surnameRules = ref([
  (v: string) => !!v || "Soyad gerekli!",
]);

const dialogVisible = ref(false);
const dialogError = ref(false);

const register = async () => {
  try {
    if (password.value !== passwordConfirm.value) {
      throw new Error("Şifreler eşleşmiyor");
    }

    const newUser: DoctorType = {
      name: firstName.value,
      surname: lastName.value,
      email: email.value,
      title: title.value,
      phoneNumber: phoneNumber.value,
      password: password.value,
      confirmPassword: passwordConfirm.value,
      id: null
    };

    await userStore.registerDoctor(newUser);
    dialogVisible.value = true;

  } catch (error) {
    console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
    errorText.value = error.message;
    dialogError.value = true;
  }
};
const closeDialogAndRedirect = () => {
  dialogVisible.value = false;
  router.push({ path: '/auth/login' });
};
const closeDialog = () => {
  dialogError.value = false;
};
</script>
<template>
  <v-form class="mt-2 mx-5">
    <v-row>
      <v-col cols="12" sm="6">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Ad</v-label>
        <VTextField v-model="firstName" :rules="nameRules" required></VTextField>
      </v-col>
      <v-col cols="12" sm="6">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Soyad</v-label>
        <VTextField v-model="lastName" :rules="surnameRules" required></VTextField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Email</v-label>
        <VTextField v-model="email" :rules="emailRules" required></VTextField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Telefon Numarası</v-label>
        <VTextField v-model="phoneNumber"></VTextField>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Ünvan</v-label>
        <VTextField v-model="title" :rules="titleRules" required></VTextField>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Şifre</v-label>
        <VTextField v-model="password" :counter="10" :rules="passwordRules" required variant="outlined" hide-details="auto" 
                :type="show1 ? 'text' : 'password'"  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show1 = !show1"
          color="primary"></VTextField>
      </v-col>
      <v-col cols="12" sm="6">
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Şifre Tekrar</v-label>
        <VTextField v-model="passwordConfirm" :counter="10" :rules="passwordRules" required variant="outlined" hide-details="auto" 
                :type="show2 ? 'text' : 'password'"  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show2 = !show2" color="primary"></VTextField>
      </v-col>
    </v-row>

    <v-btn size="large" class="mt-6" block submit flat style="background-color: rgb(237 50 162);color:#fff"
      @click="register">Kayıt Ol</v-btn>
      
    <v-dialog v-model="dialogVisible" width="500">
      <v-card title="Kayıt Başarılı">
        <v-card-text>
          Kaydınız başarıyla tamamlandı.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Kapat" @click="closeDialogAndRedirect"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  </v-form>
</template>

<style lang="scss" scoped>
.v-row {
  margin-bottom: -35px !important;
}
</style>

