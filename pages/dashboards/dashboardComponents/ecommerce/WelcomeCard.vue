<!-- <template>
    <v-card elevation="0" rounded="md" class="bg-lightprimary border-0">
        <v-card-item class="py-0">
            <v-row>
                <v-col cols="12" sm="7" class="pa-6">
                    <h5 class="text-h5 pt-3">Welcome back Mathew!</h5>
                    <h6 class="text-subtitle-1 text-13 py-4 text-medium-emphasis">
                        You have earned 54% more than last month which is great thing.
                    </h6>
                    <v-btn flat color="primary">Check</v-btn>
                </v-col>
                <v-col cols="12" sm="5">
                    <div class="mb-n2">
                        <img src="/images/backgrounds/welcome-bg2.png" class="mb-n16 mt-4" alt="image" width="300" />
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template> -->


<script setup lang="ts">
import { ArrowUpRightIcon } from 'vue-tabler-icons';
</script>
<template>
    <v-card elevation="0" rounded="md" class="bg-lightprimary border-0">
        <v-card-item class="pt-3 pb-0">
            <v-row>
                <v-col cols="12" sm="6" class="pt-sm-10 pt-5">
                    <div class="d-flex align-center">
                        <v-avatar size="40"><img src="/images/profile/user-1.jpg" height="40"
                                alt="icon" /></v-avatar>
                        <h5 class="text-h5 ml-4">Welcome back Mathew Anderson!</h5>
                    </div>
                    <div class="mt-8">
                        <div class="d-flex">
                            <div>
                                <div class="d-flex">
                                    <h2 class="text-h2 textPrimary">$2,340 </h2>
                                    <div class="mt-1 ml-1">
                                        <ArrowUpRightIcon stroke-width="1.5" size="22" class="text-success" />
                                    </div>
                                </div>
                                <div class="text-subtitle-1 textPrimary mt-1">Today’s Sales</div>
                            </div>
                            <v-divider vertical class="mx-5"></v-divider>
                            <div>
                                <div class="d-flex">
                                    <h2 class="text-h2 textPrimary">35%</h2>
                                    <div class="mt-1 ml-1">
                                        <ArrowUpRightIcon stroke-width="1.5" size="22" class="text-success" />
                                    </div>
                                </div>
                                <div class="text-subtitle-1 textPrimary mt-1">Performance</div>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" sm="6" class="text-sm-right">
                    <div class="mb-n2 ">
                        <img src="/images/backgrounds/welcome-bg.svg" class="" alt="image" width="340" />
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
