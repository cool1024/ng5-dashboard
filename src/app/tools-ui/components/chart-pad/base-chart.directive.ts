
import { Directive, ElementRef, AfterViewInit, OnInit, Input } from '@angular/core';
declare const window: any;

@Directive({
    selector: 'canvas[base-chart]',
    exportAs: 'baseChart',
})

export class BaseChartDirective implements AfterViewInit, OnInit {

    @Input() type: string;
    @Input() data: { [key: string]: any };
    @Input() options: { [key: string]: any };

    canvas: HTMLCanvasElement;
    chart: any;

    constructor(private elementRef: ElementRef) { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.canvas = this.elementRef.nativeElement;
        this.chart = new window.Chart(this.canvas, {
            type: this.type || 'bar',
            data: this.data,
            options: this.options,
        });
    }
}
