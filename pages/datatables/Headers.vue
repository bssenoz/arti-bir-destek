<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { BasicDatatables } from '@/_mockApis/components/datatable/dataTable';

const page = ref({ title: 'Data Table Headers' });
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '#'
    },
    {
        text: 'Data Table Headers',
        disabled: true,
        href: '#'
    }
]);

/*Header Data*/
const headers = ref([
    { title: 'Name', align: 'start', key: 'name', sortable: false, },
    { title: 'Project Name', align: 'start', key: 'project' },
    { title: 'Post', align: 'start', key: 'post' },
    { title: 'Status', align: 'start', key: 'status' },
    { title: 'Budget', align: 'end', key: 'budget' },
])

// const headerswithremove = ref([
//     { title: 'Name', align: 'start', key: 'name', sortable: false, },
//     { title: 'Project Name', align: 'start', key: 'project', removable: true },
//     { title: 'Post', align: 'start', key: 'post', removable: true },
//     { title: 'Status', align: 'start', key: 'status', removable: true },
//     { title: 'Budget', align: 'start', key: 'budget', removable: true },
// ])

// function headermove(this: any, key: string) {
//     this.headerswithremove = this.headerswithremove.filter((header: { key: string }) => header.key !== key);
// }

</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Column Slot">
                <v-data-table items-per-page="5" :headers="headers" :items="BasicDatatables" item-value="name"
                    class="border rounded-md">
                    <template v-slot:column.name="{ column }">
                        {{ column.title.toUpperCase() }}
                    </template>
                </v-data-table>
            </UiParentCard>

            <!-- <UiChildCard title="Headers Slot" class="mt-6 pb-0">
                <v-data-table items-per-page="5" :headers="headerswithremove" :items="BasicDatatables" item-value="name"
                    class="border rounded-md">
                    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
                        <tr>
                            <template v-for="column in columns" :key="column.key">
                                <td class="tdhead">
                                    <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{ column.title
                                    }}</span>
                                    <template v-if="isSorted(column)">
                                        <v-icon :icon="getSortIcon(column)"></v-icon>
                                    </template>
                                    <v-icon v-if="column.removable" icon="$close"
                                        @click="() => headermove(column.key)"></v-icon>
                                </td>
                            </template>
                        </tr>
                    </template>
                </v-data-table>
            </UiChildCard> -->
        </v-col>
    </v-row>
</template>

