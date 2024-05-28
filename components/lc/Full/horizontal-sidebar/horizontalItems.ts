import {
    VideoIcon,
    UserIcon,
    UsersIcon,
    UserCheckIcon,
    PercentageIcon,
    CalendarTimeIcon,
    Message2Icon,
    BookIcon,
    CodeIcon
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
        title: 'Danışanlar',
        icon: UsersIcon,
        to: '/admin/danisanlar'
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
        title: 'Yapay Zeka',
        icon: CodeIcon,
        to: '/admin/yapay-zeka',
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
        title: 'Danışanlar',
        icon: UsersIcon,
        to: '/profile/danisanlar'
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
