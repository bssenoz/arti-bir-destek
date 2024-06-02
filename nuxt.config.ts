import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

require('dotenv').config();

export default defineNuxtConfig({
  ssr: false,
  typescript: {
    shim: false,
  },
  css: [
    '@/assets/mansalva.scss'
  ],
  build: {
    //   extractCSS: false,
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt","nuxt-vue3-google-signin"],

  runtimeConfig: {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
  },
  
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Sakarya Üniversitesi tarafından hazırlanan psikososyal destek platformu, fetüste anomali riski olan gebelere yöneliktir.' },
        { hid: 'keywords', name: 'keywords', content: 'Anne adayları için destek, Fetüste sağlık, Fetüste anomali riski, Sakarya Üniversitesi, Sağlık Bilimleri Fakültesi' }
    ],
    
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/backgrounds/adimlar.jpg' }
      ],
      title: "Artı Bir Destek"
    },
    
  },

  nitro: {
    serveStatic: true,
  },
  sourcemap: { server: true, client: false },
  devServerHandlers: [],
  hooks: {
    "vite:extendConfig": (config: any) => {
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve("/assets/scss/variables.scss") },
        })
      );
    },
  },
  
});
