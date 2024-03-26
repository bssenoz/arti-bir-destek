<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  startOfDay,
  addDays,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns";

interface Day {
  id: number;
  name: string;
}

interface Appointment {
  dayId: number;
  dayName: string;
  times: string[];
}

const days: Day[] = [
  { id: 0, name: 'Pazartesi' },
  { id: 1, name: 'Salı' },
  { id: 2, name: 'Çarşamba' },
  { id: 3, name: 'Perşembe' },
  { id: 4, name: 'Cuma' },
  { id: 5, name: 'Cumartesi' },
  { id: 6, name: 'Pazar' }
];
const randevular: { date: Date; time: number }[] = [];

const hours = Array.from({ length: 11 }, (_, i) => `${i + 8}:00`);
const selectedHours = ref<Array<Array<boolean>>>(Array.from({ length: 7 }, () => Array.from({ length: 11 }, () => false)));

const appointments = ref<Array<Appointment>>([
  { dayId: 0, times: [] },
  { dayId: 1, times: [] },
  { dayId: 2, times: [] },
  { dayId: 3, times: [] },
  { dayId: 4, times: [] },
  { dayId: 5, times: [] },
  { dayId: 6, times: [] }
]);

const logSelectedTime = (dayId: number, dayName: string, time: string) => {
  console.log(`Seçilen gün ID: ${dayId}, Gün: ${dayName}, Saat: ${time}`);
};

const saveSchedule = () => {
  const selectedTimes = [];
  selectedHours.value.forEach((day, dayIndex) => {
    const selectedTimesForDay = hours.filter((hour, hourIndex) => day[hourIndex]);
    if (selectedTimesForDay.length > 0) {
      selectedTimes.push({ dayId: dayIndex, dayName: days[dayIndex].name, times: selectedTimesForDay });
    }
  });

  const today = new Date();
  console.log("bugünün tarihi: ", today);
  const birAySonrasi = addDays(startOfDay(today), 30); // Bugünden ? gün sonrası

  const dayDates = getDayDates(today, birAySonrasi);
  console.log("selectedTimes: ",selectedTimes)

  dayDates.Monday.forEach((date) => {
    selectedTimes[0]?.times.forEach((hour) => {
      randevular.push({ date, time: hour });
    });
  });
  dayDates.Tuesday.forEach((date) => {
    selectedTimes[1]?.times.forEach((hour) => {
      randevular.push({ date, time: hour });
    });
  });
  dayDates.Wednesday.forEach((date) => {
    selectedTimes[2]?.times.forEach((hour) => {
      randevular.push({ date, time: hour });
    });
  });
  dayDates.Thursday.forEach((date) => {
    selectedTimes[3]?.times.forEach((hour) => {
      randevular.push({ date, time: hour });
    });
  });
  dayDates.Friday.forEach((date) => {
    selectedTimes[4]?.times.forEach((hour) => {
      randevular.push({ date, time: hour });
    });
  });
  dayDates.Saturday.forEach((date) => {
    selectedTimes[5]?.times.forEach((hour) => {
      randevular.push({ date, time: hour });
    });
  });
  dayDates.Sunday.forEach((date) => {
    selectedTimes[6]?.times.forEach((hour) => {
      randevular.push({ date, time: hour });
    });
  });


  console.log("Randevular:");
  randevular.forEach((randevu) => {
    console.log(`${randevu.date.toISOString().slice(0, 10)} ${randevu.time}:00`);
  });
};

const handleCheckboxChange = (dayId: number, hourIndex: number) => {
  selectedHours.value[dayId][hourIndex] = !selectedHours.value[dayId][hourIndex];
};

onMounted(() => {
  appointments.value.forEach(appointment => {
    appointment.times.forEach(time => {
      selectedHours.value[appointment.dayId][hours.indexOf(time)] = true;
    });
  });
});


function getDayDates(baslangicTarihi: Date, bitisTarihi: Date) {
  const days: Record<string, Date[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  let date = startOfDay(baslangicTarihi);
debugger;
  while (date <= bitisTarihi) {
    if (isMonday(date)) {
      days.Monday.push(new Date(date));
    } else if (isTuesday(date)) {
      days.Tuesday.push(new Date(date));
    } else if (isWednesday(date)) {
      days.Wednesday.push(new Date(date));
    } else if (isThursday(date)) {
      days.Thursday.push(new Date(date));
    } else if (isFriday(date)) {
      days.Friday.push(new Date(date));
    } else if (isSaturday(date)) {
      days.Saturday.push(new Date(date));
    } else if (isSunday(date)) {
      days.Sunday.push(new Date(date));
    }
    date = addDays(date, 1);
  }

  Object.keys(days).forEach((dayName) => {
    days[dayName] = days[dayName].map((day) => addDays(day, 1));
  });

  return days;
}



// dayDates.Tuesday.forEach((date) => {
//   [9, 14, 17].forEach((hour) => {
//     randevular.push({ date, time: hour });
//   });
// });


</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h2 class="text-center">RANDEVU TAKVİMİ</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-container v-for="(day, index) in days" :key="index">
            <h3>{{ day.name }}</h3>
            <v-row align="center">
              <v-col v-for="(hour, hourIndex) in hours" :key="hourIndex" cols="auto">
                <v-checkbox :model-value="selectedHours[day.id][hourIndex]"
                  @update:model-value="handleCheckboxChange(day.id, hourIndex)" :label="hour" dense></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" size="large" class="float-right" @click="saveSchedule">Kaydet</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
