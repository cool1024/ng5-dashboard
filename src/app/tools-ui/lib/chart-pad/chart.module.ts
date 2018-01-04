import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from './base-chart.directive';
import { LineChartDirective } from './line-chart.directive';
import { BarChartDirective } from './bar-chart.directive';
import { PieChartDirective } from './pie-chart.directive';
import { RadarChartDirective } from './radar-chart.directive';
declare const window: any;

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BaseChartDirective,
        LineChartDirective,
        BarChartDirective,
        PieChartDirective,
        RadarChartDirective,
    ],
    exports: [
        CommonModule,
        BaseChartDirective,
        LineChartDirective,
        BarChartDirective,
        PieChartDirective,
        RadarChartDirective,
    ]
})
export class ChartModule {
    constructor() {
        window.Chart.defaults.global.plugins = {
            display: false,
        };
    }
}
