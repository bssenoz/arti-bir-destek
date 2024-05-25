<template>
    <div class="video-background">
        <video autoplay loop muted playsinline>
            <source :src="profilevideo" type="video/mp4">
        </video>
        <div class="content">
            <v-row class="text-center d-flex justify-center">
                <v-card elevation="10" width="450" class="text-center top-card">
                    <v-col cols="12" class="profile-image">
                        <div class="avatar-border">
                            <v-avatar size="120" class="userImage">

                                <div v-if="user.profileImageUrl">
                                    <v-img :src="user.profileImageUrl" width="120"
                                        class="rounded-circle img-fluid"></v-img>
                                </div>
                                <div v-else>
                                    <v-img :src="userPng" width="120" />
                                </div>
                            </v-avatar>

                        </div>
                    </v-col>
                    <v-col cols="12">
                        <div class="profile-details ">
                            <div class="text-h3">{{ user.name }} {{ user.surname }}</div>
                            <p class="email text-h5 font-weight-regular">{{ user.email }}</p>
                            <p class="phone text-h5 font-weight-regular">{{ user.phoneNumber }}</p>
                        </div>
                    </v-col>
                </v-card>
            </v-row>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import userPng from '/images/profile/user.png';
import profilevideo from '/images/backgrounds/papatya.mp4';

const userStore = useUserStore();
onMounted(() => {
    userStore.getCurrentUser()
});

const user = computed(() => {
    return userStore.currentUser;
});

</script>

<style scoped lang="scss">
.profile-card {
    padding: 20px;

}

.profile-image {
    display: flex;
    align-items: center;
}

.avatar-border {
    background-image: linear-gradient(rgb(80, 178, 252), rgb(244, 76, 102));
    border-radius: 50%;
    width: 130px;
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
}

.userImage {
    border: 4px solid rgb(255, 255, 255);
}

.email,
.phone {
    font-size: 14px;
    color: #666;
}

.profile-actions {
    margin-top: 20px;
}

@media (max-width: 1023px) {
    .profile-actions {
        flex-direction: column;
    }
}

.video-background {
    position: relative;
    width: 100%;
    height: 50vh;
    overflow: hidden;
}

.video-background video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content {
    position: relative;
    z-index: 1;
}

@media (max-width: 700px) {
    .v-card {
        width: 320px !important;
    }
}
.top-card {
    top: 15vh;
}
</style>