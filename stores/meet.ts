import { defineStore } from 'pinia';
import axios from '@/utils/axios';

interface meetType {
    meets: any;
}

export const useMeetStore = defineStore({
    id: 'meet',
    state: (): meetType => ({
        meets: [],
    }),
    getters: {

    },
    actions: {
        async fetchMeets() {
            try {
                console.log("fetchh")
                const data = await axios.get('/api/data/meet/MeetData');
                console.log("data: ",data)
                this.meets = data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    }
});
