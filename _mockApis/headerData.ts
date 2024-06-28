import type { profileType, appsLinkType, quickLinksType,searchType } from '@/types/HeaderTypes'

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
        avatar: proUser3,
        title: 'Yardım',
        subtitle: 'Kullanım Kılavuzu',
        href: '/profile/kilavuz'
    },
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


export {profileDD, quickLink };

