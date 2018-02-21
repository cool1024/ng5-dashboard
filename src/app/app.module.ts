import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { DashboardModule } from './dashboard/dashboard.module';
import { TSToastModule, TSSpinnerModule, TSMapModule, TSToastService, TSConfirmModule } from './tools-ui';
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

        /*路由模块*/
        AppRoutingModule,

        /*ts-tools*/
        TSSpinnerModule,
        TSConfirmModule,
        TSToastModule.forRoot(),
        TSMapModule.forRoot('bea16ad29a10b04e05e0624362d504dc'),

        /*基础应用模块*/
        DashboardModule.forRoot(),

        /*富文本编辑器，如不使用请注释*/
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
