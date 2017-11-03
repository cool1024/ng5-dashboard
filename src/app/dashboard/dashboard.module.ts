import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head/head.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeadComponent,
    MenuComponent,
  ],
  exports: [
    HeadComponent,
    MenuComponent,
  ]
})
export class DashboardModule { }
