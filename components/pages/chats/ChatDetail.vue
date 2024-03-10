<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import { formatDistanceToNowStrict } from 'date-fns';
import ChatSendMsg from './ChatSendMsg.vue';
import { useDisplay } from 'vuetify';
import { ChatUsersType } from '@/types/ChatType';

const { lgAndUp } = useDisplay();

const chatStore = useChatStore();
const userStore = useUserStore();

onMounted(() => {
    chatStore.fetchChats();
    userStore.getCurrentUser();
});

const chatDetail: any = computed(() => {
    return chatStore.chats[chatStore.chatContent - 1];
});

const messages = computed(() => {
    return chatStore.messages;
})

const currentUser = computed(() => {
    return userStore.currentUser;
})

const fromUser = computed(() => {
    return chatStore.fromUser;
});

const Rpart = ref(lgAndUp ? true : false);

function toggleRpart() {
    Rpart.value = !Rpart.value;
}
</script>
<template>
    <div v-if="messages" class="customHeight">
        <div>
            <div class="d-flex align-center gap-3 pa-4">
                <!---Topbar Row-->
                <div class="d-flex gap-2 align-center">
                    <!---User Avatar-->
                    <v-avatar>
                        <img :src="fromUser.profileImageUrl" alt="pro" width="50" />
                    </v-avatar>

                    <div>
                        <h5 class="text-h5 mb-n1">{{ fromUser.title }} {{ fromUser.name }} {{ fromUser.surname }}</h5>
                    </div>
                </div>
            </div>
            <v-divider />
            <!---Chat History-->
            <perfect-scrollbar class="rightpartHeight">
                <div class="d-flex">
                    <div class="w-100">
                        <div v-for="msg in messages" :key="msg.sendedTime" class="pa-5">
                            <div v-if="currentUser.id !== msg.senderId" class="justify-end d-flex text-end mb-1">
                                <div>
                                    <small class="text-medium-emphasis text-subtitle-2" v-if="msg.sendedTime">
                                        {{
        formatDistanceToNowStrict(new Date(msg.sendedTime), {
            addSuffix: false
        })
    }}
                                        ago</small>

                                    <v-sheet class="bg-grey100 rounded-md px-3 py-2 mb-1" >
                                        <p class="text-body-1">{{ msg.text }}</p>
                                    </v-sheet>
                                
                                </div>
                            </div>
                            <div v-else class="d-flex align-items-start gap-3 mb-1">
                                <!---User Avatar-->
                                <v-avatar>
                                    <img :src="fromUser.profileImageUrl" alt="pro" width="40" />
                                </v-avatar>
                                <div>
                                    <small class="text-medium-emphasis text-subtitle-2" v-if="msg.sendedTime">
                                        {{
        formatDistanceToNowStrict(new Date(msg.sendedTime), {
            addSuffix: false
                                        })
                                        }}
                                        ago
                                    </small>

                                    <v-sheet class="bg-grey100 rounded-md px-3 py-2 mb-1" >
                                        <p class="text-body-1">{{ msg.text }}</p>
                                    </v-sheet>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </perfect-scrollbar>
        </div>
        <v-divider />
        <!---Chat send-->
        <ChatSendMsg />
    </div>
</template>
<style lang="scss">
.rightpartHeight {
    height: 530px;
}

.badg-dotDetail {
    left: -9px;
    position: relative;
    bottom: -10px;
}

.toggleLeft {
    position: absolute;
    right: 15px;
    top: 15px;
}

.right-sidebar {
    width: 320px;
    border-left: 1px solid rgb(var(--v-theme-borderColor));
    transition: 0.1s ease-in;
    flex-shrink: 0;
}

.HideLeftPart {
    display: none;
}

@media (max-width: 960px) {
    .right-sidebar {
        position: absolute;
        right: -320px;

        &.showLeftPart {
            right: 0;
            z-index: 2;
            box-shadow: 2px 1px 20px rgba(0, 0, 0, 0.1);
        }
    }

    .boxoverlay {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1;
        background: rgba(0, 0, 0, 0.2);
    }
}
</style>
