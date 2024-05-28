import type { faqPageType2 } from '@/types/components/pages/faqData';

const faqPageDoctor: faqPageType2[] = [
    {
        id: 1,
        question: 'Randevu',
        chip: [
            { text: 'randevuları görüntüleme', color: 'info' },
            { text: 'randevu iptal etme', color: 'error' }
        ]
    },
    {
        id: 2,
        question: 'Takvim',
        chip: [
            { text: 'randevuları oluşturma', color: 'primary' }
        ]
    },
    {
        id: 3,
        question: 'Hastalarım',
        chip: [
            { text: 'video istatistikleri', color: 'info' },
            { text: 'raporlar', color: '' },
            { text: 'geçmiş randevular', color: 'accent' },
            { text: 'randevu oluşturma', color: 'primary' },
            { text: 'duygu analizi', color: 'success' }

        ]
    },
    {
        id: 4,
        question: 'Geçmiş Randevular',
        chip: [
            { text: 'geçmiş randevular', color: 'error' },
            { text: 'rapor ekleme', color: 'purple' }
        ]
    },
    {
        id: 5,
        question: 'Raporlar',
        chip: [
            { text: 'raporları görüntüleme', color: 'info' },
            { text: 'pdf indirme', color: 'primary' }
        ]
    },
    {
        id: 6,
        question: 'Kullanıcı Ayarları',
        chip: []
    },
];

const faqPagePatient: faqPageType2[] = [
    {
        id: 1,
        question: 'Randevu Al',
        chip: [
            { text: 'randevu al', color: 'primary' }
        ]
    },
    {
        id: 2,
        question: 'Randevu',
        chip: [
            { text: 'randevuları görüntüleme', color: 'secondary' },
            { text: 'randevu iptal etme', color: 'error' }
        ]
    },
    {
        id: 3,
        question: 'Mesaj',
        chip: []
    },
    {
        id: 4,
        question: 'Videolar',
        chip: []
    },
    {
        id: 5,
        question: 'Ayarlar',
        chip: [
            { text: 'kullanıcı bilgileri', color: 'accent' },
            { text: 'şifre güncelleme', color: 'info' },
            { text: 'profil resmi', color: 'primary' }
        ]
    },
];

const faqPageAdmin: faqPageType2[] = [
    {
        id: 1,
        question: 'Hastalar',
        chip: [
            { text: 'video istatistikleri', color: 'info' },
            { text: 'raporlar', color: 'primary' },
            { text: 'pdf indirme', color: 'warning' },
            { text: 'duygu analizi', color: 'success' },
        ]
    },
    {
        id: 2,
        question: 'Danışmanlar',
        chip: [
            { text: 'raporlar', color: 'primary' },
            { text: 'pdf indirme', color: 'warning' },
            { text: 'kullanıcı silme', color: 'danger' },
        ]
    },
    {
        id: 3,
        question: 'Danışman Ünvanları',
        chip: []
    },

    {
        id: 4,
        question: 'Randevu',
        chip: [
            { text: 'burası değişecek', color: 'error' },
            { text: 'burası değişecek', color: 'purple' }
        ]
    },
    {
        id: 5,
        question: 'Videolar',
        chip: [
            { text: 'video silme', color: 'info' },
            { text: 'video düzenleme', color: 'primary' },
            { text: 'video ekleme', color: 'secondary' }

        ]
    },
    {
        id: 6,
        question: 'Yapay Zeka',
        chip: [
            { text: 'model eğitme', color: 'success' },

        ]
    },

];

export { faqPageDoctor,faqPagePatient, faqPageAdmin };
