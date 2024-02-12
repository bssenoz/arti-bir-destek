<script setup lang="ts">
import { PowerIcon } from "vue-tabler-icons";
</script>

<template>
  <v-sheet rounded="md" color="lightsecondary" class="px-4 py-3 ExtraBox">
    <div class="d-flex align-center hide-menu">
      <v-avatar size="40">
        <img src="/images/profile/user-1.jpg" alt="user" height="40" />
      </v-avatar>
      <div class="ml-4">
        <h4 class="mb-n1 text-h6 textPrimary">Mathew</h4>
        <span class="text-subtitle-2 textSecondary">Designer</span>
      </div>
      <div class="ml-auto">
        <v-btn
          variant="text"
          icon
          rounded="md"
          color="primary"
          to="/auth/login"
        >
          <PowerIcon />
          <v-tooltip activator="parent" location="top">Logout</v-tooltip>
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
