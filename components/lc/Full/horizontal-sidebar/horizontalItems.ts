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
        title: 'Videolar',
        icon: BrandAirtableIcon,
        to: '#',
        children: [
            {
                title: 'Video İzle',
                icon: BoxModelIcon,
                to: '/video'
            },
            {
                title: 'Video Yüzdelikleri',
                icon: ServerIcon,
                to: '/video/viewing-rate'
            },
        ]
    },
    {
        title: 'Dashboard',
        icon: HomeIcon,
        to: '#',
        children: [
            {
                title: 'Modern',
                icon: CircleIcon,
                to: '/dashboards/modern'
            },
            {
                title: 'Ecommerce',
                icon: CircleIcon,
                to: '/dashboards/ecommerce'
            }
        ]
    },
    {
        title: 'Apps',
        icon: AppsIcon,
        to: '#',
        children: [
            {
                title: 'Chats',
                icon: CircleIcon,
                to: '/apps/chats'
            },
            {
                title: 'Blog',
                icon: CircleIcon,
                to: '/',
                children: [
                    {
                        title: 'Posts',
                        icon: CircleIcon,
                        to: '/apps/blog/posts'
                    },
                    {
                        title: 'Detail',
                        icon: CircleIcon,
                        to: '/apps/blog/early-black-friday-amazon-deals-cheap-tvs-headphones'
                    }
                ]
            },
            {
                title: 'E-Commerce',
                icon: CircleIcon,
                to: '/ecommerce/',
                children: [
                    {
                        title: 'Shop',
                        icon: CircleIcon,
                        to: '/apps/ecommerce/products'
                    },
                    {
                        title: 'Detail',
                        icon: CircleIcon,
                        to: '/apps/ecommerce/product/detail/1'
                    },
                    {
                        title: 'List',
                        icon: CircleIcon,
                        to: '/apps/ecommerce/productlist'
                    },
                    {
                        title: 'Checkout',
                        icon: CircleIcon,
                        to: '/apps/ecommerce/checkout'
                    }
                ]
            },
            {
                title: 'User Profile',
                icon: CircleIcon,
                to: '/',
                children: [
                    {
                        title: 'Profile',
                        icon: CircleIcon,
                        to: '/apps/user/profile'
                    },
                    {
                        title: 'Followers',
                        icon: CircleIcon,
                        to: '/apps/user/profile/followers'
                    },
                    {
                        title: 'Friends',
                        icon: CircleIcon,
                        to: '/apps/user/profile/friends'
                    },
                    {
                        title: 'Gallery',
                        icon: CircleIcon,
                        to: '/apps/user/profile/gallery'
                    }
                ]
            },
            {
                title: 'Notes',
                icon: CircleIcon,
                to: '/apps/notes'
            },
            {
                title: 'Calendar',
                icon: CircleIcon,
                to: '/apps/calendar'
            }
        ]
    },
    {
        title: 'Pages',
        icon: ClipboardIcon,
        to: '#',
        children: [
            {
                title: 'Pricing',
                icon: CircleIcon,
                to: '/theme-pages/pricing'
            },
            {
                title: 'Account Setting',
                icon: CircleIcon,
                to: '/theme-pages/account-settings'
            },
            {
                title: 'FAQ',
                icon: CircleIcon,
                to: '/theme-pages/faq'
            },
            {
                title: 'Widget',
                icon: CircleIcon,
                to: '/widget-card',
                children: [
                    {
                        title: 'Cards',
                        icon: CircleIcon,
                        to: '/widgets/cards'
                    },
                    {
                        title: 'Banners',
                        icon: CircleIcon,
                        to: '/widgets/banners'
                    },
                    {
                        title: 'Charts',
                        icon: CircleIcon,
                        to: '/widgets/charts'
                    }
                ]
            },
            {
                title: 'UI',
                icon: CircleIcon,
                to: '#',
                children: [
                    {
                        title: 'Alert',
                        icon: CircleIcon,
                        to: '/ui-components/alert'
                    },
                    {
                        title: 'Accordion',
                        icon: CircleIcon,
                        to: '/ui-components/accordion'
                    },
                    {
                        title: 'Avatar',
                        icon: CircleIcon,
                        to: '/ui-components/avatar'
                    },
                    {
                        title: 'Chip',
                        icon: CircleIcon,
                        to: '/ui-components/chip'
                    },
                    {
                        title: 'Dialog',
                        icon: CircleIcon,
                        to: '/ui-components/dialogs'
                    },
                    {
                        title: 'List',
                        icon: CircleIcon,
                        to: '/ui-components/list'
                    },
                    {
                        title: 'Menus',
                        icon: CircleIcon,
                        to: '/ui-components/menus'
                    },
                    {
                        title: 'Rating',
                        icon: CircleIcon,
                        to: '/ui-components/rating'
                    },
                    {
                        title: 'Tabs',
                        icon: CircleIcon,
                        to: '/ui-components/tabs'
                    },
                    {
                        title: 'Tooltip',
                        icon: CircleIcon,
                        to: '/ui-components/tooltip'
                    },
                    {
                        title: 'Typography',
                        icon: CircleIcon,
                        to: '/ui-components/typography'
                    }
                ]
            },
            {
                title: 'Charts',
                icon: CircleIcon,
                to: '#',
                children: [
                    {
                        title: 'Line',
                        icon: CircleIcon,
                        to: '/charts/line-chart'
                    },
                    {
                        title: 'Gredient',
                        icon: CircleIcon,
                        to: '/charts/gredient-chart'
                    },
                    {
                        title: 'Area',
                        icon: CircleIcon,
                        to: '/charts/area-chart'
                    },
                    {
                        title: 'Candlestick',
                        icon: CircleIcon,
                        to: '/charts/candlestick-chart'
                    },
                    {
                        title: 'Column',
                        icon: CircleIcon,
                        to: '/charts/column-chart'
                    },
                    {
                        title: 'Doughnut & Pie',
                        icon: CircleIcon,
                        to: '/charts/doughnut-pie-chart'
                    },
                    {
                        title: 'Radialbar & Radar',
                        icon: CircleIcon,
                        to: '/charts/radialbar-chart'
                    }
                ]
            },
            {
                title: 'Auth',
                icon: CircleIcon,
                to: '#',
                children: [
                    {
                        title: 'Error',
                        icon: AlertCircleIcon,
                        to: '/auth/404'
                    },
                    {
                        title: 'Maintenance',
                        icon: SettingsIcon,
                        to: '/auth/maintenance'
                    },
                    {
                        title: 'Login',
                        icon: LoginIcon,
                        to: '#',
                        children: [
                            {
                                title: 'Side Login',
                                icon: CircleIcon,
                                to: '/auth/login'
                            },
                            {
                                title: 'Boxed Login',
                                icon: CircleIcon,
                                to: '/auth/login2'
                            }
                        ]
                    },
                    {
                        title: 'Register',
                        icon: UserPlusIcon,
                        to: '#',
                        children: [
                            {
                                title: 'Side Register',
                                icon: CircleIcon,
                                to: '/auth/register'
                            },
                            {
                                title: 'Boxed Register',
                                icon: CircleIcon,
                                to: '/auth/register2'
                            }
                        ]
                    },
                    {
                        title: 'Şifremi Unuttum',
                        icon: RotateIcon,
                        to: '#',
                        children: [
                            {
                                title: 'Side Şifremi Unuttum',
                                icon: CircleIcon,
                                to: '/auth/forgot-password'
                            },
                            {
                                title: 'Boxed Şifremi Unuttum',
                                icon: CircleIcon,
                                to: '/auth/forgot-password2'
                            }
                        ]
                    },
                    {
                        title: 'Two Steps',
                        icon: ZoomCodeIcon,
                        to: '#',
                        children: [
                            {
                                title: 'Side Two Steps',
                                icon: SettingsIcon,
                                to: '/auth/two-step'
                            },
                            {
                                title: 'Boxed Two Steps',
                                icon: SettingsIcon,
                                to: '/auth/two-step2'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        title: 'Forms',
        icon: FileDescriptionIcon,
        to: '#',
        children: [
            {
                title: 'Form Elements',
                icon: CircleIcon,
                to: '/components/',
                children: [
                    {
                        title: 'Autocomplete',
                        icon: CircleIcon,
                        to: '/forms/form-elements/autocomplete'
                    },
                    {
                        title: 'Combobox',
                        icon: CircleIcon,
                        to: '/forms/form-elements/combobox'
                    },
                    {
                        title: 'Button',
                        icon: CircleIcon,
                        to: '/forms/form-elements/button'
                    },
                    {
                        title: 'Checkbox',
                        icon: CircleIcon,
                        to: '/forms/form-elements/checkbox'
                    },
                    {
                        title: 'Custom Inputs',
                        icon: CircleIcon,
                        to: '/forms/form-elements/custominputs'
                    },
                    {
                        title: 'File Inputs',
                        icon: CircleIcon,
                        to: '/forms/form-elements/fileinputs'
                    },
                    {
                        title: 'Radio',
                        icon: CircleIcon,
                        to: '/forms/form-elements/radio'
                    },
                    {
                        title: 'Select',
                        icon: CircleIcon,
                        to: '/forms/form-elements/select'
                    },
                    {
                        title: 'Date Time',
                        icon: CircleIcon,
                        to: '/forms/form-elements/date-time'
                    },
                    {
                        title: 'Slider',
                        icon: CircleIcon,
                        to: '/forms/form-elements/slider'
                    },
                    {
                        title: 'Switch',
                        icon: CircleIcon,
                        to: '/forms/form-elements/switch'
                    }
                ]
            },
            {
                title: 'Form Layout',
                icon: CircleIcon,
                to: '/forms/form-layouts'
            },
            {
                title: 'Form Horizontal',
                icon: CircleIcon,
                to: '/forms/form-horizontal'
            },
            {
                title: 'Form Vertical',
                icon: CircleIcon,
                to: '/forms/form-vertical'
            },
            {
                title: 'Form Custom',
                icon: CircleIcon,
                to: '/forms/form-custom'
            },
            {
                title: 'Form Validation',
                icon: CircleIcon,
                to: '/forms/form-validation'
            }
        ]
    },
    {
        title: 'Tables',
        icon: BorderAllIcon,
        to: '#',
        children: [
            {
                title: 'Basic Table',
                icon: CircleIcon,
                to: '/tables/basic'
            },
            {
                title: 'Dark Table',
                icon: CircleIcon,
                to: '/tables/dark'
            },
            {
                title: 'Density Table',
                icon: CircleIcon,
                to: '/tables/density'
            },
            {
                title: 'Fixed Header Table',
                icon: CircleIcon,
                to: '/tables/fixed-header'
            },
            {
                title: 'Height Table',
                icon: CircleIcon,
                to: '/tables/height'
            },
            {
                title: "Editable Table",
                icon: CircleIcon,
                to: "/tables/editable",
              },
        ]
    },
    {
        title: 'Data Tables',
        icon: BrandAirtableIcon,
        to: '#',
        children: [
            {
                title: 'Basic Table',
                icon: ColumnsIcon,
                to: '/datatables/basic'
            },
            {
                title: 'Header Table',
                icon: RowInsertBottomIcon,
                to: '/datatables/headers'
            },
            {
                title: 'Selection Table',
                icon: EyeTableIcon,
                to: '/datatables/Selectable'
            },
            {
                title: 'Sorting Table',
                icon: SortAscendingIcon,
                to: '/datatables/sorting'
            },
            {
                title: 'Pagination Table',
                icon: PageBreakIcon,
                to: '/datatables/pagination'
            },
            {
                title: 'Filtering Table',
                icon: FilterIcon,
                to: '/datatables/filtering'
            },
            {
                title: 'Grouping Table',
                icon: BoxModelIcon,
                to: '/datatables/grouping'
            },
            {
                title: 'Table Slots',
                icon: ServerIcon,
                to: '/datatables/slots'
            },
        ]
    }
];

export default horizontalItems;
