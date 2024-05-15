<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useRoute } from 'vue-router';
import { NoteIcon } from 'vue-tabler-icons';

const meetStore = useMeetStore();

const id = ref<string>('');
const dialogReport = ref(false);

onMounted(() => {
    const { id: routeId } = useRoute().params;
    id.value = routeId;
    meetStore.fetchPastDoctorAppointment(routeId);
});

const pastAppointment: any = computed(() => {
    return meetStore.pastAppointment;
});

const getUser: any = computed(() => {
    return meetStore.getUser;
});

const selectedStatistic = ref(null); // Variable to store the selected statistic

// Function to set the selected statistic when NoteIcon is clicked
const openDialog = (statistic: null) => {
    selectedStatistic.value = statistic;
    dialogReport.value = true; // Open the dialog
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col v-for="(item, index) in pastAppointment" :key="index" v-if="pastAppointment">
                <v-row>
                    <v-col class="d-flex align-center">
                        <div class="d-inline-block mr-2">
                            <template v-if="item.patientProfileImageUrl">
                                <v-img :src="item.patientProfileImageUrl" width="45px"
                                    class="rounded-circle img-fluid"></v-img>
                            </template>
                            <template v-else>
                                <v-img :src="user" width="45" />
                            </template>
                        </div>
                        <div class="d-inline-block">
                            <span>{{ item.patientName }} {{ item.patientSurname }}</span>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-col cols="12" v-for="(statistic, index) in item.appointments" :key="index">
                                    <v-card elevation="2" v-for="(date, index) in statistic.appointmentDayTimeRange"
                                        style="height: 70px">
                                        <v-card-title>{{ statistic.appointmentDay }} | {{ date.appointmentTimeRange
                                            }}.00</v-card-title>
                                        <v-tooltip text="Rapor Ekle">
                                            <template v-slot:activator="{ props }">
                                                <NoteIcon class="position-absolute cursor-pointer note" v-bind="props" @click="openDialog(statistic)" 
                                                    style="top: 2rem; right: 2rem;" />
                                            </template>
                                        </v-tooltip>
                                    </v-card>
                                </v-col>
                            </v-col>
                        </v-row>
                        <!-- düzenlenecek -->
                        <v-dialog v-model="dialogReport" transition="dialog-bottom-transition" fullscreen>
                            <v-card title="Kayıt Başarılı">
                                <v-card-text>
                                    <p v-if="selectedStatistic">{{ selectedStatistic }}</p>
                                    <v-row>
                                        <!-- <v-col>
                                            <div>Tarih: {{ selectedStatistic?.appointmentDay }}</div>
                                            Randevu Saati:
                                        </v-col> -->
                                        <v-col>
                                            <v-text-field color="primary" variant="outlined" label="Bitiş Saati"></v-text-field> 
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field color="primary" variant="outlined" label="Başlangıç Saati"></v-text-field> 
                                        </v-col>
                                        <v-col>
                                            <v-text-field color="primary" variant="outlined" label="Bitiş Saati"></v-text-field> 
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                              <v-btn @click="dialogReport = false">Kapat</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-col>
                </v-row>
            </v-col>
            <v-col v-else>
                <v-row v-if="getUser">
                    <v-col class="d-flex align-center">
                        <div class="d-inline-block mr-2">
                            <template v-if="getUser.profileImageUrl">
                                <v-img :src="getUser.profileImageUrl" width="45px"
                                    class="rounded-circle img-fluid"></v-img>
                            </template>
                            <template v-else>
                                <v-img :src="user" width="45" />
                            </template>
                        </div>
                        <div class="d-inline-block">
                            <span>{{ getUser.name }} {{ getUser.surname }}</span>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.active {
    background-color: #fbcfe8;
}

.note:hover {
    transform: scale(1.2);
    transition: transform 2s all;
}
</style>
