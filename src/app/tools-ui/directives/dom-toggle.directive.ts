import { Directive, HostListener, Input, ElementRef, AfterViewInit } from '@angular/core';
import { ToggleComponent } from './../interfaces/toggle-component.interface';

@Directive({
    selector: '[ts-dom-toggle]',
    exportAs: 'tsDomToggle',
})
export class DomToggleDirective implements AfterViewInit {

    @Input() target: ToggleComponent;
    @Input() useHover: boolean;

    hasBind = false;

    constructor(private elementRef: ElementRef) {
        this.useHover = false;
    }

    ngAfterViewInit() {
        this.bind();
    }

    @HostListener('click') onclick() {
        this.target.toggle();
    }

    @HostListener('hover') onhover() {
        if (this.useHover) {
            this.target.toggle();
        }
    }

    private bind() {
        if (this.hasBind || !this.target) {
            return;
        }
        this.hasBind = true;
        this.target.bind(this.elementRef);
    }
}
