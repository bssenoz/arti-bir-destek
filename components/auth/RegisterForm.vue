<script setup lang="ts">
import { ref } from "vue";

import PatientRegisterForm from "./PatientRegisterForm.vue";
import DoctorRegisterForm from "./DoctorRegisterForm.vue";

const userType = ref('patient');
const selectedComponent = ref('');

const selectUserType = (type: string) => {
  userType.value = type;
  selectedComponent.value = type === 'patient' ? 'PatientRegisterForm' : 'DoctorRegisterForm';
  console.log("user:", userType.value, "component:", selectedComponent.value)
};

</script>
<template>
  <v-row class="d-flex my-2 mx-2">
    <v-col cols="6">
      <v-btn :class="{ 'selected-button': userType === 'patient' }" variant="outlined" size="large"
        class="border text-subtitle-1" block @click="selectUserType('patient')">
        <span class="d-sm-flex d-none mr-1">Hasta Kaydı</span>
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn :class="{ 'selected-button': userType === 'doctor' }" variant="outlined" size="large"
        class="border text-subtitle-1" block @click="selectUserType('doctor')">
        <span class="d-sm-flex d-none mr-1">Danışman Kaydı</span>
      </v-btn>
    </v-col>
  </v-row>

  <div class="d-flex align-center text-center mx-5">
    <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
      <span class="bg-surface px-5 py-3 position-relative">+</span>
    </div>
  </div>
  <DoctorRegisterForm v-if="userType === 'doctor'" />
  <PatientRegisterForm v-if="userType === 'patient'" />
</template>

<style lang="scss" scoped>
.selected-button {
  background-color: rgb(237 50 162);
}
</style>