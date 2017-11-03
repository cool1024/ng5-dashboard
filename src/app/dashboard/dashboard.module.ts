import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeadComponent } from './head/head.component';
import { MenuComponent } from './menu/menu.component';
import { ContentDirective } from './content/content.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeadComponent,
    MenuComponent,
    ContentDirective,
  ],
  exports: [
    HeadComponent,
    MenuComponent,
    ContentDirective,
  ]
})
export class DashboardModule { }
