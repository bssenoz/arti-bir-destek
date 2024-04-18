<template>
    <div class="timeline-container text-center" >

    <v-timeline align="start" side="end">
        <v-timeline-item dot-color="warning" size="small">
            <div class="d-flex">
                <div>
                    <strong class="float-left">14.04.2024 / 14.00</strong>
                    <div class="text-h6 font-weight-regular float-left">
                        Uzman Ayşe Hatice Yılmaz
                    </div>
                </div>
            </div>
        </v-timeline-item>

        <v-timeline-item dot-color="primary" size="small">
            <div class="d-flex">
                <div>
                    <strong class="float-left">14.04.2024 / 14.00</strong>
                    <div class="text-h6 font-weight-regular float-left">
                        Uzman Hatice Karakılıç
                    </div>
                </div>
            </div>
        </v-timeline-item>

        <v-timeline-item dot-color="pink" size="small">
            <div>
                <strong class="float-left">14.04.2024 / 14.00</strong>
                <div class="text-h6 font-weight-regular float-left">
                    Bursiyer Psikolog
                </div>
            </div>
        </v-timeline-item>

        <v-timeline-item dot-color="primary" size="small">
            <div class="d-flex">
                <div>
                    <strong class="float-left">20.04.2024 / 09.00</strong>
                    <div class="text-h6 font-weight-regular float-left">
                        Uzman Sevgi Yörükoğlu
                    </div>
                </div>
            </div>
        </v-timeline-item>
        <v-timeline-item dot-color="primary" size="small">
            <div class="d-flex">
                <div>
                    <strong class="float-left">20.04.2024 / 09.00</strong>
                    <div class="text-h6 font-weight-regular float-left">
                        Uzman Sevgi Yörükoğlu
                    </div>
                </div>
            </div>
        </v-timeline-item>
        <v-timeline-item dot-color="primary" size="small">
            <div class="d-flex">
                <div>
                    <strong class="float-left">20.04.2024 / 09.00</strong>
                    <div class="text-h6 font-weight-regular float-left">
                        Uzman Sevgi Yörükoğlu
                    </div>
                </div>
            </div>
        </v-timeline-item>
    </v-timeline>
</div>

</template>

<style scoped>
::v-deep(.v-timeline-divider__before) {
    background: #ccc;
}

::v-deep(.v-timeline-divider__after) {
    background: #ccc;
}
.timeline-container {
  max-height: 350px;
  overflow-y: auto; 
  padding-right: 10px; 
  margin-bottom: 2rem;
}

.timeline-container::-webkit-scrollbar {
  width: 8px; 
}

.timeline-container::-webkit-scrollbar-thumb {
  background-color: #a69ba1; 
  border-radius: 4px; 
}

.timeline-container::-webkit-scrollbar-track {
  background-color: #eee;
}

</style>