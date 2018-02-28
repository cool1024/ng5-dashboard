/**
 * 组件文件
 * DateFieldEditComponent
 *
 * @file date-field-edit.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DateControlField } from './date.class';

@Component({
    selector: 'ts-form-edit-date',
    templateUrl: './date-field-edit.component.html',
})
export class DateFieldEditComponent implements OnInit {


    @Input() field: DateControlField;
    @Output() fieldChange = new EventEmitter<DateControlField>(false);


    constructor() {
        this.field = new DateControlField();
    }

    ngOnInit() { }
}
