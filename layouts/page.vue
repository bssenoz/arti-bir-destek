<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useCustomizerStore } from '@/stores/customizer';
import { pl, zhHans } from 'vuetify/locale'
const customizer = useCustomizerStore();
const title = ref("Modernize - Nuxt3 Typescript based Admin Dashboard Template");
useHead({
    meta: [{ content: title }],
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} - Nuxt3 Typescript based Admin Dashboard Template`
            : "Modernize - Nuxt3 Typescript based Admin Dashboard Template";
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
        ]">AAAAAAAAA

            <!---Customizer location left side--->
            <v-navigation-drawer app temporary elevation="10" location="left" v-model="customizer.Customizer_drawer"
                width="320" class="left-customizer">
                <LcFullCustomizer />CBCBC
            </v-navigation-drawer>
            <LcFullVerticalSidebar v-if="!customizer.setHorizontalLayout" />
            <LcFullVerticalHeader v-if="!customizer.setHorizontalLayout" />
            <LcFullHorizontalHeader v-if="customizer.setHorizontalLayout" />
            <LcFullHorizontalSidebar v-if="customizer.setHorizontalLayout" />
            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <v-btn class="customizer-btn" size="large" icon variant="flat" color="primary"
                            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)">
                            <SettingsIcon />
                        </v-btn>
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
        ]">BBBBB

            <!---Customizer location right side--->
            <v-navigation-drawer app temporary elevation="10" location="right" v-model="customizer.Customizer_drawer"
                width="320">
                <LcFullCustomizer />ABBABA
            </v-navigation-drawer>
            <LcFullVerticalSidebar v-if="!customizer.setHorizontalLayout" />
            <LcFullVerticalHeader v-if="!customizer.setHorizontalLayout" />
            <LcFullHorizontalHeader v-if="customizer.setHorizontalLayout" />
            <LcFullHorizontalSidebar v-if="customizer.setHorizontalLayout" />
            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div :class="customizer.boxed ? 'maxWidth' : ''">
                        <RouterView />
                        <v-btn class="customizer-btn" size="large" icon variant="flat" color="primary"
                            @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.Customizer_drawer)">
                            <SettingsIcon />
                        </v-btn>
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
