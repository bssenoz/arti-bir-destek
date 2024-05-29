<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { Menu2Icon } from 'vue-tabler-icons';
import { useUserStore } from '@/stores/user';
import { getUserRoleFromToken } from '@/utils/role';

const customizer = useCustomizerStore();
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

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
watch(priority, (newPriority) => {
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="10" :priority="priority" height="70">
    <div :class="customizer.boxed
      ? 'maxWidth v-toolbar__content'
      : 'v-toolbar__content px-6'
      ">
      <NuxtLink to="/" class="text-decoration-none" v-if="!isAdmin">
        <div class="hidden-md-and-down mr-3 font-mansalva font-weight-bold color-pink-1 text-h4 align-center d-lg-flex" href="/">
          <img src="/images/backgrounds/adimlar.jpg" style="width: 50px" />
          <span class="font-mansalva color-pink-1 font-weight-bold text-h4">
            Artı Bir Destek</span>
        </div>
      </NuxtLink>

      <v-btn class="hidden-lg-and-up ms-3" icon rounded="sm" variant="flat" @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small">
        <Menu2Icon size="20" stroke-width="1.5" />
      </v-btn>

      <div class="hidden-md-and-down" style="margin-left: 10rem">
        <LcFullVerticalHeaderNavigations />
      </div>

      <v-spacer />

      <!-- ---------------------------------------------- -->
      <!-- Notification -->
      <!-- ---------------------------------------------- -->
      <!-- 
      <LcFullVerticalHeaderNotificationDD /> -->

      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <div class="ml-3 mr-sm-0 mr-3">
        <LcFullVerticalHeaderProfileDD :isAdmin="isAdmin" :currentUser="user" />
      </div>
    </div>
  </v-app-bar>
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <LcFullVerticalHeaderRightMobileSidebar />
  </v-navigation-drawer>
</template>
