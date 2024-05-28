<script setup lang="ts">
import { faqPagePatient} from "@/_mockApis/components/pages/faqData2";

</script>
<template>
    <v-expansion-panels elevation="10">
        <v-expansion-panel elevation="10" v-for="item in faqPagePatient" :key="item.question">
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
                                    <p class="text-h6">Randevu Al sayfasıdan danışmanınızdan müsait olduğunuz güne randevu alabilirsiniz. Bir sonraki randevunuzu <span class="font-weight-bold">15 gün sonra</span> alabilirsiniz. Eğer danışmanınız uygun görürse size randevu oluşturabilir.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <img src="/images/faq/pr1.png" />
                                </v-col>
                            </v-row>

                        </v-container>
                    </div>

                    <div v-if="item.id == 2">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p class="text-h6">Randevu sayfasından randevularınızı görüntüleyebilir ve bunları iptal
                                        edebilirsiniz. Randevunuzu iptal etmeniz durumunda danışmanınıza bilgilendirme
                                        e-postası gönderilecektir. İptal ettikten sonra tekrardan randevu alabilirsiniz. Randevu saatiniz geldiğinde aktif olan <span class="font-weight-bold">"Randevuya Katıl"</span> butonuna tıklayarak görüşmenize katılabilirsiniz.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" lg="4">
                                    <img src="/images/faq/pr2.png" />

                                </v-col>
                                <v-col cols="12" lg="4">
                                    <img src="/images/faq/pr3.png" />

                                </v-col>
                            </v-row>

                        </v-container>
                    </div>
                    <div v-if="item.id == 3">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p class="text-h6">Mesaj sayfasında <span class="font-weight-bold">"Danışman Seç"</span> butonuna tıklayarak, açılan pencereden randevu aldığınız danışmanı seçerek onunla iletişime geçebilirsiniz. Randevu almadan herhangi bir danışmana mesaj atamazsınız.</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <img src="/images/faq/pr4.png" />
                                </v-col>
                            </v-row>

        
                        </v-container>
                    </div>

                    <div v-if="item.id == 4">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p class="text-h6">Videolar sayfasından izlemek istediğiniz eğitim videosuna tıklayarak onu izleyebilir ve onunla ilgili yazılan bilgilendirme metinlerini okuyabilirsiniz. Video izlemeleriniz kayıt altına alınacaktır. Bu kayıtlara <span class="font-weight-bold">"İstatistiklerim"</span> sayfasından ulaşabilirsiniz.</p>
                                </v-col>
                            </v-row>
                        </v-container>
                    </div>

                    <div v-if="item.id == 5">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <p class="text-h6">Ayarlar sayfasından kullanıcı bilgilerinizi güncelleyebilir, profil resmi
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