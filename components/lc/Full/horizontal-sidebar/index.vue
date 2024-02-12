<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useDisplay } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';
import HorizontalItems from './horizontalItems';
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(HorizontalItems);
const { mdAndUp } = useDisplay();
</script>

<template>
    <template v-if="mdAndUp">
        <div class="horizontalMenu  border-bottom">
            <div :class="customizer.boxed ? 'maxWidth' : 'px-6'">
                <ul class="gap-1 horizontal-navbar px-0">
                    <!---Menu Loop -->
                    <li v-for="(item, i) in sidebarMenu" :key="i" class="navItem">
                        <!---If Has Child -->
                        <LcFullHorizontalSidebarNavCollapse :item="item" :level="0" v-if="item.children" />
                        <!---Single Item-->
                        <LcFullHorizontalSidebarNavItem :item="item" v-else />
                        <!---End Single Item-->
                    </li>
                </ul>
            </div>    
        </div>
    </template>
    <div v-else class="mobile-menu">
        <LcFullVerticalSidebar />
    </div>
</template>
<style lang="scss"></style>
