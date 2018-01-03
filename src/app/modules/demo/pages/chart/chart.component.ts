import { Component } from '@angular/core';

@Component({
    templateUrl: './chart.component.html',
})
export class ChartComponent {

    constructor() { }

    // line-chart 数据
    lineChartData = {
        xlabels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        labels: ['A公司', 'B公司'],
        datas: [[28, 48, 40, 19, 86, 27, 90], [65, 59, 80, 81, 56, 55, 40]]
    };

    // bar-chart 数据
    barChartData = {
        xlabels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        labels: ['A公司', 'B公司'],
        datas: [[28, 48, 40, 19, 86, 27, 90], [65, 59, 80, 81, 56, 55, 40]]
    };

    // pie-chart 数据
    pieChartData = {
        xlabels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        datas: [[28, 48, 40, 19, 86, 27, 90]]
    };
}
