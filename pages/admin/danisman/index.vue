<script setup lang="ts">
import { ref, computed, onMounted  } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import DoctorTable from '@/components/table/DoctorTable.vue';

const userStore = useUserStore();
const store = useChatStore();

onMounted(() => {
    userStore.fetchUserDoctor()
    store.fetchChats();
});

const doctors: any = computed(() => {
    return userStore.doctors;
});
const page = ref({ title: 'Danışmanlar' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '#'
    },
    {
        text: 'Danışman',
        disabled: true,
        href: '#'
    }
]);

const headers = ref([
    { title: 'Danışman', align: 'start', key: 'name', sortable: false, },
    { title: 'E-posta', align: 'start', key: 'status' },
])
</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <DoctorTable />
        </v-card-text>
    </v-card>
    <!-- <v-row>
        <v-col cols="12">
            <v-data-table :headers="headers" :items="chatDetail" item-value="name" class="border rounded-md">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-subtitle-1">{{ item.columns.name }}</td>
                        <td class="text-subtitle-1">{{ item.columns.status }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
    </v-row> -->
</template>

