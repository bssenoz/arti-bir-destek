<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useVideoStore } from '@/stores/video';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const videoStore = useVideoStore();

onMounted(() => {
    videoStore.fetchVideos();
});

const videos: any = computed(() => {
    return videoStore.videos;
});

const page = ref({ title: 'Videolar' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '#'
    },
    {
        text: 'Video',
        disabled: true,
        href: '#'
    }
]);

const headers = ref([
    { title: 'Başlık', align: 'start', key: 'title', sortable: false, },
    { title: 'Açıklama', align: 'start', key: 'description', sortable: false, },
    { title: 'Url', align: 'start', key: 'url' },
    { title: '', align: 'start', key: 'action' },
])
</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12" ><v-btn class="float-right" to="/admin/video/add">Video Yükle</v-btn></v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-data-table :headers="headers" :items="videos" item-value="name" class="border rounded-md">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-subtitle-1">{{ item.columns.title }}</td>
                        <td class="text-subtitle-1">{{ item.columns.description }}</td>
                        <td class="text-subtitle-1">{{ item.columns.url }}</td>
                        <td class="text-subtitle-1"><v-btn color="primary">Düzenle</v-btn><v-btn class="ml-2"
                                color="primary">Sil</v-btn></td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

