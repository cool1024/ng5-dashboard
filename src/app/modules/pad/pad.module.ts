import { NgModule } from '@angular/core';
import { PadRoutingModule } from './pad.routing';
import { TSTabModule } from './../../tools-ui';
import { TabComponent } from './pages/tab/tab.component';

@NgModule({
  imports: [
    TSTabModule,
    PadRoutingModule,
  ],
  declarations: [TabComponent]
})
export class PadModule { }
