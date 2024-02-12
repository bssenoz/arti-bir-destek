<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ProfileBanner from '@/components/apps/user-profile/ProfileBanner.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { useGalleryStore } from '@/stores/apps/userprofile/gallery';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const store = useGalleryStore();

onMounted(() => {
    store.fetchGallery();
});

const getPhotos: any = computed(() => {
    return store.gallery;
});
const searchValue = ref('');
// dropdown data
const actionDD = ref([
    { title: 'Remove Tag' },
    { title: 'Download' },
    { title: 'Make Profile Picture' },
    { title: 'Make Cover Photo' },
    { title: 'Find support or Report Photo' }
]);
const page = ref({ title: 'Social Profile' });

const filteredCards = computed(() => {
    return getPhotos.value.filter((card: any) => {
        return card.title.toLowerCase().includes(searchValue.value.toLowerCase());
    });
});

const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Social Profile',
        disabled: true,
        href: '#'
    }
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <ProfileBanner />
    <v-row class="justify-content-end mt-5">
        <v-col cols="12">
            <div class="d-sm-flex align-center mb-5">
                <h3 class="text-h3">
                    Gallery
                    <v-chip size="small" class="ml-2 elevation-0" variant="elevated" color="secondary">{{ filteredCards.length }}</v-chip>
                </h3>
                <v-sheet width="250" class="ml-0 ml-sm-auto mt-3 mt-sm-0">
                    <v-text-field
                        color="primary"
                        hide-details
                        variant="outlined"
                        placeholder="Search Gallery"
                        density="compact"
                        prepend-inner-icon="mdi-magnify"
                        v-model="searchValue"
                    >
                    </v-text-field>
                </v-sheet>
            </div>

            <v-row>
                <v-col cols="12" md="4" sm="6" v-for="(card, i) in filteredCards" :key="i">
                    <v-card elevation="10" class="card-hover overflow-hidden">
                        <v-avatar size="220" class="rounded-0 w-100">
                            <img :src="card.image" alt="gallery" width="450" />
                        </v-avatar>
                        <v-card-text>
                            <div class="d-flex align-center gap-3">
                                <div>
                                    <h6 class="text-h6 mb-1">{{ card.title }}</h6>
                                    <span class="text-subtitle-1 d-block text-truncate d-flex align-center gap-2">
                                        {{ card.dateTime }}
                                    </span>
                                </div>
                                <div class="ml-auto">
                                    <v-btn size="x-small" color="inherit" icon variant="text">
                                        <DotsVerticalIcon width="14" stroke-width="1.5" />
                                    </v-btn>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
