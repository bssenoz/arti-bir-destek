<script setup lang="ts">
import { ref } from 'vue';
// common components
import AppBaseCard from '@/components/shared/AppBaseCard.vue';
import ChatListing from '@/components/apps/chats/ChatListing.vue';
import ChatDetail from '@/components/apps/chats/ChatDetail.vue';
import ChatProfile from '@/components/apps/chats/ChatProfile.vue';

definePageMeta({
  layout: "default",
  middleware: [
    function (to, from) {
      // Custom inline middleware
    },
    'auth',
  ],
});

</script>

<template>
    <v-card elevation="10">
        <AppBaseCard>
            <template v-slot:leftpart>
                <ChatProfile />
                <ChatListing />
            </template>
            <template v-slot:rightpart>
                <ChatDetail />
            </template>

            <template v-slot:mobileLeftContent>
                <ChatProfile />
                <ChatListing />
            </template>
        </AppBaseCard>
    </v-card>
</template>

<style scoped lang="scss">
@media (max-width: 1279px) {
    .v-card {
        position: unset;
    }
}
</style>
