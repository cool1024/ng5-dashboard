import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { SimpleComponent } from './pages/simple/simple.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  {
    path: 'simple',
    component: SimpleComponent,
    data: { breadcrumbs: new Breadcrumbs([['表格', 'table'], ['标准', 'tablet']]) },
    children: [
      {
        path: 'detail/:id',
        component: DetailComponent,
        data: { breadcrumbs: new Breadcrumbs([['表格', 'table', '/table/simple'], ['详情', 'info']]) },
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TableRoutingModule { }
