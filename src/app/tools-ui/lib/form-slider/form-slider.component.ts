
import { Component, Input } from '@angular/core';

@Component({
    selector: 'ts-form-slider',
    templateUrl: 'form-slider.component.html',
    styleUrls: ['form-slider.component.css'],
})
export class FormSliderComponent {

    @Input() width: number;
    @Input() height: number;

    constructor() {
        this.width = 300;
        this.height = 400;
    }

    dragstart(evt: DragEvent) {
        const dom = <HTMLImageElement>evt.target;
        evt.dataTransfer.setData('text', (evt.clientX - dom.offsetLeft) + ';' + (evt.clientY - dom.offsetTop));
    }

    drop(evt: DragEvent) {
        const dom = <HTMLImageElement>evt.target;
        const offsets = evt.dataTransfer.getData('text').split(';');
        const offsetX = parseInt(offsets[0], 10);
        const offsetY = parseInt(offsets[1], 10);
        if (typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
        dom.style.left = (evt.clientX - offsetX) + 'px';
        dom.style.top = (evt.clientY - offsetY) + 'px';
    }

    dragover(evt: DragEvent) {
        if (typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    }

    dragenter(evt) {
        if (typeof evt.preventDefault === 'function') {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    }
}
