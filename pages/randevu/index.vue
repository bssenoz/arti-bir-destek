<script setup lang="ts">
import { ref } from 'vue';
import { useMeetStore } from '@/stores/apps/meet';
import 'v-calendar/dist/style.css';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const date = ref(new Date(2024, 1, 19))
const timezone = ref('');

const range = ref({
    start: new Date(2020, 0, 1),
    end: new Date(2020, 0, 5)
});

const store = useMeetStore();

onMounted(() => {
    store.fetchMeets();
});

const getMeets = computed(() => {
    return store.meets;
});

const appointments = getMeets;

const page = ref({ title: 'Social Profile' });
definePageMeta({
  layout: "default",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});

</script>

<template>
<v-container>
<v-row>
<v-col cols="10">
    <v-row>
        <v-col v-for="(appointment, index) in appointments" :key="index" cols="12">
            <UiParentCard :title="appointment.name">
             <div>Tarih: {{ appointment.date }}</div>
                <div>Saat: {{ appointment.time }}</div>
                <v-btn :href="appointment.url" target="_blank" color="primary" class="mt-2">Randevuya Katıl</v-btn>
            </UiParentCard>
        </v-col>
    </v-row>
</v-col>
<v-col cols="2">
    <v-date-picker v-model="date" :rows="2" :step="1" class="bg-surface" locale="tr" />
</v-col>
</v-row>
</v-container>
</template>
