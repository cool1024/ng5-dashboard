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
import { TSToastService, TSConfirmService } from '../../../tools-ui';
import { MenuService } from '../../services/menu.service';
import { Menu } from './../../interfaces/menu.interface';
import { Theme } from '../../../config/theme.config';

@Component({
    selector: 'dashboard-head',
    templateUrl: './head.component.html',
    styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

    // 头部样式配置参数
    headConfigs = Theme.header;

    // 关键词
    keyword = '';

    // 是否查询面板
    showSearchPad = false;

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

    // 获取菜单列表
    get menus(): Menu[] {
        return this.keyword ? this.menuService.menus.filter(menu => menu.title.indexOf(this.keyword) >= 0) : this.menuService.menus;
    }

    constructor(
        private router: Router,
        private breadcrumbService: BreadcrumbService,
        private menuService: MenuService,
        private authService: AuthService,
        private request: RequestService,
        private storage: StorageService,
        private toast: TSToastService,
        private confirm: TSConfirmService,
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            this.parseRoute(this.router.routerState.snapshot.root);
        });

    }

    // 导航
    navigate(url: string) {
        this.router.navigateByUrl(url);
        this.showSearchPad = false;
    }

    // 退出登入
    signOut() {
        this.confirm.danger('退出登入', '您确定要退出系统？', { okTitle: '确认退出', cancelTitle: '取消' }).next(() => {
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
