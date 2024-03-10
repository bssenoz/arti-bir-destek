<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { Vue } from 'nuxt-property-decorator';

const userStore = useUserStore();

onMounted(() => {
    userStore.fetchUserPatient();
});

const patients: any = computed(() => {
    return userStore.patients;
});

const search = ref('');
const desserts = ref(patients);

const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.name.toLowerCase().includes(search.value.toLowerCase());
    });
});
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return formattedDate;
};

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
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Hasta Bilgileri</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Telefon</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Gebelik Başlangıç</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">İşlem</th>
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
                            <div class="rounded-circle" style="width: 45px; height: 45px; background-color: #ccc;"></div>
                        </div>

                        <div class="ml-5">
                            <h4 class="text-h6 font-weight-semibold">{{ item.name }} {{ item.surname }}</h4>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.email }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1 text-no-wrap">{{ item.phoneNumber }}</td>
                <td>
                    <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ formatDate(item.pregnancyStartDate) }}</span>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Görüşme Oluştur">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat v-bind="props" to="/profile/randevu/add">
                                    <ClockIcon stroke-width="1.5" size="20" class="text-primary" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Mesaj At">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat v-bind="props" to="/profile/chat">
                                    <MailIcon stroke-width="1.5" size="20" class="text-secondary" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                    </div>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
