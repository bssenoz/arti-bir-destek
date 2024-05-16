<template>
    <div
      class="py-16 mt-16 overflow-hidden bg-lightprimary"
    >
      <v-container>
        <v-row class="pt-16 pt-md-0">
          <v-col cols="12" md="4">
            <div class="text-h3">Neden Bizi Tercih Etmelisiniz?</div>
            <div class="text-h5 font-weight-light mt-4">
              Fetüste anomali riski, gebeliği zorlaştırabilir. Psikososyal
              desteğimizle bu zorluğun üstesinden birlikte gelelim.
            </div>
            <div class="d-flex justify-center align-center">
  
              <img src="/images/backgrounds/smile.gif" style="width: 250px"/>
            </div>
          </v-col>
          <v-col cols="12" md="8" class="d-flex justify-center align-center">
            <swiper
              :effect="'cards'"
              :grabCursor="true"
              :modules="modules"
              class="mySwiper"
            >
              <swiper-slide v-for="(card, index) in cards" :key="index">
                <div class="card-content">
                  <div class="text-h6 font-weight-bold">
                    {{ card.title }}
                  </div>
                  <div class="icon-container">
                    <BabyCarriageIcon v-if="index%cards.length == 0"/>
                    <BallonIcon v-if="index%cards.length == 1"/>
                    <HeartIcon v-if="index%cards.length == 2"/>
                    <HorseToyIcon v-if="index%cards.length == 3"/>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import "swiper/css";
  import "swiper/css/effect-cards";
  import { EffectCards } from "swiper/modules";
  import { BabyCarriageIcon, VaccineBottleIcon, BottleIcon, BikeIcon, HeartIcon, HorseToyIcon, BallonIcon} from "vue-tabler-icons";
  
  const modules = ref([EffectCards]);
  const cards = ref([
    {
      title: "Deneyimli ve uzman bir ekip",
      image: "/images/card/3.jpg",
      video: "/images/card/4.mp4",
    },
    {
      title: "Bireysel ihtiyaçlara yönelik çözümler",
      image: "/images/card/3.jpg",
      video: "/images/card/baby.mp4",
    },
    {
      title: "Güvenilir ve doğru bilgi kaynağı",
      image: "/images/card/3.jpg",
      video: "/images/card/baby (2).mp4",
    },
    {
      title: "İnsan odaklı ve samimi hizmet anlayışı",
      image: "/images/card/3.jpg",
      video: "/images/card/baby3.mp4",
    },
  ]);
  </script>
  
  <style scoped>
  .v-container {
    max-width: 1200px !important;
  }
  .swiper {
    width: 240px;
    height: 320px;
  }
  
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
  }
  
  .swiper-slide:nth-child(odd) {
    background-color: #db2777;
  }
  
  .swiper-slide:nth-child(even) {
    background-color: #bdd8ef;
  }
  .card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }
  
  .icon-container {
    position: absolute;
    bottom: 0;
    right: 1rem;
  }
  </style>
  