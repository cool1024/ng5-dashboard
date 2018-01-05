import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { BreadcrumbService } from './../../services/breadcrumb.service';
import { AuthService } from './../../services/auth.service';
import { Breadcrumb } from './../../classes/breadcrumb.class';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../services/request.service';
import { AppConfig } from '../../../config/app.config';
import { StorageService } from '../../services/storage.service';
import { ToastService } from '../../../tools-ui/components/toast/toast.service';

@Component({
    selector: 'dashboard-head',
    templateUrl: './head.component.html',
    styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

    // 头部样式配置参数
    headConfigs = {
        zIndex: 1040,
        titleWidth: '170px',
    };

    // 是否查询面板
    showSearchPad = false;

    // 查询结果
    searchResults = new Array<any>();

    // 登出接口url
    outUrl = AppConfig.outUrl;

    // 令牌参数
    tokenParams = AppConfig.tokenSave;

    // 登入状态
    get loginStatus(): boolean {
        return this.authService.isLoggedIn;
    }

    // 当前的面包屑导航
    get breadcrumbs(): Breadcrumb[] {
        return this.breadcrumbService.breadcrumbs;
    }

    constructor(
        private router: Router,
        private breadcrumbService: BreadcrumbService,
        private authService: AuthService,
        private request: RequestService,
        private storage: StorageService,
        private toast: ToastService,
    ) { }



    ngOnInit() {
        this.router.events.subscribe(event => {
            this.parseRoute(this.router.routerState.snapshot.root);
        });

    }

    // 退出登入
    signOut() {
        this.request.withConfig({ url: '' }).url(this.outUrl).subscribe(res => {
            // 清空登入令牌
            for (const key in this.tokenParams) {
                if (this.tokenParams.hasOwnProperty(key)) {
                    this.storage.clean(this.tokenParams[key]);
                }
            }
            this.authService.setOut();
            this.router.navigateByUrl('/login');
            this.toast.info('提示消息', '成功退出账号～');
        });
    }

    // 解析路由
    parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data['breadcrumbs']) {
            let urlSegments: UrlSegment[] = [];
            node.pathFromRoot.forEach(routerState => {
                urlSegments = urlSegments.concat(routerState.url);
            });
            const url = urlSegments.map(urlSegment => {
                return urlSegment.path;
            }).join('/');
            this.breadcrumbService.set(node.data['breadcrumbs'].breadcrumbs);
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }

}
