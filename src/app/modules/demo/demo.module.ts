import { NgModule } from '@angular/core';

/*tool-ui*/
import { TSChartModule } from './../../tools-ui';

/*路由模块*/
import { DemoRoutingModule } from './demo.routing';

/*页面组件*/
import { ChartComponent } from './pages/chart/chart.component';

@NgModule({
  imports: [
    TSChartModule,
    DemoRoutingModule,
  ],
  declarations: [
    ChartComponent,
  ]
})
export class DemoModule { }
