import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { DoctorType, PatientType } from '@/types/UserType';

export interface UserType {
    accessToken: string | null;
    patients: Array<PatientType>
    alldoctors: Array<DoctorType>
    videoStatistic: any;
    reportPatient: any;
    reportDoctor: any
    allSchedule: any;
    allTitle:any;
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
        allTitle: []
    }),
    actions: {

        async fetchUserPatient() {
            const response = await axios.get('http://localhost:5261/api/Admin/GetAllPatients', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.patients = response.data
        },
        async fetchAllDoctors() {
            const response = await axios.get('http://localhost:5261/api/Admin/GetAllDoctors', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.alldoctors = response.data
        },
        async getVideoIstatisticPatient(slug: string) {
            const response = await axios.get(`http://localhost:5261/api/Admin/GetAllVideoStatisticsByPatientUserName?patientUserName=${slug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.videoStatistic = response.data
        },
        async getReportPatient(slug: string) {
            try {
                const response = await axios.get(`http://localhost:5261/api/Admin/GetAllPatientAppointmentStatisticsByPatientUserName?patientUserName=${slug}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                })
                response.data[0].appointmentStatistics.reverse()
                this.reportPatient = response.data
                console.log("::: ", this.reportPatient[0])

            } catch (error) {
                this.reportPatient = ' '
            }
        },
        async getReportDoctor(slug: string) {
            try {
                const response = await axios.get(`http://localhost:5261/api/Admin/GetAllPatientAppointmentStatisticsByDoctorUserName?doctorUserName=${slug}`, {
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
                const response = await axios.get(`http://localhost:5261/api/Admin/GetAllDoctorSchedulesByDate?day=${date}`, {
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
        async addTitle(title: any) {
            try {
                await axios.post('http://localhost:5261/api/Admin/AddDoctorTitle', title, {
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
                const response = await axios.get('http://localhost:5261/api/User/GetAllDoctorTitles', {
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
                await axios.delete(`http://localhost:5261/api/Admin/DeleteDoctorTitle?doctorTitleId=${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                });
                this.fetchTitle();
            } catch (error) {
                console.error('Silme işlemi sırasında bir hata oluştu:', error);
            }
        }
        
    }
});
