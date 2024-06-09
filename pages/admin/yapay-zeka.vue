<script setup lang="ts">
import { ref } from 'vue';
import { useAdminStore } from '@/stores/admin';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Swal from 'sweetalert2';

const page = ref({ title: 'Yapay Zeka' });
const breadcrumbs = ref([
    {
        text: 'Admin',
        disabled: false,
        href: '/admin'
    },
    {
        text: 'Yapay Zeka',
        disabled: true,
        href: '#'
    }
]);
const adminStore = useAdminStore();
const dialog = ref(false);

const handleFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
        try {
            await adminStore.createAIModel(file);

            Swal.fire({
            title: "Başarılı!",
            text: "Veri seti yüklemesi başarılı.",
            icon: "success",
            confirmButtonText: "Tamam",
          })
        } catch(error) {
            Swal.fire({
                icon: 'error',
                title: 'Hata',
                text: 'Model eğitilemedi.',
            });
        }
    }
};

const openDialog = () => {
    dialog.value = true;
};
definePageMeta({
    middleware: ['auth'],
});
</script>

<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-card elevation="10">
        <v-card-text>
            <p class="text-h5 font-weight-thin mb-6">Aşağıda bulunan butona basarak <span
                    class="font-weight-bold">"csv"</span> uzantılı dosya yükleyerek yapay zeka modelini eğitebilirsiniz.
            </p>
            <p class="text-h5 font-weight-thin mb-6 text-primary text-decoration-underline cursor-pointer"
                @click="openDialog">Örnek dosya içeriği için tıklayınız.</p>

            <v-dialog v-model="dialog" max-width="600">
                <v-card>
                    <v-card-title>
                        Örnek Dosya İçeriği
                    </v-card-title>
                    <v-card-text >
                        <div>
                            <p>Korku filmi izlerken elektrikler kesilmişti,Korkmuş</p>
                            <p>İşe başladığımda çok mutlu olmuştum,Mutlu</p>
                        </div>
                    </v-card-text>
                    <v-card-text >
                            <p>Örnek cümle,Duygu</p>
                    </v-card-text>
                    <v-card-text >
                            <p><span class="text-primary">|</span> Sistem <span class="text-primary">"Korkmuş, Mutlu, Bıkkın, Kızgın, Üzgün, Acil Durum"</span> duyguları ile çalışmaktadır. İlgili duygu hallerini içeren veri seti ekleyiniz.</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="dialog = false">Kapat</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <div class="d-flex justify-center">
                <div class="input-file-button">
                    <label for="file-input">
                        <span class="file-label-text">Csv Seç</span>
                    </label>
                    <input type="file" id="file-input" @change="handleFileChange" style="display: none;" />
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.input-file-button {
    padding: 6px 15px;
    background-color: #db2777;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.input-file-button input[type="file"] {
    display: none;
}

.input-file-button label {
    cursor: pointer;
}

.input-file-button label .file-label-text {
    font-size: 14px;
}
</style>
