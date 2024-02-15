<template>
  <v-card elevation="10">
    <v-card-item>
      <v-card-title class="text-h5">Yearly Sales</v-card-title>
      <v-card-subtitle class="text-subtitle-1 textSecondary">Total Sales</v-card-subtitle>
      <apexchart type="bar" height="275" :options="chartOptions" :series="Chart.series"></apexchart>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getPrimary, getLight100 } from '@/utils/UpdateColors';

/* Chart */
const chartOptions = computed(() => {
  return {
    chart: {
      height: 275,
      type: 'bar',
      fontFamily: `inherit`,
      toolbar: {
        show: false
      }
    },
    colors: [getPrimary.value],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '45%',
        distributed: true,
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    grid: {
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      categories: ['Video 1', 'Video 2', 'Video 3', 'Video 4'], // Video isimleri
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };
});

// Her bir video için veriler
const Chart = {
  series: [
    {
      name: '',
      data: [2, 1, 0, 3]
    }
  ]
};
</script>
