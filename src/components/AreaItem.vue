<template>
    <div
        v-if="area"
        class="area-item"
        :style="`background-color: ${area.color}; color: #aaa`"
        v-html="area.name"
    />
</template>
<script setup lang="ts">
import { Area } from "@/model/AnaboData";
const { area } = defineProps<{ area: Area }>();
</script>
<style>
.area-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    position: relative;
    color: #ccc;
    padding: 12px;
    gap: 2px 10px;
    cursor: pointer;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 12%);
}

.area-item div {
    z-index: 1;
}

.area-item::after {
    content: "";
    position: absolute;
    background-color: #fff;
    z-index: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.05s;
}

.area-item.active {
    outline: auto;
}
.area-item:hover::after,
.area-item.active::after {
    opacity: 0.1;
}
</style>
