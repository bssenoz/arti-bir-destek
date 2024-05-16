<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/landingpage/layout/Header.vue";
import MessageSection from "@/components/landingpage/section/message.vue";
import Footer from "@/components/landingpage/layout/Footer.vue";

import "aos/dist/aos.css";
import AOS from "aos";

onMounted(() => {
  AOS.init();
});

definePageMeta({
  layout: "blank",
});
</script>

<template>
  <div class="lp-wraper">
    <Header />
    <MessageSection />
    <Footer />
  </div>
</template>
