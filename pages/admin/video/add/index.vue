<script setup lang="ts">
import { ref } from "vue";
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import axios from "axios";

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

const headers = ref([
  { title: "Video Adı", align: "start", key: "name", sortable: false },
  { title: "Video Url", align: "start", key: "link" },
  { title: "", align: "start", key: "action" },
]);

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
    const formData = new FormData();
    formData.append("file", file.value);
    formData.append("title", title.value); 
    formData.append("description", description.value); 

    axios
      .post("http://localhost:5261/api/Video/UploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        console.log("SUCCESS!!");
        title.value = ""; 
        description.value = "";
        file.value = "";
      })
      .catch(() => {
        console.log("FAILURE!!");
      });
  }
};

</script>

<template>
  <BaseBreadcrumb
    :title="page.title"
    :breadcrumbs="breadcrumbs"
  ></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <div>
        <label> Video Başlığı </label>
        <v-text-field v-model="title"></v-text-field>
      </div>
    </v-col>
    <v-col cols="12">
      <div>
        <label> Video Açıklaması </label>
        <v-text-field v-model="description"></v-text-field>
      </div>
    </v-col>
    <v-col cols="12">
      <div>
        <label>
          <input
            type="file"
            accept="video/*"
            @change="handleFileUpload($event)"
          />
        </label>
        <br />
        <video ref="videoPreview" controls v-show="file !== ''" />
        <br />
        <v-btn @click="submitFile()" color="primary">Yükle</v-btn>
      </div>
    </v-col>
  </v-row>
</template>
