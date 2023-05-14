<template>
    <div id="app">
        <header>
            <div class="wrapper">
                <h1>Статистика</h1>
                <nav v-if="isInited">
                    <router-link to="/">Ввод данных</router-link>
                    <router-link to="/admin">Управление</router-link>
                    <router-link to="/results">Итоги</router-link>
                </nav>
            </div>
        </header>

        <router-view v-if="isInited" class="main" />

        <div v-else style="display: flex; flex-direction: column">
            <label v-text="'Пароль'" />
            <input v-model="key" />
            <button @click="login">Войти</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "@/stores/main";
import { onMounted, ref } from "vue";
const store = useMainStore();
const { isInited } = storeToRefs(store);

function initStore(key: any) {
    store.dbInit(key);
}
let key = ref("");
function login() {
    window.localStorage.setItem("anabo-key", key.value);
    initStore(key.value);
}
function mounted() {
    let lsKey = window.localStorage.getItem("anabo-key");
    console.log('found key', lsKey)
    if (lsKey) initStore(lsKey);
}
onMounted(mounted);
</script>
<style scoped>
@media (min-width: 1024px) {
    .main {
        min-width: 320px;
    }
}
#app {
    display: flex;
    flex-flow: column;
}
header {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 1.5;
    padding: 10px 30px;
    background-color: var(--color-background-soft);
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
    /* margin-top: 2rem; */
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        /* margin-top: 1rem; */
    }
}
</style>
