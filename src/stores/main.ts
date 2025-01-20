import { defineStore } from "pinia";
import AnaboData, { Helper, Task } from "@/model/AnaboData";
import { createClient } from '@supabase/supabase-js'
import { type Database } from '../../supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// let makeConfig = (key: string) => {
//     const config: FirebaseOptions = {
//         databaseURL: `https://${key}-default-rtdb.europe-west1.firebasedatabase.app`,
//     };
//     return config;
// };

export const useMainStore = defineStore({
    id: "main",
    state: () => {
        return {
            // dbRef: undefined as unknown as DatabaseReference,
            information: new AnaboData(),
            isInited: false,
        };
    },
    actions: {
        // async dbInit(key: string) {
        //     console.log("store: dbInit()");
        //     const apps = getApps();
        //     const app = apps.find((app) => app.name == "[DEFAULT]");
        //     if (app) deleteApp(app);
        //     initializeApp(makeConfig(key));
        //     this.dbRef = ref(getDatabase());
        //     const availabilitySnapshot = await get(child(this.dbRef, "anabo"));
        //     if (availabilitySnapshot.exists()) {
        //         this.isInited = true;
        //         this.init();
        //         return "success";
        //     } else return "error";
        // },
        async init() {
            const areasResp = await supabase.from("areas").select("*")
            if (areasResp.data) this.information.areas = areasResp.data
            const curatorsResp = await supabase.from("curators").select()
            if (curatorsResp.data) this.information.curators = curatorsResp.data
            const helpersResp = await supabase.from("helpers").select()
            if (helpersResp.data) this.information.helpers = helpersResp.data
            const tasksResp = await supabase.from("tasks").select()
            if (tasksResp.data) this.information.tasks = tasksResp.data
            // console.log("store: init()");
            // const snapshot = await get(child(this.dbRef, "anabo"));
            // console.log("store: snapshot", snapshot);
            // if (snapshot.exists()) this.information = snapshot.val();
            // else console.warn("db empty");
            // return;
        },
        async saveHelpers(areaHelpers: Helper[]) {
            await supabase.from("helpers").upsert(areaHelpers)
            await this.init();
            // const helpersSnapshot = await supabase.from("helpers").()
            // get(
            //     child(this.dbRef, "anabo/helpers")
            // );
            // if (helpersSnapshot.exists()) {
            // let tempHelpers = helpersSnapshot.val();
            // areaHelpers.forEach((hlpr) => (tempHelpers[hlpr.id] = hlpr));
            // await set(ref(getDatabase(), "anabo/helpers"), tempHelpers);
            // this.init();
            // }
        },
        async saveNewHelper(helper: Helper) {
            await supabase.from("helpers").upsert(helper)

            // await set(dbref(db, 'anabo/helpers/' + helper.id), helper)
            await this.init()
        },
        async removeHelper(helperId: number) {
            const { data, error } = await supabase.from("helpers").delete().eq('id', helperId);

            if (error) {
                console.error('Error deleting helper:', error);
            }
            else {
                console.log('Helper deleted successfully:', data);
            }
            await this.init();
            // await remove(ref(getDatabase(), "anabo/helpers/" + helperId));
            // await this.init();
        },
        getMonthTasks(month: string) {
            return this.tasks.filter((x) => x.month == month);
        },
        async saveTasks() {
            await supabase.from("tasks").upsert(this.information.tasks)
            await this.init();
            // const tasksSnapshot = await get(child(this.dbRef, "anabo/tasks"));
            // if (tasksSnapshot.exists()) {
            //     let tasks = tasksSnapshot.val();
            //     this.tasks.forEach((task) => (tasks[task.id] = task));
            //     await set(ref(getDatabase(), "anabo/tasks"), tasks);
            //     this.init();
            // }
        },
        newTask(month: string) {
            let task = new Task();
            task.id = this.getNewTaskId();
            task.month = month;
            this.tasks.push(task);
        },
        async removeTask(taskId: number) {
            const { data, error } = await supabase.from("tasks").delete().eq('id', taskId);
            // await remove(ref(getDatabase(), "anabo/tasks/" + taskId));
            await this.init();
        },
        getNewHelperId() {
            // not expecting null
            return (
                +this.helpers.reduce(function (prev, current) {
                    return +prev.id > +current.id ? prev : current;
                }).id + 1
            );
        },
        getNewTaskId() {
            // not expecting null
            return (
                +this.tasks.reduce(function (prev, current) {
                    return +prev.id > +current.id ? prev : current;
                }).id + 1
            );
        },
    },

    getters: {
        areas: (state) => state.information.areas,
        helpers: (state) => state.information.helpers,
        curator: (state) => state.information.curators,
        tasks: (state) => state.information.tasks,
    },
});
