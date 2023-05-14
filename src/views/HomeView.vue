<template>
    <main>
        <div>
            <h2 style="margin-top: 12px" v-text="'Выберите месяц:'" />
            <div>
                <div
                    @click="selectedMonth = month"
                    style="display: flex"
                    v-for="month in months"
                    :key="month"
                >
                    <div v-text="formatDate(month)" />
                    <div
                        style="margin-left: 4px"
                        v-if="month == selectedMonth"
                        v-text="'✅'"
                    />
                </div>
            </div>
            <h2 style="margin: 12px 0" v-text="'Выберите группу:'" />
            <div class="areas">
                <AreaItem
                    v-for="(area, i) in areas"
                    :area="area"
                    :key="i"
                    @click="
                        $router.push({
                            name: 'area',
                            params: { id: area.id, month: selectedMonth },
                        })
                    "
                />
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import AreaItem from "@/components/AreaItem.vue";
import { computed, ref } from "vue";
import { format } from "date-fns";
const store = useMainStore();
const { areas, tasks } = storeToRefs(store);
function formatDate(date: string | number | Date) {
    return format(new Date(date), "yyyy LLLL");
}
let selectedMonth = ref(format(new Date(), "yyyy-MM"));
const months = computed(() => {
    return new Set(tasks.value.map((x) => x.month).filter((x) => !!x));
});
</script>
