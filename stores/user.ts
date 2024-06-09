import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { DoctorType, PatientType, CurrentUserType } from '@/types/UserType';
import jwt_decode from 'jwt-decode';
import Crypto from 'crypto-js';

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
    currentUserCookie: any
}
function setCookie(name: string, value: string, expireDays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    // const secureFlag = "secure"; // Sadece HTTPS üzerinde çalışır
    // const httpOnlyFlag = "httponly"; // JavaScript'ten erişimi engeller
    // document.cookie = name + "=" + value + ";" + expires + ";path=/;" + secureFlag + ";" + httpOnlyFlag;
    document.cookie = name + "=" + value + ";" + expires + ";path=/;";
}

function getCookie(name: string): string {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
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
        patients: [],
        currentUserCookie: {}
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

                localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
                localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
                localStorage.setItem('accessTime', response.data.jwtTokenDTO.accessTokenTime);

                if (user.email == 'admin@gmail.com') this.userRole = UserRole.Admin;

            } catch (error) {
                throw new Error(error.message);
            }
        },
        async loginWithGoogle(userToken: string) {
            console.log("token:: ", userToken);

            const response = await axios.post(
                'http://localhost:5261/api/Authentication/LoginViaGoogle',
                JSON.stringify(userToken),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            this.accessToken = response.data.jwtTokenDTO.accessToken;
            this.refreshToken = response.data.jwtTokenDTO.refreshToken;
            this.accessTime = response.data.jwtTokenDTO.accessTokenTime;

            localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
            localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
            localStorage.setItem('accessTime', response.data.jwtTokenDTO.accessTokenTime);

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
                this.accessTime = response.data.jwtTokenDTO.accessTokenTime;
                localStorage.setItem('accessToken', response.data.jwtTokenDTO.accessToken);
                localStorage.setItem('refreshToken', response.data.jwtTokenDTO.refreshToken);
                localStorage.setItem('accessTime', response.data.jwtTokenDTO.accessTokenTime);
            } catch (error) {
                console.error("Error occurred: ", error);
            }
        },
        async refreshAccessToken() {
            try {
                console.log("refresh token")
                const response = await axios.post('http://localhost:5261/api/Authentication/LoginWithRefreshToken', JSON.stringify(localStorage.getItem('refreshToken')), {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                }

                );
                console.log("res::: ", response)

                this.accessToken = response.data.accessToken;
                this.refreshToken = response.data.refreshToken;
                this.accessTime = response.data.accessTokenTime;
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('accessTime', response.data.accessTokenTime);

            } catch (error) {
                console.error('Token yenileme hatası:', error);
                this.logout();
                throw new Error('Oturum süresi doldu. Lütfen tekrar oturum açın.');
            }
        },
        async logout() {
            try {
                await axios.patch('http://localhost:5261/api/Authentication/LogOut', null, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
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
            const response = await axios.get('http://localhost:5261/api/Admin/GetAllPatients', {
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

                this.currentUser = response.data;
                const accessToken = localStorage.getItem('accessToken');

                if (accessToken) {
                    const decodedToken = jwt_decode(accessToken) as Record<string, unknown>;

                    const userRole = decodedToken.role as string | undefined;

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
        async updateDoctor(newInfo: any) {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            };
            await axios.put('http://localhost:5261/api/User/UpdateDoctor', newInfo, config)
        },
        async updateDoctorTitle(titleId: number) {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            };
            await axios.patch(`http://localhost:5261/api/User/UpdateDoctorTitle?doctorTitleId=${titleId}`, null, config)
        },
        async updatePatient(newInfo: any) {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            };
            await axios.put('http://localhost:5261/api/User/UpdatePatient', newInfo, config)
        },
        async changePassword(newPass: any) {
            const config = {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            };
            await axios.patch('http://localhost:5261/api/User/ChangePassword', newPass, config)

        },
        async uploadProfileImage(file: any) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    }
                };
                await axios.patch('http://localhost:5261/api/User/UploadProfileImage', file, config)
                this.getCurrentUser()
            } catch (error) {
                console.log(error)
            }
        },
        async deleteProfileImage() {
            try {
                await axios.patch('http://localhost:5261/api/User/DeleteProfileImage', null, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                })
                this.getCurrentUser()
            } catch (error) {
                console.log(error)
            }
        },
        async resetPassword(password: any, token: string) {
            await axios.post(`http://localhost:5261/api/Authentication/ResetPassword?token=${token}`, password)
        },
        async forgotPassword(email: string) {
            await axios.post(`http://localhost:5261/api/Authentication/ForgotPassword?email=${email}`)
        },
        async mailConfirm(email: any, token: any) {
            await axios.get(`http://localhost:5261/api/Authentication/ConfirmEmail?email=${email}&token=${token}`)
        }
    }
});
