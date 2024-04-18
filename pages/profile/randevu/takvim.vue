<template>
<v-container v-if="schedule == ''" class="text-center">
    <v-row >
        <v-col cols="8">
            <v-img src="/images/backgrounds/Calendar-bro.png"  class="w-100"/>
        </v-col>
        <v-col cols="4">
            <div class="text-h5 mb-4" style="margin-top: 12rem;">Henüz takvimini oluşturmadın !</div>
            <v-btn href="/profile/randevu/takvim-ekle" color="primary">Takvim Oluştur</v-btn>
        </v-col>
    </v-row>
</v-container>

    <v-container v-else>
        <v-row>
            <v-col cols="12">
                <v-sheet class="mx-auto mt-4">
                    <v-btn-toggle v-model="selectedDay" mandatory>
                        <v-btn v-for="(item, index) in weeklyDates" :key="index" :value="index" 
                            @click="selectDay(item.day.id)">
                            {{ item.day.day }}
                        </v-btn>
                    </v-btn-toggle>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card class="elevation-2">

                    <v-container v-for="(day, dayIndex) in appointments" :key="dayIndex">
                        <v-row align="center">
                            <v-col cols="4">
                                <v-btn :color="appointments[0].eightToNine ? 'primary' : 'grey200'" class="ma-1 w-100"
                                    outlined @click="handleButtonClick(appointments[0], 'eightToNine')">
                                    08:00 - 09:00
                                </v-btn>

                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].nineToTen ? 'primary' : 'grey200'" class="ma-1 w-100"
                                    outlined @click="handleButtonClick(appointments[0], 'nineToTen')">
                                    09:00 - 10:00
                                </v-btn>

                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].tenToEleven ? 'primary' : 'grey200'" class="ma-1 w-100"
                                    outlined @click="handleButtonClick(appointments[0], 'tenToEleven')">
                                    10:00 - 11:00
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].elevenToTwelve ? 'primary' : 'grey200'"
                                    class="ma-1 w-100" outlined
                                    @click="handleButtonClick(appointments[0], 'elevenToTwelve')">
                                    11:00 - 12:00
                                </v-btn>

                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].twelveToThirteen ? 'primary' : 'grey200'"
                                    class="ma-1 w-100" outlined
                                    @click="handleButtonClick(appointments[0], 'twelveToThirteen')">
                                    12:00 - 13:00
                                </v-btn>

                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].thirteenToFourteen ? 'primary' : 'grey200'"
                                    class="ma-1 w-100" outlined
                                    @click="handleButtonClick(appointments[0], 'thirteenToFourteen')">
                                    13:00 - 14:00
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].fourteenToFifteen ? 'primary' : 'grey200'"
                                    class="ma-1 w-100" outlined
                                    @click="handleButtonClick(appointments[0], 'fourteenToFifteen')">
                                    14:00 - 15:00
                                </v-btn>

                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].fifteenToSixteen ? 'primary' : 'grey200'"
                                    class="ma-1 w-100" outlined
                                    @click="handleButtonClick(appointments[0], 'fifteenToSixteen')">
                                    15:00 - 16:00
                                </v-btn>

                            </v-col>
                            <v-col cols="4">
                                <v-btn :color="appointments[0].sixteenToSeventeen ? 'primary' : 'grey200'"
                                    class="ma-1 w-100" outlined
                                    @click="handleButtonClick(appointments[0], 'sixteenToSeventeen')">
                                    16:00 - 17:00
                                </v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-dialog max-width="500">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <v-btn v-bind="activatorProps" color="surface-variant" text="Kaydet"
                                            class="float-right mt-6" variant="flat"></v-btn>
                                    </template>
                                    <template v-slot:default="{ isActive }">
                                        <v-card title="Güncelleme">
                                            <v-card-text class="text-h5">
                                                İlgili güne ait randevular güncellensin mi?
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn text="Güncelle" color="primary" class="text-h6"
                                                    @click="updateSchedule(day)"></v-btn>
                                                <v-btn text="İptal" class="text-h6"
                                                    @click="isActive.value = false"></v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useMeetStore } from '~/stores/meet';

interface Time {
    time: string;
    selected: boolean;
}

interface Day {
    times: Time[];
    day: number;
}

export default defineComponent({
    setup() {
        const days = ref < Record < number, string>> ({
            0: 'Pazar',
            1: 'Pazartesi',
            2: 'Salı',
            3: 'Çarşamba',
            4: 'Perşembe',
            5: 'Cuma',
            6: 'Cumartesi'
        });
        const selectedDay = ref < number > (0);
        const appointments = ref < Day[][] > ([]);
        const weeklyDates = ref < { day: { id: number; day: string } }[] > ([]);
        const meetStore = useMeetStore();

        const schedule = computed(() => meetStore.schedule);
        onMounted(() => {
            meetStore.getDoctorSchedule().then(() => {
                appointments.value = schedule.value.filter(item => item.day === 1);
            });
        });


        const selectDay = (index: number) => {
            selectedDay.value = index;
            console.log("index: ", index)
            appointments.value = schedule.value.filter(item => item.day === index);
            console.log(appointments.value)
        };

        const handleButtonClick = (timeObj: Time, propertyName: string) => {
            console.log(timeObj);
            timeObj[propertyName] = !timeObj[propertyName];
        };

        const updateSchedule = (day: any) => {
            meetStore.updateCalendar(day)
            isActive.value = false;
        }

        const handleAppointmentClick = (timeObj: Time, day: Day) => {
            if (!timeObj.selected) {
                // İşlemler burada gerçekleştirilecek
            } else {
                // İşlemler burada gerçekleştirilecek
            }
        };

        weeklyDates.value = Array.from({ length: 7 }, (_, i) => {
            const dayIndex = i;
            return { day: { id: dayIndex, day: days.value[dayIndex] } };
        });

        selectDay(0);



        return {
            days,
            selectedDay,
            appointments,
            weeklyDates,
            selectDay,
            handleAppointmentClick,
            handleButtonClick,
            schedule,
            updateSchedule
        };
    }
});
</script>

<style scoped>
/* Stiller buraya eklenecek */
</style>