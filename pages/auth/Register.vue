<script setup lang="ts">

import google from "/images/svgs/google-icon.svg";
import facebook from "/images/svgs/facebook-icon.svg";
definePageMeta({
    layout: "blank",
});
</script>
<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="7" xl="8" class="d-lg-flex align-center justify-center authentication position-relative">
                <div class="auth-header pt-lg-6 pt-2 px-sm-6 px-3 pb-lg-6 pb-0">
                    <div class="position-relative">
                        <!-- logo -->
                    </div>
                </div>
                <div class="">
                    <img src="/images/backgrounds/welcome-bg2.png" class="position-relative d-none d-lg-flex"
                        alt="login-background" />
                </div>
            </v-col>
            <v-col cols="12" lg="5" xl="4" class="d-lg-flex align-center justify-center">
                <div class="mt-xl-0 mt-5 mw-100">
                    <h2 class="text-h3 font-weight-bold mb-4">Artı Bir Destek Sistemi</h2>
                    <AuthRegisterForm />
                    <h6 class="text-h6 text-medium-emphasis mt-4 ml-5">
                        Zaten hesabın var mı?
                        <v-btn variant="plain" to="/auth/login" class="text-primary text-body-1 opacity-1 pl-2">Giriş
                            Yap</v-btn>
                    </h6>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
