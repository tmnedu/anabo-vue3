<template>
    <div v-if="area">
        <h1>Задачи на {{ currentMonthString }}</h1>

        <div v-text="'Группа:'" />
        <div v-html="area.name" />
        <hr />
        <div v-text="'Координаторы:'" />
        <div>
            <div
                v-for="curator in curators"
                :key="'cur' + curator.id"
                v-html="curator.fio"
            />
        </div>
        <hr />
        <div v-text="'Советники:'" />
        <div class="helpers-grid">
            <HelperRow
                v-for="helper in areaHelpers"
                :key="'area' + helper.id"
                :helper="helper"
                :month="month"
            />
        </div>
        <button @click="save()" class="big-button" v-text="'Сохранить'" />
        <div v-if="state == 'saving'">Сохранение... ⌛</div>
        <div v-if="state == 'saved'">Сохранено ✔️</div>
    </div>
    <div v-else>Загрузка... ⌛</div>
</template>
<script setup lang="ts">
import HelperRow from "@/components/HelperRow.vue";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { format } from "date-fns";
import { onMounted, ref, type Ref, computed } from "vue";
const props = defineProps<{ id: string; month: string }>();
const store = useMainStore();
const { areas, helpers, curator } = storeToRefs(store);

const currentMonthString = format(new Date(props.month), "LLLL");

const curators = curator.value.filter((x) => x.areaId == props.id);

const area = computed(() => {
    return areas.value.find((x) => x.id == props.id);
});
const areaHelpers = computed(() => {
    return helpers.value.filter((x) => x.areaId == props.id);
});

let state = ref("none");
async function save() {
    state.value = "saving";
    await store.saveHelpers(areaHelpers.value);
    state.value = "saved";
}
onMounted(() => (state.value = "none"));
</script>
<style>
.helpers-grid {
    display: grid;
    /* grid-auto-flow: column;
  grid-auto-columns: 320px; */
    grid-template-columns: 1fr 1fr;
    gap: 6px 12px;
    /* width: 100%;
  height: 100%; */
}
@media (max-width: 780px) {
    .helpers-grid {
        grid-template-columns: 1fr;
    }
}
</style>
