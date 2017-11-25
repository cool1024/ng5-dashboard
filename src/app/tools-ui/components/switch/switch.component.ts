import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ts-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css']
})
export class SwitchComponent implements OnChanges {

  @Input() activeClass: string;
  @Input() defaultClass: string;
  @Input() barClass: string;
  @Input() values: { open: any, close: any };
  @Input() value: any;

  @Output() valueChange = new EventEmitter<any>(false);

  open: boolean;

  constructor() {
    this.open = false;
    this.activeClass = 'bg-dark';
    this.defaultClass = 'bg-secondary';
    this.barClass = 'bg-white';
    this.values = { open: true, close: false };
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.value) {
      if (simpleChanges.value.currentValue === this.values.open) {
        this.setOpen();
      } else if (simpleChanges.value.currentValue === this.values.close) {
        this.setClose();
      } else {
        console.error('unknonw value : value not in values');
      }
    }
  }

  toggle() {
    this.open = !this.open;
    this.valueChange.emit(this.open ? this.values.open : this.values.close);
  }

  setOpen() {
    this.open = true;
    this.valueChange.emit(this.values.open);
  }

  setClose() {
    this.open = false;
    this.valueChange.emit(this.values.close);
  }
}
