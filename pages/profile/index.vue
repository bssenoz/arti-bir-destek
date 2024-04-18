<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import ProfileBanner from '@/components/pages/user-profile/ProfileBanner.vue';

import Timeline from '@/components/pages/user-profile/Timeline.vue';
import { UserCircleIcon, BellIcon, ArticleIcon, LockIcon, SettingsIcon, ArrowRightIcon } from 'vue-tabler-icons';
import AccountTab from '@/components/pages/account-settings/AccountTab.vue';
import Chart from '@/components/video/Chart.vue';
import { useVideoStore } from '@/stores/video';
import { useVideoStatisticStore } from '@/stores/videoStatistic';
import { VideoStatisticsType } from "~/types/VideoType";

const videoStore = useVideoStore();
const videoStatisticStore = useVideoStatisticStore();
onMounted(() => {
  videoStore.fetchVideos();
  videoStatisticStore.getCurrentUserVideoStatistics();
});

const userRole = computed(() => {
    return userStore.userRole;
})

const videoStatistics: any = computed(() => {
  return videoStatisticStore.currentVideoStatistics;
});

const page = ref({ title: 'Social Profile' });
const userStore = useUserStore();
onMounted(() => {
  userStore.getCurrentUser()
});
const user = computed(() => {
  return userStore.currentUser;
});

definePageMeta({
  layout: "randevu",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});
</script>

<template>
  <ProfileBanner :user="user" />
  <v-container style="max-width: 1200px;">
    <v-row class="mt-8">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="12" class="text-center mb-4">
            <v-btn href="/profile/ayarlar">
              <SettingsIcon />
              <v-tooltip activator="parent" location="top">Ayarlar</v-tooltip>
            </v-btn>

            <v-btn href="/profile/mesaj">
              <Message2Icon />
              <v-tooltip activator="parent" location="top">Mesajlar</v-tooltip>
            </v-btn>

            <v-btn href="/profile/randevu/randevu-al" v-if="userRole == 'Patient'">
              <CalendarPlusIcon />
              <v-tooltip activator="parent" location="top">Randevu Al</v-tooltip>
            </v-btn>

            <v-btn href="/profile/randevu/takvim" v-if="userRole == 'Doctor'">
              <CalendarIcon />
              <v-tooltip activator="parent" location="top">Randevu Takvimi</v-tooltip>
            </v-btn>

          </v-col>
          <v-col cols="12" md="4" v-for="(video, index) in videoStatistics.slice(0, 3)" :key="index" v-if="userRole == 'Patient'">
            <Chart :title="video.videoTitle" :clickNumber="video.videoStatistics[0].videoClicksNumber"
              :watchPercentage="video.videoStatistics[0].videoViewingRate" image="none"
              v-if="video.videoStatistics[0]" />
            <Chart :title="video.videoTitle" :clickNumber="0" :watchPercentage="0" v-if="video.videoStatistics == ''"
              image="none" />
          </v-col>
          <v-col cols="12" v-if="userRole == 'Patient'">
            <v-btn color="primary" class="mt-4 mb-10 float-right right-0 rounded-md text-h6 font-weight-thin"
              href="/profile/video/istatistikler">Tüm
              istatistikleri Görüntüle
              <ArrowRightIcon />
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
        <Timeline />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-btn {
  border-radius: 0;
  border: 1px solid #ccc;
}

.v-btn:hover {
  border: 1px solid #db2777;
  background-color: #db2777;
  color: #fff;
}
</style>
