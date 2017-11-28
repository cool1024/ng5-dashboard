import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { BreadcrumbService } from './../../dashboard/services/breadcrumb.service';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';

const routes: Routes = [
  { path: 'menu', component: MenuManagerComponent, data: { breadcrumbs: new Breadcrumbs([['菜单管理', 'bars']]) } },
  // { path: 'collapse', component: CollapseComponent, data: { breadcrumbs: new Breadcrumbs([['面板切换', 'table'], ['collapse折叠', 'tablet']]) } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SystemRoutingModule {
  constructor(breadcrumbService: BreadcrumbService) {
    breadcrumbService.append('system', routes);
  }
}
