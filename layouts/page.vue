<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useCustomizerStore } from '@/stores/customizer';
import { pl, zhHans } from 'vuetify/locale'
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

    <!-----LTR LAYOUT------->
    <v-locale-provider>
        <v-app :theme="customizer.actTheme">  
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

<style lang="scss" scoped>
::v-deep(.horizontalMenu ) {
        margin-top: 0;
        margin-bottom: -0;
}
</style>