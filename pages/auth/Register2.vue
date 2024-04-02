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
      <v-col
        cols="12"
        lg="7"
        class="d-lg-flex align-center justify-center position-relative"
        style="
          background: linear-gradient(to right, #facae0 50%, transparent 50%);
        "
      >
      <div class="d-lg-flex justify-center">
          <p class="text-h1 font-mansalva" style="color: #db2777;">Artı Bir Destek</p>
          <img
            src="/images/backgrounds/welcome-bg-3.png"
            class="position-relative d-none d-lg-flex w-50 h-100"
            alt="login-background"
          />
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="5"
        class="d-lg-flex align-center justify-center"
      >
        <div class="mt-xl-0 mt-5 mw-100">
          <h2 class="text-h3 font-weight-bold mb-4">Artı Bir Destek Sistemi</h2>
          <AuthRegisterStepForm />
          <h6 class="text-h6 text-medium-emphasis mt-4 ml-5">
            Zaten hesabın var mı?
            <v-btn
              variant="plain"
              to="/auth/login"
              class="text-primary text-body-1 opacity-1 pl-2"
              >Giriş Yap</v-btn
            >
          </h6>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.auth {
  .v-col-lg-7 {
    max-width: 65%;
  }
}
</style>
