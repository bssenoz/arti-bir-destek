<script setup lang="ts">
import { ref } from 'vue';
import {productsSlider } from '@/_mockApis/landingpage/lpPage';
</script>
<template>
    <v-container class="maxWidth">
        <v-row class="justify-center">
            <v-col cols="12" lg="8" sm="10" data-aos="fade-up" data-aos-duration="500">
                <div class="d-sm-flex align-center text-center justify-center">
                    <div class="d-flex flex-row-reverse justify-sm-start justify-center ml-sm-0 ml-3">
                        <v-avatar class="ml-n2 avtar-border" size="28">
                            <img src="/images/profile/user-3.jpg" height="28" alt="usericon" />
                        </v-avatar>
                        <v-avatar class="ml-n2 avtar-border" size="28">
                            <img src="/images/profile/user-2.jpg" height="28" alt="usericon" />
                        </v-avatar>
                        <v-avatar class="ml-n2 avtar-border" size="28">
                            <img src="/images/profile/user-1.jpg" height="28" alt="usericon" />
                        </v-avatar>
                    </div>
                    <h6 class="text-h6 ml-2 mt-2 mt-sm-0">52,589+</h6>
                    <h6 class="text-h6 ml-2">developers & agencies using our templates</h6>
                </div>
                <h2 class="text-center mt-4 sectionTitle font-weight-bold">
                    Production Ready & Developer Friendly Vuetify Nuxtjs Admin Template
                </h2>
            </v-col>
        </v-row>
        <div class="mt-sm-16 mt-10">

            <div class="product-slider position-relative lp_wrapper">
                <div class="d-flex justify-center"><v-chip class="bg-primary text-white">Demos</v-chip></div>
                <v-row class="mt-3 row-up">
                    <template v-for="demo in productsSlider" :key="demo.img">
                        <v-col cols="12" md="4" sm="6" v-if="demo.type">
                            <v-sheet class="text-center position-relative">
                                <div class="overflow-hidden rounded-md">
                                    <div class="megamenu">
                                        <img :src="demo.img" :alt="demo.img" class="w-100 rounded-md" />
                                        <v-btn class="bg-primary text-white position-absolute prev-btn pr-3" flat
                                            target="_blank" :href="demo.link">Live Preview</v-btn>
                                    </div>
                                </div>  
                            </v-sheet>
                            <p class="text-body-1 text-center mt-1">{{ demo.name }}</p>
                        </v-col>
                    </template>
                </v-row>
                <div class="d-flex justify-center mt-sm-12 mt-6"><v-chip class="bg-primary text-white">Apps</v-chip></div>
                <v-row class="mt-3 row-up">
                    <template v-for="demo in productsSlider" :key="demo.img">
                        <v-col cols="12" md="4" sm="6" v-if="!demo.type">
                            <v-sheet class="text-center position-relative">
                                <div class="overflow-hidden rounded-md">
                                    <div class="megamenu">
                                        <img :src="demo.img" :alt="demo.img" class="w-100 rounded-md" />
                                        <v-btn class="bg-primary text-white position-absolute prev-btn pr-3" flat
                                            target="_blank" :href="demo.link">Live Preview</v-btn>
                                    </div>
                                </div>
                            </v-sheet>
                        <p class="text-body-1 text-center mt-1">{{ demo.name }}</p>
                    </v-col>
                </template>
            </v-row>
            </div>


            <!-- <div class="pt-8 product-slider position-relative lp_wrapper">
                <v-row class="mt-3 row-up">
                    <v-col  cols="12" v-for="demo in demosMegamenu" :key="demo.img" md="4" sm="6">
                        <v-sheet class="text-center position-relative">
                            <div class="overflow-hidden rounded-md">
                                <div class="megamenu">
                                    <img :src="demo.img" :alt="demo.img" class="w-100 rounded-md" />
                                    <v-btn
                                        class="bg-primary text-white position-absolute prev-btn pr-3"
                                        flat
                                        target="_blank"
                                        :href="demo.link"
                                        >Live Preview</v-btn
                                    >
                                </div>
                            </div>
                        </v-sheet>
                        <p class="text-body-1 text-center mt-1">{{ demo.name }}</p>
                    </v-col>
             
                    <v-col  cols="12" v-for="demo in appsMegamenu" :key="demo.img" md="4" sm="6">
                        <v-sheet class="text-center position-relative">
                            <div class="overflow-hidden rounded-md">
                                <div class="megamenu">
                                    <img :src="demo.img" :alt="demo.img" class="w-100 rounded-md" />
                                    <v-btn
                                        class="bg-primary text-white position-absolute prev-btn pr-3"
                                        flat
                                        target="_blank"
                                        :href="demo.link"
                                        >Live Preview</v-btn
                                    >
                                </div>
                            </div>
                        </v-sheet>
                        <p class="text-body-1 text-center mt-1">{{ demo.name }}</p>
                    </v-col>
                </v-row>
            </div> -->
        </div>
    </v-container>
</template>
