/**
 * 组件文件
 * TextFieldEditComponent
 *
 * @file text-field-edit.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TextControlField } from './text.class';

@Component({
    selector: 'ts-form-edit-text',
    templateUrl: './text-field-edit.component.html',
})
export class TextFieldEditComponent implements OnInit {


    @Input() field: TextControlField;
    @Output() fieldChange = new EventEmitter<TextControlField>(false);


    constructor() {
        this.field = new TextControlField();
    }

    ngOnInit() { }
}
