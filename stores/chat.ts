import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { uniqueId } from 'lodash';
import { sub } from 'date-fns';

interface chatType {
    chats: any;
    chatContent: any;
    messages: [];
    allMessageInfo: [];
    fromUser: any;
}

export const useChatStore = defineStore({
    id: 'chat',
    state: (): chatType => ({
        chats: [],
        chatContent: 1,
        messages: [],
        allMessageInfo: [],
        fromUser: {},
    }),
    getters: {
        // Get Chats from Getters
        // getChats(state) {
        //     return state.chats;
        // }
    },
    actions: {
        // Fetch Chat from action
        async fetchChats() {
            try {
                const data = await axios.get('/api/data/chat/ChatData');
                this.chats = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async fetchMessages(chatUsers: any) {
           console.log("chatusers: ",chatUsers)
            const response = await axios.post('http://localhost:5261/api/Message/GetMessages', chatUsers);
            console.log(response.data);
            this.messages = response.data
        },
        async fromUserChange(newFromUser: any) {
            this.fromUser = newFromUser
            console.log("this: ", this.fromUser)
        },
        async fetchMessageInfo(userId: any) {
            const response = await axios.get(`http://localhost:5261/api/Message/GetMessagedUsers?userId=${userId}`);
            console.log(response.data);
            this.allMessageInfo = response.data
        },
        async updateStatus(chatUsers: any) {
            const response = await axios.patch('http://localhost:5261/api/Message/MessageChangeStatus', chatUsers);
        },
        
        //select chat
        SelectChat(itemID: number) {
            this.chatContent = itemID;
        },
        sendMsg(itemID: number, item: string) {
            const newMessage = {
                id: itemID,
                msg: item,
                type: 'text',
                attachments: [],
                createdAt: sub(new Date(), { seconds: 1 }),
                senderId: itemID
            };

            this.chats = this.chats.filter((chat: any) => {
                return chat.id === itemID
                    ? {
                          ...chat,
                          ...chat.chatHistory.push(newMessage)
                      }
                    : chat;
            });
        },
        
    }
});
