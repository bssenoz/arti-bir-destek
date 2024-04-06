<script setup lang="ts">
import { ref, watch } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import { GridDotsIcon, SearchIcon, Menu2Icon } from "vue-tabler-icons";
const customizer = useCustomizerStore();
const showSearch = ref(false);
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);
function searchbox() {
  showSearch.value = !showSearch.value;
}
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
      <NuxtLink to="/" class="text-decoration-none">
        <div class="hidden-md-and-down mr-3 font-mansalva font-weight-bold color-pink-1">
          Artı Bir Destek
        </div>
      </NuxtLink>

      <v-btn class="hidden-lg-and-up ms-3" icon rounded="sm" variant="flat" @click.stop="customizer.SET_SIDEBAR_DRAWER"
        size="small">
        <Menu2Icon size="20" stroke-width="1.5" />
      </v-btn>

      <!-- ------------------------------------------------>
      <!-- Mega menu -->
      <!-- ------------------------------------------------>
      <div class="hidden-md-and-down" style="margin-left: 14rem">
        <LcFullVerticalHeaderNavigations />
      </div>

      <v-spacer />

      <!-- ---------------------------------------------- -->
      <!-- Notification -->
      <!-- ---------------------------------------------- -->

      <LcFullVerticalHeaderNotificationDD />

      <!-- ---------------------------------------------- -->
      <!-- User Profile -->
      <!-- ---------------------------------------------- -->
      <div class="ml-3 mr-sm-0 mr-3">
        <LcFullVerticalHeaderProfileDD />
      </div>
    </div>
  </v-app-bar>
  <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
    <LcFullVerticalHeaderRightMobileSidebar />
  </v-navigation-drawer>
</template>
