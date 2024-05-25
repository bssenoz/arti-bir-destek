<script setup lang="ts">
definePageMeta({
    layout: "blank",
    middleware: ['auth'],
});
</script>

<template>
    <div class="d-flex justify-center align-center text-center" style="height:90vh">
        <div class="mb-8">
            <img src="/images/backgrounds/403.png" alt="403" />
            <h1 class="text-h1">Bu Sayfaya Erişim İznin Yok!!!</h1>
            <v-btn flat color="primary" class="mt-8" to="/">Anasayfaya Geri Dön</v-btn>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 100%
}

@media (min-width: 800px) {
    img {
        width: 700px;
    }

}
</style>
