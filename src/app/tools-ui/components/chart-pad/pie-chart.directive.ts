
import { Directive, ViewChild, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
import { DefaultChartColor } from './chart.config';
declare const window: any;

@Directive({
    selector: 'canvas[pie-chart]',
    exportAs: 'pieChart',
})

export class PieChartDirective implements AfterViewInit, OnInit {

    private canvas: HTMLCanvasElement;
    private chart: any;
    private type = 'pie';
    @Input() datas = new Array<number[]>();
    @Input() colors: {
        backgroundColor: string[],
        borderColor: string[],
        borderWidth: number,
    };
    @Input() xlabels = new Array<string>();

    constructor(private elementRef: ElementRef) {
        this.colors = DefaultChartColor;
    }

    ngOnInit() { }
    ngAfterViewInit() {
        this.canvas = this.elementRef.nativeElement;
        const datasets = [];
        this.datas.forEach((data, i) => {
            datasets.push({
                data: this.datas[i],
                backgroundColor: this.colors.backgroundColor,
                borderColor: this.colors.borderColor,
                borderWidth: this.colors.borderWidth,
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
