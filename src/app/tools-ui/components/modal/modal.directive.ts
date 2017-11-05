import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[ts-modal-host]',
})
export class ModalDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
