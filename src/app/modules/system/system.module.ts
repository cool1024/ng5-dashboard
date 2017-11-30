import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import { SystemRoutingModule } from './system.routing';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';
import { PermissionManagerComponent } from './pages/permission-manager/permission-manager.component';

@NgModule({
  imports: [
    CommonModule,
    SortablejsModule,
    SystemRoutingModule,
  ],
  declarations: [
    MenuManagerComponent,
    PermissionManagerComponent
  ]
})
export class SystemModule { }
