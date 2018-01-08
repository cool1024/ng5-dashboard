import { Component } from '@angular/core';
import { TSModalService } from './../../../../tools-ui';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">预览结果</h5>
            <span  class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="height:600px;overflow:auto">

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-white" (click)="close()">取消/关闭</button>
            <button type="button" class="btn btn-success" (click)="dismiss()">确认选择</button>
        </div>`,
})
export class BtnGroupModalComponent {

    constructor(private modalService: TSModalService) { }

    close() {
        this.modalService.close();
    }

    dismiss() {
        this.modalService.dismiss();
    }
}
