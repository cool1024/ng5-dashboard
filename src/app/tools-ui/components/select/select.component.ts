import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'ts-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Input() open: boolean;
  @Input() items: Array<string | number | { value: any, text: string }>;
  @Input() placeholder: string;
  @Input() value: any;
  @Input() width: string;
  @Output() valueChange = new EventEmitter<any>();
  @ViewChild('DropdownToggle') dropdownToggle: ElementRef;
  @ViewChild('DropdownMenu') dropdownMenu: ElementRef;
  @ViewChild('inputDom') inputDom: ElementRef;
  searchKey: string;
  title: string;

  constructor() {
    this.open = false;
    this.placeholder = 'select...';
    this.title = '';
    this.items = [];
    this.searchKey = '';
    this.width = 'auto';
  }

  openDropdown() {
    const dropMenuDom = this.dropdownMenu.nativeElement;
    dropMenuDom.style.display = 'block';
    dropMenuDom.style.visibility = 'hidden';
    dropMenuDom.style.transform = `translate3d(0px, ${this.dropdownToggle.nativeElement.clientHeight + 4}px, 0px)`;
    dropMenuDom.style.visibility = '';
    dropMenuDom.style.display = '';
    dropMenuDom.style.width = this.dropdownToggle.nativeElement.clientWidth + 'px';
    this.open = true;
    this.searchKey = '';
  }

  closeDropdown() {
    if (this.open === false) { return; }
    this.open = false;
    this.searchKey = '';
  }

  trycloseDropdown($event) {
    if ($event.explicitOriginalTarget.className === 'dropdown-item') {
      $event.explicitOriginalTarget.click();
      return;
    }
    this.closeDropdown();
  }

  setValue(item: { value: any, text: string }) {
    this.value = item.value;
    this.title = item.text;
    this.inputDom.nativeElement.value = this.title;
    this.valueChange.emit(item.value);
  }

  setSearchKey($event) {

    const code = $event.keyCode;
    if (this.isChar(code) || this.isNumber(code) || this.isOtherChar(code) || this.isOtherOp(code)) {
      this.searchKey = $event.target.value;
    }

  }

  get itemsList(): Array<{ value: any, text: string }> {
    let items = [];
    if (this.items.length > 0) {
      this.items.forEach(e => {
        items.push(typeof e === 'string' || typeof e === 'number' ? { value: e, text: e } : e);
      });
    }
    if (this.searchKey) {
      items = items.filter(e => e.text.indexOf(this.searchKey) > -1);
    }
    return items;
  }

  get realTitle(): string {
    if (this.searchKey || this.open === true) {
      return this.searchKey;
    }
    return (this.value !== undefined && this.value != null) ? function (that: any) {
      let title = '';
      const items = that.itemsList;
      for (let i = 0; i < items.length; i++) {
        if (items[i].value === that.value) {
          title = items[i].text;
        }
      }
      return title;
    }(this) : this.title;
  }

  isChar(code: number): boolean {
    return code >= 65 && code <= 90;
  }

  isNumber(code: number): boolean {
    return (code >= 96 && code <= 105) || (code >= 48 && code <= 57);
  }

  isOtherChar(code: number): boolean {
    return code >= 186 && code <= 222;
  }

  isOtherOp(code: number): boolean {
    return code === 8 || code === 32;
  }

}
