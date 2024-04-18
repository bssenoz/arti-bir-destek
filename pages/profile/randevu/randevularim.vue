<script setup lang="ts">
import { ref } from 'vue';
import { useMeetStore } from '@/stores/meet';
import { useUserStore } from '@/stores/user';
import 'v-calendar/dist/style.css';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { VCalendarAttribute } from 'v-calendar/dist/types';

const store = useMeetStore();
const userStore = useUserStore();
definePageMeta({
  layout: "default",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});

const userRole = computed(() => {
    return userStore.userRole;
})


// Doktor adı ve randevu saatini içeren nesneleri kullanacağız
const appointmentsData = [
    { date: new Date(2024, 1, 2), doctor: 'Dr. Smith', appointmentTime: '10:00' },
    { date: new Date(2024, 1, 19), doctor: 'Dr. Johnson', appointmentTime: '14:30' },
    { date: new Date(2024, 1, 22), doctor: 'Dr. Brown', appointmentTime: '11:15' },
    { date: new Date(2024, 2, 12), doctor: 'Dr. Wilson', appointmentTime: '09:45' },
    { date: new Date(2024, 2, 14), doctor: 'Dr. Martinez', appointmentTime: '16:00' },
];

const attributes: VCalendarAttribute[] = ref([]);

onMounted(() => {
    userStore.getCurrentUser();
    store.fetchMeets();
    const calendarAttributes: VCalendarAttribute[] = appointmentsData.map(appointment => ({
        key: appointment.date.toISOString(),
        highlight: {
            color: 'pink',
            fillMode: 'light',
            contentClass: 'italic',
        },
        dates: appointment.date,
        // Tooltip Eklemek için `popover` alanını kullanın
        popover: {
            label: `${appointment.doctor}, ${appointment.appointmentTime}`, // Doktor adı ve randevu saati
        },
    }));

    attributes.value = calendarAttributes;
});

const getMeets = computed(() => {
    return store.meets;
});

const appointments = getMeets;
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="12" v-if="userRole == 'Patient'">
                <v-btn color="primary" to="/profile/randevu/randevu-al" class="mb-2 float-right">Randevu Al</v-btn>
            </v-col>
            <!-- Takvim Görüntüleme -->
            <v-col>
                <v-dialog max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn v-bind="activatorProps" color="surface-variant float-right d-lg-none"
                            text="Takvimi Görüntüle" variant="flat"></v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                        <v-card title="Takvim">
                            <v-card-text class="text-center mt-4">
                                <!-- VCalendar -->
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
        <!-- Görüşme Kartları -->
        <v-row>
            <v-col cols="12" lg="9">
                <v-row>
                    <v-col v-for="(appointment, index) in appointments" :key="index" cols="12">
                        <UiParentCard :title="appointment.name">
                            <div>Tarih: {{ appointment.date }}</div>
                            <div>Saat: {{ appointment.time }}</div>
                            <div>Doktor: {{ appointment.doctor }}</div> <!-- Doktor adını göster -->
                            <div>Randevu Saati: {{ appointment.appointmentTime }}</div> <!-- Randevu saati -->
                            <v-btn :href="appointment.url" target="_blank" color="primary" class="mt-2">Randevuya
                                Katıl</v-btn>
                        </UiParentCard>
                    </v-col>
                </v-row>
            </v-col>
            <!-- Takvim (Sadece Büyük Ekranlar İçin) -->
            <v-col cols="12" lg="3" class="d-none d-lg-flex float-right">
                <VCalendar :attributes="attributes" :rows="3" :step="1" locale="tr" />
            </v-col>
        </v-row>
    </v-container>
</template>



<style scoped>
::v-deep(.vc-container) {
    width: 325px;
}
</style>