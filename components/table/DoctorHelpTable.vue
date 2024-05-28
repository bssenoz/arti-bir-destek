<script setup lang="ts">
import { faqPageDoctor } from "@/_mockApis/components/pages/faqData2";
import img1 from "/images/profile/user-10.jpg";
import img2 from "/images/profile/user-9.jpg";
import img3 from "/images/profile/user-6.jpg";
</script>
<template>
    <v-expansion-panels elevation="10">
        <v-expansion-panel elevation="10" v-for="item in faqPageDoctor" :key="item.question">
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
                                    <p>Randevu sayfasından randevularınızı görüntüleyebilir ve bunları iptal
                                        edebilirsiniz. Randevunuzu iptal etmeniz durumunda hastanıza bilgilendirme
                                        e-postası gönderilecektir.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="4">
                                    <img src="/images/faq/r1.png" />

                                </v-col>
                                <v-col cols="12" lg="4">
                                    <img src="/images/faq/t1.png" />

                                </v-col>
                            </v-row>

                        </v-container>
                    </div>

                    <div v-if="item.id == 2">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Takvim sayfasında müsait olduğunuz günleri baz alarak 15 günlük randevu
                                        açabilirsiniz. Bu takvimi daha sonradan tekrardan güncelleyebilirsiniz.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <img src="/images/faq/t2.png" />

                                </v-col>
                            </v-row>

                        </v-container>
                    </div>

                    <div v-if="item.id == 3">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Hastalarım sayfasında hastalarınızı ve bilgilerini görüntüleyebilirsiniz.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <img src="/images/faq/h1.png" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <p>Hastanıza randevu oluşturabilirsiniz. Girilen tarih ve saatlerin türlerine dikkat
                                        ediniz. </p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <img src="/images/faq/h2.png" />
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>

                    <div v-if="item.id == 4">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Hastanız ile olan geçmiş randevularınızı görüntüleyebilir ve rapor
                                        ekleyebilirsiniz. Her bir görüşme için yalnızca 1 rapor ekleyebilirsiniz.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="6">
                                    <img src="/images/faq/g1.png" />
                                </v-col>
                                <v-col cols="12" lg="6">
                                    <img src="/images/faq/g2.png" />
                                </v-col>
                            </v-row>

                        </v-container>
                    </div>

                    <div v-if="item.id == 5">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Raporlarınızı görüntüleyebilir ve raporunuzu pdf olarak indirebilirsiniz.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <img src="/images/faq/ra1.png" />
                                </v-col>

                            </v-row>

                        </v-container>
                    </div>

                    <div v-if="item.id == 6">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p>Ayarlar sayfasından kullanıcı bilgilerinizi güncelleyebilir, profil resmi
                                        ekleyebilir ya da kaldırabilirsiniz.</p>
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