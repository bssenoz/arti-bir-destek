<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useCustomizerStore } from '@/stores/customizer';
const customizer = useCustomizerStore();
const title = ref("Artı Bir Destek");
useHead({
    meta: [{ content: title }],
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk}`
            : "Artı Bir Destek";
    },
});
</script>

<template>
    <!-----RTL LAYOUT------->
    <v-locale-provider v-if="customizer.setRTLLayout" rtl>
        <v-app :theme="customizer.actTheme" :class="[
            customizer.actTheme,
            customizer.mini_sidebar ? 'mini-sidebar' : '',
            customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
            customizer.setBorderCard ? 'cardBordered' : ''
        ]">

            <!---Customizer location left side--->
            <v-navigation-drawer app temporary elevation="10" location="left" v-model="customizer.Customizer_drawer"
                width="320" class="left-customizer">
                <LcFullCustomizer />
            </v-navigation-drawer>
            <LcFullVerticalSidebar v-if="!customizer.setHorizontalLayout" />
            <LcFullVerticalHeader v-if="!customizer.setHorizontalLayout" />
            <LcFullHorizontalHeader v-if="customizer.setHorizontalLayout" />
            <LcFullHorizontalSidebar v-if="customizer.setHorizontalLayout" />
            <v-main>
                <v-container fluid class="">
                    <div :class="customizer.boxed ? 'fullContainer' : ''">
                        <RouterView />
                        <!-- <v-btn class="customizer-btn" size="large" icon variant="flat" color="primary"
                            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)">
                            <SettingsIcon />
                        </v-btn> -->
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>

    <!-----LTR LAYOUT------->
    <v-locale-provider v-else>
        <v-app :theme="customizer.actTheme" :class="[
            customizer.actTheme,
            customizer.mini_sidebar ? 'mini-sidebar' : '',
            customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
            customizer.setBorderCard ? 'cardBordered' : ''
        ]">

            <!---Customizer location right side--->
            <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer"
                width="320">
                <LcFullCustomizer />
            </v-navigation-drawer>
            <LcFullVerticalSidebar v-if="!customizer.setHorizontalLayout" />
            <LcFullVerticalHeader v-if="!customizer.setHorizontalLayout" />
            <LcFullHorizontalHeader v-if="customizer.setHorizontalLayout" />
            <LcFullHorizontalSidebar v-if="customizer.setHorizontalLayout" />
            <v-main>
                <v-container fluid class="">
                    <div :class="customizer.boxed ? 'fullContainer' : ''">
                        <RouterView />
                        <!-- <v-btn class="customizer-btn" size="large" icon variant="flat" color="primary"
                            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)">
                            <SettingsIcon />
                        </v-btn> -->
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

<style scoped>
.v-container {
    padding: 0;
}
</style>
