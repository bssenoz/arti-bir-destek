import mock from '../../mockAdapter';
import type { MeetType } from '@/types/apps/MeetType';

const MeetData: MeetType[] = [
    {
        id: 1,
        name: 'Uzman Sevgi Köroğlu',
        date: '12.02.2024',
        time: '13.00',
        url: 'https://example.com/appointment1'
    },
    {
        id: 2,
        name: 'Uzman (Bursiyer Psikolog)',
        date: '12.03.2024',
        time: '13.00',
        url: 'https://example.com/appointment1'
    },
    {
        id: 3,
        name: 'Uzman Mete Kaldırım',
        date: '14.03.2024',
        time: '13.00',
        url: 'https://example.com/appointment1'
    },
    {
        id: 4,
        name: 'Uzman (Bursiyer Psikolog)',
        date: '22.03.2024',
        time: '13.00',
        url: 'https://example.com/appointment1'
    },

];

mock.onGet('/api/data/meet/MeetData').reply(() => {
    console.log("onget: ",MeetData)
    return [200, MeetData];
});

export default MeetData;
