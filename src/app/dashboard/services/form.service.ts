import { Injectable } from '@angular/core';

@Injectable()
export class FormService {

    constructor() { }

    // 浅拷贝一个JSON数据
    jsonCopy(json: { [key: string]: any }): { [key: string]: any } {
        const copy: { [key: string]: any } = {};
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                copy[key] = json[key];
            }
        }
        return copy;
    }

    // 获取对象数组中的id
    getIds(objs: any[]): number[] {
        const ids = [];
        objs.forEach(obj => {
            ids.push(obj.id);
        });
        return ids;
    }
}
