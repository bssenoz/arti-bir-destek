<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useMeetStore } from '@/stores/meet';
import { useUserStore } from '@/stores/user';
import 'v-calendar/dist/style.css';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { VCalendarAttribute } from 'v-calendar/dist/types';
import { CancelPatientAppointment } from '@/types/MeetType';
import Swal from 'sweetalert2';

const meetStore = useMeetStore();
const userStore = useUserStore();

const userRole = computed(() => {
    return userStore.userRole;
})

const appointments = computed(() => {
    return meetStore.patientAppointment;
});

const attributes: VCalendarAttribute[] = ref([]);

onMounted(() => {
    userStore.getCurrentUser();
    meetStore.fetchPatientAppointments();
});

watch(appointments, (newAppointments) => {
    const calendarAttributes: VCalendarAttribute[] = [];

    newAppointments.forEach((appointment: { appointments: { day: string | number | Date; timeRange: any; doctorName: any; doctorSurname: any; appointmentTime: any; }[]; }) => {
        appointment.appointments.forEach((i: { day: string | number | Date; timeRange: any; doctorName: any; doctorSurname: any; appointmentTime: any; }) => {
            const appointmentDateTime = new Date(i.day);
            if (typeof i.day === 'string') {
                const [day, month, year] = i.day.split('.').map(Number);
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
                    label: `${i.doctorTitle} ${i.doctorName} ${i.doctorSurname}, ${i.timeRange}.00`,
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

const isAppointmentTime = (date: string | number | Date, timeRange: number) => {
    const appointmentDateTime = new Date(date);
    if (typeof date === 'string') {
        const [day, month, year] = date.split('.').map(Number);
        appointmentDateTime.setFullYear(year, month - 1, day);
    }
    const now = new Date();
    const appointmentHour = appointmentDateTime.getHours();
    return appointmentDateTime.toDateString() === now.toDateString() && appointmentHour === timeRange;
};
const isCurrentAppointment = (date: string | number | Date, timeRange: number) => {
    const appointmentDateTime = new Date(date);
    if (typeof date === 'string') {
        const [day, month, year] = date.split('.').map(Number);
        appointmentDateTime.setFullYear(year, month - 1, day);
    }
    const now = new Date();
    const appointmentHour = timeRange; 
    const appointmentEndHour = appointmentHour + 1;
    return appointmentDateTime.toDateString() === now.toDateString() &&
        now.getHours() >= appointmentHour && now.getHours() < appointmentEndHour;
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
    Swal.fire({
        title: 'Randevu İptali',
        text: 'Bu randevuyu iptal etmek istediğinizden emin misiniz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, İptal Et',
        cancelButtonText: 'Vazgeç'
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                const cancelInfo: CancelPatientAppointment = {
                    day: i.day,
                    timeRange: i.timeRange,
                    doctorId: i.doctorId,
                }
                meetStore.cancelPatientAppointment(cancelInfo)
                Swal.fire(
                    'Başarılı!',
                    'Randevunuz iptal edildi.',
                    'success'
                );

            } catch (error) {
                Swal.fire(
                    'Hata!',
                    'Bir hata oluştu. Randevunuz iptal edilemedi. Lütfen tekrar deneyiniz.',
                    'error'
                );
            }
        }
    });
}

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
                        <div v-for="(i, index) in appointment.appointments" :key="index">
                            <UiParentCard :title="getCardTitle(i.day, i.timeRange)"
                                :isUpcoming="isAppointmentSoon(i.day, i.timeRange)"
                                :isPast="isPastAppointment(i.day, i.timeRange)"
                                :isActive="isCurrentAppointment(i.day, i.timeRange)"
                                 class="mt-2">
                                <div class="text-h6">Tarih: <span class="font-weight-thin">{{ i.day }}</span></div>
                                <div class="text-h6 mt-1">Saat: <span class="font-weight-thin">{{ i.timeRange
                                        }}.00</span></div>
                                <div class="text-h6 mt-1">Danışman: <span class="font-weight-thin">{{i.doctorTitle}} {{ i.doctorName }} {{
                                    i.doctorSurname }}</span></div>
                                <v-btn :href="i.appointmentURL" target="_blank" color="primary" class="mt-3" v-if="(isPastAppointment(i.day, i.timeRange) && isCurrentAppointment(i.day, i.timeRange))"
                                    :disabled="!isAppointmentTime(i.day, i.timeRange) || isPastAppointment(i.day, i.timeRange)">
                                    Randevuya Katıl
                                </v-btn>

                                <v-btn target="_blank" color="warning" class="mt-3"
                                    :class="{ 'd-none': isPastAppointment(i.day, i.timeRange) }"
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
