<template>
  <span v-if="state == 'new'">
    <h1>Добавить советника</h1>
    <div>
      <label for="fio" v-text="'ФИО советника: '" />
      <input name="fio" v-model="helper.fio" />
    </div>
    <div>
      <label for="fio" v-text="'Наименование организации: '" />
      <input name="fio" v-model="helper.schoolName" />
    </div>
    <div>
      <div style="display: flex">
        <label v-text="'Группа (муниципалитет):'" style="margin-right: 4px" />
        <div style="min-height: 168px" v-html="selectedArea" />
      </div>
      <div class="areas">
        <AreaItem
          :class="{ active: helper.areaId == area.id }"
          v-for="(area, i) in areas"
          :area="area"
          :key="i"
          @click="selectArea(area)"
        />
      </div>
    </div>
    <button @click="save()" class="big-button" v-text="'Сохранить'" />
  </span>
  <span v-else="state == 'saving'" v-text="'Производится сохранение ⌛'" />
  <span v-else="state == 'saved'">
    <span v-text="'Советник добавлен ✔️'" />
    <button @click="refreshState()">Добавить нового</button>
  </span>
</template>
<script setup lang="ts">
import AreaItem from '@/components/AreaItem.vue'
import { useMainStore } from '@/stores/main'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { Helper, Area } from '../model/AnaboData'
import { getDatabase, ref as dbref, set } from 'firebase/database'

let state: { value: 'new' | 'saving' | 'saved' } = ref('new')
async function saveNewHelper() {
  console.log('saveNewHelper()')
  const db = getDatabase()
  console.log('getDatabase()')
  await set(dbref(db, 'anabo/helpers/' + helper.id), helper)
  store.init()
  console.log('set()')
  state.value = 'saved'
}

const store = useMainStore()
const { areas, helpers } = storeToRefs(store)

let helper = new Helper()
function makeNewHelper() {
  helper = reactive(new Helper())
  helper.id = store.getNewHelperId()
}
makeNewHelper()
const selectedArea = computed(() => {
  return areas.value.find((x) => x.id == helper.areaId)?.name ?? 'Не выбрана'
})
function selectArea(area: Area) {
  helper.areaId = area.id
}
function refreshState() {
  state.value = 'new'
  makeNewHelper()
}
function save() {
  if (helper.areaId && helper.fio && helper.schoolName) {
    console.log('saving')
    state.value = 'saving'
    saveNewHelper()
  } else console.log('not saving')
}
</script>
