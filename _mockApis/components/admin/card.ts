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
        title: "Randevular",
        href:  "/admin/randevular",
    },
    {
        title: "Videolar",
        href:  "/admin/video",
    },
    {
        title: "Video İstatistikleri",
        href:  "/admin/video/istatistikler",
    },
    {
        title: "Danışman Ünvanları",
        href:  "/admin/unvan",
    },
    {
        title: "Yapay Zeka",
        href:  "/admin/yapay-zeka",
    },
    {
        title: "Kullanım Kılavuzu",
        href:  "/admin/kilavuz",
    },
];

export { cards }