import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TextAreaControlField, TextAreaTypes } from './textarea.class';

@Component({
  selector: 'ts-form-edit-textarea',
  templateUrl: './textarea-field-edit.component.html',
})
export class TextAreaFieldEditComponent implements OnInit {


  @Input() field: TextAreaControlField;
  @Output() fieldChange = new EventEmitter<TextAreaControlField>(false);

  textareaTypes = TextAreaTypes;

  constructor() {
    this.field = new TextAreaControlField();
  }

  ngOnInit() { }

}
