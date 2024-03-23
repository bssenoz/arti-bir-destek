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
        },
        async deleteVideo(id: number) {
            const response = await axios.delete(`http://localhost:5261/api/Video/DeleteVideo?videoID=${id}`)
            this.videos = response.data;
            this.fetchVideos()
        },
        async editVideo(editItem: any) {
            const response = await axios.put('http://localhost:5261/api/Video/UpdateVideo',editItem)
            this.videos = response.data;
            this.fetchVideos()
        },
    }
});
