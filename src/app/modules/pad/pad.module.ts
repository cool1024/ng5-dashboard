import { NgModule } from '@angular/core';
import { PadRoutingModule } from './pad.routing';
import { TSTabModule, TSCollapseModule } from './../../tools-ui';
import { TabComponent } from './pages/tab/tab.component';
import { CollapseComponent } from './pages/collapse/collapse.component';

@NgModule({
  imports: [
    TSTabModule,
    TSCollapseModule,
    PadRoutingModule,
  ],
  declarations: [TabComponent, CollapseComponent]
})
export class PadModule { }
