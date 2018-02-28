import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TextAreaControlField } from './textarea.class';

@Component({
    selector: 'ts-form-textarea',
    template: `
  <img *ngIf="field.isActive()" src="https://www.wufoo.com/images/arrow.png" alt="" class="arrow">
  <div (click)="setFieldActive()" [class.bg-info]="field.isActive()" class="form-group ml-4 p-2 border-hover">
      <p *ngIf="field.isActive()" class="m-0 text-right">
         <button (click)="removeField()" class="btn btn-link text-danger">&times;</button>
      </p>
      <label [class.required-label]="field.required">{{field.title}}<span class="close"></span></label>
      <textarea class="form-control bg-white" placeholder="{{field.placeholder}}" readonly></textarea>
  </div>`,
    styleUrls: ['textarea-field.component.css'],
})
export class TextAreaFieldComponent implements OnInit {

    @Input() field: TextAreaControlField;
    @Output() fieldChange = new EventEmitter<TextAreaControlField>();
    @Output() activeChange = new EventEmitter<TextAreaControlField>();
    @Output() deleteHandle = new EventEmitter<TextAreaControlField>();

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
