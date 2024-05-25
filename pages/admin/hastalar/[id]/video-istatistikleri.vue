<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import user from '/images/profile/user.png';
import { useAdminStore } from '~/stores/admin';
import Chart from '@/components/video/Chart.vue';

import { useRoute } from 'vue-router';

const adminStore = useAdminStore();

const id = ref<string>('');

onMounted(() => {
    const { id: routeId } = useRoute().params;
    id.value = routeId;
    adminStore.getVideoIstatisticPatient(routeId);
});

definePageMeta({
    layout: "default",
    middleware: ['auth'],
});

const userVideoStatistic: any = computed(() => {
    return adminStore.videoStatistic;
});

</script>
<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h5 text-primary">| Video İstatistikleri</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="(i, index) in userVideoStatistic">
                <v-row>
                    <v-col class="d-flex align-center">
                        <div class="d-inline-block mr-2">
                            <template v-if="i.patientProfileImageUrl">
                                <v-img :src="i.patientProfileImageUrl" width="45px"
                                    class="rounded-circle img-fluid"></v-img>
                            </template>
                            <template v-else>
                                <v-img :src="user" width="45" />
                            </template>
                        </div>
                        <div class="d-inline-block">
                            <span>{{ i.patientName }} {{ i.patientSurname }}</span>
                        
                        </div>
                    </v-col>

                </v-row>
                <v-row>
                    <v-col v-for="(v, index) in i.videos" cols="12" sm="6" md="4">
                        <Chart :title="v.videoTitle" :clickNumber="v.videoStatistics[0].videoClicksNumber"
                            :watchPercentage="v.videoStatistics[0].videoViewingRate" image="none"
                            v-if="v.videoStatistics[0]" />
                        <Chart :title="v.videoTitle" :clickNumber="0" :watchPercentage="0"
                            v-if="v.videoStatistics == ''" image="none" />
                    </v-col>
                    <v-col v-if="i.videos == ''">
                        <div>Henüz sistemde izlenecek video bulunmamaktadır.</div>
                    </v-col>
                </v-row>

            </v-col>
        </v-row>
    </v-container>
</template>
