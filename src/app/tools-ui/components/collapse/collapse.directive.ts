import { Directive, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[ts-collapse]',
  exportAs: 'tsCollapse',
})
export class CollapseDirective implements AfterViewInit {

  @Input() open = false;

  @Output() stateChange = new EventEmitter<boolean>();

  private pad: HTMLElement;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.pad = this.elementRef.nativeElement;
    this.pad.style.transition = 'height .35s ease';
    this.pad.style.overflow += 'hidden';
    this.open ? this.collapseOpen() : this.collapseClose();
  }

  collapseClose() {
    this.open = false;
    this.pad.style.height = '0px';
    this.stateChange.emit(this.open);
  }

  collapseOpen() {
    this.open = true;
    this.pad.style.height = '';
    this.pad.style.visibility = 'hidden';
    const height = this.pad.clientHeight;
    this.pad.style.height = '0px';
    this.pad.style.visibility = '';
    setTimeout(() => { this.pad.style.height = height + 'px'; });
    this.stateChange.emit(this.open);
  }

  triggle() {
    this.open ? this.collapseClose() : this.collapseOpen();
  }
}
