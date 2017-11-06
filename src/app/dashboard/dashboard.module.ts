import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardRoutingModule } from './dashboard.routing';

import { HeadComponent } from './components/head/head.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentDirective } from './components/content/content.directive';
import { LoginComponent } from './components/login/login.component';

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
    LoginComponent,
    ContentDirective,
    ErrorComponent,
    HomeComponent,
  ],
  exports: [
    HeadComponent,
    MenuComponent,
    LoginComponent,
    ContentDirective,
  ]
})
export class DashboardModule { }
