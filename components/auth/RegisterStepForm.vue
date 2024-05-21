<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { DoctorType, PatientType } from "@/types/UserType";
import { useAdminStore } from "@/stores/admin";

const adminStore = useAdminStore();
const userStore = useUserStore();

const router = useRouter();
const step = ref(1);
const stepItem = ref(4);
const userType = ref("patient");
const errorText = ref("");
const password = ref("");
const passwordConfirm = ref("");
const email = ref("");
const phoneNumber = ref("");
const title = ref("");
const firstName = ref("");
const lastName = ref("");
const show1 = ref(false);
const show2 = ref(false);
const dialogVisible = ref(false);
const dialogError = ref(false);

const isPasswordValid = computed(() => {
  return passwordRules.every((rule) => rule(password.value) === true);
});

const isPasswordConfirmValid = computed(() => {
  return password.value === passwordConfirm.value;
});

const isFormValid = computed(() => {
  return isPasswordValid.value && isPasswordConfirmValid.value;
});

const passwordRules = [
  (v: string) => !!v || "Şifre gerekli!",
  (v: string) => v.length >= 6 || "Şifre en az 6 karakter olmalıdır!",
  (v: string) => /[A-Z]/.test(v) || "Şifre en az bir büyük harf içermelidir!",
  (v: string) => /[a-z]/.test(v) || "Şifre en az bir küçük harf içermelidir!",
  (v: string) =>
    /[\W_]/.test(v) || "Şifre en az bir özel karakter içermelidir!",
];

const emailRules = [
  (v: string) => !!v || "E-posta gerekli!",
  (v: string) => /.+@.+\..+/.test(v) || "E-posta geçerli olmalıdır!",
];
const titleRules = [(v: string) => !!v || "Ünvan gerekli!"];
const nameRules = [(v: string) => !!v || "Ad gerekli!"];
const surnameRules = [(v: string) => !!v || "Soyad gerekli!"];
const phoneRules = [
  (v: string) => !!v || "Telefon numarası gerekli!",
  (v: string) => /^\d+$/.test(v) || "Sadece rakam içermelidir!",
];
const isEmailValid = computed(() => {
  return /.+@.+\..+/.test(email.value);
});

const filterNumbers = (event: Event) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/\D/g, "");
  phoneNumber.value = input.value;
};
const selectUserType = (type: string) => {
  if (type === "patient") stepItem.value = 4;
  if (type === "doctor") stepItem.value = 4;
  userType.value = type;
};

const register = async () => {
  try {
    if (password.value !== passwordConfirm.value) {
      throw new Error("Şifreler eşleşmiyor");
    }

    if (stepItem.value == 5) {
      const newUser: DoctorType = {
        id: "",
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        titleId: title.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        confirmPassword: passwordConfirm.value,
        profileImageUrl: null,
      };

      await userStore.registerDoctor(newUser);
      dialogVisible.value = true;
    }

    if (stepItem.value == 4) {
      const newUser: PatientType = {
        id: "",
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
        confirmPassword: passwordConfirm.value,
        profileImageUrl: null,
      };

      await userStore.registerPatient(newUser);
      dialogVisible.value = true;
    }
  } catch (error: any) {
    console.error("Kullanıcı kaydedilirken bir hata oluştu:", error);
    errorText.value = error.message;
    dialogError.value = true;
  }
};
const validateInputs = computed(() => {
  switch (step.value) {
    case 1:
      return true;
    case 2:
      return !!firstName.value && !!lastName.value;
    case 3:
      return !!email.value && !!phoneNumber.value;
    case 4:
      return !!password.value && !!passwordConfirm.value;
    case 5:
      return !!title.value;
    default:
      return true;
  }
});

const nextStep = () => {
  if (validateInputs.value) {
    step.value++;
  } else {
    alert("Lütfen tüm gerekli alanları doldurunuz!");
  }
};
const stepperProgress = computed(() => {
  return `${(100 / (stepItem.value - 1)) * (step.value - 1)}%`;
});

