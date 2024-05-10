<template>
        <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        <v-row>
            <v-col v-for="(video, index) in videoStatistics" :key="index" cols="12" sm="6" md="4">
                <v-card class="px-6 py-6 elevation-4 h-100">
                    <p class="text-h4"><strong>{{ video.videoTitle }}</strong></p>

                    <p class="text-h5 my-2">Toplam İzlenme: {{ getTotalClicks(video.videoStatistics) }}</p>
                    <v-dialog max-width="900">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn v-bind="activatorProps" color="surface-variant" class="float-right"
                                v-if="video.videoStatistics != ''" text="Kullanıcılar" variant="flat"></v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                            <v-card title="İzleyen Kullanıcılar">
                                <v-card-text>
                                    <v-row>
                                        <v-col v-for="(istatistic, index) in video.videoStatistics" cols="12" sm="4">
                                            <Chart :title="`${istatistic.patientName} ${istatistic.patientSurname}`"  :clickNumber="istatistic.videoClicksNumber" :watchPercentage="istatistic.videoViewingRate" :image="istatistic.patientProfileImageUrl"  v-if="istatistic.patientProfileImageUrl" class="my-4"/>
                                            <Chart :title="`${istatistic.patientName} ${istatistic.patientSurname}`"  :clickNumber="istatistic.videoClicksNumber" :watchPercentage="istatistic.videoViewingRate" :image="user" v-else class="my-4"/>
                                        </v-col>

                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn text="Kapat" @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-card>
            </v-col>
        </v-row>
</template>

<script setup lang="ts">
import { useVideoStore } from '@/stores/video';
import { useVideoStatisticStore } from '@/stores/videoStatistic';
import user from '/images/profile/user.png';
import Chart from '@/components/video/Chart.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const videoStore = useVideoStore();
const videoStatisticStore = useVideoStatisticStore();
const page = ref({ title: 'Videolar' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '#'
    },
    {
        text: 'Video İstatistikleri',
        disabled: true,
        href: '#'
    }
]);
onMounted(() => {
    videoStore.fetchVideos();
    videoStatisticStore.getVideoStatistics();
});

const videos: any = computed(() => {
    return videoStore.videos;
});
const videoStatistics: any = computed(() => {
    return videoStatisticStore.videoStatistics;
});

definePageMeta({
    layout: "default",
    middleware: [
        function (to, from) {
            // Custom inline middleware
        },
        'auth',
    ],
});

const getTotalClicks = (videoStatistics: any[]) => {
    return videoStatistics.reduce((total, stat) => total + stat.videoClicksNumber, 0);
};

const videoData = [
    { title: "Video 1", description: "Description 1", watchPercentage: 60 },
    { title: "Video 2", description: "Description 2", watchPercentage: 25 },
    { title: "Video 3", description: "Description 3", watchPercentage: 80 },
    { title: "Video 4", description: "Description 4", watchPercentage: 100 }
];
</script>