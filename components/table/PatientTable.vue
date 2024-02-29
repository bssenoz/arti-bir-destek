<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useContactStore } from '@/stores/contact';
import contact from '@/_mockApis/apps/contact';
const store = useContactStore();

onMounted(() => {
    store.fetchContacts();
});

const search = ref('');
const desserts = ref(contact);

const filteredList = computed(() => {
    return desserts.value.filter((user: any) => {
        return user.userinfo.toLowerCase().includes(search.value.toLowerCase());
    });
});

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
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Id</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Hasta Bilgileri</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Telefon</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">Gebelik Başlangıç</th>
                <th class="text-subtitle-1 font-weight-semibold text-no-wrap">İşlem</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in filteredList" :key="item.id">
                <td class="text-subtitle-1">{{ item.id }}</td>
                <td>
                    <div class="d-flex align-center py-4">
                        <div>
                            <v-img :src="item.avatar" width="45px" class="rounded-circle img-fluid"></v-img>
                        </div>

                        <div class="ml-5">
                            <h4 class="text-h6 font-weight-semibold">{{ item.userinfo }}</h4>
                            <span class="text-subtitle-1 d-block mt-1 textSecondary">{{ item.usermail }}</span>
                        </div>
                    </div>
                </td>
                <td class="text-subtitle-1 text-no-wrap">{{ item.phone }}</td>
                <td>
                    <v-chip :color="item.rolestatus" size="small" label>{{ item.role }}</v-chip>
                </td>
                <td>
                    <div class="d-flex align-center">
                        <v-tooltip text="Görüşme Oluştur">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props" to="/profile/randevu/add">
                                    <ClockIcon stroke-width="1.5" size="20" class="text-primary" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Mesaj At">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="deleteItem(item)" v-bind="props" to="/profile/chat">
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
