<script setup lang="ts">
import { faqPage } from '@/_mockApis/components/pages/faqData';
import img1 from '/images/profile/user-10.jpg';
import img2 from '/images/profile/user-9.jpg';
import img3 from '/images/profile/user-6.jpg';
</script>
<template>
      <div class="overflow-hidden bg-lightprimary" >
        <v-container>
    <v-row>
        <v-col>
            <v-card elevation="0" rounded="md" class="bg-lightprimary mt-sm-13 mt-8">
                <v-card-item class="pa-sm-10 pa-6">
                    <div class="text-center">
                        <div class="ml-2 d-flex justify-center flex-row-reverse mb-5">
                            <v-avatar size="40" class="ml-n2 avtar-border">
                                <img :src="img1" alt="avatar" height="40" />
                            </v-avatar>
                            <v-avatar size="40" class="ml-n2 avtar-border">
                                <img :src="img2" alt="avatar" height="40" />
                            </v-avatar>
                            <v-avatar size="40" class="ml-n2 avtar-border">
                                <img :src="img3" alt="avatar" height="40" />
                            </v-avatar>
                        </div>
                        <h3 class="text-h3">Aramıza Katıl!</h3>
                        <h6 class="text-h6 text-medium-emphasis font-weight-medium mt-2">
                          Anomali riski taşıyan bir gebeyseniz ve psikososyal desteğe ihtiyacınız varsa, programımızdan ücretsiz bir şekilde yararlanmak için kaydolun.
                        </h6>
                        <v-btn color="primary" flat class="mt-5 px-8">Kaydol</v-btn>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>

    </v-row>
</v-container>
</div>

</template>
