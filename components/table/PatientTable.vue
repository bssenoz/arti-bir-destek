<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useRouter, useRoute } from 'vue-router';

const meetStore = useMeetStore();

const router = useRouter();
onMounted(() => {
    meetStore.fetchAllPatientsForDoctor();
});

const patients: any = computed(() => {
    return meetStore.allPatients;
});

const search = ref('');
const desserts = ref(patients);

const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.name.toLowerCase().includes(search.value.toLowerCase());
    });
});

const navigateToStatistic = (patientSlug: any) => {
    router.push(`/profile/hastalar/${patientSlug}/video-istatistikleri`);
};
const navigateToNots = (patientSlug: any) => {
    router.push(`/profile/hastalar/${patientSlug}/raporlar`);
};
const navigateToPast = (patientSlug: any) => {
    router.push(`/profile/hastalar/${patientSlug}/gecmis-randevular`);
};
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Hasta Ara" hide-details
                variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">#</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Hasta Bilgileri</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Telefon</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">İşlem</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in filteredList" :key="item.id">
                <td class="text-subtitle-1">{{ index + 1 }}</td>
                <td>
                    <div class="d-flex align-center py-4">
                        <div v-if="item.profileImageUrl">
                            <v-img :src="item.profileImageUrl" width="45px" class="rounded-circle img-fluid" ></v-img>
                        </div>
                        <div v-else>
                            <v-img :src="user" width="45"/>
                        </div>

                        <div class="ml-5">
                            <h4 class="text-h6 font-weight-semibold">{{ item.name }} {{ item.surname }}</h4>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.email }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1 text-no-wrap">{{ item.phoneNumber }}</td>
                <td class="text-subtitle-1 text-no-wrap"><v-btn @click="navigateToStatistic(item.userName)">Video İstatistikleri</v-btn> 
                    <v-btn @click="navigateToNots(item.userName)">Notlar</v-btn>
                    <v-btn @click="navigateToPast(item.userName)">Geçmiş Randevular</v-btn>
                </td>

            </tr>
        </tbody>
    </v-table>
</template>
