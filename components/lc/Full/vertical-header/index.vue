<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import { useUserStore } from '@/stores/user';
import { GridDotsIcon, Menu2Icon } from 'vue-tabler-icons';
const customizer = useCustomizerStore();
const appsdrawer = ref(false);
const priority = ref(customizer.setHorizontalLayout ? 0 : 0);

const userStore = useUserStore();

watch(priority, (newPriority) => {
    priority.value = newPriority;
});
onMounted(() => {
  userStore.getCurrentUser()
});

</script>

<template>
    <v-app-bar elevation="0" :priority="priority" height="70" class="">
        <v-btn class="hidden-md-and-down custom-hover-primary" icon color="primary" variant="text"
            @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)">
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>
        <v-btn class="hidden-lg-and-up ms-3" icon variant="flat" @click.stop="customizer.SET_SIDEBAR_DRAWER"
            size="small">
            <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>

        <v-sheet class="">
            <LcFullVerticalHeaderSearchbar />
        </v-sheet>

        <div class="hidden-md-and-down">
            <LcFullVerticalHeaderNavigations />
        </div>
        <v-spacer />

        <!-- right sidebar -->
        <v-btn variant="text" color="primary" class="hidden-lg-and-up custom-hover-primary ml-3" icon
            @click.stop="appsdrawer = !appsdrawer">
            <GridDotsIcon size="17" stroke-width="1.5" />
        </v-btn>

        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <div class="ml-3">

            <LcFullVerticalHeaderProfileDD />
        </div>
    </v-app-bar>


    <!-- ---------------------------------------------- -->
    <!-- Right Sidebar -->
    <!-- ---------------------------------------------- -->
    <v-navigation-drawer v-model="appsdrawer" location="right" temporary>
        <LcFullVerticalHeaderRightMobileSidebar />
    </v-navigation-drawer>
</template>
