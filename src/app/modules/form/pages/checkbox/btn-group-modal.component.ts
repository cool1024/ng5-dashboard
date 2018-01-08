import { Component } from '@angular/core';
import { TSModalService } from './../../../../tools-ui';

@Component({
    template: `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">点击选中选项</h5>
            <span  class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="max-height:600px;overflow:auto">
            <div class="input-group">
                <div class="input-group-addon bg-white">
                    <span class="input-group-text">关键词</span>
                </div>
                <input #filterKey="ngModel" ngModel type="text" class="form-control" placeholder="输入查询关键词">
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
            <button type="button" class="btn btn-white" (click)="dismiss()">取消/关闭</button>
            <button type="button" class="btn btn-success" (click)="close()">确认选择</button>
        </div>`,
})
export class BtnGroupModalComponent {

    values = [];
    items = [];

    constructor(private modalService: TSModalService) { }

    close() {
        this.modalService.close(this.values);
    }

    dismiss() {
        this.modalService.dismiss();
    }
}
