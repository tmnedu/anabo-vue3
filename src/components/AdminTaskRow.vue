<template>
    <div class="task">
        <input style="padding: 8px" v-model="task.title" />
        {{ task.id }}
        <button style="padding: 8px" @click="$emit('remove')">Удалить</button>
    </div>
</template>

<script setup lang="ts">
import type { Task } from "@/model/AnaboData";
const { task } = defineProps<{ task: Task }>();
</script>
