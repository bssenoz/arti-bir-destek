<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useRoute } from 'vue-router';
import html2pdf from 'html2pdf.js';

const meetStore = useMeetStore();

const id = ref<string>('');

onMounted(() => {
    const { id: routeId } = useRoute().params;
    id.value = routeId;
    meetStore.getUserReport(routeId);
});

definePageMeta({
    middleware: ['auth'],
});

const report: any = computed(() => {
    return meetStore.userReport;
});

const getUser: any = computed(() => {
    return meetStore.getUser;
});

const search = ref('');
const filteredList = computed(() => {
    if (!search.value) return report.value;

    return report.value.map((item: any) => {
        const filteredStatistics = item.appointmentStatistics.filter((statistic: any) => {
            return statistic.appointmentDay.includes(search.value);
        });

        if (filteredStatistics.length) {
            return { ...item, appointmentStatistics: filteredStatistics };
        } else {
            return null;
        }
    }).filter((item: null) => item !== null);
});


const selectedStatistic = ref(null);
const select = (data: any) => {
    selectedStatistic.value = data;
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
        <v-row>
            <v-col v-for="(item, index) in report" :key="index" v-if="filteredList">
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
                        <v-row class="d-flex justify-start">
                            <v-col cols="12" lg="4" md="6">
                                <v-text-field density="compact" v-model="search" label="Tarihe Göre Rapor Ara"
                                    hide-details variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-col cols="12" v-for="(statistic, index) in filteredList[0].appointmentStatistics"
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
                            <v-col cols="8" v-if="selectedStatistic">
                                <div class="text-h5">Tarih: {{ selectedStatistic.appointmentDay }}</div>
                                <div class="text-h5">Zaman: {{ selectedStatistic.appointmentStartTime }} - {{
                                    selectedStatistic.appointmentEndTime }}</div>
                                <p class="mt-4" v-html="selectedStatistic.appointmentComment"></p>
                                <v-btn @click="downloadPDF()" color="warning" class="float-right">PDF İndir</v-btn>
                                    <div id="report-content" class="d-none" >

                                        <v-col cols="12">
                                            <div class="d-flex align-center">
                                                <div class="text-h6 font-weight-thin">Danışan: {{ item.patientName
                                                    }} {{
                                                        item.patientSurname
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
                                <div class="text-h5">Tarih: {{ item.appointmentStatistics[0].appointmentDay }}</div>
                                <div class="text-h5">Zaman: {{ item.appointmentStatistics[0].appointmentStartTime }} -
                                    {{
                                        item.appointmentStatistics[0].appointmentEndTime }}</div>
                                <p class="mt-4" v-html="item.appointmentStatistics[0].appointmentComment"></p>
                                <v-btn @click="downloadPDF2()" color="warning" class="float-right">PDF İndir</v-btn>
                                    <div id="report-content2" class="d-none">

                                        <v-col cols="12">
                                            <div class="d-flex align-center">
                                                <div class="text-h6 font-weight-thin">Danışan: {{ item.patientName
                                                    }} {{
                                                        item.patientSurname
                                                    }}</div>
                                            </div>

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

</style>
