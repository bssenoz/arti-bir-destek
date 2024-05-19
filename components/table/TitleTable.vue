<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAdminStore } from '@/stores/admin';
import { TrashIcon } from 'vue-tabler-icons';

const adminStore = useAdminStore();

onMounted(() => {
    adminStore.fetchTitle();
});

const allTitle = computed(() => {
    return adminStore.allTitle;
});

const search = ref('');

const filteredTitle = computed(() => {
    if (!search.value) {
        return allTitle.value;
    }
    const keyword = search.value.toLowerCase();
    return allTitle.value.filter(item => item.title.toLowerCase().includes(keyword));
});

const deleteTitle = async(item: any) => {
    console.log("iteee: ", item);
    await adminStore.deleteTitle(item.id);
};

const showDialog = ref(false);

const newTitle = ref('');

const openDialog = () => {
    showDialog.value = true;
};

const closeDialog = () => {
    showDialog.value = false;
};

const addTitle = async() => {
    await adminStore.addTitle({ title: newTitle.value });
    closeDialog();
};
</script>

<template>
    <v-row>
        <v-col>
            <v-btn color="primary" class="float-right" @click="openDialog">Ünvan Ekle</v-btn>
        </v-col>
    </v-row>
    <!-- Dialog -->
    <v-dialog v-model="showDialog" max-width="500px">
        <template #activator="{ on }">
            <v-row>
                <v-col cols="12" lg="4" md="6">
                    <v-text-field density="compact" v-model="search" label="Ünvan Ara" hide-details
                        variant="outlined"></v-text-field>
                </v-col>
            </v-row>
        </template>
        <v-card>
            <v-card-title>Yeni Ünvan Ekle</v-card-title>
            <v-card-text>
                <v-text-field v-model="newTitle" label="Yeni Ünvan" outlined></v-text-field>
            </v-card-text>
            <v-card-actions >
                <v-btn color="primary" @click="addTitle">Ekle</v-btn>
                <v-btn @click="closeDialog">İptal</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Unvanlar Tablosu -->
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">#</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Ünvan</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">İşlem</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in filteredTitle" :key="item.id">
                <td class="text-subtitle-1">{{ item.id }}</td>
                <td>
                    <v-chip :color="item.rolestatus" size="small" label>{{ item.title }}</v-chip>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Ünvanı Sil">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteTitle(item)" v-bind="props" class="ml-2">
                                    <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
