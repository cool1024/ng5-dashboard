import { Directive, HostListener, Input, ElementRef, AfterViewInit } from '@angular/core';
import { ToggleComponent } from './../interfaces/toggle-component.interface';

@Directive({
  selector: '[ts-dom-toggle]',
  exportAs: 'tsDomToggle',
})
export class DomToggleDirective implements AfterViewInit {

  @Input() target: ToggleComponent;

  hasBind = false;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.bind();
  }

  @HostListener('click') onclick() {
    this.target.toggle();
  }

  private bind() {
    if (this.hasBind || !this.target) {
      return;
    }
    this.hasBind = true;
    this.target.bind(this.elementRef);
  }
}
