import type { homeCard } from '@/types/components/admin/card';

const cards: homeCard[] = [
    {
        title: "Kullanıcılar",
        href:  "/admin/patient",
    },
    {
        title: "Danışmanlar",
        href:  "/admin/danisman",
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