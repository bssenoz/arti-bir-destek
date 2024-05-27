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
    middleware: [
        'auth',
    ],
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

        const currentTime = player.player.cache_.currentTime;
        const duration = player.player.cache_.duration;
        const percentageWatched = (currentTime / duration) * 100;

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
</script>

<template>
    <v-container class="mt-8" style="max-width: 1500px;">
        <v-row>
            <v-col cols="12" lg="10" class="px-4">
                <v-row>
                    <v-col>
                        <video-player class="video-player vjs-big-play-centered player-big" :src="video.url"
                            crossorigin="anonymous" playsinline controls :volume="0.6" :id="'player_1'"
                            :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted" @ready="handleEvent"
                            @play="handlePlay" @pause="handlePause($event, video)" @ended="handleEvent"
                            @loadeddata="handleEvent" @waiting="handleEvent" @playing="handleEvent"
                            @canplay="handleEvent" @canplaythrough="handleEvent" @timeupdate="handleTimeUpdate" />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <div class="mt-4">
                            <p class="text-h4">
                                {{ video.title }}
                            </p>
                            <p class="text-h5 font-weight-thin mt-2 img-100" v-html="video.description">
                            </p>
                        </div>
                    </v-col>
                </v-row>

            </v-col>
            <v-col cols="12" lg="2" class="video-small d-none d-lg-inline">
                <div v-for="(i, index) in shuffledVideos" class="mb-4">
                    <v-card @click="navigateToVideo(i.videoSlug)" elevation="2">
                        <video-player class="video-player vjs-big-play-centered player-small" :src="i.url" :height="200"
                            crossorigin="anonymous" />
                        <p class="px-2 py-2 text-h6 font-weight-thin ">{{ i.title }}</p>
                    </v-card>
                </div>
            </v-col>
            <v-col cols="6" md="4" class="video-small d-inline d-lg-none mt-16" v-for="(i, index) in shuffledVideos">
                <v-card @click="navigateToVideo(i.videoSlug)" elevation="2">
                    <video-player class="video-player vjs-big-play-centered player-small" :src="i.url" :height="200"
                        crossorigin="anonymous" />
                    <p class="px-2 py-2 text-h6 font-weight-thin ">{{ i.title }}</p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<style lang="scss" scoped>
.video-js {
    width: 100%;
}

@media (max-width: 700px) {
    .player_1-dimensions {
        height: 300px !important
    }
}

@media (min-width: 701px) and (max-width: 1100px) {
    .player_1-dimensions {
        height: 400px !important
    }
}

.background-image {
    background-image: url("/images/backgrounds/Cover1.png");
    background-size: cover;
    background-position: center;
}

::deep(.v-container) {
    padding-bottom: 0 !important;
}

.img-100 img {
    width: 100% !important;
}

.video-container {
    width: 80%;
}

.player-big {
    height: 80vh;
}

.player-small {
    height: 20vh;
}

.v-card:hover {
    box-shadow: 0px 7px 8px -4px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 12px 17px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 5px 22px 4px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
}

.video-small {
    ::v-deep(.video-js .vjs-tech) {
        object-fit: cover;
    }
}
::v-deep(ul) {
    margin-left: 2rem;
}
</style>