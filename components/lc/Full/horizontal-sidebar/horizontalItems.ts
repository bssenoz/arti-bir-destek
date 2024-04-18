import {
    VideoIcon,
    UsersIcon,
    UserCheckIcon,
    PercentageIcon
    
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
        title: 'Videolar',
        icon: VideoIcon,
        to: '/admin/video'
    },
    {
        title: 'Video İstatistikleri',
        icon: PercentageIcon,
        to: '/admin/video/istatistikler'
    },
];

export default horizontalItems;
