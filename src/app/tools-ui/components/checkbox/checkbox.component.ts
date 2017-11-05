import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ts-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnChanges {

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

  ngOnChanges(simpleChanges: SimpleChanges) {

    if (!!simpleChanges.checked) {
      this.checked = simpleChanges.checked.currentValue;
    }

    if (!!simpleChanges.color) {
      this.activeColor = this.defaultColor = this.color = simpleChanges.color.currentValue;
    }
  }

  changeStatus() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }

}
