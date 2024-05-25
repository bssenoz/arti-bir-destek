<script setup lang="ts">
import { ref, onMounted, computed, watchEffect } from "vue";
import { useMeetStore } from "~/stores/meet";
import { useUserStore } from "~/stores/user";
import { DoctorIdType } from '~/types/UserType';

const succesDialog = ref(false);
const errorDialog = ref(false);

const daysToAdd = 15;
const today = new Date();
const dates = Array.from({ length: daysToAdd }, (_, i) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + i));

const meetStore = useMeetStore();
const userStore = useUserStore();

const hours = Array.from({ length: 9 }, (_, i) => [i + 8, i + 9]);
const selectedHours = ref<Array<Array<boolean>>>(
  Array.from({ length: daysToAdd }, () => Array.from({ length: 10 }, () => false))
);

onMounted(() => {
  meetStore.getDoctorSchedule();
  userStore.getCurrentUser();
});

const currentUser = computed(() => {
  return userStore.currentUser;
});

const saveSchedule = () => {
  console.log("save")
  const selectedTimes: { day: string; timeRanges: number[] }[] = [];
  selectedHours.value.forEach((day, dayIndex) => {
    const date = dates[dayIndex];
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    const selectedTimesForDay = hours
      .filter((hour, hourIndex) => day[hourIndex])
      .map((hour) => hour[0]);
    if (selectedTimesForDay.length > 0) {
      selectedTimes.push({
        day: formattedDate,
        timeRanges: selectedTimesForDay,
      });
    }
  });
  try {
    // console.log(JSON.stringify(selectedTimes));
    const data: DoctorIdType = {
      doctorId: currentUser.value.id,
    };
    meetStore.postCalendar(JSON.stringify(selectedTimes), data)
    succesDialog.value = true;
  } catch (err) {
    console.log(err)
    errorDialog.value = true;
  }
};

const handleButtonClick = (dayId: number, hourIndex: number) => {
  selectedHours.value[dayId][hourIndex] =
    !selectedHours.value[dayId][hourIndex];
};

watchEffect(() => {
  const updatedSelectedHours = Array.from({ length: daysToAdd }, () =>
    Array.from({ length: 11 }, () => false)
  );
  meetStore.schedule.forEach((entry: { [x: string]: any; day: any; }) => {
    const dayIndex = entry.day;

    const givenDateStr = dayIndex;
    const parts = givenDateStr.split('.');

    const givenDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

    const formattedGivenDate = givenDate.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

    let i = 0;
    const index = dates.findIndex((date) => {
      i++;

      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
      }) === formattedGivenDate;
    });

    if (index > -1) {
      if (entry.eightToNine) updatedSelectedHours[index][0] = true;
      if (entry.nineToTen) updatedSelectedHours[index][1] = true;
      if (entry.tenToEleven) updatedSelectedHours[index][2] = true;
      if (entry.elevenToTwelve) updatedSelectedHours[index][3] = true;
      if (entry.twelveToThirteen) updatedSelectedHours[index][4] = true;
      if (entry.thirteenToFourteen) updatedSelectedHours[index][5] = true;
      if (entry.fourteenToFifteen) updatedSelectedHours[index][6] = true;
      if (entry.fifteenToSixteen) updatedSelectedHours[index][7] = true;
      if (entry.sixteenToSeventeen) updatedSelectedHours[index][8] = true;
    }

  });
  selectedHours.value = updatedSelectedHours;
});

const formatDate = (date: Date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('tr-TR', options);
};
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
          <v-container v-for="(date, index) in dates" :key="index">
            <v-card class="px-6 py-6 elevation-6">
              <h3 class="mb-4">{{ formatDate(date) }}</h3>
              <v-row align="center">
                <v-col v-for="(hour, hourIndex) in hours" :key="hourIndex" cols="6" md="3" lg="2">
                  <v-btn :color="selectedHours[index][hourIndex] ? 'primary' : 'grey200'" dense
                    @click="handleButtonClick(index, hourIndex)">
                    <span>{{ `${hour[0]}:00 - ${hour[1]}:00` }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="primary" size="large" class="float-right" @click="saveSchedule">Kaydet</v-btn>
        </v-col>
      </v-row>
      <v-dialog v-model="errorDialog" max-width="500">
        <v-card>
          <v-card-title>HATA!</v-card-title>
          <v-card-text>
            Bir hatayla karşılaşıldı :(
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="errorDialog = false">Tamam</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="succesDialog" max-width="500">
        <v-card>
          <v-card-title>Başarılı!</v-card-title>
          <v-card-text>
            Randevu takvimi güncellendi.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="succesDialog = false">Tamam</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
