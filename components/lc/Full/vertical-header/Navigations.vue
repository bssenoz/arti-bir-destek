
<template>
    <NuxtLink to="/profile" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary">Profil </v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/mesaj" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary">Mesaj</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/randevu/randevularim" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary">Randevu</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/randevu/takvim" class="text-decoration-none" v-if="isDoctor">
    <v-btn variant="text" color="primary">Takvim</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/video" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary">Videolar </v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/video/istatistikler" class="text-decoration-none" v-if="isPatient">
    <v-btn variant="text" color="primary">İstatistiklerim </v-btn>
  </NuxtLink>

</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import jwt_decode from 'jwt-decode';

const isAdmin = ref(false);
const isPatient = ref(false);
const isDoctor = ref(false);

const accessToken = localStorage.getItem('accessToken');

if (accessToken) {
  const decodedToken = jwt_decode(accessToken) as Record<string, unknown>;

  const userRole = decodedToken.role as string | undefined; 

  console.log('Kullanıcı rolü:', userRole);
  if(userRole == "Admin") isAdmin.value = true;
  if(userRole == "Doctor") isDoctor.value = true;
  if(userRole == "Patient") isPatient.value = true;

} else {
  console.error('Access token bulunamadı veya null.');
}



</script>