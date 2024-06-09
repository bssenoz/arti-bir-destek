<template>
  <v-card elevation="10">
    <v-card-item>
      <v-tooltip :text="title">
        <template v-slot:activator="{ props }">
          <v-row v-if="image != 'none'">
            <v-col cols="3" style="padding-right: 0">
              <v-avatar>
                <v-img :src="image" width="40" />
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <h4 class="text-h4 truncate mt-2">{{ title }}</h4>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <h4 class="text-h4 truncate mt-2" v-bind="props">{{ title }}</h4>
            </v-col>
          </v-row>

        </template>
      </v-tooltip>
      <apexchart type="donut" height="120" class="mt-3 ml-n2" :options="chartOptions" :series="seriesData"></apexchart>
      <h6 class="text-subtitle-1 textSecondary mt-1">{{ clickNumber }} izlenme</h6>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getPrimary, getSecondary, getGray } from '@/utils/UpdateColors';

const props = defineProps<{
  image: string;
  title: string;
  clickNumber: number;
  watchPercentage: number;
}>()

// Grafik verileri
const seriesData = computed(() => {
  const watched = props.watchPercentage;
  const remaining = 100 - watched;
  return [watched, remaining];
});

// Grafik seçenekleri
const chartOptions = computed(() => {
  return {
    series: seriesData.value,
    labels: ["İzlenen", "Kalan"],
    chart: {
      height: 120,
      type: "donut",
      foreColor: "#adb0bb",
      fontFamily: "inherit",
    },
    colors: [getPrimary.value, getGray.value],
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: {
      show: false,
      borderColor: "transparent",
      padding: { top: 0, right: 0 },
    },
    stroke: { colors: ["transparent"] },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          background: "transparent",
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: "18px",
              color: undefined,
              offsetY: -10,
            },
            value: { show: false, color: "#98aab4" },
            total: { show: false, label: "Our Visitors", color: "#98aab4" },
          },
        },
      },
    },
    tooltip: { theme: "dark", fillSeriesColor: false },
    responsive: [{ breakpoint: 1025, options: { chart: { height: 185 } } }],
  }
});
</script>
