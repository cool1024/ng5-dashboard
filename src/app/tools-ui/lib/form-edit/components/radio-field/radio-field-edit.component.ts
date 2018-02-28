/**
 * 组件文件
 * RadioFieldEditComponent
 *
 * @file radio-field-edit.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { RadioControlField } from './radio.class';

@Component({
  selector: 'ts-form-edit-radio',
  templateUrl: './radio-field-edit.component.html',
})
export class RadioFieldEditComponent implements OnInit {


  @Input() field: RadioControlField;
  @Output() fieldChange = new EventEmitter<RadioControlField>(false);


  constructor() {
    this.field = new RadioControlField();
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
