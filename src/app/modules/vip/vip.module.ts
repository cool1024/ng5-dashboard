import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

/*tools-ui*/
import {
    TSDropdownModule,
    TSPaginationModule,
    TSLoadingModule,
    TSSelectModule,
    TSModalModule,
    TSSpinnerModule,
    TSCheckboxModule,
    TSTableModule,
} from '../../tools-ui';

/*路由模块*/
import { VipRoutingModule } from './vip.routing';

/*页面组件*/
import { VipUsersComponent } from './pages/vip-users/vip-users.component';
import { VipUsersSmartComponent } from './pages/vip-users-smart/vip-users-smart.component';
import { VipUserInfoModalComponent } from './pages/vip-users/vip-user-info-modal.component';

@NgModule({
    imports: [
        FormsModule,
        VipRoutingModule,
        TSDropdownModule,
        TSPaginationModule,
        TSLoadingModule,
        TSSelectModule,
        TSModalModule,
        TSSpinnerModule,
        TSCheckboxModule,
        TSTableModule,
    ],
    declarations: [
        VipUsersComponent,
        VipUsersSmartComponent,
        VipUserInfoModalComponent,
    ],
    entryComponents: [
        VipUserInfoModalComponent,
    ]
})
export class VipModule { }
