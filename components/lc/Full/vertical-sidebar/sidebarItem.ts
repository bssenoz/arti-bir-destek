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


  { header: "Auth" },

  {
    title: "Login",
    icon: LoginIcon,
    to: "#",
    children: [
      {
        title: "Side Login",
        icon: PointIcon,
        to: "/giris-yap",
      },
      {
        title: "Boxed Login",
        icon: PointIcon,
        to: "/giris-yap2",
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
        to: "/kayit-ol",
      },
      {
        title: "Boxed Register",
        icon: PointIcon,
        to: "/kayit-ol",
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
        to: "/sifremi-unuttum",
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



];

export default sidebarItem;
