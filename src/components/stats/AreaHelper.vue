<template>
    <div
        style="display: flex; justify-content: space-between"
        :style="
            adminView ? 'border-bottom: 2px solid var(--color-border);' : ''
        "
    >
        <div>
            <template v-if="!isEdit">
                <div v-text="helper.fio" />
                <div v-if="adminView" v-text="helper.schoolName" />
            </template>
            <template v-else>
                <div>
                    <label
                        style="margin-right: 4px"
                        for="fio"
                        v-text="'ФИО:'"
                    />
                    <input name="fio" v-model="helper.fio" />
                </div>
                <div>
                    <label
                        style="margin-right: 4px"
                        for="school"
                        v-text="'Учреждение:'"
                    />
                    <input name="school" v-model="helper.schoolName" />
                </div>
            </template>
        </div>
        <div v-if="month" style="display: flex">
            <div
                v-if="completedMonthTasks?.length == selectedMonthTasks?.length"
                v-text="'⭐'"
            />
            <div
                v-text="
                    `${completedMonthTasks?.length ?? 0}/${
                        selectedMonthTasks?.length ?? 0
                    }`
                "
            />
        </div>
        <div v-if="adminView">
            <button v-if="!isEdit" @click="isEdit = true">Редактировать</button>
            <button v-if="isEdit" @click="save(helper)">Сохранить</button>
            <button @click="remove(helper.id)">Удалить</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Helper } from "@/model/AnaboData";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { ref, computed, watch } from "vue";
const props = defineProps<{
    month?: string;
    helper: Helper;
    adminView?: boolean;
}>();
const { month, helper } = props;
const store = useMainStore();
const { tasks } = storeToRefs(store);
let selectedMonthTasks = tasks.value.filter((x) => x.month == month);

let completedMonthTasks = selectedMonthTasks.filter((x) =>
    helper.completedTaskIds?.includes?.(x.id)
);

let isEdit = ref(false);
function save(helper: Helper) {
    store.saveHelpers([helper]);
    isEdit.value = false;
}
function remove(helperId: string) {
    store.removeHelper(helperId);
}
</script>
