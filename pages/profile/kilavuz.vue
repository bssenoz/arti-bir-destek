<script setup lang="ts">
import DoctorHelpTable from '@/components/table/DoctorHelpTable.vue';
import PatientHelpTable from '@/components/table/PatientHelpTable.vue';
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
                <DoctorHelpTable v-if="role == 'Doctor'" />
                <PatientHelpTable v-if="role == 'Patient'" />
                <AdminHelpTable v-if="role == 'Admin'" />
            </v-col>
        </v-row>
    </v-container>
</template>
