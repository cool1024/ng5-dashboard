import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from './../components/chart-pad/base-chart.directive';
import { LineChartDirective } from './../components/chart-pad/line-chart.directive';
import { BarChartDirective } from './../components/chart-pad/bar-chart.directive';
import { PieChartDirective } from './../components/chart-pad/pie-chart.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BaseChartDirective,
    LineChartDirective,
    BarChartDirective,
    PieChartDirective,
  ],
  exports: [
    CommonModule,
    BaseChartDirective,
    LineChartDirective,
    BarChartDirective,
    PieChartDirective,
  ]
})
export class ChartModule { }
