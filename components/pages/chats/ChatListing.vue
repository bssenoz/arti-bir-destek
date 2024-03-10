<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useChatStore } from '@/stores/chat';
import { formatDistanceToNowStrict } from 'date-fns';
import { last } from 'lodash';
import { useUserStore } from '~/stores/user';
import { ChatUsersType } from '~/types/ChatType';

const chatStore = useChatStore();
const userStore = useUserStore();

const currentUser = ref(null);

onMounted(async () => {
    await userStore.getCurrentUser();
    chatStore.fetchMessageInfo(currentUser.value.id);
});

watchEffect(() => {
    currentUser.value = userStore.currentUser;
});

const getChats = computed(() => {
    return chatStore.allMessageInfo;
});

const updateStatus = (id) => {
    const chatUsers: ChatUsersType = {
        senderId: currentUser.value.id,
        receiverId: id,
    };
    chatStore.updateStatus(chatUsers);
}
const chatItem = getChats;
const searchValue = ref('');
const filteredChats = computed(() => {
    return chatItem.value.filter((chat) => {
        return chat.user.name.toLowerCase().includes(searchValue.value.toLowerCase());
    });
});

const items = ref([]);
</script>
<template>
    <v-sheet>
        <div class="px-6 pt-3">
            <v-text-field variant="outlined" v-model="searchValue" append-inner-icon="mdi-magnify"
                placeholder="Sohbet Ara" hide-details density="compact"></v-text-field>
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
            <v-list-item :value="chat.id" color="primary" class="text-no-wrap chatItem" v-for="chat in filteredChats"
                :key="chat.id" lines="two" @click="updateStatus(chat.id)">
                <template v-slot:prepend>
                    <v-avatar>
                        <img :src="chat.user.profileImageUrl" alt="pro" width="50" />
                    </v-avatar>

                </template>
                <v-list-item-title class="text-subtitle-1 textPrimary w-100 font-weight-semibold">{{ chat.user.name }}
                    {{
                chat.user.surname }}</v-list-item-title>

                <v-sheet class="py-2 mb-1 d-flex justify-space-between">
                    <p class="text-body-1">{{ chat.lastMessage }}</p>
                    <p class="text-body-1 bg-grey100 rounded-circle px-2" v-if="chat.unreadMessageCount !== 0">{{
                chat.unreadMessageCount
                        }}</p>
                </v-sheet>
                <template v-slot:append>
                    <div class="d-flex flex-column text-right w-25">
                        <!-- <small class="textPrimary text-subtitle-2">
                            {{
                                formatDistanceToNowStrict(new Date(lastActivity(chat)), {
                                    addSuffix: false
                                })
                            }}
                        </small> -->
                    </div>
                </template>
            </v-list-item>
        </v-list>
    </perfect-scrollbar>
</template>
<style>
.chatItem {
    padding: 16px 24px !important;
    border-bottom: 1px solid rgb(var(--v-theme-inputBorder), 0.1);
}

.badg-dot {
    left: -17px;
    position: relative;
    bottom: -10px;
}

.lgScroll {
    height: 500px;
}
</style>
