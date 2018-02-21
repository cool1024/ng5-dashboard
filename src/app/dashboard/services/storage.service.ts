import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    // 批量设置本地存储
    sets(datas: { [key: string]: string | number }) {
        for (const key in datas) {
            if (datas.hasOwnProperty(key)) {
                localStorage.setItem(key, datas['key'].toString());
            }
        }
    }

    // 批量获取本地存储
    gets(keys: string[]): { [key: string]: string } {
        const datas: { [key: string]: string } = {};
        keys.forEach(key => {
            datas[key] = localStorage.getItem(key) || '';
        });
        return datas;
    }

    // 设置本地存储
    set(key: string, value: string | number) {
        localStorage.setItem(key, value.toString());
    }

    // 获取本地存储
    get(key: string) {
        return localStorage.getItem(key) || '';
    }

    // 判断数据是否存在
    empty(keys: string[]) {
        for (let i = 0; i < keys.length; i++) {
            if (this.get(keys[i]) === '') {
                return true;
            }
        }
        return false;
    }

    // 清空指定参数列表
    cleans(keys: string[]) {
        keys.forEach(key => localStorage.removeItem(key));
    }

    // 清空指定参数
    clean(key: string) {
        localStorage.removeItem(key);
    }
}
