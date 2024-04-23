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
              <v-btn :color="selectedDay === index ? 'primary' : undefined" class="ma-2" rounded
                @click="selectDay(index)">
                {{ item.date }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
          <div v-if="selectedDay !== null" class="text-center mt-4">
            <v-expansion-panels>
              <v-expansion-panel v-for="(appointment, index) in appointments" :key="index" class="mt-2 mb-2"
                @click="toggleAccordion(index)">
                <v-icon v-if="activeAccordion === index" class="float-left">mdi-chevron-up</v-icon>
                <v-icon v-else class="float-left">mdi-chevron-down</v-icon>
                <v-expansion-panel-header :class="{ 'panel-header-active': activeAccordion === index }">
                  <span class="float-left pl-4">{{ appointment.doctor }}</span>
                </v-expansion-panel-header>
                <v-expansion-panel-content v-if="activeAccordion === index">
                  <v-list class="mt-8 overflow-visible">
                    <v-row>
                      <v-col v-for="(timeObj, i) in appointment.times" :key="i" cols="12" sm="3" md="3">
                        <v-btn :color="timeObj.selected ? 'grey200' : 'primary'" class="ma-1" outlined
                          @click="handleAppointmentClick(timeObj, appointment)">
                          {{ timeObj.time }}
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
          <v-dialog v-model="dialog" max-width="600">
            <v-card>
              <v-card-title>Randevu Detayı</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <p>Doktor: {{ selectedAppointment.doctor }}</p>
                    <p>Saat: {{ selectedAppointment.timeObj.time }}</p>
                    <p>Gün: {{ selectedAppointment.day }}</p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <p>Randevunuzu onaylıyor musunuz?</p>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="primary" text @click="confirmAppointment">Onayla</v-btn>
                <v-btn color="error" text @click="dialog = false">İptal</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="successDialog" max-width="600">
            <v-card>
              <v-card-title>Randevu alınmıştır.</v-card-title>
              <v-card-text>
                <p>Doktor: {{ selectedAppointment.doctor }}</p>
                <p>Saat: {{ selectedAppointment.timeObj.time }}</p>
                <p>Gün: {{ selectedAppointment.day }}</p>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="error" text @click="successDialog = false">Kapat</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}
          </v-snackbar>
        </v-sheet>
      </v-col>

    </v-row>



  </v-container>
</template>

<script>
import { format, addDays, getDay } from "date-fns";

