import { Directive, HostListener, Input, ElementRef, AfterViewInit } from '@angular/core';
import { HoverComponent } from './../interfaces/hover-component.interface';

@Directive({
  selector: '[ts-dom-hover]',
  exportAs: 'tsDomHover',
})
export class HoverDirective implements AfterViewInit {

  @Input() target: HoverComponent;

  hasBind = false;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.bind();
  }

  @HostListener('mouseover') mouseover() {
    this.target.hover();
  }

  @HostListener('mouseleave') mouseleave() {
    this.target.leave();
  }

  private bind() {
    if (this.hasBind || !this.target) {
      return;
    }
    this.hasBind = true;
    this.target.bind(this.elementRef);
  }
}
