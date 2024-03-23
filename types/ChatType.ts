type attachType = {
    icon?: string;
    file?: string;
    fileSize?: string;
};

type chatHistoryType = {
    createdAt?: any;
    msg: string;
    senderId: number | string;
    type: string;
    attachment: attachType[];
    id: string;
};

export type ChatType = {
    id: number;
    name: string;
    status: string;
    thumb: string;
    recent: boolean;
    chatHistory: chatHistoryType[];
};

export type ChatUsersType = {
    senderId: string;
    receiverId: string;
}

export type ChatsUserType = {
    user: {
        receiverId: string;
        receiverName: string;
        receiverSurname: string;
        receiverProfileImageUrl: null;
    },
    lastMessage: {
        senderId: string;
        text: string;
        sendedTime : string;
    },
    unreadMessageCount: number; 
}
