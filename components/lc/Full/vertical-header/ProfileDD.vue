<script setup lang="ts">
import { MailIcon } from "vue-tabler-icons";
import { profileDD } from "@/_mockApis/headerData";
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.getCurrentUser()
});

const currentUser = computed(() => {
  return userStore.currentUser;
});

const logout = async () => {
  await userStore.logout();
}
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- notifications DD -->
  <!-- ---------------------------------------------- -->
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
        <v-avatar size="35">
          <img :src="currentUser.profileImageUrl" width="35" v-if="currentUser.profileImageUrl" />
          <div class="rounded-circle" v-else style="width: 45px; height: 45px; background-color: #ccc;"></div>
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="360" elevation="10">
      <div class="px-8 pt-6">
        <h6 class="text-h5 font-weight-medium">Kullanıcı Profili</h6>
        <div class="d-flex align-center mt-4 pb-6">
          <v-avatar size="80">
            <img :src="currentUser.profileImageUrl" width="80" v-if="currentUser.profileImageUrl" />
            <div class="rounded-circle" v-else style="width: 80px; height: 80px; background-color: #ccc;"></div>
          </v-avatar>
          <div class="ml-3">
            <h6 class="text-h6 mb-n1">{{ currentUser.name }} {{ currentUser.surname }}</h6>
            <span class="text-subtitle-1 font-weight-regular textSecondary">{{ currentUser.title }}</span>
            <div class="d-flex align-center mt-1">
              <MailIcon size="18" stroke-width="1.5" />
              <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{ currentUser.email }}</span>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
      </div>
      <!-- height: calc(100vh - 240px); -->
      <perfect-scrollbar style="max-height: 240px">
        <v-list class="py-0 theme-list" lines="two">
          <v-list-item v-for="item in profileDD" :key="item.title" class="py-4 px-8 custom-text-primary"
            :to="item.href">
            <template v-slot:prepend>
              <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md">
                <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar" />
              </v-avatar>
            </template>
            <div>
              <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">
                {{ item.title }}
              </h6>
            </div>
            <p class="text-subtitle-1 font-weight-regular textSecondary">
              {{ item.subtitle }}
            </p>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>

      <div class="pt-4 pb-6 px-8 text-center">
        <v-btn color="primary" variant="outlined" block to="/auth/login" @click="logout">Çıkış</v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>
