import { Directive, HostListener, Input, EventEmitter, Output, ElementRef, AfterViewInit } from '@angular/core';
import { HoverComponent } from './../interfaces/hover-component.interface';

@Directive({
  selector: '[ts-dom-hover]',
  exportAs: 'tsDomHover',
})
export class HoverDirective implements AfterViewInit {

  @Input() target: HoverComponent;
  @Output() hover = new EventEmitter<void>();
  @Output() leave = new EventEmitter<void>();

  hasBind = false;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.bind();
  }

  @HostListener('mouseover') mouseover() {
    this.target.hover();
    this.hover.emit();
  }

  @HostListener('mouseleave') mouseleave() {
    this.target.leave();
    this.leave.emit();
  }

  private bind() {
    if (this.hasBind || !this.target) {
      return;
    }
    this.hasBind = true;
    this.target.bind(this.elementRef);
  }
}
