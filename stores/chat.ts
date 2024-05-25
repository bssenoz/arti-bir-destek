import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';
import * as signalR from '@microsoft/signalr';

interface chatType {
    chats: any;
    chatContent: any;
    messages: any[];
    allMessageInfo: [];
    fromUserId: string;
    senderID: string;
    connection: any;
    currentUser: any
}

export const useChatStore = defineStore({
    id: 'chat',
    state: (): chatType => ({
        chats: [],
        chatContent: 1,
        messages: [],
        allMessageInfo: [],
        fromUserId: '',
        senderID: '',
        connection: {},
        currentUser: {}
    }),
    getters: {

    },
    actions: {
        async connectToHub(currentUser: any) {
            // if(this.connection.state != "Connecting")  
            console.log("hub")
            const accessToken = localStorage.getItem('accessToken') || '';

            const connection = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5261/message', { accessTokenFactory: (): Promise<string> => Promise.resolve(accessToken) })
                .build();

            connection.start()
                .then(() => {
                    console.log('Connection successful.');
                })
                .catch(error => {
                    console.error('Connection failed:', error);
                });

            connection.onclose(() => {
                console.warn('Connection lost!');
            });

            console.log("current: ", currentUser)
            connection.on('messageToUserReceived', (senderID: string, receiverID: string, msg: string) => {
                console.log('Message received:', msg);

                const newMessage = {
                    id: uniqueId(),
                    text: msg,
                    type: 'text',
                    attachments: [],
                    createdAt: sub(new Date(), { seconds: 1 }),
                    senderId: senderID,
                    receiverId: receiverID
                };

                this.currentUser = currentUser;
                this.messages.push(newMessage);
                console.log("new message: ", newMessage)
            });

            this.connection = connection;
            console.log("conn: ", this.connection)
        },
        async sendMessage(item: string, currentUserId: any) {
            const fromId = this.fromUserId;

            if (this.connection && this.connection.state === signalR.HubConnectionState.Connected && item.trim() !== '') {
                try {

                    await this.connection.invoke('SendMessageToUser', currentUserId, fromId, item.trim());
                    console.log('Message sent successfully.');

                    const newMessage = {
                        id: uniqueId(),
                        text: item,
                        type: 'text',
                        attachments: [],
                        createdAt: sub(new Date(), { seconds: 1 }),
                        senderId: currentUserId,
                        receiverId: fromId
                    };

                    this.messages.push(newMessage);
                    console.log("new message: ", newMessage)
                    this.fetchMessageInfo(currentUserId)

                } catch (error) {
                    console.error('Error sending message:', error);
                }
            } else {
                console.error('Connection is not available or not connected.');
            }
        },

        async fetchMessages(chatUsers: any) {
            try {
                console.log("chatusers: ", chatUsers)
                const response = await axios.post('http://localhost:5261/api/Message/GetMessages', chatUsers, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                console.log(response.data);
                this.messages = response.data
            } catch (error) {
                this.messages = []
            }
        },
        async fromUserChange(id: string) {
            this.fromUserId = id
            console.log("this: ", this.fromUserId)
        },
        async fetchMessageInfo(userId: any) {
            const response = await axios.get(`http://localhost:5261/api/Message/GetMessagedUsers?userId=${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            });
            console.log(response.data);
            this.allMessageInfo = response.data
        },
        async updateStatus(chatUsers: any) {
            console.log("chatuser: ", chatUsers)
            const response = await axios.patch('http://localhost:5261/api/Message/MessageChangeStatus', chatUsers, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            });

            this.fetchMessageInfo(chatUsers.receiverId)
        },

    }
});
