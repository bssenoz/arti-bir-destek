<script setup lang="ts">
import { ref } from 'vue';
import { UserCircleIcon,BellIcon,ArticleIcon,LockIcon } from 'vue-tabler-icons';
import AccountTab from '@/components/pages/account-settings/AccountTab.vue';
import NotificationTab from '@/components/pages/account-settings/NotificationTab.vue';
import SecurityTab from '@/components/pages/account-settings/SecurityTab.vue';

const tab = ref(null);
</script>

<template>
    <v-row class="justify-center">
        <!--Account Settings tabs-->
        <v-col cols="12" md="12">
            <v-card elevation="10" class=" " rounded="md">
                <v-tabs v-model="tab" bg-color="transparent" min-height="70" height="70" color="primary">
                    <v-tab value="Account" class="text-medium-emphasis" ><UserCircleIcon class="mr-2" size="20"/> Hesap</v-tab>
                    <v-tab value="Notification"  class="text-medium-emphasis"><BellIcon class="mr-2" size="20"/>Bildirim</v-tab>
                    <v-tab value="Security"  class="text-medium-emphasis"><LockIcon class="mr-2" size="20"/>Güvenlik</v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-card-text class="pa-sm-6 pa-3 pb-sm-6 pb-6">
                    <v-window v-model="tab">
                        <v-window-item value="Account">
                            <AccountTab/>
                        </v-window-item>
                        <v-window-item value="Notification">
                            <NotificationTab/>
                        </v-window-item>
                        <v-window-item value="Security">
                            <SecurityTab/>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>
