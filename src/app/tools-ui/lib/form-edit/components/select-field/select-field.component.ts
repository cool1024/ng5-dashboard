import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SelectControlField } from './select.class';

@Component({
    selector: 'ts-form-select',
    template: `
  <img *ngIf="field.isActive()" src="https://www.wufoo.com/images/arrow.png" alt="" class="arrow">
  <div (click)="setFieldActive()" [class.bg-info]="field.isActive()" class="form-group ml-4 p-2 border-hover">
      <p *ngIf="field.isActive()" class="m-0 text-right">
            <button (click)="removeField()" class="btn btn-link text-danger">&times;</button>
      </p>
      <label [class.required-label]="field.required">{{field.title}}<span class="close"></span></label>
      <select class="custom-select bg-white" [(ngModel)]="field.defaultValue" readonly>
          <option [ngValue]="-1">{{field.placeholder}}</option>
          <option *ngFor="let option of field.options;index as i" [ngValue]="i">{{option}}</option>
      </select>
  </div>`,
    styleUrls: ['select-field.component.css'],
})
export class SelectFieldComponent implements OnInit {

    @Input() field: SelectControlField;
    @Output() fieldChange = new EventEmitter<SelectControlField>();
    @Output() activeChange = new EventEmitter<SelectControlField>();
    @Output() deleteHandle = new EventEmitter<SelectControlField>();

    constructor() { }

    ngOnInit() { }

    /**
     * 设置控件为积极（编辑）状态
     */
    setFieldActive() {
        this.field.setActive();
        this.activeChange.emit(this.field);
    }

    /**
     * 移除控件
     */
    removeField() {
        this.deleteHandle.emit(this.field);
    }

}
