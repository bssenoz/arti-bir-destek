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
}

export const useAdminStore = defineStore({
    id: 'admin',
    state: (): UserType => ({
        accessToken: localStorage.getItem('accessToken'),
        patients: [],
        alldoctors: [],
        videoStatistic: [],
        reportPatient: [],
        reportDoctor: []
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
            const response = await axios.get(`http://localhost:5261/api/Admin/GetAllPatientAppointmentStatisticsByPatientUserName?patientUserName=${slug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            response.data[0].appointmentStatistics.reverse()
            this.reportPatient = response.data
        },
        async getReportDoctor(slug: string) {
            const response = await axios.get(`http://localhost:5261/api/Admin/GetAllPatientAppointmentStatisticsByDoctorUserName?doctorUserName=${slug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.reportDoctor = response.data
        },
    }
});
