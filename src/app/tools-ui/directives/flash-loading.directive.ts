import { Directive, ElementRef, AfterViewInit, Input, OnDestroy } from '@angular/core';

@Directive({
    selector: `[ts-flash-loading]`,
    exportAs: 'tsFlash'
})
export class FlashLoadingDirective implements AfterViewInit, OnDestroy {

    @Input() label: string;

    @Input() textClass: string;

    @Input() bgColor: string;

    ticking = false;

    autoHandle: () => void;

    private flash: HTMLDivElement;

    constructor(private elementRef: ElementRef) {
        this.label = 'Loading...';
        this.textClass = 'text-dark';
        this.bgColor = 'rgba(255,255,255,.5)';
    }

    private init() {
        const dom = this.elementRef.nativeElement;
        if (this.flash === undefined || this.flash === null) {
            this.flash = document.createElement('div');
            dom.parentNode.appendChild(this.flash);
        }
        this.resize();
        this.flash.style.display = 'none';
    }

    ngAfterViewInit() {
        this.init();
        this.autoHandle = () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.resize();
                    this.ticking = false;
                });
            }
            this.ticking = true;
        };
        window.addEventListener('resize', this.autoHandle, false);
    }

    ngOnDestroy() {
        window.removeEventListener('resize', this.autoHandle);
    }

    loading() {
        this.init();
        this.flash.style.display = '';
    }

    complete() {
        this.flash.style.display = 'none';
    }

    resize() {
        const dom = this.elementRef.nativeElement;
        this.flash.className = `text-center ${this.textClass}`;
        this.flash.style.backgroundColor = this.bgColor;
        this.flash.style.height = dom.clientHeight + 'px';
        this.flash.style.width = dom.clientWidth + 'px';
        this.flash.style.lineHeight = dom.clientHeight + 'px';
        this.flash.style.position = 'absolute';
        this.flash.style.transform = `translate3d(0px, -${dom.clientHeight}px, 0px)`;
        this.flash.innerHTML = `<i class="fa fa-spinner fa-pulse"></i>${this.label}`;
    }
}
