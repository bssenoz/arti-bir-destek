<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import { format, addDays, getDay } from "date-fns";
import { useMeetStore } from "~/stores/meet";
import { useUserStore } from "~/stores/user";
import { useAdminStore } from "~/stores/admin";

import { MakeAppointmentType } from "@/types/MeetType"

const meetStore = useMeetStore();
const userStore = useUserStore();
const adminStore = useAdminStore();

const snackbar = ref(false);
const text = ref(`Randevu dolu!`);
const timeout = ref(2000);
const range = ref([]);
const selectedDay = ref('');
const appointments = ref([]);
const dialog = ref(false);
const successDialog = ref(false);
const activeAccordion = ref(null);
const selectedAppointment = ref(null);
const weeklyDates = ref([]);
const days = ref(["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]);

const today = new Date();
const formattedToday = format(today, 'dd.MM.yyyy');
selectedDay.value = formattedToday;

watchEffect(() => {
  const today = new Date();
  const dates = Array.from({ length: 15 }, (_, i) => {
    const date = addDays(today, i);
    const dayIndex = getDay(date);
    const day = days.value[dayIndex];
    weeklyDates.value.push({ date: format(date, "dd.MM.yyyy"), day: day });
  });
});

function getFormattedDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}.${month}.${year}`;
}

onMounted(() => {
  const today = getFormattedDate();
  adminStore.getAllAppointmentSchedule(today);
  userStore.getCurrentUser();
});

const allAppointmentsDay = computed(() => {
  return adminStore.allSchedule;
});

// burası sonra düzenlenecek
watchEffect(() => {
  const start = range.value.start;
  const end = range.value.end;
  if (start && end) {
    console.log("Seçilen tarih aralığı:", start, " | ", end);
    updateWeeklyDates(start, end);
  }
});

const updateWeeklyDates = (start: string | number | Date, end: string | number | Date) => {
  const updatedDates = [];
  const startDate = new Date(start);
  const lastDate = new Date(end);

  while (startDate <= lastDate) {
    const dayIndex = getDay(startDate);
    const day = days.value[dayIndex];
    const formattedDate = format(startDate, "dd.MM.yyyy");
    updatedDates.push({ date: formattedDate, day: day });
    startDate.setDate(startDate.getDate() + 1);
  }

  weeklyDates.value.splice(0, weeklyDates.value.length);
  
  updatedDates.forEach(date => {
    weeklyDates.value.push(date);
  });
};

const selectDay = (index) => {
  selectedDay.value = index;
  try {
    adminStore.getAllAppointmentSchedule(index);

  } catch (err) {
    console.log(err)
    allAppointmentsDay.value = []
  }
};

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};


</script>

<template>
  <v-container>
    <v-row>

      <v-col cols="12" >
        <v-sheet class="mx-auto mt-4">
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="(item, index) in weeklyDates" :key="index" v-slot="{ isSelected }">
              <v-btn :color="selectedDay === item.date ? 'primary' : undefined" class="ma-2" rounded
                @click="selectDay(item.date)">
                {{ item.date }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>

          <div v-if="selectedDay !== null && allAppointmentsDay && allAppointmentsDay[0]?.doctorSchedules"
            class="text-center mt-4">
            <v-expansion-panels>
              <v-expansion-panel v-for="(appointment, index) in allAppointmentsDay[0].doctorSchedules" :key="index"
                class="mt-2 mb-2" @click="toggleAccordion(index)">
                <v-icon v-if="activeAccordion === index" class="float-left">mdi-chevron-up</v-icon>
                <v-icon v-else class="float-left">mdi-chevron-down</v-icon>
                <v-expansion-panel-header :class="{ 'panel-header-active': activeAccordion === index }">
                  <span class="float-left pl-4">{{ appointment.doctorTitle }} {{ appointment.doctorName }} {{
                    appointment.doctorSurname }}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-if="activeAccordion === index">
                  <v-list class="mt-8 overflow-visible">
                    <v-row>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.eightToNine ? 'primary' : 'grey200'">08.00 - 09.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.nineToTen ? 'primary' : 'grey200'">09.00 - 10.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.tenToEleven ? 'primary' : 'grey200'">10.00 - 11.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.elevenToTwelve ? 'primary' : 'grey200'">11.00 - 12.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.twelveToThirteen ? 'primary' : 'grey200'">12.00 - 13.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.thirteenToFourteen ? 'primary' : 'grey200'">13.00 - 14.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.fourteenToFifteen ? 'primary' : 'grey200'">14.00 - 15.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.fifteenToSixteen ? 'primary' : 'grey200'">15.00 - 16.00</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn :color="appointment.sixteenToSeventeen ? 'primary' : 'grey200'">16.00 - 17.00</v-btn>
                        </v-col>
                    </v-row>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <div v-else>
            <div class="d-flex justify-center align-center mt-16">Bu Tarihte Herhangi Bir Danışmana Ait Kayıt Bulunamadı!</div>
          </div>
  
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
          </v-snackbar>
        </v-sheet>
      </v-col>

    </v-row>
  </v-container>
</template>

<style scoped>
.v-expansion-panel {
  padding: 1rem;
  cursor: pointer;
}

.panel-header-active {
  background-color: #f0f0f0;
}

.v-row {
  margin: 0;
}
</style>
