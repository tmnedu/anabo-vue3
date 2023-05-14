<template>
    <div class="helper-card" style="min-width: 320px">
        <h3 style="padding: 6px" v-text="helper!.fio" />
        <div
            style="padding-left: 8px; padding-bottom: 6px"
            v-text="helper.schoolName"
        />
        <hr />
        <TaskRow
            v-for="task in monthTasks"
            :task="task"
            :helper="helper"
            :key="'task' + task.id"
        />
    </div>
</template>
<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import type { Helper } from "@/model/AnaboData";
import TaskRow from "./TaskRow.vue";

const { helper, month } = defineProps<{ helper: Helper; month: string }>();
const store = useMainStore();
const monthTasks = store.getMonthTasks(month);
</script>
<style>
.helper-card {
    background-color: var(--color-background-soft);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
