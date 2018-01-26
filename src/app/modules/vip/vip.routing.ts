import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Breadcrumbs } from './../../dashboard/classes/breadcrumb.class';
import { VipUsersComponent } from './pages/vip-users/vip-users.component';
import { VipUsersSmartComponent } from './pages/vip-users-smart/vip-users-smart.component';

const routes: Routes = [
  { path: 'list', component: VipUsersComponent, data: { breadcrumbs: new Breadcrumbs([['会员列表', 'address-card']]) } },
  { path: 'list-smart', component: VipUsersSmartComponent, data: { breadcrumbs: new Breadcrumbs([['会员列表-SMART', 'address-card']]) } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VipRoutingModule { }
