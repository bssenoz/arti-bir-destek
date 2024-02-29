<script setup lang="ts">
import { ref, computed, onMounted  } from 'vue';
import { useChatStore } from '@/stores/chat';
import PatientTable from '@/components/table/PatientTable.vue';

const store = useChatStore();
onMounted(() => {
    store.fetchChats();
});

</script>
<template>
    <v-card elevation="10">
        <v-card-text>
            <PatientTable />
        </v-card-text>
    </v-card>
    <!-- <v-row>
        <v-col cols="12">
            <v-data-table :headers="headers" :items="chatDetail" item-value="name" class="border rounded-md">
                <template v-slot:item="{ item }">
                    <tr>
                        <td class="text-subtitle-1">{{ item.columns.name }}</td>
                        <td class="text-subtitle-1">{{ item.columns.status }}</td>
                    </tr>
                </template>
            </v-data-table>
        </v-col>
    </v-row> -->
</template>

