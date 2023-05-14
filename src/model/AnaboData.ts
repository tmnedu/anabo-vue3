export default class AnaboData {
    areas: Area[] = [];
    curator: Staff[] = [];
    helpers: Helper[] = [];
    tasks: Task[] = [];
}
export class Entity {
    id: string = "";
}
export class Area extends Entity {
    name: string = "";
    color: string = "";
}

export class Staff extends Entity {
    fio: string = "";
    areaId: string = "";
}
export class Helper extends Staff {
    completedTaskIds: string[] = [];
    schoolName: string = "";
}
export class Task extends Entity {
    month: string = "2023-01";
    title: string = "";
}