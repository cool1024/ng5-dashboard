import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: 'dashboard-content',
})
export class ContentDirective {

  constructor(private elementRef: ElementRef) {
    const dom = this.elementRef.nativeElement;
    dom.style.paddingLeft = '220px';
    dom.style.paddingTop = '60px';
    dom.style.display = 'block';
    dom.style.minWidth = '600px';
  }

}
