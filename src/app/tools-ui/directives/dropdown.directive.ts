import { Component, ElementRef, Directive, AfterViewInit, Input } from '@angular/core';

@Directive({
  selector: `[ts-dropdown]`,
  exportAs: 'tsDropdown'
})
export class DropdownDirective implements AfterViewInit {

  menusDom: HTMLDivElement;

  buttonDom: HTMLButtonElement;

  show: boolean;

  @Input() dropup: boolean;

  constructor(private elementRef: ElementRef) {
    this.show = false;
    this.dropup = false;
  }

  ngAfterViewInit() {
    this.buttonDom = this.elementRef.nativeElement.children[0];
    this.menusDom = this.elementRef.nativeElement.children[1];
    this.buttonDom.addEventListener('click', event => {
      this.toggle();
    });
    this.buttonDom.addEventListener('blur', (event: any) => {
      if (event.relatedTarget.parentNode !== this.menusDom) {
        this.closeMenu();
      }
    });
    this.menusDom.addEventListener('click', event => {
      this.closeMenu();
    });
    this.menusDom.style.top = '0';
    this.menusDom.style.left = '0';
  }

  toggle() {
    if (this.show === true) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.show = true;
    this.menusDom.style.display = 'block';
    if (this.dropup === true) {
      this.menusDom.style.transform = `translate3d(0px, -${this.menusDom.clientHeight + 4}px, 0px)`;
    } else {
      this.menusDom.style.transform = `translate3d(0px, ${this.buttonDom.clientHeight + 4}px, 0px)`;
    }
  }

  closeMenu() {
    this.show = false;
    this.menusDom.style.display = 'none';
  }

}
