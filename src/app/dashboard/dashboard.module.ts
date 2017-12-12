import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from './dashboard.routing';

import { BreadcrumbService } from './services/breadcrumb.service';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { StorageService } from './services/storage.service';
import { GuardService } from './services/guard.service';

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
      BrowserAnimationsModule,
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
      CommonModule,
      BrowserAnimationsModule,
      HeadComponent,
      MenuComponent,
      LoginComponent,
      ContentDirective,
   ]
})
export class DashboardModule {
   public static forRoot(): ModuleWithProviders {
      return {
         ngModule: DashboardModule,
         providers: [
            AuthService,
            BreadcrumbService,
            RequestService,
            StorageService,
            GuardService,
         ]
      };
   }
}
