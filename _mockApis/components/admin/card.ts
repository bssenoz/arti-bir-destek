import type { homeCard } from '@/types/components/admin/card';

const cards: homeCard[] = [
    {
        title: "Hastalar",
        href:  "/admin/hastalar",
    },
    {
        title: "Danışmanlar",
        href:  "/admin/danismanlar",
    },
    {
        title: "Randevu Takvimleri",
        href:  "/admin/danismanlar/randevu-takvimi",
    },
    {
        title: "Videolar",
        href:  "/admin/video",
    },
    {
        title: "Video İstatistikleri",
        href:  "/admin/video/istatistikler",
    },
];

export { cards }