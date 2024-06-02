<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useAdminStore } from '~/stores/admin';
import html2pdf from 'html2pdf.js';

import { useRoute } from 'vue-router';

const meetStore = useMeetStore();
const adminStore = useAdminStore();

const id = ref<string>('');

onMounted(() => {
    const { id: routeId } = useRoute().params;
    id.value = routeId;
    adminStore.getReportPatient(routeId);
});

definePageMeta({
    layout: "default",
    middleware: ['auth'],
});
const report: any = computed(() => {
    return adminStore.reportPatient;
});

const getUser: any = computed(() => {
    return meetStore.getUser;
});

const search = ref('');
const selectedStatistic = ref(null);

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

const select = (data: any) => {
    selectedStatistic.value = data;
};

</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h5 text-primary">| Raporlar</div>
            </v-col>
        </v-row>
        <v-row v-for="(item, index) in report" :key="index" v-if="report">

            <v-col class="d-flex align-center">
                <div class="d-inline-block mr-2">
                    <template v-if="item.patientProfileImageUrl">
                        <v-img :src="item.patientProfileImageUrl" width="45px" class="rounded-circle img-fluid"></v-img>
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
            <v-col v-for="(item, index) in report" :key="index" v-if="report">
                <v-row>
                    <!-- İlgili raporun detayları -->
                    <v-col>
                        <v-row class="d-flex justify-start">
                            <v-col cols="12" lg="4" md="6">
                                <v-text-field density="compact" v-model="search" label="Tarihe Göre Rapor Ara"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <div class="text-h6" v-if="report && report[0].appointmentStatistics !== undefined && report[0].appointmentStatistics.length === 0">Rapor bulunmamaktadır.</div>
                                </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-col cols="12"
                                    v-for="(statistic, index) in item.appointmentStatistics.filter(stat => stat.appointmentDay.includes(search))"
                                    :key="index">
                                    <v-card elevation="2" @click="select(statistic)"
                                        :class="{ 'active': selectedStatistic === statistic }">
                                        <v-card-title>{{ statistic.appointmentDay }} | {{ statistic.appointmentStartTime
                                            }} - {{
                                                statistic.appointmentEndTime }}</v-card-title>
                                        <v-card-text v-html="statistic.appointmentComment.slice(0, 100)"></v-card-text>
                                    </v-card>
                                </v-col>
                            </v-col>
                            <!-- Seçili istatistik -->
                            <v-col cols="8" v-if="selectedStatistic">
                                <div class="d-flex align-center">
                                    <div class="mr-2">
                                        <template v-if="selectedStatistic.doctorProfileImageUrl">
                                            <v-img :src="selectedStatistic.doctorProfileImageUrl" width="45px"
                                                class="rounded-circle img-fluid"></v-img>
                                        </template>
                                        <template v-else>
                                            <v-img :src="user" width="45" />
                                        </template>
                                    </div>
                                    <div>
                                        <div class="text-h6">{{ selectedStatistic.doctorTitle }} {{
                                            selectedStatistic.doctorName }} {{
                                                selectedStatistic.doctorSurname }}</div>
                                    </div>
                                </div>
                                <div class="text-h5 mt-2">Görüşme Zamanı: {{ selectedStatistic.appointmentDay }} <span
                                        class="text-primary">|</span> {{ selectedStatistic.appointmentStartTime }} - {{
                                            selectedStatistic.appointmentEndTime }}</div>
                                <p class="mt-4" v-html="selectedStatistic.appointmentComment"></p>
                                <v-btn @click="downloadPDF()" color="warning" class="float-right">PDF İndir</v-btn>
                                <div id="report-content" class="d-none">

                                    <v-col cols="12" v-if="selectedStatistic">
                                        <div class="d-flex align-center">
                                            <div class="text-h6 font-weight-thin">Danışan: {{ item.patientName }} {{
                                                item.patientSurname
                                                }}</div>
                                        </div>
                                        <div class="text-h6 mt-2 font-weight-thin">Danışman: {{
                                            selectedStatistic.doctorName }} {{
                                                selectedStatistic.doctorSurname }}</div>
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
                            <!-- Seçili istatistik yoksa -->
                            <v-col cols="8" v-else>
                                <div class="d-flex align-center" v-if="item.appointmentStatistics[0]">
                                    <div class="mr-2">
                                        <template v-if="item.appointmentStatistics[0].doctorProfileImageUrl">
                                            <v-img :src="item.appointmentStatistics[0].doctorProfileImageUrl"
                                                width="45px" class="rounded-circle img-fluid"></v-img>
                                        </template>
                                        <template v-else>
                                            <v-img :src="user" width="45" />
                                        </template>
                                    </div>
                                    <div>
                                        <div class="text-h6">{{ item.appointmentStatistics[0].doctorTitle }} {{
                                            item.appointmentStatistics[0].doctorName }} {{
                                                item.appointmentStatistics[0].doctorSurname
                                            }}</div>
                                    </div>
                                </div>
                                <div class="text-h5 mt-2" v-if="item.appointmentStatistics[0]">Görüşme Zamanı: {{
                                    item.appointmentStatistics[0].appointmentDay }} <span class="text-primary">|</span>
                                    {{ item.appointmentStatistics[0].appointmentStartTime }} - {{
                                        item.appointmentStatistics[0].appointmentEndTime }}</div>
                                <p class="mt-4" v-html="item.appointmentStatistics[0].appointmentComment"
                                    v-if="item.appointmentStatistics[0]"></p>
                                <v-btn @click="downloadPDF2()" color="warning" class="float-right"
                                    v-if="item.appointmentStatistics[0]">PDF İndir</v-btn>
                                <div id="report-content2" class="d-none" v-if="item.appointmentStatistics[0]">

                                    <v-col cols="12">
                                        <div class="d-flex align-center">
                                            <div class="text-h6 font-weight-thin">Danışan: {{ item.patientName }} {{
                                                item.patientSurname
                                                }}</div>
                                        </div>
                                        <div class="text-h6 mt-2 font-weight-thin">Danışman: {{
                                            item.appointmentStatistics[0].doctorName }} {{
                                                item.appointmentStatistics[0].doctorSurname }}</div>
                                        <div class="text-h6 mt-2 font-weight-thin">Tarih: {{
                                            item.appointmentStatistics[0].appointmentDay }}</div>
                                        <div class="text-h6 mt-2 font-weight-thin">Zaman: {{
                                            item.appointmentStatistics[0].appointmentStartTime }} - {{
                                                item.appointmentStatistics[0].appointmentEndTime }}
                                        </div>
                                        <p class="mt-4" v-html="item.appointmentStatistics[0].appointmentComment"></p>

                                    </v-col>
                                </div>
                            </v-col>
                        </v-row>
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
@media print {
    .printable {
        page-break-inside: avoid;
    }
}
</style>