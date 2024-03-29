<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import { ChatUsersType, ChatsUserType } from '~/types/ChatType';
import { CurrentUserType } from '~/types/UserType';

const chatStore = useChatStore();
const userStore = useUserStore();

const currentUser = ref<CurrentUserType | null>(null);

watchEffect(() => {
  currentUser.value = userStore.currentUser;
});

onMounted(async () => {
  userStore.fetchUserDoctor();
  await userStore.getCurrentUser();
  if (currentUser.value) chatStore.fetchMessageInfo(userStore.currentUser.id);
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
  chatStore.fromUserChange(id);
  userStore.getUserId(id);
  chatStore.senderID = id;

  const chatUsers: ChatUsersType = {
    senderId: userStore.currentUser.id,
    receiverId: id,
  };
  chatStore.fetchMessages(chatUsers);
};

const displayedDoctors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return getDoctors.value.slice(start, end);
});

const updateStatus = async (id: string, count: number) => {
  chatStore.fromUserChange(id);
  userStore.getUserId(id);
  console.log("id2:" ,id)
  chatStore.senderID = id;

  if (currentUser.value) {
    const chatUsers: ChatUsersType = {
      senderId: userStore.currentUser.id,
      receiverId: id,
    };
    chatStore.updateStatus(chatUsers);
    chatStore.fetchMessages(chatUsers);
  }
};

const totalPages = computed(() => Math.ceil(getDoctors.value.length / itemsPerPage));

const chatItem = getChats;
const searchValue = ref('');
const filteredChats = computed(() => {
  return chatItem.value.map((item: any) => transformChatItem(item)).filter((chat: ChatsUserType | null) => {
    if (chat) {
      const fullName = `${chat.user.receiverName} ${chat.user.receiverSurname}`.toLowerCase();
      return fullName.includes(searchValue.value.toLowerCase());
    }
    return false;
  });
});

const transformChatItem = (item: any): ChatsUserType => {
  if (!item || !item.user) {
    throw new Error('Invalid chat item');
  }

  return {
    user: {
      receiverId: item.user.receiverId,
      receiverName: item.user.receiverName,
      receiverSurname: item.user.receiverSurname,
      receiverProfileImageUrl: item.user.receiverProfileImageUrl || ''
    },
    lastMessage: {
      senderId: item.lastMessage.senderId,
      text: item.lastMessage.text,
      sendedTime: item.lastMessage.sendedTime
    },
    unreadMessageCount: item.unreadMessageCount || 0
  };
};
</script>

<template>
  <v-sheet>
    <div class="d-flex gap-2 align-center pa-6">
      <v-avatar size="large">
        <img :src="currentUser?.profileImageUrl" alt="pro" width="54" v-if="currentUser?.profileImageUrl" />
        <div class="rounded-circle" v-else style="width: 45px; height: 45px; background-color: #ccc;"></div>
      </v-avatar>

      <v-badge class="badg-dotDetail" dot color="success"> </v-badge>
      <div>
        <h5 class="text-subtitle-1 font-weight-semibold">{{ currentUser?.name }} {{ currentUser?.surname }}</h5>
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
                <v-img :src="doctor.profileImageUrl" width="100" height="100" v-if="doctor.profileImageUrl"
                  style="margin: auto;border-radius: 50%"></v-img>
                  <div class="rounded-circle" v-else style="width: 80px; height: 80px; background-color: #ccc;"></div>
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
    <v-sheet>
      <div class="px-6 pt-3">
        <v-text-field variant="outlined" v-model="searchValue" append-inner-icon="mdi-magnify" placeholder="Sohbet Ara"
          hide-details density="compact"></v-text-field>
      </div>
    </v-sheet>
    <perfect-scrollbar class="lgScroll">
      <v-list>
        <v-list-item v-for="chat in filteredChats" :key="chat.user.receiverId" lines="two"
          @click="updateStatus(chat.user.receiverId, chat.unreadMessageCount)">
          <template v-slot:prepend>
            <v-avatar>
              <img :src="chat.user ? chat.user.receiverProfileImageUrl : ''" alt="pro" width="50"
                v-if="chat.user.receiverProfileImageUrl" />
                <div class="rounded-circle" v-else style="width: 80px; height: 80px; background-color: #ccc;"></div>

            </v-avatar>
          </template>
          <v-list-item-title v-if="chat.user" class="text-subtitle-1 textPrimary w-100 font-weight-semibold">{{
          chat.user.receiverName }} {{ chat.user.receiverSurname }}</v-list-item-title>
          <v-sheet class="py-2 mb-1 d-flex justify-space-between">
            <p class="text-body-1">{{ chat.lastMessage.text }}</p>
            <p class="text-body-1 bg-grey100 rounded-circle px-2" v-if="chat.unreadMessageCount !== 0">{{
          chat.unreadMessageCount
              }}</p>
          </v-sheet>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>

  </v-sheet>
</template>
