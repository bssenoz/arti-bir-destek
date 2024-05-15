<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useVideoStore } from '@/stores/video';
import { useVideoStatisticStore } from '@/stores/videoStatistic';
import { useUserStore } from '@/stores/user';
import { UserRole } from '@/stores/user';
import { VideoStatisticsType } from "~/types/VideoType";
import { useRouter, useRoute } from 'vue-router';

const videoStore = useVideoStore();
const videoStatistic = useVideoStatisticStore();
const userStore = useUserStore();
const id = ref<string>('');
const router = useRouter();
definePageMeta({
    layout: "randevu",
});
onMounted(() => {
    const { id: routeId } = useRoute().params;
    id.value = routeId;
    videoStore.getVideo(routeId);
    videoStore.fetchVideos();
});

const video: any = computed(() => {
    return videoStore.video;
});
const videos: any = computed(() => {
    return videoStore.videos;
});

const shuffledVideos = computed(() => {
    const copiedVideos = [...videos.value];
    const shuffled = copiedVideos.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
});


const players = ref<Record<string, videojs.Player>>({});

const handleMounted = (payload: any, index: number) => {
    players.value[`player_1`] = payload;
    const player = payload.player;
};


const handleEvent = (log: any) => {
    // console.log("Basic player event", log);
};

const handlePause = async (event: Event, video: any) => {

    await userStore.getCurrentUser()
    if (userStore.userRole == UserRole.Patient) {
        const playerId = `player_1`;
        const player = players.value[playerId];
        console.log("pause", playerId);

        const currentTime = player.player.cache_.currentTime;
        const duration = player.player.cache_.duration;
        const percentageWatched = (currentTime / duration) * 100;
        console.log("Percentage watched:", percentageWatched.toFixed(2) + "%");

        if (percentageWatched > 90) {
            console.log("tamamlandı");
        }
        console.log("pla: ", percentageWatched.toFixed(2) + "%");


        const videoStatistics: VideoStatisticsType = {
            videoId: video.id,
            clicksNumber: 1,
            viewingRate: parseInt(percentageWatched.toFixed(0))
        }
        await videoStatistic.addVideoStatistics(videoStatistics)
    }
};
const navigateToVideo = (videoId: any) => {
    router.push(`/profile/video/${videoId}`);
    videoStore.getVideo(videoId);
};


const handleTimeUpdate = (event: Event) => {
    const playerId = `player_1`;
    const player = players.value[playerId];
};

const handlePlay = (event: Event) => {
    const playerId = `player_1`;
    console.log("Video started playing:", playerId);

    // Diğer videoları duraklat
    for (const key in players.value) {
        if (key !== playerId) {
            const otherPlayer = players.value[key].player;
            if (otherPlayer && typeof otherPlayer.pause === 'function') {
                otherPlayer.pause();
            }
        }
    }
};

const videoHeight = computed(() => {
    return window.innerWidth <= 600 ? 400 : 600;
});
</script>

<template>
    <v-container class="mt-8" style="max-width: 1500px;">
        <v-row>
            <v-col cols="10">
                <v-row>
                    <v-col>
                        <div class="video-container">
                            <video-player class="video-player vjs-big-play-centered" :src="video.url" crossorigin="anonymous" playsinline controls :volume="0.6"
                                :id="'player_1'" :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted" @ready="handleEvent"
                                @play="handlePlay" @pause="handlePause($event, video)" @ended="handleEvent" @loadeddata="handleEvent"
                                @waiting="handleEvent" @playing="handleEvent" @canplay="handleEvent"
                                @canplaythrough="handleEvent" @timeupdate="handleTimeUpdate" />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="mt-4">
                            <p class="text-h4">
                                {{ video.title }}
                            </p>
                            <p class="text-h5 font-weight-thin mt-2" v-html="video.description">
                            </p>
                        </div>
                    </v-col>
                </v-row>

            </v-col>
            <v-col cols="2">
                <div v-for="(i, index) in shuffledVideos" class="mb-4">
                    <v-card @click="navigateToVideo(i.videoSlug)" class="elevation-4 ">
                        <video-player class="video-player vjs-big-play-centered" :src="i.url" :height="200" crossorigin="anonymous" />
                        <p class="px-2 py-2 text-h6 font-weight-thin ">{{ i.title }}</p>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>

</template>



<style lang="scss" scoped>
.video-js {
    width: 100%;
    // background-color: #fff;
}

.background-image {
    background-image: url("/images/backgrounds/Cover1.png");
    background-size: cover;
    background-position: center;
}

::deep(.v-container) {
    padding-bottom: 0 !important;
}
</style>