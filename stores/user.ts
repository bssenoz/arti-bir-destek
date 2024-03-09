import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { DoctorType, PatientType } from '@/types/UserType';

interface UserType {
    currentUser: any;
    fromUser: any;
    refreshToken: string | null;
    accessToken: string | null;
    doctors: Array<DoctorType>
    patients: Array<PatientType>
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserType => ({
        currentUser: {},
        fromUser: {},
        refreshToken: localStorage.getItem('refreshToken'),
        accessToken: localStorage.getItem('accessToken'),
        doctors: [],
        patients: []
    }),
    actions: {
        async registerPatient(newUser: any) {
            try {
                const response = await axios.post('http://localhost:5261/api/Authentication/RegisterForPatient', newUser);
                console.log("Kullanıcı başarıyla kaydedildi:", response.data);
            } catch (error) {
                console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
                throw new Error("Kullanıcı kaydedilemedi.");
            }
        },
        async registerDoctor(newUser: any) {
            try {
                console.log(newUser)
                const response = await axios.post('http://localhost:5261/api/Authentication/RegisterForDoctor', newUser);
                console.log("Kullanıcı başarıyla kaydedildi:", response.data);
            } catch (error) {
                console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
                throw new Error("Kullanıcı kaydedilemedi.");
            }
        },
        async login(user: any) {
            try {
                const response = await axios.post('http://localhost:5261/api/Authentication/Login', user);
                console.log("Kullanıcı giriş yaptı:", response.data);

                this.accessToken = response.data.jwtTokenDTO.accessToken;
                this.refreshToken = response.data.jwtTokenDTO.refreshToken;
                // // localStorage'a tokenları kaydet
                localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
                // localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
                // console.log("ref: ", this.refreshToken)
                // console.log("acc: ", this.accessToken)

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
                const response = await axios.post('http://localhost:5261/api/Authentication/RefreshToken', { refreshToken });
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
                this.refreshToken = null;
                this.accessToken = null;

                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');

            } catch (error) {
                console.error('Oturum kapatma hatası:', error);
                throw new Error('Oturum kapatılamadı.');
            }
        },
        async fetchUserDoctor() {
            const response = await axios.get('http://localhost:5261/api/User/GetAllDoctors')
            this.doctors = response.data
        },
        async fetchUserPatient() {
            const response = await axios.get('http://localhost:5261/api/User/GetAllPatients')
            this.patients = response.data
        },
        async fromUserChange(newFromUser: any) {
            this.fromUser = newFromUser
            console.log("this: ", this.fromUser)
        },
        async getCurrentUser() {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            };

            try {
                const response = await axios.get('http://localhost:5261/api/User/GetCurrentUser', config);
                this.currentUser = response.data
            } catch (error) {
                console.error('Error while fetching current user:', error);
                throw new Error('Failed to fetch current user.');
            }
        },
        async deleteUser(userId?: any) {
            try {
                await axios.delete('http://localhost:5261/api/User/DeleteUser', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(userId)
                });
                  
            } catch (error) {
                console.error('Delete request failed:', error);
            }
        },
        async deleteCurrentUser() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`
                    }
                };
                await axios.delete('http://localhost:5261/api/User/DeleteCurrentUser', config);
                  
            } catch (error) {
                console.error('Delete request failed:', error);
            }
        },
    }
});
