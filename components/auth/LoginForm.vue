<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { UserType } from "@/types/UserType";
import jwt_decode from "jwt-decode";
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";
import Swal from "sweetalert2";
import FacebookLoginButton from "./FacebookLoginButton.vue";
const userStore = useUserStore();
const dialogError = ref(false);
const errorText = ref("");
const router = useRouter();
const checkbox = ref(false);
const show2 = ref(false);

const password = ref("");
const email = ref("");
const passwordRules = ref([(v: string) => !!v || "Şifre gerekli!"]);
const emailRules = ref([
  (v: string) => !!v || "Email gerekli!",
  (v: string) => /.+@.+\..+/.test(v) || "E-mail tanımına uymuyor!",
]);

const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;

  try {
    if (typeof credential === "string") {
      await userStore.loginWithGoogle(credential);
      router.push({ path: "/profile" });
    } else {
      throw new Error("Credential is undefined or not a string.");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleLoginError = () => {
  console.log("login failed");
};
const login = async () => {
  try {
    const user: UserType = {
      email: email.value,
      password: password.value,
      id: 0,
      name: "",
      surname: "",
      confirmPassword: "",
    };
    await userStore.login(user);
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const decodedToken = jwt_decode(accessToken) as Record<string, unknown>;

      const userRole = decodedToken.role as string | undefined;

      if (userRole == "Admin") router.push({ path: "/admin" });
      else router.push({ path: "/profile" });
    }
  } catch (error) {
    console.error("login error: ", error);
    if (error.response && error.response.status === 401) {
      // Eğer hata 401 ise refreshToken kullanarak oturumu yenile
      await userStore.refreshAccessToken();
      // Yenileme başarılıysa tekrar login işlemini yap
      await login();
    } else {
      // errorText.value = error.message;
      Swal.fire({
        title: "Hatalı Giriş!",
        text: "Lütfen şifreni doğru girdiğinden emin ol.",
        icon: "warning",
        confirmButtonText: "Tamam",
      });
    }
  }
};
const closeDialog = () => {
  dialogError.value = false;
};
</script>

<template>
  <div class="text-start">
    <v-row class="d-flex mb-3">
      <v-col cols="12" class="d-flex justify-center">
        <GoogleSignInButton
          @success="handleLoginSuccess"
          @error="handleLoginError"
        ></GoogleSignInButton>
      </v-col>
      <!-- <v-col cols="12" sm="6">
      <FacebookLoginButton />
    </v-col> -->
    </v-row>
    <div class="d-flex align-center text-center mb-6">
      <div
        class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative"
      >
        <span class="bg-surface px-5 py-3 position-relative"> + </span>
      </div>
    </div>

    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
      >Email</v-label
    >
    <VTextField
      v-model="email"
      :rules="emailRules"
      class="mb-8"
      required
      hide-details="auto"
    ></VTextField>
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText"
      >Şifre</v-label
    >
    <VTextField
      v-model="password"
      :rules="passwordRules"
      required
      hide-details="auto"
      :type="show2 ? 'text' : 'password'"
      :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="show2 = !show2"
      class="pwdInput"
    >
    </VTextField>

    <div class="d-flex flex-wrap align-center my-3 ml-n2">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        required
        hide-details
        color="primary"
      >
        <template v-slot:label class="">Beni hatırla</template>
      </v-checkbox>
      <div class="ml-sm-auto">
        <NuxtLink
          to="/sifremi-unuttum"
          class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
          >Şifremi Unuttum ?</NuxtLink
        >
      </div>
    </div>
    <v-btn
      size="large"
      :disabled="!password"
      block
      type="submit"
      flat
      style="background-color: rgb(237 50 162); color: #fff"
      @click="login"
      >Giriş Yap</v-btn
    >
    <v-dialog v-model="dialogError" width="500">
      <v-card
        title="Hata!"
        class="d-flex justify-center text-center align-center"
      >
        <v-card-text>
          {{ errorText }}
        </v-card-text>
        <v-card-text>
          <img src="/images/backgrounds/error2.png" style="width: 50%" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Kapat" @click="closeDialog"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
