<script setup lang="ts">
</script>
<template>
  <div class="py-16 overflow-hidden d-flex align-center hscreen">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" class="d-flex align-center">
          <div class="mt-8 mt-lg-0">
            <!-- <span class="text-h5 d-flex align-center gap-2" data-aos="fade-up" data-aos-duration="400">
                            <RocketIcon size="18" class="text-secondary" /> Artı Bir Destek</span> -->
            <h1
              class="bannerTitle pt-5 font-weight-bold"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              Bizimle birlikte,
              <span class="text-primary"
                >sağlıklı ve mutlu bir gebelik deneyimi </span
              >yaşamak için adım atın!
            </h1>
            <p
              class="pt-8 pb-6 text-h5 font-weight-regular"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Hoş geldiniz! Gebelikte psikososyal destek alanında uzmanlaşmış
              bir ekip olarak, anne adaylarının sağlıklı ve mutlu bir gebelik
              deneyimi yaşamalarına yardımcı olmayı hedefliyoruz.
            </p>
            <div
              class="mt-6 d-sm-flex d-sm-flex gap-3"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <v-btn
                target="_blank"
                href="/kayit-ol"
                color="primary"
                size="large"
                class="m-btn-full btn-custom-lg"
                flat
                >Kayıt Ol</v-btn
              >
              <v-btn
                color="primary"
                target="_blank"
                href="/giris-yap"
                variant="outlined"
                class="mt-sm-0 mt-4 lp-btn-shadow m-btn-full btn-custom-lg"
                size="large"
                >Giriş Yap</v-btn
              >
            </div>
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          class="d-none d-sm-block justify-center d-sm-flex"
        >
          <img
            src="/images/backgrounds/Motherhood-rafiki.png"
            style="width: 100%"
            class="obj-cover main-image"
          />
          <a href="/mesajiniz-var" class="text-decoration-none text-primary">
            <div>
              <img
                src="/images/backgrounds/message.png"
                class="position-absolute moving-image cursor-pointer"
              />
              <p style="z-index: 7" class="mesg-text">Mesajınız Var!</p>
            </div>
          </a>
          <img
            src="/images/backgrounds/sent.png"
            class="position-absolute line-img"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.v-container {
  max-width: 1200px !important;
}
.moving-image {
  width: 10%;
  top: 3%;
  right: 7%;
  position: absolute;
  animation: moveImage 5s linear infinite alternate;
  z-index: 7;
}
.line-img {
  width: 30%;
  top: 2%;
  right: 1%;
}

@keyframes moveImage {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateY(50px);
  }
}
@media (max-width: 960px) {
  .moving-image {
    width: 15%;
    right: 2%;
    top: 2%;
    margin-left: -8rem;
  }
  .mesg-text {
    margin-left: -8rem;
  }
}
@media (max-width: 1801px) {
  .mesg-text {
    margin-left: -6rem;
    margin-top: 0;
  }
}
@media (max-width: 1601px) {
  .mesg-text {
    margin-left: -6rem;
    margin-top: 2rem;
  }
}
@media (max-width: 1501px) {
  .moving-image {
    width: 15%;
    right: 4%;
  }
  .mesg-text {
    margin-left: -13rem;
    margin-top: -2rem;
  }
}
@media (max-width: 1401px) {
  .moving-image {
    right: 1%;
  }
}
@media (max-width: 1279px) {
  .mesg-text {
    margin-left: -12rem;
    margin-top: -3rem;
  }
}
@media (max-width: 1100px) {
  .mesg-text {
    margin-left: -13rem;
    margin-top: 0;
  }
  .moving-image {
    top: 2%;
  }
}
@media (max-width: 900px) {
  .mesg-text {
    margin-left: -10rem;
  }
}

@media (max-width: 761px) {
  .main-image {
    display: none;
  }
  .mesg-text {
    margin-left: -5rem;
    margin-top: 8rem;
  }
  .moving-image {
    width: 30%;
    top: 4%;
  }
  .line-img {
    width: 70%;
    top: 4%;
    right: -6%;
  }
}
@media (max-width: 651px) {
  .main-image {
    display: none;
  }
  .mesg-text {
    margin-left: 0rem;
    margin-top: 0rem;
  }
  .moving-image {
    width: 30%;
    top: 65%;
  }
}
@media (min-width: 1100px) {
  .hscreen {
    height: 100vh;
  }
}
@media (max-width: 651px) {
  .hscreen {
    height: 100vh;
  }
  .moving-image {
    width: 40%;
    top: 60%;
    left: 65%;
  }
  .mesg-text {
    float: right;
    margin-right: 35%;
    margin-top: 8rem;
  }
}
</style>
