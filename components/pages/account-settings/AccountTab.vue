<script setup lang="ts">
import { ref } from 'vue';

/*change password*/
const currenypwd = ref('123456789142');
const newpwd = ref('123456789142');
const confirmpwd = ref('123456789142');

/*personal detail*/
const name = ref('Mathew');
const surname = ref('Anderson');
const email = ref('mathew@gmail.com');
const pregnancyStartDate = ref('11.11.2023');
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);

</script>

<template>
    <v-card elevation="10" >
        <v-row class="ma-sm-n2 ma-n1">
          
            <v-col cols="12" sm="6">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Fotoğraf</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">Profil resminizi buradan değiştirin.</div>
                        <div class="text-center mt-6 mb-6">
                            <v-avatar size="120">
                                <img src="/images/profile/user-1.jpg" height="120" alt="image" />
                            </v-avatar>
                        </div>
                        <div class="d-flex justify-center">
                            <v-btn color="primary" class="mx-2" flat> Yükle</v-btn>
                            <v-btn color="error" class="mx-2" variant="outlined" flat>Sıfırla</v-btn>
                        </div>
                        <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6">Allowed JPG, GIF or PNG. Max size of 800K</div>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Şifre</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">Şifrenizi değiştirmek için buradan onaylayın.</div>
                        <div class="mt-5">
                            <v-label class="mb-2 font-weight-medium">Mevcut Şifre</v-label>
                            <v-text-field
                                color="primary"
                                v-model="currenypwd" hide-details="auto"  required variant="outlined"
                :type="show1 ? 'text' : 'password'"  :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show1 = !show1"
                            />
                            <v-label class="mb-2 font-weight-medium">Yeni Şifre</v-label>
                            <v-text-field
                                color="primary"
                                v-model="newpwd" hide-details="auto"  required variant="outlined"
                :type="show2 ? 'text' : 'password'"  :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show2 = !show2"
                            />
                            <v-label class="mb-2 font-weight-medium">Şifreyi Onayla</v-label>
                            <v-text-field
                                color="primary"
                                v-model="confirmpwd" hide-details="auto"  required variant="outlined"
                :type="show3 ? 'text' : 'password'"  :append-inner-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append-inner="show3 = !show3"
                            />
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Kullanıcı Bilgileri</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">Kişisel bilgilerinizi değiştirmek için buradan düzenleyip kaydedin.</div>
                        <div class="mt-5">
                            <v-row>
                                <v-col cols="12" md="6">
                                     <v-label class="mb-2 font-weight-medium">Ad</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="name"
                                            hide-details
                                        />
                                </v-col>
                                <v-col cols="12" md="6">
                                     <v-label class="mb-2 font-weight-medium">Soyad</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="surname"
                                            hide-details
                                        />
                                </v-col>
                                <v-col cols="12" md="6">        
                                        <v-label class="mb-2 font-weight-medium">Email</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="email"
                                            hide-details
                                        />
                                </v-col>
                                <v-col cols="12" md="6">        
                                        <v-label class="mb-2 font-weight-medium">Gebelik Başlama Tarihi</v-label>
                                        <v-text-field
                                            color="primary"
                                            variant="outlined"
                                            type="text"
                                            v-model="pregnancyStartDate"
                                            hide-details
                                        />
                                </v-col>
       
                            </v-row>
                        </div>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <div class="d-flex justify-end mt-5">
            <v-btn size="large" color="primary" class="mr-4" flat>Kaydet</v-btn>
            <v-btn size="large" class="bg-lighterror text-error"  flat>İptal</v-btn>
        </div>
    </v-card>
</template>
