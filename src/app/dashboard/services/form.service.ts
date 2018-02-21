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


    // json转换为一维数组（去掉键名）
    jsonToArray(objs: { [key: string]: any }): any[] {
        const array = <any[]>[];
        for (const key in objs) {
            if (objs.hasOwnProperty(key)) {
                array.push(objs[key]);
            }
        }
        return array;
    }

    // 合并表单数据，如果参数字段相同，第二个参数会覆盖第一个参数内容(通常第一参数是模型数据，第二个是表单数据)
    combineFormDatas(baseParams: { [key: string]: any }, appendParams: { [key: string]: any }) {
        const cb: { [key: string]: any } = {};
        for (const key in baseParams) {
            if (baseParams.hasOwnProperty(key)) {
                cb[key] = baseParams[key];
            }
        }
        for (const key in appendParams) {
            if (appendParams.hasOwnProperty(key)) {
                cb[key] = appendParams[key];
            }
        }
        return cb;
    }

    // 获取对象数组中的id
    getIds(objs: any[]): number[] {
        const ids = [];
        objs.forEach(obj => {
            ids.push(obj.id);
        });
        return ids;
    }

    // 获取对象数组中的指定键值列表
    getAttrs<T>(objs: any[], attr: string): T[] {
        const attrs = [];
        objs.forEach(obj => {
            attrs.push(obj[attr]);
        });
        return attrs;
    }
}
