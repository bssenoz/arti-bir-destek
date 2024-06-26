<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useVideoStore } from '@/stores/video';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Swal from 'sweetalert2';

const videoStore = useVideoStore();
const videoDialog = ref(false);
const editDialog = ref(false);
const editedItem = ref<{ title?: string; description?: string; url?: string }>({});
let deletingVideoId: number | null = null;

onMounted(() => {
    videoStore.fetchVideos();
});

const videos: any = computed(() => {
    return videoStore.videos;
});

const deleteVideo = (id: number) => {
    deletingVideoId = id;
    Swal.fire({
        title: 'Video Silme',
        text: 'Videoyu silmek istediğinizden emin misiniz?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, sil',
        cancelButtonText: 'İptal'
    }).then((result) => {
        if (result.isConfirmed) {
            confirmDelete()
        }
    });
}

const confirmDelete = () => {
    if (deletingVideoId !== null) {
        const success = videoStore.deleteVideo(deletingVideoId);
        if (!success) {
            Swal.fire({
                title: "Hata!",
                text: "Video silinemedi.",
                icon: "error",
                confirmButtonText: "Tamam",
            });
        }
        deletingVideoId = null;
    }
    Swal.fire({
        title: "Başarılı!",
        text: "Video başarıyla silindi.",
        icon: "success",
        confirmButtonText: "Tamam",
    });
}
const showVideoDialog = (item: any) => {
    editedItem.value = Object.assign({}, item);
    videoDialog.value = true;
}


const editVideo = (item: any) => {
    editedItem.value = Object.assign({}, item.columns);
    editDialog.value = true;
}

const saveEdit = async () => {
    try {
        await videoStore.editVideo(editedItem.value);
        editDialog.value = false;
        Swal.fire({
            title: "Başarılı!",
            text: "Video bilgileri başarıyla güncellendi.",
            icon: "success",
            confirmButtonText: "Tamam",
        });
    } catch (error) {
        editDialog.value = false;
        Swal.fire({
            title: "Hata!",
            text: "Video bilgileri değiştirilirken bir hatayla karşılaşıldı.",
            icon: "error",
            confirmButtonText: "Tamam",
        });
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
    { title: 'ID', align: 'start', key: 'id' },
    { title: 'Başlık', align: 'start', key: 'title' },
    { title: 'Açıklama', align: 'start', key: 'description', },
    { title: 'Url', align: 'start', key: 'url' },
    { title: 'İşlem', align: 'center', key: 'action', sortable: false },
]);
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12"><v-btn class="float-right" color="primary" to="/admin/video/ekle">Video Yükle</v-btn></v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-data-table :headers="headers" :items="videos" item-value="name" class="border rounded-md">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-subtitle-1"> {{ item.columns.id }}</td>
                        <td class="text-subtitle-1"> {{ item.columns.title }}</td>
                        <td class="text-subtitle-1">
                            <div style="max-height: 90px; overflow-y: auto;scrollbar-width: thin;"
                                v-html="item.columns.description">
                            </div>
                        </td>

                        <td class="text-subtitle-1">{{ item.columns.url }}</td>
                        <td class="text-subtitle-1">
                            <v-btn color="" @click="showVideoDialog(item.columns)" class="mb-2">Göster</v-btn>
                            <v-btn color="" @click="editVideo(item)" class="mb-2">Düzenle</v-btn>
                            <v-btn class="ml-2" color="" @click="deleteVideo(item.columns.id)">Sil</v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
    </v-row>

    <!-- Video Dialog -->
    <v-dialog v-model="videoDialog" max-width="1200">
        <v-card>
            <v-card-title>{{ editedItem.title }}</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col>
                        <video controls :src="editedItem.url" style="width: 100%"></video>
                    </v-col>
                    <v-col>
                        <p class="mt-4" v-html="editedItem.description"></p>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn @click="videoDialog = false">Kapat</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="800">
        <v-card>
            <v-card-title>Düzenle</v-card-title>
            <v-card-text>
                <v-text-field v-model="editedItem.title" label="Başlık"></v-text-field>

                <quill-editor v-model:content="editedItem.description" content-type="html" theme="snow"></quill-editor>

                <v-text-field v-model="editedItem.url" label="URL" readonly class="mt-4"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="saveEdit">Kaydet</v-btn>
                <v-btn @click="editDialog = false">İptal</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<style scoped>
.v-btn:hover {
    background-color: #db2777;
    color: #fff;
}

::v-deep(.ql-toolbar.ql-snow) {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}

::v-deep(.ql-container.ql-snow) {
    height: 400px;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
}

::v-deep(v-table__wrapper) {
    scrollbar-width: thin;
}

::v-deep(ul) {
    margin-left: 2rem;
}
</style>