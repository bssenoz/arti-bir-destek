import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
//Data tables
import * as labsComponents from 'vuetify/labs/components'
import { VDataTable } from 'vuetify/labs/VDataTable';

import PerfectScrollbar from "vue3-perfect-scrollbar";
import VueApexCharts from "vue3-apexcharts";
import VueTablerIcons from "vue-tabler-icons";
//Mock Api data
import "../_mockApis";

import VCalendar from "v-calendar";

import Maska from "maska";
import "vue3-carousel/dist/carousel.css";
import "@/assets/scss/style.scss";

// Table
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

//i18
import { createI18n } from "vue-i18n";
import messages from "@/utils/locales/messages";
import {
  BLUE_THEME,
  AQUA_THEME,
  PURPLE_THEME,
  GREEN_THEME,
  CYAN_THEME,
  ORANGE_THEME,
} from "@/theme/LightTheme";
import {
  DARK_BLUE_THEME,
  DARK_AQUA_THEME,
  DARK_ORANGE_THEME,
  DARK_PURPLE_THEME,
  DARK_GREEN_THEME,
  DARK_CYAN_THEME,
} from "@/theme/DarkTheme";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VDataTable,
      labsComponents
    },
    directives,
    theme: {
      defaultTheme: "BLUE_THEME",
      themes: {
        BLUE_THEME,
        AQUA_THEME,
        PURPLE_THEME,
        GREEN_THEME,
        CYAN_THEME,
        ORANGE_THEME,
        DARK_BLUE_THEME,
        DARK_AQUA_THEME,
        DARK_ORANGE_THEME,
        DARK_PURPLE_THEME,
        DARK_GREEN_THEME,
        DARK_CYAN_THEME,
      },
    },
    defaults: {
      VCard: {
        rounded: "md",
      },
      VTextField: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VTextarea: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VSelect: {
        variant: "outlined",
        density: "comfortable",
        color: "primary",
      },
      VListItem: {
        minHeight: "45px",
      },
      VTooltip: {
        location: "top",
      },
    },
  });

  const i18n = createI18n({
    locale: "en",
    messages: messages,
    silentTranslationWarn: true,
    silentFallbackWarn: true,
  });
  nuxtApp.vueApp.use(vuetify);
  nuxtApp.vueApp.component("EasyDataTable", Vue3EasyDataTable);
  nuxtApp.vueApp.use(PerfectScrollbar);
  nuxtApp.vueApp.use(VueApexCharts);
  nuxtApp.vueApp.use(VueTablerIcons);
  nuxtApp.vueApp.use(VCalendar, {});
  nuxtApp.vueApp.use(Maska);
  nuxtApp.vueApp.use(i18n);
});
