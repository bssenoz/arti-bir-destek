<template>
  <v-container>
    <v-row>
      <v-col v-for="(video, index) in videoData" :key="index" cols="12" sm="6" md="4">
        <Chart :title="video.title" :description="video.description" :watchPercentage="video.watchPercentage" />
      </v-col>
    </v-row>
    <v-row>
    <v-col>
        <Chart2 />
    </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import Chart from '@/components/video/Chart.vue';
import Chart2 from '@/components/video/Chart2.vue';


const videoData = [
  { title: "Video 1", description: "Description 1", watchPercentage: 60 },
  { title: "Video 2", description: "Description 2", watchPercentage: 25 },
  { title: "Video 3", description: "Description 3", watchPercentage: 80 },
  { title: "Video 4", description: "Description 4", watchPercentage: 100 }
];
</script>
