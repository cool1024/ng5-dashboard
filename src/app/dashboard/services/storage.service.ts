import { Injectable } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { Breadcrumbs, Breadcrumb } from './../classes/breadcrumb.class';

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
    gets(...keys: string[]): { [key: string]: string } {
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

    // 批量获取本地存储
    get(key: string) {
        return localStorage.getItem(key) || '';
    }
}
