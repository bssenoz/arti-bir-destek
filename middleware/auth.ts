import { useUserStore } from '~/stores/user';
import { getUserRoleFromToken } from '@/utils/role';

const userStore = useUserStore();
const accessTokenExpiration = localStorage.getItem('accessTime');

const accessPermissions = {
  '/admin': ['Admin'],
  '/profile': ['Doctor', 'Patient'],
  '/profile/': ['Doctor', 'Patient'],
  '/profile/danisanlar': ['Doctor'],
  '/profile/danisanlar/': ['Doctor'],
  '/profile/mesaj': ['Doctor', 'Patient'],
  '/profile/video': ['Doctor', 'Patient'],
  '/profile/video/[id]': ['Doctor', 'Patient'],
  '/profile/video/istatistikler': ['Patient'],
  '/profile/randevu/randevularim': ['Doctor', 'Patient'],
  '/profile/randevu/randevu-al': ['Patient'],
  '/profile/randevu/takvim': ['Doctor'],
};

export default defineNuxtRouteMiddleware((to, from) => {
const userRole = getUserRoleFromToken();
  const allowedRoles = accessPermissions[to.path];

  if (to.path.startsWith('/admin') && userRole !== 'Admin') {
    return navigateTo('/403');
  }
  if (to.path == '/profile/video/[id]') {
    console.log(to.path)
    const dynamicRoute = to.path.match(/^\/profile\/video\/(.+)$/);
    if (dynamicRoute && dynamicRoute[1]) {
      const videoId = dynamicRoute[1];

      const allowedRolesForVideo = accessPermissions['/profile/video/[id]'] || ['Doctor', 'Patient'];

      if (!allowedRolesForVideo.includes(userRole)) {
        return navigateTo('/403');
      }
    }
    
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return navigateTo('/403');
  }
  const currentTime = new Date();

  if (!accessTokenExpiration) {
    console.log('AccessToken bulunamadı. Oturum açma sayfasına yönlendiriliyor...');
    return navigateTo('/giris-yap');
  }

  const expirationDate = new Date(accessTokenExpiration);
  expirationDate.setHours(expirationDate.getHours() + 1);
  expirationDate.setMinutes(expirationDate.getMinutes() - 5);

  currentTime.setHours(currentTime.getHours() + 1);

  console.log("Yeni accessTokenExpiration:", expirationDate.toISOString());
  console.log("curr: ", currentTime.toISOString())
  console.log("acc: ", expirationDate.toISOString())

  if (currentTime >= expirationDate) {
    console.log("AccessToken süresi doldu. Yeniden oturum açılıyor...");

    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      userStore.refreshAccessToken()
    } else {
      console.log("refreshToken yok. Yeniden oturum açılamıyor.");
      return navigateTo('/giris-yap');
    }
  } else {
    console.log("AccessToken hala geçerli.");
    console.log(userRole)
    if (!userRole) {
      return navigateTo('/403');
    }
  }
});
