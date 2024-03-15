<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/landingpage/layout/Header.vue";
import MainBanner from "@/components/landingpage/section/mainBanner.vue";
import UserReview from "@/components/landingpage/section/userReview.vue";
import AskQuestion from "@/components/landingpage/section/askQuestion.vue";
import BuyNow from "@/components/landingpage/section/buyNow.vue";
import FaqQuestion from "@/components/landingpage/section/faqQuestion.vue";
import Footer from "@/components/landingpage/layout/Footer.vue";

import "aos/dist/aos.css";
import AOS from "aos";

onMounted(() => {
  AOS.init();
});

/*for Blank Layout*/
definePageMeta({
  layout: "blank",
});
</script>

<template>
  <div class="lp-wraper">
    <Header />
    <!----------->
    <MainBanner />
    <!-- <UserReview />
    <AskQuestion />
    <FaqQuestion/>
    <BuyNow /> -->
    <!----------->
    <Footer />
  </div>
</template>
