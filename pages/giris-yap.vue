<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>
<template>
  <div class="pa-3">
    <v-row class="h-100vh auth">
      <v-col
        cols="12"
        md="6"
        class="d-none d-md-flex align-center justify-center position-relative"
        style="
          background: linear-gradient(to right, #facae0 50%, transparent 50%);
        "
      >
        <div class="d-lg-flex justify-center">
          <img
            src="/images/backgrounds/welcome-bg-3.png"
            class="position-relative d-none d-md-flex h-100 mt-md-12 mt-xl-0 mt-xl-n16" style="width:600px"
            alt="login-background"
          />
          
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center pr-md-8 justify-center text-center"
      >
        <div class="mt-xl-0 mw-100" style="width:500px">
            <img src="/images/backgrounds/adimlar.jpg" style="width: 50px" />
          <h2 class="text-h3 font-mansalva font-weight-bold mb-2">
            Artı Bir Destek Sistemine
          </h2>
          <h2 class="text-h3 font-mansalva font-weight-bold mb-6">
            Hoşgeldiniz!
          </h2>

          <AuthLoginForm />
          <h6 class="text-h6 d-flex align-center mt-6 font-weight-medium">
            Hesabın yok mu?
            <v-btn
              class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium"
              height="auto"
              to="/kayit-ol"
              variant="plain"
              >Hesap oluştur</v-btn
            >
          </h6>
        </div>
      </v-col>
    </v-row>
  </div>
</template>