/**
 * 组件文件
 * TextFieldComponent
 *
 * @file text-field.compont.ts
 * @author xiaojian
 * @date 2018年02月27日
 */
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { TextControlField } from './text.class';

@Component({
    selector: 'ts-form-text',
    template: `
    <img *ngIf="field.isActive()" src="https://www.wufoo.com/images/arrow.png" alt="" class="arrow">
    <div (click)="setFieldActive()" [class.bg-info]="field.isActive()" class="form-group ml-4 p-2 border-hover">
        <p *ngIf="field.isActive()" class="m-0 text-right">
            <button (click)="removeField()" class="btn btn-link text-danger">&times;</button>
        </p>
        <p>{{field.title}}</p>
        <small>{{field.subject}}</small>
    </div>`,
    styleUrls: ['text-field.component.css'],
})
export class TextFieldComponent implements OnInit {

    @Input() field: TextControlField;
    @Output() fieldChange = new EventEmitter<TextControlField>();
    @Output() activeChange = new EventEmitter<TextControlField>();
    @Output() deleteHandle = new EventEmitter<TextControlField>();

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
