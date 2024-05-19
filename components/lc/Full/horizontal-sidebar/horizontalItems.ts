import {
    VideoIcon,
    UsersIcon,
    UserCheckIcon,
    PercentageIcon,
    CalendarTimeIcon
    
} from 'vue-tabler-icons';

export interface menu {
    children: any;
    header: any;
    title?: string;
    icon?: any;
    to?: string;
}

const horizontalItems: menu[] = [
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
        title: "Danışman Ünvanları",
        icon: UserCheckIcon,
        to:  "/admin/unvan",
    },
];

export default horizontalItems;
