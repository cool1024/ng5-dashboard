import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { HoverComponent } from './../../interfaces/hover-component.interface';
import { ToggleComponent } from './../../interfaces/toggle-component.interface';

@Component({
  selector: 'ts-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  exportAs: 'tsPopover'
})
export class PopoverComponent implements OnInit, HoverComponent, ToggleComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() maxWidth: string;
  @Input() position: string;
  @Input() headerClass: string;
  @Input() bodyClass: string;

  @ViewChild('popover') popover: ElementRef;

  hoverDom: HTMLElement;

  popoverStyle = { transform: 'translate(0px, 0px)', maxWidth: '200px' };
  arrowStyle: { [key: string]: string } = {};
  show = false;

  constructor() {
    this.title = '';
    this.message = 'Popover message ...';
    this.maxWidth = '200px';
    this.position = 'right';
    this.headerClass = '';
    this.bodyClass = '';
  }

  ngOnInit() {
    this.popoverStyle.maxWidth = this.maxWidth;
  }

  bind(elementRef: ElementRef) {
    this.hoverDom = elementRef.nativeElement;
  }

  autoPosition() {
    const width = this.hoverDom.clientWidth;
    const height = this.hoverDom.clientHeight;
    const left = this.hoverDom.offsetLeft;
    const top = this.hoverDom.offsetTop;
    const offset = this.title ? 45 : 27;
    setTimeout(() => {
      const popover: HTMLElement = this.popover.nativeElement;

      if (this.position === 'left') {
        this.popoverStyle.transform = `translate(${left - popover.clientWidth - 13}px, ${top + height / 2 - offset}px)`;
        this.arrowStyle = { top: this.title ? '45px' : '27px' };
      } else if (this.position === 'right') {
        this.popoverStyle.transform = `translate(${width + left}px, ${top + height / 2 - offset}px)`;
        this.arrowStyle = { top: this.title ? '45px' : '27px' };
      } else if (this.position === 'top') {
        this.popoverStyle.transform = `translate(${left - width / 2}px, ${-8}px)`;
        this.arrowStyle = { left: popover.clientWidth / 2 + 'px' };
      } else if (this.position === 'bottom') {
        this.popoverStyle.transform = `translate(${left - width / 2}px, ${top + height / 2 + 14}px)`;
        this.arrowStyle = { left: popover.clientWidth / 2 + 'px' };
      } else {
        console.error('popover : error position ' + this.position);
      }
    });
  }

  hover() {
    this.show = true;
    this.autoPosition();
  }

  leave() {
    this.show = false;
  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.autoPosition();
    }
  }
}
