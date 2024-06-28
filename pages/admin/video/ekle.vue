<script setup lang="ts">
import { ref } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import axios from "axios";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Swal from "sweetalert2";

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

const file = ref<File | string>("");

definePageMeta({
    layout: "default",
    middleware: ['auth'],
});

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

          Swal.fire({
            title: "Başarılı!",
            text: "Video başarıyla eklendi!",
            icon: "success",
            confirmButtonText: "Tamam",
          }).then(() => {
            window.location.reload();
        });

        })
        .catch(() => {
          Swal.fire({
            title: "Hata!",
            text: "Video eklenemedi!",
            icon: "error",
            confirmButtonText: "Tamam",
          });
        });

    } else {
      Swal.fire({
        title: "Hata!",
        text: "Video eklenemedi!",
        icon: "error",
        confirmButtonText: "Tamam",
      });
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


  </v-row>
</template>

<style scoped>
::v-deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}

::v-deep(.ql-container.ql-snow) {
  height: 400px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
}

video {
  width: 40%;
}
</style>