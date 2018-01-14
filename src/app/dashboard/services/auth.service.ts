import { Injectable } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Breadcrumbs, Breadcrumb } from './../classes/breadcrumb.class';
import { AppConfig } from '../../config/app.config';
import { StorageService } from './storage.service';
import { RequestService } from './request.service';
import { ApiData } from '../classes/api.class';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { GlobalValueService } from './global-value.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    private authErrorUrl = AppConfig.authErrorUrl;

    private user: { [key: string]: string } = {};

    constructor(
        private storageService: StorageService,
        private request: RequestService,
        private router: Router,
        private global: GlobalValueService) { }

    get loginState(): boolean {
        return <boolean>this.global.values.loginState;
    }

    set loginState(value: boolean) {
        this.global.setValue('loginState', value);
    }

    setOut() {
        this.loginState = false;
    }

    setIn() {
        this.loginState = true;
    }

    get isLoggedIn(): boolean {
        return this.loginState;
    }

    checkLogin(): Observable<boolean> | boolean {

        return this.loginState || this.checkToken();
    }

    checkToken(): Observable<boolean> | boolean {
        if (this.storageService.empty(AppConfig.tokenParams)) {
            this.global.setValue('checkStatus', true);
            this.router.navigateByUrl('/login');
            return false;
        } else {
            return this.request.withoutHeader().post(AppConfig.tokenCheckUrl, this.getToken(), false).map<ApiData, boolean>(res => {
                if (res.result !== true) {
                    this.router.navigateByUrl('/login');
                } else {
                    this.setIn();
                    this.user = res.datas;
                }
                this.global.setValue('checkStatus', true);
                return res.result;
            });
        }
    }

    reCheckLogin(): Observable<boolean> {
        const check = this.checkToken();
        if (typeof check === 'boolean') {
            return Observable.of(check);
        } else {
            return check;
        }
    }

    saveToken(params: { [key: string]: string }) {
        const tokenParams: { [key: string]: string } = {};
        AppConfig.tokenParams.forEach(key => {
            tokenParams[key] = params[key] || '';
        });
        this.storageService.sets(tokenParams);
    }

    getToken(): { [key: string]: string } {
        return this.storageService.gets(AppConfig.tokenParams);
    }

    // 获取当前用户信息
    userInfo(): { [key: string]: string } {
        return this.user;
    }

    // 获取当前用户的菜单简略信息
    menuUserInfo(): [string, string, string] {
        if (this.loginState === false) {
            return <[string, string, string]>AppConfig.menuUserEmpty;
        }
        return [
            this.user[AppConfig.menuUserParams[0]] || AppConfig.menuUserEmpty[0],
            this.user[AppConfig.menuUserParams[1]] || AppConfig.menuUserEmpty[1],
            this.user[AppConfig.menuUserParams[2]] || AppConfig.menuUserEmpty[2]
        ];
        // if (this.authService.isLoggedIn === false) {
        //     return AppConfig.menuUserDefault;
        // }
        // const user = [];
        // AppConfig.menuUserParams.forEach((param, index) => {
        //     user.push(this.authService.userInfo[param] || AppConfig.menuUserEmpty[index]);
        // });
    }
}