export default {
  data() {
    return {
      snackbar: false,
      text: `Randevu dolu!`,
      timeout: 2000,
      range: [],
      selectedDay: 0,
      appointments: [],
      dialog: false,
      successDialog: false,
      activeAccordion: null,
      selectedAppointment: null,
      weeklyDates: [],
      disabledDates: [{
        repeat: {
          weekdays: [7, 1]
        }
      }],
      days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
      allAppointments: [
        [
          {
            doctor: "Uzman Sevgi Yörükoğlu",
            times: [
              { time: "8:00 - 9:00", selected: false },
              { time: "9:00 - 10:00", selected: true },
              { time: "10:00 - 11:00", selected: true },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: false },
              { time: "13:00 - 14:00", selected: false },
              { time: "14:00 - 15:00", selected: false },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: false },
            ],
            day: "Pazartesi",
          },
          {
            doctor: "Bursiyer Psikolog",
                  times: [
              { time: "8:00 - 9:00", selected: true },
              { time: "9:00 - 10:00", selected: false },
              { time: "10:00 - 11:00", selected: false },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: true },
              { time: "13:00 - 14:00", selected: false },
              { time: "14:00 - 15:00", selected: true },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: false },
            ],
            day: "Pazartesi",
          },
   
        ],
        [
          {
            doctor: "Bursiyer Psikolog",
            times: [
              { time: "8:00 - 9:00", selected: true },
              { time: "9:00 - 10:00", selected: false },
              { time: "10:00 - 11:00", selected: false },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: true },
              { time: "13:00 - 14:00", selected: false },
              { time: "14:00 - 15:00", selected: true },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: false },
            ],
            day: "Salı",
          },
   
        ],
        [
          {
            doctor: "Uzman Sevgi Yörükoğlu",
            times: [
              { time: "8:00 - 9:00", selected: true },
              { time: "9:00 - 10:00", selected: false },
              { time: "10:00 - 11:00", selected: false },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: true },
              { time: "13:00 - 14:00", selected: false },
              { time: "14:00 - 15:00", selected: true },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: false },
            ],
            day: "Çarşamba",
          },
    
        ],
      
        [
          {
            doctor: "Uzman Sevgi Yörükoğlu",
            times: [
              { time: "8:00 - 9:00", selected: true },
              { time: "9:00 - 10:00", selected: false },
              { time: "10:00 - 11:00", selected: false },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: true },
              { time: "13:00 - 14:00", selected: false },
              { time: "14:00 - 15:00", selected: true },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: false },
            ],
            day: "Cuma",
          },
        ],
        [
          {
            doctor: "Uzman Sevgi Yörükoğlu",
            times: [
              { time: "8:00 - 9:00", selected: true },
              { time: "9:00 - 10:00", selected: false },
              { time: "10:00 - 11:00", selected: false },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: true },
              { time: "13:00 - 14:00", selected: false },
              { time: "14:00 - 15:00", selected: true },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: false },
            ],
            day: "Cumartesi",
          },
          {
            doctor: "Bursiyer Psikolog",
            times: [
              { time: "8:00 - 9:00", selected: true },
              { time: "9:00 - 10:00", selected: false },
              { time: "10:00 - 11:00", selected: false },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: true },
              { time: "13:00 - 14:00", selected: false },
              { time: "14:00 - 15:00", selected: true },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: false },
            ],
            day: "Cumartesi",
          },
        ],
        [
          {
            doctor: "Uzman Sevgi Yörükoğlu",
            times: [
              { time: "8:00 - 9:00", selected: true },
              { time: "9:00 - 10:00", selected: false },
              { time: "10:00 - 11:00", selected: false },
              { time: "11:00 - 12:00", selected: true },
              { time: "12:00 - 13:00", selected: true },
              { time: "13:00 - 14:00", selected: true },
              { time: "14:00 - 15:00", selected: true },
              { time: "15:00 - 16:00", selected: true },
              { time: "16:00 - 17:00", selected: false },
              { time: "17:00 - 18:00", selected: true },
            ],
            day: "Pazar",
          },
        ],
      ]
    };
  },
  watch: {
    range(newVal) {
      console.log("Seçilen tarih aralığı:", newVal.start, " | ", newVal.end);
      this.updateWeeklyDates(newVal.start, newVal.end);
    }
  },
  created() {
    const today = new Date();
    const weeklyDates = Array.from({ length: 15 }, (_, i) => {
      const date = addDays(today, i);
      const dayIndex = getDay(date);
      const day = this.days[dayIndex];
      return { date: format(date, "dd.MM.yyyy"), day: day };
    });

    this.weeklyDates = weeklyDates;

    this.selectDay(0);
  },


  methods: {
    updateWeeklyDates(start, end) {
      const updatedDates = [];
      const startDate = new Date(start);
      const lastDate = new Date(end);
      const today = new Date();
      console.log(today)

      while (startDate <= lastDate) {
        const dayIndex = getDay(startDate);
        const day = this.days[dayIndex];
        const formattedDate = format(startDate, "dd.MM.yyyy");
        updatedDates.push({ date: formattedDate, day: day });
        startDate.setDate(startDate.getDate() + 1);
      }

      this.weeklyDates = updatedDates;
    },


    handleDateChange(value) {
      console.log("Başlangıç Tarihi:", format(value.start, "dd.MM.yyyy"));
      console.log("Bitiş Tarihi:", format(value.end, "dd.MM.yyyy"));

      // Yeni tarih aralığına göre weeklyDates bileşenini güncelle
      this.updateWeeklyDates(value.start, value.end);
    },
    selectDay(index) {
      this.selectedDay = index;
      this.getAppointments();
    },
    getAppointments() {
      this.appointments = [];

      // Seçilen günün adını alın
      const selectedDayName = this.days[this.selectedDay];

      // Tüm randevuları dolaşın ve sadece seçilen günle eşleşenleri filtreleyin
      this.appointments = this.allAppointments.flatMap(dayAppointments => {
        return dayAppointments.filter(appointment => appointment.day === selectedDayName);
      });
    },

    handleAppointmentClick(timeObj, appointment) {
      if (!timeObj.selected) {
        this.selectedAppointment = {
          doctor: appointment.doctor,
          timeObj: timeObj,
          day: appointment.day,
        };
        this.dialog = true;
      } else {
        this.snackbar = true;
      }
    },
    confirmAppointment() {
      console.log("Randevu Onaylandı");
      console.log("Doktor: ", this.selectedAppointment.doctor);
      console.log("Saat: ", this.selectedAppointment.timeObj.time);
      console.log("Gün: ", this.selectedAppointment.day);

      this.selectedAppointment.timeObj.selected = true;

      this.dialog = false;
      this.successDialog = true;
    },
    toggleAccordion(index) {
      this.activeAccordion = this.activeAccordion === index ? null : index;
    },
    handleDateChange(value) {
      // Tarih seçimi değiştiğinde yapılacak işlemler
      console.log("Başlangıç Tarihi:", format(value.start, "dd.MM.yyyy"));
      console.log("Bitiş Tarihi:", format(value.end, "dd.MM.yyyy"));
    },
  },
};
</script>

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