// project imports
import mock from './mockAdapter';

import type { notificationType, profileType, appsLinkType, quickLinksType,searchType } from '@/types/HeaderTypes'
// 
// Notification
// 
import user1 from '/images/profile/user-1.jpg';
import user2 from '/images/profile/user-2.jpg';
import user3 from '/images/profile/user-3.jpg';
import user4 from '/images/profile/user-4.jpg';
import user5 from '/images/profile/user-5.jpg';

const notifications:notificationType[] = [
    {
        avatar: user1,
        title: 'Roman Joined the Team!',
        subtitle: 'Congratulate him'
    },
    {
        avatar: user2,
        title: 'New message received',
        subtitle: 'Salma sent you new message'
    },
    {
        avatar: user3,
        title: 'New Payment received',
        subtitle: 'Check your earnings'
    },
    {
        avatar: user4,
        title: 'Jolly completed tasks',
        subtitle: 'Assign her new tasks'
    },
    {
        avatar: user5,
        title: 'New Payment received',
        subtitle: 'Check your earnings'
    },
    {
        avatar: user1,
        title: 'Roman Joined the Team!',
        subtitle: 'Congratulate him'
    }
];

// 
// Profile 
// 
import proUser1 from '/images/svgs/icon-account.svg';
import proUser2 from '/images/svgs/icon-inbox.svg';
import proUser3 from '/images/svgs/icon-tasks.svg';
const profileDD: profileType[] = [
    {
        avatar: proUser1,
        title: 'Profilim',
        subtitle: 'Hesap Ayarları',
        href: '/profile'
    },
    {
        avatar: proUser2,
        title: 'Gelen Kutum',
        subtitle: 'Mesajlar',
        href: '/profile/chat'
    },
    // {
    //     avatar: proUser3,
    //     title: 'My Tasks',
    //     subtitle: 'To-do and Daily tasks',
    //     href: '/'
    // },
    
];


// 
// AppsLink
// 

import img3 from '/images/svgs/icon-dd-invoice.svg';
import img4 from '/images/svgs/icon-dd-date.svg';
import img5 from '/images/svgs/icon-dd-mobile.svg';
import img6 from '/images/svgs/icon-dd-lifebuoy.svg';
import img7 from '/images/svgs/icon-dd-message-box.svg';
import img8 from '/images/svgs/icon-dd-application.svg';
const appsLink: appsLinkType[] = [
    {
        avatar: img3,
        title: 'User Profile App',
        subtext: 'Get profile details',
        href: '/apps/user/profile'
    },
    {
        avatar: img4,
        title: 'Calendar App',
        subtext: 'Get dates',
        href: '/apps/calendar'
    },
    {
        avatar: img5,
        title: 'Contact Application',
        subtext: '2 Unsaved Contacts',
        href: '/apps/contacts'
    },
    {
        avatar: img7,
        title: 'Email App',
        subtext: 'Get new emails',
        href: '/'
    },
    {
        avatar: img8,
        title: 'Notes Application',
        subtext: 'To-do and Daily tasks',
        href: '/apps/notes'
    }
];

// 
// Quick Links
// 
const quickLink: quickLinksType[] = [
    {
        title: 'Randevu Al',
        href: '/profile/randevu/randevu-al'
    },
    {
        title: 'Randevularım',
        href: '/profile/randevu/randevularim'
    },
];

// 
// Search Data
// 
const searchSugg: searchType[] = [
    {
        title: 'Modern',
        href: '/dashboards/modern'
    },
    {
        title: 'Contacts',
        href: '/apps/contacts'
    },

    {
        title: 'Notes',
        href: '/apps/notes'
    },
];

export { notifications, profileDD, appsLink, quickLink, searchSugg };

