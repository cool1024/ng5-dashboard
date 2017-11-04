import { Component, ElementRef, Directive, Input } from '@angular/core';

@Directive({
    selector: `img[ts-loading]`,
    host: {
        '(error)': 'setError()',
        '(load)': 'setLoad()'
    },
})
export class ImgLoadingDirective {

    @Input() default = '';

    lock = false;

    constructor(private elementRef: ElementRef) {
        this.elementRef.nativeElement.style.backgroundColor = '#ccc';
    }

    setLoad() {
        this.elementRef.nativeElement.style.backgroundColor = '';
    }

    setError() {
        if (this.lock === true) { return; }
        this.lock = true;
        this.elementRef.nativeElement.src = this.default;
    }
}
