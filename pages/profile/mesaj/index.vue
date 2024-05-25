<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
// common components
import AppBaseCard from '@/components/shared/AppBaseCard.vue';
import ChatDetail from '@/components/pages/chats/ChatDetail.vue';
import ChatList from '@/components/pages/chats/ChatList.vue';
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '~/stores/user';

const chatStore = useChatStore();
const userStore = useUserStore();

const currentUser = ref(null);

definePageMeta({
  layout: "default",
  middleware: ['auth'],
});

onMounted(async () => {
    await userStore.getCurrentUser()
    chatStore.connectToHub(currentUser.value)
});

const userRole = computed(() => {
    return userStore.userRole;
})
watchEffect(() => {
    currentUser.value = userStore.currentUser;
});

</script>

<template>
    <v-card elevation="10" style="height: 85vh;margin-top:1rem" >
        <AppBaseCard>
            <template v-slot:leftpart>
                <ChatList :userRole="userRole"/>
            </template>
            <template v-slot:rightpart>
                <ChatDetail/>
            </template>

            <template v-slot:mobileLeftContent>
                <ChatList :userRole="userRole"/>
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
