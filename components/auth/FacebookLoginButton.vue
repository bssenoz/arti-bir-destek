<template>
  <div>
    <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
      <img :src="facebook" width="25" height="25" class="mr-1" alt="facebook" />
      <span class="d-sm-flex d-none mr-1" @click="logInWithFacebook">Facebook ile Giriş Yap</span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import facebook from "/images/svgs/facebook-icon.svg";
import { useUserStore } from '@/stores/user';

export default defineComponent({
  name: 'FacebookLoginButton',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const logInWithFacebook = async () => {
      await loadFacebookSDK(document, 'script', 'facebook-jssdk');
      await initFacebook();

      window.FB.login((response: any) => {
        const token = response.authResponse.accessToken;
        userStore.loginWithFacebook(token)

        if (response.authResponse) {
          const token = response.authResponse.accessToken;
          userStore.loginWithFacebook(token)
          router.push({ path: "/profile" });

        } else {
          alert('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'email, public_profile' });
    };

    const initFacebook = async () => {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: "315565264874489",
          cookie: true,
          version: 'v13.0'
        });
      };
    };

    const loadFacebookSDK = async (d: Document, s: string, id: string) => {
      let js: HTMLScriptElement,
        fjs: HTMLElement | null = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
      }
    };

    return {
      facebook,
      logInWithFacebook
    };
  }
});
</script>
