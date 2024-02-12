<script setup lang="ts">
import {appsLink} from '@/_mockApis/headerData';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- apps link -->
    <!-- ---------------------------------------------- -->
    <v-row>
        <v-col cols="12" lg="6" v-for="(item, i) in appsLink" :key="i">
            <NuxtLink :to="item.href" class="text-decoration-none custom-text-primary">
                <div class="d-flex align-center">
                    <v-avatar size="48" color="lightprimary" rounded="md">
                        <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar" />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-subtitle-1 font-weight-bold mb-2 custom-title">{{ item.title }}</h6>
                        <p class="text-subtitle-2 text-medium-emphasis">{{ item.subtext }}</p>
                    </div>
                </div>
            </NuxtLink>
        </v-col>
    </v-row>
</template>
