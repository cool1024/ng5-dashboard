
export interface Menu {
    icon: string;
    id: number;
    mid: number;
    parentid: number;
    title: string;
    url: string;
}

export interface MenuGroup {
    parentid: number;
    groups: Menu[];
}
