import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { GoodsInfoComponent } from './pages/goods-info/goods-info.component';
import { GoodsListComponent } from './pages/goods-list/goods-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: GoodsListComponent,
    data: { breadcrumbs: new Breadcrumbs([['商品列表', 'list-alt']]) },
    children: [
      {
        path: 'info/:id',
        component: GoodsInfoComponent,
        data: { breadcrumbs: new Breadcrumbs([['商品列表', 'list-alt', '/goods/list'], ['商品详情', 'info']]) },
      },
      {
        path: 'info',
        component: GoodsInfoComponent,
        data: { breadcrumbs: new Breadcrumbs([['商品列表', 'list-alt', '/goods/list'], ['添加商品', 'plus']]) },
      }
    ]
  },
  // { path: 'info', component: GoodsInfoComponent, data: { breadcrumbs: new Breadcrumbs([['商品列表', 'list-alt'], ['添加/编辑', 'tablet']]) } },
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
