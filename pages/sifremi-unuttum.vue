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
            <v-col cols="12" md="6" class="d-flex align-center pr-md-8 justify-center text-center">
              <div class="mt-xl-0 mw-100" style="width:500px">
                  <img src="/images/backgrounds/adimlar.jpg" style="width: 50px" />
                    <h2 class="text--darken-2 text-h4 font-weight-bold">Parolanızı mı unuttunuz?</h2>
                    <p class="text-subtitle-1 py-4 text-10">
                        Lütfen hesabınızla ilişkili e-posta adresini girin. Şifrenizi sıfırlamanız için size e-postayla bir bağlantı göndereceğiz.
                    </p>
                    <AuthResetForm />
                    <v-btn size="large" to="/giris-yap" block class="mt-5" flat style="color:#db2777;">Giriş Ekranına Dön</v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<style scoped lang="scss">
.auth {
  .v-col-lg-7 {
    max-width: 60%;
  }
}
.w-700 {
  @media screen and (max-width: 1323px) {
    width: 500px;
  }
  width: 700px;
}
</style>
