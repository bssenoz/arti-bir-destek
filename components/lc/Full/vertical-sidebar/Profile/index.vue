<script setup lang="ts">
import { PowerIcon } from "vue-tabler-icons";
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const logout = async () => {
  await userStore.logout();
}
</script>

<template>
  <v-sheet rounded="md" color="lightsecondary" class="px-4 py-3 ExtraBox">
    <div class="d-flex align-center hide-menu">
      <v-avatar size="40">
        <img src="/images/profile/admin.png" alt="user" height="30" />
      </v-avatar>
      <div class="ml-4">
        <h4 class="mb-n1 text-h6 textPrimary">ADMİN</h4>
      </div>
      <div class="ml-auto">
        <v-btn
          variant="text"
          icon
          rounded="md"
          color="primary"
          to="/giris-yap"
        >
          <PowerIcon />
          <v-tooltip activator="parent" location="top" @click="logout">Logout</v-tooltip>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>
<style lang="scss">
.ExtraBox {
  position: relative;
  overflow: hidden;
}
.line-height-none {
  line-height: normal;
}
</style>
