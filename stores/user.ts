import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { DoctorType, PatientType, CurrentUserType } from '@/types/UserType';
import jwt_decode from 'jwt-decode';

export enum UserRole {
    Doctor = 'Doctor',
    Admin = 'Admin',
    Patient = 'Patient'
}

export interface UserType {
    userRole: UserRole;
    currentUser: CurrentUserType;
    user: any;
    refreshToken: string | null;
    accessToken: string | null;
    accessTime: string | null;
    doctors: Array<DoctorType>
    patients: Array<PatientType>
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserType => ({
        user: {},
        userRole: UserRole.Patient,
        currentUser: {
            id: '',
            name: '',
            surname: '',
            email: '',
            phoneNumber: null,
            profileImageUrl: null,
            title: null
        },
        refreshToken: localStorage.getItem('refreshToken'),
        accessToken: localStorage.getItem('accessToken'),
        accessTime: localStorage.getItem('accessTime'),
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
                console.log("Kullanıcı giriş yaptı:", response.data.jwtTokenDTO);

                this.accessToken = response.data.jwtTokenDTO.accessToken;
                this.refreshToken = response.data.jwtTokenDTO.refreshToken;
                this.accessTime = response.data.jwtTokenDTO.accessTokenTime;
                // console.log("tihs: ",this.accessTime)
                // // localStorage'a tokenları kaydet
                localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
                localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
                localStorage.setItem('accessTime', response.data.jwtTokenDTO.accessTokenTime);

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
        async loginWithGoogle(userToken: string) {
            console.log("token:: ", userToken);
            try {
                const response = await axios.post(
                    'http://localhost:5261/api/Authentication/LoginViaGoogle',
                    JSON.stringify(userToken),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log("res: ", response.data);
                this.accessToken = response.data.jwtTokenDTO.accessToken;
                this.refreshToken = response.data.jwtTokenDTO.refreshToken;

                localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
                localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
            } catch (error) {
                console.error("Error occurred: ", error);
            }
        },
        async loginWithFacebook(userToken: string) {
            console.log("token:: ", userToken);
            try {
                const response = await axios.post(
                    'http://localhost:5261/api/Authentication/LoginViaFacebook',
                    JSON.stringify(userToken),
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log("res: ", response.data);
                this.accessToken = response.data.jwtTokenDTO.accessToken;
                this.refreshToken = response.data.jwtTokenDTO.refreshToken;

                localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
                localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
            } catch (error) {
                console.error("Error occurred: ", error);
            }
        },
        async refreshAccessToken() {
            try {
                debugger;
                console.log("refresh token")
                const response = await axios.post('http://localhost:5261/api/Authentication/LoginWithRefreshToken', JSON.stringify(localStorage.getItem('refreshToken')), {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                }

                );
                const newAccessToken = response.data.accessToken;
                this.accessToken = newAccessToken;

                localStorage.setItem('accessToken', newAccessToken);
            } catch (error) {
                console.error('Token yenileme hatası:', error);
                this.logout();
                throw new Error('Oturum süresi doldu. Lütfen tekrar oturum açın.');
            }
        },
        async logout() {
            try {
                this.refreshToken = null;
                this.accessToken = null;
                this.accessTime = null;

                localStorage.removeItem('refreshToken');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('accessTime');


            } catch (error) {
                console.error('Oturum kapatma hatası:', error);
                throw new Error('Oturum kapatılamadı.');
            }
        },
        async fetchUserDoctor() {
            const response = await axios.get('http://localhost:5261/api/User/GetAllDoctors', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.doctors = response.data
        },
        async fetchUserPatient() {
            const response = await axios.get('http://localhost:5261/api/User/GetAllPatients', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.patients = response.data
        },

        async getCurrentUser() {
            try {
                const response = await axios.get('http://localhost:5261/api/User/GetCurrentUser', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                this.currentUser = response.data
                const accessToken = localStorage.getItem('accessToken');

                if (accessToken) {
                    const decodedToken = jwt_decode(accessToken) as Record<string, unknown>;

                    const userRole = decodedToken.role as string | undefined;

                    console.log('Kullanıcı rolü:', userRole);
                    if (userRole == "Admin") this.userRole = UserRole.Admin;
                    if (userRole == "Doctor") this.userRole = UserRole.Doctor;
                    if (userRole == "Patient") this.userRole = UserRole.Patient;

                } else {
                    console.error('Access token bulunamadı veya null.');
                }
            } catch (error) {
                console.error('Error while fetching current user:', error);
                throw new Error('Failed to fetch current user.');
            }
        },
        async getUserId(id: string) {
            try {
                const response = await axios.get(`http://localhost:5261/api/User/GetUserById?userID=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.user = response.data
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
