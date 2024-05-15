<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useRoute } from 'vue-router';

const meetStore = useMeetStore();

const id = ref<string>('');

onMounted(() => {
    const { id: routeId } = useRoute().params;
    id.value = routeId;
    meetStore.getUserReport(routeId);
});

const report: any = computed(() => {
    return meetStore.userReport;
});

const getUser: any = computed(() => {
    return meetStore.getUser;
});

const search = ref('');
const filteredList = computed(() => {
    console.log("s: ", search.value);
    if (!search.value) return report.value;

    return report.value.map((item: any) => {
        const filteredStatistics = item.appointmentStatistics.filter((statistic: any) => {
            return statistic.appointmentDay.includes(search.value);
        });

        if (filteredStatistics.length) {
            return { ...item, appointmentStatistics: filteredStatistics };
        } else {
            return null;
        }
    }).filter((item: null) => item !== null);
});


const selectedStatistic = ref(null);
const select = (data: any) => {
    selectedStatistic.value = data;
};

</script>

<template>
    <v-container>
        <v-row>
            <v-col v-for="(item, index) in filteredList" :key="index" v-if="filteredList">
                <v-row>
                    <v-col class="d-flex align-center">
                        <div class="d-inline-block mr-2">
                            <template v-if="item.patientProfileImageUrl">
                                <v-img :src="item.patientProfileImageUrl" width="45px" class="rounded-circle img-fluid"></v-img>
                            </template>
                            <template v-else>
                                <v-img :src="user" width="45" />
                            </template>
                        </div>
                        <div class="d-inline-block">
                            <span>{{ item.patientName }} {{ item.patientSurname }}</span>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-row class="d-flex justify-start">
                            <v-col cols="12" lg="4" md="6">
                                <v-text-field density="compact" v-model="search" label="Tarihe Göre Rapor Ara" hide-details variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-col cols="12" v-for="(statistic, index) in item.appointmentStatistics" :key="index">
                                    <v-card elevation="2" @click="select(statistic)" :class="{ 'active': selectedStatistic === statistic }">
                                        <v-card-title>{{ statistic.appointmentDay }} | {{ statistic.appointmentStartTime }} - {{ statistic.appointmentEndTime }}</v-card-title>
                                        <v-card-text>{{ statistic.appointmentComment.slice(0, 100) }}</v-card-text>
                                    </v-card>
                                </v-col>
                            </v-col>
                            <v-col cols="8" v-if="selectedStatistic">
                                <div class="text-h5">Tarih: {{ selectedStatistic.appointmentDay }}</div>
                                <div class="text-h5">Zaman: {{ selectedStatistic.appointmentStartTime }} - {{ selectedStatistic.appointmentEndTime }}</div>
                                <p class="mt-4">{{ selectedStatistic.appointmentComment }}</p>
                            </v-col>
                            <v-col cols="8" v-else>
                                <div class="text-h5">Tarih: {{ item.appointmentStatistics[0].appointmentDay }}</div>
                                <div class="text-h5">Zaman: {{ item.appointmentStatistics[0].appointmentStartTime }} - {{ item.appointmentStatistics[0].appointmentEndTime }}</div>
                                <p class="mt-4">{{ item.appointmentStatistics[0].appointmentComment }}</p>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
            <v-col v-else>
                <v-row v-if="getUser">
                    <v-col class="d-flex align-center">
                        <div class="d-inline-block mr-2">
                            <template v-if="getUser.profileImageUrl">
                                <v-img :src="getUser.profileImageUrl" width="45px" class="rounded-circle img-fluid"></v-img>
                            </template>
                            <template v-else>
                                <v-img :src="user" width="45" />
                            </template>
                        </div>
                        <div class="d-inline-block">
                            <span>{{ getUser.name }} {{ getUser.surname }}</span>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.active {
    background-color: #fbcfe8;
}
</style>
