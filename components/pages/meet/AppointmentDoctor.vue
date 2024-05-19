<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useMeetStore } from '@/stores/meet';
import { useUserStore } from '@/stores/user';
import 'v-calendar/dist/style.css';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { VCalendarAttribute } from 'v-calendar/dist/types';
import { CancelDoctorAppointment } from '@/types/MeetType';

const meetStore = useMeetStore();
const userStore = useUserStore();

const appointments = computed(() => {
    return meetStore.doctorAppointment;
});

const attributes: VCalendarAttribute[] = ref([]);

onMounted(() => {
    userStore.getCurrentUser();
    meetStore.fetchDoctorAppointments();
});

watch(appointments, (newAppointments) => {
    const calendarAttributes: VCalendarAttribute[] = [];

    newAppointments.forEach((appointment: {
        appointmentDay: string | number | Date; patients: { day: string | number | Date; timeRange: any; patientName: any; patientSurname: any; appointmentTimeRange: any; }[];
    }) => {
        appointment.patients.forEach((i: { timeRange: any; patientName: any; patientSurname: any; appointmentTimeRange: any; }) => {
            const appointmentDateTime = new Date(appointment.appointmentDay);
            if (typeof appointment.appointmentDay === 'string') {
                const [day, month, year] = appointment.appointmentDay.split('.').map(Number);
                appointmentDateTime.setFullYear(year, month - 1, day);
            }
            calendarAttributes.push({
                highlight: {
                    color: 'pink',
                    fillMode: 'light',
                    contentClass: 'italic',
                },
                dates: appointmentDateTime,
                popover: {
                    label: `${i.patientName} ${i.patientSurname}, ${i.appointmentTimeRange}.00`,
                },
            });
        });
    });

    attributes.value = calendarAttributes;
});


const isAppointmentSoon = (date: string | number | Date, timeRange: number) => {
    const appointmentDateTime = new Date(date);
    if (typeof date === 'string') {
        const [day, month, year] = date.split('.').map(Number);
        appointmentDateTime.setFullYear(year, month - 1, day);
    }
    appointmentDateTime.setHours(timeRange, 0, 0, 0);
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    return timeDiff > 0 && timeDiff < oneDay;
};

const isPastAppointment = (date: string | number | Date, timeRange: number) => {
    const appointmentDateTime = new Date(date);
    if (typeof date === 'string') {
        const [day, month, year] = date.split('.').map(Number);
        appointmentDateTime.setFullYear(year, month - 1, day);
    }
    appointmentDateTime.setHours(timeRange, 0, 0, 0);
    const now = new Date();
    return appointmentDateTime < now;
};

const getCardTitle = (date: string | number | Date, timeRange: number) => {
    if (isAppointmentSoon(date, timeRange)) {
        return 'Yaklaşan Randevu';
    } else if (isPastAppointment(date, timeRange)) {
        return 'Geçmiş Randevu';
    } else {
        return '';
    }
};

const cancelAppointment = (i: any) => {
    const cancelInfo: CancelDoctorAppointment = {
        day: i.day,
        timeRange: i.timeRange,
        doctorId: i.doctorId,
    }

    meetStore.cancelPatientAppointment(cancelInfo)
}
</script>

<template>
    <v-container>
        <v-row>
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
            <v-col>
                <div class="text-primary text-h6">| Randevularım</div>
            </v-col>
        </v-row>
        <v-row v-if="appointments.length === 0">
            <v-col>
                <div class=text-h6>Henüz bir randevunuz yok.</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" lg="9">
                <v-row>
                    <v-col v-for="(appointment, index) in appointments" :key="index" cols="12">
                        <div v-for="(i, index) in appointment.patients" :key="index">
                            <UiParentCard :title="getCardTitle(appointment.appointmentDay, i.appointmentTimeRange)"
                                :isUpcoming="isAppointmentSoon(appointment.appointmentDay, i.appointmentTimeRange)"
                                :isPast="isPastAppointment(appointment.appointmentDay, i.appointmentTimeRange)"
                                class="mt-2">
                                <div class="text-h6">Tarih: <span class="font-weight-thin">{{ appointment.appointmentDay
                                        }}</span></div>
                                <div class="text-h6 mt-1">Saat: <span class="font-weight-thin">{{ i.appointmentTimeRange
                                        }}.00</span></div>
                                <div class="text-h6 mt-1">Hasta: <span class="font-weight-thin">{{ i.patientName }} {{
                                    i.patientSurname }}</span></div>
                                <v-btn :href="i.appointmentURL" target="_blank" color="primary" class="mt-3"
                                    :disabled="isPastAppointment(appointment.appointmentDay, i.appointmentTimeRange)">Randevuya
                                    Katıl</v-btn>
                                <v-btn :href="i.appointmentURL" target="_blank" color="warning" class="mt-3 ml-4"
                                    :class="{ 'd-none': isPastAppointment(appointment.appointmentDay, i.appointmentTimeRange) }"
                                    @click="cancelAppointment(i)">İptal Et</v-btn>
                            </UiParentCard>
                        </div>
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
