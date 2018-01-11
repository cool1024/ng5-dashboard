import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'angular-sortablejs';
import {
  TSPaginationModule,
  TSLoadingModule,
  TSDatePickerModule,
  TSToggleModule,
  TSSelectModule,
  // TSConfirmModule,
  TSModalModule,
  TSSwitchModule,
} from './../../tools-ui';
import { SystemRoutingModule } from './system.routing';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';
import { PermissionManagerComponent } from './pages/permission-manager/permission-manager.component';
import { RoleManagerComponent } from './pages/role-manager/role-manager.component';
import { AccountManagerComponent } from './pages/account-manager/account-manager.component';
import { AccountManagerModalComponent } from './pages/account-manager/account-manager.modal';
import { RoleManagerModalComponent } from './pages/role-manager/role-manager.modal';
import { PermissionManagerModalComponent } from './pages/permission-manager/permission-manager.modal';
import { PermissionModelModalComponent } from './pages/permission-manager/permission-model.modal';
import { MenuModelModalComponent } from './pages/menu-manager/menu-model.modal';
import { MenuMainModalComponent } from './pages/menu-manager/menu-main.modal';
import { MenuChildModalComponent } from './pages/menu-manager/menu-child.modal';

@NgModule({
  imports: [
    FormsModule,
    SortablejsModule,
    SystemRoutingModule,
    TSPaginationModule,
    TSLoadingModule,
    TSDatePickerModule,
    TSToggleModule,
    TSSelectModule,
    // TSConfirmModule,
    TSModalModule,
    TSSwitchModule,
  ],
  declarations: [
    MenuManagerComponent,
    PermissionManagerComponent,
    RoleManagerComponent,
    AccountManagerComponent,
    AccountManagerModalComponent,
    RoleManagerModalComponent,
    PermissionManagerModalComponent,
    PermissionModelModalComponent,
    MenuModelModalComponent,
    MenuMainModalComponent,
    MenuChildModalComponent,
  ],
  entryComponents: [
    AccountManagerModalComponent,
    RoleManagerModalComponent,
    PermissionManagerModalComponent,
    PermissionModelModalComponent,
    MenuModelModalComponent,
    MenuMainModalComponent,
    MenuChildModalComponent,
  ]
})
export class SystemModule { }
