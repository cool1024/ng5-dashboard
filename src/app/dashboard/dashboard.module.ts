import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing';

import { HeadComponent } from './components/head/head.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentDirective } from './components/content/content.directive';

import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
  ],
  declarations: [
    HeadComponent,
    MenuComponent,
    ContentDirective,
    ErrorComponent,
    HomeComponent,
  ],
  exports: [
    HeadComponent,
    MenuComponent,
    ContentDirective,
  ]
})
export class DashboardModule { }
