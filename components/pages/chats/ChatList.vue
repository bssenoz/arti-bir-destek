<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import { ChatUsersType } from '~/types/ChatType';

const chatStore = useChatStore();
const userStore = useUserStore();

const currentUser = ref(null);

onMounted(async () => {
  userStore.fetchUserDoctor();
  await userStore.getCurrentUser();
  chatStore.fetchMessageInfo(currentUser.value.id);
});

watchEffect(() => {
  currentUser.value = userStore.currentUser;
});

const getChats = computed(() => {
  return chatStore.allMessageInfo;
});


const getDoctors = computed(() => {
  return userStore.doctors;
});

const dialogVisible = ref(false);
const itemsPerPage = 5;
const currentPage = ref(1);

const selectUser = (id: string) => {
  dialogVisible.value = false;
  chatStore.fromUserChange(id)
  userStore.getUserId(id)

  const chatUsers: ChatUsersType = {
    fromUser: userStore.currentUser.id,
    toUser: id,
  };
  chatStore.fetchMessages(chatUsers)
};

const displayedDoctors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return getDoctors.value.slice(start, end);
});

const updateStatus = async(id: string, count: number) => {
  chatStore.fromUserChange(id)
  userStore.getUserId(id)
  const chatUsers: ChatUsersType = {
    fromUser: userStore.currentUser.id,
    toUser: id,
  };
  
  if (count > 0) {
    const chatUser: ChatUsersType = {
      senderId: currentUser.value.id,
      receiverId: id,
    };
    await chatStore.updateStatus(chatUser);
  }
  await chatStore.fetchMessages(chatUsers)

}

const totalPages = computed(() => Math.ceil(getDoctors.value.length / itemsPerPage));

const chatItem = getChats;
const searchValue = ref('');
const filteredChats = computed(() => {
  return chatItem.value.filter((chat) => {
    const fullName = `${chat.user.name} ${chat.user.surname}`.toLowerCase();
    return fullName.includes(searchValue.value.toLowerCase());
  });
});
</script>

<template>
  <v-sheet>


    <v-sheet>
      <!---Topbar Row-->
      <div class="d-flex gap-2 align-center pa-6">
        <!---User Avatar-->
        <v-avatar size="large">
          <img :src="currentUser.profileImageUrl" alt="pro" width="54" v-if="currentUser.profileImageUrl" />
          <div class="rounded-circle" v-else style="width: 45px; height: 45px; background-color: #ccc;"></div>
        </v-avatar>

        <v-badge class="badg-dotDetail" dot color="success"> </v-badge>
        <!---Name & Last seen-->
        <div>
          <h5 class="text-subtitle-1 font-weight-semibold">{{ currentUser.name }} {{ currentUser.surname }}</h5>
        </div>
        <div class="select">
          <v-btn variant="outlined" @click="dialogVisible = true">Danışman Seç</v-btn>
        </div>
      </div>
      <v-dialog v-model="dialogVisible" max-width="600px">
        <v-card style="overflow: hidden">
          <v-card-title>Danışman Seç</v-card-title>
          <v-card-text>
            <v-row justify="center">

              <v-col v-for="doctor in displayedDoctors" :key="doctor.id" cols="4">
                <v-card @click="selectUser(doctor.id)" class="pa-2 text-center" style="height:100%">
                  <v-img :src="doctor.profileImageUrl" width="100" height="100"
                    style="margin: auto;border-radius: 50%"></v-img>
                  <div>{{ doctor.title }} {{ doctor.name }} {{ doctor.surname }}</div>
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
    <v-sheet>
      <div class="px-6 pt-3">
        <v-text-field variant="outlined" v-model="searchValue" append-inner-icon="mdi-magnify" placeholder="Sohbet Ara"
          hide-details density="compact"></v-text-field>
        <v-menu>

          <v-list class="elevation-10">
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-sheet>
    <perfect-scrollbar class="lgScroll">
      <v-list>
        <!-- @click="selectUser(chat.user.id)" -->
        <v-list-item :value="chat.id" color="primary" class="text-no-wrap chatItem" v-for="chat in filteredChats"
          :key="chat.id" lines="two" @click="updateStatus(chat.id, chat.unreadMessageCount)">
          <template v-slot:prepend>
            <v-avatar>
              <img :src="chat.user.profileImageUrl" alt="pro" width="50" />
            </v-avatar>

          </template>
          <v-list-item-title class="text-subtitle-1 textPrimary w-100 font-weight-semibold">{{ chat.user.name }}
            {{
            chat.user.surname }}</v-list-item-title>

          <v-sheet class="py-2 mb-1 d-flex justify-space-between">
            <!-- <p class="text-body-1" v-if="currentUser.id == chat.id">Siz: {{ chat.lastMessage }}</p> -->
            <p class="text-body-1">{{ chat.lastMessage }}</p>
            <p class="text-body-1 bg-grey100 rounded-circle px-2" v-if="chat.unreadMessageCount !== 0">{{
            chat.unreadMessageCount
          }}</p>
          </v-sheet>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>

  </v-sheet>
</template>
