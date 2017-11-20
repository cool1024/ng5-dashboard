import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { BreadcrumbService } from './../../services/breadcrumb.service';
import { AuthService } from './../../services/auth.service';
import { Breadcrumb } from './../../classes/breadcrumb.class';

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

  // 当前的面包屑导航
  breadcrumbs: Breadcrumb[] = [];

  // 是否查询面板
  showSearchPad = false;

  // 查询结果
  searchResults = new Array<any>();

  constructor(private router: Router, private breadcrumbService: BreadcrumbService, private authService: AuthService) { }

  // 登入状态
  get loginStatus(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit() {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      event = <NavigationEnd>event;
      const activeBreadcrumb = this.breadcrumbService.get(event.url);
      this.breadcrumbs = activeBreadcrumb.breadcrumbs;
    });

  }

  // 退出登入
  signOut() {
    this.authService.setOut();
  }

}
