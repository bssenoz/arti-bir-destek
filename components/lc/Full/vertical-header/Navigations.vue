<template>
  <NuxtLink to="/profile" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary" class="text-h5"
      :class="{ 'underline': $route.path === '/profile' }">Profil</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/mesaj" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary" class="text-h5"
      :class="{ 'underline': $route.path === '/profile/mesaj' }">Mesaj</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/randevu/randevularim" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary" class="text-h5"
      :class="{ 'underline': $route.path === '/profile/randevu/randevularim' }">Randevu</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/randevu/takvim" class="text-decoration-none" v-if="isDoctor">
    <v-btn variant="text" color="primary" class="text-h5"
      :class="{ 'underline': $route.path === '/profile/randevu/takvim' }">Takvim</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/video" class="text-decoration-none" v-if="!isAdmin">
    <v-btn variant="text" color="primary" class="text-h5"
      :class="{ 'underline': $route.path === '/profile/video' }">Videolar</v-btn>
  </NuxtLink>
  <NuxtLink to="/profile/video/istatistikler" class="text-decoration-none" v-if="isPatient">
    <v-btn variant="text" color="primary" class="text-h5"
      :class="{ 'underline': $route.path === '/profile/video/istatistikler' }">İstatistiklerim</v-btn>
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
  if (userRole == "Admin") isAdmin.value = true;
  if (userRole == "Doctor") isDoctor.value = true;
  if (userRole == "Patient") isPatient.value = true;

} else {
  console.error('Access token bulunamadı veya null.');
}

</script>

<style>
.underline {
  position: relative;
}

.underline:before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 47%;
  width: 5px;
  height: 5px;
  background-color: #db2777;
  border-radius: 50%;
}
</style>