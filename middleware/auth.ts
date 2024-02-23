import { useUserStore } from '@/stores/apps/user';

const userStore = useUserStore();

export default defineNuxtRouteMiddleware((to, from) => {
    // AccessToken'ı kontrol et
    console.log("authh")
    const accessTokenExpiration = localStorage.getItem('accessToken');
    console.log(accessTokenExpiration)
    const currentTime = new Date().getTime();
  console.log(currentTime)
    if (accessTokenExpiration && currentTime >= parseInt(accessTokenExpiration)) {
      // AccessToken'ın süresi dolmuş, refreshToken'ı kullanarak yeni accessToken al
      const refreshToken = localStorage.getItem('refreshToken');
  
      if (refreshToken) {
        console.log("AccessToken süresi doldu. Yeniden oturum açılıyor...");
        userStore.refreshAccessToken()
      } else {
        console.log("refreshToken yok. Yeniden oturum açılamıyor.");
      }
    }
  
    console.log("AccessToken:", localStorage.getItem('accessToken'));
  });
  