import {
    VideoIcon,
    UserIcon,
    UsersIcon,
    UserCheckIcon,
    PercentageIcon,
    CalendarTimeIcon,
    Message2Icon,
    BookIcon
} from 'vue-tabler-icons';

export interface Menu {
    children?: any;
    header?: any;
    title?: string;
    icon?: any;
    to?: string;
}

const horizontalItemsAdmin: Menu[] = [
    {
        title: 'Hastalar',
        icon: UsersIcon,
        to: '/admin/hastalar'
    },
    {
        title: 'Danışmanlar',
        icon: UserCheckIcon,
        to: '/admin/danismanlar'
    },
    {
        title: 'Randevular',
        icon: CalendarTimeIcon,
        to: '/admin/randevular'
    },
    {
        title: 'Videolar',
        icon: VideoIcon,
        to: '/admin/video'
    },
    {
        title: 'Video İstatistikleri',
        icon: PercentageIcon,
        to: '/admin/video/istatistikler'
    },
    {
        title: 'Danışman Ünvanları',
        icon: UserCheckIcon,
        to: '/admin/unvan',
    },
    {
        title: 'Kullanım Kılavuzu',
        icon: BookIcon,
        to: '/admin/kilavuz',
    },
];

const horizontalItemsDoctor: Menu[] = [
    {
        title: 'Profilim',
        icon: UserIcon,
        to: '/profile'
    },
    {
        title: 'Hastalarım',
        icon: UsersIcon,
        to: '/profile/hastalar'
    },
    {
        title: 'Mesaj',
        icon: Message2Icon,
        to: '/profile/mesaj'
    },
    {
        title: 'Randevularım',
        icon: CalendarTimeIcon,
        to: '/profile/randevu/randevularim'
    },
    {
        title: 'Takvim',
        icon: CalendarTimeIcon,
        to: '/profile/randevu/takvim'
    },
    {
        title: 'Videolar',
        icon: VideoIcon,
        to: '/profile/video'
    },
];

const horizontalItemsPatient: Menu[] = [
    {
        title: 'Profilim',
        icon: UserIcon,
        to: '/profile'
    },
    {
        title: 'Mesaj',
        icon: Message2Icon,
        to: '/profile/mesaj'
    },
    {
        title: 'Randevularım',
        icon: CalendarTimeIcon,
        to: '/profile/randevu/randevularim'
    },
    {
        title: 'Videolar',
        icon: VideoIcon,
        to: '/profile/video'
    },
    {
        title: 'Video İstatistiklerim',
        icon: PercentageIcon,
        to: '/profile/video/istatistikler'
    },
];

export { horizontalItemsAdmin, horizontalItemsDoctor, horizontalItemsPatient };
