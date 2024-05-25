<script setup lang="ts">
import Chart from '@/components/video/Chart.vue';
import { useVideoStore } from '@/stores/video';
import { useVideoStatisticStore } from '@/stores/videoStatistic';

const videoStore = useVideoStore();
const videoStatisticStore = useVideoStatisticStore();

onMounted(() => {
    videoStore.fetchVideos();
    videoStatisticStore.getCurrentUserVideoStatistics();
});

const videoStatistics: any = computed(() => {
    return videoStatisticStore.currentVideoStatistics;
});

definePageMeta({
    layout: "default",
    middleware: [
    'auth',
  ],
});
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="font-weight-bold text-h3 text-center color-pink-1 mt-2">Video İstatistikleri</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="(video, index) in videoStatistics" :key="index" cols="12" sm="6" md="4" class="h-100">
                <Chart :title="video.videoTitle" :clickNumber="video.videoStatistics[0].videoClicksNumber"
                    :watchPercentage="video.videoStatistics[0].videoViewingRate" image="none"
                    v-if="video.videoStatistics[0]" />
                <Chart :title="video.videoTitle" :clickNumber="0" :watchPercentage="0" v-if="video.videoStatistics == ''"
                    image="none" />
            </v-col>
        </v-row>
    </v-container>
</template>

