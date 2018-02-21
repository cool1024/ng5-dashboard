import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { AppConfig } from './../../../config/app.config';
import { LoginPageConfig } from './../../../config/login-page.config';
import { RequestService } from '../../services/request.service';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'dashboard-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    // 登入跳转页面
    homePageUrl = AppConfig.loginGoPage;

    // 登入参数
    loginParams = ['', ''];

    // 登入参数键名
    loginParamKeys = AppConfig.loginParams;

    // 附加默认参数
    defaultParams = AppConfig.defaultParams;

    // 登入地址
    loginUrl = AppConfig.loginUrl;

    // 令牌参数
    tokenParams = AppConfig.tokenSave;

    //  界面配置参数
    loginConfigs = LoginPageConfig;

    constructor(
        private authService: AuthService,
        private router: Router,
        private request: RequestService,
        private storageService: StorageService) {
    }

    // 登入方法
    login() {

        // 获取登入参数
        const params: any = {};
        params[this.loginParamKeys[0]] = this.loginParams[0];
        params[this.loginParamKeys[1]] = this.loginParams[1];
        for (const key in this.defaultParams) {
            if (this.defaultParams.hasOwnProperty(key)) {
                params[key] = this.defaultParams[key];
            }
        }

        // 发送登入请求
        this.request.withConfig({ url: '' })
            // .openSafeParams(['account', 'password'])
            .post(this.loginUrl, params)
            .subscribe(res => {
                // 保存登入令牌
                for (const key in this.tokenParams) {
                    if (this.tokenParams.hasOwnProperty(key)) {
                        this.storageService.set(this.tokenParams[key], res.datas[key] || '');
                    }
                }
                this.authService.reCheckLogin().subscribe();
                this.authService.setIn();
                this.router.navigateByUrl(this.homePageUrl);
            });
    }
}
