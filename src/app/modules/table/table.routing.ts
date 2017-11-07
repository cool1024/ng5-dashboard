import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { SimpleComponent } from './pages/simple/simple.component';
import { BreadcrumbService } from './../../dashboard/services/breadcrumb.service';

const routes: Routes = [
  { path: 'simple', component: SimpleComponent, data: { breadcrumbs: new Breadcrumbs([['表格', 'table'], ['标准', 'tablet']]) } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TableRoutingModule {
  constructor(breadcrumbService: BreadcrumbService) {
    breadcrumbService.append('table', routes);
  }
}
