<template>
  <div>
    <h1>Итоговая таблица</h1>
    <div style="display: flex; flex-flow: column">
      <router-link
        :to="{ name: 'monthStats', params: { month } }"
        v-for="month in months"
        v-text="format(new Date(month), 'yyyy LLLL')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { format } from 'date-fns'
const store = useMainStore()
const { tasks } = storeToRefs(store)
const months = new Set(tasks.value.map((x) => x.month).filter((x) => !!x))
</script>
