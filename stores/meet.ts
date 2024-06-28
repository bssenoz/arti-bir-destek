import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

interface meetType {
    meets: any;
    schedule: any;
    allSchedule: any;
    patientAppointment: any;
    doctorAppointment: any;
    allPatients: any;
    userReport: any;
    pastAppointment: any;
    getUser: any;
    patientDoctors: any;
}

export const useMeetStore = defineStore({
    id: 'meet',
    state: (): meetType => ({
        meets: [],
        schedule: [],
        allSchedule: [],
        patientAppointment: [],
        doctorAppointment: [],
        allPatients: [],
        userReport: [],
        pastAppointment: [],
        getUser: [],
        patientDoctors: []
    }),
    getters: {

    },
    actions: {
        async fetchMeets() {
            try {
                const data = await axios.get('/api/data/meet/MeetData');
                this.meets = data.data;
            } catch (error) {
                alert(error);
            }
        },
        async postCalendar(time: any, data: any) {

            await axios.post(`${config.public.apiBaseUrl}/api/DoctorSchedule/AddDoctorSchedule`, time, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
        },
        async updateCalendar(time: any) {
            await axios.put(`${config.public.apiBaseUrl}/api/DoctorSchedule/UpdateDoctorSchedule`, time, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
        },
        async getDoctorSchedule() {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/DoctorSchedule/GetDoctorSchedules`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.schedule = response.data;
            } catch (error) {
                alert('Hata oluştu. Lütfen tekrar deneyin.');
            }
        },
        async getAllAppointmentSchedule(date: string) {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/AppointmentSchedule/GetAllAppointmentSchedules?date=${date}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.allSchedule = response.data;
            } catch (error) {
                console.error(error);
                this.allSchedule = '';
            }
        },
        async makeAppointment(newAppointment: any) {

                const response = await axios.patch(`${config.public.apiBaseUrl}/api/PatientAppointment/MakeAppointment`, newAppointment, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.getAllAppointmentSchedule(newAppointment.day)
    
        },
        async fetchPatientAppointments() {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/PatientAppointment/GetPatientAppointments`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.patientAppointment = response.data.reverse()
            } catch (error) {
                console.error(error);
            }
        },
        async fetchDoctorAppointments() {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/DoctorAppointment/GetAllDoctorAppointments`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.doctorAppointment = response.data.reverse()
            } catch (error) {
                console.log(error)
            }
        },
        async fetchAllPatientsForDoctor() {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/DoctorAppointment/GetAllPatients`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.allPatients = response.data.reverse()
            } catch (error) {
                console.log(error)
            }
        },
        async getUserReport(userSlug: string) {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/AppointmentStatistics/GetAllAppoinmentStatisticsByPatientUserName?patientUserName=${userSlug}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                response.data[0].appointmentStatistics.reverse()
                this.userReport = response.data;

            } catch (error) {
                this.userReport = ""
                this.getUserSlug(userSlug)
                console.log(error)
            }
        },
        async fetchPastDoctorAppointment(patientSlug: string) {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/DoctorAppointment/GetAllPastDoctorAppointmentsByPatientSlug?patientSlug=${patientSlug}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                this.pastAppointment = response.data;

            } catch {
                this.pastAppointment = ""
                this.getUserSlug(patientSlug)
            }
        },
        async addAppointmentReport(report: any) {
            try {
                const response = await axios.post(`${config.public.apiBaseUrl}/api/AppointmentStatistics/AddAppointmentStatistics`, report, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        async getUserSlug(userSlug: string) {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/User/GetUserBySlug?userSlug=${userSlug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            this.getUser = response.data;
        },
        async fetchPatientDoctors() {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/PatientAppointment/GetPatientDoctors`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            this.patientDoctors = response.data;
        },
        async cancelPatientAppointment(appointment: any) {
                await axios.patch(`${config.public.apiBaseUrl}/api/PatientAppointment/CancelPatientAppointment`, appointment, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                })
        },
        async cancelDoctorAppointment(appointment: any) {
                await axios.patch(`${config.public.apiBaseUrl}/api/DoctorAppointment/CancelDoctorAppointment`, appointment, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    }
                })
        },
        async createAppointmentByDoctor(appointment: any) {
            await axios.patch(`${config.public.apiBaseUrl}/api/DoctorAppointment/CreateAppointmentForPatient`, appointment, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            })
        },
        
    }
});
