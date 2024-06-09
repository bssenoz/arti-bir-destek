<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

const userStore = useUserStore();
const token = ref("");
const mail = ref("");
const router = useRouter();

onMounted(() => {
    const queryString = window.location.search;
    const mailParamIndex = queryString.indexOf('email=');
    if (mailParamIndex !== -1) {
        mail.value = queryString.substring(mailParamIndex + 6);
        token.value = queryString.substring(7, mailParamIndex - 1);
    }

    if (!mail.value) {
        console.error("Mail parametresi bulunamadı veya null.");
    }
});

const mailConfirm = async () => {
  try {
    await userStore.mailConfirm(mail.value, token.value)
    Swal.fire({
      title: "Başarılı!",
      text: "Hesabınız onaylandı.",
      icon: "success",
      confirmButtonText: "Tamam",
    }).then(() => {
      router.push({ path: "/giris-yap" });
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
    <p class="mt-4 text-center">Hesabınızı doğrulamak için butona tıklayınız.</p>
    <v-btn size="large" block submit flat style="background-color: rgb(237 50 162); color: #fff" class="mt-4"
      @click="mailConfirm()">Hesabımı Doğrula</v-btn>
  </div>
</template>
