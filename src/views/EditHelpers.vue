<template>
    <div>
      <h1>Список советников</h1>
      <AreaCard v-for="area in areas" admin-view :key="area.id" :area="area" />
    </div>
  </template>
  <script setup lang="ts">
  import AreaCard from '@/components/stats/AreaCard.vue'
  import { useMainStore } from '@/stores/main'
  import { storeToRefs } from 'pinia'
  const store = useMainStore()
  const { areas } = storeToRefs(store)

  </script>
