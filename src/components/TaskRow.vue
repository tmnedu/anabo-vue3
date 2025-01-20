<template>
    <div class="task">
        <div style="padding-left: 8px" v-text="task.title" />
        <input
            style="min-width: 30px; height: 30px; margin: 5px 0"
            type="checkbox"
            v-model="isTaskDone"
        />
        {{ helper.completedTaskIds }}
        {{ task.id }}
    </div>
</template>
<script setup lang="ts">
import type { Helper, Task } from "@/model/AnaboData";
import { computed } from "vue";
const { task, helper } = defineProps<{ task: Task; helper: Helper }>();
if (!helper.completedTaskIds) helper.completedTaskIds = [];
const isTaskDone = computed({
    get() {
        return helper.completedTaskIds?.includes?.(task.id) ?? false;
    },
    set(_newValue) {
        if (!helper.completedTaskIds) return;
        if (helper.completedTaskIds.includes(task.id)) {
            const index = helper.completedTaskIds.indexOf(task.id);
            if (index > -1) helper.completedTaskIds.splice(index, 1);
        } else helper.completedTaskIds.push(task.id);
    },
});
</script>