const closeDialogAndRedirect = () => {
  dialogVisible.value = false;
  router.push({ path: "/giris-yap" });
};

const closeDialog = () => {
  dialogError.value = false;
};
onMounted(() => {
  adminStore.fetchTitle();
});

const allTitle = computed(() => {
  return adminStore.allTitle;
});

const allTitleOptions = computed(() => {
  return allTitle.value.map((title: { id: any; title: any }) => ({
    id: title.id,
    title: title.title,
  }));
});
</script>

<template>
  <div class="wrapper-stepper text-start">
    <div class="stepper">
      <div class="stepper-progress">
        <div
          class="stepper-progress-bar"
          :style="'width:' + stepperProgress"
        ></div>
      </div>

      <div
        class="stepper-item"
        :class="{ current: step == item, success: step > item }"
        v-for="item in stepItem"
        :key="item"
      >
        <div class="stepper-item-counter">
          <img
            class="icon-success"
            src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
            alt=""
          />
          <span class="number">{{ item }}</span>
        </div>
        <span class="stepper-item-title">Adım {{ item }}</span>
      </div>
    </div>

    <div class="stepper-pane" v-if="step == 1">
      <v-row class="d-flex my-2 mx-2">
        <v-col cols="12" sm="6">
          <v-btn
            :class="{ 'selected-button': userType === 'patient' }"
            variant="outlined"
            size="large"
            class="border text-subtitle-1"
            block
            @click="selectUserType('patient')"
          >
            <span class="d-sm-flex mr-1">Hasta Kaydı</span>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn
            :class="{ 'selected-button': userType === 'doctor' }"
            variant="outlined"
            size="large"
            class="border text-subtitle-1"
            block
            @click="selectUserType('doctor')"
          >
            <span class="d-sm-flex mr-1">Danışman Kaydı</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div
      class="stepper-pane"
      v-if="
        (userType === 'doctor' && step === 2) ||
        (userType === 'patient' && step === 2)
      "
    >
      <v-row>
        <v-col cols="12" v-if="userType === 'doctor'">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Ünvan</v-label
          >
          <v-select
            v-model="title"
            :items="allTitleOptions"
            item-value="id"
            item-text="title"
            outlined
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2">Ad</v-label>
          <VTextField
            v-model="firstName"
            :rules="nameRules"
            required
          ></VTextField>
        </v-col>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Soyad</v-label
          >
          <VTextField
            v-model="lastName"
            :rules="surnameRules"
            required
          ></VTextField>
        </v-col>
      </v-row>
    </div>
    <div
      class="stepper-pane"
      v-if="
        (userType === 'doctor' && step === 3) ||
        (userType === 'patient' && step === 3)
      "
    >
      <v-row>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Email</v-label
          >
          <VTextField v-model="email" :rules="emailRules" required></VTextField>
        </v-col>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Telefon Numarası</v-label
          >
          <VTextField
            v-model="phoneNumber"
            :rules="phoneRules"
            maxlength="11"
            @input="filterNumbers"
            required
            placeholder="05........."
          ></VTextField>
        </v-col>
      </v-row>
    </div>
    <div
      class="stepper-pane"
      v-if="
        (userType === 'doctor' && step === 4) ||
        (userType === 'patient' && step === 4)
      "
    >
      <v-row>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Şifre</v-label
          >
          <VTextField
            v-model="password"
            :counter="6"
            :rules="passwordRules"
            required
            variant="outlined"
            hide-details="auto"
            :type="show1 ? 'text' : 'password'"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show1 = !show1"
            color="primary"
          ></VTextField>
        </v-col>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Şifre Tekrar</v-label
          >
          <VTextField
            v-model="passwordConfirm"
            :counter="6"
            :rules="passwordRules"
            required
            variant="outlined"
            hide-details="auto"
            :type="show2 ? 'text' : 'password'"
            :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="show2 = !show2"
            color="primary"
          ></VTextField>
        </v-col>
        <div v-if="!isFormValid" class="text-h6 text-error ml-4">Şifreler eşleşmiyor!</div>
      </v-row>
    </div>

    <div class="controls">
      <button class="btn" @click="step--" :disabled="step == 1">Geri</button>
      <button
        class="btn btn--pink-1"
        @click="nextStep"
        :disabled="
          !validateInputs ||
          (step === 3 && phoneNumber.length !== 11) ||
          step === stepItem ||
          (step === 3 && !isEmailValid)
        "
        v-if="step !== stepItem"
      >
        İleri
      </button>

      <button
        class="btn btn--pink-1 elevation-15"
        v-if="step == stepItem"
        @click="register"
        :disabled="!isFormValid"
      >
        KAYIT OL
      </button>

      <v-dialog v-model="dialogVisible" width="500">
        <v-card title="Kayıt Başarılı">
          <v-card-text> Kaydınız başarıyla tamamlandı. </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Kapat" @click="closeDialogAndRedirect"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogError" width="500">
        <v-card title="Hata">
          <v-card-text>
            {{ errorText }}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Kapat" @click="closeDialog"></v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
