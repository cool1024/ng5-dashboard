import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { InputControlField, InputTypes } from './input.class';

@Component({
  selector: 'ts-form-edit-input',
  templateUrl: './input-field-edit.component.html',
})
export class InputFieldEditComponent implements OnInit {


  @Input() field: InputControlField;
  @Output() fieldChange = new EventEmitter<InputControlField>(false);

  inputTypes = InputTypes;

  constructor() {
    this.field = new InputControlField();
  }

  ngOnInit() { }

}
