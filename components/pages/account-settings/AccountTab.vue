<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import userProfile from '/images/profile/user.png';
import { ChangePassword, UpdateDoctor, UpdatePatient } from '@/types/UserType';
import Swal from 'sweetalert2';

const userStore = useUserStore();
const router = useRouter();

const currentPass = ref();
const newPass = ref();
const confirmPass = ref();

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);

const props = defineProps({ user: Object, userRole: Object });

const fileInputRef = ref<HTMLInputElement | null>(null);

const formData = new FormData();

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
        formData.append('file', file)
        handleFile(formData);
    }
};

const handleFile = (file: File) => {
    console.log(file)

    userStore.uploadProfileImage(file)
};

const currentDelete = () => {
    Swal.fire({
        title: 'Hesabını Sil',
        text: 'Bu işlem geri alınamaz! Hesabını silmek istediğinden emin misin?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, Sil',
        cancelButtonText: 'İptal'
    }).then((result) => {
        if (result.isConfirmed) {
            userStore.deleteCurrentUser().then(() => {
                userStore.logout()
                router.push({ path: '/' });
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Kullanıcıyı silerken bir hata oluştu.',
                    confirmButtonColor: '#3085d6',
                });
            });
        }
    });
};

const changePassword = async () => {
    try {
        const newPassword: ChangePassword = {
            oldPassword: currentPass.value,
            newPassword: newPass.value,
            confirmPassword: confirmPass.value,
        };
        await userStore.changePassword(newPassword)

        Swal.fire({
            title: "Başarılı!",
            text: "Şifreniz başarıyla değiştirildi.",
            icon: "success",
            confirmButtonText: "Tamam",
        });
    } catch (error) {
        Swal.fire({
            title: "Hata!",
            text: "Lütfen doğru bilgileri girdiğinizden emin olunuz.",
            icon: "error",
            confirmButtonText: "Tamam",
        });
    }
}

const deleteProfileImage = () => {
    Swal.fire({
        title: 'Resmi Sıfırla',
        text: 'Profil resmini sıfırlamak istediğinden emin misin?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Evet, Sıfırla',
        cancelButtonText: 'İptal'
    }).then((result) => {
        if (result.isConfirmed) {
            userStore.deleteProfileImage();
        }
    });
}
const updateUser = async () => {
    try {
        if (props.userRole == 'Doctor') {
            const userInfo: UpdateDoctor = {
                name: props.user.name,
                surname: props.user.surname,
                phoneNumber: props.user.phoneNumber,
                title: props.user.title,
            }
            await userStore.updateDoctor(userInfo)

        }
        if (props.userRole == 'Patient') {
            const userInfo: UpdatePatient = {
                name: props.user.name,
                surname: props.user.surname,
                phoneNumber: props.user.phoneNumber,
            }
            await userStore.updatePatient(userInfo)
        }
        Swal.fire({
            title: "Başarılı!",
            text: "Bilgileriniz başarıyla değiştirildi.",
            icon: "success",
            confirmButtonText: "Tamam",
        });
    } catch (error) {
        Swal.fire({
            title: "Hata!",
            text: "Bilgilerinizi değiştirilirken bir hatayla karşılaşıldı. Lütfen tekrar deneyiniz.",
            icon: "error",
            confirmButtonText: "Tamam",
        });
    }
}
</script>

<template>
    <v-row class="ma-sm-n2 ma-n1">

        <v-col cols="12" sm="6">
            <v-card elevation="10">
                <v-card-item>
                    <h5 class="text-h5">Fotoğraf</h5>
                    <div class="text-subtitle-1 text-medium-emphasis mt-2">Profil resminizi buradan değiştirin.
                    </div>
                    <div class="text-center mt-6 mb-6">
                        <v-avatar size="120">
                            <img :src="user.profileImageUrl" height="120" alt="image" v-if="user.profileImageUrl" />
                            <img :src="userProfile" height="120" alt="image" v-else />
                        </v-avatar>
                    </div>
                    <div class="d-flex justify-center">
                        <div class="input-file-button">
                            <label for="file-input">
                                <span class="file-label-text">Resim Seç</span>
                            </label>
                            <input type="file" id="file-input" @change="handleFileChange" style="display: none;" />
                        </div>
                        <v-btn color="error" class="mx-2" variant="outlined" @click="deleteProfileImage">Sıfırla</v-btn>
                    </div>
                    <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">Lütfen sadece JPG, JPEG ya
                        da
                        PNG yükleyin.</div>

                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6">
            <v-card elevation="10">
                <v-card-item>
                    <h5 class="text-h5">Şifre</h5>
                    <div class="text-subtitle-1 text-medium-emphasis mt-2">Şifrenizi değiştirmek için buradan
                        onaylayın.</div>
                    <div class="mt-5">
                        <v-label class="mb-2 font-weight-medium">Mevcut Şifre</v-label>
                        <v-text-field color="primary" v-model="currentPass" hide-details="auto" required
                            variant="outlined" :type="show1 ? 'text' : 'password'"
                            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-inner="show1 = !show1" />
                        <v-label class="mb-2 font-weight-medium">Yeni Şifre</v-label>
                        <v-text-field color="primary" v-model="newPass" hide-details="auto" required variant="outlined"
                            :type="show2 ? 'text' : 'password'" :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-inner="show2 = !show2" />
                        <v-label class="mb-2 font-weight-medium">Şifreyi Onayla</v-label>
                        <v-text-field color="primary" v-model="confirmPass" hide-details="auto" required
                            variant="outlined" :type="show3 ? 'text' : 'password'"
                            :append-inner-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append-inner="show3 = !show3" />
                        <v-btn color="primary" class="mt-4 float-right" @click="changePassword">Kaydet</v-btn>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-item>
                    <h5 class="text-h5">Kullanıcı Bilgileri</h5>
                    <div class="text-subtitle-1 text-medium-emphasis mt-2">Kişisel bilgilerinizi değiştirmek için
                        buradan düzenleyip kaydedin.</div>
                    <div class="mt-5">
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Ad</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="user.name"
                                    hide-details />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Soyad</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="user.surname"
                                    hide-details />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Email</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="user.email"
                                    disabled hide-details />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Telefon Numarası</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="user.phoneNumber"
                                    hide-details />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-label class="mb-2 font-weight-medium">Ünvan</v-label>
                                <v-text-field color="primary" variant="outlined" type="text" v-model="user.title"
                                    hide-details />
                            </v-col>

                        </v-row>
                    </div>
                    <div class="d-flex justify-end mt-5">
                        <v-btn color="primary" class="mr-4" @click="updateUser">Kaydet</v-btn>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-card elevation="10">
                <v-card-item>
                    <v-btn text="Hesabımı Sil" size="large" @click="currentDelete" class="bg-lighterror text-error"
                        flat></v-btn>

                </v-card-item>
            </v-card>
        </v-col>
    </v-row>

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