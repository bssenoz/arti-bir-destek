<template>
  <div class="video-container text-center align-center d-flex justify-center">
    <v-row>
      <v-col cols="12" lg="6" v-for="(video, index) in videos" :key="index">
        <video-player class="video-player vjs-big-play-centered" :src="video.url" :id="'player_' + index"
          crossorigin="anonymous" playsinline controls :volume="0.6" :height="videoHeight"
          :playback-rates="[0.7, 1.0, 1.5, 2.0]" @mounted="handleMounted($event, index)" @ready="handleEvent($event)"
          @play="handlePlay($event, index)" @pause="handlePause($event, index)" @ended="handleEvent($event)"
          @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)"
          @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)"
          @timeupdate="handleTimeUpdate($event, index)" />
        <p class="font-weight-bold mt-2 mb-4 ml-2">{{ video.title }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import videojs from "video.js";
import Player from "video.js";
import "video.js/dist/video-js.css";
import { useVideoStore } from '@/stores/video';

export default defineComponent({
  name: "MultipleVideosExample",
  components: {
    VideoPlayer,
  },
  setup() {
    const videoStore = useVideoStore();
    onMounted(() => {
      videoStore.fetchVideos();
    });

    const videos: any = computed(() => {
      return videoStore.videos;
    });
    // const videos = [
    //   {
    //     src: "https://vjs.zencdn.net/v/oceans.mp4",
    //     title: "Lorem ipsum sit dolor amet",
    //     playCount: 0,
    //     viewPercentage: 0,
    //   },
    //   {
    //     src: "https://vjs.zencdn.net/v/oceans.mp4",
    //     title: "Lorem ipsum sit dolor amet",
    //     playCount: 0,
    //     viewPercentage: 0,
    //   },
    //   {
    //     src: "https://vjs.zencdn.net/v/oceans.mp4",
    //     title: "Lorem ipsum sit dolor amet",
    //     playCount: 0,
    //     viewPercentage: 0,
    //   },
    //   {
    //     src: "https://vjs.zencdn.net/v/oceans.mp4",
    //     title: "Lorem ipsum sit dolor amet",
    //     playCount: 0,
    //     viewPercentage: 0,
    //   },
    // ];

    const players = ref<Record<string, videojs.Player>>({});

    const handleMounted = (payload: any, index: number) => {
      players.value[`player_${index}`] = payload;
      console.log("Basic player mounted", payload);
    };

    const handleEvent = (log: any) => {
      // console.log("Basic player event", log);
    };

    const handlePause = (event: Event, index: number) => {
      const playerId = `player_${index}`;
      const player = players.value[playerId];
      console.log("pause", playerId);
      // console.log("player value1: " + JSON.stringify(player));
      const currentTime = player.player.cache_.currentTime;
      const duration = player.player.cache_.duration;
      const percentageWatched = (currentTime / duration) * 100;
      console.log("Percentage watched:", percentageWatched.toFixed(2) + "%");

      if (percentageWatched > 90) {
        console.log("tamamlandı");
        videos[index].playCount += 1;
      }
      console.log("pla: ", percentageWatched.toFixed(2) + "%");

      videos[index].viewPercentage = percentageWatched;
      console.log("video: ", videos[index]);
    };

    const handleTimeUpdate = (event: Event, index: number) => {
      const playerId = `player_${index}`;
      const player = players.value[playerId];
    };

    const handlePlay = (event: Event, index: number) => {
      const playerId = `player_${index}`;
      console.log("Video started playing:", playerId);
    };

    const videoHeight = computed(() => {
      return window.innerWidth <= 600 ? 200 : 350;
    });

    return {
      videos,
      players,
      handleMounted,
      handleEvent,
      handlePause,
      handleTimeUpdate,
      handlePlay,
      videoHeight,
    };
  },
});
</script>

<style lang="scss" scoped></style>
