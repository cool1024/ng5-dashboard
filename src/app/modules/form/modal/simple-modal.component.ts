import { Component } from '@angular/core';
import { TSModalService } from './../../../tools-ui';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">预览结果</h5>
            <span type="button" class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="height:600px;">
            <div class="embed-responsive h-100">
                <iframe class="embed-responsive-item" src="http://www.cool1024.com" allowfullscreen></iframe>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-white" (click)="dismiss()">关闭窗口</button>
        </div>`,
})
export class SimpleModalComponent {

    constructor(private modalService: TSModalService) { }

    close() {
        this.modalService.close();
    }

    dismiss() {
        this.modalService.dismiss();
    }
}
