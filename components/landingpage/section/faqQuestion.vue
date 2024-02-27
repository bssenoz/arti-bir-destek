<script setup lang="ts">
import { faqPage } from '@/_mockApis/components/pages/faqData';
import img1 from '/images/profile/user-1.jpg';
import img2 from '/images/profile/user-2.jpg';
import img3 from '/images/profile/user-3.jpg';
</script>
<template>
    <v-row class="justify-center">
        <v-col cols="12" md="8">
            <div class="text-center mb-8">
                <h3 class="text-h3">Frequently asked questions</h3>
                <h6 class="text-h6 text-medium-emphasis font-weight-medium mt-1">Get to know more about ready-to-use admin
                    dashboard templates</h6>
            </div>
            <v-expansion-panels elevation="10">
                <v-expansion-panel elevation="10" v-for="item in faqPage" :key="item.question">
                    <v-expansion-panel-title class="text-h6 py-6">{{ item.question }}</v-expansion-panel-title>
                    <v-divider></v-divider>
                    <v-expansion-panel-text class="text-subtitle-1 text-10 text-medium-emphasis pt-3 pb-2">
                        {{ item.answer }}
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-col>
    </v-row>
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
                        <h3 class="text-h3">Still have questions</h3>
                        <h6 class="text-h6 text-medium-emphasis font-weight-medium mt-2">
                            Can't find the answer your're looking for ? Please chat to our friendly team.
                        </h6>
                        <v-btn color="primary" flat class="mt-5">Chat with us</v-btn>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
