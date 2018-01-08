import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SelectItem } from '../../interfaces/select-item.interface';

@Component({
    selector: 'ts-btn-group',
    templateUrl: './btn-group.component.html',
    styleUrls: ['./btn-group.component.css']
})
export class BtnGroupComponent implements OnChanges {

    @Input() values: any[];
    @Input() filterKey: string;
    @Input() items: SelectItem[];
    @Input() defaultBtnClass: string;
    @Input() activeBtnClass: string;
    @Input() useIcon: boolean;
    @Output() valuesChange = new EventEmitter<any[]>(false);
    private actives: boolean[];

    constructor() {
        this.defaultBtnClass = 'btn-sm btn-white';
        this.activeBtnClass = 'btn-sm btn-success';
        this.values = [];
        this.items = [];
        this.useIcon = true;
        this.filterKey = '';
    }

    ngOnChanges() {
        this.actives = [];
        this.items.forEach((e, i) => {
            this.actives.push(this.values.indexOf(e.value) >= 0);
        });
    }

    applyActive(active: boolean, index: number) {
        this.actives[index] = active;
        this.applyValues();
    }

    applyValues() {
        this.values = [];
        this.actives.forEach((e, i) => {
            if (e) {
                this.values.push(this.items[i].value);
            }
        });
        this.valuesChange.emit(this.values);
    }

}
