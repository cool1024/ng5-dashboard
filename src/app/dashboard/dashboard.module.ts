import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardRoutingModule } from './dashboard.routing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BreadcrumbService } from './services/breadcrumb.service';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';
import { RequestService } from './services/request.service';
import { StorageService } from './services/storage.service';
import { GuardService } from './services/guard.service';
import { DefaultGuardService } from './services/default-guard.service';
import { FormService } from './services/form.service';
import { GlobalValueService } from './services/global-value.service';
import { DefaultInterceptor } from './services/default-intercept.service';
import { SignInterceptor } from './services/sign-intercept.service';

import { HeadComponent } from './components/head/head.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentDirective } from './components/content/content.directive';
import { LoginComponent } from './components/login/login.component';

import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent as LoginPageComponent } from './pages/login/login.component';


@NgModule({
    imports: [
        FormsModule,
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
        LoginPageComponent,
    ],
    exports: [
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
                DefaultGuardService,
                FormService,
                GlobalValueService,
                MenuService,
                /*请求参数加密&加签名*/
                // {
                //     provide: HTTP_INTERCEPTORS,
                //     useClass: SignInterceptor,
                //     multi: true,
                // },
                /*响应错误拦截*/
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: DefaultInterceptor,
                    multi: true,
                },

            ]
        };
    }
}
