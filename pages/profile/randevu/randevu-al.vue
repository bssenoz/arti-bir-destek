<template>
    <div>
        <v-btn color="primary">Boş</v-btn>
        <v-btn color="grey200" class="ml-1">Dolu</v-btn>
    </div>
    <v-sheet class="mx-auto" max-width="800">
        <v-slide-group show-arrows>
            <v-slide-group-item v-for="(day, index) in days" :key="index" v-slot="{ isSelected, toggle }">
                <v-btn :color="isSelected ? 'primary' : undefined" class="ma-2" rounded @click="selectDay(index)">
                    {{ day }}
                </v-btn>
            </v-slide-group-item>
        </v-slide-group>
        <div v-if="selectedDay !== null" class="text-center mt-4">
            <v-expansion-panels>
                <v-expansion-panel v-for="(appointment, index) in appointments" :key="index" class="mt-2 mb-2"
                    @click="toggleAccordion(index)">
                    <v-icon v-if="activeAccordion === index" class="float-left">mdi-chevron-up</v-icon>
                    <v-icon v-else class="float-left">mdi-chevron-down</v-icon>
                    <v-expansion-panel-header :class="{ 'panel-header-active': activeAccordion === index }">
                        <span class="float-left pl-4">{{ appointment.doctor }}</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content v-if="activeAccordion === index">
                        <v-list class="mt-8">
                            <v-list-item v-for="(timeObj, i) in appointment.times" :key="i">
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <v-btn :color="timeObj.selected ? 'grey200' : 'primary'" class="ma-1" outlined
                                            @click="handleAppointmentClick(timeObj, appointment)">
                                            {{ timeObj.time }}
                                        </v-btn>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title>Randevu Detayı</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col>
                            <p>Doktor: {{ selectedAppointment.doctor }}</p>
                            <p>Saat: {{ selectedAppointment.timeObj.time }}</p>
                            <p>Gün: {{ selectedAppointment.day }}</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <p>Randevunuzu onaylıyor musunuz?</p>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn color="primary" text @click="confirmAppointment">Onayla</v-btn>
                    <v-btn color="error" text @click="dialog = false">İptal</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-sheet>
</template>

<script>
export default {
    data() {
        return {
            days: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
            selectedDay: null,
            appointments: [],
            dialog: false,
            selectedAppointment: null,
            activeAccordion: null
        }
    },
    created() {
        // Sayfa ilk yüklendiğinde Pazartesi seçili olarak gösterilsin
        this.selectDay(0);
    },
    methods: {
        selectDay(index) {
            this.selectedDay = index;
            this.getAppointments();
        },
        getAppointments() {
            const allAppointments = [
                [
                    { doctor: 'Dr. Ahmet', times: [{ time: '8:00', selected: false }, { time: '9:00', selected: true }, { time: '10:00', selected: true }, { time: '11:00', selected: true }, { time: '12:00', selected: false }, { time: '13:00', selected: false }, { time: '14:00', selected: false }, { time: '15:00', selected: true }, { time: '16:00', selected: false }, { time: '17:00', selected: false }, { time: '18:00', selected: true }], day: 'Pazartesi' },
                    { doctor: 'Dr. Ayşe', times: [{ time: '14:00', selected: true }], day: 'Pazartesi' },
                    { doctor: 'Dr. Mehmet', times: [{ time: '09:00', selected: false }], day: 'Pazartesi' },
                    { doctor: 'Dr. Zeynep', times: [{ time: '10:00', selected: true }, { time: '11:00', selected: true }, { time: '12:00', selected: true }, { time: '15:00', selected: false }], day: 'Pazartesi' }
                ],
                [
                    { doctor: 'Dr. Mehmet', times: [{ time: '09:00', selected: false }], day: 'Salı' },
                    { doctor: 'Dr. Zeynep', times: [{ time: '15:00', selected: true }], day: 'Salı' }
                ],
            ];
            this.appointments = allAppointments[this.selectedDay];
        },
        handleAppointmentClick(timeObj, appointment) {
            if (!timeObj.selected) {
                this.selectedAppointment = {
                    doctor: appointment.doctor,
                    timeObj: timeObj,
                    day: appointment.day
                };
                this.dialog = true;
            }
        },
        confirmAppointment() {
            console.log('Randevu Onaylandı');
            console.log('Doktor: ', this.selectedAppointment.doctor);
            console.log('Saat: ', this.selectedAppointment.timeObj.time);
            console.log('Gün: ', this.selectedAppointment.day);

            this.selectedAppointment.timeObj.selected = true;

            this.dialog = false; 
        },

        toggleAccordion(index) {
            this.activeAccordion = this.activeAccordion === index ? null : index;
        }
    }
}
</script>


<style scoped>
.v-expansion-panel {
    padding: 1rem;
    cursor: pointer;
}

.panel-header-active {
    background-color: #f0f0f0;
}
</style>
