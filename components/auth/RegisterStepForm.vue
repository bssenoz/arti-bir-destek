<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { DoctorType } from "@/types/UserType";

export default defineComponent({
  name: "StepperComponent",
  data() {
    return {
      step: 1,
      stepItem: 4,
      userType: "patient",
      selectedComponent: "",
      errorText: "",
      password: "",
      passwordConfirm: "",
      email: "",
      phoneNumber: "",
      title: "",
      firstName: "",
      lastName: "",
      show1: false,
      show2: false,
      passwordRules: [(v: string) => !!v || "Şifre gerekli!"],
      emailRules: [
        (v: string) => !!v || "E-posta gerekli!",
        (v: string) => /.+@.+\..+/.test(v) || "E-posta geçerli olmalıdır!",
      ],
      titleRules: [(v: string) => !!v || "Ünvan gerekli!"],
      nameRules: [(v: string) => !!v || "Ad gerekli!"],
      surnameRules: [(v: string) => !!v || "Soyad gerekli!"],
      dialogVisible: false,
      dialogError: false,
    };
  },
  methods: {
    selectUserType(type: string) {
      if(type == 'patient') this.stepItem = 4
      if(type == 'doctor') this.stepItem = 5
      this.userType = type;
      this.selectedComponent =
        type === "patient" ? "PatientRegisterForm" : "DoctorRegisterForm";
      console.log("user:", this.userType, "component:", this.selectedComponent);
    },
  },
  computed: {
    stepperProgress() {
      return `${(100 / (this.stepItem - 1)) * (this.step - 1)}%`;
    },
  },
});
</script>

<template>
  <div class="wrapper-stepper">
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
    <!-- <div class="stepper-pane" v-if="step == 2"> -->
      <div class="stepper-pane" v-if="userType === 'doctor' && step === 3 || userType === 'patient' && step === 2">
      <v-row>
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
    <div class="stepper-pane" v-if="userType === 'doctor' && step === 4 || userType === 'patient' && step === 3">
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
          <VTextField v-model="phoneNumber"></VTextField>
        </v-col>
      </v-row>
    </div>
    <div class="stepper-pane" v-if="userType === 'doctor' && step === 5 || userType === 'patient' && step === 4">
      <v-row>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Şifre</v-label
          >
          <VTextField
            v-model="password"
            :counter="10"
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
            :counter="10"
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
      </v-row>
    </div>
    <div class="stepper-pane" v-if="userType === 'doctor' && step === 2">
      <v-row>
        <v-col cols="12">
          <v-label class="text-subtitle-1 font-weight-medium pb-2"
            >Ünvan</v-label
          >
          <VTextField
            v-model="title"
            :rules="titleRules"
            required
          ></VTextField>
        </v-col>
      </v-row>
    </div>
    <!-- </div> -->

    <div class="controls">
      <button class="btn" @click="step--" :disabled="step == 1">Geri</button>
      <button class="btn btn--pink-1" @click="step++" :disabled="step == stepItem" v-if="step != stepItem">
        İleri
      </button>
      <button class="btn btn--pink-1 elevation-15" v-if="step == stepItem">
        KAYDOL
      </button>
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
  width: 320px;
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
  height: 300px;
  align-items: center;
  display: flex;
  width: 320px;
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
