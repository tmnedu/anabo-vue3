<template>
    <div class="admin">
        <router-link
            :to="{ name: 'editHelpers' }"
            v-text="'Редактирование списка советников'"
        />
        <router-link
            :to="{ name: 'addHelper' }"
            v-text="'Добавить нового советника'"
        />
        <router-link
            :to="{ name: 'editTasks' }"
            v-text="'Редактирование списка задач'"
        />
    </div>
</template>

<style>
.admin {
    display: flex;
    flex-flow: column;
    align-items: center;
}
</style>
