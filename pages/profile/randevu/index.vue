<script setup lang="ts">
import { ref } from 'vue';
import { useMeetStore } from '@/stores/meet';
import 'v-calendar/dist/style.css';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { VCalendarAttribute } from 'v-calendar/dist/types';

const store = useMeetStore();

const dates: Date[] = ref([
    new Date(2024, 1, 2),
    new Date(2024, 1, 19),
    new Date(2024, 1, 22),
    new Date(2024, 2, 12),
    new Date(2024, 2, 14),
]);

const attributes: VCalendarAttribute[] = ref([]);

onMounted(() => {
    store.fetchMeets();
    const calendarAttributes: VCalendarAttribute[] = dates.value.map(date => ({
        key: date.toISOString(),
        highlight: {
            color: 'pink',
            fillMode: 'light',
            contentClass: 'italic',
        },
        dates: date,
    }));

    attributes.value = calendarAttributes;
});

const getMeets = computed(() => {
    return store.meets;
});

const appointments = getMeets;

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
            <v-col>
                <v-btn color="primary" to="/profile/randevu/add" class="mb-2 float-left">Yeni Görüşme</v-btn>
            </v-col>
            <v-col>
                <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps" color="surface-variant float-right d-lg-none"
                            text="Takvimi Görüntüle" variant="flat"></v-btn>
                    </template>

                    <template v-slot:default="{ isActive }">
                        <v-card title="Takvim">
                            <v-card-text class="text-center mt-4">
                                <VCalendar :attributes="attributes" :rows="3" :step="1" locale="tr" />
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn text="Close" @click="isActive.value = false"></v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="10">
                <v-row>
                    <v-col v-for="(appointment, index) in appointments" :key="index" cols="12">
                        <UiParentCard :title="appointment.name">
                            <div>Tarih: {{ appointment.date }}</div>
                            <div>Saat: {{ appointment.time }}</div>
                            <v-btn :href="appointment.url" target="_blank" color="primary" class="mt-2">Randevuya
                                Katıl</v-btn>
                        </UiParentCard>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" lg="2" class="d-none d-lg-flex">
                <VCalendar :attributes="attributes" :rows="3" :step="1" locale="tr" />
            </v-col>
        </v-row>
    </v-container>
</template>
