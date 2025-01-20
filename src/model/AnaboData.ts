export default class AnaboData {
    areas: Area[] = [];
    curators: Staff[] = [];
    helpers: Helper[] = [];
    tasks: Task[] = [];
}
export interface Entity {
    id: number;
}
export class Area implements Entity {
    id: number = 0;
    name: string | null = "";
    color: string | null = "";
}

export class Task implements Entity {
    id: number = 0;
    month: string | undefined = "2023-01";
    title: string | null = "";
}
export class Staff implements Entity {
    id: number = 0;
    fio: string | null = "";
    areaId: number | null = null;
}
export class Helper extends Staff {
    completedTaskIds: number[] | null = [];
    schoolName: string | null = "";
}