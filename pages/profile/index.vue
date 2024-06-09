<script setup lang="ts">
import ProfileBanner from '@/components/pages/user-profile/ProfileBanner.vue';
import TimelineDoctor from '@/components/pages/user-profile/TimelineDoctor.vue';
import TimelinePatient from '~/components/pages/user-profile/TimelinePatient.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

onMounted(() => {
  userStore.getCurrentUser()
});

const user = computed(() => {
  return userStore.currentUser;
});
const userRole = computed(() => {
  return userStore.userRole;
})

definePageMeta({
  layout: "randevu",
  middleware: [
    'auth',
  ],
});
</script>

<template>
  <ProfileBanner :user="user" />
  <v-container style="max-width: 1200px;">
    <v-row class="mt-8">
      <v-col cols="12" md="8">
        <v-row>
          <v-col cols="6" lg="4">
            <v-card class="py-3" elevation="4" href="/profile/ayarlar">
              <v-card-title>
                 <SettingsIcon />Kullanıcı Ayarları
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" lg="4">
            <v-card class="py-3" elevation="4" href="/profile/mesaj">
              <v-card-title>
                <Message2Icon />Mesajlar
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" lg="4" v-if="userRole == 'Doctor'">
            <v-card class="py-3" elevation="4" href="/profile/danisanlar">
              <v-card-title>
                <UsersIcon /> Danışanlarım
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" lg="4" v-if="userRole == 'Doctor'">
            <v-card class="py-3" elevation="4" href="/profile/randevu/takvim">
              <v-card-title>
                <CalendarIcon /> Takvim
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" lg="4">
            <v-card class="py-3" elevation="4" href="/profile/randevu/randevularim">
              <v-card-title>
                <CalendarPlusIcon /> Randevular
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" lg="4" >
            <v-card class="py-3" elevation="4" href="/profile/video">
              <v-card-title>
                <VideoIcon /> Videolar
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="6" lg="4" v-if="userRole == 'Patient'">
            <v-card class="py-3" elevation="4" href="/profile/video/istatistikler">
              <v-card-title>
                <PercentageIcon /> Video İstatistikleri
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="4">
      <p class="text-center" v-if="!user.phoneNumber">Lütfen Kullanıcı Ayarları kısmından telefon numaranızı ekleyin!</p>
        <TimelinePatient v-if="userRole == 'Patient'" :user="user"/>
        <TimelineDoctor v-if="userRole == 'Doctor'" :user="user"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-btn {
  border-radius: 0;
  border: 1px solid #ccc;
}

.v-btn:hover {
  border: 1px solid #db2777;
  background-color: #db2777;
  color: #fff;
}

.v-card:hover {
    box-shadow: 0px 7px 8px -4px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 12px 17px 2px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 5px 22px 4px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
}
</style>
