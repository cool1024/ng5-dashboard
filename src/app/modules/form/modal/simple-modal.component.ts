import { Component } from '@angular/core';
import { TSModalService } from './../../../tools-ui';

@Component({
    template: `
            <ts-datepicker #datepicker="datePicker" btnClass="btn-info" activeClass="bg-info text-white"
            [weekTitles]="['一', '二', '三', '四', '五', '六', '日']"
            [monthTitles]="['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']"></ts-datepicker>
                <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">预览结果</h5>
            <span type="button" class="close pointer" (click)="dismiss()">
                &times;
            </span>
        </div>
        <div class="modal-body" style="height:600px;">
            <button ts-dom-toggle [target]="datepicker" >DatePicker</button>
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
