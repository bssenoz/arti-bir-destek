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
    allTitle: any;
    allUnConfirmed:any;
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
        allUnConfirmed: []
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
        },
        async fetchUnConfirmedDoctor() {
           const response =  await axios.get('http://localhost:5261/api/Admin/GetAllUnConfirmedDoctor', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                },
            })
            this.allUnConfirmed = response.data;
        },
        async confirmDoctor(slug: string) {
            await axios.patch(`http://localhost:5261/api/Admin/ConfirmDoctor?doctorUserName=${slug}`, null,{
                 headers: {
                     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                     'Content-Type': 'application/json'
                 },
             })
             this.fetchUnConfirmedDoctor()
         },
         async deleteUser(userId?: any) {
            try {
                await axios.delete('http://localhost:5261/api/Admin/DeleteUser', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(userId)
                });

            } catch (error) {
                console.error('Delete request failed:', error);
            }
        },
        async createAIModel(file: File)  {
            const formData = new FormData();
            formData.append('DataSetFile', file);
    
            try {
                await axios.post('http://localhost:5261/api/Admin/CreateMLModel', formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Dosya başarıyla yüklendi.');
            } catch (error) {
                console.error('Dosya yüklenirken bir hata oluştu:', error);
            }
        }
    
        
    }
});
