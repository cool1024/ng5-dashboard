import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './dashboard/dashboard.module';
import { TSToastModule, TSSpinnerModule } from './tools-ui';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TSSpinnerModule,
    DashboardModule.forRoot(),
    TSToastModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
