/**
 * 组件文件
 * RadioFieldComponent
 *
 * @file radio-field.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { RadioControlField } from './radio.class';

@Component({
    selector: 'ts-form-radio',
    template: `
    <img *ngIf="field.isActive()" src="https://www.wufoo.com/images/arrow.png" alt="" class="arrow">
    <div (click)="setFieldActive()" [class.bg-info]="field.isActive()" class="form-group ml-4 p-2 border-hover">
        <p *ngIf="field.isActive()" class="m-0 text-right">
            <button (click)="removeField()" class="btn btn-link text-danger">&times;</button>
        </p>
        <label [class.required-label]="field.required">{{field.title}}<span class="close"></span></label>
        <ts-radio-group [(value)]="field.defaultValue" #radios="tsRadioGroup">
            <ts-radio *ngFor="let option of field.options;index as i" [value]="i" (groupHandle)="radios.applyRadioChange($event)" [label]="option"></ts-radio>
        </ts-radio-group>
    </div>`,
    styleUrls: ['radio-field.component.css'],
})
export class RadioFieldComponent implements OnInit {

    @Input() field: RadioControlField;
    @Output() fieldChange = new EventEmitter<RadioControlField>();
    @Output() activeChange = new EventEmitter<RadioControlField>();
    @Output() deleteHandle = new EventEmitter<RadioControlField>();

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
