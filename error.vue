<script setup lang="ts">
definePageMeta({
    layout: "blank",
});
</script>

<template>
    <div class="d-flex justify-center align-center text-center" style="height:90vh">
        <div>
            <img src="/images/backgrounds/404.png" alt="404" />
            <h1 class="text-h1" style="margin-top:-2rem">Hay Aksi!!!</h1>
            <h4 class="text-h4 my-6">Aradığın sayfa bulunmamakta.</h4>
            <v-btn flat color="primary" class="mb-8" to="/">Anasayfaya Geri Dön</v-btn>
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
