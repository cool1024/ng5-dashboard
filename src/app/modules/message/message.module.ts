import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleComponent } from './pages/simple/simple.component';
import {
  TSToastModule,
  // TSConfirmModule,
  TSPopoverModule,
  TSHoverModule,
  TSToggleModule,
  TSStepModule,
  TSLoadingModule,
} from './../../tools-ui';

/*路由模块*/
import { MessageRoutingModule } from './message.routing';


@NgModule({
  imports: [
    TSToastModule,
    FormsModule,
    TSPopoverModule,
    MessageRoutingModule,
    TSHoverModule,
    TSToggleModule,
    TSStepModule,
    TSLoadingModule,
  ],
  declarations: [SimpleComponent]
})
export class MessageModule { }
