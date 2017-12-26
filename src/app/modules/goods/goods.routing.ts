import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { GoodsInfoComponent } from './pages/goods-info/goods-info.component';

const routes: Routes = [
  { path: 'info', component: GoodsInfoComponent, data: { breadcrumbs: new Breadcrumbs([['商品列表', 'list-alt'], ['添加/编辑', 'tablet']]) } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GoodsRoutingModule { }
