<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAdminStore } from '~/stores/admin';
import html2pdf from 'html2pdf.js';

import { useRoute } from 'vue-router';

const adminStore = useAdminStore();
const dialogReport = ref(false);

const id = ref<string>('');

onMounted(() => {
    const { id: routeId } = useRoute().params;
    id.value = routeId;
    adminStore.getReportDoctor(routeId);
});

definePageMeta({
    layout: "default",
    middleware: ['auth'],
});

const report: any = computed(() => {
    return adminStore.reportDoctor;
});

const selectedStatistic = ref(null);
const selectReport = ref(null);

const openDialog = (statistic: any) => {
    selectReport.value = statistic;
    selectReport.value.statistics.reverse()
    dialogReport.value = true;
};
const search = ref('');

const select = (data: any) => {
    selectedStatistic.value = data;
    console.log(selectedStatistic.value)
};
const downloadPDF = () => {
    const content = document.getElementById('report-content').innerHTML;

    html2pdf()
        .from(content)
        .set({ margin: 20, filename: 'rapor.pdf', pagebreak: { mode: ['css', 'legacy'], avoid: '.page-break' } })
        .save();
};
const downloadPDF2 = () => {
    const content = document.getElementById('report-content2').innerHTML;

    html2pdf()
        .from(content)
        .set({ margin: 20, filename: 'rapor.pdf', pagebreak: { mode: ['css', 'legacy'], avoid: '.page-break' } })
        .save();
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h5 text-primary">| Raporlar</div>
            </v-col>
        </v-row>
        <v-row v-for="(i, index) in report">
            <v-col cols="6">
                <v-card elevation="2" @click="openDialog(i)">
                    <v-card-text class="text-h6">
                        {{ i.patientName }} {{ i.patientSurname }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="!report">
            <v-col><div class="text-h6">Rapor bulunmamaktadır.</div></v-col>
        </v-row>

        <v-dialog v-model="dialogReport" transition="dialog-bottom-transition" fullscreen>
            <v-card title="Raporlar">
                <v-card-text>
                    <v-row class="mt-4">
                        <v-col>
                            <!-- <img :src="selectedStatistic.patientProfileImageUrl" /> -->
                            <div class="text-h6">{{ selectReport.patientName }} {{ selectReport.patientSurname }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-row class="d-flex justify-start">
                                <v-col cols="12" lg="4" md="6">
                                    <v-text-field density="compact" v-model="search" label="Tarihe Göre Rapor Ara"
                                        hide-details variant="outlined"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-col cols="12"
                                        v-for="(statistic, index) in selectReport.statistics.filter(item => item.appointmentDay.includes(search))"
                                        :key="index">
                                        <v-card elevation="2" @click="select(statistic)"
                                            :class="{ 'active': selectedStatistic === statistic }">
                                            <v-card-title>{{ statistic.appointmentDay }} | {{
                                                statistic.appointmentStartTime }} - {{ statistic.appointmentEndTime
                                                }}</v-card-title>
                                            <v-card-text
                                                v-html="statistic.appointmentComment.slice(0, 100)"></v-card-text>
                                        </v-card>
                                    </v-col>

                                </v-col>
                                <v-col cols="8" v-if="selectedStatistic">
                                    <div class="text-h5">Tarih: {{ selectedStatistic.appointmentDay }}</div>
                                    <div class="text-h5">Zaman: {{ selectedStatistic.appointmentStartTime }} -
                                        {{
                                            selectedStatistic.appointmentEndTime }}</div>
                                    <p class="mt-4" v-html="selectedStatistic.appointmentComment"></p>
                                    <v-btn @click="downloadPDF2()" color="warning" class="float-right">PDF İndir</v-btn>
                                    <div id="report-content2" class="d-none">

                                        <v-col cols="12">
                                            <div class="d-flex align-center">
                                                <div class="text-h6 font-weight-thin">Hasta: {{ selectReport.patientName
                                                    }} {{
                                                        selectReport.patientSurname
                                                    }}</div>
                                            </div>

                                            <div class="text-h6 mt-2 font-weight-thin">Tarih: {{
                                                selectedStatistic.appointmentDay }}</div>
                                            <div class="text-h6 mt-2 font-weight-thin">Zaman: {{
                                                selectedStatistic.appointmentStartTime }} - {{
                                                    selectedStatistic.appointmentEndTime }}
                                            </div>
                                            <p class="mt-4" v-html="selectedStatistic.appointmentComment"></p>

                                        </v-col>
                                    </div>
                                </v-col>
                                <v-col cols="8" v-else>
                                    <div class="text-h5">Tarih: {{ selectReport.statistics[0].appointmentDay }}</div>
                                    <div class="text-h5">Zaman: {{ selectReport.statistics[0].appointmentStartTime }} -
                                        {{
                                            selectReport.statistics[0].appointmentEndTime }}</div>
                                    <p class="mt-4" v-html="selectReport.statistics[0].appointmentComment"></p>
                                    <v-btn @click="downloadPDF()" color="warning" class="float-right">PDF İndir</v-btn>
                                    <div id="report-content" class="d-none">
                                        <v-col cols="12">
                                            <div class="d-flex align-center">
                                                <div class="text-h6 font-weight-thin">Hasta: {{ selectReport.patientName
                                                    }} {{
                                                        selectReport.patientSurname
                                                    }}</div>
                                            </div>
                                            <div class="text-h6 mt-2 font-weight-thin">Tarih: {{
                                                selectReport.statistics[0].appointmentDay }}</div>
                                            <div class="text-h6 mt-2 font-weight-thin">Zaman: {{
                                                selectReport.statistics[0].appointmentStartTime }} - {{
                                                    selectReport.statistics[0].appointmentEndTime }}
                                            </div>
                                            <p class="mt-4" v-html="selectReport.statistics[0].appointmentComment"></p>

                                        </v-col>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="dialogReport = false">Kapat</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<style scoped>

</style>