$default: #c5c5c5;
$pink-1: #db2777;
$transiton: all 500ms ease;

.selected-button {
  background-color: rgb(237 50 162);
  color: #fff;
}

.wrapper-stepper {
  background-color: #fff;
  border-radius: 32px;
  box-shadow: rgba($color: #000000, $alpha: 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;
  z-index: 0;
  margin-bottom: 24px;
  width: 400px;

  @media screen and (min-width: 450px) {
    width: 400px;
  }

  @media screen and (min-width: 1200px) {
    width: 500px;
  }

  &-progress {
    position: absolute;
    background-color: $default;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;

    &-bar {
      position: absolute;
      left: 0;
      height: 100%;
      width: 0%;
      background-color: $pink-1;
      transition: $transiton;
    }
  }
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $default;
  transition: $transiton;

  &-counter {
    height: 50px;
    width: 50px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid $default;
    position: relative;

    .icon-success {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      width: 24px;
      transition: $transiton;
    }

    .number {
      font-size: 22px;
      transition: $transiton;
    }
  }

  &-title {
    position: absolute;
    font-size: 14px;
    bottom: -24px;
  }
}

.stepper-item.success {
  .stepper-item-counter {
    border-color: $pink-1;
    background-color: $pink-1;
    color: #fff;
    font-weight: 600;

    .icon-success {
      opacity: 1;
      transform: scale(1);
    }

    .number {
      opacity: 0;
      transform: scale(0);
    }
  }

  .stepper-item-title {
    color: $pink-1;
  }
}

.stepper-item.current {
  .stepper-item-counter {
    border-color: $pink-1;
    background-color: $pink-1;
    color: #fff;
    font-weight: 600;
  }

  .stepper-item-title {
    color: #818181;
  }
}

.stepper-pane {
  color: #333;
  padding: 20px 20px;
  box-shadow: 0 8px 12px rgba($color: #000000, $alpha: 0.09);
  margin: 40px 0;
  height: 370px;
  align-items: center;
  display: flex;
  width: 400px;

  @media screen and (min-width: 450px) {
    width: 400px;
    padding: 40px 40px;
  }

  @media screen and (min-width: 1200px) {
    width: 500px;
    padding: 60px 60px;
  }
}

.controls {
  display: flex;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  line-height: 1.5;
  transition: all 150ms;
  border-radius: 4px;
  width: fit-content;
  font-size: 0.75rem;
  color: #333;
  background-color: #f0f0f0;
  border-color: #f0f0f0;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--pink-1 {
    background-color: $pink-1;
    border-color: $pink-1;
    color: #fff;
    margin-left: auto;
  }
}
</style>