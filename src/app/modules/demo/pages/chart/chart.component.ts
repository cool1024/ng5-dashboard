import { Component, ViewChild, OnInit } from '@angular/core';
import { FormService } from '../../../../dashboard/services/form.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
    templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit {

    @ViewChild('chart') bubbleChart: any;

    // 动态数据
    flashData = {
        labels: [],
        datasets: [{
            label: '测试数据',
            backgroundColor: 'rgba(255,0,0,0.5)',
            borderColor: 'rgba(255,0,0,1)',
            borderWidth: 1,
            data: []
        }],
    };

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

    // radar-chart 数据
    radarChartData = {
        xlabels: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
        labels: ['A公司', 'B公司'],
        datas: [[28, 48, 40, 19, 86, 27, 90], [65, 59, 80, 81, 56, 55, 40]]
    };

    // base-chart 数据
    baseChartData = {
        type: 'polarArea',
        data: {
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                ],
            }],
            labels: ['A公司', 'B公司', 'C公司']
        },
    };

    // bubble-chart 数据
    bubbleChartData = {
        data: {
            datasets: [
                {
                    label: 'A公司',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    data: [
                        { x: 1, y: 2, r: 3 },
                        { x: 4, y: 5, r: 6 },
                        { x: 7, y: 8, r: 9 },
                        { x: 10, y: 11, r: 12 },
                        { x: 13, y: 14, r: 15 }
                    ]
                },
                {
                    label: 'B公司',
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    data: [
                        { x: 7, y: 10, r: 6 },
                        { x: 2, y: 2, r: 2 },
                        { x: 3, y: 1, r: 9 },
                        { x: 5, y: 1, r: 9 }
                    ]
                },
                {
                    label: 'C公司',
                    backgroundColor: 'rgba(255, 206, 86, 0.5)',
                    data: [
                        { x: 7, y: 10, r: 6 },
                        { x: 2, y: 2, r: 2 },
                        { x: 3, y: 1, r: 9 },
                        { x: 5, y: 1, r: 9 }
                    ]
                }
            ]
        }
    };

    constructor(private form: FormService) { }

    // 随机变换一些数据
    randomData() {
        this.lineChartData.datas = [
            [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
            [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
        ];
        this.barChartData.datas = this.lineChartData.datas;
        this.pieChartData.datas = [this.barChartData.datas[0]];
        this.radarChartData.datas = this.barChartData.datas;
        this.baseChartData.data.datasets[0].data = [Math.random(), Math.random(), Math.random()];
        this.baseChartData.data = <{ datasets: any[], labels: string[] }>this.form.jsonCopy(this.baseChartData.data);
        this.bubbleChartData.data.datasets[0].data = [
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
        ];
        this.bubbleChartData.data.datasets[1].data = [
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
        ];
        this.bubbleChartData.data.datasets[2].data = [
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
            { x: Math.random(), y: Math.random(), r: Math.random() * 30 },
        ];
        this.bubbleChartData.data = <{ datasets: any[], labels: string[] }>this.form.jsonCopy(this.bubbleChartData.data);
    }

    // 保存图片快照
    toBase64Image() {
        console.log(this.bubbleChart.toBase64Image());
    }

    ngOnInit() {
        Observable.interval(3000).subscribe(res => {
            this.flashData.datasets[0].data.push(Math.random());
            this.flashData.labels.push(res.toString());
            if (this.flashData.labels.length > 100) {
                this.flashData.labels.shift();
                this.flashData.datasets[0].data.shift();
            }
            this.flashData = <any>this.form.jsonCopy(this.flashData);
        });
    }

}
