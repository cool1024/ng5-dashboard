import { Component } from '@angular/core';
import { ModalService } from '../components/modal/modal.service';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">{{options.title}}</h5>
            <span  class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="max-height:600px;overflow:auto">
            <div class="input-group">
                <div class="input-group-addon bg-white">
                    <span class="input-group-text">{{options.label}}</span>
                </div>
                <input #filterKey="ngModel" ngModel type="text" class="form-control" placeholder="{{options.placeholder}}">
            </div>
            <br>
            <ts-btn-group
                defaultBtnClass="btn-sm btn-white mb-1"
                activeBtnClass="btn-sm btn-success mb-1"
                [items]="items"
                [(values)]="values"
                [filterKey]="filterKey.value"
                [useIcon]="true">
            </ts-btn-group>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-white" (click)="dismiss()">{{options.cancelTitle}}</button>
            <button type="button" class="btn btn-success" (click)="close()">{{options.okTitle}}</button>
        </div>`,
})
export class BtnGroupModalComponent {

    values = [];
    items = [];
    options = {
        title: '@Title',
        label: 'key word',
        placeholder: 'enter key words',
        okTitle: 'Confirm',
        cancelTitle: 'Cancel',
    };

    constructor(private modalService: ModalService) { }

    close() {
        this.modalService.close(this.values);
    }

    dismiss() {
        this.modalService.dismiss();
    }
}
