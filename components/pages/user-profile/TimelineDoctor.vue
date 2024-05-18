<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useMeetStore } from '@/stores/meet';
import { useUserStore } from '@/stores/user';
import 'v-calendar/dist/style.css';

const meetStore = useMeetStore();
const userStore = useUserStore();

const appointments = computed(() => {
    return meetStore.doctorAppointment;
});

const future = ref([]);
const past = ref([]);

function separateAppointments(appointments: any) {
    for (const appointment of appointments) {
        for (const patient of appointment.patients) {
            if (isPastAppointment(appointment.appointmentDay, patient.appointmentTimeRange)) {
                past.value.push(appointment);
                break; 
            } else {
                future.value.push(appointment);
                break; 
            }
        }
    }
}

onMounted(async () => {
    // await userStore.getCurrentUser();
    await meetStore.fetchDoctorAppointments();
    separateAppointments(appointments.value);
});

function isPastAppointment(appointmentDay: string | number | Date, appointmentTimeRange: string) {
    var appointmentDate = new Date(appointmentDay);
    var appointmentHour = parseInt(appointmentTimeRange);

    var currentDate = new Date();
    var currentHour = currentDate.getHours();

    if (currentDate > appointmentDate) {
        return true;
    } else if (currentDate.getDate() === appointmentDate.getDate() && currentHour > appointmentHour) {
        return true;
    } else {
        return false;
    }
}

</script>

<template>
    <div class="timeline-container text-center" >

        <v-timeline align="start" side="end" v-if="appointments">
            <v-timeline-item dot-color="warning" size="small" v-for="(appointment, index) in future">
                <div v-for="(i, index) in appointment.patients">
                    <div>
                        <div>
                            <strong class="float-left">{{ appointment.appointmentDay }}</strong>
                            <span> | {{ i.appointmentTimeRange }}.00</span>
                        </div>
                        <div class="text-h6 font-weight-regular float-left truncate text-start" style="width: 200px;">
                            {{ i.patientName }} {{ i.patientSurname }}
                        </div>
                        <br>
                    </div>
                </div>
            </v-timeline-item>
            <v-timeline-item dot-color="primary" size="small" v-for="(appointment, index) in past">
                <div class="d-flex" v-for="(i, index) in appointment.patients">
                    <div>
                        <div>
                            <strong class="float-left">{{ appointment.appointmentDay }}</strong>
                            <span> | {{ i.appointmentTimeRange }}.00</span>
                        </div>
                        <div class="text-h6 font-weight-regular float-left truncate text-start" style="width: 200px;">
                            {{ i.patientName }} {{ i.patientSurname }}
                        </div>
                    </div>
                </div>
            </v-timeline-item>
        </v-timeline>
        <div v-if="appointments == ''" style="border-left: 2px solid #2777">
            <p>Henüz Hiç Randevun Yok</p>
            <v-btn>Randevu Al</v-btn>
        </div>
    </div>

</template>

<style scoped>
::v-deep(.v-timeline-divider__before) {
    background: #ccc;
}

::v-deep(.v-timeline-divider__after) {
    background: #ccc;
}

.timeline-container {
    max-height: 350px;
    overflow-y: auto;
    padding-right: 10px;
    margin-bottom: 2rem;
}

.timeline-container::-webkit-scrollbar {
    width: 8px;
}

.timeline-container::-webkit-scrollbar-thumb {
    background-color: #a69ba1;
    border-radius: 4px;
}

.timeline-container::-webkit-scrollbar-track {
    background-color: #eee;
}
</style>