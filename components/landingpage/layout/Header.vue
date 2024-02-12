<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
/*import tabler icons*/
import { Menu2Icon } from 'vue-tabler-icons';
const customizer = useCustomizerStore();
const appsdrawer = ref(false);
</script>
<template>
    <div>
        <div>
            <!-- -----------------------------------------------
            Start Header
            ----------------------------------------------- -->
            <v-app-bar height="80" class="lp-header" flat>
                <v-container class="maxWidth py-sm-4 py-0">
                    <v-toolbar class="d-flex align-center">
                        <!-- Logo -->
                        <span>Artı Bir Destek</span>
                
                        <!-- Desktop view Navigation -->
                        <div class="navigation ml-auto d-lg-flex d-none">
                            <LandingpageLayoutNavigation />
                        </div>
                        <v-btn variant="text" class="hidden-lg-and-up ml-auto" icon @click.stop="appsdrawer = !appsdrawer">
                            <Menu2Icon size="22" stroke-width="1.5" />
                        </v-btn>
                    </v-toolbar>
                </v-container>
            </v-app-bar>
            <!-- -----------------------------------------------
            End Header
            ----------------------------------------------- -->
        </div>

        <!----sidebar menu drawer start----->
        <v-navigation-drawer class="lp-drawer" v-model="appsdrawer" location="left" temporary>
            <LandingpageLayoutMobileSidebar />
        </v-navigation-drawer>
    </div>
</template>
