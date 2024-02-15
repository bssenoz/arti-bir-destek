<template>
  <v-card elevation="10">
    <v-card-item>
      <h4 class="text-h4 text-no-wrap">{{ title }}</h4>
      <h6 class="text-subtitle-1 textSecondary mt-1">{{ description }}</h6>
      <apexchart type="donut" height="120" class="mt-3 ml-n2" :options="chartOptions" :series="seriesData"></apexchart>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { getPrimary, getSecondary } from '@/utils/UpdateColors';

// Props
const props = defineProps<{
  title: string;
  description: string;
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
    colors: [getPrimary.value, getSecondary.value],
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
