import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from './../components/chart-pad/base-chart.directive';
import { LineChartDirective } from './../components/chart-pad/line-chart.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BaseChartDirective,
    LineChartDirective,
  ],
  exports: [
    CommonModule,
    BaseChartDirective,
    LineChartDirective,
  ]
})
export class ChartModule { }
