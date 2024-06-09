<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, nextTick } from 'vue';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import { useMeetStore } from '@/stores/meet';
import { getUserRoleFromToken } from '@/utils/role';
import { formatDistanceToNowStrict } from 'date-fns';
import trLocale from 'date-fns/locale/tr';
import user from '/images/profile/user.png';

const msg = ref('');
const chatStore = useChatStore();
const userStore = useUserStore();
const meetStore = useMeetStore();

onMounted(async () => {
    await userStore.getCurrentUser();
    const role = getUserRoleFromToken();
    if (role === 'Patient') {
        meetStore.fetchPatientDoctors();
    }
});

const fromUser = computed(() => userStore.user);

const messages = computed(() => chatStore.messages);

const currentUser = computed(() => userStore.currentUser);

const senderID = computed(() => chatStore.senderID);

function sendMessage(item: string) {
    chatStore.sendMessage(item, currentUser.value.id);
    msg.value = '';
    scrollToBottom();  // Yeni mesaj gönderildiğinde en alta kaydır
}

const scrollToBottom = () => {
    nextTick(() => {
        const chatList = document.getElementById('chat-list');
        if (chatList) {
            chatList.scrollTop = chatList.scrollHeight;
        }
    });
};

onMounted(() => {
    scrollToBottom();
});
onUpdated(() => {
    scrollToBottom();
});
</script>

<template>
    <div v-if="fromUser.id" class="customHeight">
        <div class="h-76">
            <div class="d-flex align-center gap-3 pa-4">
                <div class="d-flex gap-2 align-center">
                    <v-avatar>
                        <img :src="fromUser.profileImageUrl" alt="pro" width="50" v-if="fromUser.profileImageUrl" />
                        <img :src="user" width="50" v-else />
                    </v-avatar>
                    <div>
                        <h5 class="text-h5 mb-n1">{{ fromUser.title }} {{ fromUser.name }} {{ fromUser.surname }}</h5>
                    </div>
                </div>
            </div>
            <v-divider />
            <div v-if="!messages.length" class="loading">Loading...</div>
            <perfect-scrollbar class="rightpartHeight" id="chat-list">
                <div class="d-flex">
                    <div class="w-100">
                        <div v-for="msg in messages" :key="msg.sendedTime" class="pa-5">
                            <div v-if="currentUser.id == msg.senderId" class="justify-end d-flex text-end mb-1">
                                <div>
                                    <small class="text-medium-emphasis text-subtitle-2" v-if="msg.sendedTime">
                                        {{
                                            formatDistanceToNowStrict(new Date(msg.sendedTime), {
                                                addSuffix: false,
                                                locale: trLocale,
                                            })
                                        }}
                                        önce
                                    </small>
                                    <v-sheet class="bg-grey100 rounded-md px-3 py-2 mb-1">
                                        <p class="text-body-1">{{ msg.text }}</p>
                                    </v-sheet>
                                </div>
                            </div>
                            <div v-if="senderID == msg.senderId" class="d-flex align-items-start gap-3 mb-1">
                                <v-avatar>
                                    <img :src="fromUser.profileImageUrl" alt="pro" width="40"
                                        v-if="fromUser.profileImageUrl" />
                                    <img :src="user" width="40" v-else />
                                </v-avatar>
                                <div>
                                    <small class="text-medium-emphasis text-subtitle-2" v-if="msg.sendedTime">
                                        {{
                                            formatDistanceToNowStrict(new Date(msg.sendedTime), {
                                                addSuffix: false,
                                                locale: trLocale,
                                            })
                                        }}
                                        önce
                                    </small>
                                    <v-sheet class="bg-grey100 rounded-md px-3 py-2 mb-1">
                                        <p class="text-body-1">{{ msg.text }}</p>
                                    </v-sheet>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </perfect-scrollbar>
            <v-divider />
        </div>
        <form class="d-flex align-center pa-4" @submit.prevent="sendMessage(msg)">
            <v-textarea variant="solo" hide-details v-model="msg" color="primary" class="shadow-none" density="compact"
                placeholder="Mesaj Yaz"></v-textarea>
            <v-btn icon variant="text" type="submit" class="text-medium-emphasis send-btn" :disabled="!msg">
                <SendIcon size="20" />
            </v-btn>
        </form>
    </div>
</template>


<style lang="scss">
.h-76 {
    height: 76vh;
}

@media (max-width: 1000px) and (min-height: 600px) {
    .h-76 {
        height: 66vh;
    }
}

@media (max-width: 960px) {
    .h-76 {
        height: 70vh;
    }

    .rightpartHeight {
        height: 60vh;
    }

    .customHeight {
        height: 100vh;
    }
    .send-btn {
        margin-top: -6rem;
    }
    .right-sidebar {
        position: absolute;
        right: -320px;
        width: 320px;
        transition: 0.3s ease-in-out;
        z-index: 10;
        background-color: white;
        box-shadow: 2px 1px 20px rgba(0, 0, 0, 0.1);
    }

    .right-sidebar.show {
        right: 0;
    }

    .boxoverlay {
        position: fixed;
        height: 100%;
        width: 100%;
        z-index: 9;
        background: rgba(0, 0, 0, 0.4);
        top: 0;
        left: 0;
    }

    .HideLeftPart {
        display: none;
    }

    .customHeight {
        padding-bottom: 50px;
    }
}
@media (min-width: 1000px) {
    .h-76 {
        height: 70vh;
    }

    .rightpartHeight {
        height: 54vh;
    }

    .shadow-none {
        margin-top: -2rem;
    }

    .send-btn {
        margin-top: -6rem;
    }
}
@media (min-width: 1000px) and (min-height: 1300px) {
    .h-76 {
        height: 76vh;
    }

    .rightpartHeight {
        height: 68vh;
    }

    .shadow-none {
        margin-top: -2rem;
    }

    .send-btn {
        margin-top: -6rem;
    }
}
@media (min-width: 1200px) {
    .h-76 {
        height: 78vh;
    }

    .rightpartHeight {
        height: 64vh;
    }

    .shadow-none {
        margin-top: -2rem;
    }

    .send-btn {
        margin-top: -6rem;
    }
}
@media (max-width: 600px) {
    .h-76 {
        height: 74vh;
    }

    .rightpartHeight {
        height: 65vh;
    }
    .shadow-none {
        margin-top: -1rem;
    }

    .send-btn {
        margin-top: -6rem;
    }
    
}
.text-body-1 {
    max-width: 100%;
    word-wrap: break-word;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 1.2rem;
}
</style>
