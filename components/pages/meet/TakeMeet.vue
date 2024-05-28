<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import { format, addDays, getDay, subDays } from "date-fns";
import { useMeetStore } from "~/stores/meet";
import { useUserStore } from "~/stores/user";
import { MakeAppointmentType } from "@/types/MeetType"
import Swal from "sweetalert2";

const meetStore = useMeetStore();
const userStore = useUserStore();
const snackbar = ref(false);
const text = ref(`Randevu dolu!`);
const timeout = ref(2000);
const range = ref([]);
const selectedDay = ref('');
const activeAccordion = ref(null);
const selectedAppointment = ref(null);
const weeklyDates = ref([]);
const days = ref(["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]);

const today = new Date();
const formattedToday = format(today, 'dd.MM.yyyy');
selectedDay.value = formattedToday;
const disabledDates = ref([]);

for (let i = 1; i <= 730; i++) {
  const date = subDays(today, i);
  disabledDates.value.push(format(date, 'yyyy-MM-dd'));
}

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
  meetStore.getAllAppointmentSchedule(today);
  userStore.getCurrentUser();
});

const allAppointmentsDay = computed(() => {
  return meetStore.allSchedule;
});

watchEffect(() => {
  const start = range.value.start;
  const end = range.value.end;
  if (start && end) {
    console.log("Seçilen tarih aralığı:", start, " | ", end);
    updateWeeklyDates(start, end);
    const formattedDate = format(start, 'dd.MM.yyyy');
    meetStore.getAllAppointmentSchedule(formattedDate);
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
    meetStore.getAllAppointmentSchedule(index);

  } catch (err) {
    console.log(err)
    allAppointmentsDay.value = []
  }
};

const confirmAppointment = async (selectedAppointment: any) => {
  console.log(selectedAppointment)
  try {
    const newAppointment: MakeAppointmentType = {
      doctorId: selectedAppointment.doctorId,
      day: selectedAppointment.day,
      timeRange: selectedAppointment.timeRange,
    };
    console.log(newAppointment)
    await meetStore.makeAppointment(newAppointment)
    Swal.fire({
      title: "Başarılı!",
      text: "Randevu alındı.",
      icon: "success",
      confirmButtonText: "Tamam",
    });

  } catch(error) {
    Swal.fire({
      title: "Hata!",
      text: "Randevu alınamadı.",
      icon: "error",
      confirmButtonText: "Tamam",
    });
  }
};

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? null : index;
};

const handleAppointmentClick = (timeObj: { status: any; timeRange: number; }, appointment: { doctorID: any; doctorTitle: any; doctorName: any; doctorSurname: any; }) => {
  console.log(timeObj)
  console.log(appointment)
  if (!timeObj.status) {
    selectedAppointment.value = {
      doctorId: appointment.doctorID,
      timeRange: timeObj.timeRange,
      doctor: `${appointment.doctorTitle} ${appointment.doctorName} ${appointment.doctorSurname}`,
      timeObj: `${timeObj.timeRange}.00 - ${timeObj.timeRange + 1}.00`,
      day: selectedDay.value,
    };
    showConfirmationDialog();
  } else {
    showSnackbar();
  }
};
const showSnackbar = () => {
  snackbar.value = true;
};

const showConfirmationDialog = () => {
  Swal.fire({
    title: 'Randevu Detayı',
    html: `
      <p>Doktor: ${selectedAppointment.value.doctor}</p>
      <p>Gün: ${selectedAppointment.value.day}</p>
      <p>Saat: ${selectedAppointment.value.timeObj}</p>
      <p>Randevunuzu onaylıyor musunuz?</p>
    `,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Onayla',
    cancelButtonText: 'İptal'
  }).then((result) => {
    if (result.isConfirmed) {
      confirmAppointment(selectedAppointment.value);
    }
  });
};

</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="3">
        <div class="float-left">
          <VDatePicker v-model.range="range" :disabled-dates="disabledDates" />
        </div>
      </v-col>
      <v-col cols="12" lg="7">
        <v-sheet class="mx-auto mt-4">
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="(item, index) in weeklyDates" :key="index" v-slot="{ isSelected }">
              <v-btn :color="selectedDay === item.date ? 'primary' : undefined" class="ma-2" rounded
                @click="selectDay(item.date)">
                {{ item.date }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
          <div v-if="selectedDay !== null && allAppointmentsDay && allAppointmentsDay[0]?.doctors"
            class="text-center mt-4">
            <v-expansion-panels>
              <v-expansion-panel v-for="(appointment, index) in allAppointmentsDay[0].doctors" :key="index"
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
                      <v-col v-for="(timeObj, i) in appointment.appointments" :key="i" cols="12" sm="3" md="3">
                        <v-btn :color="timeObj.status ? 'grey200' : 'primary'" class="ma-1" outlined
                          @click.stop="handleAppointmentClick(timeObj, appointment)">
                          <p>{{ timeObj.timeRange < 10 ? '0' + timeObj.timeRange : timeObj.timeRange }}.00 - {{
                            timeObj.timeRange < 9 ? '0' + (timeObj.timeRange + 1) : timeObj.timeRange + 1 }}.00</p>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <div v-else>
            <div class="d-flex justify-center align-center mt-16">Bu Tarihte Randevu Bulunamadı!</div>
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
