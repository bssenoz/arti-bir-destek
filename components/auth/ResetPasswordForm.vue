<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useUserStore } from '@/stores/user';
import { ResetPassword } from '@/types/UserType';
import Swal from "sweetalert2";

const valid = ref(true);
const newPass = ref("");
const confirmPass = ref("");
const token = ref("");
const mail = ref("");
const show1 = ref(false);
const show2 = ref(false);
const userStore = useUserStore();

const isPasswordValid = computed(() => {
    return passwordRules.every((rule) => rule(newPass.value) === true);
});

const isPasswordConfirmValid = computed(() => {
    return newPass.value === confirmPass.value;
});

const isFormValid = computed(() => {
    return isPasswordValid.value && isPasswordConfirmValid.value;
});
const passwordRules = [
    (v: string) => !!v || "Şifre gerekli!",
    (v: string) => v.length >= 6 || "Şifre en az 6 karakter olmalıdır!",
    (v: string) => /[A-Z]/.test(v) || "Şifre en az bir büyük harf içermelidir!",
    (v: string) => /[a-z]/.test(v) || "Şifre en az bir küçük harf içermelidir!",
    (v: string) =>
        /[\W_]/.test(v) || "Şifre en az bir özel karakter içermelidir!",
];
onMounted(() => {
    const queryString = window.location.search;

    const mailParamIndex = queryString.indexOf('mail=');
    if (mailParamIndex !== -1) {
        mail.value = queryString.substring(mailParamIndex + 5);
        token.value = queryString.substring(7, mailParamIndex - 1);
    }

    if (!mail.value) {
        console.error("Mail parametresi bulunamadı veya null.");
    }
});

const resetPassword = async () => {
    const changePassword: ResetPassword = {
        email: mail.value,
        newPassword: newPass.value,
        confirmPassword: confirmPass.value,
    };
    try {
        await userStore.resetPassword(changePassword, token.value)
        Swal.fire({
            title: "Başarılı!",
            text: "Şifreniz başarıyla güncellendi.",
            icon: "success",
            confirmButtonText: "Tamam",
        });
    } catch (error) {
        Swal.fire({
            title: "Hata!",
            text: "Şifreniz güncellenemedi.",
            icon: "error",
            confirmButtonText: "Tamam",
        });
    }
}
</script>

<template>
    <div class="text-start">
        <v-form ref="form" v-model="valid" lazy-validation action="/dashboards/modern" class="mt-sm-13 mt-8">
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Yeni Şifre</v-label>
            <VTextField v-model="newPass" :counter="6" :rules="passwordRules" required variant="outlined"
                hide-details="auto" :type="show1 ? 'text' : 'password'"
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="show1 = !show1"
                color="primary"></VTextField>
            <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Şifreyi Onayla</v-label>
            <VTextField v-model="confirmPass" :counter="6" :rules="passwordRules" required variant="outlined"
                hide-details="auto" :type="show2 ? 'text' : 'password'"
                :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append-inner="show2 = !show2"
                color="primary"></VTextField>
            <div v-if="!isFormValid && newPass && confirmPass" class="text-h6 text-error ml-4 my-4">Şifreler eşleşmiyor!
            </div>
            <v-btn size="large" to="/" block submit flat style="background-color: rgb(237 50 162); color: #fff"
                @click="resetPassword()">Şifremi
                Değiştir</v-btn>
        </v-form>
    </div>
</template>
