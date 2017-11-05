import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeadComponent } from './components/head/head.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentDirective } from './components/content/content.directive';

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
