import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ts-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent implements OnInit {

  @Input() label: string;
  @Input() value: any;
  @Input() checked: boolean;
  @Input() color: string;
  @Input() defaultColor: string;
  @Input() activeColor: string;
  @Input() type: string;
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor() {
    this.type = 'dot';
    this.checked = false;
  }

  ngOnInit() {
    if (this.color) {
      this.activeColor = this.defaultColor = this.color;
    }
  }

  changeStatus() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
