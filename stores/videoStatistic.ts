import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

interface VideoStatisticsType {
    videoStatistics: Array<VideoStatisticsType>,
    currentVideoStatistics: Array<VideoStatisticsType>
    userVideoStatistic: Array<VideoStatisticsType>,
}

export const useVideoStatisticStore = defineStore({
    id: 'videoStatistic',
    state: (): VideoStatisticsType => ({
        videoStatistics: [],
        currentVideoStatistics: [],
        userVideoStatistic: []
    }),
    
    actions: {
        async addVideoStatistics(video: any) {

            await axios.post(`${config.public.apiBaseUrl}/api/VideoStatistics/AddVideoStatistics`, JSON.stringify(video), {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
        },
        async getVideoStatistics() {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/Admin/GetAllVideoStatistics`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            this.videoStatistics = response.data;
        },
        async getCurrentUserVideoStatistics() {

            const response = await axios.get(`${config.public.apiBaseUrl}/api/VideoStatistics/GetCurrentUserAllVideoStatistics`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            this.currentVideoStatistics = response.data.reverse();
        },
        async getUserVideoStatistics(userSlug: string) {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/VideoStatistics/GetAllVideoStatisticsByPatientUserName?patientUserName=${userSlug}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            this.userVideoStatistic = response.data;
        },
    }
});
