import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { setDefaultOptions } from "date-fns";
import { ru } from "date-fns/locale";

setDefaultOptions({ locale: ru });

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
