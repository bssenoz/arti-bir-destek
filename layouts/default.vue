<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useCustomizerStore } from '@/stores/customizer';
import { pl, zhHans } from 'vuetify/locale'
import { UserRole } from '@/stores/user';
import { useUserStore } from '@/stores/user';

const customizer = useCustomizerStore();
const title = ref("Artı Bir Destek");

const userStore = useUserStore();

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
                <v-container fluid class="page-wrapper">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
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
            <LcFullVerticalSidebar v-if="userStore.userRole == 'Admin'" />
            <LcFullVerticalHeader v-if="!customizer.setHorizontalLayout" />
            <LcFullHorizontalHeader v-if="customizer.setHorizontalLayout" />
            <LcFullHorizontalSidebar v-if="customizer.setHorizontalLayout" />
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
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
