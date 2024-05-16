<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/landingpage/layout/Header.vue";
import MainBanner from "@/components/landingpage/section/mainBanner.vue";
import FaqQuestion from "@/components/landingpage/section/faqQuestion.vue";
import Footer from "@/components/landingpage/layout/Footer.vue";
import Purpose from "@/components/landingpage/section/purpose.vue";
import Facility from "@/components/landingpage/section/facility.vue";
import WhyUs from "@/components/landingpage/section/whyUs.vue";
import JoinUs from "@/components/landingpage/section/joinUs.vue";

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
    <!----------->
    <MainBanner />
    <Purpose id="amaclarimiz"/>
    <Facility class="my-16" id="neler-sagliyoruz"/>
    <WhyUs class="my-16" id="neden-biz"/>
    <FaqQuestion class="my-16" id="sss"/>
    <JoinUs class="my-16" id="aramiza-katil"/>
    <Footer class="mt-16"/>
  </div>
</template>
