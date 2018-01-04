
import { Directive, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DefaultChartColor } from './chart.config';
declare const window: any;

@Directive({
    selector: 'canvas[pie-chart]',
    exportAs: 'pieChart',
})

export class PieChartDirective implements AfterViewInit, OnChanges {

    private canvas: HTMLCanvasElement;
    private chart: any;
    private type: string;
    private ready: boolean;
    @Input() datas = new Array<number[]>();
    @Input() colors: {
        backgroundColor: string[],
        borderColor: string[],
        borderWidth: number,
    };
    @Input() xlabels = new Array<string>();
    @Input() options: { [key: string]: any };

    constructor(private elementRef: ElementRef) {
        this.type = 'pie';
        this.ready = false;
        this.colors = DefaultChartColor;
        this.options = {};
    }

    ngOnChanges(change: SimpleChanges) {
        this.updateChart();
    }

    ngAfterViewInit() {
        this.canvas = this.elementRef.nativeElement;
        this.chart = new window.Chart(this.canvas, { type: this.type });
        this.ready = true;
        this.updateChart();
    }

    updateChart() {
        if (this.ready) {
            const datasets = [];
            this.datas.forEach((data, i) => {
                datasets.push({
                    data: this.datas[i],
                    backgroundColor: this.colors.backgroundColor,
                    borderColor: this.colors.borderColor,
                    borderWidth: this.colors.borderWidth,
                });
            });
            this.chart.data = {
                labels: this.xlabels,
                datasets: datasets,
                options: this.options,
            };
            this.chart.update();
        }
    }
    toBase64Image(): string {
        return this.ready ? this.chart.toBase64Image() : '';
    }
}
