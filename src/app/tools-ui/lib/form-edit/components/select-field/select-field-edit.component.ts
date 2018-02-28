import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { SelectControlField } from './select.class';

@Component({
  selector: 'ts-form-edit-select',
  templateUrl: './select-field-edit.component.html',
})
export class SelectFieldEditComponent implements OnInit {


  @Input() field: SelectControlField;
  @Output() fieldChange = new EventEmitter<SelectControlField>(false);


  constructor() {
    this.field = new SelectControlField();
  }

  ngOnInit() { }

  removeOptions(index: number) {
    this.field.removeOptions(index);
    this.fieldChange.emit(this.field);
  }

  addOptions(option: string) {
    this.field.addOptions(option);
    this.fieldChange.emit(this.field);
  }
}
