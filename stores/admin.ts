import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { DoctorType, PatientType } from '@/types/UserType';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

export interface UserType {
    accessToken: string | null;
    patients: Array<PatientType>
    alldoctors: Array<DoctorType>
    videoStatistic: any;
    reportPatient: any;
    reportDoctor: any
    allSchedule: any;
    allTitle: any;
    allUnConfirmed: any;
    appointmentDoctor: any;
}

export const useAdminStore = defineStore({
    id: 'admin',
    state: (): UserType => ({
        accessToken: localStorage.getItem('accessToken'),
        patients: [],
        alldoctors: [],
        videoStatistic: [],
        reportPatient: [],
        reportDoctor: [],
        allSchedule: [],
        allTitle: [],
        allUnConfirmed: [],
        appointmentDoctor: []
    }),
    actions: {

        async fetchUserPatient() {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllPatients`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.patients = response.data
        },
        async fetchAllDoctors() {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllDoctors`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.alldoctors = response.data
        },
        async getVideoIstatisticPatient(slug: string) {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllVideoStatisticsByPatientUserName?patientUserName=${slug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.videoStatistic = response.data
        },
        async getReportPatient(slug: string) {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllPatientAppointmentStatisticsByPatientUserName?patientUserName=${slug}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
                response.data[0].appointmentStatistics.reverse()
                this.reportPatient = response.data
            } catch (error) {
                this.reportPatient = ' '
            }
        },
        async getReportDoctor(slug: string) {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllPatientAppointmentStatisticsByDoctorUserName?doctorUserName=${slug}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
                this.reportDoctor = response.data

            } catch (error) {
                this.reportDoctor = ''
            }
        },
        async getAllAppointmentSchedule(date: string) {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllDoctorSchedulesByDate?day=${date}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.allSchedule = response.data;
            } catch (error) {
                this.allSchedule = '';
            }
        },
        async addTitle(title: any) {
            try {
                await axios.post(`${config.public.apiBaseUrl}/api/Admin/AddDoctorTitle`, title, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
                this.fetchTitle();

            } catch (error) {

            }
        },
        async fetchTitle() {
            try {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/User/GetAllDoctorTitles`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
                this.allTitle = response.data;
            } catch (error) {

            }
        },
        async deleteTitle(id: number) {
            try {
                await axios.delete(`${config.public.apiBaseUrl}/api/Admin/DeleteDoctorTitle?doctorTitleId=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.fetchTitle();
            } catch (error) {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
            }
        },
        async fetchUnConfirmedDoctor() {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllUnConfirmedDoctor`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.allUnConfirmed = response.data;
        },
        async confirmDoctor(slug: string) {
            await axios.patch(`${config.public.apiBaseUrl}/api/Admin/ConfirmDoctor?doctorUserName=${slug}`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
        },
        async deleteUser(userId?: any) {
                await axios.delete(`${config.public.apiBaseUrl}/api/Admin/DeleteUser`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(userId)
                });
        },
        async fetchDoctorAppointment(id: string, day: string, time: number) {
                const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetDoctorAppointmentByDateAndTimeRange?doctorId=${id}&day=${day}&timeRange=${time}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
                this.appointmentDoctor = response.data;
        },
        async createAIModel(file: File) {
            const formData = new FormData();
            formData.append('DataSetFile', file);
                await axios.post(`${config.public.apiBaseUrl}/api/Admin/CreateAIModel`, formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
        }


    }
});
