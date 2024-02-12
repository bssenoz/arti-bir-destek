<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
</script>
<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0  mx-auto" max-width="450">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4 mb-5"><LcFullLogo /></div>
                            <AuthLoginForm />
                            <h6 class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3">
                                Hesabın yok mu?
                                <v-btn class="pl-0 text-primary text-body-1 opacity-1 pl-2" height="auto" to="/auth/register2" variant="plain"
                                    >Hesap oluştur</v-btn
                                >
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
