<script setup lang="ts">
import { cards } from '@/_mockApis/components/admin/card';
</script>
<template>
    <v-row>
        <v-col cols="12" md="4" sm="4" v-for="card in cards" :key="card.title">
            <v-card elevation="10" rounded="md" class="card-hover">
                <div>
                    <v-card-item class="pt-4">
                        <h5 class="text-h5 text-13 my-6">
                            <RouterLink class="text-decoration-none color-inherits" :to="card.href">{{card.title}}
                            </RouterLink>
                        </h5>
                    </v-card-item>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>
