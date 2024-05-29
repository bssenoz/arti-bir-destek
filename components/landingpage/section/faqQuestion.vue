<script setup lang="ts">
import { faqPage } from "@/_mockApis/components/pages/faqData";
import img1 from "/images/profile/user-10.jpg";
import img2 from "/images/profile/user-9.jpg";
import img3 from "/images/profile/user-6.jpg";
</script>
<template>
  <v-container class="mt-16 py-16">
    <v-row class="justify-center pt-16 pt-md-0">
      <v-col cols="12" md="8">
        <div class="text-center mb-8">
          <h3 class="text-h3">Sık Sorulan Sorular</h3>
        </div>
        <v-expansion-panels elevation="10">
          <v-expansion-panel
            elevation="10"
            v-for="item in faqPage"
            :key="item.question"
          >
            <v-expansion-panel-title class="text-h6 py-6">{{
              item.question
            }}</v-expansion-panel-title>
            <v-divider></v-divider>
            <v-expansion-panel-text
              class="text-h6 text-10 text-medium-emphasis pt-3 pb-2"
            >
              {{ item.answer }}
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>
