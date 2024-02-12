<script setup>
import { DotsIcon } from 'vue-tabler-icons';
const props = defineProps({ item: Object });
</script>

<template>
        <v-list-subheader color="darkText" class="smallCap text-uppercase text-subtitle-2 mt-5 font-weight-bold">
            <span class="mini-icon"><DotsIcon size="16" stroke-width="1.5" class="iconClass" /></span>
            <span class="mini-text">{{props.item.header}}</span>
        </v-list-subheader>
</template>
