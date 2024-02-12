<template>
    <div class="d-sm-flex">
        <v-switch color="primary" :model-value="true" hide-details></v-switch>

        <v-switch color="primary" :model-value="false" hide-details></v-switch>
        <v-switch color="primary" :model-value="true" disabled hide-details></v-switch>

        <v-switch color="primary" :model-value="false" disabled hide-details></v-switch>
        <v-switch loading="error" :model-value="true" hide-details></v-switch>

        <v-switch :model-value="false" loading="error" hide-details></v-switch>
    </div>
</template>
