import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './dashboard/dashboard.module';
import { TSToastModule, TSSpinnerModule, TSMapModule } from './tools-ui';
import { AppComponent } from './app.component';

/*富文本编辑器，如不使用请注释*/
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


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
    TSMapModule.forRoot('bea16ad29a10b04e05e0624362d504dc'),

    /*富文本编辑器，如不使用请注释*/
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
