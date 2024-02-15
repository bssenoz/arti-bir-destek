<script setup>
import { ref, onMounted, computed } from 'vue';
import { useChatStore } from '@/stores/apps/chat';
import { formatDistanceToNowStrict } from 'date-fns';
import { last } from 'lodash';
import user1 from '/images/profile/user-1.jpg';

const store = useChatStore();

onMounted(() => {
    store.fetchChats();
});

const getChats = computed(() => {
    return store.chats;
});

const chatItem = getChats;

const selectedDoctor = ref(null);
const dialogVisible = ref(false);
const itemsPerPage = 5;
const currentPage = ref(1);

const selectDoctor = (doctor) => {
  selectedDoctor.value = doctor;
  dialogVisible.value = false;
};

const displayedDoctors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return chatItem.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(chatItem.value.length / itemsPerPage));

const updateDisplayedDoctors = () => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  displayedDoctors.value = chatItem.value.slice(start, end);
};
</script>

<template>
  <v-sheet>
    <!---Topbar Row-->
    <div class="d-flex gap-2 align-center pa-6">
      <!---User Avatar-->
      <v-avatar size="large">
        <img :src="user1" alt="pro" width="54" />
      </v-avatar>

      <v-badge class="badg-dotDetail" dot color="success"> </v-badge>
      <!---Name & Last seen-->
      <div>
        <h5 class="text-subtitle-1 font-weight-semibold">Mathew Anderson</h5>
      </div>
      <div class="select">
        <v-btn variant="outlined" @click="dialogVisible = true">Doktor Seç</v-btn>
      </div>
    </div>
    <v-dialog v-model="dialogVisible" max-width="600px" >
      <v-card style="overflow: hidden">
        <v-card-title>Doktor Seç</v-card-title>
        <v-card-text>
          <v-row justify="center">
    
            <v-col v-for="doctor in displayedDoctors" :key="doctor.id" cols="4">
              <v-card @click="selectDoctor(doctor)" class="pa-2 text-center" style="height:100%">
                <v-img :src="doctor.thumb" width="100" height="100" style="margin: auto;border-radius: 50%"></v-img>
                <div>{{ doctor.name }}</div>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center" v-if="totalPages > 1">
            <v-pagination v-model="currentPage" :length="totalPages"></v-pagination>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

