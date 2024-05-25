<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAdminStore } from '@/stores/admin';

import user from '/images/profile/user.png';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const adminStore = useAdminStore();

const router = useRouter();

onMounted(() => {
    adminStore.fetchUnConfirmedDoctor();
});

const doctors: any = computed(() => {
    return adminStore.allUnConfirmed;
});

const search = ref('');
const desserts = ref(doctors);

const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.name.toLowerCase().includes(search.value.toLowerCase());
    });
});

const deleteItem = async (item: any) => {
    console.log("iteee: ", item);
    const result = await Swal.fire({
        icon: 'question',
        title: 'Silme',
        text: 'Bu danışmanı silmek istediğinizden emin misiniz?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, sil',
        cancelButtonText: 'İptal',
    });

    if (result.isConfirmed) {
        try {
            await adminStore.deleteUser(item.id);
            Swal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Danışman başarıyla silindi.',
            });
        } catch (error) {
            console.error('Error occurred while deleting user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Danışman silinirken bir hata oluştu.',
            });
        }
    }
};

const confirmDoctor = async (doctor: any) => {
    const result = await Swal.fire({
        icon: 'question',
        title: 'Onaylama',
        text: 'Bu danışmanı onaylamak istediğinizden emin misiniz?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, onayla',
        cancelButtonText: 'İptal',
    });

    if (result.isConfirmed) {
        try {
            await adminStore.confirmDoctor(doctor.userName);
            Swal.fire({
                icon: 'success',
                title: 'Başarılı',
                text: 'Danışman başarıyla onaylandı.',
            });
        } catch (error) {
            console.error('Error occurred while confirming doctor:', error);
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Danışman onaylanırken bir hata oluştu.',
            });
        }
    }
};
</script>

<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Danışman Ara" hide-details
                variant="outlined"></v-text-field>
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
                        <div v-if="item.profileImageUrl">
                            <v-img :src="item.profileImageUrl" width="45px" class="rounded-circle img-fluid"></v-img>
                        </div>
                        <div v-else>
                            <v-img :src="user" width="45" />
                        </div>
                        <div class="ml-5">
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
                        <v-tooltip text="Onayla">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat v-bind="props" class="ml-2" @click="confirmDoctor(item)"> <v-icon
                                        color="primary">mdi-check-circle</v-icon></v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Sil">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props" class="ml-2">
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
