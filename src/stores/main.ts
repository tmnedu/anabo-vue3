import { defineStore } from "pinia";
import {
    getDatabase,
    ref,
    set,
    child,
    get,
    remove,
    type DatabaseReference,
} from "firebase/database";
import {
    type FirebaseOptions,
    initializeApp,
    getApps,
    deleteApp,
} from "firebase/app";
import AnaboData, { Helper, Task } from "@/model/AnaboData";
let makeConfig = (key: string) => {
    const config: FirebaseOptions = {
        databaseURL: `https://${key}-default-rtdb.europe-west1.firebasedatabase.app`,
    };
    return config;
};

export const useMainStore = defineStore({
    id: "main",
    state: () => {
        return {
            dbRef: undefined as unknown as DatabaseReference,
            information: new AnaboData(),
            isInited: false,
        };
    },
    actions: {
        async dbInit(key: string) {
            console.log("store: dbInit()");
            const apps = getApps();
            const app = apps.find((app) => app.name == "[DEFAULT]");
            if (app) deleteApp(app);
            initializeApp(makeConfig(key));
            this.dbRef = ref(getDatabase());
            const availabilitySnapshot = await get(child(this.dbRef, "anabo"));
            if (availabilitySnapshot.exists()) {
                this.isInited = true;
                this.init();
                return "success";
            } else return "error";
        },
        async init() {
            console.log("store: init()");
            const snapshot = await get(child(this.dbRef, "anabo"));
            console.log("store: snapshot", snapshot);
            if (snapshot.exists()) this.information = snapshot.val();
            else console.warn("db empty");
            return;
        },
        async saveHelpers(areaHelpers: Helper[]) {
            const helpersSnapshot = await get(
                child(this.dbRef, "anabo/helpers")
            );
            if (helpersSnapshot.exists()) {
                let tempHelpers = helpersSnapshot.val();
                areaHelpers.forEach((hlpr) => (tempHelpers[hlpr.id] = hlpr));
                await set(ref(getDatabase(), "anabo/helpers"), tempHelpers);
                this.init();
            }
        },
        async removeHelper(helperId: string) {
            await remove(ref(getDatabase(), "anabo/helpers/" + helperId));
            await this.init();
        },
        getMonthTasks(month: string) {
            return this.tasks.filter((x) => x.month == month);
        },
        async saveTasks() {
            const tasksSnapshot = await get(child(this.dbRef, "anabo/tasks"));
            if (tasksSnapshot.exists()) {
                let tasks = tasksSnapshot.val();
                this.tasks.forEach((task) => (tasks[task.id] = task));
                await set(ref(getDatabase(), "anabo/tasks"), tasks);
                this.init();
            }
        },
        newTask(month: string) {
            let task = new Task();
            task.id = this.getNewTaskId();
            task.month = month;
            this.tasks.push(task);
        },
        async removeTask(taskId: string) {
            await remove(ref(getDatabase(), "anabo/tasks/" + taskId));
            await this.init();
        },
        getNewHelperId() {
            return (
                +this.helpers.reduce(function (prev, current) {
                    return +prev.id > +current.id ? prev : current;
                }).id + 1
            ).toString();
        },
        getNewTaskId() {
            return (
                +this.tasks.reduce(function (prev, current) {
                    return +prev.id > +current.id ? prev : current;
                }).id + 1
            ).toString();
        },
    },

    getters: {
        areas: (state) => state.information.areas,
        helpers: (state) => state.information.helpers,
        curator: (state) => state.information.curator,
        tasks: (state) => state.information.tasks,
    },
});
