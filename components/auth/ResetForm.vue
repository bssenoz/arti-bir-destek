<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";
const userStore = useUserStore()

const email = ref("");

const handleEnterKey = () => {
  if (email.value) {
    forgotPassword();
  }
}

const forgotPassword = async () => {
  try {
    await userStore.forgotPassword(email.value)
    Swal.fire({
      title: "Başarılı!",
      text: "Şifre sıfırlama bağlantısı mailinize gönderildi.",
      icon: "success",
      confirmButtonText: "Tamam",
    });
  } catch (error) {
    Swal.fire({
      title: "Hata!",
      text: "Bir hatayla karşılaşıldı.",
      icon: "error",
      confirmButtonText: "Tamam",
    });
  }
}
</script>
<template>
  <div class="text-start">
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email</v-label>
    <VTextField v-model="email" required @keydown.enter="handleEnterKey"></VTextField>
    <v-btn size="large" block submit flat style="background-color: rgb(237 50 162); color: #fff"
      @click="forgotPassword()">Şifremi Unuttum</v-btn>
  </div>
</template>
