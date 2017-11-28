import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortablejsModule } from 'angular-sortablejs';
import { SystemRoutingModule } from './system.routing';
import { MenuManagerComponent } from './pages/menu-manager/menu-manager.component';

@NgModule({
  imports: [
    CommonModule,
    SystemRoutingModule,
    SortablejsModule,
  ],
  declarations: [MenuManagerComponent]
})
export class SystemModule { }
