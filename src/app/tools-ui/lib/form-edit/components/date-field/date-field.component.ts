/**
 * 组件文件
 * DateFieldComponent
 *
 * @file date-field.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DateControlField } from './date.class';

@Component({
    selector: 'ts-form-date',
    template: `
    <img *ngIf="field.isActive()" src="https://www.wufoo.com/images/arrow.png" alt="" class="arrow">
    <div (click)="setFieldActive()" [class.bg-info]="field.isActive()" class="ml-4 p-2 border-hover">
        <p *ngIf="field.isActive()" class="m-0 text-right">
            <button (click)="removeField()" class="btn btn-link text-danger">&times;</button>
        </p>
        <label [class.required-label]="field.required">{{field.title}}</label>
        <div class="input-group">
            <input class="form-control bg-white" placeholder="{{field.placeholder}}" readonly>
            <div class="input-group-append">
                <span class="input-group-text bg-white">
                    <i *ngIf="field.dateType==='date'" class="fa fa-calendar fa-fw"></i>
                    <i *ngIf="field.dateType==='time'" class="fa fa-clock-o fa-fw"></i>
                </span>
            </div>
        </div>
    </div>`,
    styleUrls: ['date-field.component.css'],
})
export class DateFieldComponent implements OnInit {

    @Input() field: DateControlField;
    @Output() fieldChange = new EventEmitter<DateControlField>();
    @Output() activeChange = new EventEmitter<DateControlField>();
    @Output() deleteHandle = new EventEmitter<DateControlField>();

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
