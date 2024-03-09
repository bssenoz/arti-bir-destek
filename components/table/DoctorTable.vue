<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Danışman Ara" hide-details variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">#</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Danışman Bilgileri</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Telefon</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Ünvan</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">İşlem</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in filteredList" :key="item.id">
                <td class="text-subtitle-1">{{ index + 1 }}</td>
                <td>
                    <div class="d-flex align-center py-4">
                        <div>
                            <h4 class="text-h6 font-weight-semibold">{{ item.name }} {{ item.surname }}</h4>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.email }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1 text-no-wrap">{{ item.phoneNumber }}</td>
                <td>
                    <v-chip :color="item.rolestatus" size="small" label>{{ item.title }}</v-chip>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Danışmanı Sil">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props"
                                    ><TrashIcon stroke-width="1.5" size="20" class="text-error"
                                /></v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

import contact from '@/_mockApis/apps/contact';
const userStore = useUserStore();

onMounted(() => {
    userStore.fetchUserDoctor();
});

const doctors: any = computed(() => {
    return userStore.doctors;
});

const search = ref('');
const desserts = ref(doctors);

const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.name.toLowerCase().includes(search.value.toLowerCase());
    });
});

function deleteItem(item: any) {
    console.log("iteee: ",item)
    // const index = desserts.value.indexOf(item);
    // confirm('Are you sure you want to delete this item?') && desserts.value.splice(index, 1);
    userStore.deleteUser(item.id)
}

</script>
