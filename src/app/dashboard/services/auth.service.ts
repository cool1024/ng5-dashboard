import { Injectable } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { Breadcrumbs, Breadcrumb } from './../classes/breadcrumb.class';
import { AppConfig } from '../../config/app.config';
import { StorageService } from './storage.service';
import { RequestService } from './request.service';
import { ApiData } from '../classes/api.class';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService {

    private loginState = true;

    private authErrorUrl = '/401';

    private user: { [key: string]: string } = {};

    constructor(private storageService: StorageService, private request: RequestService, private router: Router) { }

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
        if (this.loginState !== true) {
            this.router.navigateByUrl(this.authErrorUrl);
        }
        return this.loginState || this.checkToken();
    }

    checkToken(): Observable<boolean> | boolean {
        return this.storageService.empty(AppConfig.tokenParams) ?
            false : this.request.withoutHeader().post(AppConfig.tokenCheckUrl, this.getToken()).map<ApiData, boolean>(res => {
                if (res.result !== true) {
                    this.router.navigateByUrl(this.authErrorUrl);
                }
                return res.result;
            });
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
    }
}
