<script setup lang="ts">
import { ref } from "vue";
import { useCustomizerStore } from "@/stores/customizer";
import {
  AppsIcon,
  CalendarIcon,
  MailIcon,
  MessageCircleIcon,
} from "vue-tabler-icons";
const customizer = useCustomizerStore();
</script>

<template>
  <div class="pt-6 lp-mobile-sidebar">
    <div class="ml-6 mb-3">
        <LcFullLogo href="/"/>
    </div>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md" href="http://localhost:3000/mesajiniz-var">
        <h5 class="text-subtitle-1 text-primary">
          | Mesajınız var<MessageCircleIcon class="ml-2" />
        </h5>
      </v-list-item>
    </v-list>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md" href="http://localhost:3000/#amaclarimiz">
        <h5 class="text-subtitle-1">Amaçlarımız</h5>
      </v-list-item>
    </v-list>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md" href="http://localhost:3000/#neler-sagliyoruz">
        <h5 class="text-subtitle-1">Neler Sağlıyoruz?</h5>
      </v-list-item>
    </v-list>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md" href="http://localhost:3000/#neden-biz">
        <h5 class="text-subtitle-1">Neden Biz?</h5>
      </v-list-item>
    </v-list>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md" href="http://localhost:3000/#sss">
        <h5 class="text-subtitle-1">Sık Sorulan Sorular</h5>
      </v-list-item>
    </v-list>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md" href="http://localhost:3000/#aramiza-katil">
        <h5 class="text-subtitle-1">Aramıza Katıl</h5>
      </v-list-item>
    </v-list>
    <v-list class="py-0 px-2">
      <v-list-item rounded="md">
        <v-btn style="width:100%"
                color="primary"
                target="_blank"
                href="/kayit-ol"
                variant="outlined"
                class="mt-sm-0 mt-4 m-btn-full bg-primary"
                size="large"
                >Kayıt Ol</v-btn
              >
      </v-list-item>
    </v-list>
    <v-list class="py-0 py-sm-4 px-2 ">
      <v-list-item rounded="md" style="margin-top: -.7rem">
        <v-btn style="width:100%"
                color="primary"
                target="_blank"
                href="/giris-yap"
                variant="outlined"
                class="mt-sm-0 mt-4 m-btn-full "
                size="large"
                >Giriş Yap</v-btn
              >
      </v-list-item>
    </v-list>

  </div>
</template>
