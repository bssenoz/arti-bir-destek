<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import type { Header, Item } from 'vue3-easy-data-table';
import { format } from 'date-fns';
const store = useEcomStore();
onMounted(() => {
    store.fetchProducts();
});

const getProducts = computed(() => {
    return store.products;
});

const searchField = ref('name');
const searchValue = ref('');

const headers: Header[] = [
    { text: '#', value: 'image' },
    { text: 'Product name', value: 'name', sortable: true },
    { text: 'Created', value: 'created', sortable: true },
    { text: 'Price', value: 'offerPrice', sortable: true },
    { text: 'sale-price', value: 'salePrice', sortable: true },
    { text: 'status', value: 'isStock' },
    { text: 'Action', value: 'operation' }
];
const items = ref(getProducts);
const themeColor = ref('rgb(var(--v-theme-secondary))');

const itemsSelected = ref<Item[]>([]);
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Product List">
                <v-row justify="space-between" class="align-center mb-3">
                    <v-col cols="12" md="3">
                        <v-text-field
                            type="text"
                            variant="outlined"
                            placeholder="Search Product"
                            v-model="searchValue"
                            density="compact"
                            hide-details
                            prepend-inner-icon="mdi-magnify"
                        />
                    </v-col>
                    <v-col cols="12" md="3">
                        <div class="d-flex gap-2 justify-end">
                            <v-btn icon variant="text">
                                <CopyIcon size="20" />
                            </v-btn>
                            <v-btn icon variant="text">
                                <PrinterIcon size="20" />
                            </v-btn>
                            <v-btn icon variant="text">
                                <FilterIcon size="20" />
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
                <EasyDataTable
                    :headers="headers"
                    :items="items"
                    table-class-name="customize-table"
                    :theme-color="themeColor"
                    :search-field="searchField"
                    :search-value="searchValue"
                    :rows-per-page="5"
                    v-model:items-selected="itemsSelected"
                >
                    <template #item-image="{ image }">
                        <div class="player-wrapper">
                            <img alt="product" width="70" class="rounded-md" :src="image" />
                        </div>
                    </template>
                    <template #item-name="{ name }">
                        <div class="player-wrapper">
                            <h5 class="text-h5">{{ name }}</h5>
                        </div>
                    </template>
                    <template #item-created="{ date }">
                        <div class="player-wrapper">
                            {{ format(new Date(date), 'E, MMM d') }}
                        </div>
                    </template>
                    <template #item-offerPrice="{ offerPrice }">
                        <div class="player-wrapper">
                            <h5 class="text-h5">${{ offerPrice }}</h5>
                        </div>
                    </template>
                    <template #item-salePrice="{ salePrice }">
                        <div class="player-wrapper">
                            <h5 class="text-h5">${{ salePrice }}</h5>
                        </div>
                    </template>
                    <template #item-isStock="{ isStock }">
                        <div class="player-wrapper">
                            <v-chip color="success" v-if="isStock" size="small"> In Stock </v-chip>
                            <v-chip color="error" v-else size="small"> Out of Stock </v-chip>
                        </div>
                    </template>

                    <template #item-operation="item">
                        <div class="operation-wrapper">
                            <v-btn icon variant="text">
                                <DotsIcon size="18" />
                            </v-btn>
                        </div>
                    </template>
                </EasyDataTable>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
