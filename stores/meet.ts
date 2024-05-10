import { defineStore } from 'pinia';
import axios from '@/utils/axios';

interface meetType {
    meets: any;
    schedule: any;
    allSchedule: any;
    patientAppointment: any;
}

export const useMeetStore = defineStore({
    id: 'meet',
    state: (): meetType => ({
        meets: [],
        schedule: [],
        allSchedule: [],
        patientAppointment: []
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
        async postCalendar(time: any, data: any) {
    
                await axios.post('http://localhost:5261/api/DoctorSchedule/CreateDoctorSchedule', time, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
                // this.addAppointmentSchedule(data)

      
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
                const response = await axios.get('http://localhost:5261/api/DoctorSchedule/GetDoctorSchedules', {
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
        },
        // async addAppointmentSchedule(data: any) {
        //     const response = await axios.post('http://localhost:5261/api/AppointmentSchedule/AddAppointmentSchedule', data, {
        //         headers: {
        //             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        //             'Content-Type': 'application/json'
        //         },
        //     })
        // },
        // async getAllAppointmentSchedule() {
        //     try {
        //         const response = await axios.get('http://localhost:5261/api/AppointmentSchedule/GetAllAppointmentSchedules', {
        //             headers: {
        //                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        //                 'Content-Type': 'application/json'
        //             },
        //         });
        //         this.allSchedule = response.data;
        //         console.log("al: ",this.allSchedule)
        //     } catch (error) {
        //         console.error(error);
        //         alert('Hata oluştu. Lütfen tekrar deneyin.');
        //     }
        // },
        async getAllAppointmentSchedule(date: string) {
            try {
                console.log(date)
                const response = await axios.get(`http://localhost:5261/api/AppointmentSchedule/GetAllAppointmentSchedules?date=${date}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.allSchedule = response.data;
                console.log("al: ",this.allSchedule)
            } catch (error) {
                console.error(error);
                this.allSchedule = '';
            }
        },
        async makeAppointment(newAppointment: any) {
            try {
                console.log(newAppointment)
                const response = await axios.patch('http://localhost:5261/api/Appointment/MakeAppointment',newAppointment, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.getAllAppointmentSchedule(newAppointment.day)
            } catch (error) {
                console.error(error);
            }
        },
        async fetchPatientAppointments() {
            try {
                // console.log(newAppointment)
                const response = await axios.get('http://localhost:5261/api/Appointment/GetPatientAppointments', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.patientAppointment = response.data.reverse()
                console.log(this.patientAppointment)
                // this.patientAppointment(newAppointment.day)
            } catch (error) {
                console.error(error);
            }
        },
    }
});
