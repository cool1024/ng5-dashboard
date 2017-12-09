import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { BreadcrumbService } from './../../services/breadcrumb.service';
import { AuthService } from './../../services/auth.service';
import { Breadcrumb } from './../../classes/breadcrumb.class';
import { Observable } from 'rxjs/Observable';

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

    constructor(private router: Router, private breadcrumbService: BreadcrumbService, private authService: AuthService) { }

    // 登入状态
    get loginStatus(): boolean {
        return this.authService.isLoggedIn;
    }

    // 当前的面包屑导航
    get breadcrumbs(): Breadcrumb[] {
        return this.breadcrumbService.breadcrumbs;
    }

    ngOnInit() {
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            event = <NavigationEnd>event;
            this.parseRoute(this.router.routerState.snapshot.root);
        });

    }

    // 退出登入
    signOut() {
        this.authService.setOut();
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
