
import { Directive, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { LineChartColor } from './chart.config';
declare const window: any;

@Directive({
    selector: 'canvas[bar-chart]',
    exportAs: 'barChart',
})

export class BarChartDirective implements AfterViewInit, OnInit {

    private canvas: HTMLCanvasElement;
    private chart: any;
    private type = 'bar';
    @Input() datas = new Array<number[]>();
    @Input() colors = new Array<{
        backgroundColor: string,
        borderColor: string,
        borderWidth: number,
    }>();
    @Input() labels = new Array<string>();
    @Input() xlabels = new Array<string>();

    constructor(private elementRef: ElementRef) {
        LineChartColor.backgroundColor.forEach((e, i) => {
            this.colors.push({
                backgroundColor: e,
                borderColor: LineChartColor.borderColor[i],
                borderWidth: LineChartColor.borderWidth,
            });
        });
    }
    ngOnInit() { }
    ngAfterViewInit() {
        this.canvas = this.elementRef.nativeElement;
        const datasets = [];
        this.datas.forEach((data, i) => {
            datasets.push({
                label: this.labels[i],
                data: this.datas[i],
                backgroundColor: this.colors[i].backgroundColor,
                borderColor: this.colors[i].borderColor,
                borderWidth: this.colors[i].borderWidth,
            });
        });
        this.chart = new window.Chart(this.canvas, {
            type: this.type,
            data: {
                labels: this.xlabels,
                datasets: datasets
            }
        });

    }
}
