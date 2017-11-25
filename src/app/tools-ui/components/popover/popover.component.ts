import { Component, OnInit, ElementRef } from '@angular/core';
import { HoverComponent } from './../../interfaces/hover-component.interface';
import { ToggleComponent } from './../../interfaces/toggle-component.interface';

@Component({
  selector: 'ts-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  exportAs: 'tsPopover'
})
export class PopoverComponent implements OnInit, HoverComponent, ToggleComponent {

  hoverDom: HTMLElement;

  popoverStyle = { transform: 'translate3d(0px, 0px, 0px)' };

  show = false;

  constructor() { }

  ngOnInit() {
  }

  bind(elementRef: ElementRef) {
    this.hoverDom = elementRef.nativeElement;
    const width = this.hoverDom.clientWidth;
    const height = this.hoverDom.clientHeight;
    const left = this.hoverDom.offsetLeft;
    const top = this.hoverDom.offsetTop;
    this.popoverStyle.transform = `translate3d(${width + left}px, ${top - height / 2}px, 0px)`;
  }

  hover() {
    this.show = true;
  }

  leave() {
    // this.show = false;
  }

  toggle() {
    this.show = !this.show;
  }
}
