import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ts-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {

  @Input() label: string;
  @Input() value: any;
  @Input() checked: boolean;
  @Input() color: string;
  @Input() defaultColor: string;
  @Input() activeColor: string;
  @Input() type: string;
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor() {
    this.type = 'check';
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
