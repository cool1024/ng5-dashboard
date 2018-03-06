import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { InputControlField } from './input.class';

@Component({
    selector: 'ts-form-input',
    template: `
    <img *ngIf="field.isActive()" src="https://www.wufoo.com/images/arrow.png" alt="" class="arrow">
    <div (click)="setFieldActive()" [class.bg-info]="field.isActive()" class="form-group ml-4 p-2 border-hover mb-0">
        <p *ngIf="field.isActive()" class="m-0 text-right">
            <button (click)="removeField()" class="btn btn-link text-danger">&times;</button>
        </p>
        <label [class.required-label]="field.required">{{field.title}}    </label>
        <input class="form-control bg-white" placeholder="{{field.placeholder}}" type="{{field.inputType}}" readonly>
    </div>`,
    styleUrls: ['input-field.component.css'],
})
export class InputFieldComponent implements OnInit {

    @Input() field: InputControlField;
    @Output() fieldChange = new EventEmitter<InputControlField>();
    @Output() activeChange = new EventEmitter<InputControlField>();
    @Output() deleteHandle = new EventEmitter<InputControlField>();

    constructor() {
    }

    ngOnInit() { }

    setFieldActive() {
        this.field.setActive();
        this.activeChange.emit(this.field);
    }

    removeField() {
        this.deleteHandle.emit(this.field);
    }
}
