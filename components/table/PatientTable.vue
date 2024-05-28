<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useRouter, useRoute } from 'vue-router';
import { CreateAppointmentByDoctor } from '@/types/MeetType';
import { NoteIcon, VideoIcon, CalendarTimeIcon, CalendarPlusIcon,MoodEmptyIcon } from 'vue-tabler-icons';
import Swal from "sweetalert2";

const meetStore = useMeetStore();
const day = ref('');
const time = ref()

const router = useRouter();
onMounted(() => {
    meetStore.fetchAllPatientsForDoctor();
});

const patients: any = computed(() => {
    return meetStore.allPatients;
});

const search = ref('');
const desserts = ref(patients);
const appointmentDialog = ref(false);

const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.name.toLowerCase().includes(search.value.toLowerCase());
    });
});

const navigateToStatistic = (patientSlug: any) => {
    router.push(`/profile/danisanlar/${patientSlug}/video-istatistikleri`);
};
const navigateToNots = (patientSlug: any) => {
    router.push(`/profile/danisanlar/${patientSlug}/raporlar`);
};
const navigateToPast = (patientSlug: any) => {
    router.push(`/profile/danisanlar/${patientSlug}/gecmis-randevular`);
};

const navigateToEmotion = (patientSlug: any) => {
    router.push(`/profile/danisanlar/${patientSlug}/duygu-analizi`);
};

const saveAppointment = async (slug: any) => {
    try {
        const appointment: CreateAppointmentByDoctor = {
            patientUserName: slug,
            day: day.value,
            timeRange: time.value,
        }
        console.log(appointment)
        appointmentDialog.value = false;
        await meetStore.createAppointmentByDoctor(appointment)
        Swal.fire({
        title: "Başarılı!",
        text: "Randevu başarıyla oluşturuldu.",
        icon: "success",
        confirmButtonText: "Tamam",
      });

    } catch(error) {
        appointmentDialog.value = false;

        Swal.fire({
        title: "Hata!",
        text: "Randevu oluşturulamadı.",
        icon: "warning",
        confirmButtonText: "Tamam",
      });
    }
}
</script>
<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <v-text-field density="compact" v-model="search" label="Hasta Ara" hide-details
                variant="outlined"></v-text-field>
        </v-col>
    </v-row>
    <v-table class="mt-5">
        <thead>
            <tr>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">#</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Danışan Bilgileri</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Telefon</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap pl-8">İşlem</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in filteredList" :key="item.id">
                <td class="text-subtitle-1">{{ index + 1 }}</td>
                <td>
                    <div class="d-flex align-center py-4">
                        <div v-if="item.profileImageUrl">
                            <v-img :src="item.profileImageUrl" width="45px" class="rounded-circle img-fluid"></v-img>
                        </div>
                        <div v-else>
                            <v-img :src="user" width="45" />
                        </div>

                        <div class="ml-5">
                            <h4 class="text-h6 font-weight-semibold">{{ item.name }} {{ item.surname }}</h4>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.email }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1 text-no-wrap">{{ item.phoneNumber }}</td>
                <td class="text-subtitle-1 text-no-wrap">
                    <v-tooltip text="Video İstatistikleri">
                        <template v-slot:activator="{ props }">
                            <v-btn icon flat @click="navigateToStatistic(item.userName)" v-bind="props" class="ml-2">
                                <VideoIcon />
                            </v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Raporlar">
                        <template v-slot:activator="{ props }">
                            <v-btn icon flat @click="navigateToNots(item.userName)" v-bind="props" class="ml-2">
                                <NoteIcon class="text-accent"/>
                            </v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Geçmiş Randevular">
                        <template v-slot:activator="{ props }">
                            <v-btn icon flat @click="navigateToPast(item.userName)" v-bind="props" class="ml-2">
                                <CalendarTimeIcon class="text-secondary"/>
                            </v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Randevu Oluştur">
                        <template v-slot:activator="{ props }">
                            <v-btn icon flat  @click="appointmentDialog = true" v-bind="props" class="ml-2">
                                <CalendarPlusIcon class="text-primary"/>
                            </v-btn>
                        </template>
                    </v-tooltip>
                    <v-tooltip text="Duygu Analizi">
                        <template v-slot:activator="{ props }">
                            <v-btn icon flat  @click="navigateToEmotion(item.userName)" v-bind="props" class="ml-2">
                                <MoodEmptyIcon class="text-info"/>
                            </v-btn>
                        </template>
                    </v-tooltip>
                    
        
                </td>
                <v-dialog v-model="appointmentDialog" max-width="600px">
                    <v-card>
                        <v-card-title>Randevu Oluştur</v-card-title>
                        <v-card-text>
                            <v-text-field v-model="day" label="Tarih" outlined placeholder="01.01.2024" ></v-text-field>
                            <v-text-field v-model.number="time" label="Saat" outlined placeholder="8.00"></v-text-field>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="primary" @click="saveAppointment(item.userName)">Kaydet</v-btn>
                            <v-btn @click="appointmentDialog = false">İptal</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </tr>
        </tbody>
    </v-table>
</template>
