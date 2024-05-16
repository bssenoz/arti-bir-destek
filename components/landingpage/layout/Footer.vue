<template>
  <div
    :style="{
      backgroundImage: 'url(' + '/images/card/16.png' + ')',
      backgroundPosition: 'bottom',
      backgroundRepeat: 'repeat',
    }"
    class="d-flex justify-center align-center height-40vh"
  >
    <v-row class="justify-center">
      <v-col cols="12" md="4" sm="5" class="text-center">
        <div class="bottom-responsive">
          <p class="text-subtitle-1 mt-2 text-13 font-mansalva color-pink-1">
            Artı Bir Destek
          </p>
          <p class="text-subtitle-1 mt-2 text-13 color-pink-1">©2024</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
@media (max-height: 699px) {
  .height-40vh {
    height: 50vh;
  }
}
.bottom-responsive {
  margin-bottom: 25vh;
}
@media (min-height: 590px) and (min-width: 1020px)  {
  .bottom-responsive {
    margin-bottom: 30vh;
  }
}
@media (min-height: 1200px)  {
  .bottom-responsive {
    margin-bottom: 18vh;
  }
}
</style>
