<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import  { horizontalItemsAdmin, horizontalItemsDoctor, horizontalItemsPatient } from '../horizontal-sidebar/horizontalItems';
import { getUserRoleFromToken } from '@/utils/role';

const customizer = useCustomizerStore();

const role = ref('');

const getCurrentUserRoleFromToken = () => {
    const userRole = getUserRoleFromToken();
    if (userRole) {
        role.value = userRole;
    }
};

const getMenuItems = () => {
    switch (role.value) {
        case 'Admin':
            return horizontalItemsAdmin;
        case 'Doctor':
            return horizontalItemsDoctor;
        case 'Patient':
            return horizontalItemsPatient;
        default:
            return [];
    }
};
getCurrentUserRoleFromToken();

</script>

<template>
    <v-navigation-drawer left v-model="customizer.Sidebar_drawer" elevation="0" rail-width="75" mobile-breakpoint="960"
        app class="leftSidebar" :rail="customizer.mini_sidebar" expand-on-hover width="270">
        <!---Logo part -->
        <v-locale-provider>
            <Nuxt to="/">
                <div class="pt-7 font-mansalva font-weight-bold color-pink-1 text-h4 text-center d-flex justify-center align-center">
                    <img src="/images/backgrounds/adimlar.jpg" style="width: 50px" />
            <span class="font-mansalva color-pink-1 font-weight-bold text-h4">
              Artı Bir Destek</span
            >
                </div>
            </Nuxt>
        </v-locale-provider>

        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <v-list class="pa-6" density="compact">
                <!---Menu Loop -->
                <template v-for="(item, i) in getMenuItems()">
                    <!---Item Sub Header -->
                    <LcFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />
                    <!---If Has Child -->
                    <LcFullVerticalSidebarNavCollapse class="leftPadding" :item="item" :level="0"
                        v-else-if="item.children" />
                    <!---Single Item-->
                    <LcFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                    <!---End Single Item-->
                </template>
            </v-list>
            <div class="pa-6 userbottom" v-if="role == 'Admin'">
                <LcFullVerticalSidebarProfile />
            </div>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>

<script>

</script>
