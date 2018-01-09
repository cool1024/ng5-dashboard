import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SelectItem } from '../../interfaces/select-item.interface';

@Component({
    selector: 'ts-btn-item',
    template: `
        <button (click)="toggle()" class="btn" [ngClass]="active?activeBtnClass:defaultBtnClass">
            <i class="fa fa-fw" *ngIf="useIcon" [class.fa-square-o]="!active" [class.fa-check-square-o]="active"></i>{{item.text}}
        </button>

    `
})
export class BtnItemComponent {

    @Input() active: boolean;
    @Input() item: SelectItem;
    @Input() defaultBtnClass: string;
    @Input() activeBtnClass: string;
    @Input() useIcon: boolean;

    @Output() activeChange = new EventEmitter<any>(false);


    constructor() {
        this.defaultBtnClass = 'btn-sm btn-white';
        this.activeBtnClass = 'btn-sm btn-success';
        this.active = false;
        this.item = { value: 0, text: 'item' };
        this.useIcon = true;
    }

    toggle() {
        this.active = !this.active;
        this.activeChange.emit(this.active);
    }
}
