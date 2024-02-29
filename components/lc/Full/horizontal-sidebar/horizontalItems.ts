import {
    CircleIcon,
    HomeIcon,
    ClipboardIcon,
    AlertCircleIcon,
    SettingsIcon,
    LoginIcon,
    UserPlusIcon,
    RotateIcon,
    ZoomCodeIcon,
    FileDescriptionIcon,
    BorderAllIcon,
    AppsIcon,
    EyeTableIcon,
    ColumnsIcon,
    SortAscendingIcon,
    PageBreakIcon,
    FilterIcon,
    BoxModelIcon,
    ServerIcon,
    BrandAirtableIcon,
    RowInsertBottomIcon
    
} from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    divider?: boolean;
    chip?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    subCaption?: string;
    class?: string;
    extraclass?: string;
    type?: string;
}

const horizontalItems: menu[] = [
    {
        title: 'Mesaj',
        icon: BrandAirtableIcon,
        to: '/profile/chat'
    },
    {
        title: 'Profil',
        icon: BrandAirtableIcon,
        to: '/profile'
    },
    {
        title: 'Ayarlar',
        icon: BrandAirtableIcon,
        to: '/profile/settings'
    },
    {
        title: 'Randevu',
        icon: BrandAirtableIcon,
        to: '/profile/randevu'
    },
    {
        title: 'Videolar',
        icon: BrandAirtableIcon,
        to: '#',
        children: [
            {
                title: 'Video İzle',
                icon: BoxModelIcon,
                to: '/profile/video'
            },
            {
                title: 'Video Yüzdelikleri',
                icon: ServerIcon,
                to: '/profile/video/viewing-rate'
            },
        ]
    },

];

export default horizontalItems;
