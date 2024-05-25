<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import videojs from "video.js";
import Player from "video.js";
import "video.js/dist/video-js.css";
import { useVideoStore } from '@/stores/video';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: "randevu",
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
    const searchQuery = ref('');
    const router = useRouter();

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

    const navigateToVideo = (videoId: any) => {
      router.push(`/profile/video/${videoId}`);
    };

    const videoHeight = computed(() => {
      return window.innerWidth <= 600 ? 200 : 350;
    });

    return {
      videos,
      players,
      videoHeight,
      searchQuery,
      filteredVideos,
      navigateToVideo,
    };
  },
});  
</script>

<template>
  <v-container style="max-width: 1500px;">
    <div class="video-container">
      <div class="background-image">
        <v-row>
          <v-col>
            <div class="font-weight-bold text-h3 text-center color-pink-1 mt-8">Videolar</div>
          </v-col>
        </v-row>
        <v-row class="text-center justify-center d-flex align-items">
          <v-col cols="10" lg="5">
            <v-text-field v-model="searchQuery" variant="outlined" append-inner-icon="mdi-magnify"
              placeholder="Video Ara" hide-details density="compact"></v-text-field>
          </v-col>
        </v-row>

        <v-row class="mt-8">
          <v-col cols="12" md="6" lg="4" v-for="(video, index) in filteredVideos" :key="index">
            <v-card class="mb-6" elevation="2">
              <div @click="navigateToVideo(video.videoSlug)" class="cursor-pointer">
                <video-player class="video-player vjs-big-play-centered" :src="video.url" :id="'player_' + index"
                  crossorigin="anonymous" playsinline controls :volume="0.6" :height="videoHeight" />
                <p class="font-weight-bold my-4 ml-4 cursor-pointer">
                  {{ video.title }}
                </p>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-container>

</template>

<style lang="scss" scoped>
.video-js {
  width: 100%;
}

.background-image {
  // background-image: url("/images/backgrounds/Cover1.png");
  background-size: cover;
  background-position: center;
}

::deep(.v-container) {
  padding-bottom: 0 !important;
}
</style>
