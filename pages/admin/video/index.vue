<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12"><v-btn class="float-right" to="/admin/video/add">Video Yükle</v-btn></v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-data-table :headers="headers" :items="videos" item-value="name" class="border rounded-md">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-subtitle-1"> {{ item.columns.id }}</td>
                        <td class="text-subtitle-1">{{ item.columns.title }}</td>
                        <td class="text-subtitle-1">{{ item.columns.description }}</td>
                        <td class="text-subtitle-1">{{ item.columns.url }}</td>
                        <td class="text-subtitle-1">
                            <v-btn color="primary" @click="editVideo(item)">Düzenle</v-btn>
                            <v-btn class="ml-2" color="primary" @click="deleteVideo(item.columns.id)">Sil</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
    </v-row>

    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="500">
        <v-card>
            <v-card-title>Düzenle</v-card-title>
            <v-card-text>
                <v-text-field v-model="editedItem.title" label="Başlık"></v-text-field>
                <v-text-field v-model="editedItem.description" label="Açıklama"></v-text-field>
                <v-text-field v-model="editedItem.url" label="URL" readonly></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="saveEdit">Kaydet</v-btn>
                <v-btn @click="editDialog = false">İptal</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="500">
        <v-card>
            <v-card-title>Silmek İstediğinizden Emin Misiniz?</v-card-title>
            <v-card-actions>
                <v-btn color="primary" @click="confirmDelete">Evet</v-btn>
                <v-btn @click="deleteDialog = false">Hayır</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Error Dialog -->
    <v-dialog v-model="errorDialog" max-width="500">
        <v-card>
            <v-card-title>Hata</v-card-title>
            <v-card-text>
                Düzenleme işlemi başarısız oldu.
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="errorDialog = false">Tamam</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Success Dialog -->
    <v-dialog v-model="successDialog" max-width="500">
        <v-card>
            <v-card-title>Başarılı</v-card-title>
            <v-card-text>
                İşlem başarılı oldu.
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="successDialog = false">Tamam</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useVideoStore } from '@/stores/video';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

const videoStore = useVideoStore();

const editDialog = ref(false);
const editedItem = ref<{ title?: string; description?: string; url?: string }>({});
const errorDialog = ref(false);
const successDialog = ref(false);
let deletingVideoId: number | null = null;
const deleteDialog = ref(false);

onMounted(() => {
    videoStore.fetchVideos();
});

const videos: any = computed(() => {
    return videoStore.videos;
});

const deleteVideo = (id: number) => {
    deletingVideoId = id;
    deleteDialog.value = true;
}

const confirmDelete = () => {
    if (deletingVideoId !== null) {
        const success = videoStore.deleteVideo(deletingVideoId);
        if (!success) {
            errorDialog.value = true;
        }
        deletingVideoId = null;
    }
    deleteDialog.value = false;
    successDialog.value = true;
}

const editVideo = (item: any) => {
    editedItem.value = Object.assign({}, item.columns);
    editDialog.value = true;
}

const saveEdit = async () => {
    try {
        await videoStore.editVideo(editedItem.value);
        editDialog.value = false;
        successDialog.value = true;
    } catch (error) {
        editDialog.value = false;
        errorDialog.value = true;
    }
}

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
    { title: 'ID', align: 'start', key: 'id', sortable: false },
    { title: 'Başlık', align: 'start', key: 'title', sortable: false },
    { title: 'Açıklama', align: 'start', key: 'description', sortable: false },
    { title: 'Url', align: 'start', key: 'url' },
    { title: '', align: 'start', key: 'action' },
]);
</script>
