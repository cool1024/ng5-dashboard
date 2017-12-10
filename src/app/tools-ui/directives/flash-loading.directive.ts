import { Directive, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: `[ts-flash-loading]`,
  exportAs: 'tsFlash'
})
export class FlashLoadingDirective implements AfterViewInit {

  @Input() label: string;

  @Input() textClass: string;

  @Input() bgColor: string;

  private active = false;

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
    this.flash.className = `text-center ${this.textClass}`;
    this.flash.style.backgroundColor = this.bgColor;
    this.flash.style.height = dom.clientHeight + 'px';
    this.flash.style.width = dom.clientWidth + 'px';
    this.flash.style.lineHeight = dom.clientHeight + 'px';
    this.flash.style.position = 'absolute';
    this.flash.style.transform = `translate3d(0px, -${dom.clientHeight}px, 0px)`;
    this.flash.innerHTML = '<i class="fa fa-spinner fa-pulse"></i>Loading...';
    this.flash.style.display = this.active ? '' : 'none';
    this.flash.innerHTML = `<i class="fa fa-spinner fa-pulse"></i>${this.label}`;
  }

  ngAfterViewInit() {
    this.init();
  }

  loading() {
    this.active = true;
    this.init();
  }

  complete() {
    this.active = false;
    this.init();
  }

}
