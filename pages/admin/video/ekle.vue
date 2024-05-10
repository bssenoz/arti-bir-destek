<script setup lang="ts">
import { ref } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import axios from "axios";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const page = ref({ title: "Video Yükle" });
const breadcrumbs = ref([
  {
    text: "Admin",
    disabled: false,
    href: "/admin",
  },
  {
    text: "Video",
    disabled: false,
    href: "/admin/video",
  },
  {
    text: "Video Yükle",
    disabled: true,
    href: "/admin/video/add",
  },
]);

const errorDialog = ref(false);
const errorDialog2 = ref(false);
const file = ref<File | string>("");

const videoPreview = ref<HTMLVideoElement | null>(null);

const title = ref("");
const description = ref("");

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0];
    file.value = selectedFile;
    previewVideo(selectedFile);
  }
};

const previewVideo = (selectedFile: File) => {
  if (videoPreview.value && selectedFile !== null) {
    videoPreview.value.src = URL.createObjectURL(selectedFile);
  }
};

const submitFile = () => {
  if (file.value !== "") {
    console.log(title.value.length)
    if (title.value.length < 100) {
      const formData = new FormData();
      formData.append("file", file.value);
      formData.append("title", title.value);
      formData.append("description", description.value);

      axios
        .post("http://localhost:5261/api/Admin/UploadVideo", formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            "Content-Type": "multipart/form-data",
          },

        })
        .then(() => {
          title.value = "";
          description.value = "";
          file.value = "";
        })
        .catch(() => {
          errorDialog2.value = true;
        });

    } else {
      errorDialog.value = true;
    }
  }
};

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <div>
        <label> Video Başlığı <span class="text-primary">*</span></label>
        <v-text-field v-model="title" :counter="100"></v-text-field>
      </div>
    </v-col>
    <v-col cols="12">
      <div>
        <label> Video Açıklaması </label>
        <quill-editor v-model:content="description" content-type="html" theme="snow"></quill-editor>
      </div>
    </v-col>
    <v-col cols="12">
      <div>
        <label>
          <input type="file" accept="video/*" @change="handleFileUpload($event)" />
        </label>
        <br />
        <video ref="videoPreview" controls v-show="file !== ''" />
        <br />
        <v-btn @click="submitFile()" color="primary">Yükle</v-btn>
      </div>
    </v-col>

    <v-dialog v-model="errorDialog" max-width="500">
      <v-card>
        <v-card-title>Karakter Sınırı Aşıldı!</v-card-title>
        <v-card-text>
          Başlık en fazla 100 karakter olabilir. Lütfen kontrol ediniz.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="errorDialog = false">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="errorDialog2" max-width="500">
      <v-card>
        <v-card-title>HATA!</v-card-title>
        <v-card-text>
          Video yüklenemedi. Lütfen tekrar deneyiniz.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="errorDialog2 = false">Tamam</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

