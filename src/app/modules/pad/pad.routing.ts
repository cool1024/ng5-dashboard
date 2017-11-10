import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { BreadcrumbService } from './../../dashboard/services/breadcrumb.service';
import { TabComponent } from './pages/tab/tab.component';

const routes: Routes = [
  { path: 'tab', component: TabComponent, data: { breadcrumbs: new Breadcrumbs([['面板切换', 'table'], ['tab切换', 'tablet']]) } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PadRoutingModule {
  constructor(breadcrumbService: BreadcrumbService) {
    breadcrumbService.append('table', routes);
  }
}