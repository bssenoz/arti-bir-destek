<script setup lang="ts">
import AdminHelpTable from '@/components/table/AdminHelpTable.vue';

import { getUserRoleFromToken } from '@/utils/role';

const role = ref('');

const getCurrentUserRoleFromToken = () => {
    const userRole = getUserRoleFromToken();
    if (userRole) {
        role.value = userRole;
    }
};

getCurrentUserRoleFromToken();

definePageMeta({
    middleware: ['auth'],
});
</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h5 text-primary">| Kullanım Kılavuzu</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <AdminHelpTable v-if="role == 'Admin'" />
            </v-col>
        </v-row>
    </v-container>
</template>
