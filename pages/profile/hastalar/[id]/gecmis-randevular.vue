<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useRoute } from 'vue-router';
import { NoteIcon } from 'vue-tabler-icons';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { AppointmentReportType } from '@/types/MeetType';

const meetStore = useMeetStore();

const id = ref<string>('');
const dialogReport = ref(false);
const appointmentComment = ref();
const startTime = ref();
const finishTime = ref();

const dialogVisible = ref(false);
const success = ref(true);
const errorMessage = ref('');

definePageMeta({
    middleware: ['auth'],
});
const showDialog = (isSuccess, message = '') => {
    success.value = isSuccess;
    errorMessage.value = message;
    dialogVisible.value = true;
};

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

const selectedStatistic = ref(null);

const openDialog = (statistic: null) => {
    selectedStatistic.value = statistic;
    dialogReport.value = true;
};
const saveReport = async (appointmentID: any, patientID: any) => {
    try {
        const newReport = {
            appointmentStartTime: startTime.value,
            appointmentEndTime: finishTime.value,
            appointmentComment: appointmentComment.value,
            appointmentScheduleId: appointmentID,
            patientId: patientID
        };
        await meetStore.addAppointmentReport(newReport);
        showDialog(true);
        dialogReport.value = false;
    } catch (error) {
        console.log(error);
        showDialog(false, 'İşlem başarısız oldu. Lütfen tekrar deneyin.');
    }
};

</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h5 text-primary">| Geçmiş Randevular</div>
            </v-col>
        </v-row>
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
                    <v-col cols="12" md="4" v-for="(statistic, index) in item.appointments" :key="index">
                        <v-row>
                            <v-col v-for="(date, index) in statistic.appointmentDayTimeRange" :key="index">
                                <v-card elevation="2" style="height: 70px" class="mb-2">
                                    <v-card-title>{{ statistic.appointmentDay }} | {{ date.appointmentTimeRange
                                        }}.00</v-card-title>
                                    <v-tooltip text="Rapor Ekle">
                                        <template v-slot:activator="{ props }">
                                            <NoteIcon class="position-absolute cursor-pointer note text-primary"
                                                v-bind="props" @click="openDialog(statistic)"
                                                style="top: 2rem; right: 2rem;" />
                                        </template>
                                    </v-tooltip>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>


                <v-dialog v-model="dialogReport" transition="dialog-bottom-transition" fullscreen>
                    <v-card title="Rapor Ekleme">
                        <v-card-text>

                            <v-row>
                                <v-col cols="12">
                                    <div class="text-h6 mt-8">Tarih: <span class="font-weight-thin">{{
                                        selectedStatistic.appointmentDay }}</span></div>
                                    <div class="text-h6">Randevu Saati: <span class="font-weight-thin">{{
                                        selectedStatistic.appointmentDayTimeRange[0].appointmentTimeRange
                                            }}.00</span></div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field color="primary" variant="outlined" label="Başlangıç Saati"
                                        v-model="startTime" class="text-h6 font-weight-thin"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field color="primary" variant="outlined" label="Bitiş Saati"
                                        v-model="finishTime" class="text-h6 font-weight-thin"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <div>
                                        <label class="text-h6 font-weight-thin">Açıklama </label>
                                        <quill-editor v-model:content="appointmentComment" content-type="html"
                                            theme="snow"></quill-editor>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-btn color="primary"
                                        @click="saveReport(selectedStatistic.appointmentDayTimeRange[0].appointmentId, item.patientId)">Kaydet</v-btn>
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
            <v-dialog v-model="dialogVisible" max-width="400">
                <v-card>
                    <v-card-title>{{ success ? 'Başarılı' : 'Hata' }}</v-card-title>
                    <v-card-text>
                        {{ success ? 'Rapor Eklendi.' : errorMessage }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="dialogVisible = false">Tamam</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>


<style scoped>


.note:hover {
    transform: scale(1.2);
    transition: transform 2s all;
}

::v-deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}

::v-deep(.ql-container.ql-snow) {
    height: 400px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
}
</style>
