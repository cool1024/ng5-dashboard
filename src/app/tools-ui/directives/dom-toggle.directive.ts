import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { ToggleComponent } from './../interfaces/toggle-component.interface';

@Directive({
  selector: '[ts-dom-toggle]',
  exportAs: 'tsDomToggle',
})
export class DomToggleDirective {

  @Input() target: ToggleComponent;

  hasBind = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('click') onclick() {
    this.bind();
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
