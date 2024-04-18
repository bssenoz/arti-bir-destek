<script setup lang="ts">
import { ref, computed, onMounted, onUpdated, nextTick } from 'vue';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';
import { formatDistanceToNowStrict } from 'date-fns';
import trLocale from 'date-fns/locale/tr';
import user from '/images/profile/user.png';

const msg = ref('');
const chatStore = useChatStore();
const userStore = useUserStore();

onMounted(async () => {
    await userStore.getCurrentUser();
    userStore.fetchUserDoctor();
    userStore.getCurrentUser();
});

const fromUser = computed(() => {
    return userStore.user;
})

const messages = computed(() => {
    return chatStore.messages;
})

const currentUser = computed(() => {
    return userStore.currentUser;
})

const senderID = computed(() => {
    return chatStore.senderID;
})

function sendMessage(item: string) {
    chatStore.sendMessage(item, currentUser.value.id);
    msg.value = '';
}

const scrollToBottom = () => {
    nextTick(() => {
        const chatList = document.getElementById('chat-list');
        if (chatList) {
            chatList.scrollTop = chatList.scrollHeight;
        }
    });
};

onMounted(scrollToBottom);

onUpdated(scrollToBottom)
</script>

<template>
    <div v-if="fromUser.id" class="customHeight">
        <div style="height: 76vh">
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
            <!---Chat History-->
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
                                        önce</small>

                                    <v-sheet class="bg-grey100 rounded-md px-3 py-2 mb-1">
                                        <p class="text-body-1">{{ msg.text }}</p>
                                    </v-sheet>

                                </div>
                            </div>
                            <div v-if="senderID == msg.senderId" class="d-flex align-items-start gap-3 mb-1">
                                <!---User Avatar-->
                                <v-avatar>
                                    <img :src="fromUser.profileImageUrl" alt="pro" width="40" v-if="fromUser.profileImageUrl" />
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
        </div>
        <v-divider />
        <!---Chat send-->
        <form class="d-flex align-center pa-4" @submit.prevent="sendMessage(msg)">
            <v-btn icon variant="text" class="text-medium-emphasis">
                <MoodSmileIcon size="24" />
            </v-btn>

            <v-text-field variant="solo" hide-details v-model="msg" color="primary" class="shadow-none"
                density="compact" placeholder="Mesaj Yaz"></v-text-field>
            <v-btn icon variant="text" type="submit" class="text-medium-emphasis" :disabled="!msg">
                <SendIcon size="20" />
            </v-btn>

            <!-- <v-btn icon variant="text" class="text-medium-emphasis">
                <PhotoIcon size="20" />
            </v-btn>
            <v-btn icon variant="text" class="text-medium-emphasis">
                <PaperclipIcon size="20" />
            </v-btn> -->
        </form>
    </div>
</template>
<style lang="scss">
.shadow-none .v-field--no-label {
    --v-field-padding-top: -7px;
}

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
.text-body-1 {
  max-width: 400px;
}
</style>
