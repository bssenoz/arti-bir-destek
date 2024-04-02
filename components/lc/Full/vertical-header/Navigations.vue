<script setup>
import { ref } from "vue";
import { HelpIcon, ChevronDownIcon } from "vue-tabler-icons";
import { quickLink } from "@/_mockApis/headerData";
</script>

<template>
  <v-menu open-on-hover :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn
        class="hidden-sm-and-down custom-hover-primary"
        rounded="sm"
        variant="text"
        color="primary"
        v-bind="props"
      >
        Randevu <ChevronDownIcon size="18" class="mt-1 ml-1" />
      </v-btn>
    </template>
    <v-sheet
      width="300"
      height="200"
      elevation="10"
      rounded="md"
      class="pa-4 pb-0"
    >
      <div>
        <v-row>
          <v-col cols="12" lg="4" class="py-0">
            <div class="pa-4">
              <h5 class="text-h5 mb-4">Randevu</h5>
              <div v-for="(item, i) in quickLink" :key="i" class="py-2">
                <NuxtLink
                  :to="item.href"
                  class="text-decoration-none text-hover-primary font-weight-semibold text-subtitle-1"
                  >{{ item.title }}</NuxtLink
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-sheet>
  </v-menu>
  <NuxtLink to="/" class="text-decoration-none">
    <v-btn variant="text" color="primary">Anasayfa </v-btn>
  </NuxtLink>
  <NuxtLink to="/profile" class="text-decoration-none">
    <v-btn variant="text" color="primary">Profil </v-btn>
  </NuxtLink>
  <NuxtLink to="/admin" class="text-decoration-none">
    <v-btn variant="text" color="primary">Admin </v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/randevu/randevu-al" class="text-decoration-none">
    <v-btn variant="text" color="primary">Randevu </v-btn>
  </NuxtLink>
  <NuxtLink to="/admin" class="text-decoration-none">
    <v-btn variant="text" color="primary">Admin </v-btn>
  </NuxtLink>
  <NuxtLink to="/admin" class="text-decoration-none">
    <v-btn variant="text" color="primary">Admin </v-btn>
  </NuxtLink>
</template>
