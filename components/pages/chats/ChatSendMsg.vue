<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import * as signalR from '@microsoft/signalr';
import { useUserStore } from '@/stores/user';

const msg = ref('');

const userStore = useUserStore();
const connection = ref<signalR.HubConnection | null>(null);
const message = ref('');
const messages = ref<string[]>([]);
const connectionStatusAlert = ref({ visible: false, message: '', color: '' });

const fromId = ref('')

onMounted(() => {
    userStore.fetchUserDoctor()
    userStore.getCurrentUser()
    connectToHub();
});

const currentUserId= computed(() => {
    if (userStore.currentUser) {
    return userStore.currentUser.id;
  } else {
    return '';
  }
});


const connectToHub = () => {
    const accessToken = localStorage.getItem('accessToken') || '';

    connection.value = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5261/message', { accessTokenFactory: (): Promise<string> => { return Promise.resolve(accessToken) } })
        .build();

    connection.value.start()
        .then(() => connectionStatusAlert.value = { visible: true, message: 'Connection successful.', color: 'success' })
        .catch(() => connectionStatusAlert.value = { visible: true, message: 'Connection failed! Please log in.', color: 'error' });

    connection.value.onclose(() => {
        connectionStatusAlert.value = { visible: true, message: 'Connection lost!', color: 'warning' };
    });

    connection.value.on('messageToUserReceived', (msg: string) => {
        messages.value.push(msg);
    });
};


function sendMessage(item: string) {
    fromId.value = userStore.fromUser.id
    
    if (connection.value && connection.value.state === signalR.HubConnectionState.Connected && item.trim() !== '') {
        connection.value.invoke('SendMessageToUser', currentUserId.value, fromId.value, item.trim())
            .then(() => {
                console.log('Message sent successfully.');
                message.value = '';
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        msg.value = '';
    } else {
        console.error('Bağlantı mevcut değil veya bağlı değil.');
    }

}
</script>

<template>
    <form class="d-flex align-center pa-4" @submit.prevent="sendMessage(msg)">
        <v-btn icon variant="text" class="text-medium-emphasis">
            <MoodSmileIcon size="24" />
        </v-btn>

        <v-text-field variant="solo" hide-details v-model="msg" color="primary" class="shadow-none" density="compact"
            placeholder="Type a Message"></v-text-field>
        <v-btn icon variant="text" type="submit" class="text-medium-emphasis" :disabled="!msg">
            <SendIcon size="20" />
        </v-btn>

        <v-btn icon variant="text" class="text-medium-emphasis">
            <PhotoIcon size="20" />
        </v-btn>
        <v-btn icon variant="text" class="text-medium-emphasis">
            <PaperclipIcon size="20" />
        </v-btn>
    </form>
</template>

<style>
.shadow-none .v-field--no-label {
    --v-field-padding-top: -7px;
}
</style>
