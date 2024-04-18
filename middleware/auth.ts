import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

const accessTokenExpiration = localStorage.getItem('accessTime');
export default defineNuxtRouteMiddleware((to, from) => {

  const currentTime = new Date();

  if (accessTokenExpiration) {
    const expirationDate = new Date(accessTokenExpiration);
    expirationDate.setHours(expirationDate.getHours() + 1);
    expirationDate.setMinutes(expirationDate.getMinutes() - 5);

    currentTime.setHours(currentTime.getHours() + 1);

    console.log("Yeni accessTokenExpiration:", expirationDate.toISOString());
    if (currentTime >= expirationDate) {
      console.log("Geçti");
      console.log(currentTime.toISOString())
      console.log(accessTokenExpiration)

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        console.log("AccessToken süresi doldu. Yeniden oturum açılıyor...");
        userStore.refreshAccessToken()
      } else {
        console.log("refreshToken yok. Yeniden oturum açılamıyor.");
      }
    } else {
      console.log("Geçmedi");
      console.log(currentTime.toISOString())
      console.log(expirationDate.toISOString())
    }
  }

});
