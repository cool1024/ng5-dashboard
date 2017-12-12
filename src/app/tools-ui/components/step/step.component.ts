import { Component, Input } from '@angular/core';

@Component({
    selector: 'ts-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.css']
})
export class StepComponent {

    @Input() title: string;
    @Input() content: string;
    @Input() index: number;
    @Input() finished: boolean;
    @Input() loading: boolean;
    @Input() end: boolean;
    @Input() color: string;
    constructor() {
        this.finished = false;
        this.loading = false;
        this.end = false;
        this.title = 'Step';
        this.content = '';
        this.index = 0;
        this.color = 'primary';
    }
}
