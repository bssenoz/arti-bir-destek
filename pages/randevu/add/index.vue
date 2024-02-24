<script setup lang="ts">

</script>
<template>
  <v-card elevation="10">
    <v-card-item>
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title class="text-h5">Yeni Görüşme Oluştur</v-card-title>
      </div>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text class="pb-1">
      <h6 class="text-h6">Görüşme Bilgileri</h6>
      <div class="mt-6">
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="3" class="pb-sm-3 pb-0 text-right">
            <v-label class=" font-weight-medium">Hasta Ad Soyad</v-label>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field color="primary" variant="outlined" type="text" hide-details />
          </v-col>
        </v-row>
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="3" class="pb-sm-3 pb-0 text-right">
            <v-label class=" font-weight-medium">Online Görüşme Linki</v-label>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field color="primary" variant="outlined" type="text" hide-details />
          </v-col>
        </v-row>
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="3" class="pb-sm-3 pb-0 text-right">
            <v-label class=" font-weight-medium">Tarih</v-label>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field color="primary" variant="outlined" type="date" hide-details></v-text-field>
          </v-col>
        </v-row>
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="3" class="pb-sm-3 pb-0 text-right">
            <v-label class=" font-weight-medium">Saat</v-label>
          </v-col>
          <v-col cols="12" sm="9">
            <v-text-field color="primary" variant="outlined" type="text" hide-details>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="align-center mb-3">
          <v-col cols="12" sm="9" offset-sm="3">
            <v-btn color="primary" flat>Kaydet</v-btn>
            <v-btn class="bg-lighterror text-error ml-4" flat>İptal</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>
