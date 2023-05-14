<template>
    <div>
        <div style="margin-bottom: 12px">
            <h1>Выбрать месяц:</h1>
            <input v-model="selectedMonth" type="month" />
        </div>
        <h1>Управление задачами на {{ currentMonthString }}</h1>
        <AdminTaskRow
            v-for="task in selectedMonthTasks"
            :key="task.id"
            :task="task"
            @remove="remove(task.id)"
        />
        <div
            style="display: flex; justify-content: center; align-items: center"
        >
            <button
                style="padding: 8px; margin: auto"
                @click="store.newTask(selectedMonth)"
            >
                Добавить новую задачу
            </button>
        </div>
        <button @click="save()" class="big-button" v-text="'Сохранить'" />
        <span v-if="state == 'saving'" v-text="'Производится сохранение ⌛'" />
        <span v-else-if="state == 'saved'" v-text="'Задачи сохранены ✔️'" />
    </div>
</template>
<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { format } from "date-fns";
import { computed, onMounted, ref } from "vue";
import AdminTaskRow from "@/components/AdminTaskRow.vue";
let selectedMonth = ref(format(new Date(), "yyyy-MM"));
const currentMonthString = computed(() =>
    format(new Date(selectedMonth.value), "LLLL yyyy")
);
let state = ref("none");
const store = useMainStore();
const selectedMonthTasks = computed(() => {
    return store.getMonthTasks(selectedMonth.value);
});
async function save() {
    state.value = "saving";
    await store.saveTasks();
    state.value = "saved";
}
async function remove(taskId: string) {
    state.value = "saving";
    await store.removeTask(taskId);
    state.value = "saved";
}
onMounted(() => (state.value = "none"));
</script>
