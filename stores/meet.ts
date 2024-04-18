import { defineStore } from 'pinia';
import axios from '@/utils/axios';

interface meetType {
    meets: any;
    schedule: any;
}

export const useMeetStore = defineStore({
    id: 'meet',
    state: (): meetType => ({
        meets: [],
        schedule: [],
    }),
    getters: {

    },
    actions: {
        async fetchMeets() {
            try {
                console.log("fetchh")
                const data = await axios.get('/api/data/meet/MeetData');
                console.log("data: ", data)
                this.meets = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async postCalendar(time: any) {
            await axios.post('http://localhost:5261/api/DoctorSchedule/CreateDoctorSchedule', time, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
        },
        async updateCalendar(time: any) {
            await axios.put('http://localhost:5261/api/DoctorSchedule/UpdateDoctorSchedule', time, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
        },
        async getDoctorSchedule() {
            try {
                const response = await axios.get('http://localhost:5261/api/DoctorSchedule/GetDoctorSchedule', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.schedule = response.data;
            } catch (error) {
                console.error(error);
                alert('Hata oluştu. Lütfen tekrar deneyin.');
            }
        }
        
    }
});
