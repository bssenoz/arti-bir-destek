import { defineStore } from 'pinia';
import axios from '@/utils/axios';

interface UserType {
    user: any;
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserType => ({
        user: {},
    }),
    actions: {
        async registerPatient(newUser: any) {
            try {
                const response = await axios.post('http://localhost:5034/api/Authentication/RegisterForPatient', newUser);
                console.log("Kullanıcı başarıyla kaydedildi:", response.data);
            } catch(error) {
                console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
                throw new Error("Kullanıcı kaydedilemedi.");
            }
        },
        async registerDoctor(newUser: any) {
            try {
                const response = await axios.post('http://localhost:5034/api/Authentication/RegisterForDoctor', newUser);
                console.log("Kullanıcı başarıyla kaydedildi:", response.data);
            } catch(error) {
                console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
                throw new Error("Kullanıcı kaydedilemedi.");
            }
        },
        async login(user: any) {
            try {
                const response = await axios.post('http://localhost:5034/api/Authentication/Login', user);
                console.log("Kullanıcı giriş yaptı:", response.data);
            } catch(error) {
                console.error("Kullanıcı giriş yaparken bir hata oluştu:", error);
                throw new Error("Giriş yapılamadı.");
            }
        }
    }
});
