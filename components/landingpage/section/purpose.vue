<template>
  <div class="py-16 overflow-hidden bg-lightprimary" >
    <v-container class="position-relative">
      <v-row>
        <v-col>
          <div class="text-h6 font-weight-light mt-16 mt-lg-0">
            Artı Bir Destek Sistemi <span class="font-weight-bold">Sakarya Üniversitesi Sağlık Bilimleri
            Fakültesi </span>tarafından yürütülen bir proje için hazırlanmıştır. Bu
            projenin odak noktası, gebelerin psikososyal sağlığını korumak ve
            anomali riski taşıyan gebelere yönelik çevrimiçi psikososyal destek
            programlarının etkililiğini araştırmaktır.
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
 
          <div>
            <div class="text-h3 font-weight-bold">Amaçlarımız Neler?</div>
            <v-row>
              <v-col cols="12" md="4" class="d-flex justify-center align-center">
                <img src="/images/backgrounds/stork.gif" class="mt-16 stork-img"/>
                <!-- <img src="/images/backgrounds/birds2.gif" /> -->
              </v-col>
              <v-col cols="12" md="8">
                <div class="border-s-lg border-primary">
                  <div
                    v-for="(item, index) in dataList"
                    :key="index"
                    class="mt-4 ml-4"
                  >
                  <div class="text-h6">
                    <span
                      class="rounded-t-shaped px-1"
                      style="background-color: #ffd1e6"
                      >{{ item.id }}.</span>
             {{ item.title }}</div>
                    {{ item.text }}
                  </div>
                </div>
                
              </v-col>

            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<!-- rgb(236, 242, 255); -->
<script setup lang="ts">
import { ref } from "vue";

const dataList = ref([
  {
    id: 1,
    title: "Gebelerin Psikososyal Sağlığını Desteklemek ",
    text: 'Gebelik dönemi, kadınların hayatında önemli bir dönemdir ve bu dönemde karşılaşılan zorluklar, endişeler ve duygusal dalgalanmalar oldukça yaygındır. Amacımız, gebelerin psikososyal sağlığını destekleyerek, onların bu dönemi daha kolay atlatmalarını sağlamaktır.',
  },
  {
    id: 2,
    title: "Fetüste Anomali Riski Taşıyan Gebelere Özel Destek Sunmak",
    text: 'Anomali riski taşıyan gebelerin özel ihtiyaçları olduğunun farkındayız. Bu nedenle, bu grup annelerimize yönelik özel olarak tasarlanmış destek programları sunarak, onların endişelerini hafifletmeyi ve sağlıklı bir gebelik deneyimi yaşamalarını sağlamayı amaçlıyoruz.',
  },
  {
    id: 3,
    title: "Bilgi ve Beceri Kazandırmak",
    text: 'Gebelik döneminde anne adaylarının kendilerini güvende hissetmeleri için bilgi ve beceri kazanmaları önemlidir. Web sitemizde, gebelikle ilgili doğru ve güvenilir bilgilere erişim sağlayarak, anne adaylarının bilinçli kararlar alabilmelerine ve kendilerini daha iyi hazırlamalarına yardımcı olmayı amaçlıyoruz.'
  },
  {
    id: 4,
    title: "Toplumda Farkındalık Oluşturmak",
    text: 'Gebelikte psikososyal destek konusundaki farkındalığı artırmak ve toplumda bu konuda destekleyici bir ortam oluşturmak da önceliklerimiz arasındadır. Bilgilendirici içerikler ve etkinlikler düzenleyerek, gebelikte psikososyal sağlığın önemini vurgulamayı ve destek olmayı hedefliyoruz.'
  },
]);
</script>

<style scoped>
.v-container {
  max-width: 1200px !important;
}
.stork-img {
  width: 100%;
}
@media (max-width: 960px) {
  .stork-img {
    width: 30% !important;
    margin-top: 16px !important;
    margin-bottom: -20px;
  }
}
</style>
