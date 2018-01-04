
import { Directive, ElementRef, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
declare const window: any;

@Directive({
    selector: 'canvas[base-chart]',
    exportAs: 'baseChart',
})

export class BaseChartDirective implements AfterViewInit, OnChanges {

    @Input() data: { [key: string]: any };
    @Input() type: { [key: string]: any };
    @Input() options: { [key: string]: any };
    canvas: HTMLCanvasElement;
    chart: any;
    ready: boolean;
    constructor(private elementRef: ElementRef) {
        this.ready = false;
        this.options = {};
    }
    ngOnChanges(change: SimpleChanges) {
        this.updateChart();
    }
    ngAfterViewInit() {
        this.canvas = this.elementRef.nativeElement;
        this.chart = new window.Chart(this.canvas, { type: this.type, options: this.options });
        this.ready = true;
        this.updateChart();
    }
    updateChart() {
        if (this.ready) {
            this.chart.data = this.data;
            this.chart.update();
        }
    }
    toBase64Image(): string {
        return this.ready ? this.chart.toBase64Image() : '';
    }
}
