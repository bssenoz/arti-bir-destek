import {
  CircleOffIcon,
  BoxMultipleIcon,
  AppsIcon,
  FileTextIcon,
  FileDotsIcon,
  FilesIcon,
  EditIcon,
  BorderAllIcon,
  BorderHorizontalIcon,
  BorderInnerIcon,
  BorderTopIcon,
  BorderVerticalIcon,
  BoxIcon,
  AlertCircleIcon,
  LoginIcon,
  UserPlusIcon,
  RotateIcon,
  CurrencyDollarIcon,
  ChartLineIcon,
  ChartAreaIcon,
  ChartDotsIcon,
  ChartArcsIcon,
  ChartCandleIcon,
  ChartDonut3Icon,
  ChartRadarIcon,

  ApertureIcon,
  LayoutIcon,
  HelpIcon,
  UserCircleIcon,
  BoxAlignBottomIcon,
  BoxAlignLeftIcon,
  SettingsIcon,
  ZoomCodeIcon,
  StarIcon,
  AwardIcon,
  MoodSmileIcon,
  Message2Icon,
  PointIcon,
  AppWindowIcon,
  MailIcon,
  BasketIcon,
  CalendarIcon,
  BorderStyle2Icon,
  ColumnsIcon,
  RowInsertBottomIcon,
  EyeTableIcon,
  SortAscendingIcon,
  PageBreakIcon,
  FilterIcon,
  BoxModelIcon,
  ServerIcon,
  JumpRopeIcon
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Home" },
  {
    title: "Modern",
    icon: ApertureIcon,
    chip: "New",
    chipColor: "surface",
    chipBgColor: "secondary",
    to: "/dashboards/modern",
  },

  { header: "Apps" },
  {
    title: "Contact",
    icon: BoxIcon,
    to: "/apps/contacts",
    chip: "2",
    chipColor: "surface",
    chipBgColor: "secondary",
  },

  {
    title: "Blog",
    icon: ChartDonut3Icon,
    to: "/",
    children: [
      {
        title: "Posts",
        icon: PointIcon,
        to: "/apps/blog/posts",
      },
      {
        title: "Detail",
        icon: PointIcon,
        to: "/apps/blog/early-black-friday-amazon-deals-cheap-tvs-headphones",
      },
    ],
  },

  {
    title: "Chats",
    icon: Message2Icon,
    to: "/apps/chats",
  },
  {
    title: "User Profile",
    icon: UserCircleIcon,
    to: "/",
    children: [
      {
        title: "Profile",
        icon: PointIcon,
        to: "/apps/user/profile",
      },
      {
        title: "Followers",
        icon: PointIcon,
        to: "/apps/user/profile/followers",
      },
      {
        title: "Friends",
        icon: PointIcon,
        to: "/apps/user/profile/friends",
      },
      {
        title: "Gallery",
        icon: PointIcon,
        to: "/apps/user/profile/gallery",
      },
    ],
  },
  {
    title: "Notes",
    icon: FilesIcon,
    to: "/apps/notes",
  },
  {
    title: "Calendar",
    icon: CalendarIcon,
    to: "/apps/calendar",
  },

  { header: "Pages" },
  {
    title: "Pricing",
    icon: CurrencyDollarIcon,
    to: "/theme-pages/pricing",
  },
  {
    title: "Account Setting",
    icon: UserCircleIcon,
    to: "/theme-pages/account-settings",
  },
  {
    title: "FAQ",
    icon: HelpIcon,
    to: "/theme-pages/faq",
  },
  {
    title: "Widget",
    icon: LayoutIcon,
    to: "/widget-card",
    children: [
      {
        title: "Cards",
        icon: PointIcon,
        to: "/widgets/cards",
      },
      {
        title: "Banners",
        icon: PointIcon,
        to: "/widgets/banners",
      },
      {
        title: "Charts",
        icon: PointIcon,
        to: "/widgets/charts",
      },
    ],
  },
  {
    title: "Landing Page",
    icon: AppWindowIcon,
    to: "/theme-pages/landingpage",
  },

  { header: "Forms" },
  {
    title: "Form Elements",
    icon: AppsIcon,
    to: "/components/",
    children: [
      {
        title: "Autocomplete",
        icon: PointIcon,
        to: "/forms/form-elements/autocomplete",
      },
      {
        title: "Combobox",
        icon: PointIcon,
        to: "/forms/form-elements/combobox",
      },
      {
        title: "Button",
        icon: PointIcon,
        to: "/forms/form-elements/button",
      },
      {
        title: "Checkbox",
        icon: PointIcon,
        to: "/forms/form-elements/checkbox",
      },
      {
        title: "Custom Inputs",
        icon: PointIcon,
        to: "/forms/form-elements/custominputs",
      },
      {
        title: "File Inputs",
        icon: PointIcon,
        to: "/forms/form-elements/fileinputs",
      },
      {
        title: "Radio",
        icon: PointIcon,
        to: "/forms/form-elements/radio",
      },
      {
        title: "Date Time",
        icon: PointIcon,
        to: "/forms/form-elements/date-time",
      },
      {
        title: "Select",
        icon: PointIcon,
        to: "/forms/form-elements/select",
      },
      {
        title: "Slider",
        icon: PointIcon,
        to: "/forms/form-elements/slider",
      },
      {
        title: "Switch",
        icon: PointIcon,
        to: "/forms/form-elements/switch",
      },
    ],
  },
  {
    title: "Form Layout",
    icon: FileTextIcon,
    to: "/forms/form-layouts",
  },
  {
    title: "Form Horizontal",
    icon: BoxAlignBottomIcon,
    to: "/forms/form-horizontal",
  },
  {
    title: "Form Vertical",
    icon: BoxAlignLeftIcon,
    to: "/forms/form-vertical",
  },
  {
    title: "Form Custom",
    icon: FileDotsIcon,
    to: "/forms/form-custom",
  },
  {
    title: "Form Validation",
    icon: FilesIcon,
    to: "/forms/form-validation",
  },
  {
    title: "Editor",
    icon: EditIcon,
    to: "/forms/editor",
  },

  { header: "Tables" },
  {
    title: "Basic Table",
    icon: BorderAllIcon,
    to: "/tables/basic",
  },
  {
    title: "Dark Table",
    icon: BorderHorizontalIcon,
    to: "/tables/dark",
  },
  {
    title: "Density Table",
    icon: BorderInnerIcon,
    to: "/tables/density",
  },
  {
    title: "Fixed Header Table",
    icon: BorderTopIcon,
    to: "/tables/fixed-header",
  },
  {
    title: "Height Table",
    icon: BorderVerticalIcon,
    to: "/tables/height",
  },
  {
    title: "Editable Table",
    icon: BorderStyle2Icon,
    to: "/tables/editable",
  },

  { header: 'Data Tables' },
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

  { header: "UI" },
  {
    title: "UI Components",
    icon: BoxIcon,
    to: "#",
    children: [
      {
        title: "Alert",
        icon: PointIcon,
        to: "/ui-components/alert",
      },
      {
        title: "Accordion",
        icon: PointIcon,
        to: "/ui-components/accordion",
      },
      {
        title: "Avatar",
        icon: PointIcon,
        to: "/ui-components/avatar",
      },
      {
        title: "Chip",
        icon: PointIcon,
        to: "/ui-components/chip",
      },
      {
        title: "Dialog",
        icon: PointIcon,
        to: "/ui-components/dialogs",
      },
      {
        title: "List",
        icon: PointIcon,
        to: "/ui-components/list",
      },
      {
        title: "Menus",
        icon: PointIcon,
        to: "/ui-components/menus",
      },
      {
        title: "Rating",
        icon: PointIcon,
        to: "/ui-components/rating",
      },
      {
        title: "Tabs",
        icon: PointIcon,
        to: "/ui-components/tabs",
      },
      {
        title: "Tooltip",
        icon: PointIcon,
        to: "/ui-components/tooltip",
      },
      {
        title: "Typography",
        icon: PointIcon,
        to: "/ui-components/typography",
      },
    ],
  },
  { header: "Charts" },
  {
    title: "Line",
    icon: ChartLineIcon,
    to: "/charts/line-chart",
  },
  {
    title: "Gredient",
    icon: ChartArcsIcon,
    to: "/charts/gredient-chart",
  },
  {
    title: "Area",
    icon: ChartAreaIcon,
    to: "/charts/area-chart",
  },
  {
    title: "Candlestick",
    icon: ChartCandleIcon,
    to: "/charts/candlestick-chart",
  },
  {
    title: "Column",
    icon: ChartDotsIcon,
    to: "/charts/column-chart",
  },
  {
    title: "Doughnut & Pie",
    icon: ChartDonut3Icon,
    to: "/charts/doughnut-pie-chart",
  },
  {
    title: "Radialbar & Radar",
    icon: ChartRadarIcon,
    to: "/charts/radialbar-chart",
  },

  { header: "Auth" },

  {
    title: "Login",
    icon: LoginIcon,
    to: "#",
    children: [
      {
        title: "Side Login",
        icon: PointIcon,
        to: "/auth/login",
      },
      {
        title: "Boxed Login",
        icon: PointIcon,
        to: "/auth/login2",
      },
    ],
  },
  {
    title: "Register",
    icon: UserPlusIcon,
    to: "#",
    children: [
      {
        title: "Side Register",
        icon: PointIcon,
        to: "/auth/register",
      },
      {
        title: "Boxed Register",
        icon: PointIcon,
        to: "/auth/register2",
      },
    ],
  },
  {
    title: "Şifremi Unuttum",
    icon: RotateIcon,
    to: "#",
    children: [
      {
        title: "Side Şifremi Unuttum",
        icon: PointIcon,
        to: "/auth/forgot-password",
      },
      {
        title: "Boxed Şifremi Unuttum",
        icon: PointIcon,
        to: "/auth/forgot-password2",
      },
    ],
  },
  {
    title: "Two Steps",
    icon: ZoomCodeIcon,
    to: "#",
    children: [
      {
        title: "Side Two Steps",
        icon: SettingsIcon,
        to: "/auth/two-step",
      },
      {
        title: "Boxed Two Steps",
        icon: SettingsIcon,
        to: "/auth/two-step2",
      },
    ],
  },

  {
    title: "Error",
    icon: AlertCircleIcon,
    to: "/auth/404",
  },
  {
    title: "Maintenance",
    icon: SettingsIcon,
    to: "/auth/maintenance",
  },

  { header: "Others" },
  {
    title: "Menu Level",
    icon: BoxMultipleIcon,
    to: "#",
    children: [
      {
        title: "Level 1",
        icon: PointIcon,
        to: "/",
      },
      {
        title: "Level 1",
        icon: PointIcon,
        to: "/",
        children: [
          {
            title: "Level 2",
            icon: PointIcon,
            to: "/",
          },
          {
            title: "Level 2",
            icon: PointIcon,
            to: "/",
            children: [
              {
                title: "Level 3",
                icon: PointIcon,
                to: "/",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Disabled",
    icon: CircleOffIcon,
    disabled: true,
    to: "/",
  },
  {
    title: "Sub Caption",
    icon: StarIcon,
    subCaption: "This is the subtitle",
    to: "/",
  },
  {
    title: "Chip",
    icon: AwardIcon,
    chip: "9",
    chipColor: "surface",
    chipBgColor: "primary",
    to: "/",
  },
  {
    title: "Outlined",
    icon: MoodSmileIcon,
    chip: "outline",
    chipColor: "primary",
    chipVariant: "outlined",
    to: "/",
  },
  {
    title: "External Link",
    icon: StarIcon,
    to: "/",
    type: "external",
  },
];

export default sidebarItem;
