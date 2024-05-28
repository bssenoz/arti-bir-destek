<script setup lang="ts">
import { faqPageAdmin } from "@/_mockApis/components/pages/faqData2";
</script>
<template>
    <v-expansion-panels elevation="10">
        <v-expansion-panel elevation="10" v-for="item in faqPageAdmin" :key="item.question">
            <v-expansion-panel-title class="text-h6 py-6">
                <v-row>
                    <v-col cols="12" lg="2">
                        {{ item.question }}
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-chip v-for="(chip, index) in item.chip" :key="index" :color="chip.color" size="small" label>
                            {{ chip.text }}
                        </v-chip>
                    </v-col>
                </v-row>



            </v-expansion-panel-title>
            <v-divider></v-divider>
            <v-expansion-panel-content>
                <v-row>
                </v-row>
                <v-expansion-panel-text class="text-subtitle-1 text-10 text-medium-emphasis pt-3 pb-2">
                    <div v-if="item.id == 1">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Hastalar sayfasında kayıtlı olan tüm hastaların iletişim bilgilerine erişebilirsiniz. Hastaların video istatistiklerini ve raporlarını da görüntüleyebilirsiniz. Ayrıca raporları pdf şeklinde indirebilirsiniz. </p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" >
                                    <img src="/images/faq/ra1.png" />

                                </v-col>
              
                            </v-row>

                        </v-container>
                    </div>
                    <div v-if="item.id == 2">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Danışmanlar sayfasında danışmanların hastalarla olan görüşmelerinden sonra yazdıkları raporları görüntüleyebilir onları pdf olarak indirebilirsiniz. İhtiyaç halinde <span class="font-weight-bold">danışmanın hesabını silme yetkisi</span> de bulunmaktadır. </p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>
                    <div v-if="item.id == 3">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Danışman Ünvanları sayfasında ünvan ekleyip silebilirsiniz.</p>
                                </v-col>
                            </v-row>

                        </v-container>
                    </div>

                    <div v-if="item.id == 4">
                        <v-container>
                            <v-row>
                                <v-col>
                          eklenecek
                                </v-col>
                            </v-row>
   

                        </v-container>
                    </div>

                    <div v-if="item.id == 5">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Videolar sayfasından videoları görüntüleyebilir, düzenleyebilir ve silebilirsiniz. <span class="font-weight-bold">"Video Yükle"</span> butonuna basarak video ekleme sayfasına gidebilir ve video yükleyebilirsiniz. Videolara metin bilgisi eklerken yazı boyutu, kalınlığı gibi stiller de ekleyebilirsiniz. Video İstatistikleri sayfasında videoların hangi kullanıcı tarafından kaç kere ve yüzde kaç izlendiğini görüntüleyebilirsiniz.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <img src="/images/faq/ai2.png" />
                                </v-col>

                            </v-row>

                        </v-container>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<style scoped>
img {
    width: 100%;
}


::v-deep(.v-expansion-panel) {
    padding-bottom: 1.5rem;
}

::v-deep(.v-chip.v-chip--density-default) {
    margin-left: 1rem;
}

/* ::v-deep(.v-expansion-panel) {
    height: 4rem;
} */
/* @media (min-width: 900px) {

} */
</style>