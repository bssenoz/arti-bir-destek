<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import user from '/images/profile/user.png';
import { useMeetStore } from '~/stores/meet';
import { useChatStore } from '~/stores/chat';
import { useRoute } from 'vue-router';

const meetStore = useMeetStore();
const chatStore = useChatStore();

const id = ref<string>('');
const tab = ref<string>('lastDay');

const { id: routeId } = useRoute().params;
id.value = routeId;

onMounted(() => {
    meetStore.getUserSlug(routeId)
    lastDayEmotion();
});

definePageMeta({
    middleware: ['auth'],
});

const getUser: any = computed(() => {
    return meetStore.getUser;
});

const lastDayEmotion = async () => {
    chatStore.getPatientLastDayMessageEmotions(routeId);
    tab.value = 'lastDay';
};

const patientEmotion: any = computed(() => {
    return chatStore.patientEmotion;
});

const lastMonthEmotion = async () => {
    chatStore.getPatientLastMonthMessageEmotions(routeId);
    tab.value = 'lastMonth';
};

const allEmotion = async () => {
    chatStore.getPatientAllMessageEmotions(routeId);
    tab.value = 'all';
};
</script>

<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h5 text-primary">| Duygu Analizi</div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
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
        <v-row>
            <v-col>
                <v-btn @click="lastDayEmotion" :class="{ 'bg-primary': tab === 'lastDay', 'px-8': true }">Son
                    Gün</v-btn>
                <v-btn @click="lastMonthEmotion" :class="{ 'bg-primary': tab === 'lastMonth', 'px-8': true }"
                    class="ml-4">Son
                    Ay</v-btn>
                <v-btn @click="allEmotion" :class="{ 'bg-primary': tab === 'all', 'px-8': true }" class="ml-4">Tüm
                    Zamanlar</v-btn>

            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="4" lg="2">
                <v-card elevation="12" class="text-center">
                    <v-card-title class="text-primary">Acil Durum!</v-card-title>
                    <v-card-title>{{ patientEmotion.emergencyMessageRatio }}%</v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="2">
                <v-card elevation="4" class="text-center">
                    <v-card-title class="text-primary">Korku</v-card-title>
                    <v-card-title>{{ patientEmotion.scaredMessageRatio }}%</v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="2">
                <v-card elevation="4" class="text-center">
                    <v-card-title class="text-primary">Bıkkın</v-card-title>
                    <v-card-title>{{ patientEmotion.boredMessageRatio }}%</v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="2">
                <v-card elevation="4" class="text-center">
                    <v-card-title class="text-primary">Mutlu</v-card-title>
                    <v-card-title>{{ patientEmotion.happyMessageRatio }}%</v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="2">
                <v-card elevation="4" class="text-center">
                    <v-card-title class="text-primary">Kızgın</v-card-title>
                    <v-card-title>{{ patientEmotion.angryMessageRatio }}%</v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" lg="2">
                <v-card elevation="4" class="text-center">
                    <v-card-title class="text-primary">Üzgün</v-card-title>
                    <v-card-title>{{ patientEmotion.sadMessageRatio }}%</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
