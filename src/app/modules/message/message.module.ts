import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleComponent } from './pages/simple/simple.component';
import { TSToastModule, TSConfirmModule, TSPopoverModule, TSHoverModule, TSToggleModule } from './../../tools-ui';

/*路由模块*/
import { MessageRoutingModule } from './message.routing';

@NgModule({
  imports: [
    TSToastModule,
    TSConfirmModule,
    TSPopoverModule,
    MessageRoutingModule,
    TSHoverModule,
    TSToggleModule,
  ],
  declarations: [SimpleComponent]
})
export class MessageModule { }
