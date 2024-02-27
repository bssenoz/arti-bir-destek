<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { VideoTable } from '@/_mockApis/components/video/videoTable';
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
    { title: 'Video Adı', align: 'start', key: 'name', sortable: false, },
    { title: 'Video Url', align: 'start', key: 'link' },
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
            <v-data-table :headers="headers" :items="VideoTable" item-value="name" class="border rounded-md">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-subtitle-1">{{ item.columns.name }}</td>
                        <td class="text-subtitle-1">{{ item.columns.link }}</td>
                        <td class="text-subtitle-1"><v-btn color="primary">Düzenle</v-btn><v-btn class="ml-2"
                                color="primary">Sil</v-btn></td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

