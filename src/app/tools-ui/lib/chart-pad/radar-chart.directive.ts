
import { Directive, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DefaultChartColor } from './chart.config';
declare const window: any;

@Directive({
    selector: 'canvas[radar-chart]',
    exportAs: 'radarChart',
})

export class RadarChartDirective implements AfterViewInit, OnChanges {

    private canvas: HTMLCanvasElement;
    private chart: any;
    private type: string;
    private ready: boolean;
    @Input() datas = new Array<number[]>();
    @Input() colors = new Array<{
        backgroundColor: string,
        borderColor: string,
        borderWidth: number,
    }>();
    @Input() labels = new Array<string>();
    @Input() xlabels = new Array<string>();
    @Input() options: { [key: string]: any };

    constructor(private elementRef: ElementRef) {
        DefaultChartColor.backgroundColor.forEach((e, i) => {
            this.colors.push({
                backgroundColor: e,
                borderColor: DefaultChartColor.borderColor[i],
                borderWidth: DefaultChartColor.borderWidth,
            });
        });
        this.type = 'radar';
        this.ready = false;
        this.options = {};
    }
    ngOnChanges(change: SimpleChanges) {
        this.updateChart();
    }
    ngAfterViewInit() {
        this.canvas = this.elementRef.nativeElement;
        this.chart = new window.Chart(this.canvas, {
            type: this.type,
            data: {
                labels: this.xlabels,
            }
        });
        this.ready = true;
        this.updateChart();
    }
    updateChart() {
        if (this.ready) {
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
