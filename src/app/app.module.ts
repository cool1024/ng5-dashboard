import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core.module';

import { DashboardModule } from './dashboard/dashboard.module';
import { SortablejsModule } from 'angular-sortablejs';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    DashboardModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
