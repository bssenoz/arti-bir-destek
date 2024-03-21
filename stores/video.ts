import { defineStore } from 'pinia';
import axios from '@/utils/axios';

interface VideoType {
    videos: Array<VideoType>
}

export const useVideoStore = defineStore({
    id: 'video',
    state: (): VideoType => ({
        videos: []
    }),
    actions: {
        async fetchVideos() {
            const response = await axios.get('http://localhost:5261/api/Video/GetAllVideos')
            this.videos = response.data;
            console.log("videos: ",this.videos)
        },
    }
});
