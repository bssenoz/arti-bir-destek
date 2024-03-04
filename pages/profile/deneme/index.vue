<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <h2>Chat Room</h2>
                <v-textarea v-model="message" label="Message" outlined rows="3"></v-textarea>
                <v-btn @click="sendMessage" color="primary">Send Message</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <h2>Doctors</h2>
                <ul>
                    <li v-for="(doctor, index) in doctors" :key="index">
                        {{ doctor }}
                        <v-btn @click="selectDoctor(doctor)">Select</v-btn>
                    </li>
                </ul>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div class="message-container">
                    Mesaj Container
                    <v-alert v-for="(message, index) in messages" :key="index" outlined>{{ message }}</v-alert>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import * as signalR from '@microsoft/signalr';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const connection = ref<signalR.HubConnection | null>(null);
const message = ref('');
const messages = ref<string[]>([]);
const connectionStatusAlert = ref({ visible: false, message: '', color: '' });

const userId = ref('')
const fromId = ref('')

onMounted(() => {
    userStore.fetchUserDoctor()
    connectToHub();
});

const doctors = computed(() => userStore.doctors)

const connectToHub = () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    console.log("acces::: ", accessToken)
    
    connection.value = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:5261/message', { accessTokenFactory: (): Promise<string> => {return Promise.resolve(accessToken)} })
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

const sendMessage = () => {
    if (connection.value && connection.value.state === signalR.HubConnectionState.Connected && message.value.trim() !== '') {
        connection.value.invoke('SendMessageToUser', userId.value, fromId.value, message.value.trim())
            .then(() => {
                console.log('Message sent successfully.');
                message.value = ''; 
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    } else {
        console.error('Bağlantı mevcut değil veya bağlı değil.');
    }
};

const selectDoctor = (doctor?: any) => {
    console.log('Selected doctor ID:', doctor);
    userId.value = userStore.userId
    userStore.fromUserChange(doctor)
    console.log("userid: ",userId.value)
    fromId.value = userStore.fromUser.id
};

</script>

<style scoped>
.message-container {
    margin-top: 10px;
}
</style>