<script setup lang="ts">
import { ref } from 'vue';

// components
import ProfileBanner from '@/components/pages/user-profile/ProfileBanner.vue';
import IntroCard from '@/components/pages/user-profile/IntroCard.vue';
import PhotosCard from '@/components/pages/user-profile/PhotosCard.vue';
import PostListing from '@/components/pages/user-profile/PostListing.vue';
import AddPost from '@/components/pages/user-profile/posts/AddPost.vue';

const page = ref({ title: 'Social Profile' });
definePageMeta({
  layout: "default",
});

</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <p>Profile Page</p>
    <v-col>
                <v-btn color="primary" to="/profile/randevu/add" class="mb-2 float-left">Yeni Görüşme</v-btn>
            </v-col>
            <v-col>
                <v-btn color="primary" to="/profile/randevu/takvim" class="mb-2">Randevu Saatleri</v-btn>
            </v-col>
            <v-col>
                <v-btn color="primary" to="/profile/randevu/randevu-al" class="mb-2">Randevu Al</v-btn>
            </v-col>
    <!-- <ProfileBanner />
    <v-row class="mt-4">
        <v-col cols="12" lg="4" md="4">
            <IntroCard />
            <PhotosCard />
        </v-col>
        <v-col cols="12" lg="8" md="8">
            <AddPost />
            <PostListing />
        </v-col>
    </v-row> -->
</template>
