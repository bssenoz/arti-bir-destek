<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="8" xl="8" xxl="9" class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-sm-6 pt-2 px-sm-6 px-3 pb-sm-6 pb-0">
                    <div class="position-relative"></div>
                </div>
                <div class="">
                    <img src="/images/backgrounds/login-bg.svg" class="position-relative d-none d-lg-flex" alt="login-background" />
                </div>
            </v-col>
            <v-col cols="12" lg="4" xl="4" xxl="3" class="d-flex align-center justify-center">
                <div class="pa-sm-7 pa-4">
                    <h2 class="text--darken-2 text-h4 font-weight-bold">Parolanızı mı unuttunuz?</h2>
                    <p class="text-subtitle-1 py-4 text-10">
                        Lütfen hesabınızla ilişkili e-posta adresini girin. Şifrenizi sıfırlamanız için size e-postayla bir bağlantı göndereceğiz.
                    </p>
                    <AuthResetForm />
                    <v-btn size="large" to="/auth/login" block class="mt-5" flat style="background-color: rgb(221, 154, 194);color:#fff">Giriş Ekranına Dön</v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
