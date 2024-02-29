import { defineStore } from 'pinia';
import axios from '@/utils/axios';

interface UserType {
    user: any;
    refreshToken: string | null;
    accessToken: string | null;
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserType => ({
        user: {},
        refreshToken: localStorage.getItem('refreshToken'),
        accessToken: localStorage.getItem('accessToken')
    }),
    actions: {
        async registerPatient(newUser: any) {
            try {
                const response = await axios.post('http://localhost:5034/api/Authentication/RegisterForPatient', newUser);
                console.log("Kullanıcı başarıyla kaydedildi:", response.data);
            } catch (error) {
                console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
                throw new Error("Kullanıcı kaydedilemedi.");
            }
        },
        async registerDoctor(newUser: any) {
            try {
                const response = await axios.post('http://localhost:5034/api/Authentication/RegisterForDoctor', newUser);
                console.log("Kullanıcı başarıyla kaydedildi:", response.data);
            } catch (error) {
                console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
                throw new Error("Kullanıcı kaydedilemedi.");
            }
        },
        async login(user: any) {
            try {
                const response = await axios.post('http://localhost:5034/api/Authentication/Login', user);
                console.log("Kullanıcı giriş yaptı:", response.data);

                this.user = response.data.user;
                this.accessToken = response.data.jwtTokenDTO.accessToken;
                this.refreshToken = response.data.jwtTokenDTO.refreshToken;
                // localStorage'a tokenları kaydet
                localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
                localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
                console.log("ref: ", this.refreshToken)
                console.log("acc: ", this.accessToken)

                // // Access token süresi dolarsa refresh token kullanarak yeni bir access token al
                // setTimeout(() => {
                //     this.refreshAccessToken();
                // }, (response.data.jwtTokenDTO.accessTokenExpirationTime * 1000) - Date.now()); // Access token'ın süresi dolduktan sonra refresh token kullanarak otomatik olarak yenile

            } catch (error) {
                console.error("Kullanıcı giriş yaparken bir hata oluştu:", error);
                throw new Error("Giriş yapılamadı.");
            }
        },
        async refreshAccessToken() {
            try {
                console.log("refresh token")
                const refreshToken = this.refreshToken;
                const response = await axios.post('http://localhost:5034/api/Authentication/RefreshToken', { refreshToken });
                const newAccessToken = response.data.accessToken;
                this.accessToken = newAccessToken;
                // localStorage'a yeni accessToken'u kaydet
                localStorage.setItem('accessToken', newAccessToken);
            } catch (error) {
                console.error('Token yenileme hatası:', error);
                this.logout(); // Access token süresi dolarsa kullanıcıyı oturumdan çıkar
                throw new Error('Oturum süresi doldu. Lütfen tekrar oturum açın.');
            }
        },
        async logout() {
            try {
                this.user = {};
                this.refreshToken = null;
                this.accessToken = null;

                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');

            } catch (error) {
                console.error('Oturum kapatma hatası:', error);
                throw new Error('Oturum kapatılamadı.');
            }
        }
    }
});
