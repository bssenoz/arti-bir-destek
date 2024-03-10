import mock from '../../mockAdapter';
import { Chance } from 'chance';
import type { ChatType } from '@/types/ChatType';
import { sub } from 'date-fns';
import { uniqueId } from 'lodash';

import user1 from '/images/profile/user-2.jpg';
import user2 from '/images/profile/user-3.jpg';
import user3 from '/images/profile/user-4.jpg';
import user4 from '/images/profile/user-5.jpg';
import user5 from '/images/profile/user-6.jpg';
import user10 from '/images/profile/user-10.jpg';


import background1 from '/images/blog/blog-img5.jpg';

import adobe from '/images/chat/icon-adobe.svg';
import chrome from '/images/chat/icon-chrome.svg';
import figma from '/images/chat/icon-figma.svg';
import java from '/images/chat/icon-javascript.svg';
import zip from '/images/chat/icon-zip-folder.svg';

const chance = new Chance();

// const ChatData: ChatTypes[] = [
const ChatData: ChatType[] = [
    {
        id: 1,
        name: 'Uzman Sevgi Köroğlu',
        status: 'online',
        thumb: user1,
        recent: false,
        chatHistory: [
            {
                createdAt: sub(new Date(), { minutes: 6 }),
                msg: 'merhaba',
                senderId: uniqueId(),
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 6 }),
                msg: 'nasılsınız?',
                senderId: uniqueId(),
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 5 }),
                msg: 'iyiyim teşekkür ederim',
                senderId: 1,
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 5 }),
                msg: 'siz nasılsınız?',
                senderId: 1,
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 5 }),
                msg: 'ben de iyiyim sağolun',
                senderId: uniqueId(),
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 5 }),
                msg: 'bugün 12 gibi online görüşelim mi?',
                senderId: uniqueId(),
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            // {
            //     createdAt: sub(new Date(), { minutes: 5 }),
            //     msg: background1,
            //     senderId: uniqueId(),
            //     type: 'img',
            //     attachment: [],
            //     id: uniqueId()
            // }
        ]
    },
    {
        id: 2,
        name: 'Uzman (Bursiyer Psikolog)',
        status: 'away',
        thumb: user10,
        recent: true,
        chatHistory: [
            {
                createdAt: sub(new Date(), { hours: 1 }),
                msg: chance.sentence({ words: 5 }),
                senderId: uniqueId(),
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 30 }),
                msg: chance.sentence({ words: 10 }),
                senderId: uniqueId(),
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 6 }),
                msg: chance.sentence({ words: 5 }),
                senderId: 2,
                type: 'text',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { minutes: 5 }),
                msg: background1,
                senderId: 2,
                type: 'img',
                attachment: [],
                id: uniqueId()
            },
            {
                createdAt: sub(new Date(), { hours: 17 }),
                msg: 'iyi günler',
                senderId: 'uniqueId()',
                type: 'text',
                attachment: [],
                id: uniqueId()
            }
        ]
    },
    // {
    //     id: 3,
    //     name: 'Uzman Mete Kaldırım',
    //     status: 'busy',
    //     thumb: user3,
    //     recent: false,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [
    //                 { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
    //                 { icon: zip, file: 'custom.js', fileSize: '2MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 30 }),
    //             msg: chance.sentence({ words: 10 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // },
    // {
    //     id: 4,
    //     name: 'Uzman (Bursiyer Psikolog)',
    //     status: 'offline',
    //     thumb: user4,
    //     recent: true,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 1 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 4,
    //             type: 'text',
    //             attachment: [
    //                 { icon: java, file: 'work-project.zip', fileSize: '20MB' },
    //                 { icon: zip, file: 'custom.js', fileSize: '2MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 11 }),
    //             msg: background1,
    //             senderId: uniqueId(),
    //             type: 'img',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 4,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 1 }),
    //             msg: chance.sentence({ words: 7 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // },
    // {
    //     id: 5,
    //     name: 'Uzman Emine Cincioğlu',
    //     status: 'online',
    //     thumb: user5,
    //     recent: true,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 1 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [
    //                 { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
    //                 { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' },
    //                 { icon: figma, file: 'about-us.htmlf', fileSize: '1KB' },
    //                 { icon: java, file: 'work-project.zip', fileSize: '20MB' },
    //                 { icon: zip, file: 'custom.js', fileSize: '2MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 30 }),
    //             msg: chance.sentence({ words: 10 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: uniqueId(),
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 5 }),
    //             msg: background1,
    //             senderId: 5,
    //             type: 'img',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 5 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 5,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // },
    // {
    //     id: 6,
    //     name: 'Uzman Fatma Yılmaz',
    //     status: 'busy',
    //     thumb: user1,
    //     recent: false,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [
    //                 { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' },
    //                 { icon: java, file: 'work-project.zip', fileSize: '20MB' },
    //                 { icon: zip, file: 'custom.js', fileSize: '2MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 5 }),
    //             msg: background1,
    //             senderId: uniqueId(),
    //             type: 'img',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 5 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 2 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 6,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // },
    // {
    //     id: 7,
    //     name: 'Uzman Ali Akar',
    //     status: 'away',
    //     thumb: user2,
    //     recent: true,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [
    //                 { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
    //                 { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 1 }),
    //             msg: chance.sentence({ words: 10 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 15 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 7,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 7,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // },
    // {
    //     id: 8,
    //     name: 'Uzman Fatih Yörükoğlu',
    //     status: 'offline',
    //     thumb: user3,
    //     recent: false,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [
    //                 { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
    //                 { icon: java, file: 'work-project.zip', fileSize: '20MB' },
    //                 { icon: zip, file: 'custom.js', fileSize: '2MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 1 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 8,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // },
    // {
    //     id: 9,
    //     name: 'Uzman (Bursiyer Psikolog)',
    //     status: 'online',
    //     thumb: user4,
    //     recent: false,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [
    //                 { icon: java, file: 'work-project.zip', fileSize: '20MB' },
    //                 { icon: zip, file: 'custom.js', fileSize: '2MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 8 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 8 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 5 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 9,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 2 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 9,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // },
    // {
    //     id: 10,
    //     name: 'Uzman Çiğdem Şen',
    //     status: 'online',
    //     thumb: user5,
    //     recent: false,
    //     chatHistory: [
    //         {
    //             createdAt: sub(new Date(), { hours: 10 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 1,
    //             type: 'text',
    //             attachment: [
    //                 { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
    //                 { icon: zip, file: 'custom.js', fileSize: '2MB' }
    //             ],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 11 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { hours: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 3,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         },
    //         {
    //             createdAt: sub(new Date(), { minutes: 6 }),
    //             msg: chance.sentence({ words: 5 }),
    //             senderId: 10,
    //             type: 'text',
    //             attachment: [],
    //             id: uniqueId()
    //         }
    //     ]
    // }
];

mock.onGet('/api/data/chat/ChatData').reply(() => {
    console.log("onget: ",ChatData)
    return [200, ChatData];
});

export default ChatData;
