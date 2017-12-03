import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import { TSPaginationModule, TSLoadingModule, TSDatePickerModule, TSToggleModule } from './../../tools-ui';
import { SystemRoutingModule } from './system.routing';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';
import { PermissionManagerComponent } from './pages/permission-manager/permission-manager.component';
import { RoleManagerComponent } from './pages/role-manager/role-manager.component';
import { AccountManagerComponent } from './pages/account-manager/account-manager.component';

@NgModule({
  imports: [
    FormsModule,
    SortablejsModule,
    SystemRoutingModule,
    TSPaginationModule, TSLoadingModule, TSDatePickerModule, TSToggleModule
  ],
  declarations: [
    MenuManagerComponent,
    PermissionManagerComponent,
    RoleManagerComponent,
    AccountManagerComponent
  ]
})
export class SystemModule { }
