import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();

interface VideoType {
    videos: Array<VideoType>
    video: Array<VideoType>;
}

export const useVideoStore = defineStore({
    id: 'video',
    state: (): VideoType => ({
        video: [],
        videos: [],
    }),

    actions: {
        async fetchVideos() {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/Video/GetAllVideos`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            this.videos = response.data.reverse();
        },
        async getVideo(id: number) {
            const response = await axios.get(`${config.public.apiBaseUrl}/api/Video/GetVideoByVideoSlug?videoSlug=${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            this.video = response.data;
        },
        async deleteVideo(id: number) {
            const response = await axios.delete(`${config.public.apiBaseUrl}/api/Admin/DeleteVideo?videoID=${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            this.videos = response.data;
            this.fetchVideos()
        },
        async editVideo(editItem: any) {
            const response = await axios.put(`${config.public.apiBaseUrl}/api/Admin/UpdateVideo`, editItem, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json'
                }
            })
            this.videos = response.data;
            this.fetchVideos()
        },
    }
});
