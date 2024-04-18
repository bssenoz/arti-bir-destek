<template>
  <div class="video-container">
    <div class="background-image">
      <v-row>
        <v-col>
          <div class="font-weight-bold text-h3 text-center color-pink-1 mt-4">Videolar</div>
        </v-col>
      </v-row>
      <v-row class="text-center justify-center d-flex align-items">
        <v-col cols="5">
          <v-text-field v-model="searchQuery" variant="outlined" append-inner-icon="mdi-magnify" placeholder="Video Ara"
            hide-details density="compact"></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-4">
        <v-col cols="12" lg="6" v-for="(video, index) in filteredVideos" :key="index">
          <v-card class="mb-6">
            <div @click="toggleFullscreen(index)">
              <video-player class="video-player vjs-big-play-centered" :src="video.url" :id="'player_' + index"
                crossorigin="anonymous" playsinline controls :volume="0.6" :height="videoHeight"
                :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted($event, index)"
                @ready="handleEvent($event)" @play="handlePlay($event, index)"
                @pause="handlePause($event, index, video)" @ended="handleEvent($event)"
                @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)"
                @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)"
                @timeupdate="handleTimeUpdate($event, index)" />
              <p class="font-weight-bold my-4 ml-4 cursor-pointer">
                {{ video.title }}
                <v-tooltip activator="parent" location="top" v-if="video.description" :max-width="tooltipMaxWidth">
                  <p class="mt-2 mb-4 ml-2">{{ video.description }}</p>
                </v-tooltip>
              </p>
            </div>

          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import videojs from "video.js";
import Player from "video.js";
import "video.js/dist/video-js.css";
import { useVideoStore } from '@/stores/video';
import { useVideoStatisticStore } from '@/stores/videoStatistic';
import { useUserStore } from '@/stores/user';
import { UserRole } from '@/stores/user';
import { VideoStatisticsType } from "~/types/VideoType";

definePageMeta({
  layout: "default",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});
export default defineComponent({
  name: "MultipleVideosExample",
  components: {
    VideoPlayer,
  },

  setup() {
    const videoStore = useVideoStore();
    const videoStatistic = useVideoStatisticStore();
    const userStore = useUserStore();
    const searchQuery = ref('');

    onMounted(() => {
      videoStore.fetchVideos();
    });

    const videos: any = computed(() => {
      return videoStore.videos;
    });

    const filteredVideos = computed(() => {
      if (!searchQuery.value) {
        return videos.value;
      } else {
        const query = searchQuery.value.trim().toLowerCase();
        return videos.value.filter((video: any) => {
          return video.title.toLowerCase().includes(query);
        });
      }
    });

    const players = ref<Record<string, videojs.Player>>({});

    const handleMounted = (payload: any, index: number) => {
      players.value[`player_${index}`] = payload;
    };

    const handleEvent = (log: any) => {
      // console.log("Basic player event", log);
    };

    const handlePause = async(event: Event, index: number, video: any) => {

      await userStore.getCurrentUser()
      if (userStore.userRole == UserRole.Patient) {
        const playerId = `player_${index}`;
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

        console.log("video: ", videos[index]);

        const videoStatistics: VideoStatisticsType = {
          videoId: video.id,
          clicksNumber: 1,
          viewingRate: parseInt(percentageWatched.toFixed(0))
        }
        await videoStatistic.addVideoStatistics(videoStatistics)
      }
    };

    const handleTimeUpdate = (event: Event, index: number) => {
      const playerId = `player_${index}`;
      const player = players.value[playerId];
    };

    const handlePlay = (event: Event, index: number) => {
      const playerId = `player_${index}`;
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
      return window.innerWidth <= 600 ? 200 : 350;
    });

    const tooltipMaxWidth = "300px"; // Tooltip maksimum genişliği

    const toggleFullscreen = (index: number) => {
      const playerId = `player_${index}`;
      const player = players.value[playerId];
      if (player.isFullscreen()) {
        player.exitFullscreen(); // Tam ekran modundan çık
      } else {
        player.requestFullscreen(); // Tam ekran moduna geç
      }
    };

    return {
      videos,
      players,
      handleMounted,
      handleEvent,
      handlePause,
      handleTimeUpdate,
      handlePlay,
      toggleFullscreen,
      videoHeight,
      tooltipMaxWidth,
      searchQuery,
      filteredVideos,
    };
  },
});  
</script>

<style lang="scss" scoped>
.video-js {
  width: 100%;
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
