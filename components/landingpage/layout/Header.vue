<script setup lang="ts">
import { ref, watch } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import { useUserStore } from '@/stores/user';

import { Menu2Icon } from "vue-tabler-icons";
const customizer = useCustomizerStore();
const appsdrawer = ref(false);

const userStore = useUserStore();
const isAdmin = ref(false);

onMounted(() => {
  userStore.getCurrentUser()
  const role = getUserRoleFromToken();
  if (role === 'Admin') {
    isAdmin.value = true;
  }
});

const user = computed(() => {
  return userStore.currentUser;
});
</script>
<template>
  <div>
    <div>
      <!-- -----------------------------------------------
            Start Header
            ----------------------------------------------- -->
            <v-app-bar height="80" class="lp-header" flat>
  <v-container class="maxWidth py-sm-4 py-0">
    <v-toolbar class="d-flex align-center">
      <!-- Logo -->
      <img src="/images/backgrounds/adimlar.jpg" style="width: 50px" />
      <span class="font-mansalva color-pink-1 font-weight-bold text-h4" href="/">
        Artı Bir Destek
      </span>

      <!-- Desktop view Navigation -->
      <div class="navigation ml-auto d-lg-flex d-none">
        <LandingpageLayoutNavigation />
      </div>

      <!-- Profile -->
      <v-spacer></v-spacer>
      <span class="font-mansalva color-pink-1 font-weight-bold text-h4" v-if="user.id">
            <LcFullVerticalHeaderProfileDD :isAdmin="isAdmin" :currentUser="user"/>
      </span>

      <v-btn
        variant="text"
        class="hidden-lg-and-up ml-auto"
        icon
        @click.stop="appsdrawer = !appsdrawer"
      >
        <Menu2Icon size="22" stroke-width="1.5" />
      </v-btn>
    </v-toolbar>
  </v-container>
</v-app-bar>

      <!-- -----------------------------------------------
            End Header
            ----------------------------------------------- -->
            
    </div>

    <!----sidebar menu drawer start----->
    <v-navigation-drawer
      class="lp-drawer"
      v-model="appsdrawer"
      location="left"
      temporary
    >
      <LandingpageLayoutMobileSidebar />
    </v-navigation-drawer>
  </div>
</template>
