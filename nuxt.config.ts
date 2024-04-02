import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

require('dotenv').config();

// https://nuxt.com/docs/api/configuration/nuxt-config
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
      title:
        "Artı Bir Destek",
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
