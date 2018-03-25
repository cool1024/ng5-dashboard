import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';

@Component({
    selector: 'ts-dropdown',
    template: `
    <div class="btn-group" [class.show]="open" [class.dropup]="dropup" (click)="open?closeDropdown():openDropdown()">
        <button #DropdownToggle [ngStyle]="btnStyle" (blur)="trycloseDropdown($event)" type="button" class="btn dropdown-toggle {{btnClass}}"
            aria-haspopup="true" aria-expanded="true">{{realTitle}}</button>
        <div #DropdownMenu class="dropdown-menu" [class.show]="open" x-placement="bottom-start" style="position: absolute; top: 0px; left: 0px; will-change: transform;">
            <button *ngFor="let item of itemsList" [class.active]="item.value==value" dropdownClass="dropdown-item" class="dropdown-item"
                (click)="setValue(item)">{{item.text}}</button>
        </div>
    </div>
  `,
    styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

    @Input() open: boolean;
    @Input() btnClass: string;
    @Input() items: Array<string | number | { value: any, text: string }>;
    @Input() title: string;
    @Input() select: boolean;
    @Input() dropup: boolean;
    @Input() useNumber: number;
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @Input() btnStyle: { [key: string]: string };

    @ViewChild('DropdownToggle') dropdownToggle: ElementRef;
    @ViewChild('DropdownMenu') dropdownMenu: ElementRef;

    constructor() {
        this.open = false;
        this.btnClass = 'btn-dark';
        this.title = 'Dropdown';
        this.items = [];
        this.select = false;
        this.dropup = false;
        this.useNumber = -1;
        this.btnStyle = {};
    }

    openDropdown() {
        this.dropdownMenu.nativeElement.style.display = 'block';
        this.dropdownMenu.nativeElement.style.visibility = 'hidden';
        if (this.dropup === true) {
            this.dropdownMenu.nativeElement.style.transform = `translate3d(0px, -${this.dropdownMenu.nativeElement.clientHeight + 4}px, 0px)`;
        } else {
            this.dropdownMenu.nativeElement.style.transform = `translate3d(0px, ${this.dropdownToggle.nativeElement.clientHeight + 4}px, 0px)`;
        }
        this.dropdownMenu.nativeElement.style.visibility = '';
        this.dropdownMenu.nativeElement.style.display = '';
        this.open = true;
    }

    closeDropdown() {
        if (this.open === false) { return; }
        this.open = false;
    }

    trycloseDropdown($event) {
        if ($event.relatedTarget && $event.relatedTarget.getAttribute('dropdownClass') === 'dropdown-item') {
            $event.relatedTarget.click();
            return;
        }
        this.closeDropdown();
    }

    setValue(item: { value: any, text: string }) {
        if (this.select) {
            this.title = item.text;
        }
        this.value = item.value;
        this.valueChange.emit(item.value);
    }

    get itemsList(): Array<{ value: any, text: string }> {
        const items = [];
        if (this.useNumber >= 0) {
            let i = this.useNumber;
            this.items.forEach(e => {
                if (typeof e !== 'string') {
                    console.error('useNumber>=0,items element must be a string');
                } else {
                    items.push({ value: i++, text: e });
                }
            });
        } else if (this.items.length > 0) {
            this.items.forEach(e => {
                items.push(typeof e === 'string' || typeof e === 'number' ? { value: e, text: e } : e);
            });
        }
        return items;
    }

    get realTitle(): string {
        if (this.select === true) {
            return (this.value !== undefined && this.value != null) ? function (that: any) {
                let title = '';
                const items = that.itemsList;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].value === that.value) {
                        title = items[i].text;
                    }
                }
                return title;
            }(this) : this.title;
        }
        return this.title;
    }

}
