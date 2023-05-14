<template>
    <div>
        <h1>Статистика за {{ currentMonthString }}</h1>
        <AreaCard
            v-for="area in areas"
            :key="area.id"
            :area="area"
            :month="month"
        />
    </div>
</template>
<script setup lang="ts">
import AreaCard from "@/components/stats/AreaCard.vue";
import { useMainStore } from "@/stores/main";
import { format } from "date-fns";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const props = defineProps<{ month: string }>();
const store = useMainStore();
const { areas } = storeToRefs(store);
const currentMonthString = computed(() => format(new Date(props.month), "LLLL"));
</script>
