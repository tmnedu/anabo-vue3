<template>
    <div
        v-if="areaHelpers.length > 0"
        style="border: 1px solid #aaa; margin-bottom: 12px"
    >
        <div
            :style="`background-color: ${area.color}; color: #aaa;padding: 12px`"
        >
            <div v-text="'Группа: '" />
            <div v-html="area.name" />
        </div>
        <div style="padding: 12px">
            <AreaHelper
                :key="month"
                :admin-view="adminView"
                :month="month"
                v-for="helper in areaHelpers"
                :helper="helper"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Area } from "@/model/AnaboData";
import AreaHelper from "./AreaHelper.vue";
import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/main";
import { computed } from "vue";
const { month, area } = defineProps<{
    month?: string;
    area: Area;
    adminView?: boolean;
}>();
const store = useMainStore();
const { helpers } = storeToRefs(store);
const areaHelpers = computed(() =>
    helpers.value.filter((x) => x.areaId == area.id)
);
</script>
